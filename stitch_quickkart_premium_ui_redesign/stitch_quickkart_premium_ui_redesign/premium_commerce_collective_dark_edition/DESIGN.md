---
name: Premium Commerce Collective (Dark Edition)
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c0c8c3'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#8a938e'
  outline-variant: '#414845'
  surface-tint: '#a3d0be'
  primary: '#a3d0be'
  on-primary: '#08372b'
  primary-container: '#0d3b2e'
  on-primary-container: '#79a694'
  inverse-primary: '#3c6658'
  secondary: '#c8c6c5'
  on-secondary: '#313030'
  secondary-container: '#474746'
  on-secondary-container: '#b7b5b4'
  tertiary: '#c8c6c6'
  on-tertiary: '#303030'
  tertiary-container: '#343434'
  on-tertiary-container: '#9e9c9c'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#beedd9'
  primary-fixed-dim: '#a3d0be'
  on-primary-fixed: '#002117'
  on-primary-fixed-variant: '#234e40'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#e4e2e1'
  tertiary-fixed-dim: '#c8c6c6'
  on-tertiary-fixed: '#1b1c1c'
  on-tertiary-fixed-variant: '#474747'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-lg:
    fontFamily: Epilogue
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Epilogue
    fontSize: 40px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Epilogue
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  title-md:
    fontFamily: Epilogue
    fontSize: 20px
    fontWeight: '500'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Epilogue
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Epilogue
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: Epilogue
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1440px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style
The design system embodies a "Dark Luxury" aesthetic, pivoting from a traditional premium feel to a sophisticated, nocturnal editorial experience. The target audience consists of high-end curators, luxury retailers, and discerning shoppers who value exclusivity and precision. 

The style is a blend of **Minimalism** and **Glassmorphism**, utilizing deep obsidian surfaces, expansive whitespace (or "darkspace"), and sharp typography to create a sense of quiet authority. The emotional response should be one of prestige, security, and immersive focus. High-quality imagery should be treated with subtle desaturation to harmonize with the dark interface, while the primary emerald accent provides a singular, vibrant focal point for conversion.

## Colors
The palette is centered on a "True Black" foundation to maximize OLED contrast and depth. 
- **Primary Emerald (#0D3B2E):** Reserved strictly for primary call-to-actions, brand marks, and active states. It should feel like a precious stone set against dark velvet.
- **Surface Layering:** Depth is communicated through value shifts rather than shadows. The background is the darkest point, with interactive elements stepping up in lightness (#121212 to #262626).
- **Typography Contrast:** Use #F5F5F5 for headings to ensure maximum legibility for the Epilogue font. Secondary text uses #A1A1A1 to maintain visual hierarchy and reduce eye strain.

## Typography
This design system utilizes **Epilogue** exclusively to maintain a distinctive, geometric editorial character. 
- **Scale:** Bold weight variations are used to compensate for the "glow" effect of light text on dark backgrounds.
- **Readability:** For long-form body text, line height is set to 1.6 to ensure the letterforms remain distinct. 
- **Display:** Large headlines use tighter tracking to create a "locked" and intentional look typical of premium fashion journals.
- **Labels:** Small labels utilize increased letter spacing and uppercase styling to ensure they remain legible at small sizes against dark surfaces.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy on desktop to preserve the editorial composition.
- **Grid:** A 12-column system with generous 24px gutters.
- **Padding:** High-end commerce requires "breathing room." Content blocks should be separated by a minimum of 48px (stack-lg) to avoid visual clutter.
- **Mobile:** Transition to a fluid 4-column grid. Margins compress to 20px, but internal component padding remains generous to ensure touch targets are comfortable and the aesthetic remains "light" despite the dark palette.

## Elevation & Depth
In this dark mode implementation, elevation is achieved through **Tonal Layers** and **Glassmorphism**, avoiding traditional heavy shadows which can appear muddy on black.
- **Tonal Stepping:** Elements closer to the user are lighter. A card sitting on the background (#080808) should be #121212.
- **Backdrop Blur:** Modals and navigation bars use a semi-transparent #1A1A1A with a 20px blur to maintain context of the content beneath while creating a "frosted obsidian" effect.
- **Borders:** Use subtle 1px "inner glows" or borders in #2D2D2D to define element boundaries where tonal contrast is low.

## Shapes
The design system utilizes **Soft** corners to balance the aggressive nature of the dark palette and the geometric sharpness of Epilogue.
- **Standard Elements:** 4px (0.25rem) radius for buttons and input fields to maintain a professional, architectural feel.
- **Large Containers:** 8px (0.5rem) radius for product cards and main containers.
- **Imagery:** Product photography should remain sharp (0px) to contrast with the soft-rounded UI elements, reinforcing the "gallery" feel.

## Components
- **Buttons:** Primary buttons are solid Emerald (#0D3B2E) with white text. Secondary buttons are "Ghost" style with a #2D2D2D border and #F5F5F5 text.
- **Input Fields:** Backgrounds should be #121212 with a 1px border of #2D2D2D. On focus, the border transitions to the Primary Emerald.
- **Cards:** Use a flat #121212 surface. Image containers within cards should have a subtle 5% white overlay to prevent them from "bleeding" into the dark background.
- **Chips:** Small, pill-shaped tags with #1A1A1A backgrounds and #A1A1A1 text, used for categories or filters.
- **Lists:** Separated by thin #1A1A1A horizontal rules. Interactive list items should have a hover state of #1A1A1A.
- **Progress Indicators:** Use the Emerald accent for active states; inactive tracks should be #1A1A1A for high visibility.