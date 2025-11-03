import React, { useState, useRef, useEffect } from 'react';

// Make Chart.js available on the window object for TypeScript
declare global {
    interface Window {
        Chart: any;
    }
}

interface LinearSystemInteractiveProps {
    onBack: () => void;
}

const LinearSystemInteractive: React.FC<LinearSystemInteractiveProps> = ({ onBack }) => {
    const [step, setStep] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstanceRef = useRef<any>(null);

    const isolatedXRef = useRef<HTMLDivElement>(null);
    const xTargetRef = useRef<HTMLSpanElement>(null);
    const cloneRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!chartRef.current || !window.Chart) return;
        
        const ctx = chartRef.current.getContext('2d');
        if (!ctx) return;
        
        const line1 = (x: number) => 10 - x;
        const line2 = (x: number) => x - 4;

        const chartData = {
            datasets: [
                {
                    label: 'x + y = 10 (ou y = 10 - x)',
                    data: [{x: 0, y: line1(0)}, {x: 10, y: line1(10)}],
                    borderColor: '#0ea5e9',
                    backgroundColor: '#0ea5e9',
                    borderWidth: 3,
                    fill: false,
                    tension: 0.1,
                    type: 'line'
                },
                {
                    label: 'x - y = 4 (ou y = x - 4)',
                    data: [{x: 0, y: line2(0)}, {x: 10, y: line2(10)}],
                    borderColor: '#f97316',
                    backgroundColor: '#f97316',
                    borderWidth: 3,
                    fill: false,
                    tension: 0.1,
                    type: 'line'
                },
                {
                    label: 'Solução (7, 3)',
                    data: [{x: 7, y: 3}],
                    borderColor: '#dc2626',
                    backgroundColor: '#dc2626',
                    pointRadius: 8,
                    pointHoverRadius: 12,
                    type: 'scatter'
                }
            ]
        };

        chartInstanceRef.current = new window.Chart(ctx, {
            type: 'line',
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { type: 'linear', position: 'bottom', title: { display: true, text: 'x', font: { size: 16 }}, min: 0, max: 12 },
                    y: { title: { display: true, text: 'y', font: { size: 16 }}, min: 0, max: 12 }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context: any) {
                                if (context.dataset.type === 'scatter') {
                                    return `Solução: (x: ${context.parsed.x}, y: ${context.parsed.y})`;
                                }
                                return context.dataset.label;
                            }
                        }
                    }
                }
            }
        });

        return () => {
            chartInstanceRef.current?.destroy();
        }
    }, []);

    const handleStep1 = () => {
        if (step === 0) setStep(1);
    };

    const handleStep2 = () => {
        if (step !== 1 || !cloneRef.current || !isolatedXRef.current || !xTargetRef.current) return;
        
        setIsAnimating(true);
        
        const clone = cloneRef.current;
        const source = isolatedXRef.current;
        const target = xTargetRef.current;
        
        const sourceRect = source.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        
        clone.innerText = "10 - y";
        clone.style.top = `${sourceRect.top + window.scrollY}px`;
        clone.style.left = `${sourceRect.left + window.scrollX}px`;
        clone.style.width = `${sourceRect.width}px`;
        clone.style.height = `${sourceRect.height}px`;
        clone.style.opacity = '1';

        requestAnimationFrame(() => {
            clone.style.top = `${targetRect.top + window.scrollY}px`;
            clone.style.left = `${targetRect.left + window.scrollX}px`;
        });

        setTimeout(() => {
            clone.style.opacity = '0';
            target.style.opacity = '0';
            setTimeout(() => {
                setStep(2);
                setIsAnimating(false);
            }, 300); // Wait for fade out
        }, 600); // Animation duration
    };

    const handleStep3 = () => {
        if (step === 2) setStep(3);
    };

    const handleStep4 = () => {
        if (step === 3) setStep(4);
    };

    return (
        <div className="linear-system-page">
            <button onClick={onBack} className="mb-8 inline-flex items-center text-sky-600 hover:text-sky-800 transition-colors font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Voltar
            </button>
            <header className="py-8">
                <div className="max-w-5xl mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-sky-800">Sistemas de Equações Lineares</h1>
                    <p className="text-xl text-slate-600 mt-3">Uma jornada interativa do conceito à solução.</p>
                </div>
            </header>

            <main className="max-w-5xl mx-auto p-4 md:p-8 mt-10 space-y-16">

                <section id="intro" className="step-card bg-white">
                    <h2 className="text-3xl font-bold text-sky-900 mb-6">O que é um Sistema?</h2>
                    <div className="space-y-6 text-lg leading-relaxed text-slate-700">
                        <p>Um sistema de equações lineares é um conjunto de duas ou mais equações com as mesmas incógnitas. O objetivo é encontrar um conjunto de valores <span className="font-bold text-sky-700">(x, y)</span> que resolva todas as equações ao mesmo tempo.</p>
                        <p>Vamos explorar este conceito usando o exemplo clássico do artigo:</p>
                        <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-center">
                            <div className="formula">x + y = 10</div>
                            <div className="formula">x - y = 4</div>
                        </div>
                    </div>
                </section>
                
                <section id="visual" className="step-card bg-white">
                    <h2 className="text-3xl font-bold text-sky-900 mb-6 text-center">A Solução Visual: O Ponto de Encontro</h2>
                    <p className="text-lg text-slate-700 mb-8 text-center max-w-3xl mx-auto">
                        Cada equação linear pode ser desenhada como uma reta em um gráfico. A solução do sistema — o par <span className="formula-sm">(x, y)</span> que satisfaz AMBAS as equações — é simplesmente o ponto onde essas duas retas se cruzam.
                    </p>
                    <div className="chart-container bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <canvas ref={chartRef}></canvas>
                    </div>
                </section>

                <section id="solver" className="space-y-10">
                    <h2 className="text-4xl font-bold text-sky-900 mb-6 text-center">Resolvendo com Álgebra: O Método da Substituição</h2>
                    <p className="text-lg text-slate-700 mb-10 text-center max-w-3xl mx-auto">
                        Agora que vimos o "porquê" visual (o ponto de interseção), vamos usar o método da substituição para encontrar o "como" algébrico. Siga os passos abaixo.
                    </p>

                    <div className={`step-card ${step >= 0 ? 'active' : ''}`}>
                        <h3 className="text-2xl font-bold text-sky-800">Passo 1: Isolar uma Incógnita</h3>
                        <p className="text-lg text-slate-600 my-4">Vamos começar com a primeira equação e isolar o <span className="formula-sm">x</span>.</p>
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="formula">x + y = 10</div>
                            <button onClick={handleStep1} disabled={step >= 1} className="btn-primary">Isolar x</button>
                        </div>
                        <div className={`border-t border-slate-200 pt-5 ${step >= 1 ? 'visible-step' : 'hidden-step'}`}>
                            <p className="text-lg text-slate-600 mb-4">Ao mover o <span className="formula-sm">y</span> para o outro lado, obtemos:</p>
                            <div ref={isolatedXRef} className="formula bg-sky-50 text-sky-800 border-sky-200">x = 10 - y</div>
                        </div>
                    </div>

                    <div className={`step-card ${step === 1 ? 'active' : ''}`}>
                        <h3 className="text-2xl font-bold text-sky-800">Passo 2: Substituir na Outra Equação</h3>
                        <p className="text-lg text-slate-600 my-4">Agora, pegamos a expressão <span className="formula-sm">10 - y</span> e a substituímos no lugar do <span className="formula-sm">x</span> na segunda equação.</p>
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="formula">
                                {step < 2 ? (
                                     <span ref={xTargetRef} className="inline-block px-2 rounded bg-red-100 text-red-700 border border-red-300">x</span>
                                ) : (
                                    <span className="inline-block px-2 rounded bg-sky-50 text-sky-800 border-sky-200">(10 - y)</span>
                                )} - y = 4
                            </div>
                            <button onClick={handleStep2} disabled={step !== 1 || isAnimating} className="btn-primary">Substituir</button>
                        </div>
                        <div className={`border-t border-slate-200 pt-5 ${step >= 2 ? 'visible-step' : 'hidden-step'}`}>
                            <p className="text-lg text-slate-600 mb-4">Isso nos dá uma única equação com apenas uma incógnita (<span className="formula-sm">y</span>):</p>
                            <div className="formula bg-sky-50 text-sky-800 border-sky-200">(10 - y) - y = 4</div>
                        </div>
                    </div>

                    <div className={`step-card ${step === 2 ? 'active' : ''}`}>
                        <h3 className="text-2xl font-bold text-sky-800">Passo 3: Resolver a Nova Equação</h3>
                        <p className="text-lg text-slate-600 my-4">Vamos simplificar e resolver para encontrar o valor de <span className="formula-sm">y</span>.</p>
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="formula">(10 - y) - y = 4</div>
                            <button onClick={handleStep3} disabled={step !== 2} className="btn-primary">Resolver para y</button>
                        </div>
                        <div className={`border-t border-slate-200 pt-5 space-y-4 text-lg ${step >= 3 ? 'visible-step' : 'hidden-step'}`}>
                            <p className="text-slate-600">Primeiro, combine os termos <span className="formula-sm">-y</span>:</p>
                            <div className="formula">10 - 2y = 4</div>
                            <p className="text-slate-600">Depois, subtraia 10 de ambos os lados:</p>
                            <div className="formula">-2y = -6</div>
                            <p className="text-slate-600">Finalmente, divida por -2:</p>
                            <div className="formula bg-emerald-50 text-emerald-800 border-emerald-200">y = 3</div>
                        </div>
                    </div>
                    
                     <div className={`step-card ${step === 3 ? 'active' : ''}`}>
                        <h3 className="text-2xl font-bold text-sky-800">Passo 4: Encontrar a Outra Incógnita</h3>
                        <p className="text-lg text-slate-600 my-4">Agora que temos <span className="formula-sm">y = 3</span>, podemos usá-lo para encontrar o <span className="formula-sm">x</span>.</p>
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="formula">x = 10 - y</div>
                            <button onClick={handleStep4} disabled={step !== 3} className="btn-primary">Encontrar x</button>
                        </div>
                        <div className={`border-t border-slate-200 pt-5 space-y-4 text-lg ${step >= 4 ? 'visible-step' : 'hidden-step'}`}>
                            <p className="text-slate-600">Substitua <span className="formula-sm">y = 3</span> na equação isolada:</p>
                            <div className="formula">x = 10 - 3</div>
                            <p className="text-slate-600">E resolva:</p>
                            <div className="formula bg-emerald-50 text-emerald-800 border-emerald-200">x = 7</div>
                        </div>
                    </div>
                </section>

                 <section className={`step-card bg-gradient-to-r from-sky-700 to-sky-900 text-white transition-opacity duration-500 ${step >= 4 ? 'opacity-100' : 'opacity-0'}`}>
                    <h2 className="text-3xl font-bold text-center mb-6">A Solução Foi Encontrada!</h2>
                    <div className="text-center space-y-6">
                        <p className="text-2xl text-sky-100">A solução que satisfaz ambas as equações é:</p>
                        <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-center">
                            <div className="formula bg-white text-sky-900 border-sky-200">x = 7</div>
                            <div className="formula bg-white text-sky-900 border-sky-200">y = 3</div>
                        </div>
                        <p className="text-2xl text-sky-100">Ou, como o par ordenado <span className="formula-sm bg-white text-sky-900">(7, 3)</span>.</p>
                        <p className="text-xl text-sky-200 pt-4 border-t border-sky-600">Como vimos no gráfico, este é exatamente o ponto onde as duas retas se cruzam!</p>
                    </div>
                </section>
            </main>

            <div ref={cloneRef} id="substitute-anim-clone"></div>
        </div>
    );
};

export default LinearSystemInteractive;
