// Estado de carga de productos y cola de callbacks en espera
let _productsReady = false; // Indica si todos los productos de Firestore han sido cargados en ALL_PRODUCTS
const _productCallbacks = []; // Cola de funciones que esperan a que los productos estén disponibles

// Permite registrar callbacks que se ejecutan en cuanto los productos están listos
window.onProductsReady = function (cb) { // Expone globalmente la función de suscripción al evento de productos cargados
  if (_productsReady) cb(); // Ejecuta el callback inmediatamente si los productos ya están disponibles
  else _productCallbacks.push(cb); // Encola el callback para ejecutarlo cuando finalice la carga desde Firestore
};

// Carga todos los productos de Firestore, los agrupa por categoría y construye índices de búsqueda
(async function loadFromFirestore() { // IIFE asíncrona que puebla ALL_PRODUCTS con los datos de la colección products de Firestore
  try { // Inicia el bloque protegido contra errores de red o de Firestore
    const db   = firebase.firestore(); // Obtiene la instancia de Firestore para acceder a la colección de productos
    const snap = await db.collection('products').get(); // Descarga todos los documentos de la colección products de Firestore

    snap.forEach(doc => { // Itera sobre cada documento de producto devuelto por Firestore
      const p = { id: doc.id, ...doc.data() }; // Construye el objeto de producto combinando el ID del documento y sus campos
      if (!ALL_PRODUCTS[p.catId]) ALL_PRODUCTS[p.catId] = []; // Crea el array de la categoría en ALL_PRODUCTS si aún no existe
      ALL_PRODUCTS[p.catId].push(p); // Añade el producto al array de su categoría dentro de ALL_PRODUCTS
    });

    // Añade índices normalizados a cada producto para acelerar las búsquedas del header
    CATEGORIES.forEach(cat => { // Itera sobre cada una de las 16 categorías de la tienda
      (ALL_PRODUCTS[cat.id] || []).forEach(p => { // Itera sobre los productos de cada categoría ya cargados en ALL_PRODUCTS
        p._ns = normalizeStr(p.name); // Genera el índice de búsqueda normalizado del nombre del producto
        p._bs = normalizeStr(p.brand); // Genera el índice de búsqueda normalizado de la marca del producto
      });
    });

    _productsReady = true; // Marca la carga como completada para que onProductsReady ejecute callbacks inmediatamente

  } catch (err) { // Captura errores de red o de permisos de Firestore
    console.error('[C-Shop] Error cargando productos desde Firestore:', err); // Registra el error en la consola sin romper la interfaz de la tienda
  } finally { // Se ejecuta siempre, tanto si la carga tuvo éxito como si falló
    _productCallbacks.forEach(cb => cb()); // Ejecuta todos los callbacks en cola para desbloquear las páginas que esperan los productos
    _productCallbacks.length = 0; // Vacía la cola de callbacks para liberar memoria
  }
})();
