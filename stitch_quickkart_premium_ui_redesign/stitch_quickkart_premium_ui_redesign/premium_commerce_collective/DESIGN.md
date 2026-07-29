---
name: Premium Commerce Collective
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#414845'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#717974'
  outline-variant: '#c0c8c3'
  surface-tint: '#3c6658'
  primary: '#00241a'
  on-primary: '#ffffff'
  primary-container: '#0d3b2e'
  on-primary-container: '#79a694'
  inverse-primary: '#a3d0be'
  secondary: '#a33e00'
  on-secondary: '#ffffff'
  secondary-container: '#fd6c1a'
  on-secondary-container: '#581e00'
  tertiary: '#371410'
  on-tertiary: '#ffffff'
  tertiary-container: '#512923'
  on-tertiary-container: '#c88f86'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#beedd9'
  primary-fixed-dim: '#a3d0be'
  on-primary-fixed: '#002117'
  on-primary-fixed-variant: '#234e40'
  secondary-fixed: '#ffdbcd'
  secondary-fixed-dim: '#ffb596'
  on-secondary-fixed: '#360f00'
  on-secondary-fixed-variant: '#7c2e00'
  tertiary-fixed: '#ffdad4'
  tertiary-fixed-dim: '#f6b8ae'
  on-tertiary-fixed: '#33110c'
  on-tertiary-fixed-variant: '#673b34'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
typography:
  display-lg:
    fontFamily: Epilogue
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Epilogue
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Epilogue
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-sm:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  section-padding: 80px
---

## Brand & Style

The brand identity transitions from a generic discount marketplace to a premium, curated shopping experience. This design system focuses on trust, sophistication, and a "DTC (Direct-to-Consumer) first" aesthetic that prioritizes clarity over visual noise.

The style is **Corporate / Modern** with a strong leaning toward **Minimalism**. It utilizes high-quality typography and generous whitespace to create a sense of luxury and calm. Surfaces feel tangible yet light, avoiding the dated "boxed" or heavily segmented layouts of traditional e-commerce. The emotional response should be one of confidence, reliability, and effortless discovery.

## Colors

The palette is anchored by a **Deep Emerald** primary color, replacing the previous purple gradients to establish a more grounded and expensive feel. 

- **Primary (#0D3B2E):** Used for key brand moments, primary buttons, and navigation accents.
- **Secondary / Accent (#E85D04):** A vibrant burnt orange used sparingly for "Hot Deals," "Sale" badges, and urgent notifications to provide a sophisticated contrast.
- **Neutral Scale:** A sophisticated range of cool grays and off-whites. Backgrounds should primarily use `#FFFFFF` with `#F8F9FA` used for section differentiation or dashboard "well" backgrounds.
- **Borders:** Subtle `#E9ECEF` outlines maintain structure without adding visual weight.

## Typography

This system uses a pairing of **Epilogue** and **Hanken Grotesk** to balance character with functionality.

- **Headlines:** Epilogue provides a bold, contemporary geometric feel that commands attention in hero sections and product titles.
- **Body & Metadata:** Hanken Grotesk offers exceptional readability and a clean, technical edge for descriptions, prices, and dashboard data.
- **Hierarchy:** Use tight line-heights for large display type to maintain a "lock-up" feel. For body copy, ensure generous line-height (1.5 - 1.6) to enhance the premium, airy aesthetic.

## Layout & Spacing

The layout follows a **Fluid Grid** model with a maximum container width of 1280px to ensure legibility on ultra-wide monitors.

- **Rhythm:** An 8px base unit governs all dimensions.
- **Padding:** Section vertical padding should be aggressive (80px+) to emphasize the premium nature of the content.
- **Grid:** A 12-column system is used for desktop. Product cards should typically span 3 columns (4 per row) or 4 columns (3 per row) depending on the desired density.
- **Mobile:** Transition to a 2-column grid for product feeds with 16px side margins to maximize screen real estate for imagery.

## Elevation & Depth

Hierarchy is established through **Ambient Shadows** and tonal layering rather than heavy borders.

- **Low Elevation:** Used for cards and secondary buttons. A soft, highly diffused shadow: `0px 2px 12px rgba(0, 0, 0, 0.04)`.
- **High Elevation:** Used for active states, hover effects, and modals. A deeper, more dramatic shadow: `0px 12px 32px rgba(0, 0, 0, 0.08)`.
- **Hover States:** Instead of simple color changes, components should "lift" slightly (Y-axis translation) and increase shadow depth to feel tactile.

## Shapes

The shape language is consistently **Rounded**, reflecting a modern and approachable premium feel.

- **Standard Radius:** 12px for cards, input fields, and large buttons.
- **Large Radius:** 24px for featured hero containers and banners.
- **Pill Shapes:** Used exclusively for tags (e.g., "Best Seller", "New") and specific action buttons to provide visual variety.

## Components

### Product Cards
Cards are borderless with a white background and a soft shadow. The product image occupies the top 70% of the card with a slight 0.5px neutral-200 inset border to define the image edges against white backgrounds. Price is displayed in Epilogue bold for prominence.

### Stat Panels (Dashboard)
Stat panels use a "Well" style—light gray background (#F8F9FA) with no shadow, or a white background with a shadow. Icons within panels should be monochrome using the Primary color or a muted version of it.

### Navbar
The navbar is strictly minimal. It uses a high-contrast logo on the left, centered search with a 12px radius and a subtle background tint, and utility icons on the right. Hover states on nav items use a subtle underline or a faint background pill shape (20% opacity of primary color).

### Buttons
- **Primary:** Solid Deep Emerald with white text. 12px radius. 
- **Secondary:** Transparent with a 1px border (#0D3B2E). 
- **Ghost:** No border, text-only with a subtle background hover effect.

### Input Fields
Inputs use a light gray fill (#F8F9FA) with a 1px border that darkens on focus. Labels are always placed above the field in `label-sm`.