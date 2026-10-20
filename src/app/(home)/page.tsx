'use client'

import Image from 'next/image'
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { LazyMotion, domAnimation, MotionConfig, m, useReducedMotion } from 'motion/react'
import ContactFooter from '@/components/ContactFooter'
import ProjectVisual from '@/components/ProjectVisual'
import Button from '@/components/Button'
import Card from '@/components/Card'
import { projects, siteCopy } from '@/data/projects'

const services = siteCopy.services

const subscribeDesktopNav = (callback: () => void) => {
  const breakpoint = window.matchMedia('(min-width: 768px)')
  breakpoint.addEventListener('change', callback)
  return () => breakpoint.removeEventListener('change', callback)
}
const getDesktopNavSnapshot = () => window.matchMedia('(min-width: 768px)').matches
const getDesktopNavServerSnapshot = () => true
const revealProps = (reduced: boolean, y = 24, duration = .75, delay = 0) => ({
  initial: reduced ? false as const : { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: .14, margin: '0px 0px -8% 0px' },
  transition: { duration: reduced ? 0 : duration, delay: reduced ? 0 : delay, ease: [.2, .65, .25, 1] as const },
})

function ServiceDiagram({ number, reducedMotion }: { number: string; reducedMotion: boolean }) {
  return (
    <m.svg className="pointer-events-none block size-[76px] transition-transform duration-[.55s] motion-reduce:transition-none ease-[cubic-bezier(.2,.65,.25,1)] group-hover:scale-[1.08] group-hover:-translate-y-0.5 group-focus-within:scale-[1.08] group-focus-within:-translate-y-0.5" viewBox="0 0 80 80" fill="none" aria-hidden="true" focusable="false" {...revealProps(reducedMotion, 8, .75)}>
      <g stroke="#684628" strokeLinecap="round" strokeLinejoin="round">
        {number === '01' && (
          <g strokeWidth="2">
            <path d="M12 51c9-5 18-5 28 0s19 5 28 0" />
            <path d="M12 60c9-5 18-5 28 0s19 5 28 0" strokeWidth="1.4" />
            <path d="M40 13v43M34 48l6 11 6-11M30 22h20" />
            <circle cx="40" cy="31" r="10" strokeWidth="1.4" strokeDasharray="2 3" />
          </g>
        )}
        {number === '02' && (
          <g strokeWidth="2">
            <path d="M10 55 28 40l14 5 14-19 14 7" />
            <path d="M14 64c13-8 23-9 33-4 10 5 18 3 25-4" strokeWidth="1.4" />
            <path d="M20 69c12-7 21-8 31-3 9 4 16 2 22-3" strokeWidth="1.2" />
            <circle cx="56" cy="26" r="4" fill="#684628" stroke="none" />
          </g>
        )}
        {number === '03' && (
          <g strokeWidth="2">
            <path d="M10 27c10-8 17-8 26 0s16 8 24 0 15-8 20 0" />
            <path d="M10 41c10-8 17-8 26 0s16 8 24 0 15-8 20 0" strokeWidth="1.4" />
            <path d="M10 55c10-8 17-8 26 0s16 8 24 0 15-8 20 0" strokeWidth="1.2" />
            <circle cx="23" cy="34" r="3.5" fill="#684628" stroke="none" />
          </g>
        )}
        {number === '04' && (
          <g strokeWidth="2">
            <circle cx="40" cy="40" r="8" />
            <path d="M40 22a18 18 0 0 1 0 36M40 14a26 26 0 0 1 0 52M40 6a34 34 0 0 1 0 68" />
            <path d="m40 40 25-18M40 40l28 13" strokeWidth="1.4" strokeDasharray="3 3" />
            <circle cx="65" cy="22" r="3.5" fill="#684628" stroke="none" />
          </g>
        )}
      </g>
    </m.svg>
  )
}

function HomeInteractiveContent() {
  const desktopNav = useSyncExternalStore(subscribeDesktopNav, getDesktopNavSnapshot, getDesktopNavServerSnapshot)
  const reducedMotion = useReducedMotion() ?? false
  const [loading, setLoading] = useState(true)
  const projectTrackRef = useRef<HTMLOListElement>(null)
  const [projectScroll, setProjectScroll] = useState({ start: true, end: false })
  const projectProgressRef = useRef<HTMLDivElement>(null)
  const projectProgressBarRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const timer = window.setTimeout(() => setLoading(false), reducedMotion ? 450 : 1150)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', loading)
    return () => document.body.classList.remove('overflow-hidden')
  }, [loading])

  useEffect(() => {
    const track = projectTrackRef.current
    if (!track) return

    let frame = 0
    const update = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
      const distance = Math.max(0, track.scrollWidth - track.clientWidth)
        const start = track.scrollLeft <= 2
        const end = track.scrollLeft >= distance - 2
        const progress = distance ? track.scrollLeft / distance : 1
        setProjectScroll((current) => current.start === start && current.end === end ? current : { start, end })
        projectProgressRef.current?.setAttribute('aria-valuenow', String(Math.round(progress * 100)))
        projectProgressBarRef.current?.style.setProperty('transform', `scaleX(${Math.max(.08, progress)})`)
      })
    }
    update()
    track.addEventListener('scroll', update, { passive: true })
    const observer = new ResizeObserver(update)
    observer.observe(track)
    return () => {
      track.removeEventListener('scroll', update)
      observer.disconnect()
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  const moveProjects = (direction: -1 | 1) => {
    const track = projectTrackRef.current
    const card = track?.querySelector('li')
    if (!track || !card) return
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0
    track.scrollBy({
      left: direction * (card.getBoundingClientRect().width + gap),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    })
  }

  return (
    <>
    <div className={`fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-[#171716] text-[#f1eee8] [transition:opacity_.85s_cubic-bezier(.2,.65,.25,1),visibility_0s_linear_.85s] motion-reduce:transition-none ${loading ? 'visible opacity-100' : 'invisible pointer-events-none opacity-0'}`} aria-hidden={!loading}>
      <svg className="absolute inset-0 h-full w-full opacity-80" viewBox="0 0 1000 700" aria-hidden="true" focusable="false">
        <g fill="none" stroke="#b58a60" strokeWidth="1">
          <m.path className="[stroke-dasharray:860]" initial={reducedMotion ? false : { strokeDashoffset: 860 }} animate={{ strokeDashoffset: reducedMotion ? 0 : [860, 0] }} transition={{ duration: reducedMotion ? 0 : 2.8, ease: 'easeInOut', repeat: reducedMotion ? 0 : Infinity, repeatType: 'reverse' }} d="M-80 520c180-170 290-164 432-52s262 108 390-10 240-144 338-64" />
          <m.path className="opacity-[.58] [stroke-dasharray:860]" initial={reducedMotion ? false : { strokeDashoffset: 860 }} animate={{ strokeDashoffset: reducedMotion ? 0 : [860, 0] }} transition={{ duration: reducedMotion ? 0 : 2.8, delay: reducedMotion ? 0 : -.9, ease: 'easeInOut', repeat: reducedMotion ? 0 : Infinity, repeatType: 'reverse' }} d="M-120 610c176-146 294-149 429-50s260 94 395-13 242-128 347-57" />
          <m.path className="opacity-[.38] [stroke-dasharray:860]" initial={reducedMotion ? false : { strokeDashoffset: 860 }} animate={{ strokeDashoffset: reducedMotion ? 0 : [860, 0] }} transition={{ duration: reducedMotion ? 0 : 2.8, delay: reducedMotion ? 0 : -1.6, ease: 'easeInOut', repeat: reducedMotion ? 0 : Infinity, repeatType: 'reverse' }} d="M-70 410c152-115 275-111 405-15s262 102 403-22 216-121 309-70" />
          <path d="M0 118h1000M0 584h1000" strokeDasharray="2 12" opacity=".3" />
        </g>
      </svg>
      <div className="relative z-[1] flex w-[min(330px,78vw)] flex-col items-center" role="status" aria-live="polite">
        <m.div className="grid size-[126px] place-items-center rounded-full border border-[#b58a60] bg-[#f1eee8] p-[14px] shadow-[0_0_0_10px_#b58a6014,0_18px_60px_#0008]" animate={{ scale: reducedMotion ? 1 : [.98, 1.02, .98] }} transition={{ duration: reducedMotion ? 0 : 2.4, ease: 'easeInOut', repeat: reducedMotion ? 0 : Infinity }}><Image className="block size-full object-contain" src="/logo.png" alt="Coreterra" width={110} height={110} priority /></m.div>
        <p className="mt-[27px] mb-2 text-[10px] font-bold tracking-[.16em] text-[#d0b08f] uppercase">{siteCopy.brand.loaderTitle}</p>
        <p className="m-0 text-2xl leading-none font-extrabold tracking-[.24em] text-[#f7f4ee]">{siteCopy.brand.name}</p>
        <div className="mt-[54px] flex w-full justify-between gap-[18px] text-[9px] leading-[1.4] tracking-[.1em] text-[#aaa49b] uppercase [&>span:last-child]:text-right"><span>{siteCopy.brand.loading}</span><span aria-hidden="true">{siteCopy.brand.loadingContext}</span></div>
        <div className="mt-[13px] h-[2px] w-full overflow-hidden bg-white/15" aria-hidden="true"><m.span className={`block h-full bg-[#b58a60] ${reducedMotion ? 'w-full' : 'w-[38%]'}`} initial={reducedMotion ? false : { x: '-100%' }} animate={{ x: reducedMotion ? '0%' : '365%' }} transition={{ duration: reducedMotion ? 0 : 1.15, ease: [.65, 0, .35, 1] }} /></div>
      </div>
    </div>
    <div className={`transition-[opacity,transform] duration-[.8s] motion-reduce:transition-none ease-[cubic-bezier(.2,.65,.25,1)] [transition-delay:.08s] ${loading ? 'translate-y-3 opacity-0' : 'translate-y-0 opacity-100'}`}>
    <main className="relative mx-auto w-full overflow-hidden bg-[#e9eaea] [container-type:inline-size]" aria-busy={loading}>
      <section className="relative h-[58cqw] bg-[var(--coreterra-charcoal)] after:pointer-events-none after:absolute after:inset-0 after:z-[2] after:content-[''] max-[1100px]:h-[680px] max-[1100px]:overflow-hidden max-[1100px]:bg-[var(--coreterra-charcoal-deep)] max-[1100px]:after:bg-[linear-gradient(90deg,#0008,transparent_85%)] max-[767px]:after:bg-[linear-gradient(180deg,#0007_0%,#0009_48%,transparent_85%)]" id="home" aria-labelledby="hero-title">
        <m.svg className="pointer-events-none absolute inset-0 z-[2] h-[100cqw] w-full [isolation:isolate] max-[1100px]:inset-y-0 max-[1100px]:right-[-8%] max-[1100px]:left-auto max-[1100px]:h-auto max-[1100px]:w-[max(100%,900px)] max-[1100px]:aspect-square max-[767px]:top-[90px] max-[767px]:right-[-310px] max-[767px]:w-[850px]" animate={reducedMotion ? { x: 0, y: 0, scale: 1 } : { x: ['-.4%', '.4%'], y: ['0%', '-.6%'], scale: [1, 1.015] }} transition={{ duration: reducedMotion ? 0 : 18, repeat: reducedMotion ? 0 : Infinity, repeatType: 'reverse', ease: 'easeInOut' }} viewBox="0 0 500 500" aria-hidden="true">
          <defs><path id="hero-shapes" d="M202 144 322 24Q350-4 378 24l122 122v204L389 239l-46 46ZM201 151l68 68-68 68-48-48q-20-20 0-40Z" /><clipPath id="orange-shapes"><use href="#hero-shapes" /></clipPath><mask id="outside-shapes" maskUnits="userSpaceOnUse" x="0" y="0" width="500" height="500"><rect width="500" height="500" fill="white" /><use href="#hero-shapes" fill="black" /></mask><linearGradient id="hero-shade" x1="0" x2="1"><stop offset="0" stopColor="#101313" stopOpacity=".84" /><stop offset="1" stopColor="#101313" stopOpacity=".6" /></linearGradient><filter id="monochrome"><feColorMatrix type="saturate" values="0" /></filter><pattern id="diagonal-lines" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(31)"><path d="M0 0H8" stroke="#fff" strokeOpacity=".032" strokeWidth="2" /></pattern><linearGradient id="stripe-opacity"><stop stopColor="black" /><stop offset=".35" stopColor="white" /></linearGradient><mask id="stripe-fade"><rect width="500" height="500" fill="url(#stripe-opacity)" /></mask></defs>
          <image href="/hero-drilling-clean.webp" width="500" height="350" preserveAspectRatio="xMidYMid slice" filter="url(#monochrome)" /><rect width="500" height="350" fill="url(#hero-shade)" mask="url(#outside-shapes)" /><rect width="500" height="350" fill="#8b623d" clipPath="url(#orange-shapes)" style={{ mixBlendMode: 'multiply' }} />
          <g mask="url(#outside-shapes)"><path d="M0 223 500 278v125H0Z" fill="#030404" /><path d="M0 241 500 296v107H0Z" fill="url(#diagonal-lines)" mask="url(#stripe-fade)" /></g><g clipPath="url(#orange-shapes)" stroke="#171b1b" strokeWidth="7" opacity=".9"><path d="M275 58 510 293M215 144 510 439" /></g>
        </m.svg>
        <header className="relative z-[4] flex items-end justify-between px-[9.6cqw] pt-[1cqw] max-[1100px]:items-center max-[1100px]:px-[6%] max-[1100px]:py-5 max-[767px]:px-[6%] max-[767px]:py-[18px]">
          <a className="flex w-[17cqw] flex-col items-center max-[1100px]:w-[185px] max-[1100px]:shrink-0" href="#home" aria-label={siteCopy.brand.homeLink}><span className="mb-[.7cqw] grid size-[4.8cqw] place-items-center rounded-full border border-[var(--coreterra-bronze-light)] bg-[#f1eee8e8] p-[.5cqw] shadow-[0_4px_14px_#0004] max-[1100px]:mb-2 max-[1100px]:size-[42px] max-[1100px]:p-1"><Image className="size-full object-contain" src="/logo.png" alt="" width={80} height={80} priority /></span><span className="p-0 text-[1.7cqw] leading-none font-extrabold tracking-brand max-[1100px]:text-xl max-[1100px]:tracking-[4px]">{siteCopy.brand.name}</span><span className="mt-[.55cqw] whitespace-nowrap text-[clamp(8px,.66cqw,10px)] tracking-[.08cqw] max-[1100px]:mt-[5px] max-[1100px]:text-[8px] max-[1100px]:tracking-[.5px]">{siteCopy.brand.descriptor}</span></a>
          <Popover as="div" key={desktopNav ? 'desktop' : 'mobile'} className="contents">
            {({ open, close }) => <>
              <PopoverButton className="hidden min-h-11 items-center gap-3 border border-[#ffffff55] bg-[#292827dd] px-[14px] py-[10px] text-[13px] font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-5 focus-visible:outline-[var(--coreterra-bronze-light)] max-[767px]:inline-flex">{siteCopy.navigation.menu} <m.span className="text-xl" aria-hidden="true" animate={{ rotate: open ? 90 : 0 }} transition={{ duration: .18, ease: 'easeOut' }}>☰</m.span></PopoverButton>
              <PopoverPanel as="nav" static id="main-nav" className="absolute top-[7.5cqw] left-[43cqw] flex w-[47.6cqw] items-center justify-between min-[1101px]:top-[calc(7.5cqw-14px)] max-[1100px]:static max-[1100px]:w-auto max-[1100px]:gap-5 max-[767px]:absolute max-[767px]:top-[calc(100%-4px)] max-[767px]:right-[6%] max-[767px]:left-[6%] max-[767px]:hidden max-[767px]:w-auto max-[767px]:flex-col max-[767px]:items-stretch max-[767px]:gap-0 max-[767px]:border max-[767px]:border-[#ffffff30] max-[767px]:bg-[var(--coreterra-charcoal-deep)] max-[767px]:px-4 max-[767px]:py-2 max-[767px]:shadow-[0_12px_30px_#0008] max-[767px]:data-open:flex" aria-label="Navigasi utama">
                {[
                  ['#home', 'Beranda'], ['#about', 'Tentang'], ['#services', 'Layanan'], ['#projects', 'Proyek'], ['#contact', 'Kontak'],
                ].map(([href, label], index) => <m.a key={href} className="whitespace-nowrap text-[clamp(12px,1cqw,14px)] font-bold tracking-[.035em] text-white uppercase [text-shadow:0_1px_3px_#000] hover:text-[var(--coreterra-bronze-light)] min-[1101px]:px-0 min-[1101px]:py-[14px] max-[1100px]:px-0 max-[1100px]:py-4 max-[1100px]:text-xs max-[767px]:block max-[767px]:min-h-12 max-[767px]:px-2 max-[767px]:py-4 max-[767px]:text-[13px]" href={href} onClick={() => close()} initial={false} animate={open || desktopNav ? 'visible' : 'hidden'} variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: -5 } }} transition={{ duration: .16, delay: open && !desktopNav ? index * .025 : 0, ease: 'easeOut' }}>{label}</m.a>)}
              </PopoverPanel>
            </>}
          </Popover>
        </header>
        <m.div className="absolute top-[15.3cqw] left-[9.7cqw] z-[3] max-[1100px]:relative max-[1100px]:top-auto max-[1100px]:left-auto max-[1100px]:mx-[6%] max-[1100px]:mt-[72px] max-[1100px]:max-w-[650px] max-[767px]:mt-14" {...revealProps(reducedMotion, 20, .9)}><m.h1 className="m-0 text-hero leading-tight-coreterra font-extrabold tracking-[-.06cqw] uppercase max-[1100px]:text-[clamp(32px,4.2vw,44px)] max-[1100px]:leading-[1.1] max-[1100px]:tracking-[-.6px] max-[767px]:text-[clamp(28px,6.5vw,38px)] max-[767px]:leading-[1.12]" id="hero-title" {...revealProps(reducedMotion, 14, .65, .08)}>{siteCopy.hero.title.map((line) => <span className="block" key={line}>{line}</span>)}</m.h1><m.p className="mt-[.9cqw] mb-[1.6cqw] text-[clamp(15px,1.15cqw,18px)] leading-[1.5] text-[#d0d0d0] max-[1100px]:my-5 max-[1100px]:mb-6 max-[1100px]:text-[15px] max-[767px]:max-w-[310px]" {...revealProps(reducedMotion, 14, .65, .2)}>{siteCopy.hero.description.map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>)}</m.p><m.a className="inline-flex h-[3.5cqw] w-[17.4cqw] cursor-pointer items-center justify-center rounded-[.2cqw] border-0 bg-[var(--coreterra-bronze)] text-[12px] font-bold tracking-[.09cqw] text-[var(--coreterra-off-white)] uppercase hover:bg-[var(--coreterra-bronze-dark)] min-[1101px]:min-h-11 min-[1101px]:text-[max(12px,1.02cqw)] min-[1101px]:tracking-[.09cqw] max-[1100px]:h-auto max-[1100px]:w-auto max-[1100px]:min-h-12 max-[1100px]:rounded-[2px] max-[1100px]:px-6 max-[1100px]:py-[14px] max-[1100px]:text-xs max-[1100px]:tracking-[1px]" href="#services" {...revealProps(reducedMotion, 14, .65, .32)}>{siteCopy.hero.action}</m.a></m.div>
        <m.a className="absolute top-[38cqw] left-[10.1cqw] z-[3] size-[2.6cqw] border border-[#bbb] max-[1100px]:top-auto max-[1100px]:bottom-[75px] max-[1100px]:left-[7%] max-[1100px]:size-6 max-[767px]:bottom-16 max-[767px]:left-[9%] [&>span]:absolute [&>span]:inset-0 [&>span]:grid [&>span]:rotate-[-45deg] [&>span]:place-items-center [&_svg]:block [&_svg]:size-full after:absolute after:top-[3cqw] after:left-[3cqw] after:h-[8.6cqw] after:w-px after:origin-top after:rotate-[-45deg] after:bg-[#999] after:content-[''] max-[1100px]:after:top-[29px] max-[1100px]:after:left-[29px] max-[1100px]:after:h-12" href="#about" aria-label="Gulir ke Tentang Kami" initial={reducedMotion ? false : { opacity: 0, rotate: 45, y: 10 }} whileInView={{ opacity: 1, rotate: 45, y: 0 }} viewport={{ once: true, amount: .14, margin: '0px 0px -8% 0px' }} transition={{ duration: reducedMotion ? 0 : .7, ease: [.2, .65, .25, 1] }}><span aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="m7 9.5 5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span></m.a>
      </section>

      <section className="relative h-[22.7cqw] bg-[#030404] [background-image:repeating-linear-gradient(31deg,transparent_0_1.4cqw,#ffffff04_1.5cqw_1.9cqw)] max-[1100px]:grid max-[1100px]:h-auto max-[1100px]:grid-cols-2 max-[1100px]:gap-8 max-[1100px]:px-[8%] max-[1100px]:pt-12 max-[767px]:gap-x-[14px] max-[767px]:gap-y-6 max-[767px]:px-[6%] max-[767px]:pt-10" id="about" aria-labelledby="about-title">
        <m.svg className="pointer-events-none absolute top-0 left-0 z-[3] h-[22.6cqw] w-full max-[1100px]:top-[5px] max-[1100px]:h-auto max-[1100px]:opacity-50" animate={reducedMotion ? { x: 0 } : { x: [0, 8, 0] }} transition={{ duration: reducedMotion ? 0 : 14, repeat: reducedMotion ? 0 : Infinity, ease: 'easeInOut' }} viewBox="0 0 500 113" aria-hidden="true"><g fill="none" stroke="#a4a7a4" strokeWidth=".7"><path d="M-15 17 0 5Q10-2 20 9l100 104M-12 40l72 73M-12 68l45 45" /><path d="M0 113q2-8 5 0" /></g></m.svg>
        <m.div className="absolute top-[4.2cqw] left-[15.3cqw] z-[3] max-[1100px]:relative max-[1100px]:inset-auto max-[1100px]:min-w-0" {...revealProps(reducedMotion)}><p className="m-0 mb-[.8cqw] text-xs font-bold tracking-eyebrow text-[var(--coreterra-bronze-light)] uppercase before:mr-[.6cqw] before:inline-block before:h-px before:w-[1.6cqw] before:align-middle before:bg-[var(--coreterra-bronze-light)] before:content-[''] max-[1100px]:mb-3 max-[1100px]:before:mr-[6px] max-[1100px]:before:w-4">{siteCopy.about.eyebrow}</p><h2 className="origin-left scale-x-[1.025] text-about-title leading-tight-coreterra font-medium tracking-[-.02cqw] uppercase max-[1100px]:scale-x-100 max-[767px]:text-[30px]" id="about-title">{siteCopy.about.title[0]}<br />{siteCopy.about.title[1]}</h2></m.div>
        <m.p className="absolute top-[5.3cqw] left-[51.1cqw] z-[3] w-[34cqw] text-[16px] leading-[1.55] text-[#aaa] max-[1100px]:relative max-[1100px]:inset-auto max-[1100px]:mt-6 max-[1100px]:w-auto max-[1100px]:min-w-0 max-[1100px]:text-[15px] max-[1100px]:leading-[1.7] max-[767px]:col-span-full max-[767px]:mt-0 max-[767px]:mb-2 max-[767px]:max-w-[600px]" {...revealProps(reducedMotion)}>{siteCopy.about.description}</m.p>
        <m.div className="absolute top-[16.2cqw] left-[15.3cqw] z-[4] h-[25.8cqw] w-[27.2cqw] bg-[url(/about-yard-clean.webp)] bg-cover bg-no-repeat bg-[position:center_58%] max-[1100px]:relative max-[1100px]:inset-auto max-[1100px]:mb-[-60px] max-[1100px]:h-auto max-[1100px]:w-auto max-[1100px]:min-w-0 max-[1100px]:aspect-[4/3] max-[767px]:mb-[-40px] max-[767px]:aspect-[3/4]" role="img" aria-label="Peralatan dan aktivitas kerja lapangan Coreterra" {...revealProps(reducedMotion)} />
        <m.div className="absolute top-[19.7cqw] left-[43.8cqw] z-[4] h-[22.3cqw] w-[41cqw] bg-[url(/about-slope-clean.webp)] bg-cover bg-no-repeat bg-[position:center_56%] max-[1100px]:relative max-[1100px]:inset-auto max-[1100px]:mb-[-60px] max-[1100px]:mt-7 max-[1100px]:h-auto max-[1100px]:w-auto max-[1100px]:min-w-0 max-[1100px]:aspect-[4/3] max-[767px]:col-start-2 max-[767px]:mb-[-40px] max-[767px]:mt-6 max-[767px]:aspect-[3/4]" role="img" aria-label="Pekerjaan lapangan di area lereng dan aliran air" {...revealProps(reducedMotion)} />
      </section>
      <div className="relative h-[19.3cqw] bg-[#e9eaea] after:absolute after:inset-0 after:bg-[var(--coreterra-bronze)] after:[clip-path:polygon(90%_0,100%_0,100%_69%,97.2%_100%,80%_100%)] after:content-[''] max-[1100px]:h-[110px] max-[767px]:h-20" aria-hidden="true" />

      <section className="relative bg-[#e9eaea] px-[9.6%] py-24 text-[var(--coreterra-charcoal-deep)] before:pointer-events-none before:absolute before:top-0 before:right-0 before:z-0 before:h-[340px] before:w-[min(35%,500px)] before:[clip-path:polygon(30%_0,100%_0,100%_100%)] before:bg-[repeating-linear-gradient(31deg,transparent_0_20px,#8b623d14_21px_22px)] before:content-[''] [&>*]:relative [&>*]:z-[1] max-[1100px]:px-[8%] max-[1100px]:py-[76px] max-[767px]:px-[6%] max-[767px]:py-[60px]" id="services" aria-labelledby="services-title">
        <m.div className="mb-[60px] grid grid-cols-[1.1fr_1fr] items-end gap-x-[7%] max-[767px]:mb-8 max-[767px]:grid-cols-1 max-[767px]:gap-y-[14px] [&>p:first-child]:col-start-1 [&>p:first-child]:row-start-1 [&>h2]:col-start-1 [&>h2]:row-start-2 [&>p:last-child]:col-start-2 [&>p:last-child]:row-start-2 max-[767px]:[&>p:first-child]:col-start-1 max-[767px]:[&>p:first-child]:row-auto max-[767px]:[&>h2]:col-start-1 max-[767px]:[&>h2]:row-auto max-[767px]:[&>p:last-child]:col-start-1 max-[767px]:[&>p:last-child]:row-auto" {...revealProps(reducedMotion)}><p className="m-0 mb-[.8cqw] text-xs font-bold tracking-eyebrow text-[var(--coreterra-bronze-light)] uppercase before:mr-[.6cqw] before:inline-block before:h-px before:w-[1.6cqw] before:align-middle before:bg-[var(--coreterra-bronze-light)] before:content-[''] max-[1100px]:mb-3 max-[1100px]:before:mr-[6px] max-[1100px]:before:w-4">{siteCopy.servicesSection.eyebrow}</p><h2 className="m-0 text-section-title leading-tight-coreterra font-medium tracking-[-.02cqw] uppercase max-[1100px]:text-section-title-tablet max-[1100px]:leading-[1.1] max-[1100px]:tracking-[-.3px] max-[767px]:text-section-title-mobile" id="services-title">{siteCopy.servicesSection.title[0]}<br />{siteCopy.servicesSection.title[1]}</h2><p className="m-0 max-w-[500px] text-base leading-[1.7] text-coreterra-text-secondary">{siteCopy.servicesSection.description}</p></m.div>
        <div className="grid grid-cols-4 gap-[18px] border-0 max-[1100px]:grid-cols-2 max-[767px]:grid-cols-1 max-[767px]:gap-4">{services.map((service, index) => <m.div className="min-w-0" key={service.number} {...revealProps(reducedMotion, 26, .7, index * .08)}><Card className="group flex min-h-[390px] flex-col rounded-xl border-[#e0ddd7] bg-[#f8f7f4] px-7 pt-8 pb-7 shadow-[0_8px_24px_#28231d0d] transition-[border-color,box-shadow,transform] duration-300 motion-reduce:transition-none hover:-translate-y-[3px] motion-reduce:hover:translate-y-0 hover:border-[#b58a60] hover:shadow-[0_14px_28px_#28231d16] focus-within:-translate-y-[3px] motion-reduce:focus-within:translate-y-0 focus-within:border-[#b58a60] focus-within:shadow-[0_14px_28px_#28231d16] max-[1100px]:min-h-[470px] max-[1100px]:px-[18px] max-[1100px]:py-6 max-[767px]:min-h-0 max-[767px]:px-6 max-[767px]:pt-[26px] max-[767px]:pb-[26px] max-[767px]:border-l"><div className="relative flex h-[88px] items-start overflow-visible max-[767px]:h-[82px]"><ServiceDiagram number={service.number} reducedMotion={reducedMotion} /></div><div className="flex-1 max-[767px]:mb-6"><p className="mt-0 mb-[10px] text-[11px] font-bold tracking-[.12em] text-coreterra-bronze uppercase">{siteCopy.servicesSection.itemLabel} {service.number}</p><h3 className="mt-0 mb-[14px] text-card-title leading-heading font-bold max-[767px]:text-[19px]">{service.title}</h3><p className="m-0 text-[15px] leading-[1.65] text-coreterra-text-secondary">{service.description}</p></div><span className="mt-[26px] block text-xs font-bold tracking-[.1em] text-coreterra-bronze-dark uppercase before:mr-[10px] before:inline-block before:h-px before:w-5 before:align-middle before:bg-current before:content-['']">{service.detail}</span></Card></m.div>)}</div>
      </section>

      <section className="relative overflow-hidden bg-[#e3e0d9] px-[9.6%] py-24 text-[var(--coreterra-charcoal-deep)] before:absolute before:top-0 before:right-0 before:h-[300px] before:w-[35%] before:[clip-path:polygon(34%_0,100%_0,100%_100%)] before:bg-[repeating-linear-gradient(31deg,transparent_0_19px,#76543a15_20px_21px)] before:content-[''] [&>*]:relative max-[1100px]:px-[8%] max-[1100px]:py-[76px] max-[767px]:px-[6%] max-[767px]:py-[60px]" id="projects" aria-labelledby="projects-title">
        <m.div className="mb-12 grid grid-cols-2 items-end gap-[10%] [&>p]:text-coreterra-text-secondary max-[767px]:mb-[30px] max-[767px]:grid-cols-1 max-[767px]:gap-8" {...revealProps(reducedMotion)}><div><p className="m-0 mb-[.8cqw] text-xs font-bold tracking-eyebrow text-[var(--coreterra-bronze-dark)] uppercase before:mr-[.6cqw] before:inline-block before:h-px before:w-[1.6cqw] before:align-middle before:bg-[var(--coreterra-bronze-dark)] before:content-[''] max-[1100px]:mb-3 max-[1100px]:before:mr-[6px] max-[1100px]:before:w-4">{siteCopy.projectSection.eyebrow}</p><h2 className="m-0 text-section-title leading-tight-coreterra font-medium tracking-[-.02cqw] uppercase max-[1100px]:text-section-title-tablet max-[1100px]:leading-[1.1] max-[1100px]:tracking-[-.3px] max-[767px]:text-section-title-mobile" id="projects-title">{siteCopy.projectSection.title[0]}<br />{siteCopy.projectSection.title[1]}</h2></div><p className="m-0 max-w-[500px] text-base leading-[1.7]">{siteCopy.projectSection.description}</p></m.div>
        <m.div className="flex items-center justify-between gap-6 border-t border-[#9e9b94] py-[18px]" {...revealProps(reducedMotion)}><p className="m-0 text-xs font-bold tracking-[.12em] text-[#5f5c57] uppercase [&>span]:px-2 [&>span]:text-[#9a7553]">{siteCopy.projectSection.explore} <span aria-hidden="true">/</span> 01—{String(projects.length).padStart(2, '0')}</p><div className="flex gap-2">{([-1, 1] as const).map((direction) => <Button variant="icon" key={direction} type="button" onClick={() => moveProjects(direction)} disabled={direction === -1 ? projectScroll.start : projectScroll.end} aria-label={direction === -1 ? siteCopy.projectSection.previous : siteCopy.projectSection.next}>{direction === -1 ? '←' : '→'}</Button>)}</div></m.div>
        <ol className="m-0 flex list-none snap-x snap-mandatory gap-[22px] overflow-x-auto overscroll-x-contain scroll-smooth motion-reduce:scroll-auto px-0 pt-1 pb-[18px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" ref={projectTrackRef} tabIndex={0} aria-label="Daftar pengalaman proyek; geser untuk melihat proyek lainnya" onKeyDown={(event) => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); moveProjects(event.key === 'ArrowRight' ? 1 : -1) } }}>{projects.map((project, index) => <m.li className="group min-w-0 shrink-0 basis-[clamp(300px,34cqw,440px)] snap-start max-[767px]:basis-[min(82vw,360px)]" key={project.slug} {...revealProps(reducedMotion, 24, .75, index * .08)}><article className="flex h-full flex-col overflow-hidden border border-[#b8b2a8] bg-[#f5f2eb] transition-[border-color,transform,box-shadow] duration-300 motion-reduce:transition-none group-hover:-translate-y-1 motion-reduce:group-hover:translate-y-0 group-hover:border-[#886342] group-hover:shadow-[0_16px_28px_#28231d18] group-focus-within:-translate-y-1 motion-reduce:group-focus-within:translate-y-0 group-focus-within:border-[#886342] group-focus-within:shadow-[0_16px_28px_#28231d18]"><ProjectVisual project={project} /><div className="flex flex-1 flex-col px-[26px] pt-6 pb-[26px] max-[767px]:px-5 max-[767px]:pt-5 max-[767px]:pb-[22px]"><div className="flex justify-between gap-3 border-b border-[#c4bdb3] pb-[17px]"><span className="text-[11px] leading-[1.35] font-bold tracking-[.09em] text-[var(--coreterra-bronze-dark)] uppercase">{project.number} / {String(projects.length).padStart(2, '0')}</span><span className="text-right text-[11px] leading-[1.35] font-bold tracking-[.09em] text-[var(--coreterra-bronze-dark)] uppercase">{project.location}</span></div><p className="mt-[26px] mb-[10px] text-[11px] font-bold tracking-[.12em] text-[#6d685f] uppercase">{project.category}</p><p className="mt-0 mb-[10px] text-[11px] leading-[1.45] font-bold tracking-[.06em] text-[var(--coreterra-bronze-dark)] uppercase">{project.client}</p><h3 className="mt-0 mb-3 min-h-[2.4em] text-[clamp(21px,1.7cqw,25px)] leading-[1.2] font-bold uppercase max-[767px]:min-h-0 max-[767px]:text-[21px]">{project.title}</h3><p className="mt-0 mb-[30px] max-w-[48ch] text-[15px] leading-[1.65] text-[#555550]">{project.scope}</p><a className="mt-auto flex min-h-11 items-center justify-between gap-4 border-t border-[#938c81] pt-3 text-xs font-bold tracking-[.09em] text-[#47321f] uppercase [&>span]:text-[22px] [&>span]:leading-none [&>span]:font-normal [&>span]:transition-transform [&>span]:duration-[.25s] motion-reduce:[&>span]:transition-none [&:hover>span]:translate-x-[3px] [&:hover>span]:-translate-y-[3px] motion-reduce:[&:hover>span]:translate-x-0 motion-reduce:[&:hover>span]:translate-y-0" href={`/proyek/${project.slug}`} aria-label={`Baca selengkapnya: ${project.title}`}>Baca selengkapnya <span aria-hidden="true">↗</span></a></div></article></m.li>)}</ol>
        <div className="mt-[26px] h-[2px] bg-[#bdb7ac]" role="progressbar" aria-label="Posisi daftar proyek" aria-valuemin={0} aria-valuemax={100} aria-valuenow={0} ref={projectProgressRef}><span className="block h-full w-full origin-left bg-[var(--coreterra-bronze-dark)] transition-transform duration-[.15s] ease-linear" style={{ transform: 'scaleX(.08)' }} ref={projectProgressBarRef} /></div>
      </section>

    </main>
    <ContactFooter />
    </div>
    </>
  )
}

export default function HomeInteractive() {
  return <LazyMotion features={domAnimation} strict><MotionConfig reducedMotion="user"><HomeInteractiveContent /></MotionConfig></LazyMotion>
}
