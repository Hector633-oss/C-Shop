// Diccionario de traducciones español/inglés de toda la interfaz de C-Shop
const i18n = { // Define el objeto principal de internacionalización de la tienda

  // Bloque de traducciones en español de toda la interfaz de la tienda
  es: { // Abre el objeto con todas las traducciones en español

    //Textos de la barra de navegación lateral/superior de la tienda
    'nav.back':           '← Volver', // Texto del botón "Volver" en la barra de navegación
    'nav.all_categories': 'Todas las categorías', // Texto del enlace que muestra todas las categorías en el submenú
    'nav.configure_pc':   'Configurar PC', // Texto del enlace al configurador de PC en la navegación
    'nav.offers':         'Ofertas', // Texto del enlace a la página de ofertas en la navegación
    'nav.favorites':      'Favoritos', // Texto del enlace a la página de favoritos en la navegación
    'nav.my_orders':      'Mis pedidos', // Texto del enlace a la página de pedidos en la navegación
    'nav.change_lang':    'Cambiar idioma', // Texto del botón para cambiar el idioma en la navegación

    //Textos de la barra superior (topbar) con información de envío y pago
    'topbar.free_shipping': 'Envío GRATIS', // Texto del aviso de envío gratuito en la topbar
    'topbar.over':          'en pedidos superiores a', // Texto complementario al precio mínimo de envío gratis en la topbar
    'topbar.stock':         'Stock inmediato', // Texto del aviso de disponibilidad inmediata en la topbar
    'topbar.secure':        'Pago 100% seguro', // Texto del aviso de pago seguro en la topbar

    //Textos del encabezado principal de la tienda (header)
    'header.search_placeholder': 'Busca productos, marcas, categorías…', // Placeholder del campo de búsqueda en el header
    'header.sign_in':            'Iniciar sesión', // Texto del botón de inicio de sesión en el header
    'header.cart':               'Carrito', // Texto del botón del carrito en el header
    'header.my_orders':          'Mis pedidos', // Texto del enlace a pedidos en el menú de usuario del header

    //Textos del panel lateral del carrito de compra
    'cart.title':    '🛒 Tu carrito', // Título del panel lateral del carrito de compra
    'cart.empty':    'Tu carrito está vacío', // Mensaje que aparece en el carrito cuando no hay productos
    'cart.total':    'Total', // Etiqueta del precio total en el panel del carrito
    'cart.checkout': 'Finalizar compra', // Texto del botón para proceder al pago en el carrito
    'cart.close':    'Cerrar carrito', // Texto del botón para cerrar el panel lateral del carrito

    //Textos del modal de inicio de sesión y registro de usuario
    'auth.login_title':    'Bienvenido de nuevo', // Título del modal cuando el usuario va a iniciar sesión
    'auth.login_sub':      'Inicia sesión en tu cuenta C-Shop', // Subtítulo del modal de inicio de sesión
    'auth.register_title': 'Crear cuenta', // Título del modal cuando el usuario va a registrarse
    'auth.register_sub':   'Únete a C-Shop gratis', // Subtítulo del modal de registro de nuevo usuario
    'auth.email':          'Email', // Etiqueta del campo de email en el modal de autenticación
    'auth.name':           'Nombre', // Etiqueta del campo de nombre en el modal de registro
    'auth.password':       'Contraseña', // Etiqueta del campo de contraseña en el modal de autenticación
    'auth.sign_in_btn':    'Iniciar sesión', // Texto del botón de envío del formulario de inicio de sesión
    'auth.register_btn':   'Regístrate', // Texto del botón de envío del formulario de registro
    'auth.no_account':     '¿No tienes cuenta?', // Texto del enlace para cambiar al formulario de registro
    'auth.have_account':   '¿Ya tienes cuenta?', // Texto del enlace para cambiar al formulario de inicio de sesión
    'auth.sign_in_link':   'Inicia sesión', // Texto del enlace que abre el formulario de inicio de sesión
    'auth.register_link':  'Regístrate', // Texto del enlace que abre el formulario de registro
    'auth.creating':       'Creando cuenta…', // Texto del botón mientras se procesa el registro del usuario
    'auth.signing_in':     'Entrando…', // Texto del botón mientras se procesa el inicio de sesión
    'auth.show_password':  'Mostrar contraseña', // Texto del tooltip del botón para mostrar la contraseña en el modal
    'auth.hide_password':  'Ocultar contraseña', // Texto del tooltip del botón para ocultar la contraseña en el modal
    'auth.toggle_password':'Mostrar/ocultar contraseña', // Texto alternativo del botón de visibilidad de contraseña en el modal
    'auth.invalid_fields': 'Email válido y contraseña de al menos 6 caracteres', // Mensaje de validación del formulario de autenticación
    'auth.email_placeholder': 'tu@email.com', // Placeholder del campo de email en el modal de autenticación
    'auth.name_placeholder':  'Tu nombre completo', // Placeholder del campo de nombre en el modal de registro

    //Mensajes de error de Firebase Authentication traducidos para el modal de login
    'auth.err.user-not-found':         'No existe ninguna cuenta con ese email.', // Error del modal cuando el email no está registrado en Firebase
    'auth.err.wrong-password':         'Contraseña incorrecta.', // Error del modal cuando la contraseña introducida no es correcta
    'auth.err.invalid-credential':     'Email o contraseña incorrectos.', // Error del modal cuando las credenciales introducidas son inválidas
    'auth.err.email-already-in-use':   'Ese email ya está registrado.', // Error del modal cuando el email ya existe en Firebase al registrarse
    'auth.err.weak-password':          'La contraseña debe tener al menos 6 caracteres.', // Error del modal cuando la contraseña es demasiado corta
    'auth.err.invalid-email':          'El formato del email no es válido.', // Error del modal cuando el formato del email es incorrecto
    'auth.err.too-many-requests':      'Demasiados intentos. Espera unos minutos.', // Error del modal cuando Firebase bloquea por exceso de intentos
    'auth.err.network-request-failed': 'Error de conexión. Comprueba tu internet.', // Error del modal cuando falla la conexión con Firebase
    'auth.err.operation-not-allowed':  'El inicio de sesión con email no está activado.', // Error del modal cuando el método de login está deshabilitado en Firebase
    'auth.err.default':                'Ha ocurrido un error. Inténtalo de nuevo.', // Error genérico del modal para cualquier error de Firebase no contemplado

    //Textos de las notificaciones emergentes (toasts) de la tienda
    'toast.added_cart':       'añadido al carrito', // Texto del toast al añadir un producto al carrito
    'toast.added_favorites':  'añadido a favoritos', // Texto del toast al añadir un producto a favoritos
    'toast.removed_favorites':'Eliminado de favoritos', // Texto del toast al eliminar un producto de favoritos
    'toast.cart_empty':       'Tu carrito está vacío', // Texto del toast al intentar finalizar compra con el carrito vacío
    'toast.login_required':   'Inicia sesión para finalizar tu compra', // Texto del toast cuando se intenta comprar sin estar autenticado
    'toast.logout':           'Sesión cerrada', // Texto del toast al cerrar sesión correctamente
    'toast.welcome':          '¡Bienvenido, {name}!', // Texto del toast de bienvenida al registrarse, con nombre de usuario interpolado
    'toast.welcome_back':     '¡Bienvenido de nuevo!', // Texto del toast de bienvenida al iniciar sesión
    'toast.config_added':     'Configuración añadida al carrito', // Texto del toast al añadir toda la configuración del configurador al carrito
    'toast.order_no_items':   'Ningún producto de este pedido está disponible', // Texto del toast al intentar repetir un pedido cuyos productos ya no existen
    'toast.lang_changed':     '🇪🇸 Idioma cambiado a Español', // Texto del toast al cambiar el idioma de la tienda a español

    //Textos de las tarjetas de producto en los listados de la tienda
    'product.add_to_favorites': 'Añadir a favoritos', // Tooltip del botón de corazón para guardar un producto en favoritos
    'product.add_to_cart':      'Añadir al carrito', // Texto del botón para añadir el producto al carrito en la tarjeta
    'product.badge_top':        'TOP', // Texto de la etiqueta destacada que aparece sobre los productos más valorados
    'product.badge_offer':      'OFERTA', // Texto de la etiqueta que aparece sobre los productos en oferta

    //Textos de la página y barra de búsqueda de productos
    'search.no_results':        'No se encontraron resultados para', // Mensaje en la página de búsqueda cuando no hay resultados para el término buscado
    'search.no_results_filter': 'No se encontraron productos con estos filtros', // Mensaje en la página de búsqueda cuando los filtros aplicados no devuelven resultados
    'search.type_something':    'Escribe algo en la barra de búsqueda', // Mensaje en la página de búsqueda cuando el campo está vacío
    'search.see_all_prefix':    'Ver los', // Primera parte del enlace "Ver los X resultados" en el desplegable de búsqueda
    'search.see_all_suffix':    'resultados →', // Segunda parte del enlace "Ver los X resultados" en el desplegable de búsqueda
    'search.title':             '🔍 Búsqueda', // Título de la página de resultados de búsqueda

    //Textos de los controles de filtrado y ordenación de productos
    'filter.sort':            'Ordenar:', // Etiqueta del selector de ordenación en los listados de producto
    'filter.price':           'Precio:', // Etiqueta del filtro de rango de precio en los listados de producto
    'filter.filter':          'Filtrar:', // Etiqueta general de la sección de filtros en los listados de producto
    'filter.type':            'Tipo:', // Etiqueta del selector de tipo de componente en los filtros
    'filter.name_placeholder':'Filtrar por nombre…', // Placeholder del campo de búsqueda por nombre en los filtros
    'filter.offers_placeholder':'Buscar en ofertas…', // Placeholder del campo de búsqueda en la página de ofertas
    'filter.default':         'Por defecto', // Opción de ordenación por defecto en el selector de ordenación
    'filter.price_asc':       'Precio ↑', // Opción de ordenación por precio ascendente en el selector
    'filter.price_desc':      'Precio ↓', // Opción de ordenación por precio descendente en el selector
    'filter.name_az':         'Nombre A-Z', // Opción de ordenación alfabética ascendente en el selector
    'filter.name_za':         'Nombre Z-A', // Opción de ordenación alfabética descendente en el selector
    'filter.best_rated':      'Mejor valorado', // Opción de ordenación por valoración media en el selector
    'filter.most_discount':   'Mayor descuento', // Opción de ordenación por mayor porcentaje de descuento en el selector
    'filter.all_categories':  'Todas las categorías', // Opción por defecto del filtro de categoría que muestra todos los productos
    'filter.all_components':  'Todos los componentes', // Opción por defecto del filtro de tipo de componente
    'filter.processors':      '🔲 Procesadores', // Opción del filtro de tipo para mostrar solo procesadores
    'filter.graphics':        '🎮 Tarjetas Gráficas', // Opción del filtro de tipo para mostrar solo tarjetas gráficas
    'filter.ram':             '💾 Memorias RAM', // Opción del filtro de tipo para mostrar solo memorias RAM
    'filter.storage':         '💿 Almacenamiento', // Opción del filtro de tipo para mostrar solo dispositivos de almacenamiento
    'filter.motherboards':    '🖥 Placas Base', // Opción del filtro de tipo para mostrar solo placas base
    'filter.cooling':         '𖣘 Refrigeración', // Opción del filtro de tipo para mostrar solo sistemas de refrigeración
    'filter.network_cards':   '🛜 Tarjetas de red', // Opción del filtro de tipo para mostrar solo tarjetas de red
    'filter.sound_cards':     '🔊 Tarjetas de sonido', // Opción del filtro de tipo para mostrar solo tarjetas de sonido
    'filter.psus':            '⚡ Fuentes de Alimentación', // Opción del filtro de tipo para mostrar solo fuentes de alimentación
    'filter.cases':           '🗄 Cajas/Torres', // Opción del filtro de tipo para mostrar solo cajas y torres de PC

    //Texto del contador de resultados que aparece sobre el listado de productos
    'count.products_found': 'productos encontrados', // Texto que acompaña al número de productos en el contador de resultados

    //Textos de la página de detalle de un producto individual
    'detail.iva':       'IVA incluido · Envío gratuito', // Texto informativo sobre impuestos y envío bajo el precio en la página de detalle
    'detail.add_cart':  '🛒 Añadir al carrito', // Texto del botón principal para añadir el producto al carrito en la página de detalle
    'detail.specs':     '📋 Especificaciones', // Título de la sección de especificaciones técnicas en la página de detalle
    'detail.not_found': 'Producto no encontrado.', // Mensaje de error cuando el producto solicitado no existe en la base de datos
    'detail.go_home':   'Volver al inicio', // Texto del enlace para volver a la home cuando el producto no se encuentra

    //Textos de la página de listado de una categoría de productos
    'category.not_found':  'Categoría no encontrada', // Título de error cuando la categoría solicitada no existe
    'category.not_exists': 'Esta categoría no existe.', // Mensaje descriptivo de error cuando la categoría no existe
    'category.go_home':    'Volver al inicio', // Texto del enlace para volver a la home desde una categoría no encontrada

    //Textos de la página de favoritos del usuario
    'favorites.title':         '❤️ Favoritos', // Título principal de la página de favoritos
    'favorites.empty_title':   'Aún no tienes productos favoritos', // Título del estado vacío de la página de favoritos
    'favorites.empty_hint':    'Pulsa el ♥ en cualquier producto para guardarlo aquí', // Instrucción que aparece en el estado vacío de favoritos
    'favorites.clear_all':     'Vaciar favoritos', // Texto del botón para eliminar todos los favoritos de la página de favoritos
    'favorites.confirm_clear': '¿Vaciar todos los favoritos? Esta acción no se puede deshacer.', // Mensaje del diálogo de confirmación al vaciar favoritos
    'favorites.cleared_toast': '🗑️ Favoritos vaciados', // Texto del toast tras vaciar todos los favoritos correctamente

    //Textos de la página de historial de pedidos del usuario
    'orders.title':           '📦 Mis pedidos', // Título principal de la página de historial de pedidos
    'orders.clear_history':   'Vaciar historial', // Texto del botón para eliminar todo el historial de pedidos
    'orders.empty_title':     'Aún no has hecho ningún pedido', // Título del estado vacío de la página de pedidos
    'orders.empty_sub':       'Cuando finalices una compra, aparecerá aquí tu historial.', // Descripción del estado vacío de la página de pedidos
    'orders.start_shopping':  'Empezar a comprar', // Texto del enlace a la home desde el estado vacío de pedidos
    'orders.one_order':       'pedido', // Texto singular para el contador de pedidos del usuario
    'orders.many_orders':     'pedidos', // Texto plural para el contador de pedidos del usuario
    'orders.one_item':        'artículo', // Texto singular para el contador de artículos de un pedido
    'orders.many_items':      'artículos', // Texto plural para el contador de artículos de un pedido
    'orders.item_short':      'art.', // Abreviatura singular de artículo usada en los resúmenes compactos de pedido
    'orders.items_short':     'arts.', // Abreviatura plural de artículos usada en los resúmenes compactos de pedido
    'orders.spent':           'gastado', // Etiqueta de la cantidad total gastada en el resumen de pedidos del usuario
    'orders.status_confirmed':'confirmado', // Texto de la etiqueta de estado de un pedido ya procesado
    'orders.no_items':        'Sin artículos registrados', // Mensaje cuando un pedido guardado no tiene artículos asociados
    'orders.reorder':         '🛒 Volver a pedir', // Texto del botón para repetir un pedido anterior
    'orders.delete':          '🗑️ Eliminar pedido', // Texto del botón para eliminar un pedido individual del historial
    'orders.confirm_delete':  '¿Eliminar este pedido del historial? Esta acción no se puede deshacer.', // Mensaje del diálogo de confirmación al eliminar un pedido
    'orders.confirm_clear':   '¿Borrar TODO el historial de pedidos? Esta acción no se puede deshacer.', // Mensaje del diálogo de confirmación al vaciar todo el historial
    'orders.deleted_toast':   '🗑️ Pedido eliminado', // Texto del toast tras eliminar un pedido correctamente
    'orders.cleared_toast':   '🗑️ Historial vaciado', // Texto del toast tras vaciar todo el historial de pedidos
    'orders.total_paid':      'Total pagado', // Etiqueta del importe total en el resumen de un pedido confirmado
    'orders.order_number':    'Número de pedido', // Etiqueta del identificador único en el resumen de un pedido confirmado
    'orders.thank_you':       'Gracias por tu compra', // Mensaje de agradecimiento en el modal de confirmación de pedido
    'orders.confirmed_title': '¡Pedido confirmado!', // Título del modal que aparece al finalizar una compra con éxito
    'orders.saved_locally':   'Tu pedido se ha guardado localmente. Total registrado:', // Mensaje informativo en el modal de confirmación de pedido
    'orders.accept':          'Aceptar', // Texto del botón para cerrar el modal de confirmación de pedido
    'orders.toast_confirmed': 'confirmado', // Texto que acompaña al número de pedido en el toast de confirmación de compra

    //Textos de la página del configurador de PC por componentes
    'config.title':       '🔧 Configurar PC', // Título principal de la página del configurador de PC
    'config.subtitle':    'Selecciona los componentes para tu PC ideal. Verás compatibilidad y total en tiempo real.', // Subtítulo descriptivo de la página del configurador de PC
    'config.your_config': '🛒 Tu configuración', // Título del panel lateral que muestra los componentes seleccionados en el configurador
    'config.empty':       'Ningún componente seleccionado', // Mensaje del panel lateral del configurador cuando no hay ningún componente elegido
    'config.total':       'Total', // Etiqueta del precio total acumulado en el panel lateral del configurador
    'config.compat':      '✅ Configuración compatible', // Mensaje de validación en el panel del configurador cuando los componentes son compatibles
    'config.add_all':     'Añadir todo al carrito', // Texto del botón para añadir todos los componentes seleccionados al carrito
    'config.not_selected':'Sin seleccionar', // Texto que aparece en una ranura vacía del configurador cuando no se ha elegido componente
    'config.no_products': 'Sin productos en esta categoría aún', // Mensaje en el configurador cuando una categoría no tiene productos en la base de datos

    //Etiquetas de cada ranura de componente en el configurador de PC
    'config.part.cpu':          'CPU / Procesador', // Etiqueta de la ranura de procesador en el configurador de PC
    'config.part.gpu':          'Tarjeta Gráfica', // Etiqueta de la ranura de tarjeta gráfica en el configurador de PC
    'config.part.cooler':       'Refrigeración', // Etiqueta de la ranura de sistema de refrigeración en el configurador de PC
    'config.part.ram':          'Memoria RAM', // Etiqueta de la ranura de memoria RAM en el configurador de PC
    'config.part.ssd':          'Almacenamiento SSD', // Etiqueta de la ranura de almacenamiento SSD en el configurador de PC
    'config.part.mb':           'Placa Base', // Etiqueta de la ranura de placa base en el configurador de PC
    'config.part.network_card': 'Tarjeta de red', // Etiqueta de la ranura de tarjeta de red en el configurador de PC
    'config.part.sound_card':   'Tarjeta de sonido', // Etiqueta de la ranura de tarjeta de sonido en el configurador de PC
    'config.part.psu':          'Fuente de Alimentación', // Etiqueta de la ranura de fuente de alimentación en el configurador de PC
    'config.part.case':         'Caja/Torre', // Etiqueta de la ranura de caja o torre en el configurador de PC
    'config.part.monitor':      'Monitor', // Etiqueta de la ranura de monitor en el configurador de PC
    'config.part.keyboard':     'Teclado', // Etiqueta de la ranura de teclado en el configurador de PC
    'config.part.mouse':        'Ratón', // Etiqueta de la ranura de ratón en el configurador de PC
    'config.part.headphones':   'Auriculares', // Etiqueta de la ranura de auriculares en el configurador de PC

    //Textos de la página de productos en oferta
    'offers.title':      '🔥 Ofertas', // Título principal de la página de productos en oferta
    'offers.no_results': 'No hay ofertas que coincidan', // Mensaje en la página de ofertas cuando ninguna oferta coincide con el filtro

    //Textos de la página de inicio (home) de la tienda
    'home.hero_badge':   '✨ Tecnología de última generación', // Texto de la etiqueta badge sobre el titular principal de la sección hero de la home
    'home.hero_h1':      'Construye tu <span class="hl">mundo digital</span>', // Titular principal de la sección hero de la home con texto resaltado mediante span
    'home.hero_desc':    'Encuentra los mejores componentes, periféricos y dispositivos al mejor precio. Calidad garantizada y envío rápido.', // Descripción de la sección hero de la home
    'home.explore':      'Explorar categorías →', // Texto del botón principal de la sección hero que lleva a las categorías
    'home.see_offers':   'Ver ofertas', // Texto del botón secundario de la sección hero que lleva a las ofertas
    'home.quick_title':  '⚡ Accesos rápidos', // Título de la sección de accesos rápidos de la home
    'home.offers_title': 'Ofertas', // Título de la tarjeta de acceso rápido a ofertas en la home
    'home.offers_sub':   'Hasta -60% en productos seleccionados', // Subtítulo de la tarjeta de acceso rápido a ofertas en la home
    'home.config_title': 'Configurar PC', // Título de la tarjeta de acceso rápido al configurador en la home
    'home.config_sub':   'Arma tu PC ideal pieza a pieza', // Subtítulo de la tarjeta de acceso rápido al configurador en la home
    'home.fav_title':    'Mis favoritos', // Título de la tarjeta de acceso rápido a favoritos en la home
    'home.fav_sub':      'Tu lista personal de productos guardados', // Subtítulo de la tarjeta de acceso rápido a favoritos en la home
    'home.cats_title':   '🗂️ Explora por categoría', // Título de la sección de navegación por categorías de la home

    //Textos del pie de página (footer) de la tienda
    'footer.desc':   'Tu tienda de referencia en tecnología. Componentes y periféricos al mejor precio con envío rápido y garantía oficial.', // Descripción de la tienda en el bloque de texto del footer
    'footer.rights': '© 2026 C-Shop. Todos los derechos reservados.', // Texto de copyright en la parte inferior del footer
    'footer.vat':    '🇪🇺 IVA incluido en todos los precios', // Aviso legal sobre el IVA incluido en los precios del footer

    //Títulos de pestaña del navegador para cada página de la tienda
    'page.home_title':    'C-Shop · Tu tienda de tecnología', // Título de la pestaña del navegador en la página de inicio
    'page.home_desc':     'C-Shop — Tu tienda de tecnología. Componentes, periféricos y dispositivos al mejor precio.', // Metadescripción de la página de inicio usada por JS
    'page.offers_title':  'Ofertas · C-Shop', // Título de la pestaña del navegador en la página de ofertas
    'page.search_title':  'Búsqueda · C-Shop', // Título de la pestaña del navegador en la página de búsqueda
    'page.fav_title':     'Favoritos · C-Shop', // Título de la pestaña del navegador en la página de favoritos
    'page.orders_title':  'Mis pedidos · C-Shop', // Título de la pestaña del navegador en la página de pedidos
    'page.config_title':  'Configurar PC · C-Shop', // Título de la pestaña del navegador en la página del configurador de PC
  },

  // Bloque de traducciones en inglés de toda la interfaz de la tienda
  en: { // Abre el objeto con todas las traducciones en inglés

    //Textos de la barra de navegación lateral/superior de la tienda en inglés
    'nav.back':           '← Back', // Texto del botón "Back" en la barra de navegación en inglés
    'nav.all_categories': 'All categories', // Texto del enlace que muestra todas las categorías en el submenú en inglés
    'nav.configure_pc':   'Build PC', // Texto del enlace al configurador de PC en la navegación en inglés
    'nav.offers':         'Deals', // Texto del enlace a la página de ofertas en la navegación en inglés
    'nav.favorites':      'Favorites', // Texto del enlace a la página de favoritos en la navegación en inglés
    'nav.my_orders':      'My orders', // Texto del enlace a la página de pedidos en la navegación en inglés
    'nav.change_lang':    'Change language', // Texto del botón para cambiar el idioma en la navegación en inglés

    //Textos de la barra superior (topbar) con información de envío y pago en inglés
    'topbar.free_shipping': 'FREE Shipping', // Texto del aviso de envío gratuito en la topbar en inglés
    'topbar.over':          'on orders over', // Texto complementario al precio mínimo de envío gratis en la topbar en inglés
    'topbar.stock':         'Immediate stock', // Texto del aviso de disponibilidad inmediata en la topbar en inglés
    'topbar.secure':        '100% secure payment', // Texto del aviso de pago seguro en la topbar en inglés

    //Textos del encabezado principal de la tienda (header) en inglés
    'header.search_placeholder': 'Search products, brands, categories…', // Placeholder del campo de búsqueda en el header en inglés
    'header.sign_in':            'Sign in', // Texto del botón de inicio de sesión en el header en inglés
    'header.cart':               'Cart', // Texto del botón del carrito en el header en inglés
    'header.my_orders':          'My orders', // Texto del enlace a pedidos en el menú de usuario del header en inglés

    //Textos del panel lateral del carrito de compra en inglés
    'cart.title':    '🛒 Your cart', // Título del panel lateral del carrito de compra en inglés
    'cart.empty':    'Your cart is empty', // Mensaje que aparece en el carrito cuando no hay productos en inglés
    'cart.total':    'Total', // Etiqueta del precio total en el panel del carrito en inglés
    'cart.checkout': 'Checkout', // Texto del botón para proceder al pago en el carrito en inglés
    'cart.close':    'Close cart', // Texto del botón para cerrar el panel lateral del carrito en inglés

    //Textos del modal de inicio de sesión y registro de usuario en inglés
    'auth.login_title':    'Welcome back', // Título del modal cuando el usuario va a iniciar sesión en inglés
    'auth.login_sub':      'Sign in to your C-Shop account', // Subtítulo del modal de inicio de sesión en inglés
    'auth.register_title': 'Create account', // Título del modal cuando el usuario va a registrarse en inglés
    'auth.register_sub':   'Join C-Shop for free', // Subtítulo del modal de registro de nuevo usuario en inglés
    'auth.email':          'Email', // Etiqueta del campo de email en el modal de autenticación en inglés
    'auth.name':           'Name', // Etiqueta del campo de nombre en el modal de registro en inglés
    'auth.password':       'Password', // Etiqueta del campo de contraseña en el modal de autenticación en inglés
    'auth.sign_in_btn':    'Sign in', // Texto del botón de envío del formulario de inicio de sesión en inglés
    'auth.register_btn':   'Register', // Texto del botón de envío del formulario de registro en inglés
    'auth.no_account':     "Don't have an account?", // Texto del enlace para cambiar al formulario de registro en inglés
    'auth.have_account':   'Already have an account?', // Texto del enlace para cambiar al formulario de inicio de sesión en inglés
    'auth.sign_in_link':   'Sign in', // Texto del enlace que abre el formulario de inicio de sesión en inglés
    'auth.register_link':  'Register', // Texto del enlace que abre el formulario de registro en inglés
    'auth.creating':       'Creating account…', // Texto del botón mientras se procesa el registro del usuario en inglés
    'auth.signing_in':     'Signing in…', // Texto del botón mientras se procesa el inicio de sesión en inglés
    'auth.show_password':  'Show password', // Texto del tooltip del botón para mostrar la contraseña en el modal en inglés
    'auth.hide_password':  'Hide password', // Texto del tooltip del botón para ocultar la contraseña en el modal en inglés
    'auth.toggle_password':'Show/hide password', // Texto alternativo del botón de visibilidad de contraseña en el modal en inglés
    'auth.invalid_fields': 'Valid email and password of at least 6 characters required', // Mensaje de validación del formulario de autenticación en inglés
    'auth.email_placeholder': 'your@email.com', // Placeholder del campo de email en el modal de autenticación en inglés
    'auth.name_placeholder':  'Your full name', // Placeholder del campo de nombre en el modal de registro en inglés

    //Mensajes de error de Firebase Authentication traducidos para el modal de login en inglés
    'auth.err.user-not-found':         'No account found with that email.', // Error del modal cuando el email no está registrado en Firebase (inglés)
    'auth.err.wrong-password':         'Incorrect password.', // Error del modal cuando la contraseña introducida no es correcta (inglés)
    'auth.err.invalid-credential':     'Incorrect email or password.', // Error del modal cuando las credenciales introducidas son inválidas (inglés)
    'auth.err.email-already-in-use':   'That email is already registered.', // Error del modal cuando el email ya existe en Firebase al registrarse (inglés)
    'auth.err.weak-password':          'Password must be at least 6 characters.', // Error del modal cuando la contraseña es demasiado corta (inglés)
    'auth.err.invalid-email':          'Invalid email format.', // Error del modal cuando el formato del email es incorrecto (inglés)
    'auth.err.too-many-requests':      'Too many attempts. Please wait a few minutes.', // Error del modal cuando Firebase bloquea por exceso de intentos (inglés)
    'auth.err.network-request-failed': 'Connection error. Check your internet.', // Error del modal cuando falla la conexión con Firebase (inglés)
    'auth.err.operation-not-allowed':  'Email sign-in is not enabled.', // Error del modal cuando el método de login está deshabilitado en Firebase (inglés)
    'auth.err.default':                'An error occurred. Please try again.', // Error genérico del modal para cualquier error de Firebase no contemplado (inglés)

    //Textos de las notificaciones emergentes (toasts) de la tienda en inglés
    'toast.added_cart':       'added to cart', // Texto del toast al añadir un producto al carrito en inglés
    'toast.added_favorites':  'added to favorites', // Texto del toast al añadir un producto a favoritos en inglés
    'toast.removed_favorites':'Removed from favorites', // Texto del toast al eliminar un producto de favoritos en inglés
    'toast.cart_empty':       'Your cart is empty', // Texto del toast al intentar finalizar compra con el carrito vacío en inglés
    'toast.login_required':   'Please sign in to complete your purchase', // Texto del toast cuando se intenta comprar sin estar autenticado en inglés
    'toast.logout':           'Signed out', // Texto del toast al cerrar sesión correctamente en inglés
    'toast.welcome':          'Welcome, {name}!', // Texto del toast de bienvenida al registrarse, con nombre de usuario interpolado (inglés)
    'toast.welcome_back':     'Welcome back!', // Texto del toast de bienvenida al iniciar sesión en inglés
    'toast.config_added':     'Configuration added to cart', // Texto del toast al añadir toda la configuración del configurador al carrito en inglés
    'toast.order_no_items':   'No products from this order are available anymore', // Texto del toast al intentar repetir un pedido cuyos productos ya no existen (inglés)
    'toast.lang_changed':     '🇬🇧 Language changed to English', // Texto del toast al cambiar el idioma de la tienda a inglés

    //Textos de las tarjetas de producto en los listados de la tienda en inglés
    'product.add_to_favorites': 'Add to favorites', // Tooltip del botón de corazón para guardar un producto en favoritos en inglés
    'product.add_to_cart':      'Add to cart', // Texto del botón para añadir el producto al carrito en la tarjeta en inglés
    'product.badge_top':        'TOP', // Texto de la etiqueta destacada que aparece sobre los productos más valorados en inglés
    'product.badge_offer':      'SALE', // Texto de la etiqueta que aparece sobre los productos en oferta en inglés

    //Textos de la página y barra de búsqueda de productos en inglés
    'search.no_results':        'No results found for', // Mensaje en la página de búsqueda cuando no hay resultados para el término buscado (inglés)
    'search.no_results_filter': 'No products found with these filters', // Mensaje en la página de búsqueda cuando los filtros aplicados no devuelven resultados (inglés)
    'search.type_something':    'Type something in the search bar', // Mensaje en la página de búsqueda cuando el campo está vacío en inglés
    'search.see_all_prefix':    'See all', // Primera parte del enlace "See all X results" en el desplegable de búsqueda en inglés
    'search.see_all_suffix':    'results →', // Segunda parte del enlace "See all X results" en el desplegable de búsqueda en inglés
    'search.title':             '🔍 Search', // Título de la página de resultados de búsqueda en inglés

    //Textos de los controles de filtrado y ordenación de productos en inglés
    'filter.sort':             'Sort by:', // Etiqueta del selector de ordenación en los listados de producto en inglés
    'filter.price':            'Price:', // Etiqueta del filtro de rango de precio en los listados de producto en inglés
    'filter.filter':           'Filter:', // Etiqueta general de la sección de filtros en los listados de producto en inglés
    'filter.type':             'Type:', // Etiqueta del selector de tipo de componente en los filtros en inglés
    'filter.name_placeholder': 'Filter by name…', // Placeholder del campo de búsqueda por nombre en los filtros en inglés
    'filter.offers_placeholder':'Search deals…', // Placeholder del campo de búsqueda en la página de ofertas en inglés
    'filter.default':          'Default', // Opción de ordenación por defecto en el selector de ordenación en inglés
    'filter.price_asc':        'Price ↑', // Opción de ordenación por precio ascendente en el selector en inglés
    'filter.price_desc':       'Price ↓', // Opción de ordenación por precio descendente en el selector en inglés
    'filter.name_az':          'Name A-Z', // Opción de ordenación alfabética ascendente en el selector en inglés
    'filter.name_za':          'Name Z-A', // Opción de ordenación alfabética descendente en el selector en inglés
    'filter.best_rated':       'Best rated', // Opción de ordenación por valoración media en el selector en inglés
    'filter.most_discount':    'Highest discount', // Opción de ordenación por mayor porcentaje de descuento en el selector en inglés
    'filter.all_categories':   'All categories', // Opción por defecto del filtro de categoría que muestra todos los productos en inglés
    'filter.all_components':   'All components', // Opción por defecto del filtro de tipo de componente en inglés
    'filter.processors':       '🔲 Processors', // Opción del filtro de tipo para mostrar solo procesadores en inglés
    'filter.graphics':         '🎮 Graphics cards', // Opción del filtro de tipo para mostrar solo tarjetas gráficas en inglés
    'filter.ram':              '💾 RAM Memory', // Opción del filtro de tipo para mostrar solo memorias RAM en inglés
    'filter.storage':          '💿 Storage', // Opción del filtro de tipo para mostrar solo dispositivos de almacenamiento en inglés
    'filter.motherboards':     '🖥 Motherboards', // Opción del filtro de tipo para mostrar solo placas base en inglés
    'filter.cooling':          '𖣘 Cooling', // Opción del filtro de tipo para mostrar solo sistemas de refrigeración en inglés
    'filter.network_cards':    '🛜 Network cards', // Opción del filtro de tipo para mostrar solo tarjetas de red en inglés
    'filter.sound_cards':      '🔊 Sound cards', // Opción del filtro de tipo para mostrar solo tarjetas de sonido en inglés
    'filter.psus':             '⚡ Power supplies', // Opción del filtro de tipo para mostrar solo fuentes de alimentación en inglés
    'filter.cases':            '🗄 Cases/Towers', // Opción del filtro de tipo para mostrar solo cajas y torres de PC en inglés

    //Texto del contador de resultados que aparece sobre el listado de productos en inglés
    'count.products_found': 'products found', // Texto que acompaña al número de productos en el contador de resultados en inglés

    //Textos de la página de detalle de un producto individual en inglés
    'detail.iva':       'VAT included · Free shipping', // Texto informativo sobre impuestos y envío bajo el precio en la página de detalle en inglés
    'detail.add_cart':  '🛒 Add to cart', // Texto del botón principal para añadir el producto al carrito en la página de detalle en inglés
    'detail.specs':     '📋 Specifications', // Título de la sección de especificaciones técnicas en la página de detalle en inglés
    'detail.not_found': 'Product not found.', // Mensaje de error cuando el producto solicitado no existe en la base de datos (inglés)
    'detail.go_home':   'Back to home', // Texto del enlace para volver a la home cuando el producto no se encuentra (inglés)

    //Textos de la página de listado de una categoría de productos en inglés
    'category.not_found':  'Category not found', // Título de error cuando la categoría solicitada no existe en inglés
    'category.not_exists': 'This category does not exist.', // Mensaje descriptivo de error cuando la categoría no existe en inglés
    'category.go_home':    'Back to home', // Texto del enlace para volver a la home desde una categoría no encontrada (inglés)

    //Textos de la página de favoritos del usuario en inglés
    'favorites.title':         '❤️ Favorites', // Título principal de la página de favoritos en inglés
    'favorites.empty_title':   "You don't have any favorites yet", // Título del estado vacío de la página de favoritos en inglés
    'favorites.empty_hint':    'Press ♥ on any product to save it here', // Instrucción que aparece en el estado vacío de favoritos en inglés
    'favorites.clear_all':     'Clear favorites', // Texto del botón para eliminar todos los favoritos de la página de favoritos en inglés
    'favorites.confirm_clear': 'Clear all favorites? This action cannot be undone.', // Mensaje del diálogo de confirmación al vaciar favoritos en inglés
    'favorites.cleared_toast': '🗑️ Favorites cleared', // Texto del toast tras vaciar todos los favoritos correctamente en inglés

    //Textos de la página de historial de pedidos del usuario en inglés
    'orders.title':           '📦 My orders', // Título principal de la página de historial de pedidos en inglés
    'orders.clear_history':   'Clear history', // Texto del botón para eliminar todo el historial de pedidos en inglés
    'orders.empty_title':     "You haven't placed any orders yet", // Título del estado vacío de la página de pedidos en inglés
    'orders.empty_sub':       'When you complete a purchase, your order history will appear here.', // Descripción del estado vacío de la página de pedidos en inglés
    'orders.start_shopping':  'Start shopping', // Texto del enlace a la home desde el estado vacío de pedidos en inglés
    'orders.one_order':       'order', // Texto singular para el contador de pedidos del usuario en inglés
    'orders.many_orders':     'orders', // Texto plural para el contador de pedidos del usuario en inglés
    'orders.one_item':        'item', // Texto singular para el contador de artículos de un pedido en inglés
    'orders.many_items':      'items', // Texto plural para el contador de artículos de un pedido en inglés
    'orders.item_short':      'item', // Abreviatura singular de artículo usada en los resúmenes compactos de pedido en inglés
    'orders.items_short':     'items', // Abreviatura plural de artículos usada en los resúmenes compactos de pedido en inglés
    'orders.spent':           'spent', // Etiqueta de la cantidad total gastada en el resumen de pedidos del usuario en inglés
    'orders.status_confirmed':'confirmed', // Texto de la etiqueta de estado de un pedido ya procesado en inglés
    'orders.no_items':        'No items recorded', // Mensaje cuando un pedido guardado no tiene artículos asociados en inglés
    'orders.reorder':         '🛒 Order again', // Texto del botón para repetir un pedido anterior en inglés
    'orders.delete':          '🗑️ Delete order', // Texto del botón para eliminar un pedido individual del historial en inglés
    'orders.confirm_delete':  'Delete this order from history? This action cannot be undone.', // Mensaje del diálogo de confirmación al eliminar un pedido (inglés)
    'orders.confirm_clear':   'Clear ALL order history? This action cannot be undone.', // Mensaje del diálogo de confirmación al vaciar todo el historial (inglés)
    'orders.deleted_toast':   '🗑️ Order deleted', // Texto del toast tras eliminar un pedido correctamente en inglés
    'orders.cleared_toast':   '🗑️ History cleared', // Texto del toast tras vaciar todo el historial de pedidos en inglés
    'orders.total_paid':      'Total paid', // Etiqueta del importe total en el resumen de un pedido confirmado en inglés
    'orders.order_number':    'Order number', // Etiqueta del identificador único en el resumen de un pedido confirmado en inglés
    'orders.thank_you':       'Thank you for your purchase', // Mensaje de agradecimiento en el modal de confirmación de pedido en inglés
    'orders.confirmed_title': 'Order confirmed!', // Título del modal que aparece al finalizar una compra con éxito en inglés
    'orders.saved_locally':   'Your order has been saved locally. Total recorded:', // Mensaje informativo en el modal de confirmación de pedido en inglés
    'orders.accept':          'OK', // Texto del botón para cerrar el modal de confirmación de pedido en inglés
    'orders.toast_confirmed': 'confirmed', // Texto que acompaña al número de pedido en el toast de confirmación de compra (inglés)

    //Textos de la página del configurador de PC por componentes en inglés
    'config.title':       '🔧 Build PC', // Título principal de la página del configurador de PC en inglés
    'config.subtitle':    'Select components for your ideal PC. See compatibility and total in real time.', // Subtítulo descriptivo de la página del configurador de PC en inglés
    'config.your_config': '🛒 Your configuration', // Título del panel lateral que muestra los componentes seleccionados en el configurador (inglés)
    'config.empty':       'No components selected', // Mensaje del panel lateral del configurador cuando no hay ningún componente elegido (inglés)
    'config.total':       'Total', // Etiqueta del precio total acumulado en el panel lateral del configurador en inglés
    'config.compat':      '✅ Compatible configuration', // Mensaje de validación en el panel del configurador cuando los componentes son compatibles (inglés)
    'config.add_all':     'Add all to cart', // Texto del botón para añadir todos los componentes seleccionados al carrito en inglés
    'config.not_selected':'Not selected', // Texto que aparece en una ranura vacía del configurador cuando no se ha elegido componente (inglés)
    'config.no_products': 'No products in this category yet', // Mensaje en el configurador cuando una categoría no tiene productos en la base de datos (inglés)

    //Etiquetas de cada ranura de componente en el configurador de PC en inglés
    'config.part.cpu':          'CPU / Processor', // Etiqueta de la ranura de procesador en el configurador de PC en inglés
    'config.part.gpu':          'Graphics card', // Etiqueta de la ranura de tarjeta gráfica en el configurador de PC en inglés
    'config.part.cooler':       'Cooling', // Etiqueta de la ranura de sistema de refrigeración en el configurador de PC en inglés
    'config.part.ram':          'RAM Memory', // Etiqueta de la ranura de memoria RAM en el configurador de PC en inglés
    'config.part.ssd':          'SSD Storage', // Etiqueta de la ranura de almacenamiento SSD en el configurador de PC en inglés
    'config.part.mb':           'Motherboard', // Etiqueta de la ranura de placa base en el configurador de PC en inglés
    'config.part.network_card': 'Network card', // Etiqueta de la ranura de tarjeta de red en el configurador de PC en inglés
    'config.part.sound_card':   'Sound card', // Etiqueta de la ranura de tarjeta de sonido en el configurador de PC en inglés
    'config.part.psu':          'Power Supply', // Etiqueta de la ranura de fuente de alimentación en el configurador de PC en inglés
    'config.part.case':         'Case/Tower', // Etiqueta de la ranura de caja o torre en el configurador de PC en inglés
    'config.part.monitor':      'Monitor', // Etiqueta de la ranura de monitor en el configurador de PC en inglés
    'config.part.keyboard':     'Keyboard', // Etiqueta de la ranura de teclado en el configurador de PC en inglés
    'config.part.mouse':        'Mouse', // Etiqueta de la ranura de ratón en el configurador de PC en inglés
    'config.part.headphones':   'Headphones', // Etiqueta de la ranura de auriculares en el configurador de PC en inglés

    //Textos de la página de productos en oferta en inglés
    'offers.title':      '🔥 Deals', // Título principal de la página de productos en oferta en inglés
    'offers.no_results': 'No deals match your search', // Mensaje en la página de ofertas cuando ninguna oferta coincide con el filtro (inglés)

    //Textos de la página de inicio (home) de la tienda en inglés
    'home.hero_badge':   '✨ Latest generation technology', // Texto de la etiqueta badge sobre el titular principal de la sección hero de la home (inglés)
    'home.hero_h1':      'Build your <span class="hl">digital world</span>', // Titular principal de la sección hero de la home con texto resaltado mediante span (inglés)
    'home.hero_desc':    'Find the best components, peripherals and devices at the best price. Guaranteed quality and fast shipping.', // Descripción de la sección hero de la home en inglés
    'home.explore':      'Explore categories →', // Texto del botón principal de la sección hero que lleva a las categorías en inglés
    'home.see_offers':   'See deals', // Texto del botón secundario de la sección hero que lleva a las ofertas en inglés
    'home.quick_title':  '⚡ Quick access', // Título de la sección de accesos rápidos de la home en inglés
    'home.offers_title': 'Deals', // Título de la tarjeta de acceso rápido a ofertas en la home en inglés
    'home.offers_sub':   'Up to -60% on selected products', // Subtítulo de la tarjeta de acceso rápido a ofertas en la home en inglés
    'home.config_title': 'Build PC', // Título de la tarjeta de acceso rápido al configurador en la home en inglés
    'home.config_sub':   'Build your ideal PC part by part', // Subtítulo de la tarjeta de acceso rápido al configurador en la home en inglés
    'home.fav_title':    'My favorites', // Título de la tarjeta de acceso rápido a favoritos en la home en inglés
    'home.fav_sub':      'Your personal list of saved products', // Subtítulo de la tarjeta de acceso rápido a favoritos en la home en inglés
    'home.cats_title':   '🗂️ Browse by category', // Título de la sección de navegación por categorías de la home en inglés

    //Textos del pie de página (footer) de la tienda en inglés
    'footer.desc':   'Your reference tech store. Components and peripherals at the best price with fast shipping and official warranty.', // Descripción de la tienda en el bloque de texto del footer en inglés
    'footer.rights': '© 2026 C-Shop. All rights reserved.', // Texto de copyright en la parte inferior del footer en inglés
    'footer.vat':    '🇪🇺 VAT included in all prices', // Aviso legal sobre el IVA incluido en los precios del footer en inglés

    //Títulos de pestaña del navegador para cada página de la tienda en inglés
    'page.home_title':   'C-Shop · Your tech store', // Título de la pestaña del navegador en la página de inicio en inglés
    'page.home_desc':    'C-Shop — Your tech store. Components, peripherals and devices at the best price.', // Metadescripción de la página de inicio usada por JS (inglés)
    'page.offers_title': 'Deals · C-Shop', // Título de la pestaña del navegador en la página de ofertas en inglés
    'page.search_title': 'Search · C-Shop', // Título de la pestaña del navegador en la página de búsqueda en inglés
    'page.fav_title':    'Favorites · C-Shop', // Título de la pestaña del navegador en la página de favoritos en inglés
    'page.orders_title': 'My orders · C-Shop', // Título de la pestaña del navegador en la página de pedidos en inglés
    'page.config_title': 'Build PC · C-Shop', // Título de la pestaña del navegador en la página del configurador de PC en inglés
  },
};

//Mapa de traducción de claves de especificaciones técnicas de español a inglés para la página de detalle de producto
const SPEC_KEYS = { // Define el objeto que mapea cada clave de especificación técnica de español a inglés
  'Procesador':               'Processor', // Traduce la clave "Procesador" de las especificaciones al inglés
  'RAM':                      'RAM', // Traduce la clave "RAM" de las especificaciones (igual en ambos idiomas)
  'Almacenamiento':           'Storage', // Traduce la clave "Almacenamiento" de las especificaciones al inglés
  'GPU':                      'GPU', // Traduce la clave "GPU" de las especificaciones (igual en ambos idiomas)
  'Pantalla':                 'Screen', // Traduce la clave "Pantalla" de las especificaciones al inglés
  'Sistema Operativo':        'Operating System', // Traduce la clave "Sistema Operativo" de las especificaciones al inglés
  'Conectividad':             'Connectivity', // Traduce la clave "Conectividad" de las especificaciones al inglés
  'Puertos':                  'Ports', // Traduce la clave "Puertos" de las especificaciones al inglés
  'Cámara':                   'Camera', // Traduce la clave "Cámara" de las especificaciones al inglés
  'Cámara integrada':         'Built-in camera', // Traduce la clave "Cámara integrada" de las especificaciones al inglés
  'Micrófono integrado':      'Built-in microphone', // Traduce la clave "Micrófono integrado" de las especificaciones al inglés
  'Batería':                  'Battery', // Traduce la clave "Batería" de las especificaciones al inglés
  'Teclado':                  'Keyboard', // Traduce la clave "Teclado" de las especificaciones al inglés
  'Peso':                     'Weight', // Traduce la clave "Peso" de las especificaciones al inglés
  'Dimensiones':              'Dimensions', // Traduce la clave "Dimensiones" de las especificaciones al inglés
  'Color':                    'Color', // Traduce la clave "Color" de las especificaciones (igual en ambos idiomas)
  'Audio':                    'Audio', // Traduce la clave "Audio" de las especificaciones (igual en ambos idiomas)
  'Gráfica':                  'Graphics', // Traduce la clave "Gráfica" de las especificaciones al inglés
  'Resolución':               'Resolution', // Traduce la clave "Resolución" de las especificaciones al inglés
  'Frecuencia de actualización': 'Refresh rate', // Traduce la clave "Frecuencia de actualización" de las especificaciones al inglés
  'Frecuencia':               'Frequency', // Traduce la clave "Frecuencia" de las especificaciones al inglés
  'Panel':                    'Panel', // Traduce la clave "Panel" de las especificaciones (igual en ambos idiomas)
  'Tiempo de respuesta':      'Response time', // Traduce la clave "Tiempo de respuesta" de las especificaciones al inglés
  'Brillo':                   'Brightness', // Traduce la clave "Brillo" de las especificaciones al inglés
  'Contraste':                'Contrast ratio', // Traduce la clave "Contraste" de las especificaciones al inglés
  'Velocidad':                'Speed', // Traduce la clave "Velocidad" de las especificaciones al inglés
  'Latencia':                 'Latency', // Traduce la clave "Latencia" de las especificaciones al inglés
  'Tipo':                     'Type', // Traduce la clave "Tipo" de las especificaciones al inglés
  'Interfaz':                 'Interface', // Traduce la clave "Interfaz" de las especificaciones al inglés
  'Factor de forma':          'Form factor', // Traduce la clave "Factor de forma" de las especificaciones al inglés
  'Socket':                   'Socket', // Traduce la clave "Socket" de las especificaciones (igual en ambos idiomas)
  'Chipset':                  'Chipset', // Traduce la clave "Chipset" de las especificaciones (igual en ambos idiomas)
  'Memoria VRAM':             'VRAM', // Traduce la clave "Memoria VRAM" de las especificaciones al inglés
  'Bus':                      'Bus', // Traduce la clave "Bus" de las especificaciones (igual en ambos idiomas)
  'TDP':                      'TDP', // Traduce la clave "TDP" de las especificaciones (igual en ambos idiomas)
  'Núcleos':                  'Cores', // Traduce la clave "Núcleos" de las especificaciones al inglés
  'Hilos':                    'Threads', // Traduce la clave "Hilos" de las especificaciones al inglés
  'Frecuencia base':          'Base frequency', // Traduce la clave "Frecuencia base" de las especificaciones al inglés
  'Frecuencia turbo':         'Boost frequency', // Traduce la clave "Frecuencia turbo" de las especificaciones al inglés
  'Caché':                    'Cache', // Traduce la clave "Caché" de las especificaciones al inglés
  'Capacidad':                'Capacity', // Traduce la clave "Capacidad" de las especificaciones al inglés
  'Velocidad de lectura':     'Read speed', // Traduce la clave "Velocidad de lectura" de las especificaciones al inglés
  'Velocidad de escritura':   'Write speed', // Traduce la clave "Velocidad de escritura" de las especificaciones al inglés
  'Formato':                  'Format', // Traduce la clave "Formato" de las especificaciones al inglés
  'Potencia':                 'Power', // Traduce la clave "Potencia" de las especificaciones al inglés
  'Certificación':            'Certification', // Traduce la clave "Certificación" de las especificaciones al inglés
  'Modulable':                'Modular', // Traduce la clave "Modulable" de las especificaciones al inglés
  'Formato de placa':         'Board format', // Traduce la clave "Formato de placa" de las especificaciones al inglés
  'VRM':                      'VRM', // Traduce la clave "VRM" de las especificaciones (igual en ambos idiomas)
  'USB':                      'USB', // Traduce la clave "USB" de las especificaciones (igual en ambos idiomas)
  'PCIe':                     'PCIe', // Traduce la clave "PCIe" de las especificaciones (igual en ambos idiomas)
  'HDMI':                     'HDMI', // Traduce la clave "HDMI" de las especificaciones (igual en ambos idiomas)
  'DisplayPort':              'DisplayPort', // Traduce la clave "DisplayPort" de las especificaciones (igual en ambos idiomas)
  'Salidas':                  'Outputs', // Traduce la clave "Salidas" de las especificaciones al inglés
  'Entradas':                 'Inputs', // Traduce la clave "Entradas" de las especificaciones al inglés
  'Retroiluminación':         'Backlight', // Traduce la clave "Retroiluminación" de las especificaciones al inglés
  'Switch':                   'Switch type', // Traduce la clave "Switch" de las especificaciones al inglés
  'Layout':                   'Layout', // Traduce la clave "Layout" de las especificaciones (igual en ambos idiomas)
  'Polling rate':             'Polling rate', // Traduce la clave "Polling rate" de las especificaciones (igual en ambos idiomas)
  'DPI':                      'DPI', // Traduce la clave "DPI" de las especificaciones (igual en ambos idiomas)
  'Botones':                  'Buttons', // Traduce la clave "Botones" de las especificaciones al inglés
  'Conexión':                 'Connection', // Traduce la clave "Conexión" de las especificaciones al inglés
  'Autonomía':                'Battery life', // Traduce la clave "Autonomía" de las especificaciones al inglés
  'Controlador':              'Driver chip', // Traduce la clave "Controlador" de las especificaciones al inglés
  'Respuesta en frecuencia':  'Frequency response', // Traduce la clave "Respuesta en frecuencia" de las especificaciones al inglés
  'Impedancia':               'Impedance', // Traduce la clave "Impedancia" de las especificaciones al inglés
  'Transductor':              'Transducer', // Traduce la clave "Transductor" de las especificaciones al inglés
  'Micrófono':                'Microphone', // Traduce la clave "Micrófono" de las especificaciones al inglés
  'Material':                 'Material', // Traduce la clave "Material" de las especificaciones (igual en ambos idiomas)
  'Tecnología':               'Technology', // Traduce la clave "Tecnología" de las especificaciones al inglés
  'Velocidad de impresión':   'Print speed', // Traduce la clave "Velocidad de impresión" de las especificaciones al inglés
  'Resolución de impresión':  'Print resolution', // Traduce la clave "Resolución de impresión" de las especificaciones al inglés
  'Compatibilidad':           'Compatibility', // Traduce la clave "Compatibilidad" de las especificaciones al inglés
  'Voltaje':                  'Voltage', // Traduce la clave "Voltaje" de las especificaciones al inglés
  'Cable':                    'Cable', // Traduce la clave "Cable" de las especificaciones (igual en ambos idiomas)
  'Longitud':                 'Length', // Traduce la clave "Longitud" de las especificaciones al inglés
  'Conector':                 'Connector', // Traduce la clave "Conector" de las especificaciones al inglés
  'Velocidad de transferencia':'Transfer speed', // Traduce la clave "Velocidad de transferencia" de las especificaciones al inglés
  'Estándares':               'Standards', // Traduce la clave "Estándares" de las especificaciones al inglés
  'Bandas':                   'Bands', // Traduce la clave "Bandas" de las especificaciones al inglés
  'Frecuencias':              'Frequencies', // Traduce la clave "Frecuencias" de las especificaciones al inglés
  'Cobertura':                'Coverage', // Traduce la clave "Cobertura" de las especificaciones al inglés
  'Antenas':                  'Antennas', // Traduce la clave "Antenas" de las especificaciones al inglés
  'Entrada':                  'Input', // Traduce la clave "Entrada" de las especificaciones al inglés
  'Salida':                   'Output', // Traduce la clave "Salida" de las especificaciones al inglés
  'Canales':                  'Channels', // Traduce la clave "Canales" de las especificaciones al inglés
  'Soporte':                  'Stand', // Traduce la clave "Soporte" de las especificaciones al inglés
  'Altura':                   'Height', // Traduce la clave "Altura" de las especificaciones al inglés
  'Superficie':               'Surface', // Traduce la clave "Superficie" de las especificaciones al inglés
  'Acabado':                  'Finish', // Traduce la clave "Acabado" de las especificaciones al inglés
  'Compatible':               'Compatible', // Traduce la clave "Compatible" de las especificaciones (igual en ambos idiomas)
  'Zoom':                     'Zoom', // Traduce la clave "Zoom" de las especificaciones (igual en ambos idiomas)
  'Segmentos':                'Segments', // Traduce la clave "Segmentos" de las especificaciones al inglés
  'Relación señal/ruido':     'Signal/noise ratio', // Traduce la clave "Relación señal/ruido" de las especificaciones al inglés
  'Frecuencia de muestreo':   'Sampling rate', // Traduce la clave "Frecuencia de muestreo" de las especificaciones al inglés
  'Profundidad de bits':      'Bit depth', // Traduce la clave "Profundidad de bits" de las especificaciones al inglés
  'Velocidad de fotogramas':  'Frame rate', // Traduce la clave "Velocidad de fotogramas" de las especificaciones al inglés
  'Ajuste':                   'Adjustment', // Traduce la clave "Ajuste" de las especificaciones al inglés
  'Carga':                    'Charging', // Traduce la clave "Carga" de las especificaciones al inglés
};

//Función que traduce una clave de especificación técnica al idioma activo en la página de detalle
function translateSpecKey(key) { // Recibe el nombre de la clave de especificación en español y devuelve su traducción
  if (typeof currentLang !== 'undefined' && currentLang === 'en') { // Comprueba si el idioma activo de la tienda es inglés
    return SPEC_KEYS[key] || key; // Devuelve la traducción inglesa de la clave o la clave original si no existe en el mapa
  }
  return key; // Devuelve la clave sin traducir cuando el idioma activo es español
}

//Mapa de traducción de valores de especificaciones técnicas de español a inglés para la página de detalle
const SPEC_VALUES = { // Define el objeto que mapea cada valor de especificación técnica de español a inglés

  //Valores booleanos de las especificaciones técnicas del producto
  'Sí': 'Yes', 'No': 'No', // Traduce los valores afirmativo y negativo de las especificaciones al inglés

  //Colores usados como valores en las especificaciones técnicas del producto
  'Negro': 'Black', 'Blanco': 'White', 'Gris': 'Grey', 'Plateado': 'Silver', // Traduce los colores básicos de las especificaciones al inglés
  'Rojo': 'Red', 'Azul': 'Blue', 'Verde': 'Green', 'Dorado': 'Gold', // Traduce los colores secundarios de las especificaciones al inglés
  'Rosa': 'Pink', 'Naranja': 'Orange', 'Morado': 'Purple', 'Violeta': 'Violet', // Traduce los colores adicionales de las especificaciones al inglés
  'Negro/Gris': 'Black/Grey', 'Negro/Plateado': 'Black/Silver', // Traduce los valores de color combinado de las especificaciones al inglés

  //Tipos de mecanismo de teclado usados como valores de especificaciones
  'Mecánico': 'Mechanical', 'Membrana': 'Membrane', 'Óptico': 'Optical', // Traduce los tipos de teclado de las especificaciones al inglés

  //Tipos de conexión usados como valores de especificaciones en periféricos
  'Con cable': 'Wired', 'Inalámbrico': 'Wireless', // Traduce los modos de conexión básicos de las especificaciones al inglés
  'Inalámbrico / Con cable': 'Wireless / Wired', // Traduce el modo de conexión mixto con espacios de las especificaciones al inglés
  'Inalámbrico/Con cable': 'Wireless/Wired', // Traduce el modo de conexión mixto sin espacios de las especificaciones al inglés

  //Tipos de modularidad de fuente de alimentación usados como valores de especificaciones
  'Totalmente modular': 'Fully modular', 'Semi-modular': 'Semi-modular', // Traduce los tipos de modularidad de fuente al inglés
  'No modular': 'Non-modular', 'Modular': 'Modular', // Traduce los valores restantes de modularidad de fuente al inglés

  //Valores de sistema operativo usados como valores de especificaciones
  'Sin sistema operativo': 'Without OS', 'Sin S.O.': 'No OS', // Traduce los valores de ausencia de sistema operativo al inglés

  //Materiales usados como valores de especificaciones en los productos
  'Aluminio': 'Aluminium', 'Plástico': 'Plastic', 'Tela': 'Fabric', // Traduce los materiales principales de las especificaciones al inglés
  'Metal': 'Metal', 'Acero inoxidable': 'Stainless steel', 'Acero': 'Steel', // Traduce los materiales metálicos de las especificaciones al inglés
  'Vidrio': 'Glass', 'Madera': 'Wood', 'Nylon': 'Nylon', // Traduce los materiales adicionales de las especificaciones al inglés

  //Tipos de transductor de auriculares usados como valores de especificaciones
  'Dinámico': 'Dynamic', 'Planar magnético': 'Planar magnetic', // Traduce los tipos de transductor de auriculares al inglés
  'Electrostático': 'Electrostatic', 'Híbrido': 'Hybrid', // Traduce los tipos de transductor adicionales de auriculares al inglés

  //Bandas de frecuencia WiFi usadas como valores de especificaciones en tarjetas de red
  'Doble banda': 'Dual band', 'Triple banda': 'Triple band', 'Banda única': 'Single band', // Traduce los tipos de banda WiFi de las especificaciones al inglés

  //Tipos de superficie de alfombrillas usados como valores de especificaciones
  'Dura': 'Hard', 'Blanda': 'Soft', // Traduce los tipos de superficie de alfombrilla de ratón al inglés

  //Tecnologías de impresión usadas como valores de especificaciones en impresoras
  'Inyección de tinta': 'Inkjet', 'Láser': 'Laser', 'Multifunción': 'Multifunction', // Traduce los tipos de impresión de las especificaciones al inglés

  //Tipos de retroiluminación usados como valores de especificaciones en teclados y periféricos
  'Sin retroiluminación': 'No backlight', 'RGB': 'RGB', // Traduce los tipos de retroiluminación de las especificaciones al inglés

  //Valores de cámara y micrófono integrados usados como valores de especificaciones
  'Sí, integrada': 'Yes, built-in', 'No integrada': 'Not built-in', // Traduce los valores de cámara/micrófono integrado de las especificaciones al inglés

  //Valores misceláneos de especificaciones sin categoría específica
  'Ajustable': 'Adjustable', 'Fija': 'Fixed', 'Estándar': 'Standard', // Traduce valores genéricos de ajuste y formato de las especificaciones al inglés
  'Compacto': 'Compact', 'Integrado': 'Integrated', 'Integrada': 'Integrated', // Traduce valores genéricos de tamaño e integración de las especificaciones al inglés
  'Incluido': 'Included', 'Incluida': 'Included', // Traduce los valores de inclusión en el producto de las especificaciones al inglés
  'Horizontal': 'Horizontal', 'Vertical': 'Vertical', // Traduce los valores de orientación de las especificaciones al inglés
  'Sí, totalmente': 'Yes, fully', // Traduce el valor de afirmación completa de las especificaciones al inglés
};

//Patrones regex para traducir términos compuestos en valores de especificaciones que no se traducen con el mapa exacto
const SPEC_PATTERNS = [ // Define el array de pares [regex, reemplazo] para traducir fragmentos de texto dentro de valores compuestos
  [/\bnúcleos\b/gi, 'cores'], // Sustituye la palabra "núcleos" en valores como "16 núcleos / 24 hilos" al inglés
  [/\bnúcleo\b/gi,  'core'], // Sustituye la palabra "núcleo" en singular dentro de valores compuestos al inglés
  [/\bhilos\b/gi,   'threads'], // Sustituye la palabra "hilos" en valores como "16 núcleos / 24 hilos" al inglés
  [/\bhilo\b/gi,    'thread'], // Sustituye la palabra "hilo" en singular dentro de valores compuestos al inglés
  [/\bzócalo\b/gi,  'socket'], // Sustituye la palabra "zócalo" dentro de valores compuestos al inglés
  [/\bintegrados?\b/gi, 'integrated'], // Sustituye "integrado" o "integrados" dentro de valores compuestos al inglés
  [/\bincluidos?\b/gi,  'included'], // Sustituye "incluido" o "incluidos" dentro de valores compuestos al inglés
];

//Función que traduce un valor de especificación técnica al idioma activo en la página de detalle
function translateSpecValue(val) { // Recibe el valor de una especificación en español y devuelve su traducción al idioma activo
  if (typeof currentLang === 'undefined' || currentLang !== 'en') return val; // Devuelve el valor sin traducir si el idioma activo no es inglés
  if (SPEC_VALUES[val] !== undefined) return SPEC_VALUES[val]; // Devuelve la traducción exacta del valor si existe en el mapa SPEC_VALUES
  let result = val; // Inicializa la variable de resultado con el valor original para aplicar los patrones de reemplazo
  for (const [pattern, replacement] of SPEC_PATTERNS) { // Itera sobre cada par [regex, reemplazo] del array SPEC_PATTERNS
    result = result.replace(pattern, replacement); // Aplica el patrón regex al resultado para traducir términos compuestos parciales
  }
  return result; // Devuelve el valor con los reemplazos parciales aplicados por los patrones regex
}

//Función que aplica todas las traducciones del idioma activo a los elementos del DOM en cualquier página de la tienda
function applyI18n() { // Recorre el DOM y actualiza todos los elementos con atributos data-i18n* al idioma activo
  if (typeof currentLang === 'undefined' || typeof t !== 'function') return; // Aborta si el idioma o la función de traducción no están disponibles

  document.documentElement.lang = currentLang; // Actualiza el atributo lang del elemento html para indicar el idioma activo al navegador

  document.querySelectorAll('[data-i18n]').forEach(el => { // Selecciona todos los elementos con atributo data-i18n para actualizar su texto
    const key = el.getAttribute('data-i18n'); // Lee la clave de traducción almacenada en el atributo data-i18n del elemento
    if (key) el.textContent = t(key); // Asigna el texto traducido al contenido del elemento si la clave existe
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => { // Selecciona todos los elementos con data-i18n-html para actualizar su HTML interno
    const key = el.getAttribute('data-i18n-html'); // Lee la clave de traducción del atributo data-i18n-html del elemento
    if (key) el.innerHTML = t(key); // Asigna el HTML traducido al elemento, necesario para claves con etiquetas como el h1 de la home
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => { // Selecciona todos los inputs con data-i18n-placeholder para actualizar su placeholder
    const key = el.getAttribute('data-i18n-placeholder'); // Lee la clave de traducción del atributo data-i18n-placeholder del input
    if (key) el.placeholder = t(key); // Asigna el placeholder traducido al input del campo de búsqueda o filtro
  });

  document.querySelectorAll('[data-i18n-title]').forEach(el => { // Selecciona todos los elementos con data-i18n-title para actualizar su tooltip
    const key = el.getAttribute('data-i18n-title'); // Lee la clave de traducción del atributo data-i18n-title del elemento
    if (key) el.title = t(key); // Asigna el texto traducido al atributo title del elemento para mostrar como tooltip
  });

  document.querySelectorAll('[data-i18n-aria]').forEach(el => { // Selecciona todos los elementos con data-i18n-aria para actualizar su aria-label
    const key = el.getAttribute('data-i18n-aria'); // Lee la clave de traducción del atributo data-i18n-aria del elemento
    if (key) el.setAttribute('aria-label', t(key)); // Asigna el texto traducido al atributo aria-label del elemento para accesibilidad
  });
}
