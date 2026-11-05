from pathlib import Path
import re, zlib, sys

root = Path('notes/YEAR 3')
out = Path('app/checks/source-text')
for path in root.rglob('*.pdf'):
    selected = (path.parent.name in ['System Programming', 'AOOP'] and any(x in path.name.lower() for x in ['lesson', 'outline', 'topic 1-6'])) if '--more' in sys.argv else any(x in path.name.lower() for x in ['complete', 'syllabus', 'database systems', 'systems programing lesson 1'])
    if not selected:
        continue
    rows = []
    for match in re.finditer(rb'stream\r?\n(.*?)\r?\nendstream', path.read_bytes(), re.S):
        data = match.group(1)
        try:
            if data[:1] == b'x':
                data = zlib.decompress(data)
        except zlib.error:
            continue
        if b' Tf' not in data or b'BT' not in data:
            continue
        for bt in re.finditer(rb'BT(.*?)ET', data, re.S):
            block = bt.group(1)
            if not re.search(rb'(?:\]\s*TJ|\)\s*Tj)', block):
                continue
            pieces = []
            for token in re.finditer(rb'\((?:\\.|[^\\)])*\)|<([0-9A-Fa-f]+)>', block):
                value = token.group(0)
                if value.startswith(b'('):
                    text = re.sub(rb'\\([()\\])', rb'\1', value[1:-1]).decode('cp1252', 'replace')
                else:
                    h = token.group(1)
                    if len(h) % 4:
                        continue
                    text = ''.join(chr(int(h[i:i+4], 16) + 29) if int(h[i:i+4], 16) < 250 else '?' for i in range(0,len(h),4))
                pieces.append(text)
            text = ''.join(pieces)
            if text.strip():
                rows.append(text)
    destination = out / (path.parent.name + '-' + path.stem + '-extracted.txt')
    destination.write_text('\n'.join(rows), encoding='utf-8')
    print(destination, len(rows), flush=True)
