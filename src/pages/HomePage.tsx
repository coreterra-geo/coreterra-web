import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react'
import { Link } from 'react-router-dom'
import { newsArticles as allNewsArticles } from '../data/news'
import { Footer, Navbar } from '../components/SiteChrome'

const workflow = [
  ['01', 'Site Investigation', 'Drilling, mapping, surveying, and field observation to establish what is present at the site.', 'FIELD / OBSERVE'],
  ['02', 'Data Collection', 'Record, validate, and organize field and supporting data into a clear working evidence base.', 'RECORD / VALIDATE'],
  ['03', 'Analysis', 'Read the characteristics, risks, constraints, and relationships within the ground conditions.', 'INTERPRET / TEST'],
  ['04', 'Design & Recommendations', 'Translate the understanding into clear engineering recommendations that can guide project decisions.', 'DECIDE / APPLY'],
] as const

const clientPartners = ['CLIENT MARK / 01', 'CLIENT MARK / 02', 'CLIENT MARK / 03', 'CLIENT MARK / 04']
const highlightedNews = allNewsArticles.slice(0, 3)
const newsArticles = highlightedNews

const heroSlides = [
  { src: '/hero-engineer-stipple.avif', alt: 'Field engineer wearing a safety helmet rendered as a high-contrast monochrome stipple portrait' },
  { src: '/hero-deer-stipple.avif', alt: 'Sambar deer rendered as a monochrome stipple illustration' },
  { src: '/hero-excavator-stipple.avif', alt: 'Tracked excavator rendered as a monochrome stipple illustration' },
] as const

const HERO_PARTICLE_COUNT = 9000

function HeroMedia() {
  const [activeSlide, setActiveSlide] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return

    let frameId = 0
    let width = 0
    let height = 0
    let active = 0
    let next = 1
    let lastCycle = -1
    let startedAt = 0
    let targets: Float32Array[] = []
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const scatter = new Float32Array(HERO_PARTICLE_COUNT * 2)
    for (let index = 0; index < HERO_PARTICLE_COUNT; index += 1) {
      scatter[index * 2] = ((index * 97) % 10000) / 10000
      scatter[index * 2 + 1] = ((index * 193) % 10000) / 10000
    }

    const resize = () => {
      const bounds = canvas.getBoundingClientRect()
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5)
      width = Math.max(1, Math.floor(bounds.width * ratio))
      height = Math.max(1, Math.floor(bounds.height * ratio))
      canvas.width = width
      canvas.height = height
    }

    const sampleImage = (source: HTMLImageElement) => {
      const sourceCanvas = document.createElement('canvas')
      sourceCanvas.width = 640
      sourceCanvas.height = 360
      const sourceContext = sourceCanvas.getContext('2d')
      if (!sourceContext) return new Float32Array(HERO_PARTICLE_COUNT * 2)
      sourceContext.drawImage(source, 0, 0, 640, 360)
      const pixels = sourceContext.getImageData(0, 0, 640, 360).data
      const points: Array<[number, number]> = []
      for (let y = 0; y < 360; y += 2) {
        for (let x = 0; x < 640; x += 2) {
          const offset = (y * 640 + x) * 4
          const brightness = (pixels[offset] + pixels[offset + 1] + pixels[offset + 2]) / 3
          const darkness = Math.max(0, Math.min(1, (242 - brightness) / 205))
          const noise = ((x * 9283 + y * 6899) % 997) / 997
          if (darkness > .06 && noise < darkness * .92) points.push([x / 640, y / 360])
        }
      }
      const target = new Float32Array(HERO_PARTICLE_COUNT * 2)
      for (let index = 0; index < HERO_PARTICLE_COUNT; index += 1) {
        const point = points[(index * 73) % Math.max(1, points.length)] ?? [.5, .5]
        target[index * 2] = point[0]
        target[index * 2 + 1] = point[1]
      }
      return target
    }

    const ease = (value: number) => {
      const clamped = Math.max(0, Math.min(1, value))
      return clamped * clamped * (3 - 2 * clamped)
    }
    const draw = (time: number) => {
      if (targets.length !== heroSlides.length) {
        frameId = requestAnimationFrame(draw)
        return
      }

      const elapsed = time - startedAt
      const holdDuration = 5200
      const scatterDuration = 1400
      const formDuration = 2600
      const cycleDuration = holdDuration + scatterDuration + formDuration
      const cycleTime = reduceMotion ? 0 : elapsed % cycleDuration
      const cycleIndex = reduceMotion ? 0 : Math.floor(elapsed / cycleDuration)
      const phase = cycleTime < holdDuration ? 0 : cycleTime < holdDuration + scatterDuration ? 1 : 2
      const phaseTime = phase === 0 ? cycleTime / holdDuration : phase === 1 ? (cycleTime - holdDuration) / scatterDuration : (cycleTime - holdDuration - scatterDuration) / formDuration

      if (cycleIndex !== lastCycle) {
        if (lastCycle >= 0) {
          active = next
          next = (active + 1) % heroSlides.length
          setActiveSlide(active)
        }
        lastCycle = cycleIndex
      }

      context.clearRect(0, 0, width, height)
      context.fillStyle = '#242321'
      context.globalAlpha = phase === 1 ? .9 : 1
      const currentTarget = targets[active]
      const nextTarget = targets[next]
      for (let index = 0; index < HERO_PARTICLE_COUNT; index += 1) {
        const offset = index * 2
        const currentX = currentTarget[offset]
        const currentY = currentTarget[offset + 1]
        const nextX = nextTarget[offset]
        const nextY = nextTarget[offset + 1]
        const side = index % 2 === 0 ? 1 : -1
        const spread = .22 + scatter[offset] * .42
        const burstX = currentX + side * spread
        const burstY = currentY + (scatter[offset + 1] - .5) * .28 - spread * .08
        const burstProgress = ease(phaseTime)
        const pointX = phase === 0 ? currentX : phase === 1 ? currentX + (burstX - currentX) * burstProgress : burstX + (nextX - burstX) * burstProgress
        const pointY = phase === 0 ? currentY : phase === 1 ? currentY + (burstY - currentY) * burstProgress : burstY + (nextY - burstY) * burstProgress
        const motionScale = phase === 1 ? Math.sin(burstProgress * Math.PI) : 0
        const sizeSeed = (index * 37) % 100
        const baseSize = sizeSeed > 92 ? 2.8 : sizeSeed > 66 ? 2.15 : 1.65
        const size = baseSize * (1 + motionScale * .55)
        context.fillRect(pointX * width, pointY * height, size, size)
      }
      context.globalAlpha = 1
      if (!reduceMotion) frameId = requestAnimationFrame(draw)
    }

    const images = heroSlides.map(() => new Image())
    Promise.all(images.map((image, index) => new Promise<void>((resolve) => {
      image.onload = () => resolve()
      image.src = heroSlides[index].src
    }))).then(() => {
      targets = images.map(sampleImage)
      startedAt = performance.now()
      resize()
      draw(startedAt)
      if (!reduceMotion) frameId = requestAnimationFrame(draw)
    })

    resize()
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)
    return () => { cancelAnimationFrame(frameId); resizeObserver.disconnect() }
  }, [])

  return <div className="hero-media" aria-label="Coreterra visual sequence">
    <canvas ref={canvasRef} className="hero-particle-canvas" role="img" aria-label={heroSlides[activeSlide].alt} />
    <div className="hero-media-frame" aria-hidden="true"><span className="hero-media-frame-dot" /> VISUAL STUDY / 0{activeSlide + 1}</div>
    <div className="hero-progress" aria-hidden="true">{heroSlides.map((slide, index) => <i className={index === activeSlide ? 'is-active' : ''} key={slide.src} />)}</div>
  </div>
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const items = node.querySelectorAll<HTMLElement>('[data-reveal]')
    if (!('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('is-visible'))
      return
    }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target) }
    }), { threshold: 0.12 })
    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])
  return ref
}

function HomePage() {
  const [newsIndex, setNewsIndex] = useState(0)
  const [newsPaused, setNewsPaused] = useState(false)
  const [newsVisibleCount, setNewsVisibleCount] = useState(2)
  const newsTouchStart = useRef<number | null>(null)
  const heroRef = useRef<HTMLElement>(null)
  const pageRef = useReveal()
  const lastNewsIndex = Math.max(0, highlightedNews.length - newsVisibleCount)
  const activeNewsIndex = Math.min(newsIndex, lastNewsIndex)

  const moveNews = (direction: number) => {
    setNewsIndex(() => {
      if (direction > 0) return activeNewsIndex >= lastNewsIndex ? 0 : activeNewsIndex + 1
      return activeNewsIndex <= 0 ? lastNewsIndex : activeNewsIndex - 1
    })
  }

  useEffect(() => {
    if (newsPaused) return
    const interval = window.setInterval(() => setNewsIndex((current) => {
      const lastIndex = Math.max(0, highlightedNews.length - newsVisibleCount)
      return current >= lastIndex ? 0 : current + 1
    }), 5200)
    return () => window.clearInterval(interval)
  }, [newsPaused, newsVisibleCount])

  useEffect(() => {
    const updateVisibleCount = () => {
      const nextVisibleCount = window.innerWidth <= 640 ? 1 : 2
      setNewsVisibleCount(nextVisibleCount)
      setNewsIndex((current) => Math.min(current, Math.max(0, highlightedNews.length - nextVisibleCount)))
    }
    updateVisibleCount()
    window.addEventListener('resize', updateVisibleCount)
    return () => window.removeEventListener('resize', updateVisibleCount)
  }, [])

  const handleNewsPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    newsTouchStart.current = event.clientX
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handleNewsPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (newsTouchStart.current === null) return
    const distance = event.clientX - newsTouchStart.current
    if (Math.abs(distance) > 45) moveNews(distance < 0 ? 1 : -1)
    newsTouchStart.current = null
  }

  return <div ref={pageRef} className="site-shell" id="top">
    <Navbar />

    <main>
      <section ref={heroRef} className="hero" aria-labelledby="hero-title"><HeroMedia /><div className="hero-scrim" aria-hidden="true" /><div className="hero-contours" aria-hidden="true"><span /><span /><span /><span /></div><div className="container hero-content"><div className="eyebrow eyebrow--light"><span className="eyebrow-rule" /> Geotechnical &amp; geoengineering consultancy</div><h1 id="hero-title">Understand the ground.<em>Engineer with confidence.</em></h1><p className="hero-copy">Better engineering decisions begin with a clear understanding of soil, rock, geology, and the conditions beneath a site.</p></div><div className="hero-meta" aria-hidden="true"><span>FIELD INVESTIGATION</span><span>GROUND CONDITIONS</span><span className="hero-meta-index">01 <i /> 04</span></div></section>

      <section id="approach" className="premise section-paper" data-reveal><div className="container premise-grid"><div className="section-label"><span>01</span><span>THE PREMISE</span></div><div className="premise-copy"><p className="kicker">The work starts below the surface</p><h2>Engineering confidence comes from <span>grounded understanding.</span></h2><p className="lead">Every site carries its own story in the soil, the rock, the water, and the landscape. Coreterra helps make that story legible—so technical decisions are based on evidence that can be understood, tested, and applied.</p><div className="rule-note"><span className="rule-note-mark">-&gt;</span><span>From what is observed in the field<br />to what can be designed with clarity.</span></div></div><div className="premise-diagram" aria-hidden="true"><div className="diagram-axis"><span>GROUND SURFACE</span><i /></div><div className="strata strata-one"><i /><i /><i /></div><div className="strata strata-two"><i /><i /><i /></div><div className="depth-mark"><span>UNDERSTAND</span><b>v</b><span>DECIDE</span></div></div></div></section>

      <section id="workflow" className="workflow section-charcoal" data-reveal><div className="container"><div className="section-heading section-heading--light"><div className="section-label section-label--light"><span>02</span><span>THE WORKFLOW</span></div><div><p className="kicker kicker--light">One connected engineering story</p><h2>Investigation becomes<br /><span>engineering direction.</span></h2></div><p className="heading-note">A considered sequence from field evidence to a decision the project team can use.</p></div><div className="workflow-line" aria-hidden="true"><span /></div><div className="workflow-list">{workflow.map(([number, title, text, tag], index) => <article className="workflow-step" data-reveal key={number} style={{ '--delay': `${index * 90}ms` } as CSSProperties}><div className="step-top"><span>{number}</span><i>{tag}</i></div><h3>{title}</h3><p>{text}</p><span className="step-arrow" aria-hidden="true">{index === workflow.length - 1 ? 'OK' : '->'}</span></article>)}</div><div className="client-strip"><div className="client-strip-heading"><span>SELECTED COLLABORATIONS</span><span>CLIENTS / 01—04</span></div><div className="client-marquee" aria-label="Selected client collaborations"><div className="client-marquee-track">{[...clientPartners, ...clientPartners].map((client, index) => <div className="client-card" key={`${client}-${index}`}><span className="client-card-mark" aria-hidden="true">C</span><strong>{client}</strong><small>IDENTITY PENDING</small></div>)}</div></div></div></div></section>

      <section id="industrial-news" className="industrial-news section-stone" data-reveal><div className="container"><div className="section-heading news-section-heading"><div className="section-label"><span>03</span><span>INDUSTRIAL NEWS</span></div><div><p className="kicker">Signals worth following</p><h2>Stay close to the <span>conditions that matter.</span></h2></div><p className="heading-note">A concise editorial view on infrastructure, resilience, and engineering practice.</p></div><div className="news-carousel" onMouseEnter={() => setNewsPaused(true)} onMouseLeave={() => setNewsPaused(false)} onFocus={() => setNewsPaused(true)} onBlur={() => setNewsPaused(false)}><div className="news-viewport" onPointerDown={handleNewsPointerDown} onPointerUp={handleNewsPointerUp} onPointerCancel={() => { newsTouchStart.current = null }}><div className="news-track" style={{ '--news-index': newsIndex } as CSSProperties}>{newsArticles.map(({ category, title, summary, createdAt, imagePosition, slug }, index) => <article className="news-slide" key={slug} aria-hidden={index < newsIndex || index >= newsIndex + newsVisibleCount}><div className="news-slide-image"><img src="/hero-geotechnical-poster.png" alt="Geotechnical drilling field investigation" style={{ objectPosition: imagePosition }} /></div><div className="news-slide-content"><div className="news-slide-top"><span>{category}</span><span>FIELD NOTE / 0{index + 1}</span></div><div className="news-slide-body"><p className="news-date"><span>CREATED_AT</span> {createdAt}</p><h3>{title}</h3><p>{summary}</p><Link className="news-read-more" to={`/news/${slug}`}>Read more <span aria-hidden="true">-&gt;</span></Link></div><span className="news-slide-arrow" aria-hidden="true">-&gt;</span></div></article>)}</div></div><div className="news-controls"><div className="news-dots" role="tablist" aria-label="Industrial news slides">{newsArticles.map(({ slug }, index) => <button key={slug} type="button" role="tab" aria-label={`Show news slide ${index + 1}`} aria-selected={index === newsIndex} className={index === newsIndex ? 'is-active' : ''} onClick={() => setNewsIndex(Math.min(index, Math.max(0, newsArticles.length - newsVisibleCount)))}><span /></button>)}</div><div className="news-arrows"><button type="button" onClick={() => moveNews(-1)} aria-label="Previous industrial news">&lt;-</button><button type="button" onClick={() => moveNews(1)} aria-label="Next industrial news">-&gt;</button></div></div></div></div></section>

      <section id="contact" className="contact section-ink" data-reveal><div className="contact-contours" aria-hidden="true"><span /><span /><span /></div><div className="container contact-grid"><div className="section-label section-label--light"><span>04</span><span>THE NEXT STEP</span></div><div><p className="kicker kicker--light">Start with the ground</p><h2>Have a site to understand?</h2><p className="contact-copy">Tell us what you are working on. We can begin with the conditions, questions, and evidence that will shape the next engineering decision.</p><a className="button button--soil" href="mailto:admin.cge@coreterra-geo.com">Open a project conversation <span aria-hidden="true">-&gt;</span></a></div><div className="contact-details"><span>DIRECT CONTACT</span><a href="mailto:admin.cge@coreterra-geo.com">admin.cge@coreterra-geo.com</a><a href="tel:+6281214914641">+62 812-1491-4641</a></div></div></section>
    </main>
    <Footer />
  </div>
}

export default HomePage
