import { Link, Navigate, useParams } from 'react-router-dom'
import { newsArticles } from '../data/news'

function NewsDetail() {
  const { slug } = useParams<{ slug: string }>()
  const article = newsArticles.find((item) => item.slug === slug)

  if (!article) return <Navigate to="/" replace />

  return <div className="news-detail-shell">
    <header className="news-detail-header"><Link className="news-detail-brand" to="/" aria-label="Back to Coreterra home"><img src="/logo.png" alt="" width="42" height="42" /><span><strong>CORETERRA</strong><small>GEOENGINEERING</small></span></Link><Link className="news-detail-back" to="/#industrial-news">Back to industrial news <span aria-hidden="true">-&gt;</span></Link></header>
    <main>
      <section className="news-detail-intro"><div className="news-detail-intro-inner"><p className="news-detail-kicker">{article.category}</p><h1>{article.title}</h1><p className="news-detail-summary">{article.summary}</p><div className="news-detail-meta"><span><b>CREATED_AT</b> {article.createdAt}</span><span>CORETERRA EDITORIAL</span></div></div></section>
      <section className="news-detail-article"><div className="news-detail-image"><img src="/hero-geotechnical-poster.png" alt="Geotechnical drilling field investigation" style={{ objectPosition: article.imagePosition }} /></div><div className="news-detail-body"><p className="news-detail-body-label">FIELD NOTE / {article.category.split(' / ')[0]}</p>{article.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<Link className="news-detail-cta" to="/#contact">Discuss a project <span aria-hidden="true">-&gt;</span></Link></div></section>
      <section className="news-related"><div className="news-related-heading"><p className="news-detail-body-label">CONTINUE READING</p><h2>More from industrial news.</h2></div><div className="news-related-list">{newsArticles.filter((item) => item.slug !== article.slug).slice(0, 3).map((item) => <Link className="news-related-card" key={item.slug} to={`/news/${item.slug}`}><span>{item.category}</span><strong>{item.title}</strong><small><b>CREATED_AT</b> {item.createdAt}</small><i aria-hidden="true">-&gt;</i></Link>)}</div></section>
    </main>
    <footer className="news-detail-footer"><span>Understand the ground. Engineer with confidence.</span><span>Copyright {new Date().getFullYear()} Coreterra Geoengineering</span></footer>
  </div>
}

export default NewsDetail
