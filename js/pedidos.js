// Función: renderiza el historial completo de pedidos con estadísticas y controles de acción
function renderOrdersPage() { // Define la función principal que construye la lista de pedidos y el bloque de estadísticas de la página
  const grid    = document.getElementById('ordersList'); // Obtiene el contenedor de la lista de pedidos de la página de historial
  const empty   = document.getElementById('ordersEmpty'); // Obtiene el mensaje que se muestra cuando no hay pedidos en el historial
  const summary = document.getElementById('ordersSummary'); // Obtiene el bloque de estadísticas de pedidos (total pedidos, artículos y gasto)
  if (!grid) return; // Sale sin renderizar si el contenedor de la lista de pedidos no existe en el DOM

  const orders = getAllOrders(); // Obtiene el array completo de pedidos guardados del usuario

  if (orders.length === 0) { // Comprueba si el historial de pedidos está vacío
    grid.innerHTML = ''; // Limpia cualquier tarjeta de pedido previa del contenedor de la lista
    if (empty)   empty.style.display = 'block'; // Muestra el mensaje de historial vacío en la página de pedidos
    if (summary) summary.textContent = ''; // Limpia el bloque de estadísticas cuando no hay pedidos que resumir
    return; // Detiene el renderizado si no hay pedidos en el historial
  }
  if (empty) empty.style.display = 'none'; // Oculta el mensaje de historial vacío al haber pedidos para mostrar

  const totalSpent = orders.reduce((s, o) => s + (o.total || 0), 0); // Calcula el importe total acumulado de todos los pedidos del historial
  const totalItems = orders.reduce((s, o) => s + (o.itemsCount || 0), 0); // Calcula el número total de artículos comprados en todos los pedidos del historial
  if (summary) { // Comprueba que el bloque de estadísticas existe antes de escribir en él
    const ordLabel  = orders.length === 1 ? t('orders.one_order')  : t('orders.many_orders'); // Selecciona la etiqueta de pedido en singular o plural según el número de pedidos
    const itemLabel = totalItems   === 1  ? t('orders.one_item')   : t('orders.many_items'); // Selecciona la etiqueta de artículo en singular o plural según el total de artículos
    summary.innerHTML = `
      <div class="orders-stat"><span class="os-num">${orders.length}</span><span class="os-lbl">${ordLabel}</span></div>
      <div class="orders-stat"><span class="os-num">${totalItems}</span><span class="os-lbl">${itemLabel}</span></div>
      <div class="orders-stat"><span class="os-num">${totalSpent.toFixed(2)}€</span><span class="os-lbl">${t('orders.spent')}</span></div>`; // Renderiza los tres bloques de estadísticas con número de pedidos, artículos y total gastado
  }

  const locale = currentLang === 'es' ? 'es-ES' : 'en-GB'; // Selecciona el código de idioma para el formateador de fechas según el idioma activo
  const fmt    = new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeStyle: 'short' }); // Crea el formateador de fechas con estilo medio y hora corta para las fechas de pedido

  grid.innerHTML = orders.map((o, idx) => { // Genera el HTML de cada tarjeta de pedido del historial
    const itemsHtml = (o.items || []).map(i => `
      <div class="order-item">
        <span class="oi-qty">${i.qty}×</span>
        <a class="oi-name" href="producto.html?id=${encodeURIComponent(i.id)}">${escapeHtml(i.brand || '')} · ${escapeHtml(i.name)}</a>
        <span class="oi-price">${(i.price * i.qty).toFixed(2)}€</span>
      </div>`).join(''); // Genera el HTML de cada línea de producto dentro de la tarjeta de pedido expandida

    const statusLabel = o.status === 'confirmado' ? t('orders.status_confirmed') : (o.status || t('orders.status_confirmed')); // Obtiene la etiqueta de estado del pedido traducida al idioma activo
    const itemsShort  = (o.itemsCount || 0) === 1 ? t('orders.item_short') : t('orders.items_short'); // Selecciona la etiqueta abreviada de artículo en singular o plural para el resumen de la cabecera

    return `
      <article class="order-card" data-idx="${idx}">
        <header class="order-head" onclick="toggleOrder(${idx})">
          <div class="order-head-left">
            <div class="order-id">${o.id}</div>
            <div class="order-date">📅 ${fmt.format(new Date(o.date))}${o.user ? ` · 👤 ${escapeHtml(o.user.name)}` : ''}</div>
          </div>
          <div class="order-head-right">
            <span class="order-status">${statusLabel}</span>
            <div class="order-total">${(o.total || 0).toFixed(2)}€</div>
            <div class="order-meta">${o.itemsCount || 0} ${itemsShort}</div>
            <span class="order-toggle" aria-hidden="true">▾</span>
          </div>
        </header>
        <div class="order-body">
          ${itemsHtml || `<p style="color:var(--text-dim);padding:8px;font-size:.85rem">${t('orders.no_items')}</p>`}
          <div class="order-actions">
            <button class="btn-ghost" onclick="reorderFromHistory(${idx})">${t('orders.reorder')}</button>
            <button class="btn-danger-ghost" onclick="deleteOrder(${idx})">${t('orders.delete')}</button>
          </div>
        </div>
      </article>`; // Renderiza la tarjeta completa del pedido con cabecera, líneas de producto y botones de acción
  }).join('');
}

// Función: expande o contrae el cuerpo de una tarjeta de pedido al pulsar su cabecera
function toggleOrder(idx) { // Define la función que alterna la clase 'open' de la tarjeta de pedido identificada por su índice
  const card = document.querySelector(`.order-card[data-idx="${idx}"]`); // Localiza la tarjeta de pedido cuyo índice coincide con el pulsado en el historial
  if (card) card.classList.toggle('open'); // Añade o elimina la clase 'open' para expandir o contraer el cuerpo de la tarjeta de pedido
}

// Función: añade al carrito todos los productos de un pedido anterior
function reorderFromHistory(idx) { // Define la función que repite la compra de un pedido del historial añadiendo sus productos al carrito
  const orders = getAllOrders(); // Obtiene el array completo de pedidos del historial del usuario
  const o = orders[idx]; // Accede al pedido concreto identificado por su índice en el historial
  if (!o) return; // Sale sin hacer nada si el índice no corresponde a ningún pedido guardado
  let added = 0; // Inicializa el contador de productos añadidos al carrito durante la repetición de compra
  (o.items || []).forEach(it => { // Recorre cada línea de producto del pedido a repetir
    const p = findProductById(it.id); // Busca el producto en el catálogo actual mediante su ID del pedido
    if (p) { // Comprueba que el producto sigue existiendo en el catálogo antes de añadirlo
      for (let i = 0; i < it.qty; i++) addToCart(p); // Añade el producto al carrito tantas veces como unidades tenía en el pedido original
      added++; // Incrementa el contador de tipos de producto añadidos correctamente al carrito
    }
  });
  if (added === 0) showToast(`⚠️ ${t('toast.order_no_items')}`, ''); // Muestra un aviso en el toast si ningún producto del pedido se encontró en el catálogo actual
  else openCart(); // Abre el panel lateral del carrito tras añadir los productos del pedido repetido
}

// Función: elimina un pedido individual del historial tras confirmación del usuario
function deleteOrder(idx) { // Define la función que borra un pedido concreto del historial de la página de pedidos
  if (!confirm(t('orders.confirm_delete'))) return; // Muestra un diálogo de confirmación y cancela si el usuario rechaza eliminar el pedido
  const orders = getAllOrders(); // Obtiene el array completo de pedidos del historial del usuario
  orders.splice(idx, 1); // Elimina el pedido en la posición indicada del array del historial
  saveOrders(orders); // Persiste el array de pedidos actualizado en el almacenamiento local del navegador
  updateOrdersUI(); // Actualiza el contador de pedidos visible en la interfaz de navegación
  renderOrdersPage(); // Re-renderiza la lista de pedidos y las estadísticas tras eliminar el pedido
  showToast(t('orders.deleted_toast'), 'success'); // Muestra el mensaje de confirmación de eliminación en el toast de la interfaz
}

// Función: elimina todos los pedidos del historial tras confirmación del usuario
function clearAllOrders() { // Define la función que vacía el historial completo de pedidos del usuario
  if (!confirm(t('orders.confirm_clear'))) return; // Muestra un diálogo de confirmación y cancela si el usuario rechaza vaciar el historial
  saveOrders([]); // Persiste un array vacío en el almacenamiento local borrando todo el historial de pedidos
  updateOrdersUI(); // Actualiza el contador de pedidos visible en la interfaz de navegación
  renderOrdersPage(); // Re-renderiza la página de pedidos mostrando el estado de historial vacío
  showToast(t('orders.cleared_toast'), 'success'); // Muestra el mensaje de confirmación de vaciado en el toast de la interfaz
}

// Función: aplica traducciones y renderiza la página de pedidos con el idioma activo
function applyOrdersI18n() { // Define la función que inicializa la página de pedidos con el idioma activo
  document.title = t('page.orders_title'); // Actualiza el título de la pestaña del navegador con el nombre de la página de pedidos
  applyI18n(); // Aplica las traducciones del idioma activo a los elementos estáticos del HTML de la página de pedidos
  renderOrdersPage(); // Renderiza la lista de pedidos y las estadísticas con el idioma activo al inicializar la página
}

// Bloque de inicialización: ejecuta la configuración de la página al cargar el DOM
if (document.readyState === 'loading') { // Comprueba si el DOM todavía está cargando cuando se evalúa el script
  document.addEventListener('DOMContentLoaded', applyOrdersI18n); // Registra applyOrdersI18n para ejecutarse cuando el DOM termine de cargarse
} else { // El DOM ya está completamente cargado cuando se evalúa el script
  applyOrdersI18n(); // Ejecuta directamente la inicialización de la página de pedidos
}

// Bloque: re-renderiza la página de pedidos de forma instantánea al cambiar el idioma
onLangChange(() => { // Registra el callback que actualiza la página de pedidos cuando cambia el idioma activo
  document.title = t('page.orders_title'); // Actualiza el título de la pestaña del navegador al nombre de pedidos en el nuevo idioma
  applyI18n(); // Aplica las traducciones del nuevo idioma a los elementos estáticos del HTML de la página de pedidos
  renderOrdersPage(); // Re-renderiza la lista de pedidos y las estadísticas con los textos del nuevo idioma
});
