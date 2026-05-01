export const thorondorDocumentation = `
# Thorondor como SIEM personal

Thorondor es una consola local de observabilidad y seguridad para hosts propios. El modelo es deliberadamente simple:
cada host ejecuta un agente Python, el navegador consulta a esos agentes por HTTP y la aplicacion conserva historico en
IndexedDB. No hay backend, broker, cola de mensajes ni almacenamiento remoto.

## Componentes

- **Agente Python**: proceso HTTP ligero instalado en Linux o Windows. Expone \`/health\` y \`/telemetry\`.
- **Frontend Vue**: registra agentes, ejecuta polling, normaliza la telemetria y pinta dashboard, detalle y alertas.
- **IndexedDB**: base local del navegador para snapshots, eventos, logs, reglas, alertas y estado de conexion.
- **Motor de reglas**: evaluacion JavaScript de umbrales, heartbeat, autenticacion, sudo e integridad de ficheros.

## Telemetria

El payload de \`/telemetry\` se organiza en bloques estables:

- \`system\`: hostname, IP, sistema operativo, kernel, arquitectura y uptime.
- \`metrics\`: CPU, memoria, swap, discos, procesos, interfaces de red y temperaturas si el sistema las expone.
- \`security\`: logins, fallos de autenticacion, sudo, usuarios nuevos y cambios en ficheros criticos.
- \`logs\`: entradas recientes de syslog, journal, kernel o rutas adicionales configuradas.
- \`heartbeat\`: timestamp de captura usado para detectar caidas o agentes congelados.

## Comunicacion

El navegador hace peticiones HTTP al agente usando la IP privada y el puerto configurado. El host no llama al frontend.
Eso reduce dependencias, pero exige conectividad directa desde el navegador al puerto del agente. Si hay firewall local,
la regla debe permitir el origen real del cliente.

## Persistencia y retencion

Thorondor guarda solo datos operativos: agentes registrados, snapshots resumidos, eventos, logs recientes, reglas,
alertas y conexiones. La purga automatica elimina historico antiguo para evitar que IndexedDB crezca sin control.

## Limites

- No sustituye a un SIEM empresarial multiusuario.
- No hace respuesta automatica tipo EDR.
- No centraliza datos fuera del navegador.
- No debe exponerse a Internet sin autenticacion, TLS y controles de red adicionales.

## Uso recomendado

Empieza con un solo host, valida \`/health\` y \`/telemetry\`, registra el agente en el dashboard y ajusta reglas. Cuando
el primer flujo sea estable, replica el agente en el resto de sistemas y usa la vista de reglas para adaptar umbrales al
rol de cada maquina.
`;
