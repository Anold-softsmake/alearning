import {fileURLToPath} from 'node:url';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  // OneDrive folders can appear as Windows reparse points. Next's cache
  // cleanup tries to read them as symbolic links and fails with EINVAL.
  cleanDistDir: process.platform !== 'win32',
  outputFileTracingRoot: fileURLToPath(new URL('.', import.meta.url)),
  webpack(config) {
    config.resolve.symlinks = false;
    return config;
  },
};

export default nextConfig;
