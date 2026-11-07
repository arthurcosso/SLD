// Base de Conhecimento Completa - Sistemas Lógicos Digitais (Módulo I e Módulo II)
// Escrita seguindo o padrão ASD-STE100 Didático:
// 1. Frases curtas (máximo 20 palavras por instrução).
// 2. Voz ativa e verbos no imperativo para procedimentos.
// 3. Uma palavra = um único significado técnico.
// 4. Contraste direto entre o texto acadêmico dos slides e a tradução STE-100.

window.SLD_DATA = {
  steRules: [
    {
      rule: "Regra 1: Frases Curtas e Diretas",
      desc: "Use no máximo 20 palavras por frase de instrução. Coloque apenas uma ideia por frase."
    },
    {
      rule: "Regra 2: Voz Ativa sempre",
      desc: "Diga QUEM faz O QUÊ. Em vez de 'O bit é invertido pela porta NOT', use 'A porta NOT inverte o bit'."
    },
    {
      rule: "Regra 3: Um Termo = Um Significado",
      desc: "Evite sinônimos confusos. Nível ALTO é sempre 1. Nível BAIXO é sempre 0."
    },
    {
      rule: "Regra 4: Passos Imperativos Numerados",
      desc: "Toda conta ou projeto vira uma receita passo a passo começando com um verbo de ação (Divida, Some, Agrupe, Conecte)."
    }
  ],

  units: [
    // =========================================================================
    // MÓDULO I - PARTE I: SINAIS DIGITAIS, BASES E CONVERSÃO
    // =========================================================================
    {
      id: "u1",
      module: "Módulo I",
      part: "Parte I",
      pages: "Págs. 1–19",
      title: "1. Sinais Digitais, Tensões e Classificação",
      labId: "lab-signals",
      shortGoal: "Entender o que são bits 0 e 1 na eletricidade e diferenciar sinais analógicos, amostrados, quantizados e digitais.",
      steSummary: [
        "Um sistema digital usa apenas dois dígitos: 0 (desligado / nível BAIXO) e 1 (ligado / nível ALTO).",
        "O circuito digital não mede o valor exato da tensão. Ele verifica em qual faixa a tensão está.",
        "Na tecnologia padrão de 5V: de 0V a 0,8V vale 0; de 2V a 5V vale 1; entre 0,8V e 2V é uma faixa inválida.",
        "Um sinal analógico varia continuamente. Um sinal digital muda passo a passo (discreto no tempo e na amplitude).",
        "Variáveis de estado guardam o passado do sistema. Elas separam circuitos sem memória (combinacionais) de circuitos com memória (sequenciais)."
      ],
      translations: [
        {
          academic: "Slide Pág. 16: 'Para um sinal amostrado, pode-se considerá-lo um vetor com índice inteiro e elementos reais. Para um sinal digital, um vetor com índice inteiro e elementos inteiros.'",
          ste: "Sinal Amostrado: você mede o sinal em tempos fixos (1s, 2s, 3s), mas o valor medido ainda tem casas decimais infinitas. Sinal Digital: o tempo é fixo E o valor medido é arredondado para um número inteiro (0s e 1s)."
        },
        {
          academic: "Slide Pág. 17: 'Variáveis de estado é o conjunto mínimo de variáveis que, conjuntamente com as entradas em t0, define as saídas para t >= t0.'",
          ste: "Variável de estado é a memória do circuito. Para saber a saída futura, você precisa saber a entrada de agora E o estado guardado na memória."
        }
      ],
      stepByStep: {
        title: "Procedimento STE-100: Como Classificar Qualquer Sinal",
        steps: [
          "Olhe para o eixo do Tempo (horizontal): se não há pausas, o tempo é Contínuo. Se só existem pontos separados, houve Amostragem.",
          "Olhe para o eixo do Valor/Tensão (vertical): se assume qualquer valor quebrado livremente, é Contínuo. Se só aceita degraus fixos, houve Quantização.",
          "Combine os dois: Tempo Contínuo + Valor Contínuo = Analógico.",
          "Tempo Discreto (pontos) + Valor em Degraus Fixos = Sinal Digital (Amostragem + Quantização)."
        ]
      },
      tableData: {
        caption: "Tabela de Classificação de Sinais (Módulo I - Pág. 16)",
        headers: ["Tipo de Sinal", "Tempo (Eixo X)", "Amplitude / Valor (Eixo Y)", "Representação em Vetor"],
        rows: [
          ["Analógico", "Contínuo", "Contínua", "Função contínua f(t)"],
          ["Amostrado", "Discreto (Amostragem)", "Contínua", "Índice inteiro, valores Reais"],
          ["Quantizado", "Contínuo", "Discreta (Quantização)", "Degraus no tempo contínuo"],
          ["Digital", "Discreto (Amostragem)", "Discreta (Quantização)", "Índice inteiro, valores Inteiros"]
        ]
      },
      exercises: [
        {
          id: "u1-q1",
          question: "Em um circuito digital TTL padrão (5V), uma entrada recebe 3,7 V no Caso 2 e 5,0 V no Caso 1 (Slide Pág. 7). Como o circuito responde?",
          options: [
            "Responde exatamente igual nos dois casos, pois 3,7 V e 5,0 V estão na faixa de Binário 1 (acima de 2,0 V).",
            "Responde diferente, pois 3,7 V produz uma saída menor que 5,0 V.",
            "3,7 V cai na faixa de tensão inválida.",
            "O circuito queima com 5,0 V."
          ],
          correct: 0,
          steExplanation: "Regra STE-100: Qualquer tensão entre 2,0 V e 5,0 V representa o nível lógico 1. O circuito digital responde ao nível binário (1) e não ao valor exato da tensão."
        },
        {
          id: "u1-q2",
          question: "Qual combinação define corretamente um Sinal Digital (Slide Pág. 16)?",
          options: [
            "Apenas amostragem do tempo.",
            "Apenas quantização da variável dependente.",
            "Amostragem (tempo discreto) + Quantização (amplitude discreta), gerando um vetor de índices inteiros e valores inteiros.",
            "Todas as variáveis contínuas no tempo."
          ],
          correct: 2,
          steExplanation: "Para ser Digital, o sinal precisa passar por dois processos: Amostragem (discretiza o tempo) e Quantização (discretiza o valor em níveis inteiros)."
        },
        {
          id: "u1-q3",
          question: "Segundo o Slide Pág. 19, quais são as duas principais desvantagens dos sistemas digitais?",
          options: [
            "São difíceis de programar e sofrem muito com ruído elétrico.",
            "O mundo real é analógico (digitalizar sempre gera algum erro) e processar sinais digitais leva tempo.",
            "Não podem ser guardados em memória e ocupam muitos chips.",
            "Não conseguem fazer somas nem subtrações."
          ],
          correct: 1,
          steExplanation: "O mundo físico é analógico. Converter o sinal real para digital causa erro de arredondamento (quantização) e exige tempo de processamento."
        },
        {
          id: "u1-q4",
          question: "Um sinal de vídeo colorido na tela é classificado matematicamente quanto ao número de variáveis independentes como (Slide Pág. 11):",
          options: [
            "Unidimensional: f(t), como o áudio.",
            "Bidimensional: f(x, y), como uma foto estática.",
            "Tridimensional: f(x, y, t), pois varia na largura (x), altura (y) e no tempo (t).",
            "Adimensional."
          ],
          correct: 2,
          steExplanation: "Áudio tem 1 dimensão: f(t). Imagem tem 2 dimensões: f(x,y). Vídeo é uma imagem mudando no tempo, logo tem 3 dimensões: f(x,y,t)."
        }
      ]
    },

    {
      id: "u2",
      module: "Módulo I",
      part: "Parte I",
      pages: "Págs. 20–31, 37–38",
      title: "2. Bases Numéricas, Conversões e Transmissão",
      labId: "lab-converter",
      shortGoal: "Converter números inteiros e fracionários entre Binário, Decimal e Hexadecimal, e distinguir transmissão Série de Paralela.",
      steSummary: [
        "Todo sistema posicional usa pesos. No Binário (base 2), os pesos inteiros da direita para a esquerda são: 1, 2, 4, 8, 16, 32, 64, 128.",
        "Depois da vírgula binária (parte fracionária), os pesos são: 0,5 (1/2), 0,25 (1/4), 0,125 (1/8), 0,0625 (1/16).",
        "LSB (Least Significant Bit) é o bit da extrema direita (menor peso). MSB (Most Significant Bit) é o bit da extrema esquerda (maior peso).",
        "Transmissão Paralela envia todos os bits de uma vez usando vários fios (rápida). Transmissão em Série envia um bit por vez em 1 único fio (simples).",
        "No Hexadecimal (base 16), cada dígito (0 a 9 e A=10 até F=15) equivale exatamente a um grupo de 4 bits (1 nibble)."
      ],
      translations: [
        {
          academic: "Slide Pág. 28: 'Qualquer número binário pode ser convertido em seu decimal equivalente, simplesmente somando os pesos das várias posições em que o número binário tiver um bit 1.'",
          ste: "Para converter Binário para Decimal: escreva os pesos (1, 2, 4, 8, 16...) em cima de cada bit. Some apenas os pesos onde o bit embaixo for 1."
        },
        {
          academic: "Slide Pág. 29/37/38: 'Método de divisões sucessivas para inteiros e multiplicações sucessivas para frações.'",
          ste: "Parte inteira: divida por 2 até zerar e leia os restos de baixo para cima. Parte depois da vírgula: multiplique por 2 e anote a parte inteira de cima para baixo."
        }
      ],
      stepByStep: {
        title: "Procedimento STE-100: Converter Decimal com Vírgula (ex: 46,6875) para Binário",
        steps: [
          "Separe a parte inteira (46) da parte fracionária (0,6875).",
          "Divida 46 sucessivamente por 2 anotando os restos: 46/2=23 (R=0, LSB); 23/2=11 (R=1); 11/2=5 (R=1); 5/2=2 (R=1); 2/2=1 (R=0); 1/2=0 (R=1, MSB). Leia do último ao primeiro: 101110.",
          "Multiplique a fração por 2 repetidamente guardando o inteiro: 0,6875*2 = 1,375 (guarde 1); 0,375*2 = 0,75 (guarde 0); 0,75*2 = 1,5 (guarde 1); 0,5*2 = 1,0 (guarde 1). Leia de cima para baixo: 1011.",
          "Junte os dois resultados com a vírgula: 46,6875 (base 10) = 101110,1011 (base 2)."
        ]
      },
      tableData: {
        caption: "Tabela de Conversão Rápida: Decimal, Binário e Hexadecimal (Pág. 31)",
        headers: ["Decimal", "Hexadecimal", "Binário (4 bits)", "Cálculo de Pesos (8-4-2-1)"],
        rows: [
          ["0", "0", "0000", "0"],
          ["5", "5", "0101", "4 + 1 = 5"],
          ["9", "9", "1001", "8 + 1 = 9"],
          ["10", "A", "1010", "8 + 2 = 10"],
          ["11", "B", "1011", "8 + 2 + 1 = 11"],
          ["12", "C", "1100", "8 + 4 = 12"],
          ["13", "D", "1101", "8 + 4 + 1 = 13"],
          ["14", "E", "1110", "8 + 4 + 2 = 14"],
          ["15", "F", "1111", "8 + 4 + 2 + 1 = 15"]
        ]
      },
      exercises: [
        {
          id: "u2-q1",
          question: "Qual é o valor decimal do número binário 11011₂ (exemplo da Pág. 28)?",
          options: [
            "25",
            "27",
            "29",
            "19"
          ],
          correct: 1,
          steExplanation: "Coloque os pesos da direita para a esquerda (1, 2, 4, 8, 16) sobre 1-1-0-1-1. Some onde há bit 1: 16 + 8 + 0 + 2 + 1 = 27."
        },
        {
          id: "u2-q2",
          question: "Converta o número fracionário 0,6875₁₀ para binário (exemplo da Pág. 38):",
          options: [
            "0,1101₂",
            "0,1011₂",
            "0,0111₂",
            "0,1001₂"
          ],
          correct: 1,
          steExplanation: "Passo 1: 0,6875 × 2 = 1,375 (inteiro 1). Passo 2: 0,375 × 2 = 0,75 (inteiro 0). Passo 3: 0,75 × 2 = 1,5 (inteiro 1). Passo 4: 0,5 × 2 = 1,0 (inteiro 1). Resultado: 0,1011₂."
        },
        {
          id: "u2-q3",
          question: "Qual a diferença entre Transmissão Paralela e Transmissão em Série (Págs. 24 e 25)?",
          options: [
            "A série usa 8 fios e a paralela usa 1 fio.",
            "A paralela envia todos os bits simultaneamente (1 linha por bit); a série envia um bit por vez por uma única linha.",
            "A transmissão em série é sempre mais rápida que a paralela.",
            "Ambas enviam apenas letras e não números."
          ],
          correct: 1,
          steExplanation: "Paralela = vários fios lado a lado, todos os bits viajam no mesmo instante. Série = fila indiana, um bit após o outro em um único fio."
        },
        {
          id: "u2-q4",
          question: "Quais são as 5 partes principais de um computador digital mostradas no diagrama da Pág. 27?",
          options: [
            "Teclado, Mouse, Monitor, Cabo e Fonte.",
            "Entrada, Saída, Memória, Unidade Lógica/Aritmética (ULA) e Unidade de Controle (as duas últimas formam a CPU).",
            "Transistor, Resistor, Capacitor, Indutor e Diodo.",
            "Binário, Decimal, Hexadecimal, BCD e Gray."
          ],
          correct: 1,
          steExplanation: "O computador digital tem 5 blocos: Entrada, Saída, Memória, Controle e Unidade Lógica/Aritmética (sendo que Controle + ULA formam a CPU)."
        }
      ]
    },

    {
      id: "u3",
      module: "Módulo I",
      part: "Parte I",
      pages: "Págs. 32–44",
      title: "3. Códigos BCD, Gray, Termos e Alfanuméricos",
      labId: "lab-converter",
      shortGoal: "Diferenciar Conversão Binária de Codificação BCD, converter Binário <-> Gray e calcular o número mínimo de bits para M elementos.",
      steSummary: [
        "NÃO CONFUNDA: Converter 13 para binário puro dá 1101₂. Codificar 13 em BCD troca cada dígito decimal por 4 bits separados: 1 vira 0001 e 3 vira 0011 (0001 0011 BCD).",
        "No código BCD, os códigos de 1010 (10) a 1111 (15) são INVÁLIDOS, pois um dígito decimal vai apenas de 0 a 9.",
        "O Código Gray muda apenas 1 bit de um número para o próximo. Isso evita leituras falsas em sensores mecânicos.",
        "Vocabulário fixo: 1 Bit = 1 dígito (0 ou 1). 1 Nibble = 4 bits. 1 Byte = 8 bits. Palavra (Word) = grupo de bits que o processador opera.",
        "Para representar M itens diferentes, o número mínimo de bits (n) deve obedecer: 2ⁿ ≥ M."
      ],
      translations: [
        {
          academic: "Slide Pág. 33: 'A fim de reduzir a probabilidade de um circuito digital interpretar mal uma entrada que está mudando, desenvolveu-se o código Gray.'",
          ste: "Quando o binário muda de 3 (011) para 4 (100), três bits trocam ao mesmo tempo. Se um atrasar, o circuito lê errado. No código Gray, só 1 bit muda por vez!"
        },
        {
          academic: "Slide Pág. 44: 'Não confunda conversão com codificação de um número decimal a um binário: 13₁₀ = 1101₂ (Conversão) vs 13₁₀ <=> 00010011 BCD (Codificação).'",
          ste: "Conversão = divide o número todo por 2. Codificação BCD = traduz cada algarismo decimal isoladamente para um bloco de 4 bits."
        }
      ],
      stepByStep: {
        title: "Procedimento STE-100: Converter Binário para Código Gray (e vice-versa)",
        steps: [
          "BINÁRIO PARA GRAY (Passo 1): Copie o primeiro bit da esquerda (MSB) exatamente igual.",
          "BINÁRIO PARA GRAY (Passo 2): Compare cada bit binário com o vizinho à direita. Se forem IGUAIS, escreva 0. Se forem DIFERENTES, escreva 1.",
          "GRAY PARA BINÁRIO (Passo 1): Copie o primeiro bit da esquerda (MSB) do Gray para o Binário.",
          "GRAY PARA BINÁRIO (Passo 2): Compare o bit Binário que você acabou de achar com o próximo bit Gray. Se forem IGUAIS, escreva 0. Se forem DIFERENTES, escreva 1."
        ]
      },
      tableData: {
        caption: "Comparação entre Sistemas e Códigos (Pág. 35)",
        headers: ["Decimal", "Binário Puro", "Hexadecimal", "BCD (Codificação)", "Código Gray"],
        rows: [
          ["0", "0000", "0", "0000", "0000"],
          ["1", "0001", "1", "0001", "0001"],
          ["2", "0010", "2", "0010", "0011"],
          ["3", "0011", "3", "0011", "0010"],
          ["4", "0100", "4", "0100", "0110"],
          ["7", "0111", "7", "0111", "0100"],
          ["8", "1000", "8", "1000", "1100"],
          ["9", "1001", "9", "1001", "1101"],
          ["10", "1010", "A", "0001 0000", "1111"],
          ["13", "1101", "D", "0001 0011", "1011"]
        ]
      },
      exercises: [
        {
          id: "u3-q1",
          question: "Como o número decimal 874₁₀ é representado em código BCD (Slide Pág. 32)?",
          options: [
            "1101101010₂",
            "1000 0111 0100 BCD",
            "0874 BCD",
            "1000 0111 0010 BCD"
          ],
          correct: 1,
          steExplanation: "Em BCD, convertemos cada dígito decimal separadamente para 4 bits: 8 = 1000, 7 = 0111, 4 = 0100. Juntando: 1000 0111 0100."
        },
        {
          id: "u3-q2",
          question: "Converta o número binário 1011₂ (11 em decimal) para Código Gray (Págs. 33 e 35):",
          options: [
            "1110",
            "1010",
            "0100",
            "1101"
          ],
          correct: 0,
          steExplanation: "1º bit copia: 1. Compare 1º e 2º (1 e 0 são diferentes -> 1). Compare 2º e 3º (0 e 1 são diferentes -> 1). Compare 3º e 4º (1 e 1 são iguais -> 0). Resultado Gray: 1110."
        },
        {
          id: "u3-q3",
          question: "Precisamos codificar 50 peças diferentes de um estoque em binário. Qual o número mínimo de bits (n) necessário segundo a regra 2ⁿ ≥ M (Pág. 39)?",
          options: [
            "5 bits (pois 2⁵ = 32)",
            "6 bits (pois 2⁵ = 32 < 50 e 2⁶ = 64 ≥ 50)",
            "7 bits (pois 2⁷ = 128)",
            "50 bits"
          ],
          correct: 1,
          steExplanation: "Com 5 bits temos apenas 2⁵ = 32 códigos (falta para 50). Com 6 bits temos 2⁶ = 64 códigos, que é ≥ 50. Logo, n = 6 bits."
        },
        {
          id: "u3-q4",
          question: "O código ASCII padrão tem 7 bits e representa quantos caracteres? E quantos bits tem um Nibble e um Byte (Págs. 36 e 41)?",
          options: [
            "ASCII = 128 caracteres (2⁷); Nibble = 4 bits; Byte = 8 bits.",
            "ASCII = 256 caracteres; Nibble = 8 bits; Byte = 4 bits.",
            "ASCII = 64 caracteres; Nibble = 2 bits; Byte = 16 bits.",
            "ASCII = 100 caracteres; Nibble = 4 bits; Byte = 10 bits."
          ],
          correct: 0,
          steExplanation: "ASCII usa 7 bits: 2⁷ = 128 representações. Um Byte tem sempre 8 bits, e metade de um Byte é um Nibble (4 bits)."
        }
      ]
    },

    {
      id: "u4",
      module: "Módulo I",
      part: "Parte I",
      pages: "Págs. 45–54",
      title: "4. Aritmética Binária, Soma BCD e Paridade",
      labId: "lab-converter",
      shortGoal: "Somar, subtrair (Complemento de 2), corrigir somas BCD (+6) e calcular o bit de Paridade Par e Ímpar.",
      steSummary: [
        "Regras da Adição Binária: 0+0=0; 0+1=1; 1+1=0 (e vai 1 para a próxima coluna); 1+1+1=1 (e vai 1).",
        "Complemento de 1: troque todos os 0s por 1s e 1s por 0s. Complemento de 2: faça o Complemento de 1 e some 1 ao resultado.",
        "Na Soma BCD: se a soma de 4 bits der maior que 9 (1010 a 1111) ou gerar Carry Out, some 6 (0110₂) para corrigir o resultado.",
        "Bit de Paridade detecta erros de transmissão causados por ruído elétrico.",
        "Paridade PAR: escolha o bit extra para que a quantidade total de bits '1' seja um número PAR. Paridade ÍMPAR: o total de '1's deve ficar ÍMPAR."
      ],
      translations: [
        {
          academic: "Slide Pág. 48: 'Note que o resultado é maior que nove, mas deverá ter dois dígitos. Para corrigir some seis e não se esqueça do Carry Out.'",
          ste: "Por que somar 6 no BCD? Porque 4 bits contam até 15 (16 estados), mas o BCD só usa 10 estados (0 a 9). Sobram 6 estados inválidos. Somar 6 (0110₂) pula esses 6 estados inválidos!"
        }
      ],
      stepByStep: {
        title: "Procedimento STE-100: Como Somar em BCD (Ex: 8 + 5 = 13)",
        steps: [
          "Converta cada número para 4 bits: 8 = 1000 e 5 = 0101.",
          "Some normalmente em binário: 1000 + 0101 = 1101 (que vale 13).",
          "Verifique se passou de 9: como 13 > 9, o código 1101 é inválido em BCD.",
          "Some 6 (0110₂) para corrigir: 1101 + 0110 = 1 0011.",
          "Separe os grupos de 4 bits: 0001 (1) e 0011 (3) -> Resultado BCD correto: 13!"
        ]
      },
      tableData: {
        caption: "Resumo de Paridade Par vs. Paridade Ímpar (Págs. 52–54)",
        headers: ["Dado Original", "Quantidade de '1's", "Bit Paridade PAR (Total Par)", "Bit Paridade ÍMPAR (Total Ímpar)"],
        rows: [
          ["1011", "3 (ímpar)", "1 -> fica 11011 (4 uns)", "0 -> fica 01011 (3 uns)"],
          ["1111", "4 (par)", "0 -> fica 01111 (4 uns)", "1 -> fica 11111 (5 uns)"],
          ["1000011", "3 (ímpar)", "1 -> fica 11000011 (4 uns)", "0 -> fica 01000011 (3 uns)"]
        ]
      },
      exercises: [
        {
          id: "u4-q1",
          question: "Qual é o Complemento de 1 e o Complemento de 2 do número binário 0101₂ (5 em decimal) (Pág. 46)?",
          options: [
            "Complemento de 1 = 1010; Complemento de 2 = 1011.",
            "Complemento de 1 = 1011; Complemento de 2 = 1010.",
            "Complemento de 1 = 0101; Complemento de 2 = 0110.",
            "Complemento de 1 = 1111; Complemento de 2 = 0000."
          ],
          correct: 0,
          steExplanation: "Passo 1 (Complemento de 1): inverta cada bit de 0101 -> 1010. Passo 2 (Complemento de 2): some 1 ao resultado -> 1010 + 1 = 1011."
        },
        {
          id: "u4-q2",
          question: "Na soma aritmética BCD de 8 (1000) + 5 (0101), obtemos 1101. O que devemos fazer a seguir (Págs. 48–49)?",
          options: [
            "Deixar 1101 como resposta final.",
            "Somar 6 (0110₂) porque 1101 é maior que 9, obtendo Carry=1 e 0011 (0001 0011 = 13 em BCD).",
            "Subtrair 6 (0110₂).",
            "Inverter todos os bits."
          ],
          correct: 1,
          steExplanation: "Em BCD, sempre que a soma de 4 bits passa de 9 (1001), somamos 6 (0110₂). 1101 + 0110 = 0001 0011 (1 e 3)."
        },
        {
          id: "u4-q3",
          question: "Desejamos transmitir o grupo binário 1011 usando o método de Paridade PAR (Pág. 53). Qual bit de paridade deve ser anexado?",
          options: [
            "Bit 0, pois 1011 já tem número par de bits.",
            "Bit 1, pois 1011 tem três bits '1' (ímpar), e anexando 1 ficamos com quatro bits '1' (11011).",
            "Dois bits 11.",
            "Não é possível usar paridade par."
          ],
          correct: 1,
          steExplanation: "O grupo 1011 possui três dígitos '1'. Para que o total de '1's seja PAR, adicionamos um bit de paridade igual a 1, totalizando quatro '1's (11011)."
        }
      ]
    },

    // =========================================================================
    // MÓDULO I - PARTE II: LÓGICA BINÁRIA, PORTAS E ÁLGEBRA BOOLEANA
    // =========================================================================
    {
      id: "u5",
      module: "Módulo I",
      part: "Parte II",
      pages: "Págs. 55–74",
      title: "5. Portas Lógicas Básicas (AND, OR, NOT) e Tabelas-Verdade",
      labId: "lab-gates",
      shortGoal: "Dominar as portas AND, OR e NOT, a ordem de precedência nas expressões e a leitura de circuitos lógicos.",
      steSummary: [
        "Porta OR (OU, símbolo '+'): A saída é 1 se PELO MENOS UMA entrada for 1. Só dá 0 quando todas as entradas são 0. (Funciona como chaves em paralelo).",
        "Porta AND (E, símbolo '.'): A saída é 1 SOMENTE se TODAS as entradas forem 1. Se qualquer entrada for 0, a saída é 0. (Funciona como chaves em série).",
        "Porta NOT (Inversor, barra ou aspa A'): Tem 1 única entrada e inverte o valor (0 vira 1; 1 vira 0). A bolha no símbolo indica inversão.",
        "Regra de Precedência: Em uma expressão sem parênteses, faça primeiro o NOT, depois o AND (multiplicação lógica) e por último o OR (soma lógica).",
        "Tríade Fundamental: Expressão Booleana, Tabela-Verdade e Diagrama de Portas descrevem exatamente a mesma função lógica!"
      ],
      translations: [
        {
          academic: "Slide Pág. 59: 'Nota: a operação 1 + 1 = 2₁₀ não é o mesmo que 1 + 1 = 1₂ (ambas estão corretas).'",
          ste: "Na Álgebra Booleana, o sinal '+' NÃO é soma aritmética, ele significa 'OU' (OR). 'Ligado OU Ligado' continua 'Ligado' (1 + 1 = 1)."
        },
        {
          academic: "Slide Pág. 72: 'Diferença entre x = A' + B e x = (A + B)''",
          ste: "Em A' + B, o inversor fica ANTES da porta OR (só inverte o A). Em (A + B)', o inversor fica DEPOIS da porta OR (inverte o resultado final da soma)."
        }
      ],
      stepByStep: {
        title: "Procedimento STE-100: Como Montar a Tabela-Verdade de Qualquer Circuito",
        steps: [
          "Conte o número de entradas (n). O número de linhas da tabela será sempre 2ⁿ (2 entradas = 4 linhas; 3 entradas = 8 linhas; 4 entradas = 16 linhas).",
          "Preencha as colunas de entrada contando em binário de 0 até 2ⁿ - 1.",
          "Crie colunas intermediárias para cada porta do circuito (como u, v, w na Pág. 88).",
          "Resolva primeiro os inversores (NOT), depois as portas AND e por fim as portas OR para achar a saída x."
        ]
      },
      tableData: {
        caption: "Tabelas-Verdade das 3 Operações Fundamentais (Pág. 60)",
        headers: ["Entrada A", "Entrada B", "AND (A · B)", "OR (A + B)", "NOT A (A')"],
        rows: [
          ["0", "0", "0", "0", "1"],
          ["0", "1", "0", "1", "1"],
          ["1", "0", "0", "1", "0"],
          ["1", "1", "1", "1", "0"]
        ]
      },
      exercises: [
        {
          id: "u5-q1",
          question: "Na expressão lógica x = A · B + C (sem parênteses, Pág. 71), qual operação deve ser executada primeiro?",
          options: [
            "A operação OR (B + C) primeiro.",
            "A operação AND (A · B) primeiro, e o resultado entra em uma porta OR com C.",
            "Tanto faz a ordem, o resultado é igual.",
            "Nenhuma, pois falta um inversor."
          ],
          correct: 1,
          steExplanation: "Sem parênteses, a operação AND (.) tem prioridade sobre a operação OR (+), assim como a multiplicação vem antes da soma."
        },
        {
          id: "u5-q2",
          question: "Para o circuito da Pág. 87 com expressão x = (A + B)(B' + C), qual é o valor da saída x quando A = 0, B = 1 e C = 0?",
          options: [
            "x = 1",
            "x = 0",
            "x = 2",
            "Indefinido"
          ],
          correct: 1,
          steExplanation: "Substitua os valores: A + B = 0 + 1 = 1. Na segunda porta: como B = 1, B' = 0; logo B' + C = 0 + 0 = 0. Por fim, o AND entre os dois: 1 · 0 = 0."
        },
        {
          id: "u5-q3",
          question: "Um sistema de alarme químico (Pág. 65) deve disparar se a Temperatura ficar alta (TH = 1) OU se a Pressão ficar alta (PH = 1). Qual porta lógica conecta os sensores ao alarme?",
          options: [
            "Porta NOT",
            "Porta AND",
            "Porta OR",
            "Chave aberta"
          ],
          correct: 2,
          steExplanation: "Basta UMA condição de perigo (Temperatura alta OU Pressão alta) para acionar o alarme. Isso é a definição exata da porta OR."
        }
      ]
    },

    {
      id: "u6",
      module: "Módulo I",
      part: "Parte II",
      pages: "Págs. 75–95",
      title: "6. Álgebra Booleana, DeMorgan, NAND/NOR/XOR e Tempo",
      labId: "lab-gates",
      shortGoal: "Aplicar as 12 identidades booleanas, os Teoremas de DeMorgan, portas XOR/XNOR e a universalidade das portas NAND e NOR.",
      steSummary: [
        "Teorema de DeMorgan 1: (X · Y)' = X' + Y' (Quebre a barra longa e troque o AND por OR). Logo, uma porta NAND equivale a uma OR com entradas invertidas.",
        "Teorema de DeMorgan 2: (X + Y)' = X' · Y' (Quebre a barra longa e troque o OR por AND). Logo, uma porta NOR equivale a uma AND com entradas invertidas.",
        "Porta XOR (OU-Exclusivo, ⊕): Saída é 1 quando as entradas são DIFERENTES (X'Y + XY').",
        "Porta XNOR (Coincidência): Saída é 1 quando as entradas são IGUAIS (XY + X'Y').",
        "Universalidade: Você pode construir qualquer circuito (NOT, AND, OR, XOR) usando APENAS portas NAND ou APENAS portas NOR."
      ],
      translations: [
        {
          academic: "Slide Pág. 77–78: 'O complemento de duas ou mais variáveis submetidas a uma operação AND é equivalente a uma operação OR entre os complementos das variáveis individuais.'",
          ste: "Regra prática de DeMorgan: 'Quebre a barra em cima das letras e troque o sinal do meio' (de '.' para '+' ou de '+' para '.')."
        },
        {
          academic: "Slide Pág. 75: 'Identidade 10 (Absorção): A + A·B = A e Identidade 11 (Eliminação): A + A'·B = A + B.'",
          ste: "Na Absorção (A + AB), o A sozinho 'engole' o termo AB, sobrando só A. Na Eliminação (A + A'B), o A' colado no B desaparece, sobrando A + B."
        }
      ],
      stepByStep: {
        title: "Procedimento STE-100: Como Fazer NOT, AND e OR Usando Apenas Portas NAND (Pág. 92)",
        steps: [
          "Para fazer um NOT (Inversor): Ligue a mesma entrada A nas duas pernas de uma porta NAND. Saída: (A · A)' = A'.",
          "Para fazer um AND: Passe A e B por uma NAND (dá (AB)') e ligue a saída em outra NAND configurada como inversor. Saída: ((AB)')' = AB.",
          "Para fazer um OR: Inverta A com uma NAND (dá A'), inverta B com outra NAND (dá B') e ligue ambas em uma 3ª NAND. Por DeMorgan: (A' · B')' = A + B."
        ]
      },
      tableData: {
        caption: "As 12 Identidades da Álgebra Booleana (Pág. 75) + Portas Compostas",
        headers: ["Nome da Regra", "Forma com OR (+)", "Forma com AND (·)", "Dica Rápida STE-100"],
        rows: [
          ["Elemento Neutro (Identidade)", "1) A + 0 = A", "4) A · 1 = A", "Somar 0 ou multiplicar por 1 não muda nada"],
          ["Aniquilador (Unitário)", "2) A + 1 = 1", "3) A · 0 = 0", "1 no OR domina tudo (dá 1); 0 no AND zera tudo"],
          ["Idempotência", "5) A + A = A", "7) A · A = A", "Repetir a mesma variável não muda o valor"],
          ["Complementaridade", "6) A + A' = 1", "8) A · A' = 0", "Um deles é sempre 1 (no OR dá 1) e o outro é 0 (no AND dá 0)"],
          ["Dupla Negação / Absorção", "9) (A')' = A", "10) A + AB = A", "Duas barras se cancelam; A absorve AB"],
          ["Eliminação / Distributiva", "11) A + A'B = A + B", "12) (A+B)(A+C) = A + BC", "Atalhos fundamentais para simplificar provas!"]
        ]
      },
      exercises: [
        {
          id: "u6-q1",
          question: "Pelo Teorema de DeMorgan, a expressão (X · Y · Z)' equivale diretamente a (Pág. 79):",
          options: [
            "X' · Y' · Z'",
            "X' + Y' + Z'",
            "X + Y + Z",
            "(X + Y + Z)'"
          ],
          correct: 1,
          steExplanation: "Quebre a barra sobre cada variável e troque os operadores AND (·) por OR (+): (X · Y · Z)' = X' + Y' + Z'."
        },
        {
          id: "u6-q2",
          question: "Qual porta lógica produz saída 1 APENAS quando suas duas entradas X e Y são diferentes (0 e 1, ou 1 e 0) (Págs. 84–85)?",
          options: [
            "Porta XNOR",
            "Porta NAND",
            "Porta XOR (OU-Exclusivo: X ⊕ Y = X'Y + XY')",
            "Porta NOR"
          ],
          correct: 2,
          steExplanation: "A porta XOR (⊕) detecta diferença: dá 1 quando X ≠ Y e dá 0 quando X = Y."
        },
        {
          id: "u6-q3",
          question: "Quantas portas NAND de 2 entradas são necessárias para construir uma porta OR (A + B) (Pág. 92)?",
          options: [
            "1 porta NAND",
            "2 portas NAND",
            "3 portas NAND (duas para inverter A e B, e uma terceira para fazer o NAND entre A' e B')",
            "5 portas NAND"
          ],
          correct: 2,
          steExplanation: "Usamos a NAND 1 para gerar A', a NAND 2 para gerar B', e a NAND 3 recebe A' e B' gerando (A'·B')' = A + B (total: 3 portas NAND)."
        }
      ]
    },

    // =========================================================================
    // MÓDULO II - PARTE I: FORMAS CANÔNICAS E MAPAS DE KARNAUGH
    // =========================================================================
    {
      id: "u7",
      module: "Módulo II",
      part: "Parte I",
      pages: "Págs. 1–37",
      title: "7. Dualidade, Mintermos (∑m), Maxtermos (∏M) e SOP/POS",
      labId: "lab-kmap",
      shortGoal: "Simplificar expressões algébricas, escrever qualquer função em Soma de Mintermos (∑m) e Produto de Maxtermos (∏M).",
      steSummary: [
        "Princípio da Dualidade: Troque todo AND por OR, todo OR por AND, todo 0 por 1 e todo 1 por 0. A equação continua verdadeira!",
        "Mintermo (mᵢ): É um produto (AND) com TODAS as variáveis. Regra do Mintermo: Bit 1 = letra normal (x); Bit 0 = letra negada (x'). Usamos onde a saída da tabela é 1.",
        "Maxtermo (Mᵢ): É uma soma (OR) com TODAS as variáveis. Regra do Maxtermo (OPOSTA!): Bit 0 = letra normal (x); Bit 1 = letra negada (x'). Usamos onde a saída da tabela é 0.",
        "Conversão Instantânea: Se F(A,B,C) = ∑m(1, 3, 5, 7), então o Produto de Maxtermos tem exatamente os números de 0 a 7 que faltaram na lista: F = ∏M(0, 2, 4, 6)!",
        "SOP (Soma de Produtos): várias portas AND somadas em uma OR (ex: AB + A'C). POS (Produto de Somas): várias portas OR multiplicadas em uma AND (ex: (A+B)(A'+C))."
      ],
      translations: [
        {
          academic: "Slide Mód. II Pág. 17: 'Para Mintermos: 1 significa variável não complementada e 0 complementada. Para Maxtermos: 0 significa não complementada e 1 complementada.'",
          ste: "Por que são opostos? Porque o Mintermo quer dar 1 no AND (se a entrada é 0, precisa inverter para 1). O Maxtermo quer dar 0 no OR (se a entrada é 1, precisa inverter para 0)."
        },
        {
          academic: "Slide Mód. II Pág. 7: 'Obtenha a expressão simplificada para z = ABC + AB'(A'C')''",
          ste: "Vamos resolver o exercício da Pág. 7! Pela regra de DeMorgan: (A'C')' = A + C. Substituindo: z = ABC + AB'(A + C) = ABC + AB'A + AB'C = AB' + ABC + AB'C = AB' + AC(B + B') = AB' + AC = A(B' + C)!"
        }
      ],
      stepByStep: {
        title: "Procedimento STE-100: Como Expandir uma Função para Soma de Mintermos (Pág. 28)",
        steps: [
          "Olhe cada termo da equação (ex: F = A + B'C, com variáveis A, B, C).",
          "Descubra qual letra falta no termo. Se falta B no termo A, multiplique por (B + B') -> A(B + B') = AB + AB'.",
          "Se ainda falta C, multiplique por (C + C') -> ABC + ABC' + AB'C + AB'C'. No termo B'C falta A -> (A + A')B'C = AB'C + A'B'C.",
          "Elimine termos repetidos e converta cada grupo em binário (letra normal = 1, letra com barra = 0): F = m7 + m6 + m5 + m4 + m1 = ∑m(1, 4, 5, 6, 7)."
        ]
      },
      tableData: {
        caption: "Tabela de Mintermos e Maxtermos de 3 Variáveis (Mód. II - Pág. 19)",
        headers: ["Índice (i)", "Binário (x, y, z)", "Mintermo (mᵢ) [1=x, 0=x']", "Maxtermo (Mᵢ) [0=x, 1=x']"],
        rows: [
          ["0", "0 0 0", "m₀ = x' · y' · z'", "M₀ = x + y + z"],
          ["1", "0 0 1", "m₁ = x' · y' · z", "M₁ = x + y + z'"],
          ["2", "0 1 0", "m₂ = x' · y · z'", "M₂ = x + y' + z"],
          ["3", "0 1 1", "m₃ = x' · y · z", "M₃ = x + y' + z'"],
          ["4", "1 0 0", "m₄ = x · y' · z'", "M₄ = x' + y + z"],
          ["5", "1 0 1", "m₅ = x · y' · z", "M₅ = x' + y + z'"],
          ["6", "1 1 0", "m₆ = x · y · z'", "M₆ = x' + y' + z"],
          ["7", "1 1 1", "m₇ = x · y · z", "M₇ = x' + y' + z'"]
        ]
      },
      exercises: [
        {
          id: "u7-q1",
          question: "Para 3 variáveis (x, y, z), qual é a expressão algébrica do Mintermo m₅ e do Maxtermo M₅ (Pág. 19)?",
          options: [
            "m₅ = x · y' · z  e  M₅ = x' + y + z'",
            "m₅ = x' · y · z'  e  M₅ = x + y' + z",
            "m₅ = x + y' + z  e  M₅ = x · y' · z",
            "m₅ = x · y · z  e  M₅ = x' + y' + z'"
          ],
          correct: 0,
          steExplanation: "O índice 5 em binário é 101 (x=1, y=0, z=1). No Mintermo m₅ (1=normal, 0=negado) temos x·y'·z. No Maxtermo M₅ (0=normal, 1=negado) temos x' + y + z'."
        },
        {
          id: "u7-q2",
          question: "Se uma função de 3 variáveis é dada por F(A,B,C) = ∑m(1, 4, 5, 6, 7) (Pág. 29), qual é sua forma em Produto de Maxtermos (∏M)?",
          options: [
            "F(A,B,C) = ∏M(1, 4, 5, 6, 7)",
            "F(A,B,C) = ∏M(0, 2, 3)",
            "F(A,B,C) = ∏M(0, 1, 2, 3)",
            "F(A,B,C) = ∏M(2, 3, 8)"
          ],
          correct: 1,
          steExplanation: "Os índices possíveis para 3 variáveis vão de 0 a 7. Se os '1's estão em (1, 4, 5, 6, 7), os '0's estão nos índices que restaram: (0, 2, 3). Logo, F = ∏M(0, 2, 3)."
        },
        {
          id: "u7-q3",
          question: "Simplificando o circuito da Pág. 5 do Módulo II: x = A · B · (A' + B·C)', obtemos:",
          options: [
            "x = A · B · C",
            "x = A · B · C'",
            "x = A + B + C'",
            "x = 0"
          ],
          correct: 1,
          steExplanation: "Aplicando DeMorgan em (A' + BC)' temos: (A')' · (BC)' = A · (B' + C'). Multiplicando por AB: A·B·A·(B' + C') = AB(B' + C') = ABB' + ABC' = 0 + ABC' = A·B·C'!"
        }
      ]
    },

    {
      id: "u8",
      module: "Módulo II",
      part: "Parte I",
      pages: "Págs. 38–52",
      title: "8. Mapas de Karnaugh (Mapa K) e Condições Don't Care",
      labId: "lab-kmap",
      shortGoal: "Dominar o agrupamento visual em Mapas de Karnaugh para encontrar a expressão mínima sem precisar fazer álgebra longa.",
      steSummary: [
        "O Mapa de Karnaugh organiza a tabela-verdade em um quadro onde células vizinhas mudam apenas 1 bit (Código Gray no cabeçalho: 00, 01, 11, 10).",
        "ATENÇÃO À PEGADINHA: No cabeçalho do Mapa K, a 3ª coluna é 11 (m₃) e a 4ª coluna é 10 (m₂)!",
        "Você só pode agrupar quantidades de células em potências de 2: grupos de 1, 2 (par), 4 (quarteto) ou 8 (octeto). Nunca agrupe 3, 5 ou 6 células!",
        "As bordas do Mapa K são conectadas (o mapa 'dá a volta'): a primeira coluna é vizinha da última coluna!",
        "Regra da Eliminação: A variável que MUDA de valor (é 0 e 1 dentro do mesmo grupo) é ELIMINADA. A variável que NÃO MUDA fica na resposta.",
        "Condição Don't Care (X): É um coringa. Trate o 'X' como 1 apenas se ele ajudar a dobrar o tamanho de um grupo; caso contrário, ignore o 'X' (trate como 0)."
      ],
      translations: [
        {
          academic: "Slide Mód. II Pág. 45: 'No mapa de 3 variáveis: um quadrado representa 3 variáveis; dois quadrados adjacentes representam duas variáveis; quatro termos adjacentes representam uma variável.'",
          ste: "Regra prática: Cada vez que você DOBRA o tamanho do grupo, você CORTA 1 letra da resposta! Em 3 variáveis: Grupo de 1 = 3 letras; Par (2) = 2 letras; Quarteto (4) = 1 letra; Octeto (8) = vale 1!"
        }
      ],
      stepByStep: {
        title: "Procedimento STE-100: Como Simplificar pelo Mapa de Karnaugh (Págs. 49–50)",
        steps: [
          "Coloque '1' nos quadrados correspondentes aos mintermos da função (e 'X' nos Don't Cares).",
          "Procure primeiro os '1's isolados ou que só têm 1 único vizinho e garanta o agrupamento deles.",
          "Forme os MAIORES grupos possíveis (tente 8, depois 4, depois 2) usando o MENOR número de grupos até cobrir todos os '1's.",
          "Para cada grupo, olhe as linhas e colunas: anote apenas as variáveis que mantêm o mesmo valor em todo o grupo e some tudo com '+'."
        ]
      },
      tableData: {
        caption: "Relação Tamanho do Grupo vs. Variáveis na Resposta",
        headers: ["Tamanho do Grupo", "Em Mapa de 2 Variáveis", "Em Mapa de 3 Variáveis", "Em Mapa de 4 Variáveis"],
        rows: [
          ["1 célula (sozinho)", "Termo com 2 letras", "Termo com 3 letras", "Termo com 4 letras"],
          ["2 células (Par)", "Termo com 1 letra", "Termo com 2 letras", "Termo com 3 letras"],
          ["4 células (Quarteto)", "Constante = 1", "Termo com 1 letra", "Termo com 2 letras"],
          ["8 células (Octeto)", "—", "Constante = 1", "Termo com 1 letra"]
        ]
      },
      exercises: [
        {
          id: "u8-q1",
          question: "No Mapa de Karnaugh de 3 variáveis (x, y, z) da Pág. 46, a função F(x,y,z) = ∑m(2, 3, 6, 7) forma um quarteto nas colunas yz = 11 e yz = 10. Qual é a expressão simplificada?",
          options: [
            "F = x",
            "F = y",
            "F = z'",
            "F = x·y + z"
          ],
          correct: 1,
          steExplanation: "Nos mintermos 2 (010), 3 (011), 6 (110) e 7 (111), o x muda (0 e 1 -> corta) e o z muda (0 e 1 -> corta). A única variável que vale 1 em todos os 4 quadrados é y. Logo, F = y!"
        },
        {
          id: "u8-q2",
          question: "Resolva o exercício proposto na Pág. 48 do Módulo II: Simplifique F(x,y,z) = ∑m(1, 2, 3, 5, 7):",
          options: [
            "F = z + x'·y",
            "F = x + y + z",
            "F = x'·z' + y·z",
            "F = y'"
          ],
          correct: 0,
          steExplanation: "Os mintermos (1, 3, 5, 7) formam um QUARTETO central onde z = 1 (gera o termo 'z'). Falta cobrir o mintermo 2 (010), que faz PAR com o mintermo 3 (011), onde x=0 e y=1 (gera o termo 'x'y'). Somando: F = z + x'y!"
        },
        {
          id: "u8-q3",
          question: "Como devemos tratar as células marcadas com 'x' (Don't Care) em um Mapa de Karnaugh (Págs. 51–52)?",
          options: [
            "Devemos agrupar todos os 'x' obrigatoriamente.",
            "Nunca podemos agrupar um 'x'.",
            "Usamos o 'x' como 1 somente quando ele ajuda a formar um grupo maior (par, quarteto, octeto) com os 1s existentes.",
            "Substituímos todos os 'x' por 0 antes de começar."
          ],
          correct: 2,
          steExplanation: "O Don't Care ('x') significa que a saída naquela combinação não importa. Por isso, usamos como '1' apenas os 'x' que ajudam a ampliar um grupo e simplificar o circuito."
        }
      ]
    },

    // =========================================================================
    // MÓDULO II - PARTE II: CIRCUITOS COMBINACIONAIS E ARITMÉTICOS
    // =========================================================================
    {
      id: "u9",
      module: "Módulo II",
      part: "Parte II",
      pages: "Págs. 53–78",
      title: "9. Decodificadores, Codificadores, MUX e DEMUX",
      labId: "lab-comb",
      shortGoal: "Compreender o funcionamento e aplicação de Decodificadores (incluindo Display 7 Segmentos), Codificadores de Prioridade, Multiplexadores e Demultiplexadores.",
      steSummary: [
        "Atraso de Propagação (tPLH e tPHL): É o tempo real que o sinal leva para atravessar a porta lógica da entrada até a saída.",
        "Decodificador (Decoder): Recebe um código binário de n bits na entrada e ativa APENAS UMA das 2ⁿ linhas de saída (aquela correspondente ao número binário).",
        "Codificador (Encoder): Faz o inverso do Decodificador (recebe 2ⁿ linhas e gera o código binário de n bits). O Codificador de Prioridade (ex: 74147) resolve o conflito quando duas teclas são apertadas juntas, escolhendo a de MAIOR número!",
        "Multiplexador (MUX - Seletor de Dados): Funciona como uma chave rotativa digital. Tem várias entradas de dados (I₀, I₁, I₂...), entradas de Seleção (S) e UMA única saída (Z).",
        "Demultiplexador (DEMUX - Distribuidor): Faz o inverso do MUX. Recebe 1 única entrada de dados e a envia para uma das várias saídas escolhida pela Seleção (S)."
      ],
      translations: [
        {
          academic: "Slide Mód. II Pág. 61–62: 'Decodificador 74ALS138 1 de 8 com entradas de Enable E1', E2', E3 e saídas ativas em baixo.'",
          ste: "O pino Enable (Habilita) é o 'interruptor geral' do chip. No 74ALS138, o chip só funciona quando E1'=0, E2'=0 e E3=1. Além disso, como as saídas têm bolha, a saída escolhida fica em 0 (BAIXO) e todas as outras ficam em 1 (ALTO)!"
        }
      ],
      stepByStep: {
        title: "Procedimento STE-100: Como Identificar Qualquer Bloco Combinacional na Prova",
        steps: [
          "Olhe a quantidade de Entradas de Dados e Saídas:",
          "Poucas entradas (n) -> Muitas saídas (2ⁿ) onde apenas 1 saída liga por vez = DECODIFICADOR.",
          "Muitas entradas (2ⁿ) -> Poucas saídas (n) gerando o número binário = CODIFICADOR.",
          "Muitas entradas de dados -> 1 ÚNICA saída controlada por pinos Seletores (S) = MULTIPLEXADOR (MUX).",
          "1 ÚNICA entrada de dados -> Muitas saídas controlada por pinos Seletores (S) = DEMULTIPLEXADOR (DEMUX)."
        ]
      },
      tableData: {
        caption: "Resumo Comparativo dos 4 Blocos Combinacionais (Págs. 54–78)",
        headers: ["Dispositivo", "Entradas", "Saídas", "Função Principal em STE-100"],
        rows: [
          ["Decodificador", "n bits (endereço)", "Até 2ⁿ linhas", "Ativa a saída correspondente ao número binário de entrada"],
          ["Codificador Prioridade", "Até 2ⁿ linhas", "n bits (código)", "Gera o código binário da maior entrada ativa"],
          ["Multiplexador (MUX)", "2ⁿ dados + n seleção", "1 única saída Z", "Seleciona 1 entre várias entradas para passar à saída"],
          ["Demultiplexador (DEMUX)", "1 dado + n seleção", "2ⁿ saídas", "Roteia 1 entrada única para a saída selecionada"]
        ]
      },
      exercises: [
        {
          id: "u9-q1",
          question: "Em um Decodificador 3 para 8 com saídas ativas em ALTO (Pág. 60), se aplicarmos nas entradas CBA o código binário 110₂, o que acontece nas saídas?",
          options: [
            "As saídas O₁ e O₂ ficam em nível ALTO.",
            "Apenas a saída O₆ fica em nível ALTO (1), pois 110₂ = 6₁₀, e todas as outras saídas ficam em 0.",
            "Todas as 8 saídas ficam em nível ALTO.",
            "Apenas a saída O₃ fica em nível ALTO."
          ],
          correct: 1,
          steExplanation: "O código CBA = 110₂ equivale ao número decimal 6 (4 + 2 + 0 = 6). Logo, o decodificador ativa exclusivamente a saída O₆."
        },
        {
          id: "u9-q2",
          question: "Em um Display de 7 Segmentos (segmentos a, b, c, d, e, f, g na Pág. 64), quais segmentos devem acender para formar o número '1'?",
          options: [
            "Apenas os segmentos b e c (vertical direita).",
            "Todos os 7 segmentos (a, b, c, d, e, f, g).",
            "Os segmentos a, d e g.",
            "Apenas o segmento g (meio)."
          ],
          correct: 0,
          steExplanation: "Conforme destacado pela seta no slide da Pág. 64, o dígito '1' acende apenas os segmentos 'b' e 'c'."
        },
        {
          id: "u9-q3",
          question: "Um Multiplexador (MUX) de 4 entradas (I₀, I₁, I₂, I₃) possui duas linhas de seleção S₁ e S₀ (Pág. 72). Se S₁ = 1 e S₀ = 0, qual entrada aparece na saída Z?",
          options: [
            "Z = I₀",
            "Z = I₁",
            "Z = I₂",
            "Z = I₃"
          ],
          correct: 2,
          steExplanation: "O código de seleção S₁S₀ = 10₂ equivale ao número decimal 2. Portanto, o MUX conecta a entrada I₂ diretamente à saída Z."
        }
      ]
    },

    {
      id: "u10",
      module: "Módulo II",
      part: "Parte II",
      pages: "Págs. 79–91",
      title: "10. Números com Sinal, Somadores (HA/FA) e Comparadores",
      labId: "lab-comb",
      shortGoal: "Entender o bit de sinal, Complemento de 2, Overflow, Meio-Somador, Somador Completo e Comparadores com XOR.",
      steSummary: [
        "Nos números binários com sinal, o bit mais à esquerda (MSB) é o Bit de Sinal: 0 = Positivo (+); 1 = Negativo (-).",
        "O padrão universal para números negativos é o Complemento de 2, pois permite somar e subtrair usando o mesmo circuito somador.",
        "Overflow (Transbordamento): Ocorre quando somamos dois números de MESMO sinal e o resultado estoura a quantidade de bits, gerando um sinal oposto incorreto.",
        "Meio-Somador (Half-Adder - HA): Soma 2 bits (A e B). Não tem entrada de 'vem-um'. Equações: Soma S = A ⊕ B (XOR) e Carry C = A · B (AND).",
        "Somador Completo (Full-Adder - FA): Soma 3 bits (A, B e Carry-In Cin). Equações: S = A ⊕ B ⊕ Cin e Cout = AB + (A ⊕ B)Cin.",
        "Comparador de Igualdade: Usa portas XNOR (XOR seguida de inversor) para comparar dois números bit a bit. Se A₀=B₀ E A₁=B₁, a saída indica A = B."
      ],
      translations: [
        {
          academic: "Slide Mód. II Pág. 83: 'Quando dois números positivos ou negativos são somados e sempre produzem um resultado incorreto, há a ocorrência de um overflow.'",
          ste: "Como detectar Overflow fácil? Se você somar Positivo + Positivo e der Negativo (bit de sinal = 1), ou Negativo + Negativo e der Positivo (bit de sinal = 0), houve Overflow! Somar Positivo com Negativo NUNCA dá overflow."
        }
      ],
      stepByStep: {
        title: "Procedimento STE-100: Como Diferenciar Meio-Somador (HA) de Somador Completo (FA)",
        steps: [
          "Precisa somar apenas a 1ª coluna da direita (LSB), onde não existe 'vai-um' anterior? Use um Meio-Somador (2 entradas: A, B).",
          "Precisa somar qualquer outra coluna que recebe o 'vai-um' (Carry-In) da coluna anterior? Use um Somador Completo (3 entradas: A, B, Cin).",
          "Para somar números de 4 bits em paralelo (Ripple-Carry), conecte 4 somadores em cadeia ligando o Cout de um no Cin do próximo."
        ]
      },
      tableData: {
        caption: "Tabela-Verdade do Somador Completo (Full-Adder - Pág. 89)",
        headers: ["A", "B", "Cin (Vem-um)", "Cout (Vai-um)", "S (Soma)"],
        rows: [
          ["0", "0", "0", "0", "0 (soma = 0)"],
          ["0", "0", "1", "0", "1 (soma = 1)"],
          ["0", "1", "0", "0", "1 (soma = 1)"],
          ["0", "1", "1", "1", "0 (soma = 2 -> 10₂)"],
          ["1", "0", "0", "0", "1 (soma = 1)"],
          ["1", "0", "1", "1", "0 (soma = 2 -> 10₂)"],
          ["1", "1", "0", "1", "0 (soma = 2 -> 10₂)"],
          ["1", "1", "1", "1", "1 (soma = 3 -> 11₂)"]
        ]
      },
      exercises: [
        {
          id: "u10-q1",
          question: "Quais portas lógicas formam um circuito Meio-Somador (Half-Adder) básico (Pág. 87)?",
          options: [
            "Uma porta XOR para a Soma (S = A ⊕ B) e uma porta AND para o Carry (C = A · B).",
            "Duas portas OR.",
            "Uma porta NAND e um inversor.",
            "Três portas XNOR."
          ],
          correct: 0,
          steExplanation: "No Meio-Somador, a Soma vale 1 quando apenas uma entrada é 1 (porta XOR), e o Carry (vai-um) vale 1 apenas quando ambas as entradas são 1 (porta AND)."
        },
        {
          id: "u10-q2",
          question: "Em um Somador Completo (Full-Adder, Pág. 89), se A = 1, B = 1 e Cin = 1, quais são os valores de Cout e S?",
          options: [
            "Cout = 1 e S = 0",
            "Cout = 1 e S = 1",
            "Cout = 0 e S = 1",
            "Cout = 0 e S = 0"
          ],
          correct: 1,
          steExplanation: "1 + 1 + 1 = 3 em decimal, que em binário é 11₂. Portanto, a Soma S = 1 e o Carry-Out Cout = 1."
        },
        {
          id: "u10-q3",
          question: "No circuito Comparador de 2 bits da Pág. 91, qual porta é usada para verificar se o bit A₀ é igual ao bit B₀?",
          options: [
            "Porta XOR seguida de inversor (ou seja, XNOR), que gera 1 quando os bits são iguais.",
            "Porta AND simples, pois 0 · 0 dá 0.",
            "Porta OR simples.",
            "Não é possível comparar igualdade com portas lógicas."
          ],
          correct: 0,
          steExplanation: "A porta XOR dá 0 quando os bits são iguais. Passando por um inversor (formando uma XNOR), a saída vai para 1 sempre que A₀ = B₀."
        }
      ]
    },

    // =========================================================================
    // MÓDULO II - PARTE III: CIRCUITOS SEQUENCIAIS (FLIP-FLOPS E CONTADORES)
    // =========================================================================
    {
      id: "u11",
      module: "Módulo II",
      part: "Parte III",
      pages: "Págs. 92–132",
      title: "11. Latches, Clock, Flip-Flops (SR, JK, D) e Temporização",
      labId: "lab-seq",
      shortGoal: "Dominar elementos de memória: Latches NAND/NOR, bordas de Clock, Flip-Flops SR, JK e D, entradas assíncronas PRE/CLR e tempos de Setup/Hold.",
      steSummary: [
        "Circuito Sequencial = Lógica Combinacional + Memória (Flip-Flops). O Próximo Estado depende das Entradas E do Estado Atual.",
        "Latch NAND: Ativo em nível BAIXO (0). Repouso em S=1, R=1. Proibido: S=0, R=0.",
        "Latch NOR: Ativo em nível ALTO (1). Repouso em S=0, R=0. Proibido: S=1, R=1.",
        "Flip-Flops com Clock (Síncronos): Só mudam a saída Q no instante exato da borda do Clock! Triângulo sem bolha = Borda de Subida (↑, 0 para 1). Triângulo COM bolha = Borda de Descida (↓, 1 para 0).",
        "Flip-Flop JK: É o mais versátil! Funciona igual ao SR, mas quando J=1 e K=1 não dá erro: ele COMUTA (Toggle: inverte Q para Q'!).",
        "Flip-Flop D (Data): Tem só 1 entrada D. Na borda do clock, a saída Q copia exatamente o valor de D (Q = D).",
        "Entradas Assíncronas (PRE' e CLR'): Não esperam o Clock! Ativas em 0 (têm bolha): PRE'=0 força Q=1 na hora; CLR'=0 zera Q=0 na hora."
      ],
      translations: [
        {
          academic: "Slide Mód. II Págs. 112–113: 'Tempo de setup (tS) é o intervalo mínimo antes da transição CLK ativa... Tempo de retenção (tH) é o tempo após a transição ativa do CLK...'",
          ste: "Para o Flip-Flop não errar a leitura no disparo do Clock: a entrada precisa ficar parada um tempinho ANTES da borda do clock (Tempo de Setup, tS) e continuar parada um tempinho DEPOIS da borda (Tempo de Hold, tH)."
        }
      ],
      stepByStep: {
        title: "Procedimento STE-100: Como Ler Formas de Onda de Flip-Flops na Prova (Págs. 116, 121, 128)",
        steps: [
          "Olhe primeiro o símbolo na entrada CLK do Flip-Flop: se não tem bolha, marque setas apenas nas SUBIDAS (↑) do Clock. Se tem bolha, marque apenas nas DESCIDAS (↓).",
          "Verifique se há entradas assíncronas PRE' ou CLR' em 0: enquanto PRE'=0, Q fica em 1 ignorando o clock; enquanto CLR'=0, Q fica em 0 ignorando o clock.",
          "Quando PRE'=1 e CLR'=1, a saída Q só pode mudar em cima das linhas tracejadas das bordas ativas do Clock!",
          "Em cada borda ativa, olhe o valor de J e K (ou D) naquele instante: 00 = mantém; 10 = vai para 1; 01 = vai para 0; 11 (no JK) = inverte o estado atual!"
        ]
      },
      tableData: {
        caption: "Tabela Mestre dos Flip-Flops Disparados por Borda (SR, JK e D)",
        headers: ["Tipo", "Entradas", "Ação na Borda Ativa do Clock", "Observação STE-100"],
        rows: [
          ["FF SR / JK", "S=0, R=0  ou  J=0, K=0", "Q₀ (Não muda / Memória)", "Mantém o bit guardado"],
          ["FF SR / JK", "S=1, R=0  ou  J=1, K=0", "Q = 1 (SET)", "Liga a saída em nível ALTO"],
          ["FF SR / JK", "S=0, R=1  ou  J=0, K=1", "Q = 0 (RESET / CLEAR)", "Zera a saída em nível BAIXO"],
          ["FF SR vs JK", "S=1, R=1  vs  J=1, K=1", "SR: Inválido! | JK: Q'₀ (Comuta!)", "O JK resolve o defeito do SR invertendo Q"],
          ["FF Tipo D", "D = 0  ou  D = 1", "Q = D (Copia a entrada)", "Usado para guardar dados em Registradores"]
        ]
      },
      exercises: [
        {
          id: "u11-q1",
          question: "Qual é a grande vantagem do Flip-Flop JK sobre o Flip-Flop SR (Págs. 120–121)?",
          options: [
            "O Flip-Flop JK não usa sinal de Clock.",
            "Quando J = 1 e K = 1, não existe estado inválido/ambíguo: a saída comuta (alterna para o estado oposto Q'₀) na borda do clock.",
            "O Flip-Flop JK possui 10 saídas.",
            "O Flip-Flop JK funciona apenas com tensões negativas."
          ],
          correct: 1,
          steExplanation: "No FF SR, S=1 e R=1 é proibido. No FF JK, J=1 e K=1 ativa o modo de comutação (Toggle), invertendo a saída a cada pulso de clock."
        },
        {
          id: "u11-q2",
          question: "Um Flip-Flop JK possui entradas assíncronas ativas em nível baixo (PRE' e CLR', Pág. 127). Se aplicarmos PRE' = 1 e CLR' = 0, o que acontece com a saída Q?",
          options: [
            "A saída Q espera a próxima borda do clock para zerar.",
            "A saída Q vai imediatamente para 0 (clear assíncrono), independentemente do Clock e das entradas J e K.",
            "A saída Q vai imediatamente para 1.",
            "A saída Q fica piscando."
          ],
          correct: 1,
          steExplanation: "As entradas PRE' e CLR' são assíncronas (têm prioridade máxima e independem do clock). Como são ativas em nível BAIXO, CLR' = 0 zera a saída Q imediatamente."
        },
        {
          id: "u11-q3",
          question: "Nos pulsos reais (Págs. 105–107), como são medidos o Tempo de Subida (tr) e a Largura do Pulso (tw)?",
          options: [
            "tr é medido entre 10% e 90% da amplitude; tw é medido entre os pontos de 50% na subida e 50% na descida.",
            "Ambos são medidos de 0% a 100%.",
            "tr é o tempo total do circuito desligado.",
            "tw é medido em Volts."
          ],
          correct: 0,
          steExplanation: "Por padrão de engenharia (Págs. 106–107): tr e tf são medidos entre 10% e 90% da tensão máxima; a duração tw é medida nos pontos de 50% da tensão."
        }
      ]
    },

    {
      id: "u12",
      module: "Módulo II",
      part: "Parte III",
      pages: "Págs. 133–185",
      title: "12. Registradores e Contadores (Assíncronos, Síncronos, MOD-N, Anel e Johnson)",
      labId: "lab-seq",
      shortGoal: "Dominar Registradores de Deslocamento (Shift Registers), Contadores Assíncronos/Síncronos, cálculo de MOD, frequência de saída e Contadores em Anel/Johnson.",
      steSummary: [
        "Registrador (Register): Grupo de Flip-Flops que guarda vários bits. Na transferência Paralela, todos os N bits passam em 1 único pulso de clock. Na transferência Serial (Shift Register), leva N pulsos de clock.",
        "Contador Assíncrono (Ripple): Só o 1º FF recebe o Clock externo; cada FF seguinte recebe o clock da saída do FF anterior. Sofre com atraso acumulado (fmax ≤ 1 / (N · tpd)).",
        "Divisão de Frequência: Cada FF divide a frequência por 2. Em qualquer contador, a frequência do último FF é: f_saída = f_clock / MOD.",
        "Contador Síncrono: Todos os FFs recebem o mesmo Clock juntos (é mais rápido!). Para contar com Módulo < 2ᴺ (ex: MOD-6 ou BCD MOD-10), ligamos uma porta NAND nas saídas que formam o número N direto no pino CLR'!",
        "Contador em Anel (Ring): A saída normal Q do último FF volta para o 1º FF (MOD = N estados). Contador Johnson (Anel Torcido): A saída invertida Q' do último FF volta para o 1º FF (MOD = 2N estados)."
      ],
      translations: [
        {
          academic: "Slide Mód. II Pág. 162: 'Desafio do slide: Qual o módulo desse contador de 6 Flip-Flops (Q₅ a Q₀) com uma porta NAND conectada em Q₅, Q₄, Q₃ e Q₂ ligada aos pinos CLR'?'",
          ste: "Vamos resolver o desafio da Pág. 162! A porta NAND zera o contador quando todas as entradas dela forem 1: Q₅=1, Q₄=1, Q₃=1, Q₂=1 (e os primeiros a chegar nisso têm Q₁=0, Q₀=0). Que número binário é 111100₂? É 32 + 16 + 8 + 4 = 60! Logo, é um contador MOD-60 (divide os 60 Hz da rede para 1 Hz = 1 segundo de um relógio digital!)."
        }
      ],
      stepByStep: {
        title: "Procedimento STE-100: Como Projetar um Contador de Módulo N (Ex: MOD-6 ou MOD-10)",
        steps: [
          "Escolha a quantidade de Flip-Flops (N) tal que 2ᴺ ≥ MOD desejado (ex: para MOD-6, 3 FFs dão 2³=8; para MOD-10 BCD, 4 FFs dão 2⁴=16).",
          "Escreva o número do MOD desejado em binário (ex: 6 = 110₂ para CBA; 10 = 1010₂ para DCBA).",
          "Pegue apenas as saídas dos Flip-Flops que valem '1' nesse número (no MOD-6: C e B; no MOD-10: D e B).",
          "Conecte essas saídas em uma porta NAND e ligue a saída da NAND nos pinos CLR' de todos os Flip-Flops. Quando a contagem bater nesse número, o contador zera instantaneamente para 000!"
        ]
      },
      tableData: {
        caption: "Comparativo Geral de Contadores Digitais (Págs. 148–185)",
        headers: ["Tipo de Contador", "Conexão do Clock", "Número de Estados (MOD)", "Característica Chave"],
        rows: [
          ["Assíncrono (Binário)", "Em cascata (Q aciona próximo CLK)", "MOD = 2ᴺ (sem NAND)", "Mais simples, mas atraso N·tpd limita frequência"],
          ["Síncrono (Paralelo)", "Mesmo Clock em todos os FFs", "MOD = 2ᴺ (ou < 2ᴺ com NAND)", "Alta velocidade; usa portas AND entre J/K"],
          ["Década / BCD", "Assíncrono ou Síncrono", "MOD = 10 (0000 a 1001)", "NAND conectada em D e B (1010₂ = 10)"],
          ["Anel (Ring Counter)", "Síncrono (Shift Register)", "MOD = N (para N FFs)", "Último Q volta para o 1º D (circula um único 1)"],
          ["Johnson (Anel Torcido)", "Síncrono (Shift Register)", "MOD = 2·N (para N FFs)", "Último Q' (invertido) volta para o 1º D"]
        ]
      },
      exercises: [
        {
          id: "u12-q1",
          question: "No desafio da Pág. 162 do Módulo II, temos 6 Flip-Flops (Q₅ a Q₀) recebendo clock de 60 Hz, e uma porta NAND com entradas Q₅, Q₄, Q₃, Q₂ ligada no CLR'. Qual é o módulo (MOD) desse contador e a frequência final de saída?",
          options: [
            "MOD-64 e frequência de 60 Hz.",
            "MOD-60 (pois 111100₂ = 60₁₀) e frequência de saída = 60 Hz / 60 = 1 Hz.",
            "MOD-15 (pois 1111₂ = 15₁₀) e frequência de 4 Hz.",
            "MOD-10 e frequência de 6 Hz."
          ],
          correct: 1,
          steExplanation: "O contador zera assim que Q₅Q₄Q₃Q₂ atingem 1111 (enquanto Q₁Q₀ ainda são 00). O binário 111100₂ = 32 + 16 + 8 + 4 = 60. Logo, conta de 0 a 59 (60 estados = MOD-60) e divide 60 Hz por 60 = 1 Hz!"
        },
        {
          id: "u12-q2",
          question: "Um contador assíncrono de 3 bits (N = 3) usa Flip-Flops com atraso de propagação tpd = 50 ns cada (Págs. 152–154). Qual o período mínimo do clock (Tclock) para evitar erros?",
          options: [
            "Tclock ≥ 50 ns",
            "Tclock ≥ 150 ns (pois N × tpd = 3 × 50 ns = 150 ns)",
            "Tclock ≥ 10 ns",
            "Não há limite de velocidade."
          ],
          correct: 1,
          steExplanation: "Pela fórmula da Pág. 154: Tclock ≥ N · tpd. Com 3 Flip-Flops de 50 ns cada, o atraso total acumulado é 3 × 50 ns = 150 ns."
        },
        {
          id: "u12-q3",
          question: "Qual a diferença entre um Contador em Anel (Pág. 184) e um Contador Johnson (Pág. 185)?",
          options: [
            "No Anel a saída normal (Q) do último FF volta para o primeiro (MOD = N); no Johnson a saída invertida (Q') do último FF volta para o primeiro (MOD = 2N).",
            "Ambos são contadores assíncronos.",
            "O Contador Johnson não usa sinal de Clock.",
            "O Contador em Anel usa apenas portas OR."
          ],
          correct: 0,
          steExplanation: "O Contador em Anel realimenta Q₀ direto na entrada do primeiro FF (4 FFs = 4 estados). O Contador Johnson ('anel torcido') realimenta a saída invertida Q'₀ (3 FFs = 6 estados)."
        }
      ]
    }
  ],

  cheatSheet: [
    {
      category: "Módulo I: Conversões, Códigos e Aritmética",
      items: [
        "Pesos Binários Inteiros: ... 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1",
        "Pesos Binários Fracionários: , 0,5 (1/2) | 0,25 (1/4) | 0,125 (1/8) | 0,0625 (1/16)",
        "Conversão vs. Codificação BCD: 13₁₀ = 1101₂ (Binário Puro) | 13₁₀ = 0001 0011 (BCD: 4 bits por dígito decimal).",
        "Soma em BCD: Se a soma de 4 bits for > 9 (ou tiver Carry), SOME 6 (0110₂) para corrigir!",
        "Binário -> Gray: Copie o MSB; depois faça XOR entre bits vizinhos (Iguais = 0, Diferentes = 1).",
        "Número mínimo de bits para M elementos: 2ⁿ ≥ M (ex: 10 dígitos decimais exigem n=4 bits, pois 2⁴=16 ≥ 10).",
        "Complemento de 2 (Negativo): Inverta todos os bits (Compl. de 1) e some 1 no final."
      ]
    },
    {
      category: "Módulo I: Portas Lógicas e Álgebra Booleana",
      items: [
        "AND (·): Saída = 1 só se TODAS as entradas forem 1. | OR (+): Saída = 1 se PELO MENOS UMA entrada for 1.",
        "XOR (⊕): Saída = 1 se entradas forem DIFERENTES (X'Y + XY'). | XNOR: Saída = 1 se entradas forem IGUAIS.",
        "DeMorgan 1: (A · B)' = A' + B' (NAND = OR com entradas invertidas).",
        "DeMorgan 2: (A + B)' = A' · B' (NOR = AND com entradas invertidas).",
        "Atalhos Algébricos: A + AB = A (Absorção) | A + A'B = A + B (Eliminação) | (A+B)(A+C) = A + BC."
      ]
    },
    {
      category: "Módulo II: Formas Canônicas, Mapa K e Combinacionais",
      items: [
        "Mintermo (mᵢ, onde saída = 1): Produto AND. Bit 1 = letra normal (A); Bit 0 = letra barrada (A').",
        "Maxtermo (Mᵢ, onde saída = 0): Soma OR. Bit 0 = letra normal (A); Bit 1 = letra barrada (A').",
        "Conversão ∑m <-> ∏M: Os índices do ∏M são exatamente os números que não estão no ∑m!",
        "Mapa de Karnaugh: Cabeçalho em Gray (00, 01, 11, 10). Grupos de 1, 2, 4, 8. Variável que muda é cortada!",
        "Decodificador: n entradas -> 2ⁿ saídas (ativa 1 saída). | MUX: 2ⁿ entradas -> 1 saída (seleciona 1 canal).",
        "Meio-Somador (HA): S = A ⊕ B, C = A·B. | Somador Completo (FA): S = A ⊕ B ⊕ Cin, Cout = AB + (A⊕B)Cin."
      ]
    },
    {
      category: "Módulo II: Flip-Flops, Registradores e Contadores",
      items: [
        "Latch NAND: Ativo em BAIXO (0). | Latch NOR: Ativo em ALTO (1).",
        "Flip-Flop JK: 00 = Mantém; 10 = Set (1); 01 = Reset (0); 11 = Comuta/Inverte (Q'₀)!",
        "Flip-Flop D: Copia a entrada na borda do clock (Q = D). Entradas PRE' e CLR' (ativas em 0) mandam mais que o Clock!",
        "Frequência de saída de contador: f_saída = f_clock / MOD. Atraso Assíncrono: Tclock ≥ N · tpd.",
        "Contador Módulo < 2ᴺ: Ligue uma porta NAND nas saídas que valem 1 no número MOD desejado e conecte no CLR'.",
        "Contador em Anel: Q volta para o início (MOD = N). | Contador Johnson: Q' volta para o início (MOD = 2N)."
      ]
    }
  ],

  examInfo: {
    title: "AVALIAÇÃO II — Sistemas Lógicos Digitais",
    dateStr: "07/11/2026 (Sábado)",
    timeStr: "08h00 às 09h40 (100 minutos)",
    points: 30,
    modality: "Presencial (Papel e Caneta)",
    isoStart: "2026-11-07T08:00:00-03:00"
  },

  studyPlan: [
    {
      dayId: "d1",
      isoDate: "2026-11-03",
      durationMin: 90,
      date: "Ter, 03/11 (Amanhã)",
      week: "Sprint Intensivo (Dia 1 de 4) • Módulo I — Parte 1 Completa",
      title: "Dia 1 (Ter 03/11): Sinais, Conversão com Vírgula, BCD, Gray e 2ⁿ ≥ M (Unidades 1, 2 e 3)",
      unitId: "u1",
      unitIds: ["u1", "u2", "u3"],
      labId: "lab-converter",
      labIds: ["lab-signals", "lab-converter"],
      duration: "90 min (3 blocos de 30m)",
      steTasks: [
        "Bloco 1 (25 min) — Unidade 1 + Lab 1: memorize a faixa TTL (0V–0,8V = Nível 0; 2V–5V = Nível 1; 0,8V–2V = Inválido) e os 4 sinais (Analógico, Amostrado, Quantizado e Digital).",
        "Bloco 2 (35 min) — Unidade 2 + Lab 2: clique em 'Exemplo Slide: 46,6875' no Lab 2. No papel (sem calculadora!), divida 46 por 2 sucessivamente e multiplique 0,6875 por 2 até achar 101110,1011₂.",
        "Bloco 3 (30 min) — Unidade 3 + Lab 2: treine a pegadinha clássica de prova: Converter 13₁₀ (1101₂) ≠ Codificar 13 em BCD (0001 0011). Pratique Código Gray e a fórmula 2ⁿ ≥ M.",
        "Meta do Dia 1: acertar as 12 questões das Unidades 1, 2 e 3 (deixar as 3 primeiras bolinhas verdes no menu!)."
      ]
    },
    {
      dayId: "d2",
      isoDate: "2026-11-04",
      durationMin: 95,
      date: "Qua, 04/11",
      week: "Sprint Intensivo (Dia 2 de 4) • Fechamento 100% do Módulo I",
      title: "Dia 2 (Qua 04/11): Complemento de 2, Soma BCD (+6), Portas Lógicas e DeMorgan (Unidades 4, 5 e 6)",
      unitId: "u4",
      unitIds: ["u4", "u5", "u6"],
      labId: "lab-gates",
      labIds: ["lab-converter", "lab-gates"],
      duration: "95 min (3 blocos de ~30m)",
      steTasks: [
        "Bloco 1 (30 min) — Unidade 4 + Lab 2: pratique Complemento de 2 (inverta os bits e some 1), Paridade Par/Ímpar e Soma BCD no papel (sempre que passar de 9, some +6 = 0110₂!).",
        "Bloco 2 (30 min) — Unidade 5 + Lab 3: estude a precedência (1º NOT, 2º AND, 3º OR) e monte no papel a tabela-verdade de x = (A + B)(B' + C) (Pág. 88 do Módulo I).",
        "Bloco 3 (35 min) — Unidade 6 + Lab 3: domine os Teoremas de DeMorgan ('quebre a barra longa e troque o sinal entre • e +') e os 3 atalhos: A+AB=A, A+A'B=A+B e (A+B)(A+C)=A+BC.",
        "Meta do Dia 2: fechar 100% do Módulo I (Unidades 1 a 6 dominadas no Raio-X!)."
      ]
    },
    {
      dayId: "d3",
      isoDate: "2026-11-05",
      durationMin: 100,
      date: "Qui, 05/11",
      week: "Sprint Intensivo (Dia 3 de 4) • Módulo II — Alto Peso na Prova!",
      title: "Dia 3 (Qui 05/11): Mintermos/Maxtermos, Mapa de Karnaugh e Circuitos Combinacionais (Unidades 7, 8 e 9)",
      unitId: "u8",
      unitIds: ["u7", "u8", "u9"],
      labId: "lab-kmap",
      labIds: ["lab-kmap", "lab-comb"],
      duration: "100 min (Foco Total em Karnaugh)",
      steTasks: [
        "Bloco 1 (30 min) — Unidade 7: diferencie Mintermo (∑m, bit 1=normal, bit 0=barrado) de Maxtermo (∏M, bit 0=normal, bit 1=barrado). Refaça no papel x = AB(A'+BC)' (Pág. 5).",
        "Bloco 2 (45 min) — Unidade 8 + Lab 4 (QUESTÃO CERTA NA PROVA!): decore o cabeçalho Gray das colunas do Mapa K (00, 01, 11, 10). Resolva no papel os 4 exemplos dos slides no Lab 4, incluindo ∑m(1,2,3,5,7) e Don't Care (X).",
        "Bloco 3 (25 min) — Unidade 9 + Lab 5: entenda Decodificador (Enable ativo em 0), Display de 7 Segmentos, Codificador de Prioridade e a chave seletora S₁S₀ do Multiplexador (MUX).",
        "Meta do Dia 3: acertar todas as questões das Unidades 7, 8 e 9 e conseguir desenhar o Mapa K de 3 e 4 variáveis de cabeça."
      ]
    },
    {
      dayId: "d4",
      isoDate: "2026-11-06",
      durationMin: 110,
      date: "Sex, 06/11 (Véspera)",
      week: "Sprint Intensivo (Dia 4 de 4) • Sequenciais + Simulado 30 Pontos!",
      title: "Dia 4 (Sex 06/11): Somadores, Flip-Flops (SR, JK, D), Contadores MOD-N + Simulado 30 pts (Unidades 10, 11 e 12)",
      unitId: "u11",
      unitIds: ["u10", "u11", "u12"],
      labId: "lab-seq",
      labIds: ["lab-comb", "lab-seq"],
      duration: "110 min (Teoria + Simulado)",
      steTasks: [
        "Bloco 1 (20 min) — Unidade 10 + Lab 5: revise Overflow em Complemento de 2 e as equações do Meio-Somador (S=A⊕B, C=AB) e Somador Completo (S=A⊕B⊕Cin).",
        "Bloco 2 (25 min) — Unidade 11 + Lab 6: domine a tabela do Flip-Flop JK (00=Mantém, 10=Set, 01=Reset, 11=Comuta/Inverte!), o Flip-Flop D (Q=D) e os pinos assíncronos PRE' e CLR' (ativos em 0).",
        "Bloco 3 (25 min) — Unidade 12 + Lab 6: entenda Contador Assíncrono (atraso acumulativo Tclock ≥ N·tpd) vs. Síncrono, e como a porta NAND no CLR' cria contadores MOD-6, BCD (MOD-10) e MOD-60 (Pág. 162).",
        "Bloco 4 (40 min) — SIMULADO PRESENCIAL (30 PTS): abra a aba '📝 Simulado Presencial (1h40)', pegue papel e caneta e resolva as 10 questões de prova!"
      ]
    },
    {
      dayId: "d5",
      isoDate: "2026-11-07",
      fixedStart: "08:00",
      fixedEnd: "09:40",
      durationMin: 100,
      date: "Sáb, 07/11 (08h00)",
      week: "DIA DA AVALIAÇÃO II PRESENCIAL (08h00 às 09h40 • 30 Pontos)",
      title: "AVALIAÇÃO II PRESENCIAL — Sistemas Lógicos Digitais (30 Pontos)",
      unitId: "u8",
      unitIds: ["u8", "u11", "u12"],
      labId: "lab-kmap",
      labIds: ["lab-kmap"],
      duration: "1h40 de prova",
      steTasks: [
        "Às 07h15 (Aquecimento de 15 min): leia apenas a aba '⚡ Resumão STE-100 para Prova' para ativar as fórmulas na memória recente.",
        "Às 08h00 (Assim que receber a folha da prova): escreva no canto do rascunho os pesos binários (128, 64, 32, 16, 8, 4, 2, 1) e a ordem Gray do Mapa de Karnaugh (00, 01, 11, 10).",
        "Gestão de tempo (100 minutos): invista ~8 minutos por questão e reserve os 20 minutos finais para conferir barras de negação (DeMorgan) e somas BCD (+6).",
        "Boa prova! Você tem todo o resumo prático na ponta do lápis para buscar os 30 pontos!"
      ]
    }
  ],

  mockExam: [
    {
      id: "sim-q1",
      points: 3.0,
      topic: "Módulo I • Conversão Fracionária (Págs. 37–38)",
      paperTip: "Faça no papel: divida a parte inteira por 2 e multiplique a parte fracionária por 2.",
      question: "1. [3,0 pts] Converta o número decimal fracionário 13,625₁₀ para sua representação exata na base binária:",
      options: [
        "1101,101₂",
        "1101,110₂",
        "1011,101₂",
        "00010011,101₂"
      ],
      correct: 0,
      steExplanation: "Parte inteira: 13 = 8 + 4 + 0 + 1 = 1101₂. Parte fracionária: 0,625 × 2 = 1,25 (inteiro 1); 0,25 × 2 = 0,50 (inteiro 0); 0,50 × 2 = 1,00 (inteiro 1). Juntando: 1101,101₂."
    },
    {
      id: "sim-q2",
      points: 3.0,
      topic: "Módulo I • Codificação BCD, Soma BCD e Código Gray (Págs. 32–49)",
      paperTip: "Lembre-se: em BCD cada dígito vira 4 bits; se a soma passar de 9, some 6 (0110₂).",
      question: "2. [3,0 pts] Assinale a alternativa que apresenta CORRETAMENTE: (I) o número 29₁₀ codificado em BCD; (II) o resultado corrigido da soma BCD de 7 (0111) + 6 (0110); e (III) o binário 1100₂ convertido para Código Gray:",
      options: [
        "(I) 0010 1001 BCD | (II) 0001 0011 BCD (13) | (III) 1010 Gray",
        "(I) 11101 BCD | (II) 1101 BCD | (III) 1100 Gray",
        "(I) 0010 1001 BCD | (II) 1101 BCD (sem somar 6) | (III) 0011 Gray",
        "(I) 0010 1010 BCD | (II) 0001 0011 BCD | (III) 1010 Gray"
      ],
      correct: 0,
      steExplanation: "(I) 2 = 0010 e 9 = 1001 -> 0010 1001 BCD. (II) 7 + 6 = 13 (1101 > 9, soma 0110 -> 0001 0011 BCD). (III) Binário 1100 para Gray: copia 1; 1⊕1=0; 1⊕0=1; 0⊕0=0 -> 1010."
    },
    {
      id: "sim-q3",
      points: 3.0,
      topic: "Módulo I • Portas Lógicas e Teoremas de DeMorgan (Págs. 75–93)",
      paperTip: "Use DeMorgan: quebre a barra longa e troque o operador (+ vira · e · vira +).",
      question: "3. [3,0 pts] Simplificando a expressão booleana Y = (A' + B)' + A·B utilizando o Teorema de DeMorgan e as identidades booleanas, obtemos:",
      options: [
        "Y = A",
        "Y = B",
        "Y = A' + B",
        "Y = 1"
      ],
      correct: 0,
      steExplanation: "Passo 1 (DeMorgan em (A' + B)'): quebrando a barra e trocando '+' por '·', temos (A')' · B' = A · B'. Passo 2: Somando com A·B -> Y = A·B' + A·B = A·(B' + B) = A·1 = A!"
    },
    {
      id: "sim-q4",
      points: 3.0,
      topic: "Módulo II • Simplificação Algébrica de Circuitos (Págs. 5–8)",
      paperTip: "Questão clássica da página 7 do Módulo II! Aplique DeMorgan em (A'C')' primeiro.",
      question: "4. [3,0 pts] Simplifique ao menor número possível de literais a expressão do circuito da Pág. 7 do Módulo II: z = A·B·C + A·B'·(A'·C')'",
      options: [
        "z = A · (B' + C)  (ou A·B' + A·C)",
        "z = A · B · C",
        "z = A' + B' + C'",
        "z = B · C"
      ],
      correct: 0,
      steExplanation: "Por DeMorgan: (A'·C')' = A + C. Logo: z = ABC + AB'(A + C) = ABC + AB'A + AB'C = AB'(1 + C) + ABC = AB' + ABC = A(B' + BC). Pela identidade da Eliminação (B' + BC = B' + C), temos z = A(B' + C) = AB' + AC!"
    },
    {
      id: "sim-q5",
      points: 3.0,
      topic: "Módulo II • Formas Canônicas: Mintermos e Maxtermos (Págs. 10–33)",
      paperTip: "Expanda os termos faltantes ou monte a tabela-verdade de 3 variáveis.",
      question: "5. [3,0 pts] Dada a função booleana F(A, B, C) = A + B'·C (Págs. 28–29 do Módulo II), quais são, respectivamente, sua Soma de Mintermos (∑m) e seu Produto de Maxtermos (∏M)?",
      options: [
        "F = ∑m(1, 4, 5, 6, 7)  e  F = ∏M(0, 2, 3)",
        "F = ∑m(0, 2, 3)  e  F = ∏M(1, 4, 5, 6, 7)",
        "F = ∑m(1, 2, 3, 4)  e  F = ∏M(5, 6, 7)",
        "F = ∑m(4, 5, 6, 7)  e  F = ∏M(0, 1, 2, 3)"
      ],
      correct: 0,
      steExplanation: "A é igual a 1 nos índices 4 (100), 5 (101), 6 (110) e 7 (111). O termo B'C vale 1 quando B=0 e C=1, o que ocorre em 1 (001) e 5 (101). Unindo: ∑m(1, 4, 5, 6, 7). Os índices restantes de 0 a 7 formam os Maxtermos: ∏M(0, 2, 3)!"
    },
    {
      id: "sim-q6",
      points: 3.0,
      topic: "Módulo II • Mapa de Karnaugh (Págs. 38–52)",
      paperTip: "Desenhe o Mapa K de 3 variáveis (x na vertical, yz = 00, 01, 11, 10 na horizontal).",
      question: "6. [3,0 pts] Utilizando o Mapa de Karnaugh para simplificar a função F(x, y, z) = ∑m(0, 2, 4, 5, 6), qual é a expressão mínima em Soma de Produtos (SOP)?",
      options: [
        "F = z' + x·y'",
        "F = x' + y·z",
        "F = z + x'·y",
        "F = x·z' + y'"
      ],
      correct: 0,
      steExplanation: "Os mintermos m₀(000), m₂(010), m₄(100) e m₆(110) formam um QUARTETO nas bordas onde z = 0, gerando o termo z'. Resta o m₅(101), que forma um PAR com m₄(100) na linha x=1, coluna y=0, gerando x·y'. Resultado final: F = z' + x·y'!"
    },
    {
      id: "sim-q7",
      points: 3.0,
      topic: "Módulo II • Decodificadores, Codificadores e MUX (Págs. 54–78)",
      paperTip: "Lembre-se da relação entre entradas, seleção e saídas.",
      question: "7. [3,0 pts] Sobre os circuitos lógicos combinacionais (Decodificador, Codificador de Prioridade, MUX e DEMUX), assinale a afirmação CORRETA:",
      options: [
        "Um Multiplexador (MUX) de 8 entradas de dados possui 3 linhas de seleção (pois 2³ = 8) e 1 única saída de dados; já um Codificador de Prioridade ativa o código binário da entrada de maior numeração quando duas ou mais entradas são acionadas juntas.",
        "Um Decodificador 3 para 8 possui 8 linhas de entrada e 3 linhas de saída.",
        "Um Demultiplexador (DEMUX) recebe várias entradas de dados simultâneas e as soma em uma única saída.",
        "Não é possível implementar funções booleanas usando Multiplexadores."
      ],
      correct: 0,
      steExplanation: "O MUX 8:1 seleciona 1 entre 8 canais usando 3 bits de seleção (S₂, S₁, S₀) para enviar à saída Z. E o Codificador de Prioridade (ex: 74147, Pág. 67–68) garante que a entrada de maior índice tenha prioridade se várias forem apertadas."
    },
    {
      id: "sim-q8",
      points: 3.0,
      topic: "Módulo II • Somadores e Números com Sinal (Págs. 79–91)",
      paperTip: "Verifique as equações lógicas do Somador Completo (Full-Adder) da página 89.",
      question: "8. [3,0 pts] Um Somador Completo (Full-Adder) soma dois bits A e B mais o Carry-In (Cin) vindo do estágio anterior. Quais são as equações booleanas exatas para a Soma (S) e para o Carry-Out (Cout)?",
      options: [
        "S = (A ⊕ B) ⊕ Cin   e   Cout = A·B + (A ⊕ B)·Cin",
        "S = A · B · Cin   e   Cout = A + B + Cin",
        "S = A ⊕ B   e   Cout = A · B",
        "S = (A + B)'   e   Cout = A ⊕ Cin"
      ],
      correct: 0,
      steExplanation: "Conforme demonstrado pelo Mapa K na página 89 do Módulo II: S = (A ⊕ B) ⊕ Cin e Cout = AB + ACin + BCin = AB + (A ⊕ B)Cin."
    },
    {
      id: "sim-q9",
      points: 3.0,
      topic: "Módulo II • Latches e Flip-Flops SR, JK e D (Págs. 96–128)",
      paperTip: "Atenção à borda de descida (bolha no CLK) e às entradas assíncronas PRE' e CLR'.",
      question: "9. [3,0 pts] Considere um Flip-Flop JK disparado por borda de descida do Clock, com entradas assíncronas PRE' = 1 e CLR' = 1 (inativas), e saída atual Q = 1. Se fizermos J = 1 e K = 1, o que acontecerá com a saída Q?",
      options: [
        "Na próxima borda de descida (transição de 1 para 0) do Clock, a saída Q comutará (alternará) para 0.",
        "A saída Q mudará imediatamente para 0 sem esperar o Clock.",
        "O Flip-Flop entrará em um estado inválido/proibido.",
        "A saída Q permanecerá em 1 para sempre."
      ],
      correct: 0,
      steExplanation: "Com PRE'=1 e CLR'=1, o FF JK responde de forma síncrona na borda ativa do Clock (neste caso, borda de descida ↓). Como J=1 e K=1 é o modo Comutação (Toggle), Q inverte de 1 para 0!"
    },
    {
      id: "sim-q10",
      points: 3.0,
      topic: "Módulo II • Registradores e Contadores (Págs. 148–185)",
      paperTip: "Use f_saída = f_clock / MOD e lembre-se da porta NAND conectada ao CLR'.",
      question: "10. [3,0 pts] Deseja-se construir um contador síncrono MOD-12 (que conta de 0 a 11 e recicla no 12) usando 4 Flip-Flops JK (saídas D, C, B, A, onde D é o MSB) com entradas CLR' ativas em nível baixo. Quais saídas devem ser conectadas às entradas da porta NAND ligada aos pinos CLR', e qual será a frequência de saída se o Clock for de 120 kHz?",
      options: [
        "Conectar as saídas D e C na porta NAND (pois 12₁₀ = 1100₂); frequência de saída = 120 kHz / 12 = 10 kHz.",
        "Conectar as saídas D e B na porta NAND (pois 10₁₀ = 1010₂); frequência de saída = 12 kHz.",
        "Conectar todas as saídas D, C, B, A; frequência de saída = 120 kHz.",
        "Conectar as saídas B e A; frequência de saída = 60 kHz."
      ],
      correct: 0,
      steExplanation: "Passo 1: O número do módulo desejado é 12. Em binário de 4 bits (DCBA), 12 = 8 + 4 + 0 + 0 = 1100₂. Passo 2: Os bits que valem '1' são D e C; logo, conectamos D e C na porta NAND ligada ao CLR'. Passo 3: f_saída = f_clock / MOD = 120 kHz / 12 = 10 kHz!"
    }
  ]
};
