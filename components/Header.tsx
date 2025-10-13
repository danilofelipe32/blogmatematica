
import React from 'react';

const Header: React.FC = () => {
    return (
        <header
            style={{ backgroundImage: "url('https://i.imgur.com/CKiMlyV.png')" }}
            className="relative h-[40vh] min-h-[280px] bg-cover bg-center bg-scroll md:h-[50vh] md:min-h-[350px] md:bg-fixed text-white text-center flex items-center justify-center"
        >
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-0"></div>
            <div className="relative z-10 p-4 sm:p-8">
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-shadow-lg">Math Insights</h1>
                <p className="mt-4 text-base sm:text-lg md:text-xl text-shadow">Explorando a beleza e a lógica do universo matemático.</p>
            </div>
        </header>
    );
};

export default Header;
