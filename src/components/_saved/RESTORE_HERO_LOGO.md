# Restore hero logo (exact as of removal)

Image file (left in place): `public/images/hero/6SC Logo SIMPLE.png`  
Live component: `../Hero.tsx`

## 1. Hero.tsx import

Add this import at the top of `src/components/Hero.tsx` (it was the only `motion` use):

```tsx
import { motion } from "motion/react";
```

## 2. Logo markup

Inside the hero content wrapper (`relative z-10 flex h-full w-full flex-col items-center px-4`), as the first child, before `{isDesktop ? ctaButtons : null}`, replace the restore comment with:

```tsx
          <motion.img
            src="/images/hero/6SC%20Logo%20SIMPLE.png"
            alt="a 6 String Christmas"
            className="h-auto drop-shadow-2xl"
            style={{
              width: isDesktop
                ? "min(78vw, 760px)"
                : isLandscape
                  ? "min(46vw, 280px)"
                  : "min(88vw, 460px)",
              maxWidth: "100%",
              // Desktop matches the latest push: marginTop auto, marginBottom 1.5rem,
              // sitting above the in-flow CTA buttons. Portrait marginBottom is 20px.
              marginTop: isDesktop ? "auto" : 0,
              marginBottom: isDesktop ? "1.5rem" : isLandscape ? 0 : "20px",
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          />
```

Sits in that wrapper, above the desktop CTA buttons. The wrapper uses `justifyContent: flex-end` on desktop and portrait, and `center` in landscape. Desktop is `min(78vw, 760px)` with `marginTop: auto` and `marginBottom: 1.5rem`, the same placement as the latest push. Portrait is `min(88vw, 460px)` in the bottom third of the hero with `marginBottom: 20px`. Landscape stays centered at `min(46vw, 280px)` so the short hero does not clip it. Mobile CTAs stay in the band below the hero.
