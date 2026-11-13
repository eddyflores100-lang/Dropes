# Preparación para producción

Este documento separa lo que el prototipo demuestra de lo que todavía debe construirse antes de aceptar pedidos reales.

## Estado funcional

| Área | Estado |
| --- | --- |
| Interfaz responsive y navegación | Implementada en el frontend |
| Catálogo, categorías y detalle | Interfaz de demostración |
| Carrito y cantidades | Estado local del navegador |
| Creación de pedidos | Deshabilitada |
| Cobros con tarjeta / Bizum | No implementados |
| Integración logística | No habilitada |
| Persistencia de clientes y pedidos | No implementada |
| Newsletter y consentimiento | Formulario visual; sin proveedor conectado |

## Bloqueadores antes de lanzar

1. **Backend de pedidos:** crear un endpoint autenticado y validado. El navegador nunca debe llamar directamente a la API privada de un proveedor.
2. **Rotación de credenciales:** revocar las claves que hayan estado en el frontend o en el historial del repositorio y generar credenciales nuevas en el panel del proveedor.
3. **Catálogo confiable:** recuperar precio, SKU, stock, impuestos, coste de envío y disponibilidad desde el servidor. No confiar en importes enviados por el cliente.
4. **Pagos:** integrar una pasarela autorizada en modo sandbox, verificar firmas de webhooks y hacer idempotente la confirmación de pedidos.
5. **Privacidad:** publicar avisos legales y política de privacidad, definir base jurídica, minimización, retención, borrado y canal de contacto.
6. **Operaciones:** definir estados de pedido, cancelación, reembolso, soporte, trazabilidad y alertas de fallos.
7. **Calidad:** añadir pruebas unitarias, pruebas de componentes, pruebas E2E del carrito y checkout simulado, accesibilidad y revisión móvil.

## Criterios de aceptación

- Ningún secreto aparece en el bundle del navegador ni en los logs.
- El servidor recalcula el total a partir del catálogo autoritativo.
- Un pedido solo aparece como confirmado tras una respuesta válida del proveedor.
- Los webhooks se verifican y procesan de forma idempotente.
- La interfaz informa con claridad de errores, disponibilidad y estado del pedido.
- Las páginas legales y los datos comerciales corresponden a la entidad que realmente opera la tienda.
- CI ejecuta instalación reproducible, TypeScript, build y pruebas automatizadas.

## Modo demo

Mientras estos bloqueadores estén pendientes, utiliza únicamente datos ficticios. El checkout de este repositorio está desactivado intencionalmente y no debe presentarse como una pasarela operativa.
