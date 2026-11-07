// =============================================================================
// RESUMO MESTRE ULTRA-DIDÁTICO — MÓDULO II (SLD)
// Foco: Prova Presencial do Prof. Ricardo Martins Ramos
// Linguagem: 100% Intuitiva, Sem Jargão Vazio, "Aula do Lado", Fórmulas e Pegadinhas
// =============================================================================

window.SLD_RESUMO_MOD2 = {
  meta: {
    title: "🔥 Resumão Ultra-Didático: Módulo II Descomplicado",
    subtitle: "Tudo o que você precisa entender, memorizar e aplicar para a prova de amanhã — explicado passo a passo como uma conversa direta.",
    dateInfo: "Prova Presencial • Sábado 07/11 às 08h00 (100 min • 30 Pontos)"
  },

  modules: [
    // -------------------------------------------------------------------------
    // TÓPICO 1: MINTERMOS E MAXTERMOS
    // -------------------------------------------------------------------------
    {
      id: "top-min-max",
      badge: "Tópico 1 de 6 • Fundamentos Canônicos",
      title: "1. Mintermos (∑m) e Maxtermos (∏M): O Segredo das Formas Canônicas",
      analogy: `
        <p>Imagine que você tem uma lâmpada e 3 interruptores na parede (<strong>A, B, C</strong>). A tabela-verdade é simplesmente a lista de todas as combinações possíveis de interruptores.</p>
        <p style="margin-top:8px;">Para descrever essa tabela em uma fórmula matemática, você tem <strong>apenas dois caminhos na vida</strong>:</p>
        <ul class="ste-sentence-list" style="margin-top:6px;">
          <li><strong>Caminho 1 (Mintermos / SOP):</strong> Você foca nas linhas onde a lâmpada <strong>ACENDEU (Saída = 1)</strong>. É uma <strong>Soma de Produtos</strong> (várias portas AND somadas por uma porta OR).</li>
          <li><strong>Caminho 2 (Maxtermos / POS):</strong> Você foca nas linhas onde a lâmpada <strong>FICOU APAGADA (Saída = 0)</strong>. É um <strong>Produto de Somas</strong> (várias portas OR multiplicadas por uma porta AND).</li>
        </ul>
      `,
      whyItWorks: `
        <div style="background:var(--bg-elevated); padding:14px; border-radius:var(--radius-md); border-left:4px solid var(--accent-primary); margin:12px 0;">
          <strong style="color:var(--accent-primary); font-size:1rem;">🤔 Por que a regra dos bits é invertida entre eles?</strong>
          <p style="font-size:0.9rem; margin-top:6px; color:var(--text-secondary);">
            • <strong>No Mintermo (porta AND):</strong> O produto AND só dá <code>1</code> se todos os pinos forem <code>1</code>. Se a entrada veio valendo <code>0</code>, você é obrigado a inverter ela (colocar barra <code>'</code>) para que ela vire 1. <strong>Por isso, no Mintermo: Bit 1 = Letra Normal; Bit 0 = Letra Negada!</strong><br><br>
            • <strong>No Maxtermo (porta OR):</strong> A soma OR só dá <code>0</code> se todos os pinos forem <code>0</code>. Se a entrada veio valendo <code>1</code>, você é obrigado a inverter ela para que vire 0. <strong>Por isso, no Maxtermo: Bit 0 = Letra Normal; Bit 1 = Letra Negada!</strong>
          </p>
        </div>
      `,
      ruleTable: `
        <div style="overflow-x:auto; margin:14px 0;">
          <table class="ste-table">
            <thead>
              <tr>
                <th>Conceito</th>
                <th>Símbolo</th>
                <th>Olha para a Tabela</th>
                <th>Operação Interna</th>
                <th>Como ler o Bit 1</th>
                <th>Como ler o Bit 0</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Mintermo</strong></td>
                <td><code style="color:var(--success);">∑m</code></td>
                <td>Onde a saída vale <strong>1</strong></td>
                <td>Multiplicação (AND)</td>
                <td><span class="badge badge-success">Letra Normal (A)</span></td>
                <td><span class="badge badge-warning">Letra Barrada (A')</span></td>
              </tr>
              <tr>
                <td><strong>Maxtermo</strong></td>
                <td><code style="color:var(--accent-primary);">∏M</code></td>
                <td>Onde a saída vale <strong>0</strong></td>
                <td>Soma (OR)</td>
                <td><span class="badge badge-warning">Letra Barrada (A')</span></td>
                <td><span class="badge badge-success">Letra Normal (A)</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      `,
      trapAlert: `
        <strong>🚨 A MAIOR PEGADINHA DE PROVA:</strong><br>
        Se a questão der para você: <em>"Seja F(A, B, C) = ∑m(1, 3, 5, 7). Escreva o Produto de Maxtermos (∏M)."</em><br>
        <strong>NÃO FAÇA NENHUMA CONTA!</strong><br>
        Como são 3 variáveis, as linhas vão de <code>0</code> a <code>7</code>. O que não é Mintermo (1) é obrigatoriamente Maxtermo (0)!<br>
        Basta listar os números que faltaram: <strong><code>F = ∏M(0, 2, 4, 6)</code></strong>. Resposta dada em 5 segundos!
      `,
      exampleWalkthrough: `
        <div class="ste-steps">
          <div style="font-weight:700; color:var(--accent-primary); margin-bottom:8px;">📝 Exemplo Prático: Como escrever a fórmula para o número 5 (binário 101):</div>
          <div class="ste-step-item">
            <div class="step-num">m5</div>
            <div>
              <strong>Como Mintermo (m₅):</strong> O binário é <code>A=1, B=0, C=1</code>. Como no mintermo 1 é normal e 0 é barrado: <strong><code>m₅ = A · B' · C</code></strong>
            </div>
          </div>
          <div class="ste-step-item">
            <div class="step-num">M5</div>
            <div>
              <strong>Como Maxtermo (M₅):</strong> O binário é <code>A=1, B=0, C=1</code>. Como no maxtermo a regra inverte (1 é barrado e 0 é normal): <strong><code>M₅ = A' + B + C'</code></strong>
            </div>
          </div>
        </div>
      `
    },

    // -------------------------------------------------------------------------
    // TÓPICO 2: MAPA DE KARNAUGH (MAPA K)
    // -------------------------------------------------------------------------
    {
      id: "top-kmap",
      badge: "Tópico 2 de 6 • Simplificação Visual",
      title: "2. Mapa de Karnaugh: O Fim da Álgebra Longa",
      analogy: `
        <p>Fazer simplificação algébrica (com DeMorgan e fatoração) é fácil de errar um sinal no meio do caminho. O <strong>Mapa de Karnaugh</strong> é uma trapaça geométrica genial: ele dobra a tabela-verdade em um tabuleiro bidimensional onde <strong>células vizinhas têm apenas 1 bit de diferença</strong>.</p>
        <p style="margin-top:6px;">Quando você circula dois vizinhos com <code>1</code>, o bit que muda de valor é eliminado automaticamente, porque <code>X + X' = 1</code>!</p>
      `,
      whyItWorks: `
        <div style="background:var(--bg-elevated); padding:14px; border-radius:var(--radius-md); border-left:4px solid var(--warning); margin:12px 0;">
          <strong style="color:var(--warning); font-size:1rem;">⚠️ A REGRA SAGRADA DO CABEÇALHO (CÓDIGO GRAY)</strong>
          <p style="font-size:0.9rem; margin-top:6px; color:var(--text-secondary);">
            Em um mapa de 3 ou 4 variáveis, as colunas <strong>NUNCA</strong> são 00, 01, 10, 11.<br>
            A ordem <strong>OBRIGATÓRIA</strong> é: <code>00 &nbsp;→&nbsp; 01 &nbsp;→&nbsp; 11 &nbsp;→&nbsp; 10</code>.<br>
            <span style="color:var(--danger); font-weight:700;">A terceira coluna é 11 e a quarta coluna é 10!</span> Se você errar essa ordem, todos os mintermos caem na casa errada e a questão zera!
          </p>
        </div>
      `,
      ruleTable: `
        <div style="margin:14px 0;">
          <div style="font-weight:700; margin-bottom:8px; color:var(--text-primary);">🗺️ Esquema das Posições dos Mintermos no Mapa:</div>
          <div class="grid-2">
            <div style="background:var(--bg-secondary); padding:12px; border-radius:var(--radius-md); border:1px solid var(--border-color);">
              <div style="font-weight:700; color:var(--accent-primary); margin-bottom:6px; font-size:0.88rem;">Mapa de 3 Variáveis (A nas linhas, BC nas colunas):</div>
              <table style="width:100%; text-align:center; border-collapse:collapse; font-family:var(--font-mono); font-size:0.85rem;">
                <tr style="color:var(--accent-primary);"><td>A \\ BC</td><td>00</td><td>01</td><td style="color:var(--warning); font-weight:800;">11</td><td>10</td></tr>
                <tr style="border-top:1px solid var(--border-color);"><td style="color:var(--accent-primary);">0</td><td>m0</td><td>m1</td><td style="color:var(--warning);">m3</td><td>m2</td></tr>
                <tr><td style="color:var(--accent-primary);">1</td><td>m4</td><td>m5</td><td style="color:var(--warning);">m7</td><td>m6</td></tr>
              </table>
            </div>

            <div style="background:var(--bg-secondary); padding:12px; border-radius:var(--radius-md); border:1px solid var(--border-color);">
              <div style="font-weight:700; color:var(--accent-primary); margin-bottom:6px; font-size:0.88rem;">Mapa de 4 Variáveis (AB linhas, CD colunas):</div>
              <table style="width:100%; text-align:center; border-collapse:collapse; font-family:var(--font-mono); font-size:0.82rem;">
                <tr style="color:var(--accent-primary);"><td>AB \\ CD</td><td>00</td><td>01</td><td style="color:var(--warning);">11</td><td>10</td></tr>
                <tr style="border-top:1px solid var(--border-color);"><td>00</td><td>m0</td><td>m1</td><td>m3</td><td>m2</td></tr>
                <tr><td>01</td><td>m4</td><td>m5</td><td>m7</td><td>m6</td></tr>
                <tr style="color:var(--warning); font-weight:700;"><td>11</td><td>m12</td><td>m13</td><td>m15</td><td>m14</td></tr>
                <tr><td>10</td><td>m8</td><td>m9</td><td>m11</td><td>m10</td></tr>
              </table>
              <div style="font-size:0.75rem; color:var(--text-muted); margin-top:4px;">*Repare que a 3ª linha (11) também troca de posição com a 4ª linha (10)!</div>
            </div>
          </div>
        </div>
      `,
      trapAlert: `
        <strong>⚡ 4 DICAS PARA NÃO PERDER PONTO NO KARNAUGH:</strong><br>
        1. <strong>Só potências de 2:</strong> Grupos de 1, 2, 4, 8 ou 16. NUNCA circule 3 ou 6 uns!<br>
        2. <strong>Quanto MAIOR o grupo, MENOR a fórmula:</strong> Cada vez que o grupo dobra de tamanho, você CORTA 1 letra da resposta.<br>
        3. <strong>O mapa é redondo (dá a volta pelas bordas):</strong> A 1ª coluna encosta na última coluna. O topo encosta no chão. Os 4 cantos formam um grupo de 4!<br>
        4. <strong>Don't Care (X):</strong> É um coringa. Só trate o X como 1 se ele permitir dobrar um grupo de uns. Se ele não ajudar nenhum 1, ignore-o (trate como 0).
      `,
      exampleWalkthrough: `
        <div class="ste-steps">
          <div style="font-weight:700; color:var(--accent-primary); margin-bottom:8px;">🍳 Receita de Bolo: Como Tirar as Letras do Grupo sem Errar:</div>
          <div class="ste-step-item">
            <div class="step-num">1</div>
            <div>
              Olhe para todas as células do grupo e pergunte para cada letra: <em>"Essa letra mudou de valor dentro do grupo?"</em>
            </div>
          </div>
          <div class="ste-step-item">
            <div class="step-num">2</div>
            <div>
              <strong>Se mudou</strong> (uma célula do grupo tem <code>A=0</code> e a outra tem <code>A=1</code>) 👉 <strong>RISQUE A LETRA DA RESPOSTA!</strong> Ela desaparece.
            </div>
          </div>
          <div class="ste-step-item">
            <div class="step-num">3</div>
            <div>
              <strong>Se NÃO mudou</strong> (permaneceu com o mesmo valor em todas as células do grupo) 👉 <strong>ELA FICA NA RESPOSTA!</strong> Se vale 1, escreva a letra normal (<code>A</code>); se vale 0, escreva com barra (<code>A'</code>).
            </div>
          </div>
        </div>
      `
    },

    // -------------------------------------------------------------------------
    // TÓPICO 3: CIRCUITOS COMBINACIONAIS (DECODER, ENCODER, MUX, DEMUX)
    // -------------------------------------------------------------------------
    {
      id: "top-msi",
      badge: "Tópico 3 de 6 • Blocos Prontos MSI",
      title: "3. Os 4 Mosqueteiros Combinacionais: Decodificador, Codificador, MUX e DEMUX",
      analogy: `
        <p>Para não precisar desenhar centenas de portas lógicas avulsas, os engenheiros criaram "chips prontos" que resolvem tarefas clássicas. Pense neles como instrumentos do dia a dia:</p>
      `,
      whyItWorks: `
        <div class="grid-2" style="margin:14px 0;">
          <div style="background:var(--bg-secondary); padding:14px; border-radius:var(--radius-md); border:1px solid var(--border-color);">
            <div style="font-weight:800; color:var(--accent-primary); font-size:1.05rem; margin-bottom:6px;">🏢 1. Decodificador (Decoder: n → 2ⁿ)</div>
            <p style="font-size:0.88rem; color:var(--text-secondary);">
              <strong>Analogia:</strong> É o <em>interfone do prédio</em>. Você digita o número do apartamento em binário (ex: <code>3 bits = 110₂ = 6</code>), e ele toca a campainha de <strong>apenas uma linha de saída</strong> (o apartamento 6 acende, todos os outros ficam mudos).
            </p>
            <div style="font-size:0.8rem; color:var(--warning); margin-top:6px;">
              ⚠️ <strong>Cuidado com as bolinhas na saída:</strong> Se o chip tiver bolhas nas saídas (ativo em baixo), a saída escolhida vai para <code>0</code> e todas as outras ficam em <code>1</code>!
            </div>
          </div>

          <div style="background:var(--bg-secondary); padding:14px; border-radius:var(--radius-md); border:1px solid var(--border-color);">
            <div style="font-weight:800; color:var(--success); font-size:1.05rem; margin-bottom:6px;">⌨️ 2. Codificador (Encoder: 2ⁿ → n)</div>
            <p style="font-size:0.88rem; color:var(--text-secondary);">
              <strong>Analogia:</strong> É o <em>teclado de um cofre</em>. Faz o inverso do decodificador: você aperta um único botão (ex: tecla 7) e ele converte essa ação física no código binário correspondente (<code>0111₂</code>).
            </p>
            <div style="font-size:0.8rem; color:var(--text-muted); margin-top:6px;">
              ⭐ <strong>Codificador de Prioridade:</strong> Se duas teclas forem apertadas ao mesmo tempo, ele ignora a menor e codifica apenas a de <strong>maior valor</strong>!
            </div>
          </div>

          <div style="background:var(--bg-secondary); padding:14px; border-radius:var(--radius-md); border:1px solid var(--border-color);">
            <div style="font-weight:800; color:#38bdf8; font-size:1.05rem; margin-bottom:6px;">📺 3. Multiplexador (MUX: 2ⁿ dados → 1 saída)</div>
            <p style="font-size:0.88rem; color:var(--text-secondary);">
              <strong>Analogia:</strong> É o <em>controle remoto da TV</em>. Você tem vários canais de vídeo chegando na sua casa (<code>I₀, I₁, I₂, I₃...</code>), mas só tem <strong>1 tela</strong>. Os pinos de Seleção (<code>S</code>) escolhem qual entrada passa para a saída.
            </p>
            <div style="font-size:0.8rem; color:var(--success); margin-top:6px;">
              🎯 <strong>Macete:</strong> Para fazer qualquer função lógica com MUX, ligue as variáveis na Seleção. Onde a função deve dar 1, ligue no <strong>VCC (1)</strong>; onde deve dar 0, ligue no <strong>GND (0)</strong>!
            </div>
          </div>

          <div style="background:var(--bg-secondary); padding:14px; border-radius:var(--radius-md); border:1px solid var(--border-color);">
            <div style="font-weight:800; color:#f43f5e; font-size:1.05rem; margin-bottom:6px;">🚰 4. Demultiplexador (DEMUX: 1 dado → 2ⁿ saídas)</div>
            <p style="font-size:0.88rem; color:var(--text-secondary);">
              <strong>Analogia:</strong> É o <em>desvio de trilho de trem</em> ou distribuidor de água. Você tem apenas 1 fluxo de dados na entrada, e a Seleção (<code>S</code>) escolhe por qual dos vários trilhos de saída aquele trem vai seguir viagem.
            </p>
          </div>
        </div>
      `,
      ruleTable: `
        <div style="background:var(--bg-elevated); padding:14px; border-radius:var(--radius-md); border:1px solid var(--border-color); margin:10px 0;">
          <div style="font-weight:800; color:var(--text-primary); margin-bottom:6px;">🔢 Display de 7 Segmentos (a, b, c, d, e, f, g):</div>
          <p style="font-size:0.88rem; color:var(--text-secondary);">
            Formado por 7 LEDs dispostos em formato de <code>8</code>:
            • Topo: <code>a</code> | Superior Dir.: <code>b</code> | Inferior Dir.: <code>c</code> | Base: <code>d</code> | Inferior Esq.: <code>e</code> | Superior Esq.: <code>f</code> | Meio: <code>g</code>.<br>
            • Para mostrar o <strong>'1'</strong>: acendem apenas <code>b</code> e <code>c</code>.<br>
            • Para mostrar o <strong>'0'</strong>: acendem todos menos o centro (<code>g = 0</code>).<br>
            • Para mostrar o <strong>'8'</strong>: acendem todos os 7 segmentos.<br>
            • Como o BCD só vai de 0 a 9, os números de 10 a 15 (1010 a 1111) são <strong>Don't Cares (X)</strong> nos mapas de Karnaugh!
          </p>
        </div>
      `,
      trapAlert: `
        <strong>🚨 IDENTIFICAÇÃO RÁPIDA NA PROVA:</strong><br>
        • Poucas entradas → Muitas saídas (só 1 ativa) = <strong>Decodificador</strong>.<br>
        • Muitas entradas → Poucas saídas (número binário) = <strong>Codificador</strong>.<br>
        • Muitas entradas de dados → <strong>1 ÚNICA saída</strong> controlada por chave seletora = <strong>MUX</strong>.<br>
        • 1 entrada de dado → Muitas saídas controladas por seletor = <strong>DEMUX</strong>.
      `,
      exampleWalkthrough: ""
    },

    // -------------------------------------------------------------------------
    // TÓPICO 4: SOMADORES, COMPARADORES E GRAY
    // -------------------------------------------------------------------------
    {
      id: "top-arith",
      badge: "Tópico 4 de 6 • Aritmética e Comparação",
      title: "4. Aritmética Digital: Meio-Somador (HA), Somador Completo (FA) e Comparador",
      analogy: `
        <p>Como um computador faz contas? No fundo, tudo se resume a somar bits e ver se "vai um" para a próxima casa decimal, exatamente como você aprendeu no primário na conta de mais!</p>
      `,
      whyItWorks: `
        <div class="grid-2" style="margin:12px 0;">
          <div style="background:var(--bg-secondary); padding:14px; border-radius:var(--radius-md); border-left:4px solid var(--accent-primary);">
            <div style="font-weight:800; color:var(--accent-primary); margin-bottom:4px;">1. Meio-Somador (Half-Adder — HA)</div>
            <p style="font-size:0.86rem; color:var(--text-secondary); margin-bottom:8px;">
              Soma apenas <strong>2 bits</strong> (A e B). Não aceita o "vai-um" da conta anterior (não tem Cin).
            </p>
            <ul class="ste-sentence-list" style="font-size:0.86rem;">
              <li><strong>Soma (S):</strong> <code>S = A ⊕ B</code> (Porta XOR: dá 1 se os bits forem diferentes).</li>
              <li><strong>Carry (Cout):</strong> <code>Cout = A · B</code> (Porta AND: só vai 1 se for 1 + 1 = 10₂).</li>
            </ul>
          </div>

          <div style="background:var(--bg-secondary); padding:14px; border-radius:var(--radius-md); border-left:4px solid var(--success);">
            <div style="font-weight:800; color:var(--success); margin-bottom:4px;">2. Somador Completo (Full-Adder — FA)</div>
            <p style="font-size:0.86rem; color:var(--text-secondary); margin-bottom:8px;">
              Soma <strong>3 bits</strong>: A, B e o <strong>Cin</strong> (o "vai-um" que veio da coluna anterior).
            </p>
            <ul class="ste-sentence-list" style="font-size:0.86rem;">
              <li><strong>Soma (S):</strong> <code>S = A ⊕ B ⊕ Cin</code></li>
              <li><strong>Carry (Cout):</strong> <code>Cout = A·B + (A ⊕ B)·Cin</code></li>
              <li><strong>Com 2 HAs:</strong> O 1º HA soma A e B; o 2º HA soma o resultado com Cin; uma porta OR junta os dois Carrys!</li>
            </ul>
          </div>
        </div>
      `,
      ruleTable: `
        <div style="background:var(--bg-elevated); padding:14px; border-radius:var(--radius-md); border:1px solid var(--border-color); margin:12px 0;">
          <div style="font-weight:800; color:var(--warning); margin-bottom:6px;">⚖️ Como Fazer um Comparador de Igualdade de 3 Bits:</div>
          <p style="font-size:0.88rem; color:var(--text-secondary);">
            Como saber se o número <code>A (A₂ A₁ A₀)</code> é exatamente igual ao número <code>B (B₂ B₁ B₀)</code>?<br>
            • A porta <strong>XNOR (⊙)</strong> é o detector de igualdade: ela solta <code>1</code> se os dois bits forem iguais!<br>
            • Comparamos bit a bit: <code>E₂ = (A₂ ⊕ B₂)'</code>, <code>E₁ = (A₁ ⊕ B₁)'</code>, <code>E₀ = (A₀ ⊕ B₀)'</code>.<br>
            • Para os números serem iguais, <strong>TODOS</strong> os bits precisam ser iguais: juntamos tudo em uma porta AND final 👉 <strong><code>Saída (A = B) = E₂ · E₁ · E₀</code></strong>.
          </p>
        </div>
      `,
      trapAlert: `
        <strong>⚡ CONVERSÃO GRAY ↔ BINÁRIO (MEMORIZE ISTO!):</strong><br>
        • <strong>Binário → Gray:</strong> O 1º bit é copiado direto (<code>G₃ = B₃</code>). Depois faça XOR entre bits vizinhos: <code>G₂ = B₃ ⊕ B₂</code>, <code>G₁ = B₂ ⊕ B₁</code>, <code>G₀ = B₁ ⊕ B₀</code>.<br>
        • <strong>Gray → Binário:</strong> O 1º bit é copiado direto (<code>B₃ = G₃</code>). Os seguintes fazem XOR em zigue-zague com a resposta anterior: <code>B₂ = B₃ ⊕ G₂</code>, <code>B₁ = B₂ ⊕ G₁</code>, <code>B₀ = B₁ ⊕ G₀</code>.
      `,
      exampleWalkthrough: ""
    },

    // -------------------------------------------------------------------------
    // TÓPICO 5: CIRCUITOS SEQUENCIAIS (LATCHES E FLIP-FLOPS)
    // -------------------------------------------------------------------------
    {
      id: "top-ff",
      badge: "Tópico 5 de 6 • O Salto da Memória",
      title: "5. Latches e Flip-Flops: O Momento em que o Circuito Ganhou Memória",
      analogy: `
        <p>Até aqui, todos os circuitos eram "desmemoriados": se você mudasse a entrada, a saída mudava na hora e esquecia o que passou. Nos <strong>Circuitos Sequenciais</strong>, existe realimentação: a saída volta para a entrada e fica gravada. <strong>O circuito agora possui estado e memória!</strong></p>
      `,
      whyItWorks: `
        <div style="background:var(--bg-elevated); padding:14px; border-radius:var(--radius-md); border-left:4px solid #ef4444; margin:12px 0;">
          <strong style="color:#ef4444; font-size:1.02rem;">🚨 A DIFERENÇA VITAL: LATCH VS. FLIP-FLOP (100% DE CHANCE NA PROVA!)</strong>
          <div style="margin-top:8px; font-size:0.9rem; color:var(--text-secondary); line-height:1.6;">
            • <strong>Latch (Sensível a NÍVEL):</strong> É como uma porta aberta. Enquanto o sinal de controle (Enable) estiver em nível ALTO (1), a saída é transparente: qualquer alteração na entrada passa direto para a saída durante todo o tempo em que o pulso estiver alto.<br><br>
            • <strong>Flip-Flop (Sensível a BORDA / Edge-Triggered):</strong> É como o clique do obturador de uma câmera fotográfica! Ele só olha para a entrada no instante minúsculo (fração de nanossegundo) em que o Clock muda de estado:
            &nbsp;&nbsp;→ <strong>Borda de Subida (Positiva / ↑):</strong> Símbolo sem bolha no triângulo de clock.<br>
            &nbsp;&nbsp;→ <strong>Borda de Descida (Negativa / ↓):</strong> Símbolo com bolha antes do triângulo de clock.<br>
            Durante todo o resto do tempo, o Flip-Flop fica "congelado", ignorando completamente qualquer ruído nas entradas!
          </div>
        </div>
      `,
      ruleTable: `
        <div style="overflow-x:auto; margin:14px 0;">
          <div style="font-weight:700; color:var(--accent-primary); margin-bottom:6px;">👑 A Tabela-Verdade Suprema do Flip-Flop JK (O Mais Importante da Matéria):</div>
          <table class="ste-table">
            <thead>
              <tr>
                <th>J</th>
                <th>K</th>
                <th>Clock</th>
                <th>Próximo Estado (Q novo)</th>
                <th>Ação / Nome do Modo</th>
                <th>Para que serve na vida real?</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>0</td>
                <td>0</td>
                <td>↑ ou ↓</td>
                <td><strong>Q anterior</strong></td>
                <td><span class="badge badge-secondary">Memória / Mantém</span></td>
                <td>Guarda a informação sem mexer</td>
              </tr>
              <tr>
                <td>0</td>
                <td>1</td>
                <td>↑ ou ↓</td>
                <td><strong>0</strong></td>
                <td><span class="badge badge-danger">Reset</span></td>
                <td>Força a saída para ZERO</td>
              </tr>
              <tr>
                <td>1</td>
                <td>0</td>
                <td>↑ ou ↓</td>
                <td><strong>1</strong></td>
                <td><span class="badge badge-success">Set</span></td>
                <td>Força a saída para UM</td>
              </tr>
              <tr style="background:rgba(245, 158, 11, 0.12); font-weight:800;">
                <td style="color:var(--warning);">1</td>
                <td style="color:var(--warning);">1</td>
                <td>↑ ou ↓</td>
                <td style="color:var(--warning);">Q' (Invertido!)</td>
                <td><span class="badge badge-warning">TOGGLE / COMUTAÇÃO</span></td>
                <td>Inverte o bit a cada clock (Base dos contadores!)</td>
              </tr>
            </tbody>
          </table>
        </div>
      `,
      trapAlert: `
        <strong>⚡ FLIP-FLOP D E ENTRADAS ASSÍNCRONAS:</strong><br>
        • <strong>Flip-Flop D (Data):</strong> Na borda do clock, ele copia o que está em D para a saída: <code>Q_novo = D</code>.<br>
        • <strong>Entradas Assíncronas (PRESET e CLEAR / PRE' e CLR'):</strong> Têm bolhas (ativas em nível 0). <strong>Elas mandam mais que o clock!</strong> Se você colocar 0 no CLR', a saída vai para ZERO na mesma hora, mesmo que o clock esteja parado. É assim que fazemos os contadores resetarem!
      `,
      exampleWalkthrough: ""
    },

    // -------------------------------------------------------------------------
    // TÓPICO 6: REGISTRADORES, CONTADORES E RELÓGIO DIGITAL
    // -------------------------------------------------------------------------
    {
      id: "top-counters",
      badge: "Tópico 6 de 6 • Aplicações Sequenciais",
      title: "6. Registradores, Contadores MOD-N e o Projeto do Relógio Digital",
      analogy: `
        <p>Um contador digital é simplesmente uma cascata de Flip-Flops JK no modo Toggle (<code>J=1, K=1</code>). Como cada Flip-Flop inverte a cada pulso, ele precisa de 2 pulsos para voltar ao início: isso significa que <strong>cada Flip-Flop divide a frequência do clock por 2!</strong></p>
      `,
      whyItWorks: `
        <div style="background:var(--bg-elevated); padding:16px; border-radius:var(--radius-md); border-left:4px solid var(--ste-badge); margin:12px 0;">
          <strong style="color:var(--ste-badge); font-size:1.05rem;">🍳 A FÓRMULA SAGRADA: Como Projetar Qualquer Contador MOD-N (Ex: MOD-6, MOD-10, MOD-12, MOD-14):</strong>
          <div class="ste-steps" style="margin-top:10px;">
            <div class="ste-step-item">
              <div class="step-num">1</div>
              <div>
                <strong>Ache o número de Flip-Flops:</strong> Use <code>2ᴺ ≥ MOD</code>. (Para MOD-6, MOD-10, MOD-12 ou MOD-14, precisamos de <strong>N = 4 Flip-Flops</strong>, pois 2⁴ = 16).
              </div>
            </div>
            <div class="ste-step-item">
              <div class="step-num">2</div>
              <div>
                <strong>Escreva o número MOD em binário</strong> (esse é o número proibido, que ele NÃO deve mostrar):<br>
                • No <strong>MOD-6</strong> (conta 0 a 5): reseta no <strong>6 (0110₂)</strong> 👉 bits <code>C=1, B=1</code>.<br>
                • No <strong>MOD-10 / BCD</strong> (conta 0 a 9): reseta no <strong>10 (1010₂)</strong> 👉 bits <code>D=1, B=1</code>.<br>
                • No <strong>MOD-12</strong> (conta 0 a 11): reseta no <strong>12 (1100₂)</strong> 👉 bits <code>D=1, C=1</code>.<br>
                • No <strong>MOD-14</strong> (conta 0 a 13): reseta no <strong>14 (1110₂)</strong> 👉 bits <code>D=1, C=1, B=1</code>.
              </div>
            </div>
            <div class="ste-step-item">
              <div class="step-num">3</div>
              <div>
                <strong>Ligue uma porta NAND:</strong> Conecte as saídas dos bits que valem <code>1</code> nas entradas da porta NAND.
              </div>
            </div>
            <div class="ste-step-item">
              <div class="step-num">4</div>
              <div>
                <strong>Conecte no CLR':</strong> Ligue o fio de saída da porta NAND nos pinos <code>CLR'</code> de todos os Flip-Flops!<br>
                <em>Como funciona na mágica:</em> No milissegundo em que a contagem chega no número proibido, a NAND solta nível <code>0</code>, aciona o Clear e zera todos os Flip-Flops de volta para <code>0000</code>!
              </div>
            </div>
          </div>
        </div>
      `,
      ruleTable: `
        <div style="background:var(--bg-secondary); padding:16px; border-radius:var(--radius-md); border:1px solid var(--border-color); margin:12px 0;">
          <div style="font-weight:800; color:var(--accent-primary); font-size:1.05rem; margin-bottom:8px;">⏰ O Circuito do Relógio Digital Completo (Questões 17 a 20 da Lista):</div>
          <p style="font-size:0.9rem; color:var(--text-secondary); margin-bottom:10px;">
            O relógio digital junta tudo o que você aprendeu no semestre em uma única máquina elegante:
          </p>
          <div class="ste-steps">
            <div class="ste-step-item">
              <div class="step-num">1</div>
              <div>
                <strong>A Tomada Elétrica (60 Hz):</strong> A rede de energia oscila a 60 ciclos por segundo. Um circuito Schmitt-Trigger transforma a onda senoidal em onda quadrada limpa de <strong>60 Hz</strong>.
              </div>
            </div>
            <div class="ste-step-item">
              <div class="step-num">2</div>
              <div>
                <strong>O Divisor por 60 (Base de Tempo de 1 Segundo):</strong><br>
                Liga um contador <strong>MOD-10</strong> (divide 60 Hz por 10 = 6 Hz) em cascata com um <strong>MOD-6</strong> (divide 6 Hz por 6 = <strong>1 Hz</strong>). Pronto! Agora você tem exatamente <strong>1 pulso por segundo</strong>.
              </div>
            </div>
            <div class="ste-step-item">
              <div class="step-num">3</div>
              <div>
                <strong>Contador de Segundos (MOD-60):</strong> Recebe o pulso de 1 Hz. Um contador BCD conta as unidades de segundo de 0 a 9; ao estourar, avança o contador de dezenas que vai de 0 a 5 (total 00 a 59).
              </div>
            </div>
            <div class="ste-step-item">
              <div class="step-num">4</div>
              <div>
                <strong>Contador de Minutos (MOD-60):</strong> Idêntico ao de segundos. Quando os segundos batem em 59 e viram 00, emitem um pulso que avança 1 minuto.
              </div>
            </div>
            <div class="ste-step-item">
              <div class="step-num">5</div>
              <div>
                <strong>Contador de Horas (MOD-24 ou MOD-12):</strong> Conta as horas e reseta quando bate no limite de 24h ou 12h.
              </div>
            </div>
            <div class="ste-step-item">
              <div class="step-num">6</div>
              <div>
                <strong>Displays:</strong> Cada dígito entrega 4 fios em BCD para um chip decodificador (ex: 7447) que acende os displays de 7 segmentos!
              </div>
            </div>
          </div>
        </div>
      `,
      trapAlert: `
        <strong>⚡ ANEL VS. JOHNSON (PEGADINHA FREQUENTE):</strong><br>
        • <strong>Contador em Anel (Ring Counter):</strong> A saída normal <code>Q</code> do último FF volta para o primeiro. Circula um único bit '1'. O número de estados é igual ao número de FFs: <strong>MOD = N</strong>.<br>
        • <strong>Contador Johnson (Anel Torcido):</strong> A saída invertida <code>Q'</code> do último FF volta para o primeiro. Ele dobra a capacidade: <strong>MOD = 2N</strong> (4 Flip-Flops fazem um MOD-8!).
      `,
      exampleWalkthrough: ""
    }
  ],

  examChecklist: [
    { text: "No Mapa K, a 3ª coluna/linha é SEMPRE 11 e a 4ª é SEMPRE 10 (Código Gray!).", tag: "Karnaugh" },
    { text: "Grupos do Mapa K são SEMPRE potências de 2 (1, 2, 4, 8). Nunca circule 3 ou 6!", tag: "Karnaugh" },
    { text: "Mintermo (∑m): bit 1 é normal, bit 0 é barrado. Maxtermo (∏M): bit 0 é normal, bit 1 é barrado!", tag: "Canônicos" },
    { text: "Somador Completo (FA): S = A ⊕ B ⊕ Cin; Cout = AB + (A ⊕ B)Cin.", tag: "Aritmética" },
    { text: "Flip-Flop JK: J=1 e K=1 é o modo TOGGLE (inverte a cada pulso de clock).", tag: "Flip-Flops" },
    { text: "Para projetar contador MOD-N: coloque uma porta NAND nos bits que valem 1 no número N e ligue no CLR'.", tag: "Contadores" },
    { text: "Divisor de frequência: f_saída = f_clock / MOD. (60 Hz / 60 = 1 Hz).", tag: "Relógio" }
  ]
};
