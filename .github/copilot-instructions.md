# Marx-AI Landing Page: AI Assistant Instructions

## Project Overview
This is a philosophical interactive landing page exploring the intersection of Karl Marx's theories and artificial intelligence. Built as a smooth-scrolling, animation-heavy single-page React application with GSAP animations and Tailwind CSS styling.

**Key Features:**
- Educational landing page with scroll-triggered animations
- **Contradiction 4.0**: Interactive minigame simulating Marx's dialectical materialism (LLSX vs QHSX)
- Character-driven storytelling through "Mentor Marx" guide system

## Architecture Patterns

### Component Structure
- **Sections**: Main page sections (`src/sections/`) - `HeroSection`, `FlavorSection`, `NutritionSection`, `GameSection`, etc.
- **Components**: Reusable UI components (`src/components/`) - `FlavorSlider`, `Navbar`, `ClipPathTitle`, `GameLaunchButton`
- **Game**: Minigame system (`src/game/`) - `Contradiction40Game`, `GameLevel`, `MentorMarx`, `GameData`
- **Constants**: Centralized data (`src/constants/index.js`) - flavor lists, testimonial cards, nutrients

### GSAP Animation System
- All animations use GSAP with ScrollTrigger for scroll-based interactions
- `useGSAP()` hook from `@gsap/react` for proper React integration
- ScrollSmoother creates site-wide smooth scrolling with `smooth: 3, effects: true`
- Register plugins in `App.jsx`: `gsap.registerPlugin(ScrollTrigger, ScrollSmoother)`

### Responsive Design Strategy
- Uses `react-responsive` for breakpoint detection: `useMediaQuery({ query: "(max-width: 768px)" })`
- Mobile/tablet/desktop specific animations and layouts
- Key breakpoints: 768px (mobile), 1024px (tablet)

## Theming & Color System

### Communist-AI Color Palette
Defined in `src/index.css` using CSS custom properties:
- **Communist Red**: `#993140` (primary brand)
- **Deep Black**: `#050001` (backgrounds)  
- **Revolutionary Gold**: `#FFD700` (accents)
- **Cyber Blue**: `#00D4FF` (AI theme)
- **Neural Green**: `#00FF88` (tech accents)
- **Cream White**: `#FFF8DC` (text/contrast)

### Font Strategy
- Headlines: `Antonio` (Google Fonts)
- Body text: `ProximaNova` (local OTF file)
- Utility classes: `.general-title`, `.paragraph-line`

## Key Development Patterns

### Animation Implementation
```jsx
useGSAP(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".selector",
      start: "top center",
      end: "bottom center", 
      scrub: true,
    },
  });
  tl.to(".element", { property: value });
});
```

### Data-Driven Components
Components consume arrays from `constants/index.js`:
- `flavorlists` - themed sections with colors and rotations
- `cards` - testimonial data with videos and images
- `nutrientLists` - stats display data

### Responsive Animation Logic
```jsx
const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
if (!isMobile) {
  // Desktop-only animations
}
```

## Asset Organization
- **Videos**: `public/videos/` - background videos and testimonials
- **Images**: `public/images/` - backgrounds, portraits, icons, SVGs
- **Fonts**: `public/fonts/` - ProximaNova typeface files

## Development Workflow

### Essential Commands
```bash
npm run dev     # Development server with hot reload
npm run build   # Production build with Vite
npm run lint    # ESLint checking
```

### Build Configuration
- **Vite**: Modern build tool with React and Tailwind plugins
- **ESLint**: Modern flat config with React hooks rules
- **Tailwind CSS**: v4 with Vite plugin integration

## Critical Integration Points

### GSAP + React
- Always use `useGSAP()` hook for animations
- Register plugins before using: `gsap.registerPlugin(ScrollTrigger, ScrollSmoother)`
- Clean up animations automatically handled by hook

### Scroll Architecture
- App-level ScrollSmoother wraps all content in `#smooth-wrapper` and `#smooth-content`
- Section-level ScrollTrigger animations pin and transform elements
- Mobile devices often skip complex scroll animations for performance

### Theme Integration
- Tailwind config embedded in CSS file using `@theme` directive
- Color variables bridge between CSS custom properties and Tailwind classes
- Legacy color mappings maintain backwards compatibility

## Common Gotchas
- GSAP SplitText requires proper text element structure for character animations
- ScrollTrigger `scrub` animations need careful `start`/`end` calculations
- Mobile scroll performance requires conditional animation loading
- Asset paths use `/public` directory structure (`/images/`, `/videos/`)
- Game state management requires careful transitions between menu/levelSelect/playing/completed states
- Framer Motion animations should complement (not conflict with) GSAP scroll animations