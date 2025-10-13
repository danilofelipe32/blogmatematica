import React from 'react';
import { Job } from '../types';
import JobCard from './JobCard';

interface JobsListProps {
    jobs: Job[];
    onEdit: (job: Job) => void;
}

const JobsList: React.FC<JobsListProps> = ({ jobs, onEdit }) => {
    return (
        <div>
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Nossos Projetos</h2>
                <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-500 sm:mt-4">
                    Explorando soluções criativas e inovadoras para desafios matemáticos e educacionais.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {jobs.length > 0 ? (
                    jobs.map((job, index) => (
                        <JobCard key={job.id} job={job} index={index} onEdit={onEdit} />
                    ))
                ) : (
                    <p className="text-center text-gray-500 md:col-span-2 lg:col-span-3">Nenhum trabalho encontrado com os filtros atuais.</p>
                )}
            </div>
        </div>
    );
};

export default JobsList;