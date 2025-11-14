import React from 'react';

interface FooterProps {
    onRssClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onRssClick }) => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="text-center mt-12 pt-6 border-t-2 border-gray-200">
             <div className="flex justify-center items-center space-x-4 mb-2">
                <button 
                    onClick={onRssClick} 
                    className="text-gray-500 hover:text-orange-600 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 group" 
                    title="Assine nosso Feed RSS"
                    aria-label="Feed RSS"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M5.5 12a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-3-8.5a1 1 0 0 1 1-1c5.523 0 10 4.477 10 10a1 1 0 1 1-2 0 8 8 0 0 0-8-8 1 1 0 0 1-1-1zm0 4a1 1 0 0 1 1-1 6 6 0 0 1 6 6 1 1 0 1 1-2 0 4 4 0 0 0-4-4 1 1 0 0 1-1-1z"/>
                    </svg>
                    <span className="text-sm hidden sm:inline group-hover:underline">Feed RSS</span>
                </button>
            </div>
            <p className="text-gray-600">&copy; {currentYear} Math Insights. Todos os direitos reservados.</p>
            <p className="mt-2">
                <a href="https://wa.me/5584999780963" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
                    Desenvolvido por Danilo Arruda
                </a>
            </p>
        </footer>
    );
};

export default Footer;