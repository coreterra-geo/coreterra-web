import Link from 'next/link'

export default function NotFound() {
  return <main className="grid min-h-screen place-items-center bg-[#1e211f] px-6 text-[#f8f6f1]"><div className="max-w-md text-center"><p className="text-xs font-bold uppercase tracking-[.14em] text-[#c79a6b]">404 / Halaman tidak ditemukan</p><h1 className="mt-5 text-4xl font-semibold tracking-[-.04em] sm:text-6xl">Halaman tidak tersedia.</h1><p className="mt-6 text-base leading-7 text-white/70">Alamat yang Anda buka tidak ditemukan. Kembali ke beranda untuk melihat layanan dan pengalaman proyek Coreterra.</p><Link className="mt-9 inline-flex min-h-12 items-center bg-[#a2784e] px-5 py-3 text-xs font-bold uppercase tracking-[.08em] text-white transition hover:bg-[#795638] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d1a776]" href="/">Kembali ke beranda <span className="ml-8" aria-hidden="true">→</span></Link></div></main>
}
