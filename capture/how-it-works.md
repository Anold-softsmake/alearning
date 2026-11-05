# How it works

Deep mode: what the site's JavaScript is made of and what its start page did while we watched.

## Its JavaScript

Analysed 9 script(s) from https://masomo3.kyu.ac.ke/login/index.php: 6 module(s), 26 endpoint(s), 0 route(s), bundled with babel/browserify/webpack.

Evidence ev_0351ed210082d16d070cddbe86b0e9268c5d38ef4681fd40f81170cbd9671d38.

```json
{
  "api_operations": [],
  "app_kind": "unknown",
  "bundlers": [
    "babel",
    "browserify",
    "webpack"
  ],
  "edges": [
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#0",
      "kind": "requires",
      "to": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#1"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#0",
      "kind": "requires",
      "to": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#5"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#0",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#module.exports.defaultOptions@5053"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#0",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#module.exports@5053"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#1",
      "kind": "requires",
      "to": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#2"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#1",
      "kind": "requires",
      "to": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#3"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#1",
      "kind": "requires",
      "to": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#4"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#1",
      "kind": "requires",
      "to": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#5"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#1",
      "kind": "requires",
      "to": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#7"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#1",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#Beautifier.prototype._reset@5054"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#1",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#Beautifier.prototype.allow_wrap_or_preserved_newline@5054"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#1",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#Beautifier.prototype.beautify@5053"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#1",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#Beautifier.prototype.create_flags@5054"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#1",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#Beautifier.prototype.deindent@5054"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#1",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#Beautifier.prototype.handle_block_comment@5054"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#1",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#Beautifier.prototype.handle_comma@5054"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#1",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#Beautifier.prototype.handle_comment@5054"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#1",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#Beautifier.prototype.handle_dot@5054"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#1",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#Beautifier.prototype.handle_end_block@5054"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#1",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#Beautifier.prototype.handle_end_expr@5054"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#1",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#Beautifier.prototype.handle_eof@5054"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#1",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#Beautifier.prototype.handle_equals@5054"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#1",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#Beautifier.prototype.handle_operator@5054"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#1",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#Beautifier.prototype.handle_semicolon@5054"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#1",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#Beautifier.prototype.handle_start_block@5054"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#1",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#Beautifier.prototype.handle_start_expr@5054"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#1",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#Beautifier.prototype.handle_string@5054"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#1",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#Beautifier.prototype.handle_token@5054"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#1",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#Beautifier.prototype.handle_unknown@5054"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#1",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#Beautifier.prototype.handle_whitespace_and_comments@5054"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#1",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#Beautifier.prototype.handle_word@5054"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#1",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#Beautifier.prototype.indent@5053"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#1",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#Beautifier.prototype.print_block_commment@5054"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#1",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#Beautifier.prototype.print_newline@5054"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#1",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#Beautifier.prototype.print_token@5054"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#1",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#Beautifier.prototype.print_token_line_indentation@5054"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#1",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#Beautifier.prototype.restore_mode@5054"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#1",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#Beautifier.prototype.set_mode@5054"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#1",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#Beautifier.prototype.start_of_object_property@5054"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#1",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#Beautifier.prototype.start_of_statement@5054"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#1",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#Beautifier@5053"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#1",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#in_array@5054"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#1",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#is_array@5054"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#1",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#is_expression@5054"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#1",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#remove_redundant_indentation@5054"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#1",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#reserved_array@5054"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#1",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#reserved_word@5054"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#10",
      "kind": "requires",
      "to": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#11"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#10",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#RTCPeerConnection.prototype.addStream@818"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#10",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#RTCPeerConnection.prototype.addTrack@818"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#10",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#RTCPeerConnection.prototype.createOffer@818"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#10",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#RTCPeerConnection.prototype.getLocalStreams@818"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#10",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#RTCPeerConnection.prototype.getRemoteStreams@818"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#10",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#RTCPeerConnection.prototype.removeStream@818"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#10",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#RTCPeerConnection.prototype.setRemoteDescription@818"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#10",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#RTCPeerConnection@818"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#10",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#TokenStream.prototype.add@5054"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#10",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#TokenStream.prototype.hasNext@5054"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#10",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#TokenStream.prototype.isEmpty@5054"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#10",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#TokenStream.prototype.next@5054"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#10",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#TokenStream.prototype.peek@5054"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#10",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#TokenStream.prototype.restart@5054"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#10",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#TokenStream@5054"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#10",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#exports.shimAudioContext@818"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#10",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#exports.shimCallbacksAPI@818"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#10",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#exports.shimCreateOfferLegacy@818"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#10",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#exports.shimGetUserMedia@818"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#10",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#exports.shimLocalStreamsAPI@818"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#10",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#exports.shimRTCIceServerUrls@818"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#10",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#exports.shimRemoteStreamsAPI@818"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#10",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#exports.shimTrackEventTransceiver@818"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#10",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#get@42"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#10",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#navigator.mediaDevices.getUserMedia@818"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#10",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#prototype.createAnswer@818"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#10",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#prototype.createOffer@818"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#10",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#set@42"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#10",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#shimConstraints@818"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#10",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#this._onaddstreampoly@818"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#10",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#withCallback@818"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#11",
      "kind": "requires",
      "to": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#12"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#11",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#WhitespacePattern.prototype.__set_whitespace_patterns@5054"
    },
    {
      "from": "bundle-module:masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js#11",
      "kind": "defines",
      "to": "fn:masomo3.kyu.ac.ke/li
```

## Ten seconds of it

Watched https://masomo3.kyu.ac.ke/login/index.php for 10000ms: 0 request outline(s), 1 console entr(y/ies).

Evidence ev_9a081441a3c3d6fe7f47788819458ef3033c382c709d8e2e7fca7bd9fc981ae7.

```json
{
  "accessibility": null,
  "console": {
    "count": 1,
    "entries": [
      {
        "level": "log",
        "source": "console-api"
      }
    ],
    "has_text": false
  },
  "dom": {
    "attribute_names": [
      "action",
      "alt",
      "aria-label",
      "aria-live",
      "async",
      "autocomplete",
      "charset",
      "class",
      "content",
      "crossorigin",
      "data-modal",
      "data-modal-content-str",
      "data-modal-title-str",
      "data-requirecontext",
      "data-requiremodule",
      "dir",
      "for",
      "href",
      "http-equiv",
      "id",
      "lang",
      "method",
      "name",
      "placeholder",
      "rel",
      "role",
      "src",
      "style",
      "type",
      "value",
      "xml:lang"
    ],
    "elements_by_name": {
      "a": 3,
      "body": 1,
      "button": 3,
      "div": 22,
      "form": 2,
      "h1": 1,
      "head": 1,
      "html": 1,
      "i": 1,
      "img": 1,
      "input": 6,
      "label": 2,
      "link": 6,
      "meta": 4,
      "script": 16,
      "section": 1,
      "span": 2,
      "title": 1
    },
    "text_nodes": 19,
    "total_nodes": 95,
    "truncated": false
  },
  "dropped_events": 0,
  "frame_origins": [
    "https://masomo3.kyu.ac.ke"
  ],
  "network": {
    "request_count": 0,
    "requests": []
  },
  "origin": "https://masomo3.kyu.ac.ke/login/index.php",
  "resources": [
    {
      "mime_type": "application/javascript",
      "type": "Script",
      "url": "https://masomo3.kyu.ac.ke/lib/javascript.php/1789046438/lib/requirejs/require.min.js"
    },
    {
      "mime_type": "image/png",
      "type": "Image",
      "url": "https://masomo3.kyu.ac.ke/theme/moove/pix/loginbg.png"
    },
    {
      "mime_type": "image/png",
      "type": "Image",
      "url": "https://masomo3.kyu.ac.ke/pluginfile.php/1/theme_moove/logo/1789046438/kyu_logo2.png"
    },
    {
      "mime_type": "font/woff2",
      "type": "Font",
      "url": "https://fonts.gstatic.com/s/roboto/v51/KFO7CnqEu92Fr1ME7kSn66aGLdTylUAMa3yUBA.woff2"
    },
    {
      "mime_type": "font/woff2",
      "type": "Font",
      "url": "https://masomo3.kyu.ac.ke/theme/font.php/moove/core/1789046438/fa-solid-900.woff2"
    },
    {
      "mime_type": "application/javascript",
      "type": "Script",
      "url": "https://masomo3.kyu.ac.ke/theme/yui_combo.php?rollup/3.18.1/yui-moodlesimple-min.js"
    },
    {
      "mime_type": "application/javascript",
      "type": "Script",
      "url": "https://2.7.9/MathJax.js?delayStartupUntil=configured"
    },
    {
      "mime_type": "application/javascript",
      "type": "Script",
      "url": "https://masomo3.kyu.ac.ke/lib/javascript.php/1789046438/lib/polyfills/polyfill.js"
    },
    {
      "mime_type": "application/javascript",
      "type": "Script",
      "url": "https://masomo3.kyu.ac.ke/lib/javascript.php/1789046438/lib/javascript-static.js"
    }
  ],
  "scripts": [
    {
      "length": 12142,
      "source_map_url": null,
      "url": "https://masomo3.kyu.ac.ke/login/index.php"
    },
    {
      "length": 200052,
      "source_map_url": null,
      "url": "https://masomo3.kyu.ac.ke/lib/javascript.php/1789046438/lib/polyfills/polyfill.js"
    },
    {
      "length": 272032,
      "source_map_url": null,
      "url": "https://masomo3.kyu.ac.ke/theme/yui_combo.php?rollup/3.18.1/yui-moodlesimple-min.js"
    },
    {
      "length": 21041,
      "source_map_url": null,
      "url": "https://masomo3.kyu.ac.ke/lib/javascript.php/1789046438/lib/javascript-static.js"
    },
    {
      "length": 17588,
      "source_map_url": null,
      "url": "https://masomo3.kyu.ac.ke/lib/javascript.php/1789046438/lib/requirejs/require.min.js"
    },
    {
      "length": 63499,
      "source_map_url": null,
      "url": "https://2.7.9/MathJax.js?delayStartupUntil=configured"
    },
    {
      "length": 3033981,
      "source_map_url": null,
      "url": "https://masomo3.kyu.ac.ke/lib/requirejs.php/1789046438/core/first.js"
    },
    {
      "length": 87531,
      "source_map_url": null,
      "url": "https://masomo3.kyu.ac.ke/lib/javascript.php/1789046438/lib/jquery/jquery-3.7.1.min.js"
    },
    {
      "length": 15452,
      "source_map_url": null,
      "url": "https://masomo3.kyu.ac.ke/theme/yui_combo.php?3.18.1/event-mousewheel/event-mousewheel-min.js&3.18.1/event-resize/event-resize-min.js&3.18.1/event-hover/event-hover-min.js&3.18.1/event-touch/event-touch-min.js&3.18.1/event-move/event-move-min.js&3.18.1/event-flick/event-flick-min.js&3.18.1/event-valuechange/event-valuechange-min.js&3.18.1/event-tap/event-tap-min.js&m/1789046438/core/event/event-min.js"
    }
  ],
  "scripts_truncated": false,
  "secret_redactions": 0,
  "storage_keys": null,
  "watch_ms": 10000,
  "websockets": {
    "connections": [],
    "frames": []
  }
}
```
