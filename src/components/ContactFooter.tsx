import Image from 'next/image'
import { siteCopy } from '@/data/projects'

export default function ContactFooter() {
  return (
    <footer className="relative isolate overflow-hidden bg-[#101313] text-white [container-type:inline-size]" id="contact" aria-labelledby="contact-title">
      <svg className="pointer-events-none absolute top-[-1px] left-0 z-[2] h-[clamp(86px,8.5cqw,122px)] w-full max-[767px]:h-[86px]" viewBox="0 0 1440 150" preserveAspectRatio="none" aria-hidden="true">
        <path className="fill-[#e3e0d9]" d="M0 0H1440V86L0 150Z" />
        <path className="fill-[#8b623d] opacity-[.68]" d="M0 128L1440 64V86L0 150Z" />
        <path className="fill-none stroke-[#d5c2ad] [stroke-width:1.5] [vector-effect:non-scaling-stroke]" d="M0 128L1440 64" />
      </svg>
      <svg className="pointer-events-none absolute inset-0 z-0 size-full" viewBox="0 0 1000 650" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
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
      <div className="relative z-[1] flex min-h-[650px] flex-col px-[9.6%] pt-[clamp(100px,10cqw,140px)] pb-6 max-[1100px]:px-[8%] max-[767px]:min-h-0 max-[767px]:px-[6%] max-[767px]:pt-[100px] max-[767px]:pb-[22px]">
        <div className="flex items-center justify-between gap-6">
          <a className="inline-flex items-center gap-4" href="/#home" aria-label={siteCopy.brand.homeLink}><span className="grid size-[62px] flex-none place-items-center rounded-full border border-[var(--coreterra-bronze-light)] bg-[#f1eee8e8] p-[7px] max-[767px]:size-[50px] max-[767px]:p-[6px]"><Image className="block size-full object-contain" src="/logo.png" alt="" width={80} height={80} /></span><span><strong className="block whitespace-nowrap text-[22px] leading-none font-extrabold tracking-[.2em] max-[767px]:text-lg">{siteCopy.brand.name}</strong><small className="mt-[7px] block whitespace-nowrap text-[9px] tracking-[.08em] text-[#e4ded5] max-[767px]:text-2xs">{siteCopy.brand.descriptor}</small></span></a>
        </div>
        <div className="grid flex-1 grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] items-center gap-[10%] py-[42px] pb-[50px] max-[1100px]:gap-[6%] max-[767px]:grid-cols-1 max-[767px]:gap-[34px] max-[767px]:py-[42px] max-[767px]:pb-12">
          <div>
            <p className="m-0 mb-[.8cqw] text-xs font-bold tracking-[.09em] text-[var(--coreterra-bronze-light)] uppercase before:mr-[.6cqw] before:inline-block before:h-px before:w-[1.6cqw] before:align-middle before:bg-[var(--coreterra-bronze-light)] before:content-[''] max-[1100px]:mb-3 max-[1100px]:before:mr-[6px] max-[1100px]:before:w-4">{siteCopy.navigation.contact}</p>
            <h2 className="m-0 text-section-title leading-tight-coreterra font-medium tracking-[-.02cqw] uppercase max-[767px]:text-section-title-mobile" id="contact-title">{siteCopy.footer.contactTitle[0]}<br />{siteCopy.footer.contactTitle[1]}</h2>
            <p className="mt-6 mb-0 max-w-[42ch] text-base leading-[1.65] text-[#d4d1cc] max-[767px]:mt-[18px] max-[767px]:text-[15px]">{siteCopy.footer.intro}</p>
          </div>
          <div className="grid gap-[18px] self-center border-b border-white/40" aria-label="Informasi kontak Coreterra">
            <div className="border-t border-white/40 pt-5"><span className="text-[11px] font-bold tracking-[.14em] text-[#d9ad80] uppercase">{siteCopy.footer.office}</span><address className="mt-[10px] mb-0 text-[15px] leading-[1.5] text-[#f2eee8] not-italic">{siteCopy.footer.address.map((line) => <span key={line}>{line}<br /></span>)}</address></div>
            <div className="border-t border-white/40 pt-5">
              <span className="text-[11px] font-bold tracking-[.14em] text-[#d9ad80] uppercase">{siteCopy.footer.contactMethods}</span>
              <a className="group grid min-h-[88px] grid-cols-[minmax(0,1fr)_26px] items-center gap-[18px] border-t border-white/40 py-[14px] transition-[padding-left,background] duration-300 hover:pl-[10px] hover:bg-[linear-gradient(90deg,#a8774422,transparent_80%)] motion-reduce:transition-none motion-reduce:hover:pl-0 max-[767px]:min-h-[82px] max-[767px]:grid-cols-[minmax(0,1fr)_23px] max-[767px]:gap-[10px] max-[767px]:py-3" href="mailto:admin.cge@coreterra-geo.com" aria-label="Kirim email ke Coreterra"><span className="flex min-w-0 flex-col gap-2"><strong className="min-w-0 text-contact leading-[1.25] font-medium tracking-[-.025em] wrap-anywhere max-[767px]:text-[clamp(17px,4.7vw,22px)]">admin.cge@coreterra-geo.com</strong><span className="text-[13px] leading-[1.5] text-[#d4d1cc]">Kirim kebutuhan kajian dan konteks lokasi.</span></span><span className="self-end text-[25px] leading-none transition-[transform,color] duration-300 group-hover:translate-x-[3px] group-hover:-translate-y-[3px] group-hover:text-[#d9ad80] motion-reduce:transition-none" aria-hidden="true">↗</span></a>
              <a className="group grid min-h-[88px] grid-cols-[minmax(0,1fr)_26px] items-center gap-[18px] border-t border-white/40 py-[14px] transition-[padding-left,background] duration-300 hover:pl-[10px] hover:bg-[linear-gradient(90deg,#a8774422,transparent_80%)] motion-reduce:transition-none motion-reduce:hover:pl-0 max-[767px]:min-h-[82px] max-[767px]:grid-cols-[minmax(0,1fr)_23px] max-[767px]:gap-[10px] max-[767px]:py-3" href="tel:+6281214914641" aria-label="Hubungi Coreterra melalui telepon"><span className="flex min-w-0 flex-col gap-2"><strong className="min-w-0 text-[clamp(19px,2cqw,29px)] leading-[1.25] font-medium tracking-[-.025em] wrap-anywhere max-[767px]:text-[clamp(17px,4.7vw,22px)]">+62 812-1491-4641</strong><span className="text-[13px] leading-[1.5] text-[#d4d1cc]">Diskusikan kebutuhan teknis secara langsung.</span></span><span className="self-end text-[25px] leading-none transition-[transform,color] duration-300 group-hover:translate-x-[3px] group-hover:-translate-y-[3px] group-hover:text-[#d9ad80] motion-reduce:transition-none" aria-hidden="true">↗</span></a>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-[1fr_auto] items-center gap-6 border-t border-white/40 pt-[18px] text-xs text-[#d4d1cc] max-[767px]:grid-cols-1 max-[767px]:justify-items-start max-[767px]:gap-[14px] [&>p]:m-0"><p>© {new Date().getFullYear()} PT Coreterra Geo Engineering.</p><nav className="static flex w-auto gap-6 border-0 bg-transparent p-0 shadow-none max-[767px]:gap-[22px] [&>a]:min-h-0 [&>a]:px-0 [&>a]:py-[6px] [&>a]:text-[11px] [&>a]:font-bold [&>a]:tracking-[.08em] [&>a]:text-[#d4d1cc] [&>a]:no-underline [&>a]:[text-shadow:none] [&>a:hover]:text-[#d9ad80]" aria-label="Navigasi footer"><a href="/#about">Tentang</a><a href="/#services">Layanan</a><a href="/#projects">Proyek</a></nav></div>
      </div>
    </footer>
  )
}
