// Función: renderiza la cuadrícula de favoritos o muestra el mensaje de lista vacía
function renderFavoritesPage() { // Define la función que actualiza el contenido de la cuadrícula de la página de favoritos
  const grid  = document.getElementById('favoritesGrid'); // Obtiene el contenedor de la cuadrícula de productos favoritos
  const empty = document.getElementById('favEmptyMsg'); // Obtiene el mensaje que se muestra cuando la lista de favoritos está vacía
  if (!grid) return; // Sale sin renderizar si la cuadrícula de favoritos no existe en el DOM
  if (favorites.length === 0) { // Comprueba si el array global de favoritos está vacío
    grid.innerHTML = ''; // Limpia cualquier tarjeta previa de la cuadrícula de favoritos
    if (empty) empty.style.display = 'block'; // Muestra el mensaje de lista de favoritos vacía en la página de favoritos
  } else { // Hay favoritos guardados que se deben mostrar en la cuadrícula
    if (empty) empty.style.display = 'none'; // Oculta el mensaje de lista vacía al haber productos favoritos para mostrar
    grid.innerHTML = favorites.map(p => productCardHTML(p)).join(''); // Renderiza una tarjeta por cada producto guardado como favorito en la cuadrícula
  }
}

// Función: vacía la lista completa de favoritos tras confirmación del usuario
function clearAllFavorites() { // Define la función que elimina todos los favoritos guardados desde la página de favoritos
  if (!confirm(t('favorites.confirm_clear'))) return; // Muestra un diálogo de confirmación y cancela si el usuario rechaza vaciar los favoritos
  favorites = []; // Vacía el array global de favoritos del usuario
  saveFavorites(); // Persiste la lista de favoritos vacía en el almacenamiento local del navegador
  updateFavoritesUI(); // Actualiza el contador de favoritos visible en la barra de navegación
  renderFavoritesPage(); // Re-renderiza la cuadrícula de favoritos mostrando el estado vacío
  showToast(t('favorites.cleared_toast'), 'success'); // Muestra el mensaje de confirmación de vaciado en el toast de la interfaz
}

// Función: aplica traducciones y renderiza la página de favoritos
function applyFavoritesI18n() { // Define la función que inicializa la página de favoritos con el idioma activo
  document.title = t('page.fav_title'); // Actualiza el título de la pestaña del navegador con el nombre de la página de favoritos
  applyI18n(); // Aplica las traducciones del idioma activo a los elementos estáticos del HTML de la página de favoritos
  renderFavoritesPage(); // Renderiza la cuadrícula de favoritos con el idioma activo al inicializar la página
}

// Bloque de inicialización: ejecuta la configuración de la página al cargar el DOM
if (document.readyState === 'loading') { // Comprueba si el DOM todavía está cargando cuando se ejecuta el script
  document.addEventListener('DOMContentLoaded', applyFavoritesI18n); // Registra applyFavoritesI18n para ejecutarse cuando el DOM termine de cargarse
} else { // El DOM ya está completamente cargado cuando se evalúa el script
  applyFavoritesI18n(); // Ejecuta directamente la inicialización de la página de favoritos
}

// Bloque: intercepta toggleFavorite para re-renderizar la cuadrícula al eliminar desde esta misma página
const _origToggleFav = toggleFavorite; // Guarda la referencia original de la función global toggleFavorite antes de sobreescribirla
window.toggleFavorite = function (product) { // Redefine toggleFavorite globalmente añadiendo el re-renderizado de la página de favoritos
  _origToggleFav(product); // Ejecuta la función original de toggleFavorite para actualizar el array y el almacenamiento
  if (window.getCurrentPage && getCurrentPage() === 'favoritos') renderFavoritesPage(); // Re-renderiza la cuadrícula de favoritos si el usuario está en la página de favoritos
};

// Bloque: re-renderiza la página de favoritos de forma instantánea al cambiar el idioma
onLangChange(() => { // Registra el callback que actualiza la página de favoritos cuando cambia el idioma activo
  document.title = t('page.fav_title'); // Actualiza el título de la pestaña del navegador al nombre de favoritos en el nuevo idioma
  applyI18n(); // Aplica las traducciones del nuevo idioma a los elementos estáticos del HTML de la página de favoritos
  renderFavoritesPage(); // Re-renderiza la cuadrícula de favoritos con los textos del nuevo idioma
});
