// Laboratórios Interativos ("Aprender Praticando") - ASD-STE100
// Cobre Módulo I e Módulo II com simulação em tempo real.

window.SLD_LABS = {
  // ===========================================================================
  // LAB 1: NÍVEIS LÓGICOS DE TENSÃO E CLASSIFICAÇÃO DE SINAIS (MÓD. I)
  // ===========================================================================
  renderLabSignals(container) {
    container.innerHTML = `
      <div class="card">
        <div class="card-header">
          <div>
            <span class="badge badge-mod1">Laboratório Prático 1 • Módulo I (Págs. 5–16)</span>
            <h2 class="card-title" style="margin-top:6px;">Simulador de Níveis Lógicos de Tensão e Amostragem/Quantização</h2>
          </div>
        </div>

        <div class="ste-box">
          <div class="ste-box-header"><span>Instrução ASD-STE100</span></div>
          <ul class="ste-sentence-list">
            <li>Arraste o controle de tensão abaixo entre <strong>0,0 V e 5,0 V</strong>.</li>
            <li>Observe como o circuito digital ignora pequenas variações e responde apenas ao <strong>Nível Lógico (0 ou 1)</strong>.</li>
            <li>Evite a faixa entre <strong>0,8 V e 2,0 V</strong>: ela é inválida e causa erro de leitura!</li>
          </ul>
        </div>

        <div class="grid-2" style="align-items:center; margin-top:16px;">
          <div style="background:var(--bg-elevated); padding:20px; border-radius:var(--radius-md); border:1px solid var(--border-color);">
            <label style="font-weight:700; display:block; margin-bottom:10px;">
              Tensão de Entrada Aplicada (Vᵢ): <span id="sig-volt-label" style="color:var(--accent-primary); font-family:var(--font-mono); font-size:1.3rem;">3.7 V</span>
            </label>
            <input type="range" id="sig-volt-slider" min="0" max="5" step="0.1" value="3.7" style="width:100%; cursor:pointer; accent-color:var(--accent-primary);">
            <div style="display:flex; justify-content:space-between; font-size:0.78rem; color:var(--text-muted); margin-top:6px; font-family:var(--font-mono);">
              <span>0.0V</span>
              <span>0.8V (Limite 0)</span>
              <span>2.0V (Limite 1)</span>
              <span>5.0V</span>
            </div>

            <div style="margin-top:18px; display:flex; gap:8px; flex-wrap:wrap;">
              <button class="btn btn-sm btn-secondary" onclick="window.SLD_LABS.setVoltage(0.5)">Testar Caso 2 (0,5 V)</button>
              <button class="btn btn-sm btn-secondary" onclick="window.SLD_LABS.setVoltage(1.4)">Testar Zona Inválida (1,4 V)</button>
              <button class="btn btn-sm btn-secondary" onclick="window.SLD_LABS.setVoltage(3.7)">Testar Caso 2 (3,7 V)</button>
              <button class="btn btn-sm btn-secondary" onclick="window.SLD_LABS.setVoltage(5.0)">Testar Caso 1 (5,0 V)</button>
            </div>
          </div>

          <div id="sig-result-card" style="background:var(--bg-elevated); padding:22px; border-radius:var(--radius-md); border:2px solid var(--success); text-align:center;">
            <div style="font-size:0.8rem; text-transform:uppercase; font-weight:700; color:var(--text-muted);">Leitura do Circuito Digital</div>
            <div id="sig-logic-state" style="font-size:2.4rem; font-weight:900; font-family:var(--font-mono); margin:8px 0; color:var(--success);">BINÁRIO 1 (ALTO)</div>
            <div id="sig-inv-output" style="font-size:0.95rem; color:var(--text-secondary);">Saída de um Inversor (Vₒ): <strong>0 V (Nível 0)</strong></div>
            <p id="sig-ste-msg" style="margin-top:10px; font-size:0.86rem; color:var(--text-muted);"></p>
          </div>
        </div>
      </div>

      <div class="card">
        <h3 class="card-title" style="margin-bottom:10px;">Visualizador Interativo: Analógico vs. Amostrado vs. Quantizado vs. Digital (Pág. 16)</h3>
        <p style="color:var(--text-secondary); font-size:0.9rem; margin-bottom:14px;">
          Clique nos 4 botões abaixo para ver o que acontece com a onda física em cada etapa da digitalização:
        </p>
        <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:16px;">
          <button class="btn btn-sm btn-primary" id="btn-sig-analog" onclick="window.SLD_LABS.setSignalType('analog')">1. Sinal Analógico</button>
          <button class="btn btn-sm btn-secondary" id="btn-sig-sampled" onclick="window.SLD_LABS.setSignalType('sampled')">2. Sinal Amostrado (Tempo Discreto)</button>
          <button class="btn btn-sm btn-secondary" id="btn-sig-quant" onclick="window.SLD_LABS.setSignalType('quant')">3. Sinal Quantizado (Valor em Degraus)</button>
          <button class="btn btn-sm btn-secondary" id="btn-sig-digital" onclick="window.SLD_LABS.setSignalType('digital')">4. Sinal Digital (Amostrado + Quantizado)</button>
        </div>
        <div id="sig-wave-box" style="background:var(--bg-elevated); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:18px;"></div>
      </div>
    `;

    const slider = document.getElementById("sig-volt-slider");
    slider.addEventListener("input", (e) => this.updateVoltageUI(parseFloat(e.target.value)));
    this.updateVoltageUI(3.7);
    this.setSignalType("analog");
  },

  setVoltage(v) {
    const slider = document.getElementById("sig-volt-slider");
    if (slider) {
      slider.value = v;
      this.updateVoltageUI(v);
    }
  },

  updateVoltageUI(v) {
    const label = document.getElementById("sig-volt-label");
    const card = document.getElementById("sig-result-card");
    const state = document.getElementById("sig-logic-state");
    const inv = document.getElementById("sig-inv-output");
    const msg = document.getElementById("sig-ste-msg");
    if (!label) return;

    label.textContent = v.toFixed(1) + " V";
    if (v >= 2.0) {
      card.style.borderColor = "var(--success)";
      state.style.color = "var(--success)";
      state.textContent = "BINÁRIO 1 (ALTO)";
      inv.innerHTML = "Saída do Circuito Inversor (Pág. 7): <strong>0 V (Nível 0)</strong>";
      msg.textContent = "STE-100: Tensão entre 2,0 V e 5,0 V. O circuito interpreta como 1 com total segurança.";
    } else if (v <= 0.8) {
      card.style.borderColor = "var(--accent-primary)";
      state.style.color = "var(--accent-primary)";
      state.textContent = "BINÁRIO 0 (BAIXO)";
      inv.innerHTML = "Saída do Circuito Inversor (Pág. 7): <strong>4 V (Nível 1)</strong>";
      msg.textContent = "STE-100: Tensão entre 0,0 V e 0,8 V. O circuito interpreta como 0 com total segurança.";
    } else {
      card.style.borderColor = "var(--danger)";
      state.style.color = "var(--danger)";
      state.textContent = "TENSÃO INVÁLIDA!";
      inv.innerHTML = "Saída do Circuito: <strong>IMPREVISÍVEL (Erro!)</strong>";
      msg.textContent = "STE-100: Zona proibida (0,8 V a 2,0 V). Nunca opere um circuito digital nesta faixa!";
    }
  },

  setSignalType(type) {
    ["analog", "sampled", "quant", "digital"].forEach(t => {
      const btn = document.getElementById("btn-sig-" + t);
      if (btn) btn.className = t === type ? "btn btn-sm btn-primary" : "btn btn-sm btn-secondary";
    });
    const box = document.getElementById("sig-wave-box");
    if (!box) return;

    const configs = {
      analog: {
        title: "Sinal Analógico (Contínuo no Tempo e na Amplitude)",
        desc: "Tanto o tempo t quanto o valor f(t) assumem infinitos valores contínuos (ex: temperatura real ou voz no ar).",
        vector: "Não é um vetor discreto: é uma curva contínua suave.",
        svg: `<path d="M 30 90 Q 90 10, 150 60 T 270 50 T 390 80 T 510 30" fill="none" stroke="#38bdf8" stroke-width="4"/>`
      },
      sampled: {
        title: "Sinal Amostrado (Tempo Discreto / Amplitude Contínua)",
        desc: "Medimos o sinal apenas em instantes fixos (t = 0, 1, 2, 3...), mas cada ponto ainda tem valor real exato com vírgula (ex: 3,417 V).",
        vector: "Vetor com índice INTEIRO e elementos REAIS: v = [1.24, 3.87, 2.91, 1.45, 3.12, 2.04, 4.18]",
        svg: `
          <path d="M 30 90 Q 90 10, 150 60 T 270 50 T 390 80 T 510 30" fill="none" stroke="#475569" stroke-dasharray="4"/>
          ${[30,110,190,270,350,430,510].map((x,i) => {
            const ys = [90,32,68,50,82,62,30];
            return `<line x1="${x}" y1="115" x2="${x}" y2="${ys[i]}" stroke="#f59e0b" stroke-width="2"/><circle cx="${x}" cy="${ys[i]}" r="6" fill="#f59e0b"/>`;
          }).join("")}
        `
      },
      quant: {
        title: "Sinal Quantizado (Tempo Contínuo / Amplitude em Degraus)",
        desc: "O tempo corre livremente, mas os valores de tensão são arredondados para degraus fixos.",
        vector: "Amplitude discreta (arredondada para níveis inteiros), mas tempo contínuo.",
        svg: `<path d="M 30 90 L 70 90 L 70 30 L 140 30 L 140 60 L 230 60 L 230 50 L 320 50 L 320 90 L 420 90 L 420 30 L 510 30" fill="none" stroke="#a855f7" stroke-width="4"/>`
      },
      digital: {
        title: "Sinal Digital = Amostragem + Quantização (Tudo Discreto!)",
        desc: "O tempo é dividido em passos inteiros E a amplitude é arredondada para números inteiros (que viram códigos binários 00, 01, 10, 11).",
        vector: "Vetor com índice INTEIRO e elementos INTEIROS: v = [1, 4, 2, 3, 1, 2, 4] -> Binário: 001, 100, 010...",
        svg: `
          ${[30,110,190,270,350,430,510].map((x,i) => {
            const ys = [90,30,60,60,90,60,30];
            const bins = ["01","11","10","10","01","10","11"];
            return `<line x1="${x}" y1="115" x2="${x}" y2="${ys[i]}" stroke="#22c55e" stroke-width="3"/>
                    <circle cx="${x}" cy="${ys[i]}" r="7" fill="#22c55e"/>
                    <text x="${x-10}" y="${ys[i]-12}" fill="#22c55e" font-size="11" font-family="monospace" font-weight="bold">${bins[i]}</text>`;
          }).join("")}
        `
      }
    };

    const c = configs[type];
    box.innerHTML = `
      <div style="font-weight:700; font-size:1.05rem; color:var(--accent-primary); margin-bottom:4px;">${c.title}</div>
      <p style="font-size:0.9rem; color:var(--text-secondary); margin-bottom:10px;">${c.desc}</p>
      <svg viewBox="0 0 550 130" style="width:100%; max-height:150px; background:#090d16; border-radius:8px; border:1px solid var(--border-color);">
        <line x1="20" y1="115" x2="535" y2="115" stroke="#64748b" stroke-width="1.5"/>
        <line x1="20" y1="10" x2="20" y2="115" stroke="#64748b" stroke-width="1.5"/>
        ${c.svg}
      </svg>
      <div style="margin-top:10px; font-family:var(--font-mono); font-size:0.85rem; color:var(--ste-badge); background:var(--ste-bg); padding:8px 12px; border-radius:6px;">
        ${c.vector}
      </div>
    `;
  },

  // ===========================================================================
  // LAB 2: CONVERSOR UNIVERSAL, FRAÇÕES, BCD (+6), GRAY E PARIDADE (MÓD. I)
  // ===========================================================================
  renderLabConverter(container) {
    container.innerHTML = `
      <div class="card">
        <div class="card-header">
          <div>
            <span class="badge badge-mod1">Laboratório Prático 2 • Módulo I (Págs. 20–54)</span>
            <h2 class="card-title" style="margin-top:6px;">Conversor Passo a Passo: Binário, Frações, Hexa, BCD, Gray e Paridade</h2>
          </div>
        </div>

        <div class="ste-box">
          <div class="ste-box-header"><span>Instrução ASD-STE100</span></div>
          <ul class="ste-sentence-list">
            <li>Clique nos bits abaixo para ligar (1) ou desligar (0), ou digite um número decimal (inteiro ou com vírgula, como <strong>46.6875</strong>).</li>
            <li>Compare lado a lado a <strong>Conversão Binária Pura</strong> e a <strong>Codificação BCD</strong> para nunca confundir na prova!</li>
          </ul>
        </div>

        <div style="margin-bottom:16px;">
          <div style="font-weight:700; font-size:0.88rem; color:var(--text-secondary); margin-bottom:6px;">
            Clique nos Bits de 8 bits (1 Byte = 2 Nibbles) para somar os pesos posicionais:
          </div>
          <div class="bit-row" id="conv-bit-row"></div>
        </div>

        <div class="grid-2" style="align-items:end; margin-bottom:18px;">
          <div>
            <label style="font-weight:700; font-size:0.86rem; display:block; margin-bottom:6px;">
              Ou digite qualquer número Decimal (aceita fração, ex: 46.6875 ou 13):
            </label>
            <div style="display:flex; gap:8px;">
              <input type="number" id="conv-dec-input" class="input-field" value="27" step="any" style="width:100%;">
              <button class="btn btn-primary" onclick="window.SLD_LABS.convertFromInput()">Calcular Tudo</button>
            </div>
          </div>
          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            <button class="btn btn-sm btn-secondary" onclick="window.SLD_LABS.setDecValue(13)">Exemplo Slide: 13</button>
            <button class="btn btn-sm btn-secondary" onclick="window.SLD_LABS.setDecValue(27)">Exemplo Slide: 27</button>
            <button class="btn btn-sm btn-secondary" onclick="window.SLD_LABS.setDecValue(46.6875)">Exemplo Slide: 46,6875</button>
            <button class="btn btn-sm btn-secondary" onclick="window.SLD_LABS.setDecValue(181)">Exemplo Slide: 181</button>
          </div>
        </div>

        <div id="conv-results-grid" class="grid-3"></div>
        <div id="conv-steps-output" style="margin-top:16px;"></div>
      </div>

      <div class="card">
        <h3 class="card-title" style="margin-bottom:8px;">Simulador de Aritmética BCD: Por que somar 6 (0110₂)? (Págs. 48–49)</h3>
        <p style="font-size:0.9rem; color:var(--text-secondary); margin-bottom:14px;">
          Escolha dois dígitos decimais (0 a 9) para somar em BCD e veja a correção automática quando a soma passa de 9:
        </p>
        <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap; margin-bottom:14px;">
          <label>Dígito A (0-9): <input type="number" id="bcd-a" class="input-field" value="8" min="0" max="9" style="width:70px;"></label>
          <span style="font-size:1.3rem; font-weight:800;">+</span>
          <label>Dígito B (0-9): <input type="number" id="bcd-b" class="input-field" value="5" min="0" max="9" style="width:70px;"></label>
          <button class="btn btn-primary" onclick="window.SLD_LABS.calcBcdSum()">Somar em BCD</button>
        </div>
        <div id="bcd-sum-result"></div>
      </div>
    `;

    this.convBits = [0, 0, 0, 1, 1, 0, 1, 1]; // 27
    this.renderConvBits();
    this.updateConverterFromFloat(27);
    this.calcBcdSum();
  },

  renderConvBits() {
    const row = document.getElementById("conv-bit-row");
    if (!row) return;
    const weights = [128, 64, 32, 16, 8, 4, 2, 1];
    row.innerHTML = this.convBits.map((b, idx) => `
      <div class="bit-box ${b ? 'on' : ''}" onclick="window.SLD_LABS.toggleConvBit(${idx})">
        <span class="bit-weight">2<sup>${7 - idx}</sup> = ${weights[idx]}</span>
        <span class="bit-val">${b}</span>
        <span class="bit-weight">${idx === 0 ? 'MSB' : idx === 7 ? 'LSB' : 'bit ' + (7 - idx)}</span>
      </div>
    `).join("");
  },

  toggleConvBit(idx) {
    this.convBits[idx] = this.convBits[idx] ? 0 : 1;
    const weights = [128, 64, 32, 16, 8, 4, 2, 1];
    const val = this.convBits.reduce((acc, b, i) => acc + b * weights[i], 0);
    const inp = document.getElementById("conv-dec-input");
    if (inp) inp.value = val;
    this.renderConvBits();
    this.updateConverterFromFloat(val);
  },

  setDecValue(val) {
    const inp = document.getElementById("conv-dec-input");
    if (inp) inp.value = val;
    this.convertFromInput();
  },

  convertFromInput() {
    const inp = document.getElementById("conv-dec-input");
    if (!inp) return;
    let val = parseFloat(inp.value);
    if (isNaN(val) || val < 0) val = 0;
    const intPart = Math.floor(val);
    if (intPart <= 255) {
      const bin8 = intPart.toString(2).padStart(8, "0");
      this.convBits = bin8.split("").map(Number);
      this.renderConvBits();
    }
    this.updateConverterFromFloat(val);
  },

  updateConverterFromFloat(val) {
    const intPart = Math.floor(val);
    let fracPart = val - intPart;
    const binInt = intPart.toString(2);

    // Divisões sucessivas
    let divSteps = [];
    let temp = intPart;
    if (temp === 0) {
      divSteps.push("0 / 2 = 0 (Resto = 0)");
    } else {
      let stepCount = 1;
      while (temp > 0) {
        const q = Math.floor(temp / 2);
        const r = temp % 2;
        divSteps.push(`Passo ${stepCount}: ${temp} / 2 = ${q}  →  <strong>Resto = ${r}</strong> ${stepCount === 1 ? '(LSB)' : q === 0 ? '(MSB)' : ''}`);
        temp = q;
        stepCount++;
      }
    }

    // Parte fracionária
    let fracBin = "";
    let fracSteps = [];
    if (fracPart > 0.000001) {
      let f = fracPart;
      for (let i = 1; i <= 6 && f > 0.000001; i++) {
        const prod = f * 2;
        const bit = Math.floor(prod + 1e-9);
        fracBin += bit;
        fracSteps.push(`Passo ${i}: ${f.toFixed(4)} × 2 = ${prod.toFixed(4)}  →  <strong>Inteiro = ${bit}</strong>`);
        f = prod - bit;
      }
    }

    const fullBin = fracBin ? `${binInt},${fracBin}` : binInt;
    const hexVal = intPart.toString(16).toUpperCase();

    // BCD (codificação dígito a dígito da parte inteira)
    const bcdVal = String(intPart).split("").map(d => parseInt(d, 10).toString(2).padStart(4, "0")).join(" ");

    // Gray code da parte inteira
    let grayVal = binInt[0];
    for (let i = 1; i < binInt.length; i++) {
      grayVal += (binInt[i - 1] !== binInt[i]) ? "1" : "0";
    }

    // Paridade
    const onesCount = binInt.split("").filter(x => x === "1").length;
    const parBitEven = (onesCount % 2 === 0) ? "0" : "1";
    const parBitOdd = (onesCount % 2 === 0) ? "1" : "0";

    const grid = document.getElementById("conv-results-grid");
    if (grid) {
      grid.innerHTML = `
        <div style="background:var(--bg-elevated); padding:14px; border-radius:var(--radius-sm); border-left:4px solid var(--accent-primary);">
          <div style="font-size:0.75rem; color:var(--text-muted); font-weight:700;">CONVERSÃO BINÁRIO PURO</div>
          <div style="font-family:var(--font-mono); font-size:1.3rem; font-weight:800; color:var(--accent-primary); margin:4px 0;">${fullBin}₂</div>
          <div style="font-size:0.8rem; color:var(--text-secondary);">Soma direta de potências de 2</div>
        </div>
        <div style="background:var(--bg-elevated); padding:14px; border-radius:var(--radius-sm); border-left:4px solid var(--warning);">
          <div style="font-size:0.75rem; color:var(--text-muted); font-weight:700;">CODIFICAÇÃO BCD (Págs. 32/44)</div>
          <div style="font-family:var(--font-mono); font-size:1.3rem; font-weight:800; color:var(--warning); margin:4px 0;">${bcdVal} <span style="font-size:0.8rem;">BCD</span></div>
          <div style="font-size:0.8rem; color:var(--text-secondary);">Cada dígito de ${intPart} vira 4 bits!</div>
        </div>
        <div style="background:var(--bg-elevated); padding:14px; border-radius:var(--radius-sm); border-left:4px solid var(--accent-secondary);">
          <div style="font-size:0.75rem; color:var(--text-muted); font-weight:700;">HEXADECIMAL & CÓDIGO GRAY</div>
          <div style="font-family:var(--font-mono); font-size:1.15rem; font-weight:800; margin:4px 0;">Hex: <span style="color:var(--accent-secondary);">${hexVal}₁₆</span> | Gray: <span style="color:var(--success);">${grayVal}</span></div>
          <div style="font-size:0.8rem; color:var(--text-secondary);">Bits '1' em ${binInt}: <strong>${onesCount}</strong> (Paridade PAR anexa <strong>${parBitEven}</strong> | ÍMPAR anexa <strong>${parBitOdd}</strong>)</div>
        </div>
      `;
    }

    const stepsBox = document.getElementById("conv-steps-output");
    if (stepsBox) {
      stepsBox.innerHTML = `
        <div class="grid-2">
          <div class="ste-steps">
            <div style="font-weight:700; color:var(--accent-primary); margin-bottom:8px;">Divisões Sucessivas da Parte Inteira (${intPart}₁₀ → ${binInt}₂)</div>
            ${divSteps.map(s => `<div style="font-family:var(--font-mono); font-size:0.85rem; padding:3px 0;">${s}</div>`).join("")}
            <div style="margin-top:8px; font-size:0.82rem; color:var(--ste-badge);">↑ Leia os restos de baixo para cima (do último ao primeiro): <strong>${binInt}₂</strong></div>
          </div>
          <div class="ste-steps">
            <div style="font-weight:700; color:var(--accent-primary); margin-bottom:8px;">
              ${fracSteps.length ? `Multiplicações da Parte Fracionária (${fracPart.toFixed(4)}₁₀ → 0,${fracBin}₂)` : `Como converter ${binInt}₂ para Código Gray (${grayVal})`}
            </div>
            ${fracSteps.length
              ? fracSteps.map(s => `<div style="font-family:var(--font-mono); font-size:0.85rem; padding:3px 0;">${s}</div>`).join("") +
                `<div style="margin-top:8px; font-size:0.82rem; color:var(--ste-badge);">↓ Leia os inteiros de cima para baixo: <strong>0,${fracBin}₂</strong></div>`
              : `<div style="font-size:0.86rem; color:var(--text-secondary);">
                  1. Copie o 1º bit da esquerda (MSB): <strong>${binInt[0]}</strong><br>
                  2. Compare vizinhos (Iguais = 0, Diferentes = 1):<br>
                  <span style="font-family:var(--font-mono); color:var(--success);">Binário ${binInt}  →  Gray ${grayVal}</span>
                </div>`
            }
          </div>
        </div>
      `;
    }
  },

  calcBcdSum() {
    const a = Math.min(9, Math.max(0, parseInt(document.getElementById("bcd-a")?.value || 0, 10)));
    const b = Math.min(9, Math.max(0, parseInt(document.getElementById("bcd-b")?.value || 0, 10)));
    const sum = a + b;
    const binA = a.toString(2).padStart(4, "0");
    const binB = b.toString(2).padStart(4, "0");
    const rawBin = sum.toString(2).padStart(5, "0");
    const needsCorrection = sum > 9;
    const corrected = sum + 6;
    const highNibble = Math.floor(sum / 10).toString(2).padStart(4, "0");
    const lowNibble = (sum % 10).toString(2).padStart(4, "0");

    const box = document.getElementById("bcd-sum-result");
    if (!box) return;
    box.innerHTML = `
      <div style="background:var(--bg-elevated); padding:16px; border-radius:var(--radius-md); border:1px solid var(--border-color); font-family:var(--font-mono);">
        <div>  ${a}  →  ${binA}</div>
        <div>+ ${b}  → +${binB}</div>
        <div style="border-top:1px solid var(--border-color); margin:6px 0; padding-top:6px;">
          Soma Binária Inicial = <strong>${sum.toString(2).padStart(4, "0")}</strong> (${sum} em decimal)
        </div>
        ${needsCorrection
          ? `<div style="color:var(--warning); margin-top:6px;">
              ⚠ Como ${sum} > 9, o código ${sum.toString(2).padStart(4, "0")} é INVÁLIDO em BCD! Regra STE-100: <strong>Some 6 (0110₂)</strong>!
            </div>
            <div style="color:var(--success); margin-top:6px; font-weight:700;">
              ${sum.toString(2).padStart(4, "0")} + 0110 = ${corrected.toString(2).padStart(5, "0")}  →  Separando em 4 bits: <span style="background:var(--success-bg); padding:2px 8px; border-radius:4px;">${highNibble} | ${lowNibble}</span> (${Math.floor(sum/10)} e ${sum%10} = ${sum} em BCD!)
            </div>`
          : `<div style="color:var(--success); margin-top:6px; font-weight:700;">
              ✓ Como ${sum} ≤ 9, NÃO precisa somar 6! Resultado BCD direto: <strong>${lowNibble}</strong> (${sum}).
            </div>`
        }
      </div>
    `;
  },

  // ===========================================================================
  // LAB 3: BANCADA DE PORTAS LÓGICAS, DEMORGAN E FORMAS DE ONDA (MÓD. I)
  // ===========================================================================
  renderLabGates(container) {
    this.gateState = { a: 1, b: 0, gate: "AND" };
    container.innerHTML = `
      <div class="card">
        <div class="card-header">
          <div>
            <span class="badge badge-mod1">Laboratório Prático 3 • Módulo I (Págs. 55–95)</span>
            <h2 class="card-title" style="margin-top:6px;">Bancada Interativa de Portas Lógicas, Tabelas-Verdade e Teoremas de DeMorgan</h2>
          </div>
        </div>

        <div class="ste-box">
          <div class="ste-box-header"><span>Instrução ASD-STE100</span></div>
          <ul class="ste-sentence-list">
            <li>Escolha uma porta lógica abaixo e clique nas chaves de entrada <strong>A</strong> e <strong>B</strong> para alternar entre 0 e 1.</li>
            <li>Observe o símbolo oficial da porta, a linha ativa na Tabela-Verdade e a equivalência de DeMorgan!</li>
          </ul>
        </div>

        <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:18px;">
          ${["AND", "OR", "NOT", "NAND", "NOR", "XOR", "XNOR"].map(g => `
            <button class="btn btn-sm ${g === 'AND' ? 'btn-primary' : 'btn-secondary'}" id="btn-gate-${g}" onclick="window.SLD_LABS.selectGate('${g}')">Porta ${g}</button>
          `).join("")}
        </div>

        <div class="grid-2" style="align-items:center;">
          <div style="background:var(--bg-elevated); padding:20px; border-radius:var(--radius-md); border:1px solid var(--border-color); text-align:center;">
            <div style="display:flex; justify-content:center; gap:20px; margin-bottom:16px;">
              <button class="btn btn-primary" id="gate-in-a" onclick="window.SLD_LABS.toggleGateInput('a')">Entrada A = 1</button>
              <button class="btn btn-secondary" id="gate-in-b" onclick="window.SLD_LABS.toggleGateInput('b')">Entrada B = 0</button>
            </div>
            <div id="gate-svg-box"></div>
            <div id="gate-expr-box" style="margin-top:12px; font-family:var(--font-mono); font-size:1.1rem; font-weight:700;"></div>
          </div>

          <div id="gate-tt-box"></div>
        </div>
      </div>

      <div class="card">
        <h3 class="card-title" style="margin-bottom:8px;">Resolução Interativa dos Circuitos das Págs. 87, 88 e 95 (Módulo I)</h3>
        <p style="font-size:0.9rem; color:var(--text-secondary); margin-bottom:12px;">
          Nos slides 87, 88 e 95 do Módulo I, o professor deixou dois circuitos clássicos para você avaliar a saída <strong>x</strong>. Clique nas entradas A, B, C abaixo para ver os sinais intermediários em tempo real:
        </p>
        <div style="display:flex; gap:10px; margin-bottom:16px; flex-wrap:wrap;">
          <button class="btn btn-sm btn-primary" id="c88-a" onclick="window.SLD_LABS.toggleC88('a')">A = 0</button>
          <button class="btn btn-sm btn-primary" id="c88-b" onclick="window.SLD_LABS.toggleC88('b')">B = 1</button>
          <button class="btn btn-sm btn-primary" id="c88-c" onclick="window.SLD_LABS.toggleC88('c')">C = 0</button>
        </div>
        <div id="c88-results" class="grid-2"></div>
      </div>
    `;
    this.c88 = { a: 0, b: 1, c: 0 };
    this.updateGateUI();
    this.updateC88UI();
  },

  selectGate(g) {
    this.gateState.gate = g;
    ["AND", "OR", "NOT", "NAND", "NOR", "XOR", "XNOR"].forEach(name => {
      const btn = document.getElementById("btn-gate-" + name);
      if (btn) btn.className = name === g ? "btn btn-sm btn-primary" : "btn btn-sm btn-secondary";
    });
    this.updateGateUI();
  },

  toggleGateInput(inp) {
    this.gateState[inp] = this.gateState[inp] ? 0 : 1;
    this.updateGateUI();
  },

  evalGate(g, a, b) {
    switch (g) {
      case "AND": return a & b;
      case "OR": return a | b;
      case "NOT": return a ? 0 : 1;
      case "NAND": return (a & b) ? 0 : 1;
      case "NOR": return (a | b) ? 0 : 1;
      case "XOR": return a ^ b;
      case "XNOR": return (a ^ b) ? 0 : 1;
      default: return 0;
    }
  },

  updateGateUI() {
    const { a, b, gate } = this.gateState;
    const out = this.evalGate(gate, a, b);

    const btnA = document.getElementById("gate-in-a");
    const btnB = document.getElementById("gate-in-b");
    if (btnA) {
      btnA.textContent = `Entrada A = ${a}`;
      btnA.className = a ? "btn btn-success" : "btn btn-secondary";
    }
    if (btnB) {
      btnB.style.display = gate === "NOT" ? "none" : "inline-flex";
      btnB.textContent = `Entrada B = ${b}`;
      btnB.className = b ? "btn btn-success" : "btn btn-secondary";
    }

    const colA = a ? "#22c55e" : "#64748b";
    const colB = b ? "#22c55e" : "#64748b";
    const colOut = out ? "#22c55e" : "#64748b";

    const info = {
      AND: { expr: "x = A · B", rule: "Saída é 1 SOMENTE quando A=1 E B=1.", demorgan: "Equivalente a: ((A · B)')' = (A' + B')'" },
      OR: { expr: "x = A + B", rule: "Saída é 1 quando A=1 OU B=1 (pelo menos uma em 1).", demorgan: "Equivalente a: ((A + B)')' = (A' · B')'" },
      NOT: { expr: "x = A'", rule: "Inverte a entrada A (0 vira 1; 1 vira 0).", demorgan: "Com porta NAND: ligue A nas duas entradas da NAND." },
      NAND: { expr: "x = (A · B)' = A' + B'", rule: "Inverso da AND: só dá 0 quando A=1 e B=1.", demorgan: "Teorema de DeMorgan: (A · B)' = A' + B' (Porta Invert-OR)" },
      NOR: { expr: "x = (A + B)' = A' · B'", rule: "Inverso da OR: só dá 1 quando A=0 e B=0.", demorgan: "Teorema de DeMorgan: (A + B)' = A' · B' (Porta Invert-AND)" },
      XOR: { expr: "x = A ⊕ B = A'B + AB'", rule: "OU-Exclusivo: Saída é 1 quando A e B são DIFERENTES.", demorgan: "Usada em Somadores e Geradores de Paridade." },
      XNOR: { expr: "x = (A ⊕ B)' = AB + A'B'", rule: "Coincidência: Saída é 1 quando A e B são IGUAIS.", demorgan: "Usada em Comparadores de Igualdade (Pág. 91 Mód. II)." }
    }[gate];

    const svgBox = document.getElementById("gate-svg-box");
    if (svgBox) {
      svgBox.innerHTML = `
        <svg viewBox="0 0 320 120" style="width:100%; max-width:340px; height:120px; background:#090d16; border-radius:8px; border:1px solid var(--border-color);">
          ${gate === "NOT"
            ? `<line x1="30" y1="60" x2="115" y2="60" stroke="${colA}" stroke-width="4"/>
               <polygon points="115,30 115,90 175,60" fill="#1e293b" stroke="#38bdf8" stroke-width="3"/>
               <circle cx="183" cy="60" r="7" fill="#090d16" stroke="#38bdf8" stroke-width="3"/>
               <line x1="190" y1="60" x2="280" y2="60" stroke="${colOut}" stroke-width="4"/>`
            : `<line x1="30" y1="42" x2="115" y2="42" stroke="${colA}" stroke-width="4"/>
               <line x1="30" y1="78" x2="115" y2="78" stroke="${colB}" stroke-width="4"/>
               <rect x="115" y="25" width="75" height="70" rx="${gate.includes('AND') ? '30' : '10'}" fill="#1e293b" stroke="#38bdf8" stroke-width="3"/>
               <text x="152" y="65" text-anchor="middle" fill="#f8fafc" font-family="monospace" font-weight="bold" font-size="15">${gate}</text>
               ${(gate === "NAND" || gate === "NOR" || gate === "XNOR") ? `<circle cx="198" cy="60" r="7" fill="#090d16" stroke="#38bdf8" stroke-width="3"/>` : ''}
               <line x1="${(gate === "NAND" || gate === "NOR" || gate === "XNOR") ? '205' : '190'}" y1="60" x2="285" y2="60" stroke="${colOut}" stroke-width="4"/>`
          }
          <text x="20" y="${gate === 'NOT' ? '55' : '38'}" fill="${colA}" font-family="monospace" font-weight="bold">A=${a}</text>
          ${gate !== "NOT" ? `<text x="20" y="95" fill="${colB}" font-family="monospace" font-weight="bold">B=${b}</text>` : ''}
          <text x="250" y="48" fill="${colOut}" font-family="monospace" font-weight="bold" font-size="16">x=${out}</text>
        </svg>
      `;
    }

    const exprBox = document.getElementById("gate-expr-box");
    if (exprBox) {
      exprBox.innerHTML = `
        <div style="color:var(--accent-primary);">${info.expr}  →  Saída atual: <span style="color:${colOut};">x = ${out}</span></div>
        <div style="font-size:0.84rem; color:var(--text-secondary); font-family:var(--font-sans); margin-top:4px;">${info.rule}</div>
        <div style="font-size:0.8rem; color:var(--ste-badge); font-family:var(--font-sans); margin-top:4px;">${info.demorgan}</div>
      `;
    }

    const ttBox = document.getElementById("gate-tt-box");
    if (ttBox) {
      const pairs = gate === "NOT" ? [[0, 0], [1, 0]] : [[0, 0], [0, 1], [1, 0], [1, 1]];
      ttBox.innerHTML = `
        <div style="font-weight:700; margin-bottom:6px;">Tabela-Verdade (Linha ativa destacada em verde):</div>
        <table class="ste-table">
          <thead>
            <tr>
              <th>A</th>
              ${gate !== "NOT" ? "<th>B</th>" : ""}
              <th>Saída (${info.expr})</th>
            </tr>
          </thead>
          <tbody>
            ${pairs.map(([pa, pb]) => {
              const r = this.evalGate(gate, pa, pb);
              const isAct = gate === "NOT" ? (pa === a) : (pa === a && pb === b);
              return `
                <tr class="${isAct ? 'active-row' : ''}">
                  <td>${pa}</td>
                  ${gate !== "NOT" ? `<td>${pb}</td>` : ""}
                  <td>${r}</td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      `;
    }
  },

  toggleC88(k) {
    this.c88[k] = this.c88[k] ? 0 : 1;
    this.updateC88UI();
  },

  updateC88UI() {
    const { a, b, c } = this.c88;
    ["a", "b", "c"].forEach(k => {
      const btn = document.getElementById("c88-" + k);
      if (btn) {
        btn.textContent = `${k.toUpperCase()} = ${this.c88[k]}`;
        btn.className = this.c88[k] ? "btn btn-sm btn-success" : "btn btn-sm btn-secondary";
      }
    });

    // Circuito 1 (Pág. 87): x = (A + B)(B' + C)
    const c1_or1 = a | b;
    const c1_notB = b ? 0 : 1;
    const c1_or2 = c1_notB | c;
    const c1_x = c1_or1 & c1_or2;

    // Circuito 2 (Pág. 88): u = A', v = A'B, w = BC, x = A'B + BC
    const u = a ? 0 : 1;
    const v = u & b;
    const w = b & c;
    const c2_x = v | w;

    const box = document.getElementById("c88-results");
    if (!box) return;
    box.innerHTML = `
      <div class="ste-steps">
        <div style="font-weight:700; color:var(--accent-primary); margin-bottom:6px;">Circuito da Pág. 87: x = (A + B) · (B' + C)</div>
        <div style="font-family:var(--font-mono); font-size:0.88rem;">
          1. Porta OR superior: A + B = ${a} + ${b} = <strong>${c1_or1}</strong><br>
          2. Inversor em B: B' = <strong>${c1_notB}</strong><br>
          3. Porta OR inferior: B' + C = ${c1_notB} + ${c} = <strong>${c1_or2}</strong><br>
          4. Porta AND final: x = ${c1_or1} · ${c1_or2} = <strong style="color:var(--success); font-size:1.1rem;">${c1_x}</strong>
        </div>
      </div>
      <div class="ste-steps">
        <div style="font-weight:700; color:var(--accent-secondary); margin-bottom:6px;">Circuito da Pág. 88: x = A'·B + B·C</div>
        <div style="font-family:var(--font-mono); font-size:0.88rem;">
          1. Variável u = A' = <strong>${u}</strong><br>
          2. Variável v = u · B = ${u} · ${b} = <strong>${v}</strong><br>
          3. Variável w = B · C = ${b} · ${c} = <strong>${w}</strong><br>
          4. Porta OR final: x = v + w = ${v} + ${w} = <strong style="color:var(--success); font-size:1.1rem;">${c2_x}</strong>
        </div>
      </div>
    `;
  },

  // ===========================================================================
  // LAB 4: MAPA DE KARNAUGH INTERATIVO + MINTERMOS/MAXTERMOS (MÓD. II)
  // ===========================================================================
  renderLabKmap(container) {
    this.kmapVars = 3;
    // Default: Exercício da Pág. 48 do Módulo II: ∑m(1,2,3,5,7)
    this.kmapCells = [0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0];

    container.innerHTML = `
      <div class="card">
        <div class="card-header">
          <div>
            <span class="badge badge-mod2">Laboratório Prático 4 • Módulo II (Págs. 10–52)</span>
            <h2 class="card-title" style="margin-top:6px;">Construtor e Simplificador de Mapa de Karnaugh + Mintermos (∑m) e Maxtermos (∏M)</h2>
          </div>
        </div>

        <div class="ste-box">
          <div class="ste-box-header"><span>Instrução ASD-STE100</span></div>
          <ul class="ste-sentence-list">
            <li>Clique em qualquer quadrado do Mapa de Karnaugh para alternar entre <strong>0</strong>, <strong>1</strong> e <strong>X (Don't Care)</strong>.</li>
            <li>Repare na ordem das colunas: <strong>00, 01, 11, 10</strong> (Código Gray: m₃ vem antes do m₂!).</li>
            <li>O simulador mostra automaticamente a <strong>Soma de Mintermos (∑m)</strong>, o <strong>Produto de Maxtermos (∏M)</strong> e os <strong>Agrupamentos Ótimos</strong>!</li>
          </ul>
        </div>

        <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:16px; align-items:center;">
          <span style="font-weight:700; font-size:0.88rem;">Tamanho:</span>
          <button class="btn btn-sm btn-secondary" id="kmap-v2" onclick="window.SLD_LABS.setKmapVars(2)">2 Variáveis (x, y)</button>
          <button class="btn btn-sm btn-primary" id="kmap-v3" onclick="window.SLD_LABS.setKmapVars(3)">3 Variáveis (x, y, z)</button>
          <span style="margin-left:10px; font-weight:700; font-size:0.88rem;">Exemplos dos Slides (Mód. II):</span>
          <button class="btn btn-sm btn-secondary" onclick="window.SLD_LABS.loadKmapPreset([2,3,4,5])">Pág. 44: ∑m(2,3,4,5)</button>
          <button class="btn btn-sm btn-secondary" onclick="window.SLD_LABS.loadKmapPreset([3,4,6,7])">Pág. 44: ∑m(3,4,6,7)</button>
          <button class="btn btn-sm btn-secondary" onclick="window.SLD_LABS.loadKmapPreset([2,3,6,7])">Pág. 46: ∑m(2,3,6,7)</button>
          <button class="btn btn-sm btn-secondary" onclick="window.SLD_LABS.loadKmapPreset([1,2,3,5,7])">Desafio Pág. 48: ∑m(1,2,3,5,7)</button>
          <button class="btn btn-sm btn-secondary" onclick="window.SLD_LABS.loadKmapPreset([])">Limpar Tudo</button>
        </div>

        <div class="grid-2" style="align-items:start;">
          <div id="kmap-grid-holder" style="text-align:center;"></div>
          <div id="kmap-analysis-holder"></div>
        </div>
      </div>
    `;
    this.updateKmapUI();
  },

  setKmapVars(n) {
    this.kmapVars = n;
    document.getElementById("kmap-v2").className = n === 2 ? "btn btn-sm btn-primary" : "btn btn-sm btn-secondary";
    document.getElementById("kmap-v3").className = n === 3 ? "btn btn-sm btn-primary" : "btn btn-sm btn-secondary";
    this.updateKmapUI();
  },

  loadKmapPreset(list) {
    this.setKmapVars(3);
    this.kmapCells = Array(16).fill(0);
    list.forEach(idx => { this.kmapCells[idx] = 1; });
    this.updateKmapUI();
  },

  cycleKmapCell(idx) {
    const cur = this.kmapCells[idx];
    this.kmapCells[idx] = cur === 0 ? 1 : cur === 1 ? "X" : 0;
    this.updateKmapUI();
  },

  solveKmap3(cells) {
    const ones = [];
    const allowed = [];
    for (let i = 0; i < 8; i++) {
      if (cells[i] === 1) ones.push(i);
      if (cells[i] === 1 || cells[i] === "X") allowed.push(i);
    }
    if (ones.length === 0) return { expr: "0", groups: [] };
    if (allowed.length === 8) return { expr: "1", groups: [{ indices: [0,1,2,3,4,5,6,7], term: "1", desc: "Octeto completo (todas as 8 células)" }] };

    // Todos os grupos possíveis em um Mapa K de 3 variáveis (x, y, z)
    const candidateGroups = [
      // Quartetos
      { indices: [0,1,2,3], term: "x'", desc: "Quarteto linha x=0 (y e z mudam -> cortados)" },
      { indices: [4,5,6,7], term: "x", desc: "Quarteto linha x=1 (y e z mudam -> cortados)" },
      { indices: [0,1,4,5], term: "y'", desc: "Quarteto colunas y=0 (x e z mudam -> cortados)" },
      { indices: [1,3,5,7], term: "z", desc: "Quarteto central z=1 (x e y mudam -> cortados)" },
      { indices: [2,3,6,7], term: "y", desc: "Quarteto colunas y=1 (x e z mudam -> cortados)" },
      { indices: [0,2,4,6], term: "z'", desc: "Quarteto das bordas z=0 (x e y mudam -> cortados)" },
      // Pares horizontais e verticais
      { indices: [0,1], term: "x'·y'", desc: "Par m₀,m₁ (z muda -> cortado)" },
      { indices: [1,3], term: "x'·z", desc: "Par m₁,m₃ (y muda -> cortado)" },
      { indices: [2,3], term: "x'·y", desc: "Par m₂,m₃ (z muda -> cortado)" },
      { indices: [0,2], term: "x'·z'", desc: "Par das bordas m₀,m₂ (y muda -> cortado)" },
      { indices: [4,5], term: "x·y'", desc: "Par m₄,m₅ (z muda -> cortado)" },
      { indices: [5,7], term: "x·z", desc: "Par m₅,m₇ (y muda -> cortado)" },
      { indices: [6,7], term: "x·y", desc: "Par m₆,m₇ (z muda -> cortado)" },
      { indices: [4,6], term: "x·z'", desc: "Par das bordas m₄,m₆ (y muda -> cortado)" },
      { indices: [0,4], term: "y'·z'", desc: "Par vertical m₀,m₄ (x muda -> cortado)" },
      { indices: [1,5], term: "y'·z", desc: "Par vertical m₁,m₅ (x muda -> cortado)" },
      { indices: [3,7], term: "y·z", desc: "Par vertical m₃,m₇ (x muda -> cortado)" },
      { indices: [2,6], term: "y·z'", desc: "Par vertical m₂,m₆ (x muda -> cortado)" },
      // Isolados
      { indices: [0], term: "x'·y'·z'", desc: "Mintermo isolado m₀" },
      { indices: [1], term: "x'·y'·z", desc: "Mintermo isolado m₁" },
      { indices: [2], term: "x'·y·z'", desc: "Mintermo isolado m₂" },
      { indices: [3], term: "x'·y·z", desc: "Mintermo isolado m₃" },
      { indices: [4], term: "x·y'·z'", desc: "Mintermo isolado m₄" },
      { indices: [5], term: "x·y'·z", desc: "Mintermo isolado m₅" },
      { indices: [6], term: "x·y·z'", desc: "Mintermo isolado m₆" },
      { indices: [7], term: "x·y·z", desc: "Mintermo isolado m₇" }
    ];

    const validGroups = candidateGroups.filter(g => g.indices.every(idx => allowed.includes(idx)));
    // Filtra apenas implicantes primos (que não estão contidos em outro grupo válido maior)
    const primeImplicants = validGroups.filter(g => !validGroups.some(other =>
      other !== g && other.indices.length > g.indices.length && g.indices.every(i => other.indices.includes(i))
    ));

    const uncovered = new Set(ones);
    const chosen = [];

    // 1. Implicantes primos essenciais
    ones.forEach(oneIdx => {
      const covering = primeImplicants.filter(p => p.indices.includes(oneIdx));
      if (covering.length === 1 && !chosen.includes(covering[0])) {
        chosen.push(covering[0]);
        covering[0].indices.forEach(i => uncovered.delete(i));
      }
    });

    // 2. Guloso para cobrir o restante
    while (uncovered.size > 0) {
      let best = null;
      let bestCount = -1;
      primeImplicants.forEach(p => {
        if (!chosen.includes(p)) {
          const count = p.indices.filter(i => uncovered.has(i)).length;
          if (count > bestCount) {
            bestCount = count;
            best = p;
          }
        }
      });
      if (!best || bestCount <= 0) break;
      chosen.push(best);
      best.indices.forEach(i => uncovered.delete(i));
    }

    return {
      expr: chosen.map(c => c.term).join(" + "),
      groups: chosen
    };
  },

  solveKmap2(cells) {
    const ones = [];
    const allowed = [];
    for (let i = 0; i < 4; i++) {
      if (cells[i] === 1) ones.push(i);
      if (cells[i] === 1 || cells[i] === "X") allowed.push(i);
    }
    if (ones.length === 0) return { expr: "0", groups: [] };
    if (allowed.length === 4) return { expr: "1", groups: [{ indices: [0,1,2,3], term: "1", desc: "Quarteto completo" }] };

    const candidates = [
      { indices: [0,1], term: "x'", desc: "Par linha x=0 (y muda -> cortado)" },
      { indices: [2,3], term: "x", desc: "Par linha x=1 (y muda -> cortado)" },
      { indices: [0,2], term: "y'", desc: "Par coluna y=0 (x muda -> cortado)" },
      { indices: [1,3], term: "y", desc: "Par coluna y=1 (x muda -> cortado)" },
      { indices: [0], term: "x'·y'", desc: "Isolado m₀" },
      { indices: [1], term: "x'·y", desc: "Isolado m₁" },
      { indices: [2], term: "x·y'", desc: "Isolado m₂" },
      { indices: [3], term: "x·y", desc: "Isolado m₃" }
    ];
    const valid = candidates.filter(g => g.indices.every(i => allowed.includes(i)));
    const primes = valid.filter(g => !valid.some(o => o !== g && o.indices.length > g.indices.length && g.indices.every(i => o.indices.includes(i))));
    const uncovered = new Set(ones);
    const chosen = [];
    primes.forEach(p => {
      if (p.indices.some(i => uncovered.has(i))) {
        chosen.push(p);
        p.indices.forEach(i => uncovered.delete(i));
      }
    });
    return { expr: chosen.map(c => c.term).join(" + "), groups: chosen };
  },

  updateKmapUI() {
    const gridHolder = document.getElementById("kmap-grid-holder");
    const analysisHolder = document.getElementById("kmap-analysis-holder");
    if (!gridHolder || !analysisHolder) return;

    const total = this.kmapVars === 2 ? 4 : 8;
    const onesList = [];
    const zerosList = [];
    const dcList = [];
    for (let i = 0; i < total; i++) {
      if (this.kmapCells[i] === 1) onesList.push(i);
      else if (this.kmapCells[i] === "X") dcList.push(i);
      else zerosList.push(i);
    }

    if (this.kmapVars === 2) {
      const rows = [
        { label: "x = 0 (x')", indices: [0, 1] },
        { label: "x = 1 (x)", indices: [2, 3] }
      ];
      gridHolder.innerHTML = `
        <div class="kmap-wrapper">
          <table class="kmap-table">
            <thead>
              <tr>
                <th>x \\ y</th>
                <th>y=0 (y')</th>
                <th>y=1 (y)</th>
              </tr>
            </thead>
            <tbody>
              ${rows.map(r => `
                <tr>
                  <th>${r.label}</th>
                  ${r.indices.map(idx => {
                    const v = this.kmapCells[idx];
                    const cls = v === 1 ? "val-1" : v === "X" ? "val-x" : "";
                    return `<td class="kmap-cell ${cls}" onclick="window.SLD_LABS.cycleKmapCell(${idx})">
                      ${v}
                      <span class="kmap-index">m${idx}</span>
                    </td>`;
                  }).join("")}
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      `;
    } else {
      // 3 variáveis: ordem das colunas: 00 (0), 01 (1), 11 (3), 10 (2)
      const rows = [
        { label: "x = 0 (x')", indices: [0, 1, 3, 2] },
        { label: "x = 1 (x)", indices: [4, 5, 7, 6] }
      ];
      gridHolder.innerHTML = `
        <div class="kmap-wrapper">
          <table class="kmap-table">
            <thead>
              <tr>
                <th>x \\ yz</th>
                <th>00 (y'z')</th>
                <th>01 (y'z)</th>
                <th>11 (yz)</th>
                <th>10 (yz')</th>
              </tr>
            </thead>
            <tbody>
              ${rows.map(r => `
                <tr>
                  <th>${r.label}</th>
                  ${r.indices.map(idx => {
                    const v = this.kmapCells[idx];
                    const cls = v === 1 ? "val-1" : v === "X" ? "val-x" : "";
                    return `<td class="kmap-cell ${cls}" onclick="window.SLD_LABS.cycleKmapCell(${idx})">
                      ${v}
                      <span class="kmap-index">m${idx}</span>
                    </td>`;
                  }).join("")}
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      `;
    }

    const sol = this.kmapVars === 2 ? this.solveKmap2(this.kmapCells) : this.solveKmap3(this.kmapCells);

    analysisHolder.innerHTML = `
      <div class="ste-steps" style="margin-top:0;">
        <div style="font-size:0.78rem; color:var(--text-muted); font-weight:700; text-transform:uppercase;">Expressão Simplificada Mínima (SOP)</div>
        <div style="font-family:var(--font-mono); font-size:1.55rem; font-weight:900; color:var(--success); margin:6px 0;">
          F = ${sol.expr}
        </div>
        <div style="margin-top:10px; font-size:0.88rem;">
          <div><strong>Soma de Mintermos (onde F=1):</strong> <span style="font-family:var(--font-mono); color:var(--accent-primary);">∑m(${onesList.length ? onesList.join(", ") : "vazio"})${dcList.length ? ` + d(${dcList.join(", ")})` : ""}</span></div>
          <div style="margin-top:4px;"><strong>Produto de Maxtermos (onde F=0):</strong> <span style="font-family:var(--font-mono); color:var(--accent-secondary);">∏M(${zerosList.length ? zerosList.join(", ") : "vazio"})</span></div>
        </div>
      </div>

      <div class="ste-steps">
        <div style="font-weight:700; color:var(--ste-badge); margin-bottom:8px;">Passo a Passo dos Agrupamentos (ASD-STE100):</div>
        ${sol.groups.length === 0
          ? `<div style="font-size:0.88rem; color:var(--text-muted);">Clique nas células do Mapa K para colocar '1's e ver os agrupamentos.</div>`
          : sol.groups.map((g, idx) => `
              <div class="ste-step-item">
                <div class="step-num">${idx + 1}</div>
                <div style="font-size:0.88rem;">
                  <strong>Grupo {m${g.indices.join(", m")}}</strong> → Gera o termo <strong style="font-family:var(--font-mono); color:var(--success);">${g.term}</strong><br>
                  <span style="color:var(--text-muted);">${g.desc}</span>
                </div>
              </div>
            `).join("")
        }
      </div>
    `;
  },

  // ===========================================================================
  // LAB 5: CIRCUITOS COMBINACIONAIS (DISPLAY 7-SEG, MUX, DECODER, FULL ADDER)
  // ===========================================================================
  renderLabComb(container) {
    this.segDigit = 3;
    this.muxState = { s1: 1, s0: 0, i0: 0, i1: 1, i2: 1, i3: 0 };
    this.faState = { a: 1, b: 1, cin: 0 };

    container.innerHTML = `
      <div class="card">
        <div class="card-header">
          <div>
            <span class="badge badge-mod2">Laboratório Prático 5 • Módulo II (Págs. 54–91)</span>
            <h2 class="card-title" style="margin-top:6px;">Simulador de Display 7 Segmentos, Decodificador, MUX 4:1 e Somador Completo</h2>
          </div>
        </div>

        <div class="grid-2">
          <!-- Display 7 Segmentos -->
          <div style="background:var(--bg-elevated); padding:18px; border-radius:var(--radius-md); border:1px solid var(--border-color);">
            <h3 style="font-size:1.05rem; margin-bottom:8px;">1. Decodificador BCD para Display de 7 Segmentos (Pág. 64)</h3>
            <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:12px;">
              Escolha um dígito (0 a 9) para ver a entrada BCD (DCBA) e quais segmentos (a–g) acendem:
            </p>
            <div style="display:flex; gap:6px; flex-wrap:wrap; margin-bottom:16px;">
              ${[0,1,2,3,4,5,6,7,8,9].map(d => `
                <button class="btn btn-sm ${d===3?'btn-primary':'btn-secondary'}" id="btn-seg-${d}" onclick="window.SLD_LABS.setSegDigit(${d})">${d}</button>
              `).join("")}
            </div>
            <div style="display:flex; align-items:center; gap:20px; flex-wrap:wrap;">
              <div class="seven-seg-container">
                <div class="seg seg-a" id="seg-el-a"></div>
                <div class="seg seg-b" id="seg-el-b"></div>
                <div class="seg seg-c" id="seg-el-c"></div>
                <div class="seg seg-d" id="seg-el-d"></div>
                <div class="seg seg-e" id="seg-el-e"></div>
                <div class="seg seg-f" id="seg-el-f"></div>
                <div class="seg seg-g" id="seg-el-g"></div>
              </div>
              <div id="seg-info-box" style="flex:1; font-family:var(--font-mono); font-size:0.88rem;"></div>
            </div>
          </div>

          <!-- MUX 4:1 -->
          <div style="background:var(--bg-elevated); padding:18px; border-radius:var(--radius-md); border:1px solid var(--border-color);">
            <h3 style="font-size:1.05rem; margin-bottom:8px;">2. Multiplexador (MUX) 4 para 1 — Seletor de Dados (Pág. 72)</h3>
            <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:12px;">
              Altere as chaves de <strong>Seleção (S₁, S₀)</strong> para escolher qual entrada (I₀ a I₃) passa para a saída Z:
            </p>
            <div style="display:flex; gap:10px; margin-bottom:12px;">
              <button class="btn btn-sm btn-primary" id="mux-s1" onclick="window.SLD_LABS.toggleMux('s1')">Seletor S₁ = 1</button>
              <button class="btn btn-sm btn-secondary" id="mux-s0" onclick="window.SLD_LABS.toggleMux('s0')">Seletor S₀ = 0</button>
            </div>
            <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:14px;">
              ${[0,1,2,3].map(i => `
                <button class="btn btn-sm btn-secondary" id="mux-i${i}" onclick="window.SLD_LABS.toggleMux('i${i}')">Dado I${i}</button>
              `).join("")}
            </div>
            <div id="mux-result-box"></div>
          </div>
        </div>
      </div>

      <div class="card">
        <h3 class="card-title" style="margin-bottom:8px;">3. Simulador de Somador Completo (Full-Adder - Págs. 88–90)</h3>
        <p style="font-size:0.88rem; color:var(--text-secondary); margin-bottom:14px;">
          Clique nas 3 entradas (<strong>A</strong>, <strong>B</strong> e <strong>Carry-In Cin</strong>) para ver o cálculo das portas XOR e AND do Somador Completo:
        </p>
        <div style="display:flex; gap:12px; flex-wrap:wrap; margin-bottom:14px;">
          <button class="btn btn-success" id="fa-a" onclick="window.SLD_LABS.toggleFA('a')">Bit A = 1</button>
          <button class="btn btn-success" id="fa-b" onclick="window.SLD_LABS.toggleFA('b')">Bit B = 1</button>
          <button class="btn btn-secondary" id="fa-cin" onclick="window.SLD_LABS.toggleFA('cin')">Carry-In (Cin) = 0</button>
        </div>
        <div id="fa-result-box"></div>
      </div>
    `;

    this.setSegDigit(3);
    this.updateMuxUI();
    this.updateFAUI();
  },

  setSegDigit(d) {
    this.segDigit = d;
    for (let i = 0; i <= 9; i++) {
      const btn = document.getElementById("btn-seg-" + i);
      if (btn) btn.className = i === d ? "btn btn-sm btn-primary" : "btn btn-sm btn-secondary";
    }
    const map = {
      0: ["a","b","c","d","e","f"],
      1: ["b","c"],
      2: ["a","b","g","e","d"],
      3: ["a","b","g","c","d"],
      4: ["f","g","b","c"],
      5: ["a","f","g","c","d"],
      6: ["a","f","g","e","c","d"],
      7: ["a","b","c"],
      8: ["a","b","c","d","e","f","g"],
      9: ["a","b","c","d","f","g"]
    }[d];

    ["a","b","c","d","e","f","g"].forEach(s => {
      const el = document.getElementById("seg-el-" + s);
      if (el) el.className = map.includes(s) ? `seg seg-${s} on` : `seg seg-${s}`;
    });

    const bin = d.toString(2).padStart(4, "0");
    const info = document.getElementById("seg-info-box");
    if (info) {
      info.innerHTML = `
        <div>Dígito Decimal: <strong style="color:var(--accent-primary); font-size:1.2rem;">${d}</strong></div>
        <div style="margin-top:6px;">Entrada BCD (D C B A): <strong>${bin.split("").join(" ")}</strong></div>
        <div style="margin-top:6px;">Segmentos Acesos: <strong style="color:var(--success);">${map.join(", ")}</strong></div>
        <div style="margin-top:6px;">Segmentos Apagados: <span style="color:var(--text-muted);">${["a","b","c","d","e","f","g"].filter(x=>!map.includes(x)).join(", ") || "nenhum"}</span></div>
      `;
    }
  },

  toggleMux(k) {
    this.muxState[k] = this.muxState[k] ? 0 : 1;
    this.updateMuxUI();
  },

  updateMuxUI() {
    const { s1, s0, i0, i1, i2, i3 } = this.muxState;
    const selIndex = s1 * 2 + s0;
    const inputs = [i0, i1, i2, i3];
    const z = inputs[selIndex];

    ["s1", "s0"].forEach(k => {
      const b = document.getElementById("mux-" + k);
      if (b) {
        b.textContent = `Seletor ${k.toUpperCase()} = ${this.muxState[k]}`;
        b.className = this.muxState[k] ? "btn btn-sm btn-primary" : "btn btn-sm btn-secondary";
      }
    });

    [0,1,2,3].forEach(idx => {
      const b = document.getElementById("mux-i" + idx);
      if (b) {
        const isSel = idx === selIndex;
        b.textContent = `I${idx} = ${inputs[idx]} ${isSel ? '✓' : ''}`;
        b.className = isSel ? "btn btn-sm btn-success" : "btn btn-sm btn-secondary";
      }
    });

    const box = document.getElementById("mux-result-box");
    if (box) {
      box.innerHTML = `
        <div class="ste-steps" style="margin:0;">
          <div style="font-family:var(--font-mono); font-size:0.95rem;">
            Endereço de Seleção S₁S₀ = <strong>${s1}${s0}₂</strong> = Canal <strong>${selIndex}</strong><br>
            Chave interna conectada em: <strong style="color:var(--accent-primary);">Entrada I${selIndex}</strong><br>
            Saída Final do MUX: <strong style="color:var(--success); font-size:1.2rem;">Z = I${selIndex} = ${z}</strong>
          </div>
        </div>
      `;
    }
  },

  toggleFA(k) {
    this.faState[k] = this.faState[k] ? 0 : 1;
    this.updateFAUI();
  },

  updateFAUI() {
    const { a, b, cin } = this.faState;
    const xorAB = a ^ b;
    const s = xorAB ^ cin;
    const cout = (a & b) | (xorAB & cin);
    const totalDec = a + b + cin;

    ["a","b","cin"].forEach(k => {
      const btn = document.getElementById("fa-" + k);
      if (btn) {
        btn.textContent = `${k.toUpperCase()} = ${this.faState[k]}`;
        btn.className = this.faState[k] ? "btn btn-success" : "btn btn-secondary";
      }
    });

    const box = document.getElementById("fa-result-box");
    if (box) {
      box.innerHTML = `
        <div class="ste-steps" style="margin:0; font-family:var(--font-mono);">
          <div>Soma Aritmética: ${a} + ${b} + ${cin} = <strong>${totalDec}₁₀</strong> = <strong style="color:var(--success);">${cout}${s}₂</strong></div>
          <div style="margin-top:8px;">
            • Soma (S) = (A ⊕ B) ⊕ Cin = (${a} ⊕ ${b}) ⊕ ${cin} = ${xorAB} ⊕ ${cin} = <strong style="color:var(--accent-primary); font-size:1.15rem;">${s}</strong><br>
            • Carry-Out (Cout) = A·B + (A ⊕ B)·Cin = (${a}·${b}) + (${xorAB}·${cin}) = <strong style="color:var(--warning); font-size:1.15rem;">${cout}</strong>
          </div>
        </div>
      `;
    }
  },

  // ===========================================================================
  // LAB 6: FLIP-FLOPS (JK, D, SR) E CONTADORES (MOD-N, ANEL, JOHNSON) (MÓD. II)
  // ===========================================================================
  renderLabSeq(container) {
    this.ffState = { type: "JK", j: 1, k: 1, d: 1, pre: 1, clr: 1, q: 0, pulses: 0, history: [0] };
    this.cntState = { mode: "MOD16", val: 0, pulses: 0 };

    container.innerHTML = `
      <div class="card">
        <div class="card-header">
          <div>
            <span class="badge badge-mod2">Laboratório Prático 6 • Módulo II (Págs. 92–185)</span>
            <h2 class="card-title" style="margin-top:6px;">Simulador Interativo de Flip-Flops (JK / D com PRE' e CLR') e Contadores Digitais</h2>
          </div>
        </div>

        <div class="ste-box">
          <div class="ste-box-header"><span>Instrução ASD-STE100</span></div>
          <ul class="ste-sentence-list">
            <li>Configure as entradas síncronas (<strong>J e K</strong>) e clique em <strong>Disparar Borda do Clock (↑)</strong> para ver o Flip-Flop mudar de estado!</li>
            <li>Experimente ativar <strong>PRE' = 0</strong> ou <strong>CLR' = 0</strong>: veja que as entradas assíncronas mudam a saída Q na hora, sem esperar o Clock!</li>
          </ul>
        </div>

        <div class="grid-2">
          <div style="background:var(--bg-elevated); padding:18px; border-radius:var(--radius-md); border:1px solid var(--border-color);">
            <h3 style="font-size:1.05rem; margin-bottom:10px;">1. Bancada de Teste de Flip-Flop JK (Págs. 120–128)</h3>
            <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:12px;">
              <button class="btn btn-sm btn-success" id="ff-j" onclick="window.SLD_LABS.toggleFF('j')">Entrada J = 1</button>
              <button class="btn btn-sm btn-success" id="ff-k" onclick="window.SLD_LABS.toggleFF('k')">Entrada K = 1</button>
              <button class="btn btn-sm btn-secondary" id="ff-pre" onclick="window.SLD_LABS.toggleFF('pre')">Assíncrono PRE' = 1 (Inativo)</button>
              <button class="btn btn-sm btn-secondary" id="ff-clr" onclick="window.SLD_LABS.toggleFF('clr')">Assíncrono CLR' = 1 (Inativo)</button>
            </div>
            <button class="btn btn-primary" style="width:100%; margin-bottom:14px;" onclick="window.SLD_LABS.clockFF()">
              ⚡ Disparar Pulso de Clock (Borda Ativa)
            </button>
            <div id="ff-status-box"></div>
          </div>

          <div style="background:var(--bg-elevated); padding:18px; border-radius:var(--radius-md); border:1px solid var(--border-color);">
            <h3 style="font-size:1.05rem; margin-bottom:10px;">2. Simulador de Contadores (MOD-16, BCD MOD-10, MOD-6, Anel e Johnson)</h3>
            <div style="display:flex; gap:6px; flex-wrap:wrap; margin-bottom:12px;">
              <button class="btn btn-sm btn-primary" id="cnt-MOD16" onclick="window.SLD_LABS.setCounterMode('MOD16')">Binário 4-bits (MOD-16)</button>
              <button class="btn btn-sm btn-secondary" id="cnt-MOD10" onclick="window.SLD_LABS.setCounterMode('MOD10')">Década BCD (MOD-10)</button>
              <button class="btn btn-sm btn-secondary" id="cnt-MOD6" onclick="window.SLD_LABS.setCounterMode('MOD6')">Módulo < 2ᴺ (MOD-6)</button>
              <button class="btn btn-sm btn-secondary" id="cnt-RING" onclick="window.SLD_LABS.setCounterMode('RING')">Anel (Ring)</button>
              <button class="btn btn-sm btn-secondary" id="cnt-JOHNSON" onclick="window.SLD_LABS.setCounterMode('JOHNSON')">Johnson (Torcido)</button>
            </div>
            <div style="display:flex; gap:8px; margin-bottom:14px;">
              <button class="btn btn-primary" style="flex:1;" onclick="window.SLD_LABS.stepCounter(1)">+1 Pulso de Clock</button>
              <button class="btn btn-secondary" onclick="window.SLD_LABS.stepCounter(-1)">-1 (Down)</button>
              <button class="btn btn-secondary" onclick="window.SLD_LABS.resetCounter()">Zerar (CLR)</button>
            </div>
            <div id="cnt-status-box"></div>
          </div>
        </div>
      </div>
    `;
    this.updateFFUI("Estado inicial pronto.");
    this.updateCounterUI();
  },

  toggleFF(k) {
    this.ffState[k] = this.ffState[k] ? 0 : 1;
    let msg = "Entrada alterada (aguardando borda do Clock).";
    if (this.ffState.pre === 0 && this.ffState.clr === 0) {
      this.ffState.q = 1;
      msg = "⚠ PROIBIDO: PRE'=0 e CLR'=0 ao mesmo tempo é inválido!";
    } else if (this.ffState.pre === 0) {
      this.ffState.q = 1;
      msg = "⚡ PRESET Assíncrono Ativo (PRE'=0): Saída Q forçada para 1 imediatamente!";
    } else if (this.ffState.clr === 0) {
      this.ffState.q = 0;
      msg = "⚡ CLEAR Assíncrono Ativo (CLR'=0): Saída Q zerada para 0 imediatamente!";
    }
    this.updateFFUI(msg);
  },

  clockFF() {
    const s = this.ffState;
    s.pulses++;
    let msg = "";
    if (s.pre === 0 || s.clr === 0) {
      msg = "O Clock disparou, mas PRE' ou CLR' está ativo (0) e sobrepõe o Clock!";
    } else {
      if (s.j === 0 && s.k === 0) {
        msg = "Clock disparou com J=0, K=0 → Q NÃO MUDA (Memória mantida).";
      } else if (s.j === 1 && s.k === 0) {
        s.q = 1;
        msg = "Clock disparou com J=1, K=0 → SET Síncrono (Q vai para 1).";
      } else if (s.j === 0 && s.k === 1) {
        s.q = 0;
        msg = "Clock disparou com J=0, K=1 → RESET Síncrono (Q vai para 0).";
      } else {
        s.q = s.q ? 0 : 1;
        msg = "Clock disparou com J=1, K=1 → COMUTAÇÃO / TOGGLE (Q inverteu!).";
      }
    }
    s.history.push(s.q);
    if (s.history.length > 10) s.history.shift();
    this.updateFFUI(msg);
  },

  updateFFUI(msg) {
    const s = this.ffState;
    const jBtn = document.getElementById("ff-j");
    const kBtn = document.getElementById("ff-k");
    const preBtn = document.getElementById("ff-pre");
    const clrBtn = document.getElementById("ff-clr");

    if (jBtn) { jBtn.textContent = `J = ${s.j}`; jBtn.className = s.j ? "btn btn-sm btn-success" : "btn btn-sm btn-secondary"; }
    if (kBtn) { kBtn.textContent = `K = ${s.k}`; kBtn.className = s.k ? "btn btn-sm btn-success" : "btn btn-sm btn-secondary"; }
    if (preBtn) {
      preBtn.textContent = `PRE' = ${s.pre} (${s.pre === 0 ? 'ATIVO!' : 'Inativo'})`;
      preBtn.className = s.pre === 0 ? "btn btn-sm btn-warning" : "btn btn-sm btn-secondary";
    }
    if (clrBtn) {
      clrBtn.textContent = `CLR' = ${s.clr} (${s.clr === 0 ? 'ATIVO!' : 'Inativo'})`;
      clrBtn.className = s.clr === 0 ? "btn btn-sm btn-warning" : "btn btn-sm btn-secondary";
    }

    const box = document.getElementById("ff-status-box");
    if (box) {
      box.innerHTML = `
        <div style="text-align:center; padding:12px; background:var(--bg-secondary); border-radius:var(--radius-sm); border:1px solid var(--border-color);">
          <div style="font-family:var(--font-mono); font-size:1.5rem; font-weight:900;">
            Saída Q = <span style="color:${s.q ? 'var(--success)' : 'var(--accent-primary)'};">${s.q}</span>
            &nbsp;|&nbsp;
            Q' = <span style="color:var(--text-muted);">${s.q ? 0 : 1}</span>
          </div>
          <div style="font-size:0.84rem; color:var(--ste-badge); margin-top:6px;">${msg}</div>
          <div style="font-size:0.78rem; color:var(--text-muted); margin-top:6px; font-family:var(--font-mono);">
            Histórico de Q: [${s.history.join(" → ")}]
          </div>
        </div>
      `;
    }
  },

  setCounterMode(m) {
    this.cntState.mode = m;
    this.cntState.val = 0;
    this.cntState.pulses = 0;
    ["MOD16", "MOD10", "MOD6", "RING", "JOHNSON"].forEach(k => {
      const b = document.getElementById("cnt-" + k);
      if (b) b.className = k === m ? "btn btn-sm btn-primary" : "btn btn-sm btn-secondary";
    });
    this.updateCounterUI();
  },

  stepCounter(dir) {
    const s = this.cntState;
    s.pulses = Math.max(0, s.pulses + dir);
    const modMap = { MOD16: 16, MOD10: 10, MOD6: 6, RING: 4, JOHNSON: 6 };
    const mod = modMap[s.mode];
    s.val = (s.val + dir + mod) % mod;
    this.updateCounterUI();
  },

  resetCounter() {
    this.cntState.val = 0;
    this.cntState.pulses = 0;
    this.updateCounterUI();
  },

  updateCounterUI() {
    const { mode, val } = this.cntState;
    let binStr = "";
    let desc = "";

    if (mode === "MOD16") {
      binStr = val.toString(2).padStart(4, "0");
      desc = "4 Flip-Flops (DCBA): Conta de 0000 (0) até 1111 (15) e recicla para 0000. MOD = 2⁴ = 16 estados.";
    } else if (mode === "MOD10") {
      binStr = val.toString(2).padStart(4, "0");
      desc = "Contador BCD / Década (Pág. 161): Porta NAND conectada em D e B (1010₂ = 10) aciona o CLR' para reciclar após o 9 (1001₂).";
    } else if (mode === "MOD6") {
      binStr = val.toString(2).padStart(3, "0");
      desc = "Contador MOD-6 (Pág. 158): 3 Flip-Flops (CBA) com porta NAND conectada em C e B (110₂ = 6) ligada ao CLR'. Conta de 0 a 5!";
    } else if (mode === "RING") {
      const states = ["1000", "0100", "0010", "0001"];
      binStr = states[val % 4];
      desc = "Contador em Anel (Pág. 184): Um único bit '1' circula pelos 4 Flip-Flops (Q₀ volta para D₃). MOD = N = 4 estados.";
    } else if (mode === "JOHNSON") {
      const states = ["000", "100", "110", "111", "011", "001"];
      binStr = states[val % 6];
      desc = "Contador Johnson / Anel Torcido (Pág. 185): A saída invertida Q'₀ volta para o 1º FF. Com 3 FFs, gera MOD = 2N = 6 estados!";
    }

    const box = document.getElementById("cnt-status-box");
    if (box) {
      box.innerHTML = `
        <div style="text-align:center; padding:12px; background:var(--bg-secondary); border-radius:var(--radius-sm); border:1px solid var(--border-color);">
          <div style="font-size:0.78rem; color:var(--text-muted); text-transform:uppercase; font-weight:700;">Estado Atual dos Flip-Flops</div>
          <div style="font-family:var(--font-mono); font-size:2rem; font-weight:900; color:var(--accent-primary); letter-spacing:6px; margin:4px 0;">
            ${binStr}
          </div>
          <div style="font-size:0.88rem; font-weight:700; color:var(--success);">Passo / Contagem Decimal: ${val}</div>
          <div style="font-size:0.8rem; color:var(--text-secondary); margin-top:6px;">${desc}</div>
        </div>
      `;
    }
  }
};
