# Portafolio de Impresión 3D
En este proyecto estoy generando una simulacion de un sitio web donde presento algunos de mis trabajos en impresion 3d, mostrando un gif de una de mis impresoras
 en funcionamiento en la pantalla principal, ofreciendo una lista de navegacion con elementos como 
 "Galeria" que redirigirá a una pagina donde en principio se ven 6 miniaturas 
 que al clickear alguna de ellas abre un modal( recurso que aprendi a utilizar en desarrollo de aplicaciones) donde hay un carrusel de imagenes que muestran la pieza
 desde diferentes perspectivas. 
 El boton "Pedidos" contiene un formulario donde se pueden ingresar datos de contacto, la pieza o figura que se desee realizar, y detalles tecnicos como medidas, si se desa pintado etc, se ofrece la opcion de ingresar el link de un repositorio de modelos 3d lo tiene como referencia(mas adelante si se ingresa el link se autocompletaran algunos campos)
 , el boton "Sobre mi" da un breve mensaje sobre mi emprendimiento.
 Hay algunos botones de navegacion como "Impresión 3D- Mi Portafolio" que nos dirige al index.html y las leyendas "Nova_imp" redirigen a mi perfil de instagram.
 En el boton "Productos" se consume la API DummyJSON donde traer un catalogo de productos que se pueden agregar a un carrito de compras, incluye un submenu desplegable que te direcciona a las diferentes secciones de la pagina.
 La pagina Carrito se puede acceder desde el boton con el icono de un carro de compras, para agregar mas productos, eliminar, vaciar el carrito o finalizar la compra(actualmente lleva a la pagina de inicio)
  
## Características principales

- **Estructura semántica y unificada**: Uso de etiquetas HTML5 (`header`, `nav`, `main`, `section`, `footer`) y un header/nav consistente en todas las páginas.
- **Galería multimedia**: Carrusel y modales para visualizar trabajos realizados, con navegación por miniaturas, cierre por click fuera/Escape y visualización previa, principal y siguiente.
- **Productos**: Consumo de la API [dummyjson](https://dummyjson.com/products) para mostrar productos en cards responsivas.
- **Carrito de compras dinámico**: Añade productos al carrito desde cualquier página, edita cantidades, elimina productos y guarda el estado en `localStorage`. El contador del carrito en el header se sincroniza en tiempo real entre todas las páginas abiertas.
- **Formulario de contacto y pedidos**: Envío de mensajes usando Formspree, con validación de campos, feedback al usuario y mensajes de error accesibles.
- **Reseñas**: Sección de testimonios de clientes usando CSS Grid.
- **Responsividad**: Diseño adaptable a dispositivos móviles y escritorio usando Flexbox, Grid y media queries.
- **Accesibilidad**: Navegación con teclado, foco visible, contraste adecuado, etiquetas `alt` descriptivas y roles ARIA donde corresponde.
- **SEO**: Metaetiquetas (`description`, `keywords`, `author`, `viewport`, `title`) y estructura optimizada para buscadores.
- **Sincronización en tiempo real**: El contador del carrito se actualiza automáticamente en todas las páginas abiertas mediante el evento `storage` de `localStorage`.

## Estructura de archivos

- `index.html`: Página principal.
- `galeria.html`: Galería multimedia con carrusel y modales.
- `productos.html`: Catálogo de productos con consumo de API y carrito.
- `pedidos.html`: Formulario de pedidos personalizados.
- `carrito.html`: Visualización y edición del carrito de compras.
- `styles.css`: Estilos globales, responsividad, fuentes y mejoras de accesibilidad.
- `script.js`: Lógica de interactividad, consumo de API, validaciones, galería, sincronización y carrito.
- `imagenes/`: Carpeta con imágenes de trabajos y productos.
- `gif/`: Carpeta con animaciones GIF para la portada.

## Recursos y librerías utilizadas

- [Google Fonts - Roboto](https://fonts.google.com/specimen/Roboto)
- [Font Awesome 6.4.0](https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css)
- [DummyJSON API](https://dummyjson.com/products) para productos de ejemplo
- [Formspree](https://formspree.io/) para envío de formularios

**Autor:** Santiago Isbanner

¡Gracias por visitar mi portafolio!
