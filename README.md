# ID8Labs - Creative AI Showcase

A professional showcase website for ID8Labs featuring a unique 90s VHS aesthetic with warm color palettes.

## Tech Stack

- **Next.js 14** - App Router with Server Components
- **TypeScript** - Strict mode enabled
- **TailwindCSS v4** - CSS-based configuration
- **Framer Motion** - Smooth animations
- **next-themes** - Dark mode support

## Design System

### Color Palettes

#### Light Mode - "Warm Studio"
- Primary bg: `#F5F1E8` (warm cream)
- Secondary bg: `#EAE3D2` (darker cream)
- Primary text: `#2C2416` (warm brown-black)
- Secondary text: `#5C534A` (warm gray)
- Accent: `#FF6B35` (orange)

#### Dark Mode - "VHS Night Vision"
- Primary bg: `#1A1614` (charcoal with red undertone)
- Secondary bg: `#252220` (lighter charcoal)
- Primary text: `#F5F1E8` (warm cream)
- Secondary text: `#B8AEA3` (muted warm gray)
- Accent: `#FF3C38` (vibrant red)

#### RGB Accents (both modes)
- Red: `#FF3C38`
- Green: `#39FF14`
- Blue: `#00D9FF`

### Typography

- **Sans Serif**: Inter
- **Monospace**: IBM Plex Mono

### 90s VHS Aesthetic Features

- **Scan Lines**: Subtle horizontal lines with scrolling animation
- **CRT Glow**: Radial gradient overlay for vintage monitor effect
- **Chromatic Aberration**: RGB offset on hover states
- **Geometric Shapes**: Angular design elements
- **VHS Glitch Effects**: Custom animations for interactive elements

## Getting Started

### Development

```bash
npm run dev
# or
npm run dev -- --turbopack
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

## Project Structure

```
id8labs/
├── app/
│   ├── layout.tsx          # Root layout with theme provider
│   ├── page.tsx            # Homepage
│   └── globals.css         # Design system & VHS effects
├── components/
│   ├── theme-provider.tsx  # Theme context provider
│   └── theme-toggle.tsx    # Dark/light mode toggle
├── lib/
│   ├── hooks/              # Custom React hooks
│   └── utils/              # Utility functions
└── styles/                 # Additional stylesheets
```

## Theme System

The site uses `next-themes` for seamless dark mode switching:

- **Attribute**: `data-theme`
- **Themes**: `light` (default), `dark`
- **Storage**: LocalStorage persistence
- **System**: System preference detection disabled (manual toggle only)

## Using the Design System

### Color Classes

Use Tailwind's color utilities with your custom colors:

```tsx
<div className="bg-bg-primary text-text-primary">
  <span className="text-accent">Accent text</span>
  <span className="text-rgb-red">RGB accent</span>
</div>
```

### VHS Effects

Apply custom VHS effects using utility classes:

```tsx
{/* Chromatic aberration on hover */}
<h1 className="chromatic-hover">Title</h1>

{/* VHS glitch effect */}
<span className="vhs-glitch" data-text="Text">Text</span>

{/* Geometric shapes */}
<div className="geo-square">Content</div>
```

### Animations

Use Framer Motion for smooth animations:

```tsx
import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

## TypeScript Configuration

Strict mode is enabled with additional checks:

- `strict: true`
- `noUnusedLocals: true`
- `noUnusedParameters: true`
- `noFallthroughCasesInSwitch: true`
- `forceConsistentCasingInFileNames: true`

## Deployment

### Vercel (Recommended)

This project is optimized for Vercel deployment:

```bash
npm install -g vercel
vercel
```

Or push to GitHub and connect to Vercel dashboard.

### Environment Variables

No environment variables required for basic deployment.

## Customization

### Changing Colors

Edit CSS variables in `app/globals.css`:

```css
:root {
  --bg-primary: #F5F1E8;
  --accent: #FF6B35;
  /* ... */
}
```

### Adding New Fonts

Update `app/layout.tsx`:

```tsx
import { Your_Font } from "next/font/google"

const yourFont = Your_Font({
  variable: "--font-your-font",
  subsets: ["latin"],
})
```

Then add to globals.css:

```css
@theme inline {
  --font-your-family: var(--font-your-font);
}
```

### Disabling VHS Effects

To remove scan lines and CRT glow, comment out the `body::before` and `body::after` pseudo-elements in `app/globals.css`.

## Performance

- **First Load JS**: ~155 kB
- **Static Generation**: All pages pre-rendered
- **Code Splitting**: Automatic with Next.js
- **Font Optimization**: Google Fonts via next/font
- **Image Optimization**: Built-in Next.js Image component

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

© 2025 ID8Labs. All rights reserved.

## Support

For issues or questions, please open an issue on GitHub or contact the development team.
