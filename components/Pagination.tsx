import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) {
        return null;
    }

    return (
        <nav className="flex justify-center items-center space-x-1 sm:space-x-2">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 text-sm font-medium rounded-lg transition-colors disabled:text-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed text-gray-700 bg-white hover:bg-gray-100"
            >
                Anterior
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`h-9 w-9 text-sm font-medium rounded-lg transition-colors ${currentPage === page ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-700 bg-white hover:bg-gray-100'}`}
                >
                    {page}
                </button>
            ))}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-sm font-medium rounded-lg transition-colors disabled:text-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed text-gray-700 bg-white hover:bg-gray-100"
            >
                Próximo
            </button>
        </nav>
    );
};

export default Pagination;