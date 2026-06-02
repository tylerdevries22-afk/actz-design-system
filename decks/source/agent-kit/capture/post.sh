#!/usr/bin/env bash
# Normalize raw captures into SMALL deck-ready snippets: trim, scale, mp4+webm+poster.
# Usage: bash capture/post.sh ./raw ./clips   [HEIGHT=1080] [TRIM=8] [GIF=0]
set -euo pipefail
IN="${1:-./raw}"; OUT="${2:-./clips}"; H="${HEIGHT:-1080}"; TRIM="${TRIM:-8}"; mkdir -p "$OUT"; shopt -s nullglob
for f in "$IN"/*.webm "$IN"/*.mp4 "$IN"/*.mov; do
  b="$(basename "${f%.*}")"; vf="scale=-2:${H}:flags=lanczos"; echo ">> $b"
  ffmpeg -y -t "$TRIM" -i "$f" -vf "$vf" -c:v libx264 -pix_fmt yuv420p -crf 21 -preset slow -movflags +faststart -an "$OUT/$b.mp4" </dev/null 2>/dev/null
  ffmpeg -y -t "$TRIM" -i "$f" -vf "$vf" -c:v libvpx-vp9 -b:v 0 -crf 33 -an "$OUT/$b.webm" </dev/null 2>/dev/null
  ffmpeg -y -ss 0.8 -i "$f" -vframes 1 -vf "$vf" "$OUT/$b.poster.jpg" </dev/null 2>/dev/null
  [ "${GIF:-0}" = "1" ] && ffmpeg -y -t "$TRIM" -i "$f" -vf "$vf,fps=15,split[a][b];[a]palettegen[p];[b][p]paletteuse" "$OUT/$b.gif" </dev/null 2>/dev/null
done
echo "snippets -> $OUT"
