/* Quem somos: linha do tempo arrastável e galeria com ampliação */
(function () {
  const { a, $, reduce } = RP;
  const track = a('trackRef')[0];
  const by = dir => {
    if (!track) return;
    const li = track.querySelector('li'), w = li ? li.getBoundingClientRect().width : 320;
    track.scrollBy({ left: dir * w, behavior: reduce() ? 'auto' : 'smooth' });
  };
  a('prev').forEach(b => b.addEventListener('click', () => by(-1)));
  a('next').forEach(b => b.addEventListener('click', () => by(1)));
  if (track) {
    let drag = null;
    track.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') { e.preventDefault(); by(1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); by(-1); }
    });
    track.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') return; drag = { x: e.clientX, s: track.scrollLeft }; track.style.scrollSnapType = 'none'; track.style.cursor = 'grabbing'; });
    track.addEventListener('pointermove', e => { if (drag) track.scrollLeft = drag.s - (e.clientX - drag.x); });
    const up = () => { if (!drag) return; drag = null; track.style.scrollSnapType = 'x mandatory'; track.style.cursor = 'grab'; };
    track.addEventListener('pointerup', up); track.addEventListener('pointerleave', up);
  }

  const lb = $('[data-if="lb"]'), lbImg = a('lbSrc')[0];
  const close = e => { if (e) e.stopPropagation(); lb.hidden = true; };
  a('g.open').forEach(b => b.addEventListener('click', () => {
    const img = b.querySelector('img');
    lbImg.src = img.getAttribute('src'); lbImg.alt = img.alt;
    lb.hidden = false;
  }));
  a('close').forEach(el => el.addEventListener('click', close));
  if (lbImg) lbImg.addEventListener('click', e => e.stopPropagation());
  window.addEventListener('keydown', e => { if (e.key === 'Escape' && lb) lb.hidden = true; });
})();
