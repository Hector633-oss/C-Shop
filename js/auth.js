// Configuración de conexión de la tienda con el backend de Firebase
const _fbConfig = { // Objeto con las credenciales de la aplicación Firebase de C-Shop
  apiKey:            'AIzaSyCI12VyhscXl09ksVHcuppEEnw_pggkz7k', // Clave API para autenticar solicitudes a Firebase desde la tienda
  authDomain:        'c-shop-33b42.firebaseapp.com', // Dominio de autenticación OAuth de la tienda
  projectId:         'c-shop-33b42', // Identificador del proyecto Firestore de la tienda
  storageBucket:     'c-shop-33b42.firebasestorage.app', // Bucket de almacenamiento de archivos de la tienda
  messagingSenderId: '876597015102', // ID del remitente para notificaciones push de la tienda
  appId:             '1:876597015102:web:d95924f0e4edd10ecb576f', // ID único de la aplicación web de la tienda en Firebase
};

// Inicialización única de Firebase para evitar instancias duplicadas
if (!firebase.apps.length) firebase.initializeApp(_fbConfig); // Inicializa Firebase solo si no hay ninguna app activa
const _auth = firebase.auth(); // Obtiene la instancia del servicio de autenticación de la tienda
const _db   = firebase.firestore(); // Obtiene la instancia de Firestore para leer y escribir datos de usuarios

// Control de restauración de sesión: evita el parpadeo del área de usuario en el header
let _firebaseUserConfirmed = false; // Indica si Firebase ha confirmado explícitamente un usuario autenticado; false mientras restaura la sesión desde IndexedDB

// Escucha los cambios de estado de autenticación y sincroniza el área de usuario del header
_auth.onAuthStateChanged(user => { // Registra el observador de sesión de Firebase
  if (user) { // Comprueba si Firebase devuelve un usuario autenticado
    _firebaseUserConfirmed = true; // Marca la sesión como confirmada por Firebase
    loggedUser = { // Construye el objeto de usuario que usa toda la tienda
      uid:   user.uid, // UID único del usuario en Firebase Auth
      email: user.email, // Correo electrónico del usuario registrado en la tienda
      name:  user.displayName || user.email.split('@')[0], // Nombre para mostrar en el header; usa el prefijo del email si no hay displayName
    };
    localStorage.setItem('ns_user', JSON.stringify(loggedUser)); // Persiste la sesión en localStorage para restaurarla sin parpadeo al recargar
    if (typeof updateLoginArea === 'function') updateLoginArea(); // Actualiza el botón de sesión del header con el nombre del usuario
    if (typeof loadUserData    === 'function') loadUserData(); // Carga el carrito y los favoritos guardados del usuario
  } else { // Firebase devuelve null: posible cierre de sesión o restauración pendiente
    if (!_firebaseUserConfirmed && !loggedUser) return; // Ignora el null inicial si Firebase aún restaura la sesión y no hay datos locales
    _firebaseUserConfirmed = false; // Restablece el indicador de sesión confirmada
    loggedUser = null; // Limpia el usuario activo en toda la tienda
    localStorage.setItem('ns_user', JSON.stringify(null)); // Borra la sesión persistida en localStorage
    if (typeof updateLoginArea === 'function') updateLoginArea(); // Restaura el botón "Iniciar sesión" en el header
    if (typeof clearUserData   === 'function') clearUserData(); // Vacía el carrito y los favoritos del usuario en la interfaz
  }
});

// Registro de un nuevo usuario en Firebase Auth y Firestore
async function firebaseRegister(email, password, name) { // Crea la cuenta y el perfil del usuario en la tienda
  const cred = await _auth.createUserWithEmailAndPassword(email, password); // Crea el usuario en Firebase Auth con email y contraseña
  await cred.user.updateProfile({ displayName: name }); // Guarda el nombre visible del usuario en el perfil de Firebase Auth
  loggedUser = { uid: cred.user.uid, email, name }; // Sincroniza el usuario en la tienda sin esperar a onAuthStateChanged para evitar race condition
  localStorage.setItem('ns_user', JSON.stringify(loggedUser)); // Persiste la sesión inmediatamente en localStorage
  if (typeof updateLoginArea === 'function') updateLoginArea(); // Actualiza el área de usuario del header con el nombre recién registrado
  if (typeof loadUserData    === 'function') loadUserData(); // Carga los datos iniciales del nuevo usuario
  await _db.collection('users').doc(cred.user.uid).set({ // Crea el documento del usuario en la colección Firestore
    name, // Nombre del usuario almacenado en Firestore
    email, // Correo del usuario almacenado en Firestore
    createdAt: firebase.firestore.FieldValue.serverTimestamp(), // Fecha de creación de la cuenta generada en el servidor
    lastLogin: firebase.firestore.FieldValue.serverTimestamp(), // Fecha del último acceso generada en el servidor
  });
}

// Inicio de sesión de un usuario existente con email y contraseña
async function firebaseLogin(email, password) { // Autentica al usuario y actualiza la interfaz de la tienda
  const cred = await _auth.signInWithEmailAndPassword(email, password); // Inicia sesión en Firebase Auth con las credenciales introducidas en el modal
  loggedUser = { // Sincroniza el usuario en la tienda sin esperar a onAuthStateChanged para evitar race condition
    uid:   cred.user.uid, // UID del usuario autenticado
    email: cred.user.email, // Correo del usuario autenticado
    name:  cred.user.displayName || cred.user.email.split('@')[0], // Nombre para mostrar; usa el prefijo del email si no hay displayName
  };
  localStorage.setItem('ns_user', JSON.stringify(loggedUser)); // Persiste la sesión inmediatamente en localStorage
  if (typeof updateLoginArea === 'function') updateLoginArea(); // Actualiza el área de usuario del header con el nombre del usuario
  if (typeof loadUserData    === 'function') loadUserData(); // Carga el carrito y los favoritos guardados del usuario
  _db.collection('users').doc(cred.user.uid).set( // Actualiza el documento del usuario en Firestore
    { lastLogin: firebase.firestore.FieldValue.serverTimestamp() }, // Registra la fecha y hora del acceso en el servidor
    { merge: true } // Combina con los datos existentes sin sobrescribir el resto del documento
  ).catch(e => console.warn('[auth] lastLogin update failed:', e)); // Registra el error en consola sin interrumpir el flujo de la tienda
}

// Cierre de sesión del usuario en la tienda
async function firebaseLogout() { // Cierra la sesión activa en Firebase Auth
  await _auth.signOut(); // Desautentica al usuario y dispara onAuthStateChanged con null
}

// Traducción de códigos de error de Firebase a mensajes legibles para el usuario
function firebaseErrorMsg(code) { // Devuelve el texto de error localizado que muestra el modal de login
  const key = 'auth.err.' + (code || '').replace('auth/', ''); // Construye la clave i18n a partir del código de error de Firebase
  const msg = (i18n[currentLang] || i18n.es)[key]; // Busca el mensaje traducido en el objeto i18n según el idioma activo
  return msg || t('auth.err.default'); // Devuelve el mensaje específico o el genérico si no existe traducción
}
