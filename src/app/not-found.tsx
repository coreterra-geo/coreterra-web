/* eslint-disable react-refresh/only-export-components -- Next.js route files also export metadata. */
import type { Metadata } from 'next'
import Link from 'next/link'
import { siteCopy } from '@/data/projects'

export const metadata: Metadata = {
  title: 'Halaman tidak ditemukan',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return <main className="grid min-h-screen place-items-center bg-[#1e211f] px-6 text-[#f8f6f1]"><div className="max-w-md text-center"><p className="text-xs font-bold uppercase tracking-[.14em] text-[#c79a6b]">{siteCopy.notFound.status}</p><h1 className="mt-5 text-4xl font-semibold tracking-[-.04em] sm:text-6xl">{siteCopy.notFound.title}</h1><p className="mt-6 text-base leading-7 text-white/70">{siteCopy.notFound.description}</p><Link className="mt-9 inline-flex min-h-12 items-center bg-[#a2784e] px-5 py-3 text-xs font-bold uppercase tracking-[.08em] text-white transition hover:bg-[#795638] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d1a776]" href="/">{siteCopy.notFound.action} <span className="ml-8" aria-hidden="true">→</span></Link></div></main>
}
