---
name: coreterra-frontend-design
description: Design and implement Coreterra landing-page experiences using geoengineering field imagery, editorial engineering layouts, geological visual systems, restrained interaction, responsive composition, and performance-safe frontend techniques.
---

# Coreterra Frontend Design

Use this skill when working on:

- homepage
- landing page
- hero
- visual storytelling
- geoengineering workflow
- homepage interactions
- responsive layouts
- section transitions
- visual hierarchy

Always read `AGENTS.md` first.

---

# 1. Inspect before designing

Before modifying files:

1. Inspect the existing homepage.
2. Inspect existing layout/components.
3. Inspect typography.
4. Inspect design tokens/colors.
5. Inspect dependencies.
6. Inspect `public/`.
7. Inspect `public/logo.png`.
8. Find the primary drilling hero image.
9. Inspect existing routes and navigation.

Do not begin implementation based only on assumptions.

---

# 2. Write the redesign brief first

Before editing code, produce a concise redesign brief covering:

## Objective

What should the landing page communicate?

## Hero concept

How will the drilling image establish the Coreterra story?

## Narrative

How will users move from:

Investigation
→ Data
→ Analysis
→ Engineering decision

## Visual language

Define:

- typography
- colors
- spacing
- imagery
- geology-inspired graphics
- section rhythm

## Interaction

Describe any:

- image movement
- parallax
- scroll reveals
- section transitions
- geological graphics

## Responsive strategy

Describe:

- desktop
- tablet
- mobile

## Technical implementation

Explain which existing project technologies will be used.

After completing the brief, proceed with implementation.

---

# 3. Landing page architecture

Default structure:

## Navigation

Clean, restrained navigation.

Logo should remain clearly visible.

Avoid oversized navigation UI.

---

## Hero

The hero is the primary visual statement.

Use the project's geotechnical drilling poster as the main visual anchor.

Preferred desktop composition:

LEFT:

- eyebrow
- headline
- supporting statement
- CTA

RIGHT:

- drilling rig
- terrain
- engineering context

The original visual composition should remain recognizable.

Do not center all hero content automatically.

---

## Engineering premise

After the hero, explain why understanding ground conditions matters before engineering decisions are made.

This section should transition the user from visual impact into Coreterra's engineering philosophy.

Prefer concise editorial copy rather than multiple marketing cards.

---

## Investigation-to-decision workflow

Present the Coreterra workflow:

01 Site Investigation

↓

02 Data Collection

↓

03 Analysis

↓

04 Design & Recommendations

The section should visually communicate flow and causality.

Do not present four disconnected cards unless the existing design strongly requires it.

Possible treatments:

- horizontal engineering timeline
- layered geological section
- vertical technical sequence
- numbered editorial layout

---

## Expertise

Present actual expertise supported by project content.

Use strong typography and concise descriptions.

Do not invent services.

Avoid generic icon-card grids when a more editorial engineering layout works.

---

## Engineering evidence

Use visual elements representing:

- field observation
- geological understanding
- technical analysis
- design reasoning

This may use:

- image + technical annotation
- data-style callouts
- strata illustration
- engineering grid

Do not fabricate numerical data.

---

## Projects

Only include projects if real project information exists.

If project content does not exist, omit the section rather than inventing placeholders.

---

## Final CTA

End with a clear business conversation CTA.

Keep it direct and professional.

Avoid aggressive marketing language.

---

# 4. Hero poster implementation

The drilling poster is currently the main hero media.

Do not assume video exists.

Do not create fake video references.

Use the poster as a complete production visual.

---

## Desktop composition

Aim for hero height around:

`85–100svh`

depending on the existing navigation and content.

Keep drilling equipment primarily in the right side.

Keep headline content primarily in the left side.

Use image:

`object-fit: cover`

with carefully chosen `object-position`.

Do not crop the drilling mast excessively.

---

## Image readability

Use a restrained dark gradient if necessary.

Preferred concept:

left side darker

→

right side increasingly transparent

This allows readable typography while retaining details of the drilling rig.

Avoid putting a uniform black overlay over the entire image unless required.

---

# 5. Static image interaction

Because video is not currently available, create depth from the static poster carefully.

Allowed enhancement:

### Image scale

During initial hero scroll:

`scale(1)` → approximately `scale(1.03–1.05)`

Keep movement subtle.

---

### Hero content movement

As the user begins scrolling:

- content may translate upward slightly
- content may fade gently
- image may gain slight depth

Do not completely disappear too early.

---

### Pointer depth

Desktop may use extremely subtle pointer movement.

Example visual amplitude:

image:
approximately 2–6px

geological overlay:
approximately 4–8px

Do not make the entire hero chase the cursor.

Disable this behavior for touch input.

---

# 6. Geological overlay

If appropriate, introduce lightweight geological graphics above or adjacent to the hero.

Possible graphics:

- strata lines
- contour lines
- elevation markers
- borehole depth marker
- section line
- coordinate reference
- technical grid

Prefer SVG or CSS.

Opacity should remain low.

The field photograph remains primary.

Do not cover the drilling machine with excessive graphics.

---

# 7. Hero micro-details

Small technical labels may be used if they contain no fabricated project data.

Safe examples:

`SITE INVESTIGATION`

`SUBSURFACE`

`FIELD DATA`

`GROUND CONDITIONS`

Avoid fake labels such as:

`BH-047 / DEPTH 42.5 M`

unless actual project data supports them.

---

# 8. Scroll transition

Hero should transition naturally into the next section.

Preferred pattern:

Hero image
↓
slight scale/depth
↓
headline moves slightly upward
↓
bottom edge introduces geological/strata treatment
↓
next editorial section enters

Avoid abrupt section boundaries where possible.

Do not hijack scrolling.

---

# 9. Typography

Typography should feel:

- editorial
- engineering-led
- contemporary
- restrained

Hero headline may be large, but should not become fashion-editorial or decorative.

Prefer strong hierarchy.

Example:

small eyebrow

↓

large headline

↓

short description

↓

CTA

Avoid long paragraph blocks inside hero.

---

# 10. Layout rhythm

Alternate between:

- visual-heavy sections
- text-led sections
- technical diagram sections
- generous whitespace

Do not make every section:

three cards + icon + paragraph.

Avoid repetitive component patterns.

The page should feel intentionally art-directed.

---

# 11. Motion

Use motion sparingly.

Preferred:

- fade
- translate
- scale
- line reveal
- staggered text
- subtle depth

Avoid:

- bounce
- elastic motion
- excessive spring animation
- spinning
- floating decorative objects
- particle fields

Motion should feel physically restrained.

---

# 12. Motion technology

Prefer in this order:

1. CSS
2. SVG
3. Web Animations API
4. existing project library
5. lightweight JavaScript

Only introduce a new motion dependency when clearly justified.

Avoid continuous React state updates during pointer movement.

Use requestAnimationFrame or CSS variables where appropriate.

---

# 13. Future video compatibility

The hero architecture should allow the static image to later be replaced with:

`<video>`

without rewriting the content layout.

A future media structure may support:

MediaLayer
├── image
└── video

But do not implement nonexistent video sources now.

The poster remains the current production media.

---

# 14. Responsive composition

## Desktop

Use:

- wide cinematic composition
- large typography
- left content
- right visual anchor
- subtle interaction

---

## Tablet

Reduce:

- pointer movement
- typography scale
- decorative layers

Ensure drilling rig remains visible.

---

## Mobile

Do not simply shrink the desktop layout.

Re-compose it.

Possible structure:

headline
↓
supporting copy
↓
CTA
↓
image

or carefully designed image-backed layout if readability remains strong.

Select an `object-position` that keeps the drilling machine visible.

Disable pointer-based interaction.

Use minimal motion.

---

# 15. Accessibility

Respect:

`prefers-reduced-motion`

When enabled:

- remove pointer parallax
- remove unnecessary scroll transformations
- keep image static
- preserve all content

Maintain:

- semantic headings
- keyboard navigation
- focus states
- adequate contrast
- accessible links/buttons

---

# 16. Performance

Because the hero uses a large photographic asset:

- use an optimized web format if possible
- provide correct image dimensions
- avoid layout shift
- avoid unnecessarily large source files
- use responsive image loading if supported by the framework
- preserve image quality without shipping excessive bytes

If using Next.js or another framework with an image component, inspect existing project conventions first.

Do not blindly replace existing optimized image infrastructure.

---

# 17. Visual review

Before completion inspect:

## Hero

- Is the drilling rig still prominent?
- Is the headline readable?
- Does the image crop feel intentional?
- Is the left/right composition balanced?
- Is CTA immediately visible?

## Landing page

- Is the workflow understandable?
- Do sections feel connected?
- Is the page becoming repetitive?
- Does it still look like geoengineering?
- Are geological graphics restrained?
- Does it avoid generic SaaS aesthetics?

---

# 18. Responsive verification

Verify at minimum:

- wide desktop
- laptop
- tablet
- mobile

Check:

- text wrapping
- hero height
- image crop
- logo size
- navigation
- CTA
- overflow
- section spacing

---

# 19. Technical verification

Run available:

- lint
- typecheck
- build
- relevant tests

If browser preview is available, inspect the rendered result rather than trusting source code alone.

Fix relevant issues before completion.

---

# 20. Completion report

Report:

1. redesign concept
2. hero composition
3. page narrative
4. interactions implemented
5. files changed
6. responsive behavior
7. accessibility handling
8. performance handling
9. validation performed
10. anything not verified