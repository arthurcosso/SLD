// =============================================================================
// GUIA PRÁTICO LOGISIM — OS 6 CIRCUITOS OBRIGATÓRIOS DO MÓDULO II
// Passo a passo manual + Truque do Analisador Automático + Esquemas de Fios
// =============================================================================

window.SLD_LOGISIM = {
  meta: {
    title: "Guia Passo a Passo: Os 6 Circuitos do Módulo II no Logisim",
    subtitle: "Aprenda a montar do zero (fio por fio) OU gere automaticamente em 15 segundos usando o Analisador do próprio Logisim!",
    circFile: "Circuitos_Modulo2_Logisim.circ"
  },

  circuits: [
    // =========================================================================
    // CIRCUITO 1: CODIFICADOR BCD (DECIMAL -> BCD)
    // =========================================================================
    {
      id: "log-c1",
      number: "Circuito 1 de 6",
      title: "1. Codificador BCD (Decimal 10 Teclas → Código BCD de 4 Bits)",
      pages: "Módulo II • Págs. 66–67",
      summary: "Converte o acionamento de uma entre 10 entradas decimais (I₀ a I₉) no código binário BCD de 4 bits (A₃ A₂ A₁ A₀ com pesos 8, 4, 2, 1).",
      intuitionHTML: `
        <p><strong>🧠 Como entender de primeira:</strong> Imagine um teclado de <code>0</code> a <code>9</code>. Quando você aperta uma tecla (coloca <code>1</code> nela), as 4 lâmpadas de saída (<code>A₃, A₂, A₁, A₀</code> que valem <strong>8, 4, 2, 1</strong>) precisam mostrar aquele número em binário:</p>
        <ul class="ste-sentence-list" style="margin-top:8px;">
          <li>Quando o bit <strong><code>A₃</code> (peso 8)</strong> precisa acender? Apenas quando você aperta o <strong>8 ou o 9</strong>! Então <code>A₃ = I₈ + I₉</code> (1 porta OR de 2 entradas).</li>
          <li>Quando o bit <strong><code>A₂</code> (peso 4)</strong> precisa acender? Quando você aperta <strong>4, 5, 6 ou 7</strong>! Então <code>A₂ = I₄ + I₅ + I₆ + I₇</code> (1 porta OR de 4 entradas).</li>
          <li>Quando o bit <strong><code>A₁</code> (peso 2)</strong> precisa acender? Quando você aperta <strong>2, 3, 6 ou 7</strong>! Então <code>A₁ = I₂ + I₃ + I₆ + I₇</code> (1 porta OR de 4 entradas).</li>
          <li>Quando o bit <strong><code>A₀</code> (peso 1 — números ímpares)</strong> precisa acender? Quando você aperta <strong>1, 3, 5, 7 ou 9</strong>! Então <code>A₀ = I₁ + I₃ + I₅ + I₇ + I₉</code> (1 porta OR de 5 entradas).</li>
          <li><em>E a tecla <code>I₀</code> (zero)?</em> Quando você aperta <code>I₀</code>, todas as outras estão em <code>0</code>, então as 4 portas OR já soltam <code>0000</code> sozinhas!</li>
        </ul>
      `,
      autoLogisimHTML: `
        <strong>⚡ Jeito Automático no Logisim (Em 15 segundos via <code>Projeto → Analisar Circuito</code>):</strong><br>
        1. Na aba <strong>Entradas (Inputs)</strong>, crie: <code>I0, I1, I2, I3, I4, I5, I6, I7, I8, I9</code>.<br>
        2. Na aba <strong>Saídas (Outputs)</strong>, crie: <code>A3, A2, A1, A0</code>.<br>
        3. Na aba <strong>Expressão (Expression)</strong>, cole estas 4 linhas:<br>
        <code>A3 = I8 + I9</code><br>
        <code>A2 = I4 + I5 + I6 + I7</code><br>
        <code>A1 = I2 + I3 + I6 + I7</code><br>
        <code>A0 = I1 + I3 + I5 + I7 + I9</code><br>
        4. Clique em <strong>Construir Circuito (Build Circuit)</strong>!
      `,
      manualStepsHTML: `
        <div class="ste-steps">
          <div style="font-weight:800; color:var(--accent-primary); margin-bottom:8px;">🛠️ Passo a Passo Manual no Logisim (Apenas 4 Portas OR!):</div>
          <div class="ste-step-item"><div class="step-num">1</div><div>Pegue <strong>10 Pinos de Entrada</strong> na barra superior (ícone quadrado verde) e rotule de <code>I0</code> até <code>I9</code>.</div></div>
          <div class="ste-step-item"><div class="step-num">2</div><div>Na pasta <strong>Portas (Gates)</strong>, pegue <strong>4 Portas OR</strong>. Configure nas propriedades à esquerda: a primeira com <em>Number of Inputs = 2</em> (para <code>A3</code>), a segunda com <em>4 entradas</em> (para <code>A2</code>), a terceira com <em>4 entradas</em> (para <code>A1</code>) e a quarta com <em>5 entradas</em> (para <code>A0</code>).</div></div>
          <div class="ste-step-item"><div class="step-num">3</div><div>Puxe os fios conforme o desenho abaixo e coloque <strong>4 Pinos de Saída</strong> (ícone redondo verde) chamados <code>A3, A2, A1, A0</code>.</div></div>
          <div class="ste-step-item"><div class="step-num">4</div><div><strong>Como testar:</strong> Pegue a ferramenta <strong>Mãozinha (Poke Tool)</strong> no canto superior esquerdo, clique em <code>I5</code> (deixando <code>I5 = 1</code>) e veja a saída mostrar <code>A3 A2 A1 A0 = 0 1 0 1</code> (5 em BCD)!</div></div>
        </div>
        <div style="background:var(--bg-primary); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:14px; margin-top:12px; font-family:var(--font-mono); font-size:0.84rem;">
          <strong>📐 Mapa de Fios (Codificador Decimal → BCD):</strong><br><br>
          I8, I9 ───────────────► [ Porta OR (2 entr.) ] ───► <strong>A3 (Peso 8)</strong><br>
          I4, I5, I6, I7 ───────► [ Porta OR (4 entr.) ] ───► <strong>A2 (Peso 4)</strong><br>
          I2, I3, I6, I7 ───────► [ Porta OR (4 entr.) ] ───► <strong>A1 (Peso 2)</strong><br>
          I1, I3, I5, I7, I9 ───► [ Porta OR (5 entr.) ] ───► <strong>A0 (Peso 1)</strong>
        </div>
      `
    },

    // =========================================================================
    // CIRCUITO 2: DECODIFICADOR BCD (4-PARA-10 E 7 SEGMENTOS)
    // =========================================================================
    {
      id: "log-c2",
      number: "Circuito 2 de 6",
      title: "2. Decodificador BCD (BCD 4 Bits → 10 Saídas Decimais / Display 7-Seg)",
      pages: "Módulo II • Págs. 58–65",
      summary: "Faz o inverso do Codificador: recebe os 4 bits BCD (A₃ A₂ A₁ A₀) e ativa 1 entre 10 linhas decimais (Y₀ a Y₉) — ou acende os 7 segmentos (a..g) do display.",
      intuitionHTML: `
        <p><strong>🧠 Como funciona por dentro:</strong> Você digita um número de <code>0000</code> (0) a <code>1001</code> (9) nos 4 pinos de entrada (<code>A3, A2, A1, A0</code>).</p>
        <ul class="ste-sentence-list" style="margin-top:8px;">
          <li>No <strong>Decodificador BCD para Decimal (4-para-10)</strong>: usamos <strong>10 portas AND de 4 entradas</strong>. Cada porta AND detecta exatamente um número de 0 a 9 (ex: a porta do <code>Y5</code> recebe <code>A3' · A2 · A1' · A0</code>, que é <code>0101</code>!).</li>
          <li>No <strong>Decodificador BCD para 7 Segmentos</strong>: as 7 equações (<code>a..g</code>) acendem os traços do mostrador numérico do Logisim! Deixei os dois prontos abaixo:</li>
        </ul>
      `,
      autoLogisimHTML: `
        <strong>⚡ Jeito Automático no Logisim (Via <code>Projeto → Analisar Circuito</code>):</strong><br><br>
        <strong>Opção 2A — Decodificador BCD para 10 Linhas Decimais (Entradas: <code>A3, A2, A1, A0</code> | Saídas: <code>Y0..Y9</code>):</strong><br>
        Cole na aba <em>Expressão</em> de cada saída:<br>
        <code>Y0 = ~A3 ~A2 ~A1 ~A0</code> &nbsp;|&nbsp; <code>Y1 = ~A3 ~A2 ~A1 A0</code> &nbsp;|&nbsp; <code>Y2 = ~A3 ~A2 A1 ~A0</code><br>
        <code>Y3 = ~A3 ~A2 A1 A0</code> &nbsp;&nbsp;|&nbsp; <code>Y4 = ~A3 A2 ~A1 ~A0</code> &nbsp;|&nbsp; <code>Y5 = ~A3 A2 ~A1 A0</code><br>
        <code>Y6 = ~A3 A2 A1 ~A0</code> &nbsp;&nbsp;|&nbsp; <code>Y7 = ~A3 A2 A1 A0</code> &nbsp;&nbsp;|&nbsp; <code>Y8 = A3 ~A2 ~A1 ~A0</code> &nbsp;|&nbsp; <code>Y9 = A3 ~A2 ~A1 A0</code><br><br>
        <strong>Opção 2B — Decodificador BCD para Display 7 Segmentos (Entradas: <code>A, B, C, D</code> | Saídas: <code>a, b, c, d, e, f, g</code>):</strong><br>
        <code>a = A + C + B D + ~B ~D</code><br>
        <code>b = ~B + ~C ~D + C D</code><br>
        <code>c = B + ~C + D</code><br>
        <code>d = A + ~B ~D + ~B C + C ~D + B ~C D</code><br>
        <code>e = ~B ~D + C ~D</code><br>
        <code>f = A + ~C ~D + B ~C + B ~D</code><br>
        <code>g = A + ~B C + B ~C + C ~D</code>
      `,
      manualStepsHTML: `
        <div class="ste-steps">
          <div style="font-weight:800; color:var(--accent-primary); margin-bottom:8px;">🛠️ Passo a Passo Manual no Logisim:</div>
          <div class="ste-step-item"><div class="step-num">1</div><div>Coloque <strong>4 Pinos de Entrada</strong> no topo: <code>A3, A2, A1, A0</code> e puxe 4 fios verticais para baixo.</div></div>
          <div class="ste-step-item"><div class="step-num">2</div><div>Ao lado de cada fio vertical, coloque uma <strong>Porta NOT</strong> apontada para baixo para criar os 4 fios invertidos (<code>A3', A2', A1', A0'</code>). Isso cria um "barramento duplo" de 8 fios verticais!</div></div>
          <div class="ste-step-item"><div class="step-num">3</div><div>Coloque <strong>10 Portas AND de 4 entradas</strong> alinhadas na direita (para <code>Y0</code> até <code>Y9</code>). Para cada número, ligue nos fios correspondentes ao binário daquele número (onde o bit é <code>0</code>, ligue no fio da NOT; onde o bit é <code>1</code>, ligue no fio direto!).</div></div>
        </div>
      `
    },

    // =========================================================================
    // CIRCUITO 3: MUX DE 8 ENTRADAS (MULTIPLEXADOR 8:1)
    // =========================================================================
    {
      id: "log-c3",
      number: "Circuito 3 de 6",
      title: "3. MUX de 8 Entradas (Multiplexador 8 para 1)",
      pages: "Módulo II • Págs. 68–70",
      summary: "Uma chave seletora digital que recebe 8 entradas de dados (I₀ a I₇), 3 pinos seletores (S₂ S₁ S₀) e envia apenas a entrada escolhida para a saída única Y.",
      intuitionHTML: `
        <p><strong>🧠 Como funciona por dentro:</strong> Pense em um seletor de canal de TV com 8 canais (<code>I0</code> até <code>I7</code>) e um controle remoto de 3 bits (<code>S2, S1, S0</code>).</p>
        <ul class="ste-sentence-list" style="margin-top:8px;">
          <li>Colocamos <strong>8 portas AND de 4 entradas</strong> (uma para cada canal <code>I0..I7</code>).</li>
          <li>Cada porta AND recebe o seu canal <code>Ik</code> mais os 3 bits do endereço <code>S2, S1, S0</code> daquele canal. Assim, apenas <strong>1 porta AND fica liberada por vez</strong>!</li>
          <li>No final, uma <strong>porta OR de 8 entradas</strong> junta as 8 portas AND na saída única <code>Y</code>!</li>
        </ul>
      `,
      autoLogisimHTML: `
        <strong>⚡ Jeito Automático no Logisim (Via <code>Projeto → Analisar Circuito</code>):</strong><br>
        1. Em <strong>Entradas (Inputs)</strong>, crie: <code>S2, S1, S0, I0, I1, I2, I3, I4, I5, I6, I7</code>.<br>
        2. Em <strong>Saídas (Outputs)</strong>, crie: <code>Y</code>.<br>
        3. Na aba <strong>Expressão (Expression)</strong>, cole esta linha única e clique em <strong>Construir Circuito</strong>:<br>
        <code>Y = (~S2 ~S1 ~S0 I0) + (~S2 ~S1 S0 I1) + (~S2 S1 ~S0 I2) + (~S2 S1 S0 I3) + (S2 ~S1 ~S0 I4) + (S2 ~S1 S0 I5) + (S2 S1 ~S0 I6) + (S2 S1 S0 I7)</code>
      `,
      manualStepsHTML: `
        <div class="ste-steps">
          <div style="font-weight:800; color:var(--accent-primary); margin-bottom:8px;">🛠️ Passo a Passo Manual no Logisim:</div>
          <div class="ste-step-item"><div class="step-num">1</div><div>Coloque <strong>3 Pinos de Entrada</strong> para os seletores <code>S2, S1, S0</code> e <strong>3 Portas NOT</strong> para ter também <code>S2', S1', S0'</code>.</div></div>
          <div class="ste-step-item"><div class="step-num">2</div><div>Coloque <strong>8 Pinos de Entrada</strong> para os dados <code>I0</code> até <code>I7</code>.</div></div>
          <div class="ste-step-item"><div class="step-num">3</div><div>Coloque <strong>8 Portas AND (de 4 entradas cada)</strong>. Na AND 0, ligue <code>I0</code> com <code>000</code> (<code>S2' S1' S0'</code>); na AND 1, ligue <code>I1</code> com <code>001</code> (<code>S2' S1' S0</code>)... até a AND 7 (<code>I7</code> com <code>111</code> = <code>S2 S1 S0</code>).</div></div>
          <div class="ste-step-item"><div class="step-num">4</div><div>Ligue as saídas das 8 portas AND em <strong>1 Porta OR de 8 entradas</strong> e conecte a saída dela ao pino <strong><code>Y</code></strong>!</div></div>
        </div>
        <div style="background:var(--bg-primary); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:14px; margin-top:12px; font-family:var(--font-mono); font-size:0.84rem;">
          <strong>📐 Resumo das Ligações nas 8 Portas AND do MUX 8:1:</strong><br>
          AND 0: <code>I0 · S2' · S1' · S0'</code> ──┐<br>
          AND 1: <code>I1 · S2' · S1' · S0 </code> ──┤<br>
          AND 2: <code>I2 · S2' · S1  · S0'</code> ──┤<br>
          AND 3: <code>I3 · S2' · S1  · S0 </code> ──├──► [ <strong>Porta OR (8 entradas)</strong> ] ──► <strong>Saída Y</strong><br>
          AND 4: <code>I4 · S2  · S1' · S0'</code> ──┤<br>
          AND 5: <code>I5 · S2  · S1' · S0 </code> ──┤<br>
          AND 6: <code>I6 · S2  · S1  · S0'</code> ──┤<br>
          AND 7: <code>I7 · S2  · S1  · S0 </code> ──┘
        </div>
      `
    },

    // =========================================================================
    // CIRCUITO 4: DEMUX DE 8 SAÍDAS (DEMULTIPLEXADOR 1:8)
    // =========================================================================
    {
      id: "log-c4",
      number: "Circuito 4 de 6",
      title: "4. DEMUX de 8 Saídas (Demultiplexador 1 para 8)",
      pages: "Módulo II • Págs. 75–78",
      summary: "O inverso do MUX: recebe 1 única entrada de dados (E), 3 pinos seletores (S₂ S₁ S₀) e envia o sinal E apenas para a saída escolhida entre as 8 saídas (Y₀ a Y₇).",
      intuitionHTML: `
        <p><strong>🧠 Como funciona por dentro:</strong> Se você já entendeu o MUX de 8 entradas, o DEMUX de 8 saídas é mais fácil ainda!</p>
        <ul class="ste-sentence-list" style="margin-top:8px;">
          <li>Ele usa as <strong>mesmas 8 portas AND de 4 entradas</strong>, mas <strong>NÃO tem porta OR no final</strong> (cada porta AND já vai direto para uma saída <code>Y0</code> até <code>Y7</code>!).</li>
          <li>Em vez de ligar <code>I0..I7</code>, você liga o <strong>mesmo fio de entrada <code>E</code> (Dado)</strong> em todas as 8 portas AND junto com o endereço <code>S2, S1, S0</code>!</li>
        </ul>
      `,
      autoLogisimHTML: `
        <strong>⚡ Jeito Automático no Logisim (Via <code>Projeto → Analisar Circuito</code>):</strong><br>
        1. Em <strong>Entradas (Inputs)</strong>, crie apenas 4 pinos: <code>E, S2, S1, S0</code>.<br>
        2. Em <strong>Saídas (Outputs)</strong>, crie os 8 pinos: <code>Y0, Y1, Y2, Y3, Y4, Y5, Y6, Y7</code>.<br>
        3. Na aba <strong>Expressão (Expression)</strong>, cole em cada saída:<br>
        <code>Y0 = E ~S2 ~S1 ~S0</code> &nbsp;|&nbsp; <code>Y1 = E ~S2 ~S1 S0</code> &nbsp;|&nbsp; <code>Y2 = E ~S2 S1 ~S0</code> &nbsp;|&nbsp; <code>Y3 = E ~S2 S1 S0</code><br>
        <code>Y4 = E S2 ~S1 ~S0</code> &nbsp;&nbsp;|&nbsp; <code>Y5 = E S2 ~S1 S0</code> &nbsp;&nbsp;|&nbsp; <code>Y6 = E S2 S1 ~S0</code> &nbsp;&nbsp;|&nbsp; <code>Y7 = E S2 S1 S0</code><br>
        4. Clique em <strong>Construir Circuito</strong>!
      `,
      manualStepsHTML: `
        <div class="ste-steps">
          <div style="font-weight:800; color:var(--accent-primary); margin-bottom:8px;">🛠️ Passo a Passo Manual no Logisim:</div>
          <div class="ste-step-item"><div class="step-num">1</div><div>Coloque <strong>1 Pino de Entrada</strong> chamado <code>E</code> (Dado de entrada) e <strong>3 Pinos de Entrada</strong> para os seletores <code>S2, S1, S0</code> (com 3 portas NOT para gerar <code>S2', S1', S0'</code>).</div></div>
          <div class="ste-step-item"><div class="step-num">2</div><div>Coloque <strong>8 Portas AND de 4 entradas</strong>. Puxe o fio <code>E</code> para a 1ª entrada de <strong>todas as 8 portas AND</strong>!</div></div>
          <div class="ste-step-item"><div class="step-num">3</div><div>Nas outras 3 entradas de cada porta AND, ligue a combinação binária de <code>000</code> a <code>111</code> de <code>S2, S1, S0</code>.</div></div>
          <div class="ste-step-item"><div class="step-num">4</div><div>Ligue a saída de cada porta AND diretamente nos <strong>8 Pinos de Saída (<code>Y0</code> a <code>Y7</code>)</strong>!</div></div>
        </div>
      `
    },

    // =========================================================================
    // CIRCUITO 5: MEIO SOMADOR E SOMADOR COMPLETO DE 4 BITS
    // =========================================================================
    {
      id: "log-c5",
      number: "Circuito 5 de 6",
      title: "5. Meio-Somador e Somador Completo de 4 Bits (Guia Visual Fio a Fio)",
      pages: "Módulo II • Págs. 82–88",
      summary: "Passo a passo visual com desenho das portas e fios: 1º Meio-Somador (2 portas), 2º Somador Completo de 1 bit (5 portas) e 3º Somador de 4 bits (copiando 4 andares ou usando 4 caixinhas).",
      intuitionHTML: `
        <p><strong>🧠 A escadinha sem mistério (pense em 3 degraus simples):</strong></p>
        <ul class="ste-sentence-list" style="margin-top:8px;">
          <li><strong>Degrau 1 — Meio-Somador (Half Adder):</strong> Soma só <strong>2 bits</strong> (<code>A + B</code>). Usa apenas <strong>2 portas</strong>: <strong>1 XOR</strong> (dá a Soma <code>S</code>) e <strong>1 AND</strong> (dá o Vai-Um <code>C</code>). <em>Por que chama "Meio"? Porque ele não tem entrada para receber o "Vai-Um" da coluna anterior!</em></li>
          <li><strong>Degrau 2 — Somador Completo de 1 Bit (Full Adder):</strong> Soma <strong>3 bits</strong> de uma vez (<code>A + B + Cin</code>, onde <code>Cin</code> é o Vai-Um que veio de trás). Usa apenas <strong>5 portas</strong>: <strong>2 XOR, 2 AND e 1 OR</strong>.</li>
          <li><strong>Degrau 3 — Somador Completo de 4 Bits:</strong> Para somar dois números de 4 bits (<code>A3 A2 A1 A0</code> + <code>B3 B2 B1 B0</code>), você só precisa <strong>repetir o Somador Completo 4 vezes</strong> (Andar 0, Andar 1, Andar 2 e Andar 3) e ligar o fio <strong><code>Cout</code></strong> (saída da porta OR) de um andar direto no <strong><code>Cin</code></strong> do andar de baixo!</li>
        </ul>
      `,
      autoLogisimHTML: `
        <strong>⚡ Atalho Automático no Logisim (<code>Projeto → Analisar Circuito</code>):</strong><br><br>
        • <strong>Para gerar o Meio-Somador sozinho (Entradas: <code>A, B</code> | Saídas: <code>S, C</code>):</strong><br>
        Aba Expressão de <code>S</code>: digite <code>A ^ B</code> &nbsp;&nbsp;|&nbsp;&nbsp; Aba Expressão de <code>C</code>: digite <code>A B</code><br><br>
        • <strong>Para gerar o Somador Completo de 1 Bit sozinho (Entradas: <code>A, B, Cin</code> | Saídas: <code>S, Cout</code>):</strong><br>
        Aba Expressão de <code>S</code>: digite <code>A ^ B ^ Cin</code><br>
        Aba Expressão de <code>Cout</code>: digite <code>(A B) + (A Cin) + (B Cin)</code>
      `,
      manualStepsHTML: `
        <!-- ==================== ETAPA 1: MEIO SOMADOR ==================== -->
        <div style="background:rgba(16,185,129,0.07); border:2px solid rgba(16,185,129,0.35); border-radius:12px; padding:16px; margin-bottom:18px;">
          <div style="font-weight:800; font-size:1.02rem; color:#34d399; margin-bottom:10px;">
            🟢 ETAPA 1 — Como montar o MEIO-SOMADOR (Só 2 Portas!)
          </div>
          <div class="ste-steps">
            <div class="ste-step-item"><div class="step-num">1</div><div>Coloque <strong>2 Pinos de Entrada</strong> na esquerda e dê os nomes <strong><code>A</code></strong> e <strong><code>B</code></strong>.</div></div>
            <div class="ste-step-item"><div class="step-num">2</div><div>Na pasta <code>Portas (Gates)</code>, pegue <strong>1 porta XOR</strong> e <strong>1 porta AND</strong>. Clique em cada uma e mude <code>Número de Entradas (Number of Inputs)</code> para <strong><code>2</code></strong>.</div></div>
            <div class="ste-step-item"><div class="step-num">3</div><div><strong>Ligue os fios:</strong><br>
              • Puxe <strong><code>A</code></strong> e <strong><code>B</code></strong> para as 2 entradas da porta <strong>XOR</strong> → ligue a saída dela no pino de saída <strong><code>S</code> (Soma)</strong>.<br>
              • Puxe também <strong><code>A</code></strong> e <strong><code>B</code></strong> para as 2 entradas da porta <strong>AND</strong> → ligue a saída dela no pino de saída <strong><code>C</code> (Vai-Um / Carry)</strong>. Pronto!</div></div>
          </div>

          <!-- SVG DO MEIO-SOMADOR -->
          <div style="background:#0f172a; border:1px solid #334155; border-radius:10px; padding:12px; margin-top:12px; overflow-x:auto;">
            <div style="font-size:0.78rem; color:#94a3b8; font-weight:700; margin-bottom:6px; text-align:center;">📐 DESENHO EXATO DO MEIO-SOMADOR NO LOGISIM:</div>
            <svg viewBox="0 0 560 175" style="width:100%; max-width:560px; display:block; margin:0 auto; font-family:monospace;">
              <!-- Pinos de Entrada A e B -->
              <rect x="20" y="32" width="36" height="24" rx="4" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
              <text x="38" y="49" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">A</text>
              <rect x="20" y="92" width="36" height="24" rx="4" fill="#1e293b" stroke="#22d3ee" stroke-width="2"/>
              <text x="38" y="109" fill="#22d3ee" font-size="14" font-weight="bold" text-anchor="middle">B</text>

              <!-- Fios de A -->
              <line x1="56" y1="44" x2="220" y2="44" stroke="#38bdf8" stroke-width="2.5"/>
              <circle cx="115" cy="44" r="4" fill="#38bdf8"/>
              <line x1="115" y1="44" x2="115" y2="118" stroke="#38bdf8" stroke-width="2.5"/>
              <line x1="115" y1="118" x2="220" y2="118" stroke="#38bdf8" stroke-width="2.5"/>

              <!-- Fios de B -->
              <line x1="56" y1="104" x2="155" y2="104" stroke="#22d3ee" stroke-width="2.5"/>
              <circle cx="155" cy="104" r="4" fill="#22d3ee"/>
              <line x1="155" y1="104" x2="155" y2="68" stroke="#22d3ee" stroke-width="2.5"/>
              <line x1="155" y1="68" x2="220" y2="68" stroke="#22d3ee" stroke-width="2.5"/>
              <line x1="155" y1="104" x2="155" y2="142" stroke="#22d3ee" stroke-width="2.5"/>
              <line x1="155" y1="142" x2="220" y2="142" stroke="#22d3ee" stroke-width="2.5"/>

              <!-- Porta XOR -->
              <rect x="220" y="30" width="95" height="52" rx="8" fill="#1e1b4b" stroke="#a78bfa" stroke-width="2"/>
              <text x="267" y="53" fill="#c4b5fd" font-size="13" font-weight="bold" text-anchor="middle">Porta XOR</text>
              <text x="267" y="70" fill="#94a3b8" font-size="10" text-anchor="middle">(A ⊕ B)</text>

              <!-- Porta AND -->
              <rect x="220" y="104" width="95" height="52" rx="8" fill="#172554" stroke="#60a5fa" stroke-width="2"/>
              <text x="267" y="127" fill="#93c5fd" font-size="13" font-weight="bold" text-anchor="middle">Porta AND</text>
              <text x="267" y="144" fill="#94a3b8" font-size="10" text-anchor="middle">(A · B)</text>

              <!-- Saídas S e C -->
              <line x1="315" y1="56" x2="410" y2="56" stroke="#34d399" stroke-width="3"/>
              <rect x="410" y="42" width="125" height="28" rx="14" fill="#064e3b" stroke="#34d399" stroke-width="2"/>
              <text x="472" y="60" fill="#6ee7b7" font-size="13" font-weight="bold" text-anchor="middle">S (Soma)</text>

              <line x1="315" y1="130" x2="410" y2="130" stroke="#fb923c" stroke-width="3"/>
              <rect x="410" y="116" width="125" height="28" rx="14" fill="#431407" stroke="#fb923c" stroke-width="2"/>
              <text x="472" y="134" fill="#fdba74" font-size="13" font-weight="bold" text-anchor="middle">C (Vai-Um)</text>
            </svg>
          </div>
        </div>

        <!-- ==================== ETAPA 2: SOMADOR COMPLETO DE 1 BIT ==================== -->
        <div style="background:rgba(59,130,246,0.08); border:2px solid rgba(59,130,246,0.4); border-radius:12px; padding:16px; margin-bottom:18px;">
          <div style="font-weight:800; font-size:1.02rem; color:#60a5fa; margin-bottom:10px;">
            🔵 ETAPA 2 — Como montar o SOMADOR COMPLETO DE 1 BIT (Só 5 Portas!)
          </div>
          <p style="font-size:0.88rem; color:var(--text-secondary); margin-bottom:10px;">
            O Somador Completo soma <strong>3 fios de entrada</strong> (<code>A</code>, <code>B</code> e <code>Cin</code>). Siga as <strong>5 conexões numeradas</strong> abaixo olhando para as cores do desenho:
          </p>
          <div class="ste-steps">
            <div class="ste-step-item"><div class="step-num">1</div><div><strong><code>XOR 1</code>:</strong> Ligue os pinos <strong><code>A</code></strong> e <strong><code>B</code></strong> nela. O fio que sai dela vale <code>A ⊕ B</code> (é o <strong style="color:#c084fc;">Fio Roxo</strong> do desenho!).</div></div>
            <div class="ste-step-item"><div class="step-num">2</div><div><strong><code>XOR 2</code> (Gera a Soma <code>S</code>):</strong> Ligue o <strong style="color:#c084fc;">Fio Roxo</strong> (saída da <code>XOR 1</code>) e o pino <strong style="color:#fb923c;"><code>Cin</code></strong> nas 2 entradas da <code>XOR 2</code>. A saída dela já é o pino <strong style="color:#34d399;"><code>S</code> (Soma)</strong>!</div></div>
            <div class="ste-step-item"><div class="step-num">3</div><div><strong><code>AND 1</code>:</strong> Puxe uma cópia do <strong style="color:#c084fc;">Fio Roxo</strong> e uma cópia do pino <strong style="color:#fb923c;"><code>Cin</code></strong> para as 2 entradas da <code>AND 1</code>.</div></div>
            <div class="ste-step-item"><div class="step-num">4</div><div><strong><code>AND 2</code>:</strong> Puxe uma cópia lá do pino <strong><code>A</code></strong> e outra do pino <strong><code>B</code></strong> para as 2 entradas da <code>AND 2</code>.</div></div>
            <div class="ste-step-item"><div class="step-num">5</div><div><strong><code>OR 1</code> (Gera o Vai-Um <code>Cout</code>):</strong> Ligue a saída da <code>AND 1</code> e a saída da <code>AND 2</code> na porta <code>OR 1</code>. A saída dela é o pino <strong style="color:#fb923c;"><code>Cout</code> (Vai-Um de Saída)</strong>!</div></div>
          </div>

          <!-- SVG DO SOMADOR COMPLETO DE 1 BIT -->
          <div style="background:#0f172a; border:1px solid #334155; border-radius:10px; padding:12px; margin-top:12px; overflow-x:auto;">
            <div style="font-size:0.78rem; color:#94a3b8; font-weight:700; margin-bottom:6px; text-align:center;">📐 MAPA FIO A FIO DO SOMADOR COMPLETO DE 1 BIT (5 PORTAS DE 2 ENTRADAS):</div>
            <svg viewBox="0 0 680 270" style="width:100%; max-width:680px; display:block; margin:0 auto; font-family:monospace;">
              <!-- Pinos A, B, Cin -->
              <rect x="16" y="28" width="44" height="24" rx="4" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
              <text x="38" y="45" fill="#38bdf8" font-size="13" font-weight="bold" text-anchor="middle">A</text>

              <rect x="16" y="72" width="44" height="24" rx="4" fill="#1e293b" stroke="#22d3ee" stroke-width="2"/>
              <text x="38" y="89" fill="#22d3ee" font-size="13" font-weight="bold" text-anchor="middle">B</text>

              <rect x="16" y="130" width="44" height="24" rx="4" fill="#1e293b" stroke="#fb923c" stroke-width="2"/>
              <text x="38" y="147" fill="#fb923c" font-size="13" font-weight="bold" text-anchor="middle">Cin</text>

              <!-- Fios de A (azul) para XOR1 e AND2 -->
              <line x1="60" y1="40" x2="155" y2="40" stroke="#38bdf8" stroke-width="2.5"/>
              <circle cx="92" cy="40" r="4" fill="#38bdf8"/>
              <line x1="92" y1="40" x2="92" y2="210" stroke="#38bdf8" stroke-width="2.5"/>
              <line x1="92" y1="210" x2="320" y2="210" stroke="#38bdf8" stroke-width="2.5"/>

              <!-- Fios de B (ciano) para XOR1 e AND2 -->
              <line x1="60" y1="84" x2="118" y2="84" stroke="#22d3ee" stroke-width="2.5"/>
              <circle cx="118" cy="84" r="4" fill="#22d3ee"/>
              <line x1="118" y1="84" x2="118" y2="64" stroke="#22d3ee" stroke-width="2.5"/>
              <line x1="118" y1="64" x2="155" y2="64" stroke="#22d3ee" stroke-width="2.5"/>
              <line x1="118" y1="84" x2="118" y2="234" stroke="#22d3ee" stroke-width="2.5"/>
              <line x1="118" y1="234" x2="320" y2="234" stroke="#22d3ee" stroke-width="2.5"/>

              <!-- Porta 1: XOR 1 -->
              <rect x="155" y="28" width="88" height="48" rx="8" fill="#1e1b4b" stroke="#a78bfa" stroke-width="2"/>
              <text x="199" y="50" fill="#c4b5fd" font-size="12" font-weight="bold" text-anchor="middle">1. XOR 1</text>
              <text x="199" y="66" fill="#94a3b8" font-size="10" text-anchor="middle">A ⊕ B</text>

              <!-- Fio Roxo (saída da XOR 1 -> vai para XOR 2 e AND 1) -->
              <line x1="243" y1="52" x2="320" y2="52" stroke="#c084fc" stroke-width="3"/>
              <circle cx="275" cy="52" r="4.5" fill="#c084fc"/>
              <line x1="275" y1="52" x2="275" y2="132" stroke="#c084fc" stroke-width="3"/>
              <line x1="275" y1="132" x2="320" y2="132" stroke="#c084fc" stroke-width="3"/>
              <text x="278" y="43" fill="#e879f9" font-size="10" font-weight="bold">Fio Roxo</text>

              <!-- Fio Laranja de Cin (vai para XOR 2 e AND 1) -->
              <line x1="60" y1="142" x2="295" y2="142" stroke="#fb923c" stroke-width="2.5"/>
              <circle cx="295" cy="142" r="4" fill="#fb923c"/>
              <line x1="295" y1="142" x2="295" y2="76" stroke="#fb923c" stroke-width="2.5"/>
              <line x1="295" y1="76" x2="320" y2="76" stroke="#fb923c" stroke-width="2.5"/>
              <line x1="295" y1="142" x2="295" y2="156" stroke="#fb923c" stroke-width="2.5"/>
              <line x1="295" y1="156" x2="320" y2="156" stroke="#fb923c" stroke-width="2.5"/>

              <!-- Porta 2: XOR 2 -->
              <rect x="320" y="40" width="92" height="48" rx="8" fill="#1e1b4b" stroke="#a78bfa" stroke-width="2"/>
              <text x="366" y="62" fill="#c4b5fd" font-size="12" font-weight="bold" text-anchor="middle">2. XOR 2</text>
              <text x="366" y="78" fill="#94a3b8" font-size="10" text-anchor="middle">Soma S</text>

              <!-- Saída S -->
              <line x1="412" y1="64" x2="545" y2="64" stroke="#34d399" stroke-width="3"/>
              <rect x="545" y="50" width="115" height="28" rx="14" fill="#064e3b" stroke="#34d399" stroke-width="2"/>
              <text x="602" y="68" fill="#6ee7b7" font-size="13" font-weight="bold" text-anchor="middle">S (Soma)</text>

              <!-- Porta 3: AND 1 -->
              <rect x="320" y="120" width="92" height="48" rx="8" fill="#172554" stroke="#60a5fa" stroke-width="2"/>
              <text x="366" y="142" fill="#93c5fd" font-size="12" font-weight="bold" text-anchor="middle">3. AND 1</text>
              <text x="366" y="158" fill="#94a3b8" font-size="10" text-anchor="middle">(A⊕B)·Cin</text>

              <!-- Porta 4: AND 2 -->
              <rect x="320" y="198" width="92" height="48" rx="8" fill="#172554" stroke="#60a5fa" stroke-width="2"/>
              <text x="366" y="220" fill="#93c5fd" font-size="12" font-weight="bold" text-anchor="middle">4. AND 2</text>
              <text x="366" y="236" fill="#94a3b8" font-size="10" text-anchor="middle">A · B</text>

              <!-- Fios das ANDs para OR 1 -->
              <line x1="412" y1="144" x2="432" y2="144" stroke="#60a5fa" stroke-width="2.5"/>
              <line x1="432" y1="144" x2="432" y2="172" stroke="#60a5fa" stroke-width="2.5"/>
              <line x1="432" y1="172" x2="450" y2="172" stroke="#60a5fa" stroke-width="2.5"/>

              <line x1="412" y1="222" x2="432" y2="222" stroke="#60a5fa" stroke-width="2.5"/>
              <line x1="432" y1="222" x2="432" y2="196" stroke="#60a5fa" stroke-width="2.5"/>
              <line x1="432" y1="196" x2="450" y2="196" stroke="#60a5fa" stroke-width="2.5"/>

              <!-- Porta 5: OR 1 -->
              <rect x="450" y="160" width="76" height="48" rx="8" fill="#3b0764" stroke="#f472b6" stroke-width="2"/>
              <text x="488" y="182" fill="#f9a8d4" font-size="12" font-weight="bold" text-anchor="middle">5. OR 1</text>
              <text x="488" y="198" fill="#cbd5e1" font-size="10" text-anchor="middle">Vai-Um</text>

              <!-- Saída Cout -->
              <line x1="526" y1="184" x2="545" y2="184" stroke="#fb923c" stroke-width="3"/>
              <rect x="545" y="170" width="115" height="28" rx="14" fill="#431407" stroke="#fb923c" stroke-width="2"/>
              <text x="602" y="188" fill="#fdba74" font-size="13" font-weight="bold" text-anchor="middle">Cout</text>
            </svg>
          </div>
        </div>

        <!-- ==================== ETAPA 3: SOMADOR COMPLETO DE 4 BITS ==================== -->
        <div style="background:rgba(249,115,22,0.08); border:2px solid rgba(249,115,22,0.4); border-radius:12px; padding:16px;">
          <div style="font-weight:800; font-size:1.02rem; color:#fb923c; margin-bottom:10px;">
            🟠 ETAPA 3 — Como montar o SOMADOR COMPLETO DE 4 BITS (Escolha o jeito mais fácil para você!)
          </div>

          <div style="background:rgba(15,23,42,0.65); border:1px solid rgba(251,146,60,0.35); border-radius:10px; padding:14px; margin-bottom:14px;">
            <div style="font-weight:800; color:#fde047; margin-bottom:8px;">
              ⭐ JEITO A (O mais intuitivo — "Copia e Cola 4 Andares na mesma tela", sem subcircuito!):
            </div>
            <div class="ste-steps">
              <div class="ste-step-item"><div class="step-num">1</div><div>Depois de montar as <strong>5 portas da Etapa 2</strong> acima, pegue a <strong>Seta Preta (Ferramenta de Edição)</strong>, arraste um retângulo selecionando as 5 portas, aperte <strong><code>Ctrl + C</code></strong> e dê <strong><code>Ctrl + V</code> três vezes</strong> uma embaixo da outra. Agora você tem <strong>4 Andares iguais</strong> (Andar 0, Andar 1, Andar 2 e Andar 3)!</div></div>
              <div class="ste-step-item"><div class="step-num">2</div><div><strong>Coloque os pinos de cada andar:</strong><br>
                • <strong>Andar 0 (em cima):</strong> Entradas <code>A0</code>, <code>B0</code> e <code>Cin0</code> (vale 0) → Saída da <code>XOR 2</code> vai para o pino <strong><code>S0</code></strong>.<br>
                • <strong>Andar 1:</strong> Entradas <code>A1</code> e <code>B1</code> → Saída da <code>XOR 2</code> vai para o pino <strong><code>S1</code></strong>.<br>
                • <strong>Andar 2:</strong> Entradas <code>A2</code> e <code>B2</code> → Saída da <code>XOR 2</code> vai para o pino <strong><code>S2</code></strong>.<br>
                • <strong>Andar 3 (embaixo):</strong> Entradas <code>A3</code> e <code>B3</code> → Saída da <code>XOR 2</code> vai para o pino <strong><code>S3</code></strong>.</div></div>
              <div class="ste-step-item"><div class="step-num">3</div><div><strong>O Segredo do Fio Laranja (Ligando o Vai-Um de um andar no outro):</strong><br>
                • Puxe um fio da saída da porta <strong><code>OR 1</code> do Andar 0</strong> e ligue direto na linha do <strong><code>Cin</code> do Andar 1</strong> (que entra na <code>XOR 2</code> e na <code>AND 1</code> do Andar 1).<br>
                • Puxe a saída da <strong><code>OR 1</code> do Andar 1</strong> → para o <strong><code>Cin</code> do Andar 2</strong>.<br>
                • Puxe a saída da <strong><code>OR 1</code> do Andar 2</strong> → para o <strong><code>Cin</code> do Andar 3</strong>.<br>
                • A saída da <strong><code>OR 1</code> do Andar 3</strong> vai para o pino final <strong><code>Cout</code> (Vai-Um Final)</strong>!</div></div>
            </div>
          </div>

          <!-- SVG DOS 4 ANDARES CONECTADOS PELO FIO LARANJA -->
          <div style="background:#0f172a; border:1px solid #334155; border-radius:10px; padding:12px; margin-bottom:14px; overflow-x:auto;">
            <div style="font-size:0.78rem; color:#94a3b8; font-weight:700; margin-bottom:6px; text-align:center;">📐 COMO OS 4 ANDARES SE CONECTAM PELO FIO LARANJA (VAI-UM EM CASCATA):</div>
            <svg viewBox="0 0 650 310" style="width:100%; max-width:650px; display:block; margin:0 auto; font-family:monospace;">
              <!-- Andar 0 -->
              <rect x="140" y="16" width="330" height="52" rx="8" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
              <text x="305" y="38" fill="#f8fafc" font-size="12" font-weight="bold" text-anchor="middle">ANDAR 0 (Bit menos significativo - LSB)</text>
              <text x="305" y="55" fill="#94a3b8" font-size="10" text-anchor="middle">5 portas (2 XOR, 2 AND, 1 OR)</text>
              <text x="20" y="34" fill="#38bdf8" font-size="12" font-weight="bold">A0, B0</text>
              <line x1="75" y1="30" x2="140" y2="30" stroke="#38bdf8" stroke-width="2.5"/>
              <text x="20" y="56" fill="#fb923c" font-size="12" font-weight="bold">Cin0=0</text>
              <line x1="75" y1="52" x2="140" y2="52" stroke="#fb923c" stroke-width="2.5"/>
              <line x1="470" y1="32" x2="545" y2="32" stroke="#34d399" stroke-width="3"/>
              <text x="555" y="36" fill="#34d399" font-size="13" font-weight="bold">S0</text>
              <!-- Fio Laranja C1: sai da OR do Andar 0 e entra no Cin do Andar 1 -->
              <line x1="470" y1="54" x2="505" y2="54" stroke="#fb923c" stroke-width="3"/>
              <line x1="505" y1="54" x2="505" y2="78" stroke="#fb923c" stroke-width="3"/>
              <line x1="505" y1="78" x2="105" y2="78" stroke="#fb923c" stroke-width="3" stroke-dasharray="5,3"/>
              <line x1="105" y1="78" x2="105" y2="124" stroke="#fb923c" stroke-width="3"/>
              <line x1="105" y1="124" x2="140" y2="124" stroke="#fb923c" stroke-width="3"/>
              <text x="512" y="70" fill="#fdba74" font-size="10" font-weight="bold">Cout0 → Cin1</text>

              <!-- Andar 1 -->
              <rect x="140" y="88" width="330" height="52" rx="8" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
              <text x="305" y="110" fill="#f8fafc" font-size="12" font-weight="bold" text-anchor="middle">ANDAR 1 (5 portas copiadas com Ctrl+C / Ctrl+V)</text>
              <text x="305" y="127" fill="#94a3b8" font-size="10" text-anchor="middle">Recebe A1, B1 e o Vai-Um Cout0</text>
              <text x="20" y="106" fill="#38bdf8" font-size="12" font-weight="bold">A1, B1</text>
              <line x1="75" y1="102" x2="140" y2="102" stroke="#38bdf8" stroke-width="2.5"/>
              <line x1="470" y1="104" x2="545" y2="104" stroke="#34d399" stroke-width="3"/>
              <text x="555" y="108" fill="#34d399" font-size="13" font-weight="bold">S1</text>
              <!-- Fio Laranja C2 -->
              <line x1="470" y1="126" x2="505" y2="126" stroke="#fb923c" stroke-width="3"/>
              <line x1="505" y1="126" x2="505" y2="150" stroke="#fb923c" stroke-width="3"/>
              <line x1="505" y1="150" x2="105" y2="150" stroke="#fb923c" stroke-width="3" stroke-dasharray="5,3"/>
              <line x1="105" y1="150" x2="105" y2="196" stroke="#fb923c" stroke-width="3"/>
              <line x1="105" y1="196" x2="140" y2="196" stroke="#fb923c" stroke-width="3"/>
              <text x="512" y="142" fill="#fdba74" font-size="10" font-weight="bold">Cout1 → Cin2</text>

              <!-- Andar 2 -->
              <rect x="140" y="160" width="330" height="52" rx="8" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
              <text x="305" y="182" fill="#f8fafc" font-size="12" font-weight="bold" text-anchor="middle">ANDAR 2 (5 portas copiadas com Ctrl+C / Ctrl+V)</text>
              <text x="305" y="199" fill="#94a3b8" font-size="10" text-anchor="middle">Recebe A2, B2 e o Vai-Um Cout1</text>
              <text x="20" y="178" fill="#38bdf8" font-size="12" font-weight="bold">A2, B2</text>
              <line x1="75" y1="174" x2="140" y2="174" stroke="#38bdf8" stroke-width="2.5"/>
              <line x1="470" y1="176" x2="545" y2="176" stroke="#34d399" stroke-width="3"/>
              <text x="555" y="180" fill="#34d399" font-size="13" font-weight="bold">S2</text>
              <!-- Fio Laranja C3 -->
              <line x1="470" y1="198" x2="505" y2="198" stroke="#fb923c" stroke-width="3"/>
              <line x1="505" y1="198" x2="505" y2="222" stroke="#fb923c" stroke-width="3"/>
              <line x1="505" y1="222" x2="105" y2="222" stroke="#fb923c" stroke-width="3" stroke-dasharray="5,3"/>
              <line x1="105" y1="222" x2="105" y2="268" stroke="#fb923c" stroke-width="3"/>
              <line x1="105" y1="268" x2="140" y2="268" stroke="#fb923c" stroke-width="3"/>
              <text x="512" y="214" fill="#fdba74" font-size="10" font-weight="bold">Cout2 → Cin3</text>

              <!-- Andar 3 -->
              <rect x="140" y="232" width="330" height="52" rx="8" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
              <text x="305" y="254" fill="#f8fafc" font-size="12" font-weight="bold" text-anchor="middle">ANDAR 3 (Bit mais significativo - MSB)</text>
              <text x="305" y="271" fill="#94a3b8" font-size="10" text-anchor="middle">Recebe A3, B3 e o Vai-Um Cout2</text>
              <text x="20" y="250" fill="#38bdf8" font-size="12" font-weight="bold">A3, B3</text>
              <line x1="75" y1="246" x2="140" y2="246" stroke="#38bdf8" stroke-width="2.5"/>
              <line x1="470" y1="248" x2="545" y2="248" stroke="#34d399" stroke-width="3"/>
              <text x="555" y="252" fill="#34d399" font-size="13" font-weight="bold">S3</text>
              <line x1="470" y1="272" x2="545" y2="272" stroke="#fb923c" stroke-width="3"/>
              <text x="552" y="276" fill="#fb923c" font-size="12" font-weight="bold">Cout Final</text>
            </svg>
          </div>

          <div style="background:rgba(15,23,42,0.65); border:1px solid rgba(96,165,250,0.35); border-radius:10px; padding:14px;">
            <div style="font-weight:800; color:#93c5fd; margin-bottom:6px;">
              📦 JEITO B (Alternativa com Caixinhas / Subcircuito <code>FA_1bit</code> — Como já deixamos pronto no arquivo <code>.circ</code>!):
            </div>
            <p style="font-size:0.86rem; color:var(--text-secondary); margin:0; line-height:1.55;">
              Se não quiser 20 portas na mesma tela, clique em <strong><code>Projeto → Adicionar Circuito...</code></strong>, digite o nome <strong><code>FA_1bit</code></strong> e monte nele o Somador Completo de 1 Bit (Etapa 2). Depois dê <strong>duplo clique</strong> no circuito principal, clique <strong>1 vez</strong> em <code>FA_1bit</code> na barra esquerda e carimbe <strong>4 caixinhas</strong> na tela. Aí é só ligar a saída <code>Cout</code> de cada caixinha na entrada <code>Cin</code> da caixinha de baixo!<br>
              💡 <strong>Dica de Ouro:</strong> No arquivo <strong><code>Circuitos_Modulo2_Logisim.circ</code></strong> (aqui na sua pasta <code>SLD</code>), nós já deixamos tanto o <strong>Meio-Somador</strong>, quanto o <strong>Somador Completo de 1 Bit</strong> (com as 5 portas desenhadas) e o <strong>Somador Completo de 4 Bits</strong> 100% montados e funcionando para você abrir no Logisim e testar!
            </p>
          </div>
        </div>
      `
    },

    // =========================================================================
    // CIRCUITO 6: CONTADOR CRESCENTE/DECRESCENTE SÍNCRONO DE 4 BITS
    // =========================================================================
    {
      id: "log-c6",
      number: "Circuito 6 de 6",
      title: "6. Contador Crescente/Decrescente Síncrono de 4 Bits (Guia Visual Fio a Fio)",
      pages: "Módulo II • Pág. 168",
      summary: "Passo a passo visual detalhado com diagrama de fiação: 4 Flip-Flops JK com Clock comum e a ponte de portas AND-OR controlada pelo pino M (1 = Conta pra cima 0..15 / 0 = Conta pra baixo 15..0).",
      intuitionHTML: `
        <p><strong>🧠 Como entender o Contador sem decorar fórmula nenhuma:</strong></p>
        <ul class="ste-sentence-list" style="margin-top:8px;">
          <li><strong>O que é Síncrono?</strong> Todos os 4 Flip-Flops mudam no <strong>mesmo instante</strong> porque o mesmo pino de <strong><code>Clock</code></strong> vai ligado em todos eles ao mesmo tempo!</li>
          <li><strong>Regra mágica do Flip-Flop JK:</strong>
            <br>• Se <code>J = 1</code> e <code>K = 1</code> $\rightarrow$ ele <strong>inverte (toggle)</strong>: se era 0 vira 1, se era 1 vira 0.
            <br>• Se <code>J = 0</code> e <code>K = 0</code> $\rightarrow$ ele <strong>fica quieto (mantém o valor)</strong>.
          </li>
          <li><strong>O 1º Flip-Flop (<code>FF0</code>, bit <code>Q0</code>):</strong> Ele tem que mudar em <strong>TODO</strong> pulso de clock (0, 1, 0, 1...). Por isso, colocamos <strong><code>J0 = 1</code> e <code>K0 = 1</code> cravados direto numa Constante 1</strong>!</li>
          <li><strong>E os outros três (<code>FF1, FF2, FF3</code>)?</strong>
            <br>– <strong>Modo Crescente (<code>M = 1</code>):</strong> Um bit só deve virar quando todos os bits anteriores forem <strong>1</strong> (ex: de <code>0111</code> para <code>1000</code>). Olhamos para a saída normal <strong><code>Q</code></strong>.
            <br>– <strong>Modo Decrescente (<code>M = 0</code>, ou seja, <code>M' = 1</code>):</strong> Um bit só deve virar quando todos os bits anteriores forem <strong>0</strong> (ex: de <code>1000</code> para <code>0111</code>). Olhamos para a saída invertida <strong><code>Q'</code></strong> (ou $\bar{Q}$).
          </li>
          <li><strong>A Ponte AND-OR entre cada estágio:</strong> Cada andar intermediário tem um "seletor" simples: uma porta AND para o caminho Crescente, uma porta AND para o caminho Decrescente, e uma porta OR que junta os dois e joga em <code>J</code> e <code>K</code>!</li>
        </ul>
      `,
      autoLogisimHTML: `
        <strong>⚡ Equações das entradas J e K de cada Flip-Flop (Pág. 168 do Módulo II):</strong><br><br>
        • <strong>FF0 (Bit Q0 - LSB):</strong> <code>J0 = 1</code> &nbsp;|&nbsp; <code>K0 = 1</code> (Wiring → Constant 1)<br>
        • <strong>FF1 (Bit Q1):</strong> <code>J1 = K1 = (M · Q0) + (M' · Q0')</code><br>
        • <strong>FF2 (Bit Q2):</strong> <code>J2 = K2 = (M · Q0 · Q1) + (M' · Q0' · Q1')</code><br>
        • <strong>FF3 (Bit Q3 - MSB):</strong> <code>J3 = K3 = (M · Q0 · Q1 · Q2) + (M' · Q0' · Q1' · Q2')</code>
      `,
      manualStepsHTML: `
        <!-- ==================== ETAPA 1: FLIP-FLOPS E CLOCK ==================== -->
        <div style="background:rgba(59,130,246,0.08); border:2px solid rgba(59,130,246,0.4); border-radius:12px; padding:16px; margin-bottom:18px;">
          <div style="font-weight:800; font-size:1.02rem; color:#60a5fa; margin-bottom:10px;">
            🔵 ETAPA 1 — Colocar os 4 Flip-Flops JK e o Clock Comum
          </div>
          <div class="ste-steps">
            <div class="ste-step-item"><div class="step-num">1</div><div>Na barra esquerda, abra a pasta <strong>Memória (Memory)</strong>, clique em <strong>J-K Flip-Flop</strong> e carimbe <strong>4 Flip-Flops lado a lado</strong> no meio da tela (vamos chamá-los da esquerda para a direita de <strong>FF0, FF1, FF2, FF3</strong>).</div></div>
            <div class="ste-step-item"><div class="step-num">2</div><div><strong>Coloque 4 Pinos de Saída (Lâmpadas/Outputs):</strong> Na saída superior direita (pino <code>Q</code>) de cada um, ligue um pino de saída: <strong><code>Q0</code></strong> no FF0, <strong><code>Q1</code></strong> no FF1, <strong><code>Q2</code></strong> no FF2 e <strong><code>Q3</code></strong> no FF3. <em>(Dica: Q0 é o bit da direita, o menos significativo!).</em></div></div>
            <div class="ste-step-item"><div class="step-num">3</div><div><strong>O Fio do Clock (Linha Azul-Marinho):</strong> Na pasta <strong>Fiação (Wiring)</strong>, pegue <strong>1 componente Clock</strong> e coloque lá embaixo. Puxe uma linha horizontal passando por baixo de todos e suba um fio na entrada de <strong>Clock (o triângulo)</strong> de cada um dos 4 Flip-Flops!</div></div>
            <div class="ste-step-item"><div class="step-num">4</div><div><strong>Alimente o FF0 com Constante 1:</strong> Na pasta <strong>Fiação (Wiring)</strong>, pegue uma <strong>Constante (Constant)</strong>, veja nas propriedades se o valor é <code>0x1</code> e ligue o fio dela <strong>tanto na entrada J quanto na entrada K do FF0</strong>. O FF0 já está pronto!</div></div>
          </div>
        </div>

        <!-- ==================== ETAPA 2: TRILHOS DE CONTROLE M E M' ==================== -->
        <div style="background:rgba(168,85,247,0.08); border:2px solid rgba(168,85,247,0.4); border-radius:12px; padding:16px; margin-bottom:18px;">
          <div style="font-weight:800; font-size:1.02rem; color:#c084fc; margin-bottom:10px;">
            🟣 ETAPA 2 — Criar os Trilhos de Controle M (Crescente) e M' (Decrescente)
          </div>
          <div class="ste-steps">
            <div class="ste-step-item"><div class="step-num">1</div><div>Coloque um <strong>Pino de Entrada</strong> no canto superior esquerdo chamado <strong><code>M</code></strong>.</div></div>
            <div class="ste-step-item"><div class="step-num">2</div><div>Puxe um fio horizontal direto desse pino atravessando a parte superior do circuito: esse é o <strong style="color:#38bdf8;">Trilho M (Crescente)</strong>.</div></div>
            <div class="ste-step-item"><div class="step-num">3</div><div>Puxe uma ramificação do pino <code>M</code> para uma <strong>porta NOT</strong>. O fio que sai da porta NOT corre paralelo logo abaixo: esse é o <strong style="color:#f472b6;">Trilho M' (Decrescente)</strong>.</div></div>
          </div>
        </div>

        <!-- ==================== ETAPA 3: A PONTE AND-OR ==================== -->
        <div style="background:rgba(249,115,22,0.08); border:2px solid rgba(249,115,22,0.4); border-radius:12px; padding:16px; margin-bottom:18px;">
          <div style="font-weight:800; font-size:1.02rem; color:#fb923c; margin-bottom:10px;">
            🟠 ETAPA 3 — A Ponte de Portas AND-OR entre os Flip-Flops (O Segredo da Cascata!)
          </div>
          <p style="font-size:0.88rem; color:var(--text-secondary); margin-bottom:10px;">
            Entre cada par de Flip-Flops você só precisa de <strong>3 portinhas de 2 entradas: 2 AND e 1 OR</strong>.
          </p>
          <div class="ste-steps">
            <div class="ste-step-item"><div class="step-num">1</div><div><strong>Ponte 1 (Entre FF0 e FF1):</strong><br>
              • <strong>AND de Cima (Crescente):</strong> Liga no <strong style="color:#38bdf8;">Trilho M</strong> e na saída normal <strong><code>Q0</code></strong> do FF0.<br>
              • <strong>AND de Baixo (Decrescente):</strong> Liga no <strong style="color:#f472b6;">Trilho M'</strong> e na saída invertida <strong><code>Q0'</code></strong> (o pino de baixo do FF0).<br>
              • <strong>Porta OR:</strong> Junta as saídas dessas 2 portas AND. A saída da OR vai conectada <strong>ao mesmo tempo na entrada J e na entrada K do FF1</strong>!</div></div>
            <div class="ste-step-item"><div class="step-num">2</div><div><strong>Ponte 2 (Entre FF1 e FF2):</strong><br>
              • <strong>AND de Cima:</strong> Liga na <em>saída da AND de cima anterior</em> e na saída <strong><code>Q1</code></strong> do FF1.<br>
              • <strong>AND de Baixo:</strong> Liga na <em>saída da AND de baixo anterior</em> e na saída invertida <strong><code>Q1'</code></strong> do FF1.<br>
              • <strong>Porta OR:</strong> Junta as saídas das duas e liga nas entradas <strong>J e K do FF2</strong>!</div></div>
            <div class="ste-step-item"><div class="step-num">3</div><div><strong>Ponte 3 (Entre FF2 e FF3):</strong><br>
              • <strong>AND de Cima:</strong> Liga na <em>saída da AND de cima anterior</em> e na saída <strong><code>Q2</code></strong> do FF2.<br>
              • <strong>AND de Baixo:</strong> Liga na <em>saída da AND de baixo anterior</em> e na saída invertida <strong><code>Q2'</code></strong> do FF2.<br>
              • <strong>Porta OR:</strong> Junta as saídas das duas e liga nas entradas <strong>J e K do FF3</strong>!</div></div>
          </div>
        </div>

        <!-- ==================== DIAGRAMA SVG COMPLETO DO CIRCUITO 6 ==================== -->
        <div style="background:#0f172a; border:1px solid #334155; border-radius:10px; padding:12px; margin-bottom:18px; overflow-x:auto;">
          <div style="font-size:0.82rem; color:#38bdf8; font-weight:800; margin-bottom:8px; text-align:center;">📐 DIAGRAMA COMPLETO FIO A FIO DO CONTADOR SÍNCRONO (4 BITS):</div>
          <svg viewBox="0 0 1120 440" style="width:100%; min-width:980px; display:block; margin:0 auto; font-family:monospace;">
            <!-- Trilho M e M' -->
            <rect x="20" y="20" width="45" height="24" rx="4" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
            <text x="42" y="37" fill="#38bdf8" font-size="13" font-weight="bold" text-anchor="middle">M</text>
            <line x1="65" y1="32" x2="1080" y2="32" stroke="#38bdf8" stroke-width="2.5"/>
            <text x="1000" y="24" fill="#38bdf8" font-size="11" font-weight="bold">Trilho M (Crescente)</text>

            <!-- NOT para M' -->
            <circle cx="100" cy="32" r="4" fill="#38bdf8"/>
            <line x1="100" y1="32" x2="100" y2="60" stroke="#38bdf8" stroke-width="2"/>
            <line x1="100" y1="60" x2="115" y2="60" stroke="#38bdf8" stroke-width="2"/>
            <polygon points="115,50 145,60 115,70" fill="#1e293b" stroke="#f472b6" stroke-width="2"/>
            <circle cx="149" cy="60" r="4" fill="#1e293b" stroke="#f472b6" stroke-width="2"/>
            <line x1="153" y1="60" x2="1080" y2="60" stroke="#f472b6" stroke-width="2.5"/>
            <text x="990" y="76" fill="#f472b6" font-size="11" font-weight="bold">Trilho M' (Decrescente)</text>

            <!-- ================= FF0 ================= -->
            <rect x="50" y="140" width="80" height="110" rx="6" fill="#1e293b" stroke="#60a5fa" stroke-width="2"/>
            <text x="90" y="162" fill="#93c5fd" font-size="13" font-weight="bold" text-anchor="middle">FF 0</text>
            <text x="62" y="180" fill="#94a3b8" font-size="11">J</text>
            <text x="62" y="235" fill="#94a3b8" font-size="11">K</text>
            <text x="115" y="180" fill="#34d399" font-size="11" font-weight="bold">Q</text>
            <text x="112" y="235" fill="#f472b6" font-size="11" font-weight="bold">Q'</text>
            <polygon points="50,200 62,206 50,212" fill="none" stroke="#cbd5e1" stroke-width="2"/>

            <!-- Constante 1 para FF0 -->
            <rect x="15" y="195" width="22" height="22" rx="3" fill="#064e3b" stroke="#34d399" stroke-width="1.5"/>
            <text x="26" y="211" fill="#6ee7b7" font-size="12" font-weight="bold" text-anchor="middle">1</text>
            <line x1="37" y1="206" x2="45" y2="206" stroke="#34d399" stroke-width="2"/>
            <line x1="45" y1="176" x2="45" y2="231" stroke="#34d399" stroke-width="2"/>
            <line x1="45" y1="176" x2="50" y2="176" stroke="#34d399" stroke-width="2"/>
            <line x1="45" y1="231" x2="50" y2="231" stroke="#34d399" stroke-width="2"/>

            <!-- Saída Q0 -->
            <line x1="130" y1="176" x2="165" y2="176" stroke="#34d399" stroke-width="2.5"/>
            <circle cx="165" cy="176" r="4" fill="#34d399"/>
            <line x1="165" y1="176" x2="165" y2="105" stroke="#34d399" stroke-width="2.5"/>
            <rect x="145" y="85" width="40" height="20" rx="10" fill="#064e3b" stroke="#34d399" stroke-width="1.5"/>
            <text x="165" y="99" fill="#6ee7b7" font-size="11" font-weight="bold" text-anchor="middle">Q0</text>

            <!-- ================= PONTE 1 (AND1_C, AND1_D, OR1) ================= -->
            <!-- AND1_C (Crescente) -->
            <rect x="200" y="145" width="45" height="30" rx="4" fill="#172554" stroke="#38bdf8" stroke-width="1.5"/>
            <text x="222" y="164" fill="#93c5fd" font-size="10" text-anchor="middle">AND</text>
            <line x1="190" y1="32" x2="190" y2="152" stroke="#38bdf8" stroke-width="2"/>
            <circle cx="190" cy="32" r="3.5" fill="#38bdf8"/>
            <line x1="190" y1="152" x2="200" y2="152" stroke="#38bdf8" stroke-width="2"/>
            <line x1="165" y1="168" x2="200" y2="168" stroke="#34d399" stroke-width="2"/>
            <line x1="165" y1="176" x2="165" y2="168" stroke="#34d399" stroke-width="2"/>

            <!-- AND1_D (Decrescente) -->
            <rect x="200" y="215" width="45" height="30" rx="4" fill="#3b0764" stroke="#f472b6" stroke-width="1.5"/>
            <text x="222" y="234" fill="#f9a8d4" font-size="10" text-anchor="middle">AND</text>
            <line x1="195" y1="60" x2="195" y2="222" stroke="#f472b6" stroke-width="2"/>
            <circle cx="195" cy="60" r="3.5" fill="#f472b6"/>
            <line x1="195" y1="222" x2="200" y2="222" stroke="#f472b6" stroke-width="2"/>
            <!-- Fio Q0' -->
            <line x1="130" y1="231" x2="180" y2="231" stroke="#f472b6" stroke-width="2"/>
            <circle cx="180" cy="231" r="3.5" fill="#f472b6"/>
            <line x1="180" y1="231" x2="180" y2="238" stroke="#f472b6" stroke-width="2"/>
            <line x1="180" y1="238" x2="200" y2="238" stroke="#f472b6" stroke-width="2"/>

            <!-- OR1 -->
            <rect x="270" y="180" width="42" height="32" rx="4" fill="#431407" stroke="#fb923c" stroke-width="1.5"/>
            <text x="291" y="200" fill="#fdba74" font-size="10" text-anchor="middle">OR</text>
            <line x1="245" y1="160" x2="255" y2="160" stroke="#38bdf8" stroke-width="2"/>
            <line x1="255" y1="160" x2="255" y2="188" stroke="#38bdf8" stroke-width="2"/>
            <line x1="255" y1="188" x2="270" y2="188" stroke="#38bdf8" stroke-width="2"/>
            <line x1="245" y1="230" x2="255" y2="230" stroke="#f472b6" stroke-width="2"/>
            <line x1="255" y1="230" x2="255" y2="204" stroke="#f472b6" stroke-width="2"/>
            <line x1="255" y1="204" x2="270" y2="204" stroke="#f472b6" stroke-width="2"/>

            <!-- Saída da OR1 para J e K do FF1 -->
            <line x1="312" y1="196" x2="330" y2="196" stroke="#fb923c" stroke-width="2.5"/>
            <line x1="330" y1="176" x2="330" y2="231" stroke="#fb923c" stroke-width="2"/>
            <line x1="330" y1="176" x2="345" y2="176" stroke="#fb923c" stroke-width="2"/>
            <line x1="330" y1="231" x2="345" y2="231" stroke="#fb923c" stroke-width="2"/>

            <!-- ================= FF1 ================= -->
            <rect x="345" y="140" width="80" height="110" rx="6" fill="#1e293b" stroke="#60a5fa" stroke-width="2"/>
            <text x="385" y="162" fill="#93c5fd" font-size="13" font-weight="bold" text-anchor="middle">FF 1</text>
            <text x="357" y="180" fill="#94a3b8" font-size="11">J</text>
            <text x="357" y="235" fill="#94a3b8" font-size="11">K</text>
            <text x="410" y="180" fill="#34d399" font-size="11" font-weight="bold">Q</text>
            <text x="407" y="235" fill="#f472b6" font-size="11" font-weight="bold">Q'</text>
            <polygon points="345,200 357,206 345,212" fill="none" stroke="#cbd5e1" stroke-width="2"/>

            <!-- Saída Q1 -->
            <line x1="425" y1="176" x2="455" y2="176" stroke="#34d399" stroke-width="2.5"/>
            <circle cx="455" cy="176" r="4" fill="#34d399"/>
            <line x1="455" y1="176" x2="455" y2="105" stroke="#34d399" stroke-width="2.5"/>
            <rect x="435" y="85" width="40" height="20" rx="10" fill="#064e3b" stroke="#34d399" stroke-width="1.5"/>
            <text x="455" y="99" fill="#6ee7b7" font-size="11" font-weight="bold" text-anchor="middle">Q1</text>

            <!-- ================= PONTE 2 (AND2_C, AND2_D, OR2) ================= -->
            <!-- AND2_C -->
            <rect x="490" y="145" width="45" height="30" rx="4" fill="#172554" stroke="#38bdf8" stroke-width="1.5"/>
            <text x="512" y="164" fill="#93c5fd" font-size="10" text-anchor="middle">AND</text>
            <!-- Fio da AND1_C anterior -->
            <line x1="245" y1="160" x2="250" y2="160" stroke="#38bdf8" stroke-width="2"/>
            <circle cx="250" cy="160" r="3" fill="#38bdf8"/>
            <line x1="250" y1="160" x2="250" y2="135" stroke="#38bdf8" stroke-width="2"/>
            <line x1="250" y1="135" x2="480" y2="135" stroke="#38bdf8" stroke-width="2"/>
            <line x1="480" y1="135" x2="480" y2="152" stroke="#38bdf8" stroke-width="2"/>
            <line x1="480" y1="152" x2="490" y2="152" stroke="#38bdf8" stroke-width="2"/>
            <!-- Q1 entra na AND2_C -->
            <line x1="455" y1="168" x2="490" y2="168" stroke="#34d399" stroke-width="2"/>
            <line x1="455" y1="176" x2="455" y2="168" stroke="#34d399" stroke-width="2"/>

            <!-- AND2_D -->
            <rect x="490" y="215" width="45" height="30" rx="4" fill="#3b0764" stroke="#f472b6" stroke-width="1.5"/>
            <text x="512" y="234" fill="#f9a8d4" font-size="10" text-anchor="middle">AND</text>
            <!-- Fio da AND1_D anterior -->
            <line x1="245" y1="230" x2="250" y2="230" stroke="#f472b6" stroke-width="2"/>
            <circle cx="250" cy="230" r="3" fill="#f472b6"/>
            <line x1="250" y1="230" x2="250" y2="255" stroke="#f472b6" stroke-width="2"/>
            <line x1="250" y1="255" x2="480" y2="255" stroke="#f472b6" stroke-width="2"/>
            <line x1="480" y1="255" x2="480" y2="222" stroke="#f472b6" stroke-width="2"/>
            <line x1="480" y1="222" x2="490" y2="222" stroke="#f472b6" stroke-width="2"/>
            <!-- Fio Q1' -->
            <line x1="425" y1="231" x2="470" y2="231" stroke="#f472b6" stroke-width="2"/>
            <circle cx="470" cy="231" r="3.5" fill="#f472b6"/>
            <line x1="470" y1="231" x2="470" y2="238" stroke="#f472b6" stroke-width="2"/>
            <line x1="470" y1="238" x2="490" y2="238" stroke="#f472b6" stroke-width="2"/>

            <!-- OR2 -->
            <rect x="560" y="180" width="42" height="32" rx="4" fill="#431407" stroke="#fb923c" stroke-width="1.5"/>
            <text x="581" y="200" fill="#fdba74" font-size="10" text-anchor="middle">OR</text>
            <line x1="535" y1="160" x2="545" y2="160" stroke="#38bdf8" stroke-width="2"/>
            <line x1="545" y1="160" x2="545" y2="188" stroke="#38bdf8" stroke-width="2"/>
            <line x1="545" y1="188" x2="560" y2="188" stroke="#38bdf8" stroke-width="2"/>
            <line x1="535" y1="230" x2="545" y2="230" stroke="#f472b6" stroke-width="2"/>
            <line x1="545" y1="230" x2="545" y2="204" stroke="#f472b6" stroke-width="2"/>
            <line x1="545" y1="204" x2="560" y2="204" stroke="#f472b6" stroke-width="2"/>

            <!-- Saída da OR2 para J e K do FF2 -->
            <line x1="602" y1="196" x2="620" y2="196" stroke="#fb923c" stroke-width="2.5"/>
            <line x1="620" y1="176" x2="620" y2="231" stroke="#fb923c" stroke-width="2"/>
            <line x1="620" y1="176" x2="635" y2="176" stroke="#fb923c" stroke-width="2"/>
            <line x1="620" y1="231" x2="635" y2="231" stroke="#fb923c" stroke-width="2"/>

            <!-- ================= FF2 ================= -->
            <rect x="635" y="140" width="80" height="110" rx="6" fill="#1e293b" stroke="#60a5fa" stroke-width="2"/>
            <text x="675" y="162" fill="#93c5fd" font-size="13" font-weight="bold" text-anchor="middle">FF 2</text>
            <text x="647" y="180" fill="#94a3b8" font-size="11">J</text>
            <text x="647" y="235" fill="#94a3b8" font-size="11">K</text>
            <text x="700" y="180" fill="#34d399" font-size="11" font-weight="bold">Q</text>
            <text x="697" y="235" fill="#f472b6" font-size="11" font-weight="bold">Q'</text>
            <polygon points="635,200 647,206 635,212" fill="none" stroke="#cbd5e1" stroke-width="2"/>

            <!-- Saída Q2 -->
            <line x1="715" y1="176" x2="745" y2="176" stroke="#34d399" stroke-width="2.5"/>
            <circle cx="745" cy="176" r="4" fill="#34d399"/>
            <line x1="745" y1="176" x2="745" y2="105" stroke="#34d399" stroke-width="2.5"/>
            <rect x="725" y="85" width="40" height="20" rx="10" fill="#064e3b" stroke="#34d399" stroke-width="1.5"/>
            <text x="745" y="99" fill="#6ee7b7" font-size="11" font-weight="bold" text-anchor="middle">Q2</text>

            <!-- ================= PONTE 3 (AND3_C, AND3_D, OR3) ================= -->
            <!-- AND3_C -->
            <rect x="780" y="145" width="45" height="30" rx="4" fill="#172554" stroke="#38bdf8" stroke-width="1.5"/>
            <text x="802" y="164" fill="#93c5fd" font-size="10" text-anchor="middle">AND</text>
            <line x1="535" y1="160" x2="540" y2="160" stroke="#38bdf8" stroke-width="2"/>
            <circle cx="540" cy="160" r="3" fill="#38bdf8"/>
            <line x1="540" y1="160" x2="540" y2="135" stroke="#38bdf8" stroke-width="2"/>
            <line x1="540" y1="135" x2="770" y2="135" stroke="#38bdf8" stroke-width="2"/>
            <line x1="770" y1="135" x2="770" y2="152" stroke="#38bdf8" stroke-width="2"/>
            <line x1="770" y1="152" x2="780" y2="152" stroke="#38bdf8" stroke-width="2"/>
            <line x1="745" y1="168" x2="780" y2="168" stroke="#34d399" stroke-width="2"/>
            <line x1="745" y1="176" x2="745" y2="168" stroke="#34d399" stroke-width="2"/>

            <!-- AND3_D -->
            <rect x="780" y="215" width="45" height="30" rx="4" fill="#3b0764" stroke="#f472b6" stroke-width="1.5"/>
            <text x="802" y="234" fill="#f9a8d4" font-size="10" text-anchor="middle">AND</text>
            <line x1="535" y1="230" x2="540" y2="230" stroke="#f472b6" stroke-width="2"/>
            <circle cx="540" cy="230" r="3" fill="#f472b6"/>
            <line x1="540" y1="230" x2="540" y2="255" stroke="#f472b6" stroke-width="2"/>
            <line x1="540" y1="255" x2="770" y2="255" stroke="#f472b6" stroke-width="2"/>
            <line x1="770" y1="255" x2="770" y2="222" stroke="#f472b6" stroke-width="2"/>
            <line x1="770" y1="222" x2="780" y2="222" stroke="#f472b6" stroke-width="2"/>
            <line x1="715" y1="231" x2="760" y2="231" stroke="#f472b6" stroke-width="2"/>
            <circle cx="760" cy="231" r="3.5" fill="#f472b6"/>
            <line x1="760" y1="231" x2="760" y2="238" stroke="#f472b6" stroke-width="2"/>
            <line x1="760" y1="238" x2="780" y2="238" stroke="#f472b6" stroke-width="2"/>

            <!-- OR3 -->
            <rect x="850" y="180" width="42" height="32" rx="4" fill="#431407" stroke="#fb923c" stroke-width="1.5"/>
            <text x="871" y="200" fill="#fdba74" font-size="10" text-anchor="middle">OR</text>
            <line x1="825" y1="160" x2="835" y2="160" stroke="#38bdf8" stroke-width="2"/>
            <line x1="835" y1="160" x2="835" y2="188" stroke="#38bdf8" stroke-width="2"/>
            <line x1="835" y1="188" x2="850" y2="188" stroke="#38bdf8" stroke-width="2"/>
            <line x1="825" y1="230" x2="835" y2="230" stroke="#f472b6" stroke-width="2"/>
            <line x1="835" y1="230" x2="835" y2="204" stroke="#f472b6" stroke-width="2"/>
            <line x1="835" y1="204" x2="850" y2="204" stroke="#f472b6" stroke-width="2"/>

            <!-- Saída da OR3 para J e K do FF3 -->
            <line x1="892" y1="196" x2="910" y2="196" stroke="#fb923c" stroke-width="2.5"/>
            <line x1="910" y1="176" x2="910" y2="231" stroke="#fb923c" stroke-width="2"/>
            <line x1="910" y1="176" x2="925" y2="176" stroke="#fb923c" stroke-width="2"/>
            <line x1="910" y1="231" x2="925" y2="231" stroke="#fb923c" stroke-width="2"/>

            <!-- ================= FF3 (O ÚLTIMO FLIP-FLOP!) ================= -->
            <rect x="925" y="140" width="80" height="110" rx="6" fill="#1e293b" stroke="#60a5fa" stroke-width="2"/>
            <text x="965" y="162" fill="#93c5fd" font-size="13" font-weight="bold" text-anchor="middle">FF 3</text>
            <text x="937" y="180" fill="#94a3b8" font-size="11">J</text>
            <text x="937" y="235" fill="#94a3b8" font-size="11">K</text>
            <text x="990" y="180" fill="#34d399" font-size="11" font-weight="bold">Q</text>
            <text x="987" y="235" fill="#64748b" font-size="10">(livre)</text>
            <polygon points="925,200 937,206 925,212" fill="none" stroke="#cbd5e1" stroke-width="2"/>

            <!-- Saída Q3 (Bit Mais Significativo - MSB) -->
            <line x1="1005" y1="176" x2="1055" y2="176" stroke="#34d399" stroke-width="2.5"/>
            <circle cx="1055" cy="176" r="4" fill="#34d399"/>
            <line x1="1055" y1="176" x2="1055" y2="105" stroke="#34d399" stroke-width="2.5"/>
            <rect x="1035" y="85" width="40" height="20" rx="10" fill="#064e3b" stroke="#34d399" stroke-width="1.5"/>
            <text x="1055" y="99" fill="#6ee7b7" font-size="11" font-weight="bold" text-anchor="middle">Q3</text>

            <!-- ================= LINHA DE CLOCK COMUM EMBAIXO ================= -->
            <rect x="20" y="360" width="55" height="26" rx="4" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
            <text x="47" y="378" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Clock</text>
            <line x1="75" y1="373" x2="980" y2="373" stroke="#cbd5e1" stroke-width="2.5"/>
            <text x="500" y="395" fill="#94a3b8" font-size="11" text-anchor="middle">Fio Único do Clock (Síncrono) - Liga nos 4 Flip-Flops ao mesmo tempo</text>

            <!-- Subidas do Clock para os 4 FFs -->
            <line x1="50" y1="373" x2="50" y2="206" stroke="#cbd5e1" stroke-width="2"/>
            <line x1="345" y1="373" x2="345" y2="206" stroke="#cbd5e1" stroke-width="2"/>
            <circle cx="345" cy="373" r="3.5" fill="#cbd5e1"/>
            <line x1="635" y1="373" x2="635" y2="206" stroke="#cbd5e1" stroke-width="2"/>
            <circle cx="635" cy="373" r="3.5" fill="#cbd5e1"/>
            <line x1="925" y1="373" x2="925" y2="206" stroke="#cbd5e1" stroke-width="2"/>
            <circle cx="925" cy="373" r="3.5" fill="#cbd5e1"/>
          </svg>
        </div>

        <!-- ==================== COMO TESTAR NO LOGISIM ==================== -->
        <div style="background:rgba(16,185,129,0.08); border:2px solid rgba(16,185,129,0.4); border-radius:12px; padding:16px;">
          <div style="font-weight:800; font-size:1.02rem; color:#34d399; margin-bottom:8px;">
            🕹️ Como Testar no Logisim (Ver a Mágica Acontecendo):
          </div>
          <ol class="ste-sentence-list" style="margin:0; line-height:1.6;">
            <li>Pegue a <strong>Mãozinha (Poke Tool)</strong>.</li>
            <li>Coloque o pino <strong><code>M = 1</code></strong> (Crescente).</li>
            <li>Aperte o atalho <strong><code>Ctrl + K</code></strong> (ou vá no menu <em>Simulate → Ticks Enabled</em>). O Clock começará a pulsar sozinho!</li>
            <li>Olhe para as 4 saídas: elas vão contar de <code>0000 (0)</code> até <code>1111 (15)</code> perfeitamente!</li>
            <li>Agora, com o clock rodando, <strong>clique no pino <code>M</code> para mudar para <code>0</code></strong>: o contador vai inverter na hora e começar a descer (<code>15 → 14 → 13 → ... → 0</code>)!</li>
          </ol>
        </div>
      `
    }
  ]
};
