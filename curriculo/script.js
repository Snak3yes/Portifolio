(function () {
"use strict";
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
// Campo a preencher: aparece destacado na prévia e entra na lista de pendências.
const T = (label, text) => `<span class="todo" data-todo="${label}">${text}</span>`;

/* ================= CONTEÚDO =================
   Edite aqui. Textos com T("rótulo", "texto") são pendências da prévia. */

const EVENTS = [
  { d: T("Ano de conclusão do Técnico em Eletrônica", "aaaa"), t: "Técnico em Eletrônica", c: "ok", cl: "concluído", ev: "var(--c-form)",
    x: "Base em eletrônica analógica e digital, instrumentação e manutenção. Formação que abriu a entrada na indústria." },
  { d: T("Anos cursados em Engenharia de Computação", "aaaa – aaaa"), t: "Engenharia de Computação", c: "", cl: "6 períodos", ev: "var(--c-form)",
    x: "Seis períodos cursados: programação, sistemas digitais, arquitetura de computadores e cálculo. Depois, migração para ADS para focar em desenvolvimento." },
  { d: T("Período na Engenharia de Testes", "aaaa"), t: "Digiboard · Engenharia de Testes", c: "", cl: "Digiboard", ev: "var(--c-exp)",
    x: "Validação técnica de produtos e processos de teste na fábrica." },
  { d: T("Período na Manutenção de Jigs", "aaaa"), t: "Digiboard · Manutenção de Jigs", c: "", cl: "Digiboard", ev: "var(--c-exp)",
    x: "Manutenção dos jigs de teste da linha para manter a produção rodando." },
  { d: T("Início no CTD", "aaaa"), t: "CTD · Técnico Eletrônico JR", c: "info", cl: "atual", ev: "var(--c-perfil)",
    x: "Desenvolvimento e manutenção do software de máquinas de inspeção e automação no Centro de Transformação Digital." },
  { d: T("Previsão de conclusão do ADS", "previsão aaaa"), t: "Análise e Desenvolvimento de Sistemas", c: "run", cl: "em andamento", ev: "var(--c-form)",
    x: "Graduação em andamento, com foco em engenharia de software aplicada à indústria." }
];

const EXP = [
  { id: "exp-ctd", per: T("Início no CTD", "mm/aaaa") + " – atual", k: "atual",
    t: "Técnico Eletrônico JR", org: "Digiboard Eletrônica da Amazônia · Centro de Transformação Digital (CTD)",
    a: "Desenvolvo e mantenho o software de máquinas de inspeção visual e automação (Python, PyQt6, OpenCV, CLP Delta). Analiso falhas de produção pelos logs, corrijo, testo em simulação e preparo o build para a máquina. Escrevo manuais operacionais e relatórios de alterações para o cliente interno.",
    r: "Inspetora de Periféricos entregue ao Controle de Qualidade e mantida em produção; participação direta em 7 projetos do CTD." },
  { id: "exp-jigs", per: T("Período na Manutenção de Jigs", "mm/aaaa – mm/aaaa"), k: "Digiboard",
    t: "Manutenção de Jigs", org: "Digiboard Eletrônica da Amazônia",
    a: "Manutenção dos jigs de teste da linha de produção, garantindo estabilidade e continuidade da operação produtiva. " + T("Detalhes da função de Manutenção de Jigs", "Descreva os tipos de jig, falhas mais comuns e ferramentas usadas."),
    r: T("Resultados na Manutenção de Jigs", "Algum número? (ex.: jigs atendidos por mês, redução de parada de linha)") },
  { id: "exp-testes", per: T("Período na Engenharia de Testes", "mm/aaaa – mm/aaaa"), k: "Digiboard",
    t: "Engenharia de Testes", org: "Digiboard Eletrônica da Amazônia",
    a: "Atividades de engenharia de testes, contribuindo com qualidade e validação técnica dos produtos. " + T("Detalhes da função de Engenharia de Testes", "Quais produtos/placas, que testes (ICT, funcional, burn-in) e quais equipamentos."),
    r: T("Resultados na Engenharia de Testes", "Algum número ou entrega marcante?") }
];

const AREAS = [
  { id: "all", n: "Todos" },
  { id: "vis", n: "Visão computacional", c: "var(--c-vis)" },
  { id: "aut", n: "Automação e CLP", c: "var(--c-aut)" },
  { id: "doc", n: "Documentação", c: "var(--c-doc)" }
];

const PROJ = [
  { id: "p-inspetora", ar: ["vis", "aut", "doc"], per: "03/2026 – atual", role: "equipe", st: "entregue ao CQ · em produção", stc: "ok",
    t: "Inspetora de Periféricos", sub: "Máquina de inspeção visual · cliente: Controle de Qualidade (CQ)",
    o: "Inspeciona placas periféricas com 4 câmeras (top, bottom, side e fiducial), robô XYZ com garra e bandejas de entrada e saída OK/NG, controlado por CLP Delta.",
    a: "Funções de inspeção e de ciclo, correções após a entrega a partir dos logs da máquina, manual operacional e relatórios de alterações.",
    s: ["Python", "PyQt6", "OpenCV", "CLP Delta", "Modbus", "pytest", "IA"],
    e: ["Correção do HOME falso que parava o ciclo na bandeja OK: causa encontrada nos logs e reproduzida em teste",
        "Aviso visual e sonoro de fim de lote e de bandeja cheia para o operador",
        "Evidências salvas e consulta de resultados por QR Code; reprovação pela leitura do QR",
        "Recaptura da inspeção antes da rejeição automática",
        "Registro de diagnóstico do HOME e da versão do CLP no log",
        "Manual operacional (edições 1.0 a 1.4) e relatórios interativos de alterações",
        "Recomendação de hardware para o servidor de treinamento de IA"] },
  { id: "p-ades1", ar: ["aut", "vis", "doc"], per: "05/2026 – 08/2026", role: "autor principal", st: "build entregue", stc: "ok",
    t: "Adesivadora 1.0", sub: "Aplicadora de adesivo com duas mesas",
    o: "Software da máquina que aplica pontos de adesivo em placas, com eixos XYZ, câmera para fiducial e inspeção, em duas mesas de trabalho.",
    a: "Recuperei o projeto incompleto, estabilizei a câmera e o fluxo das duas mesas, reforcei a segurança e entreguei um build portátil com manual técnico.",
    s: ["Python", "PyQt", "OpenCV", "Câmera", "Build .exe"],
    e: ["Restauração dos módulos originais e build portátil com modo offline",
        "Fluxo de operação com duas mesas, sem interferência entre elas",
        "Leitura de fiducial, homing da câmera e reconexão automática",
        "Retração do eixo Z antes da inspeção e espera configurável entre pontos",
        "Registro de evidência visual de falha",
        "Manual técnico e relatórios"] },
  { id: "p-ades2", ar: ["aut", "doc"], per: T("Período da Adesivadora 2.0", "mm/aaaa – mm/aaaa"), role: "principal contribuidor", st: T("Situação da Adesivadora 2.0", "situação"), stc: "",
    t: "Adesivadora 2.0 · Double Table", sub: "Nova geração da adesivadora com mesa dupla",
    o: "Nova versão da adesivadora com mesa dupla e interface HMI em PyQt6.",
    a: T("Sua atuação na Adesivadora 2.0", "Descreva o que você desenvolveu (telas, fluxo das mesas, calibração...)."),
    s: ["Python", "PyQt6", "HMI", "Build .exe"],
    e: ["Manual operacional do software (versões paisagem e retrato)",
        "Modelos estruturais de relatório e exemplos preenchidos",
        T("Outras entregas da Adesivadora 2.0", "Outras entregas")] },
  { id: "p-tensio", ar: ["aut", "vis", "doc"], per: "03/2026 – 09/2026", role: "equipe", st: "em produção", stc: "ok",
    t: "Tensiômetro de stencil", sub: "Medição de tensão e inspeção de furos",
    o: "Leva o sensor a posições predefinidas para medir a tensão do stencil e inspeciona os furos comparando as imagens com o Gerber, para validar a limpeza.",
    a: "Rotina de medição, login por DRT com modo Eng/Admin, integração com a API externa e o SFCS, auditoria local, build e manuais.",
    s: ["Python", "CLP", "API REST", "SFCS", "OpenCV"],
    e: ["Login por DRT e modo Engenharia/Admin",
        "Validação externa de tensão, com bloqueio de envio de medições NOK",
        "Vínculo do stencil ao padrão de medição; critérios visíveis na tela principal",
        "Consulta SFCS e endpoint da API configuráveis pela interface",
        "Auditoria local, relatórios de desenvolvimento e manuais do equipamento"] },
  { id: "p-digivision", ar: ["vis", "aut"], per: "05/2026 – 07/2026", role: "equipe", st: "em produção", stc: "ok",
    t: "DigiVision", sub: "Inspeção óptica automatizada (AOI) de placas",
    o: "Inspeção visual de placas eletrônicas com câmeras industriais: alinha a imagem, compara com referências cadastradas e se integra ao CLP.",
    a: "Rastreabilidade SFCS, ciclo automático, fluxo do CLP Delta via RS-232, zoom e edição de programas, ganho de desempenho.",
    s: ["Python", "PyQt6", "OpenCV", "CLP Delta RS-232", "SFCS"],
    e: ["Integração da rastreabilidade SFCS e do ciclo automático",
        "Fluxo do CLP Delta via RS-232 e tratamento de parada",
        "Proteção da região da placa e correção do recorte da câmera",
        "Barra de zoom, edição de programas e inspeção agregada",
        "Medição de tempos da inspeção e cache de referências"] },
  { id: "p-mobo", ar: ["vis"], per: T("Período da Inspetora MotherBoard", "mm/aaaa"), role: T("Seu papel na Inspetora MotherBoard", "papel"), st: "levantamento de requisitos", stc: "run",
    t: "Inspetora MotherBoard CQ", sub: "Nova máquina de inspeção de placas-mãe",
    o: "Máquina de inspeção de placas-mãe para o Controle de Qualidade, em fase de levantamento de requisitos.",
    a: T("Sua atuação na Inspetora MotherBoard", "Descreva sua participação no levantamento."),
    s: ["Requisitos", "Visão computacional"],
    e: ["Ferramenta de levantamento de requisitos e documento do projeto"] },
  { id: "p-kit", ar: ["doc"], per: "11/2026", role: T("Autoria do gerador de apresentações", "autor?"), st: "em uso", stc: "ok",
    t: "Gerador de apresentações de alterações", sub: "Ferramenta interna de documentação",
    o: "Executável que gera a apresentação interativa das alterações de um período, no formato usado nos relatórios da Inspetora de Periféricos.",
    a: "Relatórios de 20/10 a 09/11 e de 10/11 a 23/11/2026 com demonstrações antes × depois, além das versões em Word e PDF.",
    s: ["Python", "HTML", "Build .exe"],
    e: ["Kit com executável, código-fonte e exemplo pronto",
        "Relatórios de alterações em HTML interativo, DOCX e PDF"] }
];

const SKILLS = [
  { g: "Automação e hardware", c: "var(--c-aut)", l: [
    { n: "CLP Delta / ISPSoft", p: ["p-inspetora", "p-digivision", "p-tensio"] },
    { n: "Modbus e RS-232", p: ["p-inspetora", "p-digivision"] },
    { n: "Eixos XYZ e garra", p: ["p-inspetora", "p-ades1", "p-ades2"] },
    { n: "Eletrônica aplicada", p: ["exp-jigs", "exp-testes", "exp-ctd"] },
    { n: "Manutenção de jigs", p: ["exp-jigs"] },
    { n: "Engenharia de testes", p: ["exp-testes"] }
  ]},
  { g: "Software", c: "var(--c-perfil)", l: [
    { n: "Python", p: ["p-inspetora", "p-ades1", "p-ades2", "p-tensio", "p-digivision", "p-kit"] },
    { n: "PyQt6 (interfaces HMI)", p: ["p-inspetora", "p-ades1", "p-ades2", "p-digivision"] },
    { n: "pytest e simulação", p: ["p-inspetora"] },
    { n: "Git", p: ["p-inspetora", "p-ades1", "p-ades2", "p-tensio", "p-digivision"] },
    { n: "Build de executáveis", p: ["p-ades1", "p-ades2", "p-tensio", "p-inspetora", "p-kit"] },
    { n: "API REST e SFCS", p: ["p-tensio", "p-digivision"] }
  ]},
  { g: "Visão computacional e IA", c: "var(--c-vis)", l: [
    { n: "OpenCV", p: ["p-inspetora", "p-ades1", "p-digivision", "p-tensio"] },
    { n: "Câmeras e calibração", p: ["p-inspetora", "p-ades1", "p-digivision"] },
    { n: "QR Code e código de barras", p: ["p-inspetora", "p-ades1", "p-tensio"] },
    { n: "Detecção de anomalias (IA)", p: ["p-inspetora"] }
  ]},
  { g: "Qualidade e documentação", c: "var(--c-doc)", l: [
    { n: "Análise de falhas por logs", p: ["p-inspetora", "exp-ctd"] },
    { n: "Manuais operacionais", p: ["p-inspetora", "p-ades1", "p-ades2", "p-tensio"] },
    { n: "Relatórios técnicos", p: ["p-inspetora", "p-kit", "p-tensio", "p-ades1"] },
    { n: "Levantamento de requisitos", p: ["p-mobo"] },
    { n: "Inglês técnico instrumental", p: [] }
  ]}
];

/* ================= RENDERIZAÇÃO ================= */

function pressGroup(buttons, active) {
  buttons.forEach(b => { const a = b === active; b.classList.toggle("on", a); b.setAttribute("aria-pressed", String(a)); });
}

// Trajetória
const evHost = $("#events"), evOut = $("#ev-detail");
EVENTS.forEach((ev, i) => {
  const li = document.createElement("li");
  li.innerHTML = `<button type="button" style="--ev:${ev.ev}" aria-pressed="false"><span class="d">${ev.d}</span><b>${ev.t}</b><span class="chip ${ev.c}">${ev.cl}</span></button>`;
  evHost.appendChild(li);
});
const evBtns = $$("button", evHost);
function showEvent(i) {
  const ev = EVENTS[i];
  pressGroup(evBtns, evBtns[i]);
  evOut.style.setProperty("--ev", ev.ev);
  evOut.innerHTML = `<span class="eyebrow">${ev.cl}</span><b>${ev.t}</b><span>${ev.x}</span>`;
}
evBtns.forEach((b, i) => b.addEventListener("click", () => showEvent(i)));
showEvent(4);

// Experiência
const expHost = $("#cards-exp");
EXP.forEach(x => {
  const el = document.createElement("article");
  el.className = "item"; el.id = x.id; el.style.setProperty("--cc", "var(--c-exp)");
  el.innerHTML =
    `<div class="item-top"><span>${x.per}</span><span class="kind">${x.k}</span></div>` +
    `<h3>${x.t}<small>${x.org}</small></h3><dl>` +
    `<div><dt>Atividades</dt><dd>${x.a}</dd></div>` +
    `<div><dt>Resultados</dt><dd>${x.r}</dd></div></dl>`;
  expHost.appendChild(el);
});

// Projetos
const areaColor = id => (AREAS.find(a => a.id === id) || {}).c;
const projHost = $("#cards-proj");
PROJ.forEach(p => {
  const el = document.createElement("article");
  el.className = "item"; el.id = p.id; el.dataset.ar = p.ar.join(" ");
  el.style.setProperty("--cc", areaColor(p.ar[0]));
  const areaNames = p.ar.map(a => AREAS.find(x => x.id === a).n).join(" · ");
  el.innerHTML =
    `<div class="item-top"><span>${p.per} · <span class="kind">${p.role}</span></span><span>${areaNames}</span></div>` +
    `<h3>${p.t}<small>${p.sub}</small></h3><dl>` +
    `<div><dt>Objetivo</dt><dd>${p.o}</dd></div>` +
    `<div><dt>Atuação</dt><dd>${p.a}</dd></div>` +
    `<div><dt>Situação</dt><dd><span class="chip ${p.stc}">${p.st}</span></dd></div></dl>` +
    `<div class="tags">${p.s.map(s => `<span class="tag">${s}</span>`).join("")}</div>` +
    `<button class="more-btn" type="button" aria-expanded="false">Principais entregas (${p.e.length})</button>` +
    `<ul class="more gone">${p.e.map(e => `<li>${e}</li>`).join("")}</ul>`;
  const btn = $(".more-btn", el), list = $(".more", el);
  btn.addEventListener("click", () => {
    const open = list.classList.toggle("gone") === false;
    btn.setAttribute("aria-expanded", String(open));
    btn.textContent = open ? "Ocultar entregas" : `Principais entregas (${p.e.length})`;
  });
  projHost.appendChild(el);
});
$("#n-proj").textContent = PROJ.length;

const fHost = $("#proj-filter"), fCount = $("#proj-count");
AREAS.forEach(a => {
  const b = document.createElement("button");
  b.type = "button"; b.dataset.a = a.id;
  if (a.c) b.style.setProperty("--cc", a.c);
  b.innerHTML = (a.c ? "<i></i>" : "") + a.n;
  fHost.appendChild(b);
});
const fBtns = $$("button", fHost);
function filter(id) {
  pressGroup(fBtns, fBtns.find(b => b.dataset.a === id));
  let n = 0;
  $$(".item", projHost).forEach(el => {
    const show = id === "all" || el.dataset.ar.split(" ").includes(id);
    el.classList.toggle("gone", !show); if (show) n++;
  });
  fCount.textContent = `${n} de ${PROJ.length} projetos`;
}
fBtns.forEach(b => b.addEventListener("click", () => filter(b.dataset.a)));
filter("all");

// Competências
const nameOf = id => (PROJ.find(p => p.id === id) || EXP.find(x => x.id === id) || {}).t || id;
const skHost = $("#skills"), skOut = $("#skill-out");
SKILLS.forEach(g => {
  const box = document.createElement("div");
  box.className = "skill-group"; box.style.setProperty("--cc", g.c);
  box.innerHTML = `<h3><i></i>${g.g}</h3><div class="skills">${g.l.map(s => `<button type="button" class="skill" aria-pressed="false">${s.n}</button>`).join("")}</div>`;
  $$(".skill", box).forEach((b, i) => { b._skill = g.l[i]; b._color = g.c; });
  skHost.appendChild(box);
});
const skBtns = $$(".skill", skHost);
skBtns.forEach(b => b.addEventListener("click", () => {
  const s = b._skill;
  if (b.classList.contains("on")) { pressGroup(skBtns, null); skOut.style.removeProperty("--cc"); skOut.innerHTML = `<span class="ticker">Nenhuma competência selecionada.</span>`; return; }
  pressGroup(skBtns, b);
  skOut.style.setProperty("--cc", b._color);
  skOut.innerHTML = s.p.length
    ? `<b>${s.n}</b><span class="ticker">Aplicada em ${s.p.length} ${s.p.length > 1 ? "itens" : "item"}:</span><ul>${s.p.map(id => `<li><a href="#${id}" data-go="${id}">${nameOf(id)}</a></li>`).join("")}</ul>`
    : `<b>${s.n}</b><span class="ticker">Usada na leitura de documentação técnica em todos os projetos.</span>`;
}));
skOut.addEventListener("click", e => {
  const a = e.target.closest("a[data-go]"); if (!a) return;
  e.preventDefault();
  const el = document.getElementById(a.dataset.go);
  if (el.classList.contains("gone")) filter("all");
  el.scrollIntoView({ block: "center" });
  el.classList.add("flash"); setTimeout(() => el.classList.remove("flash"), 1600);
});

// Navegação por seção
const SECS = [["perfil", "Perfil", "var(--c-perfil)"], ["experiencia", "Experiência", "var(--c-exp)"], ["projetos", "Projetos", "var(--c-proj)"],
  ["competencias", "Competências", "var(--c-comp)"], ["formacao", "Formação", "var(--c-form)"], ["pendencias", "Pendências", "var(--todo)"]];
const nav = $("#chapnav");
SECS.forEach(([id, n, c]) => {
  const a = document.createElement("a"); a.href = "#" + id; a.dataset.sec = id;
  a.style.setProperty("--cc", c); a.innerHTML = `<i></i>${n}`; nav.appendChild(a);
});
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(es => {
    es.forEach(e => { if (e.isIntersecting) $$("a", nav).forEach(a => a.classList.toggle("cur", a.dataset.sec === e.target.id)); });
  }, { rootMargin: "-30% 0px -60% 0px" });
  $$("section[id]").forEach(s => io.observe(s));
}

// Pendências: uma linha por rótulo distinto
const todoHost = $("#todo-list"), btnTodo = $("#btn-todo");
const where = el => { const s = el.closest("section, header"); return s && s.id ? (SECS.find(x => x[0] === s.id) || [, "Topo"])[1] : "Topo"; };
const labels = [];
$$(".todo").forEach(el => { if (!labels.some(l => l.label === el.dataset.todo)) labels.push({ label: el.dataset.todo, el }); });
labels.forEach(({ label, el }) => {
  const li = document.createElement("li");
  li.innerHTML = `<span>${label}<small>${where(el)}</small></span><button type="button">Ir</button><button type="button" aria-pressed="false">ok</button>`;
  const [go, ok] = $$("button", li);
  go.addEventListener("click", () => {
    document.body.classList.add("show-todo"); btnTodo.setAttribute("aria-pressed", "true");
    const card = el.closest(".item");
    if (card && card.classList.contains("gone")) filter("all");
    const list = el.closest(".more"); if (list && list.classList.contains("gone")) $(".more-btn", card).click();
    el.scrollIntoView({ block: "center" });
    el.classList.remove("todo-hit"); void el.offsetWidth; el.classList.add("todo-hit");
  });
  ok.addEventListener("click", () => { const d = li.classList.toggle("done"); ok.setAttribute("aria-pressed", String(d)); updateCount(); });
  todoHost.appendChild(li);
});
function updateCount() {
  const left = labels.length - $$("li.done", todoHost).length;
  btnTodo.textContent = `Pendências (${left})`;
  const f = $("#fact-todo"); if (f) f.innerHTML = `<b>${left}</b> campos a preencher`;
}
btnTodo.addEventListener("click", () => {
  const on = document.body.classList.toggle("show-todo");
  btnTodo.setAttribute("aria-pressed", String(on));
});

// Números do topo
$("#facts").innerHTML =
  `<span class="fact"><b>${EXP.length}</b> funções na Digiboard</span>` +
  `<span class="fact"><b>${PROJ.length}</b> projetos no CTD</span>` +
  `<span class="fact"><b>${SKILLS.reduce((n, g) => n + g.l.length, 0)}</b> competências</span>` +
  `<span class="fact no-print" id="fact-todo"></span>`;
updateCount();

$("#btn-print").addEventListener("click", () => window.print());
})();
