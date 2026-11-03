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
