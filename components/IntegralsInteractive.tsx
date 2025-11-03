import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';

// Define Chart on the window object for TypeScript
declare global {
    interface Window {
        Chart: any;
    }
}

interface IntegralsInteractiveProps {
    onBack: () => void;
}

const IntegralsInteractive: React.FC<IntegralsInteractiveProps> = ({ onBack }) => {
    const [nRectangles, setNRectangles] = useState(10);
    const [approxArea, setApproxArea] = useState(0);

    const riemannChartRef = useRef<HTMLCanvasElement>(null);
    const avgChartRef = useRef<HTMLCanvasElement>(null);
    const volumeCanvasRef = useRef<HTMLCanvasElement>(null);
    const trabalhoCanvasRef = useRef<HTMLCanvasElement>(null);

    const riemannChartInstance = useRef<any>(null);
    const avgChartInstance = useRef<any>(null);

    const updateRiemannChart = useCallback((n: number) => {
        if (!riemannChartInstance.current) return;
        
        const width = 1 / n;
        let area = 0;
        const barData = [];
        const barLabels = [];

        for (let i = 0; i < n; i++) {
            const x_mid = (i + 0.5) * width;
            const height = x_mid * x_mid;
            
            barLabels.push(x_mid);
            barData.push(height);
            
            area += height * width;
        }
        
        riemannChartInstance.current.data.labels = barLabels;
        riemannChartInstance.current.data.datasets[1].data = barData;
        
        riemannChartInstance.current.options.scales.xAxisBars.min = 0 - width / 2;
        riemannChartInstance.current.options.scales.xAxisBars.max = 1 + width / 2;
        
        riemannChartInstance.current.update();
        setApproxArea(area);
    }, []);

    const drawMiniCanvas = useCallback((canvasRef: React.RefObject<HTMLCanvasElement>, drawFunc: (ctx: CanvasRenderingContext2D, w: number, h: number) => void) => {
        const canvas = canvasRef.current;
        if (canvas && canvas.getContext) {
            const ctx = canvas.getContext('2d');
            if(!ctx) return;
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            drawFunc(ctx, canvas.width, canvas.height);
        }
    }, []);
    
    const drawVolumeCanvas = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
        ctx.strokeStyle = '#9ca3af';
        ctx.fillStyle = '#d1d5db';
        ctx.lineWidth = 2;
        
        ctx.beginPath();
        ctx.moveTo(w * 0.1, h * 0.8);
        ctx.lineTo(w * 0.9, h * 0.8);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(w * 0.1, h * 0.8);
        ctx.quadraticCurveTo(w * 0.4, h * 0.7, w * 0.8, h * 0.2);
        ctx.stroke();
        
        const x1 = w * 0.4;
        const x2 = w * 0.5;
        const y1 = h * 0.8;
        
        const getCurveY = (x_coord: number) => {
            const t = (x_coord - w * 0.1) / (w * 0.8 - w * 0.1);
            const y = Math.pow(1 - t, 2) * h * 0.8 + 2 * (1 - t) * t * h * 0.7 + Math.pow(t, 2) * h * 0.2;
            return y;
        }

        const x1_y_val = getCurveY(x1);
        const x2_y_val = getCurveY(x2);

        ctx.fillStyle = 'rgba(16, 185, 129, 0.4)';
        ctx.fillRect(x1, x1_y_val, (x2 - x1), y1 - x1_y_val);
        
        ctx.fillStyle = 'rgba(16, 185, 129, 0.6)';
        ctx.beginPath();
        ctx.ellipse((x1 + x2) / 2, x1_y_val, (x2 - x1) / 2, 5, 0, 0, 2 * Math.PI);
        ctx.fill();
    };

    const drawTrabalhoCanvas = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
        ctx.strokeStyle = '#9ca3af';
        ctx.lineWidth = 2;
        
        ctx.beginPath();
        ctx.moveTo(w * 0.1, h * 0.2);
        ctx.lineTo(w * 0.1, h * 0.8);
        ctx.stroke();

        ctx.lineWidth = 3;
        ctx.strokeStyle = '#374151';
        ctx.beginPath();
        ctx.moveTo(w * 0.1, h * 0.3);
        ctx.lineTo(w * 0.3, h * 0.3);
        ctx.lineTo(w * 0.32, h * 0.25);
        ctx.lineTo(w * 0.34, h * 0.35);
        ctx.lineTo(w * 0.36, h * 0.25);
        ctx.lineTo(w * 0.38, h * 0.35);
        ctx.lineTo(w * 0.40, h * 0.3);
        ctx.lineTo(w * 0.6, h * 0.3);
        ctx.stroke();
        
        ctx.strokeStyle = '#059669';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(w * 0.5, h * 0.8);
        ctx.lineTo(w * 0.9, h * 0.4);
        ctx.stroke();

        ctx.fillStyle = '#065f46';
        ctx.font = '12px Inter';
        ctx.fillText('F = kx', w * 0.7, h * 0.6);
    };

    useEffect(() => {
        // Init Riemann Chart
        if (riemannChartRef.current && window.Chart) {
            const ctx = riemannChartRef.current.getContext('2d');
            const curveData = [];
            for (let x = 0; x <= 1; x += 0.01) {
                curveData.push({x: x, y: x * x});
            }
            riemannChartInstance.current = new window.Chart(ctx, {
                type: 'bar',
                data: { labels: [], datasets: [
                    { type: 'line', label: 'f(x) = x²', data: curveData, borderColor: '#059669', borderWidth: 3, fill: false, pointRadius: 0, tension: 0.1, xAxisID: 'xAxisCurve' },
                    { type: 'bar', label: 'Retângulos', data: [], backgroundColor: 'rgba(16, 185, 129, 0.5)', borderColor: 'rgba(16, 185, 129, 0.8)', borderWidth: 1, barPercentage: 1.0, categoryPercentage: 1.0, xAxisID: 'xAxisBars' }
                ]},
                options: { responsive: true, maintainAspectRatio: false, animation: { duration: 0 }, plugins: { tooltip: { enabled: false }, legend: { display: false }},
                    scales: { y: { beginAtZero: true, max: 1, title: { display: true, text: 'f(x)' }},
                        xAxisCurve: { type: 'linear', min: 0, max: 1, display: true, title: { display: true, text: 'x' }},
                        xAxisBars: { type: 'linear', min: 0, max: 1, display: false, offset: false }
                    }
                }
            });
            updateRiemannChart(nRectangles);
        }

        // Init Avg Chart
        if (avgChartRef.current && window.Chart) {
            const ctx = avgChartRef.current.getContext('2d');
            const labels = [], curveData = [], avgData = [];
            const avgVal = 2;
            for (let x = 0; x <= 2 * Math.PI; x += 0.1) {
                labels.push(x.toFixed(1));
                curveData.push(2 + Math.sin(x));
                avgData.push(avgVal);
            }
            avgChartInstance.current = new window.Chart(ctx, {
                type: 'line', data: { labels: labels, datasets: [
                    { label: 'f(x)', data: curveData, borderColor: '#059669', borderWidth: 2, pointRadius: 0, tension: 0.1 },
                    { label: 'Valor Médio', data: avgData, borderColor: '#d97706', borderWidth: 2, pointRadius: 0, borderDash: [5, 5] }
                ]},
                options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { mode: 'index', intersect: false }}, scales: { y: { beginAtZero: true }, x: { display: false }}}
            });
        }
        
        // Draw Mini Canvases
        const handleResize = () => {
            drawMiniCanvas(volumeCanvasRef, drawVolumeCanvas);
            drawMiniCanvas(trabalhoCanvasRef, drawTrabalhoCanvas);
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            if (riemannChartInstance.current) riemannChartInstance.current.destroy();
            if (avgChartInstance.current) avgChartInstance.current.destroy();
        };
    }, [drawMiniCanvas, updateRiemannChart]);
    
    useEffect(() => {
        updateRiemannChart(nRectangles);
    }, [nRectangles, updateRiemannChart]);

    return (
    <div className="integral-page bg-white rounded-lg shadow-lg">
        <button onClick={onBack} className="m-4 mb-0 inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Voltar
        </button>

        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm shadow-md rounded-t-lg">
            <nav className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
                <h1 className="text-xl md:text-2xl font-bold text-emerald-800">Explorador de Integrais</h1>
                <div className="space-x-2 sm:space-x-4">
                    <a href="#conceito" className="text-sm md:text-base text-gray-600 hover:text-emerald-700 font-medium">O Conceito</a>
                    <a href="#calculo" className="text-sm md:text-base text-gray-600 hover:text-emerald-700 font-medium">Cálculo</a>
                    <a href="#aplicacoes" className="text-sm md:text-base text-gray-600 hover:text-emerald-700 font-medium">Aplicações</a>
                </div>
            </nav>
        </header>

        <main className="max-w-6xl mx-auto p-4 md:p-8">
            <section id="conceito" className="my-12">
                <h2 className="text-4xl font-bold text-emerald-900 mb-6">O que são Integrais?</h2>
                <div className="bg-white p-8 rounded-lg shadow-lg space-y-6 text-lg leading-relaxed text-gray-700">
                    <p>Em sua essência, uma integral é uma forma de somar um número infinito de partes infinitamente pequenas. O conceito mais visual é o cálculo da <strong className="text-emerald-800">área sob uma curva</strong>.</p>
                    <p>A integral que representa a área sob a curva de <span className="text-formula">f(x) = x<sup>2</sup></span> de <span className="text-formula">x=0</span> até <span className="text-formula">x=1</span> é escrita assim:</p>
                    <div className="text-center my-4"><code className="formula-green">&int;<sub>0</sub><sup>1</sup> x<sup>2</sup> dx</code></div>
                    <ul className="list-disc list-inside space-y-3 pl-4">
                        <li>O símbolo <code className="text-3xl font-serif text-emerald-800">&int;</code> é o sinal de integral.</li>
                        <li>Os números <code className="formula-green">0</code> e <code className="formula-green">1</code> são os limites de integração.</li>
                        <li><code className="formula-green">x<sup>2</sup></code> é a função (a curva) que estamos integrando.</li>
                        <li><code className="formula-green">dx</code> indica que estamos somando as "fatias" em relação à variável <span className="text-formula">x</span>.</li>
                    </ul>
                    <p>Resolver esta integral nos daria a área exata, que é <strong className="text-emerald-800">1/3</strong>.</p>
                </div>
            </section>

            <section id="calculo" className="my-20 pt-16">
                <h2 className="text-4xl font-bold text-emerald-900 mb-6 text-center">Cálculo Interativo da Área</h2>
                <p className="text-xl text-gray-700 text-center max-w-3xl mx-auto mb-10">A integral é uma soma de infinitas partes. Podemos <span className="font-semibold text-emerald-800">aproximar</span> essa soma usando retângulos. Aumente o número de retângulos e veja a aproximação melhorar.</p>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <div className="chart-container mb-6"><canvas ref={riemannChartRef}></canvas></div>
                    <div className="max-w-xl mx-auto">
                        <label htmlFor="rectangles" className="flex justify-between items-center font-medium text-gray-700 mb-2">
                            <span>Número de Retângulos (n)</span>
                            <span className="font-bold text-lg text-emerald-700">{nRectangles}</span>
                        </label>
                        <input type="range" id="rectangles" min="1" max="100" value={nRectangles} onChange={(e) => setNRectangles(parseInt(e.target.value))} className="w-full h-2 bg-emerald-100 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
                    </div>
                    <div className="mt-8 text-center grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-emerald-50 p-6 rounded-lg border border-emerald-200">
                            <h3 className="text-lg font-semibold text-gray-700 mb-1">Área Aproximada</h3>
                            <p className="text-3xl font-bold text-emerald-700">{approxArea.toFixed(4)}</p>
                        </div>
                        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                            <h3 className="text-lg font-semibold text-gray-700 mb-1">Área Exata</h3>
                            <p className="text-3xl font-bold text-green-700">1/3 ≈ 0.3333...</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="aplicacoes" className="my-20 pt-16">
                <h2 className="text-4xl font-bold text-emerald-900 mb-10 text-center">Aplicações no Mundo Real</h2>
                <p className="text-xl text-gray-700 text-center max-w-3xl mx-auto mb-12">Integrais calculam qualquer grandeza que envolva acumulação. Aqui estão alguns exemplos.</p>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col">
                        <h3 className="text-2xl font-bold text-emerald-800 mb-4">1. Cálculo de Volume</h3>
                        <canvas ref={volumeCanvasRef} className="mini-canvas mb-4"></canvas>
                        <p className="text-gray-700 mb-4 flex-grow">Calculamos o volume de formas 3D somando infinitos "discos" ou "fatias" infinitesimais.</p>
                        <div className="text-center bg-gray-50 p-3 rounded-md"><code className="formula-green text-base">V = &pi; &int;<sub>a</sub><sup>b</sup> [f(x)]<sup>2</sup> dx</code></div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col">
                        <h3 className="text-2xl font-bold text-emerald-800 mb-4">2. Trabalho em Física</h3>
                        <canvas ref={trabalhoCanvasRef} className="mini-canvas mb-4"></canvas>
                        <p className="text-gray-700 mb-4 flex-grow">Se uma força <span className="font-semibold">varia</span> (como ao esticar uma mola), precisamos somar o trabalho feito em cada pequeno incremento da distância.</p>
                        <div className="text-center bg-gray-50 p-3 rounded-md"><code className="formula-green text-base">W = &int;<sub>a</sub><sup>b</sup> F(x) dx</code></div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col">
                        <h3 className="text-2xl font-bold text-emerald-800 mb-4">3. Valor Médio de uma Função</h3>
                        <div className="chart-container mini-canvas mb-4"><canvas ref={avgChartRef}></canvas></div>
                        <p className="text-gray-700 mb-4 flex-grow">Para encontrar a temperatura "média" de um dia, a integral soma todos os valores instantâneos e divide pelo comprimento do intervalo.</p>
                        <div className="text-center bg-gray-50 p-3 rounded-md"><code className="formula-green text-base"><span style={{textDecoration: 'overline'}}>f</span> = (1 / (b-a)) &int;<sub>a</sub><sup>b</sup> f(x) dx</code></div>
                    </div>
                </div>
            </section>
        </main>
    </div>
    );
};

export default IntegralsInteractive;
