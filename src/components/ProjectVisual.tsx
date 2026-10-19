import { siteCopy, type Project } from '@/data/projects'

export default function ProjectVisual({ project, className = '' }: { project: Project; className?: string }) {
  return (
    <div
      className={`relative grid h-[230px] flex-none place-items-center overflow-hidden bg-[#d5d0c5] bg-cover text-white [clip-path:polygon(0_0,100%_0,100%_87%,90%_100%,0_100%)] transition-[background-position] duration-[.6s] ease-[cubic-bezier(.2,.65,.25,1)] motion-reduce:transition-none before:absolute before:inset-0 before:bg-[linear-gradient(180deg,#17171620_0%,#17171610_45%,#171716a8_100%)] before:content-[""] group-hover:bg-[position:calc(50%+8px)_center] group-focus-within:bg-[position:calc(50%+8px)_center] max-[767px]:h-[205px] ${className}`}
      role="img"
      aria-label={project.imageAlt}
      style={{ backgroundImage: 'url("' + project.image + '")', backgroundPosition: project.imagePosition ?? 'center' }}
    >
      <span className="absolute top-[19px] left-5 z-[1] text-[10px] font-bold tracking-[.11em] text-white uppercase">CT / {project.number}</span>
      <span className="absolute right-[25px] bottom-[25px] z-[1] bg-[#17171699] px-2 py-[6px] text-[9px] font-bold tracking-[.11em] text-white uppercase">{siteCopy.fieldDocumentation}</span>
    </div>
  )
}
