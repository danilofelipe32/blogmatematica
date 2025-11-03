import React, { useState, useRef, useEffect } from 'react';

// Make Chart.js available on the window object for TypeScript
declare global {
    interface Window {
        Chart: any;
    }
}

interface AffineFunctionInteractiveProps {
    onBack: () => void;
}

const AffineFunctionInteractive: React.FC<AffineFunctionInteractiveProps> = ({ onBack }) => {
    const [a, setA] = useState(2);
    const [b, setB] = useState(1);

    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstanceRef = useRef<any>(null);

    useEffect(() => {
        if (!chartRef.current || !window.Chart) return;
        
        const ctx = chartRef.current.getContext('2d');
        if (!ctx) return;
        
        const calculateLineData = (a: number, b: number) => {
            const xMin = -10;
            const xMax = 10;
            return [
                { x: xMin, y: a * xMin + b },
                { x: xMax, y: a * xMax + b }
            ];
        };
        
        chartInstanceRef.current = new window.Chart(ctx, {
            type: 'line',
            data: {
                datasets: [
                    {
                        label: 'f(x) = ax + b',
                        data: calculateLineData(a, b),
                        borderColor: '#2563eb',
                        borderWidth: 3,
                        tension: 0.1,
                        type: 'line'
                    },
                    {
                        label: 'Interseção Y (0, b)',
                        data: [{ x: 0, y: b }],
                        backgroundColor: '#7e22ce',
                        pointRadius: 6,
                        pointHoverRadius: 8,
                        type: 'scatter'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { type: 'linear', position: 'bottom', min: -10, max: 10, grid: { color: '#e2e8f0' } },
                    y: { min: -10, max: 10, grid: { color: '#e2e8f0' } }
                },
                plugins: { legend: { display: false } }
            }
        });

        return () => {
            chartInstanceRef.current?.destroy();
        }
    }, []);

    useEffect(() => {
        if (!chartInstanceRef.current) return;
        
        const calculateLineData = (a: number, b: number) => {
            const xMin = -10;
            const xMax = 10;
            return [
                { x: xMin, y: a * xMin + b },
                { x: xMax, y: a * xMax + b }
            ];
        };

        chartInstanceRef.current.data.datasets[0].data = calculateLineData(a, b);
        chartInstanceRef.current.data.datasets[1].data = [{ x: 0, y: b }];
        chartInstanceRef.current.update();

    }, [a, b]);

    const getInterpretationA = () => {
        if (a > 0) return { text: `Como <span class="font-bold">a > 0</span>, a reta é <span class="font-bold text-blue-700">crescente</span>.`, className: '' };
        if (a < 0) return { text: `Como <span class="font-bold">a < 0</span>, a reta é <span class="font-bold text-red-600">decrescente</span>.`, className: 'decreasing' };
        return { text: `Como <span class="font-bold">a = 0</span>, a reta é <span class="font-bold text-slate-600">constante</span>.`, className: 'constant' };
    };
    
    const interpretationA = getInterpretationA();

    return (
        <div className="affine-function-page">
             <button onClick={onBack} className="mb-8 inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                Voltar
            </button>
            <header className="bg-white py-8 shadow-sm">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-blue-900">Introdução à Função Afim</h1>
                    <p className="text-xl text-slate-600 mt-3">Um explorador interativo da função <span className="formula-sm">f(x) = ax + b</span>.</p>
                </div>
            </header>

            <main className="max-w-6xl mx-auto p-4 md:p-8 mt-10 space-y-12">

                <section className="card">
                    <h2 className="text-3xl font-bold text-blue-900 mb-6">O que é uma Função Afim?</h2>
                    <div className="space-y-6 text-lg leading-relaxed text-slate-700">
                        <p>Uma função afim, também conhecida como função do 1º grau, é toda função que pode ser escrita na forma:</p>
                        <div className="text-center my-4">
                            <code className="formula">f(x) = ax + b</code>
                        </div>
                        <p>Onde <span className="font-bold text-blue-700">'a'</span> e <span className="font-bold text-blue-700">'b'</span> são números reais e <span className="formula-sm">a &ne; 0</span>. O gráfico de uma função afim é sempre uma <span className="font-bold text-blue-700">reta</span>.</p>
                        <p>Esta aplicação permite que você explore interativamente como os coeficientes <span className="formula-sm">a</span> e <span className="formula-sm">b</span> alteram o comportamento dessa reta.</p>
                    </div>
                </section>

                <section className="card">
                    <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">Explorador Interativo da Reta</h2>
                    <p className="text-lg text-slate-700 mb-8 text-center max-w-3xl mx-auto">
                        Use os controles deslizantes abaixo para alterar os valores de <span className="formula-sm">a</span> (inclinação) e <span className="formula-sm">b</span> (interseção) e veja o que acontece com o gráfico em tempo real.
                    </p>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                        <div className="lg:col-span-1 space-y-8">
                            <div>
                                <label htmlFor="sliderA" className="flex justify-between items-center text-xl font-semibold text-slate-700 mb-3">
                                    <span>Coeficiente Angular (a)</span>
                                    <span className="font-bold text-blue-700 text-2xl">{a.toFixed(1)}</span>
                                </label>
                                <input type="range" id="sliderA" min="-5" max="5" value={a} step="0.1" onChange={e => setA(parseFloat(e.target.value))} className="w-full" />
                                <div className={`interpretation-box mt-4 ${interpretationA.className}`}>
                                    <p className="text-lg font-medium text-slate-800" dangerouslySetInnerHTML={{ __html: interpretationA.text }}></p>
                                </div>
                            </div>
                            
                            <div>
                                <label htmlFor="sliderB" className="flex justify-between items-center text-xl font-semibold text-slate-700 mb-3">
                                    <span>Coeficiente Linear (b)</span>
                                    <span className="font-bold text-purple-700 text-2xl">{b.toFixed(1)}</span>
                                </label>
                                <input type="range" id="sliderB" min="-5" max="5" value={b} step="0.1" onChange={e => setB(parseFloat(e.target.value))} className="w-full" style={{accentColor: '#7e22ce'}}/>
                                <div className="interpretation-box mt-4" style={{borderLeftColor: '#7e22ce'}}>
                                    <p className="text-lg font-medium text-slate-800">A reta corta o eixo y no ponto <span className="font-bold text-purple-700">(0, {b.toFixed(1)})</span>.</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="lg:col-span-2">
                            <div className="chart-container bg-slate-50 p-4 rounded-lg border border-slate-200">
                                <canvas ref={chartRef}></canvas>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="card">
                    <h2 className="text-3xl font-bold text-blue-900 mb-6">Análise do Exemplo: <span className="text-blue-700">f(x) = 2x + 1</span></h2>
                    <div className="space-y-6 text-lg leading-relaxed text-slate-700">
                        <p>Este é o estado inicial do nosso explorador, baseado no exemplo do artigo. Vamos analisar:</p>
                        <ul className="list-disc list-outside ml-6 space-y-4">
                            <li>
                                <span className="font-bold">Coeficiente Angular (a = 2):</span> Como <span className="formula-sm">a = 2</span> (um valor maior que 0), a reta é <strong>crescente</strong>. O valor '2' significa que para cada unidade que 'x' aumenta no gráfico, 'y' aumenta duas unidades.
                            </li>
                            <li>
                                <span className="font-bold">Coeficiente Linear (b = 1):</span> Como <span className="formula-sm">b = 1</span>, a reta corta o eixo y (o eixo vertical) no ponto exato de <strong>(0, 1)</strong>.
                            </li>
                        </ul>
                        <p className="font-semibold text-blue-800">As funções afim são ferramentas essenciais para descrever relações lineares em diversas áreas da ciência e do dia a dia, como calcular custos, prever crescimentos ou entender o movimento.</p>
                    </div>
                </section>
                
            </main>
        </div>
    );
};

export default AffineFunctionInteractive;
