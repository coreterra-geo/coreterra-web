import Link from 'next/link'
import { adminSections } from '@/data/admin-navigation'

export default function AdminPage() {
  return (
    <section aria-labelledby="admin-title" className="max-w-[920px]">
      <p className="mb-3 text-[11px] font-semibold tracking-[.08em] text-[#76634e]">PENGELOLAAN KONTEN</p>
      <h1 className="m-0 text-[clamp(30px,4vw,42px)] leading-[1.1] font-semibold tracking-[-.035em] text-[#252621]" id="admin-title">Pengalaman proyek</h1>
      <p className="mt-4 mb-0 max-w-[58ch] text-[15px] leading-[1.7] text-[#5e5b54]">Pilih bagian yang ingin ditinjau atau dikelola.</p>

      <nav aria-label="Bagian pengalaman proyek" className="mt-10 divide-y divide-[#d2cdc4] border-y border-[#d2cdc4]">
        {adminSections.map((section, index) => (
          <Link className="group flex min-h-[76px] items-center gap-5 py-4 text-[#252621] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#684628]" href={`/admin/${section.slug}`} key={section.slug}>
            <span className="w-7 flex-none text-[11px] tabular-nums text-[#8a8174]" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <span className="flex-1 text-[15px] font-medium group-hover:text-[#684628]">{section.label}</span>
            <span className="text-lg text-[#8a8174] transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true">→</span>
          </Link>
        ))}
      </nav>
    </section>
  )
}
