// Variables de estado del configurador de PC: selecciones activas, temporizador del tooltip y referencias a sus elementos
let configSelections = {}; // Almacena los productos seleccionados por el usuario indexados por ID de pieza del configurador
let ttTimeout = null; // Guarda el identificador del temporizador que oculta el tooltip del configurador con retraso
let _tooltip, _ttImg, _ttName, _ttPrice; // Referencias cacheadas a los elementos DOM del tooltip del configurador de PC

// Definición de las piezas disponibles en el configurador con su categoría, filtro de producto y icono
const configParts = [ // Define el array de configuración de las 14 piezas que componen el configurador de PC
  { id:'cpu',          catId:'components', filter:'Procesador',          icon:'🔲' }, // Pieza de procesador del configurador, filtrada sobre la categoría de componentes
  { id:'gpu',          catId:'components', filter:'Tarjeta Gráfica',     icon:'🎮' }, // Pieza de tarjeta gráfica del configurador, filtrada sobre la categoría de componentes
  { id:'cooler',       catId:'components', filter:'Refrigeración',       icon:'𖣘' }, // Pieza de refrigeración del configurador, filtrada sobre la categoría de componentes
  { id:'ram',          catId:'components', filter:'RAM',                 icon:'💾' }, // Pieza de memoria RAM del configurador, filtrada sobre la categoría de componentes
  { id:'ssd',          catId:'components', filter:'NVMe',                icon:'💿' }, // Pieza de almacenamiento NVMe del configurador, filtrada sobre la categoría de componentes
  { id:'mb',           catId:'components', filter:'Placa Base',          icon:'🖥' }, // Pieza de placa base del configurador, filtrada sobre la categoría de componentes
  { id:'network_card', catId:'components', filter:'Tarjeta de Red',      icon:'🛜' }, // Pieza de tarjeta de red del configurador, filtrada sobre la categoría de componentes
  { id:'sound_card',   catId:'components', filter:'Tarjeta de Sonido',   icon:'🔊' }, // Pieza de tarjeta de sonido del configurador, filtrada sobre la categoría de componentes
  { id:'psu',          catId:'components', filter:'Fuente Alimentación', icon:'⚡' }, // Pieza de fuente de alimentación del configurador, filtrada sobre la categoría de componentes
  { id:'case',         catId:'components', filter:'Torre',               icon:'🗄' }, // Pieza de torre del configurador, filtrada sobre la categoría de componentes
  { id:'monitor',      catId:'monitors',   filter:'',                    icon:'🖵' }, // Pieza de monitor del configurador, carga todos los productos de la categoría de monitores
  { id:'keyboard',     catId:'keyboards',  filter:'',                    icon:'⌨️' }, // Pieza de teclado del configurador, carga todos los productos de la categoría de teclados
  { id:'mouse',        catId:'mouse',      filter:'',                    icon:'🖱️' }, // Pieza de ratón del configurador, carga todos los productos de la categoría de ratones
  { id:'headphones',   catId:'headphones', filter:'',                    icon:'🎧' }, // Pieza de auriculares del configurador, carga todos los productos de la categoría de auriculares
];

// Función: genera y renderiza todos los pasos del configurador de PC con sus productos y estado actual
function renderConfigurator() { // Define la función que construye el HTML de los pasos del configurador y actualiza el resumen lateral
  const container = document.getElementById('configSteps'); // Obtiene el contenedor que agrupa todos los pasos del configurador de PC
  if (!container) return; // Sale sin renderizar si el contenedor de pasos del configurador no existe en el DOM
  container.innerHTML = configParts.map((part, idx) => { // Genera el HTML de cada paso del configurador iterando sobre las piezas definidas
    const label = t(`config.part.${part.id}`); // Obtiene la etiqueta traducida de la pieza para mostrarla en la cabecera del paso
    const prods = (ALL_PRODUCTS[part.catId] || []) // Obtiene los productos de la categoría de la pieza o un array vacío
      .filter(p => !part.filter || p.name.includes(part.filter) || p.brand.includes(part.filter)); // Filtra los productos por el nombre de subtipo de componente definido en la pieza
    const prodsHtml = prods.map(p => `
      <div class="cs-product${configSelections[part.id]?.id === p.id ? ' selected' : ''}"
           onclick="selectConfigPart('${part.id}','${p.id}')"
           onmouseenter="showConfigTooltip(event,'${p.image}','${p.name.replace(/'/g, "\\'")}',${p.price})"
           onmousemove="moveConfigTooltip(event)"
           onmouseleave="hideConfigTooltip()">
        <div class="cs-p-icon">
          <img src="${p.image}" alt="${escapeHtml(p.name)}" loading="lazy"
               onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
          <span class="cs-p-fallback" style="display:none">${p.icon}</span>
        </div>
        <div class="cs-p-info">
          <div class="cs-p-name">${escapeHtml(p.name)}</div>
          <div class="cs-p-price">${p.price.toFixed(2)}€</div>
        </div>
      </div>`).join(''); // Genera el HTML de cada producto seleccionable dentro del paso del configurador con tooltip y evento de selección
    const isSelected = !!configSelections[part.id]; // Comprueba si el usuario ya ha seleccionado un producto para esta pieza del configurador
    return `
      <div class="config-step" id="step_${part.id}">
        <div class="cs-header" onclick="toggleConfigStep('${part.id}')">
          <div class="cs-num${isSelected ? ' done' : ''}">${isSelected ? '✓' : (idx + 1)}</div>
          <div class="cs-info">
            <div class="cs-title">${part.icon} ${label}</div>
            <div class="cs-selected">${isSelected ? escapeHtml(configSelections[part.id].name.slice(0, 50)) + '…' : t('config.not_selected')}</div>
          </div>
          <span style="color:var(--text-dim);font-size:.8rem">▾</span>
        </div>
        <div class="cs-body" id="body_${part.id}">
          <div class="cs-product-list">${prodsHtml || `<p style="color:var(--text-dim);padding:10px;font-size:.8rem">${t('config.no_products')}</p>`}</div>
        </div>
      </div>`; // Renderiza el paso completo del configurador con su cabecera de estado y lista de productos seleccionables
  }).join('');
  updateConfigSummary(); // Actualiza el resumen lateral del configurador con las piezas seleccionadas y el total
}

// Función: expande o contrae el cuerpo de un paso del configurador al pulsar su cabecera
function toggleConfigStep(id) { document.getElementById('body_' + id)?.classList.toggle('open'); } // Alterna la clase 'open' del cuerpo del paso del configurador identificado por el ID de pieza

// Función: registra la selección de un producto para una pieza y actualiza el configurador
function selectConfigPart(partId, productId) { // Define la función que guarda la selección del usuario y re-renderiza el configurador
  const product = findProductById(productId); // Busca el producto seleccionado en el catálogo global mediante su ID
  if (!product) return; // Sale sin registrar la selección si el producto no existe en el catálogo
  configSelections[partId] = product; // Guarda el producto seleccionado en el objeto de selecciones del configurador bajo el ID de pieza
  clearTimeout(ttTimeout); // Cancela el temporizador pendiente de ocultación del tooltip del configurador
  _tooltip?.classList.remove('visible'); // Oculta inmediatamente el tooltip al confirmar la selección de un producto
  renderConfigurator(); // Re-renderiza el configurador de PC reflejando la nueva selección en la lista de pasos
}

// Función: elimina la selección de una pieza del configurador y actualiza la vista
function removeConfigPart(partId) { delete configSelections[partId]; renderConfigurator(); } // Borra la pieza del objeto de selecciones y re-renderiza el configurador y el resumen lateral

// Función: añade al carrito todas las piezas seleccionadas en el configurador
function addConfigToCart() { // Define la función que envía todos los componentes configurados al carrito de la tienda
  Object.values(configSelections).forEach(p => addToCart(p)); // Añade cada producto seleccionado en el configurador al carrito de la tienda
  showToast(`🔧 ${t('toast.config_added')}`, 'success'); // Muestra el mensaje de confirmación de configuración añadida en el toast de la interfaz
}

// Función: actualiza el resumen lateral del configurador con las piezas seleccionadas, el total y el indicador de compatibilidad
function updateConfigSummary() { // Define la función que reconstruye el panel de resumen lateral del configurador de PC
  const items = document.getElementById('configSummaryItems'); // Obtiene el contenedor de la lista de piezas del resumen lateral del configurador
  if (!items) return; // Sale si el contenedor del resumen lateral no existe en el DOM del configurador
  const sel = Object.entries(configSelections); // Obtiene los pares [idPieza, producto] de todas las piezas seleccionadas actualmente
  if (sel.length === 0) { // Comprueba si no hay ninguna pieza seleccionada en el configurador
    items.innerHTML = `<div class="cs-sum-empty">${t('config.empty')}</div>`; // Muestra el mensaje de configuración vacía en el resumen lateral del configurador
  } else { // Hay al menos una pieza seleccionada que mostrar en el resumen lateral
    items.innerHTML = sel.map(([partId, p]) => `
      <div class="cs-sum-item">
        <div class="csi-icon">
          <img src="${p.image}" alt="${escapeHtml(p.name)}" loading="lazy"
               onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
          <span class="csi-fallback" style="display:none">${p.icon}</span>
        </div>
        <span class="csi-name">${escapeHtml(p.name.slice(0, 32))}…</span>
        <span class="csi-price">${p.price.toFixed(2)}€</span>
        <span class="csi-remove" onclick="removeConfigPart('${partId}')">✕</span>
      </div>`).join(''); // Genera el HTML de cada fila de pieza seleccionada en el resumen lateral con imagen, nombre, precio y botón de eliminar
  }
  const total = sel.reduce((s, [, p]) => s + p.price, 0); // Calcula el precio total sumando el precio de todas las piezas seleccionadas en el configurador
  document.getElementById('configTotal').textContent = total.toFixed(2) + '€'; // Muestra el precio total del configurador en el bloque de total del resumen lateral
  document.getElementById('configAddAll').disabled = sel.length === 0; // Desactiva el botón de añadir todo al carrito si no hay ninguna pieza seleccionada
  document.getElementById('configCompat').classList.toggle('visible', sel.length >= 4); // Muestra el indicador de compatibilidad en el resumen lateral cuando hay al menos 4 piezas seleccionadas
}

// Función: muestra el tooltip del configurador con la imagen, nombre y precio del producto al pasar el cursor
function showConfigTooltip(e, imgSrc, name, price) { // Define la función que rellena y hace visible el tooltip al entrar el cursor en un producto
  if (!_tooltip) return; // Sale sin mostrar el tooltip si la referencia al elemento tooltip no está inicializada
  clearTimeout(ttTimeout); // Cancela cualquier temporizador pendiente de ocultación del tooltip del configurador
  _ttImg.src = imgSrc; // Carga la imagen del producto en el tooltip del configurador de PC
  _ttName.textContent  = name.length > 44 ? name.slice(0, 44) + '…' : name; // Muestra el nombre del producto truncado a 44 caracteres en el tooltip del configurador
  _ttPrice.textContent = parseFloat(price).toFixed(2) + '€'; // Muestra el precio del producto formateado con dos decimales en el tooltip del configurador
  positionTooltip(e); // Posiciona el tooltip junto al cursor del ratón en la página del configurador
  _tooltip.classList.add('visible'); // Hace visible el tooltip del configurador añadiendo la clase 'visible'
}

// Función: actualiza la posición del tooltip al mover el cursor sobre un producto del configurador
function moveConfigTooltip(e) { positionTooltip(e); } // Llama a positionTooltip para actualizar las coordenadas del tooltip al mover el ratón

// Función: inicia el temporizador para ocultar el tooltip al salir el cursor del producto
function hideConfigTooltip()  { ttTimeout = setTimeout(() => _tooltip?.classList.remove('visible'), 80); } // Programa la ocultación del tooltip con 80 ms de retraso para evitar parpadeos al mover el cursor

// Función: calcula y aplica la posición del tooltip para que permanezca dentro de la ventana
function positionTooltip(e) { // Define la función que coloca el tooltip junto al cursor evitando que se salga de los bordes de la pantalla
  let x = e.clientX + 18, y = e.clientY - 80; // Calcula la posición inicial del tooltip desplazada 18 px a la derecha y 80 px arriba del cursor
  if (x + 220 > window.innerWidth)  x = e.clientX - 228; // Desplaza el tooltip a la izquierda del cursor si se saldría por el borde derecho de la pantalla
  if (y + 250 > window.innerHeight) y = window.innerHeight - 255; // Ajusta la posición vertical del tooltip si se saldría por el borde inferior de la pantalla
  if (y < 8) y = 8; // Impide que el tooltip suba por encima de los 8 px del borde superior de la pantalla
  _tooltip.style.left = x + 'px'; // Aplica la posición horizontal calculada al elemento tooltip del configurador
  _tooltip.style.top  = y + 'px'; // Aplica la posición vertical calculada al elemento tooltip del configurador
}

// Bloque de inicialización: cachea referencias al tooltip e inicializa el configurador cuando los productos están listos
onProductsReady(() => { // Registra el callback que inicializa la página del configurador tras cargar los datos de productos
  _tooltip = document.getElementById('config-tooltip'); // Cachea la referencia al elemento contenedor del tooltip del configurador
  _ttImg   = document.getElementById('config-tooltip-img'); // Cachea la referencia a la imagen del tooltip del configurador
  _ttName  = document.getElementById('config-tooltip-name'); // Cachea la referencia al nombre del tooltip del configurador
  _ttPrice = document.getElementById('config-tooltip-price'); // Cachea la referencia al precio del tooltip del configurador
  document.title = t('page.config_title'); // Actualiza el título de la pestaña del navegador con el nombre de la página del configurador
  applyI18n(); // Aplica las traducciones del idioma activo a los elementos estáticos del HTML del configurador
  renderConfigurator(); // Renderiza los pasos del configurador y el resumen lateral con el estado inicial vacío
});

// Bloque: re-renderiza el configurador de forma instantánea al cambiar el idioma
onLangChange(() => { // Registra el callback que actualiza el configurador cuando cambia el idioma activo
  document.title = t('page.config_title'); // Actualiza el título de la pestaña del navegador al nombre del configurador en el nuevo idioma
  applyI18n(); // Aplica las traducciones del nuevo idioma a los elementos estáticos del HTML del configurador
  renderConfigurator(); // Re-renderiza los pasos del configurador con las etiquetas de pieza en el nuevo idioma
});
