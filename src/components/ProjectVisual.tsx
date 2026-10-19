import type { Project } from '@/data/projects'

export default function ProjectVisual({ project }: { project: Project }) {
  return (
    <div
      className="project-visual"
      role="img"
      aria-label={project.imageAlt}
      style={{ backgroundImage: 'url("' + project.image + '")', backgroundPosition: project.imagePosition ?? 'center' }}
    >
      <span className="project-visual-axis">CT / {project.number}</span>
      <span className="project-visual-caption">Dokumentasi lapangan</span>
    </div>
  )
}

