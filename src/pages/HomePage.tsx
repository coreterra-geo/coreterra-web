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
      <section ref={heroRef} className="hero" aria-labelledby="hero-title"><div className="hero-media"><img src="/hero-geotechnical-poster.png" alt="Geotechnical drilling rig carrying out field investigation in rugged mountainous terrain" width="1672" height="941" fetchPriority="high" decoding="async" /></div><div className="hero-scrim" aria-hidden="true" /><div className="hero-contours" aria-hidden="true"><span /><span /><span /><span /></div><div className="container hero-content"><div className="eyebrow eyebrow--light"><span className="eyebrow-rule" /> Geotechnical &amp; geoengineering consultancy</div><h1 id="hero-title">Understand the ground.<em>Engineer with confidence.</em></h1><p className="hero-copy">Better engineering decisions begin with a clear understanding of soil, rock, geology, and the conditions beneath a site.</p></div><div className="hero-meta" aria-hidden="true"><span>FIELD INVESTIGATION</span><span>GROUND CONDITIONS</span><span className="hero-meta-index">01 <i /> 04</span></div></section>

      <section id="approach" className="premise section-paper" data-reveal><div className="container premise-grid"><div className="section-label"><span>01</span><span>THE PREMISE</span></div><div className="premise-copy"><p className="kicker">The work starts below the surface</p><h2>Engineering confidence comes from <span>grounded understanding.</span></h2><p className="lead">Every site carries its own story in the soil, the rock, the water, and the landscape. Coreterra helps make that story legible—so technical decisions are based on evidence that can be understood, tested, and applied.</p><div className="rule-note"><span className="rule-note-mark">-&gt;</span><span>From what is observed in the field<br />to what can be designed with clarity.</span></div></div><div className="premise-diagram" aria-hidden="true"><div className="diagram-axis"><span>GROUND SURFACE</span><i /></div><div className="strata strata-one"><i /><i /><i /></div><div className="strata strata-two"><i /><i /><i /></div><div className="depth-mark"><span>UNDERSTAND</span><b>v</b><span>DECIDE</span></div></div></div></section>

      <section id="workflow" className="workflow section-charcoal" data-reveal><div className="container"><div className="section-heading section-heading--light"><div className="section-label section-label--light"><span>02</span><span>THE WORKFLOW</span></div><div><p className="kicker kicker--light">One connected engineering story</p><h2>Investigation becomes<br /><span>engineering direction.</span></h2></div><p className="heading-note">A considered sequence from field evidence to a decision the project team can use.</p></div><div className="workflow-line" aria-hidden="true"><span /></div><div className="workflow-list">{workflow.map(([number, title, text, tag], index) => <article className="workflow-step" data-reveal key={number} style={{ '--delay': `${index * 90}ms` } as CSSProperties}><div className="step-top"><span>{number}</span><i>{tag}</i></div><h3>{title}</h3><p>{text}</p><span className="step-arrow" aria-hidden="true">{index === workflow.length - 1 ? 'OK' : '->'}</span></article>)}</div><div className="client-strip"><div className="client-strip-heading"><span>SELECTED COLLABORATIONS</span><span>CLIENTS / 01—04</span></div><div className="client-marquee" aria-label="Selected client collaborations"><div className="client-marquee-track">{[...clientPartners, ...clientPartners].map((client, index) => <div className="client-card" key={`${client}-${index}`}><span className="client-card-mark" aria-hidden="true">C</span><strong>{client}</strong><small>IDENTITY PENDING</small></div>)}</div></div></div></div></section>

      <section id="industrial-news" className="industrial-news section-stone" data-reveal><div className="container"><div className="section-heading news-section-heading"><div className="section-label"><span>03</span><span>INDUSTRIAL NEWS</span></div><div><p className="kicker">Signals worth following</p><h2>Stay close to the <span>conditions that matter.</span></h2></div><p className="heading-note">A concise editorial view on infrastructure, resilience, and engineering practice.</p></div><div className="news-carousel" onMouseEnter={() => setNewsPaused(true)} onMouseLeave={() => setNewsPaused(false)} onFocus={() => setNewsPaused(true)} onBlur={() => setNewsPaused(false)}><div className="news-viewport" onPointerDown={handleNewsPointerDown} onPointerUp={handleNewsPointerUp} onPointerCancel={() => { newsTouchStart.current = null }}><div className="news-track" style={{ '--news-index': newsIndex } as CSSProperties}>{newsArticles.map(({ category, title, summary, createdAt, imagePosition, slug }, index) => <article className="news-slide" key={slug} aria-hidden={index < newsIndex || index >= newsIndex + newsVisibleCount}><div className="news-slide-image"><img src="/hero-geotechnical-poster.png" alt="Geotechnical drilling field investigation" style={{ objectPosition: imagePosition }} /></div><div className="news-slide-content"><div className="news-slide-top"><span>{category}</span><span>FIELD NOTE / 0{index + 1}</span></div><div className="news-slide-body"><p className="news-date"><span>CREATED_AT</span> {createdAt}</p><h3>{title}</h3><p>{summary}</p><Link className="news-read-more" to={`/news/${slug}`}>Read more <span aria-hidden="true">-&gt;</span></Link></div><span className="news-slide-arrow" aria-hidden="true">-&gt;</span></div></article>)}</div></div><div className="news-controls"><div className="news-dots" role="tablist" aria-label="Industrial news slides">{newsArticles.map(({ slug }, index) => <button key={slug} type="button" role="tab" aria-label={`Show news slide ${index + 1}`} aria-selected={index === newsIndex} className={index === newsIndex ? 'is-active' : ''} onClick={() => setNewsIndex(Math.min(index, Math.max(0, newsArticles.length - newsVisibleCount)))}><span /></button>)}</div><div className="news-arrows"><button type="button" onClick={() => moveNews(-1)} aria-label="Previous industrial news">&lt;-</button><button type="button" onClick={() => moveNews(1)} aria-label="Next industrial news">-&gt;</button></div></div></div></div></section>

      <section id="contact" className="contact section-ink" data-reveal><div className="contact-contours" aria-hidden="true"><span /><span /><span /></div><div className="container contact-grid"><div className="section-label section-label--light"><span>04</span><span>THE NEXT STEP</span></div><div><p className="kicker kicker--light">Start with the ground</p><h2>Have a site to understand?</h2><p className="contact-copy">Tell us what you are working on. We can begin with the conditions, questions, and evidence that will shape the next engineering decision.</p><a className="button button--soil" href="mailto:admin.cge@coreterra-geo.com">Open a project conversation <span aria-hidden="true">-&gt;</span></a></div><div className="contact-details"><span>DIRECT CONTACT</span><a href="mailto:admin.cge@coreterra-geo.com">admin.cge@coreterra-geo.com</a><a href="tel:+6281214914641">+62 812-1491-4641</a></div></div></section>
    </main>
    <Footer />
  </div>
}

export default HomePage
