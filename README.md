# Dropes — experiencia de tienda online

Dropes es un prototipo de storefront en React y Vite orientado a una experiencia de compra para España y Portugal. Incluye una portada comercial, catálogo visual, categorías, fichas de producto, carrito local y pantallas de checkout de demostración.

> **Estado actual: prototipo / demo.** El catálogo y el carrito sirven para validar la interfaz. La creación de pedidos, los pagos y la integración de logística no están habilitados para clientes reales. El checkout se mantiene desactivado hasta disponer de un backend seguro y credenciales protegidas.

## Vista general

- **Frontend:** React 19, TypeScript, Vite y Tailwind CSS.
- **Interfaz:** componentes reutilizables, animaciones y diseño responsive.
- **Experiencia:** portada, promociones, productos destacados, categorías, testimonios, newsletter, carrito y detalle de producto.
- **Mercados objetivo de la demo:** España y Portugal.
- **Estado de datos:** el carrito se mantiene en memoria del navegador; no representa una orden confirmada ni una compra persistida.

## Inicio rápido

Requisitos: Node.js 22 o superior y npm.

```bash
git clone https://github.com/eddyflores100-lang/Dropes.git
cd Dropes
npm ci
npm run dev
```

Vite muestra la dirección local en la terminal (por defecto, puerto 3000).

## Comandos

| Comando | Uso |
| --- | --- |
| `npm run dev` | Servidor local de desarrollo |
| `npm run build` | Compila la aplicación para producción |
| `npm run preview` | Sirve localmente el build generado |
| `npm run lint` | Ejecuta la comprobación TypeScript configurada |
| `npm run clean` | Elimina el directorio `dist/` |

## Estructura principal

```text
src/
  components/   Secciones y componentes de la tienda
  App.tsx       Estado y composición de la experiencia
  main.tsx      Punto de entrada React
  index.css     Estilos globales
index.html      Documento HTML y metadatos
vite.config.ts  Configuración de Vite
```

## Seguridad y preparación para producción

- No se deben incluir claves de proveedores en componentes React, variables `VITE_*` ni archivos enviados al navegador.
- El checkout está deliberadamente deshabilitado en el frontend. Antes de activarlo se necesita un endpoint backend que valide productos, precios, cantidades, disponibilidad y país; mantenga las credenciales en secretos del servidor; y confirme la orden con la respuesta del proveedor.
- Los pagos con tarjeta o Bizum requieren una pasarela real, validación de webhook y estados de pedido verificables. La selección visual de un método de pago no procesa un cobro.
- No recopiles nombres, direcciones, teléfonos o correos hasta publicar una política de privacidad, definir retención y proteger el flujo de pedidos.
- Los mensajes promocionales, reseñas, disponibilidad, envío gratis y descuentos deben conectarse a datos verificables antes de una publicación comercial.
- Cualquier credencial que haya aparecido en el código fuente o en el historial de Git debe revocarse y reemplazarse desde el proveedor. Eliminarla del último commit no invalida copias anteriores.

Consulta [la guía de preparación para producción](docs/LAUNCH_READINESS.md) antes de conectar servicios externos.

## Desarrollo

1. Mantén la lógica de interfaz en componentes pequeños dentro de `src/components/`.
2. Ejecuta `npm ci`, `npm run lint` y `npm run build` antes de abrir un pull request.
3. No publiques secretos, datos de clientes ni capturas con información personal.
4. Documenta cualquier integración externa con su endpoint, propietario de credenciales, modo de prueba y procedimiento de rollback.

## Estado y contribuciones

Este repositorio está en fase de prototipo. Las contribuciones deben incluir una descripción del cambio, pasos de reproducción y pruebas ejecutadas.

- Código: [GitHub](https://github.com/eddyflores100-lang/Dropes)
- Incidencias y mejoras: [Issues](https://github.com/eddyflores100-lang/Dropes/issues)
- Historial de versiones: [Releases](https://github.com/eddyflores100-lang/Dropes/releases)

No se ofrece todavía una tienda transaccional ni se garantiza el procesamiento de pedidos.
