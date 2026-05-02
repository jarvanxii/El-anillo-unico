<template>
    <ThorondorPageShell>
        <section class="section-box intro-box">
            <div class="section-topline">
                <div class="module-header">
                    <span class="section-kicker">Despliegue tecnico</span>
                    <h1 class="section-name">Guia de instalacion</h1>
                    <p class="section-copy">
                        Thorondor instala un agente Python por host. El agente expone <code>/health</code> y
                        <code>/telemetry</code> por HTTP en una URL alcanzable desde el navegador: localhost, LAN, VPN,
                        IP publica o DNS. El navegador consulta esos endpoints por polling, guarda historico en IndexedDB
                        y evalua reglas localmente. No hay backend intermedio, cola de mensajes ni canal saliente desde
                        el host monitorizado.
                    </p>
                </div>
                <div class="phase-badge-block">
                    <span class="phase-badge">Deploy</span>
                    <small>Python 3.8+ · HTTP pull · IndexedDB</small>
                </div>
            </div>

            <div class="guide-grid">
                <div class="guide-card" v-for="item in installationHighlights" :key="item.label">
                    <label>{{ item.label }}</label>
                    <span>{{ item.copy }}</span>
                </div>
            </div>
        </section>

        <section class="section-box connection-selector-section">
            <div class="section-topline">
                <div class="module-header">
                    <span class="section-kicker">Tipo de conexion</span>
                    <h2 class="module-title">Monitorizacion {{ deploymentScopeLabel }}</h2>
                    <p class="module-copy">{{ deploymentScopeDescription }}</p>
                </div>
                <div class="deployment-selector-control">
                    <label class="field-label" for="guide-network-scope">Conexion del agente</label>
                    <select id="guide-network-scope" v-model="deploymentScope" class="form-select input-dark">
                        <option v-for="scope in deploymentScopeOptions" :key="scope.value" :value="scope.value">
                            {{ scope.shortLabel }}
                        </option>
                    </select>
                </div>
            </div>
        </section>

        <section class="section-box">
            <div class="section-topline">
                <div class="module-header">
                    <span class="section-kicker">Secuencia</span>
                    <h2 class="module-title">Orden correcto de despliegue</h2>
                    <p class="module-copy">
                        Genera el agente desde el formulario, copialo al host, instala las dependencias minimas, valida
                        los endpoints en foreground y solo despues registra el servicio persistente. Ese orden separa
                        errores de codigo, permisos, firewall y arranque automatico.
                    </p>
                </div>
                <div class="phase-badge-block">
                    <span class="phase-badge">Runbook</span>
                    <small>Generar, probar, persistir.</small>
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

        <div class="guide-section-title">
            <span>Instalacion</span>
            <h2>Instalacion del agente</h2>
            <p>Prepara el host, valida el endpoint y deja el servicio persistente segun el sistema operativo y el tipo de conexion elegido.</p>
        </div>

        <section class="section-box guide-phase-header">
            <div class="section-topline">
                <div class="module-header">
                    <span class="section-kicker">Host monitorizado</span>
                    <h2 class="module-title">Selecciona sistema objetivo</h2>
                    <p class="module-copy">
                        El agente es el mismo concepto en todos los sistemas, pero cambian gestor de paquetes,
                        servicio persistente, firewall y permisos de lectura. Ejecuta solo los comandos del sistema
                        donde vas a instalar el agente.
                    </p>
                </div>
                <div class="phase-badge-block">
                    <span class="phase-badge">{{ hostOsLabel }}</span>
                    <small>Comandos adaptados al destino.</small>
                </div>
            </div>

            <div class="os-selector-row">
                <p class="selector-label">Sistema del host:</p>
                <div class="os-toggle-group">
                    <button type="button" class="os-toggle-btn" :class="{ active: hostOs === 'ubuntu' }" @click="hostOs = 'ubuntu'">
                        Ubuntu / Debian / Kali
                    </button>
                    <button type="button" class="os-toggle-btn" :class="{ active: hostOs === 'rhel' }" @click="hostOs = 'rhel'">
                        RHEL / Rocky
                    </button>
                    <button type="button" class="os-toggle-btn" :class="{ active: hostOs === 'arch' }" @click="hostOs = 'arch'">
                        Arch / Manjaro
                    </button>
                    <button type="button" class="os-toggle-btn" :class="{ active: hostOs === 'windows' }" @click="hostOs = 'windows'">
                        Windows
                    </button>
                </div>
            </div>
        </section>

        <section v-for="section in hostCommandSections" :key="section.title" class="section-box">
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
                <article class="tool-card command-card" v-for="command in section.commands" :key="command.title">
                    <div class="card-head">
                        <h5>{{ command.title }}</h5>
                        <span class="mini-badge">{{ command.badge }}</span>
                    </div>
                    <div class="output-box copy-box">
                        <button class="copy-btn" :class="{ copied: copiedKey === command.title }" @click="copyCmd(command.command, command.title)">
                            {{ copiedKey === command.title ? 'Copiado' : 'Copiar' }}
                        </button>
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
                    <span class="section-kicker">Validacion</span>
                    <h2 class="module-title">Comprobaciones antes de registrar el host</h2>
                    <p class="module-copy">
                        Estas pruebas separan proceso, payload, red y servicio. No registres el host en el dashboard
                        hasta que <code>/health</code> y <code>/telemetry</code> respondan desde la maquina que abre
                        Thorondor.
                    </p>
                </div>
                <div class="phase-badge-block">
                    <span class="phase-badge">Validate</span>
                    <small>Proceso, JSON y conectividad.</small>
                </div>
            </div>

            <div class="card-grid validation-grid">
                <article class="tool-card command-card" v-for="check in validationChecks" :key="check.title">
                    <div class="card-head">
                        <h5>{{ check.title }}</h5>
                        <span class="mini-badge">{{ check.badge }}</span>
                    </div>
                    <p class="section-copy mb-0">{{ check.copy }}</p>
                    <div class="output-box copy-box">
                        <button class="copy-btn" :class="{ copied: copiedKey === check.title }" @click="copyCmd(check.command, check.title)">
                            {{ copiedKey === check.title ? 'Copiado' : 'Copiar' }}
                        </button>
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

        <div class="guide-section-title guide-section-title--danger">
            <span>Desinstalacion</span>
            <h2>Retirada y limpieza</h2>
            <p>Deten el servicio, elimina artefactos y cierra cualquier exposicion de red asociada al agente.</p>
        </div>

        <section class="section-box guide-phase-header">
            <div class="section-topline">
                <div class="module-header">
                    <span class="section-kicker">Retirada del agente</span>
                    <h2 class="module-title">Selecciona sistema a desinstalar</h2>
                    <p class="module-copy">
                        Deten el servicio antes de borrar ficheros. Cierra el puerto abierto en firewall y elimina los
                        datos locales del navegador si el host no va a volver a registrarse.
                    </p>
                </div>
                <div class="phase-badge-block">
                    <span class="phase-badge">{{ uninstallOsLabel }}</span>
                    <small>Sin reinicio requerido.</small>
                </div>
            </div>

            <div class="os-selector-row">
                <p class="selector-label">Sistema a desinstalar:</p>
                <div class="os-toggle-group">
                    <button type="button" class="os-toggle-btn" :class="{ active: uninstallOs === 'ubuntu' }" @click="uninstallOs = 'ubuntu'">
                        Ubuntu / Debian / Kali
                    </button>
                    <button type="button" class="os-toggle-btn" :class="{ active: uninstallOs === 'rhel' }" @click="uninstallOs = 'rhel'">
                        RHEL / Rocky
                    </button>
                    <button type="button" class="os-toggle-btn" :class="{ active: uninstallOs === 'arch' }" @click="uninstallOs = 'arch'">
                        Arch / Manjaro
                    </button>
                    <button type="button" class="os-toggle-btn" :class="{ active: uninstallOs === 'windows' }" @click="uninstallOs = 'windows'">
                        Windows
                    </button>
                </div>
            </div>
        </section>

        <section class="section-box">
            <div class="command-stack">
                <article class="tool-card command-card" v-for="cmd in uninstallCommands" :key="cmd.title">
                    <div class="card-head">
                        <h5>{{ cmd.title }}</h5>
                        <span class="mini-badge">{{ cmd.badge }}</span>
                    </div>
                    <div class="output-box copy-box">
                        <button class="copy-btn" :class="{ copied: copiedKey === cmd.title }" @click="copyCmd(cmd.command, cmd.title)">
                            {{ copiedKey === cmd.title ? 'Copiado' : 'Copiar' }}
                        </button>
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
import ThorondorPageShell from "@/components/VueloThorondor/ThorondorPageShell.vue";
import {
    THORONDOR_NETWORK_SCOPE_OPTIONS,
    normalizeThorondorNetworkScope
} from "@/features/vueloThorondor/data/thorondorDefaults";

const OS_LABELS = {
    ubuntu: "Ubuntu / Debian / Kali",
    rhel: "RHEL / Rocky",
    arch: "Arch / Manjaro",
    windows: "Windows"
};

export default {
    name: "ThorondorGuiaInstalacionView",

    components: {
        ThorondorPageShell
    },

    data() {
        return {
            copiedKey: null,
            deploymentScope: "lan",
            hostOs: "ubuntu",
            uninstallOs: "ubuntu"
        };
    },

    computed: {
        normalizedDeploymentScope() {
            return normalizeThorondorNetworkScope(this.deploymentScope);
        },

        isLocalDeployment() {
            return this.normalizedDeploymentScope === "local";
        },

        isLanDeployment() {
            return this.normalizedDeploymentScope === "lan";
        },

        isRemoteDeployment() {
            return this.normalizedDeploymentScope === "public";
        },

        deploymentScopeOptions() {
            return THORONDOR_NETWORK_SCOPE_OPTIONS;
        },

        deploymentScopeLabel() {
            return this.deploymentScopeOptions.find((item) => item.value === this.normalizedDeploymentScope)?.shortLabel || "LAN";
        },

        deploymentScopeDescription() {
            if (this.isLocalDeployment) {
                return "El navegador y el agente viven en la misma maquina. El agente escucha en 127.0.0.1 y no necesitas abrir firewall ni exponer puertos a la red.";
            }
            if (this.isLanDeployment) {
                return "El navegador consulta al agente por una IP privada, una VPN o una red de administracion. Debes permitir el puerto solo desde el cliente o la subred autorizada.";
            }
            return "El navegador consulta al agente por IP publica o DNS. Usa token Bearer, firewall con origen restringido y HTTPS si la aplicacion se sirve por HTTPS.";
        },

        hostOsLabel() {
            return OS_LABELS[this.hostOs] || this.hostOs;
        },

        uninstallOsLabel() {
            return OS_LABELS[this.uninstallOs] || this.uninstallOs;
        },

        installationHighlights() {
            return [
                {
                    label: "HTTP pull",
                    copy: "El agente no inicia conexiones salientes. El navegador abre las peticiones hacia la URL base configurada."
                },
                {
                    label: this.deploymentScopeLabel,
                    copy: this.deploymentScopeDescription
                },
                {
                    label: "Permisos explicitos",
                    copy: "Los logs protegidos se leen mediante grupos del sistema o permisos concretos. No se debe ejecutar el agente como root salvo diagnostico puntual."
                },
                {
                    label: "Persistencia local",
                    copy: "El historico reside en IndexedDB del navegador: snapshots, eventos, logs, reglas, alertas y estado de conexion por agente."
                }
            ];
        },

        installSteps() {
            return [
                {
                    title: "1. Generar artefactos",
                    badge: "Build",
                    copy: `Usa el generador en modo ${this.deploymentScopeLabel} para producir el agente, el instalador y la definicion de servicio con puerto, host, modulos y rutas de log ya embebidos.`
                },
                {
                    title: "2. Preparar runtime",
                    badge: "Runtime",
                    copy: "Instala Python 3.8+ y psutil. En Linux, crea un usuario de servicio sin shell y dale solo los grupos necesarios para leer logs."
                },
                {
                    title: "3. Smoke test",
                    badge: "HTTP",
                    copy: this.isLocalDeployment
                        ? "Ejecuta el agente en primer plano y valida /health y /telemetry contra 127.0.0.1. No abras firewall."
                        : "Ejecuta el agente en primer plano, valida /health y /telemetry desde localhost y despues repite desde la maquina cliente usando la URL final."
                },
                {
                    title: "4. Servicio persistente",
                    badge: "Service",
                    copy: "Registra systemd o Task Scheduler solo cuando el payload sea correcto. Verifica estado activo, reinicios a cero y puerto en escucha."
                },
                {
                    title: "5. Dashboard",
                    badge: "UI",
                    copy: this.isLocalDeployment
                        ? "Registra el host con http://127.0.0.1:<PUERTO>. Ese agente solo sera consultable desde la misma maquina."
                        : "Registra el host en Thorondor con la URL accesible desde el navegador: IP privada, VPN, IP publica o dominio."
                },
                {
                    title: "6. Reglas",
                    badge: "Rules",
                    copy: "Ajusta umbrales de CPU, RAM, disco, heartbeat y eventos de autenticacion segun el rol real del sistema monitorizado."
                }
            ];
        },

        hostCommandSections() {
            return this.hostOs === "windows" ? this.windowsCommandSections : this.linuxCommandSections;
        },

        linuxPackageCommand() {
            if (this.hostOs === "rhel") {
                return "sudo dnf install -y python3 python3-pip python3-psutil lm_sensors curl\npython3 -c \"import psutil; print(psutil.__version__)\"";
            }
            if (this.hostOs === "arch") {
                return "sudo pacman -Sy --needed python python-pip python-psutil lm_sensors curl\npython -c \"import psutil; print(psutil.__version__)\"";
            }
            return "sudo apt update\nsudo apt install -y python3 python3-pip python3-psutil lm-sensors curl\npython3 -c \"import psutil; print(psutil.__version__)\"";
        },

        linuxFirewallCommand() {
            const source = this.isRemoteDeployment ? "<IP_PUBLICA_CLIENTE_O_CIDR>" : "<IP_CLIENTE_O_CIDR>";
            if (this.hostOs === "rhel") {
                return `sudo firewall-cmd --permanent --add-rich-rule='rule family="ipv4" source address="${source}" port protocol="tcp" port="<PUERTO>" accept'\nsudo firewall-cmd --reload\nsudo firewall-cmd --list-rich-rules`;
            }
            if (this.hostOs === "arch") {
                return `sudo ss -lntp | grep ':<PUERTO>'\n# Si usas ufw:\nsudo ufw allow from ${source} to any port <PUERTO> proto tcp`;
            }
            return `sudo ufw allow from ${source} to any port <PUERTO> proto tcp\nsudo ufw status numbered`;
        },

        linuxCommandSections() {
            return [
                {
                    kicker: "Preparacion",
                    title: "Preparar usuario, directorio y runtime",
                    copy: "El agente debe ejecutarse con una cuenta dedicada. Los permisos de lectura se conceden de forma explicita mediante grupos del sistema.",
                    badge: "Linux",
                    note: this.hostOsLabel,
                    commands: [
                        {
                            title: "Crear usuario y directorio",
                            badge: "User",
                            command: "sudo useradd --system --home-dir /opt/thorondor-agent --create-home --shell /usr/sbin/nologin thorondor\nsudo chown -R thorondor:thorondor /opt/thorondor-agent\nsudo usermod -aG adm,systemd-journal thorondor",
                            purpose: "Crea una cuenta sin login interactivo, prepara /opt/thorondor-agent y permite leer auth.log/journal sin ejecutar como root.",
                            when: "Si reutilizas otra cuenta, aplica solo los grupos necesarios. Reinicia el servicio tras cambiar membresias de grupo.",
                            expected: "id thorondor muestra grupos adm y systemd-journal. El directorio pertenece a thorondor."
                        },
                        {
                            title: "Instalar dependencias",
                            badge: "Python",
                            command: this.linuxPackageCommand,
                            purpose: "Instala Python, psutil y herramientas de diagnostico. lm-sensors es opcional y aporta temperatura si el hardware la expone.",
                            when: "Si psutil viene del gestor de paquetes, evita mezclarlo con pip global salvo que la distro no lo proporcione.",
                            expected: "El comando de Python imprime la version de psutil sin ImportError."
                        },
                        {
                            title: "Copiar artefactos generados",
                            badge: "Deploy",
                            command: "sudo install -o thorondor -g thorondor -m 0750 thorondor-agent.py /opt/thorondor-agent/thorondor-agent.py\nsudo install -o root -g root -m 0644 thorondor-agent.service /etc/systemd/system/thorondor-agent.service",
                            purpose: "Copia el agente generado y su unidad systemd en rutas estables con permisos reproducibles.",
                            when: "Confirma que el agente corresponde a ese host: SYSTEM_NAME, LISTEN_HOST y LISTEN_PORT deben coincidir con el formulario.",
                            expected: "Los ficheros existen y systemd puede leer la unidad."
                        }
                    ]
                },
                {
                    kicker: "Servicio",
                    title: this.isLocalDeployment ? "Smoke test local y servicio systemd" : "Smoke test, red y servicio systemd",
                    copy: this.isLocalDeployment
                        ? "Primero prueba en foreground contra 127.0.0.1. Si el proceso arranca y devuelve JSON valido, habilita el servicio persistente."
                        : "Primero prueba en foreground. Si el proceso arranca y devuelve JSON valido, abre la ruta de red necesaria y habilita el servicio persistente.",
                    badge: "Service",
                    note: "Validar antes de enable",
                    commands: [
                        {
                            title: "Ejecutar en primer plano",
                            badge: "Smoke",
                            command: "sudo -u thorondor python3 /opt/thorondor-agent/thorondor-agent.py",
                            purpose: "Arranca el agente sin systemd para ver errores de permisos, imports, puerto ocupado o rutas de log inexistentes.",
                            when: "Deja esta terminal abierta y prueba /health desde otra terminal. Corta con Ctrl+C cuando responda correctamente.",
                            expected: "Proceso en escucha sin stacktrace. Si falla PermissionError, revisa grupos y rutas de logs."
                        },
                        {
                            title: "Habilitar servicio",
                            badge: "systemd",
                            command: "sudo systemctl daemon-reload\nsudo systemctl enable --now thorondor-agent.service\nsystemctl status thorondor-agent.service --no-pager\nsystemctl show thorondor-agent.service -p ActiveState,NRestarts,ExecMainStatus --value",
                            purpose: "Registra el agente como servicio persistente, arranca ahora y muestra estado operativo real.",
                            when: "NRestarts mayor que 0 indica bucle de fallo. Revisa journalctl antes de registrar el host en el dashboard.",
                            expected: "ActiveState=active, NRestarts=0 y ExecMainStatus=0."
                        },
                        ...(this.isLocalDeployment ? [] : [{
                            title: "Abrir firewall solo al cliente",
                            badge: "Firewall",
                            command: this.linuxFirewallCommand,
                            purpose: "Permite acceso TCP al puerto del agente desde la IP del navegador o desde la subred de administracion.",
                            when: this.isRemoteDeployment
                                ? "Usa una allowlist real: tu IP fija, VPN, bastion o rango de administracion. Si necesitas 0.0.0.0/0, exige token y pon un reverse proxy TLS delante."
                                : "No abras rangos amplios. Permite solo la IP del navegador, la subred de administracion o la VPN.",
                            expected: "El puerto aparece permitido y el cliente puede conectar a /health."
                        }])
                    ]
                }
            ];
        },

        windowsCommandSections() {
            return [
                {
                    kicker: "Preparacion",
                    title: "Preparar runtime Windows",
                    copy: "En Windows el agente se instala en ProgramData y se ejecuta mediante Task Scheduler. PowerShell debe ejecutarse como Administrador.",
                    badge: "Windows",
                    note: "PowerShell administrador",
                    commands: [
                        {
                            title: "Verificar PowerShell y Python",
                            badge: "Runtime",
                            command: "$PSVersionTable.PSVersion\npython --version\npython -c \"import sys; print(sys.executable)\"",
                            purpose: "Comprueba que PowerShell y Python estan disponibles antes de instalar el agente.",
                            when: "Si python no existe, instala Python 3.12 con winget o desde python.org activando Add Python to PATH.",
                            expected: "PowerShell 5.1+ y Python 3.x accesible desde PATH."
                        },
                        {
                            title: "Instalar psutil",
                            badge: "pip",
                            command: "pip install psutil\npython -c \"import psutil; print(psutil.__version__)\"",
                            purpose: "Instala la libreria usada para CPU, RAM, disco, red y procesos.",
                            when: "Si pip falla por permisos, ejecuta PowerShell como Administrador o usa el mismo usuario que ejecutara la tarea programada.",
                            expected: "La importacion de psutil imprime version sin error."
                        },
                        {
                            title: "Copiar agente generado",
                            badge: "Deploy",
                            command: "New-Item -ItemType Directory -Force -Path 'C:\\ProgramData\\Thorondor-Agent'\nCopy-Item '.\\thorondor-agent.py' 'C:\\ProgramData\\Thorondor-Agent\\thorondor-agent.py' -Force",
                            purpose: "Deja el agente en una ruta estable independiente del perfil de usuario.",
                            when: "Abre el .py y confirma LISTEN_HOST, LISTEN_PORT y SYSTEM_NAME antes de crear la tarea.",
                            expected: "C:\\ProgramData\\Thorondor-Agent contiene thorondor-agent.py."
                        }
                    ]
                },
                {
                    kicker: "Servicio",
                    title: this.isLocalDeployment ? "Tarea programada local" : "Tarea programada y red",
                    copy: this.isLocalDeployment
                        ? "Valida el agente en foreground y crea la tarea persistente. No necesitas abrir firewall si solo consultas desde la misma maquina."
                        : "Valida el agente en foreground, crea la tarea persistente y abre el puerto TCP solo para la red necesaria.",
                    badge: "Task",
                    note: "Task Scheduler",
                    commands: [
                        {
                            title: "Smoke test local",
                            badge: "HTTP",
                            command: "python C:\\ProgramData\\Thorondor-Agent\\thorondor-agent.py\nInvoke-RestMethod http://127.0.0.1:<PUERTO>/health",
                            purpose: "Arranca el agente y comprueba el endpoint de salud en localhost.",
                            when: "Si el puerto esta ocupado, cambia el puerto en el generador y regenera el agente.",
                            expected: "JSON con status ok, port y heartbeat reciente."
                        },
                        {
                            title: "Crear tarea programada",
                            badge: "Schedule",
                            command: "$action = New-ScheduledTaskAction -Execute 'python.exe' -Argument 'C:\\ProgramData\\Thorondor-Agent\\thorondor-agent.py'\n$trigger = New-ScheduledTaskTrigger -AtStartup\nRegister-ScheduledTask -TaskName 'ThorondorAgent' -Action $action -Trigger $trigger -RunLevel Highest -Description 'Thorondor monitoring agent'\nStart-ScheduledTask -TaskName 'ThorondorAgent'",
                            purpose: "Registra el agente como tarea al arranque y la inicia sin esperar al siguiente reinicio.",
                            when: "Si el entorno requiere credenciales concretas, configura el principal de la tarea segun la politica local.",
                            expected: "Get-ScheduledTask -TaskName ThorondorAgent muestra estado Ready o Running."
                        },
                        ...(this.isLocalDeployment ? [] : [{
                            title: "Abrir firewall",
                            badge: "Firewall",
                            command: this.isRemoteDeployment
                                ? "New-NetFirewallRule -DisplayName 'Thorondor Agent' -Direction Inbound -Protocol TCP -LocalPort <PUERTO> -Action Allow -Profile Any -RemoteAddress <IP_PUBLICA_CLIENTE_O_CIDR>"
                                : "New-NetFirewallRule -DisplayName 'Thorondor Agent' -Direction Inbound -Protocol TCP -LocalPort <PUERTO> -Action Allow -Profile Private -RemoteAddress <IP_CLIENTE_O_CIDR>",
                            purpose: "Permite conexiones entrantes al puerto del agente desde el cliente, VPN, bastion o rango de administracion.",
                            when: this.isRemoteDeployment
                                ? "Evita Any como RemoteAddress en Internet. Si expones IP publica, combina token, origen restringido y preferiblemente reverse proxy TLS."
                                : "Usa Profile Private si es una LAN confiable y restringe RemoteAddress a cliente, VPN o subred de administracion.",
                            expected: "Test-NetConnection -ComputerName <IP_O_DNS_HOST> -Port <PUERTO> funciona desde el cliente."
                        }])
                    ]
                }
            ];
        },

        validationChecks() {
            const checks = [
                {
                    title: "Health local",
                    badge: "Local",
                    copy: "Comprueba que el proceso responde en el propio host.",
                    command: "# Sin token\ncurl -s http://127.0.0.1:<PUERTO>/health\n\n# Con token\ncurl -s -H \"Authorization: Bearer <TOKEN>\" http://127.0.0.1:<PUERTO>/health",
                    confirms: "El proceso esta vivo, escucha en el puerto configurado y aplica autenticacion si fue generada.",
                    expected: "JSON con status ok, heartbeat y nombre del sistema."
                },
                {
                    title: "Telemetry local",
                    badge: "JSON",
                    copy: "Comprueba estructura de payload antes de abrirlo a la red.",
                    command: "curl -s -H \"Authorization: Bearer <TOKEN_SI_EXISTE>\" http://127.0.0.1:<PUERTO>/telemetry | python3 -m json.tool | grep -E '\"(system|metrics|security|logs|heartbeat)\"'",
                    confirms: "El payload contiene los bloques raiz que consume Vuex.",
                    expected: "Aparecen system, metrics, security, logs y heartbeat."
                },
                {
                    title: "Estado del servicio",
                    badge: "Service",
                    copy: "Detecta bucles de reinicio y errores ocultos por el gestor de servicio.",
                    command: "systemctl show thorondor-agent.service -p ActiveState,NRestarts,ExecMainStatus --value\njournalctl -u thorondor-agent.service -n 30 --no-pager",
                    confirms: "Servicio estable, sin reinicios y sin errores recientes.",
                    expected: "active, 0 reinicios y ExecMainStatus=0."
                }
            ];

            if (this.isLanDeployment) {
                checks.splice(2, 0, {
                    title: "Conexion LAN o VPN",
                    badge: "LAN",
                    copy: "Ejecuta desde la maquina que abre Thorondor dentro de la red privada o VPN.",
                    command: "curl -v --connect-timeout 5 -H \"Authorization: Bearer <TOKEN_SI_EXISTE>\" http://<IP_PRIVADA_O_VPN>:<PUERTO>/health",
                    confirms: "Ruta, firewall, CORS y bind address permiten acceso real desde el navegador.",
                    expected: "Conexion TCP establecida y JSON de /health. Timeout significa red/firewall; refused significa puerto sin escucha."
                });
            }

            if (this.isRemoteDeployment) {
                checks.splice(2, 0, {
                    title: "Conexion remota",
                    badge: "Remoto",
                    copy: "Ejecuta desde una red externa a la del host.",
                    command: "curl -v --connect-timeout 5 -H \"Authorization: Bearer <TOKEN>\" <URL_REMOTA_DEL_AGENTE>/health",
                    confirms: "DNS/IP publica, NAT, firewall, token, CORS y bind address permiten acceso real desde fuera.",
                    expected: "HTTP 200 con token valido. HTTP 401 sin token tambien confirma que el endpoint llega al agente."
                }, {
                    title: "HTTPS y navegador",
                    badge: "TLS",
                    copy: "Comprueba que el navegador no bloqueara la peticion por mixed content.",
                    command: "curl -s -o /dev/null -w \"%{http_code}\\n\" <URL_REMOTA_DEL_AGENTE>/health\n# Si la aplicacion se sirve por HTTPS, usa https:// tambien para el agente.",
                    confirms: "El endpoint remoto usa el esquema correcto para poder ser consultado desde la UI.",
                    expected: "200 con token valido o 401 sin token. Si hay error TLS, corrige certificado o proxy antes de registrar."
                });
            }

            return checks;
        },

        uninstallCommands() {
            if (this.uninstallOs === "windows") {
                return [
                    {
                        title: "Eliminar tarea programada",
                        badge: "Task",
                        command: "Unregister-ScheduledTask -TaskName 'ThorondorAgent' -Confirm:$false",
                        purpose: "Detiene y elimina la tarea que arranca el agente.",
                        when: "Ejecutar como Administrador.",
                        expected: "Get-ScheduledTask -TaskName ThorondorAgent no devuelve resultados."
                    },
                    {
                        title: "Eliminar ficheros",
                        badge: "Files",
                        command: "Remove-Item -Recurse -Force 'C:\\ProgramData\\Thorondor-Agent'",
                        purpose: "Borra agente, baseline y ficheros auxiliares.",
                        when: "Si algun fichero esta bloqueado, confirma que la tarea ya no existe.",
                        expected: "Test-Path 'C:\\ProgramData\\Thorondor-Agent' devuelve False."
                    },
                    ...(this.isLocalDeployment ? [] : [{
                        title: "Cerrar firewall",
                        badge: "Firewall",
                        command: "Remove-NetFirewallRule -DisplayName 'Thorondor Agent'",
                        purpose: "Elimina la regla TCP entrante del agente.",
                        when: "Si la regla no existe, el error no es critico.",
                        expected: "La regla deja de aparecer en Get-NetFirewallRule."
                    }])
                ];
            }

            return [
                {
                    title: "Detener servicio",
                    badge: "systemd",
                    command: "sudo systemctl stop thorondor-agent.service\nsudo systemctl disable thorondor-agent.service",
                    purpose: "Para el agente y desactiva su arranque automatico.",
                    when: "Ejecutar antes de borrar ficheros.",
                    expected: "systemctl is-active thorondor-agent.service devuelve inactive."
                },
                {
                    title: "Eliminar unidad y ficheros",
                    badge: "Files",
                    command: "sudo rm -f /etc/systemd/system/thorondor-agent.service\nsudo systemctl daemon-reload\nsudo rm -rf /opt/thorondor-agent",
                    purpose: "Borra la unidad systemd y el directorio del agente.",
                    when: "Si quieres conservar el baseline de integridad, copialo antes.",
                    expected: "systemctl list-units --all | grep thorondor no devuelve resultados."
                },
                {
                    title: "Eliminar usuario dedicado",
                    badge: "User",
                    command: "sudo userdel -r thorondor",
                    purpose: "Borra la cuenta de servicio si fue creada exclusivamente para Thorondor.",
                    when: "Omitir si reutilizaste un usuario existente.",
                    expected: "id thorondor devuelve no such user."
                },
                ...(this.isLocalDeployment ? [] : [{
                    title: "Cerrar puerto",
                    badge: "Firewall",
                    command: this.isRemoteDeployment
                        ? "# UFW\nsudo ufw delete allow from <IP_PUBLICA_CLIENTE_O_CIDR> to any port <PUERTO> proto tcp\nsudo ufw delete allow <PUERTO>/tcp\n\n# firewalld\nsudo firewall-cmd --permanent --remove-rich-rule='rule family=\"ipv4\" source address=\"<IP_PUBLICA_CLIENTE_O_CIDR>\" port protocol=\"tcp\" port=\"<PUERTO>\" accept'\nsudo firewall-cmd --permanent --remove-port=<PUERTO>/tcp\nsudo firewall-cmd --reload"
                        : "# UFW\nsudo ufw delete allow from <IP_CLIENTE_O_CIDR> to any port <PUERTO> proto tcp\nsudo ufw delete allow <PUERTO>/tcp\n\n# firewalld\nsudo firewall-cmd --permanent --remove-rich-rule='rule family=\"ipv4\" source address=\"<IP_CLIENTE_O_CIDR>\" port protocol=\"tcp\" port=\"<PUERTO>\" accept'\nsudo firewall-cmd --permanent --remove-port=<PUERTO>/tcp\nsudo firewall-cmd --reload",
                    purpose: "Revierte la exposicion TCP del agente.",
                    when: "Ejecuta solo el bloque del firewall activo en el host.",
                    expected: "El puerto deja de responder desde el cliente."
                }])
            ];
        }
    },

    methods: {
        copyCmd(text, key) {
            if (!navigator.clipboard) return;
            navigator.clipboard.writeText(text).then(() => {
                this.copiedKey = key;
                setTimeout(() => {
                    this.copiedKey = null;
                }, 1800);
            });
        }
    }
};
</script>

<style scoped>
.command-stack {
    display: grid;
    gap: 1rem;
}

.command-card {
    background: linear-gradient(180deg, rgba(26, 36, 50, 0.98), rgba(17, 25, 36, 0.98));
}

.command-meta {
    display: grid;
    gap: 0.8rem;
}

.validation-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
}

.connection-selector-section {
    border-color: rgba(148, 163, 184, 0.42);
    background: linear-gradient(180deg, rgba(23, 34, 47, 0.98), rgba(13, 21, 31, 0.98));
}

.deployment-selector-control {
    display: grid;
    gap: 0.45rem;
    align-self: end;
}

.guide-section-title {
    display: grid;
    gap: 0.45rem;
    margin: 2.35rem 0 1.1rem;
    padding: 1.15rem 1.25rem;
    border-left: 3px solid rgba(148, 163, 184, 0.72);
    background: linear-gradient(90deg, rgba(20, 30, 42, 0.92), rgba(20, 30, 42, 0.22));
}

.guide-section-title--danger {
    border-left-color: rgba(248, 113, 113, 0.68);
}

.guide-section-title span {
    color: #a9bacb;
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
}

.guide-section-title h2 {
    margin: 0;
    color: #f8fafc;
    font-size: clamp(1.35rem, 2vw, 1.85rem);
    font-weight: 800;
}

.guide-section-title p {
    margin: 0;
    color: rgba(203, 213, 225, 0.88);
    line-height: 1.65;
}

.meta-line {
    display: grid;
    gap: 0.3rem;
}

.meta-line label {
    color: #a9bacb;
    font-size: 0.8rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}

.meta-line p {
    margin: 0;
    color: rgba(226, 235, 244, 0.9);
}

.copy-box {
    position: relative;
    padding-top: 2.7rem;
}

.copy-box .result-pre {
    margin: 0;
}

.copy-btn {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    display: inline-flex;
    align-items: center;
    padding: 0.32rem 0.78rem;
    border-radius: 6px;
    border: 1px solid rgba(148, 163, 184, 0.34);
    background: rgba(21, 31, 43, 0.92);
    color: #dbe5ef;
    font-size: 0.76rem;
    font-weight: 700;
    cursor: pointer;
    transition: border-color 0.15s ease, color 0.15s ease, background 0.15s ease;
    white-space: nowrap;
}

.copy-btn:hover {
    border-color: rgba(183, 197, 211, 0.58);
    background: rgba(35, 49, 65, 0.98);
    color: #f8fbff;
}

.copy-btn.copied {
    border-color: rgba(74, 222, 128, 0.5);
    color: #86efac;
}

.os-selector-row {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 1rem;
}

.selector-label {
    margin: 0;
    color: #dbe5ef;
    font-weight: 700;
}

.os-toggle-group {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.os-toggle-btn {
    display: inline-flex;
    align-items: center;
    padding: 0.55rem 1.1rem;
    border-radius: 8px;
    border: 1px solid rgba(148, 163, 184, 0.28);
    background: linear-gradient(180deg, rgba(28, 39, 53, 0.96), rgba(18, 27, 39, 0.98));
    color: rgba(216, 226, 236, 0.78);
    font-size: 0.88rem;
    font-weight: 700;
    cursor: pointer;
    transition: border-color 0.18s ease, background 0.18s ease, color 0.18s ease;
}

.os-toggle-btn:hover,
.os-toggle-btn.active {
    border-color: rgba(185, 202, 219, 0.56);
    background: linear-gradient(180deg, rgba(48, 63, 80, 0.96), rgba(31, 43, 58, 0.98));
    color: #f4f8fb;
}

@media (max-width: 1199px) {
    .validation-grid {
        grid-template-columns: 1fr;
    }
}
</style>
