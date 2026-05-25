// Renderiza la cuadrícula de categorías en la página principal
function renderHomeCats() { // Genera y muestra las tarjetas de categorías en el grid de la home
  const g = document.getElementById('homeCatsGrid'); // Obtiene el contenedor de la cuadrícula de categorías de la página principal
  if (!g) return; // Aborta si el contenedor no existe en la página actual
  // Genera una tarjeta enlace por cada categoría del catálogo y la inserta en el grid de la home
  g.innerHTML = CATEGORIES.map(cat => `
    <a class="cat-card" href="categoria.html?cat=${cat.id}">
      <div class="cat-icon">${cat.icon}</div>
      <div class="cat-name">${currentLang === 'es' ? cat.nameEs : cat.nameEn}</div>
    </a>`).join(''); // Inserta todas las tarjetas de categoría en el grid de la página principal
}

// Actualiza el título, la meta descripción y los textos de la página principal según el idioma activo
function applyHomeI18n() { // Aplica las traducciones del idioma activo al título, la meta y las tarjetas de categorías de la home
  document.title = t('page.home_title'); // Actualiza el título de la pestaña del navegador con el texto traducido de la home
  const metaDesc = document.querySelector('meta[name="description"]'); // Obtiene la etiqueta meta description de la home
  if (metaDesc) metaDesc.setAttribute('content', t('page.home_desc')); // Actualiza la meta descripción de la home con el texto traducido
  applyI18n(); // Aplica las traducciones a todos los elementos data-i18n del DOM de la página principal
  renderHomeCats(); // Regenera las tarjetas de categorías con los nombres en el idioma activo
}

// Ejecuta la inicialización de la home cuando el DOM está disponible
document.addEventListener('DOMContentLoaded', applyHomeI18n); // Lanza la traducción y el renderizado de categorías al cargar la página principal

// Actualiza la home de forma instantánea al cambiar el idioma desde el botón del header
onLangChange(() => { // Registra el callback que se ejecuta cada vez que el usuario cambia el idioma
  applyHomeI18n(); // Vuelve a aplicar traducciones y regenerar las tarjetas de categorías con el nuevo idioma
});
