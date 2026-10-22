/* Home: trilho unifilar, contadores, diagrama de disciplinas e acordeão de soluções */
(function () {
  const { $, $$, a, t, reduce } = RP;
  const COLORS = { eletrica: '#FF8A1F', mecanica: '#3FB6E8', civil: '#A6D04B', instrumentacao: '#C59BFF', integracao: '#FFFFFF' };
  // disciplina de cada elemento da planta, na ordem do SVG
  const PLANT = [['civil'], ['civil'], ['civil'], ['civil'], ['civil'], ['civil'], ['civil'], ['civil'],
    ['mecanica'], ['mecanica', 1], ['mecanica'], ['mecanica'], ['eletrica'], ['eletrica', 1], ['eletrica'],
    ['instrumentacao', 1], ['instrumentacao', 1], ['instrumentacao']];
  const LABELS = ['civil', 'civil', 'civil', 'civil', 'civil', 'civil', 'civil', 'eletrica', 'eletrica', 'instrumentacao', 'instrumentacao', 'instrumentacao', 'instrumentacao', 'instrumentacao', 'mecanica', 'mecanica', 'mecanica', 'mecanica'];
  const TABS = ['integracao', 'eletrica', 'mecanica', 'civil', 'instrumentacao'];
  const CIRC = ['eletrica', 'mecanica', 'civil', 'instrumentacao'];
  const PANELS = {
    integracao: { code: 'INT', title: 'Integração', text: 'Na mesma estação, as quatro disciplinas entram em sequência planejada: sem frente parada esperando outra, sem interface perdida entre empresas.', items: ['Um cronograma físico para todas as frentes', 'Um responsável técnico e um canal com o cliente', 'APR, PT e DDS unificados no canteiro', 'Comissionamento integrado: elétrica, mecânica e controle'], href: 'solucoes-eletrica.html', cta: 'Ver as cinco frentes' },
    eletrica: { code: 'E', title: 'Elétrica', text: 'Leva energia da subestação de entrada até cada bomba e aerador, com proteção e comando no CCM.', items: ['Subestação de entrada e transformação', 'CCM e painéis de comando das bombas', 'Leitos, eletrocalhas e cabos de força', 'Ensaios, medições e comissionamento'], href: 'solucoes-eletrica.html', cta: 'Ver Elétrica' },
    mecanica: { code: 'M', title: 'Mecânica', text: 'Monta e mantém o que move o esgoto pela estação: bombas, tubulações, aeradores e raspador.', items: ['Montagem de bombas e conjuntos motobomba', 'Tubulações de interligação entre etapas', 'Aeradores do tanque de aeração', 'Raspador do decantador e dosagem química'], href: 'solucoes-mecanica.html', cta: 'Ver Mecânica' },
    civil: { code: 'C', title: 'Civil', text: 'Executa as estruturas que recebem o processo e os equipamentos, com a planta em operação.', items: ['Tanques, reator e decantador', 'Bases de equipamentos e da subestação', 'Sala elétrica e casa de química', 'Reforços e adequações estruturais'], href: 'solucoes-civil.html', cta: 'Ver Civil' },
    instrumentacao: { code: 'I', title: 'Instrumentação', text: 'Mede nível, vazão, oxigênio dissolvido e pH, e leva cada sinal ao CLP que controla a estação.', items: ['Transmissores de nível e vazão', 'Analisadores de OD e pH', 'Malhas de controle no CLP', 'Calibração e integração com a elétrica'], href: 'solucoes-instrumentacao.html', cta: 'Ver Instrumentação' }
  };

  /* ---------- diagrama de disciplinas ---------- */
  let disc = 'integracao';
  const plantSvg = a('plantAria')[0];
  const plantPaths = a('e.d');
  const labelEls = plantSvg ? $$(':scope > g:last-of-type > text', plantSvg) : [];
  const circMain = a('c.path').filter(p => !p.matches('[data-a~="c.flowOp"]'));
  const circFlow = a('c.flowOp');
  const tabs = a('t.pick');
  const itemsUl = $('[data-t="i"]') && $('[data-t="i"]').closest('ul');
  const itemTpl = itemsUl && itemsUl.firstElementChild.cloneNode(true);
  function renderDisc() {
    const lit = k => disc === 'integracao' || disc === k;
    plantPaths.forEach((p, i) => {
      const [k, fill] = PLANT[i] || ['civil'];
      p.setAttribute('stroke', lit(k) ? COLORS[k] : 'rgba(255,255,255,.16)');
      p.setAttribute('fill', fill ? (lit(k) ? COLORS[k] : 'rgba(255,255,255,.1)') : (k === 'civil' && lit(k) ? 'rgba(166,208,75,.07)' : 'none'));
    });
    const wide = window.innerWidth >= 720;
    labelEls.forEach((el, i) => {
      const k = LABELS[i];
      el.setAttribute('fill', lit(k) ? (k === 'civil' ? '#E3EFC6' : COLORS[k]) : 'rgba(255,255,255,.3)');
      el.style.display = wide || k === 'civil' ? '' : 'none';
      el.style.transition = 'fill .35s';
    });
    circMain.forEach((p, i) => { const k = CIRC[i]; p.setAttribute('stroke-width', lit(k) ? 2.5 : 1.5); p.setAttribute('stroke-opacity', lit(k) ? 1 : 0.25); });
    circFlow.forEach((p, i) => p.setAttribute('stroke-opacity', disc === CIRC[i] ? 0.9 : 0));
    tabs.forEach((b, i) => {
      const sel = TABS[i] === disc;
      b.setAttribute('aria-selected', sel ? 'true' : 'false');
      b.style.background = sel ? '#FFFFFF' : 'transparent';
      b.style.color = sel ? '#060B26' : '#FFFFFF';
      b.style.borderColor = sel ? '#FFFFFF' : 'rgba(255,255,255,.3)';
    });
    const P = PANELS[disc], color = COLORS[disc] === '#FFFFFF' ? '#FFB27A' : COLORS[disc];
    t('panel.code', P.code); t('panel.title', P.title); t('panel.text', P.text); t('panel.cta', P.cta);
    a('panel.href').forEach(el => el.setAttribute('href', P.href));
    if (itemsUl) {
      itemsUl.replaceChildren(...P.items.map(txt => { const li = itemTpl.cloneNode(true); li.querySelector('[data-t="i"]').textContent = txt; return li; }));
    }
    a('panel.color').forEach(el => { el.style.color = color; });
    if (plantSvg) plantSvg.setAttribute('aria-label', 'Planta ilustrativa de estação de tratamento de esgoto destacando a disciplina ' + P.title);
  }
  tabs.forEach((b, i) => b.addEventListener('click', () => { disc = TABS[i]; renderDisc(); }));

  /* ---------- acordeão de soluções ---------- */
  const solBtns = a('s.toggle'), solPanels = $$('[data-if="s.open"]'), signs = $$('[data-t="s.sign"]');
  let open = 0;
  function renderSols() {
    solBtns.forEach((b, i) => {
      const on = open === i;
      b.setAttribute('aria-expanded', on ? 'true' : 'false');
      if (solPanels[i]) solPanels[i].hidden = !on;
      if (signs[i]) signs[i].textContent = on ? '−' : '+';
    });
    rail();
  }
  solBtns.forEach((b, i) => b.addEventListener('click', () => { open = open === i ? -1 : i; renderSols(); }));

  /* ---------- números ---------- */
  const numGrid = a('numCols')[0];
  function cols() { if (numGrid) { const w = window.innerWidth; numGrid.style.gridTemplateColumns = 'repeat(' + (w >= 1100 ? 6 : w >= 560 ? 3 : 2) + ',minmax(0,1fr))'; } }
  const nums = $$('[data-t="n.txt"]').map(el => { const m = el.textContent.match(/^(\D*)(\d+)(.*)$/); return m ? { el, pre: m[1], v: +m[2], post: m[3] } : null; }).filter(Boolean);
  const numSec = a('numRef')[0];
  if (!reduce() && numSec && nums.length) {
    nums.forEach(n => { n.el.textContent = n.pre + 0 + n.post; });
    const io = new IntersectionObserver(es => {
      if (!es.some(e => e.isIntersecting)) return;
      io.disconnect();
      const t0 = performance.now(), dur = 1600;
      const step = now => {
        const k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 3);
        nums.forEach(n => { n.el.textContent = n.pre + Math.round(n.v * e) + n.post; });
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.35 });
    io.observe(numSec);
  }

  /* ---------- trilho unifilar ---------- */
  const m = a('mainRef')[0], f = a('fillRef')[0], b = a('baseRef')[0], holes = a('holesRef')[0], hd = a('headRef')[0];
  const secs = m ? Array.from(m.children).filter(el => el.tagName === 'SECTION') : [];
  // conteúdo das seções fica à frente do trilho (fundos ficam atrás)
  secs.forEach(s => Array.from(s.children).forEach(c => {
    if (c.hasAttribute('data-node') || c.tagName === 'IMG' || c.getAttribute('aria-hidden') === 'true') return;
    if (getComputedStyle(c).position === 'static') c.style.position = 'relative';
    c.style.zIndex = '2';
  }));
  const titles = secs.map(s => s.querySelector('h2'));
  titles.forEach((tt, i) => {
    if (!tt || i === 0) return;
    const orig = getComputedStyle(tt).color, c = orig.match(/\d+/g).map(Number);
    tt.dataset.orig = orig; tt.dataset.lit = (c[0] + c[1] + c[2]) / 3 > 128 ? '#FF7A1A' : '#D95F0A';
    tt.style.position = 'relative'; tt.style.zIndex = '5'; tt.style.transition = 'color .45s ease';
  });
  function rail() {
    if (!m || !f || !b) return;
    const r = m.getBoundingClientRect(), W = m.clientWidth, H = r.height;
    const inset = Math.min(36, Math.max(10, W * 0.024));
    const xs = secs.map((_, i) => i % 2 === 0 ? inset : W - inset);
    const tops = secs.map(s => s.getBoundingClientRect().top - r.top);
    // cruzamento horizontal na altura do título de cada seção
    const cross = secs.map((s, i) => {
      const tt = titles[i];
      if (i === 0 || !tt) return tops[i] + 64;
      const tr = tt.getBoundingClientRect();
      return tr.top - r.top + tr.height / 2;
    });
    let d = 'M' + xs[0] + ' 0', total = 0, prevY = 0;
    const segs = [];
    for (let i = 1; i < secs.length; i++) {
      segs.push({ y0: prevY, y1: cross[i], h: Math.abs(xs[i] - xs[i - 1]) });
      d += ' L' + xs[i - 1] + ' ' + cross[i] + ' L' + xs[i] + ' ' + cross[i];
      total += cross[i] - prevY + Math.abs(xs[i] - xs[i - 1]);
      prevY = cross[i];
    }
    d += ' L' + xs[secs.length - 1] + ' ' + H; total += H - prevY;
    b.setAttribute('d', d); f.setAttribute('d', d);
    const py = Math.max(0, Math.min(H, window.innerHeight * 0.55 - r.top));
    let len = 0, done = false;
    for (const sg of segs) {
      if (py < sg.y1) { len += py - sg.y0; done = true; break; }
      len += sg.y1 - sg.y0 + sg.h;
    }
    if (!done) len += py - prevY;
    f.style.strokeDasharray = total + ' ' + total;
    f.style.strokeDashoffset = (total - len) + '';
    // recorta o trilho atrás dos títulos e da foto destacada
    if (holes) {
      const NS = 'http://www.w3.org/2000/svg', rg = document.createRange();
      const rect = (x, y, w, h) => { const e = document.createElementNS(NS, 'rect'); e.setAttribute('x', x); e.setAttribute('y', y); e.setAttribute('width', w); e.setAttribute('height', h); e.setAttribute('fill', '#000'); holes.appendChild(e); };
      holes.replaceChildren();
      $$('[data-rail-hl]', m).forEach(el => { const cr = el.getBoundingClientRect(); rect(cr.left - r.left, cr.top - r.top, cr.width, cr.height); });
      titles.forEach(tt => {
        if (!tt) return;
        rg.selectNodeContents(tt);
        Array.from(rg.getClientRects()).forEach(cr => rect(cr.left - r.left - 14, cr.top - r.top - 4, cr.width + 28, cr.height + 8));
      });
    }
    if (hd) {
      const vis = len > 2 && len < total - 2;
      if (vis) { const pt = f.getPointAtLength(len); hd.setAttribute('transform', 'translate(' + pt.x + ' ' + pt.y + ')'); }
      hd.style.opacity = vis ? '1' : '0';
    }
    secs.forEach((s, i) => {
      const on = cross[i] <= py;
      const n = s.querySelector(':scope > [data-node]');
      const hl = s.querySelector('[data-rail-hl]');
      if (hl) {
        const img = hl.querySelector('img'), fr = hl.lastElementChild;
        img.style.filter = on ? 'grayscale(0) contrast(1.05)' : 'grayscale(1) contrast(1.1)';
        img.style.opacity = on ? '1' : '.9';
        img.style.transform = on ? 'scale(1.04)' : 'scale(1)';
        fr.style.boxShadow = on ? 'inset 0 0 0 3px #FF7A1A' : 'inset 0 0 0 0 #FF7A1A';
        if (n) n.style.display = 'none';
      }
      if (n && !hl) {
        n.style.left = xs[i] + 'px';
        n.style.top = i > 0 ? (cross[i] - tops[i] - 5) + 'px' : '';
        n.style.background = on ? '#FF7A1A' : '';
        n.style.boxShadow = on ? '0 0 0 4px rgba(255,122,26,.18)' : 'none';
      }
      const tt = titles[i];
      if (tt && i > 0) tt.style.color = on ? tt.dataset.lit : tt.dataset.orig;
    });
  }

  let raf = 0;
  const schedule = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(rail); };
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', () => { cols(); renderDisc(); schedule(); });
  window.addEventListener('load', schedule);
  if (document.fonts) document.fonts.ready.then(schedule);
  cols(); renderDisc(); renderSols();
})();
