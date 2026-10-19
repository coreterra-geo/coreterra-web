/* eslint-disable react-refresh/only-export-components -- Next.js route files also export metadata and static params. */
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ContactFooter from '@/components/ContactFooter'
import ProjectVisual from '@/components/ProjectVisual'
import { projects } from '@/data/projects'

type PageProps = { params: Promise<{ slug: string }> }

const ui = {
  page: 'min-h-screen bg-[#e9eaea] text-[var(--coreterra-charcoal-deep)] font-[Arial,Helvetica,sans-serif]',
  header: 'flex items-center justify-between gap-6 border-b border-[#bcb7af] px-[9.6%] py-7 max-[1100px]:px-[8%] max-[767px]:px-[6%] max-[767px]:py-[18px]',
  brand: 'inline-flex items-center gap-[14px] [&>span:last-child>strong]:block [&>span:last-child>strong]:whitespace-nowrap [&>span:last-child>strong]:text-[19px] [&>span:last-child>strong]:leading-none [&>span:last-child>strong]:font-extrabold [&>span:last-child>strong]:tracking-[.19em] [&>span:last-child>small]:mt-[6px] [&>span:last-child>small]:block [&>span:last-child>small]:whitespace-nowrap [&>span:last-child>small]:text-[8px] [&>span:last-child>small]:tracking-[.08em] [&>span:last-child>small]:max-[767px]:text-[7px] [&>span:last-child>strong]:max-[767px]:text-[15px]',
  brandMark: 'grid size-[52px] flex-none place-items-center rounded-full border border-[var(--coreterra-bronze-dark)] bg-[#f1eee8] p-[5px] max-[767px]:size-[42px]',
  brandImage: 'size-full object-contain',
  back: 'project-page-back inline-flex min-h-11 items-center gap-[13px] text-xs font-bold tracking-[.08em] text-[#47321f] uppercase [&>span]:text-[22px] [&>span]:font-normal [&>span]:transition-transform [&>span]:duration-[.25s] [&:hover>span]:-translate-x-1 max-[767px]:gap-[5px] max-[767px]:text-[10px]',
  hero: 'grid min-h-[560px] grid-cols-[minmax(0,1.05fr)_minmax(0,.95fr)] gap-[7%] bg-[#e3e0d9] px-[9.6%] pt-[72px] pb-20 max-[1100px]:min-h-[500px] max-[1100px]:gap-[5%] max-[1100px]:px-[8%] max-[767px]:grid-cols-1 max-[767px]:gap-[38px] max-[767px]:px-[6%] max-[767px]:pt-[52px] max-[767px]:pb-14',
  intro: 'flex flex-col items-start [&>.eyebrow]:text-[var(--coreterra-bronze-dark)] [&>.eyebrow]:before:bg-[var(--coreterra-bronze-dark)]',
  eyebrow: 'eyebrow m-0 mb-[.8cqw] text-xs font-bold tracking-[.09em] text-[var(--coreterra-bronze-light)] uppercase before:mr-[.6cqw] before:inline-block before:h-px before:w-[1.6cqw] before:align-middle before:bg-[var(--coreterra-bronze-light)] before:content-[""] max-[1100px]:mb-3 max-[1100px]:before:mr-[6px] max-[1100px]:before:w-4',
  category: 'mt-[52px] mb-[17px] text-xs font-bold tracking-[.11em] text-[var(--coreterra-bronze-dark)] uppercase max-[767px]:mt-[34px] [&>span]:px-2',
  client: 'm-0 text-[11px] leading-[1.5] font-bold tracking-[.08em] text-[var(--coreterra-bronze-dark)] uppercase',
  title: 'm-0 max-w-[14ch] text-[clamp(40px,4.1vw,64px)] leading-[1.03] font-extrabold tracking-[-.035em] uppercase max-[1100px]:text-[clamp(36px,4.7vw,52px)] max-[767px]:text-[clamp(37px,9vw,52px)]',
  lead: 'mt-[25px] mb-0 max-w-[46ch] text-lg leading-[1.6] text-[#555550] max-[767px]:text-base',
  index: 'mt-auto flex grow-0 justify-between gap-4 self-stretch pt-11 text-[11px] font-bold tracking-[.12em] text-[#6c665e] max-[767px]:mt-10 max-[767px]:pt-0',
  visual: 'relative min-h-[410px] h-auto self-stretch after:absolute after:right-0 after:bottom-0 after:h-[30%] after:w-[24%] after:[clip-path:polygon(0_100%,100%_0,100%_100%)] after:bg-[#8b623d75] after:content-[""] max-[1100px]:min-h-[360px] max-[767px]:min-h-[285px]',
  profile: 'grid grid-cols-4 gap-0 border-y border-[#b9b3aa] bg-[#eeece7] px-[9.6%] max-[1100px]:px-[8%] max-[767px]:grid-cols-2 max-[767px]:px-[6%] [&>div]:min-h-[132px] [&>div]:border-r [&>div]:border-[#c7c1b8] [&>div]:pt-[25px] [&>div]:pr-[22px] [&>div]:pb-6 [&>div:not(:first-child)]:pl-[22px] [&>div:last-child]:border-r-0 [&>div>span]:mb-[15px] [&>div>span]:block [&>div>span]:text-[10px] [&>div>span]:font-bold [&>div>span]:tracking-[.13em] [&>div>span]:text-[#756f66] [&>div>span]:uppercase [&>div>strong]:block [&>div>strong]:text-[15px] [&>div>strong]:leading-[1.45] [&>div>strong]:font-semibold [&>div>strong]:text-[#30322e] max-[767px]:[&>div]:min-h-[112px] max-[767px]:[&>div]:px-4 max-[767px]:[&>div]:py-5 max-[767px]:[&>div:not(:first-child)]:pl-4 max-[767px]:[&>div:nth-child(2)]:border-r-0 max-[767px]:[&>div:nth-child(-n+2)]:border-b max-[767px]:[&>div:nth-child(-n+2)]:border-[#c7c1b8] max-[767px]:[&>div>strong]:text-[13px]',
  body: 'grid grid-cols-[minmax(150px,.32fr)_minmax(0,1fr)] gap-[8%] px-[9.6%] pt-[100px] pb-[120px] max-[1100px]:px-[8%] max-[767px]:grid-cols-1 max-[767px]:gap-7 max-[767px]:px-[6%] max-[767px]:pt-[68px] max-[767px]:pb-[78px]',
  bodyLabel: 'flex flex-col gap-[18px] text-[11px] font-bold tracking-[.13em] text-[var(--coreterra-bronze-dark)] max-[767px]:flex-row max-[767px]:items-center',
  rule: 'block h-px w-[72px] bg-[var(--coreterra-bronze-dark)]',
  content: '[&>.eyebrow]:text-[var(--coreterra-bronze-dark)] [&>.eyebrow]:before:bg-[var(--coreterra-bronze-dark)] [&>h2]:text-[clamp(35px,3.2vw,48px)] [&>h2]:font-medium [&>h2]:leading-[1.04] [&>h2]:tracking-[-.02cqw] [&>h2]:uppercase',
  overview: 'mt-[30px] mb-[58px] max-w-[68ch] text-[19px] leading-[1.75] text-[#434640] max-[767px]:mt-[25px] max-[767px]:mb-9 max-[767px]:text-[17px]',
  facts: 'grid grid-cols-[1.1fr_.9fr] gap-[8%] border-t border-[#a9a39a] max-[767px]:grid-cols-1 max-[767px]:gap-7 [&>div]:pt-6 max-[767px]:[&>div]:pt-[22px] [&_h3]:mt-0 [&_h3]:mb-[22px] [&_h3]:text-xs [&_h3]:font-bold [&_h3]:tracking-[.12em] [&_h3]:uppercase [&_ul]:m-0 [&_ul]:list-none [&_ul]:p-0 [&_li]:relative [&_li]:pb-4 [&_li]:pl-5 [&_li]:text-base [&_li]:leading-[1.55] [&_li]:text-[#4e514c] [&_li]:before:absolute [&_li]:before:top-[10px] [&_li]:before:left-0 [&_li]:before:size-[7px] [&_li]:before:rotate-45 [&_li]:before:border [&_li]:before:border-[var(--coreterra-bronze-dark)] [&_li]:before:content-[""] [&_p]:m-0 [&_p]:text-base [&_p]:leading-[1.65] [&_p]:text-[#4e514c]',
  footer: 'static flex w-full items-end justify-between gap-9 bg-[#e3e0d9] px-[9.6%] py-12 max-[1100px]:px-[8%] max-[767px]:flex-col max-[767px]:items-start max-[767px]:px-[6%] max-[767px]:pt-10 max-[767px]:pb-[45px] [&>a]:min-w-0 [&>a]:whitespace-normal [&>a:first-child]:flex [&>a:first-child]:flex-col [&>a:first-child]:gap-[7px] [&>a:first-child]:text-xs [&>a:first-child]:font-bold [&>a:first-child]:tracking-[.1em] [&>a:first-child]:text-[var(--coreterra-bronze-dark)] [&>a:first-child]:uppercase [&>a:first-child>strong]:text-[22px] [&>a:first-child>strong]:tracking-normal [&>a:first-child>strong]:text-[#222724] [&>a:first-child>strong]:wrap-break-word [&>a:last-child]:text-xs [&>a:last-child]:font-bold [&>a:last-child]:tracking-[.08em] [&>a:last-child]:text-[#47321f] [&>a:last-child]:underline [&>a:last-child]:underline-offset-[5px] [&>a:last-child]:uppercase [&_span]:inline [&_a]:[text-shadow:none]',
}

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
    <main className={ui.page}>
      <header className={ui.header}>
        <Link className={ui.brand} href="/#home" aria-label="Coreterra, kembali ke beranda"><span className={ui.brandMark}><Image className={ui.brandImage} src="/logo.png" alt="" width={80} height={80} /></span><span><strong>CORETERRA</strong><small>KONSULTAN GEOENGINEERING</small></span></Link>
        <Link className={ui.back} href="/#projects"><span aria-hidden="true">←</span> Semua proyek</Link>
      </header>

      <section className={ui.hero} aria-labelledby="project-page-title">
        <div className={ui.intro}>
          <p className={ui.eyebrow}>Pengalaman proyek <span aria-hidden="true">/</span> {project.number}</p>
          <p className={ui.category}>{project.category} <span aria-hidden="true">—</span> {project.location}</p>
          <p className={ui.client}>Klien / {project.client}</p>
          <h1 className={ui.title} id="project-page-title">{project.title}</h1>
          <p className={ui.lead}>{project.scope}</p>
          <div className={ui.index} aria-hidden="true"><span>CT / PROJECT FILE</span><span>{project.number}—{String(projects.length).padStart(2, '0')}</span></div>
        </div>
        <ProjectVisual project={project} className={ui.visual} />
      </section>

      <section className={ui.profile} aria-label="Profil proyek">
        <div><span>Klien</span><strong>{project.client}</strong></div>
        <div><span>Lokasi</span><strong>{project.location}</strong></div>
        <div><span>Klasifikasi</span><strong>{project.category}</strong></div>
        <div><span>Lingkup utama</span><strong>{project.scope}</strong></div>
      </section>

      <section className={ui.body} aria-labelledby="project-overview-title">
        <div className={ui.bodyLabel}><span>01 / KAJIAN</span><span className={ui.rule} aria-hidden="true" /></div>
        <div className={ui.content}><p className={ui.eyebrow}>Ringkasan pekerjaan</p><h2 id="project-overview-title">Konteks & lingkup.</h2><p className={ui.overview}>{project.overview}</p><div className={ui.facts}><div><h3>Rangkaian pekerjaan</h3><ul>{project.activities.map((activity) => <li key={activity}>{activity}</li>)}</ul></div><div><h3>Arah penggunaan hasil</h3><p>{project.purpose}</p></div></div></div>
      </section>

      <nav className={ui.footer} aria-label="Navigasi proyek"><Link href={`/proyek/${nextProject.slug}`}>Proyek berikutnya <span aria-hidden="true">↗</span><strong>{nextProject.title}</strong></Link><Link href="/#projects">Kembali ke pengalaman proyek ↑</Link></nav>
    </main>
    <ContactFooter />
    </>
  )
}
