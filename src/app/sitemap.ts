import type { MetadataRoute } from 'next'
import { projects } from '@/data/projects'

const siteUrl = 'https://coreterra-geo.com'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...projects.map(({ slug }) => ({
      url: `${siteUrl}/proyek/${slug}`,
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
  ]
}
