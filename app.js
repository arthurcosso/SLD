// Controlador Principal da Plataforma Interativa SLD (ASD-STE100)

window.SLD_APP = {
  state: {
    currentView: "lista-a5",  // 'lista-a5' | 'dashboard' | 'plan' | 'mock-exam' | 'unit:u1'..'unit:u12' | 'lab:...' | 'practice-missing' | 'cheatsheet'
    readUnits: {},            // { u1: true, ... }
    answers: {},              // { 'u1-q1': { selected: 0, correct: true } }
    completedDays: {},        // { d1: true, ... }
    completedA5: {},          // { 'q1-i': true, ... }
    mockAnswers: {},          // { 'sim-q1': { selected: 0, correct: true } }
    theme: "dark",
    filterStatus: "all"       // 'all' | 'missing' | 'in-progress' | 'mastered'
  },
  mockTimerInterval: null,
  mockSecondsLeft: 100 * 60,
  mockTimerRunning: false,

  init() {
    this.loadState();
    this.applyTheme();
    this.renderSidebar();
    // Prioriza abrir direto no Super Resumo Ultra-Didático do Módulo II para a prova de amanhã
    if (!this.state.hasSeenResumoMod2Update) {
      this.state.currentView = "resumo-mod2";
      this.state.hasSeenResumoMod2Update = true;
      this.saveState();
      this.navigate("resumo-mod2");
      return;
    }
    this.navigate(this.state.currentView || "resumo-mod2");
  },

  loadState() {
    try {
      const raw = localStorage.getItem("sld_ste100_progress_v1");
      if (raw) {
        const parsed = JSON.parse(raw);
        this.state = { ...this.state, ...parsed };
      }
    } catch (e) {
      console.warn("Não foi possível carregar estado salvo:", e);
    }
  },

  saveState() {
    try {
      localStorage.setItem("sld_ste100_progress_v1", JSON.stringify({
        readUnits: this.state.readUnits,
        answers: this.state.answers,
        completedDays: this.state.completedDays,
        completedA5: this.state.completedA5,
        completedLogisim: this.state.completedLogisim,
        hasSeenListaA5: this.state.hasSeenListaA5,
        hasSeenLogisim: this.state.hasSeenLogisim,
        hasSeenKarnaughGuideA5: this.state.hasSeenKarnaughGuideA5,
        hasSeenCircuit5Update: this.state.hasSeenCircuit5Update,
        hasSeenResumoMod2Update: this.state.hasSeenResumoMod2Update,
        mockAnswers: this.state.mockAnswers,
        theme: this.state.theme,
        currentView: this.state.currentView
      }));
    } catch (e) {}
    this.updateTopbarStats();
    this.renderSidebar();
  },

  resetProgress() {
    if (!confirm("Deseja realmente zerar todo o seu progresso de leitura, plano de estudos e exercícios?")) return;
    this.state.readUnits = {};
    this.state.answers = {};
    this.state.completedDays = {};
    this.state.mockAnswers = {};
    this.saveState();
    this.navigate("dashboard");
  },

  toggleTheme() {
    this.state.theme = this.state.theme === "dark" ? "light" : "dark";
    this.applyTheme();
    this.saveState();
  },

  applyTheme() {
    if (this.state.theme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    const btn = document.getElementById("theme-toggle-btn");
    if (btn) btn.textContent = this.state.theme === "dark" ? "☀️ Modo Claro" : "🌙 Modo Escuro";
  },

  // Calcula o status de uma unidade ('mastered' | 'in-progress' | 'missing')
  getUnitStatus(unit) {
    const isRead = !!this.state.readUnits[unit.id];
    const totalQ = unit.exercises.length;
    let answeredQ = 0;
    let correctQ = 0;

    unit.exercises.forEach(ex => {
      const ans = this.state.answers[ex.id];
      if (ans !== undefined) {
        answeredQ++;
        if (ans.correct) correctQ++;
      }
    });

    if (isRead && correctQ === totalQ) {
      return { status: "mastered", label: "Dominado ✓", badge: "badge-success", isRead, answeredQ, correctQ, totalQ };
    }
    if (isRead || answeredQ > 0) {
      return { status: "in-progress", label: "Em Progresso", badge: "badge-warning", isRead, answeredQ, correctQ, totalQ };
    }
    return { status: "missing", label: "Falta Estudar", badge: "badge-danger", isRead, answeredQ, correctQ, totalQ };
  },

  // Estatísticas globais
  getGlobalStats() {
    const units = window.SLD_DATA.units;
    let totalQuestions = 0;
    let totalCorrect = 0;
    let totalRead = 0;
    let masteredUnits = 0;
    let mod1TotalItems = 0, mod1DoneItems = 0;
    let mod2TotalItems = 0, mod2DoneItems = 0;

    units.forEach(u => {
      const st = this.getUnitStatus(u);
      const unitItems = 1 + st.totalQ; // 1 leitura + N questões
      const unitDone = (st.isRead ? 1 : 0) + st.correctQ;

      totalQuestions += st.totalQ;
      totalCorrect += st.correctQ;
      if (st.isRead) totalRead++;
      if (st.status === "mastered") masteredUnits++;

      if (u.module === "Módulo I") {
        mod1TotalItems += unitItems;
        mod1DoneItems += unitDone;
      } else {
        mod2TotalItems += unitItems;
        mod2DoneItems += unitDone;
      }
    });

    const overallTotal = units.length + totalQuestions;
    const overallDone = totalRead + totalCorrect;
    const pctOverall = Math.round((overallDone / overallTotal) * 100);
    const pctMod1 = Math.round((mod1DoneItems / mod1TotalItems) * 100);
    const pctMod2 = Math.round((mod2DoneItems / mod2TotalItems) * 100);

    return {
      totalUnits: units.length,
      masteredUnits,
      totalRead,
      totalQuestions,
      totalCorrect,
      missingQuestions: totalQuestions - totalCorrect,
      pctOverall,
      pctMod1,
      pctMod2
    };
  },

  updateTopbarStats() {
    const stats = this.getGlobalStats();
    const pctEl = document.getElementById("sidebar-pct-text");
    const fillEl = document.getElementById("sidebar-pct-fill");
    const topStats = document.getElementById("topbar-stats");

    if (pctEl) pctEl.textContent = `${stats.pctOverall}%`;
    if (fillEl) fillEl.style.width = `${stats.pctOverall}%`;

    if (topStats) {
      topStats.innerHTML = `
        <span class="stat-chip" title="Unidades 100% dominadas">
          ✅ Dominado: <strong>${stats.masteredUnits}/${stats.totalUnits}</strong>
        </span>
        <span class="stat-chip" title="Exercícios práticos corretos">
          🎯 Questões: <strong>${stats.totalCorrect}/${stats.totalQuestions}</strong>
        </span>
        ${stats.missingQuestions > 0 ? `
          <button class="btn btn-sm btn-warning" onclick="window.SLD_APP.navigate('practice-missing')">
            ⚡ Treinar o que falta (${stats.missingQuestions})
          </button>
        ` : `
          <span class="badge badge-success" style="padding:6px 12px;">🏆 100% Concluído!</span>
        `}
      `;
    }
  },

  renderSidebar() {
    const nav = document.getElementById("sidebar-nav");
    if (!nav) return;

    const mod1Units = window.SLD_DATA.units.filter(u => u.module === "Módulo I");
    const mod2Units = window.SLD_DATA.units.filter(u => u.module === "Módulo II");

    const labsList = [
      { id: "lab-signals", title: "Lab 1: Tensão e Sinais" },
      { id: "lab-converter", title: "Lab 2: Conversor, BCD e Gray" },
      { id: "lab-gates", title: "Lab 3: Portas e DeMorgan" },
      { id: "lab-kmap", title: "Lab 4: Mapa de Karnaugh" },
      { id: "lab-comb", title: "Lab 5: Display 7-Seg, MUX e Somador" },
      { id: "lab-seq", title: "Lab 6: Flip-Flops e Contadores" }
    ];

    nav.innerHTML = `
      <div class="nav-section-title" style="color:var(--warning); font-weight:800; letter-spacing:0.04em;">⚡ PROVA DE AMANHÃ (FOCO TOTAL)</div>
      <button class="nav-btn ${this.state.currentView === 'resumo-mod2' ? 'active' : ''}" style="border:2px solid #f59e0b; background:${this.state.currentView === 'resumo-mod2' ? 'rgba(245, 158, 11, 0.35)' : 'linear-gradient(135deg, rgba(245, 158, 11, 0.22), rgba(239, 68, 68, 0.18))'}; box-shadow:0 0 14px rgba(245, 158, 11, 0.28); margin-bottom:8px;" onclick="window.SLD_APP.navigate('resumo-mod2')">
        <span class="nav-btn-left">🔥 <strong>RESUMÃO DIDÁTICO (MÓD. II)</strong></span>
      </button>

      <div class="nav-section-title">Visão Geral & Avaliação II</div>
      <button class="nav-btn ${this.state.currentView === 'logisim' ? 'active' : ''}" style="border:1px solid rgba(56,189,248,0.5); background:${this.state.currentView === 'logisim' ? '' : 'rgba(56,189,248,0.1)'};" onclick="window.SLD_APP.navigate('logisim')">
        <span class="nav-btn-left">🛠️ <strong>6 Circuitos Logisim (Mód. II)</strong></span>
      </button>
      <button class="nav-btn ${this.state.currentView === 'lista-a5' ? 'active' : ''}" style="border:1px solid rgba(16,185,129,0.45); background:${this.state.currentView === 'lista-a5' ? '' : 'rgba(16,185,129,0.08)'};" onclick="window.SLD_APP.navigate('lista-a5')">
        <span class="nav-btn-left">📋 <strong>Lista A5 Resolvida (20 Q)</strong></span>
      </button>
      <button class="nav-btn ${this.state.currentView === 'dashboard' ? 'active' : ''}" onclick="window.SLD_APP.navigate('dashboard')">
        <span class="nav-btn-left">📊 Raio-X: O que sei / O que falta</span>
      </button>
      <button class="nav-btn ${this.state.currentView === 'plan' ? 'active' : ''}" onclick="window.SLD_APP.navigate('plan')">
        <span class="nav-btn-left">📅 Sprint 03/11 a 07/11 (30 pts)</span>
      </button>
      <button class="nav-btn ${this.state.currentView === 'mock-exam' ? 'active' : ''}" onclick="window.SLD_APP.navigate('mock-exam')">
        <span class="nav-btn-left">📝 Simulado Presencial (1h40)</span>
      </button>
      <button class="nav-btn ${this.state.currentView === 'practice-missing' ? 'active' : ''}" onclick="window.SLD_APP.navigate('practice-missing')">
        <span class="nav-btn-left">🎯 Treinar Apenas o Que Falta</span>
      </button>
      <button class="nav-btn ${this.state.currentView === 'cheatsheet' ? 'active' : ''}" onclick="window.SLD_APP.navigate('cheatsheet')">
        <span class="nav-btn-left">⚡ Resumão STE-100 para Prova</span>
      </button>

      <div class="nav-section-title">Laboratórios Interativos (Prática)</div>
      ${labsList.map(l => `
        <button class="nav-btn ${this.state.currentView === 'lab:' + l.id ? 'active' : ''}" onclick="window.SLD_APP.navigate('lab:${l.id}')">
          <span class="nav-btn-left">🔬 ${l.title}</span>
        </button>
      `).join("")}

      <div class="nav-section-title">Módulo I (Sinais, Bases e Portas)</div>
      ${mod1Units.map(u => {
        const st = this.getUnitStatus(u);
        return `
          <button class="nav-btn ${this.state.currentView === 'unit:' + u.id ? 'active' : ''}" onclick="window.SLD_APP.navigate('unit:${u.id}')">
            <span class="nav-btn-left">
              <span class="status-dot ${st.status}"></span>
              <span>${u.title}</span>
            </span>
            <span style="font-size:0.72rem; color:var(--text-muted);">${st.correctQ}/${st.totalQ}</span>
          </button>
        `;
      }).join("")}

      <div class="nav-section-title">Módulo II (Karnaugh, MUX, FFs, Contadores)</div>
      ${mod2Units.map(u => {
        const st = this.getUnitStatus(u);
        return `
          <button class="nav-btn ${this.state.currentView === 'unit:' + u.id ? 'active' : ''}" onclick="window.SLD_APP.navigate('unit:${u.id}')">
            <span class="nav-btn-left">
              <span class="status-dot ${st.status}"></span>
              <span>${u.title}</span>
            </span>
            <span style="font-size:0.72rem; color:var(--text-muted);">${st.correctQ}/${st.totalQ}</span>
          </button>
        `;
      }).join("")}
    `;

    this.updateTopbarStats();
  },

  navigate(view) {
    this.state.currentView = view;
    this.saveState();

    const sidebar = document.getElementById("sidebar");
    if (sidebar) sidebar.classList.remove("open");

    const area = document.getElementById("main-content-area");
    if (!area) return;
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (view === "resumo-mod2") {
      this.renderResumoMod2(area);
    } else if (view === "dashboard") {
      this.renderDashboard(area);
    } else if (view === "logisim") {
      this.renderLogisimGuide(area);
    } else if (view === "lista-a5") {
      this.renderListaA5(area);
    } else if (view === "plan") {
      this.renderStudyPlan(area);
    } else if (view === "mock-exam") {
      this.renderMockExam(area);
    } else if (view === "practice-missing") {
      this.renderPracticeMissing(area);
    } else if (view === "cheatsheet") {
      this.renderCheatSheet(area);
    } else if (view.startsWith("unit:")) {
      const unitId = view.split(":")[1];
      const unit = window.SLD_DATA.units.find(u => u.id === unitId);
      if (unit) this.renderUnit(area, unit);
    } else if (view.startsWith("lab:")) {
      const labId = view.split(":")[1];
      this.renderLabPage(area, labId);
    }
  },

  // ===========================================================================
  // VIEW 1: DASHBOARD ("RAIO-X DO CONHECIMENTO: O QUE SEI VS O QUE FALTA")
  // ===========================================================================
  renderDashboard(container) {
    const stats = this.getGlobalStats();
    const units = window.SLD_DATA.units;
    const plan = window.SLD_DATA.studyPlan || [];
    const doneDays = plan.filter(d => this.state.completedDays && this.state.completedDays[d.dayId]).length;

    const filteredUnits = units.filter(u => {
      if (this.state.filterStatus === "all") return true;
      return this.getUnitStatus(u).status === this.state.filterStatus;
    });

    // Descobre a próxima unidade recomendada que ainda não está dominada
    const nextUnit = units.find(u => this.getUnitStatus(u).status !== "mastered") || units[0];

    container.innerHTML = `
      <!-- Banner Oficial da Avaliação II: 07/11 -->
      <div class="card" style="background: linear-gradient(135deg, rgba(245, 158, 11, 0.16), var(--bg-elevated)); border: 1px solid rgba(245, 158, 11, 0.5); margin-bottom: 18px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:14px;">
          <div>
            <span class="badge badge-warning" style="margin-bottom:6px;">🎯 META OFICIAL: AVALIAÇÃO II PRESENCIAL • 30 PONTOS</span>
            <h2 style="font-size:1.25rem; font-weight:800;">
              Data: 07/11 (Sábado), das 08h00 às 09h40 (1h40 de duração)
            </h2>
            <p style="font-size:0.88rem; color:var(--text-secondary); margin-top:3px;">
              <strong>Sprint Intensivo de 4 Dias</strong> (início amanhã, <strong>Terça, 03/11</strong> • 3 unidades/dia) estruturado em ASD-STE100 + Simulado no papel valendo 30 pontos.
            </p>
          </div>
          <div style="display:flex; gap:10px; flex-wrap:wrap;">
            <button class="btn btn-success" onclick="window.SLD_APP.navigate('lista-a5')">
              📋 Abrir Lista A5 Resolvida Passo a Passo (20 Questões)
            </button>
            <button class="btn btn-warning" onclick="window.SLD_APP.navigate('plan')">
              📅 Abrir Sprint 03/11 a 07/11 (${doneDays}/${plan.length} etapas)
            </button>
            <button class="btn btn-secondary" onclick="window.SLD_APP.navigate('mock-exam')">
              📝 Fazer Simulado 30 pts (1h40)
            </button>
          </div>
        </div>
      </div>

      <div class="card" style="background: linear-gradient(135deg, var(--bg-secondary), var(--bg-elevated)); border-color: rgba(56, 189, 248, 0.35);">
        <div class="grid-2" style="align-items:center;">
          <div>
            <span class="ste-pill" onclick="window.SLD_APP.openSteModal()">✓ Metodologia ASD-STE100 Didática Ativa</span>
            <h1 style="font-size:1.65rem; font-weight:800; margin:10px 0 8px;">
              Plataforma Interativa: Sistemas Lógicos Digitais (Módulos I e II)
            </h1>
            <p style="color:var(--text-secondary); font-size:0.95rem; margin-bottom:16px;">
              Todo o conteúdo dos slides do <strong>Prof. Ricardo Martins Ramos (Dom Helder)</strong> foi traduzido para <strong>ASD-STE100</strong>: frases curtas, diretas, sem enrolação, com simuladores práticos e controle exato do que você já sabe e do que falta aprender.
            </p>
            <div style="display:flex; gap:10px; flex-wrap:wrap;">
              <button class="btn btn-primary" onclick="window.SLD_APP.navigate('unit:${nextUnit.id}')">
                ▶ Continuar de onde parei: ${nextUnit.title.split('.')[0]}. ${nextUnit.title.split('.')[1]}
              </button>
              <button class="btn btn-secondary" onclick="window.SLD_APP.navigate('lab:lab-converter')">
                🔬 Abrir Laboratórios Práticos
              </button>
            </div>
          </div>

          <div style="background:var(--bg-primary); padding:18px; border-radius:var(--radius-md); border:1px solid var(--border-color);">
            <div style="font-weight:700; margin-bottom:12px; display:flex; justify-content:space-between;">
              <span>Raio-X do Seu Progresso</span>
              <span style="color:var(--accent-primary);">${stats.pctOverall}% Completo</span>
            </div>

            <div class="progress-label-row">
              <span>Módulo I (Sinais, Bases, BCD, Gray, Portas, DeMorgan)</span>
              <span>${stats.pctMod1}%</span>
            </div>
            <div class="progress-track" style="margin-bottom:12px;">
              <div class="progress-fill" style="width:${stats.pctMod1}%;"></div>
            </div>

            <div class="progress-label-row">
              <span>Módulo II (Mintermos, Mapa K, MUX, Somador, FFs, Contadores)</span>
              <span>${stats.pctMod2}%</span>
            </div>
            <div class="progress-track" style="margin-bottom:14px;">
              <div class="progress-fill" style="width:${stats.pctMod2}%;"></div>
            </div>

            <div class="grid-3" style="gap:8px; text-align:center;">
              <div style="background:var(--bg-secondary); padding:8px; border-radius:6px;">
                <div style="font-size:1.2rem; font-weight:800; color:var(--success);">${stats.masteredUnits}/${stats.totalUnits}</div>
                <div style="font-size:0.72rem; color:var(--text-muted);">Unidades Dominadas</div>
              </div>
              <div style="background:var(--bg-secondary); padding:8px; border-radius:6px;">
                <div style="font-size:1.2rem; font-weight:800; color:var(--accent-primary);">${stats.totalRead}/${stats.totalUnits}</div>
                <div style="font-size:0.72rem; color:var(--text-muted);">Leituras STE-100</div>
              </div>
              <div style="background:var(--bg-secondary); padding:8px; border-radius:6px;">
                <div style="font-size:1.2rem; font-weight:800; color:var(--warning);">${stats.missingQuestions}</div>
                <div style="font-size:0.72rem; color:var(--text-muted);">Questões Faltando</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Painel de Filtro: O que sei vs O que falta -->
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin:22px 0 14px;">
        <div>
          <h2 style="font-size:1.25rem; font-weight:800;">Mapa Completo do Conhecimento (Módulo I + Módulo II)</h2>
          <p style="font-size:0.86rem; color:var(--text-muted);">Veja exatamente o que você já dominou e clique no que ainda falta praticar:</p>
        </div>
        <div style="display:flex; gap:6px; flex-wrap:wrap;">
          <button class="btn btn-sm ${this.state.filterStatus === 'all' ? 'btn-primary' : 'btn-secondary'}" onclick="window.SLD_APP.setDashboardFilter('all')">
            Todos (${units.length})
          </button>
          <button class="btn btn-sm ${this.state.filterStatus === 'missing' ? 'btn-primary' : 'btn-secondary'}" onclick="window.SLD_APP.setDashboardFilter('missing')">
            🔴 O Que Falta (${units.filter(u => this.getUnitStatus(u).status === 'missing').length})
          </button>
          <button class="btn btn-sm ${this.state.filterStatus === 'in-progress' ? 'btn-primary' : 'btn-secondary'}" onclick="window.SLD_APP.setDashboardFilter('in-progress')">
            🟡 Em Progresso (${units.filter(u => this.getUnitStatus(u).status === 'in-progress').length})
          </button>
          <button class="btn btn-sm ${this.state.filterStatus === 'mastered' ? 'btn-primary' : 'btn-secondary'}" onclick="window.SLD_APP.setDashboardFilter('mastered')">
            🟢 Dominados (${units.filter(u => this.getUnitStatus(u).status === 'mastered').length})
          </button>
        </div>
      </div>

      <div class="grid-3">
        ${filteredUnits.map(u => {
          const st = this.getUnitStatus(u);
          return `
            <div class="matrix-card ${st.status}">
              <div>
                <div style="display:flex; justify-content:space-between; align-items:center; gap:6px; margin-bottom:8px;">
                  <span class="badge ${u.module === 'Módulo I' ? 'badge-mod1' : 'badge-mod2'}">${u.module} • ${u.pages}</span>
                  <span class="badge ${st.badge}">${st.label}</span>
                </div>
                <h3 style="font-size:1.02rem; font-weight:700; margin-bottom:6px;">${u.title}</h3>
                <p style="font-size:0.84rem; color:var(--text-secondary); margin-bottom:12px;">${u.shortGoal}</p>
              </div>

              <div>
                <div style="font-size:0.78rem; color:var(--text-muted); margin-bottom:10px; display:flex; justify-content:space-between;">
                  <span>📖 Leitura: <strong>${st.isRead ? 'Lida ✓' : 'Pendente'}</strong></span>
                  <span>🎯 Prática: <strong>${st.correctQ}/${st.totalQ} acertos</strong></span>
                </div>
                <div style="display:flex; gap:8px;">
                  <button class="btn btn-sm btn-primary" style="flex:1;" onclick="window.SLD_APP.navigate('unit:${u.id}')">
                    ${st.status === 'mastered' ? 'Revisar Tópico' : 'Estudar e Praticar'}
                  </button>
                  <button class="btn btn-sm btn-secondary" title="Abrir simulador deste tema" onclick="window.SLD_APP.navigate('lab:${u.labId}')">
                    🔬 Lab
                  </button>
                </div>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    `;
  },

  setDashboardFilter(f) {
    this.state.filterStatus = f;
    this.renderDashboard(document.getElementById("main-content-area"));
  },

  // ===========================================================================
  // VIEW 2: UNIDADE DIDÁTICA ASD-STE100 + EXERCÍCIOS INTERATIVOS
  // ===========================================================================
  renderUnit(container, unit) {
    const st = this.getUnitStatus(unit);
    const allUnits = window.SLD_DATA.units;
    const idx = allUnits.findIndex(u => u.id === unit.id);
    const prevUnit = idx > 0 ? allUnits[idx - 1] : null;
    const nextUnit = idx < allUnits.length - 1 ? allUnits[idx + 1] : null;

    container.innerHTML = `
      <!-- Cabeçalho da Unidade -->
      <div class="card">
        <div class="card-header" style="margin-bottom:8px;">
          <div>
            <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap; margin-bottom:6px;">
              <span class="badge ${unit.module === 'Módulo I' ? 'badge-mod1' : 'badge-mod2'}">${unit.module} • ${unit.part} (${unit.pages})</span>
              <span class="badge ${st.badge}">${st.label} (${st.correctQ}/${st.totalQ} questões)</span>
            </div>
            <h1 style="font-size:1.5rem; font-weight:800;">${unit.title}</h1>
            <p style="color:var(--text-secondary); font-size:0.95rem; margin-top:4px;"><strong>Objetivo Prático:</strong> ${unit.shortGoal}</p>
          </div>
          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            <button class="btn btn-sm btn-secondary" onclick="window.SLD_APP.navigate('lab:${unit.labId}')">
              🔬 Abrir Simulador Prático
            </button>
            <button class="btn btn-sm ${st.isRead ? 'btn-success' : 'btn-primary'}" onclick="window.SLD_APP.toggleUnitRead('${unit.id}')">
              ${st.isRead ? '✓ Leitura STE-100 Concluída' : 'Marcar Leitura como Concluída'}
            </button>
          </div>
        </div>

        <!-- Bloco 1: Resumo Direto ASD-STE100 -->
        <div class="ste-box">
          <div class="ste-box-header">
            <span>📌 Resumo Essencial em ASD-STE100 (Frases Curtas • Voz Ativa • Sem Enrolação)</span>
          </div>
          <ul class="ste-sentence-list">
            ${unit.steSummary.map(s => `<li>${s}</li>`).join("")}
          </ul>
        </div>

        <!-- Bloco 2: Tradutor do "Academiquês" dos Slides para STE-100 -->
        <h3 style="font-size:1.05rem; font-weight:700; margin:18px 0 8px;">🔄 Tradutor Didático: Do Slide Universitário para ASD-STE100</h3>
        ${unit.translations.map(t => `
          <div class="translation-grid">
            <div class="trans-card academic">
              <span class="trans-label">❌ Como está no Slide (Denso / Abstrato)</span>
              <div style="font-size:0.9rem;">${t.academic}</div>
            </div>
            <div class="trans-card ste-simple">
              <span class="trans-label">✅ Tradução ASD-STE100 (Simples e Direta)</span>
              <div style="font-size:0.92rem; font-weight:500;">${t.ste}</div>
            </div>
          </div>
        `).join("")}

        <!-- Bloco 3: Procedimento Passo a Passo Imperativo -->
        <div class="ste-steps">
          <div style="font-weight:800; color:var(--accent-primary); font-size:1rem; margin-bottom:8px;">
            🛠️ ${unit.stepByStep.title}
          </div>
          ${unit.stepByStep.steps.map((step, i) => `
            <div class="ste-step-item">
              <div class="step-num">${i + 1}</div>
              <div style="font-size:0.93rem;">${step}</div>
            </div>
          `).join("")}
        </div>

        <!-- Bloco 4: Tabela de Referência -->
        ${unit.tableData ? `
          <div style="margin-top:18px; overflow-x:auto;">
            <div style="font-weight:700; font-size:0.95rem; margin-bottom:6px;">📋 ${unit.tableData.caption}</div>
            <table class="ste-table">
              <thead>
                <tr>${unit.tableData.headers.map(h => `<th>${h}</th>`).join("")}</tr>
              </thead>
              <tbody>
                ${unit.tableData.rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join("")}</tr>`).join("")}
              </tbody>
            </table>
          </div>
        ` : ""}
      </div>

      <!-- Bloco 5: Verificação Prática do Conhecimento (Quizzes da Unidade) -->
      <div class="card">
        <div class="card-header">
          <div>
            <h2 class="card-title">🎯 Prática Interativa: Verifique se você dominou esta unidade</h2>
            <p style="font-size:0.88rem; color:var(--text-secondary);">
              Responda às questões abaixo baseadas nos exercícios dos slides. Cada resposta mostra a explicação passo a passo em STE-100:
            </p>
          </div>
        </div>

        <div id="unit-exercises-list">
          ${unit.exercises.map((ex, qIdx) => this.renderExerciseCard(ex, qIdx + 1)).join("")}
        </div>
      </div>

      <!-- Navegação Inferior entre Unidades -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:16px; gap:12px;">
        ${prevUnit
          ? `<button class="btn btn-secondary" onclick="window.SLD_APP.navigate('unit:${prevUnit.id}')">← Anterior: ${prevUnit.title}</button>`
          : `<button class="btn btn-secondary" onclick="window.SLD_APP.navigate('dashboard')">← Voltar ao Painel</button>`
        }
        ${nextUnit
          ? `<button class="btn btn-primary" onclick="window.SLD_APP.navigate('unit:${nextUnit.id}')">Próxima: ${nextUnit.title} →</button>`
          : `<button class="btn btn-success" onclick="window.SLD_APP.navigate('dashboard')">🎉 Concluir e Ver Raio-X →</button>`
        }
      </div>
    `;
  },

  renderExerciseCard(ex, num) {
    const saved = this.state.answers[ex.id];
    return `
      <div style="background:var(--bg-elevated); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:18px; margin-bottom:14px;" id="ex-box-${ex.id}">
        <div style="font-weight:700; font-size:0.98rem; margin-bottom:12px;">
          <span style="color:var(--accent-primary);">Questão ${num}:</span> ${ex.question}
        </div>
        <div>
          ${ex.options.map((opt, oIdx) => {
            let cls = "quiz-option";
            if (saved !== undefined) {
              if (oIdx === ex.correct) cls += " correct";
              else if (oIdx === saved.selected && !saved.correct) cls += " wrong";
            }
            return `
              <button class="${cls}" onclick="window.SLD_APP.submitAnswer('${ex.id}', ${oIdx})">
                <span style="font-family:var(--font-mono); font-weight:700;">(${String.fromCharCode(65 + oIdx)})</span>
                <span>${opt}</span>
              </button>
            `;
          }).join("")}
        </div>
        ${saved !== undefined ? `
          <div class="feedback-banner ${saved.correct ? 'ok' : 'err'}">
            <strong>${saved.correct ? '✅ Correto!' : '❌ Ainda não! Veja a regra clara em ASD-STE100:'}</strong><br>
            ${ex.steExplanation}
          </div>
        ` : ""}
      </div>
    `;
  },

  submitAnswer(exId, optionIdx) {
    let targetEx = null;
    let targetUnit = null;
    window.SLD_DATA.units.forEach(u => {
      u.exercises.forEach(e => {
        if (e.id === exId) {
          targetEx = e;
          targetUnit = u;
        }
      });
    });
    if (!targetEx) return;

    const isCorrect = optionIdx === targetEx.correct;
    this.state.answers[exId] = { selected: optionIdx, correct: isCorrect };

    // Se acertou todas as questões da unidade, marca leitura automaticamente também
    if (targetUnit) {
      const allCorrect = targetUnit.exercises.every(e => this.state.answers[e.id]?.correct);
      if (allCorrect) this.state.readUnits[targetUnit.id] = true;
    }

    this.saveState();

    // Atualiza o card da questão na tela atual sem perder o scroll
    const box = document.getElementById("ex-box-" + exId);
    if (box) {
      const tempDiv = document.createElement("div");
      const numMatch = box.querySelector("span")?.textContent?.match(/\d+/);
      const qNum = numMatch ? numMatch[0] : "";
      tempDiv.innerHTML = this.renderExerciseCard(targetEx, qNum);
      box.replaceWith(tempDiv.firstElementChild);
    }
  },

  toggleUnitRead(unitId) {
    this.state.readUnits[unitId] = !this.state.readUnits[unitId];
    this.saveState();
    const unit = window.SLD_DATA.units.find(u => u.id === unitId);
    if (unit) this.renderUnit(document.getElementById("main-content-area"), unit);
  },

  // ===========================================================================
  // VIEW 3: TREINAR APENAS O QUE FALTA (MODO DIAGNÓSTICO INTELIGENTE)
  // ===========================================================================
  renderPracticeMissing(container) {
    const missingList = [];
    window.SLD_DATA.units.forEach(u => {
      u.exercises.forEach(ex => {
        const ans = this.state.answers[ex.id];
        if (!ans || !ans.correct) {
          missingList.push({ unit: u, ex });
        }
      });
    });

    container.innerHTML = `
      <div class="card">
        <div class="card-header">
          <div>
            <span class="badge badge-warning">Treinamento Focado • O Que Falta Dominar</span>
            <h1 class="card-title" style="font-size:1.45rem; margin-top:6px;">
              🎯 Caderno Inteligente: Questões Pendentes ou Com Erro (${missingList.length})
            </h1>
            <p style="font-size:0.92rem; color:var(--text-secondary); margin-top:4px;">
              Aqui aparecem automaticamente apenas os exercícios que você ainda não respondeu ou que errou na última tentativa. Assim que você acerta, a questão é marcada como dominada!
            </p>
          </div>
          <button class="btn btn-sm btn-secondary" onclick="window.SLD_APP.navigate('dashboard')">← Voltar ao Raio-X</button>
        </div>

        ${missingList.length === 0
          ? `<div style="text-align:center; padding:40px 20px;">
              <div style="font-size:3rem; margin-bottom:10px;">🏆</div>
              <h2 style="color:var(--success); margin-bottom:8px;">Parabéns! Você acertou 100% das questões de todos os módulos!</h2>
              <p style="color:var(--text-secondary); margin-bottom:18px;">Não falta nenhuma questão pendente nos Módulos I e II.</p>
              <button class="btn btn-primary" onclick="window.SLD_APP.navigate('cheatsheet')">Ver Resumão de Bolso para Prova</button>
            </div>`
          : missingList.map((item, idx) => `
              <div style="margin-bottom:6px; font-size:0.78rem; color:var(--text-muted); font-weight:700;">
                Origem: <a href="javascript:void(0)" style="color:var(--accent-primary);" onclick="window.SLD_APP.navigate('unit:${item.unit.id}')">${item.unit.title} (${item.unit.module} • ${item.unit.pages})</a>
              </div>
              ${this.renderExerciseCard(item.ex, idx + 1)}
            `).join("")
        }
      </div>
    `;
  },

  // ===========================================================================
  // VIEW 4: PÁGINA DOS LABORATÓRIOS INTERATIVOS
  // ===========================================================================
  renderLabPage(container, labId) {
    const tabs = [
      { id: "lab-signals", label: "1. Tensão e Sinais" },
      { id: "lab-converter", label: "2. Conversor, BCD e Gray" },
      { id: "lab-gates", label: "3. Portas e DeMorgan" },
      { id: "lab-kmap", label: "4. Mapa de Karnaugh" },
      { id: "lab-comb", label: "5. Display 7-Seg, MUX e Somador" },
      { id: "lab-seq", label: "6. Flip-Flops e Contadores" }
    ];

    container.innerHTML = `
      <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:18px;">
        ${tabs.map(t => `
          <button class="btn btn-sm ${t.id === labId ? 'btn-primary' : 'btn-secondary'}" onclick="window.SLD_APP.navigate('lab:${t.id}')">
            🔬 ${t.label}
          </button>
        `).join("")}
      </div>
      <div id="lab-stage-container"></div>
    `;

    const stage = document.getElementById("lab-stage-container");
    if (!stage) return;

    if (labId === "lab-signals") window.SLD_LABS.renderLabSignals(stage);
    else if (labId === "lab-converter") window.SLD_LABS.renderLabConverter(stage);
    else if (labId === "lab-gates") window.SLD_LABS.renderLabGates(stage);
    else if (labId === "lab-kmap") window.SLD_LABS.renderLabKmap(stage);
    else if (labId === "lab-comb") window.SLD_LABS.renderLabComb(stage);
    else if (labId === "lab-seq") window.SLD_LABS.renderLabSeq(stage);
  },

  // ===========================================================================
  // VIEW RESUMO ULTRA-DIDÁTICO (MÓDULO II - PROVA DE AMANHÃ)
  // ===========================================================================
  renderResumoMod2(container) {
    const data = window.SLD_RESUMO_MOD2;
    if (!data) return;

    container.innerHTML = `
      <div class="card" style="border-color: var(--warning); background: linear-gradient(135deg, rgba(245, 158, 11, 0.16), var(--bg-secondary));">
        <div class="card-header">
          <div>
            <span class="badge badge-warning">⚡ Sprint de Emergência • Prova Amanhã às 08h00</span>
            <h1 class="card-title" style="font-size:1.6rem; margin-top:8px; color:var(--text-primary);">
              ${data.meta.title}
            </h1>
            <p style="font-size:0.95rem; color:var(--text-secondary); margin-top:6px;">
              ${data.meta.subtitle}
            </p>
            <div style="font-size:0.85rem; color:var(--accent-primary); font-weight:700; margin-top:4px;">
              📅 ${data.meta.dateInfo}
            </div>
          </div>
          <div style="text-align:right;">
            <button class="btn btn-sm btn-secondary" onclick="window.print()">🖨️ Imprimir / Salvar PDF</button>
          </div>
        </div>

        <!-- Barra de Navegação Rápida entre os 6 Tópicos -->
        <div style="background:var(--bg-primary); padding:12px; border-radius:var(--radius-md); border:1px solid var(--border-color); margin-top:12px;">
          <div style="font-size:0.8rem; font-weight:700; color:var(--text-muted); margin-bottom:8px;">
            ⚡ PULAR DIRETO PARA O TÓPICO (Clique para rolar até ele):
          </div>
          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            ${data.modules.map((m, idx) => `
              <button class="btn btn-sm btn-secondary" style="font-size:0.82rem;" onclick="document.getElementById('${m.id}').scrollIntoView({behavior:'smooth'})">
                ${idx + 1}. ${m.title.split(":")[0].replace(/^\d+\.\s*/, "")}
              </button>
            `).join("")}
            <button class="btn btn-sm btn-warning" onclick="document.getElementById('resumo-mod2-checklist').scrollIntoView({behavior:'smooth'})">
              🎯 Checklist Rápido
            </button>
          </div>
        </div>
      </div>

      <!-- Renderização dos 6 Módulos -->
      ${data.modules.map(mod => `
        <div class="card" id="${mod.id}" style="margin-top:18px; border:1px solid var(--border-color);">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:10px; margin-bottom:12px;">
            <div>
              <span class="badge badge-mod2">${mod.badge}</span>
              <h2 style="font-size:1.25rem; font-weight:800; color:var(--text-primary); margin-top:6px;">
                ${mod.title}
              </h2>
            </div>
          </div>

          <!-- Bloco 1: A Intuição (Sem Jargão) -->
          <div class="ste-box" style="margin-bottom:12px;">
            <div class="ste-box-header"><span>🧠 A Intuição Sem Complicação (Como Funciona na Prática)</span></div>
            ${mod.analogy}
          </div>

          <!-- Bloco 2: Por que funciona assim? -->
          ${mod.whyItWorks || ""}

          <!-- Bloco 3: Tabela ou Esquema Visual -->
          ${mod.ruleTable || ""}

          <!-- Bloco 4: Pegadinhas onde alunos erram -->
          ${mod.trapAlert ? `
            <div style="background:rgba(239, 68, 68, 0.12); border:1px solid var(--danger); border-radius:var(--radius-md); padding:14px; margin:12px 0; color:var(--text-primary); font-size:0.9rem;">
              ${mod.trapAlert}
            </div>
          ` : ""}

          <!-- Bloco 5: Exemplo Passo a Passo -->
          ${mod.exampleWalkthrough || ""}
        </div>
      `).join("")}

      <!-- Bloco de Checklist Rápido -->
      <div class="card" id="resumo-mod2-checklist" style="margin-top:18px; border-color:var(--success); background:linear-gradient(135deg, rgba(34, 197, 94, 0.1), var(--bg-secondary));">
        <h2 style="font-size:1.3rem; font-weight:800; color:var(--success); margin-bottom:12px;">
          🎯 Checklist Mental de 2 Minutos para os Primeiros Minutos da Prova
        </h2>
        <p style="font-size:0.92rem; color:var(--text-secondary); margin-bottom:14px;">
          Assim que receber a folha da prova amanhã, anote essas 7 regras no rascunho para não se confundir no nervosismo:
        </p>
        <div class="ste-steps">
          ${data.examChecklist.map((c, i) => `
            <div class="ste-step-item">
              <div class="step-num">${i + 1}</div>
              <div>
                <span class="badge badge-success" style="font-size:0.75rem; margin-bottom:4px;">${c.tag}</span><br>
                <strong style="font-size:0.92rem;">${c.text}</strong>
              </div>
            </div>
          `).join("")}
        </div>
        <div style="display:flex; gap:12px; justify-content:center; flex-wrap:wrap; margin-top:20px;">
          <button class="btn btn-primary" onclick="window.SLD_APP.navigate('lista-a5')">
            📋 Ir para Lista A5 Resolvida (20 Questões)
          </button>
          <button class="btn btn-secondary" onclick="window.SLD_APP.navigate('logisim')">
            🛠️ Ver os 6 Circuitos no Logisim
          </button>
        </div>
      </div>
    `;
  },

  // ===========================================================================
  // VIEW 5: CHEAT SHEET (RESUMÃO STE-100 PARA PROVA)
  // ===========================================================================
  renderCheatSheet(container) {
    container.innerHTML = `
      <div class="card">
        <div class="card-header">
          <div>
            <span class="ste-pill">Guia de Consulta Rápida • ASD-STE100</span>
            <h1 class="card-title" style="font-size:1.5rem; margin-top:8px;">⚡ Folha de Revisão Rápida (Tudo que cai na prova em 1 página)</h1>
            <p style="font-size:0.9rem; color:var(--text-secondary);">
              Regras diretas escritas em linguagem técnica simplificada (ASD-STE100) cobrindo os Módulos I e II:
            </p>
          </div>
          <button class="btn btn-sm btn-secondary" onclick="window.print()">🖨️ Imprimir / Salvar PDF</button>
        </div>

        <div class="grid-2">
          ${window.SLD_DATA.cheatSheet.map(sec => `
            <div class="ste-steps" style="margin:0;">
              <h3 style="font-size:1rem; color:var(--accent-primary); margin-bottom:10px;">${sec.category}</h3>
              <ul class="ste-sentence-list">
                ${sec.items.map(it => `<li style="font-size:0.88rem; margin-bottom:8px;">${it}</li>`).join("")}
              </ul>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  },

  // ===========================================================================
  // VIEW 6: PLANO DE ESTUDOS INTENSIVO (03/11 A 07/11 - AVALIAÇÃO II 30 PONTOS)
  // ===========================================================================
  renderStudyPlan(container) {
    const plan = window.SLD_DATA.studyPlan || [];
    const exam = window.SLD_DATA.examInfo;
    const doneCount = plan.filter(d => this.state.completedDays && this.state.completedDays[d.dayId]).length;
    const pctPlan = Math.round((doneCount / plan.length) * 100);

    container.innerHTML = `
      <div class="card" style="border-color: rgba(245, 158, 11, 0.45);">
        <div class="card-header">
          <div>
            <span class="badge badge-warning">Sprint Intensivo de Emergência ASD-STE100 • 03/11 a 07/11</span>
            <h1 class="card-title" style="font-size:1.5rem; margin-top:8px;">
              📅 Plano Intensivo de 4 Dias (Terça 03/11 a Sábado 07/11) — ${exam.title}
            </h1>
            <p style="font-size:0.92rem; color:var(--text-secondary); margin-top:4px;">
              <strong>Data da Prova:</strong> ${exam.dateStr} | <strong>Horário:</strong> ${exam.timeStr} | <strong>Valor:</strong> ${exam.points} pontos | <strong>Formato:</strong> ${exam.modality}
            </p>
          </div>
          <div style="text-align:right;">
            <div style="font-size:1.3rem; font-weight:800; color:var(--success);">${doneCount}/${plan.length} Etapas (${pctPlan}%)</div>
            <button class="btn btn-sm btn-primary" style="margin-top:6px;" onclick="window.SLD_APP.navigate('mock-exam')">
              📝 Ir para Simulado 30 pts
            </button>
          </div>
        </div>

        <div class="ste-box">
          <div class="ste-box-header"><span>⚡ Como Vencer Tudo em 4 Dias (Terça 03/11 a Sexta 06/11) com ASD-STE100</span></div>
          <ul class="ste-sentence-list">
            <li><strong>Divisão Cirúrgica (3 Unidades por Dia):</strong> Como os resumos já estão em <strong>ASD-STE100</strong> (sem textos longos), você domina 3 unidades em cerca de <strong>90 a 100 minutos por dia</strong> (3 blocos de 30 min).</li>
            <li><strong>Terça (03/11) e Quarta (04/11):</strong> Você zera 100% do <strong>Módulo I</strong> (Unidades 1 a 6).</li>
            <li><strong>Quinta (05/11) e Sexta (06/11):</strong> Você zera 100% do <strong>Módulo II</strong> (Unidades 7 a 12 — Mapa de Karnaugh, MUX, Somadores, Flip-Flops e Contadores) + <strong>Simulado de 30 pontos</strong> no papel!</li>
            <li><strong>Estratégia para Sábado (07/11 às 08h00):</strong> Nos primeiros 2 minutos de prova, anote no topo da folha os pesos binários (<code>128 64 32 16 8 4 2 1</code>) e a ordem das colunas do Mapa K (<code>00, 01, 11, 10</code>).</li>
          </ul>
        </div>

        <!-- Painel de Integração com Google Agenda -->
        <div style="background:var(--bg-elevated); border:1px solid var(--accent-primary); border-radius:var(--radius-md); padding:18px; margin:16px 0;">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:14px;">
            <div>
              <div style="font-weight:800; font-size:1.05rem; color:var(--accent-primary);">
                🗓️ Integrar Sprint (03/11 a 07/11) com sua Google Agenda
              </div>
              <p style="font-size:0.86rem; color:var(--text-secondary); margin-top:4px;">
                Escolha o horário em que você vai começar seus estudos de Terça (03/11) a Sexta (06/11) — a prova no Sábado (<strong>07/11</strong>) já está travada das <strong>08h00 às 09h40</strong>:
              </p>
            </div>
            <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
              <label style="font-size:0.86rem; font-weight:700;">
                Horário de Início:
                <input type="time" id="gcal-study-time" class="input-field" value="${this.state.studyTime || '19:30'}" style="padding:6px 10px; margin-left:6px;" onchange="window.SLD_APP.setStudyTime(this.value)">
              </label>
              <button class="btn btn-primary" onclick="window.SLD_APP.downloadCustomIcs()">
                📥 1. Baixar Arquivo .ICS Atualizado (03/11 a 07/11)
              </button>
              <a class="btn btn-secondary" href="https://calendar.google.com/calendar/u/0/r/settings/export" target="_blank" rel="noopener" style="text-decoration:none;">
                🔗 2. Abrir Importador do Google Agenda ↗
              </a>
            </div>
          </div>
          <div style="font-size:0.8rem; color:var(--text-muted); margin-top:10px; border-top:1px dashed var(--border-color); padding-top:8px;">
            <strong>Como atualizar sua agenda (leva 10 segundos):</strong> Clique em <em>"1. Baixar Arquivo .ICS Atualizado"</em> (ou use o arquivo <code>Plano_Estudos_SLD_Avaliacao_II.ics</code> já atualizado na sua pasta <code>SLD</code>) → Clique em <em>"2. Abrir Importador do Google Agenda"</em> → Importe! Ou clique em <strong>"📅 + Google Agenda"</strong> em cada um dos 5 cartões abaixo.
          </div>
        </div>

        <div style="margin-top:18px;">
          ${plan.map((item, idx) => {
            const isDone = !!(this.state.completedDays && this.state.completedDays[item.dayId]);
            const unitIds = item.unitIds || [item.unitId];

            return `
              <div style="background:var(--bg-elevated); border:1px solid ${isDone ? 'var(--success)' : 'var(--border-color)'}; border-left: 5px solid ${isDone ? 'var(--success)' : 'var(--accent-primary)'}; border-radius:var(--radius-md); padding:18px; margin-bottom:14px;">
                <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:10px; margin-bottom:10px;">
                  <div>
                    <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap; margin-bottom:4px;">
                      <span class="badge ${isDone ? 'badge-success' : 'badge-mod1'}" style="font-size:0.8rem;">📆 ${item.date}</span>
                      <span class="badge badge-warning">⏱️ Meta: ${item.duration}</span>
                      <span style="font-size:0.78rem; color:var(--text-muted); font-weight:600;">${item.week}</span>
                    </div>
                    <h3 style="font-size:1.1rem; font-weight:800; color:${isDone ? 'var(--success)' : 'var(--text-primary)'};">
                      ${item.title}
                    </h3>
                  </div>

                  <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
                    <button class="btn btn-sm btn-secondary" title="Adicionar este dia direto na sua Google Agenda" onclick="window.SLD_APP.openGoogleCalendarEvent('${item.dayId}')">
                      📅 + Google Agenda ↗
                    </button>
                    ${unitIds.map(uId => {
                      const uObj = window.SLD_DATA.units.find(u => u.id === uId);
                      const uSt = uObj ? this.getUnitStatus(uObj) : null;
                      const uNum = uId.replace('u', '');
                      return `
                        <button class="btn btn-sm btn-secondary" onclick="window.SLD_APP.navigate('unit:${uId}')">
                          📖 Unid. ${uNum} (${uSt ? uSt.correctQ + '/' + uSt.totalQ : ''})
                        </button>
                      `;
                    }).join("")}
                    <button class="btn btn-sm btn-secondary" onclick="window.SLD_APP.navigate('lab:${item.labId}')">
                      🔬 Abrir Lab
                    </button>
                    <button class="btn btn-sm ${isDone ? 'btn-success' : 'btn-primary'}" onclick="window.SLD_APP.togglePlanDay('${item.dayId}')">
                      ${isDone ? '✓ Dia Concluído!' : 'Marcar Dia Concluído'}
                    </button>
                  </div>
                </div>

                <ul class="ste-sentence-list" style="margin-top:8px;">
                  ${item.steTasks.map(t => `<li style="font-size:0.9rem;">${t}</li>`).join("")}
                </ul>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    `;
  },

  setStudyTime(val) {
    this.state.studyTime = val || "19:30";
    this.saveState();
  },

  formatIcsDateTime(isoDate, timeHHMM, addMinutes) {
    const [y, m, d] = isoDate.split("-").map(Number);
    const [hh, mm] = timeHHMM.split(":").map(Number);
    const totalMins = hh * 60 + mm + (addMinutes || 0);
    const finalH = Math.floor(totalMins / 60) % 24;
    const finalM = totalMins % 60;
    const pad = (n) => String(n).padStart(2, "0");
    return `${y}${pad(m)}${pad(d)}T${pad(finalH)}${pad(finalM)}00`;
  },

  openGoogleCalendarEvent(dayId) {
    const item = (window.SLD_DATA.studyPlan || []).find(d => d.dayId === dayId);
    if (!item) return;
    const startTime = item.fixedStart || this.state.studyTime || "19:30";
    const dtStart = this.formatIcsDateTime(item.isoDate, startTime, 0);
    const dtEnd = this.formatIcsDateTime(item.isoDate, startTime, item.durationMin || 45);
    const title = encodeURIComponent(`[SLD] ${item.title}`);
    const details = encodeURIComponent(
      `Plano de Estudos ASD-STE100 — Avaliação II (30 pts):\n\n` +
      item.steTasks.map((t, i) => `${i + 1}. ${t}`).join("\n")
    );
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dtStart}/${dtEnd}&details=${details}&ctz=America/Sao_Paulo`;
    window.open(url, "_blank", "noopener");
  },

  downloadCustomIcs() {
    const plan = window.SLD_DATA.studyPlan || [];
    const studyTime = this.state.studyTime || "19:30";
    let lines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//SLD Interativo ASD-STE100//Plano de Estudos Avaliacao II//PT-BR",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "X-WR-CALNAME:Plano de Estudos SLD - Avaliacao II (30 pts)",
      "X-WR-TIMEZONE:America/Sao_Paulo"
    ];

    plan.forEach(item => {
      const startT = item.fixedStart || studyTime;
      const dtStart = this.formatIcsDateTime(item.isoDate, startT, 0);
      const dtEnd = this.formatIcsDateTime(item.isoDate, startT, item.durationMin || 45);
      const desc = item.steTasks.map((t, i) => `${i + 1}. ${t}`).join("\\n");
      lines.push(
        "BEGIN:VEVENT",
        `UID:sld-ste100-${item.dayId}-${item.isoDate.replace(/-/g, "")}@sld.local`,
        "DTSTAMP:20261024T150000Z",
        `DTSTART;TZID=America/Sao_Paulo:${dtStart}`,
        `DTEND;TZID=America/Sao_Paulo:${dtEnd}`,
        `SUMMARY:[SLD] ${item.title}`,
        `DESCRIPTION:${desc}`,
        "BEGIN:VALARM",
        "TRIGGER:-PT30M",
        "ACTION:DISPLAY",
        `DESCRIPTION:Lembrete SLD: ${item.title}`,
        "END:VALARM",
        "END:VEVENT"
      );
    });

    lines.push("END:VCALENDAR");
    const blob = new Blob([lines.join("\r\n")], { type: "text/calendar;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "Plano_Estudos_SLD_Avaliacao_II.ics";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  },

  togglePlanDay(dayId) {
    if (!this.state.completedDays) this.state.completedDays = {};
    this.state.completedDays[dayId] = !this.state.completedDays[dayId];
    this.saveState();
    this.renderStudyPlan(document.getElementById("main-content-area"));
  },

  // ===========================================================================
  // VIEW 7: SIMULADO PRESENCIAL CRONOMETRADO (1h40 • 30 PONTOS)
  // ===========================================================================
  renderMockExam(container) {
    const questions = window.SLD_DATA.mockExam || [];
    let earnedPoints = 0;
    let answeredCount = 0;

    questions.forEach(q => {
      const ans = this.state.mockAnswers && this.state.mockAnswers[q.id];
      if (ans !== undefined) {
        answeredCount++;
        if (ans.correct) earnedPoints += q.points;
      }
    });

    const mins = Math.floor(this.mockSecondsLeft / 60);
    const secs = (this.mockSecondsLeft % 60).toString().padStart(2, "0");

    container.innerHTML = `
      <div class="card" style="border-color: var(--accent-primary);">
        <div class="card-header">
          <div>
            <span class="badge badge-warning">Simulado Oficial • Formato Presencial (07/11 • 08h00 às 09h40)</span>
            <h1 class="card-title" style="font-size:1.5rem; margin-top:8px;">
              📝 Simulado da Avaliação II (10 Questões × 3,0 pts = 30,0 Pontos)
            </h1>
            <p style="font-size:0.9rem; color:var(--text-secondary); margin-top:4px;">
              Pegue uma folha de papel e caneta. Resolva cada questão no rascunho antes de clicar na alternativa, simulando exatamente a manhã do dia <strong>07/11</strong>!
            </p>
          </div>

          <div style="background:var(--bg-elevated); padding:14px 18px; border-radius:var(--radius-md); border:1px solid var(--border-color); text-align:center; min-width:220px;">
            <div style="font-size:0.74rem; color:var(--text-muted); font-weight:700; text-transform:uppercase;">Tempo de Prova (1h40)</div>
            <div id="mock-timer-display" style="font-family:var(--font-mono); font-size:1.65rem; font-weight:900; color:var(--accent-primary); margin:4px 0;">
              ${mins}:${secs}
            </div>
            <div style="display:flex; gap:6px; justify-content:center;">
              <button class="btn btn-sm btn-primary" onclick="window.SLD_APP.toggleMockTimer()" id="mock-timer-btn">
                ${this.mockTimerRunning ? '⏸ Pausar' : '▶ Iniciar 1h40'}
              </button>
              <button class="btn btn-sm btn-secondary" onclick="window.SLD_APP.resetMockExam()">
                🔄 Reiniciar
              </button>
            </div>
          </div>
        </div>

        <div style="background:var(--bg-elevated); padding:14px 18px; border-radius:var(--radius-sm); border:1px solid var(--border-color); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:18px;">
          <div>
            <strong>Sua Pontuação Atual no Simulado:</strong>
            <span style="font-family:var(--font-mono); font-size:1.3rem; font-weight:900; color:var(--success); margin-left:8px;">
              ${earnedPoints.toFixed(1)} / 30,0 pontos
            </span>
            <span style="font-size:0.84rem; color:var(--text-muted); margin-left:8px;">
              (${answeredCount}/10 respondidas)
            </span>
          </div>
          <div style="font-size:0.84rem; color:var(--ste-badge);">
            💡 Meta de Segurança: atingir pelo menos <strong>24,0 / 30,0 pts (80%)</strong> até sexta-feira (06/11)!
          </div>
        </div>

        <div id="mock-questions-list">
          ${questions.map(q => this.renderMockQuestionCard(q)).join("")}
        </div>
      </div>
    `;
  },

  renderMockQuestionCard(q) {
    const saved = this.state.mockAnswers && this.state.mockAnswers[q.id];
    return `
      <div style="background:var(--bg-elevated); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:18px; margin-bottom:16px;" id="mock-box-${q.id}">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:8px;">
          <span class="badge badge-mod2">${q.topic}</span>
          <span class="badge badge-warning">Valor: ${q.points.toFixed(1)} pontos</span>
        </div>
        <div style="font-size:0.82rem; color:var(--ste-badge); margin-bottom:8px;">
          ✍️ <strong>Dica para o papel:</strong> ${q.paperTip}
        </div>
        <div style="font-weight:700; font-size:1rem; margin-bottom:12px;">
          ${q.question}
        </div>
        <div>
          ${q.options.map((opt, oIdx) => {
            let cls = "quiz-option";
            if (saved !== undefined) {
              if (oIdx === q.correct) cls += " correct";
              else if (oIdx === saved.selected && !saved.correct) cls += " wrong";
            }
            return `
              <button class="${cls}" onclick="window.SLD_APP.submitMockAnswer('${q.id}', ${oIdx})">
                <span style="font-family:var(--font-mono); font-weight:700;">(${String.fromCharCode(65 + oIdx)})</span>
                <span>${opt}</span>
              </button>
            `;
          }).join("")}
        </div>
        ${saved !== undefined ? `
          <div class="feedback-banner ${saved.correct ? 'ok' : 'err'}">
            <strong>${saved.correct ? '✅ +3,0 Pontos Garantidos!' : '❌ Atenção! Veja a resolução passo a passo em ASD-STE100:'}</strong><br>
            ${q.steExplanation}
          </div>
        ` : ""}
      </div>
    `;
  },

  submitMockAnswer(qId, oIdx) {
    const q = (window.SLD_DATA.mockExam || []).find(item => item.id === qId);
    if (!q) return;
    if (!this.state.mockAnswers) this.state.mockAnswers = {};
    this.state.mockAnswers[qId] = { selected: oIdx, correct: oIdx === q.correct };
    this.saveState();
    this.renderMockExam(document.getElementById("main-content-area"));
  },

  toggleMockTimer() {
    if (this.mockTimerRunning) {
      clearInterval(this.mockTimerInterval);
      this.mockTimerRunning = false;
    } else {
      this.mockTimerRunning = true;
      this.mockTimerInterval = setInterval(() => {
        if (this.mockSecondsLeft > 0) {
          this.mockSecondsLeft--;
          const disp = document.getElementById("mock-timer-display");
          if (disp) {
            const m = Math.floor(this.mockSecondsLeft / 60);
            const s = (this.mockSecondsLeft % 60).toString().padStart(2, "0");
            disp.textContent = `${m}:${s}`;
          }
        } else {
          clearInterval(this.mockTimerInterval);
          this.mockTimerRunning = false;
          alert("⏰ Tempo de 1h40 encerrado! Confira sua pontuação no simulado.");
        }
      }, 1000);
    }
    const btn = document.getElementById("mock-timer-btn");
    if (btn) btn.textContent = this.mockTimerRunning ? "⏸ Pausar" : "▶ Continuar";
  },

  resetMockExam() {
    clearInterval(this.mockTimerInterval);
    this.mockTimerRunning = false;
    this.mockSecondsLeft = 100 * 60;
    this.state.mockAnswers = {};
    this.saveState();
    this.renderMockExam(document.getElementById("main-content-area"));
  },

  // ===========================================================================
  // VIEW 8: LISTA DE EXERCÍCIOS A5 (20 QUESTÕES RESOLVIDAS PASSO A PASSO + AULA)
  // ===========================================================================
  renderListaA5(container) {
    const data = window.SLD_LISTA_A5;
    if (!data) return;
    const questions = data.questions || [];
    const doneCount = questions.filter(q => this.state.completedA5 && this.state.completedA5[q.id]).length;
    const pctDone = Math.round((doneCount / questions.length) * 100);

    container.innerHTML = `
      <div class="card" style="border-color: var(--success); background: linear-gradient(135deg, rgba(16,185,129,0.12), var(--bg-secondary));">
        <div class="card-header">
          <div>
            <span class="badge badge-success">📋 Lista Oficial A5 • Explicação Intuitiva Passo a Passo ("Aula Junto")</span>
            <h1 class="card-title" style="font-size:1.5rem; margin-top:8px;">
              ${data.meta.title}
            </h1>
            <p style="font-size:0.92rem; color:var(--text-secondary); margin-top:4px;">
              <strong>${data.meta.professor}</strong> — ${data.meta.instructions}
            </p>
          </div>
          <div style="text-align:right; min-width:190px;">
            <div style="font-size:1.25rem; font-weight:800; color:var(--success);">
              ${doneCount}/${questions.length} Blocos Concluídos (${pctDone}%)
            </div>
            <button class="btn btn-sm btn-secondary" style="margin-top:6px;" onclick="window.print()">
              🖨️ Imprimir / Salvar PDF
            </button>
          </div>
        </div>

        <!-- Índice Rápido Clicável das 20 Questões -->
        <div style="background:var(--bg-primary); padding:14px; border-radius:var(--radius-md); border:1px solid var(--border-color); margin-top:10px;">
          <div style="font-size:0.82rem; font-weight:700; color:var(--text-muted); margin-bottom:8px;">
            ⚡ PULAR DIRETO PARA A QUESTÃO (Clique para rolar até ela):
          </div>
          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            <button class="btn btn-sm btn-warning" onclick="document.getElementById('a5-karnaugh-master-guide').scrollIntoView({behavior:'smooth'})">
              🎯 Como Fazer Karnaugh e SOP (Aula + Simulador)
            </button>
            ${questions.map(q => {
              const isDone = !!(this.state.completedA5 && this.state.completedA5[q.id]);
              return `
                <button class="btn btn-sm ${isDone ? 'btn-success' : 'btn-secondary'}" onclick="document.getElementById('a5-card-${q.id}').scrollIntoView({behavior:'smooth'})">
                  ${isDone ? '✓ ' : ''}${q.number}
                </button>
              `;
            }).join("")}
          </div>
        </div>
      </div>

      <!-- =================================================================== -->
      <!-- GUIA DEFINITIVO + SIMULADOR PASSO A PASSO: KARNAUGH E SOP NA LISTA A5 -->
      <!-- =================================================================== -->
      <div class="card" id="a5-karnaugh-master-guide" style="border: 2px solid var(--accent-primary); background: linear-gradient(135deg, rgba(56,189,248,0.12), var(--bg-secondary));">
        <div style="margin-bottom:14px;">
          <span class="badge badge-warning" style="margin-bottom:6px;">🎯 AULA ESPECIAL • ENTENDA DE PRIMEIRA</span>
          <h2 style="font-size:1.38rem; font-weight:800; color:var(--text-primary);">
            Como Fazer o Mapa de Karnaugh e a Simplificação SOP (Em 3 Passos de Batalha Naval!)
          </h2>
          <p style="font-size:0.92rem; color:var(--text-secondary); margin-top:4px;">
            Esqueça os nomes difíceis por 2 minutos! Primeiro: <strong>o que significa SOP?</strong> É apenas a sigla em inglês para <strong>Soma de Produtos</strong> (<em>Sum of Products</em>), ou seja, várias multiplicações somadas, como <code>AB + AC + BC</code> ou <code>C + A'B</code>. Quando a Lista A5 pede <em>"d) Desenhe o mapa de Karnaugh"</em> e <em>"e) Simplifique a expressão SOP pelo mapa"</em>, você só precisa seguir estes <strong>3 passos</strong>:
          </p>
        </div>

        <div class="grid-3" style="margin-bottom:16px;">
          <!-- Passo 1 -->
          <div style="background:var(--bg-primary); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:14px;">
            <div style="font-weight:800; color:var(--accent-primary); font-size:0.98rem; margin-bottom:6px;">
              👣 Passo 1: Desenhe o Prédio Vazio
            </div>
            <p style="font-size:0.86rem; color:var(--text-secondary); line-height:1.55;">
              Para <strong>3 letras (<code>A, B, C</code>)</strong>, desenhe uma tabela de <strong>2 linhas</strong> por <strong>4 colunas</strong>:<br>
              • <strong>Nas 2 linhas (esquerda):</strong> coloque o <code>A</code> (Linha de cima: <strong><code>A = 0</code></strong> | Linha de baixo: <strong><code>A = 1</code></strong>).<br>
              • <strong>Nas 4 colunas (topo):</strong> coloque o par <code>BC</code> nesta ordem exata:<br>
              <strong><code>00</code> → <code>01</code> → <span style="color:var(--warning); text-decoration:underline;">11</span> → <code>10</code></strong><br>
              <em>⚠️ Única pegadinha: o <code>11</code> vem ANTES do <code>10</code> para mudar apenas 1 bit por coluna!</em>
            </p>
          </div>

          <!-- Passo 2 -->
          <div style="background:var(--bg-primary); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:14px;">
            <div style="font-weight:800; color:var(--success); font-size:0.98rem; margin-bottom:6px;">
              👣 Passo 2: Batalha Naval (Coloque os '1's)
            </div>
            <p style="font-size:0.86rem; color:var(--text-secondary); line-height:1.55;">
              Olhe para a sua Tabela-Verdade onde a saída deu <strong><code>1</code></strong> e coloque no cruzamento da <strong>Linha <code>A</code></strong> com a <strong>Coluna <code>BC</code></strong>:<br>
              • Linha <code>011</code> (<code>A=0, BC=11</code>) → vai na linha <code>A=0</code>, coluna <code>11</code>!<br>
              • Linha <code>101</code> (<code>A=1, BC=01</code>) → vai na linha <code>A=1</code>, coluna <code>01</code>!<br>
              • Linha <code>111</code> (<code>A=1, BC=11</code>) → vai na linha <code>A=1</code>, coluna <code>11</code>!<br>
              • Linha <code>110</code> (<code>A=1, BC=10</code>) → vai na linha <code>A=1</code>, coluna <code>10</code>!<br>
              Nos quadradinhos que sobrarem vazios, escreva <strong><code>0</code></strong>!
            </p>
          </div>

          <!-- Passo 3 -->
          <div style="background:var(--bg-primary); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:14px;">
            <div style="font-weight:800; color:var(--warning); font-size:0.98rem; margin-bottom:6px;">
              👣 Passo 3: "Quem Mudou Morre ❌!"
            </div>
            <p style="font-size:0.86rem; color:var(--text-secondary); line-height:1.55;">
              Circule os <code>1</code>s vizinhos (na horizontal ou vertical) em grupos de <strong>8 (Octeto)</strong>, <strong>4 (Quadra)</strong> ou <strong>2 (Dupla)</strong>. Para cada grupo circulado, pergunte para cada letra (<code>A, B, C</code>):<br>
              • <strong>A letra MUDOU de 0 para 1 dentro do grupo?</strong> → <strong>❌ ELA MORRE (corta fora)!</strong><br>
              • <strong>A letra NÃO MUDOU (ficou igual)?</strong> → <strong>✅ ELA SOBREVIVE!</strong> (Se ficou em <code>1</code> escreve normal <code>B</code>; se ficou em <code>0</code> escreve com barra <code>B'</code>).<br>
              Some os grupos com <code>+</code>: pronto, essa é a <strong>Simplificação SOP</strong>!
            </p>
          </div>
        </div>

        <!-- Simulador Interativo Embutido Direto na Página -->
        <div style="background:var(--bg-primary); border:1px solid var(--accent-primary); border-radius:var(--radius-md); padding:16px;">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; padding-bottom:12px; border-bottom:1px solid var(--border-color); margin-bottom:14px;">
            <div>
              <div style="font-weight:800; font-size:1.05rem; color:var(--accent-primary);">
                🕹️ Simulador Interativo: Máquina de Entender Karnaugh + SOP (Lista A5)
              </div>
              <div style="font-size:0.84rem; color:var(--text-secondary);">
                Escolha a questão da Lista A5 e clique nos botões dos grupos para ver no mapa <strong>quem morre (mudou)</strong> e <strong>quem sobrevive (vai para a resposta SOP)</strong>:
              </div>
            </div>
            <div style="display:flex; gap:8px; flex-wrap:wrap;" id="a5-kmap-case-btns">
              <button class="btn btn-sm btn-primary" onclick="window.SLD_APP.selectA5KmapCase('q1')">Questão 1.i e 1.ii (3 var)</button>
              <button class="btn btn-sm btn-secondary" onclick="window.SLD_APP.selectA5KmapCase('q3')">Questão 1.iii (3 var)</button>
              <button class="btn btn-sm btn-secondary" onclick="window.SLD_APP.selectA5KmapCase('q4')">Questão 1.iv (4 var)</button>
            </div>
          </div>

          <div class="grid-2" style="align-items:start;">
            <div>
              <div id="a5-kmap-subtitle" style="font-size:0.86rem; font-weight:700; color:var(--text-secondary); margin-bottom:8px;"></div>
              <div id="a5-kmap-table-holder" style="overflow-x:auto;"></div>
              <div style="font-size:0.8rem; font-weight:700; color:var(--text-muted); margin:10px 0 6px;">
                👇 Clique em cada grupo circulado para inspecionar:
              </div>
              <div id="a5-kmap-group-btns" style="display:flex; gap:8px; flex-wrap:wrap;"></div>
            </div>

            <div style="background:var(--bg-elevated); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:14px;">
              <div style="font-size:0.76rem; font-weight:800; text-transform:uppercase; color:var(--accent-primary); margin-bottom:4px;">
                Raio-X do Grupo Selecionado ("Quem Mudou Morre / Quem Ficou Sobrevive")
              </div>
              <div id="a5-kmap-explain-title" style="font-size:0.98rem; font-weight:800; margin-bottom:10px;"></div>
              <div id="a5-kmap-explain-vars"></div>
              <div style="margin-top:12px; padding-top:10px; border-top:1px dashed var(--border-color); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
                <span style="font-size:0.85rem; color:var(--text-secondary); font-weight:700;">Expressão SOP Final (Soma dos grupos):</span>
                <span id="a5-kmap-sop-final" style="font-family:var(--font-mono); font-size:1.05rem; font-weight:900; color:var(--success); background:rgba(16,185,129,0.12); padding:4px 10px; border-radius:6px; border:1px solid var(--success);"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Cartões Passo a Passo das 20 Questões -->
      <div>
        ${questions.map(q => {
          const isDone = !!(this.state.completedA5 && this.state.completedA5[q.id]);
          return `
            <div class="card" id="a5-card-${q.id}" style="border-left: 5px solid ${isDone ? 'var(--success)' : 'var(--accent-primary)'};">
              <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:10px; margin-bottom:12px;">
                <div>
                  <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap; margin-bottom:6px;">
                    <span class="badge ${isDone ? 'badge-success' : 'badge-mod2'}" style="font-size:0.85rem;">${q.number}</span>
                    <span class="badge badge-warning">${q.badge}</span>
                  </div>
                  <div style="font-weight:700; font-size:1.03rem; color:var(--text-primary); white-space:pre-line; background:var(--bg-elevated); padding:12px 14px; border-radius:8px; border:1px solid var(--border-color);">
                    ${q.enunciado}
                  </div>
                </div>
                <button class="btn btn-sm ${isDone ? 'btn-success' : 'btn-primary'}" onclick="window.SLD_APP.toggleA5Item('${q.id}')">
                  ${isDone ? '✓ Já entendi e passei pro caderno!' : 'Marcar como Feita no Caderno'}
                </button>
              </div>

              <!-- 1. Mini-Aula Intuitiva -->
              <div class="ste-box" style="margin-top:12px;">
                <div class="ste-box-header">
                  <span>${q.intuitionTitle}</span>
                </div>
                <div style="font-size:0.93rem; line-height:1.6;">
                  ${q.intuitionHTML}
                </div>
              </div>

              <!-- 2. Passo a Passo Mastigado -->
              <div style="margin-top:14px;">
                ${q.stepByStepHTML}
              </div>

              <!-- 3. Pronto para Passar a Limpo no Caderno -->
              <div class="feedback-banner ok" style="margin-top:16px; font-size:0.92rem; line-height:1.65;">
                ${q.notebookReadyHTML}
              </div>
            </div>
          `;
        }).join("")}
      </div>
    `;

    this.renderA5KmapWidget();
  },

  a5KmapState: {
    caseKey: "q1",
    groupIdx: 0
  },

  selectA5KmapCase(key) {
    this.a5KmapState.caseKey = key;
    this.a5KmapState.groupIdx = 0;
    this.renderA5KmapWidget();
  },

  selectA5KmapGroup(idx) {
    this.a5KmapState.groupIdx = idx;
    this.renderA5KmapWidget();
  },

  renderA5KmapWidget() {
    const CASES = {
      q1: {
        subtitle: "Questão 1.i e 1.ii — Saída vale '1' nas linhas 011 (m₃), 101 (m₅), 110 (m₆) e 111 (m₇):",
        type: 3,
        sop: "f = BC + AC + AB",
        cells: [
          { r: 0, c: 0, m: "m₀", val: 0 },
          { r: 0, c: 1, m: "m₁", val: 0 },
          { r: 0, c: 2, m: "m₃", val: 1 },
          { r: 0, c: 3, m: "m₂", val: 0 },
          { r: 1, c: 0, m: "m₄", val: 0 },
          { r: 1, c: 1, m: "m₅", val: 1 },
          { r: 1, c: 2, m: "m₇", val: 1 },
          { r: 1, c: 3, m: "m₆", val: 1 }
        ],
        groups: [
          {
            label: "1. Dupla Vertical (m₃ e m₇)",
            bg: "rgba(56, 189, 248, 0.28)",
            border: "2px solid #38bdf8",
            members: ["m₃", "m₇"],
            title: "Analisando a Dupla Vertical (m₃ em cima + m₇ embaixo):",
            vars: [
              { name: "Variável A", desc: "Em m₃ vale 0 e em m₇ vale 1 → MUDOU!", status: "❌ Corta o A", ok: false },
              { name: "Variável B", desc: "Nos dois está na coluna BC=11 (B vale 1 fixo!)", status: "✅ Fica B", ok: true },
              { name: "Variável C", desc: "Nos dois está na coluna BC=11 (C vale 1 fixo!)", status: "✅ Fica C", ok: true }
            ],
            term: "Termo sobrevivente deste grupo = BC"
          },
          {
            label: "2. Dupla Horizontal (m₅ e m₇)",
            bg: "rgba(16, 185, 129, 0.28)",
            border: "2px solid #10b981",
            members: ["m₅", "m₇"],
            title: "Analisando a Dupla Horizontal (m₅ + m₇ na linha A=1):",
            vars: [
              { name: "Variável A", desc: "Os dois estão na linha A=1 (não mudou!)", status: "✅ Fica A", ok: true },
              { name: "Variável B", desc: "Na col. 01 B=0 e na col. 11 B=1 → MUDOU!", status: "❌ Corta o B", ok: false },
              { name: "Variável C", desc: "Na col. 01 C=1 e na col. 11 C=1 (não mudou!)", status: "✅ Fica C", ok: true }
            ],
            term: "Termo sobrevivente deste grupo = AC"
          },
          {
            label: "3. Dupla Horizontal (m₇ e m₆)",
            bg: "rgba(245, 158, 11, 0.30)",
            border: "2px solid #f59e0b",
            members: ["m₇", "m₆"],
            title: "Analisando a Dupla Horizontal (m₇ + m₆ na linha A=1):",
            vars: [
              { name: "Variável A", desc: "Os dois estão na linha A=1 (não mudou!)", status: "✅ Fica A", ok: true },
              { name: "Variável B", desc: "Na col. 11 B=1 e na col. 10 B=1 (não mudou!)", status: "✅ Fica B", ok: true },
              { name: "Variável C", desc: "Na col. 11 C=1 e na col. 10 C=0 → MUDOU!", status: "❌ Corta o C", ok: false }
            ],
            term: "Termo sobrevivente deste grupo = AB"
          }
        ]
      },
      q3: {
        subtitle: "Questão 1.iii — Saída vale '1' em m₁(001), m₂(010), m₃(011), m₅(101) e m₇(111):",
        type: 3,
        sop: "f = C + A'B",
        cells: [
          { r: 0, c: 0, m: "m₀", val: 0 },
          { r: 0, c: 1, m: "m₁", val: 1 },
          { r: 0, c: 2, m: "m₃", val: 1 },
          { r: 0, c: 3, m: "m₂", val: 1 },
          { r: 1, c: 0, m: "m₄", val: 0 },
          { r: 1, c: 1, m: "m₅", val: 1 },
          { r: 1, c: 2, m: "m₇", val: 1 },
          { r: 1, c: 3, m: "m₆", val: 0 }
        ],
        groups: [
          {
            label: "1. Quadra (m₁, m₃, m₅, m₇)",
            bg: "rgba(16, 185, 129, 0.28)",
            border: "2px solid #10b981",
            members: ["m₁", "m₃", "m₅", "m₇"],
            title: "Analisando a Quadra de 4 células (colunas 01 e 11):",
            vars: [
              { name: "Variável A", desc: "Pega a linha A=0 e a linha A=1 → MUDOU!", status: "❌ Corta o A", ok: false },
              { name: "Variável B", desc: "Pega a coluna 01 (B=0) e a 11 (B=1) → MUDOU!", status: "❌ Corta o B", ok: false },
              { name: "Variável C", desc: "Tanto na col. 01 quanto na 11, C vale 1 fixo!", status: "✅ Fica C", ok: true }
            ],
            term: "Termo sobrevivente da Quadra = C"
          },
          {
            label: "2. Dupla (m₃ e m₂)",
            bg: "rgba(56, 189, 248, 0.28)",
            border: "2px solid #38bdf8",
            members: ["m₃", "m₂"],
            title: "Analisando a Dupla Horizontal (m₃ + m₂ na linha A=0):",
            vars: [
              { name: "Variável A", desc: "Ficou fixa na linha A = 0 (como é zero, leva barra!)", status: "✅ Fica A'", ok: true },
              { name: "Variável B", desc: "Nas colunas 11 e 10, o B vale 1 fixo!", status: "✅ Fica B", ok: true },
              { name: "Variável C", desc: "Na col. 11 C=1 e na col. 10 C=0 → MUDOU!", status: "❌ Corta o C", ok: false }
            ],
            term: "Termo sobrevivente da Dupla = A'B"
          }
        ]
      },
      q4: {
        subtitle: "Questão 1.iv (4 Variáveis) — '1' em m₂, m₆, m₇ e de m₈ até m₁₅:",
        type: 4,
        sop: "f = A + BC + CD'",
        cells: [
          { r: 0, c: 0, m: "m₀", val: 0 }, { r: 0, c: 1, m: "m₁", val: 0 }, { r: 0, c: 2, m: "m₃", val: 0 }, { r: 0, c: 3, m: "m₂", val: 1 },
          { r: 1, c: 0, m: "m₄", val: 0 }, { r: 1, c: 1, m: "m₅", val: 0 }, { r: 1, c: 2, m: "m₇", val: 1 }, { r: 1, c: 3, m: "m₆", val: 1 },
          { r: 2, c: 0, m: "m₁₂", val: 1 }, { r: 2, c: 1, m: "m₁₃", val: 1 }, { r: 2, c: 2, m: "m₁₅", val: 1 }, { r: 2, c: 3, m: "m₁₄", val: 1 },
          { r: 3, c: 0, m: "m₈", val: 1 }, { r: 3, c: 1, m: "m₉", val: 1 }, { r: 3, c: 2, m: "m₁₁", val: 1 }, { r: 3, c: 3, m: "m₁₀", val: 1 }
        ],
        groups: [
          {
            label: "1. Octeto (8 células: m₈..m₁₅)",
            bg: "rgba(16, 185, 129, 0.28)",
            border: "2px solid #10b981",
            members: ["m₁₂", "m₁₃", "m₁₅", "m₁₄", "m₈", "m₉", "m₁₁", "m₁₀"],
            title: "Octeto nas 2 linhas de baixo (AB = 11 e AB = 10):",
            vars: [
              { name: "Variável A", desc: "Nas duas linhas de baixo, A = 1 sem mudar!", status: "✅ Fica A", ok: true },
              { name: "Variáveis B, C, D", desc: "Todas mudam entre 0 e 1 dentro das 8 células!", status: "❌ Cortam B, C, D", ok: false }
            ],
            term: "Termo sobrevivente do Octeto = A"
          },
          {
            label: "2. Quadra (m₇, m₆, m₁₅, m₁₄)",
            bg: "rgba(245, 158, 11, 0.30)",
            border: "2px solid #f59e0b",
            members: ["m₇", "m₆", "m₁₅", "m₁₄"],
            title: "Quadra no meio (linhas AB=01,11 e colunas CD=11,10):",
            vars: [
              { name: "A e D", desc: "A muda (0 e 1) e D muda (1 e 0) → somem!", status: "❌ Cortam A e D", ok: false },
              { name: "B e C", desc: "B fica fixo em 1 e C fica fixo em 1!", status: "✅ Fica BC", ok: true }
            ],
            term: "Termo sobrevivente da Quadra = BC"
          },
          {
            label: "3. Quadra Coluna 10 (m₂, m₆, m₁₄, m₁₀)",
            bg: "rgba(56, 189, 248, 0.28)",
            border: "2px solid #38bdf8",
            members: ["m₂", "m₆", "m₁₄", "m₁₀"],
            title: "Quadra na última coluna inteira (CD = 10):",
            vars: [
              { name: "A e B", desc: "Passa pelas 4 linhas, então A e B mudam tudo!", status: "❌ Cortam A e B", ok: false },
              { name: "C e D", desc: "Coluna fixa CD = 10 (C=1 normal e D=0 barrado!)", status: "✅ Fica CD'", ok: true }
            ],
            term: "Termo sobrevivente da Coluna = CD'"
          }
        ]
      }
    };

    const subEl = document.getElementById("a5-kmap-subtitle");
    if (!subEl) return;

    const key = this.a5KmapState.caseKey || "q1";
    const data = CASES[key];
    const grp = data.groups[this.a5KmapState.groupIdx] || data.groups[0];

    // Atualiza botões de seleção de caso
    const caseBtns = document.getElementById("a5-kmap-case-btns");
    if (caseBtns) {
      caseBtns.innerHTML = [
        { k: "q1", label: "Questão 1.i e 1.ii (3 var)" },
        { k: "q3", label: "Questão 1.iii (3 var)" },
        { k: "q4", label: "Questão 1.iv (4 var)" }
      ].map(b => `
        <button class="btn btn-sm ${b.k === key ? 'btn-primary' : 'btn-secondary'}" onclick="window.SLD_APP.selectA5KmapCase('${b.k}')">
          ${b.label}
        </button>
      `).join("");
    }

    subEl.textContent = data.subtitle;
    document.getElementById("a5-kmap-sop-final").textContent = data.sop;

    const cols = ["00", "01", "11", "10"];
    const rows = data.type === 3 ? ["A = 0", "A = 1"] : ["AB = 00", "AB = 01", "AB = 11", "AB = 10"];
    const corner = data.type === 3 ? "A \\ BC" : "AB \\ CD";

    let tableHTML = `<table class="ste-table" style="text-align:center;"><thead><tr><th>${corner}</th>`;
    cols.forEach(c => { tableHTML += `<th>${c}</th>`; });
    tableHTML += `</tr></thead><tbody>`;

    rows.forEach((rLabel, rIdx) => {
      tableHTML += `<tr><th>${rLabel}</th>`;
      for (let cIdx = 0; cIdx < 4; cIdx++) {
        const cell = data.cells.find(x => x.r === rIdx && x.c === cIdx);
        const inGrp = grp.members.includes(cell.m);
        const style = inGrp ? `background:${grp.bg}; border:${grp.border};` : "";
        tableHTML += `<td style="${style} padding:10px;">
          <div style="font-size:1.05rem; font-weight:900; color:${cell.val === 1 ? 'var(--success)' : 'var(--text-muted)'};">${cell.val}</div>
          <div style="font-size:0.72rem; color:var(--text-muted);">${cell.m}</div>
        </td>`;
      }
      tableHTML += `</tr>`;
    });
    tableHTML += `</tbody></table>`;
    document.getElementById("a5-kmap-table-holder").innerHTML = tableHTML;

    document.getElementById("a5-kmap-group-btns").innerHTML = data.groups.map((g, i) => `
      <button class="btn btn-sm ${i === this.a5KmapState.groupIdx ? 'btn-primary' : 'btn-secondary'}" onclick="window.SLD_APP.selectA5KmapGroup(${i})">
        ${g.label}
      </button>
    `).join("");

    document.getElementById("a5-kmap-explain-title").textContent = grp.title;
    document.getElementById("a5-kmap-explain-vars").innerHTML = grp.vars.map(v => `
      <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; padding:8px 10px; margin-bottom:6px; background:var(--bg-primary); border:1px solid var(--border-color); border-radius:6px; font-size:0.84rem;">
        <div><strong>${v.name}:</strong> <span style="color:var(--text-secondary);">${v.desc}</span></div>
        <span style="font-family:var(--font-mono); font-weight:800; color:${v.ok ? 'var(--success)' : 'var(--danger)'}; white-space:nowrap;">${v.status}</span>
      </div>
    `).join("") + `
      <div style="margin-top:8px; padding:8px 12px; background:rgba(16,185,129,0.14); border:1px solid var(--success); border-radius:6px; text-align:center; font-family:var(--font-mono); font-weight:800; color:var(--success); font-size:0.9rem;">
        ${grp.term}
      </div>
    `;
  },

  toggleA5Item(qId) {
    if (!this.state.completedA5) this.state.completedA5 = {};
    this.state.completedA5[qId] = !this.state.completedA5[qId];
    this.saveState();
    this.renderListaA5(document.getElementById("main-content-area"));
  },

  // ===========================================================================
  // VIEW 9: GUIA PASSO A PASSO DOS 6 CIRCUITOS OBRIGATÓRIOS NO LOGISIM
  // ===========================================================================
  renderLogisimGuide(container) {
    const data = window.SLD_LOGISIM;
    if (!data) return;
    const circuits = data.circuits || [];
    const doneCount = circuits.filter(c => this.state.completedLogisim && this.state.completedLogisim[c.id]).length;
    const pctDone = Math.round((doneCount / circuits.length) * 100);

    container.innerHTML = `
      <div class="card" style="border-color: var(--accent-primary); background: linear-gradient(135deg, rgba(56,189,248,0.14), var(--bg-secondary));">
        <div class="card-header">
          <div>
            <span class="badge badge-mod1">🛠️ Prática no Logisim • Conteúdo Programático Módulo II</span>
            <h1 class="card-title" style="font-size:1.5rem; margin-top:8px;">
              ${data.meta.title}
            </h1>
            <p style="font-size:0.92rem; color:var(--text-secondary); margin-top:4px;">
              ${data.meta.subtitle}
            </p>
          </div>
          <div style="text-align:right; min-width:190px;">
            <div style="font-size:1.25rem; font-weight:800; color:var(--accent-primary);">
              ${doneCount}/${circuits.length} Circuitos Montados (${pctDone}%)
            </div>
          </div>
        </div>

        <div class="ste-box" style="margin-top:8px;">
          <div class="ste-box-header">
            <span>⚡ O Segredo do Logisim que Economiza Horas: "Projeto → Analisar Circuito" (Analyze Circuit)</span>
          </div>
          <p style="font-size:0.9rem; color:var(--text-secondary); margin-bottom:6px;">
            Nos 5 primeiros circuitos (combinacionais), você <strong>não precisa desenhar porta por porta na mão</strong> se não quiser! No menu superior do Logisim, clique em <strong><code>Projeto → Analisar Circuito</code></strong> (ou <code>Janela → Análise Combinacional</code>):
          </p>
          <ol class="ste-sentence-list" style="font-size:0.88rem;">
            <li>Na aba <strong>Entradas (Inputs)</strong>, digite os nomes dos pinos de entrada que demos abaixo.</li>
            <li>Na aba <strong>Saídas (Outputs)</strong>, digite os nomes dos pinos de saída.</li>
            <li>Na aba <strong>Expressão (Expression)</strong>, copie e cole a fórmula pronta da caixa verde abaixo e clique em <strong><code>Construir Circuito (Build Circuit)</code></strong>: o Logisim desenha todas as portas e fios sozinho sem nenhum erro!</li>
            <li>Além disso, já salvamos na sua pasta <code>SLD</code> o arquivo <strong><code>Circuitos_Modulo2_Logisim.circ</code></strong> para você abrir direto no Logisim (<code>Arquivo → Abrir</code>)!</li>
          </ol>
        </div>

        <!-- Índice Rápido dos 6 Circuitos -->
        <div style="background:var(--bg-primary); padding:14px; border-radius:var(--radius-md); border:1px solid var(--border-color); margin-top:12px;">
          <div style="font-size:0.82rem; font-weight:700; color:var(--text-muted); margin-bottom:8px;">
            ⚡ ESCOLHA O CIRCUITO PARA VER O PASSO A PASSO:
          </div>
          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            ${circuits.map(c => {
              const isDone = !!(this.state.completedLogisim && this.state.completedLogisim[c.id]);
              return `
                <button class="btn btn-sm ${isDone ? 'btn-success' : 'btn-secondary'}" onclick="document.getElementById('log-card-${c.id}').scrollIntoView({behavior:'smooth'})">
                  ${isDone ? '✓ ' : ''}${c.title.split('(')[0]}
                </button>
              `;
            }).join("")}
          </div>
        </div>
      </div>

      <div>
        ${circuits.map(c => {
          const isDone = !!(this.state.completedLogisim && this.state.completedLogisim[c.id]);
          return `
            <div class="card" id="log-card-${c.id}" style="border-left: 5px solid ${isDone ? 'var(--success)' : 'var(--accent-primary)'};">
              <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:10px; margin-bottom:10px;">
                <div>
                  <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap; margin-bottom:6px;">
                    <span class="badge ${isDone ? 'badge-success' : 'badge-mod1'}">${c.number}</span>
                    <span class="badge badge-warning">${c.pages}</span>
                  </div>
                  <h2 style="font-size:1.25rem; font-weight:800;">${c.title}</h2>
                  <p style="font-size:0.9rem; color:var(--text-secondary); margin-top:4px;">${c.summary}</p>
                </div>
                <button class="btn btn-sm ${isDone ? 'btn-success' : 'btn-primary'}" onclick="window.SLD_APP.toggleLogisimItem('${c.id}')">
                  ${isDone ? '✓ Circuito Montado no Logisim!' : 'Marcar como Montado'}
                </button>
              </div>

              <div class="ste-box">
                ${c.intuitionHTML}
              </div>

              <div class="feedback-banner ok" style="margin:14px 0; font-size:0.9rem; line-height:1.65;">
                ${c.autoLogisimHTML}
              </div>

              <div>
                ${c.manualStepsHTML}
              </div>
            </div>
          `;
        }).join("")}
      </div>
    `;
  },

  toggleLogisimItem(cId) {
    if (!this.state.completedLogisim) this.state.completedLogisim = {};
    this.state.completedLogisim[cId] = !this.state.completedLogisim[cId];
    this.saveState();
    this.renderLogisimGuide(document.getElementById("main-content-area"));
  },

  openSteModal() {
    const m = document.getElementById("ste-modal");
    if (m) m.classList.add("open");
  },

  closeSteModal() {
    const m = document.getElementById("ste-modal");
    if (m) m.classList.remove("open");
  }
};

window.addEventListener("DOMContentLoaded", () => {
  window.SLD_APP.init();
});
