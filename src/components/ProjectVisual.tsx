import type { Project } from '@/data/projects'

export default function ProjectVisual({ project }: { project: Project }) {
  return (
    <div className={`project-visual project-visual--${project.visual}`} aria-hidden="true">
      <span className="project-visual-axis">CT / {project.number}</span>
      <svg viewBox="0 0 480 280" fill="none" preserveAspectRatio="xMidYMid meet">
        <g className="project-visual-grid" strokeWidth="1">
          <path d="M0 56H480M0 112H480M0 168H480M0 224H480M60 0V280M120 0V280M180 0V280M240 0V280M300 0V280M360 0V280M420 0V280" />
        </g>
        {project.visual === 'slope' && <g strokeWidth="2"><path d="M0 88h110l80 64h72l62 55h156M0 133h93l78 64h86l49 42h174M0 181h72l67 55h80l39 34h222" /><path d="M169 27v201m112-122v145" strokeDasharray="5 7" /><circle cx="169" cy="145" r="7" /><circle cx="281" cy="181" r="7" /></g>}
        {project.visual === 'road' && <g strokeWidth="2"><path d="M0 165c94-37 150-90 248-66 67 16 133 64 232 40M0 207c92-39 159-94 258-66 69 19 131 63 222 42" /><path d="M0 228c116-14 168-28 249-16 77 11 148 38 231 26" strokeDasharray="6 6" /><path d="M66 44v190m335-205v190" strokeDasharray="3 8" /><circle cx="115" cy="133" r="7" /><circle cx="340" cy="133" r="7" /></g>}
        {project.visual === 'foundation' && <g strokeWidth="2"><path d="M0 83h480M0 127c95-14 166 21 252 0s167-9 228-5M0 184c99 16 159-19 252-4s160 10 228-3M0 237c106-13 177 17 270 0s151-4 210-7" /><path d="M210 18v235m21-235v235M195 18h51m-51 235h51" /><path d="M231 65h61m-61 62h88m-88 57h55" strokeDasharray="5 5" /></g>}
        {project.visual === 'resistivity' && <g strokeWidth="2"><path d="M0 76c64 0 64 20 128 20s64-26 128-26 98 39 224 5M0 130c87-23 131 16 208 5 95-14 155-35 272 8M0 192c80-18 155 15 235 4 85-11 149-42 245 2M0 244c106 8 177-28 265-10 84 17 130 19 215-2" /><path d="M58 34v55m91-55v62m91-62v43m91-43v54m91-54v51" /><circle cx="149" cy="96" r="7" /><circle cx="332" cy="177" r="7" /></g>}
        {project.visual === 'limestone' && <g strokeWidth="2"><path d="M0 89h480M0 137l95-9 82 14 85-11 107 10 111-8M0 189l70-7 99 14 109-7 97 8 105-10M0 238l94 5 90-8 83 8 104-7 109 6" /><path d="M224 20v242m22-242v242M210 20h50m-50 242h50" /><path d="M224 88h22m-22 49h22m-22 52h22m-22 49h22" strokeWidth="4" /></g>}
        {project.visual === 'magnetic' && <g strokeWidth="2"><path d="M0 178c35 0 38-89 75-89s37 110 74 110 41-66 78-66 42 81 80 81 43-128 87-128 47 92 86 92" /><path d="M0 239h480M75 45v197m74-197v197m78-197v197m80-197v197m87-197v197" strokeDasharray="5 7" /><circle cx="75" cy="89" r="7" /><circle cx="394" cy="86" r="7" /></g>}
        <g className="project-visual-corners" strokeWidth="1"><path d="M20 20h28M20 20v28M460 20h-28M460 20v28M20 260h28M20 260v-28M460 260h-28M460 260v-28" /></g>
      </svg>
      <span className="project-visual-caption">Ilustrasi teknis / bukan data proyek</span>
    </div>
  )
}
