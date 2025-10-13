import React, { useState, useEffect, useRef } from 'react';
import { Job } from '../types';

interface JobCardProps {
    job: Job;
    index: number;
    onEdit: (job: Job) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, index, onEdit }) => {
    const cardRef = useRef<HTMLElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = [job.image1, job.image2, job.image3].filter(img => img);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(cardRef.current);
            }
        };
    }, []);

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };
    
    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = 'https://placehold.co/600x400/374151/FFFFFF?text=Imagem+Indisponível';
    };
    
    const InfoField = ({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) => (
        <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 text-blue-600 mt-1">{icon}</div>
            <div>
                <h4 className="font-semibold text-gray-800 text-sm">{label}</h4>
                <p className="text-gray-600 text-sm">{value}</p>
            </div>
        </div>
    );

    // Fix: Updated component definition to use React.FC to correctly handle the 'key' prop in TypeScript.
    const ToolTag: React.FC<{tool: string}> = ({ tool }) => (
        <span className="inline-block bg-gray-200 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full">{tool}</span>
    );

    return (
        <article
            ref={cardRef}
            style={{ '--card-index': index % 3 } as React.CSSProperties}
            className={`
                bg-white rounded-xl shadow-lg hover:shadow-2xl 
                transition-all duration-300 transform hover:-translate-y-1 flex flex-col overflow-hidden
                ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-5 scale-95'}
                delay-[calc(var(--card-index)_*_150ms)]
            `}
        >
            <div className="relative w-full h-56 overflow-hidden group">
                <button
                    onClick={(e) => { e.stopPropagation(); onEdit(job); }}
                    aria-label={`Editar ${job.title}`}
                    className="absolute top-3 right-3 z-20 p-2 bg-white/70 backdrop-blur-sm text-gray-700 rounded-full hover:bg-white hover:text-gray-900 transition-all duration-200 shadow-md"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
                    </svg>
                </button>
                <img 
                    src={images[currentIndex]} 
                    onError={handleImageError} 
                    alt={`Imagem ${currentIndex + 1} para ${job.title}`} 
                    className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                {images.length > 1 && (
                    <>
                        <button 
                            onClick={handlePrev} 
                            aria-label="Imagem anterior"
                            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full w-9 h-9 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                        </button>
                        <button 
                            onClick={handleNext} 
                            aria-label="Próxima imagem"
                            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full w-9 h-9 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                        </button>
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1.5 z-10">
                            {images.map((_, idx) => (
                                <div key={idx} className={`w-2 h-2 rounded-full transition-colors duration-300 ${currentIndex === idx ? 'bg-white' : 'bg-white/50'}`}></div>
                            ))}
                        </div>
                    </>
                )}
            </div>
            <div className="p-5 flex-grow flex flex-col">
                <div className="mb-3">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-full">{job.solutionType}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{job.title}</h3>
                <span className="text-xs text-gray-500 mb-4">{job.date}</span>

                <div className="space-y-4 text-sm flex-grow mb-4">
                    <InfoField label="Problema" value={job.problem} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>} />
                    <InfoField label="Solução" value={job.solutionDescription} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M11 3a1 1 0 100 2h.01a1 1 0 100-2H11zM12 2.251a1 1 0 00-1-1H9a1 1 0 00-1 1v.093C7.223 2.502 6.5 3.328 6.5 4.5c0 1.13.636 2.093 1.56 2.457l.092.035a1 1 0 001.101-1.303A.993.993 0 019 5.5c0-.528.324-.963.748-1.172A.999.999 0 0011 3.251V2.251zM12 10a1 1 0 01-1 1H9a1 1 0 110-2h2a1 1 0 011 1zM12 15a1 1 0 01-1 1H9a1 1 0 110-2h2a1 1 0 011 1z" /><path fillRule="evenodd" d="M5 4a3 3 0 013-3h4a3 3 0 013 3v12a3 3 0 01-3 3H8a3 3 0 01-3-3V4zm3-1a1 1 0 00-1 1v12a1 1 0 001 1h4a1 1 0 001-1V4a1 1 0 00-1-1H8z" clipRule="evenodd" /></svg>} />
                    {job.components && <InfoField label="Componentes" value={job.components} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" /></svg>} />}
                </div>

                <div className="mb-5">
                    <h4 className="font-semibold text-gray-800 text-sm mb-2 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        Ferramentas Utilizadas
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {job.tools.split(',').map(tool => <ToolTag key={tool.trim()} tool={tool.trim()} />)}
                    </div>
                </div>

                {job.link && (
                    <div className="mt-auto pt-4 border-t border-gray-100 text-center">
                        <a 
                            href={job.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded-full px-5 py-2.5 text-sm shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                        >
                            Acessar Aplicação
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                        </a>
                    </div>
                )}
            </div>
        </article>
    );
};

export default JobCard;