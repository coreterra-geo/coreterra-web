export type AdminSection = {
  slug: string
  label: string
  sourceKeys: string[]
}

export const adminSections: AdminSection[] = [
  { slug: 'pengalaman-proyek', label: 'Section pengalaman proyek', sourceKeys: ['projectSection'] },
  { slug: 'data-proyek', label: 'Data proyek', sourceKeys: ['projects', 'Project'] },
  { slug: 'detail-proyek', label: 'Detail proyek', sourceKeys: ['projectDetail', 'fieldDocumentation'] },
]
