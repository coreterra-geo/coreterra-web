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
    <svg viewBox="0 0 360 210" fill="none" aria-hidden="true" focusable="false">
      <g stroke="#a9a49b" strokeWidth="1">
        <path d="M0 42h360M0 105h360M0 167h360" />
        <path d="M32 0v210M328 0v210" strokeDasharray="3 7" />
        <path d="M0 138 360 128M0 181l360-11" strokeDasharray="5 5" />
      </g>
      {number === '01' && (
        <g stroke="#684628" strokeWidth="2">
          <path d="M174 17v172M188 17v172M174 25h14M174 183h14" />
          <path d="M164 42h34M164 105h34M164 167h34" strokeWidth="1" />
          <circle cx="181" cy="44" r="27" strokeWidth="1" />
          <circle cx="181" cy="105" r="39" strokeWidth="1" strokeDasharray="3 5" />
          <path d="M69 65h65m94 62h61M99 58v14m160 48v14" strokeWidth="1" />
        </g>
      )}
      {number === '02' && (
        <g stroke="#684628" strokeWidth="2">
          <path d="M20 78h80l58-34h72l38 28h72" />
          <path d="M39 133c65-6 82-40 136-42 58-2 84 36 147 29" />
          <path d="M60 159c74-3 87-31 125-34 55-5 82 28 143 20" strokeWidth="1" />
          <path d="M158 44v124m110-96v98" strokeDasharray="4 5" strokeWidth="1" />
          <circle cx="158" cy="44" r="4" fill="#684628" /><circle cx="268" cy="72" r="4" fill="#684628" />
        </g>
      )}
      {number === '03' && (
        <g stroke="#684628" strokeWidth="2">
          <path d="M20 68c57-18 90-18 144 0s112 18 176-3" />
          <path d="M20 115c57-18 90-18 144 0s112 18 176-3M20 152c57-18 90-18 144 0s112 18 176-3" strokeWidth="1" />
          <path d="M116 16v168m16-168v168M116 38h16M116 170h16" />
          <path d="M79 100h90M69 108h100" strokeWidth="1" strokeDasharray="4 5" />
          <path d="m224 56 9 16 9-16m20 42 9 16 9-16" strokeWidth="1" />
        </g>
      )}
      {number === '04' && (
        <g stroke="#684628" strokeWidth="2">
          <path d="M27 117c29 0 34-61 59-61s28 76 59 76 32-42 60-42 33 69 62 69 31-48 66-48" />
          <path d="M25 170h310M50 170v-88m63 88V42m63 128V91m63 79v-63m64 63V82" strokeWidth="1" strokeDasharray="4 5" />
          <circle cx="86" cy="56" r="5" fill="#684628" /><circle cx="205" cy="90" r="5" fill="#684628" /><circle cx="267" cy="159" r="5" fill="#684628" />
        </g>
      )}
      <g stroke="#684628" strokeWidth="1"><path d="M18 18h22M18 18v22M342 18h-22M342 18v22M18 192h22M18 192v-22M342 192h-22M342 192v-22" /></g>
    </svg>
  )
}

export default function HomeInteractive() {
  const [menuOpen, setMenuOpen] = useState(false)
  const projectTrackRef = useRef<HTMLOListElement>(null)
  const [projectScroll, setProjectScroll] = useState({ start: true, end: false, progress: 0 })

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
    <main className="page">
      <section className="hero" id="home" aria-labelledby="hero-title">
        <svg className="hero-art" viewBox="0 0 500 500" aria-hidden="true">
          <defs><path id="hero-shapes" d="M202 144 322 24Q350-4 378 24l122 122v204L389 239l-46 46ZM201 151l68 68-68 68-48-48q-20-20 0-40Z" /><clipPath id="orange-shapes"><use href="#hero-shapes" /></clipPath><mask id="outside-shapes" maskUnits="userSpaceOnUse" x="0" y="0" width="500" height="500"><rect width="500" height="500" fill="white" /><use href="#hero-shapes" fill="black" /></mask><linearGradient id="hero-shade" x1="0" x2="1"><stop offset="0" stopColor="#101313" stopOpacity=".84" /><stop offset="1" stopColor="#101313" stopOpacity=".6" /></linearGradient><filter id="monochrome"><feColorMatrix type="saturate" values="0" /></filter><pattern id="diagonal-lines" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(31)"><path d="M0 0H8" stroke="#fff" strokeOpacity=".032" strokeWidth="2" /></pattern><linearGradient id="stripe-opacity"><stop stopColor="black" /><stop offset=".35" stopColor="white" /></linearGradient><mask id="stripe-fade"><rect width="500" height="500" fill="url(#stripe-opacity)" /></mask></defs>
          <image href="/foundation-site.jpg" width="500" height="350" preserveAspectRatio="xMidYMid slice" filter="url(#monochrome)" /><rect width="500" height="350" fill="url(#hero-shade)" mask="url(#outside-shapes)" /><rect width="500" height="350" fill="#8b623d" clipPath="url(#orange-shapes)" style={{ mixBlendMode: 'multiply' }} />
          <g mask="url(#outside-shapes)"><path d="M0 223 500 278v125H0Z" fill="#030404" /><path d="M0 241 500 296v107H0Z" fill="url(#diagonal-lines)" mask="url(#stripe-fade)" /></g><g clipPath="url(#orange-shapes)" stroke="#171b1b" strokeWidth="7" opacity=".9"><path d="M275 58 510 293M215 144 510 439" /></g>
        </svg>
        <header className="header">
          <a className="brand" href="#home" aria-label="Coreterra, kembali ke beranda"><span className="brand-mark"><Image src="/logo.png" alt="" width={80} height={80} priority /></span><span className="brand-name">CORETERRA</span><span className="brand-tagline">KONSULTAN GEOENGINEERING</span></a>
          <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="main-nav" onClick={() => setMenuOpen((open) => !open)}>Menu <span aria-hidden="true">☰</span></button>
          <nav id="main-nav" className={menuOpen ? 'is-open' : ''} aria-label="Navigasi utama"><a href="#home" onClick={() => setMenuOpen(false)}>Beranda</a><a href="#about" onClick={() => setMenuOpen(false)}>Tentang</a><a href="#services" onClick={() => setMenuOpen(false)}>Layanan</a><a href="#projects" onClick={() => setMenuOpen(false)}>Proyek</a><a href="#contact" onClick={() => setMenuOpen(false)}>Kontak</a></nav>
        </header>
        <div className="hero-copy"><h1 id="hero-title">Kondisi lapangan.<br />Analisis geoteknik.<br />Arahan rekayasa.</h1><p>Konsultansi geoengineering untuk pertambangan,<br />infrastruktur, energi, dan eksplorasi.</p><a className="contact-button" href="#services">Lihat layanan</a></div>
        <a className="scroll-cue" href="#about" aria-label="Gulir ke Tentang Kami"><span aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="m7 9.5 5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span></a>
      </section>

      <section className="about" id="about" aria-labelledby="about-title">
        <svg className="outline-decoration" viewBox="0 0 500 113" aria-hidden="true"><g fill="none" stroke="#a4a7a4" strokeWidth=".7"><path d="M-15 17 0 5Q10-2 20 9l100 104M-12 40l72 73M-12 68l45 45" /><path d="M0 113q2-8 5 0" /></g></svg>
        <div className="about-heading"><p className="eyebrow">Tentang Coreterra</p><h2 id="about-title">Mengenal kondisi<br />bawah permukaan</h2></div>
        <p className="about-copy">PT Coreterra Geo Engineering adalah konsultan geoengineering. Lingkup pengalamannya mencakup geoteknik tambang, investigasi fondasi, hidrologi–hidrogeologi, survei geofisika, dan eksplorasi untuk tambang, infrastruktur, serta energi.</p>
        <div className="photo photo-site" role="img" aria-label="Operator bekerja di dekat alat pengeboran tanah" />
        <div className="photo photo-team" role="img" aria-label="Mata bor menggali tanah di lokasi konstruksi" />
      </section>
      <div className="lower-decoration" aria-hidden="true" />

      <section className="services section-shell" id="services" aria-labelledby="services-title">
        <div className="section-intro"><p className="eyebrow">Bidang layanan</p><span className="section-index" aria-hidden="true">CORETERRA / 01—04</span><h2 id="services-title">Ruang lingkup<br />geoengineering.</h2><p>Kajian dan investigasi disusun sesuai persoalan teknis, kondisi lokasi, serta data yang dibutuhkan untuk mengambil keputusan.</p></div>
        <div className="service-grid">{services.map((service) => <article className="service-card" key={service.number}><div className="service-visual"><ServiceDiagram number={service.number} /></div><div className="service-index"><span className="service-number" aria-hidden="true">{service.number}</span><span aria-hidden="true">/ 04</span></div><div className="service-body"><h3>{service.title}</h3><p>{service.description}</p></div><span className="service-detail">{service.detail}</span></article>)}</div>
      </section>

      <section className="projects section-shell" id="projects" aria-labelledby="projects-title">
        <div className="projects-intro"><div><p className="eyebrow">Pengalaman proyek</p><h2 id="projects-title">Kajian di beragam<br />kondisi lapangan.</h2></div><p>Contoh pekerjaan Coreterra mencakup lokasi tambang, jalan angkut, fondasi, fasilitas energi, dan area eksplorasi di Indonesia serta Malaysia.</p></div>
        <div className="project-toolbar"><p>Jelajahi proyek <span aria-hidden="true">/</span> 01—{String(projects.length).padStart(2, '0')}</p><div className="project-controls"><button type="button" onClick={() => moveProjects(-1)} disabled={projectScroll.start} aria-label="Lihat proyek sebelumnya">←</button><button type="button" onClick={() => moveProjects(1)} disabled={projectScroll.end} aria-label="Lihat proyek berikutnya">→</button></div></div>
        <ol className="project-list" ref={projectTrackRef} tabIndex={0} aria-label="Daftar pengalaman proyek; geser untuk melihat proyek lainnya" onKeyDown={(event) => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); moveProjects(event.key === 'ArrowRight' ? 1 : -1) } }}>{projects.map((project) => <li className="project-card" key={project.slug}><article><ProjectVisual project={project} /><div className="project-card-content"><div className="project-card-meta"><span className="project-number">{project.number} / {String(projects.length).padStart(2, '0')}</span><span className="project-location">{project.location}</span></div><p className="project-category">{project.category}</p><h3>{project.title}</h3><p className="project-scope">{project.scope}</p><a className="project-read-more" href={`/proyek/${project.slug}`} aria-label={`Baca selengkapnya: ${project.title}`}>Baca selengkapnya <span aria-hidden="true">↗</span></a></div></article></li>)}</ol>
        <div className="project-progress" role="progressbar" aria-label="Posisi daftar proyek" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(projectScroll.progress * 100)}><span style={{ transform: `scaleX(${Math.max(.08, projectScroll.progress)})` }} /></div>
      </section>

    </main>
    <ContactFooter />
    </>
  )
}
