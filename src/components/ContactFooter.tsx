import Image from 'next/image'

export default function ContactFooter() {
  return (
    <footer className="contact-section" id="contact" aria-labelledby="contact-title">
      <svg className="contact-geometry" viewBox="0 0 1440 150" preserveAspectRatio="none" aria-hidden="true">
        <path className="contact-geometry-base" d="M0 0H1440V86L0 150Z" />
        <path className="contact-geometry-bronze" d="M0 128L1440 64V86L0 150Z" />
        <path className="contact-geometry-line" d="M0 128L1440 64" />
      </svg>
      <svg className="contact-art" viewBox="0 0 1000 650" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <path id="footer-shapes" d="M360 185 600 25Q656-10 712 40l288 245v365H735L560 475l-96 96-96-96q-40-40 0-80Z" />
          <clipPath id="footer-bronze-shapes"><use href="#footer-shapes" /></clipPath>
          <mask id="footer-outside-shapes" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="650"><rect width="1000" height="650" fill="white" /><use href="#footer-shapes" fill="black" /></mask>
          <linearGradient id="footer-shade" x1="0" x2="1"><stop offset="0" stopColor="#101313" stopOpacity=".84" /><stop offset="1" stopColor="#101313" stopOpacity=".6" /></linearGradient>
          <filter id="footer-monochrome"><feColorMatrix type="saturate" values="0" /></filter>
          <pattern id="footer-diagonal-lines" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(31)"><path d="M0 0H8" stroke="#fff" strokeOpacity=".032" strokeWidth="2" /></pattern>
          <linearGradient id="footer-stripe-opacity"><stop stopColor="black" /><stop offset=".35" stopColor="white" /></linearGradient>
          <mask id="footer-stripe-fade"><rect width="1000" height="650" fill="url(#footer-stripe-opacity)" /></mask>
        </defs>
        <image href="/about-yard-clean.png" width="1000" height="650" preserveAspectRatio="xMidYMid slice" filter="url(#footer-monochrome)" opacity=".72" />
        <image href="/about-yard-clean.png" width="1000" height="650" preserveAspectRatio="xMidYMid slice" filter="url(#footer-monochrome)" opacity=".84" />
        <rect width="1000" height="650" fill="url(#footer-shade)" opacity=".76" />
        <rect width="1000" height="650" fill="#8b623d" clipPath="url(#footer-bronze-shapes)" opacity=".16" style={{ mixBlendMode: 'multiply' }} />
        <g mask="url(#footer-outside-shapes)"><path d="M0 438 1000 548v102H0Z" fill="#030404" /><path d="M0 456 1000 566v84H0Z" fill="url(#footer-diagonal-lines)" mask="url(#footer-stripe-fade)" /></g>
        <g fill="none" stroke="#a4a7a4" strokeWidth=".7" opacity=".55"><path d="M-30 82 0 52Q20 34 40 56l200 214M-24 128l144 142M-24 184l90 86" /><path d="M690 0 730 44l-36 36-48-48q-20-20 0-40Z" /></g>
      </svg>
      <div className="contact-inner">
        <div className="contact-topline">
          <a className="contact-brand" href="/#home" aria-label="Coreterra, kembali ke beranda"><span className="contact-brand-mark"><Image src="/logo.png" alt="" width={80} height={80} /></span><span><strong>CORETERRA</strong><small>KONSULTAN GEOENGINEERING</small></span></a>
        </div>
        <div className="contact-main">
          <div className="contact-heading"><p className="eyebrow">Kontak</p><h2 id="contact-title">Mari mulai dari<br />kondisi lapangan.</h2><p>Ceritakan kebutuhan kajian dan konteks lokasi Anda. Kami dapat memulai percakapan dari data yang sudah tersedia.</p></div>
          <div className="contact-methods" aria-label="Informasi kontak Coreterra">
            <div className="contact-detail-block"><span className="contact-method-label">Alamat kantor</span><address>Gardenia Estate Blok A5 No. 12A<br />Ciputat, Banten — Jawa Barat<br />Indonesia</address></div>
            <div className="contact-detail-block"><span className="contact-method-label">Kontak kami</span><a className="contact-method" href="mailto:admin.cge@coreterra-geo.com" aria-label="Kirim email ke Coreterra"><span className="contact-method-copy"><strong>admin.cge@coreterra-geo.com</strong><span className="contact-method-note">Kirim kebutuhan kajian dan konteks lokasi.</span></span><span className="contact-arrow" aria-hidden="true">↗</span></a><a className="contact-method" href="tel:+6281214914641" aria-label="Hubungi Coreterra melalui telepon"><span className="contact-method-copy"><strong>+62 812-1491-4641</strong><span className="contact-method-note">Diskusikan kebutuhan teknis secara langsung.</span></span><span className="contact-arrow" aria-hidden="true">↗</span></a></div>
          </div>
        </div>
        <div className="contact-bottomline"><p>© {new Date().getFullYear()} PT Coreterra Geo Engineering.</p><nav aria-label="Navigasi footer"><a href="/#about">Tentang</a><a href="/#services">Layanan</a><a href="/#projects">Proyek</a></nav></div>
      </div>
    </footer>
  )
}
