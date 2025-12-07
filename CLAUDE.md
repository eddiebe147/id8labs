# ID8Labs Codebase Guidelines

## Canvas Safety (CRITICAL)

When using HTML5 Canvas with `ctx.arc()` or `ctx.createRadialGradient()`:

**ALWAYS ensure radius values are positive.** Negative radii cause `IndexSizeError` and crash the site.

### Common Causes of Negative Radii
1. **3D Perspective projections**: `scale = fov / (fov + z)` becomes negative when `z < -fov`
2. **Resize race conditions**: Dimensions are 0 before window dimensions are set
3. **Division by zero**: `y / rows` when `rows = 0`
4. **Interpolation edge cases**: Lerping between values can produce unexpected results

### Required Pattern
```typescript
// WRONG - can crash
ctx.arc(x, y, radius, 0, Math.PI * 2)

// RIGHT - always safe
ctx.arc(x, y, Math.max(0.1, radius), 0, Math.PI * 2)

// OR use the utility
import { safeArc, safeRadius } from '@/utils/canvas-safety'
safeArc(ctx, x, y, radius, 0, Math.PI * 2)
```

### Files with Canvas Rendering
- `components/foundation/neural-network-bg.tsx` - 3D neuron visualization
- `components/LEDHalftoneBackground.tsx` - Halftone dot pattern
- `components/DotGradient.tsx` - Flowing dot matrix
- `components/GlobalDotMatrix.tsx` - Wave simulation
- `components/InteractiveLake.tsx` - Interactive waves

## Project Structure

- `/app` - Next.js App Router pages
- `/components` - React components
- `/components/foundation` - Core visual components (backgrounds, etc.)
- `/utils` - Utility functions including canvas-safety.ts
- `/content` - MDX essays and content

## Deployment

Site deploys to Vercel on push to `main`. Use feature branches for development.
