import React, { useState, useRef, useEffect, useMemo } from 'react';

interface EulerInteractiveProps {
    onBack: () => void;
}

const EulerInteractive: React.FC<EulerInteractiveProps> = ({ onBack }) => {
    const [x, setX] = useState(Math.PI);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [readout, setReadout] = useState({ cosX: -1, sinX: 0, xDisplay: `${Math.PI.toFixed(2)} (≈ π)` });

    const updateVisuals = () => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        // Setup canvas dimensions
        const width = container.clientWidth;
        const height = container.clientHeight;
        canvas.width = width;
        canvas.height = height;
        const center_x = width / 2;
        const center_y = height / 2;
        const radius = Math.min(width, height) * 0.4;
        
        // Update readout text
        const cosX = Math.cos(x);
        const sinX = Math.sin(x);
        
        let xDisplay = x.toFixed(2);
        if (Math.abs(x - Math.PI) < 0.01) xDisplay = `${x.toFixed(2)} (≈ π)`;
        else if (Math.abs(x - Math.PI / 2) < 0.01) xDisplay = `${x.toFixed(2)} (≈ π/2)`;
        else if (Math.abs(x - 3 * Math.PI / 2) < 0.01) xDisplay = `${x.toFixed(2)} (≈ 3π/2)`;
        else if (Math.abs(x) < 0.01) xDisplay = `0.00`;
        else if (Math.abs(x - 2 * Math.PI) < 0.01) xDisplay = `${x.toFixed(2)} (≈ 2π)`;
        
        setReadout({ cosX, sinX, xDisplay });
        
        // Drawing logic
        const point_x = center_x + radius * cosX;
        const point_y = center_y - radius * sinX;

        ctx.strokeStyle = '#d1d5db';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, center_y);
        ctx.lineTo(width, center_y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(center_x, 0);
        ctx.lineTo(center_x, height);
        ctx.stroke();

        ctx.fillStyle = '#6b7280';
        ctx.font = '12px Inter, sans-serif';
        ctx.fillText('Real (cos)', width - 60, center_y - 5);
        ctx.fillText('Imaginário (sin)', center_x + 5, 15);

        ctx.beginPath();
        ctx.setLineDash([5, 3]);
        ctx.strokeStyle = '#9ca3af';
        ctx.arc(center_x, center_y, radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#e11d48';
        ctx.moveTo(center_x, center_y);
        ctx.lineTo(point_x, center_y);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = '#1d4ed8';
        ctx.moveTo(point_x, center_y);
        ctx.lineTo(point_x, point_y);
        ctx.stroke();

        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#059669';
        ctx.moveTo(center_x, center_y);
        ctx.lineTo(point_x, point_y);
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = '#059669';
        ctx.arc(point_x, point_y, 6, 0, 2 * Math.PI);
        ctx.fill();
    };

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const resizeObserver = new ResizeObserver(() => {
            updateVisuals();
        });
        resizeObserver.observe(container);

        updateVisuals();

        return () => {
            if (container) {
                resizeObserver.unobserve(container);
            }
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [x]);


    return (
        <div className="max-w-6xl mx-auto">
            <button onClick={onBack} className="mb-8 inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                Voltar
            </button>
            <header className="mb-10 text-center">
                <h1 className="text-4xl font-bold text-blue-700 mb-2">A Deslumbrante Identidade de Euler</h1>
                <p className="text-xl text-gray-600">Uma Exploração Interativa da Equação Mais Bela da Matemática</p>
            </header>

            <main className="grid md:grid-cols-2 gap-8">
                <section className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold text-blue-600 mb-4">Explorador da Fórmula de Euler</h2>
                    <p className="text-gray-700 leading-relaxed mb-6">
                        A Identidade de Euler é um caso especial da Fórmula de Euler: <span className="formula">e<sup>ix</sup> = cos(x) + i&middot;sin(x)</span>. Use o controle deslizante abaixo para alterar o valor de <code>x</code> (o ângulo em radianos) e veja como o ponto se move ao longo do círculo unitário no plano complexo.
                    </p>
                    <div className="mb-4">
                        <label htmlFor="angleX" className="flex justify-between items-center font-medium text-gray-700 mb-2">
                            <span>Ângulo x (radianos)</span>
                            <span id="xValue" className="font-bold text-lg text-blue-600" dangerouslySetInnerHTML={{ __html: readout.xDisplay }}></span>
                        </label>
                        <input type="range" id="angleX" min="0" max="6.28318" value={x} step="0.01" onChange={(e) => setX(parseFloat(e.target.value))} className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                    </div>
                    <div ref={containerRef} className="chart-container bg-gray-100 rounded-md overflow-hidden border">
                        <canvas ref={canvasRef}></canvas>
                    </div>
                    <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h3 className="text-xl font-semibold mb-3">Valores Atuais</h3>
                        <div className="space-y-2 font-mono text-gray-700">
                            <p><span className="text-rose-600 font-semibold">cos(<span dangerouslySetInnerHTML={{ __html: readout.xDisplay }}></span>)</span> = {readout.cosX.toFixed(3)}</p>
                            <p><span className="text-blue-600 font-semibold">sin(<span dangerouslySetInnerHTML={{ __html: readout.xDisplay }}></span>)</span> = {readout.sinX.toFixed(3)}</p>
                            <p className="font-bold pt-2">e<sup>i&middot;<span dangerouslySetInnerHTML={{ __html: readout.xDisplay }}></span></sup> = {readout.cosX.toFixed(3)} + i&middot;({readout.sinX.toFixed(3)})</p>
                            {Math.abs(x - Math.PI) < 0.01 && (
                                <p className="font-bold text-lg text-green-600 mt-2">VOCÊ ACHOU! e<sup>iπ</sup> &approx; -1</p>
                            )}
                        </div>
                    </div>
                </section>

                <section className="bg-white p-6 rounded-lg shadow-lg space-y-8">
                    <div>
                        <h2 className="text-2xl font-semibold text-blue-600 mb-4">A Equação Mais Bela</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">A Identidade de Euler é frequentemente citada como um exemplo primordial de beleza matemática. A equação é a seguinte:</p>
                        <div className="text-center bg-blue-50 p-6 rounded-lg">
                            <code className="formula hero-formula text-blue-800">e<sup>iπ</sup> + 1 = 0</code>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold text-blue-600 mb-4">Os 5 Pilares da Matemática</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">Esta fórmula única consegue unir cinco das constantes mais importantes da matemática em uma única e elegante expressão:</p>
                        <ul className="space-y-2">
                            <li className="flex items-start"><span className="text-2xl mr-3"><i>e</i></span><span>O número <strong>e</strong>, a base dos logaritmos naturais (≈ 2.718).</span></li>
                            <li className="flex items-start"><span className="text-2xl mr-3"><i>i</i></span><span>A unidade imaginária <strong>i</strong>, que satisfaz i² = -1.</span></li>
                            <li className="flex items-start"><span className="text-2xl mr-3">π</span><span>O número <strong>π</strong> (pi), a razão entre a circunferência de um círculo e seu diâmetro (≈ 3.141).</span></li>
                            <li className="flex items-start"><span className="text-2xl mr-3">1</span><span>O número <strong>1</strong>, o elemento neutro da multiplicação.</span></li>
                            <li className="flex items-start"><span className="text-2xl mr-3">0</span><span>O número <strong>0</strong>, o elemento neutro da adição.</span></li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold text-blue-600 mb-4">Como Isso é Possível? A Derivação</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">A identidade é um caso especial da Fórmula de Euler. Para qualquer número real <code>x</code>, temos:</p>
                        <div className="text-center bg-gray-100 p-4 rounded-md my-4">
                            <code className="formula text-xl">e<sup>ix</sup> = cos(x) + i&middot;sin(x)</code>
                        </div>
                        <p className="text-gray-700 leading-relaxed mb-4"><strong>Experimente no explorador ao lado!</strong> Se você substituir <code>x</code> por <code>π</code> (aprox. 3.14159), obtemos:</p>
                        <ol className="list-decimal list-inside space-y-2 text-gray-700 bg-gray-50 p-4 rounded-lg">
                            <li><code className="formula">e<sup>iπ</sup> = cos(π) + i&middot;sin(π)</code></li>
                            <li>Sabendo que <code className="formula">cos(π) = -1</code> (o ponto está totalmente à esquerda no eixo real).</li>
                            <li>E sabendo que <code className="formula">sin(π) = 0</code> (o ponto está no eixo, com altura zero).</li>
                            <li>A equação se simplifica para: <code className="formula">e<sup>iπ</sup> = -1 + i&middot;(0)</code></li>
                            <li>Isso resulta em: <code className="formula">e<sup>iπ</sup> = -1</code></li>
                            <li>Finalmente, adicionando 1 a ambos os lados, chegamos à famosa identidade: <code className="formula font-bold">e<sup>iπ</sup> + 1 = 0</code></li>
                        </ol>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default EulerInteractive;
