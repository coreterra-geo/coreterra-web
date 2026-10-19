import { siteCopy, type Project } from '@/data/projects'
import Image from 'next/image'

export default function ProjectVisual({ project, className = '', priority = false, sizes = '(max-width: 767px) 82vw, (max-width: 1100px) 44vw, 34vw' }: { project: Project; className?: string; priority?: boolean; sizes?: string }) {
  return (
    <div
      className={`relative grid h-[230px] flex-none place-items-center overflow-hidden bg-[#d5d0c5] text-white [clip-path:polygon(0_0,100%_0,100%_87%,90%_100%,0_100%)] before:absolute before:inset-0 before:z-[1] before:bg-[linear-gradient(180deg,#17171620_0%,#17171610_45%,#171716a8_100%)] before:content-[""] max-[767px]:h-[205px] ${className}`}
      role="img"
      aria-label={project.imageAlt}
    >
      <Image
        className="absolute inset-0 size-full object-cover transition-transform duration-[.6s] ease-[cubic-bezier(.2,.65,.25,1)] motion-reduce:transition-none group-hover:scale-[1.025] group-focus-within:scale-[1.025]"
        src={project.image}
        alt=""
        fill
        sizes={sizes}
        quality={78}
        priority={priority}
        aria-hidden="true"
        style={{ objectPosition: project.imagePosition ?? 'center' }}
      />
      <span className="absolute top-[19px] left-5 z-[1] text-[10px] font-bold tracking-[.11em] text-white uppercase">CT / {project.number}</span>
      <span className="absolute right-[25px] bottom-[25px] z-[1] bg-[#17171699] px-2 py-[6px] text-[9px] font-bold tracking-[.11em] text-white uppercase">{siteCopy.fieldDocumentation}</span>
    </div>
  )
}
