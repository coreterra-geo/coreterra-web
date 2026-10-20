'use client'

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { adminSections } from '@/data/admin-navigation'

export default function AdminShell({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname()
  const currentSection = adminSections.find((section) => pathname === `/admin/${section.slug}`)
  const currentTitle = pathname === '/admin' ? 'Ringkasan' : currentSection?.label ?? 'Pengalaman proyek'

  return (
    <div className="min-h-screen bg-[#eeece7] text-[#252621] lg:pl-[260px]">
      <Disclosure as="aside" className="relative z-30 border-b border-[#d2cdc4] bg-[#f7f5f0] lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-[260px] lg:flex-col lg:border-r lg:border-b-0">
        {({ open }) => (
          <>
            <div className="flex min-h-[76px] items-center justify-between gap-4 px-5 lg:min-h-[92px] lg:px-6">
              <Link className="inline-flex min-w-0 items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#684628]" href="/" aria-label="Coreterra, kembali ke beranda">
                <Image className="size-10 flex-none object-contain" src="/logo.png" alt="" width={80} height={80} />
                <span className="min-w-0">
                  <strong className="block truncate text-[15px] leading-none font-extrabold tracking-[.15em]">CORETERRA</strong>
                  <small className="mt-[6px] block text-[9px] tracking-[.06em] text-[#706b62]">ADMINISTRASI PROYEK</small>
                </span>
              </Link>
              <DisclosureButton className="grid size-10 flex-none place-items-center border border-[#bdb7ad] text-[#252621] transition-colors hover:bg-[#eae7e0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#684628] lg:hidden" aria-label={open ? 'Tutup navigasi' : 'Buka navigasi'}>
                <span className="text-xl leading-none" aria-hidden="true">{open ? '×' : '☰'}</span>
              </DisclosureButton>
            </div>

            <DisclosurePanel static className={`${open ? 'grid' : 'hidden'} max-h-[calc(100dvh-76px)] overflow-y-auto border-t border-[#d2cdc4] px-4 pt-5 pb-6 lg:flex lg:max-h-none lg:flex-1 lg:flex-col lg:border-t-0 lg:px-4 lg:pt-7`}>
              {({ close }) => (
                <>
                  <nav aria-label="Navigasi admin" className="grid gap-1">
                    <p className="mb-2 px-3 text-[10px] font-semibold tracking-[.08em] text-[#777167]">PENGELOLAAN</p>
                    <Link
                      className={`flex min-h-11 items-center gap-3 border-l-2 px-3 text-[13px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#684628] ${pathname === '/admin' ? 'border-[#8b623d] bg-[#ebe6de] font-semibold text-[#392d21]' : 'border-transparent text-[#514e47] hover:bg-[#efede7]'}`}
                      href="/admin"
                      aria-current={pathname === '/admin' ? 'page' : undefined}
                      onClick={() => close()}
                    >Ringkasan</Link>
                    {adminSections.map((section) => {
                      const href = `/admin/${section.slug}`
                      const active = pathname === href
                      return (
                        <Link
                          className={`flex min-h-11 items-center gap-3 border-l-2 px-3 text-[13px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#684628] ${active ? 'border-[#8b623d] bg-[#ebe6de] font-semibold text-[#392d21]' : 'border-transparent text-[#514e47] hover:bg-[#efede7]'}`}
                          href={href}
                          key={section.slug}
                          aria-current={active ? 'page' : undefined}
                          onClick={() => close()}
                        >{section.label}</Link>
                      )
                    })}
                  </nav>

                  <Link className="mt-8 flex min-h-12 items-center justify-between border-t border-[#d2cdc4] px-3 pt-4 text-[11px] font-semibold text-[#514e47] transition-colors hover:text-[#171716] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#684628] lg:mt-auto" href="/" onClick={() => close()}>
                    Lihat situs utama <span aria-hidden="true" className="text-base">↗</span>
                  </Link>
                </>
              )}
            </DisclosurePanel>
          </>
        )}
      </Disclosure>

      <div className="min-h-screen">
        <header className="flex min-h-[68px] items-center justify-between border-b border-[#d2cdc4] bg-[#f7f5f0] px-6 sm:px-9 lg:px-12">
          <p className="m-0 text-[13px] font-medium text-[#514e47]">Pengalaman proyek <span className="px-2 text-[#a49d91]" aria-hidden="true">/</span><span className="text-[#252621]">{currentTitle}</span></p>
          <span className="hidden text-[10px] tracking-[.06em] text-[#777167] sm:inline">PT Coreterra Geo Engineering</span>
        </header>
        <main className="mx-auto w-full max-w-[1320px] px-6 py-9 sm:px-9 sm:py-11 lg:px-12 lg:py-12">
          {children}
        </main>
      </div>
    </div>
  )
}
