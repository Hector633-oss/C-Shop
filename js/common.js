// Estado global: idioma activo, usuario autenticado y modo del modal de la tienda
let currentLang = localStorage.getItem('ns_lang') || 'es'; // Lee el idioma guardado o usa español por defecto
let loggedUser  = JSON.parse(localStorage.getItem('ns_user') || 'null'); // Lee el usuario logueado del almacenamiento local
let isRegister  = false; // Controla si el modal de login muestra el formulario de registro

// Función: construye la clave de localStorage según si hay usuario logueado
function getStorageKey(base) { // Define la función que genera la clave de almacenamiento
  return loggedUser ? `${base}_${loggedUser.uid}` : base; // Devuelve clave con UID de usuario o clave genérica de invitado
}

// Migración sincrónica: mueve los datos de invitado a las claves del usuario recién logueado
if (loggedUser) { // Ejecuta la migración solo si hay un usuario autenticado
  const uid = loggedUser.uid; // Extrae el UID del usuario logueado

  const cartKey = `ns_cart_${uid}`; // Construye la clave de carrito específica del usuario
  if (localStorage.getItem(cartKey) === null) { // Comprueba si el usuario aún no tiene carrito guardado
    const legacy = localStorage.getItem('ns_cart'); // Lee el carrito de invitado
    if (legacy) localStorage.setItem(cartKey, legacy); // Copia el carrito de invitado a la clave del usuario
  }
  localStorage.removeItem('ns_cart'); // Elimina el carrito de invitado para evitar reimportaciones

  const favKey     = `ns_favorites_${uid}`; // Construye la clave de favoritos específica del usuario
  const legacyFavs = JSON.parse(localStorage.getItem('ns_favorites') || '[]'); // Lee los favoritos de invitado
  if (legacyFavs.length > 0) { // Procede solo si hay favoritos de invitado que migrar
    const userFavs = JSON.parse(localStorage.getItem(favKey) || '[]'); // Lee los favoritos actuales del usuario
    const knownIds = new Set(userFavs.map(f => f.id)); // Crea un conjunto con los IDs ya conocidos del usuario
    const merged   = [...userFavs, ...legacyFavs.filter(f => !knownIds.has(f.id))]; // Fusiona sin duplicar favoritos
    if (merged.length > userFavs.length) localStorage.setItem(favKey, JSON.stringify(merged)); // Guarda solo si hay elementos nuevos
  }
  localStorage.removeItem('ns_favorites'); // Elimina los favoritos de invitado tras la migración

  const ordersKey    = `ns_orders_${uid}`; // Construye la clave de pedidos específica del usuario
  const legacyOrders = JSON.parse(localStorage.getItem('ns_orders') || '[]'); // Lee los pedidos de invitado
  if (legacyOrders.length > 0) { // Procede solo si hay pedidos de invitado que migrar
    const userOrders = JSON.parse(localStorage.getItem(ordersKey) || '[]'); // Lee los pedidos actuales del usuario
    const knownIds   = new Set(userOrders.map(o => o.id)); // Crea un conjunto con los IDs de pedidos ya conocidos
    const merged     = [...userOrders, ...legacyOrders.filter(o => !knownIds.has(o.id))]; // Fusiona pedidos sin duplicar
    if (merged.length > userOrders.length) localStorage.setItem(ordersKey, JSON.stringify(merged)); // Guarda solo si hay pedidos nuevos
  }
  localStorage.removeItem('ns_orders'); // Elimina los pedidos de invitado tras la migración
}

// Estado inicial: carga el carrito y favoritos según si hay usuario o es invitado
let cart      = JSON.parse(localStorage.getItem(loggedUser ? `ns_cart_${loggedUser.uid}`      : 'ns_cart')      || '[]'); // Carga el carrito del usuario o del invitado desde localStorage
let favorites = JSON.parse(localStorage.getItem(loggedUser ? `ns_favorites_${loggedUser.uid}` : 'ns_favorites') || '[]'); // Carga los favoritos del usuario o del invitado desde localStorage

// Función: devuelve el texto traducido de la clave dada según el idioma activo
function t(key) { return (i18n[currentLang] || i18n.es)[key] || (i18n.es[key] || key); } // Busca la traducción en el idioma activo, con español como respaldo

// Registro de callbacks: cada página registra su función de re-render para cambios de idioma
const _langChangeCallbacks = []; // Array que almacena las funciones a ejecutar al cambiar de idioma
function onLangChange(fn) { _langChangeCallbacks.push(fn); } // Añade una función al array de callbacks de cambio de idioma

// Función: actualiza la bandera y etiqueta del selector de idioma en el header
function applyLangToHeader() { // Define la función que refresca el icono de idioma del header
  const flag  = document.getElementById('langFlag'); // Obtiene el elemento de la bandera en el header
  const label = document.getElementById('langLabel'); // Obtiene el elemento de la etiqueta de idioma en el header
  if (flag)  flag.textContent  = currentLang === 'es' ? '🇪🇸' : '🇬🇧'; // Muestra la bandera correspondiente al idioma activo
  if (label) label.textContent = currentLang.toUpperCase(); // Muestra el código de idioma en mayúsculas en el header
}

// Función: alterna el idioma entre español e inglés y notifica a todos los módulos
function toggleLang() { // Define la función que cambia el idioma de la tienda
  currentLang = currentLang === 'es' ? 'en' : 'es'; // Alterna el idioma activo entre español e inglés
  localStorage.setItem('ns_lang', currentLang); // Persiste el idioma seleccionado en localStorage

  document.documentElement.lang = currentLang; // Actualiza el atributo lang del documento para SEO y accesibilidad

  document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: currentLang } })); // Lanza el evento reactivo que actualiza toda la interfaz

  showToast(t('toast.lang_changed'), 'success'); // Muestra notificación emergente de cambio de idioma
}

// Listener global: reacciona al evento langchange y actualiza toda la interfaz de la tienda
document.addEventListener('langchange', () => { // Escucha el evento de cambio de idioma en todo el documento
  applyLangToHeader(); // Actualiza la bandera y etiqueta del selector de idioma en el header
  applyI18n(); // Traduce todos los elementos del DOM marcados con atributos i18n
  renderCatsDropdown(); // Regenera el dropdown de categorías con los nombres en el nuevo idioma
  renderCartItems(); // Vuelve a renderizar el contenido del drawer lateral del carrito
  updateLoginArea(); // Actualiza el botón o chip de usuario en el header
  if (document.getElementById('loginModal')?.classList.contains('open')) { // Comprueba si el modal de login está visible
    setModalMode(isRegister ? 'register' : 'login'); // Re-aplica los textos del modal al modo actual
  }
  const si = document.getElementById('searchInput'); // Obtiene el campo de búsqueda del header
  if (si) si.placeholder = t('header.search_placeholder'); // Actualiza el placeholder del buscador en el idioma nuevo
  _langChangeCallbacks.forEach(fn => { try { fn(); } catch (e) { console.warn('[i18n] langchange callback error:', e); } }); // Ejecuta los callbacks de re-render registrados por cada página
});

// Función: genera los enlaces del dropdown de categorías en el header
function renderCatsDropdown() { // Define la función que construye el menú desplegable de categorías
  const dd = document.getElementById('catsDropdown'); // Obtiene el contenedor del dropdown de categorías
  if (!dd) return; // Aborta si el dropdown no existe en la página actual
  // Genera un enlace por cada categoría del catálogo y los une en el dropdown del header
  dd.innerHTML = CATEGORIES.map(cat => `
    <a class="cat-drop-item" href="categoria.html?cat=${cat.id}">
      <span class="cdi-icon">${cat.icon}</span>
      <span>${currentLang === 'es' ? cat.nameEs : cat.nameEn}</span>
    </a>`).join(''); // Une todos los enlaces generados en una cadena HTML
}

// Función: abre o cierra el dropdown de categorías del header
function toggleCatsDropdown() { // Define la función que alterna la visibilidad del menú de categorías
  const dd  = document.getElementById('catsDropdown'); // Obtiene el panel del dropdown de categorías
  const btn = document.getElementById('catsBtn'); // Obtiene el botón que activa el dropdown
  if (!dd) return; // Aborta si el dropdown no existe en la página actual
  if (dd.classList.contains('open')) { // Comprueba si el dropdown ya está abierto
    dd.classList.remove('open'); // Cierra el dropdown de categorías
  } else { // Si estaba cerrado, lo posiciona y abre
    if (btn) { // Comprueba que el botón existe antes de calcular posición
      const r = btn.getBoundingClientRect(); // Obtiene las coordenadas del botón en pantalla
      dd.style.top  = (r.bottom + 4) + 'px'; // Posiciona el dropdown justo debajo del botón
      dd.style.left = r.left + 'px'; // Alinea el dropdown con el borde izquierdo del botón
    }
    dd.classList.add('open'); // Muestra el dropdown de categorías
  }
}

// Función: cierra el dropdown de categorías del header
function closeCatsDropdown()  { document.getElementById('catsDropdown')?.classList.remove('open'); } // Elimina la clase open del dropdown para ocultarlo

// Función: guarda la posición de scroll de la página actual en sessionStorage
function saveScrollPosition() { // Define la función que preserva el scroll antes de navegar
  sessionStorage.setItem('ns_scroll_' + window.location.href, window.scrollY); // Guarda la posición vertical de scroll con la URL como clave
}

// Función: restaura la posición de scroll guardada al volver a la página
function restoreScrollPosition() { // Define la función que recupera el scroll al volver a una página
  const key = 'ns_scroll_' + window.location.href; // Construye la clave de scroll para la URL actual
  const y = sessionStorage.getItem(key); // Lee la posición de scroll guardada
  if (y === null) return; // Aborta si no hay posición guardada para esta página
  sessionStorage.removeItem(key); // Elimina el valor guardado para no restaurarlo de nuevo
  requestAnimationFrame(() => window.scrollTo(0, +y)); // Desplaza la página a la posición guardada en el próximo frame
}

// Función: normaliza una cadena de texto eliminando tildes y pasándola a minúsculas para búsqueda
function normalizeStr(s) { // Define la función de normalización usada en el buscador del header
  return String(s) // Convierte el valor a cadena de texto
    .normalize('NFD') // Descompone los caracteres acentuados en carácter base + diacrítico
    .replace(/[̀-ͯ]/g, '') // Elimina todos los diacríticos (tildes, cedillas, etc.)
    .toLowerCase(); // Convierte la cadena resultante a minúsculas
}

// Función: genera el HTML de las estrellas de valoración de un producto
function buildStars(rating) { // Define la función que construye el bloque visual de estrellas
  let html = ''; // Inicializa la cadena HTML de estrellas vacía
  for (let i = 1; i <= 5; i++) { // Itera sobre las cinco posiciones de estrella
    if (rating >= i) { // La puntuación cubre esta estrella entera
      html += '<span style="color:var(--warning)">★</span>'; // Añade una estrella completa en color de aviso
    } else if (rating >= i - 0.5) { // La puntuación cubre solo la mitad de esta estrella
      html += `<span style="position:relative;display:inline-block">
        <span style="color:var(--text-dim)">★</span>
        <span style="position:absolute;left:0;top:0;width:50%;overflow:hidden;color:var(--warning)">★</span>
      </span>`; // Añade una estrella a medias superponiendo dos spans con overflow
    } else { // La puntuación no cubre esta estrella
      html += '<span style="color:var(--text-dim)">☆</span>'; // Añade una estrella vacía en color tenue
    }
  }
  return html; // Devuelve la cadena HTML con las cinco estrellas construidas
}

// Función: genera el HTML completo de una tarjeta de producto para la cuadrícula de la tienda
function productCardHTML(p) { // Define la función que construye cada tarjeta de producto
  const starsHtml = buildStars(p.rating); // Genera el HTML de estrellas según la valoración del producto
  const inCart = cart.find(c => c.id === p.id); // Comprueba si el producto ya está en el carrito
  const isFav  = favorites.find(f => f.id === p.id); // Comprueba si el producto está en favoritos
  const safeId = encodeURIComponent(p.id); // Codifica el ID del producto para usarlo en la URL sin errores
  const badgeLabel = p.badge === 'TOP' ? t('product.badge_top') : p.badge === 'OFERTA' ? t('product.badge_offer') : p.badge; // Traduce la etiqueta de badge según el idioma activo
  // Devuelve el HTML completo de la tarjeta de producto para insertarla en los listados de la tienda
  return `
  <a class="product-card" href="producto.html?id=${safeId}" onclick="saveScrollPosition()">
    ${p.badge ? `<div class="pc-badge${p.badge === 'TOP' ? ' top' : p.badge === 'OFERTA' ? ' oferta' : ''}">${badgeLabel}</div>` : ''}
    <div class="pc-img">
      <img src="${p.image}" alt="${escapeHtml(p.name)}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
      <span class="pc-img-fallback" style="display:none">${p.icon}</span>
      <button class="pc-fav-btn${isFav ? ' favorited' : ''}" onclick="event.preventDefault();event.stopPropagation();toggleFavoriteById('${p.id}')" title="${t('product.add_to_favorites')}">♥</button>
    </div>
    <div class="pc-body">
      <div class="pc-brand">${escapeHtml(p.brand)}</div>
      <div class="pc-name">${escapeHtml(p.name)}</div>
      <div class="pc-stars">${starsHtml}</div>
      <div class="pc-price-row">
        <div>
          ${p.oldPrice ? `<div class="pc-old-price">${p.oldPrice.toFixed(2)}€</div>` : ''}
          <div class="pc-price">${p.price.toFixed(2)}€</div>
        </div>
        <button class="pc-add-btn${inCart ? ' added' : ''}" onclick="event.preventDefault();event.stopPropagation();addToCartById('${p.id}')" title="${t('product.add_to_cart')}">+</button>
      </div>
    </div>
  </a>`;
}

// Función: escapa caracteres especiales HTML para evitar inyección de código en el DOM
function escapeHtml(s) { // Define la función de sanitización de cadenas para inserción en HTML
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); // Sustituye cada carácter peligroso por su entidad HTML equivalente
}

// Función: busca un producto por ID en todas las categorías, favoritos y carrito
function findProductById(id) { // Define la función de búsqueda de producto en el catálogo completo
  for (const cat of CATEGORIES) { // Itera sobre todas las categorías del catálogo
    const arr = ALL_PRODUCTS[cat.id] || []; // Obtiene el array de productos de la categoría actual
    const p = arr.find(x => x.id === id); // Busca el producto por ID dentro de la categoría
    if (p) return p; // Devuelve el producto si se encontró en esta categoría
  }
  return favorites.find(f => f.id === id) || cart.find(c => c.id === id) || null; // Busca en favoritos y carrito si no estaba en el catálogo
}

// Función: persiste el estado actual del carrito en localStorage
function saveCart()    { localStorage.setItem(getStorageKey('ns_cart'), JSON.stringify(cart)); } // Serializa y guarda el carrito en la clave correcta del usuario o invitado

// Función: actualiza el contador de artículos visible en el icono del carrito del header
function updateCartUI() { // Define la función que refresca el badge del carrito en el header
  const count = cart.reduce((s, c) => s + c.qty, 0); // Suma las cantidades de todos los artículos del carrito
  const el = document.getElementById('cartCount'); // Obtiene el elemento del badge de conteo del carrito
  if (!el) return; // Aborta si el badge no existe en la página actual
  el.textContent = count; // Muestra el número total de artículos en el badge
  el.classList.toggle('visible', count > 0); // Muestra u oculta el badge según si hay artículos
}

// Función: abre el drawer lateral del carrito y renderiza su contenido
function openCart() { // Define la función que despliega el panel lateral del carrito
  document.getElementById('cartOverlay')?.classList.add('open'); // Muestra la capa oscura de fondo del drawer del carrito
  document.getElementById('cartDrawer')?.classList.add('open'); // Desliza el panel lateral del carrito hacia adentro
  renderCartItems(); // Renderiza los artículos actuales dentro del drawer del carrito
}

// Función: cierra el drawer lateral del carrito
function closeCart() { // Define la función que oculta el panel lateral del carrito
  document.getElementById('cartOverlay')?.classList.remove('open'); // Oculta la capa oscura de fondo del drawer del carrito
  document.getElementById('cartDrawer')?.classList.remove('open'); // Desliza el panel lateral del carrito fuera de la vista
}

// Función: renderiza la lista de artículos y el total en el interior del drawer del carrito
function renderCartItems() { // Define la función que construye el HTML del contenido del carrito
  const el = document.getElementById('cartItems'); // Obtiene el contenedor de artículos dentro del drawer
  if (!el) return; // Aborta si el contenedor no existe en la página actual
  const totalEl = document.getElementById('cartTotal'); // Obtiene el elemento que muestra el precio total del carrito
  if (cart.length === 0) { // Comprueba si el carrito está vacío
    el.innerHTML = `<div class="cart-empty"><span class="ce-icon">🛒</span>${t('cart.empty')}</div>`; // Muestra el mensaje de carrito vacío traducido
    if (totalEl) totalEl.textContent = '0,00€'; // Restablece el total a cero en el footer del drawer
    return; // Termina la función si el carrito está vacío
  }
  // Genera el HTML de cada artículo del carrito y lo inserta en el drawer lateral de compra
  el.innerHTML = cart.map(p => `
    <div class="cart-item">
      <div class="ci-img">
        <img src="${p.image}" alt="${escapeHtml(p.name)}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
        <span class="ci-fallback" style="display:none">${p.icon}</span>
      </div>
      <div class="ci-info">
        <div class="ci-name">${escapeHtml(p.name)}</div>
        <div class="ci-price">${(p.price * p.qty).toFixed(2)}€</div>
        <div class="ci-qty">
          <button class="ci-qty-btn" onclick="changeQty('${p.id}',-1)">−</button>
          <span class="ci-qty-num">${p.qty}</span>
          <button class="ci-qty-btn" onclick="changeQty('${p.id}',1)">+</button>
        </div>
      </div>
      <button class="ci-remove" onclick="removeFromCart('${p.id}')">🗑️</button>
    </div>`).join(''); // Une todos los artículos generados en una cadena HTML
  if (totalEl) totalEl.textContent = cart.reduce((s, c) => s + c.price * c.qty, 0).toFixed(2) + '€'; // Calcula y muestra el precio total en el footer del drawer
}

// Función: sincroniza el estado visual del botón de añadir en todas las tarjetas de producto visibles
function refreshAllCardBtns() { // Define la función que actualiza los botones de las tarjetas tras modificar el carrito
  document.querySelectorAll('a.product-card').forEach(link => { // Itera sobre todas las tarjetas de producto del DOM
    const btn = link.querySelector('.pc-add-btn'); // Obtiene el botón de añadir al carrito de la tarjeta
    if (!btn) return; // Omite la tarjeta si no tiene botón de añadir
    const id = new URLSearchParams(link.search).get('id'); // Extrae el ID del producto de la URL de la tarjeta
    if (id) btn.classList.toggle('added', !!cart.find(c => c.id === decodeURIComponent(id))); // Marca el botón como añadido si el producto está en el carrito
  });
}

// Función: añade un producto al carrito o incrementa su cantidad si ya existe
function addToCart(product) { // Define la función principal para añadir productos al carrito
  const existing = cart.find(c => c.id === product.id); // Busca si el producto ya existe en el carrito
  if (existing) existing.qty++; else cart.push({ ...product, qty: 1 }); // Incrementa cantidad si existe o añade el producto nuevo con cantidad 1
  saveCart(); updateCartUI(); refreshAllCardBtns(); // Persiste el carrito y refresca el badge y los botones de tarjetas
  if (document.getElementById('cartDrawer')?.classList.contains('open')) renderCartItems(); // Actualiza el drawer si está abierto en este momento
  showToast(`🛒 ${product.brand} ${t('toast.added_cart')}`, 'success'); // Muestra notificación de producto añadido al carrito
}

// Función: busca un producto por ID y lo añade al carrito
function addToCartById(id) { // Define la función de acceso directo para añadir al carrito desde las tarjetas
  const p = findProductById(id); // Busca el producto completo por su ID en el catálogo
  if (p) addToCart(p); // Añade el producto al carrito si se encontró
}

// Función: elimina un producto del carrito por su ID
function removeFromCart(id) { // Define la función que borra un artículo del carrito del drawer
  cart = cart.filter(c => c.id !== id); // Filtra el carrito excluyendo el artículo con el ID indicado
  saveCart(); updateCartUI(); renderCartItems(); refreshAllCardBtns(); // Persiste el carrito y refresca drawer, badge y botones de tarjetas
}

// Función: modifica la cantidad de un artículo del carrito y elimina si llega a cero
function changeQty(id, delta) { // Define la función que gestiona los botones de cantidad del drawer
  const item = cart.find(c => c.id === id); // Busca el artículo en el carrito por su ID
  if (!item) return; // Aborta si el artículo no existe en el carrito
  item.qty += delta; // Aplica el incremento o decremento de cantidad al artículo
  if (item.qty <= 0) return removeFromCart(id); // Elimina el artículo del carrito si la cantidad llega a cero o menos
  saveCart(); updateCartUI(); renderCartItems(); // Persiste el carrito y refresca el drawer y el badge del header
}

// Función: persiste el estado actual de los favoritos en localStorage
function saveFavorites() { localStorage.setItem(getStorageKey('ns_favorites'), JSON.stringify(favorites)); } // Serializa y guarda los favoritos en la clave correcta del usuario o invitado

// Función: comprueba si un producto está en la lista de favoritos
function isFavorite(id) { return !!favorites.find(f => f.id === id); } // Devuelve true si el ID dado corresponde a un favorito guardado

// Función: añade o elimina un producto de favoritos y actualiza toda la interfaz relacionada
function toggleFavorite(product) { // Define la función que gestiona el botón de favorito en tarjetas y página de detalle
  const idx = favorites.findIndex(f => f.id === product.id); // Busca el índice del producto en la lista de favoritos
  if (idx >= 0) { // El producto ya estaba en favoritos
    favorites.splice(idx, 1); // Elimina el producto de la lista de favoritos
    showToast(`💔 ${t('toast.removed_favorites')}`, ''); // Muestra notificación de producto eliminado de favoritos
  } else { // El producto no estaba en favoritos
    favorites.push(product); // Añade el producto a la lista de favoritos
    showToast(`❤️ ${product.brand} ${t('toast.added_favorites')}`, 'success'); // Muestra notificación de producto añadido a favoritos
  }
  saveFavorites(); // Persiste la lista de favoritos actualizada en localStorage
  updateFavoritesUI(); // Actualiza el badge de favoritos en el header
  document.querySelectorAll(`.pc-fav-btn`).forEach(btn => { // Itera sobre todos los botones de favorito visibles en las tarjetas
    const link = btn.closest('a.product-card'); // Obtiene la tarjeta de producto que contiene el botón
    if (!link) return; // Omite el botón si no está dentro de una tarjeta
    const id = decodeURIComponent(new URL(link.href).searchParams.get('id') || ''); // Extrae el ID del producto de la URL de la tarjeta
    btn.classList.toggle('favorited', isFavorite(id)); // Marca o desmarca el botón de favorito según el estado actual
  });
  const wish = document.getElementById('detailWishBtn'); // Obtiene el botón de favorito de la página de detalle
  if (wish && wish.dataset.pid === product.id) { // Comprueba si el botón de detalle corresponde al producto modificado
    wish.classList.toggle('favorited', isFavorite(product.id)); // Actualiza el estado visual del botón de la página de detalle
    wish.textContent = isFavorite(product.id) ? '♥' : '♡'; // Cambia el icono del botón de la página de detalle
  }
}

// Función: busca un producto por ID y alterna su estado de favorito
function toggleFavoriteById(id) { // Define la función de acceso directo para favoritos desde las tarjetas
  const p = findProductById(id); // Busca el producto completo por su ID en el catálogo
  if (p) toggleFavorite(p); // Alterna el estado de favorito si el producto se encontró
}

// Función: actualiza el badge de favoritos en el header con el número actual
function updateFavoritesUI() { // Define la función que refresca el contador de favoritos del header
  const badge = document.getElementById('favBadge'); // Obtiene el elemento del badge de favoritos
  if (!badge) return; // Aborta si el badge no existe en la página actual
  badge.textContent = favorites.length; // Muestra el número de productos favoritos en el badge
  badge.classList.toggle('visible', favorites.length > 0); // Muestra u oculta el badge según si hay favoritos
}

// Temporizador: controla el retardo del buscador para no ejecutar búsquedas en cada pulsación
let searchTimeout; // Variable para almacenar el identificador del temporizador de búsqueda

// Función: gestiona el input del buscador del header con un retardo de 200ms
function handleSearchInput(e) { // Define la función que reacciona a cada pulsación en el campo de búsqueda
  clearTimeout(searchTimeout); // Cancela el temporizador anterior para reiniciarlo
  const q = e.target.value.trim(); // Obtiene la consulta del campo de búsqueda sin espacios
  if (q.length < 2) { closeSearchDropdown(); return; } // Cierra el dropdown si la consulta tiene menos de 2 caracteres
  searchTimeout = setTimeout(() => showSearchResults(q), 200); // Lanza la búsqueda tras 200ms sin nuevas pulsaciones
}

// Función: busca productos que coincidan con la consulta y muestra el dropdown de resultados
function showSearchResults(q) { // Define la función que ejecuta la búsqueda y renderiza el dropdown del header
  const nq = normalizeStr(q); // Normaliza la consulta para comparación sin tildes ni mayúsculas
  const results = []; // Inicializa el array de resultados de búsqueda
  CATEGORIES.forEach(cat => { // Itera sobre todas las categorías del catálogo
    (ALL_PRODUCTS[cat.id] || []).forEach(p => { // Itera sobre los productos de cada categoría
      if (p._ns.includes(nq) || p._bs.includes(nq)) results.push(p); // Añade el producto si su nombre o marca normalizada contiene la consulta
    });
  });
  const dd = document.getElementById('searchDropdown'); // Obtiene el panel del dropdown de búsqueda del header
  if (!dd) return; // Aborta si el dropdown no existe en la página actual
  if (results.length === 0) { // No se encontraron resultados para la consulta
    dd.innerHTML = `<div class="search-no-results">${t('search.no_results')} "<strong>${escapeHtml(q)}</strong>"</div>`; // Muestra el mensaje de sin resultados traducido
  } else { // Se encontraron productos que coinciden con la búsqueda
    // Limita los resultados a 8 y genera el HTML de cada ítem para el dropdown de búsqueda del header
    dd.innerHTML = results.slice(0, 8).map(p => `
      <a class="search-result-item" href="producto.html?id=${encodeURIComponent(p.id)}">
        <div class="sri-img"><img src="${p.image}" alt="${escapeHtml(p.name)}" loading="lazy" onerror="this.style.display='none'"><span></span></div>
        <div class="sri-info">
          <div class="sri-name">${escapeHtml(p.name).replace(new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi'), '<span class="highlight">$1</span>')}</div>
          <div class="sri-cat">${CATEGORIES.find(c => c.id === p.catId)?.[currentLang === 'es' ? 'nameEs' : 'nameEn'] || ''}</div>
        </div>
        <div class="sri-price">${p.price.toFixed(2)}€</div>
      </a>`).join(''); // Une los ítems generados en la cadena HTML del dropdown
    if (results.length > 8) { // Hay más resultados de los que se muestran en el dropdown
      dd.innerHTML += `<a class="search-no-results" style="cursor:pointer;color:var(--accent-hover);display:block;
      text-decoration:none" href="busqueda.html?q=${encodeURIComponent(q)}">${t('search.see_all_prefix')} ${results.length} ${t('search.see_all_suffix')}</a>`;
       // Añade enlace para ver todos los resultados en la página de búsqueda
    }
  }
  dd.classList.add('open'); // Muestra el dropdown de resultados de búsqueda
}

// Función: cierra el dropdown de resultados de búsqueda del header
function closeSearchDropdown() { document.getElementById('searchDropdown')?.classList.remove('open'); } // Elimina la clase open del dropdown para ocultarlo

// Función: abre el modal de login en modo inicio de sesión
function openLogin()  { document.getElementById('loginModal')?.classList.add('open'); isRegister = false; setModalMode('login'); } // Muestra el modal y lo configura en modo login

// Función: cierra el modal de login y limpia todos sus campos
function closeLogin() { // Define la función que oculta y resetea el modal de autenticación
  document.getElementById('loginModal')?.classList.remove('open'); // Oculta el modal de login eliminando la clase open
  const emailEl = document.querySelector('#loginModal .form-input[type=email]'); // Obtiene el campo de email del modal
  if (emailEl) emailEl.value = ''; // Limpia el campo de email del modal
  const passEl = document.getElementById('passwordInput'); // Obtiene el campo de contraseña del modal
  if (passEl) { passEl.value = ''; passEl.type = 'password'; } // Limpia la contraseña y restablece su tipo a oculto
  const nameEl = document.querySelector('#registerName input'); // Obtiene el campo de nombre del formulario de registro
  if (nameEl) nameEl.value = ''; // Limpia el campo de nombre del formulario de registro
  const eyeBtn = document.getElementById('eyeBtn'); // Obtiene el botón de mostrar/ocultar contraseña
  if (eyeBtn) eyeBtn.style.color = 'var(--text-dim)'; // Restablece el color del botón de ojo al estado inicial
}

// Función: configura los textos del modal según si está en modo login o registro
function setModalMode(mode) { // Define la función que adapta el modal al modo de autenticación activo
  isRegister = mode === 'register'; // Actualiza la variable global según el modo recibido
  const $ = id => document.getElementById(id); // Alias local para obtener elementos por ID
  if (!$('modalTitle')) return; // Aborta si el modal no está en el DOM
  $('modalTitle').textContent     = isRegister ? t('auth.register_title') : t('auth.login_title'); // Actualiza el título del modal según el modo
  $('modalSub').textContent       = isRegister ? t('auth.register_sub')   : t('auth.login_sub'); // Actualiza el subtítulo del modal según el modo
  $('modalActionBtn').textContent = isRegister ? t('auth.register_btn')   : t('auth.sign_in_btn'); // Actualiza el texto del botón de acción del modal
  $('registerName').style.display = isRegister ? 'block' : 'none'; // Muestra u oculta el campo de nombre según el modo
  const sw = $('modalSwitch'); // Obtiene el enlace para cambiar entre modos del modal
  if (sw) { // Comprueba que el enlace de cambio de modo existe
    sw.innerHTML = isRegister // Genera el enlace de cambio de modo según el estado actual
      ? `<span>${t('auth.have_account')}</span> <a onclick="switchModal('login')">${t('auth.sign_in_link')}</a>`
      : `<span>${t('auth.no_account')}</span> <a onclick="switchModal('register')">${t('auth.register_link')}</a>`;
  }
  const emailInput = document.querySelector('#loginModal .form-input[type=email]'); // Obtiene el campo de email del modal
  if (emailInput) emailInput.placeholder = t('auth.email_placeholder'); // Actualiza el placeholder del campo de email traducido
  const nameInput  = document.querySelector('#registerName input'); // Obtiene el campo de nombre del registro
  if (nameInput)  nameInput.placeholder  = t('auth.name_placeholder'); // Actualiza el placeholder del campo de nombre traducido
  const labels = document.querySelectorAll('#loginModal .form-label'); // Obtiene todas las etiquetas del formulario del modal
  if (labels[0]) labels[0].textContent = t('auth.email'); // Actualiza la etiqueta del campo de email
  if (labels[1]) labels[1].textContent = t('auth.name'); // Actualiza la etiqueta del campo de nombre
  if (labels[2]) labels[2].textContent = t('auth.password'); // Actualiza la etiqueta del campo de contraseña
}

// Función: cambia el modal al modo indicado (login o registro)
function switchModal(mode) { setModalMode(mode); } // Delega en setModalMode para cambiar entre formularios del modal

// Función: valida los campos y ejecuta el login o registro mediante Firebase
async function handleLogin() { // Define la función asíncrona que procesa el envío del formulario de autenticación
  const emailEl = document.querySelector('#loginModal .form-input[type=email]'); // Obtiene el campo de email del modal
  const passEl  = document.getElementById('passwordInput'); // Obtiene el campo de contraseña del modal
  const email   = emailEl?.value.trim() ?? ''; // Lee y limpia el valor del email introducido
  const pass    = passEl?.value ?? ''; // Lee el valor de la contraseña introducida

  if (!email.includes('@') || pass.length < 6) { // Valida que el email tenga arroba y la contraseña tenga al menos 6 caracteres
    showToast('⚠️ ' + t('auth.invalid_fields'), ''); // Muestra error de validación si los campos no son válidos
    return; // Interrumpe el proceso si la validación falla
  }

  const btn = document.getElementById('modalActionBtn'); // Obtiene el botón de acción del modal de autenticación
  btn.disabled    = true; // Deshabilita el botón durante la operación para evitar envíos múltiples
  btn.textContent = isRegister ? t('auth.creating') : t('auth.signing_in'); // Muestra texto de progreso en el botón según el modo

  try { // Bloque de intento de autenticación con Firebase
    if (isRegister) { // Ejecuta el flujo de registro si el modal está en modo registro
      const name = document.querySelector('#registerName input')?.value.trim() || email.split('@')[0]; // Obtiene el nombre o usa el prefijo del email como fallback
      await firebaseRegister(email, pass, name); // Llama a Firebase para crear la cuenta con email, contraseña y nombre
      showToast(`👋 ${t('toast.welcome').replace('{name}', name)}`, 'success'); // Muestra el mensaje de bienvenida con el nombre del nuevo usuario
    } else { // Ejecuta el flujo de inicio de sesión si el modal está en modo login
      await firebaseLogin(email, pass); // Llama a Firebase para autenticar con email y contraseña
      showToast(`👋 ${t('toast.welcome_back')}`, 'success'); // Muestra el mensaje de bienvenida de vuelta al usuario
    }
    closeLogin(); // Cierra el modal de autenticación tras el éxito
  } catch (err) { // Captura cualquier error devuelto por Firebase
    const msg = typeof firebaseErrorMsg === 'function' ? firebaseErrorMsg(err.code) : err.message; // Traduce el código de error de Firebase a un mensaje legible
    showToast('⚠️ ' + msg, ''); // Muestra el mensaje de error de autenticación al usuario
  } finally { // Se ejecuta siempre, tanto en éxito como en error
    btn.disabled    = false; // Rehabilita el botón de acción del modal
    btn.textContent = isRegister ? t('auth.register_btn') : t('auth.sign_in_btn'); // Restaura el texto original del botón de acción
  }
}

// Función: actualiza el área de login del header mostrando el chip de usuario o el botón de acceso
function updateLoginArea() { // Define la función que refresca el área de autenticación del header
  const area = document.getElementById('loginArea'); // Obtiene el contenedor del área de login en el header
  if (!area) return; // Aborta si el área no existe en la página actual
  if (loggedUser) { // Comprueba si hay un usuario autenticado
    area.innerHTML = `<div class="user-chip" onclick="logoutUser()">
      <div class="user-avatar">${loggedUser.name[0].toUpperCase()}</div>
      ${escapeHtml(loggedUser.name)}
      <span style="color:var(--text-dim);font-size:.75rem">✕</span>
    </div>`; // Muestra el chip con el avatar, nombre y botón de cierre de sesión
  } else { // No hay usuario autenticado
    area.innerHTML = `<button class="login-btn-header" onclick="openLogin()">${t('header.sign_in')}</button>`; // Muestra el botón de inicio de sesión en el header
  }
}

// Función: cierra la sesión del usuario y limpia su estado en la interfaz
function logoutUser() { // Define la función que gestiona el cierre de sesión desde el header
  showToast(`👋 ${t('toast.logout')}`, 'success'); // Muestra la notificación de cierre de sesión al usuario
  if (typeof firebaseLogout === 'function') { // Comprueba si Firebase está disponible para cerrar sesión
    firebaseLogout().catch(console.error); // Llama a Firebase para cerrar la sesión y captura errores silenciosamente
  } else { // Fallback si Firebase no está disponible
    loggedUser = null; // Limpia el usuario logueado en el estado global
    localStorage.removeItem('ns_user'); // Elimina los datos del usuario del almacenamiento local
    updateLoginArea(); // Actualiza el área de login del header para mostrar el botón de acceso
  }
}

// Función: alterna la visibilidad de la contraseña en el campo del modal de login
function togglePassword() { // Define la función que gestiona el botón de ojo del campo de contraseña
  const input = document.getElementById('passwordInput'); // Obtiene el campo de contraseña del modal
  const btn   = document.getElementById('eyeBtn'); // Obtiene el botón de mostrar/ocultar contraseña
  if (!input || !btn) return; // Aborta si alguno de los elementos no existe en el DOM
  if (input.type === 'password') { // La contraseña está oculta actualmente
    input.type = 'text'; // Cambia el campo a texto plano para mostrar la contraseña
    btn.style.color = 'var(--accent-hover)'; // Cambia el color del botón de ojo al color de acento activo
    btn.title = t('auth.hide_password'); // Actualiza el tooltip del botón para indicar que ocultará la contraseña
  } else { // La contraseña está visible actualmente
    input.type = 'password'; // Vuelve a ocultar la contraseña en el campo
    btn.style.color = 'var(--text-dim)'; // Restaura el color del botón de ojo al color tenue
    btn.title = t('auth.show_password'); // Actualiza el tooltip del botón para indicar que mostrará la contraseña
  }
}

// Función: carga el carrito, favoritos y pedidos del usuario autenticado desde localStorage
function loadUserData() { // Define la función que inicializa los datos del usuario al autenticarse
  const userCartKey   = getStorageKey('ns_cart'); // Obtiene la clave de localStorage del carrito del usuario
  const userFavKey    = getStorageKey('ns_favorites'); // Obtiene la clave de localStorage de los favoritos del usuario
  const userOrdersKey = getStorageKey('ns_orders'); // Obtiene la clave de localStorage de los pedidos del usuario
  const savedCart     = localStorage.getItem(userCartKey); // Lee el carrito guardado del usuario
  const savedFav      = localStorage.getItem(userFavKey); // Lee los favoritos guardados del usuario
  const savedOrders   = localStorage.getItem(userOrdersKey); // Lee los pedidos guardados del usuario

  cart      = savedCart !== null ? JSON.parse(savedCart   || '[]') : JSON.parse(localStorage.getItem('ns_cart')      || '[]'); // Carga el carrito del usuario o del invitado si no hay clave de usuario
  favorites = savedFav  !== null ? JSON.parse(savedFav    || '[]') : JSON.parse(localStorage.getItem('ns_favorites') || '[]'); // Carga los favoritos del usuario o del invitado si no hay clave de usuario
  if (savedOrders === null) { // No hay pedidos guardados para el usuario aún
    const guestOrders = localStorage.getItem('ns_orders'); // Lee los pedidos de invitado
    if (guestOrders) localStorage.setItem(userOrdersKey, guestOrders); // Migra los pedidos de invitado a la clave del usuario
  }

  saveCart(); // Persiste el carrito cargado en la clave correcta del usuario
  saveFavorites(); // Persiste los favoritos cargados en la clave correcta del usuario
  updateCartUI(); // Refresca el badge del carrito en el header
  updateFavoritesUI(); // Refresca el badge de favoritos en el header
  updateOrdersUI(); // Refresca el badge de pedidos en el header
  if (typeof renderFavoritesPage === 'function' && window.getCurrentPage && getCurrentPage() === 'favoritos') renderFavoritesPage(); // Re-renderiza la página de favoritos si está activa
  if (typeof renderOrdersPage    === 'function' && window.getCurrentPage && getCurrentPage() === 'pedidos')   renderOrdersPage(); // Re-renderiza la página de pedidos si está activa
}

// Función: vacía el carrito y favoritos al cerrar sesión y actualiza toda la interfaz
function clearUserData() { // Define la función que limpia los datos de sesión al cerrar sesión
  cart      = []; // Vacía el carrito en el estado global
  favorites = []; // Vacía los favoritos en el estado global
  updateCartUI(); // Refresca el badge del carrito en el header a cero
  updateFavoritesUI(); // Refresca el badge de favoritos en el header a cero
  updateOrdersUI(); // Refresca el badge de pedidos en el header a cero
  if (typeof renderFavoritesPage === 'function' && window.getCurrentPage && getCurrentPage() === 'favoritos') renderFavoritesPage(); // Re-renderiza la página de favoritos si está activa
  if (typeof renderOrdersPage    === 'function' && window.getCurrentPage && getCurrentPage() === 'pedidos')   renderOrdersPage(); // Re-renderiza la página de pedidos si está activa
}

// Función: genera un ID de pedido único con formato CS-AAMMDD-XXXX
function generateOrderId() { // Define la función que crea el identificador único para cada pedido
  const d = new Date(); // Obtiene la fecha y hora actuales
  const stamp = d.getFullYear().toString().slice(-2) + // Toma los dos últimos dígitos del año
                String(d.getMonth() + 1).padStart(2, '0') + // Añade el mes con dos dígitos
                String(d.getDate()).padStart(2, '0'); // Añade el día con dos dígitos
  const rand = Math.floor(Math.random() * 9000 + 1000); // Genera un número aleatorio de 4 dígitos
  return `CS-${stamp}-${rand}`; // Devuelve el ID con prefijo CS, fecha y número aleatorio
}

// Función: obtiene todos los pedidos guardados del usuario o invitado actual
function getAllOrders() { // Define la función que recupera el historial de pedidos de localStorage
  return JSON.parse(localStorage.getItem(getStorageKey('ns_orders')) || '[]'); // Lee y parsea la lista de pedidos o devuelve un array vacío
}

// Función: guarda un nuevo pedido al inicio de la lista de pedidos del usuario
function saveOrder(order) { // Define la función que persiste un pedido recién generado
  const orders = getAllOrders(); // Lee el historial de pedidos existente del usuario
  orders.unshift(order); // Inserta el nuevo pedido al inicio del historial
  localStorage.setItem(getStorageKey('ns_orders'), JSON.stringify(orders)); // Guarda el historial actualizado en localStorage
}

// Función: reemplaza toda la lista de pedidos guardada por un array nuevo
function saveOrders(orders) { // Define la función que sobrescribe el historial de pedidos completo
  localStorage.setItem(getStorageKey('ns_orders'), JSON.stringify(orders)); // Serializa y guarda el array de pedidos en localStorage
}

// Función: actualiza el badge de pedidos en el header con el número de pedidos guardados
function updateOrdersUI() { // Define la función que refresca el contador de pedidos del header
  const badge = document.getElementById('ordersBadge'); // Obtiene el elemento del badge de pedidos
  if (!badge) return; // Aborta si el badge no existe en la página actual
  const count = getAllOrders().length; // Obtiene el número total de pedidos guardados
  badge.textContent = count; // Muestra el número de pedidos en el badge del header
  badge.classList.toggle('visible', count > 0); // Muestra u oculta el badge según si hay pedidos
}

// Función: procesa el checkout vaciando el carrito y generando un nuevo pedido
function checkout() { // Define la función principal que gestiona la confirmación de compra
  if (cart.length === 0) { // Comprueba si el carrito está vacío antes de proceder
    showToast(`🛒 ${t('toast.cart_empty')}`, ''); // Muestra aviso de carrito vacío al usuario
    return; // Interrumpe el checkout si el carrito está vacío
  }
  if (!loggedUser) { // Comprueba si el usuario está autenticado antes de confirmar el pedido
    closeCart(); // Cierra el drawer del carrito
    openLogin(); // Abre el modal de login para que el usuario se autentique
    showToast(`🔒 ${t('toast.login_required')}`, ''); // Muestra aviso de que el login es obligatorio para comprar
    return; // Interrumpe el checkout hasta que el usuario inicie sesión
  }
  const total      = cart.reduce((s, c) => s + c.price * c.qty, 0); // Calcula el importe total del pedido
  const itemsCount = cart.reduce((s, c) => s + c.qty, 0); // Calcula el número total de artículos del pedido
  const order = { // Construye el objeto del pedido con todos sus datos
    id:         generateOrderId(), // Genera el ID único del pedido
    date:       new Date().toISOString(), // Registra la fecha y hora de creación en formato ISO
    user:       loggedUser ? { name: loggedUser.name, email: loggedUser.email } : null, // Asocia el usuario al pedido si está autenticado
    items:      cart.map(c => ({ id: c.id, name: c.name, brand: c.brand, price: c.price, qty: c.qty })), // Crea la lista de artículos del pedido con los datos esenciales
    itemsCount, // Número total de artículos del pedido
    total:      +total.toFixed(2), // Importe total redondeado a dos decimales
    status:     'confirmado', // Estado inicial del pedido al crearse
  };
  saveOrder(order); // Persiste el nuevo pedido en el historial del usuario
  updateOrdersUI(); // Actualiza el badge de pedidos en el header

  cart = []; // Vacía el carrito tras confirmar el pedido
  saveCart(); // Persiste el carrito vacío en localStorage
  updateCartUI(); // Refresca el badge del carrito a cero en el header
  renderCartItems(); // Renderiza el estado vacío en el drawer del carrito
  closeCart(); // Cierra el drawer lateral del carrito

  if (window.getCurrentPage && getCurrentPage() === 'pedidos' && typeof renderOrdersPage === 'function') { // Comprueba si el usuario está en la página de pedidos
    renderOrdersPage(); // Re-renderiza la página de pedidos para mostrar el nuevo pedido
  }

  showOrderConfirmation(order); // Muestra el modal de confirmación con el resumen del pedido
}

// Función: crea y muestra el modal de confirmación con el resumen del pedido realizado
function showOrderConfirmation(order) { // Define la función que genera el modal de éxito tras el checkout
  document.getElementById('orderConfirmModal')?.remove(); // Elimina el modal anterior si existía para evitar duplicados

  const locale = currentLang === 'es' ? 'es-ES' : 'en-GB'; // Selecciona el locale de formato de fecha según el idioma activo
  const fmt      = new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeStyle: 'short' }); // Crea el formateador de fecha y hora localizado
  // Genera el HTML de cada artículo incluido en el pedido para el modal de confirmación de compra
  const itemsList = order.items.map(i => `
    <div class="oc-item">
      <span class="oc-item-qty">${i.qty}×</span>
      <span class="oc-item-name">${escapeHtml(i.brand)} · ${escapeHtml(i.name)}</span>
      <span class="oc-item-price">${(i.price * i.qty).toFixed(2)}€</span>
    </div>`).join(''); // Une los artículos del pedido en una cadena HTML

  const itemWord  = order.itemsCount === 1 ? t('orders.one_item')   : t('orders.many_items'); // Elige la forma singular o plural de "artículo" según la cantidad
  const ordCount  = getAllOrders().length; // Obtiene el número total de pedidos guardados tras el nuevo
  const ordWord   = ordCount === 1           ? t('orders.one_order') : t('orders.many_orders'); // Elige la forma singular o plural de "pedido" para el modal

  const modal = document.createElement('div'); // Crea el elemento div del modal de confirmación
  modal.id = 'orderConfirmModal'; // Asigna el ID al modal para poder referenciarlo después
  modal.className = 'modal-overlay open'; // Aplica las clases de overlay y open para mostrarlo
  // Inserta el HTML completo del modal de confirmación de pedido en el overlay creado
  modal.innerHTML = `
    <div class="modal oc-modal">
      <button class="modal-close" onclick="closeOrderConfirmation()" aria-label="${t('cart.close')}">✕</button>
      <div class="oc-success">✅</div>
      <div class="modal-title">${t('orders.confirmed_title')}</div>
      <div class="modal-sub">${t('orders.thank_you')}${order.user ? `, <strong>${escapeHtml(order.user.name)}</strong>` : ''}.</div>
      <div class="oc-id-box">
        <span class="oc-id-label">${t('orders.order_number')}</span>
        <span class="oc-id-value">${order.id}</span>
      </div>
      <div class="oc-meta">
        <span>📅 ${fmt.format(new Date(order.date))}</span>
        <span>📦 ${order.itemsCount} ${itemWord}</span>
      </div>
      <div class="oc-items">${itemsList}</div>
      <div class="oc-total-row">
        <span>${t('orders.total_paid')}</span>
        <span class="oc-total-price">${order.total.toFixed(2)}€</span>
      </div>
      <button class="modal-btn" onclick="closeOrderConfirmation()">${t('orders.accept')}</button>
      <div class="modal-switch" style="margin-top:14px">
        <span style="color:var(--text-dim);font-size:.78rem">${t('orders.saved_locally')} <strong>${ordCount}</strong> ${ordWord}</span>
      </div>
    </div>`;
  document.body.appendChild(modal); // Añade el modal al body del documento para mostrarlo
  modal.addEventListener('click', e => { if (e.target === modal) closeOrderConfirmation(); }); // Cierra el modal al hacer clic en el overlay exterior
  showToast(`🎉 ${order.id} ${t('orders.toast_confirmed')}`, 'success'); // Muestra la notificación de pedido confirmado con el ID
}

// Función: elimina el modal de confirmación de pedido del DOM
function closeOrderConfirmation() { // Define la función que cierra el modal de confirmación de pedido
  document.getElementById('orderConfirmModal')?.remove(); // Elimina el modal del DOM si existe
}

// Función: crea y muestra una notificación emergente temporal en la esquina de la pantalla
function showToast(msg, type = '') { // Define la función que genera los toasts de la tienda
  const container = document.getElementById('toastContainer'); // Obtiene el contenedor de notificaciones emergentes
  if (!container) return; // Aborta si el contenedor no existe en la página actual
  const toast = document.createElement('div'); // Crea el elemento div del toast
  toast.className = `toast ${type}`; // Aplica las clases del toast con el tipo de estilo indicado
  toast.innerHTML = `<span class="t-icon"></span><span>${msg}</span>`; // Inserta el icono y el mensaje en el toast
  container.appendChild(toast); // Añade el toast al contenedor de notificaciones
  setTimeout(() => { toast.classList.add('fadeout'); setTimeout(() => toast.remove(), 300); }, 2800); // Inicia el fadeout tras 2800ms y elimina el toast 300ms después
}

// Función: devuelve todos los productos con descuento activo ordenados por descuento descendente
function getAllOffers() { // Define la función que recopila las ofertas para la sección de descuentos
  const arr = []; // Inicializa el array que acumulará los productos en oferta
  CATEGORIES.forEach(cat => { // Itera sobre todas las categorías del catálogo
    (ALL_PRODUCTS[cat.id] || []).forEach(p => { // Itera sobre los productos de cada categoría
      if (p.oldPrice && p.oldPrice > p.price && p.discount > 0) arr.push(p); // Añade el producto si tiene precio antiguo mayor y descuento positivo
    });
  });
  return arr.sort((a, b) => b.discount - a.discount); // Devuelve las ofertas ordenadas de mayor a menor descuento
}

// Función: ordena un array de productos según el criterio de ordenación seleccionado
function sortProducts(arr, sort) { // Define la función que gestiona el selector de ordenación de la tienda
  switch (sort) { // Evalúa el criterio de ordenación recibido
    case 'price-asc':  return [...arr].sort((a, b) => a.price - b.price); // Ordena por precio ascendente
    case 'price-desc': return [...arr].sort((a, b) => b.price - a.price); // Ordena por precio descendente
    case 'name-asc':   return [...arr].sort((a, b) => a.name.localeCompare(b.name)); // Ordena por nombre A-Z
    case 'name-desc':  return [...arr].sort((a, b) => b.name.localeCompare(a.name)); // Ordena por nombre Z-A
    case 'rating':     return [...arr].sort((a, b) => b.rating - a.rating); // Ordena por valoración descendente
    default:           return arr; // Devuelve el array sin modificar si el criterio no coincide con ninguno
  }
}

// Función: detecta el tipo de componente informático a partir de su nombre
function getCompType(name) { // Define la función que clasifica productos por tipo de componente
  const n = name.toLowerCase(); // Convierte el nombre a minúsculas para la comparación
  if (n.includes('procesador'))         return 'procesador'; // Clasifica el producto como procesador
  if (n.includes('tarjeta gráfica'))    return 'grafica'; // Clasifica el producto como tarjeta gráfica
  if (n.includes('ram'))                return 'ram'; // Clasifica el producto como memoria RAM
  if (n.includes('disco') || n.includes('nvme')) return 'almacenamiento'; // Clasifica el producto como dispositivo de almacenamiento
  if (n.includes('placa base'))         return 'placa'; // Clasifica el producto como placa base
  if (n.includes('refrigeración'))      return 'refrigeración'; // Clasifica el producto como sistema de refrigeración
  if (n.includes('tarjeta de red'))     return 'tarjeta de red'; // Clasifica el producto como tarjeta de red
  if (n.includes('tarjeta de sonido'))  return 'tarjeta de sonido'; // Clasifica el producto como tarjeta de sonido
  if (n.includes('fuente'))             return 'fuente'; // Clasifica el producto como fuente de alimentación
  if (n.includes('torre') || n.includes('caja') || n.includes('umbra') || n.includes('atx negra')) return 'torre'; // Clasifica el producto como caja o torre de ordenador
  return 'otro'; // Devuelve 'otro' si el nombre no coincide con ningún tipo conocido
}
