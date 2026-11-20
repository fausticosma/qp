// footer.js
const INSTAGRAM_USER = 'quepancito_panaderia';
const DIRECCION = 'Av Colón 375, Córdoba, Argentina';

document.addEventListener('DOMContentLoaded', () => {
  const mapsUrl =
    'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(DIRECCION);

  const footer = document.createElement('footer');
  footer.className = 'footer';
  footer.innerHTML = `
    <div class="footer-contenido">
      <p class="footer-marca">Qué Pancito</p>
      <a href="https://www.instagram.com/${INSTAGRAM_USER}/" target="_blank" rel="noopener noreferrer">
        📷 @${INSTAGRAM_USER}
      </a>
      <a href="${mapsUrl}" target="_blank" rel="noopener noreferrer">
        📍 ${DIRECCION}
      </a>
    </div>
  `;
  document.body.appendChild(footer);
});