export type NewsArticle = {
  slug: string
  category: string
  title: string
  summary: string
  body: string[]
  createdAt: string
  imagePosition: string
}

export const newsArticles: NewsArticle[] = [
  {
    slug: 'ground-conditions-in-project-planning',
    category: '01 / INFRASTRUCTURE',
    title: 'Ground conditions in project planning',
    summary: 'How early site understanding can shape clearer project decisions. Reading the ground sooner helps project teams frame constraints, coordinate disciplines, and build a more useful evidence base.',
    body: [
      'Project planning becomes more useful when the ground is treated as an active part of the brief, not a detail left until design development.',
      'Early investigation helps teams frame the questions that matter: what is present, what is variable, and which constraints should influence the next decision.',
      'The result is not a promise of certainty. It is a better evidence base for coordinating design, construction planning, and risk conversations.'
    ],
    createdAt: '28 SEP 2026',
    imagePosition: 'center'
  },
  {
    slug: 'designing-with-site-constraints',
    category: '02 / RESILIENCE',
    title: 'Designing with site constraints in mind',
    summary: 'A grounded view of the conditions that influence resilient engineering. Site constraints become more actionable when they are understood before the design direction is fixed.',
    body: [
      'Resilient engineering begins with an honest reading of the site. Slope, drainage, soil behaviour, rock profile, and access conditions all influence how a solution can perform.',
      'When these factors are understood early, the design conversation can move from reacting to constraints toward working with them deliberately.',
      'That shift supports recommendations that are easier to communicate, test, and carry forward with the project team.'
    ],
    createdAt: '21 SEP 2026',
    imagePosition: '62% center'
  },
  {
    slug: 'from-field-evidence-to-better-decisions',
    category: '03 / PRACTICE',
    title: 'From field evidence to better decisions',
    summary: 'Why useful engineering insight begins with disciplined observation. Clear records connect field evidence to analysis and give recommendations a stronger technical context.',
    body: [
      'Field evidence becomes valuable when observations are recorded with enough context to be reviewed, compared, and connected to an engineering question.',
      'A disciplined workflow links what is seen in the field with the data collected, the analysis performed, and the recommendations that follow.',
      'This connection keeps technical work grounded and gives decision-makers a clearer basis for understanding trade-offs.'
    ],
    createdAt: '14 SEP 2026',
    imagePosition: 'right center'
  },
  {
    slug: 'reading-the-site-before-the-design',
    category: '04 / FIELD WORK',
    title: 'Reading the site before the design',
    summary: 'The observations that help teams ask better engineering questions. A closer reading of terrain, materials, water, and access can make the next investigation more purposeful.',
    body: [
      'A site visit is more than a visual check. It is an opportunity to notice relationships between terrain, materials, water, access, and the infrastructure already in place.',
      'Those observations help define where focused investigation is needed and what evidence will be most useful to the project.',
      'Starting with better questions makes the later stages of analysis and design more purposeful.'
    ],
    createdAt: '07 SEP 2026',
    imagePosition: '38% center'
  }
]
