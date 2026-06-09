# Swapbook Cinematic Film — Implementation Plan

## Blocked: Edit permissions denied. User must grant edit access to proceed.

## Build Order

### Phase 1: Restore PDP build dependencies (8 files)

**Directory:** `components/products/pdp/swapbook/`
**Files to create:**
1. `SwapbookHero.tsx` — Hero section with product image + title
2. `ChassisSection.tsx` — Chassis/material details
3. `PerformanceSection.tsx` — CPU/GPU/RAM specs
4. `CoolingSection.tsx` — Thermal system
5. `DisplaySection.tsx` — Display specs
6. `KeyboardSection.tsx` — Keyboard/RGB details

**Directory:** `components/products/pdp/`
7. `SwapbookPDP.tsx` — Main PDP component (imports all above, ConfiguratorSection already exists)

### Phase 2: Restructure film architecture

**Delete (9 files):**
- `components/swapbook/Prologue.tsx`
- `components/swapbook/Chapter_01_Who.tsx`
- `components/swapbook/Chapter_02_Why.tsx`
- `components/swapbook/Chapter_03_What.tsx`
- `components/swapbook/Chapter_04_How.tsx`
- `components/swapbook/Chapter_05_Why.tsx`
- `components/swapbook/Epilogue.tsx`
- `components/swapbook/ProductScene.tsx`
- `components/swapbook/SwapbookFilm.tsx`

**Create (4 files):**
- `components/swapbook/Film.tsx` — Orchestrator
- `components/swapbook/ThreeScenes.tsx` — WebGL
- `components/swapbook/MotionCanvas.tsx` — Canvas + SVG
- `components/swapbook/VideoSequencer.tsx` — Scroll video

### Phase 3: Build each file

#### Film.tsx (~180 lines)
- Lenis setup (duration: 1.8, smooth wheel)
- GSAP ScrollTrigger integration
- Scene active state tracking
- Audio: ambient-loop.mp3 with GainNode envelope per scene
- Body class management
- Scene mounting/unmounting for performance

```tsx
// Structure:
export default function SwapbookFilm() {
  // Lenis setup
  // GSAP ticker → Lenis
  // Scene definitions
  // Audio context setup
  // Render scenes conditionally
}
```

#### ThreeScenes.tsx (~350 lines) — 4 WebGL scenes

**Scene 1: Atmosphere Particles**
```
- R3F Canvas (full viewport, absolute positioned)
- Points geometry, 2000 particles
- Color palette: amber (#F27D26) → deep navy (#0a0a1a)
- useFrame for slow rotation + mouse tracking
- Particle positions drift upward, recycle at bottom
- Uniform: uTime, uMouse, uScroll
```

**Scene 2: Laptop Reveal (Scene 4 of film)**
```
- R3F Canvas
- Group containing:
  - PlaneGeometry with S1 PNG texture (alphaTest: 0.5)
  - Positioned in 3D space with perspective
  - Rim lights (key + fill + accent)
- Particles coalescing into laptop form
- Slow Y-axis rotation (idle)
- Scroll drives Z position (camera pull-back/push-in)
- Environment map for reflections on chassis edges
```

**Scene 3: X-Ray Thermal (Scene 5 of film)**
```
- R3F Canvas with custom shader material
- Laptop mesh with transparent wireframe overlay
- GPU/CPU hotspots as point lights that intensify
- Canvas-based heat map texture mapped onto laptop
- Cursor proximity creates heat bloom
- Scroll controls overall temperature
```

**Scene 4: Portal (Scene 7 of film)**
```
- R3F Canvas with full-viewport plane
- Custom fragment shader:
  - Radial gradient from center
  - Color cycling: warm white → amber → blue
  - Noise-based distortion
- Scroll controls portal opening radius
- Auto-pulse animation idling
```

#### MotionCanvas.tsx (~250 lines) — 3 Canvas/SVG scenes

**Scene A: Material Textures (Scene 2 of film)**
```
- HTML Canvas (full viewport)
- Brushed metal noise algorithm perlin-style
- SVG path morphs for surface details
- Scroll drives texture layer blending
- Draw loop: requestAnimationFrame
```

**Scene B: Blueprint Engineering (Scene 3 of film)**
```
- HTML Canvas
- Line drawing system: endpoints connected by GSAP-animated dashes
- SVG floating annotation nodes
- Auto-transition: 2D lines elevate into isometric 3D wireframe
- Grid background with perspective
- GSAP controls the drawing speed per scroll position
```

**Scene C: Thermal Visualization (Scene 5 overlay)**
```
- HTML Canvas overlay on Three.js scene
- Heat map gradient rendered from simulated data points
- GSAP-driven particle flow representing airflow
- Color ramp: cool (blue) → warm (yellow) → hot (red)
```

#### VideoSequencer.tsx (~80 lines) — Scene 6

```tsx
export default function VideoSequencer({ scrollProgress }: { scrollProgress: number }) {
  // HTML5 Video element
  // currentTime driven by scrollProgress * video.duration
  // Preload: metadata only
  // Plays: swapbook-scrub.mp4
  // currentTime mapping with eased scroll
}
```

### Phase 4: Scene Orchestration in Film.tsx

```
Scroll positions (estimated):
  0%–12%:  Scene 1 — Atmosphere (Three.js particles)
  12%–25%: Scene 2 — Material (Canvas textures + SVG)
  25%–37%: Scene 3 — Blueprint (Canvas lines → SVG)
  37%–55%: Scene 4 — Reveal (Three.js laptop)
  55%–67%: Scene 5 — X-Ray/Thermal (Three.js + Canvas)
  67%–80%: Scene 6 — Assembly (Video scrub)
  80%–90%: Scene 7 — Portal (Three.js shader)
  90%–100%: Scene 8 — Human (Video + SVG typography)
```

Each scene renders conditionally based on scroll range, with transition zones between them.

### Phase 5: Transitions

Each scene → next uses a different technique:
1→2: Particles fade → Canvas texture crossfade
2→3: SVG morph lines bloom → blueprint grid
3→4: Blueprint lines erupt upward → camera pulls back to 3D laptop
4→5: Laptop fades to wireframe → x-ray overlay
5→6: Thermal fades out → first frame of video
6→7: Zoom into bright part of video → portal light blooms
7→8: Light flood-fills screen → washes to ambient workspace

### Phase 6: Update page.tsx

```tsx
// app/swapbook/page.tsx
"use client";
import dynamic from "next/dynamic";
const SwapbookFilm = dynamic(() => import("@/components/swapbook/Film"), { ssr: false });
export default function SwapbookPage() { return <SwapbookFilm />; }
```

### Phase 7: Verify

Run `npm run build`. Expect:
- Compilation succeeds
- Pre-existing TS error in `app/collaborate/page.tsx:121` (unrelated, Icon never type)

---

## Tech Usage Summary

| Technology | Where |
|-----------|-------|
| Three.js/R3F | Scenes 1 (particles), 4 (laptop), 5 (x-ray), 7 (portal) |
| Canvas 2D | Scenes 2 (material), 3 (blueprint), 5 overlay (thermal) |
| SVG | Scene 2 (surface morph), Scene 3 (annotations), Scene 8 (typography) |
| Video | Scene 6 (scroll-scrubbed assembly) |
| GSAP | All scroll triggers, line drawing, transitions, text reveals |
| Lenis | Smooth scroll throughout |
| Web Audio | Ambient loop with scene-based envelope |
