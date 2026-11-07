// =============================================================================
// LISTA DE EXERCÍCIOS A5 (MÓDULO 2 - 20 QUESTÕES) — RESOLUÇÃO PASSO A PASSO
// Explicação Intuitiva ("Aula Junto") + Tabelas + Mapas de Karnaugh + Caderno
// =============================================================================

window.SLD_LISTA_A5 = {
  meta: {
    title: "Lista de Exercícios — Atividade A5 (Módulo 2 • 20 Questões Resolvidas)",
    professor: "Prof. Ricardo Martins Ramos • Dom Helder Câmara",
    instructions: "Cada questão abaixo tem: (1) Aula Rápida do assunto sem mistério, (2) Passo a passo linha por linha mostrando de onde sai cada bit, e (3) Caixa verde pronta para você passar a limpo no caderno!"
  },

  questions: [
    // =========================================================================
    // QUESTÃO 1 - ITEM (i)
    // =========================================================================
    {
      id: "q1-i",
      number: "Questão 1 — Item i)",
      badge: "Álgebra + Tabela + Karnaugh",
      enunciado: "1. i) Seja a função booleana f₁(A, B, C) = (A + B)C + (A ⊕ C)AB.\na) Represente por soma canônica de mintermos e produto de maxtermos;\nb) Simplifique algebricamente;\nc) Faça sua tabela-verdade;\nd) Desenhe o mapa de Karnaugh;\ne) Simplifique a expressão SOP pelo mapa.",
      intuitionTitle: "🧠 Aula Rápida (Sem Mistério): O que cada símbolo dessa conta faz?",
      intuitionHTML: `
        <p style="margin-bottom:10px;">Antes de começar a conta, entenda os 3 símbolos que aparecem na expressão:</p>
        <ul class="ste-sentence-list">
          <li><strong>Sinal de Mais (<code>+</code>) é a porta OR (OU):</strong> Basta que <strong>pelo menos um</strong> lado seja <code>1</code> para o resultado dar <code>1</code>. (Ex: <code>0 + 1 = 1</code> e <code>1 + 1 = 1</code>).</li>
          <li><strong>Letras juntas (<code>AB</code> ou <code>)C</code>) são a porta AND (E / Multiplicação):</strong> Só dá <code>1</code> se <strong>todas</strong> forem <code>1</code> ao mesmo tempo.</li>
          <li><strong>Símbolo <code>⊕</code> é a porta XOR (OU-Exclusivo):</strong> Na prática, pergunte: <em>"Os dois bits são diferentes?"</em>. Se forem diferentes, dá <code>1</code>; se forem iguais, dá <code>0</code>. Na conta algébrica, você sempre substitui <code>A ⊕ C</code> por <strong><code>A'C + AC'</code></strong> (o 1º invertido vezes o 2º normal + o 1º normal vezes o 2º invertido).</li>
        </ul>
      `,
      stepByStepHTML: `
        <div class="ste-steps">
          <div style="font-weight:800; color:var(--accent-primary); font-size:1.02rem; margin-bottom:10px;">
            👣 Passo 1: Simplificando pela Álgebra Booleana (Item b — Linha por Linha!)
          </div>
          <div class="ste-step-item">
            <div class="step-num">1</div>
            <div>
              <strong>Troque o XOR (<code>A ⊕ C</code>) pela fórmula <code>A'C + AC'</code>:</strong><br>
              <code>f₁ = (A + B)C + (A'C + AC')AB</code>
            </div>
          </div>
          <div class="ste-step-item">
            <div class="step-num">2</div>
            <div>
              <strong>Faça o "chuveirinho" (multiplique quem está fora pelos de dentro do parêntese):</strong><br>
              • No 1º bloco: <code>(A + B)C = AC + BC</code><br>
              • No 2º bloco: <code>(A'C + AC')AB = A'ABC + AAC'B</code>
            </div>
          </div>
          <div class="ste-step-item">
            <div class="step-num">3</div>
            <div>
              <strong>Limpe as letras repetidas usando duas regras básicas:</strong><br>
              • <code>A' · A = 0</code> (uma letra vezes o inverso dela dá sempre ZERO!). Logo, <code>A'ABC = 0</code> (some da conta!).<br>
              • <code>A · A = A</code> (letra repetida vira uma só). Logo, <code>AAC'B = ABC'</code>.<br>
              Veja como a conta encolheu: <strong><code>f₁ = AC + BC + ABC'</code></strong>
            </div>
          </div>
          <div class="ste-step-item">
            <div class="step-num">4</div>
            <div>
              <strong>Coloque o <code>B</code> em evidência nos dois últimos termos (<code>BC + ABC'</code>):</strong><br>
              <code>f₁ = AC + B(C + C'A)</code><br>
              • <em>Regra da Absorção Auxiliar:</em> Sempre que aparecer <code>C + C'A</code> (uma letra somada com o inverso dela vezes outra), a barra <code>C'</code> vai embora e fica só <code>C + A</code>!<br>
              • Então: <code>f₁ = AC + B(C + A) = AC + BC + AB</code>.<br>
              ✅ <strong>Resultado Simplificado: <code>f₁(A, B, C) = AB + AC + BC</code></strong>
            </div>
          </div>
        </div>

        <div style="margin-top:18px;">
          <div style="font-weight:800; color:var(--accent-primary); font-size:1.02rem; margin-bottom:8px;">
            👣 Passo 2: Montando a Tabela-Verdade (Item c) e Lendo Mintermos/Maxtermos (Item a)
          </div>
          <p style="font-size:0.9rem; color:var(--text-secondary); margin-bottom:10px;">
            Com 3 variáveis (<code>A, B, C</code>), a tabela tem <code>2³ = 8</code> linhas (de <code>000</code> a <code>111</code>). Olhando para <code>AB + AC + BC</code>, a saída dá <strong><code>1</code></strong> sempre que houver <strong>pelo menos dois bits iguais a 1</strong> (linhas 3, 5, 6 e 7):
          </p>
          <div style="overflow-x:auto;">
            <table class="ste-table">
              <thead>
                <tr>
                  <th>Linha</th>
                  <th>A</th><th>B</th><th>C</th>
                  <th>(A+B)C</th>
                  <th>(A⊕C)AB</th>
                  <th>Saída f₁</th>
                  <th>Como escrever no Item (a)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td><strong>0</strong></td><td>Maxtermo M₀ = (A + B + C)</td></tr>
                <tr><td>1</td><td>0</td><td>0</td><td>1</td><td>0</td><td>0</td><td><strong>0</strong></td><td>Maxtermo M₁ = (A + B + C')</td></tr>
                <tr><td>2</td><td>0</td><td>1</td><td>0</td><td>0</td><td>0</td><td><strong>0</strong></td><td>Maxtermo M₂ = (A + B' + C)</td></tr>
                <tr style="background:rgba(16,185,129,0.12);"><td>3</td><td>0</td><td>1</td><td>1</td><td>1</td><td>0</td><td><strong style="color:var(--success);">1</strong></td><td><strong>Mintermo m₃ = A'BC</strong></td></tr>
                <tr><td>4</td><td>1</td><td>0</td><td>0</td><td>0</td><td>0</td><td><strong>0</strong></td><td>Maxtermo M₄ = (A' + B + C)</td></tr>
                <tr style="background:rgba(16,185,129,0.12);"><td>5</td><td>1</td><td>0</td><td>1</td><td>1</td><td>0</td><td><strong style="color:var(--success);">1</strong></td><td><strong>Mintermo m₅ = AB'C</strong></td></tr>
                <tr style="background:rgba(16,185,129,0.12);"><td>6</td><td>1</td><td>1</td><td>0</td><td>0</td><td>1</td><td><strong style="color:var(--success);">1</strong></td><td><strong>Mintermo m₆ = ABC'</strong></td></tr>
                <tr style="background:rgba(16,185,129,0.12);"><td>7</td><td>1</td><td>1</td><td>1</td><td>1</td><td>0</td><td><strong style="color:var(--success);">1</strong></td><td><strong>Mintermo m₇ = ABC</strong></td></tr>
              </tbody>
            </table>
          </div>
          <p style="font-size:0.88rem; color:var(--text-secondary); margin-top:8px;">
            💡 <strong>Regra infalível para o Item (a):</strong><br>
            • <strong>Soma de Mintermos (<code>∑m</code>):</strong> Pegue as linhas onde a saída deu <strong><code>1</code></strong> (linhas <strong>3, 5, 6, 7</strong>). Nelas: bit <code>1</code> = letra normal; bit <code>0</code> = letra com barra (<code>'</code>).<br>
            • <strong>Produto de Maxtermos (<code>∏M</code>):</strong> Pegue as linhas onde a saída deu <strong><code>0</code></strong> (linhas <strong>0, 1, 2, 4</strong>). Nelas é o inverso: bit <code>0</code> = letra normal; bit <code>1</code> = letra com barra (<code>'</code>), somando dentro dos parênteses!
          </p>
        </div>

        <div style="margin-top:18px;">
          <div style="font-weight:800; color:var(--accent-primary); font-size:1.02rem; margin-bottom:8px;">
            👣 Passo 3: Mapa de Karnaugh e Simplificação SOP (Itens d & e)
          </div>
          <p style="font-size:0.9rem; color:var(--text-secondary); margin-bottom:10px;">
            Monte o quadro 2×4 (<code>A</code> nas linhas; <code>BC</code> nas colunas na <strong>ordem Gray: <code>00, 01, 11, 10</code></strong>):
          </p>
          <div style="overflow-x:auto;">
            <table class="ste-table" style="max-width:480px; text-align:center;">
              <thead>
                <tr>
                  <th>A \\ BC</th>
                  <th>00</th>
                  <th>01</th>
                  <th>11 (Atenção!)</th>
                  <th>10</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>A = 0</th>
                  <td>0 <span style="font-size:0.7rem;color:var(--text-muted);">(m₀)</span></td>
                  <td>0 <span style="font-size:0.7rem;color:var(--text-muted);">(m₁)</span></td>
                  <td style="background:rgba(56,189,248,0.22); font-weight:900;">1 <span style="font-size:0.7rem;">(m₃)</span></td>
                  <td>0 <span style="font-size:0.7rem;color:var(--text-muted);">(m₂)</span></td>
                </tr>
                <tr>
                  <th>A = 1</th>
                  <td>0 <span style="font-size:0.7rem;color:var(--text-muted);">(m₄)</span></td>
                  <td style="background:rgba(16,185,129,0.22); font-weight:900;">1 <span style="font-size:0.7rem;">(m₅)</span></td>
                  <td style="background:rgba(245,158,11,0.3); font-weight:900;">1 <span style="font-size:0.7rem;">(m₇)</span></td>
                  <td style="background:rgba(168,85,247,0.22); font-weight:900;">1 <span style="font-size:0.7rem;">(m₆)</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <ul class="ste-sentence-list" style="margin-top:10px;">
            <li><strong>Dupla 1 (Vertical na coluna 11: <code>m₃</code> e <code>m₇</code>):</strong> O <code>A</code> mudou de 0 para 1 (corta!). Sobrou <strong><code>BC</code></strong>.</li>
            <li><strong>Dupla 2 (Horizontal na linha A=1: <code>m₅</code> e <code>m₇</code>):</strong> O <code>B</code> mudou de 0 para 1 (corta!). Sobrou <strong><code>AC</code></strong>.</li>
            <li><strong>Dupla 3 (Horizontal na linha A=1: <code>m₇</code> e <code>m₆</code>):</strong> O <code>C</code> mudou de 1 para 0 (corta!). Sobrou <strong><code>AB</code></strong>.</li>
            <li><strong>Expressão SOP pelo Mapa (Item e):</strong> <strong><code>f₁(A,B,C) = AB + AC + BC</code></strong>.</li>
          </ul>
        </div>
      `,
      notebookReadyHTML: `
        <strong>✍️ Resumo Pronto para Passar a Limpo no Caderno (Questão 1.i):</strong><br><br>
        • <strong>a) Formas Canônicas:</strong><br>
        &nbsp;&nbsp;– Soma de Mintermos: <code>f₁(A,B,C) = ∑m(3, 5, 6, 7) = A'BC + AB'C + ABC' + ABC</code><br>
        &nbsp;&nbsp;– Produto de Maxtermos: <code>f₁(A,B,C) = ∏M(0, 1, 2, 4) = (A+B+C)(A+B+C')(A+B'+C)(A'+B+C)</code><br>
        • <strong>b) Simplificação Algébrica:</strong><br>
        &nbsp;&nbsp;<code>f₁ = (A+B)C + (A'C + AC')AB = AC + BC + A'ABC + AAC'B</code><br>
        &nbsp;&nbsp;<code>f₁ = AC + BC + 0 + ABC' = AC + B(C + C'A) = AC + B(C + A) = <strong>AB + AC + BC</strong></code><br>
        • <strong>c) Tabela-Verdade:</strong> Copie a tabela de 8 linhas acima (saída <code>1</code> nas linhas 3, 5, 6 e 7).<br>
        • <strong>d) & e) Mapa de Karnaugh e SOP:</strong> Copie o quadro 2×4 acima circulando as 3 duplas <code>(m₃,m₇)</code>, <code>(m₅,m₇)</code> e <code>(m₆,m₇) ⇒ <strong>f₁ = AB + AC + BC</strong></code>.
      `
    },

    // =========================================================================
    // QUESTÃO 1 - ITEM (ii)
    // =========================================================================
    {
      id: "q1-ii",
      number: "Questão 1 — Item ii)",
      badge: "Álgebra + Tabela + Karnaugh",
      enunciado: "1. ii) Seja a função booleana f₂(A, B, C) = (A ⊕ C)B + BC + AC.\na) Represente por soma canônica de mintermos e produto de maxtermos;\nb) Simplifique algebricamente;\nc) Faça sua tabela-verdade;\nd) Desenhe o mapa de Karnaugh;\ne) Simplifique a expressão SOP pelo mapa.",
      intuitionTitle: "🧠 Aula Rápida: Veja como essa expressão chega no mesmo lugar da 1.i!",
      intuitionHTML: `
        <p>Novamente aparece o <strong><code>(A ⊕ C)</code></strong> multiplicado por <code>B</code>. Usando o mesmo passo (trocar <code>A ⊕ C</code> por <code>A'C + AC'</code>) e a <strong>Lei da Absorção</strong> (<code>A'BC + BC = BC</code>), ela simplifica exatamente para <strong><code>AB + AC + BC</code></strong>! Isso significa que a Tabela-Verdade, os Mintermos, os Maxtermos e o Mapa de Karnaugh são iguais aos do item (i)!</p>
      `,
      stepByStepHTML: `
        <div class="ste-steps">
          <div style="font-weight:800; color:var(--accent-primary); font-size:1.02rem; margin-bottom:10px;">
            👣 Passo a Passo da Simplificação Algébrica (Item b)
          </div>
          <div class="ste-step-item">
            <div class="step-num">1</div>
            <div>
              <strong>Abra o XOR (<code>A ⊕ C = A'C + AC'</code>):</strong><br>
              <code>f₂ = (A'C + AC')B + BC + AC</code>
            </div>
          </div>
          <div class="ste-step-item">
            <div class="step-num">2</div>
            <div>
              <strong>Multiplique o <code>B</code> pelo parêntese (chuveirinho):</strong><br>
              <code>f₂ = A'BC + ABC' + BC + AC</code>
            </div>
          </div>
          <div class="ste-step-item">
            <div class="step-num">3</div>
            <div>
              <strong>Agrupe <code>A'BC + BC</code> (Absorção):</strong><br>
              Coloque <code>BC</code> em evidência: <code>BC(A' + 1)</code>. Como <code>A' + 1 = 1</code>, sobra apenas <strong><code>BC</code></strong>!<br>
              Nossa expressão fica: <code>f₂ = BC + ABC' + AC</code>
            </div>
          </div>
          <div class="ste-step-item">
            <div class="step-num">4</div>
            <div>
              <strong>Coloque <code>B</code> em evidência em <code>BC + ABC'</code>:</strong><br>
              <code>f₂ = B(C + C'A) + AC = B(C + A) + AC = BC + AB + AC</code><br>
              ✅ <strong>Resultado Final: <code>f₂(A, B, C) = AB + AC + BC</code></strong>
            </div>
          </div>
        </div>
      `,
      notebookReadyHTML: `
        <strong>✍️ Resumo Pronto para Passar a Limpo no Caderno (Questão 1.ii):</strong><br><br>
        • <strong>a) Formas Canônicas:</strong><br>
        &nbsp;&nbsp;– Soma de Mintermos: <code>f₂(A,B,C) = ∑m(3, 5, 6, 7) = A'BC + AB'C + ABC' + ABC</code><br>
        &nbsp;&nbsp;– Produto de Maxtermos: <code>f₂(A,B,C) = ∏M(0, 1, 2, 4) = (A+B+C)(A+B+C')(A+B'+C)(A'+B+C)</code><br>
        • <strong>b) Simplificação Algébrica:</strong><br>
        &nbsp;&nbsp;<code>f₂ = (A'C + AC')B + BC + AC = A'BC + ABC' + BC + AC</code><br>
        &nbsp;&nbsp;<code>f₂ = BC(A' + 1) + ABC' + AC = BC + ABC' + AC = B(C + C'A) + AC = B(C+A) + AC = <strong>AB + AC + BC</strong></code><br>
        • <strong>c), d) e e):</strong> Mesma Tabela-Verdade e mesmo Mapa de Karnaugh do item (i), resultando em <code><strong>f₂ = AB + AC + BC</strong></code>.
      `
    },

    // =========================================================================
    // QUESTÃO 1 - ITEM (iii)
    // =========================================================================
    {
      id: "q1-iii",
      number: "Questão 1 — Item iii)",
      badge: "Álgebra + Tabela + Karnaugh",
      enunciado: "1. iii) Seja a função booleana f₁(A, B, C) = (A + B)C + A'(B + C).\na) Represente por soma canônica de mintermos e produto de maxtermos;\nb) Simplifique algebricamente;\nc) Faça sua tabela-verdade;\nd) Desenhe o mapa de Karnaugh;\ne) Simplifique a expressão SOP pelo mapa.",
      intuitionTitle: "🧠 Aula Rápida: Chuveirinho simples + Absorção!",
      intuitionHTML: `
        <p>Esta questão está na página 48 do Módulo II. Basta abrir os dois parênteses multiplicando e usar duas regras diretas: <strong><code>A + A' = 1</code></strong> e <strong><code>C + BC = C</code></strong>.</p>
      `,
      stepByStepHTML: `
        <div class="ste-steps">
          <div style="font-weight:800; color:var(--accent-primary); font-size:1.02rem; margin-bottom:10px;">
            👣 Passo 1: Simplificação Algébrica (Item b)
          </div>
          <div class="ste-step-item">
            <div class="step-num">1</div>
            <div>
              <strong>Faça o chuveirinho nos dois parênteses:</strong><br>
              • <code>(A + B)C = AC + BC</code><br>
              • <code>A'(B + C) = A'B + A'C</code><br>
              Somando tudo: <code>f₁ = AC + BC + A'B + A'C</code>
            </div>
          </div>
          <div class="ste-step-item">
            <div class="step-num">2</div>
            <div>
              <strong>Junte o 1º termo com o último (<code>AC + A'C</code>):</strong><br>
              Colocando <code>C</code> em evidência: <code>C(A + A') = C · 1 = C</code>.<br>
              Ficamos com: <code>f₁ = C + BC + A'B</code>
            </div>
          </div>
          <div class="ste-step-item">
            <div class="step-num">3</div>
            <div>
              <strong>Absorção em <code>C + BC</code>:</strong><br>
              Como <code>C + BC = C(1 + B) = C</code>, o termo <code>BC</code> é absorvido!<br>
              ✅ <strong>Resultado Simplificado: <code>f₁(A, B, C) = C + A'B</code></strong>
            </div>
          </div>
        </div>

        <div style="margin-top:16px;">
          <div style="font-weight:800; color:var(--accent-primary); font-size:1.02rem; margin-bottom:8px;">
            👣 Passo 2: Tabela-Verdade (Item c) e Mapa de Karnaugh (Itens d & e)
          </div>
          <div class="grid-2" style="align-items:start;">
            <div style="overflow-x:auto;">
              <table class="ste-table">
                <thead>
                  <tr><th>#</th><th>A</th><th>B</th><th>C</th><th>f₁</th><th>Termo Canônico</th></tr>
                </thead>
                <tbody>
                  <tr><td>0</td><td>0</td><td>0</td><td>0</td><td><strong>0</strong></td><td>M₀ = (A+B+C)</td></tr>
                  <tr style="background:rgba(16,185,129,0.12);"><td>1</td><td>0</td><td>0</td><td>1</td><td><strong>1</strong></td><td><strong>m₁ = A'B'C</strong></td></tr>
                  <tr style="background:rgba(16,185,129,0.12);"><td>2</td><td>0</td><td>1</td><td>0</td><td><strong>1</strong></td><td><strong>m₂ = A'BC'</strong></td></tr>
                  <tr style="background:rgba(16,185,129,0.12);"><td>3</td><td>0</td><td>1</td><td>1</td><td><strong>1</strong></td><td><strong>m₃ = A'BC</strong></td></tr>
                  <tr><td>4</td><td>1</td><td>0</td><td>0</td><td><strong>0</strong></td><td>M₄ = (A'+B+C)</td></tr>
                  <tr style="background:rgba(16,185,129,0.12);"><td>5</td><td>1</td><td>0</td><td>1</td><td><strong>1</strong></td><td><strong>m₅ = AB'C</strong></td></tr>
                  <tr><td>6</td><td>1</td><td>1</td><td>0</td><td><strong>0</strong></td><td>M₆ = (A'+B'+C)</td></tr>
                  <tr style="background:rgba(16,185,129,0.12);"><td>7</td><td>1</td><td>1</td><td>1</td><td><strong>1</strong></td><td><strong>m₇ = ABC</strong></td></tr>
                </tbody>
              </table>
            </div>
            <div>
              <table class="ste-table" style="text-align:center;">
                <thead>
                  <tr><th>A \\ BC</th><th>00</th><th>01</th><th>11</th><th>10</th></tr>
                </thead>
                <tbody>
                  <tr>
                    <th>A = 0</th>
                    <td>0 <span style="font-size:0.7rem;">(m₀)</span></td>
                    <td style="background:rgba(16,185,129,0.25); font-weight:900;">1 <span style="font-size:0.7rem;">(m₁)</span></td>
                    <td style="background:rgba(245,158,11,0.3); font-weight:900;">1 <span style="font-size:0.7rem;">(m₃)</span></td>
                    <td style="background:rgba(56,189,248,0.25); font-weight:900;">1 <span style="font-size:0.7rem;">(m₂)</span></td>
                  </tr>
                  <tr>
                    <th>A = 1</th>
                    <td>0 <span style="font-size:0.7rem;">(m₄)</span></td>
                    <td style="background:rgba(16,185,129,0.25); font-weight:900;">1 <span style="font-size:0.7rem;">(m₅)</span></td>
                    <td style="background:rgba(16,185,129,0.25); font-weight:900;">1 <span style="font-size:0.7rem;">(m₇)</span></td>
                    <td>0 <span style="font-size:0.7rem;">(m₆)</span></td>
                  </tr>
                </tbody>
              </table>
              <ul class="ste-sentence-list" style="margin-top:8px;">
                <li><strong>Quadra Verde (<code>m₁, m₃, m₅, m₇</code>):</strong> Colunas 01 e 11 nas duas linhas. Só o <code>C=1</code> fica fixo → gera <strong><code>C</code></strong>.</li>
                <li><strong>Dupla Azul/Laranja (<code>m₂, m₃</code>):</strong> Linha <code>A=0</code> (<code>A'</code>), colunas 11 e 10 (<code>B=1</code> fixo) → gera <strong><code>A'B</code></strong>.</li>
                <li><strong>Resultado do Mapa:</strong> <strong><code>f₁ = C + A'B</code></strong>.</li>
              </ul>
            </div>
          </div>
        </div>
      `,
      notebookReadyHTML: `
        <strong>✍️ Resumo Pronto para Passar a Limpo no Caderno (Questão 1.iii):</strong><br><br>
        • <strong>a) Formas Canônicas:</strong><br>
        &nbsp;&nbsp;– Soma de Mintermos: <code>f₁(A,B,C) = ∑m(1, 2, 3, 5, 7) = A'B'C + A'BC' + A'BC + AB'C + ABC</code><br>
        &nbsp;&nbsp;– Produto de Maxtermos: <code>f₁(A,B,C) = ∏M(0, 4, 6) = (A+B+C)(A'+B+C)(A'+B'+C)</code><br>
        • <strong>b) Simplificação Algébrica:</strong><br>
        &nbsp;&nbsp;<code>f₁ = AC + BC + A'B + A'C = C(A + A') + BC + A'B = C + BC + A'B = <strong>C + A'B</strong></code><br>
        • <strong>c), d) e e):</strong> Copie a Tabela e o Mapa 2×4 acima (1 Quadra = <code>C</code> + 1 Dupla = <code>A'B</code>) <code>⇒ <strong>f₁ = C + A'B</strong></code>.
      `
    },

    // =========================================================================
    // QUESTÃO 1 - ITEM (iv)
    // =========================================================================
    {
      id: "q1-iv",
      number: "Questão 1 — Item iv)",
      badge: "4 Variáveis + XOR + Karnaugh 4×4",
      enunciado: "1. iv) Seja a função de 4 variáveis f₂(A, B, C, D) = A + A'BC + C'D ⊕ (CD' + C'D).\na) Represente por soma canônica de mintermos e produto de maxtermos;\nb) Simplifique algebricamente;\nc) Faça sua tabela-verdade;\nd) Desenhe o mapa de Karnaugh;\ne) Simplifique a expressão SOP pelo mapa.",
      intuitionTitle: "🧠 Aula Rápida: Desarmando o XOR no final da equação!",
      intuitionHTML: `
        <p>Olhe para o final da equação: <code>C'D ⊕ (CD' + C'D)</code>. Dentro do parêntese temos <code>CD' + C'D</code> (que é o próprio <code>C ⊕ D</code>). Quando fazemos XOR de <code>C'D</code> com <code>(C'D ⊕ CD')</code>, os dois termos iguais <code>C'D ⊕ C'D</code> dão <strong>ZERO</strong> (porque no XOR <em>iguais dá zero!</em>) e sobra apenas <strong><code>CD'</code></strong>! Veja abaixo a demonstração passo a passo:</p>
      `,
      stepByStepHTML: `
        <div class="ste-steps">
          <div style="font-weight:800; color:var(--accent-primary); font-size:1.02rem; margin-bottom:10px;">
            👣 Passo 1: Simplificação Algébrica Passo a Passo (Item b)
          </div>
          <div class="ste-step-item">
            <div class="step-num">1</div>
            <div>
              <strong>Simplifique primeiro o começo <code>A + A'BC</code>:</strong><br>
              Pela regra da Absorção Auxiliar (<code>A + A'X = A + X</code>), a barra <code>A'</code> cai fora:<br>
              <code>A + A'BC = A + BC</code>
            </div>
          </div>
          <div class="ste-step-item">
            <div class="step-num">2</div>
            <div>
              <strong>Simplifique o bloco do XOR: <code>C'D ⊕ (CD' + C'D)</code>:</strong><br>
              Chamando <code>X = C'D</code> e <code>Y = CD' + C'D</code> na fórmula <code>X ⊕ Y = X'Y + XY'</code>:<br>
              • Por DeMorgan, <code>X' = (C'D)' = C + D'</code> e <code>Y' = (CD' + C'D)' = CD + C'D'</code><br>
              • <code>X'Y = (C + D')(CD' + C'D) = CD' + CC'D + CD'D' + C'DD' = CD' + 0 + CD' + 0 = CD'</code><br>
              • <code>XY' = (C'D)(CD + C'D') = 0 + 0 = 0</code><br>
              Logo: <strong><code>C'D ⊕ (CD' + C'D) = CD'</code></strong>!
            </div>
          </div>
          <div class="ste-step-item">
            <div class="step-num">3</div>
            <div>
              <strong>Junte os dois resultados:</strong><br>
              ✅ <strong><code>f₂(A, B, C, D) = A + BC + CD'</code></strong>
            </div>
          </div>
        </div>

        <div style="margin-top:16px;">
          <div style="font-weight:800; color:var(--accent-primary); font-size:1.02rem; margin-bottom:8px;">
            👣 Passo 2: Tabela-Verdade de 16 Linhas (Item c) e Mapa de Karnaugh 4×4 (Itens d & e)
          </div>
          <p style="font-size:0.9rem; color:var(--text-secondary); margin-bottom:10px;">
            Olhando para <code>f₂ = A + BC + CD'</code>, preencher as 16 linhas (0 a 15) é imediato:<br>
            • Nas linhas <strong>8 a 15</strong>, o <code>A</code> vale <code>1</code> → a saída vale <strong><code>1</code> em todas (m₈ até m₁₅)</strong>!<br>
            • Nas linhas <strong>0 a 7</strong> (onde <code>A=0</code>), a saída vale <code>1</code> quando <code>CD = 10</code> (linhas <strong>2 e 6</strong>) ou quando <code>BC = 11</code> (linhas <strong>6 e 7</strong>).<br>
            • As únicas linhas com saída <strong><code>0</code></strong> são: <strong>0, 1, 3, 4 e 5</strong>!
          </p>
          <div style="overflow-x:auto;">
            <table class="ste-table" style="max-width:540px; text-align:center;">
              <thead>
                <tr><th>AB \\ CD</th><th>00</th><th>01</th><th>11</th><th>10</th></tr>
              </thead>
              <tbody>
                <tr>
                  <th>00</th>
                  <td>0 <span style="font-size:0.7rem;">(m₀)</span></td>
                  <td>0 <span style="font-size:0.7rem;">(m₁)</span></td>
                  <td>0 <span style="font-size:0.7rem;">(m₃)</span></td>
                  <td style="background:rgba(56,189,248,0.25); font-weight:900;">1 <span style="font-size:0.7rem;">(m₂)</span></td>
                </tr>
                <tr>
                  <th>01</th>
                  <td>0 <span style="font-size:0.7rem;">(m₄)</span></td>
                  <td>0 <span style="font-size:0.7rem;">(m₅)</span></td>
                  <td style="background:rgba(245,158,11,0.28); font-weight:900;">1 <span style="font-size:0.7rem;">(m₇)</span></td>
                  <td style="background:rgba(56,189,248,0.25); font-weight:900;">1 <span style="font-size:0.7rem;">(m₆)</span></td>
                </tr>
                <tr>
                  <th>11</th>
                  <td style="background:rgba(16,185,129,0.25); font-weight:900;">1 <span style="font-size:0.7rem;">(m₁₂)</span></td>
                  <td style="background:rgba(16,185,129,0.25); font-weight:900;">1 <span style="font-size:0.7rem;">(m₁₃)</span></td>
                  <td style="background:rgba(16,185,129,0.25); font-weight:900;">1 <span style="font-size:0.7rem;">(m₁₅)</span></td>
                  <td style="background:rgba(16,185,129,0.25); font-weight:900;">1 <span style="font-size:0.7rem;">(m₁₄)</span></td>
                </tr>
                <tr>
                  <th>10</th>
                  <td style="background:rgba(16,185,129,0.25); font-weight:900;">1 <span style="font-size:0.7rem;">(m₈)</span></td>
                  <td style="background:rgba(16,185,129,0.25); font-weight:900;">1 <span style="font-size:0.7rem;">(m₉)</span></td>
                  <td style="background:rgba(16,185,129,0.25); font-weight:900;">1 <span style="font-size:0.7rem;">(m₁₁)</span></td>
                  <td style="background:rgba(16,185,129,0.25); font-weight:900;">1 <span style="font-size:0.7rem;">(m₁₀)</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <ul class="ste-sentence-list" style="margin-top:10px;">
            <li><strong>Octeto Verde (8 células: linhas <code>11</code> e <code>10</code> inteiras):</strong> Único bit fixo é <code>A=1</code> → gera <strong><code>A</code></strong>.</li>
            <li><strong>Quadra Laranja/Verde (<code>m₆, m₇, m₁₄, m₁₅</code>):</strong> Linhas com <code>B=1</code> e colunas com <code>C=1</code> → gera <strong><code>BC</code></strong>.</li>
            <li><strong>Quadra Azul/Verde (coluna <code>10</code> inteira: <code>m₂, m₆, m₁₄, m₁₀</code>):</strong> Coluna fixa <code>CD = 10</code> → gera <strong><code>CD'</code></strong>.</li>
            <li><strong>Expressão SOP pelo Mapa:</strong> <strong><code>f₂(A,B,C,D) = A + BC + CD'</code></strong>.</li>
          </ul>
        </div>
      `,
      notebookReadyHTML: `
        <strong>✍️ Resumo Pronto para Passar a Limpo no Caderno (Questão 1.iv):</strong><br><br>
        • <strong>a) Formas Canônicas:</strong><br>
        &nbsp;&nbsp;– Soma de Mintermos: <code>f₂(A,B,C,D) = ∑m(2, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15)</code><br>
        &nbsp;&nbsp;– Produto de Maxtermos: <code>f₂(A,B,C,D) = ∏M(0, 1, 3, 4, 5) = (A+B+C+D)(A+B+C+D')(A+B+C'+D')(A+B'+C+D)(A+B'+C+D')</code><br>
        • <strong>b) Simplificação Algébrica:</strong><br>
        &nbsp;&nbsp;<code>f₂ = (A + A'BC) + [C'D ⊕ (CD' + C'D)] = (A + BC) + CD' = <strong>A + BC + CD'</strong></code><br>
        • <strong>c), d) e e):</strong> Tabela de 16 linhas (zeros apenas em 0, 1, 3, 4, 5) + Mapa 4×4 acima (1 Octeto = <code>A</code>, 1 Quadra = <code>BC</code>, 1 Quadra = <code>CD'</code>) <code>⇒ <strong>f₂ = A + BC + CD'</strong></code>.
      `
    },

    // =========================================================================
    // QUESTÃO 2 - SOMADOR COMPLETO DE 1 BIT (DUAS FORMAS)
    // =========================================================================
    {
      id: "q2",
      number: "Questão 2",
      badge: "Projeto de Circuito • 2 Formas",
      enunciado: "2. Seja a tabela verdade do somador-completo de um bit (Entradas: A, B, Cin | Saídas: Cout e Σ). Projete o circuito de ao menos duas formas diferentes.",
      intuitionTitle: "🧠 Aula Rápida: O que é um Somador Completo e como montá-lo de 2 formas?",
      intuitionHTML: `
        <p>O <strong>Somador Completo (Full Adder)</strong> soma <strong>3 bits de uma vez</strong>: os dois bits dos números (<code>A</code> e <code>B</code>) mais o <code>Cin</code> (o "vai-um" que veio da coluna anterior), entregando duas respostas: a <strong>Soma (<code>Σ</code>)</strong> e o <strong>Vai-Um de saída (<code>Cout</code>)</strong>.</p>
        <p style="margin-top:6px;">Podemos desenhá-lo de <strong>duas formas diferentes</strong> (Págs. 83–85 do Módulo II):</p>
        <ul class="ste-sentence-list">
          <li><strong>Forma 1 (Com portas XOR / 2 Meio-Somadores):</strong> É a mais econômica — usa apenas 2 portas XOR, 2 portas AND e 1 porta OR.</li>
          <li><strong>Forma 2 (Soma de Produtos AND-OR via Mapa de Karnaugh):</strong> Usa apenas portas tradicionais NOT, AND e OR.</li>
        </ul>
      `,
      stepByStepHTML: `
        <div class="grid-2" style="margin-top:12px;">
          <div style="background:var(--bg-primary); border:1px solid var(--accent-primary); border-radius:var(--radius-md); padding:16px;">
            <h4 style="color:var(--accent-primary); margin-bottom:8px;">🛠️ FORMA 1: Projeto com Portas XOR (Mais Enxuto)</h4>
            <div style="font-family:var(--font-mono); background:var(--bg-elevated); padding:10px; border-radius:6px; margin-bottom:10px; font-size:0.9rem;">
              <strong>Σ = (A ⊕ B) ⊕ Cin</strong><br>
              <strong>Cout = (A · B) + [(A ⊕ B) · Cin]</strong>
            </div>
            <p style="font-size:0.86rem; color:var(--text-secondary);">
              <strong>Como desenhar no caderno:</strong><br>
              1. Ligue <code>A</code> e <code>B</code> na 1ª porta <strong>XOR</strong> (gera o fio <code>A ⊕ B</code>).<br>
              2. Ligue esse fio <code>(A ⊕ B)</code> junto com <code>Cin</code> na 2ª porta <strong>XOR</strong> → a saída já é <strong><code>Σ</code></strong>!<br>
              3. Faça duas portas <strong>AND</strong>: uma recebe <code>A</code> e <code>B</code>; a outra recebe o fio <code>(A ⊕ B)</code> e <code>Cin</code>.<br>
              4. Junte as duas portas AND em uma porta <strong>OR</strong> → a saída é <strong><code>Cout</code></strong>!
            </p>
          </div>

          <div style="background:var(--bg-primary); border:1px solid var(--success); border-radius:var(--radius-md); padding:16px;">
            <h4 style="color:var(--success); margin-bottom:8px;">🛠️ FORMA 2: Projeto Soma de Produtos (AND-OR Puro)</h4>
            <div style="font-family:var(--font-mono); background:var(--bg-elevated); padding:10px; border-radius:6px; margin-bottom:10px; font-size:0.88rem;">
              <strong>Σ = A'B'Cin + A'BCin' + AB'Cin' + ABCin</strong><br>
              <strong>Cout = AB + ACin + BCin</strong>
            </div>
            <p style="font-size:0.86rem; color:var(--text-secondary);">
              <strong>Como desenhar no caderno:</strong><br>
              • Para <strong><code>Cout</code></strong> (pelo Mapa K de <code>m₃, m₅, m₆, m₇</code>): <strong>3 portas AND de 2 entradas</strong> (<code>AB</code>, <code>ACin</code> e <code>BCin</code>) ligadas em <strong>1 porta OR de 3 entradas</strong>.<br>
              • Para <strong><code>Σ</code></strong> (mintermos <code>m₁, m₂, m₄, m₇</code>): <strong>4 portas AND de 3 entradas</strong> ligadas em <strong>1 porta OR de 4 entradas</strong>.
            </p>
          </div>
        </div>

        <!-- DIAGRAMA VISUAL FIO A FIO DA FORMA 2 -->
        <div style="background:#0f172a; border:1px solid #334155; border-radius:10px; padding:12px; margin-top:14px; overflow-x:auto;">
          <div style="font-size:0.82rem; color:#34d399; font-weight:800; margin-bottom:8px; text-align:center;">📐 DESENHO EXATO FIO A FIO DA FORMA 2 (SOMA DE PRODUTOS AND-OR):</div>
          <svg viewBox="0 0 740 500" style="width:100%; min-width:680px; display:block; margin:0 auto; font-family:monospace;">
            <!-- Trilhos Verticais das Entradas: A, A', B, B', Cin, Cin' -->
            <rect x="30" y="15" width="35" height="22" rx="3" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
            <text x="47" y="31" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">A</text>
            <line x1="47" y1="37" x2="47" y2="480" stroke="#38bdf8" stroke-width="2"/>

            <rect x="75" y="25" width="22" height="18" rx="2" fill="#1e293b" stroke="#f472b6" stroke-width="1.5"/>
            <text x="86" y="38" fill="#f472b6" font-size="10" font-weight="bold" text-anchor="middle">A'</text>
            <line x1="47" y1="30" x2="75" y2="30" stroke="#38bdf8" stroke-width="1.5"/>
            <line x1="86" y1="43" x2="86" y2="480" stroke="#f472b6" stroke-width="1.5" stroke-dasharray="4,2"/>

            <rect x="115" y="15" width="35" height="22" rx="3" fill="#1e293b" stroke="#22d3ee" stroke-width="2"/>
            <text x="132" y="31" fill="#22d3ee" font-size="12" font-weight="bold" text-anchor="middle">B</text>
            <line x1="132" y1="37" x2="132" y2="480" stroke="#22d3ee" stroke-width="2"/>

            <rect x="160" y="25" width="22" height="18" rx="2" fill="#1e293b" stroke="#f472b6" stroke-width="1.5"/>
            <text x="171" y="38" fill="#f472b6" font-size="10" font-weight="bold" text-anchor="middle">B'</text>
            <line x1="132" y1="30" x2="160" y2="30" stroke="#22d3ee" stroke-width="1.5"/>
            <line x1="171" y1="43" x2="171" y2="480" stroke="#f472b6" stroke-width="1.5" stroke-dasharray="4,2"/>

            <rect x="200" y="15" width="40" height="22" rx="3" fill="#1e293b" stroke="#fb923c" stroke-width="2"/>
            <text x="220" y="31" fill="#fb923c" font-size="12" font-weight="bold" text-anchor="middle">Cin</text>
            <line x1="220" y1="37" x2="220" y2="480" stroke="#fb923c" stroke-width="2"/>

            <rect x="250" y="25" width="30" height="18" rx="2" fill="#1e293b" stroke="#f472b6" stroke-width="1.5"/>
            <text x="265" y="38" fill="#f472b6" font-size="9" font-weight="bold" text-anchor="middle">Cin'</text>
            <line x1="220" y1="30" x2="250" y2="30" stroke="#fb923c" stroke-width="1.5"/>
            <line x1="265" y1="43" x2="265" y2="480" stroke="#f472b6" stroke-width="1.5" stroke-dasharray="4,2"/>

            <!-- ================= BLOCO 1: COUT ================= -->
            <text x="320" y="70" fill="#fb923c" font-size="12" font-weight="bold">BLOCO DO COUT (Vai-Um):</text>

            <rect x="330" y="85" width="60" height="30" rx="4" fill="#172554" stroke="#60a5fa" stroke-width="1.5"/>
            <text x="360" y="104" fill="#93c5fd" font-size="11" font-weight="bold" text-anchor="middle">A · B</text>
            <line x1="47" y1="92" x2="330" y2="92" stroke="#38bdf8" stroke-width="1.5"/><circle cx="47" cy="92" r="3" fill="#38bdf8"/>
            <line x1="132" y1="108" x2="330" y2="108" stroke="#22d3ee" stroke-width="1.5"/><circle cx="132" cy="108" r="3" fill="#22d3ee"/>

            <rect x="330" y="130" width="60" height="30" rx="4" fill="#172554" stroke="#60a5fa" stroke-width="1.5"/>
            <text x="360" y="149" fill="#93c5fd" font-size="11" font-weight="bold" text-anchor="middle">A · Cin</text>
            <line x1="47" y1="137" x2="330" y2="137" stroke="#38bdf8" stroke-width="1.5"/><circle cx="47" cy="137" r="3" fill="#38bdf8"/>
            <line x1="220" y1="153" x2="330" y2="153" stroke="#fb923c" stroke-width="1.5"/><circle cx="220" cy="153" r="3" fill="#fb923c"/>

            <rect x="330" y="175" width="60" height="30" rx="4" fill="#172554" stroke="#60a5fa" stroke-width="1.5"/>
            <text x="360" y="194" fill="#93c5fd" font-size="11" font-weight="bold" text-anchor="middle">B · Cin</text>
            <line x1="132" y1="182" x2="330" y2="182" stroke="#22d3ee" stroke-width="1.5"/><circle cx="132" cy="182" r="3" fill="#22d3ee"/>
            <line x1="220" y1="198" x2="330" y2="198" stroke="#fb923c" stroke-width="1.5"/><circle cx="220" cy="198" r="3" fill="#fb923c"/>

            <rect x="470" y="125" width="70" height="40" rx="6" fill="#431407" stroke="#fb923c" stroke-width="2"/>
            <text x="505" y="149" fill="#fdba74" font-size="11" font-weight="bold" text-anchor="middle">OR 3 ent.</text>
            <line x1="390" y1="100" x2="440" y2="100" stroke="#60a5fa" stroke-width="1.5"/>
            <line x1="440" y1="100" x2="440" y2="133" stroke="#60a5fa" stroke-width="1.5"/><line x1="440" y1="133" x2="470" y2="133" stroke="#60a5fa" stroke-width="1.5"/>
            <line x1="390" y1="145" x2="470" y2="145" stroke="#60a5fa" stroke-width="1.5"/>
            <line x1="390" y1="190" x2="440" y2="190" stroke="#60a5fa" stroke-width="1.5"/>
            <line x1="440" y1="190" x2="440" y2="157" stroke="#60a5fa" stroke-width="1.5"/><line x1="440" y1="157" x2="470" y2="157" stroke="#60a5fa" stroke-width="1.5"/>

            <line x1="540" y1="145" x2="600" y2="145" stroke="#fb923c" stroke-width="3"/>
            <rect x="600" y="131" width="115" height="28" rx="14" fill="#431407" stroke="#fb923c" stroke-width="2"/>
            <text x="657" y="149" fill="#fdba74" font-size="13" font-weight="bold" text-anchor="middle">Cout</text>

            <!-- ================= BLOCO 2: SOMA ================= -->
            <text x="320" y="245" fill="#34d399" font-size="12" font-weight="bold">BLOCO DA SOMA (Σ):</text>

            <rect x="330" y="260" width="85" height="34" rx="4" fill="#1e1b4b" stroke="#a78bfa" stroke-width="1.5"/>
            <text x="372" y="281" fill="#c4b5fd" font-size="10" font-weight="bold" text-anchor="middle">A' · B' · Cin</text>
            <line x1="86" y1="267" x2="330" y2="267" stroke="#f472b6" stroke-width="1.5"/><circle cx="86" cy="267" r="3" fill="#f472b6"/>
            <line x1="171" y1="277" x2="330" y2="277" stroke="#f472b6" stroke-width="1.5"/><circle cx="171" cy="277" r="3" fill="#f472b6"/>
            <line x1="220" y1="287" x2="330" y2="287" stroke="#fb923c" stroke-width="1.5"/><circle cx="220" cy="287" r="3" fill="#fb923c"/>

            <rect x="330" y="305" width="85" height="34" rx="4" fill="#1e1b4b" stroke="#a78bfa" stroke-width="1.5"/>
            <text x="372" y="326" fill="#c4b5fd" font-size="10" font-weight="bold" text-anchor="middle">A' · B · Cin'</text>
            <line x1="86" y1="312" x2="330" y2="312" stroke="#f472b6" stroke-width="1.5"/><circle cx="86" cy="312" r="3" fill="#f472b6"/>
            <line x1="132" y1="322" x2="330" y2="322" stroke="#22d3ee" stroke-width="1.5"/><circle cx="132" cy="322" r="3" fill="#22d3ee"/>
            <line x1="265" y1="332" x2="330" y2="332" stroke="#f472b6" stroke-width="1.5"/><circle cx="265" cy="332" r="3" fill="#f472b6"/>

            <rect x="330" y="350" width="85" height="34" rx="4" fill="#1e1b4b" stroke="#a78bfa" stroke-width="1.5"/>
            <text x="372" y="371" fill="#c4b5fd" font-size="10" font-weight="bold" text-anchor="middle">A · B' · Cin'</text>
            <line x1="47" y1="357" x2="330" y2="357" stroke="#38bdf8" stroke-width="1.5"/><circle cx="47" cy="357" r="3" fill="#38bdf8"/>
            <line x1="171" y1="367" x2="330" y2="367" stroke="#f472b6" stroke-width="1.5"/><circle cx="171" cy="367" r="3" fill="#f472b6"/>
            <line x1="265" y1="377" x2="330" y2="377" stroke="#f472b6" stroke-width="1.5"/><circle cx="265" cy="377" r="3" fill="#f472b6"/>

            <rect x="330" y="395" width="85" height="34" rx="4" fill="#1e1b4b" stroke="#a78bfa" stroke-width="1.5"/>
            <text x="372" y="416" fill="#c4b5fd" font-size="10" font-weight="bold" text-anchor="middle">A · B · Cin</text>
            <line x1="47" y1="402" x2="330" y2="402" stroke="#38bdf8" stroke-width="1.5"/><circle cx="47" cy="402" r="3" fill="#38bdf8"/>
            <line x1="132" y1="412" x2="330" y2="412" stroke="#22d3ee" stroke-width="1.5"/><circle cx="132" cy="412" r="3" fill="#22d3ee"/>
            <line x1="220" y1="422" x2="330" y2="422" stroke="#fb923c" stroke-width="1.5"/><circle cx="220" cy="422" r="3" fill="#fb923c"/>

            <rect x="470" y="330" width="70" height="50" rx="6" fill="#064e3b" stroke="#34d399" stroke-width="2"/>
            <text x="505" y="358" fill="#6ee7b7" font-size="11" font-weight="bold" text-anchor="middle">OR 4 ent.</text>
            <line x1="415" y1="277" x2="445" y2="277" stroke="#a78bfa" stroke-width="1.5"/>
            <line x1="445" y1="277" x2="445" y2="340" stroke="#a78bfa" stroke-width="1.5"/><line x1="445" y1="340" x2="470" y2="340" stroke="#a78bfa" stroke-width="1.5"/>
            <line x1="415" y1="322" x2="470" y2="350" stroke="#a78bfa" stroke-width="1.5"/>
            <line x1="415" y1="367" x2="470" y2="360" stroke="#a78bfa" stroke-width="1.5"/>
            <line x1="415" y1="412" x2="445" y2="412" stroke="#a78bfa" stroke-width="1.5"/>
            <line x1="445" y1="412" x2="445" y2="370" stroke="#a78bfa" stroke-width="1.5"/><line x1="445" y1="370" x2="470" y2="370" stroke="#a78bfa" stroke-width="1.5"/>

            <line x1="540" y1="355" x2="600" y2="355" stroke="#34d399" stroke-width="3"/>
            <rect x="600" y="341" width="115" height="28" rx="14" fill="#064e3b" stroke="#34d399" stroke-width="2"/>
            <text x="657" y="359" fill="#6ee7b7" font-size="13" font-weight="bold" text-anchor="middle">Soma (Σ)</text>
          </svg>
        </div>
      `,
      notebookReadyHTML: `
        <strong>✍️ Resumo Pronto para Passar a Limpo no Caderno (Questão 2):</strong><br><br>
        • <strong>Forma 1 (Com Portas XOR / 2 Meio-Somadores):</strong><br>
        &nbsp;&nbsp;<code>Σ = (A ⊕ B) ⊕ Cin</code> &nbsp;|&nbsp; <code>Cout = AB + (A ⊕ B)Cin</code> (Desenhe 2 portas XOR, 2 portas AND e 1 porta OR).<br>
        • <strong>Forma 2 (Soma de Produtos AND-OR via Mapa de Karnaugh):</strong><br>
        &nbsp;&nbsp;<code>Σ = A'B'Cin + A'BCin' + AB'Cin' + ABCin</code> (4 portas AND + 1 porta OR)<br>
        &nbsp;&nbsp;<code>Cout = AB + ACin + BCin</code> (3 portas AND + 1 porta OR).
      `
    },

    // =========================================================================
    // QUESTÃO 3 - COMPARADOR DE 3 BITS
    // =========================================================================
    {
      id: "q3",
      number: "Questão 3",
      badge: "Projeto Combinacional • XNOR",
      enunciado: "3. Projete um circuito comparador de três bits, cuja saída deve ser 0 se os números forem diferentes e 1 se forem iguais.",
      intuitionTitle: "🧠 Aula Rápida: Qual porta lógica dá 1 quando dois bits são IGUAIS?",
      intuitionHTML: `
        <p>Queremos comparar um número de 3 bits <strong><code>A = A₂A₁A₀</code></strong> com outro de 3 bits <strong><code>B = B₂B₁B₀</code></strong>.</p>
        <ul class="ste-sentence-list">
          <li>Para os dois números serem iguais, precisamos que: <strong>(<code>A₂ = B₂</code>) E (<code>A₁ = B₁</code>) E (<code>A₀ = B₀</code>)</strong>!</li>
          <li>A porta lógica que solta <strong><code>1</code> quando as duas entradas são iguais</strong> (<code>0,0 → 1</code> e <code>1,1 → 1</code>) é a porta <strong>XNOR (Coincidência)</strong>!</li>
          <li>Portanto, colocamos <strong>3 portas XNOR</strong> (uma para cada par de bits) e ligamos as 3 saídas em <strong>1 porta AND de 3 entradas</strong>!</li>
        </ul>
      `,
      stepByStepHTML: `
        <div class="ste-steps">
          <div class="ste-step-item">
            <div class="step-num">1</div>
            <div>
              <strong>Compare cada par de bits com uma porta XNOR:</strong><br>
              • Bit 2: <code>x₂ = (A₂ ⊕ B₂)' = A₂B₂ + A₂'B₂'</code> (vale <code>1</code> se <code>A₂ = B₂</code>)<br>
              • Bit 1: <code>x₁ = (A₁ ⊕ B₁)' = A₁B₁ + A₁'B₁'</code> (vale <code>1</code> se <code>A₁ = B₁</code>)<br>
              • Bit 0: <code>x₀ = (A₀ ⊕ B₀)' = A₀B₀ + A₀'B₀'</code> (vale <code>1</code> se <code>A₀ = B₀</code>)
            </div>
          </div>
          <div class="ste-step-item">
            <div class="step-num">2</div>
            <div>
              <strong>Una as 3 saídas em uma porta AND de 3 entradas:</strong><br>
              <code>S = x₂ · x₁ · x₀ = (A₂ ⊕ B₂)' · (A₁ ⊕ B₁)' · (A₀ ⊕ B₀)'</code>
            </div>
          </div>
        </div>

        <div style="background:var(--bg-primary); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:16px; margin-top:14px; font-family:var(--font-mono); font-size:0.88rem;">
          <strong>📐 Esquema do Circuito para Desenhar no Caderno:</strong><br><br>
          A₂ ───┐<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├─[ <strong>XNOR</strong> ]─── x₂ ───┐<br>
          B₂ ───┘&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│<br>
          A₁ ───┐&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├───[ <strong>AND (3 entradas)</strong> ]───► <strong>Saída S</strong> (1 se A=B, 0 se A≠B)<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├─[ <strong>XNOR</strong> ]─── x₁ ───┤<br>
          B₁ ───┘&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│<br>
          A₀ ───┐&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├─[ <strong>XNOR</strong> ]─── x₀ ───┘<br>
          B₀ ───┘
        </div>
      `,
      notebookReadyHTML: `
        <strong>✍️ Resumo Pronto para Passar a Limpo no Caderno (Questão 3):</strong><br><br>
        • <strong>Entradas:</strong> Números de 3 bits <code>A(A₂, A₁, A₀)</code> e <code>B(B₂, B₁, B₀)</code>.<br>
        • <strong>Equação da Saída:</strong> <code>S = (A₂ ⊕ B₂)' · (A₁ ⊕ B₁)' · (A₀ ⊕ B₀)' = (A₂B₂ + A₂'B₂')(A₁B₁ + A₁'B₁')(A₀B₀ + A₀'B₀')</code>.<br>
        • <strong>Circuito:</strong> Desenhe 3 portas <strong>XNOR</strong> (comparando cada par <code>Aᵢ, Bᵢ</code>) ligadas em 1 porta <strong>AND de 3 entradas</strong>.
      `
    },

    // =========================================================================
    // QUESTÃO 4 - CODIFICADOR / DECODIFICADOR BCD PARA DECIMAL ATIVO EM ALTO
    // =========================================================================
    {
      id: "q4",
      number: "Questão 4",
      badge: "BCD ↔ Decimal • Ativo em ALTO",
      enunciado: "4. Projete um codificador BCD para decimal, ativo em ALTO.",
      intuitionTitle: "🧠 Aula Rápida: Como funciona o conversor BCD para Decimal Ativo em ALTO?",
      intuitionHTML: `
        <p>Nos slides do Módulo II (Págs. 58–59), este circuito recebe um código <strong>BCD de 4 bits (<code>D, C, B, A</code>, de <code>0000</code>=0 a <code>1001</code>=9)</strong> e ativa em nível <strong>ALTO (<code>1</code>)</strong> apenas a saída decimal correspondente (de <code>Y₀</code> a <code>Y₉</code>), deixando as outras nove em <code>0</code>.</p>
        <p style="margin-top:6px;">Como os números de <code>1010</code> (10) a <code>1111</code> (15) não existem em BCD, usamos <strong>Don't Care (<code>X</code>)</strong> nessas 6 posições do Mapa de Karnaugh para simplificar as portas AND!</p>
      `,
      stepByStepHTML: `
        <div style="overflow-x:auto;">
          <table class="ste-table" style="text-align:center; font-size:0.82rem;">
            <thead>
              <tr>
                <th>Dígito</th><th>D (8)</th><th>C (4)</th><th>B (2)</th><th>A (1)</th>
                <th>Y₀</th><th>Y₁</th><th>Y₂</th><th>Y₃</th><th>Y₄</th><th>Y₅</th><th>Y₆</th><th>Y₇</th><th>Y₈</th><th>Y₉</th>
                <th>Equação Simplificada (Com Don't Care 10..15)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><strong>0</strong></td><td>0</td><td>0</td><td>0</td><td>0</td><td><strong>1</strong></td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td><code>Y₀ = D'C'B'A'</code></td></tr>
              <tr><td><strong>1</strong></td><td>0</td><td>0</td><td>0</td><td>1</td><td>0</td><td><strong>1</strong></td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td><code>Y₁ = D'C'B'A</code></td></tr>
              <tr><td><strong>2</strong></td><td>0</td><td>0</td><td>1</td><td>0</td><td>0</td><td>0</td><td><strong>1</strong></td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td><code>Y₂ = C'BA'</code></td></tr>
              <tr><td><strong>3</strong></td><td>0</td><td>0</td><td>1</td><td>1</td><td>0</td><td>0</td><td>0</td><td><strong>1</strong></td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td><code>Y₃ = C'BA</code></td></tr>
              <tr><td><strong>4</strong></td><td>0</td><td>1</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td><strong>1</strong></td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td><code>Y₄ = CB'A'</code></td></tr>
              <tr><td><strong>5</strong></td><td>0</td><td>1</td><td>0</td><td>1</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td><strong>1</strong></td><td>0</td><td>0</td><td>0</td><td>0</td><td><code>Y₅ = CB'A</code></td></tr>
              <tr><td><strong>6</strong></td><td>0</td><td>1</td><td>1</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td><strong>1</strong></td><td>0</td><td>0</td><td>0</td><td><code>Y₆ = CBA'</code></td></tr>
              <tr><td><strong>7</strong></td><td>0</td><td>1</td><td>1</td><td>1</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td><strong>1</strong></td><td>0</td><td>0</td><td><code>Y₇ = CBA</code></td></tr>
              <tr><td><strong>8</strong></td><td>1</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td><strong>1</strong></td><td>0</td><td><code>Y₈ = DA'</code></td></tr>
              <tr><td><strong>9</strong></td><td>1</td><td>0</td><td>0</td><td>1</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td><strong>1</strong></td><td><code>Y₉ = DA</code></td></tr>
            </tbody>
          </table>
        </div>
      `,
      notebookReadyHTML: `
        <strong>✍️ Resumo Pronto para Passar a Limpo no Caderno (Questão 4):</strong><br><br>
        • Copie a Tabela-Verdade acima (entradas BCD <code>D, C, B, A</code> de <code>0000</code> a <code>1001</code> e saídas ativas em ALTO <code>Y₀..Y₉</code>).<br>
        • <strong>Equações das 10 portas AND:</strong> <code>Y₀ = D'C'B'A'</code>, <code>Y₁ = D'C'B'A</code>, <code>Y₂ = C'BA'</code>, <code>Y₃ = C'BA</code>, <code>Y₄ = CB'A'</code>, <code>Y₅ = CB'A</code>, <code>Y₆ = CBA'</code>, <code>Y₇ = CBA</code>, <code>Y₈ = DA'</code>, <code>Y₉ = DA</code>.<br>
        • <em>(Nota extra caso queira anotar também o Codificador Decimal → BCD 10-para-4):</em> <code>D = I₈+I₉</code>; <code>C = I₄+I₅+I₆+I₇</code>; <code>B = I₂+I₃+I₆+I₇</code>; <code>A = I₁+I₃+I₅+I₇+I₉</code>.
      `
    },

    // =========================================================================
    // QUESTÃO 5 - DECODIFICADOR BCD PARA DISPLAY DE 7 SEGMENTOS
    // =========================================================================
    {
      id: "q5",
      number: "Questão 5",
      badge: "Projeto Clássico • 7 Segmentos + Logisim",
      enunciado: "5. Projete um decodificador BCD para um display de 7 segmentos. Implemente no Logisim e teste.",
      intuitionTitle: "🧠 Aula Rápida: Como acender cada traço (a, b, c, d, e, f, g) do Display?",
      intuitionHTML: `
        <p>O display possui 7 segmentos chamados <strong><code>a</code> (topo), <code>b</code> (direita cima), <code>c</code> (direita baixo), <code>d</code> (base), <code>e</code> (esquerda baixo), <code>f</code> (esquerda cima) e <code>g</code> (meio)</strong>. Para cada número de 0 a 9, marcamos <code>1</code> nos segmentos que precisam acender e <code>X</code> (Don't Care) nos números 10 a 15!</p>
      `,
      stepByStepHTML: `
        <div style="overflow-x:auto;">
          <table class="ste-table" style="text-align:center; font-size:0.84rem;">
            <thead>
              <tr>
                <th>Dígito</th>
                <th>A (8)</th><th>B (4)</th><th>C (2)</th><th>D (1)</th>
                <th>a</th><th>b</th><th>c</th><th>d</th><th>e</th><th>f</th><th>g</th>
                <th>Segmentos Acesos</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><strong>0</strong></td><td>0</td><td>0</td><td>0</td><td>0</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>0</td><td>Todos menos g</td></tr>
              <tr><td><strong>1</strong></td><td>0</td><td>0</td><td>0</td><td>1</td><td>0</td><td>1</td><td>1</td><td>0</td><td>0</td><td>0</td><td>0</td><td>b, c</td></tr>
              <tr><td><strong>2</strong></td><td>0</td><td>0</td><td>1</td><td>0</td><td>1</td><td>1</td><td>0</td><td>1</td><td>1</td><td>0</td><td>1</td><td>a, b, d, e, g</td></tr>
              <tr><td><strong>3</strong></td><td>0</td><td>0</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>0</td><td>0</td><td>1</td><td>a, b, c, d, g</td></tr>
              <tr><td><strong>4</strong></td><td>0</td><td>1</td><td>0</td><td>0</td><td>0</td><td>1</td><td>1</td><td>0</td><td>0</td><td>1</td><td>1</td><td>b, c, f, g</td></tr>
              <tr><td><strong>5</strong></td><td>0</td><td>1</td><td>0</td><td>1</td><td>1</td><td>0</td><td>1</td><td>1</td><td>0</td><td>1</td><td>1</td><td>a, c, d, f, g</td></tr>
              <tr><td><strong>6</strong></td><td>0</td><td>1</td><td>1</td><td>0</td><td>1</td><td>0</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>a, c, d, e, f, g</td></tr>
              <tr><td><strong>7</strong></td><td>0</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>0</td><td>0</td><td>0</td><td>0</td><td>a, b, c</td></tr>
              <tr><td><strong>8</strong></td><td>1</td><td>0</td><td>0</td><td>0</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>Todos os 7!</td></tr>
              <tr><td><strong>9</strong></td><td>1</td><td>0</td><td>0</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>0</td><td>1</td><td>1</td><td>a, b, c, d, f, g</td></tr>
              <tr><td><strong>10..15</strong></td><td colspan="4">1010 a 1111</td><td>X</td><td>X</td><td>X</td><td>X</td><td>X</td><td>X</td><td>X</td><td>Don't Care (X)</td></tr>
            </tbody>
          </table>
        </div>

        <div class="ste-steps" style="margin-top:14px;">
          <div style="font-weight:800; color:var(--accent-primary); font-size:1rem; margin-bottom:8px;">
            👣 Equações Simplificadas pelos Mapas de Karnaugh (Com Don't Care 10..15):
          </div>
          <div class="ste-step-item"><div class="step-num">a</div><div><code>a = A + C + BD + B'D'</code></div></div>
          <div class="ste-step-item"><div class="step-num">b</div><div><code>b = B' + C'D' + CD</code></div></div>
          <div class="ste-step-item"><div class="step-num">c</div><div><code>c = B + C' + D</code></div></div>
          <div class="ste-step-item"><div class="step-num">d</div><div><code>d = A + B'D' + B'C + CD' + BC'D</code></div></div>
          <div class="ste-step-item"><div class="step-num">e</div><div><code>e = B'D' + CD'</code></div></div>
          <div class="ste-step-item"><div class="step-num">f</div><div><code>f = A + C'D' + BC' + BD'</code></div></div>
          <div class="ste-step-item"><div class="step-num">g</div><div><code>g = A + B'C + BC' + CD'</code></div></div>
        </div>
      `,
      notebookReadyHTML: `
        <strong>✍️ Resumo Pronto para Passar a Limpo no Caderno (Questão 5):</strong><br><br>
        • Copie a Tabela-Verdade de 0 a 9 acima e as 7 equações mínimas (<code>a</code> até <code>g</code>).<br>
        • <strong>No Logisim:</strong> Abra <code>Project → Analyze Circuit</code>, crie as entradas <code>A,B,C,D</code> e saídas <code>a,b,c,d,e,f,g</code>, preencha a tabela e clique em <code>Build Circuit</code>!
      `
    },

    // =========================================================================
    // QUESTÃO 6 - CONVERSORES BINÁRIO <-> GRAY DE 4 BITS
    // =========================================================================
    {
      id: "q6",
      number: "Questão 6",
      badge: "Código Gray • 3 Portas XOR",
      enunciado: "6. Projete dois codificadores: binário para Grey e Grey para binário de 4 bits. Implemente no Logisim e teste.",
      intuitionTitle: "🧠 Aula Rápida: Apenas 3 portas XOR resolvem cada conversor!",
      intuitionHTML: `
        <p>Como a regra do Código Gray compara se dois bits vizinhos são diferentes, usamos a porta <strong>XOR (<code>⊕</code>)</strong>:</p>
      `,
      stepByStepHTML: `
        <div class="grid-2" style="margin-top:10px;">
          <div style="background:var(--bg-primary); border:1px solid var(--accent-primary); border-radius:var(--radius-md); padding:16px;">
            <h4 style="color:var(--accent-primary); margin-bottom:8px;">1️⃣ Binário (B₃B₂B₁B₀) → Gray (G₃G₂G₁G₀)</h4>
            <div style="font-family:var(--font-mono); background:var(--bg-elevated); padding:10px; border-radius:6px; margin-bottom:10px;">
              <strong>G₃ = B₃</strong><br>
              <strong>G₂ = B₃ ⊕ B₂</strong><br>
              <strong>G₁ = B₂ ⊕ B₁</strong><br>
              <strong>G₀ = B₁ ⊕ B₀</strong>
            </div>
            <div style="font-family:var(--font-mono); font-size:0.82rem; color:var(--text-secondary);">
              B₃ ───────────► G₃<br>
              &nbsp;└──┐<br>
              B₂ ─┴─[XOR]───► G₂<br>
              &nbsp;└──┐<br>
              B₁ ─┴─[XOR]───► G₁<br>
              &nbsp;└──┐<br>
              B₀ ─┴─[XOR]───► G₀
            </div>
          </div>

          <div style="background:var(--bg-primary); border:1px solid var(--success); border-radius:var(--radius-md); padding:16px;">
            <h4 style="color:var(--success); margin-bottom:8px;">2️⃣ Gray (G₃G₂G₁G₀) → Binário (B₃B₂B₁B₀)</h4>
            <div style="font-family:var(--font-mono); background:var(--bg-elevated); padding:10px; border-radius:6px; margin-bottom:10px;">
              <strong>B₃ = G₃</strong><br>
              <strong>B₂ = B₃ ⊕ G₂ = G₃ ⊕ G₂</strong><br>
              <strong>B₁ = B₂ ⊕ G₁ = G₃ ⊕ G₂ ⊕ G₁</strong><br>
              <strong>B₀ = B₁ ⊕ G₀ = G₃ ⊕ G₂ ⊕ G₁ ⊕ G₀</strong>
            </div>
            <div style="font-family:var(--font-mono); font-size:0.82rem; color:var(--text-secondary);">
              G₃ ──────┬────► B₃<br>
              G₂ ───[XOR]─┬─► B₂<br>
              G₁ ──────[XOR]┬► B₁<br>
              G₀ ─────────[XOR]► B₀
            </div>
          </div>
        </div>
      `,
      notebookReadyHTML: `
        <strong>✍️ Resumo Pronto para Passar a Limpo no Caderno (Questão 6):</strong><br><br>
        • <strong>Binário → Gray (4 bits):</strong> <code>G₃ = B₃</code>; <code>G₂ = B₃ ⊕ B₂</code>; <code>G₁ = B₂ ⊕ B₁</code>; <code>G₀ = B₁ ⊕ B₀</code>.<br>
        • <strong>Gray → Binário (4 bits):</strong> <code>B₃ = G₃</code>; <code>B₂ = B₃ ⊕ G₂</code>; <code>B₁ = B₂ ⊕ G₁</code>; <code>B₀ = B₁ ⊕ G₀</code>.
      `
    },

    // =========================================================================
    // QUESTÃO 7 - PROJETO COM MULTIPLEXADOR (MUX)
    // =========================================================================
    {
      id: "q7",
      number: "Questão 7",
      badge: "Projeto com MUX • Mintermos 0, 2, 4",
      enunciado: "7. Utilize um MUX para implementar a função que possui saída alta para os mintermos de entrada 0, 2 e 4.",
      intuitionTitle: "🧠 Aula Rápida: Como ligar os pinos do MUX para dar 1 nos mintermos 0, 2 e 4?",
      intuitionHTML: `
        <p>Para implementar <code>F(A, B, C) = ∑m(0, 2, 4)</code> (função de 3 variáveis, que vai de <code>m₀</code> a <code>m₇</code>), basta ligar em nível ALTO (<code>1</code>) as entradas dos mintermos 0, 2 e 4 e aterrar (<code>0</code>) as demais!</p>
      `,
      stepByStepHTML: `
        <div class="grid-2" style="margin-top:10px;">
          <div style="background:var(--bg-primary); border:1px solid var(--accent-primary); border-radius:var(--radius-md); padding:16px;">
            <h4 style="color:var(--accent-primary); margin-bottom:8px;">Opção A: Com MUX de 8 para 1 (Direto!)</h4>
            <ul class="ste-sentence-list">
              <li>Ligue <strong><code>A, B, C</code></strong> nos seletores <strong><code>S₂, S₁, S₀</code></strong>.</li>
              <li>Ligue as entradas <strong><code>I₀, I₂ e I₄</code></strong> em <strong>Nível ALTO (<code>1</code> / Vcc)</strong>.</li>
              <li>Ligue as entradas <strong><code>I₁, I₃, I₅, I₆ e I₇</code></strong> em <strong>Nível BAIXO (<code>0</code> / GND)</strong>.</li>
            </ul>
          </div>

          <div style="background:var(--bg-primary); border:1px solid var(--success); border-radius:var(--radius-md); padding:16px;">
            <h4 style="color:var(--success); margin-bottom:8px;">Opção B: Com MUX de 4 para 1 (Redução de Variável)</h4>
            <ul class="ste-sentence-list">
              <li>Ligue <strong><code>A, B</code></strong> nos seletores <strong><code>S₁, S₀</code></strong> e use <code>C</code> nas entradas:</li>
              <li><code>I₀</code> (par m₀=1, m₁=0) → ligue <strong><code>I₀ = C'</code></strong></li>
              <li><code>I₁</code> (par m₂=1, m₃=0) → ligue <strong><code>I₁ = C'</code></strong></li>
              <li><code>I₂</code> (par m₄=1, m₅=0) → ligue <strong><code>I₂ = C'</code></strong></li>
              <li><code>I₃</code> (par m₆=0, m₇=0) → ligue <strong><code>I₃ = 0</code> (GND)</strong></li>
            </ul>
          </div>
        </div>
      `,
      notebookReadyHTML: `
        <strong>✍️ Resumo Pronto para Passar a Limpo no Caderno (Questão 7):</strong><br><br>
        Para <code>F(A,B,C) = ∑m(0, 2, 4)</code>:<br>
        • <strong>Com MUX 8:1:</strong> Seletores <code>S₂S₁S₀ = ABC</code>; Entradas <code>I₀ = I₂ = I₄ = 1 (Vcc)</code> e <code>I₁ = I₃ = I₅ = I₆ = I₇ = 0 (GND)</code>.<br>
        • <strong>Com MUX 4:1:</strong> Seletores <code>S₁S₀ = AB</code>; Entradas <code>I₀ = C'</code>, <code>I₁ = C'</code>, <code>I₂ = C'</code> e <code>I₃ = 0</code>.
      `
    },

    // =========================================================================
    // QUESTÕES 8, 9, 10, 11 e 12 - LATCHES, FLIP-FLOPS E DETECTOR DE BORDA
    // =========================================================================
    {
      id: "q8-q12",
      number: "Questões 8, 9, 10, 11 e 12",
      badge: "Teoria Sequencial • Latches e Flip-Flops",
      enunciado: "8. Descreva a principal diferença entre um latch S-R controlado e um flip-flop disparado por borda.\n9. Em que um flip-flop J-K difere de um flip-flop S-R em sua operação básica?\n10. Cite e explique as principais aplicações dos Latches.\n11. Qual a diferença entre os latches síncronos e assíncronos?\n12. Qual a diferença de um disparo por borda positivo e um negativo? É possível fazer o circuito de detecção de borda em um simulador? Por quê?",
      intuitionTitle: "🧠 Aula Rápida: A diferença entre NÍVEL (Latch) e BORDA (Flip-Flop)!",
      intuitionHTML: `
        <ul class="ste-sentence-list">
          <li><strong>Latch Assíncrono:</strong> Não tem pino de habilitação (muda na hora em que <code>S</code> ou <code>R</code> mudam).</li>
          <li><strong>Latch Síncrono / Controlado:</strong> Tem pino <code>EN</code> e é sensível ao <strong>NÍVEL</strong> (enquanto <code>EN = 1</code>, qualquer mudança em <code>S</code> ou <code>R</code> passa direto para a saída <code>Q</code>).</li>
          <li><strong>Flip-Flop Disparado por Borda:</strong> Tem pino <code>CLK</code> e só atualiza a saída no <strong>instante exato da seta do Clock</strong> (subida <code>0→1</code> ou descida <code>1→0</code>).</li>
        </ul>
      `,
      stepByStepHTML: `
        <div class="ste-steps">
          <div class="ste-step-item">
            <div class="step-num">8</div>
            <div>
              <strong>Resposta da Questão 8:</strong><br>
              O <strong>Latch S-R controlado</strong> é sensível ao <strong>nível lógico</strong> do sinal de habilitação (<code>EN</code>): enquanto <code>EN = 1</code>, ele fica transparente e a saída <code>Q</code> muda sempre que <code>S</code> ou <code>R</code> mudarem. Já o <strong>Flip-Flop disparado por borda</strong> é sensível apenas ao <strong>instante da transição (borda)</strong> do Clock (de <code>0→1</code> ou de <code>1→0</code>), ignorando alterações nas entradas fora do instante da borda.
            </div>
          </div>

          <div class="ste-step-item">
            <div class="step-num">9</div>
            <div>
              <strong>Resposta da Questão 9:</strong><br>
              O Flip-Flop J-K difere do S-R na condição em que <strong>ambas as entradas estão em nível ALTO (<code>1, 1</code>)</strong>. No Flip-Flop S-R, a condição <code>S = 1, R = 1</code> é <strong>proibida/inválida</strong>. No Flip-Flop J-K, a condição <strong><code>J = 1, K = 1</code> é válida e aciona o modo de COMUTAÇÃO (Toggle)</strong>, fazendo a saída <code>Q</code> inverter seu estado atual (<code>Q(novo) = Q'</code>) a cada borda de clock.
            </div>
          </div>

          <div class="ste-step-item">
            <div class="step-num">10</div>
            <div>
              <strong>Resposta da Questão 10:</strong><br>
              As principais aplicações dos Latches são:<br>
              1. <strong>Eliminação de repique de chaves mecânicas (<em>Switch Debouncing</em>):</strong> filtra a trepidação metálica de botões, garantindo uma única transição limpa.<br>
              2. <strong>Armazenamento temporário de dados (<em>Buffers / Travas de Dados</em>):</strong> retém dados de um barramento para alimentar displays ou periféricos.<br>
              3. <strong>Retenção de estado/alarme (Memória de 1 bit):</strong> mantém um sinal ativo após o disparo de um sensor até ser resetado.
            </div>
          </div>

          <div class="ste-step-item">
            <div class="step-num">11</div>
            <div>
              <strong>Resposta da Questão 11:</strong><br>
              • <strong>Latches Assíncronos:</strong> Não possuem entrada de controle/habilitação; respondem imediatamente a qualquer mudança em <code>S</code> ou <code>R</code>.<br>
              • <strong>Latches Síncronos (Controlados):</strong> Possuem uma entrada de habilitação (<code>EN</code> / Enable); as entradas <code>S</code> e <code>R</code> só alteram a saída quando <code>EN</code> está ativo.
            </div>
          </div>

          <div class="ste-step-item">
            <div class="step-num">12</div>
            <div>
              <strong>Resposta da Questão 12:</strong><br>
              • <strong>Disparo por borda positiva vs. negativa:</strong> Na <strong>borda positiva (subida)</strong>, o FF amostra as entradas na transição do clock de <code>0 para 1</code> (símbolo sem bolinha no CLK). Na <strong>borda negativa (descida)</strong>, ele amostra na transição de <code>1 para 0</code> (símbolo com bolinha inversora no CLK).<br>
              • <strong>Sobre o detector de borda no simulador:</strong> O circuito detector de borda (porta AND entre <code>CLK</code> e <code>CLK'</code> vindo de uma inversora NOT — pág. 108 do Módulo II) depende do <strong>atraso de propagação físico (<code>tpd</code>)</strong> da porta NOT para gerar um pulso curto. Em um <strong>simulador ideal (atraso zero)</strong> ele não funciona porque <code>CLK</code> e <code>CLK'</code> mudam no mesmo instante exato (dando sempre <code>0</code>). Ele só funciona em simuladores que modelam o atraso de propagação real das portas (ou adicionando atraso explícito).
            </div>
          </div>
        </div>
      `,
      notebookReadyHTML: `
        <strong>✍️ Resumo Pronto para Passar a Limpo no Caderno (Questões 8 a 12):</strong><br><br>
        Copie os blocos numerados <strong>8, 9, 10, 11 e 12</strong> acima diretamente para a sua folha de respostas!
      `
    },

    // =========================================================================
    // QUESTÕES 13, 14 e 15 - PROJETO DE CONTADORES (MOD-12, MOD-14 E UP/DOWN)
    // =========================================================================
    {
      id: "q13-q15",
      number: "Questões 13, 14 e 15",
      badge: "Projeto de Contadores • MOD-12, MOD-14 e Up/Down",
      enunciado: "13. Mostre como um contador assíncrono pode ser implementado tendo um módulo de doze com uma sequência binária de 0000 a 1011.\n14. O que se deve fazer para alterar o circuito anterior para que tenha módulo 14?\n15. Projete um contador binário crescente/decrescente de 4 bits.",
      intuitionTitle: "🧠 Aula Rápida: A regra da porta NAND ligada no pino CLR' (Clear)!",
      intuitionHTML: `
        <p>Para fazer um contador de 4 Flip-Flops parar antes de 16 (ter Módulo <code>M</code>, contando de <code>0</code> até <code>M-1</code>): escreva o número <strong><code>M</code> em binário de 4 bits (<code>Qd Qc Qb Qa</code>)</strong> e ligue apenas as saídas que valem <strong><code>1</code></strong> em uma <strong>porta NAND</strong> conectada aos pinos <strong><code>CLR'</code></strong> de todos os Flip-Flops!</p>
      `,
      stepByStepHTML: `
        <div class="ste-steps">
          <div class="ste-step-item">
            <div class="step-num">13</div>
            <div>
              <strong>Resposta da Questão 13 — Contador Assíncrono Módulo 12 (<code>0000</code> a <code>1011</code>):</strong><br>
              1. Usamos <strong>4 Flip-Flops J-K</strong> (<code>FFa, FFb, FFc, FFd</code>, pois <code>2⁴ = 16 ≥ 12</code>) com todas as entradas <code>J = K = 1</code>.<br>
              2. Ligamos em cascata assíncrona (borda de descida): o Clock externo entra em <code>FFa</code> (LSB); <code>Qa</code> alimenta o Clock de <code>FFb</code>; <code>Qb</code> alimenta o Clock de <code>FFc</code>; <code>Qc</code> alimenta o Clock de <code>FFd</code> (MSB).<br>
              3. Ele deve contar de <code>0000</code> (0) até <code>1011</code> (11) e zerar imediatamente ao atingir o estado <strong>12 (<code>1100₂</code>)</strong>, onde <strong><code>Qd = 1, Qc = 1</code></strong> (e <code>Qb = 0, Qa = 0</code>).<br>
              4. Portanto, ligamos as saídas <strong><code>Qd</code> e <code>Qc</code></strong> nas entradas de uma <strong>porta NAND de 2 entradas</strong>, e conectamos a saída dessa NAND aos pinos <strong><code>CLR'</code></strong> (ativos em zero) dos 4 Flip-Flops!
            </div>
          </div>

          <div class="ste-step-item">
            <div class="step-num">14</div>
            <div>
              <strong>Resposta da Questão 14 — Como alterar para ter Módulo 14 (<code>0000</code> a <code>1101</code>):</strong><br>
              No Módulo 14, o contador conta de <code>0000</code> (0) até <code>1101</code> (13) e deve ser zerado imediatamente ao atingir o estado <strong>14 (<code>1110₂</code>)</strong>, onde <strong><code>Qd = 1, Qc = 1 e Qb = 1</code></strong> (<code>Qa = 0</code>).<br>
              <strong>Alteração:</strong> Substitua a porta NAND de 2 entradas por uma <strong>porta NAND de 3 entradas</strong> conectada às saídas <strong><code>Qd, Qc e Qb</code></strong>, mantendo sua saída ligada aos pinos <code>CLR'</code> dos 4 Flip-Flops!
            </div>
          </div>

          <div class="ste-step-item">
            <div class="step-num">15</div>
            <div>
              <strong>Resposta da Questão 15 — Contador Binário Crescente/Decrescente de 4 bits (Págs. 152 e 168):</strong><br>
              Utilizamos 4 Flip-Flops J-K com <code>J = K = 1</code> e uma entrada de controle de modo <strong><code>M</code></strong> (<code>M = 1</code> para Crescente / <code>M = 0</code> para Decrescente):<br>
              • Para contar de forma <strong>Crescente</strong> (com FFs disparados por borda de descida), o sinal acoplado ao próximo estágio é a saída normal <strong><code>Q</code></strong>.<br>
              • Para contar de forma <strong>Decrescente</strong>, o sinal acoplado ao próximo estágio é a saída invertida <strong><code>Q'</code></strong>.<br>
              • Entre cada Flip-Flop <code>i</code> e o próximo <code>i+1</code>, inserimos um seletor AND-OR (MUX 2:1) com a equação:<br>
              <code>Sinal(i→i+1) = (M · Qᵢ) + (M' · Qᵢ')</code>.
            </div>
          </div>
        </div>
      `,
      notebookReadyHTML: `
        <strong>✍️ Resumo Pronto para Passar a Limpo no Caderno (Questões 13, 14 e 15):</strong><br><br>
        • <strong>Q13 (MOD-12):</strong> 4 FFs JK (<code>J=K=1</code>) em cascata + <strong>Porta NAND de 2 entradas</strong> recebendo <strong><code>Qd</code> e <code>Qc</code></strong> (estado <code>12 = 1100₂</code>) ligada aos pinos <code>CLR'</code>.<br>
        • <strong>Q14 (MOD-14):</strong> Trocar por uma <strong>Porta NAND de 3 entradas</strong> recebendo <strong><code>Qd, Qc e Qb</code></strong> (estado <code>14 = 1110₂</code>) ligada aos pinos <code>CLR'</code>.<br>
        • <strong>Q15 (Crescente/Decrescente 4 bits):</strong> 4 FFs JK (<code>J=K=1</code>) com linha de modo <code>M</code> selecionando <code>Qᵢ</code> (quando <code>M=1</code>) ou <code>Qᵢ'</code> (quando <code>M=0</code>) via portas AND-OR: <code>CLK(i+1) = M·Qᵢ + M'·Qᵢ'</code>.
      `
    },

    // =========================================================================
    // QUESTÕES 16, 17, 18, 19 e 20 - REGISTRADORES E O RELÓGIO DIGITAL COMPLETO
    // =========================================================================
    {
      id: "q16-q20",
      number: "Questões 16, 17, 18, 19 e 20",
      badge: "Registradores + Relógio Digital Completo",
      enunciado: "16. Qual a diferença entre uma carga paralela e uma carga serial utilizando-se FF como registradores de deslocamento?\n17. Descrever como os contadores são usados em sistemas digitais com clock.\n18. Explicar como um contador/divisor por 60 é implementado e como ele é usado num relógio digital.\n19. Explicar como o contador de horas é implementado.\n20. Seja o circuito do Relógio Digital (Pág. 3 da lista). Explique o funcionamento de cada parte.",
      intuitionTitle: "🧠 Aula Rápida: Entendendo os Registradores e o Relógio Digital da Página 3!",
      intuitionHTML: `
        <p>Na Página 3 da sua lista está o diagrama clássico do <strong>Relógio Digital (<code>12 : 59 : 30</code>)</strong> das páginas 161–163 do Módulo II. Veja abaixo a resposta detalhada de cada uma das 5 questões finais:</p>
      `,
      stepByStepHTML: `
        <div class="ste-steps">
          <div class="ste-step-item">
            <div class="step-num">16</div>
            <div>
              <strong>Resposta da Questão 16 — Carga Paralela vs. Carga Serial em Registradores:</strong><br>
              • <strong>Carga Serial:</strong> Os bits de dados entram <strong>um a um em sequência (fila)</strong> pela entrada do primeiro Flip-Flop, deslocando-se uma posição a cada pulso de clock. Exige apenas 1 fio de entrada, mas leva <strong><code>N</code> pulsos de clock</strong> para armazenar <code>N</code> bits.<br>
              • <strong>Carga Paralela:</strong> Todos os <code>N</code> bits são carregados <strong>simultaneamente (ao mesmo tempo)</strong> nos respectivos Flip-Flops em <strong>apenas 1 pulso de clock</strong> (ou via entradas assíncronas). É muito mais rápida, mas exige <code>N</code> fios de entrada.
            </div>
          </div>

          <div class="ste-step-item">
            <div class="step-num">17</div>
            <div>
              <strong>Resposta da Questão 17 — Como os contadores são usados em sistemas digitais com clock:</strong><br>
              1. <strong>Contagem de eventos e pulsos</strong> (ex: contagem de peças, frequência de sinais).<br>
              2. <strong>Divisão de frequência:</strong> cada contador de Módulo <code>M</code> divide a frequência do clock de entrada por <code>M</code> (<code>f_saída = f_entrada / M</code>).<br>
              3. <strong>Base de tempo e Relógios Digitais:</strong> geração de pulsos de 1 segundo (1 Hz), minutos e horas.<br>
              4. <strong>Sequenciamento e endereçamento de memória:</strong> geração sequencial de estados e endereços (como o Contador de Programa — PC).
            </div>
          </div>

          <div class="ste-step-item">
            <div class="step-num">18</div>
            <div>
              <strong>Resposta da Questão 18 — Implementação e uso do Contador/Divisor por 60 (MOD-60):</strong><br>
              • <strong>Implementação:</strong> É formado por <strong>dois contadores em cascata</strong>: um <strong>Contador BCD Módulo 10 (<code>CTR DIV 10</code>)</strong> para as unidades (<code>0 a 9</code>) seguido por um <strong>Contador Módulo 6 (<code>CTR DIV 6</code>)</strong> para as dezenas (<code>0 a 5</code>), resultando no módulo total <code>10 × 6 = 60</code> (conta de <code>00 a 59</code>).<br>
              • <strong>Uso no relógio digital:</strong> É usado em 3 estágios: (1) para dividir os <code>60 Hz</code> da rede elétrica por 60 gerando o clock de <strong><code>1 Hz</code> (1 pulso/segundo)</strong>; (2) no <strong>Contador de Segundos</strong> (<code>00 a 59</code> s, gerando 1 pulso/minuto); e (3) no <strong>Contador de Minutos</strong> (<code>00 a 59</code> min, gerando 1 pulso/hora).
            </div>
          </div>

          <div class="ste-step-item">
            <div class="step-num">19</div>
            <div>
              <strong>Resposta da Questão 19 — Como o Contador de Horas é implementado:</strong><br>
              Para o ciclo de <code>01 a 12</code> horas, utiliza-se um <strong>Contador BCD (<code>CTR DIV 10</code>)</strong> para o dígito das unidades da hora e <strong>1 Flip-Flop (<code>FF</code>)</strong> para o dígito das dezenas (que só vale <code>0</code> ou <code>1</code>). De <code>01 a 09</code> o FF vale <code>0</code>; ao passar de <code>09 para 10</code> o FF vai para <code>1</code>. Quando o contador está em <code>12</code> e recebe o próximo pulso (que iria para <code>13</code>), uma lógica combinacional detecta esse estado, <strong>reseta o Flip-Flop da dezena para <code>0</code></strong> e faz a <strong>carga paralela do valor <code>0001</code> (1)</strong> no contador das unidades, reiniciando em <strong><code>01</code></strong>!
            </div>
          </div>

          <div class="ste-step-item">
            <div class="step-num">20</div>
            <div>
              <strong>Resposta da Questão 20 — Funcionamento de cada parte do Diagrama do Relógio Digital (Pág. 3):</strong><br>
              1. <strong>Circuito Modelador de Onda:</strong> Converte a onda senoidal de <code>60 Hz AC</code> da rede elétrica em uma onda quadrada digital de <code>60 Hz</code>.<br>
              2. <strong>Divisor por 60 superior (<code>CTR DIV 10</code> + <code>CTR DIV 6</code>):</strong> Divide os <code>60 Hz</code> por 60 para gerar o sinal de referência de <strong><code>1 Hz</code> (1 pulso por segundo)</strong>.<br>
              3. <strong>Contador de Segundos (<code>CTR DIV 10</code> + <code>CTR DIV 6</code> à direita):</strong> Recebe <code>1 Hz</code>, conta de <code>00 a 59</code> segundos (unidades de 0–9 e dezenas de 0–5) e envia 1 pulso por minuto ao próximo bloco.<br>
              4. <strong>Contador de Minutos (<code>CTR DIV 10</code> + <code>CTR DIV 6</code> ao centro):</strong> Conta de <code>00 a 59</code> minutos e envia 1 pulso por hora ao contador de horas.<br>
              5. <strong>Contador de Horas (<code>CTR DIV 10</code> + <code>FF</code> à esquerda):</strong> Conta de <code>01 a 12</code> horas.<br>
              6. <strong>6 Decodificadores <code>BCD/7-seg</code> e 6 Displays de 7 Segmentos:</strong> Decodificam os valores binários/BCD de cada estágio para acender os segmentos correspondentes nos visores (exibindo <code>12 : 59 : 30</code>).
            </div>
          </div>
        </div>
      `,
      notebookReadyHTML: `
        <strong>✍️ Resumo Pronto para Passar a Limpo no Caderno (Questões 16 a 20):</strong><br><br>
        Copie os blocos numerados <strong>16, 17, 18, 19 e 20</strong> acima diretamente para o seu caderno!
      `
    }
  ]
};
