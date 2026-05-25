// Función: lee la consulta de la URL, busca en todos los productos y renderiza los resultados
function runSearch() { // Define la función principal que ejecuta la búsqueda global y rellena la cuadrícula de resultados
  const q       = (new URLSearchParams(window.location.search).get('q') || '').trim(); // Extrae y limpia el texto de búsqueda del parámetro 'q' de la URL de la página de búsqueda
  const titleEl = document.getElementById('searchTitle'); // Obtiene el elemento de título de la página de resultados de búsqueda
  const countEl = document.getElementById('searchCount'); // Obtiene el elemento que muestra el contador de resultados en la página de búsqueda
  const gridEl  = document.getElementById('searchGrid'); // Obtiene el contenedor de la cuadrícula de resultados de búsqueda

  document.title = q ? `"${q}" · C-Shop` : t('page.search_title'); // Actualiza el título de la pestaña del navegador con la consulta o con el nombre genérico de búsqueda

  if (!q) { // Comprueba si el campo de búsqueda está vacío o la URL no incluye consulta
    if (titleEl) titleEl.textContent = t('search.title'); // Muestra el título genérico de la página de búsqueda cuando no hay consulta
    if (gridEl)  gridEl.innerHTML = `<div class="no-products"><span class="np-icon">🔍</span>${t('search.type_something')}</div>`; // Muestra el mensaje de invitación a escribir algo en la cuadrícula de búsqueda
    return; // Detiene la ejecución si no hay texto de búsqueda que procesar
  }

  const searchInput = document.getElementById('searchInput'); // Obtiene el campo de texto de búsqueda de la barra de navegación
  if (searchInput) searchInput.value = q; // Rellena el campo de búsqueda de la barra de navegación con la consulta activa

  const nq = normalizeStr(q); // Normaliza la consulta de búsqueda para la comparación sin acentos ni mayúsculas
  const results = []; // Inicializa el array que acumulará los productos coincidentes con la búsqueda
  CATEGORIES.forEach(cat => { // Recorre todas las categorías de la tienda para buscar en sus productos
    (ALL_PRODUCTS[cat.id] || []).forEach(p => { // Recorre cada producto de la categoría actual durante la búsqueda global
      if (p._ns.includes(nq) || p._bs.includes(nq)) results.push(p); // Añade el producto a los resultados si su nombre o marca normalizada contiene la consulta
    });
  });

  if (titleEl) titleEl.textContent = `🔍 "${q}"`; // Muestra la consulta activa en el título de la sección de resultados de búsqueda
  if (countEl) countEl.textContent = `${results.length} ${t('count.products_found')}`; // Muestra el número de productos encontrados en el contador de la página de búsqueda
  if (gridEl) { // Comprueba que la cuadrícula de resultados existe antes de escribir en ella
    gridEl.innerHTML = results.length // Comprueba si hay resultados que mostrar en la cuadrícula de búsqueda
      ? results.map(p => productCardHTML(p)).join('') // Renderiza una tarjeta por cada producto encontrado en la cuadrícula de búsqueda
      : `<div class="no-products"><span class="np-icon">🔍</span>${t('search.no_results')} "<strong>${escapeHtml(q)}</strong>"</div>`; // Muestra el mensaje de sin resultados con la consulta buscada si no se encuentra ningún producto
  }
}

// Bloque de inicialización: aplica traducciones y ejecuta la búsqueda cuando los productos están listos
onProductsReady(() => { // Registra el callback que inicializa la página de búsqueda tras cargar los datos de productos
  applyI18n(); // Aplica las traducciones del idioma activo a los elementos estáticos del HTML de la página de búsqueda
  runSearch(); // Ejecuta la búsqueda inicial con la consulta presente en la URL al cargar la página
});

// Bloque: re-ejecuta la búsqueda de forma instantánea al cambiar el idioma
onLangChange(() => { // Registra el callback que actualiza la página de búsqueda cuando cambia el idioma activo
  applyI18n(); // Aplica las traducciones del nuevo idioma a los elementos estáticos del HTML de la página de búsqueda
  runSearch(); // Re-ejecuta la búsqueda para actualizar las etiquetas de resultado en el nuevo idioma
});
