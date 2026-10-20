/* eslint-disable react-refresh/only-export-components -- Next.js route files also export metadata and static params. */
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { adminSections } from '@/data/admin-navigation'

type SectionPageProps = { params: Promise<{ section: string }> }

export function generateStaticParams() {
  return adminSections.map(({ slug }) => ({ section: slug }))
}

export async function generateMetadata({ params }: SectionPageProps): Promise<Metadata> {
  const { section: slug } = await params
  const section = adminSections.find((item) => item.slug === slug)

  if (!section) return { title: 'Bagian tidak ditemukan' }
  return { title: section.label }
}

export default async function AdminSectionPage({ params }: SectionPageProps) {
  const { section: slug } = await params
  const section = adminSections.find((item) => item.slug === slug)

  if (!section) notFound()

  return (
    <section aria-labelledby="admin-section-title" className="max-w-[920px]">
      <p className="mb-3 text-[11px] font-semibold tracking-[.08em] text-[#76634e]">PENGELOLAAN KONTEN</p>
      <h1 className="m-0 text-[clamp(30px,4vw,42px)] leading-[1.1] font-semibold tracking-[-.035em] text-[#252621]" id="admin-section-title">{section.label}</h1>
      <div className="mt-9 border-y border-[#d2cdc4] py-7" role="status">
        <p className="m-0 text-[15px] leading-[1.7] text-[#5e5b54]">Belum ada data yang ditampilkan di bagian ini.</p>
      </div>
    </section>
  )
}
