export const thorondorDocumentation = `
# Thorondor como SIEM personal

Thorondor esta pensado para **uso personal, domestico, educativo o de laboratorio**. No pretende convertirse en una consola corporativa ni en una plataforma multiempresa. Su valor esta en ofrecer visibilidad real sobre varios sistemas Linux desde una interfaz web local, sin obligarte a desplegar una infraestructura pesada.

## Que es exactamente

Thorondor une tres piezas:

- un **agente Python** que se instala en cada host Linux
- una **interfaz web** en Vue que consulta a esos hosts
- una **persistencia local** en IndexedDB para mantener historico, alertas y contexto

La aplicacion funciona dentro de tu navegador. Eso significa que la inteligencia visual, la correlacion basica y las reglas viven en el frontend.

## Que recopila el agente

El agente responde con JSON cuando la web lo consulta. En ese JSON puede incluir:

- identidad del sistema: hostname, IP local, distro, kernel, arquitectura y uptime
- metricas: CPU total y por nucleo, RAM, swap, discos, procesos, interfaces y trafico
- seguridad: logins fallidos, logins exitosos, comandos sudo, usuarios nuevos y cambios en archivos criticos
- red: puertos en escucha, conexiones y datos de interfaces
- logs: syslog, journal, kernel y logs adicionales configurados por el usuario

No esta disenado para extraerlo todo sin limite, sino para quedarse con lo que tiene mas valor operativo para una consola ligera.

## Como se comunican el navegador y Linux

El navegador hace peticiones HTTP al host Linux usando su **IP privada** y el **puerto** configurado en el agente. El host devuelve respuestas JSON listas para pintar en dashboard, detalle, alertas y timeline.

Esto implica varias cosas importantes:

- no dependes de un backend intermedio
- no necesitas abrir el router a Internet para usarlo dentro de tu red
- el navegador debe tener conectividad real con la IP privada del host
- si el firewall local del host bloquea el puerto, la web no podra consultar el agente

## Que guarda la aplicacion y durante cuanto tiempo

Thorondor guarda en IndexedDB solo lo necesario para trabajar con continuidad:

- inventario de agentes registrados
- historico resumido de snapshots
- eventos de seguridad
- logs recientes utiles
- alertas activas o revisadas
- reglas de monitorizacion
- historial de conexiones del navegador con cada host
- borrador del formulario del generador mientras todavia no has generado los ficheros

La retencion esta limitada para evitar saturar memoria cuando el navegador lleva dias o semanas recogiendo datos. La aplicacion purga historico antiguo de forma automatica.

## Que no hace Thorondor

Conviene dejar claras sus fronteras:

- no comparte datos con terceros por defecto
- no crea una consola multiusuario corporativa
- no sustituye un SIEM empresarial con correlacion centralizada
- no hace respuesta automatica tipo EDR
- no incorpora backend propio para almacenar la telemetria fuera del navegador

## Donde encaja bien

Thorondor tiene sentido en escenarios como estos:

- homelabs
- servidores personales
- maquinas Linux de laboratorio
- formacion y practicas
- pequenos entornos que quieras observar desde una sola maquina cliente

## Requisitos minimos del sistema monitorizado

En el host Linux necesitas, como minimo:

- Python 3.7 o superior
- conectividad con el navegador dentro de la red
- permisos suficientes para leer logs y consultar informacion del sistema
- capacidad para mantener un proceso escuchando en el puerto configurado

Algunas capacidades adicionales, como journalctl, sensores o ciertos logs de seguridad, dependen de la distribucion y de los permisos del usuario del servicio.

## Modelo mental recomendado para usuarios no expertos

La forma mas simple de entenderlo es esta:

1. generas el agente desde la web
2. lo instalas en el host Linux
3. compruebas que responde por HTTP
4. registras el host en la consola
5. revisas dashboard, detalle, alertas y reglas

Si el primer host funciona bien, ya puedes replicar el mismo flujo en otros equipos.

## Idea clave

Thorondor no intenta ser el SIEM mas grande. Intenta ser uno **claro, controlable y util** para quien necesita observar varios Linux desde su propio navegador, con el maximo contexto practico y el minimo despliegue adicional.
`;
