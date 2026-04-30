<template>
    <ThorondorPageShell>
        <section class="section-box intro-box">
            <div class="section-topline">
                <div class="module-header">
                    <span class="section-kicker">Despliegue tecnico</span>
                    <h1 class="section-name">Guia de instalacion</h1>
                    <p class="section-copy">
                        El agente Thorondor es un servidor HTTP ligero escrito en Python que expone dos endpoints
                        (<code>/health</code>, <code>/telemetry</code>) sobre la IP privada del host.
                        El frontend consulta esos endpoints por polling desde el navegador y persiste la telemetria
                        localmente en IndexedDB. No hay backend intermedio ni canal de red inverso:
                        la unica conectividad necesaria es visibilidad TCP desde el cliente al host en el puerto configurado.
                    </p>
                </div>
                <div class="phase-badge-block">
                    <span class="phase-badge">Deploy</span>
                    <small>Python 3.8+ &middot; systemd &middot; LAN reachability</small>
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
                    <span class="section-kicker">Secuencia de despliegue</span>
                    <h2 class="module-title">Fases del proceso</h2>
                    <p class="module-copy">
                        Genera los artefactos antes de tocar el host. El generador produce un agente parametrizado
                        con la configuracion exacta del destino: nombre de servicio, puerto, usuario, distro y modulos activos.
                        Seguir el orden evita tener que editar el .py a mano despues.
                    </p>
                </div>
                <div class="phase-badge-block">
                    <span class="phase-badge">Checklist</span>
                    <small>Genera primero, despliega despues.</small>
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

        <section class="section-box">
            <div class="section-topline">
                <div class="module-header">
                    <span class="section-kicker">Plataforma objetivo</span>
                    <h2 class="module-title">Sistema operativo del host</h2>
                    <p class="module-copy">
                        Selecciona el sistema operativo del host donde se va a instalar el agente.
                        Los comandos, rutas y el gestor de servicios varian entre Linux y Windows.
                    </p>
                </div>
                <div class="phase-badge-block">
                    <span class="phase-badge">Platform</span>
                    <small>Linux (systemd) &middot; Windows (Task Scheduler)</small>
                </div>
            </div>
            <div class="os-selector-row">
                <div class="os-toggle-group">
                    <button type="button" class="os-toggle-btn" :class="{ active: guideOs === 'linux' }" @click="guideOs = 'linux'">
                        <span class="os-icon">🐧</span> Linux
                    </button>
                    <button type="button" class="os-toggle-btn" :class="{ active: guideOs === 'windows' }" @click="guideOs = 'windows'">
                        <span class="os-icon">🪟</span> Windows
                    </button>
                </div>
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
                    <div class="output-box mb-3 copy-box">
                        <button class="copy-btn" :class="{ copied: copiedKey === command.command }" @click="copyCmd(command.command, command.command)">{{ copiedKey === command.command ? '✓ Copiado' : 'Copiar' }}</button>
                        <pre class="result-pre">{{ command.command }}</pre>
                    </div>
                    <div class="command-meta">
                        <div class="meta-line">
                            <label>Que hace</label>
                            <p>{{ command.purpose }}</p>
                        </div>
                        <div class="meta-line">
                            <label>Notas</label>
                            <p>{{ command.when }}</p>
                        </div>
                        <div class="meta-line">
                            <label>Salida esperada</label>
                            <p>{{ command.expected }}</p>
                        </div>
                    </div>
                </article>
            </div>
        </section>

        <section class="section-box">
            <div class="section-topline">
                <div class="module-header">
                    <span class="section-kicker">Integracion SIEM avanzado</span>
                    <h2 class="module-title">Splunk — HTTP Event Collector e ingesta de telemetria</h2>
                    <p class="module-copy">
                        Splunk con licencia Developer (gratuita, 500 MB/dia) expone una REST API completa en el puerto 8089
                        y un HTTP Event Collector (HEC) en el puerto 8088. Thorondor puede enviar tres flujos de datos: snapshots
                        de telemetria completos, eventos de seguridad individuales y entradas de log del sistema. Una vez ingestados,
                        las busquedas SPL permiten correlacion temporal, deteccion de anomalias y alertas cruzadas entre hosts.
                    </p>
                </div>
                <div class="phase-badge-block">
                    <span class="phase-badge">SIEM+</span>
                    <small>HEC · REST API · SPL · 500 MB/dia</small>
                </div>
            </div>

            <div class="card-grid">
                <article class="tool-card" v-for="item in splunkHighlights" :key="item.label">
                    <div class="card-head">
                        <h5>{{ item.label }}</h5>
                        <span class="mini-badge">{{ item.badge }}</span>
                    </div>
                    <p class="section-copy mb-0">{{ item.copy }}</p>
                </article>
            </div>
        </section>

        <section class="section-box">
            <div class="section-topline">
                <div class="module-header">
                    <span class="section-kicker">Splunk — Fase 1</span>
                    <h2 class="module-title">Instalacion y configuracion inicial</h2>
                    <p class="module-copy">
                        Descarga e instalacion de Splunk Enterprise en el host de analisis. El modo standalone es suficiente
                        para correlacionar la telemetria de todos los hosts monitorizados. La licencia Developer no requiere
                        registro de infraestructura ni conexion continua a Internet una vez activada.
                    </p>
                </div>
                <div class="phase-badge-block">
                    <span class="phase-badge">Install</span>
                    <small>Linux x86_64 · splunk.com/download</small>
                </div>
            </div>

            <div class="command-stack">
                <article class="tool-card command-card" v-for="cmd in splunkInstallCommands" :key="cmd.title">
                    <div class="card-head">
                        <h5>{{ cmd.title }}</h5>
                        <span class="mini-badge">{{ cmd.badge }}</span>
                    </div>
                    <div class="output-box mb-3 copy-box">
                        <button class="copy-btn" :class="{ copied: copiedKey === cmd.title }" @click="copyCmd(cmd.command, cmd.title)">{{ copiedKey === cmd.title ? '✓ Copiado' : 'Copiar' }}</button>
                        <pre class="result-pre">{{ cmd.command }}</pre>
                    </div>
                    <div class="command-meta">
                        <div class="meta-line">
                            <label>Que hace</label>
                            <p>{{ cmd.purpose }}</p>
                        </div>
                        <div class="meta-line">
                            <label>Notas</label>
                            <p>{{ cmd.when }}</p>
                        </div>
                        <div class="meta-line">
                            <label>Salida esperada</label>
                            <p>{{ cmd.expected }}</p>
                        </div>
                    </div>
                </article>
            </div>
        </section>

        <section class="section-box">
            <div class="section-topline">
                <div class="module-header">
                    <span class="section-kicker">Splunk — Fase 2</span>
                    <h2 class="module-title">Configuracion del HTTP Event Collector y CORS</h2>
                    <p class="module-copy">
                        El HEC es el canal de ingesta de alta eficiencia de Splunk: acepta eventos JSON via HTTP/S sin
                        autenticacion basica, usando un token unico por fuente. CORS debe habilitarse explicitamente en
                        <code>web.conf</code> para que el navegador pueda enviar eventos directamente al HEC sin un relay intermedio.
                    </p>
                </div>
                <div class="phase-badge-block">
                    <span class="phase-badge">HEC</span>
                    <small>Puerto 8088 · token auth</small>
                </div>
            </div>

            <div class="command-stack">
                <article class="tool-card command-card" v-for="cmd in splunkHecCommands" :key="cmd.title">
                    <div class="card-head">
                        <h5>{{ cmd.title }}</h5>
                        <span class="mini-badge">{{ cmd.badge }}</span>
                    </div>
                    <div class="output-box mb-3 copy-box">
                        <button class="copy-btn" :class="{ copied: copiedKey === cmd.title }" @click="copyCmd(cmd.command, cmd.title)">{{ copiedKey === cmd.title ? '✓ Copiado' : 'Copiar' }}</button>
                        <pre class="result-pre">{{ cmd.command }}</pre>
                    </div>
                    <div class="command-meta">
                        <div class="meta-line">
                            <label>Que hace</label>
                            <p>{{ cmd.purpose }}</p>
                        </div>
                        <div class="meta-line">
                            <label>Notas</label>
                            <p>{{ cmd.when }}</p>
                        </div>
                        <div class="meta-line">
                            <label>Salida esperada</label>
                            <p>{{ cmd.expected }}</p>
                        </div>
                    </div>
                </article>
            </div>
        </section>

        <section class="section-box">
            <div class="section-topline">
                <div class="module-header">
                    <span class="section-kicker">Splunk — Fase 3</span>
                    <h2 class="module-title">Busquedas SPL de referencia</h2>
                    <p class="module-copy">
                        Estas queries SPL cubren los casos de uso mas criticos para el analisis de los datos que envia Thorondor.
                        Todas asumen el indice <code>thorondor</code> y los sourcetypes definidos en la fase de HEC.
                        Adaptarlas al rango temporal con <code>earliest</code> y <code>latest</code> segun el contexto de la investigacion.
                    </p>
                </div>
                <div class="phase-badge-block">
                    <span class="phase-badge">SPL</span>
                    <small>index=thorondor</small>
                </div>
            </div>

            <div class="card-grid">
                <article class="tool-card command-card" v-for="q in splunkSplQueries" :key="q.title">
                    <div class="card-head">
                        <h5>{{ q.title }}</h5>
                        <span class="mini-badge">{{ q.badge }}</span>
                    </div>
                    <p class="section-copy mb-0">{{ q.description }}</p>
                    <div class="output-box mt-3 copy-box">
                        <button class="copy-btn" :class="{ copied: copiedKey === q.title }" @click="copyCmd(q.spl, q.title)">{{ copiedKey === q.title ? '✓ Copiado' : 'Copiar' }}</button>
                        <pre class="result-pre">{{ q.spl }}</pre>
                    </div>
                </article>
            </div>
        </section>

        <section class="section-box">
            <div class="section-topline">
                <div class="module-header">
                    <span class="section-kicker">Verificacion final</span>
                    <h2 class="module-title">Comprobaciones antes de registrar el agente en el dashboard</h2>
                    <p class="module-copy">
                        Valida salud del proceso, estructura del payload de telemetria, estabilidad del servicio
                        y conectividad de red. Cualquier fallo aqui tiene diagnostico especifico antes de abrir Thorondor.
                    </p>
                </div>
                <div class="phase-badge-block">
                    <span class="phase-badge">Validate</span>
                    <small>Proceso, payload, servicio y red.</small>
                </div>
            </div>

            <div class="card-grid validation-grid">
                <article class="tool-card command-card validation-card" v-for="check in validationChecks" :key="check.title">
                    <div class="card-head">
                        <h5>{{ check.title }}</h5>
                        <span class="mini-badge">{{ check.badge }}</span>
                    </div>
                    <p class="section-copy mb-0">{{ check.copy }}</p>
                    <div class="output-box copy-box">
                        <button class="copy-btn" :class="{ copied: copiedKey === check.title }" @click="copyCmd(check.command, check.title)">{{ copiedKey === check.title ? '✓ Copiado' : 'Copiar' }}</button>
                        <pre class="result-pre">{{ check.command }}</pre>
                    </div>
                    <div class="command-meta">
                        <div class="meta-line">
                            <label>Que confirma</label>
                            <p>{{ check.confirms }}</p>
                        </div>
                        <div class="meta-line">
                            <label>Salida esperada</label>
                            <p>{{ check.expected }}</p>
                        </div>
                    </div>
                </article>
            </div>
        </section>

        <section class="section-box">
            <div class="section-topline">
                <div class="module-header">
                    <span class="section-kicker">Limpieza</span>
                    <h2 class="module-title">Desinstalacion y borrado del agente</h2>
                    <p class="module-copy">
                        Elimina el servicio, los ficheros del agente y la cuenta de sistema sin residuos en systemd ni en disco.
                        Ninguno de estos pasos requiere reinicio del host. Si se reutilizo un usuario existente en lugar de crear
                        una cuenta dedicada, omitir el paso de userdel.
                    </p>
                </div>
                <div class="phase-badge-block">
                    <span class="phase-badge">Cleanup</span>
                    <small>systemd, filesystem, cuenta y datos del navegador.</small>
                </div>
            </div>

            <div class="command-stack">
                <article class="tool-card command-card" v-for="cmd in uninstallCommands" :key="cmd.title">
                    <div class="card-head">
                        <h5>{{ cmd.title }}</h5>
                        <span class="mini-badge">{{ cmd.badge }}</span>
                    </div>
                    <div class="output-box mb-3 copy-box">
                        <button class="copy-btn" :class="{ copied: copiedKey === cmd.title }" @click="copyCmd(cmd.command, cmd.title)">{{ copiedKey === cmd.title ? '✓ Copiado' : 'Copiar' }}</button>
                        <pre class="result-pre">{{ cmd.command }}</pre>
                    </div>
                    <div class="command-meta">
                        <div class="meta-line">
                            <label>Que hace</label>
                            <p>{{ cmd.purpose }}</p>
                        </div>
                        <div class="meta-line">
                            <label>Notas</label>
                            <p>{{ cmd.when }}</p>
                        </div>
                        <div class="meta-line">
                            <label>Salida esperada</label>
                            <p>{{ cmd.expected }}</p>
                        </div>
                    </div>
                </article>
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

    data() {
        return {
            copiedKey: null,
            guideOs: "linux"
        };
    },

    methods: {
        copyCmd(text, key) {
            if (!navigator.clipboard) return;
            navigator.clipboard.writeText(text).then(() => {
                this.copiedKey = key;
                setTimeout(() => { this.copiedKey = null; }, 2000);
            });
        }
    },

    computed: {
        installationHighlights() {
            return [
                {
                    label: "Arquitectura HTTP pull",
                    copy: "El agente es stateless: no mantiene sesion ni abre conexiones salientes. El frontend realiza polling HTTP contra /health y /telemetry a intervalos configurables. El agente no conoce al cliente."
                },
                {
                    label: "Sin backend intermedio",
                    copy: "No hay relay, broker ni servidor central. La unica superficie de red expuesta es el socket TCP del agente en la LAN. El navegador debe tener visibilidad directa al host en el puerto configurado."
                },
                {
                    label: "Cuenta de servicio sin privilegios",
                    copy: "El agente se ejecuta con un usuario sin shell interactivo. El acceso a logs de autenticacion y al journal se gestiona via membresía en los grupos adm y systemd-journal, no con escalada de privilegios en tiempo de ejecucion."
                },
                {
                    label: "Persistencia local en IndexedDB",
                    copy: "Snapshots, logs, eventos de seguridad y alertas se persisten en IndexedDB del navegador con retención configurable. El agente no escribe nada en disco salvo el fichero de baseline para integridad de archivos."
                }
            ];
        },

        installSteps() {
            return [
                {
                    title: "1. Generar los artefactos",
                    badge: "Generator",
                    copy: "Antes de tocar el host, usa el generador para producir el agente .py parametrizado, la unidad systemd y el script de instalacion. El generador embebe en el codigo la configuracion de puerto, usuario, distro, modulos activos y rutas de log personalizadas."
                },
                {
                    title: "2. Fingerprint del host destino",
                    badge: "Discover",
                    copy: "Recoge la IP de egreso efectiva (no todas las interfaces son validas), la distro exacta, el usuario con el que vas a desplegar y su pertenencia a grupos. Esto determina que bloque de dependencias instalar y si hay que ajustar ACLs antes de arrancar el agente."
                },
                {
                    title: "3. Cuenta, directorio y ACLs",
                    badge: "Staging",
                    copy: "Crea una cuenta de servicio sin login interactivo. Asigna el directorio /opt/thorondor-agent a ese usuario. Agrega la cuenta a los grupos adm (auth.log) y systemd-journal (journalctl). Los cambios de grupo requieren reiniciar la sesion o el servicio para aplicar."
                },
                {
                    title: "4. Dependencias Python",
                    badge: "Runtime",
                    copy: "El agente unicamente requiere Python 3.8+ y psutil. lm-sensors es opcional: aporta lecturas de temperatura en hardware fisico. Instala solo lo necesario para el host concreto; no instales dependencias que el agente no use."
                },
                {
                    title: "5. Smoke test en foreground",
                    badge: "Verify",
                    copy: "Arranca el agente manualmente como el usuario de servicio antes de registrarlo en systemd. Verifica /health y /telemetry con curl desde localhost y desde la maquina cliente. Si el payload de /telemetry tiene estructura coherente, el agente esta listo para produccion."
                },
                {
                    title: "6. Unidad systemd y firewall",
                    badge: "Production",
                    copy: "Instala la unidad generada en /etc/systemd/system/, recarga el daemon y habilita el servicio con enable --now. Verifica NRestarts=0 y ExecMainStatus=0 antes de registrar el agente en el dashboard. Si hay firewall activo, abre solo el puerto del agente para la subred de origen."
                }
            ];
        },

        commandSections() {
            return this.guideOs === "windows" ? this.windowsCommandSections : this.linuxCommandSections;
        },

        windowsCommandSections() {
            return [
                {
                    kicker: "Fase 1",
                    title: "Verificacion del entorno Windows",
                    copy: "Comprueba la version de PowerShell, Python y la conectividad de red. El agente requiere Python 3.8+ y psutil. PowerShell 5.1+ es necesario para el script de instalacion automatizado.",
                    badge: "Discover",
                    note: "Ejecutar en PowerShell como Administrador en el host destino.",
                    commands: [
                        {
                            title: "Version de PowerShell y politica de ejecucion",
                            badge: "PS",
                            command: "$PSVersionTable.PSVersion\nGet-ExecutionPolicy -List",
                            purpose: "Verifica la version de PowerShell instalada y la politica de ejecucion de scripts. Se necesita al menos PS 5.1. Si RemoteSigned o Unrestricted no esta configurada, el script PS1 no podra ejecutarse.",
                            when: "Si la politica es Restricted, ejecutar Set-ExecutionPolicy -Scope CurrentUser RemoteSigned antes de lanzar el instalador.",
                            expected: "Major >= 5, Minor >= 1. Al menos un scope con RemoteSigned o Unrestricted."
                        },
                        {
                            title: "Python disponible en PATH",
                            badge: "Python",
                            command: "python --version\npython -c \"import sys; print(sys.executable)\"",
                            purpose: "Verifica que Python esta en el PATH del sistema y es accesible sin ruta absoluta. El agente se lanza via python en la tarea programada.",
                            when: "Si python no se encuentra pero python3 si, verificar que el instalador de Python ha anadido el ejecutable a PATH. Reinstalar Python con la opcion 'Add Python to PATH' activada.",
                            expected: "Python 3.x.x y la ruta al interprete sin error. Si devuelve Python 2.x, instalar Python 3 desde python.org o via winget."
                        },
                        {
                            title: "IP privada del adaptador de LAN",
                            badge: "Network",
                            command: "Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.IPAddress -notlike '127.*' -and $_.IPAddress -notlike '169.*' } | Select-Object InterfaceAlias, IPAddress",
                            purpose: "Lista todas las IPs IPv4 privadas excluyendo loopback y APIPA. Identifica la IP correcta para el campo receiverUrl del agente.",
                            when: "Usar la IP de la interfaz Ethernet o Wi-Fi de la red LAN. Evitar las interfaces de Hyper-V, VPN o Docker si existen.",
                            expected: "Una o mas filas con InterfaceAlias y la IP privada de la LAN. Seleccionar la IP de la interfaz principal."
                        },
                        {
                            title: "Sincronizacion de tiempo",
                            badge: "NTP",
                            command: "w32tm /query /status",
                            purpose: "Verifica el estado del cliente NTP de Windows. Los timestamps del agente son ISO 8601 en UTC; un reloj desviado afecta a la correlacion de eventos en el dashboard.",
                            when: "Si Last Successful Sync Time es muy antigua o el servicio no esta corriendo, ejecutar: w32tm /resync /force.",
                            expected: "Source con el servidor NTP, Last Successful Sync Time reciente y Stratum <= 4."
                        }
                    ]
                },
                {
                    kicker: "Fase 2",
                    title: "Instalacion de Python y dependencias",
                    copy: "El agente solo requiere Python 3.8+ y psutil. En Windows, Python puede instalarse via winget o desde python.org. psutil se instala via pip. No se requieren dependencias adicionales para monitorizar temperatura (wmi esta disponible via psutil en Windows).",
                    badge: "Runtime",
                    note: "Ejecutar en PowerShell como Administrador.",
                    commands: [
                        {
                            title: "Instalar Python via winget",
                            badge: "winget",
                            command: "winget install -e --id Python.Python.3.12 --source winget",
                            purpose: "Instala Python 3.12 desde el repositorio oficial de Microsoft via winget. Alternativa reproducible y auditada respecto al instalador .exe.",
                            when: "Si winget no esta disponible (Windows < 10 1809), descargar el instalador desde python.org y activar la opcion 'Add Python to PATH' durante la instalacion.",
                            expected: "Python instalado y accesible en PATH. Verificar con: python --version."
                        },
                        {
                            title: "Instalar psutil",
                            badge: "pip",
                            command: "pip install psutil",
                            purpose: "Instala psutil en el entorno Python del sistema. psutil en Windows expone CPU, RAM, disco, red, procesos y temperatura via WMI.",
                            when: "Si pip devuelve error de permisos, ejecutar PowerShell como Administrador o usar: pip install --user psutil (implica que la tarea programada debe usar el mismo usuario).",
                            expected: "psutil instalado. Verificar: python -c \"import psutil; print(psutil.__version__)\""
                        },
                        {
                            title: "Desplegar el agente generado",
                            badge: "Deploy",
                            command: "New-Item -ItemType Directory -Force -Path 'C:\\ProgramData\\Thorondor-Agent'\nCopy-Item -Path '.\\thorondor-agent.py' -Destination 'C:\\ProgramData\\Thorondor-Agent\\thorondor-agent.py'",
                            purpose: "Crea el directorio de instalacion en ProgramData (visible para el sistema, no dependiente del perfil de usuario) y copia el agente generado.",
                            when: "Verificar que el .py copiado es el generado para este host: abrir con notepad y confirmar SYSTEM_NAME, LISTEN_PORT y LISTEN_HOST al inicio del fichero.",
                            expected: "El directorio C:\\ProgramData\\Thorondor-Agent existe y contiene thorondor-agent.py. Confirmar con: Get-ChildItem 'C:\\ProgramData\\Thorondor-Agent'"
                        }
                    ]
                },
                {
                    kicker: "Fase 3",
                    title: "Smoke test y registro como tarea programada",
                    copy: "Arranca el agente manualmente antes de registrarlo. Si el proceso levanta limpio y /health responde, procede a crear la tarea en Task Scheduler. La tarea configurada con 'Run whether user is logged on or not' garantiza ejecucion persistente sin sesion activa.",
                    badge: "Production",
                    note: "Validar en foreground antes de registrar en Task Scheduler.",
                    commands: [
                        {
                            title: "Smoke test en foreground",
                            badge: "Foreground",
                            command: "python 'C:\\ProgramData\\Thorondor-Agent\\thorondor-agent.py'",
                            purpose: "Ejecuta el agente con salida de consola visible. Permite detectar ImportError de psutil, conflictos de puerto o errores de configuracion antes de registrarlo como servicio silencioso.",
                            when: "Ejecutar en una PowerShell separada. Probar /health y /telemetry con Invoke-RestMethod desde otra PowerShell. Interrumpir con Ctrl+C una vez validado.",
                            expected: "Linea de arranque con host, puerto y nombre del sistema. Sin tracebacks. Ctrl+C termina limpiamente."
                        },
                        {
                            title: "Validar endpoints desde localhost",
                            badge: "curl",
                            command: "Invoke-RestMethod -Uri 'http://127.0.0.1:<PUERTO>/health'\nInvoke-RestMethod -Uri 'http://127.0.0.1:<PUERTO>/telemetry' | ConvertTo-Json -Depth 5 | Select-Object -First 60",
                            purpose: "Verifica que el agente responde en local y que el payload de /telemetry contiene los bloques esperados: system, metrics, security y logs.",
                            when: "Si /health responde pero /telemetry devuelve campos vacios, revisar que los modulos estan habilitados en el .py y que Python tiene acceso a los contadores WMI.",
                            expected: "JSON con status ok en /health. JSON con system.hostname, metrics.cpuTotal y bloques de seguridad y logs en /telemetry."
                        },
                        {
                            title: "Registrar tarea programada (Task Scheduler)",
                            badge: "Task",
                            command: "$action = New-ScheduledTaskAction -Execute 'python' -Argument 'C:\\ProgramData\\Thorondor-Agent\\thorondor-agent.py'\n$trigger = New-ScheduledTaskTrigger -AtStartup\n$settings = New-ScheduledTaskSettingsSet -RestartCount 3 -RestartInterval (New-TimeSpan -Minutes 1)\nRegister-ScheduledTask -TaskName 'ThorondorAgent' -Action $action -Trigger $trigger -Settings $settings -RunLevel Highest -Force",
                            purpose: "Registra el agente como tarea programada de inicio del sistema. RunLevel Highest garantiza permisos para leer contadores de sistema. RestartCount 3 proporciona resiliencia ante fallos transitorios.",
                            when: "Si se prefiere correr bajo un usuario especifico en lugar de SYSTEM, anadir -User y -Password al Register-ScheduledTask. SYSTEM tiene acceso completo a WMI y contadores de rendimiento.",
                            expected: "La tarea ThorondorAgent aparece en Get-ScheduledTask | Where-Object TaskName -eq ThorondorAgent con State Ready."
                        },
                        {
                            title: "Regla de firewall para el puerto del agente",
                            badge: "Firewall",
                            command: "New-NetFirewallRule -DisplayName 'Thorondor Agent' -Direction Inbound -Protocol TCP -LocalPort <PUERTO> -Action Allow -Profile Domain,Private",
                            purpose: "Permite conexiones TCP entrantes al puerto del agente desde redes de dominio y privadas. Profile Domain,Private excluye redes publicas automaticamente.",
                            when: "Si el Firewall de Windows esta desactivado (Get-NetFirewallProfile | Select Name,Enabled), este paso puede omitirse. Verificar con: Test-NetConnection -ComputerName <IP> -Port <PUERTO> desde la maquina cliente.",
                            expected: "La regla aparece en Get-NetFirewallRule -DisplayName 'Thorondor Agent'. Invoke-RestMethod desde la maquina cliente responde sin timeout."
                        }
                    ]
                }
            ];
        },

        linuxCommandSections() {
            return [
                {
                    kicker: "Fase 1",
                    title: "Fingerprint del host",
                    copy: "Obtener la informacion necesaria para completar el generador y tomar decisiones de despliegue: IP de egreso efectiva, distribucion, usuario activo y pertenencia a grupos relevantes.",
                    badge: "Discover",
                    note: "Ejecutar en el host destino antes de generar.",
                    commands: [
                        {
                            title: "Identidad del sistema",
                            badge: "OS",
                            command: "hostnamectl",
                            purpose: "Devuelve hostname estatico, sistema operativo, kernel y arquitectura en una unica salida estructurada.",
                            when: "Fuente canonica para el nombre del host y la version de distro que solicita el generador. Mas fiable que combinar /etc/os-release + uname individualmente.",
                            expected: "Bloque con Static hostname, Operating System, Kernel y Architecture. Usa el valor de Operating System para elegir la distro en el generador."
                        },
                        {
                            title: "IP de egreso efectiva",
                            badge: "Network",
                            command: "ip route get 1.1.1.1",
                            purpose: "Fuerza al kernel a resolver que interfaz y que IP source usaria para alcanzar Internet. Identifica la IP real de la interfaz de LAN en hosts con multiples interfaces.",
                            when: "Usar esta IP como receiverUrl en el generador, no la salida de hostname -I que puede listar varias interfaces incluyendo loopback, docker bridges o VPN.",
                            expected: "Linea con 'dev <iface> src <IP>'. El valor de src es la IP que debe configurarse en el agente."
                        },
                        {
                            title: "Usuario efectivo y grupos",
                            badge: "ACL",
                            command: "id",
                            purpose: "Muestra UID, GID y todos los grupos suplementarios del usuario activo.",
                            when: "Determina si ya hay membresia en adm y systemd-journal o si hay que ejecutar usermod antes del despliegue. Los grupos aplican en la siguiente sesion o reinicio del servicio.",
                            expected: "Linea con uid, gid y groups. Busca adm y systemd-journal en la lista de grupos; si no aparecen, son necesarios los usermod del siguiente paso."
                        },
                        {
                            title: "Sincronizacion de tiempo",
                            badge: "NTP",
                            command: "timedatectl show --no-pager",
                            purpose: "Verifica zona horaria configurada y si NTP esta sincronizado. Los timestamps del agente son ISO 8601 en UTC; un reloj desviado distorsiona la correlacion de eventos en el dashboard.",
                            when: "Critico si el host lleva mucho tiempo sin sincronizar o si la zona no coincide con la del cliente. Un desfase de mas de unos segundos afecta a alertas y timelines.",
                            expected: "NTPSynchronized=yes y Timezone coherente con el entorno. Si aparece NTPSynchronized=no, revisar el servicio de sincronizacion antes de continuar."
                        }
                    ]
                },
                {
                    kicker: "Fase 2",
                    title: "Cuenta de servicio, directorio y ACLs",
                    copy: "Principio de minimo privilegio: cuenta sin shell interactivo, directorio propiedad del servicio, acceso a logs via grupos del sistema. El agente no necesita en ningun momento ejecutarse como root.",
                    badge: "Staging",
                    note: "Ajustar <USUARIO> al nombre elegido en el generador.",
                    commands: [
                        {
                            title: "Crear cuenta de servicio sin shell",
                            badge: "useradd",
                            command: "sudo useradd --system --create-home --shell /usr/sbin/nologin <USUARIO>",
                            purpose: "Crea una cuenta de sistema sin login interactivo. --system asigna UID en el rango de sistema (<1000). --create-home es necesario si el agente necesita un directorio HOME para archivos temporales de Python.",
                            when: "Saltar si se reutiliza un usuario existente. Verificar con 'id <USUARIO>' antes de ejecutar para evitar conflictos de UID.",
                            expected: "El usuario queda creado sin password valido y con /usr/sbin/nologin como shell. Verificar con: getent passwd <USUARIO>."
                        },
                        {
                            title: "Directorio de trabajo y propietario",
                            badge: "Filesystem",
                            command: "sudo mkdir -p /opt/thorondor-agent\nsudo chown -R <USUARIO>:<USUARIO> /opt/thorondor-agent",
                            purpose: "Crea el directorio de instalacion y transfiere la propiedad al usuario de servicio. El agente escribe ahi el fichero de baseline de integridad de archivos.",
                            when: "Ejecutar antes de copiar los artefactos generados. Si el directorio ya existe con otro propietario, verificar si hay conflicto con otro servicio.",
                            expected: "'ls -ld /opt/thorondor-agent' debe mostrar al usuario de servicio como propietario con permisos 755 o mas restrictivos."
                        },
                        {
                            title: "Acceso a logs del sistema",
                            badge: "Groups",
                            command: "sudo usermod -aG adm,systemd-journal <USUARIO>",
                            purpose: "Otorga acceso de lectura a auth.log (grupo adm en Debian/Ubuntu) y al journal del sistema (grupo systemd-journal). En RHEL/Rocky el grupo equivalente a adm es wheel o adm segun la configuracion.",
                            when: "Necesario si el agente tiene habilitados los modulos securityLogs o applicationLogs. Los grupos no aplican hasta reiniciar la sesion del usuario o el servicio systemd.",
                            expected: "'id <USUARIO>' debe listar adm y systemd-journal. Si el servicio ya estaba corriendo, reiniciarlo con systemctl restart para que el proceso herede los grupos nuevos."
                        },
                        {
                            title: "Desplegar los artefactos generados",
                            badge: "Deploy",
                            command: "sudo cp thorondor-agent.py thorondor-agent.service /opt/thorondor-agent/\nsudo chmod 750 /opt/thorondor-agent/thorondor-agent.py",
                            purpose: "Copia el agente Python y la unidad systemd al directorio de trabajo. chmod 750 limita la ejecucion al propietario y al grupo, evitando que otros usuarios del sistema lean el codigo del agente.",
                            when: "Verificar que los ficheros son los generados para este host especifico: revisar SYSTEM_NAME, LISTEN_PORT y LISTEN_HOST en las primeras lineas del .py antes de copiar.",
                            expected: "Los ficheros quedan en /opt/thorondor-agent/ con el usuario de servicio como propietario. Confirmar con: ls -la /opt/thorondor-agent/."
                        }
                    ]
                },
                {
                    kicker: "Fase 3",
                    title: "Dependencias Python por distribucion",
                    copy: "El agente solo requiere Python 3.8+ y psutil. Instalar en el entorno del sistema (no en virtualenv) para que la unidad systemd use el interprete del sistema directamente. lm-sensors es opcional: solo aporta datos si el hardware expone sensores accesibles.",
                    badge: "Runtime",
                    note: "Instalar solo el bloque correspondiente a la distro del host.",
                    commands: [
                        {
                            title: "Ubuntu, Debian, Kali",
                            badge: "apt",
                            command: "sudo apt update && sudo apt install -y python3 python3-pip lm-sensors\npip3 install --break-system-packages psutil",
                            purpose: "Instala el runtime y psutil en sistemas basados en Debian. '--break-system-packages' es necesario en Debian 12+ y Ubuntu 23.10+ donde pip esta restringido por PEP 668.",
                            when: "En entornos donde pip rechaza la instalacion sin ese flag, alternativa valida: 'sudo apt install python3-psutil' instala psutil desde los repositorios del sistema.",
                            expected: "'python3 -c \"import psutil; print(psutil.__version__)\"' debe devolver la version instalada sin ImportError."
                        },
                        {
                            title: "CentOS, RHEL, Rocky Linux",
                            badge: "dnf",
                            command: "sudo dnf install -y python3 python3-pip lm_sensors\npip3 install psutil",
                            purpose: "Instala dependencias en la familia RHEL. lm_sensors usa guion bajo como nombre de paquete en dnf.",
                            when: "En RHEL 8/9 con suscripcion activa, python3-psutil puede estar disponible directamente en los repos. Verificar con: dnf list python3-psutil.",
                            expected: "python3 disponible como /usr/bin/python3. psutil importable sin errores."
                        },
                        {
                            title: "Arch Linux",
                            badge: "pacman",
                            command: "sudo pacman -Sy --noconfirm python python-pip lm_sensors python-psutil",
                            purpose: "En Arch, python-psutil esta en los repositorios oficiales. Instalar desde pacman en lugar de pip evita conflictos con el sistema de paquetes.",
                            when: "Si se usa pip en Arch sin virtualenv, puede aparecer el error 'externally-managed-environment'. Usar el paquete del sistema es la opcion correcta aqui.",
                            expected: "python3 --version >= 3.8 y python3 -c 'import psutil' sin errores."
                        }
                    ]
                },
                {
                    kicker: "Fase 4",
                    title: "Smoke test en foreground y despliegue en systemd",
                    copy: "Arranca el agente como usuario de servicio antes de registrarlo en systemd. Si el proceso no levanta limpio en foreground (stderr visible), no hay nada que ganar pasando a systemd. Una vez validado el payload, instala la unidad y verifica la estabilidad del servicio.",
                    badge: "Production",
                    note: "Manual primero. systemd solo cuando el smoke test pasa.",
                    commands: [
                        {
                            title: "Arranque en foreground como usuario de servicio",
                            badge: "Foreground",
                            command: "sudo -u <USUARIO> python3 /opt/thorondor-agent/thorondor-agent.py",
                            purpose: "Ejecuta el agente con la identidad exacta con la que lo hara systemd. El stderr queda visible en el terminal. Permite detectar ImportError, PermissionError en lectura de logs o conflictos de puerto antes de obscurecer el output en el journal.",
                            when: "Ejecutar en un terminal separado mientras se hacen los curl de validacion desde otro. Interrumpir con Ctrl+C una vez validado.",
                            expected: "Linea de arranque indicando host, puerto y nombre del sistema. Sin tracebacks. El proceso debe permanecer en foreground sin reiniciarse."
                        },
                        {
                            title: "Validar endpoints desde localhost y desde LAN",
                            badge: "curl",
                            command: "curl -s http://127.0.0.1:<PUERTO>/health | python3 -m json.tool\ncurl -s http://<IP_PRIVADA>:<PUERTO>/telemetry | python3 -m json.tool | head -60",
                            purpose: "Verifica que el agente responde en local y que la IP privada es alcanzable desde la red. El payload de /telemetry debe contener los bloques system, metrics, security y logs con datos reales.",
                            when: "Si /health responde en local pero no via IP privada: revisar firewall y que LISTEN_HOST en el .py sea '0.0.0.0' y no '127.0.0.1'. Si /telemetry devuelve campos vacios, revisar permisos de lectura de logs.",
                            expected: "/health: JSON con status ok y heartbeat. /telemetry: JSON con system.hostname, metrics.cpuTotal, security.events y logs.*Tail con contenido."
                        },
                        {
                            title: "Instalar unidad systemd y verificar estabilidad",
                            badge: "systemd",
                            command: "sudo cp /opt/thorondor-agent/thorondor-agent.service /etc/systemd/system/\nsudo systemctl daemon-reload\nsudo systemctl enable --now thorondor-agent.service\nsudo systemctl show thorondor-agent.service -p ActiveState,NRestarts,ExecMainStatus --value",
                            purpose: "Instala la unidad, recarga el daemon, habilita el servicio en arranque y lo inicia inmediatamente. El ultimo comando verifica estado activo, contador de reinicios y codigo de salida del proceso principal sin parsear la salida verbosa de systemctl status.",
                            when: "NRestarts > 0 inmediatamente despues de enable --now indica que el proceso esta fallando y entrando en el loop de restart. Diagnosticar con: journalctl -u <AGENTE>.service -n 30 --no-pager.",
                            expected: "ActiveState=active, NRestarts=0, ExecMainStatus=0. Si NRestarts sube, el proceso esta crasheando: ver el journal para el traceback."
                        },
                        {
                            title: "Abrir puerto en firewall local",
                            badge: "Firewall",
                            command: "# UFW (Debian/Ubuntu)\nsudo ufw allow from <SUBRED>/24 to any port <PUERTO> proto tcp\n\n# firewalld (RHEL/Rocky)\nsudo firewall-cmd --permanent --add-rich-rule='rule family=ipv4 source address=<SUBRED>/24 port port=<PUERTO> protocol=tcp accept'\nsudo firewall-cmd --reload",
                            purpose: "Restringe el acceso al puerto del agente a la subred de origen en lugar de abrirlo a cualquier IP. Reduce superficie de ataque si el host es accesible desde mas de una red.",
                            when: "Si no hay firewall activo (verificar con: sudo ufw status o sudo firewall-cmd --state), omitir este paso. Ejecutar solo el bloque correspondiente al firewall del host.",
                            expected: "curl desde la maquina cliente responde sin timeout. curl desde fuera de la subred autorizada debe quedar bloqueado."
                        }
                    ]
                }
            ];
        },

        validationChecks() {
            return [
                {
                    title: "Proceso activo y socket en escucha",
                    badge: "Process",
                    copy: "Confirma que el proceso Python tiene el socket TCP abierto en el puerto configurado. Si el health falla y esto tampoco muestra el proceso, el agente no ha arrancado correctamente.",
                    command: "ss -tulpn | grep <PUERTO>",
                    confirms: "Binding activo del socket en 0.0.0.0:<PUERTO> y PID del proceso Python asociado.",
                    expected: "Linea con LISTEN, 0.0.0.0:<PUERTO> y el PID del interprete Python. Si aparece 127.0.0.1:<PUERTO> en lugar de 0.0.0.0, LISTEN_HOST en el .py esta mal configurado y el agente no sera alcanzable desde la red."
                },
                {
                    title: "Health desde localhost",
                    badge: "Local",
                    copy: "Validacion minima del proceso: si este curl falla, el agente no esta levantado o hay un conflicto de puerto. No implica nada sobre conectividad de red.",
                    command: "curl -s http://127.0.0.1:<PUERTO>/health",
                    confirms: "El proceso esta levantado, el servidor HTTP responde y el endpoint /health devuelve JSON valido.",
                    expected: "JSON con 'status': 'ok', 'heartbeat' con timestamp reciente y 'port' con el valor configurado. Si devuelve Connection refused, el proceso no esta corriendo o usa otro puerto."
                },
                {
                    title: "Alcanzabilidad real desde la maquina cliente",
                    badge: "LAN",
                    copy: "Prueba de conectividad extremo a extremo desde el equipo que abre Thorondor. Valida IP privada, ruta de red y que el firewall local del host no bloquea el puerto.",
                    command: "curl -v --connect-timeout 5 http://<IP_PRIVADA>:<PUERTO>/health",
                    confirms: "La IP privada configurada en el agente es alcanzable desde el cliente y el firewall local no filtra el puerto.",
                    expected: "La conexion TCP se establece (TCP_NODELAY, Connected) y llega el JSON de /health. Si hay timeout en el connect, el problema es de ruta o firewall, no del agente. Si hay Connection refused, el puerto no esta en escucha en esa IP."
                },
                {
                    title: "Estructura del payload de telemetria",
                    badge: "Payload",
                    copy: "El dashboard espera un payload estructurado con bloques especificos. Un payload incompleto genera graficos vacios, alertas sin datos o errores silenciosos en el store.",
                    command: "curl -s http://127.0.0.1:<PUERTO>/telemetry | python3 -m json.tool | grep -E '\"(system|metrics|security|logs|heartbeat)\"'",
                    confirms: "Presencia de los bloques raiz que consume el frontend: system, metrics, security, logs y heartbeat.",
                    expected: "Las cinco claves aparecen en la salida. Si falta alguna, revisar que el modulo correspondiente esta habilitado en la configuracion del agente y que el usuario de servicio tiene los permisos necesarios para leer las fuentes de datos."
                },
                {
                    title: "Estabilidad del servicio systemd",
                    badge: "systemd",
                    copy: "NRestarts > 0 poco despues del arranque es siempre indicativo de un fallo que systemd esta enmascarando con el loop de restart. Diagnosticar antes de registrar el agente en el dashboard.",
                    command: "systemctl show thorondor-agent.service -p ActiveState,NRestarts,ExecMainStatus --value\njournalctl -u thorondor-agent.service -n 20 --no-pager",
                    confirms: "Estado activo, ausencia de reinicios y codigo de salida 0 del proceso principal.",
                    expected: "ActiveState=active, NRestarts=0, ExecMainStatus=0. Cualquier otra combinacion requiere revisar el journal. Los errores mas frecuentes son: ImportError de psutil, PermissionError en /var/log/, o OSError: Address already in use si hay otra instancia corriendo."
                }
            ];
        },

        splunkHighlights() {
            return [
                {
                    label: "HTTP Event Collector (HEC)",
                    badge: "Ingesta",
                    copy: "Canal de ingesta de alta eficiencia: acepta eventos JSON via HTTP/S autenticados por token. Sin autenticacion basica, sin overhead de sesion. Thorondor envia tres source types: thorondor:telemetry, thorondor:security y thorondor:logs."
                },
                {
                    label: "REST API (puerto 8089)",
                    badge: "Query",
                    copy: "Interfaz de gestion y busqueda de Splunk. Permite ejecutar busquedas SPL programaticamente, consultar jobs, obtener resultados en JSON y gestionar la instancia. La vista Splunk de Thorondor la utiliza para lanzar queries desde el navegador."
                },
                {
                    label: "Licencia Developer gratuita",
                    badge: "500 MB/dia",
                    copy: "La licencia Developer de Splunk Enterprise es gratuita, sin limite temporal y con un cupo de 500 MB de ingesta diaria. Suficiente para monitorizar varios hosts con intervalos de 30 segundos durante 24h sin aproximarse al limite."
                },
                {
                    label: "SPL — Search Processing Language",
                    badge: "Analisis",
                    copy: "Lenguaje de consulta propio de Splunk con capacidades de correlacion temporal, estadisticas, deteccion de anomalias y visualizacion. Las queries de referencia incluidas cubren los patrones de uso mas criticos para los datos de Thorondor."
                }
            ];
        },

        splunkInstallCommands() {
            return [
                {
                    title: "Descargar Splunk Enterprise (Linux x86_64)",
                    badge: "wget",
                    command: "wget -O splunk-latest-linux-x86_64.tgz 'https://download.splunk.com/products/splunk/releases/9.2.0/linux/splunk-9.2.0-d8ae995bf219-Linux-x86_64.tgz'",
                    purpose: "Descarga el paquete de Splunk Enterprise. Sustituir la URL por la version mas reciente disponible en splunk.com/download. La cuenta Splunk gratuita es necesaria para obtener el enlace de descarga.",
                    when: "En entornos sin acceso directo a Internet, descargar en la maquina cliente y transferir via scp. En RHEL/Rocky existe el paquete .rpm que se instala con dnf.",
                    expected: "Fichero .tgz de aproximadamente 250 MB. Verificar integridad con el MD5/SHA256 publicado en la pagina de descarga."
                },
                {
                    title: "Extraer e instalar",
                    badge: "Install",
                    command: "sudo tar -xzf splunk-latest-linux-x86_64.tgz -C /opt\nsudo /opt/splunk/bin/splunk start --accept-license --answer-yes --no-prompt --seed-passwd Admin1234!",
                    purpose: "Extrae Splunk en /opt/splunk y lo arranca por primera vez estableciendo la contrasena del usuario admin. El flag --seed-passwd evita el asistente interactivo.",
                    when: "Cambiar Admin1234! por una contrasena segura. En produccion, gestionar la contrasena via /opt/splunk/etc/passwd o mediante LDAP.",
                    expected: "Splunk arranca y queda accesible en http://localhost:8000 (UI web) y https://localhost:8089 (REST API)."
                },
                {
                    title: "Habilitar arranque automatico con systemd",
                    badge: "systemd",
                    command: "sudo /opt/splunk/bin/splunk enable boot-start -systemd-managed 1 -user splunk --accept-license\nsudo systemctl start Splunkd",
                    purpose: "Registra Splunk como unidad systemd para que arranque automaticamente. El flag -systemd-managed 1 genera la unidad gestionada por systemd en lugar del init script legacy.",
                    when: "Requiere crear previamente el usuario splunk si se usa -user splunk. Alternativa: omitir -user para que corra como root (no recomendado en produccion).",
                    expected: "systemctl status Splunkd muestra active (running). La UI web es accesible en el puerto 8000."
                },
                {
                    title: "Activar licencia Developer",
                    badge: "License",
                    command: "curl -k -u admin:Admin1234! -X POST https://localhost:8089/services/licenser/licenses -d 'payload=<licensekey>' -d 'output_mode=json'",
                    purpose: "Aplica la licencia Developer descargada desde my.splunk.com. Sin licencia activa, Splunk funciona en modo Trial (60 dias) con todas las funcionalidades.",
                    when: "La licencia Developer se obtiene gratuitamente registrando una cuenta en dev.splunk.com. Es un fichero .xml o una clave que se aplica via API o desde Settings > Licensing en la UI.",
                    expected: "Splunk confirma la aplicacion de la licencia y desaparece el banner de Trial. El cupo queda establecido en 500 MB/dia."
                }
            ];
        },

        splunkHecCommands() {
            return [
                {
                    title: "Habilitar HEC en inputs.conf",
                    badge: "Config",
                    command: "sudo tee /opt/splunk/etc/system/local/inputs.conf > /dev/null <<'EOF'\n[http]\ndisabled = false\nport = 8088\nenableSSL = 0\n\n[http://thorondor]\ndisabled = false\ntoken = <TU_TOKEN_HEC>\nindex = thorondor\nsourcetype = thorondor:telemetry\nEOF\nsudo systemctl restart Splunkd",
                    purpose: "Habilita el HEC en el puerto 8088 sin SSL (para LAN interna) y define el endpoint 'thorondor' con token preconfigurado. enableSSL=0 simplifica la configuracion en redes internas; en produccion usar SSL.",
                    when: "El token HEC se genera desde Settings > Data Inputs > HTTP Event Collector en la UI de Splunk, o via API. Sustituir <TU_TOKEN_HEC> por el UUID generado.",
                    expected: "curl -H 'Authorization: Splunk <TOKEN>' http://localhost:8088/services/collector/health devuelve JSON con 'code': 17 (HEC activo)."
                },
                {
                    title: "Crear el indice thorondor",
                    badge: "Index",
                    command: "curl -k -u admin:Admin1234! -X POST https://localhost:8089/services/data/indexes -d 'name=thorondor' -d 'output_mode=json'",
                    purpose: "Crea el indice dedicado para los datos de Thorondor. Separar los datos en un indice propio facilita la retencion diferenciada, el control de acceso y las busquedas SPL.",
                    when: "Si se prefiere usar el indice main, cambiar el valor de index en inputs.conf. El indice main tiene politica de retencion distinta a la de indices personalizados.",
                    expected: "La respuesta JSON confirma la creacion del indice. Verificar con: curl -k -u admin:Admin1234! 'https://localhost:8089/services/data/indexes/thorondor?output_mode=json'"
                },
                {
                    title: "Configurar CORS para acceso desde el navegador",
                    badge: "CORS",
                    command: "sudo tee /opt/splunk/etc/system/local/web.conf > /dev/null <<'EOF'\n[settings]\nenableSplunkWebSSL = false\ncrossOriginSharingPolicy = *\ncrossOriginSharingHeaders = Authorization, Content-Type, X-Splunk-Form-Key\nEOF\nsudo systemctl restart Splunkd",
                    purpose: "Permite que el navegador realice peticiones directas a la REST API y al HEC de Splunk. Necesario porque la vista Splunk de Thorondor llama a los endpoints directamente desde el frontend sin relay de backend.",
                    when: "En produccion, sustituir el wildcard '*' en crossOriginSharingPolicy por el origen exacto del frontend (ej: http://192.168.1.10:8080). El wildcard solo es adecuado para entornos de laboratorio.",
                    expected: "Las peticiones desde el navegador a https://localhost:8089 o http://localhost:8088 no producen errores CORS. La vista de Splunk en Thorondor puede conectar y ejecutar queries."
                },
                {
                    title: "Verificar ingesta con evento de prueba",
                    badge: "Test",
                    command: "curl -s -H 'Authorization: Splunk <TOKEN>' -H 'Content-Type: application/json' http://localhost:8088/services/collector/event -d '{\"event\": {\"test\": \"thorondor-probe\", \"ts\": \"'$(date -u +%Y-%m-%dT%H:%M:%SZ)'\"}, \"sourcetype\": \"thorondor:telemetry\", \"index\": \"thorondor\"}'",
                    purpose: "Envia un evento de prueba al HEC para verificar que el token, el indice y el sourcetype estan correctamente configurados antes de conectar Thorondor.",
                    when: "Ejecutar antes de conectar la vista Splunk del frontend. Si devuelve codigo 5 (No data), el indice no existe. Codigo 7 (Token disabled) indica que el token esta desactivado en la UI.",
                    expected: "JSON con 'text': 'Success', 'code': 0. El evento debe aparecer en Splunk con: index=thorondor sourcetype=thorondor:telemetry | head 1."
                }
            ];
        },

        splunkSplQueries() {
            return [
                {
                    title: "Evolucion de CPU y RAM por host",
                    badge: "Timechart",
                    description: "Serie temporal de CPU y RAM para todos los hosts monitorizados. Permite identificar picos de carga, patrones diurnos y correlacion entre sistemas.",
                    spl: "index=thorondor sourcetype=\"thorondor:telemetry\"\n| timechart span=5m avg(metrics.cpuTotal) as CPU avg(metrics.memoryPercent) as RAM by system.hostname"
                },
                {
                    title: "Eventos de seguridad por tipo y host",
                    badge: "Stats",
                    description: "Agregacion de eventos de seguridad clasificados por tipo y sistema. Util para detectar patrones de autenticacion fallida o actividad de sudo fuera de horario.",
                    spl: "index=thorondor sourcetype=\"thorondor:security\"\n| stats count by system.hostname, event.type, event.user\n| sort -count"
                },
                {
                    title: "Top IPs con intentos de autenticacion fallida",
                    badge: "Threat",
                    description: "Identifica las IPs origen de mayor actividad de autenticacion fallida. Un mismo origen con multiples intentos en ventana corta indica brute-force o credential stuffing.",
                    spl: "index=thorondor sourcetype=\"thorondor:security\" event.type=authentication_failed\n| timechart span=10m count by event.sourceIp\n| where count > 5"
                },
                {
                    title: "Uso de disco por particion y host",
                    badge: "Capacity",
                    description: "Monitoriza el porcentaje de uso de cada particion en todos los hosts. Permite detectar particiones proximas al limite antes de que impacten en el servicio.",
                    spl: "index=thorondor sourcetype=\"thorondor:telemetry\"\n| timechart span=1h max(metrics.diskPartitions{}.percent) as MaxDisk by system.hostname"
                },
                {
                    title: "Cambios en ficheros criticos",
                    badge: "Integrity",
                    description: "Detecta modificaciones en los ficheros del baseline de integridad. Cualquier cambio en /etc/passwd, /etc/shadow o /etc/sudoers debe ser investigado inmediatamente.",
                    spl: "index=thorondor sourcetype=\"thorondor:security\" event.type=file_integrity_change\n| table _time, system.hostname, event.file, event.previousHash, event.currentHash\n| sort -_time"
                },
                {
                    title: "Procesos con mayor consumo de CPU",
                    badge: "Processes",
                    description: "Top procesos por consumo de CPU en los ultimos 30 minutos. Permite identificar procesos inesperados, mineros o runaway processes antes de que saturen el host.",
                    spl: "index=thorondor sourcetype=\"thorondor:telemetry\"\n| mvexpand metrics.topProcesses\n| stats avg(metrics.topProcesses.cpuPercent) as AvgCPU by system.hostname, metrics.topProcesses.name\n| sort -AvgCPU | head 20"
                }
            ];
        },

        uninstallCommands() {
            if (this.guideOs === "windows") {
                return [
                    {
                        title: "Detener y eliminar la tarea programada",
                        badge: "Task",
                        command: "Unregister-ScheduledTask -TaskName 'ThorondorAgent' -Confirm:$false",
                        purpose: "Elimina la tarea programada de Task Scheduler. Si la tarea esta corriendo en el momento de la ejecucion, Windows la detiene antes de eliminarla.",
                        when: "Verificar que la tarea esta eliminada con: Get-ScheduledTask | Where-Object TaskName -eq ThorondorAgent. No debe devolver resultados.",
                        expected: "Sin output ni error. La tarea desaparece del Programador de tareas."
                    },
                    {
                        title: "Eliminar los ficheros del agente",
                        badge: "Filesystem",
                        command: "Remove-Item -Recurse -Force 'C:\\ProgramData\\Thorondor-Agent'",
                        purpose: "Elimina el directorio de instalacion y todos sus contenidos, incluyendo el agente .py y el fichero de baseline de integridad.",
                        when: "Ejecutar como Administrador. Si algun fichero esta bloqueado por un proceso, detener primero la tarea con el paso anterior.",
                        expected: "El directorio C:\\ProgramData\\Thorondor-Agent no existe. Verificar con: Test-Path 'C:\\ProgramData\\Thorondor-Agent' (debe devolver False)."
                    },
                    {
                        title: "Eliminar la regla de firewall",
                        badge: "Firewall",
                        command: "Remove-NetFirewallRule -DisplayName 'Thorondor Agent'",
                        purpose: "Elimina la regla de firewall creada durante la instalacion. Sin este paso, el puerto permanece abierto aunque el agente ya no este corriendo.",
                        when: "Si la regla no existe, el comando devuelve un error no critico. Verificar con: Get-NetFirewallRule -DisplayName 'Thorondor Agent'.",
                        expected: "Sin output. La regla desaparece de Get-NetFirewallRule."
                    },
                    {
                        title: "Eliminar datos del navegador",
                        badge: "IndexedDB",
                        command: "// Desde la vista del dashboard de Thorondor:\n// Settings > Borrar todos los datos del agente\n// O directamente en DevTools > Application > IndexedDB > thorondor-db > Delete database",
                        purpose: "Elimina todos los snapshots, logs, eventos de seguridad y alertas persistidos en IndexedDB del navegador para este host.",
                        when: "Este paso es opcional si el agente se va a reinstalar con el mismo nombre. Si se elimina definitivamente, borrar la base de datos evita que el dashboard muestre datos obsoletos.",
                        expected: "El agente desaparece del dashboard en el siguiente ciclo de polling o tras borrar manualmente la entrada de IndexedDB."
                    }
                ];
            }

            return [
                {
                    title: "Parar y deshabilitar el servicio systemd",
                    badge: "systemd",
                    command: "sudo systemctl stop thorondor-agent.service\nsudo systemctl disable thorondor-agent.service",
                    purpose: "Detiene el proceso del agente y elimina el enlace de arranque automatico. El fichero de unidad permanece en disco hasta el siguiente paso.",
                    when: "Verificar que el proceso ha terminado con: pgrep -f thorondor-agent. No debe devolver ningun PID.",
                    expected: "systemctl is-active thorondor-agent.service devuelve inactive. Sin proceso Python corriendo."
                },
                {
                    title: "Eliminar la unidad systemd",
                    badge: "Cleanup",
                    command: "sudo rm /etc/systemd/system/thorondor-agent.service\nsudo systemctl daemon-reload",
                    purpose: "Elimina el fichero de unidad del directorio de systemd y recarga el daemon para que el servicio desaparezca de la lista de unidades conocidas.",
                    when: "Ejecutar despues de stop y disable. Si no se ejecuta daemon-reload, systemd sigue mostrando la unidad en estado 'not-found'.",
                    expected: "systemctl list-units --all | grep thorondor no devuelve resultados."
                },
                {
                    title: "Eliminar los ficheros del agente",
                    badge: "Filesystem",
                    command: "sudo rm -rf /opt/thorondor-agent",
                    purpose: "Elimina el directorio de instalacion y todos sus contenidos: agente .py, fichero de baseline y cualquier log o fichero temporal generado por el agente.",
                    when: "Verificar que el servicio esta detenido antes de ejecutar. Si hay un baseline de integridad que se quiere conservar para auditoria, copiarlo antes.",
                    expected: "ls /opt/thorondor-agent devuelve 'No such file or directory'."
                },
                {
                    title: "Eliminar la cuenta de servicio",
                    badge: "User",
                    command: "sudo userdel -r <USUARIO>",
                    purpose: "Elimina la cuenta de servicio y su directorio HOME si fue creado con --create-home. El flag -r evita que queden directorios huerfanos en /home.",
                    when: "Omitir si la cuenta fue reutilizada (no creada exclusivamente para el agente). Verificar primero con: id <USUARIO> que la cuenta existe.",
                    expected: "id <USUARIO> devuelve 'no such user'. El directorio /home/<USUARIO> no existe."
                },
                {
                    title: "Cerrar el puerto en el firewall",
                    badge: "Firewall",
                    command: "# UFW (Debian/Ubuntu)\nsudo ufw delete allow <PUERTO>/tcp\n\n# firewalld (RHEL/Rocky)\nsudo firewall-cmd --permanent --remove-port=<PUERTO>/tcp\nsudo firewall-cmd --reload",
                    purpose: "Revierte la regla de firewall abierta durante la instalacion. Sin este paso el puerto permanece accesible aunque el agente ya no este corriendo.",
                    when: "Ejecutar solo el bloque correspondiente al firewall activo en el host. Si no habia firewall activo durante la instalacion, omitir.",
                    expected: "Conexion al puerto desde la maquina cliente queda bloqueada (timeout). sudo ufw status o firewall-cmd --list-ports no muestra el puerto del agente."
                },
                {
                    title: "Eliminar datos del navegador",
                    badge: "IndexedDB",
                    command: "// Desde la vista del dashboard de Thorondor:\n// Settings > Borrar todos los datos del agente\n// O directamente en DevTools > Application > IndexedDB > thorondor-db > Delete database",
                    purpose: "Elimina todos los snapshots, logs, eventos de seguridad y alertas persistidos en IndexedDB del navegador para este host.",
                    when: "Este paso es opcional si el agente se va a reinstalar con el mismo nombre. Si se elimina definitivamente, borrar la base de datos evita que el dashboard muestre datos obsoletos.",
                    expected: "El agente desaparece del dashboard en el siguiente ciclo de polling o tras borrar manualmente la entrada de IndexedDB."
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

.validation-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
}

.validation-card {
    gap: 1rem;
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

@media (max-width: 1199px) {
    .validation-grid {
        grid-template-columns: 1fr;
    }
}

.copy-btn {
    display: inline-flex;
    align-items: center;
    padding: 0.28rem 0.75rem;
    border-radius: 6px;
    border: 1px solid rgba(94, 156, 255, 0.24);
    background: rgba(13, 24, 43, 0.8);
    color: rgba(190, 215, 250, 0.82);
    font-size: 0.76rem;
    font-weight: 600;
    cursor: pointer;
    transition: border-color 0.15s ease, color 0.15s ease;
    white-space: nowrap;
    align-self: flex-start;
}

.copy-btn:hover {
    border-color: rgba(125, 190, 255, 0.48);
    color: #d6eaff;
}

.copy-btn.copied {
    border-color: rgba(74, 222, 128, 0.5);
    color: #86efac;
}

.copy-box {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.os-selector-row {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 1rem;
}

.os-toggle-group {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.os-toggle-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.5rem 1.2rem;
    border-radius: 8px;
    border: 1px solid rgba(94, 156, 255, 0.22);
    background: linear-gradient(180deg, rgba(13, 24, 43, 0.9), rgba(9, 16, 29, 0.95));
    color: rgba(200, 220, 250, 0.72);
    font-size: 0.88rem;
    font-weight: 600;
    cursor: pointer;
    transition: border-color 0.18s ease, background 0.18s ease, color 0.18s ease;
}

.os-toggle-btn:hover {
    border-color: rgba(125, 190, 255, 0.45);
    color: #e8f3ff;
}

.os-toggle-btn.active {
    border-color: rgba(94, 170, 255, 0.6);
    background: linear-gradient(180deg, rgba(22, 42, 76, 0.95), rgba(14, 28, 54, 0.98));
    color: #c9e3ff;
    box-shadow: 0 0 12px rgba(80, 150, 255, 0.14);
}

.os-icon {
    font-size: 1rem;
}
</style>
