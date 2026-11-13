# Restore snow animation (exact as of removal)

Saved copy of the component: `_saved/Snow.tsx`  
Live component path (kept in place, unused): `../Snow.tsx`

These two files should match. If `../Snow.tsx` was changed later, restore from `_saved/Snow.tsx` first:

```bash
cp src/components/_saved/Snow.tsx src/components/Snow.tsx
```

## 1. Hero.tsx

Add the import with the other component imports:

```tsx
import { Snow } from "./Snow";
```

Inside the hero `<section id="home">`, after the video overlay div and before the logo/content wrapper, add:

```tsx
        <Snow />
```

(Previously placed after `<div className="absolute inset-0 bg-black/20" />` and before the `relative z-10` content div.)

## 2. Footer.tsx

Add the import at the top:

```tsx
import { Snow } from "./Snow";
```

Inside the `<footer>` (which should remain `className="relative ..."`), as the first child, add:

```tsx
      <Snow />
```

(Previously placed immediately before `<div className="container mx-auto px-4 relative z-10">`.)
