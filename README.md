# Chronos Élite - Relojería de alta gama (Bootstrap + Bootswatch Lux)

Proyecto final UF1843: "Tecnicas de usabilidad y accesibilidad en el desarrollo de interfaces de usuario".

Web de venta de relojes de marcas de alto reconocimiento (Rolex, Omega, Cartier, Longines, Seiko, TAG Heuer) con carrito de compra y checkout completo, desarrollada como supuesto practico "El Gran Despliegue con Bootstrap y Bootswatch".

## Demo
Sitio publicado con GitHub Pages: https://dariocs1910.github.io/aeternum-watches-bootstrap/

## Requisitos cumplidos

### 1. Identidad y estructura (Bootstrap + Bootswatch)
- Estructura base con Bootstrap 5 puro: sistema de rejilla (grid), navbar responsive con collapse, cards de producto, modales, offcanvas, formularios con validacion y carrusel.
- Tema oficial de Bootswatch "Lux" integrado via CDN (jsdelivr) y personalizado en css/styles.css: paleta de marca, navbar oscura, hero a pantalla completa, hover en cards, estilos del stepper de checkout.

### 2. Ingrediente externo (plantilla de Internet)
- Componentes adaptados conceptualmente de la plantilla gratuita "Shop Homepage" de Start Bootstrap (licencia MIT, basada en Bootstrap): seccion hero a pantalla completa con imagen de fondo, disposicion de galeria/catalogo de productos en cards y estructura de footer con redes sociales.
- Estos componentes se integraron y reestilizaron dentro de la estructura Bootstrap/Bootswatch del proyecto, no se copio la plantilla completa.

### 3. Catalogo de producto
- 6 relojes reales de marcas de alto reconocimiento en el sector: Rolex Submariner Date, Omega Speedmaster Moonwatch, Cartier Tank Must, Longines Master Collection, Seiko Prospex Diver y TAG Heuer Carrera Chronograph.
- Filtro de categorias (Clasicos / Deportivos / Elegantes) mediante JavaScript puro, sin recargar la pagina.
- Modal dinamico de detalle: al pulsar "Ver detalles", JavaScript rellena el modal con marca, nombre, precio, imagen y descripcion, y permite elegir variacion de correa, talla de caja y cantidad.

### 4. Carrito de compra
- Carrito lateral (offcanvas) accesible desde la navbar, con contador de unidades en tiempo real.
- Añadir productos con sus variaciones (correa, talla, cantidad), aumentar/disminuir cantidad, eliminar productos.
- Calculo de subtotal en tiempo real.
- Persistencia de los datos del carrito en localStorage (se mantiene aunque se recargue la pagina).

### 5. Checkout completo (4 pasos)
1. **Datos de envio**: formulario con validacion (nombre, email, direccion, CP, ciudad, telefono).
2. **Tipo de entrega**: estandar (gratis), express 24-48h (19€), premium con seguro 24h (45€) o recogida en tienda (gratis).
3. **Metodo de pago**: tarjeta (con validacion de campos), PayPal o transferencia bancaria (simulados, sin pasarela real).
4. **Resumen y confirmacion**: desglose de productos, subtotal, gastos de envio y total; genera un numero de pedido y confirma la compra, vaciando el carrito.

### 6. Interactividad adicional
- Carrusel de Bootstrap con imagenes de los relojes destacados.
- Validacion de formulario de contacto con feedback visual (Bootstrap validation + JS).
- Codigo comentado y organizado por bloques funcionales en js/main.js.

## Estructura del proyecto
```
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
└── README.md
```

## Tecnologias
- HTML5 semantico
- Bootstrap 5.3 + Bootswatch Lux
- Bootstrap Icons
- JavaScript (ES6, vanilla, sin frameworks)
- localStorage para persistencia del carrito


## Actualizacion: seccion FAQ y extraccion de plantilla externa

### Componente FAQ (Bootstrap Accordion)
Se incorporo una seccion de Preguntas Frecuentes utilizando el componente Accordion de Bootstrap 5. La estructura visual y de contenido (agrupacion de preguntas sobre garantia, envios, devoluciones y metodos de pago) se tomo como referencia de la plantilla gratuita "Luxury" de TemplatesJungle (https://demo.templatesjungle.com/luxury/), adaptando el HTML al sistema de clases de Bootstrap 5 y al tema Bootswatch Lux ya utilizado en el proyecto, en lugar de copiar el CSS original de la plantilla.

### Proceso de extraccion (punto 2 del enunciado)
1. Se localizo una plantilla externa gratuita de tematica relojera/lujo (Luxury - TemplatesJungle).
2. Se identificaron componentes reutilizables: seccion destacada a pantalla completa y bloque de preguntas frecuentes.
3. Se extrajo unicamente la estructura y el proposito de cada componente (no el CSS ni JS original).
4. Se reconstruyeron con clases nativas de Bootstrap 5 y variables del tema Lux para mantener coherencia visual con el resto del sitio.
5. Se documenta aqui el origen para trazabilidad academica.

### Accesibilidad y usabilidad (UF1843)
- Uso de etiquetas semanticas (nav, section, footer) y encabezados jerarquicos.
- Botones del accordion con atributos aria (data-bs-toggle, aria-expanded gestionados por Bootstrap).
- Contraste de color verificado con el tema Lux (texto oscuro sobre fondos claros y viceversa).
- Formularios con etiquetas (label) asociadas a cada campo y validacion visual.
- Navegacion por teclado soportada de forma nativa por los componentes de Bootstrap (modales, offcanvas, accordion, navbar).
