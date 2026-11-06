(() => {
  const popup = document.querySelector('.popup');
  const key = box => `popup-${box.dataset.id}`;

  const closed = box => {
    try {
      return localStorage.getItem(key(box)) === 'closed';
    } catch {
      return false;
    }
  };

  const expired = box => box.dataset.until && Date.now() > Date.parse(box.dataset.until);

  const dismiss = box => {
    box.hidden = true;
    try {
      localStorage.setItem(key(box), 'closed');
    } catch {}
  };

  const boxes = [...popup.querySelectorAll('.popup-box')];
  boxes.forEach(box => box.hidden = closed(box) || expired(box));
  const open = () => boxes.filter(box => !box.hidden);

  if (!open().length) return;

  popup.addEventListener('close', () => open().forEach(dismiss));

  popup.addEventListener('click', e => {
    if (e.target === popup) return popup.close();
    const box = e.target.closest('.popup-close, a')?.closest('.popup-box');
    if (!box) return;
    dismiss(box);
    if (!open().length) popup.close();
  });

  popup.showModal();
})();
