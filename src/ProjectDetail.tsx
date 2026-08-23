import React, { useEffect } from 'react';

interface ProjectDetailProps {
    project: any; // Gunakan tipe data item project Anda
    onBack: () => void;
    tCta: string; // Teks tombol CTA dari kamus
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack, tCta }) => {
    // Scroll ke atas saat komponen dibuka
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    if (!project) return null;

    return (
        <article className="min-h-screen bg-slate-50 py-24 px-4 sm:px-6 lg:px-8 animate-fade-in">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={onBack}
                    className="mb-8 inline-flex items-center text-sm font-bold text-slate-600 hover:text-amber-600 transition-colors"
                >
                    &larr; Kembali ke Portofolio
                </button>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="h-64 sm:h-80 md:h-96 w-full relative overflow-hidden bg-slate-200">
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-sm text-white text-xs font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest">
                            {project.category}
                        </div>
                    </div>

                    <div className="p-8 sm:p-10">
                        <p className="text-sm font-semibold text-amber-600 mb-3 flex items-center">
                            <span className="mr-2">📍</span> {project.location}
                        </p>
                        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-8">
                            {project.title}
                        </h1>

                        <div className="prose prose-slate prose-lg max-w-none mb-12">
                            <p className="text-slate-700 leading-relaxed">
                                {project.fullDesc}
                            </p>
                        </div>

                        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">

                            </p>
                            <a
                                href="#contact"
                                onClick={onBack} // Kembali & gulir ke kontak
                                className="bg-amber-600 text-white px-8 py-3 rounded text-sm font-bold tracking-wider uppercase hover:bg-amber-700 transition-colors shadow-md"
                            >
                                {tCta}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default ProjectDetail;