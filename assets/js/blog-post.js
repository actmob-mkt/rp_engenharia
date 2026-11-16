/* Post do blog: barra de leitura e compartilhamento */
(function () {
  const { a, t } = RP;
  const bar = a('barRef')[0], body = a('bodyRef')[0];
  const onScroll = () => {
    if (!bar || !body) return;
    const r = body.getBoundingClientRect(), total = r.height - window.innerHeight * 0.6;
    const k = Math.max(0, Math.min(1, (window.innerHeight * 0.4 - r.top) / Math.max(1, total)));
    bar.style.width = (k * 100).toFixed(1) + '%';
  };
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  const url = location.href, title = document.title.replace(/ \| Blog RP$/, '');
  a('shareIn').forEach(el => el.setAttribute('href', 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(url)));
  a('shareWa').forEach(el => el.setAttribute('href', 'https://wa.me/?text=' + encodeURIComponent(title + ' ' + url)));
  a('copy').forEach(b => b.addEventListener('click', () => {
    try { navigator.clipboard.writeText(url); } catch (e) {}
    t('copyLabel', 'Link copiado ✓');
    setTimeout(() => t('copyLabel', 'Copiar link'), 2000);
  }));
})();
