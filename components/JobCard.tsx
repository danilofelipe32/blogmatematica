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

    const InfoField = ({ label, value }: { label: string, value: string }) => (
        <div>
            <h4 className="font-semibold text-gray-700 text-sm">{label}</h4>
            <p className="text-gray-600 text-sm">{value}</p>
        </div>
    );

    return (
        <article
            ref={cardRef}
            style={{ '--card-index': index % 3 } as React.CSSProperties}
            className={`
                relative bg-white rounded-xl shadow-lg hover:shadow-2xl 
                transition-all duration-300 transform hover:-translate-y-1 flex flex-col overflow-hidden
                ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-5 scale-95'}
                delay-[calc(var(--card-index)_*_150ms)]
            `}
        >
            <button
                onClick={(e) => { e.stopPropagation(); onEdit(job); }}
                aria-label={`Editar ${job.title}`}
                className="absolute top-3 right-3 z-10 p-2 bg-white/70 backdrop-blur-sm text-gray-700 rounded-full hover:bg-white hover:text-gray-900 transition-all duration-200 shadow-md"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
                </svg>
            </button>
            <div className="relative w-full h-64 overflow-hidden group">
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
                            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full w-9 h-9 backdrop-blur-sm opacity-60 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                        </button>
                        <button 
                            onClick={handleNext} 
                            aria-label="Próxima imagem"
                            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full w-9 h-9 backdrop-blur-sm opacity-60 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                        </button>
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1.5">
                            {images.map((_, idx) => (
                                <div key={idx} className={`w-2 h-2 rounded-full ${currentIndex === idx ? 'bg-white' : 'bg-white/50'}`}></div>
                            ))}
                        </div>
                    </>
                )}
            </div>
            <div className="p-5 flex-grow flex flex-col">
                <span className="text-xs text-gray-500 mb-2">{job.date}</span>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{job.title}</h3>
                <div className="space-y-4 text-sm flex-grow">
                    <InfoField label="Problema a ser Solucionado" value={job.problem} />
                    <InfoField label="Descrição da Solução" value={job.solutionDescription} />
                    {job.components && <InfoField label="Componentes" value={job.components} />}
                    <InfoField label="Tipo de Solução" value={job.solutionType} />
                    <InfoField label="Ferramentas Utilizadas" value={job.tools} />
                </div>
                {job.link && (
                    <div className="mt-4 pt-4 border-t border-gray-200 text-center">
                        <a 
                            href={job.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-block font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded-full px-4 py-2 text-sm shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                        >
                            Acessar Aplicação
                        </a>
                    </div>
                )}
            </div>
        </article>
    );
};

export default JobCard;