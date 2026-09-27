import { useState } from 'react'
import { Link } from 'react-router-dom'
import { newsArticles } from '../data/news'
import { Footer, Navbar } from '../components/SiteChrome'

const categories = ['ALL NEWS', 'INFRASTRUCTURE', 'RESILIENCE', 'PRACTICE', 'FIELD WORK']

function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('ALL NEWS')
  const leadArticle = newsArticles[0]
  const latestArticles = newsArticles.slice(1)
  const visibleArticles = activeCategory === 'ALL NEWS'
    ? newsArticles
    : newsArticles.filter((article) => article.category.includes(activeCategory.split(' ')[0]))

  return <div className="portal-shell">
    <Navbar categories={categories.map((category) => ({ label: category, value: category }))} activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

    <main>
      <section className="portal-lead portal-container"><div className="portal-lead-image"><img src="/hero-geotechnical-poster.png" alt="Geotechnical drilling field investigation" style={{ objectPosition: leadArticle.imagePosition }} /><span>LEAD STORY</span></div><div className="portal-lead-copy"><p className="portal-label">{leadArticle.category}</p><h1>{leadArticle.title}</h1><p>{leadArticle.summary}</p><div className="portal-meta"><span><b>CREATED_AT</b> {leadArticle.createdAt}</span><Link to={`/news/${leadArticle.slug}`}>Read full story <span aria-hidden="true">-&gt;</span></Link></div></div></section>

      <section id="latest" className="portal-latest portal-container"><div className="portal-section-heading"><div><p className="portal-label">LIVE DESK</p><h2>Latest from the field.</h2></div><span className="portal-section-index">UPDATED / {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()}</span></div><div className="portal-latest-grid">{latestArticles.map((article, index) => <article className="portal-latest-card" key={article.slug}><div className="portal-latest-card-image"><img src="/hero-geotechnical-poster.png" alt="Geotechnical drilling field investigation" style={{ objectPosition: article.imagePosition }} /><span>0{index + 2}</span></div><div className="portal-latest-card-copy"><p className="portal-label">{article.category}</p><h3><Link to={`/news/${article.slug}`}>{article.title}</Link></h3><p>{article.summary}</p><div className="portal-meta"><span><b>CREATED_AT</b> {article.createdAt}</span><Link to={`/news/${article.slug}`} aria-label={`Read ${article.title}`}>-&gt;</Link></div></div></article>)}</div></section>

      <section id="topics" className="portal-topics"><div className="portal-container"><div className="portal-section-heading"><div><p className="portal-label">TOPIC INDEX</p><h2>Browse the coverage.</h2></div><span className="portal-section-index">{visibleArticles.length} NOTES</span></div><div className="portal-topic-filter">{categories.map((category) => <button key={category} type="button" className={activeCategory === category ? 'is-active' : ''} onClick={() => setActiveCategory(category)}>{category}</button>)}</div><div className="portal-news-list">{visibleArticles.map((article, index) => <Link className="portal-news-row" key={article.slug} to={`/news/${article.slug}`}><span className="portal-news-number">{String(index + 1).padStart(2, '0')}</span><span className="portal-news-category">{article.category}</span><strong>{article.title}</strong><span className="portal-news-date"><b>CREATED_AT</b> {article.createdAt}</span><span className="portal-news-arrow" aria-hidden="true">-&gt;</span></Link>)}</div></div></section>
    </main>
    <Footer />
  </div>
}

export default BlogPage
