/* Onde estamos: mapa, lista e card de unidades (gerado a partir do design) */
/* Mini-runtime para seções interativas exportadas do design (sc-for, sc-if, {{ }} e eventos) */
(function (root) {
  const esc = v => String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const get = (o, p) => p.split('.').reduce((a, k) => (a == null ? a : a[k]), o);
  // acha o primeiro bloco <tag ...>…</tag> respeitando blocos aninhados do mesmo tipo
  function block(html, tag, from) {
    const open = new RegExp('<' + tag + '\\s[^>]*>', 'g'); open.lastIndex = from;
    const m = open.exec(html); if (!m) return null;
    let depth = 1, i = m.index + m[0].length;
    const re = new RegExp('<' + tag + '\\s[^>]*>|</' + tag + '>', 'g'); re.lastIndex = i;
    let t;
    while ((t = re.exec(html))) {
      depth += t[0][1] === '/' ? -1 : 1;
      if (!depth) return { start: m.index, end: t.index + t[0].length, head: m[0], body: html.slice(i, t.index) };
    }
    throw new Error('bloco ' + tag + ' sem fechamento');
  }
  function render(tpl, vals, reg) {
    let html = tpl, b, pos = 0;
    while ((b = block(html, 'sc-for', pos))) {
      const [, list, as] = b.head.match(/list="\{\{ ([\w.$]+) \}\}" as="(\w+)"/);
      const out = (get(vals, list) || []).map((it, i) => render(b.body, Object.assign({}, vals, { [as]: it, $index: i }), reg)).join('');
      html = html.slice(0, b.start) + out + html.slice(b.end); pos = b.start + out.length;
    }
    pos = 0;
    while ((b = block(html, 'sc-if', pos))) {
      const p = b.head.match(/value="\{\{ ([\w.$]+) \}\}"/)[1];
      const out = get(vals, p) ? render(b.body, vals, reg) : '';
      html = html.slice(0, b.start) + out + html.slice(b.end); pos = b.start + out.length;
    }
    html = html.replace(/\sstyle-(hover|focus)="[^"]*"/g, '').replace(/<\/img>/g, '');
    html = html.replace(/\s([\w:-]+)="\{\{ ([\w.$]+) \}\}"/g, (m, attr, p) => {
      const v = get(vals, p);
      if (v == null) return '';
      if (typeof v === 'function') { const id = reg.length; reg.push(v); return ' data-ev-' + attr.replace(/^on/, '').toLowerCase() + '="' + id + '"'; }
      return ' ' + attr + '="' + esc(v) + '"';
    });
    return html.replace(/\{\{ ([\w.$]+) \}\}/g, (m, p) => { const v = get(vals, p); return v == null ? '' : esc(v); });
  }
  function mount(el, tpl, Component) {
    let reg = [];
    class Base { constructor() { this.props = {}; } setState(o) { if (typeof o === 'function') o = o(this.state); Object.assign(this.state, o); draw(); } }
    const C = Component(Base), inst = new C();
    inst.state = Object.assign({}, inst.state, { ready: true });
    function draw() {
      reg = [];
      el.innerHTML = render(tpl, inst.renderVals(), reg);
      ['click', 'keydown'].forEach(ev => el.querySelectorAll('[data-ev-' + ev + ']').forEach(n => n.addEventListener(ev, e => reg[+n.getAttribute('data-ev-' + ev)](e))));
    }
    draw();
    return inst;
  }
  root.DCRT = { render, mount };
  if (typeof module !== 'undefined') module.exports = root.DCRT;
})(typeof window !== 'undefined' ? window : globalThis);

(function () {
  const el = document.getElementById('rp-onde-app');
  if (!el || !window.RP_DATA || !window.RP_BRASIL) return;
  const TPL = "    <div style=\"max-width:1440px;margin:0 auto;padding:0 clamp(28px,6vw,96px) clamp(64px,8vw,112px);\">\n      <div style=\"border:1px solid #1C2450;background:#0A1033;\">\n\n        <div style=\"display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:16px 24px;padding:20px clamp(18px,2.4vw,28px);border-bottom:1px solid #1C2450;\">\n          <div style=\"display:flex;align-items:baseline;gap:14px;flex-wrap:wrap;\">\n            <span style=\"font:500 12px 'IBM Plex Mono',monospace;letter-spacing:.1em;color:#FFB27A;\">UNIDADES</span>\n            <span style=\"font-size:15px;color:#C9CEE0;\">{{ resumo }}</span>\n          </div>\n          <div style=\"display:flex;align-items:center;gap:8px;\">\n            <button type=\"button\" onClick=\"{{ prev }}\" aria-label=\"Unidade anterior\" style=\"width:44px;height:44px;border:1px solid #2A3360;background:transparent;color:#FFFFFF;font:600 18px 'Inter',sans-serif;cursor:pointer;\" style-hover=\"border-color:#FF7A1A;\">‹</button>\n            <span aria-live=\"polite\" style=\"font:500 12px 'IBM Plex Mono',monospace;letter-spacing:.1em;color:#C9CEE0;min-width:64px;text-align:center;\">{{ posicao }}</span>\n            <button type=\"button\" onClick=\"{{ next }}\" aria-label=\"Próxima unidade\" style=\"width:44px;height:44px;border:1px solid #2A3360;background:transparent;color:#FFFFFF;font:600 18px 'Inter',sans-serif;cursor:pointer;\" style-hover=\"border-color:#FF7A1A;\">›</button>\n          </div>\n        </div>\n\n        <ul aria-label=\"Lista de unidades\" style=\"list-style:none;margin:0;padding:16px clamp(18px,2.4vw,28px);display:flex;flex-wrap:wrap;gap:8px;border-bottom:1px solid #1C2450;\">\n          <sc-for list=\"{{ list }}\" as=\"f\" hint-placeholder-count=\"13\">\n            <li>\n              <button type=\"button\" onClick=\"{{ f.pick }}\" aria-pressed=\"{{ f.pressed }}\" style=\"min-height:44px;display:flex;align-items:center;gap:10px;padding:8px 14px;background:{{ f.bg }};color:{{ f.fg }};border:1px solid {{ f.border }};cursor:pointer;font:500 14px 'Inter',sans-serif;\">\n                <span style=\"font:600 12px 'IBM Plex Mono',monospace;letter-spacing:.04em;color:{{ f.ufc }};\">{{ f.uf }}</span>\n                <span>{{ f.cidade }}</span>\n                <span style=\"font:500 10px 'IBM Plex Mono',monospace;letter-spacing:.08em;color:{{ f.ufc }};\">{{ f.badge }}</span>\n              </button>\n            </li>\n          </sc-for>\n        </ul>\n\n        <div class=\"rp-onde-grid\" style=\"display:grid;align-items:stretch;\">\n          <figure style=\"margin:0;padding:clamp(18px,2.4vw,32px);display:flex;flex-direction:column;justify-content:center;gap:14px;border-right:1px solid #1C2450;\">\n            <svg viewBox=\"0 0 600 600\" role=\"group\" aria-label=\"Mapa do Brasil. Estados com unidade RP são selecionáveis.\" style=\"width:100%;max-width:520px;height:auto;display:block;align-self:center;\">\n              <sc-for list=\"{{ states }}\" as=\"s\" hint-placeholder-count=\"0\">\n                <path d=\"{{ s.d }}\" fill=\"{{ s.fill }}\" stroke=\"{{ s.stroke }}\" stroke-width=\"{{ s.sw }}\" tabindex=\"{{ s.tab }}\" role=\"{{ s.role }}\" aria-label=\"{{ s.aria }}\" aria-pressed=\"{{ s.pressed }}\" onClick=\"{{ s.pick }}\" onKeyDown=\"{{ s.key }}\" style=\"cursor:{{ s.cursor }};transition:fill .25s;outline:none;\"></path>\n              </sc-for>\n              <sc-for list=\"{{ pins }}\" as=\"p\" hint-placeholder-count=\"0\">\n                <g style=\"pointer-events:none;\">\n                  <circle cx=\"{{ p.x }}\" cy=\"{{ p.y }}\" r=\"5\" fill=\"none\" stroke=\"#FF7A1A\" stroke-width=\"1.5\" style=\"transform-box:fill-box;transform-origin:center;animation:rpPulse 2.6s ease-out infinite;animation-delay:{{ p.delay }};\"></circle>\n                  <circle cx=\"{{ p.x }}\" cy=\"{{ p.y }}\" r=\"{{ p.r }}\" fill=\"{{ p.fill }}\" stroke=\"#060B26\" stroke-width=\"1.5\"></circle>\n                </g>\n              </sc-for>\n            </svg>\n            <figcaption style=\"display:flex;flex-wrap:wrap;justify-content:center;gap:8px 20px;font:500 12px 'IBM Plex Mono',monospace;letter-spacing:.06em;color:#C9CEE0;\">\n              <span style=\"display:flex;align-items:center;gap:8px;\"><span style=\"width:10px;height:10px;border-radius:50%;background:#FFFFFF;\"></span>MATRIZ</span>\n              <span style=\"display:flex;align-items:center;gap:8px;\"><span style=\"width:10px;height:10px;border-radius:50%;background:#FF7A1A;\"></span>UNIDADE</span>\n              <span style=\"display:flex;align-items:center;gap:8px;\"><span style=\"width:10px;height:10px;background:#1A2A6E;\"></span>ESTADO COM OPERAÇÃO</span>\n            </figcaption>\n          </figure>\n\n          <div aria-live=\"polite\" style=\"display:grid;min-width:0;\">\n            <sc-for list=\"{{ cards }}\" as=\"sel\" hint-placeholder-count=\"1\">\n            <article aria-label=\"{{ sel.aria }}\" aria-hidden=\"{{ sel.hidden }}\" class=\"rp-unit\" style=\"grid-area:1/1;display:grid;background:#FFFFFF;color:#0A1033;min-width:0;visibility:{{ sel.vis }};\">\n              <div style=\"position:relative;background:#0B1B5C;min-height:240px;overflow:hidden;\">\n                <img src=\"{{ sel.foto }}\" alt=\"{{ sel.fotoAlt }}\" style=\"position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;filter:grayscale(1) contrast(1.1);mix-blend-mode:luminosity;opacity:.92;\"></img>\n                <sc-if value=\"{{ sel.ilustr }}\" hint-placeholder-val=\"{{ true }}\">\n                  <span style=\"position:absolute;left:12px;top:12px;font:500 11px 'IBM Plex Mono',monospace;letter-spacing:.08em;background:rgba(6,11,38,.82);color:#FFFFFF;padding:6px 10px;\">FOTO ILUSTRATIVA</span>\n                </sc-if>\n                <span style=\"position:absolute;left:0;bottom:0;background:#FF7A1A;color:#0A1033;font:700 clamp(28px,3vw,40px)/1 'Sora',sans-serif;padding:14px 18px;\">{{ sel.uf }}</span>\n              </div>\n              <div style=\"padding:clamp(22px,2.6vw,36px);display:flex;flex-direction:column;gap:18px;\">\n                <div style=\"display:flex;flex-direction:column;gap:8px;\">\n                  <span style=\"font:500 12px 'IBM Plex Mono',monospace;letter-spacing:.1em;color:#C24E00;\">{{ sel.tipoUp }} · {{ sel.estado }}</span>\n                  <h2 style=\"font:800 clamp(28px,2.8vw,40px)/1.05 'Sora',sans-serif;letter-spacing:-.02em;margin:0;min-height:2.1em;display:flex;align-items:flex-end;\">{{ sel.nome }}</h2>\n                </div>\n                <dl style=\"margin:0;display:flex;flex-direction:column;gap:14px;border-top:1px solid #DADCE3;padding-top:18px;\">\n                  <div style=\"display:grid;grid-template-columns:96px 1fr;gap:12px;\">\n                    <dt style=\"font:500 12px 'IBM Plex Mono',monospace;letter-spacing:.1em;font-size:11px;color:#4A5275;padding-top:4px;\">ENDEREÇO</dt>\n                    <dd style=\"margin:0;font-size:15px;line-height:1.55;white-space:pre-line;min-height:6.2em;\">{{ sel.endereco }}</dd>\n                  </div>\n                  <div style=\"display:grid;grid-template-columns:96px 1fr;gap:12px;\">\n                    <dt style=\"font:500 12px 'IBM Plex Mono',monospace;letter-spacing:.1em;font-size:11px;color:#4A5275;padding-top:4px;\">TELEFONE</dt>\n                    <dd style=\"margin:0;\"><a href=\"{{ sel.telHref }}\" style=\"font-weight:600;font-size:15px;\">{{ sel.telefone }}</a></dd>\n                  </div>\n                  <div style=\"display:grid;grid-template-columns:96px 1fr;gap:12px;\">\n                    <dt style=\"font:500 12px 'IBM Plex Mono',monospace;letter-spacing:.1em;font-size:11px;color:#4A5275;padding-top:4px;\">HORÁRIO</dt>\n                    <dd style=\"margin:0;font-size:15px;line-height:1.5;\">{{ sel.horario }}</dd>\n                  </div>\n                  <div style=\"display:grid;grid-template-columns:96px 1fr;gap:12px;\">\n                    <dt style=\"font:500 12px 'IBM Plex Mono',monospace;letter-spacing:.1em;font-size:11px;color:#4A5275;padding-top:8px;\">SEGMENTOS</dt>\n                    <dd style=\"margin:0;\">\n                      <ul style=\"list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;align-content:flex-start;gap:6px;min-height:68px;\">\n                        <sc-for list=\"{{ sel.segmentos }}\" as=\"g\" hint-placeholder-count=\"2\"><li style=\"font-size:13px;font-weight:500;padding:6px 10px;background:#EEF0F5;\">{{ g }}</li></sc-for>\n                      </ul>\n                    </dd>\n                  </div>\n                </dl>\n                <div style=\"display:flex;flex-wrap:wrap;gap:10px;margin-top:auto;\">\n                  <a href=\"{{ sel.contato }}\" style=\"background:#FF7A1A;color:#0A1033;font-weight:600;font-size:15px;padding:14px 20px;text-decoration:none;\" style-hover=\"background:#FF934A;color:#0A1033;\">Entrar em contato</a>\n                  <a href=\"{{ sel.orc }}\" style=\"background:#0B1B5C;color:#FFFFFF;font-weight:600;font-size:15px;padding:14px 20px;text-decoration:none;\" style-hover=\"background:#13287F;color:#FFFFFF;\">Orçamento para {{ sel.uf }}</a>\n                </div>\n              </div>\n            </article>\n            </sc-for>\n          </div>\n        </div>\n      </div>\n    </div>\n";
  window.DCRT.mount(el, TPL, DCLogic => { 
class Component extends DCLogic {
  state = { ready: false, idx: 0 };
  componentDidMount() {
    const go = () => (window.RP_DATA && window.RP_BRASIL) ? this.setState({ ready: true }) : (this.t = setTimeout(go, 40)); go();
  }
  componentWillUnmount() { clearTimeout(this.t); }
  renderVals() {
    if (!this.state.ready) return { states: [], pins: [], list: [], sel: { segmentos: [] }, cards: [], resumo: '', posicao: '', prev: () => {}, next: () => {} };
    const D = window.RP_DATA, B = window.RP_BRASIL;
    const idx = Math.min(this.state.idx, D.filiais.length - 1), f = D.filiais[idx], cur = f.uf;
    // primeira unidade de cada estado (o clique no mapa abre essa) e quantas unidades cada estado tem
    const byUf = {}, count = {};
    D.filiais.forEach((x, i) => { if (!(x.uf in byUf)) byUf[x.uf] = i; count[x.uf] = (count[x.uf] || 0) + 1; });
    const pick = i => () => this.setState({ idx: i });
    const states = Object.keys(B.estados).map(uf => {
      const on = uf in byUf, sel = uf === cur, first = on ? D.filiais[byUf[uf]] : null;
      return {
        d: B.estados[uf].d, fill: sel ? '#FF7A1A' : on ? '#1A2A6E' : 'rgba(255,255,255,.04)',
        stroke: sel ? '#FFFFFF' : on ? '#5B6BB0' : 'rgba(255,255,255,.18)', sw: sel ? 1.6 : 0.8,
        tab: on ? 0 : undefined, role: on ? 'button' : undefined, pressed: on ? (sel ? 'true' : 'false') : undefined,
        aria: on ? B.estados[uf].nome + ': ' + (count[uf] > 1 ? count[uf] + ' unidades' : first.tipo + ' em ' + first.cidade) : undefined,
        cursor: on ? 'pointer' : 'default',
        pick: on ? pick(byUf[uf]) : undefined,
        key: on ? (e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.setState({ idx: byUf[uf] }); } }) : undefined
      };
    });
    const pins = D.filiais.map((x, i) => { const [px, py] = B.projetar(x.lon, x.lat), m = x.tipo === 'Matriz'; return { x: px.toFixed(1), y: py.toFixed(1), r: m ? 7 : 4.5, fill: m ? '#FFFFFF' : '#FF7A1A', delay: (i * .23).toFixed(2) + 's' }; });
    // todos os cards ficam empilhados na mesma célula; só o escolhido aparece (a altura da seção não muda)
    const card = (f, i) => {
      const tel = f.telefone || D.contato.telefone, telLink = f.telefoneLink || D.contato.telefoneLink, on = i === idx;
      return {
        uf: f.uf, cidade: f.cidade, tipoUp: f.tipo.toUpperCase(), estado: B.estados[f.uf].nome, segmentos: f.segmentos,
        nome: (f.tipo === 'Matriz' ? 'Matriz ' : 'RP ') + f.cidade,
        endereco: (f.endereco && f.endereco.length) ? f.endereco.join('\n') : 'Endereço sob consulta.\nFale com a central comercial.',
        telefone: tel, telHref: 'tel:' + telLink, horario: f.horario || 'Segunda a sexta, das 8h às 18h',
        foto: f.foto || 'assets/img-exemplo/estrutura-04.webp', ilustr: f.fotoIlustrativa !== false,
        fotoAlt: (f.fotoIlustrativa !== false ? 'Foto ilustrativa da unidade de ' : 'Fachada da unidade de ') + f.cidade,
        contato: 'contato.html', orc: 'orcamento.html?uf=' + f.uf,
        vis: on ? 'visible' : 'hidden', hidden: on ? undefined : 'true', aria: 'Unidade selecionada: ' + f.cidade
      };
    };
    const cards = D.filiais.map(card), sel = cards[idx];
    const list = D.filiais.map((x, i) => {
      const s = i === idx, m = x.tipo === 'Matriz';
      return { uf: x.uf, cidade: x.cidade, badge: m ? 'MATRIZ' : '', pressed: s ? 'true' : 'false', bg: s ? '#FF7A1A' : m ? '#0B1B5C' : 'transparent', fg: s ? '#0A1033' : '#FFFFFF', border: s ? '#FF7A1A' : m ? '#0B1B5C' : '#2A3360', ufc: s ? '#0A1033' : '#FFB27A', pick: pick(i) };
    });
    const n = D.filiais.length, pad = v => String(v).padStart(2, '0');
    const resumo = n + ' unidades em ' + Object.keys(count).length + ' estados';
    const posicao = pad(idx + 1) + ' / ' + pad(n);
    const prev = () => this.setState({ idx: (idx - 1 + n) % n }), next = () => this.setState({ idx: (idx + 1) % n });
    return { states, pins, sel, cards, list, resumo, posicao, prev, next };
  }
}

 return Component; });
})();
