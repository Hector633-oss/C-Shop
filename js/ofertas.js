// Función: rellena el selector de categorías del filtro de ofertas con las categorías disponibles
function renderOffersCatSelect() { // Define la función que genera y actualiza las opciones del desplegable de categorías de la página de ofertas
  const sel = document.getElementById('offerCatSelect'); // Obtiene el elemento select de categorías del panel de filtros de ofertas
  if (!sel) return; // Sale si el selector de categorías no existe en el DOM de la página de ofertas
  const current = sel.value; // Guarda la categoría actualmente seleccionada para restaurarla tras reconstruir el select
  sel.innerHTML = `<option value="all">${t('filter.all_categories')}</option>` + // Añade la opción 'todas las categorías' como primera opción del selector de ofertas
    CATEGORIES.map(cat => // Recorre el array global de categorías para generar una opción por cada una
      `<option value="${cat.id}">${cat.icon} ${currentLang === 'es' ? cat.nameEs : cat.nameEn}</option>` // Crea la opción con el icono y nombre de la categoría en el idioma activo
    ).join('');
  if (current && sel.querySelector(`option[value="${current}"]`)) sel.value = current; // Restaura la categoría seleccionada anteriormente si sigue existiendo en el selector actualizado
}

// Función: filtra, ordena y renderiza los productos con descuento en la cuadrícula de ofertas
function renderOffers() { // Define la función principal que aplica los filtros y muestra los productos en oferta
  let offers = getAllOffers(); // Obtiene todos los productos que tienen descuento activo en la tienda
  const sort   = document.getElementById('offerSortSelect')?.value || 'discount'; // Lee el criterio de ordenación del desplegable o usa 'discount' por defecto en la página de ofertas
  const search = document.getElementById('offerSearch')?.value.toLowerCase() || ''; // Lee el texto del campo de búsqueda del panel de filtros de ofertas en minúsculas
  const cat    = document.getElementById('offerCatSelect')?.value || 'all'; // Lee la categoría seleccionada en el desplegable de categorías del filtro de ofertas

  if (cat !== 'all') offers = offers.filter(p => p.catId === cat); // Filtra las ofertas por la categoría seleccionada en el desplegable si no es 'todas'
  if (search) offers = offers.filter(p => // Aplica el filtro de texto sobre la lista de ofertas si hay texto en el campo de búsqueda
    p.name.toLowerCase().includes(search) || p.brand.toLowerCase().includes(search) // Mantiene la oferta si su nombre o marca contiene el texto buscado
  );
  if      (sort === 'discount')  offers.sort((a, b) => b.discount - a.discount); // Ordena las ofertas de mayor a menor descuento si el criterio seleccionado es 'discount'
  else if (sort === 'price-asc') offers.sort((a, b) => a.price - b.price); // Ordena las ofertas de menor a mayor precio si el criterio seleccionado es 'price-asc'
  else                            offers.sort((a, b) => b.price - a.price); // Ordena las ofertas de mayor a menor precio para cualquier otro criterio de ordenación

  document.getElementById('offerCount').textContent = `${offers.length} ${t('count.products_found')}`; // Muestra el número de ofertas encontradas en el contador del panel de filtros de ofertas
  const g = document.getElementById('offersGrid'); // Obtiene el contenedor de la cuadrícula de productos en oferta
  g.innerHTML = offers.length // Comprueba si hay ofertas que mostrar tras aplicar los filtros activos
    ? offers.map(p => productCardHTML(p.badge ? p : { ...p, badge: 'OFERTA' })).join('') // Renderiza cada oferta como tarjeta de producto añadiendo la etiqueta 'OFERTA' si no tiene badge propio
    : `<div class="no-products"><span class="np-icon">🔥</span>${t('offers.no_results')}</div>`; // Muestra el mensaje de sin resultados en la cuadrícula si ninguna oferta supera los filtros
}

// Función: activa el filtrado de la cuadrícula al interactuar con los controles del panel de ofertas
function applyOfferFilters() { renderOffers(); } // Llama directamente a renderOffers para actualizar la cuadrícula de ofertas con los filtros actuales

// Bloque de inicialización: configura la página de ofertas cuando los productos están cargados
onProductsReady(() => { // Registra el callback que inicializa la página de ofertas tras cargar los datos de productos
  document.title = t('page.offers_title'); // Actualiza el título de la pestaña del navegador con el nombre de la página de ofertas
  applyI18n(); // Aplica las traducciones del idioma activo a los elementos estáticos del HTML de la página de ofertas
  renderOffersCatSelect(); // Genera el selector de categorías del panel de filtros con todas las categorías disponibles
  renderOffers(); // Renderiza la cuadrícula de ofertas con el estado inicial sin filtros activos
});

// Bloque: re-renderiza la página de ofertas de forma instantánea al cambiar el idioma
onLangChange(() => { // Registra el callback que actualiza la página de ofertas cuando cambia el idioma activo
  document.title = t('page.offers_title'); // Actualiza el título de la pestaña del navegador al nombre de ofertas en el nuevo idioma
  applyI18n(); // Aplica las traducciones del nuevo idioma a los elementos estáticos del HTML de la página de ofertas
  renderOffersCatSelect(); // Reconstruye el selector de categorías con los nombres de categoría en el nuevo idioma
  renderOffers(); // Re-renderiza la cuadrícula de ofertas con los textos del nuevo idioma
});
