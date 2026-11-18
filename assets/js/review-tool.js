/*!
 * review-tool.js — máscara de revisão para telas de design
 * Uso: <script src="review-tool.js" data-project="Nome do Projeto"><\/script>
 *
 * Opções (data-attributes no <script> ou window.REVIEW_TOOL = {...} antes):
 *   data-project   nome do projeto que aparece no print
 *   data-color     cor do botão (padrão cinza bem escuro #1c1d20)
 *   data-whatsapp  número com DDI (ex.: 5511999999999) para o botão "Abrir WhatsApp"
 *   data-gallery   "true" (padrão): prints vão para uma bandeja e saem todos de uma vez
 *   data-drive-url / data-drive-key  opcional: botão "Enviar ao Drive" (veja drive-receiver.gs)
 *   data-activate  "always" (padrão) ou "param" (só aparece com ?review=1 na URL)
 *
 * Nomear telas/seções (opcional, melhora o print):
 *   <body data-screen="Home">    <section data-section="Hero"> ...
 *
 * Não altera o layout: roda em Shadow DOM, position:fixed, e some durante o print.
 */
(function () {
  'use strict';

  var script = document.currentScript;
  var CFG = Object.assign(
    {
      project: document.title || location.hostname,
      color: '#1c1d20',
      accent: '#ef7912',
      select: '#2d7ff9',
      mobileWidth: 390,
      mobileHeight: 844,
      whatsapp: '',
      gallery: 'true', // 'false' = copia cada print direto, sem bandeja
      jspdf: 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
      driveUrl: '',   // opcional: URL do Apps Script (acrescenta o botão "Enviar ao Drive")
      driveKey: '',   // senha definida no Apps Script
      mobileMode: 'src', // 'srcdoc' para páginas hospedadas em sandbox (ex.: artefatos)
      activate: 'always',
      html2canvas: 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'
    },
    window.REVIEW_TOOL || {},
    (script && script.dataset) || {}
  );
  CFG.mobileWidth = Number(CFG.mobileWidth);
  CFG.mobileHeight = Number(CFG.mobileHeight);

  if (CFG.activate === 'param') {
    try {
      if (/[?&]review=1/.test(location.search)) sessionStorage.setItem('rt-on', '1');
      if (sessionStorage.getItem('rt-on') !== '1' && window.name !== 'rt-mobile') return;
    } catch (e) {}
  }
  if (window.__reviewTool) return;
  window.__reviewTool = true;

  var inMobileFrame = window.name === 'rt-mobile';
  var LOGO = 'data:image/png;base64,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';
  var host, root, layer, menu, picked = null, pickCleanup = null;
  var GALLERY = String(CFG.gallery) !== 'false', tray = [], DB = null, upState = null, lastMsg = '';

  /* ---------- utilidades ---------- */
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function clip(s, n) {
    s = String(s || '').replace(/\s+/g, ' ').trim();
    return s.length > n ? s.slice(0, n - 1) + '…' : s;
  }

  function screenName() {
    var el = document.querySelector('[data-screen]');
    return clip((el && el.dataset.screen) || document.title || location.pathname, 80);
  }

  var SEC_SEL = '[data-section], main section, body > section, section[id], body > header, body > footer, header, footer';

  function sectionName(best) {
    if (!best) return 'Topo da página';
    var h = best.querySelector('h1,h2,h3');
    return clip(
      best.dataset.section || best.getAttribute('aria-label') ||
      (h && h.textContent) || best.id || best.tagName.toLowerCase(),
      70
    );
  }

  function currentSection() {
    var vh = innerHeight, vw = innerWidth, best = null, bestArea = 0;
    document.querySelectorAll(SEC_SEL).forEach(function (el) {
      if (host && host.contains(el)) return;
      var r = el.getBoundingClientRect();
      var h = Math.min(r.bottom, vh) - Math.max(r.top, 0);
      var w = Math.min(r.right, vw) - Math.max(r.left, 0);
      var area = h > 0 && w > 0 ? h * w : 0;
      if (area > bestArea) { bestArea = area; best = el; }
    });
    return sectionName(best);
  }

  function describeEl(el) {
    var tag = el.tagName.toLowerCase();
    var cls = (typeof el.className === 'string' ? el.className : '').trim().split(/\s+/).filter(Boolean).slice(0, 2);
    var sel = tag + (el.id ? '#' + el.id : '') + (cls.length ? '.' + cls.join('.') : '');
    var txt = el.getAttribute('aria-label') || el.getAttribute('alt') || el.getAttribute('placeholder') ||
      el.innerText || el.textContent || '';
    txt = clip(txt, 70);
    return { sel: sel, text: txt, label: '<' + sel + '>' + (txt ? ' “' + txt + '”' : '') };
  }

  function collectInfo() {
    var doc = document.documentElement;
    var max = Math.max(1, doc.scrollHeight - innerHeight);
    var pct = Math.round((scrollY / max) * 100);
    var mobile = inMobileFrame || innerWidth <= 768;
    return {
      screen: screenName(),
      section: picked && picked.closest(SEC_SEL) ? sectionName(picked.closest(SEC_SEL)) : currentSection(),
      element: picked ? describeEl(picked).label : '',
      device: (mobile ? 'Mobile' : 'Desktop') + ' ' + innerWidth + '×' + innerHeight + ' · rolagem ' + pct + '%',
      when: new Date().toLocaleString('pt-BR'),
      url: location.href.split('#')[0]
    };
  }

  function loadH2C() {
    if (window.html2canvas) return Promise.resolve();
    return new Promise(function (res, rej) {
      var s = document.createElement('script');
      s.src = CFG.html2canvas;
      s.onload = res;
      s.onerror = function () { rej(new Error('html2canvas')); };
      document.head.appendChild(s);
    });
  }

  function raf2() {
    return new Promise(function (r) { requestAnimationFrame(function () { requestAnimationFrame(r); }); });
  }

  /* ---------- montagem do print ---------- */
  function wrap(ctx, text, maxW) {
    var out = [];
    String(text).split('\n').forEach(function (par) {
      var line = '';
      par.split(/\s+/).forEach(function (w) {
        var t = line ? line + ' ' + w : w;
        if (ctx.measureText(t).width > maxW && line) { out.push(line); line = w; } else line = t;
      });
      out.push(line);
    });
    return out;
  }

  function compose(shot, info, text, rect) {
    var W = shot.width, s = W / innerWidth;
    var fs = Math.max(W / 44, 14 * s), pad = fs * 0.9, lh = fs * 1.45;
    var font = function (w) { return w + ' ' + fs + 'px system-ui,-apple-system,Segoe UI,Roboto,sans-serif'; };

    var m = document.createElement('canvas').getContext('2d');
    m.font = font(600);
    var head = [
      ['Projeto', CFG.project], ['Tela', info.screen],
      ['Seção', info.section]
    ];
    if (info.element) head.push(['Elemento', info.element]);
    head.push(['Dispositivo', info.device], ['Data', info.when]);
    var headLines = [];
    head.forEach(function (h) {
      wrap(m, h[0] + ': ' + h[1], W - pad * 2).forEach(function (l) { headLines.push(l); });
    });
    m.font = font(400);
    var bodyLines = wrap(m, text, W - pad * 2);

    var headH = pad * 2 + lh * (headLines.length + 1);
    var footH = pad * 2 + lh * (bodyLines.length + 1);
    var c = document.createElement('canvas');
    c.width = W;
    c.height = Math.ceil(headH + shot.height + footH);
    var ctx = c.getContext('2d');
    ctx.textBaseline = 'top';

    ctx.fillStyle = '#111827';
    ctx.fillRect(0, 0, W, headH);
    ctx.fillStyle = CFG.accent;
    ctx.font = font(700);
    ctx.fillText('SOLICITAÇÃO DE ALTERAÇÃO', pad, pad);
    ctx.fillStyle = '#fff';
    ctx.font = font(600);
    headLines.forEach(function (l, i) { ctx.fillText(l, pad, pad + lh * (i + 1)); });

    ctx.drawImage(shot, 0, headH);

    if (rect) {
      var x = rect.left * s, y = headH + rect.top * s, w = rect.width * s, h = rect.height * s;
      var lw = Math.max(3, 2.5 * s), hs = Math.max(10, 7 * s);
      ctx.fillStyle = 'rgba(45,127,249,0.12)';
      ctx.fillRect(x, y, w, h);
      ctx.strokeStyle = CFG.select;
      ctx.lineWidth = lw;
      ctx.strokeRect(x, y, w, h);
      ctx.fillStyle = '#fff';
      [[x, y], [x + w, y], [x, y + h], [x + w, y + h]].forEach(function (p) {
        ctx.fillRect(p[0] - hs / 2, p[1] - hs / 2, hs, hs);
        ctx.strokeRect(p[0] - hs / 2, p[1] - hs / 2, hs, hs);
      });
    }

    var fy = headH + shot.height;
    ctx.fillStyle = '#fff7d6';
    ctx.fillRect(0, fy, W, footH);
    ctx.fillStyle = CFG.accent;
    ctx.fillRect(0, fy, W, Math.max(4, s * 3));
    ctx.fillStyle = '#111';
    ctx.font = font(700);
    ctx.fillText('O QUE PRECISA SER MODIFICADO:', pad, fy + pad);
    ctx.font = font(400);
    bodyLines.forEach(function (l, i) { ctx.fillText(l, pad, fy + pad + lh * (i + 1)); });
    return c;
  }

  function toBlob(canvas) {
    return new Promise(function (res, rej) {
      canvas.toBlob(function (b) { b ? res(b) : rej(new Error('blob')); }, 'image/png');
    });
  }

  function copyBlob(blob) {
    try {
      return navigator.clipboard
        .write([new ClipboardItem({ 'image/png': blob })])
        .then(function () { return true; }, function () { return false; });
    } catch (e) {
      return Promise.resolve(false);
    }
  }

  /* ---------- UI ---------- */
  var CSS =
    '*{box-sizing:border-box;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif}' +
    '[hidden]{display:none!important}' +
    '.wrap{position:fixed;right:14px;top:50%;transform:translateY(-50%);display:flex;flex-direction:row;align-items:center;gap:10px;pointer-events:auto}' +
    '.fab{width:54px;height:54px;border-radius:50%;border:1px solid rgba(255,255,255,.1);background:var(--c);cursor:pointer;display:grid;place-items:center;box-shadow:0 6px 20px rgba(0,0,0,.4);transition:transform .15s;padding:0}' +
    '.fab img{height:30px;width:auto;display:block;pointer-events:none}' +
    '.fab:active{transform:scale(.94)}' +
    '.menu{background:#fff;border-radius:14px;box-shadow:0 10px 30px rgba(0,0,0,.3);padding:6px;display:flex;flex-direction:column;min-width:220px}' +
    '.menu button{border:0;background:none;text-align:left;padding:12px 14px;font-size:15px;border-radius:10px;cursor:pointer;color:#111}' +
    '.menu button:hover{background:#f3f4f6}' +
    '.layer{position:fixed;inset:0;pointer-events:auto;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.6);padding:16px;overscroll-behavior:contain}' +
    '.card{background:#fff;color:#111;border-radius:16px;padding:20px;width:min(440px,100%);max-height:92vh;overflow:auto;box-shadow:0 20px 60px rgba(0,0,0,.4)}' +
    '.card h3{margin:0 0 6px;font-size:18px}' +
    '.card p{margin:0 0 12px;font-size:14px;color:#4b5563}' +
    '.meta{background:#f3f4f6;border-radius:10px;padding:8px 10px;font-size:13px;color:#374151;margin-bottom:12px}' +
    'textarea{width:100%;min-height:110px;border:1.5px solid #d1d5db;border-radius:10px;padding:10px;font-size:15px;resize:vertical;outline:none}' +
    'textarea:focus{border-color:var(--a)}textarea.err{border-color:#dc2626}' +
    '.row{display:flex;gap:8px;justify-content:flex-end;margin-top:12px}' +
    '.btn{border:0;border-radius:10px;padding:11px 16px;font-size:15px;cursor:pointer;font-weight:600}' +
    '.primary{background:var(--c);color:#fff}.ghost{background:#e5e7eb;color:#111}' +
    '.center{text-align:center}.ok{width:56px;height:56px;margin:0 auto 10px;border-radius:50%;background:#16a34a;color:#fff;display:grid;place-items:center;font-size:30px}' +
    '.thumb{max-width:100%;max-height:34vh;border-radius:10px;border:1px solid #e5e7eb;margin:4px auto}' +
    '.phone{border:12px solid #111;border-radius:40px;background:#111;transform-origin:center;box-shadow:0 20px 60px rgba(0,0,0,.5)}' +
    '.phone iframe{display:block;border:0;border-radius:26px;background:#fff}' +
    '.x{position:fixed;top:14px;right:14px}' +
    '.hl{position:fixed;pointer-events:none;border:2px solid var(--s);background:rgba(45,127,249,.12);border-radius:2px}' +
    '.hl span{position:absolute;left:-2px;top:-24px;background:var(--s);color:#fff;font-size:12px;font-weight:600;padding:3px 8px;border-radius:6px 6px 6px 0;white-space:nowrap;max-width:60vw;overflow:hidden;text-overflow:ellipsis}' +
    '.hl.in span{top:0;left:0;border-radius:0 0 6px 0}' +
    '.bar{position:fixed;top:12px;left:50%;transform:translateX(-50%);background:var(--c);color:#fff;padding:10px 14px;border-radius:12px;display:flex;align-items:center;gap:12px;font-size:14px;box-shadow:0 8px 24px rgba(0,0,0,.4);pointer-events:auto;max-width:94vw}' +
    '.bar button{border:0;border-radius:8px;padding:6px 12px;background:var(--a);color:#111;font-weight:700;cursor:pointer}' +
    '.fab{position:relative}' +
    '.badge{position:absolute;top:-4px;right:-4px;min-width:20px;height:20px;border-radius:10px;background:var(--a);color:#111;font-size:12px;font-weight:700;display:grid;place-items:center;padding:0 5px}' +
    '.list{max-height:50vh;overflow:auto;display:grid;gap:10px;margin:8px 0}' +
    '.it{display:flex;gap:10px;align-items:center;background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;padding:8px}' +
    '.it img{width:64px;height:64px;object-fit:cover;object-position:top;border-radius:8px;flex:none}' +
    '.it .tx{flex:1;min-width:0;font-size:13px;color:#374151;word-break:break-word}.it .tx b{display:block;color:#111}' +
    '.ib{display:flex;flex-direction:column;gap:4px}.ib button{border:0;background:#e5e7eb;border-radius:8px;padding:6px 8px;font-size:12px;cursor:pointer}' +
    '.prog{height:8px;background:#e5e7eb;border-radius:6px;overflow:hidden;margin:10px 0}.prog i{display:block;height:100%;background:var(--a);width:0;transition:width .2s}' +
    '.chip{background:#eff6ff;border:1px solid #bfdbfe;color:#1e3a8a;border-radius:10px;padding:8px 10px;font-size:13px;margin-bottom:12px;word-break:break-word}';

  function build() {
    document.querySelectorAll('[data-review-tool]').forEach(function (n) { n.remove(); });
    host = document.createElement('div');
    host.setAttribute('data-review-tool', '');
    host.style.cssText = 'all:initial;position:fixed;inset:0;pointer-events:none;z-index:2147483647;';
    host.style.setProperty('--c', CFG.color);
    host.style.setProperty('--a', CFG.accent);
    host.style.setProperty('--s', CFG.select);
    root = host.attachShadow({ mode: 'open' });
    root.innerHTML =
      '<style>' + CSS + '</style>' +
      '<div class="wrap"><div class="menu" hidden>' +
      (inMobileFrame ? '' : '<button data-act="mobile">📱 Ver em mobile</button>') +
      (GALLERY ? '<button data-act="tray">🖼️ Minhas solicitações <b class="cnt"></b></button>' : '') +
      '<button data-act="request">✏️ Solicitar alteração</button>' +
      '</div><button class="fab" data-act="toggle" aria-label="Ferramentas de revisão"><img src="' + LOGO + '" alt="Revisão"><span class="badge" hidden></span></button></div>' +
      '<div class="hl" style="display:none"><span></span></div>' +
      '<div class="bar" hidden>Clique no elemento que deseja alterar<button data-act="cancel-pick">Cancelar</button></div>' +
      '<div class="layer" hidden></div>';
    menu = root.querySelector('.menu');
    if (GALLERY) refreshTray();
    layer = root.querySelector('.layer');
    root.addEventListener('click', onClick);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { if (pickCleanup) pickCleanup(); closeLayer(); menu.hidden = true; picked = null; }
    });
    document.body.appendChild(host);
  }

  function openLayer(html) { layer.innerHTML = html; layer.hidden = false; }
  function closeLayer() { layer.hidden = true; layer.innerHTML = ''; }

  function onClick(e) {
    var t = e.target.closest('[data-act]');
    if (!t) {
      if (e.target === layer) closeLayer();
      return;
    }
    var act = t.dataset.act;
    if (act === 'toggle') { menu.hidden = !menu.hidden; if (GALLERY && !menu.hidden) refreshTray(); }
    else if (act === 'tray') { menu.hidden = true; showTray(); }
    else if (act === 'send') send();
    else if (act === 'copyall') copyAll();
    else if (act === 'pdf') pdfAll(t);
    else if (act === 'shareall') shareAll();
    else if (act === 'clear') { trayClear().then(showTray); }
    else if (act === 'it-del') { trayRemove(t.dataset.id).then(showTray); }
    else if (act === 'it-copy') {
      var it = tray.filter(function (x) { return String(x.id) === t.dataset.id; })[0];
      if (it) copyBlob(it.blob).then(function (ok) { t.textContent = ok ? 'Copiado!' : 'Falhou'; });
    }
    else if (act === 'copymsg') {
      try { navigator.clipboard.writeText(lastMsg).then(function () { t.textContent = 'Copiado!'; }, function () { t.textContent = 'Copie manualmente'; }); }
      catch (er) { t.textContent = 'Copie manualmente'; }
    }
    else if (act === 'wasent') {
      var nn = String(CFG.whatsapp || '').replace(/\D/g, '');
      window.open('https://wa.me/' + nn + '?text=' + encodeURIComponent(lastMsg), '_blank', 'noopener');
    }
    else if (act === 'mobile') { menu.hidden = true; showMobile(); }
    else if (act === 'request' || act === 'repick') { menu.hidden = true; startPick(); }
    else if (act === 'cancel-pick') { if (pickCleanup) pickCleanup(); }
    else if (act === 'close' || act === 'cancel') { picked = null; closeLayer(); }
    else if (act === 'generate') generate(t);
    else if (act === 'wa') {
      var n = String(CFG.whatsapp || '').replace(/\D/g, '');
      window.open(n ? 'https://wa.me/' + n : 'https://web.whatsapp.com/', '_blank', 'noopener');
    }
  }

  function showMobile() {
    var w = CFG.mobileWidth, h = CFG.mobileHeight;
    var k = Math.min(1, (innerHeight - 40) / (h + 24), (innerWidth - 20) / (w + 24));
    var srcdoc = CFG.mobileMode === 'srcdoc';
    openLayer(
      '<button class="btn primary x" data-act="close">✕ Fechar mobile</button>' +
      '<div class="phone" style="transform:scale(' + k + ')">' +
      '<iframe name="rt-mobile"' + (srcdoc ? '' : ' src="' + esc(location.href) + '"') + ' allow="clipboard-write" style="width:' + w + 'px;height:' + h + 'px"></iframe></div>'
    );
    if (srcdoc) {
      var c = document.documentElement.cloneNode(true);
      c.querySelectorAll('[data-review-tool]').forEach(function (n) { n.remove(); });
      layer.querySelector('iframe').srcdoc = '<!DOCTYPE html>' + c.outerHTML;
    }
  }

  function startPick() {
    closeLayer();
    picked = null;
    var hl = root.querySelector('.hl'), tag = hl.querySelector('span'), bar = root.querySelector('.bar');
    bar.hidden = false;

    function fromHost(e) {
      var path = e.composedPath ? e.composedPath() : [];
      return path.indexOf(host) > -1;
    }
    function target(e) {
      var el = e.target;
      if (!el || el === document.documentElement || el === document.body) return null;
      return el;
    }
    function move(e) {
      if (fromHost(e)) return;
      var el = target(e);
      if (!el) { hl.style.display = 'none'; return; }
      var r = el.getBoundingClientRect();
      hl.style.cssText = 'left:' + r.left + 'px;top:' + r.top + 'px;width:' + r.width + 'px;height:' + r.height + 'px;display:block';
      hl.className = 'hl' + (r.top < 26 ? ' in' : '');
      tag.textContent = describeEl(el).sel;
    }
    function click(e) {
      if (fromHost(e)) return;
      e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
      var el = target(e);
      if (!el) return;
      stop();
      picked = el;
      showForm();
    }
    function stop() {
      document.removeEventListener('pointermove', move, true);
      document.removeEventListener('pointerdown', move, true);
      document.removeEventListener('click', click, true);
      hl.style.display = 'none';
      bar.hidden = true;
      pickCleanup = null;
    }
    document.addEventListener('pointermove', move, true);
    document.addEventListener('pointerdown', move, true);
    document.addEventListener('click', click, true);
    pickCleanup = stop;
  }

  function showForm() {
    var info = collectInfo();
    openLayer(
      '<div class="card"><h3>Solicitar alteração</h3>' +
      '<div class="meta"><b>Tela:</b> ' + esc(info.screen) + '<br><b>Seção:</b> ' + esc(info.section) + '</div>' +
      '<div class="chip"><b>Elemento:</b> ' + esc(info.element) + '</div>' +
      '<textarea placeholder="Descreva o que precisa ser modificado…"></textarea>' +
      '<div class="row"><button class="btn ghost" data-act="cancel">Cancelar</button>' +
      '<button class="btn ghost" data-act="repick">Trocar elemento</button>' +
      '<button class="btn primary" data-act="generate">Gerar imagem</button></div></div>'
    );
    setTimeout(function () { var ta = layer.querySelector('textarea'); if (ta) ta.focus(); }, 50);
  }

  function showDone(copied, blob, canvas) {
    var url = URL.createObjectURL(blob);
    var file = null;
    try { file = new File([blob], 'alteracao.png', { type: 'image/png' }); } catch (e) {}
    var canShare = !copied && file && navigator.canShare && navigator.canShare({ files: [file] });
    openLayer(
      '<div class="card center">' +
      '<div class="ok">' + (copied ? '✓' : '!') + '</div>' +
      '<h3>' + (copied ? 'Imagem copiada!' : 'Não consegui copiar automaticamente') + '</h3>' +
      '<p>' + (copied ? 'Você já pode colar no WhatsApp' : 'Baixe a imagem e envie no WhatsApp') + '</p>' +
      '<img class="thumb" src="' + url + '" alt="Prévia">' +
      '<div class="row" style="justify-content:center">' +
      '<button class="btn ghost" data-act="close">Fechar</button>' +
      (copied ? '' : '<button class="btn primary" data-act="copyimg">Copiar imagem</button><button class="btn ghost" data-act="dl">Baixar</button>') +
      (canShare ? '<button class="btn ghost" data-act="share">Compartilhar</button>' : '') +
      '<button class="btn primary" data-act="wa">Abrir WhatsApp</button></div></div>'
    );
    layer.querySelectorAll('[data-act=dl]').forEach(function (b) {
      b.addEventListener('click', function () {
        var a = document.createElement('a');
        a.href = url; a.download = 'alteracao-' + Date.now() + '.png';
        document.body.appendChild(a); a.click(); a.remove();
      });
    });
    layer.querySelectorAll('[data-act=copyimg]').forEach(function (b) {
      b.addEventListener('click', function () {
        copyBlob(blob).then(function (ok) {
          if (!ok) { b.textContent = 'Não foi possível copiar'; return; }
          layer.querySelector('h3').textContent = 'Imagem copiada!';
          layer.querySelector('p').textContent = 'Você já pode colar no WhatsApp';
          layer.querySelector('.ok').textContent = '✓';
          layer.querySelector('.ok').style.background = '#16a34a';
          b.remove();
        });
      });
    });
    layer.querySelectorAll('[data-act=share]').forEach(function (b) {
      b.addEventListener('click', function () { navigator.share({ files: [file] }).catch(function () {}); });
    });
  }

  function showError() {
    openLayer(
      '<div class="card center"><div class="ok" style="background:#dc2626">✕</div>' +
      '<h3>Não foi possível gerar o print</h3>' +
      '<p>Verifique a conexão (a biblioteca de captura é carregada da internet) e tente novamente.</p>' +
      '<div class="row" style="justify-content:center"><button class="btn primary" data-act="close">Fechar</button></div></div>'
    );
  }

  /* ---------- galeria (bandeja) + envio ao Drive ---------- */
  function idb() {
    return new Promise(function (res) {
      try {
        var rq = indexedDB.open('review-tool', 1);
        rq.onupgradeneeded = function () { rq.result.createObjectStore('shots', { keyPath: 'id', autoIncrement: true }); };
        rq.onsuccess = function () { res(rq.result); };
        rq.onerror = function () { res(null); };
      } catch (e) { res(null); }
    });
  }

  function refreshTray() {
    return idb().then(function (db) {
      DB = db;
      if (!db) { updateBadge(); return tray; }
      return new Promise(function (res) {
        var out = [];
        var tx = db.transaction('shots');
        tx.objectStore('shots').openCursor().onsuccess = function (e) {
          var c = e.target.result;
          if (c) { if (c.value.project === CFG.project) out.push(c.value); c.continue(); }
          else { tray = out; updateBadge(); res(out); }
        };
        tx.onerror = function () { res(tray); };
      });
    });
  }

  function trayAdd(item) {
    return new Promise(function (res) {
      function mem() { item.id = Date.now() + Math.random(); tray.push(item); res(); }
      if (!DB) return mem();
      try {
        var rq = DB.transaction('shots', 'readwrite').objectStore('shots').add(item);
        rq.onsuccess = function () { item.id = rq.result; tray.push(item); res(); };
        rq.onerror = mem;
      } catch (e) { mem(); }
    });
  }

  function trayRemove(id) {
    tray = tray.filter(function (x) { return String(x.id) !== String(id); });
    return new Promise(function (res) {
      if (!DB) return res();
      try {
        var tx = DB.transaction('shots', 'readwrite');
        tx.objectStore('shots').delete(isNaN(Number(id)) ? id : Number(id));
        tx.oncomplete = res; tx.onerror = res;
      } catch (e) { res(); }
    }).then(updateBadge);
  }

  function trayClear() {
    var ids = tray.map(function (x) { return x.id; });
    return Promise.all(ids.map(trayRemove));
  }

  function updateBadge() {
    if (!root) return;
    var n = tray.length, b = root.querySelector('.badge'), c = root.querySelector('.cnt');
    if (b) { b.hidden = !n; b.textContent = n; }
    if (c) c.textContent = n ? '(' + n + ')' : '';
  }

  function showAdded(blob) {
    var url = URL.createObjectURL(blob);
    openLayer(
      '<div class="card center"><div class="ok">✓</div>' +
      '<h3>Solicitação #' + tray.length + ' adicionada</h3>' +
      '<p>Você tem ' + tray.length + ' na bandeja. Adicione quantas quiser e envie tudo de uma vez.</p>' +
      '<img class="thumb" src="' + url + '" alt="Prévia">' +
      '<div class="row" style="justify-content:center">' +
      '<button class="btn ghost" data-act="close">Adicionar outra</button>' +
      '<button class="btn primary" data-act="tray">Ver e enviar</button></div></div>'
    );
  }

  function showTray() {
    refreshTray().then(function () {
      if (!tray.length) {
        openLayer('<div class="card center"><h3>Nenhuma solicitação ainda</h3><p>Use “Solicitar alteração” para adicionar.</p>' +
          '<div class="row" style="justify-content:center"><button class="btn primary" data-act="close">Fechar</button></div></div>');
        return;
      }
      var items = tray.map(function (it, i) {
        return '<div class="it"><img src="' + URL.createObjectURL(it.blob) + '" alt="">' +
          '<div class="tx"><b>#' + (i + 1) + ' · ' + esc(it.section) + '</b>' + esc(clip(it.element, 50)) +
          '<br>' + esc(clip(it.text, 80)) + '</div>' +
          '<div class="ib"><button data-act="it-copy" data-id="' + it.id + '">Copiar</button>' +
          '<button data-act="it-del" data-id="' + it.id + '">Remover</button></div></div>';
      }).join('');
      openLayer(
        '<div class="card"><h3>Solicitações (' + tray.length + ')</h3>' +
        '<p>Confira e envie tudo de uma vez.</p>' +
        '<div class="list">' + items + '</div>' +
        '<div class="row" style="flex-wrap:wrap">' +
        '<button class="btn ghost" data-act="close">Fechar</button>' +
        '<button class="btn ghost" data-act="clear">Limpar</button>' +
        '<button class="btn ghost" data-act="pdf">Baixar PDF</button>' +
        (canShareFiles() ? '<button class="btn ghost" data-act="shareall">Compartilhar</button>' : '') +
        (CFG.driveUrl ? '<button class="btn ghost" data-act="send">Enviar ao Drive</button>' : '') +
        '<button class="btn primary" data-act="copyall">Copiar tudo</button></div></div>'
      );
    });
  }

  function canShareFiles() {
    try {
      return typeof navigator.canShare === 'function' && tray.length &&
        navigator.canShare({ files: [new File([tray[0].blob], 'a.png', { type: 'image/png' })] });
    } catch (e) { return false; }
  }

  function failCard(msg) {
    openLayer(
      '<div class="card center"><div class="ok" style="background:#dc2626">✕</div><h3>Algo deu errado</h3>' +
      '<p>' + esc(msg) + '</p><div class="row" style="justify-content:center">' +
      '<button class="btn primary" data-act="tray">Voltar à bandeja</button></div></div>'
    );
  }

  // junta todas as solicitações numa imagem única (empilhadas)
  async function combine() {
    var imgs = await Promise.all(tray.map(function (it) { return createImageBitmap(it.blob); }));
    var W = Math.min(1080, Math.max.apply(null, imgs.map(function (i) { return i.width; })));
    var bar = 56;
    var ws = imgs.map(function (i) { return Math.min(i.width, W); });
    var hs = imgs.map(function (i, k) { return Math.round(i.height * (ws[k] / i.width)); });
    var total = hs.reduce(function (a, b) { return a + b; }, 0) + bar * imgs.length;
    var c = document.createElement('canvas');
    c.width = W; c.height = total;
    var ctx = c.getContext('2d');
    ctx.fillStyle = '#e5e7eb';
    ctx.fillRect(0, 0, W, total);
    var y = 0;
    imgs.forEach(function (img, k) {
      ctx.fillStyle = '#111827';
      ctx.fillRect(0, y, W, bar);
      ctx.fillStyle = CFG.accent;
      ctx.font = '700 24px system-ui,-apple-system,Segoe UI,Roboto,sans-serif';
      ctx.textBaseline = 'middle';
      ctx.fillText('#' + (k + 1) + ' de ' + imgs.length, 20, y + bar / 2);
      y += bar;
      ctx.drawImage(img, 0, y, ws[k], hs[k]);
      y += hs[k];
    });
    return c;
  }

  async function copyAll() {
    try {
      var c = await combine();
      var blob = await toBlob(c);
      var ok = await copyBlob(blob);
      showDone(ok, blob, c);
    } catch (e) {
      failCard('Não foi possível montar a imagem única. Tente baixar o PDF.');
    }
  }

  function shareAll() {
    var files = tray.map(function (it, i) { return new File([it.blob], 'solicitacao-' + two(i + 1) + '.png', { type: 'image/png' }); });
    navigator.share({ files: files, text: 'Revisão do projeto ' + CFG.project }).catch(function () {});
  }

  async function pdfAll(btn) {
    var label = btn.textContent;
    btn.disabled = true; btn.textContent = 'Gerando PDF…';
    try {
      if (!(window.jspdf && window.jspdf.jsPDF)) {
        await new Promise(function (res, rej) {
          var sc = document.createElement('script');
          sc.src = CFG.jspdf; sc.onload = res; sc.onerror = function () { rej(new Error('jspdf')); };
          document.head.appendChild(sc);
        });
      }
      var J = window.jspdf.jsPDF, doc = null;
      for (var i = 0; i < tray.length; i++) {
        var bmp = await createImageBitmap(tray[i].blob);
        var w = bmp.width, h = bmp.height, o = w > h ? 'l' : 'p';
        var data = 'data:image/png;base64,' + (await b64(tray[i].blob));
        if (!doc) doc = new J({ unit: 'px', format: [w, h], orientation: o, compress: true });
        else doc.addPage([w, h], o);
        doc.addImage(data, 'PNG', 0, 0, w, h);
      }
      var d = new Date();
      doc.save('Revisao - ' + safe(CFG.project) + ' - ' + two(d.getDate()) + '-' + two(d.getMonth() + 1) + '-' + d.getFullYear() + '.pdf');
      btn.disabled = false; btn.textContent = 'PDF gerado ✓';
    } catch (e) {
      btn.disabled = false; btn.textContent = label;
      failCard('Não foi possível gerar o PDF (ele precisa de internet). Use “Copiar tudo”.');
    }
  }

  function post(payload) {
    return fetch(CFG.driveUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(Object.assign({ key: CFG.driveKey }, payload))
    }).then(function (r) { return r.json(); }).then(function (j) {
      if (!j.ok) throw new Error(j.error || 'Erro no envio');
      return j;
    });
  }

  function b64(blob) {
    return new Promise(function (res, rej) {
      var fr = new FileReader();
      fr.onload = function () { res(String(fr.result).split(',')[1]); };
      fr.onerror = rej;
      fr.readAsDataURL(blob);
    });
  }

  function two(n) { return (n < 10 ? '0' : '') + n; }
  function safe(s) { return clip(String(s).replace(/[\\/:*?"<>|#%]/g, '-'), 40); }

  async function send() {
    if (!tray.length) return;
    var total = tray.length;
    function progress(n, label) {
      openLayer(
        '<div class="card center"><h3>' + esc(label) + '</h3>' +
        '<div class="prog"><i style="width:' + Math.round((n / (total + 2)) * 100) + '%"></i></div>' +
        '<p>Não feche esta página.</p></div>'
      );
    }
    try {
      progress(0, 'Preparando envio…');
      if (!upState) {
        var d = new Date();
        var title = two(d.getDate()) + '-' + two(d.getMonth() + 1) + '-' + d.getFullYear() + ' ' + two(d.getHours()) + 'h' + two(d.getMinutes());
        var init = await post({ action: 'init', project: CFG.project, title: title });
        upState = { folderId: init.folderId, url: init.url, sent: {} };
      }
      var summary = 'Projeto: ' + CFG.project + '\nEnviado em: ' + new Date().toLocaleString('pt-BR') + '\n\n';
      for (var i = 0; i < tray.length; i++) {
        var it = tray[i];
        summary += '#' + (i + 1) + ' — Tela: ' + it.screen + ' | Seção: ' + it.section +
          (it.element ? ' | Elemento: ' + it.element : '') + '\n' + it.text + '\n\n';
        if (upState.sent[it.id]) continue;
        progress(i + 1, 'Enviando ' + (i + 1) + ' de ' + total + '…');
        await post({
          action: 'add', folderId: upState.folderId,
          name: two(i + 1) + ' - ' + safe(it.section) + '.png',
          description: it.text + '\nTela: ' + it.screen + '\nSeção: ' + it.section + (it.element ? '\nElemento: ' + it.element : ''),
          data: await b64(it.blob)
        });
        upState.sent[it.id] = true;
      }
      progress(total + 1, 'Finalizando…');
      await post({ action: 'finish', folderId: upState.folderId, summary: summary });
      var link = upState.url;
      upState = null;
      await trayClear();
      lastMsg = 'Revisão do projeto ' + CFG.project + ' (' + total + (total > 1 ? ' solicitações' : ' solicitação') + '): ' + link;
      openLayer(
        '<div class="card center"><div class="ok">✓</div><h3>Enviado!</h3>' +
        '<p>' + total + (total > 1 ? ' solicitações enviadas' : ' solicitação enviada') + ' para o Drive.</p>' +
        '<div class="chip">' + esc(lastMsg) + '</div>' +
        '<div class="row" style="justify-content:center;flex-wrap:wrap">' +
        '<button class="btn ghost" data-act="close">Fechar</button>' +
        '<button class="btn ghost" data-act="copymsg">Copiar mensagem</button>' +
        '<button class="btn primary" data-act="wasent">Abrir WhatsApp</button></div></div>'
      );
    } catch (err) {
      openLayer(
        '<div class="card center"><div class="ok" style="background:#dc2626">✕</div><h3>Não foi possível enviar</h3>' +
        '<p>' + esc(err && err.message ? err.message : 'Falha na conexão') + '. Suas solicitações continuam salvas — tente de novo.</p>' +
        '<div class="row" style="justify-content:center"><button class="btn ghost" data-act="close">Fechar</button>' +
        '<button class="btn primary" data-act="send">Tentar novamente</button></div></div>'
      );
    }
  }

  async function generate(btn) {
    var ta = layer.querySelector('textarea');
    var text = ta ? ta.value.trim() : '';
    if (!text) { if (ta) { ta.classList.add('err'); ta.focus(); } return; }
    btn.disabled = true;
    btn.textContent = 'Gerando…';

    var info = collectInfo();
    var rect = null;
    if (picked && document.contains(picked)) {
      var r = picked.getBoundingClientRect();
      var l = Math.max(0, r.left), t = Math.max(0, r.top);
      var rr = Math.min(innerWidth, r.right), bb = Math.min(innerHeight, r.bottom);
      if (rr > l && bb > t) rect = { left: l, top: t, width: rr - l, height: bb - t };
    }
    host.style.visibility = 'hidden';
    try {
      await raf2();
      await loadH2C();
      var shot = await window.html2canvas(document.documentElement, {
        x: scrollX, y: scrollY,
        width: innerWidth, height: innerHeight,
        windowWidth: innerWidth, windowHeight: innerHeight,
        scale: Math.min(window.devicePixelRatio || 1, 2),
        useCORS: true, logging: false, backgroundColor: '#ffffff',
        ignoreElements: function (el) { return el === host; }
      });
      host.style.visibility = '';
      var out = compose(shot, info, text, rect);
      var blob = await toBlob(out);
      if (GALLERY) {
        await refreshTray();
        await trayAdd({ project: CFG.project, blob: blob, text: text, screen: info.screen, section: info.section, element: info.element, device: info.device, when: info.when });
        updateBadge();
        showAdded(blob);
        return;
      }
      var copied = await copyBlob(blob);
      showDone(copied, blob, out);
    } catch (err) {
      host.style.visibility = '';
      showError();
    }
  }

  if (document.body) build();
  else document.addEventListener('DOMContentLoaded', build);
})();
