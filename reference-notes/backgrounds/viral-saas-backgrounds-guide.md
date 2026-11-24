# Skill: Modern Viral SaaS Animated Backgrounds

When asked to create "viral SaaS backgrounds," reproduce one of the two exact architectures below (1920x1080, 30 fps, pure black `#000000` canvas). Preserve the exact effect order—reordering blurs and distortions breaks the look.

---

## Background 1: Twisted Flowing Light Ribbon ("BG-1")
**Visual signature:** A glowing, S-curved diagonal ribbon of warm light that flows continuously through a dark frame, with subtle film grain and optical lens curvature.

### 1. Geometry & Gradient
- Create a centered **Ellipse** shape layer.
- Apply **Layer Styles > Gradient Overlay**:
  - **Style:** `Radial`
  - **Colors:** Orange (`#FF9D00`) to Yellow (`#FFE500`)
- Move the circle to the bottom half of the frame.
- Duplicate it, stack it directly above the first circle, and **invert the gradient stops** so the two circles contrast where they meet.
- Select both circles, duplicate them, and stack the pair directly above (4 stacked radial-gradient circles total in a vertical column).

### 2. Animation
- Create a **Null Object** and parent all 4 circles to it.
- Animate the Null's **Y Position** downward over several seconds so the stacked orbs glide smoothly through the frame.

### 3. Adjustment Layer Stack (Strict Top-to-Bottom Order)
1. **Fast Box Blur:** Blur Radius `4.0`, Iterations `3`, Repeat Edge Pixels `On`
2. **Directional Blur:** Direction `45.0°`, Blur Length `400.0` (stretches circles into diagonal light streaks)
3. **Twirl:** Angle `30.0°`, Twirl Radius `30.0`, Center `960, 540` (creates the S-curve twist)
4. **CC Lens:** Center `960, 540`, Size `150.0`, Convergence `100.0` (adds 3D optical warp)
5. **Transform:** Uniform Scale `150.0%` (crops warped edges cleanly)
6. **Noise:** Amount `12.0%`, Use Color Noise `On`, Clip Result Values `On` (eliminates gradient banding)
7. **Deep Glow 2** *(or standard Glow)*: Mode `Exponential`, Blend `Screen`, Radius `500.0`, Exposure `0.30`

---

## Background 2: Ambient Horizon Wave Glow ("BG-2")
**Visual signature:** A soft, breathing horizon of undulating neon light rising from the bottom edge of a pitch-black screen.

### 1. Wavy Base Shape
- Draw a wide **Rectangle** covering the bottom half of the frame (extending past the left/right edges).
- Add **Wiggle Paths** to the shape:
  - **Size:** `200.0`
  - **Detail:** `2.0`
  - **Points:** `Smooth`
  - **Wiggles/Second:** `0.6`
  - **Correlation:** `50%`

### 2. Organic Motion & Multi-Point Color (On Shape Layer)
- **Turbulent Displace:**
  - Displacement: `Turbulent`, Amount: `25.0`, Size: `200.0`, Complexity: `1.0`
  - **Evolution Expression:** `time*250`
- **4-Color Gradient:**
  - **Point 1:** `#00FFD8` (Mint Cyan) — Position expression: `wiggle(1,50)`
  - **Point 2:** `#006BFF` (Electric Blue) — Position expression: `wiggle(1,80)`
  - **Point 3:** `#00FFE6` (Bright Aqua) — Position expression: `wiggle(1,60)`
  - **Point 4:** `#005CFF` (Deep Azure) — Position expression: `wiggle(1,70)`
  - Blend: `100.0`, Jitter: `0.0%`

### 3. Adjustment Layer Stack (Strict Top-to-Bottom Order)
1. **Gaussian Blur:** Blurriness `500`–`600` (start around `850` and dial back until the wave contour softly reads), Repeat Edge Pixels `On`
2. **Glow:**
   - Threshold: `60.0%`, Intensity: `0.2`, Composite Original: `Behind`, Operation: `Add`
   - **Glow Radius:** Base `500.0` with expression `wiggle(1,140)` (creates a subtle breathing pulse)
- Nudge the rectangle's Y position slightly downward so the light pools along the bottom edge.

---

## Universal Recoloring & Implementation Rules
- **Instant Color Themes:** Add a top-level **Hue/Saturation** adjustment layer (below text, above background) and rotate **Master Hue** to shift palettes (e.g., Cyan/Blue -> Purple/Magenta -> Orange/Yellow) without touching individual color stops.
- **When outputting for Web (HTML/CSS/WebGL/React/Remotion):**
  - For **BG-1**, use a WebGL/GLSL fragment shader (or SVG filter chain) that replicates the 4 scrolling radial circles -> 45° directional blur -> central twirl distortion -> barrel/lens warp -> 1.5x zoom -> 12% dithering noise -> additive bloom.
  - For **BG-2**, animate a low-frequency sine/simplex wave polygon along the bottom 45% of the viewport filled with a 4-point moving mesh gradient, then apply a heavy blur (`filter: blur(120px+)`) and a pulsing additive glow.