# Equipment gallery: maintenance and visual standards

This is the source of truth for adding or changing equipment on [the equipment page](https://bogdanpascal.com/filmmaker/equipment/). Follow these rules for every future item. Preserve the existing layout when adding products.

## Where to edit

| Purpose | File |
| --- | --- |
| Equipment names, descriptions, quantities, order, and image paths | `filmmaker/equipment/index.html` |
| Grid, card size, image frame, typography, theme styles | `filmmaker/css/equipment.css` |
| Horizontal navigation and transparent-image auto-fit | `filmmaker/js/equipment.js` |
| Original committed images and cutouts | `assets/filmmaker/studio/` and `assets/filmmaker/studio/kit/` |
| Shared colors and light/dark theme | `filmmaker/css/folio.css` |

## Non-negotiable layout rules

1. **One consistent layout for every category.** Every category uses `.gear-row`, with equal-width cards, fixed image slots, and left-aligned starting positions. Do not add category-specific centering or smaller cards for cameras and lenses.
2. **Desktop: 4 cards across. Tablet: 2 cards across. Mobile: one swipeable, mostly full-width card.** The rest are accessible by horizontal scrolling and existing previous/next arrows. Do not squeeze all items in one category into the visible width.
3. **Every product lives in the same invisible image frame.** Use `object-fit: contain` and keep the entire physical product visible. No cropping, distortion, stretching, or background boxes.
4. **Products should fill the frame consistently.** The equipment JavaScript measures opaque pixels within PNG transparency and automatically enlarges and centers the subject to approximately 92% of the available frame. This addresses cutouts with large transparent margins. **Do not override individual images with arbitrary CSS width/height or transforms.** Preserve the auto-fit behavior and check unusually shaped items visually.
5. **Consistent captions.** Product name and quantity first, short description beneath. The image slot, name area, description baseline, card gap, and alignment should remain consistent even when names wrap onto extra lines. Long names may wrap; do not shrink the entire card to fit.
6. **Consistent light and dark themes.** Retain the lime accent for quantities in dark mode and a bright lime highlight with readable dark text in light mode. Check text contrast and both themes.
7. **No missing-image layout collapse.** Items without an image may temporarily use the existing `.gear-text` placeholder, which reserves the same media height. Replace it with the image when available.

## Automatic motion and hover interaction

- A category **auto-scrolls only when it contains more than four visible equipment cards**. Count actual visible cards, not card quantities or hidden entries.
- The movement is intentionally slow (currently 19 pixels per second), horizontal, continuous, and infinite: the last card is followed seamlessly by the first with no reverse or visible jump.
- Successive **animated** categories alternate direction. Categories with four or fewer visible cards remain stationary and do not affect the alternation.
- JavaScript duplicates the visible cards as an **aria-hidden visual loop**. Duplicates are not real inventory and must not affect item counts, labels, or future edits. Hidden original cards are never cloned.
- Auto-scrolling pauses when the visitor hovers over the row, focuses it, or interacts manually. Arrows, desktop mouse drag, wheel scrolling, and mobile touch scrolling should remain usable.
- Hovering over a product image produces a subtle **5% zoom**, using the CSS `scale` property so it does not erase the existing transparent-pixel auto-fit transform. Never zoom enough to clip the actual product.
- When the visitor requests **reduced motion**, remove visual loop copies from layout, turn off automatic movement and animated zoom, and leave manual navigation available.
- Scrolling should pause for offscreen categories and background tabs to avoid unnecessary motion and resource use.
- Implement looping behavior in `filmmaker/js/equipment.js`, its visual states in `filmmaker/css/equipment.css`. Do not add per-category animations or duplicate product cards in the HTML.

## Product image rules

- Prefer an accurate image of the **exact listed model**. Never substitute a similar-looking but different piece of equipment. Preserve product shapes, branding, labels, and cables that are genuinely part of the listed item.
- Remove plain backgrounds to genuine **transparent PNG alpha**, with clean edges and no white rectangle. Prefer a single complete product and one cohesive view per card.
- Save images **in this repository**, normally under `assets/filmmaker/studio/kit/`. Do not depend on temporary image-generation URLs or retailer hotlinks.
- Cutouts should be high-resolution enough for desktop and mobile, but sensibly compressed. Avoid huge empty transparent margins in the source, even though the auto-fit system corrects many of them.
- If an item represents a pair or kit and the owner explicitly wants both shown, compose them together **inside one transparent image**. Example: the right-angle HDMI cable card displays two overlapping cables and is labeled `×2`. Do not duplicate the entire equipment card for quantity.
- For a set of the same model in different capacities, keep accurate capacity and quantity labels. Example: SanDisk Portable SSD 1TB, 2TB, and 8TB are separate `×1` entries using the same appropriately matching model image.
- Never crop object edges to make a product appear bigger. If transparency detection or product shape causes a poor visual result, correct the source image or fix the shared fitting logic, then inspect the result visually.

## Temporarily hide a product without deleting it

For an item the owner wants hidden but restorable, keep the complete card and its committed image unchanged. Add `hidden data-temporarily-hidden="true"` to the opening `<li>` (or `<figure>` for camera/lens cards). The browser excludes that card from the visible carousel, while the original markup and image path remain in GitHub. Update the category's displayed `NN / XX ITEMS` count to **visible cards only**. To restore the product, remove those attributes and increase the visible count. Do not delete, rename, or move the original image just because its card is hidden. Check navigation and card positions after changing the visible count.

## Adding one new item

1. Choose the correct category; move an existing card rather than duplicating it.
2. Prepare and inspect the transparent PNG; commit it to `assets/filmmaker/studio/kit/`.
3. Add one `<figure>` with the image, accessible `alt`, a `<strong>` product name and `gear-qty` span, and one concise description. For the support/category carousels, wrap the figure in an `<li>`.
4. Update that section's visible `NN / XX ITEMS` count to match the number of **visible** cards (exclude temporarily hidden entries). **Never** count quantity `×4` as four separate cards.
5. Keep each item in the appropriate equipment category. Do not change category labels or reorder unrelated items without being asked.
6. Preserve existing scroll controls, class names, theme switching, and `noindex, nofollow` on the draft equipment page.
7. When modifying a CSS or JS asset, change the corresponding `?v=` cache-busting version in `filmmaker/equipment/index.html` so live visitors see the update.
8. Commit the code and images together. Verify the GitHub Pages deployment and the live page, not only the GitHub source.

Example for a support section (replace placeholder text and path):

```html
<li>
  <figure>
    <img
      alt="Accurate description of the exact product"
      loading="lazy"
      src="/assets/filmmaker/studio/kit/product-cutout.png"
    />
    <figcaption>
      <strong>Product Name <span class="gear-qty">×1</span></strong>
      <span>Short specification or purpose</span>
    </figcaption>
  </figure>
</li>
```

Cameras and lenses use `<figure>` directly inside their `.gear-row` rather than an `<li>`.

## Visual quality checklist before declaring an update complete

- [ ] On **desktop (around 1440px)**, the first four cards start at the same left edge; images and caption baselines align across Cameras, Lenses, Sound, Grip, Media, and the other categories.
- [ ] On **tablet (around 768px)**, two cards are comfortably readable; horizontal navigation works.
- [ ] On **mobile (around 390px)**, one dominant card is visible with a partial next-card cue; swiping and arrow controls work without horizontal page overflow.
- [ ] **Dark and light modes** both preserve product legibility and highlighted quantities.
- [ ] Any category with **more than four visible cards** smoothly loops without a jump; successive animated rows move in opposite directions. Rows with four or fewer cards do not move.
- [ ] Hovering pauses its row and enlarges only the image by around 5%, without clipping; moving away resumes scrolling. Test arrow navigation, desktop dragging and touch swiping.
- [ ] **Reduced motion** prevents automatic movement and hover animation; the original cards remain available for manual navigation.
- [ ] Inspect actual rendered products, not just CSS: small products with padded transparency are scaled up; wide, tall, grouped, and unusually shaped images stay fully inside the invisible frame.
- [ ] No product is missing a name, image or intentional placeholder, quantity, or description. Images load without broken URLs.
- [ ] No cards are accidentally duplicated or lost; every section count matches its number of visible figures. Temporarily hidden cards remain in the source but do not count toward the displayed total.
- [ ] The deployed live page is visually checked after GitHub Pages reports success. Compare a screenshot before and after when changing layout or image scaling.
- [ ] No em dashes in website text. Keep copy accurate and minimal.

**Important:** The CSS and JavaScript named above implement the layout. This document describes the visual contract for future edits. If implementation and documentation diverge, inspect the actual live behavior, correct it, then update both the code and this guide.
