'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import ContactFooter from '@/components/ContactFooter'
import ProjectVisual from '@/components/ProjectVisual'
import { projects } from '@/data/projects'

const services = [
  { number: '01', title: 'Investigasi tanah & fondasi', description: 'Pengeboran, pengujian lapangan, dan interpretasi kondisi bawah permukaan untuk kebutuhan fondasi dan prasarana.', detail: 'Pengeboran / SPT / CPT' },
  { number: '02', title: 'Geoteknik tambang & infrastruktur', description: 'Kajian tanah dan batuan, stabilitas lereng, serta kondisi tanah dasar untuk tambang dan jalan angkut.', detail: 'Lereng / jalan angkut' },
  { number: '03', title: 'Hidrologi & hidrogeologi', description: 'Penilaian air permukaan dan air tanah sebagai bagian dari kajian tambang, drainase, dan pengelolaan risiko geoteknik.', detail: 'Air permukaan / air tanah' },
  { number: '04', title: 'Survei geofisika & eksplorasi', description: 'Survei geolistrik, geomagnetik, dan pengeboran eksplorasi untuk memahami struktur serta sebaran material bawah permukaan.', detail: 'Geolistrik / geomagnetik' },
]

function ServiceDiagram({ number }: { number: string }) {
  return (
    <svg className="service-diagram" viewBox="0 0 80 80" fill="none" aria-hidden="true" focusable="false">
      <g stroke="#684628" strokeLinecap="round" strokeLinejoin="round">
        {number === '01' && (
          <g strokeWidth="2">
            <path d="M12 51c9-5 18-5 28 0s19 5 28 0" />
            <path d="M12 60c9-5 18-5 28 0s19 5 28 0" strokeWidth="1.4" />
            <path d="M40 13v43M34 48l6 11 6-11M30 22h20" />
            <circle cx="40" cy="31" r="10" strokeWidth="1.4" strokeDasharray="2 3" />
          </g>
        )}
        {number === '02' && (
          <g strokeWidth="2">
            <path d="M10 55 28 40l14 5 14-19 14 7" />
            <path d="M14 64c13-8 23-9 33-4 10 5 18 3 25-4" strokeWidth="1.4" />
            <path d="M20 69c12-7 21-8 31-3 9 4 16 2 22-3" strokeWidth="1.2" />
            <circle cx="56" cy="26" r="4" fill="#684628" stroke="none" />
          </g>
        )}
        {number === '03' && (
          <g strokeWidth="2">
            <path d="M10 27c10-8 17-8 26 0s16 8 24 0 15-8 20 0" />
            <path d="M10 41c10-8 17-8 26 0s16 8 24 0 15-8 20 0" strokeWidth="1.4" />
            <path d="M10 55c10-8 17-8 26 0s16 8 24 0 15-8 20 0" strokeWidth="1.2" />
            <circle cx="23" cy="34" r="3.5" fill="#684628" stroke="none" />
          </g>
        )}
        {number === '04' && (
          <g strokeWidth="2">
            <circle cx="40" cy="40" r="8" />
            <path d="M40 22a18 18 0 0 1 0 36M40 14a26 26 0 0 1 0 52M40 6a34 34 0 0 1 0 68" />
            <path d="m40 40 25-18M40 40l28 13" strokeWidth="1.4" strokeDasharray="3 3" />
            <circle cx="65" cy="22" r="3.5" fill="#684628" stroke="none" />
          </g>
        )}
      </g>
    </svg>
  )
}

export default function HomeInteractive() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const projectTrackRef = useRef<HTMLOListElement>(null)
  const [projectScroll, setProjectScroll] = useState({ start: true, end: false, progress: 0 })

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const timer = window.setTimeout(() => setLoading(false), reducedMotion ? 450 : 1150)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('is-loading', loading)
    return () => document.body.classList.remove('is-loading')
  }, [loading])

  useEffect(() => {
    const track = projectTrackRef.current
    if (!track) return

    const update = () => {
      const distance = Math.max(0, track.scrollWidth - track.clientWidth)
      setProjectScroll({
        start: track.scrollLeft <= 2,
        end: track.scrollLeft >= distance - 2,
        progress: distance ? track.scrollLeft / distance : 1,
      })
    }
    update()
    track.addEventListener('scroll', update, { passive: true })
    const observer = new ResizeObserver(update)
    observer.observe(track)
    return () => {
      track.removeEventListener('scroll', update)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reducedMotion) {
      elements.forEach((element) => element.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' })

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  const moveProjects = (direction: -1 | 1) => {
    const track = projectTrackRef.current
    const card = track?.querySelector('li')
    if (!track || !card) return
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0
    track.scrollBy({
      left: direction * (card.getBoundingClientRect().width + gap),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    })
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
      }
    }
    const handleResize = () => {
      if (window.matchMedia('(min-width: 768px)').matches) setMenuOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
    <div className={`site-loader${loading ? '' : ' site-loader--hidden'}`} aria-hidden={!loading}>
      <svg className="loader-contours" viewBox="0 0 1000 700" aria-hidden="true" focusable="false">
        <g fill="none" stroke="#b58a60" strokeWidth="1">
          <path className="loader-contour loader-contour--one" d="M-80 520c180-170 290-164 432-52s262 108 390-10 240-144 338-64" />
          <path className="loader-contour loader-contour--two" d="M-120 610c176-146 294-149 429-50s260 94 395-13 242-128 347-57" />
          <path className="loader-contour loader-contour--three" d="M-70 410c152-115 275-111 405-15s262 102 403-22 216-121 309-70" />
          <path d="M0 118h1000M0 584h1000" strokeDasharray="2 12" opacity=".3" />
        </g>
      </svg>
      <div className="loader-content" role="status" aria-live="polite">
        <div className="loader-mark"><Image src="/logo.png" alt="Coreterra" width={110} height={110} priority /></div>
        <p className="loader-kicker">Konsultan Geoengineering</p>
        <p className="loader-wordmark">CORETERRA</p>
        <div className="loader-status"><span>Membaca data lapangan</span><span aria-hidden="true">Coreterra / Geoengineering</span></div>
        <div className="loader-progress" aria-hidden="true"><span /></div>
      </div>
    </div>
    <div className={`site-shell${loading ? '' : ' site-shell--ready'}`}>
    <main className="page" aria-busy={loading}>
      <section className="hero" id="home" aria-labelledby="hero-title">
        <svg className="hero-art" viewBox="0 0 500 500" aria-hidden="true">
          <defs><path id="hero-shapes" d="M202 144 322 24Q350-4 378 24l122 122v204L389 239l-46 46ZM201 151l68 68-68 68-48-48q-20-20 0-40Z" /><clipPath id="orange-shapes"><use href="#hero-shapes" /></clipPath><mask id="outside-shapes" maskUnits="userSpaceOnUse" x="0" y="0" width="500" height="500"><rect width="500" height="500" fill="white" /><use href="#hero-shapes" fill="black" /></mask><linearGradient id="hero-shade" x1="0" x2="1"><stop offset="0" stopColor="#101313" stopOpacity=".84" /><stop offset="1" stopColor="#101313" stopOpacity=".6" /></linearGradient><filter id="monochrome"><feColorMatrix type="saturate" values="0" /></filter><pattern id="diagonal-lines" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(31)"><path d="M0 0H8" stroke="#fff" strokeOpacity=".032" strokeWidth="2" /></pattern><linearGradient id="stripe-opacity"><stop stopColor="black" /><stop offset=".35" stopColor="white" /></linearGradient><mask id="stripe-fade"><rect width="500" height="500" fill="url(#stripe-opacity)" /></mask></defs>
          <image href="/hero-drilling-clean.png" width="500" height="350" preserveAspectRatio="xMidYMid slice" filter="url(#monochrome)" /><rect width="500" height="350" fill="url(#hero-shade)" mask="url(#outside-shapes)" /><rect width="500" height="350" fill="#8b623d" clipPath="url(#orange-shapes)" style={{ mixBlendMode: 'multiply' }} />
          <g mask="url(#outside-shapes)"><path d="M0 223 500 278v125H0Z" fill="#030404" /><path d="M0 241 500 296v107H0Z" fill="url(#diagonal-lines)" mask="url(#stripe-fade)" /></g><g clipPath="url(#orange-shapes)" stroke="#171b1b" strokeWidth="7" opacity=".9"><path d="M275 58 510 293M215 144 510 439" /></g>
        </svg>
        <header className="header">
          <a className="brand" href="#home" aria-label="Coreterra, kembali ke beranda"><span className="brand-mark"><Image src="/logo.png" alt="" width={80} height={80} priority /></span><span className="brand-name">CORETERRA</span><span className="brand-tagline">KONSULTAN GEOENGINEERING</span></a>
          <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="main-nav" onClick={() => setMenuOpen((open) => !open)}>Menu <span aria-hidden="true">☰</span></button>
          <nav id="main-nav" className={menuOpen ? 'is-open' : ''} aria-label="Navigasi utama"><a href="#home" onClick={() => setMenuOpen(false)}>Beranda</a><a href="#about" onClick={() => setMenuOpen(false)}>Tentang</a><a href="#services" onClick={() => setMenuOpen(false)}>Layanan</a><a href="#projects" onClick={() => setMenuOpen(false)}>Proyek</a><a href="#contact" onClick={() => setMenuOpen(false)}>Kontak</a></nav>
        </header>
        <div className="hero-copy" data-reveal="hero"><h1 id="hero-title">Kondisi lapangan.<br />Analisis geoteknik.<br />Arahan rekayasa.</h1><p>Konsultansi geoengineering untuk pertambangan,<br />infrastruktur, energi, dan eksplorasi.</p><a className="contact-button" href="#services">Lihat layanan</a></div>
        <a className="scroll-cue" data-reveal="cue" href="#about" aria-label="Gulir ke Tentang Kami"><span aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="m7 9.5 5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span></a>
      </section>

      <section className="about" id="about" aria-labelledby="about-title">
        <svg className="outline-decoration" viewBox="0 0 500 113" aria-hidden="true"><g fill="none" stroke="#a4a7a4" strokeWidth=".7"><path d="M-15 17 0 5Q10-2 20 9l100 104M-12 40l72 73M-12 68l45 45" /><path d="M0 113q2-8 5 0" /></g></svg>
        <div className="about-heading" data-reveal="about-heading"><p className="eyebrow">Tentang Coreterra</p><h2 id="about-title">Mengenal kondisi<br />bawah permukaan</h2></div>
        <p className="about-copy" data-reveal="about-copy">PT Coreterra Geo Engineering adalah konsultan geoengineering. Lingkup pengalamannya mencakup geoteknik tambang, investigasi fondasi, hidrologi–hidrogeologi, survei geofisika, dan eksplorasi untuk tambang, infrastruktur, serta energi.</p>
        <div className="photo photo-site" data-reveal="photo" role="img" aria-label="Peralatan dan aktivitas kerja lapangan Coreterra" />
        <div className="photo photo-team" data-reveal="photo" role="img" aria-label="Pekerjaan lapangan di area lereng dan aliran air" />
      </section>
      <div className="lower-decoration" aria-hidden="true" />

      <section className="services section-shell" id="services" aria-labelledby="services-title">
        <div className="section-intro" data-reveal="section"><p className="eyebrow">Bidang layanan</p><h2 id="services-title">Ruang lingkup<br />geoengineering.</h2><p>Kajian dan investigasi disusun sesuai persoalan teknis, kondisi lokasi, serta data yang dibutuhkan untuk mengambil keputusan.</p></div>
        <div className="service-grid">{services.map((service) => <article className="service-card" data-reveal="service" key={service.number}><div className="service-visual"><ServiceDiagram number={service.number} /></div><div className="service-body"><p className="service-kicker">Layanan {service.number}</p><h3>{service.title}</h3><p>{service.description}</p></div><span className="service-detail">{service.detail}</span></article>)}</div>
      </section>

      <section className="projects section-shell" id="projects" aria-labelledby="projects-title">
        <div className="projects-intro" data-reveal="section"><div><p className="eyebrow">Pengalaman proyek</p><h2 id="projects-title">Kajian di beragam<br />kondisi lapangan.</h2></div><p>Contoh pekerjaan Coreterra mencakup lokasi tambang, jalan angkut, fondasi, fasilitas energi, dan area eksplorasi di Indonesia serta Malaysia.</p></div>
        <div className="project-toolbar" data-reveal="toolbar"><p>Jelajahi proyek <span aria-hidden="true">/</span> 01—{String(projects.length).padStart(2, '0')}</p><div className="project-controls"><button type="button" onClick={() => moveProjects(-1)} disabled={projectScroll.start} aria-label="Lihat proyek sebelumnya">←</button><button type="button" onClick={() => moveProjects(1)} disabled={projectScroll.end} aria-label="Lihat proyek berikutnya">→</button></div></div>
        <ol className="project-list" ref={projectTrackRef} tabIndex={0} data-reveal="project-list" aria-label="Daftar pengalaman proyek; geser untuk melihat proyek lainnya" onKeyDown={(event) => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); moveProjects(event.key === 'ArrowRight' ? 1 : -1) } }}>{projects.map((project) => <li className="project-card" data-reveal="project" key={project.slug}><article><ProjectVisual project={project} /><div className="project-card-content"><div className="project-card-meta"><span className="project-number">{project.number} / {String(projects.length).padStart(2, '0')}</span><span className="project-location">{project.location}</span></div><p className="project-category">{project.category}</p><p className="project-client">{project.client}</p><h3>{project.title}</h3><p className="project-scope">{project.scope}</p><a className="project-read-more" href={`/proyek/${project.slug}`} aria-label={`Baca selengkapnya: ${project.title}`}>Baca selengkapnya <span aria-hidden="true">↗</span></a></div></article></li>)}</ol>
        <div className="project-progress" role="progressbar" aria-label="Posisi daftar proyek" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(projectScroll.progress * 100)}><span style={{ transform: `scaleX(${Math.max(.08, projectScroll.progress)})` }} /></div>
      </section>

    </main>
    <ContactFooter />
    </div>
    </>
  )
}
