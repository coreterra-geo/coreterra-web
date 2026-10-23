/* eslint-disable react-refresh/only-export-components -- Next.js route files also export metadata and static params. */
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ContactFooter from '@/components/ContactFooter'
import ProjectVisual from '@/components/ProjectVisual'
import { projects, siteCopy } from '@/data/projects'

type PageProps = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((item) => item.slug === slug)
  if (!project) return { title: siteCopy.projectDetail.notFound }
  return {
    title: project.title,
    description: `${project.scope} Lokasi: ${project.location}.`,
    alternates: { canonical: `/proyek/${project.slug}` },
    openGraph: {
      type: 'article',
      title: `${project.title} | Coreterra`,
      description: `${project.scope} Lokasi: ${project.location}.`,
      url: `/proyek/${project.slug}`,
      images: [{ url: project.image, alt: project.imageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | Coreterra`,
      description: `${project.scope} Lokasi: ${project.location}.`,
      images: [project.image],
    },
  }
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params
  const project = projects.find((item) => item.slug === slug)
  if (!project) notFound()

  const currentIndex = projects.findIndex((item) => item.slug === slug)
  const nextProject = projects[(currentIndex + 1) % projects.length]
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Beranda', item: 'https://coreterra-geo.com/' },
      { '@type': 'ListItem', position: 2, name: siteCopy.projectSection.eyebrow, item: 'https://coreterra-geo.com/#projects' },
      { '@type': 'ListItem', position: 3, name: project.title, item: `https://coreterra-geo.com/proyek/${project.slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c') }} />
      <main className="min-h-screen bg-coreterra-paper font-coreterra text-[var(--coreterra-charcoal-deep)]">
        <header className="flex items-center justify-between gap-6 border-b border-[#bcb7af] px-[9.6%] py-7 max-[1100px]:px-[8%] max-[767px]:px-[6%] max-[767px]:py-[18px]">
          <Link className="inline-flex items-center gap-[14px] [&>span:last-child>strong]:block [&>span:last-child>strong]:whitespace-nowrap [&>span:last-child>strong]:text-[19px] [&>span:last-child>strong]:leading-none [&>span:last-child>strong]:font-extrabold [&>span:last-child>strong]:tracking-[.19em] [&>span:last-child>small]:mt-[6px] [&>span:last-child>small]:block [&>span:last-child>small]:whitespace-nowrap [&>span:last-child>small]:text-[8px] [&>span:last-child>small]:tracking-[.08em] [&>span:last-child>small]:max-[767px]:text-[7px] [&>span:last-child>strong]:max-[767px]:text-[15px]"
            href="/#home"
            aria-label={siteCopy.brand.homeLink}
          >
            <span className="grid size-[52px] flex-none place-items-center rounded-full border border-[var(--coreterra-bronze-dark)] bg-[#f1eee8] p-[5px] max-[767px]:size-[42px]">
              <Image className="size-full object-contain" src="/logo.png" alt="" width={80} height={80} />
            </span>
            <span>
              <strong>{siteCopy.brand.name}</strong>
              <small>{siteCopy.brand.descriptor}</small>
            </span>
          </Link>
          <Link className="inline-flex min-h-11 items-center gap-[13px] text-xs font-bold tracking-[.08em] text-coreterra-ink-soft uppercase [&>span]:text-[22px] [&>span]:font-normal [&>span]:transition-transform [&>span]:duration-[.25s] [&:hover>span]:-translate-x-1 motion-reduce:[&>span]:transition-none max-[767px]:gap-[5px] max-[767px]:text-[10px]"
            href="/#projects"
          ><span aria-hidden="true">←</span> {siteCopy.projectDetail.allProjects}</Link>
        </header>
        <section className="grid min-h-[560px] grid-cols-[minmax(0,1.05fr)_minmax(0,.95fr)] gap-[7%] bg-coreterra-paper-warm px-[9.6%] pt-[72px] pb-20 max-[1100px]:min-h-[500px] max-[1100px]:gap-[5%] max-[1100px]:px-[8%] max-[767px]:grid-cols-1 max-[767px]:gap-[38px] max-[767px]:px-[6%] max-[767px]:pt-[52px] max-[767px]:pb-14"
          aria-labelledby="project-page-title"
        >
          <div className="flex flex-col items-start">
            <p className="m-0 mb-[.8cqw] text-xs font-bold tracking-eyebrow text-[var(--coreterra-bronze-dark)] uppercase before:mr-[.6cqw] before:inline-block before:h-px before:w-[1.6cqw] before:align-middle before:bg-[var(--coreterra-bronze-dark)] before:content-[''] max-[1100px]:mb-3 max-[1100px]:before:mr-[6px] max-[1100px]:before:w-4">{siteCopy.projectDetail.eyebrow} <span aria-hidden="true">/</span> {project.number}</p>
            <p className="mt-[52px] mb-[17px] text-xs font-bold tracking-[.11em] text-[var(--coreterra-bronze-dark)] uppercase max-[767px]:mt-[34px] [&>span]:px-2">{project.category} <span aria-hidden="true">—</span> {project.location}</p>
            <p className="m-0 text-[11px] leading-[1.5] font-bold tracking-[.08em] text-[var(--coreterra-bronze-dark)] uppercase">{siteCopy.projectDetail.client} / {project.client}</p>
            <h1 className="m-0 max-w-[14ch] font-display text-display leading-[1.03] font-extrabold tracking-tight-coreterra uppercase max-[1100px]:text-display-tablet max-[767px]:text-page-title"
              id="project-page-title"
            >{project.title}</h1>
            <p className="mt-[25px] mb-0 max-w-[46ch] text-lg leading-copy text-coreterra-text-secondary max-[767px]:text-base">{project.scope}</p>
            <div className="mt-auto flex grow-0 justify-between gap-4 self-stretch pt-11 text-[11px] font-bold tracking-[.12em] text-coreterra-text-muted max-[767px]:mt-10 max-[767px]:pt-0"
              aria-hidden="true"
            >
              <span>{siteCopy.projectDetail.fileLabel}</span>
              <span>{project.number}—{String(projects.length).padStart(2, '0')}</span>
            </div>
          </div>
          <ProjectVisual project={project}
            priority
            sizes="(max-width: 767px) 88vw, (max-width: 1100px) 44vw, 48vw"
            className="relative min-h-[410px] h-auto self-stretch after:absolute after:right-0 after:bottom-0 after:z-[1] after:h-[30%] after:w-[24%] after:[clip-path:polygon(0_100%,100%_0,100%_100%)] after:bg-[#8b623d75] after:content-[''] max-[1100px]:min-h-[360px] max-[767px]:min-h-[285px]"
          />
        </section>
        <section className="grid grid-cols-4 gap-0 border-y border-[#b9b3aa] bg-[#eeece7] px-[9.6%] max-[1100px]:px-[8%] max-[767px]:grid-cols-2 max-[767px]:px-[6%] [&>div]:min-h-[132px] [&>div]:border-r [&>div]:border-[#c7c1b8] [&>div]:pt-[25px] [&>div]:pr-[22px] [&>div]:pb-6 [&>div:not(:first-child)]:pl-[22px] [&>div:last-child]:border-r-0 [&>div>span]:mb-[15px] [&>div>span]:block [&>div>span]:text-[10px] [&>div>span]:font-bold [&>div>span]:tracking-[.13em] [&>div>span]:text-[#756f66] [&>div>span]:uppercase [&>div>strong]:block [&>div>strong]:text-[15px] [&>div>strong]:leading-[1.45] [&>div>strong]:font-semibold [&>div>strong]:text-[#30322e] max-[767px]:[&>div]:min-h-[112px] max-[767px]:[&>div]:px-4 max-[767px]:[&>div]:py-5 max-[767px]:[&>div:not(:first-child)]:pl-4 max-[767px]:[&>div:nth-child(2)]:border-r-0 max-[767px]:[&>div:nth-child(-n+2)]:border-b max-[767px]:[&>div:nth-child(-n+2)]:border-[#c7c1b8] max-[767px]:[&>div>strong]:text-[13px]"
          aria-label={siteCopy.projectDetail.profileLabel}
        >
          <div>
            <span>{siteCopy.projectDetail.client}</span>
            <strong>{project.client}</strong>
          </div>
          <div>
            <span>{siteCopy.projectDetail.location}</span>
            <strong>{project.location}</strong>
          </div>
          <div>
            <span>{siteCopy.projectDetail.category}</span>
            <strong>{project.category}</strong>
          </div>
          <div>
            <span>{siteCopy.projectDetail.scope}</span>
            <strong>{project.scope}</strong>
          </div>
        </section>
        <section className="grid grid-cols-[minmax(150px,.32fr)_minmax(0,1fr)] gap-[8%] px-[9.6%] pt-[100px] pb-[120px] max-[1100px]:px-[8%] max-[767px]:grid-cols-1 max-[767px]:gap-7 max-[767px]:px-[6%] max-[767px]:pt-[68px] max-[767px]:pb-[78px]"
          aria-labelledby="project-overview-title"
        >
          <div className="flex flex-col gap-[18px] text-[11px] font-bold tracking-[.13em] text-[var(--coreterra-bronze-dark)] max-[767px]:flex-row max-[767px]:items-center">
            <span>{siteCopy.projectDetail.sectionLabel}</span>
            <span className="block h-px w-[72px] bg-[var(--coreterra-bronze-dark)]" aria-hidden="true" />
          </div>
          <div className="[&>h2]:text-project-overview-title [&>h2]:font-medium [&>h2]:leading-project-title [&>h2]:tracking-[-.02cqw] [&>h2]:uppercase">
            <p className="m-0 mb-[.8cqw] text-xs font-bold tracking-[.09em] text-[var(--coreterra-bronze-dark)] uppercase before:mr-[.6cqw] before:inline-block before:h-px before:w-[1.6cqw] before:align-middle before:bg-[var(--coreterra-bronze-dark)] before:content-[''] max-[1100px]:mb-3 max-[1100px]:before:mr-[6px] max-[1100px]:before:w-4">{siteCopy.projectDetail.summary}</p>
            <h2 id="project-overview-title">{siteCopy.projectDetail.title}</h2>
            <p className="mt-[30px] mb-[58px] max-w-[68ch] text-[19px] leading-[1.75] text-coreterra-text-primary max-[767px]:mt-[25px] max-[767px]:mb-9 max-[767px]:text-[17px]">{project.overview}</p>
            <div className="grid grid-cols-[1.1fr_.9fr] gap-[8%] border-t border-[#a9a39a] max-[767px]:grid-cols-1 max-[767px]:gap-7 [&>div]:pt-6 max-[767px]:[&>div]:pt-[22px] [&_h3]:mt-0 [&_h3]:mb-[22px] [&_h3]:text-xs [&_h3]:font-bold [&_h3]:tracking-[.12em] [&_h3]:uppercase [&_ul]:m-0 [&_ul]:list-none [&_ul]:p-0 [&_li]:relative [&_li]:pb-4 [&_li]:pl-5 [&_li]:text-base [&_li]:leading-[1.55] [&_li]:text-[#4e514c] [&_li]:before:absolute [&_li]:before:top-[10px] [&_li]:before:left-0 [&_li]:before:size-[7px] [&_li]:before:rotate-45 [&_li]:before:border [&_li]:before:border-[var(--coreterra-bronze-dark)] [&_li]:before:content-[''] [&_p]:m-0 [&_p]:text-base [&_p]:leading-[1.65] [&_p]:text-[#4e514c]">
              <div>
                <h3>{siteCopy.projectDetail.activities}</h3>
                <ul>{project.activities.map((activity) => <li key={activity}>{activity}</li>)}</ul>
              </div>
              <div>
                <h3>{siteCopy.projectDetail.purpose}</h3>
                <p>{project.purpose}</p>
              </div>
            </div>
          </div>
        </section>
        <nav className="static flex w-full items-end justify-between gap-9 bg-[#e3e0d9] px-[9.6%] py-12 max-[1100px]:px-[8%] max-[767px]:flex-col max-[767px]:items-start max-[767px]:px-[6%] max-[767px]:pt-10 max-[767px]:pb-[45px] [&>a]:min-w-0 [&>a]:whitespace-normal [&>a:first-child]:flex [&>a:first-child]:flex-col [&>a:first-child]:gap-[7px] [&>a:first-child]:text-xs [&>a:first-child]:font-bold [&>a:first-child]:tracking-[.1em] [&>a:first-child]:text-[var(--coreterra-bronze-dark)] [&>a:first-child]:uppercase [&>a:first-child>strong]:text-[22px] [&>a:first-child>strong]:tracking-normal [&>a:first-child>strong]:text-[#222724] [&>a:first-child>strong]:wrap-break-word [&>a:last-child]:text-xs [&>a:last-child]:font-bold [&>a:last-child]:tracking-[.08em] [&>a:last-child]:text-[#47321f] [&>a:last-child]:underline [&>a:last-child]:underline-offset-[5px] [&>a:last-child]:uppercase [&_span]:inline [&_a]:[text-shadow:none]"
          aria-label={siteCopy.projectDetail.navigation}
        >
          <Link href={`/proyek/${nextProject.slug}`}>{siteCopy.projectDetail.next}<span aria-hidden="true">↗</span><strong>{nextProject.title}</strong></Link>
          <Link href="/#projects">{siteCopy.projectDetail.back} ↑</Link>
        </nav>
      </main>
      <ContactFooter />
    </>
  )
}
