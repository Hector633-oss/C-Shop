// Módulo IIFE que inyecta header, subnav, footer, drawer del carrito y modal de login en todas las páginas
(function () {

  // Obtiene el identificador de la página activa a partir de la URL
  function getCurrentPage() { // Devuelve el nombre de la página actual sin extensión para marcar el botón activo del subnav
    const path = window.location.pathname.split('/').pop() || 'index.html'; // Extrae el segmento final de la ruta o usa index.html como valor por defecto
    return path.replace(/\.html$/, '') || 'index'; // Elimina la extensión .html y devuelve el identificador limpio de la página
  }

  // Construye el HTML del topbar, header y subnav de la tienda
  function buildHeader() { // Genera la cadena HTML con el topbar promocional, el header principal y la barra de navegación secundaria
    return `
<!-- Tooltip flotante del configurador: muestra imagen, nombre y precio del componente al pasar el ratón -->
<div id="config-tooltip">
  <img src="" alt="" id="config-tooltip-img">
  <div class="ctt-name" id="config-tooltip-name"></div>
  <div class="ctt-price" id="config-tooltip-price"></div>
</div>

<!-- Barra superior promocional con mensajes de envío, stock y seguridad de pago -->
<div class="topbar">
  🚀 <span data-i18n="topbar.free_shipping">Envío GRATIS</span>
  <span data-i18n="topbar.over">en pedidos superiores a</span> <span>99€</span>
  &nbsp;·&nbsp;
  ⚡ <span data-i18n="topbar.stock">Stock inmediato</span>
  &nbsp;·&nbsp;
  🔒 <span data-i18n="topbar.secure">Pago 100% seguro</span>
</div>

<!-- Cabecera principal: logo, buscador con autocompletado y acciones del usuario -->
<header>
  <div class="header-main">
    <!-- Logo enlazado a la página de inicio -->
    <a class="logo" href="index.html" style="cursor:pointer">
      <div class="logo-icon">⚡</div>
      <div class="logo-text"><span>C-</span>Shop</div>
    </a>
    <!-- Buscador con dropdown de sugerencias en tiempo real -->
    <div class="search-wrap">
      <form id="searchForm" action="busqueda.html" method="get" style="margin:0">
        <input type="text" id="searchInput" name="q"
               placeholder="Busca productos, marcas, categorías…"
               data-i18n-placeholder="header.search_placeholder"
               autocomplete="off">
        <button type="submit" class="search-btn" aria-label="Buscar">🔍</button>
        <div class="search-results-dropdown" id="searchDropdown"></div>
      </form>
    </div>
    <!-- Área derecha: selector de idioma, login/usuario, carrito y pedidos -->
    <div class="header-right">
      <!-- Botón selector de idioma: alterna entre español e inglés -->
      <button class="hbtn lang-btn" onclick="toggleLang()"
              data-i18n-title="nav.change_lang" title="Cambiar idioma">
        <span id="langFlag">🇪🇸</span><span id="langLabel">ES</span>
      </button>
      <!-- Área de autenticación: muestra el botón de login o el chip del usuario -->
      <div id="loginArea">
        <button class="login-btn-header" onclick="openLogin()" data-i18n="header.sign_in">Iniciar sesión</button>
      </div>
      <!-- Botón del carrito con badge de cantidad de artículos -->
      <button class="hbtn" onclick="openCart()"
              data-i18n-title="header.cart" title="Carrito"
              style="position:relative">
        <span class="hbtn-icon">🛒</span>
        <span class="hbtn-label" data-i18n="header.cart">Carrito</span>
        <span class="cart-count" id="cartCount">0</span>
      </button>
      <!-- Enlace a pedidos con badge del número de pedidos guardados -->
      <a class="hbtn" href="pedidos.html" id="ordersBtn"
         data-i18n-title="header.my_orders" title="Mis pedidos"
         style="position:relative;text-decoration:none">
        <span class="hbtn-icon">📦</span>
        <span class="hbtn-label" data-i18n="header.my_orders">Mis pedidos</span>
        <span class="orders-badge" id="ordersBadge"></span>
      </a>
    </div>
  </div>
</header>

<!-- Barra de navegación secundaria: categorías, configurador, ofertas y favoritos -->
<nav class="subnav">
  <div class="subnav-inner">
    <!-- Menú desplegable de categorías, relleno dinámicamente por renderCatsDropdown() -->
    <div class="subnav-cats">
      <button class="subnav-btn" onclick="toggleCatsDropdown()" id="catsBtn">
        <span class="snb-icon">☰</span>
        <span data-i18n="nav.all_categories">Todas las categorías</span>
        <span style="font-size:.7rem;margin-left:4px">▼</span>
      </button>
      <div class="cats-dropdown" id="catsDropdown"></div>
    </div>
    <!-- Accesos directos a las secciones principales de la tienda -->
    <a class="subnav-btn" href="configurador.html" id="configBtn">
      <span class="snb-icon">🔧</span><span data-i18n="nav.configure_pc">Configurar PC</span>
    </a>
    <a class="subnav-btn" href="ofertas.html" id="offersBtn">
      <span class="snb-icon">🔥</span><span data-i18n="nav.offers">Ofertas</span>
    </a>
    <!-- Botón de favoritos con badge del número de productos guardados -->
    <a class="subnav-btn" href="favoritos.html" id="favoritesBtn" style="position:relative">
      <span class="snb-icon">❤️</span><span data-i18n="nav.favorites">Favoritos</span>
      <span class="fav-badge" id="favBadge"></span>
    </a>
  </div>
</nav>`; // Cierra el template literal con todo el HTML del topbar, header y subnav
  }

  // Construye el HTML del footer, el drawer del carrito, el modal de login y el contenedor de toasts
  function buildFooter() { // Genera la cadena HTML con el footer de la tienda, el carrito lateral, el modal de autenticación y las notificaciones
    return `
<!-- Pie de página: logo, descripción de la tienda y aviso de derechos e IVA -->
<footer>
  <div class="footer-inner">
    <div class="footer-brand">
      <a class="logo" href="index.html">
        <div class="logo-icon">⚡</div>
        <div class="logo-text"><span>C-</span>Shop</div>
      </a>
      <p data-i18n="footer.desc">Tu tienda de referencia en tecnología. Componentes y periféricos al mejor precio con envío rápido y garantía oficial.</p>
    </div>
  </div>
  <!-- Franja inferior del footer con copyright y aviso de IVA incluido -->
  <div class="footer-bottom">
    <span data-i18n="footer.rights">© 2026 C-Shop. Todos los derechos reservados.</span>
    <span data-i18n="footer.vat">🇪🇺 IVA incluido en todos los precios</span>
  </div>
</footer>

<!-- Overlay oscuro de fondo para el drawer del carrito; cierra el panel al pulsarlo -->
<div class="cart-overlay" id="cartOverlay" onclick="closeCart()"></div>
<!-- Drawer lateral del carrito: cabecera, lista de artículos y total con botón de compra -->
<aside class="cart-drawer" id="cartDrawer"
       data-i18n-aria="cart.title" aria-label="Tu carrito">
  <div class="cart-header">
    <div class="cart-title" data-i18n="cart.title">🛒 Tu carrito</div>
    <button class="cart-close" onclick="closeCart()"
            data-i18n-aria="cart.close" aria-label="Cerrar carrito">✕</button>
  </div>
  <!-- Contenedor de artículos del carrito, relleno dinámicamente por renderCartItems() -->
  <div class="cart-items" id="cartItems"></div>
  <!-- Footer del drawer: precio total y botón para iniciar el proceso de compra -->
  <div class="cart-footer">
    <div class="cart-total-row">
      <span data-i18n="cart.total">Total</span>
      <span class="cart-total-price" id="cartTotal">0,00€</span>
    </div>
    <button class="cart-checkout" onclick="checkout()"
            data-i18n="cart.checkout">Finalizar compra</button>
  </div>
</aside>

<!-- Modal de autenticación: alterna entre formulario de login y registro -->
<div class="modal-overlay" id="loginModal">
  <div class="modal">
    <button class="modal-close" onclick="closeLogin()"
            data-i18n-aria="cart.close" aria-label="Cerrar">✕</button>
    <!-- Logo decorativo en la cabecera del modal -->
    <div class="modal-logo">
      <div class="logo-icon" style="margin:0 auto 10px">⚡</div>
    </div>
    <!-- Título y subtítulo del modal, actualizados por setModalMode() según login o registro -->
    <div class="modal-title" id="modalTitle" data-i18n="auth.login_title">Bienvenido de nuevo</div>
    <div class="modal-sub"   id="modalSub"   data-i18n="auth.login_sub">Inicia sesión en tu cuenta C-Shop</div>
    <!-- Campo de email: compartido por login y registro -->
    <div class="form-group">
      <label class="form-label" data-i18n="auth.email">Email</label>
      <input type="email" class="form-input"
             data-i18n-placeholder="auth.email_placeholder"
             placeholder="tu@email.com">
    </div>
    <!-- Campo de nombre: visible solo en modo registro, oculto en login -->
    <div class="form-group" id="registerName" style="display:none">
      <label class="form-label" data-i18n="auth.name">Nombre</label>
      <input type="text" class="form-input"
             data-i18n-placeholder="auth.name_placeholder"
             placeholder="Tu nombre completo">
    </div>
    <!-- Campo de contraseña con botón para alternar visibilidad -->
    <div class="form-group">
      <label class="form-label" data-i18n="auth.password">Contraseña</label>
      <div style="position:relative">
        <input type="password" class="form-input" placeholder="••••••••"
               id="passwordInput" style="padding-right:44px">
        <button type="button" onclick="togglePassword()" id="eyeBtn"
                data-i18n-title="auth.toggle_password"
                style="position:absolute;right:10px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:var(--text-dim);font-size:1.1rem;padding:6px;line-height:1;transition:color .2s"
                title="Mostrar/ocultar contraseña">👁️</button>
      </div>
    </div>
    <!-- Botón de acción principal: texto y comportamiento gestionados por handleLogin() -->
    <button class="modal-btn" id="modalActionBtn" onclick="handleLogin()"
            data-i18n="auth.sign_in_btn">Iniciar sesión</button>
    <!-- Enlace para cambiar entre los modos login y registro del modal -->
    <div class="modal-switch" id="modalSwitch">
      <span data-i18n="auth.no_account">¿No tienes cuenta?</span>
      <a onclick="switchModal('register')" data-i18n="auth.register_link">Regístrate</a>
    </div>
  </div>
</div>

<!-- Contenedor de notificaciones emergentes (toasts), gestionado por showToast() -->
<div class="toast-container" id="toastContainer"></div>`; // Cierra el template literal con footer, drawer, modal y contenedor de notificaciones
  }

  // Resalta el botón del subnav correspondiente a la página activa
  function markActiveSubnav() { // Añade la clase active al botón del subnav que coincide con la página actual
    const page = getCurrentPage(); // Obtiene el identificador de la página actual
    const map = { // Mapea cada identificador de página con el ID del botón del subnav que debe resaltarse
      configurador: 'configBtn', // Página del configurador de PC
      ofertas:      'offersBtn', // Página de ofertas
      favoritos:    'favoritesBtn', // Página de favoritos
      pedidos:      'ordersBtn', // Página de pedidos
    };
    const id = map[page]; // Obtiene el ID del botón del subnav correspondiente a la página actual
    if (id) document.getElementById(id)?.classList.add('active'); // Añade la clase active al botón del subnav si existe correspondencia
  }

  // Inyecta el header al inicio del body y el footer al final, y registra los listeners globales
  function inject() { // Inserta todos los bloques HTML de la interfaz en el DOM y enlaza los eventos de cierre y búsqueda
    const headerWrap = document.createElement('div'); // Crea un contenedor temporal para el HTML del header
    headerWrap.innerHTML = buildHeader(); // Parsea el HTML del topbar, header y subnav en el contenedor temporal
    document.body.insertBefore(headerWrap, document.body.firstChild); // Inserta el contenedor temporal al inicio del body
    while (headerWrap.firstChild) document.body.insertBefore(headerWrap.firstChild, headerWrap); // Mueve cada nodo hijo directamente al body preservando el orden
    headerWrap.remove(); // Elimina el contenedor temporal vacío del DOM

    const footerWrap = document.createElement('div'); // Crea un contenedor temporal para el HTML del footer
    footerWrap.innerHTML = buildFooter(); // Parsea el HTML del footer, drawer, modal y toasts en el contenedor temporal
    while (footerWrap.firstChild) document.body.appendChild(footerWrap.firstChild); // Añade cada nodo hijo al final del body

    markActiveSubnav(); // Resalta el botón del subnav correspondiente a la página activa

    document.addEventListener('click', e => { // Registra el listener global de clicks para cerrar paneles al pulsar fuera
      if (!e.target.closest('.search-wrap')) closeSearchDropdown(); // Cierra el dropdown de búsqueda al pulsar fuera del campo de búsqueda del header
      if (!e.target.closest('.subnav-cats')) closeCatsDropdown(); // Cierra el dropdown de categorías al pulsar fuera del botón del subnav
    });

    const searchInput = document.getElementById('searchInput'); // Obtiene el campo de búsqueda del header
    if (searchInput) { // Comprueba que el campo de búsqueda existe en el DOM
      searchInput.addEventListener('input', handleSearchInput); // Enlaza el listener de escritura para mostrar sugerencias en el dropdown de búsqueda
    }

    document.getElementById('loginModal')?.addEventListener('click', function (e) { // Registra el listener del overlay del modal de login
      if (e.target === this) closeLogin(); // Cierra el modal de login al pulsar directamente sobre el overlay
    });

    document.addEventListener('keydown', e => { // Registra el listener global de teclado para cerrar paneles con Escape
      if (e.key === 'Escape') { // Comprueba si la tecla pulsada es Escape
        closeCart(); // Cierra el drawer lateral del carrito
        closeLogin(); // Cierra el modal de login
        closeSearchDropdown(); // Cierra el dropdown de resultados de búsqueda del header
      }
    });
  }

  // Orquesta la inyección del layout y la inicialización de todos los componentes de la interfaz
  function init() { // Inyecta el HTML y actualiza carrito, sesión, favoritos, pedidos, categorías e idioma
    inject(); // Inserta el header, subnav, footer, drawer y modal en el DOM
    if (typeof updateCartUI      === 'function') updateCartUI(); // Actualiza el contador de artículos en el icono del carrito del header
    if (typeof updateLoginArea   === 'function') updateLoginArea(); // Muestra el nombre del usuario o el botón de login en el header
    if (typeof updateFavoritesUI === 'function') updateFavoritesUI(); // Actualiza el badge de favoritos en el subnav
    if (typeof updateOrdersUI    === 'function') updateOrdersUI(); // Actualiza el badge de pedidos en el header
    if (typeof renderCatsDropdown=== 'function') renderCatsDropdown(); // Rellena el dropdown de categorías del subnav con las 16 categorías
    if (typeof applyLangToHeader === 'function') applyLangToHeader(); // Actualiza la bandera y la etiqueta del idioma activo en el header
    if (typeof applyI18n         === 'function') applyI18n(); // Aplica las traducciones iniciales a todos los elementos data-i18n del DOM inyectado
  }

  // Ejecuta el layout en el momento adecuado según el estado de carga del DOM
  if (document.readyState === 'loading') { // Comprueba si el DOM todavía no ha terminado de cargarse
    document.addEventListener('DOMContentLoaded', init); // Espera al evento DOMContentLoaded para inyectar el layout
  } else { // El DOM ya está disponible; el script se cargó en diferido o tras el cierre de body
    init(); // Inyecta el layout inmediatamente sin esperar ningún evento
  }

  window.getCurrentPage = getCurrentPage; // Expone getCurrentPage globalmente para que otros módulos identifiquen la página activa
})();
