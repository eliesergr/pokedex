# Pokedex

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) versión 15.2.0.

Esta es una aplicación web construida con Angular que permite buscar y mostrar detalles sobre diferentes Pokémon. La aplicación incluye paginación, filtrado por tipos, y muestra imágenes oficiales de los Pokémon.

## Decisiones de Diseño y Arquitectura
Estructura del Proyecto
Angular como Framework Principal: Se utilizó Angular para construir la aplicación debido a su robusta arquitectura basada en componentes, soporte para inyección de dependencias, y un sólido ecosistema de herramientas y bibliotecas.

Organización Modular: La aplicación está organizada en módulos separados para manejar diferentes áreas de funcionalidad, como PokedexModule para todas las funcionalidades relacionadas con Pokémon. Esto facilita la escalabilidad y el mantenimiento.
Rutas y Navegación

Enrutamiento Angular: Se utiliza el enrutador de Angular para gestionar la navegación entre diferentes vistas de la aplicación. Las rutas están definidas en un archivo de configuración de rutas, permitiendo una navegación fluida y el manejo de rutas anidadas.
Redirección y Manejo de Errores: Se ha configurado un archivo _redirects para Netlify para manejar el enrutamiento en el lado del cliente, asegurando que las rutas de la aplicación SPA funcionen correctamente incluso cuando se accede directamente a una ruta específica.

## Diseño de Componentes
Componentes Reutilizables: Los componentes están diseñados para ser reutilizables en diferentes partes de la aplicación. Esto incluye componentes como pokemon-card para mostrar información de un Pokémon en una tarjeta.
CSS y Estilos: Los estilos se manejan principalmente con CSS y clases personalizadas. Se utiliza Flexbox y Grid para la disposición de los elementos, asegurando un diseño responsivo que se ajusta a diferentes tamaños de pantalla.

## Construcción y Despliegue
Scripts de Construcción: Se utilizan scripts de construcción en package.json para compilar y desplegar la aplicación. Los scripts incluyen comandos para construir la aplicación en diferentes modos (ng build, ng build --watch) y para preparar los archivos para GitHub Pages o Netlify.
Despliegue en Netlify: La aplicación se despliega en Netlify utilizando un archivo _redirects para manejar las rutas en el cliente. La construcción automática se activa con cada push al repositorio de GitHub.

## Consideraciones Futuras
Escalabilidad: La arquitectura modular está diseñada para permitir la fácil adición de nuevas funcionalidades y características en el futuro.
Optimización: A medida que la aplicación crece, se planifican mejoras en la optimización del rendimiento, como la carga diferida de módulos y optimización de imágenes.

## Gestión de Estado y Servicios
Servicios para Llamadas a APIs: Los servicios Angular se utilizan para manejar las llamadas a las APIs, como el PokemonService para obtener datos sobre Pokémon. Esto promueve una separación clara entre la lógica de la aplicación y las operaciones de red.
Observables y RxJS: Se utilizan Observables y operadores de RxJS para gestionar el flujo de datos y manejar asincronía en la aplicación. Esto proporciona una manera eficiente de trabajar con datos que llegan de forma asíncrona, como la respuesta de una API.

## Requisitos Previos

Asegúrese de tener las siguientes herramientas instaladas en tu máquina antes de comenzar:

- **Node.js**: [Descargar Node.js](https://nodejs.org/) (versión recomendada: 16.x o superior)
- **Angular CLI**: Si aún no lo tienes instalado, ejecuta el siguiente comando para instalarlo globalmente:
  ```bash
  npm install -g @angular/cli@15.2.0

  git clone https://https://github.com/eliesergr/pokedex.git


## Servidor de desarrollo

Ejecute `ng serve` para un servidor de desarrollo. Navegue hasta `http://localhost:4200/`. La aplicación se recargará automáticamente si cambias alguno de los archivos fuente.

## Build

Ejecute `ng build` para construir el proyecto. Los artefactos de construcción se almacenarán en el directorio `dist/`.

## Ejecutar en netlify

https://jolly-stardust-9b4626.netlify.app




