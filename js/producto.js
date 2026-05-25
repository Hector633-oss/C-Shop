// Variable de estado que almacena el producto actualmente mostrado en la página de detalle
let _currentProduct = null; // Guarda la referencia al producto renderizado para poder actualizarlo al cambiar el idioma

// Función: construye y renderiza el HTML completo del detalle de un producto
function renderDetail(p) { // Define la función que rellena la sección de detalle con todos los datos del producto recibido
  _currentProduct = p; // Guarda el producto en la variable de estado para reutilizarlo en los re-renders por cambio de idioma
  const starsHtml = buildStars(p.rating); // Genera el HTML de las estrellas de valoración del producto para la sección de detalle

  const specsHtml = Object.entries(p.specs || {}).map(([k, v]) => { // Genera el HTML de cada fila de especificación técnica del producto
    const cleanVal  = String(v).replace(/<br[^>]*>?/gi, '\n').trim(); // Elimina etiquetas HTML de salto de línea del valor de la especificación técnica
    const translKey = translateSpecKey(k); // Traduce la clave de la especificación técnica al idioma activo de la página de detalle
    const translVal = translateSpecValue(cleanVal); // Traduce el valor de la especificación técnica al idioma activo de la página de detalle
    return `<div class="detail-spec-row">
      <span class="dsr-key">${escapeHtml(translKey)}</span>
      <span class="dsr-val">${escapeHtml(translVal)}</span>
    </div>`; // Renderiza la fila de clave y valor de la especificación en la tabla de características del producto
  }).join('');

  const tagsHtml = (p.tags || []).map(tg => `<span class="detail-tag">${escapeHtml(tg)}</span>`).join(''); // Genera el HTML de cada etiqueta de característica del producto para la sección de tags del detalle
  const isFav    = isFavorite(p.id); // Comprueba si el producto está guardado en la lista de favoritos del usuario

  document.title = `${p.name} · C-Shop`; // Actualiza el título de la pestaña del navegador con el nombre del producto en detalle
  document.getElementById('detailContent').innerHTML = `
    <div>
      <div class="detail-gallery">
        <img src="${p.image}" alt="${escapeHtml(p.name)}"
             onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
        <span class="detail-img-fallback" style="display:none">${p.icon}</span>
      </div>
    </div>
    <div class="detail-info">
      <div class="detail-brand">${escapeHtml(p.brand)}</div>
      <div class="detail-name">${escapeHtml(p.name)}</div>
      <div class="detail-stars">
        <span class="ds-stars">${starsHtml}</span>
        <span class="ds-count">${p.rating}</span>
      </div>
      <div class="detail-price-row">
        <div class="detail-price">${p.price.toFixed(2)}€</div>
        ${p.oldPrice  ? `<div class="detail-old">${p.oldPrice.toFixed(2)}€</div>` : ''}
        ${p.discount  ? `<div class="detail-discount">-${p.discount}%</div>` : ''}
      </div>
      <div class="detail-iva">${t('detail.iva')}</div>
      <div class="detail-tags">${tagsHtml}</div>
      ${(currentLang !== 'en' || p.desc_en)
          ? `<div class="detail-desc">${escapeHtml(currentLang === 'en' && p.desc_en ? p.desc_en : p.desc)}</div>`
          : ''}
      <div class="detail-actions">
        <button class="detail-add" onclick="addToCartById('${p.id}')">${t('detail.add_cart')}</button>
        <button class="detail-wish${isFav ? ' favorited' : ''}" id="detailWishBtn"
                data-pid="${p.id}" onclick="toggleFavoriteById('${p.id}')">${isFav ? '♥' : '♡'}</button>
      </div>
      ${specsHtml ? `<div class="detail-specs">
        <div class="detail-specs-title">${t('detail.specs')}</div>
        ${specsHtml}
      </div>` : ''}
    </div>`; // Renderiza la sección completa de detalle con galería, marca, nombre, estrellas, precio, IVA, tags, descripción, botones de carrito y favorito, y tabla de especificaciones

  const back = document.getElementById('detailBackBtn'); // Obtiene el botón de volver a la categoría en la página de detalle de producto
  if (back && p.catId) back.href = `categoria.html?cat=${p.catId}`; // Apunta el botón de volver a la página de categoría correspondiente al producto mostrado
}

// Bloque de inicialización: lee el ID de la URL, busca el producto y renderiza el detalle
onProductsReady(() => { // Registra el callback que inicializa la página de detalle tras cargar los datos de productos
  const id = new URLSearchParams(window.location.search).get('id'); // Extrae el ID del producto del parámetro 'id' de la URL de la página de detalle
  const p  = id && findProductById(id); // Busca el producto en el catálogo global usando el ID extraído de la URL
  if (!p) { // Comprueba si el ID no corresponde a ningún producto del catálogo
    document.getElementById('detailContent').innerHTML = `
      <div class="no-products" style="grid-column:1/-1">
        <span class="np-icon">❓</span>
        ${t('detail.not_found')}<br>
        <a href="index.html" style="color:var(--accent-hover)">${t('detail.go_home')}</a>
      </div>`; // Muestra el mensaje de producto no encontrado con enlace a la página de inicio en la sección de detalle
    return; // Detiene la inicialización si el producto no existe en el catálogo
  }
  applyI18n(); // Aplica las traducciones del idioma activo al botón estático de volver del HTML de la página de detalle
  renderDetail(p); // Renderiza el detalle completo del producto encontrado en la sección de detalle de la página
});

// Bloque: re-renderiza el detalle del producto de forma instantánea al cambiar el idioma
onLangChange(() => { // Registra el callback que actualiza la página de detalle cuando cambia el idioma activo
  applyI18n(); // Aplica las traducciones del nuevo idioma a los elementos estáticos del HTML de la página de detalle
  if (_currentProduct) renderDetail(_currentProduct); // Re-renderiza el detalle del producto con los textos y la descripción en el nuevo idioma
});
