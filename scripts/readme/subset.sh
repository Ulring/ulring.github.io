#!/usr/bin/env bash
# Subsets the site fonts to the characters the README SVGs use and base64-encodes them into fonts/*.b64.
# Usage: PYFTSUBSET=/path/to/pyftsubset scripts/readme/subset.sh   (pip install fonttools brotli)
set -euo pipefail
here=$(cd "$(dirname "$0")" && pwd); fonts="$here/../../public/fonts"; out="$here/fonts"; mkdir -p "$out"
sub=${PYFTSUBSET:-pyftsubset}
py=$(dirname "$(command -v "$sub")")/python   # same environment as pyftsubset
tmp=$(mktemp -d)
# variable fonts → one static weight each (much smaller), then subset
"$py" -m fontTools.varLib.instancer "$fonts/ClashGrotesk-Variable.woff2" wght=600 -o "$tmp/clash.ttf" -q
"$py" -m fontTools.varLib.instancer "$fonts/Switzer-Variable.woff2" wght=420 -o "$tmp/switzer.ttf" -q
chars='U+0020-007E,U+00B7,U+00E9,U+2013,U+2014,U+2019,U+2192'
"$sub" "$tmp/clash.ttf" --unicodes="$chars" --flavor=woff2 --layout-features='kern' --output-file="$out/clash.woff2"
"$sub" "$tmp/switzer.ttf" --unicodes="$chars" --flavor=woff2 --layout-features='kern' --output-file="$out/switzer.woff2"
for f in clash switzer; do base64 -w0 "$out/$f.woff2" > "$out/$f.b64"; rm "$out/$f.woff2"; done
rm -rf "$tmp"; ls -la "$out"
