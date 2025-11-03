import { Post, Job } from './types';

export const POSTS_PER_PAGE = 6;
export const CATEGORIES = ['Todos', 'Álgebra', 'Geometria', 'Cálculo', 'Fundamentos'];
export const ADMIN_PASSWORD = '271177';

export const INITIAL_JOBS: Job[] = [
    {
        id: 5,
        title: "Fut-Mat: A Gamificação da Geometria",
        problem: "Alunos demonstram baixo interesse em aprender conceitos de geometria, como ângulos e trajetórias, por achá-los abstratos e distantes de sua realidade.",
        date: "25 de Outubro, 2025",
        image1: "https://i.imgur.com/8p3x5sK.png",
        image2: "https://i.imgur.com/sM9b7fH.png",
        image3: "https://i.imgur.com/gO2t4jR.png",
        solutionDescription: "Um jogo interativo que simula uma partida de futebol. Para chutar a gol, passar a bola ou realizar uma defesa, o aluno precisa resolver desafios rápidos envolvendo ângulos, parábolas e cálculo de distância. O jogo transforma o campo de futebol em um laboratório de geometria dinâmico.",
        solutionType: "Jogo Educacional (Gamificação)",
        tools: "Unity, C#, Blender",
        link: "https://www.escolagames.com.br/jogos/",
        components: "Lucas, Mariana, Pedro"
    },
    {
        id: 4,
        title: "Tutor de Matemática IA 'Zen'",
        problem: "Alunos precisam de ajuda imediata e personalizada para resolver dúvidas de matemática fora do horário de aula.",
        date: "20 de Outubro, 2025",
        image1: "https://i.imgur.com/UCZzUpe.png",
        image2: "https://i.imgur.com/DL2PFOa.png",
        image3: "https://i.imgur.com/1n5RAS7.png",
        solutionDescription: "Um chatbot inteligente que utiliza IA para fornecer explicações passo a passo, dicas e exercícios práticos. O 'Zen' se adapta ao nível de conhecimento do aluno, oferecendo uma experiência de aprendizado calma e focada.",
        solutionType: "Chatbot com Inteligência Artificial",
        tools: "Google Gemini API, Python, React",
        link: "https://zen-math-tutor.example.com",
        components: "Heitor, Isadora, Joana"
    }
];

export const INITIAL_POSTS: Post[] = [
    {
        id: 1,
        title: "A Deslumbrante Identidade de Euler",
        author: "Ada Lovelace",
        date: "5 de Outubro, 2025",
        category: "Fundamentos",
        image: "https://i.imgur.com/hZaWKBf.png",
        excerpt: "Considerada uma das equações mais bonitas da matemática, a Identidade de Euler conecta cinco constantes fundamentais de uma forma surpreendentemente simples.",
        content: `<h2>I. Introdução: O Hino da Matemática Pura</h2>
<p>A matemática, em sua busca por estruturas e verdades fundamentais, ocasionalmente revela equações de tamanha concisão e profundidade que transcendem a mera utilidade técnica, atingindo o patamar da arte. Nenhuma fórmula exemplifica melhor esse ideal do que a Identidade de Euler:</p>
<div class="math-block">$$e^{i\pi} + 1 = 0$$</div>
<p>Celebrada por sua elegância e capacidade de entrelaçar conceitos matemáticos aparentemente desconexos, esta equação é frequentemente aclamada como a mais notável e bela fórmula já descoberta. A sua notoriedade deriva da síntese de cinco das constantes mais cruciais da matemática, conectadas por três operações básicas (adição, multiplicação e potencialização), resultando em uma igualdade simples e memorável.</p>

<h3>I.A. Apresentação da Identidade e Aclamação Estética</h3>
<p>A beleza da Identidade de Euler não é meramente estética; ela reside na profundidade conceitual que esconde em sua brevidade. Sua importância é tão vasta que abrange desde a matemática pura até aplicações práticas em campos como física quântica, processamento de sinais e imagens e engenharia, servindo como modelo para correntes alternadas, essenciais para praticamente todos os dispositivos eletrônicos.</p>
<p>O fascínio que a equação exerce sobre a comunidade científica é imenso. O matemático e divulgador Keith Devlin comparou a equação a uma obra de arte fundamental: "Como um soneto de Shakespeare que captura a própria essência do amor ou uma pintura que traz à tona a beleza da forma humana mais profunda, a equação de Euler alcança o âmago da existência". A capacidade desta fórmula de combinar a beleza formal com a funcionalidade física demonstra o ideal matemático de que as verdades mais profundas são inerentemente as mais elegantes.</p>
<p>A Identidade de Euler até mesmo encontrou seu caminho para o domínio legal e cultural de forma inesperada. Em um notável julgamento criminal em 2003, a pichação desta fórmula — $e^{i\pi} + 1 = 0$ — em um veículo destruído serviu como uma pista crucial e, posteriormente, como prova para a condenação de um estudante de pós-graduação em física teórica, sublinhando o reconhecimento e a ubiquidade da fórmula até mesmo em contextos extracadêmicos.</p>

<h3>I.B. Contexto Histórico: O Legado de Leonhard Euler</h3>
<p>A identidade leva o nome de Leonhard Paul Euler (1707–1783), um prolifico matemático suíço do século XVIII. Euler não apenas descobriu e demonstrou essa relação, mas também desempenhou um papel crucial na sistematização da notação matemática moderna. Ele introduziu o uso da letra $i$ para representar a unidade imaginária $\sqrt{-1}$, e popularizou o uso de $e$ para a base dos logaritmos naturais e $\pi$ para a constante geométrica, conferindo à equação sua forma moderna e elegante.</p>
<p>A base para a Identidade de Euler é a Fórmula de Euler, $e^{i\theta} = \cos \theta + i \sin \theta$, que foi formalmente apresentada e publicada na sua obra seminal Introductio in analysin infinitorum em 1748. Esta obra estabeleceu as bases da análise moderna e enfatizou a centralidade das funções, sendo considerada um dos livros com a maior quantidade de material original na história da matemática. O triunfo da Identidade é, em grande parte, um sucesso da sistematização notacional de Euler, que permitiu que conceitos de Álgebra, Geometria e Análise fossem vislumbrados e conectados em uma estrutura sintática singular.</p>

<h2>II. A Quintessência Matemática: Decifrando as Cinco Constantes</h2>
<p>A Identidade de Euler é uma maravilha de síntese, pois une cinco constantes matemáticas que surgiram em diferentes épocas e domínios da matemática, cada uma com um significado fundamental.</p>

<h3>II.A. A Essência de Cada Elemento</h3>
<p>A equação $e^{i\pi} + 1 = 0$ é notável por fundir diferentes tipos de números: os inteiros fundamentais ($0$ e $1$), duas constantes transcendentes ($e$ e $\pi$), e a unidade imaginária ($i$).</p>
<ul>
    <li><strong>0 (Zero):</strong> Representa a identidade aditiva. É o conceito de 'nada' que atua como ponto de equilíbrio e conclusão na equação. A demonstração final da identidade resulta em um equilíbrio que só é possível graças à inclusão deste elemento, provando que a complexidade do lado esquerdo se anula perfeitamente.</li>
    <li><strong>1 (Um):</strong> Representa a identidade multiplicativa e o primeiro dos números naturais. No Plano Complexo, é o ponto de partida (o vetor de referência) para qualquer rotação.</li>
    <li><strong>$\pi$ (Pi):</strong> A essência da circularidade, definida pela Geometria como a razão entre o perímetro de uma circunferência e seu diâmetro, um número com decimais que seguem infinitamente ($\approx 3.14159$). Na Identidade, $\pi$ impõe o limite cíclico à função exponencial, especificando uma meia-volta.</li>
    <li><strong>$e$ (Número de Euler):</strong> A base do logaritmo natural, fundamental no Cálculo e na Análise para descrever o crescimento contínuo. É um número irracional transcendente ($\approx 2.71828$). Sua natureza é de mudança não cíclica, linear.</li>
    <li><strong>$i$ (Unidade Imaginária):</strong> Introduzido por Euler como $\sqrt{-1}$, este elemento é o catalisador que transforma o crescimento linear de $e$ em movimento rotacional. Sua função é prover uma dimensão perpendicular ao eixo real, levando a análise do crescimento ao domínio do plano complexo.</li>
</ul>
<p>A combinação desses elementos díspares é o cerne da beleza da Identidade. A exponenciação complexa, que envolve a união de irracionais e imaginários, surpreendentemente, se resolve em um número inteiro simples ($-1$). Essa simplificação surpreendente atesta a coerência estrutural da matemática.</p>
<p>Para ilustrar o papel de cada constante:</p>
<div class="overflow-x-auto my-4"><table class="w-full text-left border-collapse"><thead><tr class="bg-gray-100"><th class="border p-2 font-semibold">Constante</th><th class="border p-2 font-semibold">Valor Aproximado</th><th class="border p-2 font-semibold">Domínio Matemático Principal</th><th class="border p-2 font-semibold">Significado no Contexto da Identidade</th></tr></thead><tbody><tr><td class="border p-2">$e$</td><td class="border p-2">$\approx 2.71828$</td><td class="border p-2">Análise, Cálculo (Taxas de Crescimento)</td><td class="border p-2">Base do crescimento contínuo.</td></tr><tr><td class="border p-2">$i$</td><td class="border p-2">$\sqrt{-1}$</td><td class="border p-2">Números Complexos, Álgebra</td><td class="border p-2">A unidade imaginária; o operador de rotação.</td></tr><tr><td class="border p-2">$\pi$</td><td class="border p-2">$\approx 3.14159$</td><td class="border p-2">Geometria, Trigonometria</td><td class="border p-2">Medida da circularidade (meia-volta em radianos).</td></tr><tr><td class="border p-2">$1$</td><td class="border p-2">Exato</td><td class="border p-2">Aritmética</td><td class="border p-2">Identidade multiplicativa (o ponto inicial).</td></tr><tr><td class="border p-2">$0$</td><td class="border p-2">Exato</td><td class="border p-2">Álgebra</td><td class="border p-2">Identidade aditiva (o ponto de equilíbrio).</td></tr></tbody></table></div>

<h2>III. O Alicerce: A Fórmula de Euler e a Representação Geométrica</h2>
<p>A Identidade de Euler é um caso específico e esteticamente perfeito da Fórmula de Euler, que serve como ponte fundamental entre a Álgebra, a Análise e a Geometria.</p>

<h3>III.A. A Fórmula de Euler: $e^{i\theta} = \cos \theta + i \sin \theta$</h3>
<p>A Fórmula de Euler estabelece uma equivalência profunda entre a função exponencial complexa $e^{i\theta}$ e as funções trigonométricas $\cos \theta + i \sin \theta$. Esta expressão é crucial porque unifica a representação de números complexos de duas formas distintas: a forma retangular ou cartesiana ($\cos \theta + i \sin \theta$) e a forma polar ou exponencial ($e^{i\theta}$).</p>

<h3>III.B. Interpretação Geométrica: O Plano de Argand-Gauss</h3>
<p>A maneira mais intuitiva de compreender a Fórmula de Euler é através da visualização no Plano Complexo, também conhecido como Diagrama de Argand-Gauss.</p>
<p>No Plano Complexo, um número $z = x + iy$ é representado por um ponto $(x, y)$. A forma trigonométrica $z = r (\cos \theta + i \sin \theta)$ representa o ponto em termos de sua distância $r$ até a origem e o ângulo $\theta$ que ele forma com o eixo real positivo.</p>
<p>A Fórmula de Euler demonstra que o número $e^{i\theta}$ sempre possui um módulo (magnitude) de $1$ (porque $\sqrt{\cos^2 \theta + \sin^2 \theta} = 1$). Assim, todos os números complexos da forma $e^{i\theta}$ repousam sobre o círculo unitário centrado na origem. O expoente $i\theta$ atua como o 'motor' de rotação: multiplicar um número complexo por $e^{i\theta}$ resulta na rotação desse número por um ângulo $\theta$ no sentido anti-horário.</p>
<p>A presença do $i$ é essencial: ele é o vetor que transforma a taxa de crescimento $e$ na linguagem do movimento circular. Em vez de deslocar linearmente ao longo do eixo real, a exponenciação complexa enrola a linha vertical imaginária no círculo unitário sem esticar ou achatar a curva.</p>

<h3>III.C. A Meia-Volta Fundamental</h3>
<p>A Identidade de Euler surge quando se aplica um ângulo de $\theta = \pi$ radianos (o equivalente a 180 graus) na Fórmula de Euler:</p>
<div class="math-block">$$e^{i\pi} = \cos \pi + i \sin \pi$$</div>
<p>Partindo do ponto inicial $1$ no eixo real positivo (onde $\theta=0$), a rotação de $\pi$ radianos percorre exatamente metade da circunferência do círculo unitário.</p>
<p>Geometricamente, avaliamos:</p>
<ul>
    <li>$\cos \pi$: O valor do cosseno para um ângulo de 180 graus é $-1$.</li>
    <li>$\sin \pi$: O valor do seno para um ângulo de 180 graus é $0$.</li>
</ul>
<p>Substituindo esses valores na Fórmula de Euler, obtém-se:</p>
<div class="math-block">$$e^{i\pi} = -1 + i \cdot 0$$</div>
<div class="math-block">$$e^{i\pi} = -1$$</div>
<p>Ao reorganizar a equação, adicionando $1$ a ambos os lados, chega-se à Identidade de Euler em sua forma canônica: $e^{i\pi} + 1 = 0$.</p>
<p>A interpretação geométrica revela que a identidade é, fundamentalmente, a afirmação de que, se o crescimento contínuo ($e$) for torcido pela dimensão imaginária ($i$) pelo ângulo definidor da circularidade ($\pi$), o resultado é o ponto diametralmente oposto à unidade ($1$ se torna $-1$), e o equilíbrio é alcançado no zero. Esta descrição cinemática sublinha que a exponenciação complexa é a linguagem natural do movimento circular uniforme, definindo um ponto de fase crítico.</p>

<h2>IV. Demonstração Analítica Rigorosa: A Convergência das Séries Infinitas</h2>
<p>A demonstração formal da Identidade de Euler exige ferramentas de Análise Matemática, nomeadamente, a representação de funções através de Séries de Potências, que são somas infinitas de termos. A prova utiliza a Série de Maclaurin, um caso especial da Série de Taylor centrada na origem ($x=0$).</p>

<h3>IV.A. O Papel das Séries de Maclaurin</h3>
<p>A representação de funções como séries infinitas permite que se manipulem e comparem funções transcendentes. A Série de Maclaurin para uma função $f(x)$ é dada por:</p>
<div class="math-block">$$f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(0)}{n!} x^n$$</div>
<p>As três expansões cruciais para a demonstração da Fórmula de Euler são:</p>
<div class="overflow-x-auto my-4"><table class="w-full text-left border-collapse"><thead><tr class="bg-gray-100"><th class="border p-2 font-semibold">Função</th><th class="border p-2 font-semibold">Expansão em Série (Maclaurin)</th><th class="border p-2 font-semibold">Natureza dos Termos</th></tr></thead><tbody><tr><td class="border p-2">$e^x$</td><td class="border p-2">$1 + \frac{x}{1!} + \frac{x^2}{2!} + \frac{x^3}{3!} + \frac{x^4}{4!} + \cdots$</td><td class="border p-2">Todos os termos presentes (potências pares e ímpares, todos positivos).</td></tr><tr><td class="border p-2">$\cos x$</td><td class="border p-2">$1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \frac{x^6}{6!} + \cdots$</td><td class="border p-2">Apenas potências pares, com sinais alternados.</td></tr><tr><td class="border p-2">$\sin x$</td><td class="border p-2">$\frac{x}{1!} - \frac{x^3}{3!} + \frac{x^5}{5!} - \frac{x^7}{7!} + \cdots$</td><td class="border p-2">Apenas potências ímpares, com sinais alternados.</td></tr></tbody></table></div>
<p>A validade da demonstração repousa no fato de que o domínio de convergência da série de $e^x$ se estende a todo o conjunto dos Números Complexos ($\forall x \in \mathbb{C}$), garantindo que a substituição por um número imaginário puro ($ix$) seja permitida, mantendo as propriedades analíticas da função exponencial real.</p>

<h3>IV.B. Derivação Passo a Passo da Fórmula de Euler</h3>
<p>Para demonstrar a fórmula, substituímos o argumento real $x$ por $ix$ na expansão da Série de Maclaurin para $e^x$:</p>
<div class="math-block">$$e^{ix} = \sum_{n=0}^{\infty} \frac{(ix)^n}{n!} = 1 + \frac{(ix)}{1!} + \frac{(ix)^2}{2!} + \frac{(ix)^3}{3!} + \frac{(ix)^4}{4!} + \frac{(ix)^5}{5!} + \cdots$$</div>
<p>Em seguida, aplicamos a regra cíclica das potências da unidade imaginária $i$: $i^1 = i$, $i^2 = -1$, $i^3 = -i$, $i^4 = 1$, e assim por diante.</p>
<p>Substituindo as potências de $i$:</p>
<div class="math-block">$$ e^{ix} = 1 + i \frac{x}{1!} + (-1) \frac{x^2}{2!} + (-i) \frac{x^3}{3!} + (1) \frac{x^4}{4!} + (i) \frac{x^5}{5!} + (-1) \frac{x^6}{6!} + \cdots $$</div>
<p>O passo crucial é reagrupar os termos, separando aqueles que não possuem $i$ (a parte real, correspondente às potências pares) dos termos que são multiplicados por $i$ (a parte imaginária, correspondente às potências ímpares):</p>
<div class="math-block">$$ e^{ix} = \left( 1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \frac{x^6}{6!} + \cdots \right) + i \left( \frac{x}{1!} - \frac{x^3}{3!} + \frac{x^5}{5!} - \frac{x^7}{7!} + \cdots \right) $$</div>
<p>Ao comparar esta separação com as expansões de Maclaurin previamente estabelecidas, observa-se que o primeiro parêntese é, por definição, a série de $\cos x$, e o segundo parêntese, multiplicado por $i$, é a série de $i \sin x$.</p>
<p>Consequentemente, a Fórmula de Euler está demonstrada:</p>
<div class="math-block">$$e^{ix} = \cos x + i \sin x$$</div>

<h3>IV.C. A Última Substituição: Obtendo a Identidade</h3>
<p>O passo final para obter a Identidade de Euler é escolher um valor particular para o argumento $x$ (ou $\theta$) na Fórmula de Euler. Ao tomar $x = \pi$ radianos, alcançamos o ponto onde a rotação complexa gera a máxima simplicidade:</p>
<div class="math-block">$$e^{i\pi} = \cos \pi + i \sin \pi$$</div>
<p>Como $\cos \pi = -1$ e $\sin \pi = 0$:</p>
<div class="math-block">$$e^{i\pi} = -1 + i(0)$$$$e^{i\pi} = -1$$</div>
<p>Rearranjando algebricamente, somando $1$ a ambos os lados, obtemos a Identidade de Euler: $e^{i\pi} + 1 = 0$.</p>
<p>Esta demonstração ilustra um princípio fundamental da Análise: um resultado simples e exato (zero) emerge da soma precisa e equilibrada de uma infinidade de termos complexos. O infinito, expresso pela série de Maclaurin, é o mecanismo indispensável que garante a finitude e a simplicidade da relação final.</p>

<h2>V. Impacto e Legado: A Matemática em Ação</h2>
<p>O mérito da Identidade de Euler estende-se muito além da beleza acadêmica; ela é um pilar da matemática aplicada e da física moderna, servindo como uma linguagem universal para descrever fenômenos oscilatórios e ondulatórios.</p>

<h3>V.A. Fundamento da Análise de Sinais e Ondas</h3>
<p>Na engenharia elétrica e no processamento de sinais, a Fórmula de Euler é indispensável. Ela permite que sinais senoidais, que são difíceis de manipular algebricamente, sejam representados como exponenciais complexas. Esta simplificação é crítica para a Transformada de Fourier e a Transformada de Laplace, ferramentas que decompõem sinais complexos em suas frequências constituintes e são a base de telecomunicações, análise de áudio e processamento de imagens.</p>
<p>Um exemplo notável é o modelamento da corrente alternada (AC) na engenharia elétrica, essencial para o desenvolvimento de virtualmente toda a eletrônica moderna. A versão mais completa ou geral da fórmula é usada para descrever essa corrente de maneira compacta e solúvel.</p>
<p>Além disso, na física quântica, a função de onda, que descreve o estado de uma partícula, envolve intrinsecamente a exponencial complexa $e^{i\theta}$. O termo exponencial complexo descreve a fase da partícula, incorporando a rotação de Euler na fundação da mecânica quântica. A Identidade de Euler, portanto, codifica a periodicidade e a oscilação inerentes à natureza na linguagem do crescimento exponencial.</p>

<h3>V.B. O Valor Pedagógico e a Unificação Conceitual</h3>
<p>A Identidade de Euler possui um imenso valor pedagógico ao atuar como um conector de diferentes ramos da matemática que, frequentemente, são ensinados isoladamente. Para o estudante, ela serve como uma ferramenta poderosa para demonstrar a unidade subjacente da disciplina. A compreensão da identidade força o aluno a conectar:</p>
<ul>
    <li><strong>Álgebra:</strong> O conceito de números complexos e a unidade $i$.</li>
    <li><strong>Geometria:</strong> As constantes $\pi$, $1$ e as funções $\cos/\sin$ no círculo unitário.</li>
    <li><strong>Cálculo e Análise:</strong> A constante $e$ e a representação de funções por séries infinitas.</li>
</ul>
<p>Abordagens pedagógicas que utilizam representações geométricas, como o Plano de Argand-Gauss, facilitam a transição dos conceitos algébricos para a visualização da rotação e do movimento no plano complexo. O estudo da Identidade de Euler mostra que o crescimento contínuo e os ciclos periódicos não são conceitos opostos, mas sim dualísticos, governados pela mesma estrutura matemática quando se expande o domínio para os números complexos.</p>

<h2>VI. Conclusão: A Unidade na Simplicidade</h2>
<p>A Identidade de Euler, $e^{i\pi} + 1 = 0$, permanece como o pináculo da elegância matemática. É a síntese concisa que prova a profunda coerência estrutural entre cinco constantes que definem seus respectivos domínios: a aritmética ($0, 1$), a geometria ($\pi$), o crescimento contínuo ($e$), e a abstração algébrica ($i$).</p>
<p>O que torna esta equação verdadeiramente deslumbrante é a sua capacidade de pegar a "imaginação" ($i$) e transformá-la no operador que permite ao "crescimento contínuo" ($e$) descrever a "circularidade" ($\pi$), resultando em uma simples oposição à "unidade" ($e^{i\pi} = -1$). Este resultado só é possível graças à presença oculta do infinito (as séries de potências) que é indispensável em sua dedução.</p>
<p>A Identidade de Euler é mais do que uma fórmula; é uma metaestrutura que codifica a harmonia fundamental da matemática, um legado duradouro do gênio de Leonhard Euler e um convite contínuo à exploração das conexões profundas que regem nosso universo.</p>

<h2>VII. Referências Bibliográficas e de Pesquisa</h2>
<ul>
    <li>Euler, L. (1748). Introductio in analysin infinitorum. Lausanne: Marcum-Michaelem Bousquet. (Publicação fundamental da Fórmula de Euler).</li>
    <li>Crease, R.P. (2011). As grandes equações: a história das fórmulas matemáticas mais importantes e os cientistas que as criaram. Zahar. (Contém referências ao contexto cultural e citações famosas).</li>
    <li>Eves, H. (1992). An Introduction to the History of Mathematics. (Contexto da introdução de $i$ por Euler).</li>
    <li>Séries de Taylor e Maclaurin. (Fundamento da demonstração analítica da Identidade de Euler).</li>
    <li>Devlin, K. (Citações sobre a beleza estética da equação).</li>
    <li>Fontes diversas sobre a interpretação geométrica e aplicações em engenharia e física.</li>
</ul>`
    },
    {
        id: 2,
        title: "O Teorema de Pitágoras",
        author: "Pitágoras de Samos",
        date: "28 de Setembro, 2025",
        category: "Geometria",
        image: "https://i.imgur.com/UFAirew.png",
        excerpt: "Um dos pilares da geometria, o Teorema de Pitágoras descreve a relação entre os lados de um triângulo retângulo. Sua utilidade vai muito além da sala de aula.",
        content: `<p>O Teorema de Pitágoras é um princípio fundamental da geometria Euclidiana. Ele afirma que, em um triângulo retângulo, o quadrado da hipotenusa (o lado oposto ao ângulo reto) é igual à soma dos quadrados dos outros dois lados (catetos).</p><p>Se chamarmos os catetos de $a$ e $b$ e a hipotenusa de $c$, a fórmula é expressa como:</p><div class="math-block">$$a^2 + b^2 = c^2$$</div><h2>Exemplo Prático</h2><p>Imagine um triângulo retângulo com catetos medindo 3 unidades e 4 unidades. Para encontrar o comprimento da hipotenusa, usamos o teorema: $c^2 = 3^2 + 4^2 = 9 + 16 = 25$. Portanto, $c = \sqrt{25} = 5$.</p><h2>Aplicações no Mundo Real</h2><p>O teorema é usado em diversas áreas, como arquitetura, navegação e design gráfico para calcular distâncias.</p>`
    },
    {
        id: 3,
        title: "O que são Integrais?",
        author: "Isaac Newton",
        date: "15 de Setembro, 2025",
        category: "Cálculo",
        image: "https://i.imgur.com/OEOVttz.png",
        excerpt: "As integrais são uma ferramenta poderosa do cálculo, usadas para encontrar áreas sob curvas, volumes de sólidos e muito mais. Vamos explorar o conceito fundamental.",
        content: `<p>Em sua essência, uma integral é uma forma de somar um número infinito de partes infinitamente pequenas. O conceito mais visual para entender uma integral definida é o cálculo da <strong>área sob uma curva</strong>.</p><p>A integral que representa a área sob a curva de $f(x) = x^2$ de $x=0$ até $x=1$ é escrita da seguinte forma:</p><div class="math-block">$$\int_{0}^{1} x^2 \,dx$$</div><p>Vamos quebrar essa notação:</p><ul><li>O símbolo $\int$ é o sinal de integral.</li><li>Os números $0$ e $1$ são os limites de integração.</li><li>$x^2$ é a função que estamos integrando.</li><li>$dx$ indica que estamos integrando em relação à variável $x$.</li></ul><p>Resolver esta integral nos daria a área exata, que é $\frac{1}{3}$.</p>`
    },
    {
        id: 4,
        title: "Resolvendo Equações do Primeiro Grau",
        author: "Al-Khwarizmi",
        date: "07 de Outubro, 2025",
        category: "Álgebra",
        image: "https://i.imgur.com/DsE3c5y.png",
        excerpt: "As equações do primeiro grau são a base da álgebra. Aprenda o passo a passo para encontrar o valor de uma incógnita e resolver problemas.",
        content: `<p>Uma equação do primeiro grau é uma sentença matemática que estabelece uma igualdade envolvendo uma ou mais incógnitas com expoente 1. A forma geral é:</p><div class="math-block">$$ax + b = c$$</div><p>Onde 'x' é a incógnita e 'a', 'b' e 'c' são números conhecidos, com 'a' diferente de zero.</p><h2>Passo a Passo para Resolver</h2><p>O objetivo é isolar a incógnita 'x'. Vejamos o exemplo $2x + 5 = 11$:</p><ul><li><strong>1. Subtraia 5 de ambos os lados:</strong> $2x + 5 - 5 = 11 - 5$, o que resulta em $2x = 6$.</li><li><strong>2. Divida ambos os lados por 2:</strong> $\frac{2x}{2} = \frac{6}{2}$.</li><li><strong>3. Encontre o resultado:</strong> $x = 3$.</li></ul><p>Este método garante que a igualdade seja mantida em todos os passos, revelando o valor da incógnita.</p>`
    },
    {
        id: 5,
        title: "Produtos Notáveis: O Quadrado da Soma",
        author: "Euclides de Alexandria",
        date: "02 de Outubro, 2025",
        category: "Álgebra",
        image: "https://i.imgur.com/pmxd2vv.png",
        excerpt: "Produtos notáveis são expressões algébricas que aparecem com frequência. Dominar o 'quadrado da soma' pode simplificar muitos cálculos.",
        content: `<p>Produtos notáveis são multiplicações que seguem um padrão regular. Um dos mais conhecidos é o <strong>quadrado da soma de dois termos</strong>. A fórmula é:</p><div class="math-block">$$(a + b)^2 = a^2 + 2ab + b^2$$</div><p>Isso significa que o quadrado da soma é igual ao quadrado do primeiro termo, mais duas vezes o produto do primeiro pelo segundo, mais o quadrado do segundo termo.</p><h2>Por que isso funciona?</h2><p>Podemos provar isso expandindo a expressão:</p><p>$(a + b)^2 = (a + b)(a + b)$</p><p>Aplicando a propriedade distributiva:</p><p>$a(a+b) + b(a+b) = a^2 + ab + ba + b^2$</p><p>Como $ab = ba$, simplificamos para:</p><p>$a^2 + 2ab + b^2$</p><h2>Exemplo Numérico</h2><p>Vamos calcular $102^2$ usando o produto notável: </p><p>$102^2 = (100 + 2)^2 = 100^2 + 2(100)(2) + 2^2 = 10000 + 400 + 4 = 10404$.</p>`
    },
    {
        id: 6,
        title: "Sistemas de Equações Lineares",
        author: "Carl Friedrich Gauss",
        date: "25 de Setembro, 2025",
        category: "Álgebra",
        image: "https://i.imgur.com/P2MlEhi.png",
        excerpt: "Como encontrar valores que satisfazem duas ou mais equações ao mesmo tempo? Explore o método da substituição para resolver sistemas lineares.",
        content: `<p>Um sistema de equações lineares é um conjunto de duas ou more equações com as mesmas incógnitas. O objetivo é encontrar um conjunto de valores que resolva todas as equações simultaneamente.</p><p>Considere o sistema:</p><div class="math-block">$$\begin{cases} x + y = 10 \\ x - y = 4 \end{cases}$$</div><h2>Método da Substituição</h2><p>Um dos métodos mais comuns para resolver sistemas é o da substituição.</p><ul><li><strong>1. Isole uma incógnita:</strong> Na primeira equação, podemos isolar 'x': $x = 10 - y$.</li><li><strong>2. Substitua na outra equação:</strong> Substituímos 'x' na segunda equação: $(10 - y) - y = 4$.</li><li><strong>3. Resolva a nova equação:</strong> $10 - 2y = 4 \Rightarrow -2y = -6 \Rightarrow y = 3$.</li><li><strong>4. Encontre a outra incógnita:</strong> Agora que temos $y=3$, substituímos de volta em $x = 10 - y$, resultando em $x = 10 - 3 = 7$.</li></ul><p>A solução do sistema é o par $(7, 3)$.</p>`
    },
    {
        id: 7,
        title: "Fatoração: Fator Comum em Evidência",
        author: "Sophie Germain",
        date: "20 de Setembro, 2025",
        category: "Álgebra",
        image: "https://i.imgur.com/ZWNa2BG.png",
        excerpt: "Fatorar é o processo de reescrever uma expressão como um produto de fatores. O método do fator comum é o ponto de partida para simplificar a álgebra.",
        content: `<p>Fatorar uma expressão algébrica significa transformá-la em uma multiplicação. O caso mais simples de fatoração é colocar o <strong>fator comum em evidência</strong>. Isso é o processo inverso da propriedade distributiva.</p><p>Considere a expressão:</p><div class="math-block">$$5x + 5y$$</div><p>O número 5 aparece em ambos os termos. Portanto, ele é o fator comum.</p><h2>Como Fatorar</h2><p>Colocamos o fator comum (5) em evidência, e dentro dos parênteses, colocamos o resultado da divisão de cada termo original pelo fator comum:</p><ul><li>$5x \div 5 = x$</li><li>$5y \div 5 = y$</li></ul><p>Assim, a forma fatorada é:</p><div class="math-block">$$5(x + y)$$</div><p>Verificação: Se aplicarmos a distributiva, $5(x+y)$, voltamos para $5x+5y$.</p>`
    },
    {
        id: 8,
        title: "Introdução à Função Afim",
        author: "René Descartes",
        date: "18 de Setembro, 2025",
        category: "Álgebra",
        image: "https://i.imgur.com/lNTq9tv.png",
        excerpt: "As funções afim modelam muitas situações do mundo real, como o preço a pagar em uma corrida de táxi. Entenda sua estrutura e como seu gráfico é uma reta.",
        content: `<p>Uma função afim, também conhecida como função do 1º grau, é toda função que pode ser escrita na forma:</p><div class="math-block">$$f(x) = ax + b$$</div><p>Onde 'a' e 'b' são números reais e $a \neq 0$.</p><ul><li><strong>$a$:</strong> É chamado de <strong>coeficiente angular</strong>. Ele determina a inclinação da reta. Se $a > 0$, a reta é crescente. Se $a < 0$, a reta é decrescente.</li><li><strong>$b$:</strong> É chamado de <strong>coeficiente linear</strong>. Ele indica o ponto onde o gráfico da função corta o eixo y.</li></ul><h2>Exemplo Gráfico</h2><p>O gráfico da função $f(x) = 2x + 1$ é uma reta crescente que corta o eixo y no ponto $(0, 1)$. Para cada unidade que 'x' aumenta, 'y' aumenta duas unidades.</p><p>As funções afim são ferramentas essenciais para descrever relações lineares em diversas áreas da ciência e do dia a dia.</p>`
    }
];