/* Trabalhe conosco: envio de currículo */
(function () {
  const { $, $$, a, t } = RP;
  const form = a('submit')[0]; if (!form) return;
  const endpoint = window.RP_DATA && RP_DATA.config.endpointCurriculo;
  t('modeNote', endpoint ? '' : 'Modo demonstração: configure o endpoint em js/data/site-data.js.');
  const F = { nome: $('#c-nome'), email: $('#c-email'), tel: $('#c-tel'), cidade: $('#c-cidade'), uf: $('#c-uf'), area: $('#c-area'), msg: $('#c-msg') };
  const lgpd = a('v.lgpd')[0];
  const perfLabels = a('p.border'), perfInputs = perfLabels.map(l => l.querySelector('input'));
  const drop = a('dragOver')[0], fileIn = a('pickFile')[0];
  const noFile = $('[data-if="noFile"]'), hasFile = $('[data-if="hasFile"]');
  let file = null, busy = false;

  const err = (k, m) => {
    t('err.' + k, m || '');
    const el = k === 'lgpd' ? lgpd : F[k];
    if (el) { el.setAttribute('aria-invalid', m ? 'true' : 'false'); if (k !== 'lgpd') el.style.borderColor = m ? '#B3261E' : '#8C93B3'; }
  };
  ['nome', 'email', 'tel', 'cidade'].forEach(k => F[k].addEventListener('input', () => err(k, '')));
  ['uf', 'area'].forEach(k => F[k].addEventListener('change', () => err(k, '')));
  F.tel.addEventListener('input', () => { F.tel.value = RP.maskTel(F.tel.value); });
  lgpd.addEventListener('change', () => err('lgpd', ''));

  function paintPerfis() {
    perfLabels.forEach((l, i) => { const c = perfInputs[i].checked; l.style.borderColor = c ? '#0B1B5C' : '#8C93B3'; l.style.background = c ? '#0B1B5C' : '#FFFFFF'; l.style.color = c ? '#FFFFFF' : '#0A1033'; });
  }
  perfInputs.forEach(r => r.addEventListener('change', () => { paintPerfis(); t('err.perfil', ''); }));
  a('preferPCD').forEach(el => el.addEventListener('click', () => { const i = perfInputs.findIndex(r => r.value === 'PCD'); if (i >= 0) { perfInputs[i].checked = true; paintPerfis(); t('err.perfil', ''); } }));

  const checkFile = f => {
    if (!f) return 'Anexe seu currículo.';
    if (!/\.(pdf|docx?)$/i.test(f.name)) return 'Formato não aceito. Envie PDF, DOC ou DOCX.';
    if (f.size > 5 * 1024 * 1024) return 'Arquivo acima de 5 MB. Reduza o tamanho e tente de novo.';
    return '';
  };
  const dragStyle = on => { drop.style.borderColor = on ? '#FF7A1A' : '#8C93B3'; drop.style.background = on ? '#FFF1E8' : '#F7F8FA'; };
  function setFile(f) {
    const e = checkFile(f);
    file = e ? null : f;
    t('err.file', e); dragStyle(false); if (e) drop.style.borderColor = '#B3261E';
    renderFile();
  }
  function renderFile() {
    noFile.hidden = !!file; hasFile.hidden = !file;
    if (file) {
      t('fileName', file.name); t('fileExt', file.name.split('.').pop().toUpperCase());
      t('fileSize', (file.size / 1024 / 1024).toFixed(2).replace('.', ',') + ' MB');
      a('removeFile').forEach(b => b.setAttribute('aria-label', 'Remover arquivo ' + file.name));
    }
  }
  drop.addEventListener('dragover', e => { e.preventDefault(); dragStyle(true); });
  drop.addEventListener('dragleave', () => dragStyle(false));
  drop.addEventListener('drop', e => { e.preventDefault(); setFile(e.dataTransfer.files[0]); });
  fileIn.addEventListener('change', e => { setFile(e.target.files[0]); e.target.value = ''; });
  a('removeFile').forEach(b => b.addEventListener('click', () => { file = null; renderFile(); }));

  function validate() {
    const v = k => F[k].value, e = {};
    if (v('nome').trim().split(/\s+/).length < 2) e.nome = 'Informe nome e sobrenome.';
    if (!RP.emailOk(v('email'))) e.email = 'Informe um e-mail válido.';
    if (v('tel').replace(/\D/g, '').length < 10) e.tel = 'Informe telefone com DDD.';
    if (!v('cidade').trim()) e.cidade = 'Informe a cidade.';
    if (!v('uf')) e.uf = 'Selecione o estado.';
    if (!v('area')) e.area = 'Selecione a área.';
    if (!perfInputs.some(r => r.checked)) e.perfil = 'Selecione um perfil.';
    const fe = checkFile(file); if (fe) e.file = fe;
    if (!lgpd.checked) e.lgpd = 'É necessário autorizar o tratamento dos dados.';
    ['nome', 'email', 'tel', 'cidade', 'uf', 'area', 'lgpd'].forEach(k => err(k, e[k]));
    t('err.perfil', e.perfil || ''); t('err.file', e.file || '');
    if (e.file) drop.style.borderColor = '#B3261E';
    return !Object.keys(e).length;
  }
  function loading(on) {
    busy = on;
    const b = a('isLoading')[0]; b.disabled = on; b.style.opacity = on ? 0.7 : 1;
    $('[data-if="isLoading"]', form).hidden = !on;
    t('btnLabel', on ? 'Enviando…' : 'Enviar currículo');
  }
  form.addEventListener('submit', async ev => {
    ev.preventDefault(); if (busy) return;
    if (!validate()) { setTimeout(() => { const el = form.querySelector('[aria-invalid="true"]'); el && el.focus(); }, 30); return; }
    $('[data-if="isError"]').hidden = true; loading(true);
    const fd = new FormData(), perfil = (perfInputs.find(r => r.checked) || {}).value || '';
    fd.append('_assunto', 'Currículo — ' + F.area.value + ' — ' + perfil);
    Object.keys(F).forEach(k => fd.append(k, F[k].value));
    fd.append('perfil', perfil); fd.append('lgpd', lgpd.checked); fd.append('curriculo', file);
    try {
      await RP.send(endpoint, fd, 1200);
      $('[data-if="showForm"]').hidden = true; $('[data-if="isSuccess"]').hidden = false;
      setTimeout(() => { const ok = a('okRef')[0]; ok && ok.focus(); }, 30);
    } catch (x) {
      t('errorMsg', 'Não foi possível enviar agora. Verifique sua conexão e tente de novo, ou envie o currículo para comercial@rpengenhariaindustrial.com.br.');
      $('[data-if="isError"]').hidden = false;
    }
    loading(false);
  });
  a('reset').forEach(b => b.addEventListener('click', () => {
    form.reset(); file = null; renderFile(); paintPerfis();
    $('[data-if="showForm"]').hidden = false; $('[data-if="isSuccess"]').hidden = true;
  }));
  paintPerfis(); renderFile();
})();
