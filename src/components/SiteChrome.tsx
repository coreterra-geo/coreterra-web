import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

type CategoryItem = { label: string; value: string }

type NavbarProps = {
  categories?: CategoryItem[]
  activeCategory?: string
  onCategoryChange?: (value: string) => void
}

export function Navbar({ categories, activeCategory, onCategoryChange }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

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
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', handleScroll) }
  }, [])

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return <div className={categories ? 'global-navbar-stack' : undefined}>
    <header className={`site-header global-navbar${categories ? ' global-navbar--portal' : ''}${isScrolled ? ' is-scrolled' : ''}`}><div className="container header-inner"><Link className="brand" to="/" aria-label="Coreterra home"><img src="/logo.png" alt="" width="48" height="48" /><span><strong>CORETERRA</strong><small>GEOENGINEERING</small></span></Link><button className="menu-toggle" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} aria-controls="global-navigation" onClick={() => setMenuOpen((open) => !open)}><span>{menuOpen ? 'Close' : 'Menu'}</span><i aria-hidden="true"><b /><b /></i></button><nav id="global-navigation" className={`site-nav${menuOpen ? ' is-open' : ''}`} aria-label="Primary navigation"><Link to="/news" onClick={closeMenu}>Industrial News</Link><a className="nav-cta" href="/#contact" onClick={closeMenu}>Start a conversation <span aria-hidden="true">-&gt;</span></a><Link className="nav-login" to="/login" onClick={closeMenu}>Login <span aria-hidden="true">-&gt;</span></Link></nav></div></header>
    {categories && <nav className="global-category-bar" aria-label="News categories"><div className="container global-category-inner">{categories.map((category) => <button key={category.value} type="button" className={activeCategory === category.value ? 'is-active' : ''} onClick={() => onCategoryChange?.(category.value)}>{category.label}</button>)}</div></nav>}
  </div>
}

export function Footer() {
  return <footer className="site-footer"><div className="container footer-inner"><Link className="brand brand--compact" to="#top" aria-label="Coreterra home"><img src="/logo.png" alt="" width="31" height="31" /><span><strong>CORETERRA</strong></span></Link><p>Understand the ground. Engineer with confidence.</p><span>Copyright {new Date().getFullYear()} Coreterra Geoengineering</span></div></footer>
}
