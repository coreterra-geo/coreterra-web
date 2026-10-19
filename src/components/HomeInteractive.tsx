'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import ContactFooter from '@/components/ContactFooter'
import ProjectVisual from '@/components/ProjectVisual'
import { projects } from '@/data/projects'

const services = [
  { number: '01', title: 'Investigasi tanah & fondasi', description: 'Pengeboran, pengujian lapangan, dan interpretasi kondisi bawah permukaan untuk kebutuhan fondasi dan prasarana.', detail: 'Pengeboran / SPT / CPT' },
  { number: '02', title: 'Geoteknik tambang & infrastruktur', description: 'Kajian tanah dan batuan, stabilitas lereng, serta kondisi tanah dasar untuk tambang dan jalan angkut.', detail: 'Lereng / jalan angkut' },
  { number: '03', title: 'Hidrologi & hidrogeologi', description: 'Penilaian air permukaan dan air tanah sebagai bagian dari kajian tambang, drainase, dan pengelolaan risiko geoteknik.', detail: 'Air permukaan / air tanah' },
  { number: '04', title: 'Survei geofisika & eksplorasi', description: 'Survei geolistrik, geomagnetik, dan pengeboran eksplorasi untuk memahami struktur serta sebaran material bawah permukaan.', detail: 'Geolistrik / geomagnetik' },
]

const ui = {
  loader: 'fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-[#171716] text-[#f1eee8] opacity-100 transition-opacity duration-[.85s] ease-[cubic-bezier(.2,.65,.25,1)]',
  loaderArt: 'absolute inset-0 h-full w-full opacity-80',
  loaderLine: '[stroke-dasharray:860] [stroke-dashoffset:860] animate-[loader-draw_2.8s_ease-in-out_infinite_alternate]',
  loaderLineTwo: 'opacity-[.58] [animation-delay:-.9s]',
  loaderLineThree: 'opacity-[.38] [animation-delay:-1.6s]',
  loaderContent: 'relative z-[1] flex w-[min(330px,78vw)] flex-col items-center',
  loaderMark: 'loader-mark grid size-[126px] place-items-center rounded-full border border-[#b58a60] bg-[#f1eee8] p-[14px] shadow-[0_0_0_10px_#b58a6014,0_18px_60px_#0008] animate-[loader-breathe_2.4s_ease-in-out_infinite] motion-reduce:animate-none',
  loaderMarkImage: 'block size-full object-contain',
  loaderKicker: 'mt-[27px] mb-2 text-[10px] font-bold uppercase tracking-[.16em] text-[#d0b08f]',
  loaderWordmark: 'm-0 text-2xl leading-none font-extrabold tracking-[.24em] text-[#f7f4ee]',
  loaderStatus: 'mt-[54px] flex w-full justify-between gap-[18px] text-[9px] leading-[1.4] tracking-[.1em] text-[#aaa49b] uppercase [&>span:last-child]:text-right',
  loaderProgress: 'mt-[13px] h-[2px] w-full overflow-hidden bg-white/15',
  loaderProgressBar: 'loader-progress-bar block h-full w-[38%] -translate-x-full bg-[#b58a60] animate-[loader-progress_1.15s_cubic-bezier(.65,0,.35,1)_forwards] motion-reduce:w-full motion-reduce:translate-x-0 motion-reduce:animate-none',
  shell: 'opacity-0 transition-[opacity,transform] duration-[.8s] ease-[cubic-bezier(.2,.65,.25,1)] [transition-delay:.08s]',
  shellLoading: 'translate-y-3',
  shellReady: 'translate-y-0 opacity-100',
  page: 'relative mx-auto w-full overflow-hidden bg-[#e9eaea] [container-type:inline-size]',
  hero: 'relative h-[58cqw] bg-[var(--coreterra-charcoal)] after:pointer-events-none after:absolute after:inset-0 after:z-[2] after:content-[""] max-[1100px]:h-[680px] max-[1100px]:overflow-hidden max-[1100px]:bg-[var(--coreterra-charcoal-deep)] max-[1100px]:after:bg-[linear-gradient(90deg,#0008,transparent_85%)] max-[767px]:after:bg-[linear-gradient(180deg,#0007_0%,#0009_48%,transparent_85%)]',
  heroArt: 'absolute inset-0 z-[2] h-[100cqw] w-full [isolation:isolate] pointer-events-none animate-[hero-art-drift_18s_ease-in-out_infinite_alternate] max-[1100px]:inset-y-0 max-[1100px]:right-[-8%] max-[1100px]:left-auto max-[1100px]:h-auto max-[1100px]:w-[max(100%,900px)] max-[1100px]:aspect-square max-[767px]:top-[90px] max-[767px]:right-[-310px] max-[767px]:w-[850px]',
  header: 'relative z-[4] flex items-end justify-between px-[9.6cqw] pt-[1cqw] max-[1100px]:items-center max-[1100px]:px-[6%] max-[1100px]:py-5 max-[767px]:px-[6%] max-[767px]:py-[18px]',
  brand: 'flex w-[17cqw] flex-col items-center max-[1100px]:w-[185px] max-[1100px]:shrink-0',
  brandMark: 'mb-[.7cqw] grid size-[4.8cqw] place-items-center rounded-full border border-[var(--coreterra-bronze-light)] bg-[#f1eee8e8] p-[.5cqw] shadow-[0_4px_14px_#0004] max-[1100px]:mb-2 max-[1100px]:size-[42px] max-[1100px]:p-1',
  brandImage: 'size-full object-contain',
  brandName: 'p-0 text-[1.7cqw] leading-none font-extrabold tracking-[.23em] max-[1100px]:text-xl max-[1100px]:tracking-[4px]',
  brandTag: 'mt-[.55cqw] whitespace-nowrap text-[clamp(8px,.66cqw,10px)] tracking-[.08cqw] max-[1100px]:mt-[5px] max-[1100px]:text-[8px] max-[1100px]:tracking-[.5px]',
  menu: 'hidden min-h-11 items-center gap-3 border border-[#ffffff55] bg-[#292827dd] px-[14px] py-[10px] text-[13px] font-semibold text-white max-[767px]:inline-flex [&>span]:text-xl focus-visible:outline-2 focus-visible:outline-offset-5 focus-visible:outline-[var(--coreterra-bronze-light)]',
  nav: 'absolute top-[7.5cqw] left-[43cqw] flex w-[47.6cqw] items-center justify-between min-[1101px]:top-[calc(7.5cqw-14px)] max-[1100px]:static max-[1100px]:w-auto max-[1100px]:gap-5 max-[767px]:absolute max-[767px]:top-[calc(100%-4px)] max-[767px]:right-[6%] max-[767px]:left-[6%] max-[767px]:hidden max-[767px]:w-auto max-[767px]:flex-col max-[767px]:items-stretch max-[767px]:gap-0 max-[767px]:border max-[767px]:border-[#ffffff30] max-[767px]:bg-[var(--coreterra-charcoal-deep)] max-[767px]:px-4 max-[767px]:py-2 max-[767px]:shadow-[0_12px_30px_#0008]',
  navOpen: 'is-open',
  navLink: 'whitespace-nowrap text-[clamp(12px,1cqw,14px)] font-bold tracking-[.035em] text-white uppercase [text-shadow:0_1px_3px_#000] hover:text-[var(--coreterra-bronze-light)] min-[1101px]:px-0 min-[1101px]:py-[14px] max-[1100px]:px-0 max-[1100px]:py-4 max-[1100px]:text-xs max-[767px]:block max-[767px]:min-h-12 max-[767px]:px-2 max-[767px]:py-4 max-[767px]:text-[13px]',
  heroCopy: 'absolute top-[15.3cqw] left-[9.7cqw] z-[3] max-[1100px]:relative max-[1100px]:top-auto max-[1100px]:left-auto max-[1100px]:mt-[72px] max-[1100px]:mx-[6%] max-[1100px]:max-w-[650px] max-[767px]:mt-14',
  heroTitle: 'm-0 text-[3.05cqw] leading-[1.08] font-extrabold tracking-[-.06cqw] uppercase max-[1100px]:text-[clamp(32px,4.2vw,44px)] max-[1100px]:leading-[1.1] max-[1100px]:tracking-[-.6px] max-[767px]:text-[clamp(28px,6.5vw,38px)] max-[767px]:leading-[1.12]',
  heroLead: 'mt-[.9cqw] mb-[1.6cqw] text-[clamp(15px,1.15cqw,18px)] leading-[1.5] text-[#d0d0d0] max-[1100px]:my-5 max-[1100px]:mb-6 max-[1100px]:text-[15px] max-[767px]:max-w-[310px]',
  contactButton: 'inline-flex h-[3.5cqw] w-[17.4cqw] items-center justify-center rounded-[.2cqw] border-0 bg-[var(--coreterra-bronze)] text-[12px] font-bold tracking-[.09cqw] text-[var(--coreterra-off-white)] uppercase cursor-pointer hover:bg-[var(--coreterra-bronze-dark)] min-[1101px]:min-h-11 min-[1101px]:text-[max(12px,1.02cqw)] min-[1101px]:tracking-[.09cqw] max-[1100px]:h-auto max-[1100px]:w-auto max-[1100px]:min-h-12 max-[1100px]:rounded-[2px] max-[1100px]:px-6 max-[1100px]:py-[14px] max-[1100px]:text-xs max-[1100px]:tracking-[1px]',
  scrollCue: 'absolute top-[38cqw] left-[10.1cqw] z-[3] size-[2.6cqw] border border-[#bbb] max-[1100px]:top-auto max-[1100px]:bottom-[75px] max-[1100px]:left-[7%] max-[1100px]:size-6 max-[767px]:bottom-16 max-[767px]:left-[9%] [&>span]:absolute [&>span]:inset-0 [&>span]:grid [&>span]:rotate-[-45deg] [&>span]:place-items-center [&_svg]:block [&_svg]:size-full after:absolute after:top-[3cqw] after:left-[3cqw] after:h-[8.6cqw] after:w-px after:origin-top after:rotate-[-45deg] after:bg-[#999] after:content-[""] max-[1100px]:after:top-[29px] max-[1100px]:after:left-[29px] max-[1100px]:after:h-12',
  about: 'relative h-[22.7cqw] bg-[#030404] [background-image:repeating-linear-gradient(31deg,transparent_0_1.4cqw,#ffffff04_1.5cqw_1.9cqw)] max-[1100px]:grid max-[1100px]:h-auto max-[1100px]:grid-cols-2 max-[1100px]:gap-8 max-[1100px]:px-[8%] max-[1100px]:pt-12 max-[767px]:gap-x-[14px] max-[767px]:gap-y-6 max-[767px]:px-[6%] max-[767px]:pt-10',
  eyebrow: 'm-0 mb-[.8cqw] text-xs font-bold tracking-[.09em] text-[var(--coreterra-bronze-light)] uppercase before:mr-[.6cqw] before:inline-block before:h-px before:w-[1.6cqw] before:align-middle before:bg-[var(--coreterra-bronze-light)] before:content-[""] max-[1100px]:mb-3 max-[1100px]:before:mr-[6px] max-[1100px]:before:w-4',
  sectionTitle: 'm-0 text-[clamp(34px,3.1cqw,46px)] leading-[1.08] font-medium tracking-[-.02cqw] uppercase max-[1100px]:text-[clamp(25px,3vw,32px)] max-[1100px]:leading-[1.1] max-[1100px]:tracking-[-.3px] max-[767px]:text-[clamp(28px,7vw,38px)]',
  outline: 'absolute top-0 left-0 z-[3] h-[22.6cqw] w-full pointer-events-none animate-[contour-drift_14s_ease-in-out_infinite] max-[1100px]:top-[5px] max-[1100px]:h-auto max-[1100px]:opacity-50',
  aboutHeading: 'absolute top-[4.2cqw] left-[15.3cqw] z-[3] max-[1100px]:relative max-[1100px]:inset-auto max-[1100px]:min-w-0',
  aboutTitle: 'scale-x-[1.025] origin-left text-[clamp(30px,2.7cqw,44px)] leading-[1.08] font-medium tracking-[-.02cqw] uppercase max-[1100px]:scale-x-100 max-[767px]:text-[30px]',
  aboutCopy: 'absolute top-[5.3cqw] left-[51.1cqw] z-[3] w-[34cqw] text-[16px] leading-[1.55] text-[#aaa] max-[1100px]:relative max-[1100px]:inset-auto max-[1100px]:mt-6 max-[1100px]:w-auto max-[1100px]:min-w-0 max-[1100px]:text-[15px] max-[1100px]:leading-[1.7] max-[767px]:col-span-full max-[767px]:mt-0 max-[767px]:mb-2 max-[767px]:max-w-[600px]',
  photo: 'absolute z-[4] bg-cover bg-no-repeat max-[1100px]:relative max-[1100px]:inset-auto max-[1100px]:mb-[-60px] max-[1100px]:h-auto max-[1100px]:w-auto max-[1100px]:min-w-0 max-[1100px]:aspect-[4/3] max-[767px]:mb-[-40px] max-[767px]:aspect-[3/4]',
  photoSite: 'top-[16.2cqw] left-[15.3cqw] h-[25.8cqw] w-[27.2cqw] bg-[url(/about-yard-clean.png)] bg-[position:center_58%]',
  photoTeam: 'top-[19.7cqw] left-[43.8cqw] h-[22.3cqw] w-[41cqw] bg-[url(/about-slope-clean.png)] bg-[position:center_56%] max-[1100px]:mt-7 max-[767px]:col-start-2 max-[767px]:mt-6',
  lowerDecoration: 'relative h-[19.3cqw] bg-[#e9eaea] after:absolute after:inset-0 after:bg-[var(--coreterra-bronze)] after:[clip-path:polygon(90%_0,100%_0,100%_69%,97.2%_100%,80%_100%)] after:content-[""] max-[1100px]:h-[110px] max-[767px]:h-20',
  sectionShell: 'px-[9.6%] py-24 max-[1100px]:px-[8%] max-[1100px]:py-[76px] max-[767px]:px-[6%] max-[767px]:py-[60px]',
  services: 'relative bg-[#e9eaea] text-[var(--coreterra-charcoal-deep)] before:pointer-events-none before:absolute before:top-0 before:right-0 before:z-0 before:h-[340px] before:w-[min(35%,500px)] before:[clip-path:polygon(30%_0,100%_0,100%_100%)] before:bg-[repeating-linear-gradient(31deg,transparent_0_20px,#8b623d14_21px_22px)] before:content-[""] [&>*]:relative [&>*]:z-[1]',
  sectionIntro: 'section-intro mb-[60px] grid grid-cols-[1.1fr_1fr] items-end gap-x-[7%] max-[767px]:mb-8 max-[767px]:grid-cols-1 max-[767px]:gap-y-[14px] [&>p:first-child]:col-start-1 [&>p:first-child]:row-start-1 [&>h2]:col-start-1 [&>h2]:row-start-2 [&>p:last-child]:col-start-2 [&>p:last-child]:row-start-2 max-[767px]:[&>p:first-child]:col-start-1 max-[767px]:[&>p:first-child]:row-auto max-[767px]:[&>h2]:col-start-1 max-[767px]:[&>h2]:row-auto max-[767px]:[&>p:last-child]:col-start-1 max-[767px]:[&>p:last-child]:row-auto',
  sectionIntroLead: 'm-0 max-w-[500px] text-base leading-[1.7] text-[#555550]',
  serviceGrid: 'grid grid-cols-4 gap-[18px] border-0 max-[1100px]:grid-cols-2 max-[767px]:grid-cols-1 max-[767px]:gap-4',
  serviceCard: 'flex min-h-[390px] min-w-0 flex-col rounded-xl border border-[#e0ddd7] bg-[#f8f7f4] px-7 pt-8 pb-7 shadow-[0_8px_24px_#28231d0d] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-[3px] hover:border-[#b58a60] hover:shadow-[0_14px_28px_#28231d16] focus-within:-translate-y-[3px] focus-within:border-[#b58a60] focus-within:shadow-[0_14px_28px_#28231d16] max-[1100px]:min-h-[470px] max-[1100px]:px-[18px] max-[1100px]:py-6 max-[767px]:min-h-0 max-[767px]:px-6 max-[767px]:pt-[26px] max-[767px]:pb-[26px] max-[767px]:border-l',
  serviceVisual: 'relative flex h-[88px] items-start overflow-visible border-0 bg-transparent max-[767px]:h-[82px] [&>svg]:relative [&>svg]:block [&>svg]:size-[76px] [&>svg]:pointer-events-none [&>svg]:transition-transform [&>svg]:duration-[.55s] [&>svg]:ease-[cubic-bezier(.2,.65,.25,1)] group-hover:[&>svg]:scale-[1.08] group-hover:[&>svg]:-translate-y-0.5 group-focus-within:[&>svg]:scale-[1.08] group-focus-within:[&>svg]:-translate-y-0.5',
  serviceBody: 'flex-1 max-[767px]:mb-6',
  serviceKicker: 'mt-0 mb-[10px] text-[11px] font-bold tracking-[.12em] text-[#8b623d] uppercase',
  serviceTitle: 'mt-0 mb-[14px] text-[clamp(20px,1.55cqw,23px)] leading-[1.2] font-bold max-[767px]:text-[19px]',
  serviceText: 'm-0 text-[15px] leading-[1.65] text-[#555550]',
  serviceDetail: 'mt-[26px] block text-xs font-bold tracking-[.1em] text-[var(--coreterra-bronze-dark)] uppercase before:mr-[10px] before:inline-block before:h-px before:w-5 before:align-middle before:bg-current before:content-[""]',
  projects: 'relative overflow-hidden bg-[#e3e0d9] text-[var(--coreterra-charcoal-deep)] before:absolute before:top-0 before:right-0 before:h-[300px] before:w-[35%] before:[clip-path:polygon(34%_0,100%_0,100%_100%)] before:bg-[repeating-linear-gradient(31deg,transparent_0_19px,#76543a15_20px_21px)] before:content-[""] [&>*]:relative',
  projectsIntro: 'projects-intro mb-12 grid grid-cols-2 items-end gap-[10%] max-[767px]:mb-[30px] max-[767px]:grid-cols-1 max-[767px]:gap-8 [&_.eyebrow]:text-[var(--coreterra-bronze-dark)] [&_.eyebrow]:before:bg-[var(--coreterra-bronze-dark)] [&>p]:text-[#555550]',
  projectsLead: 'm-0 max-w-[500px] text-base leading-[1.7]',
  toolbar: 'flex items-center justify-between gap-6 border-t border-[#9e9b94] py-[18px]',
  toolbarLabel: 'm-0 text-xs font-bold tracking-[.12em] text-[#5f5c57] uppercase [&>span]:px-2 [&>span]:text-[#9a7553]',
  projectControls: 'project-controls flex gap-2 [&>button]:grid [&>button]:size-11 [&>button]:place-items-center [&>button]:border [&>button]:border-[#8f8a81] [&>button]:bg-transparent [&>button]:text-[23px] [&>button]:text-[#272927] [&>button]:cursor-pointer [&>button]:transition-[background,color,transform] [&>button]:duration-[.25s] [&>button:hover:not(:disabled)]:-translate-y-0.5 [&>button:hover:not(:disabled)]:bg-[#343935] [&>button:hover:not(:disabled)]:text-white [&>button:disabled]:cursor-not-allowed [&>button:disabled]:opacity-[.38]',
  projectList: 'm-0 flex list-none gap-[22px] overflow-x-auto overscroll-x-contain scroll-smooth snap-x snap-mandatory px-0 pt-1 pb-[18px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
  projectCard: 'min-w-0 shrink-0 basis-[clamp(300px,34cqw,440px)] snap-start max-[767px]:basis-[min(82vw,360px)]',
  projectArticle: 'flex h-full flex-col overflow-hidden border border-[#b8b2a8] bg-[#f5f2eb] transition-[border-color,transform,box-shadow] duration-300 group-hover:-translate-y-1 group-hover:border-[#886342] group-hover:shadow-[0_16px_28px_#28231d18] group-focus-within:-translate-y-1 group-focus-within:border-[#886342] group-focus-within:shadow-[0_16px_28px_#28231d18]',
  projectContent: 'flex flex-1 flex-col px-[26px] pt-6 pb-[26px] max-[767px]:px-5 max-[767px]:pt-5 max-[767px]:pb-[22px]',
  projectMeta: 'flex justify-between gap-3 border-b border-[#c4bdb3] pb-[17px]',
  projectMetaLabel: 'text-[11px] leading-[1.35] font-bold tracking-[.09em] text-[var(--coreterra-bronze-dark)] uppercase',
  projectLocation: 'text-right text-[11px] leading-[1.35] font-bold tracking-[.09em] text-[var(--coreterra-bronze-dark)] uppercase',
  projectCategory: 'mt-[26px] mb-[10px] text-[11px] font-bold tracking-[.12em] text-[#6d685f] uppercase',
  projectClient: 'mt-0 mb-[10px] text-[11px] leading-[1.45] font-bold tracking-[.06em] text-[var(--coreterra-bronze-dark)] uppercase',
  projectTitle: 'mt-0 mb-3 min-h-[2.4em] text-[clamp(21px,1.7cqw,25px)] leading-[1.2] font-bold uppercase max-[767px]:min-h-0 max-[767px]:text-[21px]',
  projectScope: 'mb-[30px] mt-0 max-w-[48ch] text-[15px] leading-[1.65] text-[#555550]',
  projectRead: 'project-read-more mt-auto flex min-h-11 items-center justify-between gap-4 border-t border-[#938c81] pt-3 text-xs font-bold tracking-[.09em] text-[#47321f] uppercase [&>span]:text-[22px] [&>span]:leading-none [&>span]:font-normal [&>span]:transition-transform [&>span]:duration-[.25s] [&:hover>span]:translate-x-[3px] [&:hover>span]:-translate-y-[3px]',
  projectProgress: 'mt-[26px] h-[2px] bg-[#bdb7ac] [&>span]:block [&>span]:h-full [&>span]:w-full [&>span]:origin-left [&>span]:bg-[var(--coreterra-bronze-dark)] [&>span]:transition-transform [&>span]:duration-[.15s] [&>span]:ease-linear',
}

function ServiceDiagram({ number }: { number: string }) {
  return (
    <svg className="service-diagram" viewBox="0 0 80 80" fill="none" aria-hidden="true" focusable="false">
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
    </svg>
  )
}

export default function HomeInteractive() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const projectTrackRef = useRef<HTMLOListElement>(null)
  const [projectScroll, setProjectScroll] = useState({ start: true, end: false, progress: 0 })

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

    const update = () => {
      const distance = Math.max(0, track.scrollWidth - track.clientWidth)
      setProjectScroll({
        start: track.scrollLeft <= 2,
        end: track.scrollLeft >= distance - 2,
        progress: distance ? track.scrollLeft / distance : 1,
      })
    }
    update()
    track.addEventListener('scroll', update, { passive: true })
    const observer = new ResizeObserver(update)
    observer.observe(track)
    return () => {
      track.removeEventListener('scroll', update)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reducedMotion) {
      elements.forEach((element) => element.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' })

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
      }
    }
    const handleResize = () => {
      if (window.matchMedia('(min-width: 768px)').matches) setMenuOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
    <div className={`site-loader ${ui.loader}${loading ? '' : ' site-loader--hidden'}`} aria-hidden={!loading}>
      <svg className={ui.loaderArt} viewBox="0 0 1000 700" aria-hidden="true" focusable="false">
        <g fill="none" stroke="#b58a60" strokeWidth="1">
          <path className={`${ui.loaderLine} loader-contour`} d="M-80 520c180-170 290-164 432-52s262 108 390-10 240-144 338-64" />
          <path className={`${ui.loaderLine} ${ui.loaderLineTwo} loader-contour`} d="M-120 610c176-146 294-149 429-50s260 94 395-13 242-128 347-57" />
          <path className={`${ui.loaderLine} ${ui.loaderLineThree} loader-contour`} d="M-70 410c152-115 275-111 405-15s262 102 403-22 216-121 309-70" />
          <path d="M0 118h1000M0 584h1000" strokeDasharray="2 12" opacity=".3" />
        </g>
      </svg>
      <div className={ui.loaderContent} role="status" aria-live="polite">
        <div className={ui.loaderMark}><Image className={ui.loaderMarkImage} src="/logo.png" alt="Coreterra" width={110} height={110} priority /></div>
        <p className={ui.loaderKicker}>Konsultan Geoengineering</p>
        <p className={ui.loaderWordmark}>CORETERRA</p>
        <div className={ui.loaderStatus}><span>Membaca data lapangan</span><span aria-hidden="true">Coreterra / Geoengineering</span></div>
        <div className={ui.loaderProgress} aria-hidden="true"><span className={`${ui.loaderProgressBar} loader-progress`} /></div>
      </div>
    </div>
    <div className={`site-shell ${ui.shell}${loading ? ` ${ui.shellLoading}` : ` site-shell--ready ${ui.shellReady}`}`}>
    <main className={ui.page} aria-busy={loading}>
      <section className={ui.hero} id="home" aria-labelledby="hero-title">
        <svg className={`hero-art ${ui.heroArt}`} viewBox="0 0 500 500" aria-hidden="true">
          <defs><path id="hero-shapes" d="M202 144 322 24Q350-4 378 24l122 122v204L389 239l-46 46ZM201 151l68 68-68 68-48-48q-20-20 0-40Z" /><clipPath id="orange-shapes"><use href="#hero-shapes" /></clipPath><mask id="outside-shapes" maskUnits="userSpaceOnUse" x="0" y="0" width="500" height="500"><rect width="500" height="500" fill="white" /><use href="#hero-shapes" fill="black" /></mask><linearGradient id="hero-shade" x1="0" x2="1"><stop offset="0" stopColor="#101313" stopOpacity=".84" /><stop offset="1" stopColor="#101313" stopOpacity=".6" /></linearGradient><filter id="monochrome"><feColorMatrix type="saturate" values="0" /></filter><pattern id="diagonal-lines" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(31)"><path d="M0 0H8" stroke="#fff" strokeOpacity=".032" strokeWidth="2" /></pattern><linearGradient id="stripe-opacity"><stop stopColor="black" /><stop offset=".35" stopColor="white" /></linearGradient><mask id="stripe-fade"><rect width="500" height="500" fill="url(#stripe-opacity)" /></mask></defs>
          <image href="/hero-drilling-clean.png" width="500" height="350" preserveAspectRatio="xMidYMid slice" filter="url(#monochrome)" /><rect width="500" height="350" fill="url(#hero-shade)" mask="url(#outside-shapes)" /><rect width="500" height="350" fill="#8b623d" clipPath="url(#orange-shapes)" style={{ mixBlendMode: 'multiply' }} />
          <g mask="url(#outside-shapes)"><path d="M0 223 500 278v125H0Z" fill="#030404" /><path d="M0 241 500 296v107H0Z" fill="url(#diagonal-lines)" mask="url(#stripe-fade)" /></g><g clipPath="url(#orange-shapes)" stroke="#171b1b" strokeWidth="7" opacity=".9"><path d="M275 58 510 293M215 144 510 439" /></g>
        </svg>
        <header className={ui.header}>
          <a className={ui.brand} href="#home" aria-label="Coreterra, kembali ke beranda"><span className={ui.brandMark}><Image className={ui.brandImage} src="/logo.png" alt="" width={80} height={80} priority /></span><span className={ui.brandName}>CORETERRA</span><span className={ui.brandTag}>KONSULTAN GEOENGINEERING</span></a>
          <button className={ui.menu} type="button" aria-expanded={menuOpen} aria-controls="main-nav" onClick={() => setMenuOpen((open) => !open)}>Menu <span aria-hidden="true">☰</span></button>
          <nav id="main-nav" className={`${ui.nav}${menuOpen ? ` ${ui.navOpen}` : ''}`} aria-label="Navigasi utama"><a className={ui.navLink} href="#home" onClick={() => setMenuOpen(false)}>Beranda</a><a className={ui.navLink} href="#about" onClick={() => setMenuOpen(false)}>Tentang</a><a className={ui.navLink} href="#services" onClick={() => setMenuOpen(false)}>Layanan</a><a className={ui.navLink} href="#projects" onClick={() => setMenuOpen(false)}>Proyek</a><a className={ui.navLink} href="#contact" onClick={() => setMenuOpen(false)}>Kontak</a></nav>
        </header>
        <div className={`hero-copy ${ui.heroCopy}`} data-reveal="hero"><h1 className={ui.heroTitle} id="hero-title">Kondisi lapangan.<br />Analisis geoteknik.<br />Arahan rekayasa.</h1><p className={ui.heroLead}>Konsultansi geoengineering untuk pertambangan,<br />infrastruktur, energi, dan eksplorasi.</p><a className={ui.contactButton} href="#services">Lihat layanan</a></div>
        <a className={`scroll-cue ${ui.scrollCue}`} data-reveal="cue" href="#about" aria-label="Gulir ke Tentang Kami"><span aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="m7 9.5 5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span></a>
      </section>

      <section className={ui.about} id="about" aria-labelledby="about-title">
        <svg className={`outline-decoration ${ui.outline}`} viewBox="0 0 500 113" aria-hidden="true"><g fill="none" stroke="#a4a7a4" strokeWidth=".7"><path d="M-15 17 0 5Q10-2 20 9l100 104M-12 40l72 73M-12 68l45 45" /><path d="M0 113q2-8 5 0" /></g></svg>
        <div className={ui.aboutHeading} data-reveal="about-heading"><p className={`eyebrow ${ui.eyebrow}`}>Tentang Coreterra</p><h2 className={ui.aboutTitle} id="about-title">Mengenal kondisi<br />bawah permukaan</h2></div>
        <p className={ui.aboutCopy} data-reveal="about-copy">PT Coreterra Geo Engineering adalah konsultan geoengineering. Lingkup pengalamannya mencakup geoteknik tambang, investigasi fondasi, hidrologi–hidrogeologi, survei geofisika, dan eksplorasi untuk tambang, infrastruktur, serta energi.</p>
        <div className={`${ui.photo} ${ui.photoSite}`} data-reveal="photo" role="img" aria-label="Peralatan dan aktivitas kerja lapangan Coreterra" />
        <div className={`${ui.photo} ${ui.photoTeam}`} data-reveal="photo" role="img" aria-label="Pekerjaan lapangan di area lereng dan aliran air" />
      </section>
      <div className={ui.lowerDecoration} aria-hidden="true" />

      <section className={`${ui.services} ${ui.sectionShell}`} id="services" aria-labelledby="services-title">
        <div className={ui.sectionIntro} data-reveal="section"><p className={`eyebrow ${ui.eyebrow}`}>Bidang layanan</p><h2 className={ui.sectionTitle} id="services-title">Ruang lingkup<br />geoengineering.</h2><p className={ui.sectionIntroLead}>Kajian dan investigasi disusun sesuai persoalan teknis, kondisi lokasi, serta data yang dibutuhkan untuk mengambil keputusan.</p></div>
        <div className={ui.serviceGrid}>{services.map((service) => <article className={`service-card group ${ui.serviceCard}`} data-reveal="service" key={service.number}><div className={ui.serviceVisual}><ServiceDiagram number={service.number} /></div><div className={ui.serviceBody}><p className={ui.serviceKicker}>Layanan {service.number}</p><h3 className={ui.serviceTitle}>{service.title}</h3><p className={ui.serviceText}>{service.description}</p></div><span className={ui.serviceDetail}>{service.detail}</span></article>)}</div>
      </section>

      <section className={`${ui.projects} ${ui.sectionShell}`} id="projects" aria-labelledby="projects-title">
        <div className={ui.projectsIntro} data-reveal="section"><div><p className={`eyebrow ${ui.eyebrow}`}>Pengalaman proyek</p><h2 className={ui.sectionTitle} id="projects-title">Kajian di beragam<br />kondisi lapangan.</h2></div><p className={ui.projectsLead}>Contoh pekerjaan Coreterra mencakup lokasi tambang, jalan angkut, fondasi, fasilitas energi, dan area eksplorasi di Indonesia serta Malaysia.</p></div>
        <div className={ui.toolbar} data-reveal="toolbar"><p className={ui.toolbarLabel}>Jelajahi proyek <span aria-hidden="true">/</span> 01—{String(projects.length).padStart(2, '0')}</p><div className={ui.projectControls}><button type="button" onClick={() => moveProjects(-1)} disabled={projectScroll.start} aria-label="Lihat proyek sebelumnya">←</button><button type="button" onClick={() => moveProjects(1)} disabled={projectScroll.end} aria-label="Lihat proyek berikutnya">→</button></div></div>
        <ol className={`project-list ${ui.projectList}`} ref={projectTrackRef} tabIndex={0} data-reveal="project-list" aria-label="Daftar pengalaman proyek; geser untuk melihat proyek lainnya" onKeyDown={(event) => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); moveProjects(event.key === 'ArrowRight' ? 1 : -1) } }}>{projects.map((project) => <li className={`project-card group ${ui.projectCard}`} data-reveal="project" key={project.slug}><article className={ui.projectArticle}><ProjectVisual project={project} /><div className={ui.projectContent}><div className={ui.projectMeta}><span className={ui.projectMetaLabel}>{project.number} / {String(projects.length).padStart(2, '0')}</span><span className={ui.projectLocation}>{project.location}</span></div><p className={ui.projectCategory}>{project.category}</p><p className={ui.projectClient}>{project.client}</p><h3 className={ui.projectTitle}>{project.title}</h3><p className={ui.projectScope}>{project.scope}</p><a className={ui.projectRead} href={`/proyek/${project.slug}`} aria-label={`Baca selengkapnya: ${project.title}`}>Baca selengkapnya <span aria-hidden="true">↗</span></a></div></article></li>)}</ol>
        <div className={ui.projectProgress} role="progressbar" aria-label="Posisi daftar proyek" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(projectScroll.progress * 100)}><span style={{ transform: `scaleX(${Math.max(.08, projectScroll.progress)})` }} /></div>
      </section>

    </main>
    <ContactFooter />
    </div>
    </>
  )
}
