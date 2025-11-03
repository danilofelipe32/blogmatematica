import React, { useState, useMemo } from 'react';

interface NotableProductsInteractiveProps {
    onBack: () => void;
}

const NotableProductsInteractive: React.FC<NotableProductsInteractiveProps> = ({ onBack }) => {
    const [a, setA] = useState(6);
    const [b, setB] = useState(4);

    const calculations = useMemo(() => {
        const sum = a + b;
        const sumSq = sum * sum;
        const aSq = a * a;
        const bSq = b * b;
        const twoAB = 2 * a * b;
        const identitySum = aSq + twoAB + bSq;
        return { sum, sumSq, aSq, bSq, twoAB, identitySum };
    }, [a, b]);
    
    const handleValueChange = (setter: React.Dispatch<React.SetStateAction<number>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setter(parseFloat(e.target.value));
    };

    return (
        <div className="notable-products-page">
            <button onClick={onBack} className="mb-8 inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Voltar
            </button>
            <header className="mb-10 text-center">
                <h1 className="text-4xl font-bold text-yellow-800 mb-2">Produtos Notáveis: O Quadrado da Soma</h1>
                <p className="text-lg text-gray-600">Por Euclides de Alexandria em 02 de Outubro, 2025</p>
            </header>

            <main className="grid md:grid-cols-2 gap-8 lg:gap-12">
                <section className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold text-yellow-900 mb-4">Visualização Geométrica</h2>
                    <p className="text-gray-700 leading-relaxed mb-6">
                        A fórmula <span className="formula">(a + b)²</span> representa a área de um quadrado com lado <span className="formula">a + b</span>. Veja como este quadrado pode ser dividido em quatro partes: um quadrado de área <span className="formula">a²</span>, um quadrado de área <span className="formula">b²</span>, e dois retângulos de área <span className="formula">ab</span>.
                    </p>

                     <div className="space-y-4 mb-6">
                        <div>
                            <label htmlFor="valueA" className="flex justify-between items-center font-medium text-blue-600">
                                <span>Valor de a</span>
                                <span className="font-bold text-lg">{a.toFixed(1)}</span>
                            </label>
                            <input type="range" id="valueA" min="1" max="10" value={a} step="0.1" onChange={handleValueChange(setA)} className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600"/>
                        </div>
                        <div>
                            <label htmlFor="valueB" className="flex justify-between items-center font-medium text-green-600">
                                <span>Valor de b</span>
                                <span className="font-bold text-lg">{b.toFixed(1)}</span>
                            </label>
                            <input type="range" id="valueB" min="1" max="10" value={b} step="0.1" onChange={handleValueChange(setB)} className="w-full h-2 bg-green-100 rounded-lg appearance-none cursor-pointer accent-green-600"/>
                        </div>
                    </div>
                    
                    <div className="relative">
                        <div 
                            className="visual-square" 
                            style={{
                                '--a-val': `${a}fr`,
                                '--b-val': `${b}fr`
                            } as React.CSSProperties}
                        >
                            <div className="square-part part-a2">a²</div>
                            <div className="square-part part-ab">ab</div>
                            <div className="square-part part-ab">ab</div>
                            <div className="square-part part-b2">b²</div>
                        </div>
                    </div>

                </section>

                <section className="bg-white p-6 rounded-lg shadow-lg space-y-8">
                    <div>
                        <h2 className="text-2xl font-semibold text-yellow-900 mb-4">A Identidade Algébrica</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">A fórmula é:</p>
                        <div className="text-center bg-yellow-50 p-4 rounded-lg">
                            <code className="formula text-xl">(a + b)² = a² + 2ab + b²</code>
                        </div>
                    </div>
                     <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h3 className="text-xl font-semibold mb-3">Cálculo ao Vivo</h3>
                        <div className="space-y-2 font-mono text-gray-700">
                            <p className="text-blue-700"><strong>Lado esquerdo:</strong></p>
                            <p className="pl-4">(<span className="text-blue-600">{a.toFixed(1)}</span> + <span className="text-green-600">{b.toFixed(1)}</span>)² = {calculations.sum.toFixed(1)}² = <strong className="text-lg">{calculations.sumSq.toFixed(2)}</strong></p>
                            
                            <p className="text-red-700 pt-2"><strong>Lado direito:</strong></p>
                            <p className="pl-4"><span className="text-blue-600">{a.toFixed(1)}²</span> + 2(<span className="text-blue-600">{a.toFixed(1)}</span>)(<span className="text-green-600">{b.toFixed(1)}</span>) + <span className="text-green-600">{b.toFixed(1)}²</span></p>
                            <p className="pl-4">= {calculations.aSq.toFixed(2)} + {calculations.twoAB.toFixed(2)} + {calculations.bSq.toFixed(2)} = <strong className="text-lg">{calculations.identitySum.toFixed(2)}</strong></p>

                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-yellow-900 mb-2">Por que isso funciona?</h3>
                        <p className="text-gray-700 leading-relaxed">Podemos provar isso expandindo a expressão:</p>
                        <p className="font-mono bg-gray-100 p-3 rounded-md mt-2">
                           (a + b)² = (a + b)(a + b) <br/>
                           = a(a+b) + b(a+b) <br/>
                           = a² + ab + ba + b² <br/>
                           = a² + 2ab + b²
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-yellow-900 mb-2">Exemplo Numérico</h3>
                        <p className="text-gray-700 leading-relaxed">Vamos calcular 102² usando o produto notável:</p>
                         <p className="font-mono bg-gray-100 p-3 rounded-md mt-2">
                           102² = (100 + 2)² <br/>
                           = 100² + 2(100)(2) + 2² <br/>
                           = 10000 + 400 + 4 <br/>
                           = 10404
                        </p>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default NotableProductsInteractive;