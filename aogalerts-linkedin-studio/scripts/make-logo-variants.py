#!/usr/bin/env python3
# SETTINGS
# Crop and recolor rules for the AOG Alerts logo variants.
# Edit this block to regenerate the white reverse and the tail marks.
SETTINGS = {
    "source": "logos/aog-alerts-logo.png",
    "white": "logos/aog-alerts-logo-white.png",
    "tail": "logos/aog-alerts-tail.png",
    "tail_white": "logos/aog-alerts-tail-white.png",
    # Tail swoosh only. The wordmark starts near y=407 on the 1200x539 logo.
    "tail_crop": (116, 0, 1075, 396),
    "red_min": 70,
    "red_ratio_g": 1.75,
    "red_ratio_b": 1.55,
    "red_gap": 55,
}

from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]


def is_red(r, g, b):
    return (
        r >= SETTINGS["red_min"]
        and r > g * SETTINGS["red_ratio_g"]
        and r > b * SETTINGS["red_ratio_b"]
        and (r - g) > SETTINGS["red_gap"]
    )


def white_reverse(src):
    out = Image.new("RGBA", src.size)
    sp = src.load()
    dp = out.load()
    w, h = src.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = sp[x, y]
            if a == 0:
                dp[x, y] = (0, 0, 0, 0)
            elif is_red(r, g, b):
                dp[x, y] = (r, g, b, a)
            else:
                dp[x, y] = (255, 255, 255, a)
    return out


def main():
    src = Image.open(ROOT / SETTINGS["source"]).convert("RGBA")
    white = white_reverse(src)
    box = SETTINGS["tail_crop"]
    white.save(ROOT / SETTINGS["white"])
    src.crop(box).save(ROOT / SETTINGS["tail"])
    white.crop(box).save(ROOT / SETTINGS["tail_white"])
    print("wrote", SETTINGS["white"], SETTINGS["tail"], SETTINGS["tail_white"])


if __name__ == "__main__":
    main()
