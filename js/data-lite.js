// Define las 16 categorías de la tienda con su icono y nombre en español e inglés
const CATEGORIES = [ // Array global con los objetos de cada categoría de C-Shop
  {id:'laptops',    icon:'💻', nameEs:'Portátiles',     nameEn:'Laptops'}, // Categoría de portátiles; enlaza a categoria.html?cat=laptops
  {id:'desktops',   icon:'🖥️', nameEs:'PCs Sobremesa',  nameEn:'Desktop PCs'}, // Categoría de PCs de sobremesa; enlaza a categoria.html?cat=desktops
  {id:'monitors',   icon:'🖵',  nameEs:'Monitores',      nameEn:'Monitors'}, // Categoría de monitores; enlaza a categoria.html?cat=monitors
  {id:'mobiles',    icon:'📱', nameEs:'Móviles',        nameEn:'Mobiles'}, // Categoría de teléfonos móviles; enlaza a categoria.html?cat=mobiles
  {id:'keyboards',  icon:'⌨️', nameEs:'Teclados',       nameEn:'Keyboards'}, // Categoría de teclados; enlaza a categoria.html?cat=keyboards
  {id:'mouse',      icon:'🖱️', nameEs:'Ratones',        nameEn:'Mouse'}, // Categoría de ratones; enlaza a categoria.html?cat=mouse
  {id:'headphones', icon:'🎧', nameEs:'Auriculares',    nameEn:'Headphones'}, // Categoría de auriculares; enlaza a categoria.html?cat=headphones
  {id:'components', icon:'🔩', nameEs:'Componentes PC', nameEn:'PC Components'}, // Categoría de componentes de PC; enlaza a categoria.html?cat=components
  {id:'printers',   icon:'🖨️', nameEs:'Impresoras',     nameEn:'Printers'}, // Categoría de impresoras; enlaza a categoria.html?cat=printers
  {id:'projectors', icon:'📽️', nameEs:'Proyectores',    nameEn:'Projectors'}, // Categoría de proyectores; enlaza a categoria.html?cat=projectors
  {id:'boards',     icon:'📋', nameEs:'Pizarras',       nameEn:'Boards'}, // Categoría de pizarras digitales; enlaza a categoria.html?cat=boards
  {id:'consoles',   icon:'🎮', nameEs:'Consolas',       nameEn:'Consoles'}, // Categoría de consolas de videojuegos; enlaza a categoria.html?cat=consoles
  {id:'redes',      icon:'📡', nameEs:'Redes',          nameEn:'Networks'}, // Categoría de equipos de red; enlaza a categoria.html?cat=redes
  {id:'sound',      icon:'🔊', nameEs:'Sonido',         nameEn:'Sound'}, // Categoría de equipos de sonido; enlaza a categoria.html?cat=sound
  {id:'cables',     icon:'🔌', nameEs:'Cables',         nameEn:'Cables'}, // Categoría de cables y adaptadores; enlaza a categoria.html?cat=cables
  {id:'furniture',  icon:'🪑', nameEs:'Mobiliario',     nameEn:'Furniture'}, // Categoría de mobiliario de oficina y gaming; enlaza a categoria.html?cat=furniture
];

// URLs de imágenes de Unsplash para cada tipo de componente de PC del configurador
const COMPONENT_IMAGES = { // Objeto que mapea cada tipo de componente con su imagen representativa en la tienda
  cpu:      'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=600&h=400&fit=crop', // Imagen del procesador para la tarjeta de CPU en el configurador
  gpu:      'https://images.unsplash.com/photo-1593640408182-31c228b5a7a6?w=600&h=400&fit=crop', // Imagen de la tarjeta gráfica para la tarjeta de GPU en el configurador
  ram:      'https://images.unsplash.com/photo-1562976527-1eade4b30f64?w=600&h=400&fit=crop', // Imagen de la memoria RAM para la tarjeta de RAM en el configurador
  ssd:      'https://images.unsplash.com/photo-1597872200101-ef47df6d58a4?w=600&h=400&fit=crop', // Imagen del almacenamiento SSD para la tarjeta de disco en el configurador
  mb:       'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop', // Imagen de la placa base para la tarjeta de motherboard en el configurador
  psu:      'https://images.unsplash.com/photo-1633427799709-b3d7b30e9359?w=600&h=400&fit=crop', // Imagen de la fuente de alimentación para la tarjeta de PSU en el configurador
  cool:     'https://images.unsplash.com/photo-1609591347882-6f9a1c25df96?w=600&h=400&fit=crop', // Imagen del sistema de refrigeración para la tarjeta de cooling en el configurador
  case:     'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=600&h=400&fit=crop', // Imagen de la caja de PC para la tarjeta de chasis en el configurador
  monitor:  'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&h=400&fit=crop', // Imagen del monitor para la tarjeta de pantalla en el configurador
  keyboard: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&h=400&fit=crop', // Imagen del teclado para la tarjeta de periférico de entrada en el configurador
  mouse:    'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=400&fit=crop', // Imagen del ratón para la tarjeta de periférico de entrada en el configurador
};

// Contenedor global de productos agrupados por categoría; lo rellena products.js
const ALL_PRODUCTS = {}; // Objeto vacío que products.js puebla con arrays de productos indexados por catId
