'use client'

import { Input } from '@headlessui/react'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/Button'
import FormField from '@/components/FormField'

export default function LoginPage() {
  return (
    <main className="grid min-h-screen bg-[#f5f3ee] text-[#252621] lg:grid-cols-[.9fr_1.1fr]">
      <section className="relative flex min-h-[250px] flex-col justify-between overflow-hidden bg-[#242522] px-7 py-6 text-[#f5f3ee] max-sm:min-h-[215px] max-sm:px-5 max-sm:py-5 lg:min-h-screen lg:px-[9%] lg:py-8" aria-label="Identitas Coreterra">
        <Image className="absolute inset-0 size-full object-cover opacity-25 grayscale" src="/hero-drilling-clean.webp" alt="" fill priority sizes="(max-width: 1023px) 100vw, 45vw" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#242522e8,#242522a8)]" aria-hidden="true" />
        <Link className="relative inline-flex w-fit items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d1a776]" href="/" aria-label="Coreterra, kembali ke beranda">
          <Image className="size-11 object-contain max-sm:size-9" src="/logo.png" alt="" width={80} height={80} priority />
          <span>
            <strong className="block text-[16px] leading-none font-extrabold tracking-[.16em]">CORETERRA</strong>
            <small className="mt-[6px] block text-[9px] tracking-[.06em] text-[#d4d0c7]">KONSULTAN GEOENGINEERING</small>
          </span>
        </Link>

        <div className="relative mt-10 max-w-[440px] lg:mb-[12vh]">
          <p className="mb-4 text-[11px] font-semibold tracking-[.1em] text-[#d1a776]">PT CORETERRA GEO ENGINEERING</p>
          <p className="m-0 max-w-[15ch] text-[clamp(25px,3vw,42px)] leading-[1.12] font-medium tracking-[-.025em]">Kondisi lapangan. Analisis geoteknik.</p>
        </div>
        <span className="relative hidden text-[10px] text-white/60 lg:block">Akses pengelolaan</span>
      </section>

      <section className="flex min-h-[calc(100vh-250px)] items-center justify-center px-6 py-12 max-sm:min-h-[calc(100vh-215px)] max-sm:py-10 lg:min-h-screen lg:px-[12%]" aria-labelledby="login-title">
        <div className="w-full max-w-[400px]">
          <p className="mb-3 text-[11px] font-semibold tracking-[.09em] text-[#76634e]">PANEL PENGELOLAAN</p>
          <h1 className="m-0 text-[clamp(34px,4vw,46px)] leading-[1.08] font-semibold tracking-[-.04em]" id="login-title">Masuk</h1>
          <p className="mt-3 mb-8 text-[15px] leading-[1.65] text-[#5e5b54]">Masukkan email dan kata sandi Anda.</p>

          <form className="grid gap-5" onSubmit={(event) => event.preventDefault()} aria-label="Form masuk">
            <FormField id="login-email" label="Email">
              <Input
                className="min-h-[52px] w-full border border-[#bcb6ac] bg-[#fbfaf7] px-4 text-[16px] text-[#252621] outline-none transition-[border-color,box-shadow] placeholder:text-[#858078] focus:border-[#684628] focus:ring-2 focus:ring-[#8b623d]/20"
                id="login-email"
                name="email"
                type="email"
                autoComplete="username"
                autoCapitalize="none"
                spellCheck={false}
                required
              />
            </FormField>

            <FormField id="login-password" label="Kata sandi">
              <Input
                className="min-h-[52px] w-full border border-[#bcb6ac] bg-[#fbfaf7] px-4 text-[16px] text-[#252621] outline-none transition-[border-color,box-shadow] focus:border-[#684628] focus:ring-2 focus:ring-[#8b623d]/20"
                id="login-password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
              />
            </FormField>

            <Button className="mt-2 min-h-[52px] w-full" type="submit">
              Masuk <span className="text-[20px] font-normal" aria-hidden="true">→</span>
            </Button>
          </form>
        </div>
      </section>
    </main>
  )
}
