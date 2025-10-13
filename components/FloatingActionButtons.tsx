import React from 'react';

interface FloatingActionButtonsProps {
    onAdminClick: () => void;
    onAddClick: () => void;
    showAdmin?: boolean;
}

const FloatingActionButtons: React.FC<FloatingActionButtonsProps> = ({ onAdminClick, onAddClick, showAdmin = true }) => {
    return (
        <div className="fixed bottom-6 right-6 space-y-3 z-40">
            {showAdmin && (
                <button
                    aria-label="Painel de Administração"
                    onClick={onAdminClick}
                    className="bg-white/50 backdrop-blur-sm text-gray-700 border border-gray-200 w-12 h-12 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </button>
            )}
            <button
                aria-label="Adicionar Novo Item"
                onClick={onAddClick}
                className="bg-gradient-to-br from-cyan-400 to-blue-600 text-white w-16 h-16 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
            </button>
        </div>
    );
};

export default FloatingActionButtons;