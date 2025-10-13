
import React from 'react';
import { Job } from '../types';
import JobCard from './JobCard';

interface JobsListProps {
    jobs: Job[];
}

const JobsList: React.FC<JobsListProps> = ({ jobs }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {jobs.length > 0 ? (
                jobs.map((job, index) => (
                    <JobCard key={job.id} job={job} index={index} />
                ))
            ) : (
                <p className="text-center text-gray-500 md:col-span-2 lg:col-span-3">Nenhum trabalho encontrado.</p>
            )}
        </div>
    );
};

export default JobsList;
