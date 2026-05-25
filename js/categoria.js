// Variables de estado del filtro de precio y categoría activa en la página de categoría
let _catId = null; // Almacena el ID de la categoría cuya página se está mostrando
let _minPrice = 0; // Precio mínimo seleccionado en el filtro deslizante de la página de categoría
let _maxPrice = 0; // Precio máximo seleccionado en el filtro deslizante de la página de categoría
let _catMaxPrice = 0; // Precio máximo absoluto de los productos de la categoría activa

// Función: obtiene el ID de categoría desde el parámetro de la URL
function getCatFromUrl() { // Define la función que lee el parámetro 'cat' de la URL de la página de categoría
  return new URLSearchParams(window.location.search).get('cat'); // Extrae el valor del parámetro 'cat' de la URL actual
}

// Función: actualiza el encabezado de la página con los datos de la categoría activa
function setHeader(cat) { // Define la función que rellena el icono, nombre y título de la página de categoría
  if (!cat) return; // Sale sin hacer nada si no se recibe ninguna categoría válida
  document.getElementById('pvCatIcon').textContent = cat.icon + ' '; // Muestra el icono de la categoría en el encabezado de la página
  document.getElementById('pvCatName').textContent = currentLang === 'es' ? cat.nameEs : cat.nameEn; // Muestra el nombre de la categoría en el idioma activo en el encabezado
  document.title = `${currentLang === 'es' ? cat.nameEs : cat.nameEn} · C-Shop`; // Actualiza el título de la pestaña del navegador con el nombre de la categoría
  const compGroup = document.getElementById('compTypeGroup'); // Obtiene el grupo de filtro por tipo de componente del panel lateral
  if (compGroup) compGroup.style.display = cat.id === 'components' ? 'flex' : 'none'; // Muestra u oculta el filtro de tipo de componente según si la categoría es 'components'
}

// Función: sincroniza los valores del filtro de precio deslizante con las variables de estado
function updateDualPrice() { // Define la función que lee los sliders de precio mínimo y máximo y actualiza la cuadrícula
  const minS = document.getElementById('priceMin'); // Obtiene el slider de precio mínimo del panel de filtros
  const maxS = document.getElementById('priceMax'); // Obtiene el slider de precio máximo del panel de filtros
  let minVal = parseInt(minS.value); // Convierte el valor del slider de precio mínimo a entero
  let maxVal = parseInt(maxS.value); // Convierte el valor del slider de precio máximo a entero
  if (minVal >= maxVal) { minVal = maxVal - 10; minS.value = minVal; } // Evita que el precio mínimo supere o iguale al máximo ajustando el slider
  _minPrice = minVal; // Actualiza la variable de estado del precio mínimo del filtro de categoría
  _maxPrice = maxVal; // Actualiza la variable de estado del precio máximo del filtro de categoría
  document.getElementById('priceMinVal').textContent = minVal + '€'; // Muestra el precio mínimo seleccionado en la etiqueta del filtro deslizante
  document.getElementById('priceMaxVal').textContent = maxVal + '€'; // Muestra el precio máximo seleccionado en la etiqueta del filtro deslizante
  updatePriceTrack(); // Actualiza la barra de rango visual del filtro deslizante de precio
  renderProducts(); // Vuelve a renderizar la cuadrícula de productos aplicando el nuevo rango de precio
}

// Función: actualiza la barra de progreso visual del filtro deslizante de precio
function updatePriceTrack() { // Define la función que calcula y aplica el relleno de la barra del slider de precio
  const minS = document.getElementById('priceMin'); // Obtiene el slider de precio mínimo del panel de filtros
  const maxS = document.getElementById('priceMax'); // Obtiene el slider de precio máximo del panel de filtros
  const fill = document.getElementById('prdFill'); // Obtiene el elemento de relleno visual de la barra del slider
  if (!minS || !maxS || !fill) return; // Sale si alguno de los elementos del slider no existe en el DOM
  const min = parseInt(minS.min), max = parseInt(minS.max); // Lee los valores mínimo y máximo posibles del slider de precio
  const minPct = ((parseInt(minS.value) - min) / (max - min)) * 100; // Calcula el porcentaje de posición del thumb de precio mínimo en la barra
  const maxPct = ((parseInt(maxS.value) - min) / (max - min)) * 100; // Calcula el porcentaje de posición del thumb de precio máximo en la barra
  fill.style.left = minPct + '%'; // Mueve el inicio del relleno de la barra al porcentaje del precio mínimo
  fill.style.width = (maxPct - minPct) + '%'; // Ajusta el ancho del relleno de la barra al rango de precios seleccionado
}

// Función: filtra, ordena y renderiza los productos en la cuadrícula de la página de categoría
function renderProducts() { // Define la función principal de renderizado de la cuadrícula de productos de categoría
  if (!_catId) return; // Sale sin renderizar si todavía no se ha establecido la categoría activa
  const prods    = ALL_PRODUCTS[_catId] || []; // Obtiene el array de productos de la categoría activa o un array vacío
  const sort     = document.getElementById('sortSelect').value; // Lee el criterio de ordenación seleccionado en el desplegable del panel de filtros
  const search   = normalizeStr(document.getElementById('filterSearch').value); // Lee y normaliza el texto escrito en el campo de búsqueda por nombre del panel de filtros
  const compType = document.getElementById('compTypeSelect')?.value || 'all'; // Lee el tipo de componente seleccionado en el filtro de tipo o usa 'all' por defecto

  let filtered = prods.filter(p => { // Aplica los filtros activos a cada producto de la categoría
    if (p.price > _maxPrice || p.price < _minPrice) return false; // Descarta el producto si su precio está fuera del rango del filtro deslizante
    if (search && !p._ns.includes(search) && !p._bs.includes(search)) return false; // Descarta el producto si no coincide con el texto de búsqueda por nombre ni por marca
    if (_catId === 'components' && compType !== 'all' && getCompType(p.name) !== compType) return false; // Descarta el componente si no pertenece al subtipo seleccionado en el filtro de tipo de componente
    return true; // Incluye el producto si supera todos los filtros activos
  });
  filtered = sortProducts(filtered, sort); // Ordena la lista de productos filtrados según el criterio del desplegable

  document.getElementById('filterCount').textContent = `${filtered.length} ${t('count.products_found')}`; // Muestra el número de productos encontrados tras aplicar los filtros en el contador del panel
  const g = document.getElementById('productsGrid'); // Obtiene el contenedor de la cuadrícula de productos de la página de categoría
  g.innerHTML = filtered.length // Comprueba si hay productos que mostrar tras el filtrado
    ? filtered.map(p => productCardHTML(p)).join('') // Renderiza una tarjeta por cada producto filtrado en la cuadrícula
    : `<div class="no-products"><span class="np-icon">🔍</span>${t('search.no_results_filter')}</div>`; // Muestra el mensaje de sin resultados si ningún producto pasa los filtros
}

// Función: activa el filtrado de la cuadrícula al pulsar el botón de aplicar filtros
function applyFilters() { renderProducts(); } // Llama directamente a renderProducts para actualizar la cuadrícula con los filtros actuales

// Bloque de inicialización: se ejecuta cuando los productos están cargados y listos
onProductsReady(() => { // Registra el callback que inicializa la página de categoría tras cargar los datos
  const id  = getCatFromUrl(); // Lee el ID de categoría desde la URL de la página de categoría
  const cat = CATEGORIES.find(c => c.id === id); // Busca en el array global de categorías la que corresponde al ID de la URL
  if (!cat) { // Muestra el error de categoría no encontrada si el ID no existe
    document.getElementById('pvCatName').textContent = t('category.not_found'); // Escribe el mensaje de categoría no encontrada en el encabezado de la página
    document.getElementById('productsGrid').innerHTML = `
      <div class="no-products">
        <span class="np-icon">❓</span>
        ${t('category.not_exists')}
        <a href="index.html" style="color:var(--accent-hover)">${t('category.go_home')}</a>
      </div>`; // Muestra en la cuadrícula el mensaje de error con enlace a la página de inicio
    return; // Detiene la inicialización si la categoría no existe
  }
  _catId = cat.id; // Guarda el ID de la categoría válida en la variable de estado del módulo
  setHeader(cat); // Rellena el encabezado de la página con los datos de la categoría encontrada

  const prods = ALL_PRODUCTS[_catId] || []; // Obtiene todos los productos de la categoría activa
  const rawMax = prods.length ? Math.max(...prods.map(p => p.price)) : 1000; // Calcula el precio máximo real entre todos los productos de la categoría
  _catMaxPrice = Math.ceil(rawMax / 100) * 100; // Redondea el precio máximo al siguiente múltiplo de 100 para el límite del slider
  _maxPrice    = _catMaxPrice; // Inicializa el precio máximo del filtro al tope redondeado de la categoría

  const minS = document.getElementById('priceMin'); // Obtiene el slider de precio mínimo del panel de filtros
  const maxS = document.getElementById('priceMax'); // Obtiene el slider de precio máximo del panel de filtros
  [minS, maxS].forEach(s => { s.max = _catMaxPrice; }); // Establece el valor máximo de ambos sliders al tope de precio de la categoría
  minS.value = 0; // Posiciona el thumb del slider de precio mínimo en cero al cargar la página
  maxS.value = _catMaxPrice; // Posiciona el thumb del slider de precio máximo en el tope de la categoría al cargar
  document.getElementById('priceMinVal').textContent = '0€'; // Muestra 0€ en la etiqueta de precio mínimo al inicializar el filtro
  document.getElementById('priceMaxVal').textContent = _catMaxPrice + '€'; // Muestra el precio máximo de la categoría en la etiqueta del filtro al inicializar

  applyI18n(); // Aplica las traducciones del idioma activo a los elementos estáticos del HTML de filtros
  updatePriceTrack(); // Dibuja el relleno inicial de la barra del slider de precio al cargar la categoría
  renderProducts(); // Renderiza la cuadrícula de productos con el estado inicial sin filtros activos
  restoreScrollPosition(); // Restaura la posición de desplazamiento guardada al volver a la página de categoría
});

// Bloque: re-renderiza la página de categoría de forma instantánea al cambiar el idioma
onLangChange(() => { // Registra el callback que actualiza la página de categoría cuando cambia el idioma
  const cat = _catId ? CATEGORIES.find(c => c.id === _catId) : null; // Busca los datos de la categoría activa para actualizar el encabezado en el nuevo idioma
  setHeader(cat); // Actualiza el encabezado de la página con el nombre de la categoría en el idioma seleccionado
  applyI18n(); // Aplica las traducciones del nuevo idioma a los elementos estáticos del HTML
  renderProducts(); // Re-renderiza la cuadrícula de productos con los textos del nuevo idioma
});
