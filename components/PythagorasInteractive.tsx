import React, { useState, useRef, useEffect, useMemo } from 'react';

interface PythagorasInteractiveProps {
    onBack: () => void;
}

const PythagorasInteractive: React.FC<PythagorasInteractiveProps> = ({ onBack }) => {
    const [a, setA] = useState(3);
    const [b, setB] = useState(4);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const calculations = useMemo(() => {
        const aNum = Number(a);
        const bNum = Number(b);
        if (isNaN(aNum) || isNaN(bNum) || aNum <= 0 || bNum <= 0) {
            return { a2: 0, b2: 0, c2: 0, c: 0, error: true };
        }
        const a2 = aNum * aNum;
        const b2 = bNum * bNum;
        const c2 = a2 + b2;
        const c = Math.sqrt(c2);
        return { a2, b2, c2, c, error: false };
    }, [a, b]);

    const { c } = calculations;

    const drawTriangle = () => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const aNum = Number(a);
        const bNum = Number(b);
        
        const parentWidth = container.clientWidth;
        const parentHeight = container.clientHeight;
        canvas.width = parentWidth;
        canvas.height = parentHeight;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (calculations.error) return;

        const padding = 30;
        const availableWidth = canvas.width - 2 * padding;
        const availableHeight = canvas.height - 2 * padding;

        const scale = Math.min(availableWidth / aNum, availableHeight / bNum);

        const widthA = aNum * scale;
        const heightB = bNum * scale;

        const x0 = padding;
        const y0 = canvas.height - padding;
        const x1 = padding + widthA;
        const y1 = canvas.height - padding;
        const x2 = padding;
        const y2 = canvas.height - padding - heightB;

        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.closePath();
        
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = 'rgba(59, 130, 246, 0.05)';
        ctx.fill();

        ctx.fillStyle = '#1f2937';
        ctx.font = '14px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        ctx.fillStyle = '#db2777'; 
        ctx.fillText(`a = ${aNum.toFixed(2)}`, x0 + widthA / 2, y0 + 15);
        
        ctx.fillStyle = '#4f46e5';
        ctx.textAlign = 'right';
        ctx.fillText(`b = ${bNum.toFixed(2)}`, x0 - 10, y0 - heightB / 2);

        ctx.fillStyle = '#16a34a';
        ctx.textAlign = 'left';
        ctx.save();
        ctx.translate((x1 + x2) / 2 + 10, (y1 + y2) / 2);
        ctx.rotate(-Math.atan(heightB / widthA));
        ctx.fillText(`c = ${c.toFixed(2)}`, 0, 0);
        ctx.restore();

        ctx.beginPath();
        ctx.rect(x0, y0 - 20, 20, 20);
        ctx.strokeStyle = '#9ca3af';
        ctx.lineWidth = 1;
        ctx.stroke();
    };

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const resizeObserver = new ResizeObserver(() => {
            drawTriangle();
        });
        resizeObserver.observe(container);

        drawTriangle(); // Initial draw

        return () => {
            if (container) {
                resizeObserver.unobserve(container);
            }
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [a, b, calculations]);
    
    const handleValueChange = (setter: React.Dispatch<React.SetStateAction<number>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // Allow empty string or valid number
        if (value === '' || !isNaN(Number(value))) {
            setter(Number(value));
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
             <button onClick={onBack} className="mb-8 inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Voltar
            </button>
            <header className="mb-8 text-center md:text-left">
                <h1 className="text-4xl font-bold text-blue-700 mb-2">O Teorema de Pitágoras</h1>
                <p className="text-sm text-gray-500">Por Pitágoras de Samos em 28 de Setembro, 2025</p>
            </header>

            <main className="grid md:grid-cols-2 gap-8">

                <section className="bg-white p-6 rounded-lg shadow-lg order-2 md:order-1">
                    <h2 className="text-2xl font-semibold text-blue-600 mb-4">Sobre o Teorema</h2>
                    
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xl font-semibold mb-2">O que é?</h3>
                            <p className="text-gray-700 leading-relaxed">
                                O Teorema de Pitágoras é um princípio fundamental da geometria Euclidiana. Ele afirma que, em um triângulo retângulo, o quadrado da hipotenusa (o lado oposto ao ângulo reto) é igual à soma dos quadrados dos outros dois lados (catetos).
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-2">A Fórmula</h3>
                            <p className="text-gray-700 leading-relaxed">
                                Se chamarmos os catetos de <code className="text-pink-600">a</code> e <code className="text-indigo-600">b</code> e a hipotenusa de <code className="text-green-600">c</code>, a fórmula é expressa como:
                            </p>
                            <div className="text-center bg-gray-100 p-4 rounded-md my-4">
                                <code className="text-2xl font-bold"><span className="text-pink-600">a²</span> + <span className="text-indigo-600">b²</span> = <span className="text-green-600">c²</span></code>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-2">Aplicações no Mundo Real</h3>
                            <p className="text-gray-700 leading-relaxed mb-3">
                                O teorema é usado em diversas áreas para calcular distâncias:
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-center">
                                    <span className="text-2xl mr-3">🏛️</span>
                                    <span className="text-gray-700"><strong>Arquitetura e Construção:</strong> Para garantir ângulos retos em fundações e estruturas.</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="text-2xl mr-3">🧭</span>
                                    <span className="text-gray-700"><strong>Navegação:</strong> Para calcular a rota mais curta entre dois pontos (navegação aérea e marítima).</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="text-2xl mr-3">🎨</span>
                                    <span className="text-gray-700"><strong>Design Gráfico e Jogos:</strong> Para determinar a posição de objetos em um espaço 2D ou 3D.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="bg-white p-6 rounded-lg shadow-lg order-1 md:order-2">
                    <h2 className="text-2xl font-semibold text-blue-600 mb-4">Explorador Interativo</h2>
                    <p className="text-gray-700 leading-relaxed mb-6">
                        Use os controles deslizantes abaixo para alterar o comprimento dos catetos <code>a</code> e <code>b</code>. Observe como o triângulo e o cálculo da hipotenusa <code>c</code> mudam em tempo real.
                    </p>

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="catetoA" className="flex justify-between items-center font-medium text-pink-600">
                                <span>Cateto a</span>
                                <input type="number" id="valorA" value={a} onChange={handleValueChange(setA)} min="1" max="50" className="w-20 p-1 border rounded-md text-right"/>
                            </label>
                            <input type="range" id="catetoA" min="1" max="50" value={a} step="0.1" onChange={handleValueChange(setA)} className="w-full h-2 bg-pink-100 rounded-lg appearance-none cursor-pointer accent-pink-600"/>
                        </div>

                        <div>
                            <label htmlFor="catetoB" className="flex justify-between items-center font-medium text-indigo-600">
                                <span>Cateto b</span>
                                <input type="number" id="valorB" value={b} onChange={handleValueChange(setB)} min="1" max="50" className="w-20 p-1 border rounded-md text-right"/>
                            </label>
                            <input type="range" id="catetoB" min="1" max="50" value={b} step="0.1" onChange={handleValueChange(setB)} className="w-full h-2 bg-indigo-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"/>
                        </div>
                    </div>

                    <div ref={containerRef} className="chart-container bg-gray-100 rounded-md mt-6 overflow-hidden">
                        <canvas ref={canvasRef} id="triangleCanvas"></canvas>
                    </div>

                    <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h3 className="text-xl font-semibold mb-3">Cálculo da Hipotenusa (c)</h3>
                        <div id="calculationOutput" className="space-y-2 text-gray-700 font-mono">
                           {calculations.error ? (
                                <p className="text-red-500">Por favor, insira valores positivos para a e b.</p>
                           ) : (
                                <>
                                    <p>c² = a² + b²</p>
                                    <p>c² = {Number(a).toFixed(2)}² + {Number(b).toFixed(2)}²</p>
                                    <p>c² = {calculations.a2.toFixed(2)} + {calculations.b2.toFixed(2)}</p>
                                    <p>c² = {calculations.c2.toFixed(2)}</p>
                                    <p className="font-bold text-green-700">c = √{calculations.c2.toFixed(2)} ≈ {calculations.c.toFixed(2)}</p>
                                </>
                           )}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default PythagorasInteractive;
