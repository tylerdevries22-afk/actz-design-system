#!/usr/bin/env bash
# ONE native pass of the Capacitor app (Q1=C). Run from the actz-may repo root.
# iOS: macOS+Xcode (sim video needs Metal). Android: SDK+emulator/device. Maestro preferred (supports Capacitor).
set -euo pipefail
OUT="${OUT:-./raw}"; mkdir -p "$OUT"
PLATFORM="${1:-auto}"
[ "$PLATFORM" = "auto" ] && { [ "$(uname)" = "Darwin" ] && PLATFORM=ios || PLATFORM=android; }
echo "native pass: $PLATFORM"
npm run build && npx cap sync "$PLATFORM"
if [ "$PLATFORM" = "ios" ]; then
  xcrun simctl boot "${SIM:-iPhone 15 Pro}" || true; open -a Simulator || true
  npx cap run ios --target "${SIM:-iPhone 15 Pro}" & sleep 25
  if command -v maestro >/dev/null; then maestro test capture/flows/georgetown.yaml
  else xcrun simctl io booted recordVideo --codec=h264 --mask=ignored "$OUT/native-ios.mp4" & R=$!; sleep 35; kill -INT $R; fi
else
  npx cap run android & sleep 25
  if command -v maestro >/dev/null; then maestro test capture/flows/georgetown.yaml
  else adb shell screenrecord --time-limit 30 /sdcard/native.mp4 & R=$!; sleep 32; kill -INT $R 2>/dev/null||true; sleep 2; adb pull /sdcard/native.mp4 "$OUT/native-android.mp4"; fi
fi
echo "native pass done -> $OUT"
