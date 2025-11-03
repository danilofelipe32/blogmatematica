import React, { useState, useRef, useEffect } from 'react';

interface FactoringInteractiveProps {
    onBack: () => void;
}

const FactoringInteractive: React.FC<FactoringInteractiveProps> = ({ onBack }) => {
    const [distributeState, setDistributeState] = useState('idle'); // idle, animating, done
    const [distributeCaption, setDistributeCaption] = useState('');

    const [factorInput, setFactorInput] = useState('');
    const [factorState, setFactorState] = useState('idle'); // idle, animating, done
    const [factorCaption, setFactorCaption] = useState('');

    const handleDistribute = () => {
        setDistributeState('animating');
        setDistributeCaption('Multiplicando 5 por x...');
        
        setTimeout(() => {
            setDistributeCaption('...e multiplicando 5 por y...');
        }, 800);
        
        setTimeout(() => {
            setDistributeState('done');
            setDistributeCaption('Pronto! 5(x + y) = 5x + 5y');
        }, 1600);
        
        setTimeout(() => {
            setDistributeState('idle');
            setDistributeCaption('');
        }, 4000);
    };

    const handleFactor = () => {
        setFactorState('animating');
        setFactorCaption('Extraindo o fator comum "5"...');
        
        setTimeout(() => {
            setFactorState('done');
            setFactorCaption('Pronto! 5x + 5y = 5(x + y)');
        }, 800);
        
        setTimeout(() => {
            setFactorState('idle');
            setFactorCaption('');
            setFactorInput('');
        }, 4000);
    };

    const getDistributeStyles = () => {
        switch (distributeState) {
            case 'animating':
                return {
                    factor: { transform: 'translateX(-30px)', opacity: 0, transition: 'all 0.8s ease' },
                    vars: { opacity: 0, transition: 'all 0.4s ease' },
                    res5x: { opacity: 1, transform: 'scale(1) translateX(-60px)', transition: 'all 0.6s ease 0.4s' },
                    resX: { opacity: 1, transform: 'scale(1) translateX(-60px)', transition: 'all 0.6s ease 0.4s' },
                    resPlus: { opacity: 1, transform: 'scale(1)', transition: 'all 0.6s ease 1.2s' },
                    res5y: { opacity: 1, transform: 'scale(1) translateX(60px)', transition: 'all 0.6s ease 1.2s' },
                    resY: { opacity: 1, transform: 'scale(1) translateX(60px)', transition: 'all 0.6s ease 1.2s' },
                };
            case 'done':
                 return {
                    factor: { transform: 'translateX(-30px)', opacity: 0 },
                    vars: { opacity: 0 },
                    res5x: { opacity: 1, transform: 'scale(1) translateX(-60px)' },
                    resX: { opacity: 1, transform: 'scale(1) translateX(-60px)' },
                    resPlus: { opacity: 1, transform: 'scale(1)' },
                    res5y: { opacity: 1, transform: 'scale(1) translateX(60px)' },
                    resY: { opacity: 1, transform: 'scale(1) translateX(60px)' },
                };
            default: // idle
                return {
                    factor: { transform: 'translateX(-100px)', opacity: 1, transition: 'all 0.6s ease' },
                    vars: { transform: 'translateX(30px)', opacity: 1, transition: 'all 0.6s ease' },
                    res5x: { opacity: 0, transform: 'scale(0.8)' },
                    resX: { opacity: 0, transform: 'scale(0.8)' },
                    resPlus: { opacity: 0, transform: 'scale(0.8)' },
                    res5y: { opacity: 0, transform: 'scale(0.8)' },
                    resY: { opacity: 0, transform: 'scale(0.8)' },
                };
        }
    };
    const distributeStyles = getDistributeStyles();
    
    const getFactorStyles = () => {
        switch(factorState) {
            case 'animating':
                return {
                    f5xf: { transform: 'translateX(-120px) scale(1.1)', opacity: 0 },
                    f5xx: { transform: 'translateX(-30px)', opacity: 0 },
                    fPlus: { transform: 'translateX(0px)', opacity: 0 },
                    f5yf: { transform: 'translateX(-120px) scale(1.1)', opacity: 0 },
                    f5yy: { transform: 'translateX(30px)', opacity: 0 },
                    factoredAll: { opacity: 1, transform: 'scale(1)', transition: 'all 0.6s ease 0.6s' }
                };
            case 'done':
                 return {
                    f5xf: { opacity: 0 }, f5xx: { opacity: 0 }, fPlus: { opacity: 0 }, f5yf: { opacity: 0 }, f5yy: { opacity: 0 },
                    factoredAll: { opacity: 1, transform: 'scale(1)' }
                };
            default: // idle
                return {
                    f5xf: { transform: 'translateX(-30px)', opacity: 1 },
                    f5xx: { transform: 'translateX(30px)', opacity: 1 },
                    fPlus: { transform: 'translateX(0px)', opacity: 1 },
                    f5yf: { transform: 'translateX(-30px)', opacity: 1 },
                    f5yy: { transform: 'translateX(30px)', opacity: 1 },
                    factoredAll: { opacity: 0, transform: 'scale(0.8)' }
                };
        }
    };
    const factorStyles = getFactorStyles();

    return (
        <div className="factoring-page max-w-4xl mx-auto">
            <button onClick={onBack} className="mb-8 inline-flex items-center text-green-600 hover:text-green-800 transition-colors font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                Voltar
            </button>
            <header className="py-8">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-green-800">Fatoração: Fator Comum em Evidência</h1>
                    <p className="text-xl text-slate-600 mt-3">Uma demonstração interativa do artigo de Sophie Germain.</p>
                </div>
            </header>

            <main className="p-4 md:p-8 mt-10 space-y-12">
                <section className="card">
                    <h2 className="text-3xl font-bold text-green-900 mb-6">O Conceito</h2>
                    <div className="space-y-6 text-lg leading-relaxed text-slate-700">
                        <p>Fatorar uma expressão algébrica significa transformá-la em uma <strong>multiplicação</strong>.</p>
                        <p>O caso mais simples é colocar o <span className="font-bold text-green-700">fator comum em evidência</span>. Este é exatamente o processo inverso de aplicar a propriedade distributiva, que você provavelmente já conhece.</p>
                        <p>Vamos explorar isso visualmente.</p>
                    </div>
                </section>

                <section className="card">
                    <h2 className="text-3xl font-bold text-green-900 mb-6">Iniciando pela Distributiva (A Verificação)</h2>
                    <p className="text-lg text-slate-700 mb-6">Vamos ver o que acontece quando aplicamos a distributiva em <span className="formula-sm">5(x + y)</span>. Clique no botão para ver a mágica da multiplicação.</p>
                    <div className="interactive-box">
                        {/* Start State */}
                        <span className="term fator" style={distributeStyles.factor}>5</span>
                        <span className="term variavel" style={distributeStyles.vars}>(x + y)</span>
                        {/* End State */}
                        <span className="term fator" style={distributeStyles.res5x}>5</span>
                        <span className="term variavel" style={{...distributeStyles.resX, opacity: distributeState === 'idle' ? 0 : 1 }}>x</span>
                        <span className="op" style={distributeStyles.resPlus}>+</span>
                        <span className="term fator" style={distributeStyles.res5y}>5</span>
                        <span className="term variavel" style={{...distributeStyles.resY, opacity: distributeState === 'idle' ? 0 : 1 }}>y</span>
                    </div>
                    <div className="text-center mt-6">
                        <button onClick={handleDistribute} disabled={distributeState !== 'idle'} className="btn-primary">Distribuir 5</button>
                    </div>
                    <p className="text-center text-slate-600 mt-4 h-6">{distributeCaption}</p>
                </section>

                <section className="card">
                    <h2 className="text-3xl font-bold text-green-900 mb-6">Fatoração: O Processo Inverso</h2>
                    <p className="text-lg text-slate-700 mb-6">Agora, vamos fazer o caminho inverso. Começamos com <span className="formula-sm">5x + 5y</span>. Qual termo aparece em ambos os lados da soma?</p>
                    <div className="interactive-box">
                         {/* Start State */}
                        <span className="term fator" style={factorStyles.f5xf}>5</span>
                        <span className="term variavel" style={factorStyles.f5xx}>x</span>
                        <span className="op" style={factorStyles.fPlus}>+</span>
                        <span className="term fator" style={{...factorStyles.f5yf, position: 'relative', top: 'auto', left: 'auto', display: factorState === 'idle' ? 'inline-block' : 'none'}}>5</span>
                        <span className="term fator" style={{...factorStyles.f5yf, display: factorState !== 'idle' ? 'inline-block' : 'none' }}>5</span>
                        <span className="term variavel" style={factorStyles.f5yy}>y</span>
                        {/* End State */}
                        <div style={factorStyles.factoredAll} className="flex items-center">
                            <span className="term fator" style={{position: 'relative'}}>5</span>
                            <span className="op" style={{position: 'relative'}}>(</span>
                            <span className="term variavel" style={{position: 'relative'}}>x</span>
                            <span className="op" style={{position: 'relative'}}>+</span>
                            <span className="term variavel" style={{position: 'relative'}}>y</span>
                            <span className="op" style={{position: 'relative'}}>)</span>
                        </div>
                    </div>
                     <div className="mt-8 text-center">
                        <label htmlFor="common-factor-input" className="block text-lg font-medium text-slate-700 mb-2">Qual é o fator comum?</label>
                        <input type="text" id="common-factor-input" value={factorInput} onChange={(e) => setFactorInput(e.target.value)} disabled={factorState !== 'idle'} className="w-40 text-center text-xl font-bold p-2 border border-slate-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" placeholder="Digite aqui" />
                        <button onClick={handleFactor} disabled={factorInput !== '5' || factorState !== 'idle'} className="btn-primary ml-4">Fatorar</button>
                    </div>
                    <p className="text-center text-slate-600 mt-4 h-6">{factorCaption}</p>
                </section>

                 <section className="card">
                    <h2 className="text-3xl font-bold text-green-900 mb-6">Conclusão</h2>
                    <div className="space-y-6 text-lg leading-relaxed text-slate-700">
                        <p>Como vimos, o processo de fatoração é o oposto da distributiva:</p>
                        <ul className="list-disc list-outside ml-6 space-y-2">
                            <li>Colocamos o fator comum (<span className="formula-sm">5</span>) em evidência.</li>
                            <li>Dentro dos parênteses, colocamos o resultado da divisão de cada termo original pelo fator comum:
                                <ul className="list-decimal list-outside ml-8 mt-2">
                                    <li><span className="formula-sm">5x / 5 = x</span></li>
                                    <li><span className="formula-sm">5y / 5 = y</span></li>
                                </ul>
                            </li>
                        </ul>
                        <p className="text-center text-2xl font-bold text-green-800 bg-green-50 p-6 rounded-lg border border-green-200">
                            5x + 5y  <span className="text-slate-500 mx-2">➔</span>  5(x + y)
                        </p>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default FactoringInteractive;