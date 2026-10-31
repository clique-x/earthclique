# earthclique.in

The EarthClique website: IT solutions and digital services from Shop 209, SIDCUL, Haridwar.

- **Stack:** Next.js 16 (App Router, static export of one page), React 19, Tailwind v4 for the reset, Three.js + React Three Fiber for the 3D peak, GSAP + ScrollTrigger for scroll motion, Lenis for smooth scrolling. Manrope is self-hosted from `public/fonts`.
- **Brand book:** teal `#0E6B76`, deep teal `#0B2E33`, coral `#EE5A3C` for accents only, white base. Tokens live at the top of `src/app/globals.css`.
- **Hero:** the "e" of the logo with a live, procedurally generated Himalayan peak inside its bowl. Drag to turn it; the sun follows the real time of day in Haridwar (IST). Devices without WebGL, low-end GPUs or data-saver mode fall back to the flat mark.

## Run it

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build && pnpm start
```

Useful query strings while testing: `?hour=6.5` forces the time of day in the hero, `?quality=full|lite|static` forces the 3D tier.

## Edit content

Everything written on the page (services, hours, phone numbers, links, copy) is in `src/content.ts`.

## Pictures

The four peak stills in `public/pictures` were rendered from the site's own 3D scene at dawn, midday, dusk and night. Replace them with real photographs of the shop and the team when you have them; keep the file names and the page needs no other change.

## Deploy

Any static host works. On Vercel: import the repository, framework preset Next.js, no environment variables. Point `earthclique.in` at the deployment and keep `links.earthclique.in` as it is.
