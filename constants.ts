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
        content: `<p>A Identidade de Euler é frequentemente citada como um exemplo primordial de beleza matemática. A equação é a seguinte:</p><div class="math-block">$$e^{i\pi} + 1 = 0$$</div><p>Esta fórmula única consegue unir cinco das constantes mais importantes da matemática em uma única e elegante expressão:</p><ul><li>O número <strong>$e$</strong>, a base dos logaritmos naturais.</li><li>A unidade imaginária <strong>$i$</strong>, que satisfaz $i^2 = -1$.</li><li>O número <strong>$\pi$</strong>, a razão entre a circunferência de um círculo e seu diâmetro.</li><li>O número <strong>1</strong>, o elemento neutro da multiplicação.</li><li>O número <strong>0</strong>, o elemento neutro da adição.</li></ul><h2>Como isso é possível?</h2><p>A identidade é um caso especial da Fórmula de Euler, que afirma que para qualquer número real $x$, temos:</p><div class="math-block">$$e^{ix} = \cos(x) + i\sin(x)$$</div><p>Se substituirmos $x$ por $\pi$, obtemos: $e^{i\pi} = \cos(\pi) + i\sin(\pi)$. Sabendo que $\cos(\pi) = -1$ e $\sin(\pi) = 0$, a equação se simplifica para: $e^{i\pi} = -1$. Finalmente, adicionando 1 a ambos os lados, chegamos à famosa identidade.</p>`
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