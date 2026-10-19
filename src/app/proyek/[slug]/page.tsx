/* eslint-disable react-refresh/only-export-components -- Next.js route files also export metadata and static params. */
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ContactFooter from '@/components/ContactFooter'
import ProjectVisual from '@/components/ProjectVisual'
import { projects } from '@/data/projects'

type PageProps = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((item) => item.slug === slug)
  if (!project) return { title: 'Proyek tidak ditemukan | Coreterra' }
  return {
    title: `${project.title} | Coreterra`,
    description: `${project.scope} Lokasi: ${project.location}.`,
  }
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params
  const project = projects.find((item) => item.slug === slug)
  if (!project) notFound()

  const currentIndex = projects.findIndex((item) => item.slug === slug)
  const nextProject = projects[(currentIndex + 1) % projects.length]

  return (
    <>
    <main className="project-page">
      <header className="project-page-header">
        <Link className="project-page-brand" href="/#home" aria-label="Coreterra, kembali ke beranda"><span className="project-page-brand-mark"><Image src="/logo.png" alt="" width={80} height={80} /></span><span><strong>CORETERRA</strong><small>KONSULTAN GEOENGINEERING</small></span></Link>
        <Link className="project-page-back" href="/#projects"><span aria-hidden="true">←</span> Semua proyek</Link>
      </header>

      <section className="project-page-hero" aria-labelledby="project-page-title">
        <div className="project-page-intro">
          <p className="eyebrow">Pengalaman proyek <span aria-hidden="true">/</span> {project.number}</p>
          <p className="project-page-category">{project.category} <span aria-hidden="true">—</span> {project.location}</p>
          <p className="project-page-client">Klien / {project.client}</p>
          <h1 id="project-page-title">{project.title}</h1>
          <p className="project-page-lead">{project.scope}</p>
          <div className="project-page-index" aria-hidden="true"><span>CT / PROJECT FILE</span><span>{project.number}—{String(projects.length).padStart(2, '0')}</span></div>
        </div>
        <ProjectVisual project={project} />
      </section>

      <section className="project-page-profile" aria-label="Profil proyek">
        <div><span>Klien</span><strong>{project.client}</strong></div>
        <div><span>Lokasi</span><strong>{project.location}</strong></div>
        <div><span>Klasifikasi</span><strong>{project.category}</strong></div>
        <div><span>Lingkup utama</span><strong>{project.scope}</strong></div>
      </section>

      <section className="project-page-body" aria-labelledby="project-overview-title">
        <div className="project-page-body-label"><span>01 / KAJIAN</span><span className="project-page-rule" aria-hidden="true" /></div>
        <div className="project-page-body-content"><p className="eyebrow">Ringkasan pekerjaan</p><h2 id="project-overview-title">Konteks & lingkup.</h2><p className="project-page-overview">{project.overview}</p><div className="project-page-facts"><div><h3>Rangkaian pekerjaan</h3><ul>{project.activities.map((activity) => <li key={activity}>{activity}</li>)}</ul></div><div><h3>Arah penggunaan hasil</h3><p>{project.purpose}</p></div></div></div>
      </section>

      <nav className="project-page-footer" aria-label="Navigasi proyek"><Link href={`/proyek/${nextProject.slug}`}>Proyek berikutnya <span aria-hidden="true">↗</span><strong>{nextProject.title}</strong></Link><Link href="/#projects">Kembali ke pengalaman proyek ↑</Link></nav>
    </main>
    <ContactFooter />
    </>
  )
}
