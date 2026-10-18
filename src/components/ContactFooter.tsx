import Image from 'next/image'

export default function ContactFooter() {
  return (
    <footer className="contact-section" id="contact" aria-labelledby="contact-title">
      <svg className="contact-ridge" viewBox="0 0 1440 170" preserveAspectRatio="none" aria-hidden="true">
        <path className="contact-ridge-desktop" d="M0 0H1440V100C1380 103 1332 101 1277 107C1219 113 1174 98 1128 96C1082 94 1047 91 1001 82C956 73 918 65 876 73C821 84 783 98 729 105C677 112 628 102 580 92C529 82 500 83 458 94C409 107 364 107 319 100C270 93 229 87 185 94C124 104 66 115 0 107Z" />
        <path className="contact-ridge-mobile" d="M0 0H1440V96C1286 100 1193 83 1068 82C952 81 872 68 771 72C645 78 584 109 465 112C304 116 163 87 0 103Z" />
      </svg>
      <svg className="contact-art" viewBox="0 0 1000 650" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <filter id="footer-monochrome"><feColorMatrix type="saturate" values="0" /></filter>
          <linearGradient id="footer-photo-fade"><stop offset=".24" stopColor="#000" /><stop offset=".74" stopColor="#fff" /></linearGradient>
          <mask id="footer-photo-mask"><rect width="1000" height="650" fill="url(#footer-photo-fade)" /></mask>
          <pattern id="footer-hatch" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(31)"><path d="M0 0h10" stroke="#fff" strokeOpacity=".08" strokeWidth="2" /></pattern>
        </defs>
        <image href="/foundation-site.jpg" width="1000" height="650" preserveAspectRatio="xMidYMid slice" filter="url(#footer-monochrome)" opacity=".46" />
        <rect width="1000" height="650" fill="#0c0f0e" opacity=".84" />
        <g mask="url(#footer-photo-mask)">
          <image href="/foundation-site.jpg" width="1000" height="650" preserveAspectRatio="xMidYMid slice" filter="url(#footer-monochrome)" opacity=".72" />
          <rect width="1000" height="650" fill="#8b623d" opacity=".55" style={{ mixBlendMode: 'multiply' }} />
          <rect width="1000" height="650" fill="#0c0f0e" opacity=".25" />
          <rect width="1000" height="650" fill="url(#footer-hatch)" />
        </g>
      </svg>
      <div className="contact-inner">
        <div className="contact-topline">
          <a className="contact-brand" href="/#home" aria-label="Coreterra, kembali ke beranda"><span className="contact-brand-mark"><Image src="/logo.png" alt="" width={80} height={80} /></span><span><strong>CORETERRA</strong><small>KONSULTAN GEOENGINEERING</small></span></a>
          <span className="contact-coordinate" aria-hidden="true">CT / GEOENGINEERING</span>
        </div>
        <div className="contact-main">
          <div className="contact-heading"><p className="eyebrow">Kontak</p><h2 id="contact-title">Mari mulai dari<br />kondisi lapangan.</h2><p>Ceritakan kebutuhan kajian dan konteks lokasi Anda. Kami dapat memulai percakapan dari data yang sudah tersedia.</p></div>
          <div className="contact-methods" aria-label="Informasi kontak Coreterra">
            <a className="contact-method" href="mailto:admin.cge@coreterra-geo.com"><span className="contact-method-index" aria-hidden="true">01</span><span className="contact-method-copy"><span className="contact-label">Kirim email</span><strong>admin.cge@coreterra-geo.com</strong></span><span className="contact-arrow" aria-hidden="true">↗</span></a>
            <a className="contact-method" href="tel:+6281214914641"><span className="contact-method-index" aria-hidden="true">02</span><span className="contact-method-copy"><span className="contact-label">Hubungi kami</span><strong>+62 812-1491-4641</strong></span><span className="contact-arrow" aria-hidden="true">↗</span></a>
          </div>
        </div>
        <div className="contact-bottomline"><p>© {new Date().getFullYear()} PT Coreterra Geo Engineering.</p><nav aria-label="Navigasi footer"><a href="/#about">Tentang</a><a href="/#services">Layanan</a><a href="/#projects">Proyek</a></nav><a className="contact-backtop" href="/#home">Kembali ke atas <span aria-hidden="true">↑</span></a></div>
      </div>
    </footer>
  )
}
