import React, { useState, useRef, useEffect, useCallback } from 'react';

interface FirstDegreeEquationInteractiveProps {
    onBack: () => void;
}

const FirstDegreeEquationInteractive: React.FC<FirstDegreeEquationInteractiveProps> = ({ onBack }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [a, setA] = useState<number | string>(2);
    const [b, setB] = useState<number | string>(5);
    const [c, setC] = useState<number | string>(11);
    const [currentStep, setCurrentStep] = useState(0);
    const [solutionSteps, setSolutionSteps] = useState<string[]>([]);
    const [vizStates, setVizStates] = useState<any[]>([]);
    const [isSolving, setIsSolving] = useState(false);
    const [stepHtml, setStepHtml] = useState('<p class="text-lg text-slate-600">Pressione "Resolver" para iniciar.</p>');
    const [isFinalStep, setIsFinalStep] = useState(false);

    const drawBalance = useCallback((state: any) => {
        const canvas = canvasRef.current;
        if (!canvas || !canvas.getContext) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        const FONT_BOLD = "bold 18px 'Inter', sans-serif";
        const COLOR_X = '#2563eb';
        const COLOR_CONST = '#10b981';
        const COLOR_RESULT = '#f59e0b';
        const COLOR_BEAM = '#334155';
        const COLOR_FULCRUM = '#475569';

        const drawBlock = (x: number, y: number, width: number, height: number, color: string, label: string) => {
            ctx.fillStyle = color;
            ctx.fillRect(x, y, width, height);
            ctx.strokeStyle = '#f8fafc';
            ctx.lineWidth = 2;
            ctx.strokeRect(x, y, width, height);
            
            ctx.fillStyle = '#ffffff';
            ctx.font = FONT_BOLD;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(label, x + width / 2, y + height / 2);
        }

        const w = canvas.width;
        const h = canvas.height;
        ctx.clearRect(0, 0, w, h);

        const beamY = h * 0.4;
        const fulcrumX = w / 2;
        const fulcrumTop = beamY;
        const fulcrumBaseY = h * 0.95;
        const beamWidth = w * 0.8;
        const beamHeight = 10;
        
        ctx.fillStyle = COLOR_FULCRUM;
        ctx.beginPath();
        ctx.moveTo(fulcrumX, fulcrumTop);
        ctx.lineTo(fulcrumX - 20, fulcrumBaseY);
        ctx.lineTo(fulcrumX + 20, fulcrumBaseY);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = COLOR_BEAM;
        ctx.fillRect(w * 0.1, beamY - beamHeight / 2, beamWidth, beamHeight);

        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(w * 0.25, beamY);
        ctx.lineTo(w * 0.25, beamY + 30);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(w * 0.75, beamY);
        ctx.lineTo(w * 0.75, beamY + 30);
        ctx.stroke();

        const panY = beamY + 30;
        const panWidth = w * 0.3;
        const panHeight = 10;
        
        ctx.fillStyle = COLOR_BEAM;
        ctx.fillRect(w * 0.1, panY, panWidth, panHeight);
        ctx.fillRect(w * 0.6, panY, panWidth, panHeight);
        
        const blockWidth = 60;
        const blockHeight = 40;
        const leftPanY = panY - blockHeight;
        const rightPanY = panY - blockHeight;

        if (state.left) {
            state.left.forEach((item: string, index: number) => {
                const color = item.includes('x') ? COLOR_X : COLOR_CONST;
                drawBlock(w * 0.15 + (index * (blockWidth + 5)), leftPanY, blockWidth, blockHeight, color, item);
            });
        }
        
        if (state.right) {
             state.right.forEach((item: string, index: number) => {
                const color = (state.step === 2) ? COLOR_RESULT : COLOR_CONST;
                drawBlock(w * 0.65 + (index * (blockWidth + 5)), rightPanY, blockWidth, blockHeight, color, item);
            });
        }
    }, []);

    const resetAll = useCallback(() => {
        setCurrentStep(0);
        setSolutionSteps([]);
        setVizStates([]);
        setA(2);
        setB(5);
        setC(11);
        setStepHtml('<p class="text-lg text-slate-600">Pressione "Resolver" para iniciar.</p>');
        setIsSolving(false);
        setIsFinalStep(false);
        drawBalance({ left: ['ax', 'b'], right: ['c'] });
    }, [drawBalance]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const resizeObserver = new ResizeObserver(() => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            if (vizStates[currentStep]) {
                drawBalance(vizStates[currentStep]);
            } else {
                 drawBalance({ left: ['ax', 'b'], right: ['c'] });
            }
        });
        resizeObserver.observe(canvas);
        
        // Initial draw
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        drawBalance({ left: ['ax', 'b'], right: ['c'] });

        return () => resizeObserver.disconnect();
    }, [currentStep, vizStates, drawBalance]);

    const startSolving = () => {
        const numA = parseFloat(a as string);
        const numB = parseFloat(b as string);
        const numC = parseFloat(c as string);

        if (isNaN(numA) || isNaN(numB) || isNaN(numC)) {
            setStepHtml('<p class="text-red-600 font-bold">Por favor, insira números válidos.</p>');
            return;
        }
        if (numA === 0) {
            setStepHtml('<p class="text-red-600 font-bold">O valor de \'a\' não pode ser zero.</p>');
            return;
        }

        const cMinusB = numC - numB;
        const finalX = (numC - numB) / numA;
        const bStr = (numB >= 0) ? `+ ${numB}` : `- ${Math.abs(numB)}`;
        const bOpStr = (numB >= 0) ? `Subtraia ${numB}` : `Adicione ${Math.abs(numB)}`;
        const bOpViz = (numB >= 0) ? `${numB}` : `-${Math.abs(numB)}`;

        const newSolutionSteps = [
            `<strong>Equação Inicial:</strong><br><span class="text-2xl font-bold text-blue-800">${numA}x ${bStr} = ${numC}</span>`,
            `<strong>Passo 1: ${bOpStr} de ambos os lados.</strong><br> ${numA}x ${bStr} ${numB >= 0 ? '-' : '+'} ${Math.abs(numB)} = ${numC} ${numB >= 0 ? '-' : '+'} ${Math.abs(numB)}<br><span class="text-2xl font-bold text-blue-800">${numA}x = ${cMinusB}</span>`,
            `<strong>Passo 2: Divida ambos os lados por ${numA}.</strong><br> (${numA}x) / ${numA} = ${cMinusB} / ${numA}<br><span class="text-2xl font-bold text-green-700">x = ${finalX}</span>`,
            `<strong>Resultado Final:</strong><br><span class="text-3xl font-bold text-green-700">x = ${finalX}</span>`
        ];
        
        const newVizStates = [
            { step: 0, left: [`${numA}x`, bOpViz], right: [`${numC}`] },
            { step: 1, left: [`${numA}x`], right: [`${cMinusB}`] },
            { step: 2, left: ['x'], right: [finalX.toString().substring(0, 6)] },
            { step: 2, left: ['x'], right: [finalX.toString().substring(0, 6)] }
        ];

        setSolutionSteps(newSolutionSteps);
        setVizStates(newVizStates);
        setCurrentStep(0);
        setStepHtml(newSolutionSteps[0]);
        drawBalance(newVizStates[0]);
        setIsSolving(true);
        setIsFinalStep(false);
    };

    const handleNextStep = () => {
        if (currentStep < solutionSteps.length - 1) {
            const nextStep = currentStep + 1;
            setCurrentStep(nextStep);
            setStepHtml(solutionSteps[nextStep]);
            drawBalance(vizStates[nextStep]);
            if (nextStep === solutionSteps.length - 1) {
                setIsFinalStep(true);
            }
        }
    };
    
    return (
        <div className="equation-solver-page">
             <button onClick={onBack} className="mb-8 inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Voltar
            </button>
            <header className="bg-white shadow-sm mb-8">
                <div className="max-w-6xl mx-auto px-4 py-5 text-center">
                    <h1 className="text-4xl font-bold text-blue-900">Resolvendo Equações do Primeiro Grau</h1>
                    <p className="text-lg text-slate-600 mt-2">Uma exploração interativa do artigo de Al-Khwarizmi</p>
                </div>
            </header>

            <main className="max-w-6xl mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="lg:col-span-2">
                    <section id="conceito" className="bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-3xl font-bold text-blue-900 mb-6">O Conceito</h2>
                        <div className="space-y-6 text-lg leading-relaxed text-slate-700">
                            <p>Uma equação do primeiro grau é uma sentença matemática que estabelece uma igualdade envolvendo uma ou mais incógnitas com expoente 1. A forma geral é:</p>
                            <div className="text-center my-4"><code className="formula">ax + b = c</code></div>
                            <p>Onde <span className="text-formula">'x'</span> é a incógnita e <span className="text-formula">'a'</span>, <span className="text-formula">'b'</span> e <span className="text-formula">'c'</span> são números conhecidos, com <span className="text-formula">'a'</span> diferente de zero.</p>
                            <p className="font-semibold text-blue-800">O objetivo é isolar a incógnita 'x', e o princípio fundamental é sempre manter a igualdade, como em uma balança.</p>
                        </div>
                    </section>
                </div>

                <div className="sticky top-8">
                    <section id="balanca" className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">O Princípio da Balança</h2>
                        <p className="text-slate-700 mb-6 text-center">A equação é uma balança em equilíbrio. O que você faz de um lado, deve fazer do outro. Esta visualização mostrará como suas ações mantêm a balança equilibrada.</p>
                        <canvas ref={canvasRef} className="balance-canvas"></canvas>
                    </section>
                </div>

                <div>
                    <section id="solucionador" className="bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-3xl font-bold text-blue-900 mb-6">Solucionador Interativo</h2>
                        <p className="text-lg text-slate-700 mb-6">Use o exemplo guiado <span className="text-formula">2x + 5 = 11</span> (do artigo original) clicando em "Próximo Passo", ou insira seus próprios valores e resolva.</p>
                        <div className="space-y-4 mb-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
                            <h3 className="text-2xl font-semibold text-blue-800 text-center mb-4">Monte sua Equação</h3>
                            <div className="flex items-center justify-center space-x-3">
                                <input type="number" value={a} onChange={(e) => setA(e.target.value)} className="w-20 text-center text-xl font-bold p-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                                <span className="text-2xl font-bold text-slate-700">x +</span>
                                <input type="number" value={b} onChange={(e) => setB(e.target.value)} className="w-20 text-center text-xl font-bold p-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                                <span className="text-2xl font-bold text-slate-700">=</span>
                                <input type="number" value={c} onChange={(e) => setC(e.target.value)} className="w-20 text-center text-xl font-bold p-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                            </div>
                        </div>
                        <div className="flex space-x-4 mb-8">
                            <button onClick={startSolving} disabled={isSolving} className={`flex-1 bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ${isSolving ? 'opacity-50' : ''}`}>Resolver</button>
                            <button onClick={handleNextStep} disabled={!isSolving || isFinalStep} className={`flex-1 bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ${(!isSolving || isFinalStep) ? 'opacity-50' : ''}`}>Próximo Passo</button>
                            <button onClick={resetAll} className="flex-1 bg-slate-500 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-slate-600 transition duration-300">Recomeçar</button>
                        </div>
                        <h3 className="text-2xl font-semibold text-blue-800 mb-4">Passo a Passo da Solução:</h3>
                        <div dangerouslySetInnerHTML={{ __html: stepHtml }} className={`step-display ${isFinalStep ? 'final' : ''}`}></div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default FirstDegreeEquationInteractive;
