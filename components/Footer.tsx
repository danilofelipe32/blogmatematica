import React from 'react';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="text-center mt-12 pt-6 border-t-2 border-gray-200">
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