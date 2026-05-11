---
name: Low End Elite
colors:
  surface: '#121414'
  surface-dim: '#121414'
  surface-bright: '#37393a'
  surface-container-lowest: '#0c0f0f'
  surface-container-low: '#1a1c1c'
  surface-container: '#1e2020'
  surface-container-high: '#282a2b'
  surface-container-highest: '#333535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#d3c5ae'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#2f3131'
  outline: '#9b8f7a'
  outline-variant: '#4f4634'
  surface-tint: '#f6be39'
  primary: '#f6be39'
  on-primary: '#402d00'
  primary-container: '#d4a017'
  on-primary-container: '#503a00'
  inverse-primary: '#795900'
  secondary: '#c8c6c8'
  on-secondary: '#313032'
  secondary-container: '#474649'
  on-secondary-container: '#b7b4b7'
  tertiary: '#c8c6c8'
  on-tertiary: '#303032'
  tertiary-container: '#a9a7aa'
  on-tertiary-container: '#3d3d3f'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdfa0'
  primary-fixed-dim: '#f6be39'
  on-primary-fixed: '#261a00'
  on-primary-fixed-variant: '#5c4300'
  secondary-fixed: '#e5e1e4'
  secondary-fixed-dim: '#c8c6c8'
  on-secondary-fixed: '#1c1b1d'
  on-secondary-fixed-variant: '#474649'
  tertiary-fixed: '#e4e2e4'
  tertiary-fixed-dim: '#c8c6c8'
  on-tertiary-fixed: '#1b1b1d'
  on-tertiary-fixed-variant: '#474649'
  background: '#121414'
  on-background: '#e2e2e2'
  surface-variant: '#333535'
typography:
  headline-xl:
    fontFamily: Space Grotesk
    fontSize: 84px
    fontWeight: '700'
    lineHeight: 90px
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 52px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 38px
    letterSpacing: 0em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.15em
spacing:
  base: 8px
  section-gap: 160px
  gutter: 24px
  container-max: 1200px
---

## Brand & Style

This design system centers on the concept of "The Master’s Stage"—a space that feels both exclusive and instructional. The visual narrative is built on the intersection of professional authority and the physical precision of a bass guitar. It utilizes a **Minimalist-Tactile** hybrid style: the layout remains clean and spacious to reflect professional growth, while the details (textures, lines, glows) provide a high-end sensory experience.

The aesthetic avoids the "rock-and-roll" clutter of typical music events in favor of a sophisticated, editorial approach. It targets serious musicians looking for direction, using negative space to emphasize the weight of the content. Every element should feel intentional, mimicking the tension and clarity of a perfectly tuned string.

## Colors

The palette is strictly limited to maintain a premium atmosphere. 

- **Primary (Gold):** Used sparingly for high-impact highlights, calls to action, and "glow" states. It represents the "standard" of excellence.
- **Secondary (Black):** The foundation. It is deep and near-neutral, providing the infinite depth required for negative space.
- **Tertiary (Deep Charcoal):** Used for subtle layering, such as card backgrounds or container divisions, to prevent the UI from feeling "flat."
- **Neutral (White):** Reserved exclusively for high-readability text and thin, structural line work.

Gradients should be used only as radial "soft glows" behind key elements to simulate a spotlight on a stage.

## Typography

This design system uses a high-contrast typographic scale to establish authority. 

**Headlines** utilize **Space Grotesk** to provide a technical, modern feel that mirrors the precision of musical intervals. Large headlines should be set with tight letter spacing for maximum impact. 

**Body text** uses **Inter** for its systematic clarity and neutral tone, ensuring that instructional content is easily digestible. 

**Label Caps** are used for secondary navigation or "eyebrow" text above headers, acting as markers throughout the user journey.

## Layout & Spacing

The layout follows a **Fixed 12-Column Grid** with generous vertical spacing. 

- **Negative Space:** Use massive top and bottom margins (160px+) between sections to allow content to "breathe," simulating the quiet before a performance.
- **Rhythm:** Spacing should be based on a strictly linear 8px scale.
- **Visual Strings:** Incorporate thin (1px) vertical or horizontal lines that span the full width of containers. These represent bass strings and act as subtle dividers between content blocks.
- **Alignment:** Content should be primarily center-aligned or strictly left-aligned to create a sense of formal direction.

## Elevation & Depth

Depth is conveyed through light and texture rather than heavy shadows.

- **Fretboard Markers:** Small, circular dots or rectangular "inlays" (Gold or White) should be used to denote active states or bullet points, mimicking a bass guitar neck.
- **Golden Glows:** Use low-opacity radial gradients (#D4A017 at 10-15%) behind featured artists or CTA buttons. This creates a "halo" effect that pulls elements forward without using drop shadows.
- **Tonal Layering:** Use slight variations in background darkness (Secondary to Tertiary) to distinguish between the main canvas and interactive card elements.
- **Grainy Texture:** Apply a very subtle noise overlay (2-3% opacity) to the entire background to give the dark surfaces a premium, matte-black finish.

## Shapes

The shape language is **Sharp (0px)**. 

To maintain an atmosphere of professional authority and technical rigor, UI elements—including buttons, input fields, and images—should have perfectly square corners. This architectural approach avoids the "friendliness" of rounded corners in favor of a look that feels more structured, serious, and high-end. 

Horizontal rules and dividers must be razor-thin (0.5px to 1px) to maintain the minimalist aesthetic.

## Components

- **Primary Buttons:** Solid Gold (#D4A017) with Black (#0B0B0D) text. Sharp corners. On hover, the button should trigger a soft golden outer glow.
- **Secondary Buttons:** Transparent with a 1px White border and White text.
- **Cards:** Background color #1A1A1C. No shadows. Use thin 1px borders in a slightly lighter grey or gold for "featured" content.
- **Fretboard Lists:** Bullet points are replaced with small circular gold inlays.
- **String Dividers:** Use 4 or 5 parallel horizontal lines (varying slightly in weight) to transition between major landing page sections.
- **Input Fields:** Bottom-border only (1px White), creating a minimalist, "notation-paper" appearance.
- **Event Chips:** Small, rectangular tags with Gold text and a subtle 1px Gold border, used to indicate event categories or levels (e.g., "ADVANCED").