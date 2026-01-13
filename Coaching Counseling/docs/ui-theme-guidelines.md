# UI Theme Guidelines

## Design Principles
- **Minimalist**: Favor spacious layouts, limited color usage, and purposeful typography.
- **Modern**: Utilize soft gradients, rounded corners, and subtle motion to convey polish without distraction.
- **Intuitive**: Maintain clear hierarchy, consistent iconography, and predictable interactions for rapid comprehension.
- **Accessible**: Ensure WCAG AA contrast, scalable typography, and keyboard-friendly navigation.

## Color Palette
- **Primary Brand** `#3E90E6` (Brand 500)
- **Primary Gradient** `#3E90E6 → #5AD1E0` for hero banners and call-to-action backgrounds.
- **Neutrals**
  - Background 1: `#F7F9FB`
  - Background 2: `#FFFFFF`
  - Border/Subtle: `#E2E8F0`
  - Text Primary: `#1A202C`
  - Text Secondary: `#4A5568`
- **Accent** `#6C5CE7` (secondary actions, highlights)
- **Feedback**
  - Success: `#22C55E`
  - Warning: `#F59E0B`
  - Danger: `#EF4444`

## Typography
- **Heading Font** `Inter` (fallback: `system-ui`)
- **Body Font** `Inter`
- **Weights**: 300 (light), 500 (medium), 600 (semibold)
- **Scale**: Use Chakra UI `xl` ramp with custom adjustments: `4xl` for hero, `2xl` section titles, `lg` card titles, `md` body.

## Elevation & Surfaces
- **Card Shadow**: `0px 20px 45px rgba(34, 65, 120, 0.08)`
- **Border Radius**: `16px` for cards/modals, `12px` for inputs/buttons, `8px` for chips.
- **Glassmorphism Accent**: Optional overlay with `rgba(255, 255, 255, 0.65)` and backdrop blur for hero widgets.

## Components
- **Buttons**: Primary uses gradient background with subtle hover lift (`transform: translateY(-1px)`); secondary outlined with brand color; tertiary as ghost button for low emphasis.
- **Navigation**: Left rail (collapsed/expanded) with icons; top bar for global search and profile actions. Maintain consistent active indicator (pill highlight).
- **Cards**: Include icon, title, short description, CTA. Use neutral background, accent stripe at top to differentiate modules.
- **Charts & Analytics**: Soft gradients, rounded bars, 2px border for highlighted data points. Avoid harsh gridlines; use light `#EDF2F7`.

## Motion
- **Transition Duration**: 150–200ms ease-out for hover/focus; 250ms ease-in-out for modals/drawers.
- **Micro-interactions**: Icon subtle rotation or scale on hover (<1.03). Keep animations purposeful and performant.

## Imagery & Iconography
- Use simple duotone illustrations or line icons reflecting coaching, study, and collaboration themes.
- Maintain consistent stroke width and corner radius across icons.

## Responsive Guidelines
- **Mobile**: Utilize stacked layouts, bottom sheet navigation for key actions.
- **Tablet/Desktop**: Employ modular grid (12-column) with responsive spacing: `24px` desktop gutters, `16px` tablet, `12px` mobile.

## Implementation Notes
- Extend Chakra theme in `apps/web/app/providers.tsx` with palette above (`brand` shades `50-900`).
- Create reusable components (`HeroSection`, `StatCard`, `NavigationRail`) to enforce consistency.
- Add global CSS variables for gradient and shadow tokens for reuse outside Chakra when necessary.
