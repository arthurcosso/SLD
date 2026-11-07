# ⚡ Sistemas Lógicos Digitais (SLD) — Plataforma Interativa de Estudos

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Online-brightgreen?style=flat-square&logo=github)](https://arthurcosso.github.io/SLD/)
[![Logisim](https://img.shields.io/badge/Logisim-Circuitos%20Validados-blue?style=flat-square)](A4_Circuitos_Implementados.circ)
[![Didática ASD-STE100](https://img.shields.io/badge/Did%C3%A1tica-ASD--STE100-purple?style=flat-square)](#-método-didático-asd-ste100)

Plataforma interativa completa desenvolvida para revisão, simulação e estudo prático de **Sistemas Lógicos Digitais (SLD)**, cobrindo o Módulo I (Circuitos Combinacionais) e o Módulo II (Circuitos MSI e Sequenciais).

🌐 **Acesse online:** [https://arthurcosso.github.io/SLD/](https://arthurcosso.github.io/SLD/)

---

## 📚 Conteúdo da Plataforma

### 1. Resumos e Aulas Interativas
* **Módulo I:** Álgebra Booleana, Teoremas de De Morgan, Portas Lógicas, Formas Canônicas (SOP / POS), Mapas de Karnaugh de 2, 3 e 4 variáveis com agrupamentos passo a passo.
* **Módulo II:** Circuitos Aritméticos (Meio-Somador, Somador Completo de 1 e 4 bits), Comparadores de Magnitude, Codificadores/Decodificadores BCD e 7 Segmentos, Conversores de Código (Binário ↔ Gray), Multiplexadores (MUX) e Demultiplexadores (DEMUX), Latches, Flip-Flops (SR, JK, D, T) e Contadores Síncronos/Assíncronos.

### 2. Caderno de Resoluções da Lista de Exercícios (Módulo 2 / A4 / A5)
Resoluções detalhadas com intuitividade passo a passo e resumos prontos para caderno:
* **Questão 1:** Meio-somador e Somador Completo de 1 bit (via portas básicas e via XOR).
* **Questão 2:** Somador Completo de 4 bits em cascata (Ripple-Carry Adder).
* **Questão 3:** Comparador de 3 bits com portas lógicas (saída 1 se iguais, 0 se diferentes).
* **Questão 4:** Decodificador para display de 7 segmentos catodo comum (segmentos $a$ até $g$).
* **Questão 5:** Conversores de código Binário para Gray e Gray para Binário de 3 bits.
* **Questão 6:** Contador Crescente/Decrescente de 0 a 7 com Flip-Flops e chave Up/Down.
* **Questão 7:** Implementação de função via Multiplexador 8:1 ($F = \sum m(0, 2, 4)$).
* **Questões 8 a 12:** Teoria essencial de Latches, Flip-Flops, disparo por borda e aplicações.

---

## 🔌 Circuitos Logisim Implementados

O arquivo [`A4_Circuitos_Implementados.circ`](A4_Circuitos_Implementados.circ) contém todos os circuitos montados e validados no Logisim com **0 fios vermelhos** (erros de contenção) e **0 fios azuis** (linhas flutuantes):

| Subcircuito | Descrição |
| :--- | :--- |
| `MEIO-SOMADOR` | Half Adder ($S = A \oplus B$, $C_{out} = A \cdot B$) |
| `SOMADOR-COMPLETO-1BIT` | Full Adder com portas AND, OR e XOR |
| `SOMADOR-COMPLETO-4BIT` | Somador de 4 bits em cascata ($A_3..A_0 + B_3..B_0$) |
| `COMPARADOR 3 BITS` | Comparador de igualdade ($A = B$) com portas XNOR e AND |
| `DECODIFICADOR-7SEG` | Decodificador BCD para Display de 7 segmentos ($a..g$) |
| `BINARIO-PARA-GRAY` | Conversor de 3 bits Binário → Gray |
| `GRAY-PARA-BINARIO` | Conversor de 3 bits Gray → Binário |
| `CONTADOR CRESCENTE/DECRESCENTE` | Contador de 3 bits com sinal Up/Down |
| `MUX-MINTERMOS-0-2-4` | MUX 8:1 com seleção 3 bits para mintermos 0, 2 e 4 |

### Como Abrir no Logisim:
1. Baixe e abra o **Logisim 2.7.1** (ou Logisim Evolution).
2. Abra o arquivo `A4_Circuitos_Implementados.circ`.
3. Navegue pela árvore lateral esquerda e dê duplo clique no circuito desejado.
4. Pressione `Ctrl + K` (Simulação Habilitada) e use a ferramenta **Poke** (`Ctrl + 1`) para interagir com as chaves.

---

## 🎯 Método Didático ASD-STE100
Esta plataforma aplica regras inspiradas na norma internacional **ASD-STE100 (Simplified Technical English)** para garantir máximo entendimento sem ambiguidades:
1. **Frases Curtas:** Instruções diretas e objetivas.
2. **Voz Ativa no Imperativo:** Ações claras de projeto (*"Agrupe em potências de 2", "Ligue VCC nos mintermos ativos"*).
3. **Vocabulário Controlado:** Foco na diferenciação exata de conceitos fáceis de confundir em provas.
4. **Laboratórios Interativos:** Simuladores visuais inline para fixação imediata do conhecimento.

---

## 👤 Autor
* **Arthur Cosso**
* Curso: Engenharia / Ciência da Computação — Sistemas Lógicos Digitais
* GitHub: [@arthurcosso](https://github.com/arthurcosso)
