<template>
    <ThorondorPageShell>
        <section class="section-box intro-box">
            <div class="section-topline">
                <div class="module-header">
                    <span class="section-kicker">Guia practica</span>
                    <h1 class="section-name">Guia de instalacion</h1>
                    <p class="section-copy">
                        Esta vista esta pensada para seguirla mientras preparas el host Linux. Todo esta ordenado por
                        secuencia real de uso: descubrir datos, preparar la maquina, instalar dependencias, lanzar el
                        agente, validar respuestas y dejarlo en systemd.
                    </p>
                </div>
                <div class="phase-badge-block">
                    <span class="phase-badge">Install</span>
                    <small>Recorrido completo para usuarios no expertos.</small>
                </div>
            </div>

            <div class="guide-grid">
                <div class="guide-card" v-for="item in installationHighlights" :key="item.label">
                    <label>{{ item.label }}</label>
                    <span>{{ item.copy }}</span>
                </div>
            </div>
        </section>

        <section class="section-box">
            <div class="section-topline">
                <div class="module-header">
                    <span class="section-kicker">Secuencia recomendada</span>
                    <h2 class="module-title">Orden sugerido de principio a fin</h2>
                    <p class="module-copy">
                        Si sigues este orden, evitas la mayoria de bloqueos tipicos: no saber que IP usar, no tener
                        permisos de lectura, o intentar systemd antes de comprobar que el agente funciona en manual.
                    </p>
                </div>
                <div class="phase-badge-block">
                    <span class="phase-badge">Checklist</span>
                    <small>Pasos enlazados con el flujo real de despliegue.</small>
                </div>
            </div>

            <div class="card-grid">
                <article class="tool-card" v-for="step in installSteps" :key="step.title">
                    <div class="card-head">
                        <h5>{{ step.title }}</h5>
                        <span class="mini-badge">{{ step.badge }}</span>
                    </div>
                    <p class="section-copy mb-0">{{ step.copy }}</p>
                </article>
            </div>
        </section>

        <section v-for="section in commandSections" :key="section.title" class="section-box">
            <div class="section-topline">
                <div class="module-header">
                    <span class="section-kicker">{{ section.kicker }}</span>
                    <h2 class="module-title">{{ section.title }}</h2>
                    <p class="module-copy">{{ section.copy }}</p>
                </div>
                <div class="phase-badge-block">
                    <span class="phase-badge">{{ section.badge }}</span>
                    <small>{{ section.note }}</small>
                </div>
            </div>

            <div class="command-stack">
                <article class="tool-card command-card" v-for="command in section.commands" :key="command.command">
                    <div class="card-head">
                        <h5>{{ command.title }}</h5>
                        <span class="mini-badge">{{ command.badge }}</span>
                    </div>
                    <div class="output-box mb-3">
                        <pre class="result-pre">{{ command.command }}</pre>
                    </div>
                    <div class="command-meta">
                        <div class="meta-line">
                            <label>Que hace</label>
                            <p>{{ command.purpose }}</p>
                        </div>
                        <div class="meta-line">
                            <label>Cuando usarlo</label>
                            <p>{{ command.when }}</p>
                        </div>
                        <div class="meta-line">
                            <label>Resultado esperado</label>
                            <p>{{ command.expected }}</p>
                        </div>
                    </div>
                </article>
            </div>
        </section>

        <section class="section-box">
            <div class="section-topline">
                <div class="module-header">
                    <span class="section-kicker">Verificacion final</span>
                    <h2 class="module-title">Comprobaciones rapidas antes de pasar al dashboard</h2>
                    <p class="module-copy">
                        Si estas comprobaciones salen bien, el navegador ya deberia poder consultar el host y guardar
                        telemetria en IndexedDB sin pasos adicionales.
                    </p>
                </div>
                <div class="phase-badge-block">
                    <span class="phase-badge">Validate</span>
                    <small>Estado del servicio, puerto y endpoints.</small>
                </div>
            </div>

            <div class="guide-grid">
                <div class="guide-card" v-for="check in validationChecks" :key="check.label">
                    <label>{{ check.label }}</label>
                    <span>{{ check.copy }}</span>
                </div>
            </div>
        </section>
    </ThorondorPageShell>
</template>

<script>
import ThorondorPageShell from "@/features/vueloThorondor/components/ThorondorPageShell.vue";

export default {
    name: "ThorondorGuiaInstalacionView",

    components: {
        ThorondorPageShell
    },

    computed: {
        installationHighlights() {
            return [
                {
                    label: "Todo en orden real",
                    copy: "La guia sigue la secuencia natural de una instalacion: descubrir, preparar, instalar, validar y automatizar."
                },
                {
                    label: "Con explicacion",
                    copy: "Cada comando indica para que sirve, cuando ejecutarlo y que deberias esperar como resultado."
                },
                {
                    label: "Sin backend intermedio",
                    copy: "El objetivo final es que el navegador llegue por HTTP al host Linux a traves de su IP privada y puerto."
                },
                {
                    label: "Orientada a principiantes",
                    copy: "Si no recuerdas de donde sacar la IP, la distro o el kernel, aqui tienes el comando exacto para cada dato."
                }
            ];
        },

        installSteps() {
            return [
                {
                    title: "1. Descubrir informacion del host",
                    badge: "Inventario",
                    copy: "Recoge distro, version, hostname, IP privada, kernel y usuarios conectados antes de tocar nada en la instalacion."
                },
                {
                    title: "2. Generar los archivos desde la web",
                    badge: "Generador",
                    copy: "Usa la vista de generador para obtener el agente Python, la unidad systemd y el script de apoyo con la configuracion del host."
                },
                {
                    title: "3. Preparar carpeta y usuario",
                    badge: "Base",
                    copy: "Crea una ruta estable de trabajo y ajusta permisos para que el agente pueda ejecutarse y mantener su baseline."
                },
                {
                    title: "4. Instalar dependencias",
                    badge: "Python",
                    copy: "Asegura Python 3, pip, psutil y las herramientas complementarias que dan contexto a metricas, sensores y logs."
                },
                {
                    title: "5. Validar a mano",
                    badge: "Manual",
                    copy: "Primero comprueba que el script responde en manual. Solo despues de eso compensa integrarlo en systemd."
                },
                {
                    title: "6. Automatizar y revisar",
                    badge: "systemd",
                    copy: "Deja el servicio habilitado al arranque y confirma health, telemetry, puerto y logs del sistema."
                }
            ];
        },

        commandSections() {
            return [
                {
                    kicker: "Paso 1",
                    title: "Descubrir los datos que te pedira el formulario",
                    copy: "Estos comandos te ayudan a completar correctamente la pantalla de generador sin tener que adivinar nada.",
                    badge: "Discover",
                    note: "Hostname, distro, kernel, IP y usuarios.",
                    commands: [
                        {
                            title: "Ver la distribucion y version",
                            badge: "SO",
                            command: "cat /etc/os-release",
                            purpose: "Muestra el nombre de la distribucion, su identificador y la version aproximada.",
                            when: "Usalo antes de rellenar el campo de distribucion y version del sistema.",
                            expected: "Deberias ver lineas como NAME, VERSION y ID con valores tipo Ubuntu 22.04 o Rocky Linux 9."
                        },
                        {
                            title: "Identidad extendida del host",
                            badge: "Host",
                            command: "hostnamectl",
                            purpose: "Resume hostname, kernel, arquitectura y sistema base en una sola salida.",
                            when: "Muy util cuando quieres validar nombre del host, kernel y arquitectura sin lanzar varios comandos separados.",
                            expected: "Una ficha textual con el nombre del equipo, sistema operativo, kernel y arquitectura."
                        },
                        {
                            title: "Nombre corto del host",
                            badge: "Host",
                            command: "hostname",
                            purpose: "Devuelve solo el nombre corto del sistema.",
                            when: "Ideal para decidir el identificador visible del host dentro de Thorondor.",
                            expected: "Una sola linea con el hostname actual."
                        },
                        {
                            title: "IP privada rapida",
                            badge: "IP",
                            command: "hostname -I",
                            purpose: "Lista las direcciones IP locales que tiene asignadas el host.",
                            when: "Usalo para saber que IP privada debe consultar el navegador.",
                            expected: "Una o varias IPs privadas como 192.168.x.x o 10.x.x.x."
                        },
                        {
                            title: "Detalle de red",
                            badge: "Red",
                            command: "ip addr show",
                            purpose: "Muestra interfaces, estados e IPs de forma mas completa que hostname -I.",
                            when: "Usalo cuando el host tiene varias interfaces y necesitas identificar cual esta en la red correcta.",
                            expected: "La lista de interfaces con su direccion IPv4 y estado."
                        },
                        {
                            title: "Kernel y arquitectura",
                            badge: "Kernel",
                            command: "uname -r\nuname -m",
                            purpose: "Separa version del kernel y arquitectura del procesador.",
                            when: "Util cuando quieras anotar ambos valores por separado o revisar compatibilidad del host.",
                            expected: "Por ejemplo 6.8.x para el kernel y x86_64 o aarch64 para la arquitectura."
                        },
                        {
                            title: "Usuarios conectados ahora mismo",
                            badge: "Usuarios",
                            command: "who\nw",
                            purpose: "Permite comprobar quienes estan conectados y que estan ejecutando en este momento.",
                            when: "Sirve como referencia inicial y tambien para entender despues la informacion que devolvera el agente.",
                            expected: "Una lista de sesiones y, con w, mas detalle sobre actividad y tiempos."
                        }
                    ]
                },
                {
                    kicker: "Paso 2",
                    title: "Preparar carpeta, permisos y grupos de lectura",
                    copy: "Una ruta ordenada y permisos correctos evitan muchos problemas cuando el agente intenta leer logs o mantener su baseline.",
                    badge: "Prepare",
                    note: "Ruta estable y acceso a logs.",
                    commands: [
                        {
                            title: "Crear carpeta de trabajo",
                            badge: "Ruta",
                            command: "sudo mkdir -p /opt/thorondor-agent",
                            purpose: "Crea la ruta donde guardaras el agente, la baseline de integridad y ficheros auxiliares.",
                            when: "Hazlo justo despues de generar los archivos y antes de copiarlos al host.",
                            expected: "La carpeta queda creada aunque no existiera antes."
                        },
                        {
                            title: "Dar propiedad al usuario actual",
                            badge: "Permisos",
                            command: "sudo chown -R $USER:$USER /opt/thorondor-agent",
                            purpose: "Asigna el control de esa carpeta al usuario con el que estas trabajando.",
                            when: "Usalo si vas a copiar alli el .py, el .service y el resto del material generado.",
                            expected: "Podras escribir dentro de la carpeta sin seguir usando sudo para cada fichero."
                        },
                        {
                            title: "Entrar en la carpeta",
                            badge: "Shell",
                            command: "cd /opt/thorondor-agent",
                            purpose: "Te situa en la ruta donde se ejecutara y mantendra el agente.",
                            when: "Ejecutalo antes de copiar ficheros o lanzar pruebas manuales.",
                            expected: "Tu shell cambia al directorio de trabajo del agente."
                        },
                        {
                            title: "Permitir lectura de auth.log y secure",
                            badge: "Logs",
                            command: "sudo usermod -aG adm <USUARIO>",
                            purpose: "Anade el usuario del servicio al grupo que suele tener acceso a logs administrativos en Debian, Ubuntu y derivadas.",
                            when: "Usalo si el agente necesita leer auth.log u otros logs restringidos.",
                            expected: "El usuario queda agregado al grupo adm; normalmente tendras que cerrar sesion o reiniciar el servicio para que aplique."
                        },
                        {
                            title: "Permitir lectura de journalctl",
                            badge: "Journal",
                            command: "sudo usermod -aG systemd-journal <USUARIO>",
                            purpose: "Da acceso al journal del sistema sin convertir al usuario en root.",
                            when: "Recomendado si quieres que el agente consulte journalctl y eventos del sistema con mas contexto.",
                            expected: "El usuario queda asociado al grupo systemd-journal."
                        }
                    ]
                },
                {
                    kicker: "Paso 3",
                    title: "Instalar Python, pip y dependencias por distribucion",
                    copy: "El agente necesita Python 3 y psutil como base. lm-sensors mejora la visibilidad cuando la temperatura esta disponible en el sistema.",
                    badge: "Deps",
                    note: "Elige solo el bloque que corresponda a tu distro.",
                    commands: [
                        {
                            title: "Ubuntu, Debian o Kali",
                            badge: "apt",
                            command: "sudo apt update\nsudo apt install -y python3 python3-pip python3-venv lm-sensors\npython3 -m pip install --upgrade pip\npython3 -m pip install psutil",
                            purpose: "Actualiza indices, instala Python y pip, y anade psutil para que el agente pueda recopilar metricas del sistema.",
                            when: "Usa este bloque si el host es Ubuntu, Debian o Kali.",
                            expected: "Python 3 y pip quedan disponibles; psutil se instala sin errores."
                        },
                        {
                            title: "CentOS, RHEL o Rocky",
                            badge: "dnf",
                            command: "sudo dnf install -y python3 python3-pip lm_sensors\npython3 -m pip install --upgrade pip\npython3 -m pip install psutil",
                            purpose: "Instala la pila base equivalente en distribuciones de la familia RHEL.",
                            when: "Usa este bloque si trabajas con CentOS Stream, Rocky o RHEL compatibles.",
                            expected: "Los paquetes del sistema se instalan y psutil queda listo para usarse."
                        },
                        {
                            title: "Arch Linux",
                            badge: "pacman",
                            command: "sudo pacman -Sy --noconfirm python python-pip lm_sensors\npython3 -m pip install --upgrade pip\npython3 -m pip install psutil",
                            purpose: "Instala Python, pip y soporte de sensores en Arch.",
                            when: "Usa este bloque si tu host pertenece a la familia Arch.",
                            expected: "Dispondras de Python y pip, y psutil se instalara sobre ese runtime."
                        }
                    ]
                },
                {
                    kicker: "Paso 4",
                    title: "Lanzar el agente manualmente antes de automatizar",
                    copy: "Esta es la prueba mas importante. Si aqui no responde, todavia no merece la pena pasar a systemd.",
                    badge: "Run",
                    note: "Primero manual, despues servicio.",
                    commands: [
                        {
                            title: "Ejecutar el agente a mano",
                            badge: "Manual",
                            command: "python3 thorondor-agent.py",
                            purpose: "Levanta el servicio HTTP del agente en primer plano para que puedas ver errores directamente en la consola.",
                            when: "Hazlo justo despues de copiar el fichero .py al host y antes de crear la unidad systemd.",
                            expected: "La consola deberia indicar que el agente arranca y queda escuchando en el puerto configurado."
                        },
                        {
                            title: "Comprobar el estado basico del agente",
                            badge: "Health",
                            command: "curl http://127.0.0.1:<PUERTO>/health",
                            purpose: "Consulta el endpoint minimo del agente para validar que el puerto responde y el servicio esta vivo.",
                            when: "Usalo con el agente arrancado manualmente o ya como servicio.",
                            expected: "Un JSON con estado ok, heartbeat y puerto."
                        },
                        {
                            title: "Comprobar la telemetria completa",
                            badge: "Telemetry",
                            command: "curl http://127.0.0.1:<PUERTO>/telemetry",
                            purpose: "Valida que el agente puede devolver informacion de sistema, metricas, seguridad y logs en un mismo payload.",
                            when: "Hazlo despues del health check para confirmar que no solo responde, sino que tambien recopila datos utiles.",
                            expected: "Un JSON amplio con bloques como system, metrics, security y logs."
                        },
                        {
                            title: "Ver si el puerto esta escuchando",
                            badge: "Puerto",
                            command: "ss -tulpn | grep <PUERTO>",
                            purpose: "Muestra si hay un proceso escuchando en el puerto configurado para Thorondor.",
                            when: "Muy util si curl falla y quieres distinguir entre un problema de servicio o de ruta/firewall.",
                            expected: "Una linea donde aparece el puerto y el proceso Python asociado."
                        }
                    ]
                },
                {
                    kicker: "Paso 5",
                    title: "Automatizar el arranque con systemd",
                    copy: "Una vez verificado en manual, ya compensa dejar el agente como servicio persistente para que arranque con el sistema.",
                    badge: "Systemd",
                    note: "Servicio estable al encender el equipo.",
                    commands: [
                        {
                            title: "Copiar la unidad al sistema",
                            badge: "Unit",
                            command: "sudo cp thorondor-agent.service /etc/systemd/system/thorondor-agent.service",
                            purpose: "Coloca la unidad systemd generada en la ruta desde la que systemd carga servicios personalizados.",
                            when: "Hazlo cuando el fichero .service ya este revisado y el .py haya funcionado correctamente en manual.",
                            expected: "La unidad queda disponible para ser recargada y habilitada."
                        },
                        {
                            title: "Recargar la configuracion de systemd",
                            badge: "Reload",
                            command: "sudo systemctl daemon-reload",
                            purpose: "Obliga a systemd a releer las unidades nuevas o modificadas.",
                            when: "Siempre despues de copiar o editar un fichero .service.",
                            expected: "El comando termina sin errores y systemd ya reconoce la nueva unidad."
                        },
                        {
                            title: "Habilitar e iniciar el servicio",
                            badge: "Enable",
                            command: "sudo systemctl enable --now thorondor-agent.service",
                            purpose: "Lo deja arrancado ahora mismo y tambien preparado para iniciarse automaticamente al encender el host.",
                            when: "Usalo cuando ya no quieras depender de ejecutar python3 a mano.",
                            expected: "El servicio queda en active y enabled."
                        },
                        {
                            title: "Revisar el estado del servicio",
                            badge: "Status",
                            command: "sudo systemctl status thorondor-agent.service",
                            purpose: "Muestra si el servicio esta activo, si entra en reinicio o si se ha caido por un error de configuracion.",
                            when: "Ejecutalo siempre despues de enable --now y cada vez que hagas cambios importantes.",
                            expected: "Una salida con estado active (running) y sin bucles de reinicio."
                        },
                        {
                            title: "Consultar logs del servicio",
                            badge: "Journal",
                            command: "journalctl -u thorondor-agent.service -n 50 --no-pager",
                            purpose: "Lee las ultimas lineas de log asociadas al servicio para diagnosticar fallos de arranque o de permisos.",
                            when: "Especialmente util si systemctl status muestra fallos o si la telemetria no responde como esperas.",
                            expected: "Las ultimas trazas del servicio, incluyendo errores Python o mensajes de arranque."
                        }
                    ]
                }
            ];
        },

        validationChecks() {
            return [
                {
                    label: "Health accesible",
                    copy: "El endpoint /health debe responder desde el propio host y, si la red lo permite, tambien desde el equipo donde abres la web."
                },
                {
                    label: "Telemetry estructurada",
                    copy: "El endpoint /telemetry debe devolver JSON con bloques utiles, no solo una respuesta vacia o parcial."
                },
                {
                    label: "Servicio estable",
                    copy: "systemctl status no debe mostrar reinicios continuos ni errores de permisos al leer logs o lanzar psutil."
                },
                {
                    label: "Puerto visible",
                    copy: "Si el navegador no alcanza el host pero localmente todo funciona, revisa firewall local o segmentacion de red."
                }
            ];
        }
    }
};
</script>

<style scoped>
@import "@/features/vueloThorondor/styles/thorondor-theme.css";

.command-stack {
    display: grid;
    gap: 1rem;
}

.command-card {
    background: linear-gradient(180deg, rgba(18, 27, 45, 0.98), rgba(12, 18, 31, 0.98));
}

.command-meta {
    display: grid;
    gap: 0.8rem;
}

.meta-line {
    display: grid;
    gap: 0.3rem;
}

.meta-line label {
    color: #8db8ff;
    font-size: 0.8rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}

.meta-line p {
    margin: 0;
    color: rgba(232, 240, 252, 0.9);
}
</style>
