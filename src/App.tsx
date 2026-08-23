import { useEffect, useRef, useState, type CSSProperties } from 'react'

const workflow = [
  ['01', 'Site Investigation', 'Drilling, mapping, surveying, and field observation to establish what is present at the site.', 'FIELD / OBSERVE'],
  ['02', 'Data Collection', 'Record, validate, and organize field and supporting data into a clear working evidence base.', 'RECORD / VALIDATE'],
  ['03', 'Analysis', 'Read the characteristics, risks, constraints, and relationships within the ground conditions.', 'INTERPRET / TEST'],
  ['04', 'Design & Recommendations', 'Translate the understanding into clear engineering recommendations that can guide project decisions.', 'DECIDE / APPLY'],
] as const

const observations = ['Soil and rock behaviour', 'Geological context', 'Site conditions and constraints', 'Evidence for engineering decisions']

function Brand({ compact = false }: { compact?: boolean }) {
  return <a className={`brand${compact ? ' brand--compact' : ''}`} href="#top" aria-label="Coreterra home"><img src="/logo.png" alt="" width="48" height="48" loading={compact ? 'lazy' : 'eager'} decoding="async" /><span><strong>CORETERRA</strong>{!compact && <small>GEOENGINEERING</small>}</span></a>
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

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  const pageRef = useReveal()

  useEffect(() => {
    let frame = 0
    const handleScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const nextScrolled = window.scrollY > 24
        setIsScrolled((current) => current === nextScrolled ? current : nextScrolled)
      })
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  return <div ref={pageRef} className="site-shell" id="top">
    <header className={`site-header${isScrolled ? ' is-scrolled' : ''}`}><div className="container header-inner"><Brand />
      <button className="menu-toggle" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} aria-controls="site-navigation" onClick={() => setMenuOpen((open) => !open)}><span>{menuOpen ? 'Close' : 'Menu'}</span><i aria-hidden="true"><b /><b /></i></button>
      <nav id="site-navigation" className={`site-nav${menuOpen ? ' is-open' : ''}`} aria-label="Primary navigation"><a href="#approach" onClick={() => setMenuOpen(false)}>Approach</a><a href="#workflow" onClick={() => setMenuOpen(false)}>Workflow</a><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a><a className="nav-cta" href="#contact" onClick={() => setMenuOpen(false)}>Start a conversation <span aria-hidden="true">↗</span></a></nav>
    </div></header>

    <main>
      <section ref={heroRef} className="hero" aria-labelledby="hero-title"><div className="hero-media"><img src="/hero-geotechnical-poster.png" alt="Geotechnical drilling rig carrying out field investigation in rugged mountainous terrain" width="1672" height="941" fetchPriority="high" decoding="async" /></div><div className="hero-scrim" aria-hidden="true" /><div className="hero-contours" aria-hidden="true"><span /><span /><span /><span /></div><div className="container hero-content"><div className="eyebrow eyebrow--light"><span className="eyebrow-rule" /> Geotechnical &amp; geoengineering consultancy</div><h1 id="hero-title">Understand the ground.<em>Engineer with confidence.</em></h1><p className="hero-copy">Better engineering decisions begin with a clear understanding of soil, rock, geology, and the conditions beneath a site.</p></div><div className="hero-meta" aria-hidden="true"><span>FIELD INVESTIGATION</span><span>GROUND CONDITIONS</span><span className="hero-meta-index">01 <i /> 04</span></div></section>

      <section id="approach" className="premise section-paper" data-reveal><div className="container premise-grid"><div className="section-label"><span>01</span><span>THE PREMISE</span></div><div className="premise-copy"><p className="kicker">The work starts below the surface</p><h2>Engineering confidence comes from <span>grounded understanding.</span></h2><p className="lead">Every site carries its own story in the soil, the rock, the water, and the landscape. Coreterra helps make that story legible—so technical decisions are based on evidence that can be understood, tested, and applied.</p><div className="rule-note"><span className="rule-note-mark">↳</span><span>From what is observed in the field<br />to what can be designed with clarity.</span></div></div><div className="premise-diagram" aria-hidden="true"><div className="diagram-axis"><span>GROUND SURFACE</span><i /></div><div className="strata strata-one"><i /><i /><i /></div><div className="strata strata-two"><i /><i /><i /></div><div className="depth-mark"><span>UNDERSTAND</span><b>↓</b><span>DECIDE</span></div></div></div></section>

      <section id="workflow" className="workflow section-charcoal" data-reveal><div className="container"><div className="section-heading section-heading--light"><div className="section-label section-label--light"><span>02</span><span>THE WORKFLOW</span></div><div><p className="kicker kicker--light">One connected engineering story</p><h2>Investigation becomes<br /><span>engineering direction.</span></h2></div><p className="heading-note">A considered sequence from field evidence to a decision the project team can use.</p></div><div className="workflow-line" aria-hidden="true"><span /></div><div className="workflow-list">{workflow.map(([number, title, text, tag], index) => <article className="workflow-step" data-reveal key={number} style={{ '--delay': `${index * 90}ms` } as CSSProperties}><div className="step-top"><span>{number}</span><i>{tag}</i></div><h3>{title}</h3><p>{text}</p><span className="step-arrow" aria-hidden="true">{index === workflow.length - 1 ? '✓' : '→'}</span></article>)}</div></div></section>

      <section className="evidence section-stone" data-reveal><div className="container evidence-grid"><div className="section-label"><span>03</span><span>WHAT WE LOOK FOR</span></div><div className="evidence-copy"><p className="kicker">Read the conditions that matter</p><h2>Useful insight is <span>specific to the site.</span></h2><p className="lead">The value of an investigation is not only in collecting information. It is in connecting observations to the questions that engineering needs to answer.</p><ul className="observation-list">{observations.map((item, index) => <li key={item}><span>0{index + 1}</span>{item}<b aria-hidden="true">↗</b></li>)}</ul></div><div className="evidence-card"><div className="card-top"><span>FIELD NOTE / 001</span><span>CORETERRA</span></div><div className="crosshair" aria-hidden="true"><i /><i /></div><div className="card-bottom"><span>OBSERVE</span><strong>→</strong><span>UNDERSTAND</span></div></div></div></section>

      <section id="contact" className="contact section-ink" data-reveal><div className="contact-contours" aria-hidden="true"><span /><span /><span /></div><div className="container contact-grid"><div className="section-label section-label--light"><span>04</span><span>THE NEXT STEP</span></div><div><p className="kicker kicker--light">Start with the ground</p><h2>Have a site to understand?</h2><p className="contact-copy">Tell us what you are working on. We can begin with the conditions, questions, and evidence that will shape the next engineering decision.</p><a className="button button--soil" href="mailto:admin.cge@coreterra-geo.com">Open a project conversation <span aria-hidden="true">↗</span></a></div><div className="contact-details"><span>DIRECT CONTACT</span><a href="mailto:admin.cge@coreterra-geo.com">admin.cge@coreterra-geo.com</a><a href="tel:+6281214914641">+62 812-1491-4641</a></div></div></section>
    </main>
    <footer className="site-footer"><div className="container footer-inner"><Brand compact /><p>Understand the ground. Engineer with confidence.</p><span>© {new Date().getFullYear()} Coreterra Geoengineering</span></div></footer>
  </div>
}

export default App
