const button = document.querySelector('.reveal');
const letter = document.querySelector('.letter');

const sky = document.querySelector('.heart-sky');
for (let i = 0; i < 22; i++) {
  const heart = document.createElement('span');
  heart.className = 'heart';
  heart.textContent = i % 3 === 0 ? '♡' : '♥';
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${12 + Math.random() * 18}px`;
  heart.style.animationDuration = `${10 + Math.random() * 16}s`;
  heart.style.animationDelay = `${-Math.random() * 24}s`;
  heart.style.setProperty('--sway', `${Math.random() * 100 - 50}px`);
  sky.append(heart);
}

button.addEventListener('click', () => {
  const open = letter.classList.toggle('open');
  button.setAttribute('aria-expanded', String(open));
  letter.setAttribute('aria-hidden', String(!open));
  button.querySelector('.button-label').textContent = open ? 'Cerrar mi carta' : 'Abrir mi corazón';
  if (open) petals(16);
});

function petals(count) {
  const layer = document.querySelector('.petals');
  for (let i = 0; i < count; i++) {
    const petal = document.createElement('i');
    petal.className = 'petal';
    petal.style.left = `${Math.random() * 100}vw`;
    petal.style.animationDuration = `${4 + Math.random() * 5}s`;
    petal.style.animationDelay = `${Math.random() * 1.3}s`;
    petal.style.setProperty('--drift', `${Math.random() * 160 - 80}px`);
    layer.append(petal);
    petal.addEventListener('animationend', () => petal.remove(), { once: true });
  }
}

const delightMessages = [
  'Tu forma tan bonita de ser hace especiales hasta los ratitos más simples.',
  'Me encanta cómo me haces reír cuando compartimos tiempo juntos.',
  'Tu sonrisa tiene ese no sé qué que se me queda en la mente.',
  'Me gusta que podamos jugar, hablar y simplemente pasar el rato.',
  'Eres hermosa, pero lo que más me encanta es todo lo que eres.'
];
let delightIndex = 0;
document.querySelector('.delight-button')?.addEventListener('click', () => {
  delightIndex = (delightIndex + 1) % delightMessages.length;
  const message = document.querySelector('.delight-message');
  message.classList.add('changing');
  window.setTimeout(() => {
    message.textContent = delightMessages[delightIndex];
    message.classList.remove('changing');
  }, 170);
  petals(5);
});

const gallery = document.querySelector('.photo-grid');
const galleryCount = document.querySelector('.gallery-count');
if (gallery) {
  const photos = [...gallery.querySelectorAll('.photo-card')];
  const updateGalleryCount = () => {
    const firstPhoto = photos[0];
    if (!firstPhoto) return;
    const gap = parseFloat(getComputedStyle(gallery).columnGap || getComputedStyle(gallery).gap) || 0;
    const step = firstPhoto.getBoundingClientRect().width + gap;
    const current = Math.min(photos.length, Math.max(1, Math.round(gallery.scrollLeft / step) + 1));
    galleryCount.textContent = `${current} / ${photos.length}`;
  };
  gallery.addEventListener('scroll', updateGalleryCount, { passive: true });
  document.querySelector('.gallery-prev')?.addEventListener('click', () => {
    gallery.scrollBy({ left: -gallery.clientWidth * .78, behavior: 'smooth' });
  });
  document.querySelector('.gallery-next')?.addEventListener('click', () => {
    gallery.scrollBy({ left: gallery.clientWidth * .78, behavior: 'smooth' });
  });
  window.addEventListener('resize', updateGalleryCount);
}

const musicButton = document.querySelector('.music-toggle');
const musicPlayer = document.querySelector('.music-player');
musicButton?.addEventListener('click', () => {
  const isOpen = musicButton.getAttribute('aria-expanded') === 'true';
  if (isOpen) {
    musicPlayer.replaceChildren();
    musicPlayer.hidden = true;
    musicButton.setAttribute('aria-expanded', 'false');
    musicButton.querySelector('span:last-child').textContent = 'Escuchar Hasta que LLEGUE YO';
    return;
  }
  const player = document.createElement('iframe');
  player.title = 'Paulo Londra — hasta que LLEGUE YO (video oficial)';
  player.src = 'https://www.youtube-nocookie.com/embed/U5grMLDOEgw?autoplay=1&rel=0';
  player.allow = 'autoplay; encrypted-media; picture-in-picture; web-share';
  player.referrerPolicy = 'strict-origin-when-cross-origin';
  player.loading = 'lazy';
  player.allowFullscreen = true;
  musicPlayer.replaceChildren(player);
  musicPlayer.hidden = false;
  musicButton.setAttribute('aria-expanded', 'true');
  musicButton.querySelector('span:last-child').textContent = 'Cerrar reproductor';
});
