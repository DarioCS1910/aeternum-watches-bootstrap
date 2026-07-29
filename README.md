# Aeternum Watches - Bootstrap + Bootswatch Lux

Proyecto final UF1843: "Tecnicas de usabilidad y accesibilidad en el desarrollo de interfaces de usuario".

Web de venta de relojes minimalistas desarrollada como supuesto practico "El Gran Despliegue con Bootstrap y Bootswatch".

## Requisitos cumplidos

### 1. Identidad y estructura (Bootstrap + Bootswatch)
- Estructura base con Bootstrap 5 puro: sistema de rejilla (grid), navbar responsive con collapse, cards de producto, modal, formulario con validacion y carrusel.
- Tema oficial de Bootswatch "Lux" integrado via CDN (jsdelivr) y personalizado en css/styles.css: colores de marca (dorado/negro), navbar oscura, tipografia del hero, hover en cards, ajustes responsive propios.

### 2. Ingrediente externo (plantilla de Internet)
- Componentes adaptados conceptualmente de la plantilla gratuita "Shop Homepage" de Start Bootstrap (licencia MIT, basada en Bootstrap): seccion hero a pantalla completa con imagen de fondo, disposicion de galeria/catalogo de productos en cards y estructura de footer con redes sociales.
- Estos componentes se integraron y reestilizaron dentro de la estructura Bootstrap/Bootswatch del proyecto, no se copio la plantilla completa.

### 3. Interactividad y pulido
- Carrusel de Bootstrap con imagenes de producto.
- Modal dinamico: al pulsar "Ver detalles" en cualquier reloj, JavaScript rellena el modal con nombre, precio, imagen y descripcion segun el producto pulsado (event listener show.bs.modal).
- Filtro de categorias (Clasicos / Deportivos / Elegantes) mediante JavaScript puro, sin recargar la pagina.
- Validacion de formulario de contacto con feedback visual (Bootstrap validation + JS).
- Diseno 100% responsive (navbar colapsable, grid adaptativo, imagenes fluidas, media queries propias).
- Codigo HTML/CSS/JS comentado y organizado en carpetas css/, js/.

## Estructura del proyecto

aeternum-watches-bootstrap/
- index.html
- css/styles.css
- js/main.js
- README.md

## Como visualizar el proyecto

1. Clonar o descargar este repositorio (Code > Download ZIP).
2. Abrir index.html en el navegador, o usar la extension Live Server en Visual Studio Code.

## Tecnologias utilizadas

- HTML5 / CSS3
- Bootstrap 5.3 (CDN)
- Bootswatch 5.3 - tema Lux (CDN)
- Bootstrap Icons
- JavaScript (ES6, vanilla)
