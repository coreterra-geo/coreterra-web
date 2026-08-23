# Coreterra Landing Page Redesign Brief

## Objective

Position Coreterra as a calm, technically credible geoengineering consultancy whose work begins with understanding the ground. The landing page should make the relationship between field evidence and engineering decisions immediately legible without inventing services, project outcomes, metrics, or credentials.

## Hero concept

Use `hero-geotechnical-poster.png` as the primary visual anchor. The image stays recognizable as a field investigation scene: a drilling rig and borehole occupy the right side while the darker lake and mountain landscape create quiet negative space on the left. Hero copy sits in that negative space and frames the photograph as a tool for understanding, not as decoration.

Headline: “Understand the ground. Engineer with confidence.” Supporting copy explains that better engineering decisions start with clear knowledge of soil, rock, geology, and site conditions. The CTA invites a project conversation.

## Narrative

The page follows one connected engineering workflow:

`Site Investigation → Data Collection → Analysis → Design & Recommendations`

Each stage is presented as a step in the same chain, with a continuous strata line and directional progression rather than four disconnected service cards. The premise section establishes why this chain matters; the workflow section shows how evidence becomes usable engineering judgment; the closing section turns that understanding into a practical conversation.

## Visual language

- Typography: contemporary sans-serif with a strong, compact display face for headlines and a readable neutral sans-serif for supporting copy.
- Color: charcoal and graphite foundations, weathered stone surfaces, off-white text areas, and a restrained soil-brown accent.
- Spacing: generous editorial margins, narrow reading measure, and deliberate shifts between dark technical panels and warm paper-like sections.
- Imagery: the supplied drilling poster only; no remote stock imagery or assumed project photography.
- Graphics: low-opacity contour/strata lines, coordinate ticks, depth references, and engineering rules used as a coherent system.
- Rhythm: visual-heavy hero, concise premise, technical workflow, capability narrative, evidence/approach panel, direct CTA, and quiet footer.

## Interaction

Use CSS and small React effects only. The hero image gains a subtle scroll-linked scale and pointer depth on fine pointers; content eases upward as the hero leaves the viewport. Sections reveal with a restrained opacity/translate treatment through `IntersectionObserver`. The workflow’s strata line draws in when visible. No scroll hijacking, looping particles, or new animation dependency. `prefers-reduced-motion` disables transform-based motion and keeps content immediately visible.

## Responsive strategy

- Desktop: 85–100svh hero, left-aligned copy, right-weighted image, visible technical annotations, and a wide horizontal workflow.
- Tablet: lower type scale and decorative density while keeping the rig and road clearly visible; workflow remains horizontal where space allows.
- Mobile: recompose into copy first and image second, with a crop that keeps the rig recognizable; simplify navigation, annotations, and motion; avoid fixed heights that can clip content.

## Technical implementation

Rebuild the currently absent `src/` entry files using React 19, Vite, and TypeScript with authored CSS custom properties for the design tokens. Use semantic HTML, native anchor navigation, an accessible mobile menu, `loading="eager"` for the hero, and a single static image layer so future media replacement can happen without changing the content layout.
