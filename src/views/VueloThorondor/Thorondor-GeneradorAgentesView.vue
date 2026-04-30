<template>
    <ThorondorPageShell>
        <section class="section-box intro-box">
            <div class="section-topline">
                <div class="module-header">
                    <span class="section-kicker">Generador dinamico</span>
                    <h1 class="section-name">Generador de agentes</h1>
                    <p class="section-copy">
                        Esta vista crea el agente Python, el script de instalacion y, si lo activas, tambien la unidad
                        systemd a partir del formulario. Tambien deja preparadas las reglas JavaScript que el frontend
                        utilizara para consultar ese host Linux desde tu navegador.
                    </p>
                </div>
                <div class="phase-badge-block">
                    <span class="phase-badge">Build</span>
                    <small>Agente .py + .service opcional + .sh + reglas de peticion.</small>
                </div>
            </div>

            <div class="guide-grid">
                <div class="guide-card" v-for="item in generatorHighlights" :key="item.label">
                    <label>{{ item.label }}</label>
                    <span>{{ item.copy }}</span>
                </div>
            </div>
        </section>

        <section class="section-box">
            <div class="os-selector-row">
                <label class="field-label mb-2">Sistema operativo objetivo</label>
                <div class="os-toggle-group">
                    <button type="button" class="os-toggle-btn" :class="{ active: !isWindows }" @click="agentDraft.targetOs = 'linux'">
                        <span class="os-icon">🐧</span> Linux
                    </button>
                    <button type="button" class="os-toggle-btn" :class="{ active: isWindows }" @click="agentDraft.targetOs = 'windows'">
                        <span class="os-icon">🪟</span> Windows
                    </button>
                </div>
                <p class="os-hint">{{ isWindows ? 'Genera thorondor-agent.py + install-thorondor-agent.ps1 para Windows. Usa Task Scheduler como gestor de arranque.' : 'Genera thorondor-agent.py + thorondor-agent.service + install-thorondor-agent.sh para Linux. Usa systemd como gestor de arranque.' }}</p>
            </div>

            <div class="control-grid">
                <div class="control-field">
                    <div class="field-heading">
                        <label class="field-label" for="host-display-name">Nombre visible del host</label>
                        <div class="context-help">
                            <button type="button" class="help-trigger" :class="{ 'is-pinned': pinnedHelpKey === 'displayName' }" aria-label="Ayuda sobre el nombre visible del host" @click.stop="togglePinnedHelp('displayName')">
                                ?
                                <span class="help-popover" @click.stop>
                                    <strong>{{ fieldGuides.displayName.title }}</strong>
                                    {{ fieldGuides.displayName.copy }}
                                </span>
                            </button>
                        </div>
                    </div>
                    <input id="host-display-name" v-model="agentDraft.displayName" :placeholder="fieldGuides.displayName.placeholder" class="form-control input-dark" />
                </div>
                <div class="control-field">
                    <div class="field-heading">
                        <label class="field-label" for="system-name">Identificador tecnico del sistema</label>
                        <div class="context-help">
                            <button type="button" class="help-trigger" :class="{ 'is-pinned': pinnedHelpKey === 'systemName' }" aria-label="Ayuda sobre el identificador del sistema" @click.stop="togglePinnedHelp('systemName')">
                                ?
                                <span class="help-popover" @click.stop>
                                    <strong>{{ fieldGuides.systemName.title }}</strong>
                                    {{ fieldGuides.systemName.copy }}
                                </span>
                            </button>
                        </div>
                    </div>
                    <input id="system-name" v-model="agentDraft.systemName" :placeholder="fieldGuides.systemName.placeholder" class="form-control input-dark" />
                </div>
                <div v-if="!isWindows" class="control-field">
                    <div class="field-heading">
                        <label class="field-label" for="distro">Familia Linux</label>
                        <div class="context-help">
                            <button type="button" class="help-trigger" :class="{ 'is-pinned': pinnedHelpKey === 'distro' }" aria-label="Ayuda sobre la distribucion Linux" @click.stop="togglePinnedHelp('distro')">
                                ?
                                <span class="help-popover" @click.stop>
                                    <strong>{{ fieldGuides.distro.title }}</strong>
                                    {{ fieldGuides.distro.copy }}
                                </span>
                            </button>
                        </div>
                    </div>
                    <select id="distro" v-model="agentDraft.distro" class="form-select input-dark">
                        <option value="" disabled>Selecciona una familia Linux</option>
                        <option v-for="item in distroOptions" :key="item" :value="item">{{ item }}</option>
                    </select>
                </div>
                <div class="control-field">
                    <div class="field-heading">
                        <label class="field-label" for="os-version">{{ isWindows ? 'Version de Windows' : 'Version aproximada' }}</label>
                        <div class="context-help">
                            <button type="button" class="help-trigger" :class="{ 'is-pinned': pinnedHelpKey === 'osVersion' }" aria-label="Ayuda sobre la version del sistema" @click.stop="togglePinnedHelp('osVersion')">
                                ?
                                <span class="help-popover" @click.stop>
                                    <strong>{{ fieldGuides.osVersion.title }}</strong>
                                    {{ fieldGuides.osVersion.copy }}
                                </span>
                            </button>
                        </div>
                    </div>
                    <select v-if="isWindows" id="os-version" v-model="agentDraft.osVersion" class="form-select input-dark">
                        <option value="" disabled>Selecciona version de Windows</option>
                        <option v-for="item in windowsVersionOptions" :key="item" :value="item">{{ item }}</option>
                    </select>
                    <input v-else id="os-version" v-model="agentDraft.osVersion" :placeholder="fieldGuides.osVersion.placeholder" class="form-control input-dark" />
                </div>
                <div class="control-field">
                    <div class="field-heading">
                        <label class="field-label" for="receiver-url">URL accesible del agente desde este navegador</label>
                        <div class="context-help">
                            <button type="button" class="help-trigger" :class="{ 'is-pinned': pinnedHelpKey === 'receiverUrl' }" aria-label="Ayuda sobre la URL accesible del agente" @click.stop="togglePinnedHelp('receiverUrl')">
                                ?
                                <span class="help-popover" @click.stop>
                                    <strong>{{ fieldGuides.receiverUrl.title }}</strong>
                                    {{ fieldGuides.receiverUrl.copy }}
                                </span>
                            </button>
                        </div>
                    </div>
                    <input id="receiver-url" v-model="agentDraft.receiverUrl" :placeholder="fieldGuides.receiverUrl.placeholder" class="form-control input-dark" />
                </div>
                <div class="control-field">
                    <div class="field-heading">
                        <label class="field-label" for="host-ip">{{ isWindows ? 'IP privada del host Windows' : 'IP privada del host Linux' }}</label>
                        <div class="context-help">
                            <button type="button" class="help-trigger" :class="{ 'is-pinned': pinnedHelpKey === 'hostIp' }" aria-label="Ayuda sobre la IP privada del host" @click.stop="togglePinnedHelp('hostIp')">
                                ?
                                <span class="help-popover" @click.stop>
                                    <strong>{{ fieldGuides.hostIp.title }}</strong>
                                    {{ fieldGuides.hostIp.copy }}
                                </span>
                            </button>
                        </div>
                    </div>
                    <input id="host-ip" v-model="agentDraft.hostIp" :placeholder="fieldGuides.hostIp.placeholder" class="form-control input-dark" />
                </div>
                <div class="control-field">
                    <div class="field-heading">
                        <label class="field-label" for="receiver-port">Puerto HTTP del agente</label>
                        <div class="context-help">
                            <button type="button" class="help-trigger" :class="{ 'is-pinned': pinnedHelpKey === 'port' }" aria-label="Ayuda sobre el puerto del agente" @click.stop="togglePinnedHelp('port')">
                                ?
                                <span class="help-popover" @click.stop>
                                    <strong>{{ fieldGuides.port.title }}</strong>
                                    {{ fieldGuides.port.copy }}
                                </span>
                            </button>
                        </div>
                    </div>
                    <input id="receiver-port" v-model.number="agentDraft.port" type="number" min="1" max="65535" :placeholder="fieldGuides.port.placeholder" class="form-control input-dark" />
                </div>
                <div class="control-field">
                    <div class="field-heading">
                        <label class="field-label" for="poll-interval">Intervalo de polling en segundos</label>
                        <div class="context-help">
                            <button type="button" class="help-trigger" :class="{ 'is-pinned': pinnedHelpKey === 'intervalSeconds' }" aria-label="Ayuda sobre el intervalo de polling" @click.stop="togglePinnedHelp('intervalSeconds')">
                                ?
                                <span class="help-popover" @click.stop>
                                    <strong>{{ fieldGuides.intervalSeconds.title }}</strong>
                                    {{ fieldGuides.intervalSeconds.copy }}
                                </span>
                            </button>
                        </div>
                    </div>
                    <input id="poll-interval" v-model.number="agentDraft.intervalSeconds" type="number" min="10" class="form-control input-dark" />
                </div>
                <div v-if="!isWindows" class="control-field">
                    <div class="field-heading">
                        <label class="field-label" for="install-user">Usuario del servicio en Linux</label>
                        <div class="context-help">
                            <button type="button" class="help-trigger" :class="{ 'is-pinned': pinnedHelpKey === 'installUser' }" aria-label="Ayuda sobre el usuario del servicio" @click.stop="togglePinnedHelp('installUser')">
                                ?
                                <span class="help-popover" @click.stop>
                                    <strong>{{ fieldGuides.installUser.title }}</strong>
                                    {{ fieldGuides.installUser.copy }}
                                </span>
                            </button>
                        </div>
                    </div>
                    <input id="install-user" v-model="agentDraft.installUser" :placeholder="fieldGuides.installUser.placeholder" class="form-control input-dark" />
                </div>
                <div v-if="!isWindows" class="control-field">
                    <div class="field-heading">
                        <label class="field-label" for="service-name">Nombre tecnico del servicio</label>
                        <div class="context-help">
                            <button type="button" class="help-trigger" :class="{ 'is-pinned': pinnedHelpKey === 'serviceName' }" aria-label="Ayuda sobre el nombre del servicio" @click.stop="togglePinnedHelp('serviceName')">
                                ?
                                <span class="help-popover" @click.stop>
                                    <strong>{{ fieldGuides.serviceName.title }}</strong>
                                    {{ fieldGuides.serviceName.copy }}
                                </span>
                            </button>
                        </div>
                    </div>
                    <input id="service-name" v-model="agentDraft.serviceName" :placeholder="fieldGuides.serviceName.placeholder" class="form-control input-dark" />
                </div>
                <div class="control-field full-span">
                    <div class="field-heading">
                        <label class="field-label" for="additional-logs">Rutas de logs adicionales</label>
                        <div class="context-help">
                            <button type="button" class="help-trigger" :class="{ 'is-pinned': pinnedHelpKey === 'additionalLogPaths' }" aria-label="Ayuda sobre las rutas de logs adicionales" @click.stop="togglePinnedHelp('additionalLogPaths')">
                                ?
                                <span class="help-popover" @click.stop>
                                    <strong>{{ fieldGuides.additionalLogPaths.title }}</strong>
                                    {{ fieldGuides.additionalLogPaths.copy }}
                                </span>
                            </button>
                        </div>
                    </div>
                    <textarea id="additional-logs" v-model="agentDraft.additionalLogPaths" rows="4" class="form-control input-dark textarea-dark"></textarea>
                </div>
                <div class="control-field full-span">
                    <div class="field-heading">
                        <label class="field-label">Modulos a activar</label>
                        <div class="context-help">
                            <button type="button" class="help-trigger" :class="{ 'is-pinned': pinnedHelpKey === 'modules' }" aria-label="Ayuda sobre los modulos a activar" @click.stop="togglePinnedHelp('modules')">
                                ?
                                <span class="help-popover" @click.stop>
                                    <strong>{{ fieldGuides.modules.title }}</strong>
                                    {{ fieldGuides.modules.copy }}
                                </span>
                            </button>
                        </div>
                    </div>
                    <div class="checkbox-grid">
                        <label class="toggle-line" v-for="moduleItem in moduleOptions" :key="moduleItem.key">
                            <input type="checkbox" v-model="agentDraft.modules[moduleItem.key]" />
                            <span>{{ moduleItem.label }}</span>
                        </label>
                    </div>
                </div>
                <div v-if="!isWindows" class="control-field full-span">
                    <div class="field-heading">
                        <label class="field-label mb-0">Despliegue con systemd</label>
                        <div class="context-help">
                            <button type="button" class="help-trigger" :class="{ 'is-pinned': pinnedHelpKey === 'generateSystemd' }" aria-label="Ayuda sobre la generacion del archivo systemd" @click.stop="togglePinnedHelp('generateSystemd')">
                                ?
                                <span class="help-popover" @click.stop>
                                    <strong>{{ fieldGuides.generateSystemd.title }}</strong>
                                    {{ fieldGuides.generateSystemd.copy }}
                                </span>
                            </button>
                        </div>
                    </div>
                    <label class="toggle-line">
                        <input type="checkbox" v-model="agentDraft.generateSystemd" />
                        <span>Generar tambien archivo .service para systemd</span>
                    </label>
                </div>
            </div>

            <div class="inline-actions">
                <button class="btn btn-main" :disabled="!isGenerateReady" :title="generateButtonTitle" @click="generateAndDownload">Generar y descargar</button>
                <button class="btn btn-subtle" @click="registerCurrentDraft">Registrar host</button>
                <button class="btn btn-subtle" @click="pollNow">Probar polling ahora</button>
                <button class="btn btn-subtle" @click="clearFormData">Borrar datos del formulario</button>
            </div>
            <p v-if="!isGenerateReady" class="form-status-hint">
                Completa los campos obligatorios para habilitar la generacion: {{ missingRequiredFieldLabels.join(" / ") }}.
            </p>

            <div class="action-guide-grid">
                <article class="action-guide-card" v-for="item in actionHelpCards" :key="item.title">
                    <div class="action-guide-icon">?</div>
                    <div class="action-guide-body">
                        <strong>{{ item.title }}</strong>
                        <p>{{ item.copy }}</p>
                    </div>
                </article>
            </div>
        </section>

        <section class="section-box">
            <div class="row g-3">
                <div class="col-md-6 col-xl-3" v-for="item in storageCards" :key="item.label">
                    <div class="signal-card">
                        <label>{{ item.label }}</label>
                        <span :class="item.tone">{{ item.value }}</span>
                        <small>{{ item.note }}</small>
                    </div>
                </div>
            </div>
        </section>

        <section v-if="generatedBundle" class="section-box">
            <div class="verdict-card verdict-success mb-4">
                <div class="verdict-icon">
                    <span>OK</span>
                </div>
                <div class="verdict-body">
                    <strong>Paquete generado y listo para desplegar</strong>
                    <p>
                        El host se ha registrado en tu navegador y ya puedes usar estas descargas para instalar el
                        agente en Linux, validarlo con la guia de instalacion y empezar a recibir telemetria.
                    </p>
                </div>
            </div>

            <div class="row g-3 mb-3">
                <div class="col-xl-6">
                    <div class="tool-card h-100">
                        <div class="card-head">
                            <h5>Resumen de despliegue</h5>
                            <span class="mini-badge">Checklist</span>
                        </div>
                        <div class="deployment-summary">
                            <div class="summary-line">
                                <label>Host</label>
                                <span>{{ buildAgentRecordFromDraft(generatedSnapshot).displayName }}</span>
                            </div>
                            <div class="summary-line">
                                <label>Destino</label>
                                <span>{{ generatedSnapshot.hostIp }}:{{ generatedSnapshot.port }}</span>
                            </div>
                            <div class="summary-line">
                                <label>Servicio</label>
                                <span>{{ generatedSnapshot.serviceName }}</span>
                            </div>
                            <div class="summary-line">
                                <label>Intervalo</label>
                                <span>{{ generatedSnapshot.intervalSeconds }} segundos</span>
                            </div>
                            <div class="summary-line">
                                <label>Modulos</label>
                                <span>{{ summarizeModules(generatedSnapshot.modules) }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-6">
                    <div class="tool-card h-100">
                        <div class="card-head">
                            <h5>Reglas JS de peticion</h5>
                            <span class="mini-badge">Frontend</span>
                        </div>
                        <div class="output-box">
                            <pre class="result-pre">{{ prettyJson(requestRulePreview) }}</pre>
                        </div>
                    </div>
                </div>
            </div>

            <div class="tool-card mb-3">
                <div class="card-head">
                    <h5>Instrucciones de instalacion</h5>
                    <span class="mini-badge">Markdown</span>
                </div>
                <div class="output-box tall-output">
                    <ThorondorMarkdownArticle :source="generatedBundle.instructions" />
                </div>
            </div>

            <div class="row g-3 mt-1">
                <div :class="(generatedSnapshot?.generateSystemd && !generatedSnapshot?.targetOs?.includes('win')) ? 'col-xl-4' : 'col-xl-6'">
                    <div class="tool-card">
                        <div class="card-head">
                            <h5>Agente Python</h5>
                            <div class="card-actions">
                                <span class="mini-badge">.py</span>
                                <button class="btn btn-quiet" @click="downloadTextFile(generatedBundle.agentFileName, generatedBundle.python)">Descargar</button>
                                <button class="btn btn-quiet" @click="copyText(generatedBundle.python)">Copiar</button>
                            </div>
                        </div>
                        <div class="output-box fixed-output">
                            <pre class="result-pre">{{ generatedBundle.python }}</pre>
                        </div>
                    </div>
                </div>
                <div v-if="generatedBundle.systemd" class="col-xl-4">
                    <div class="tool-card">
                        <div class="card-head">
                            <h5>Unidad systemd</h5>
                            <div class="card-actions">
                                <span class="mini-badge">.service</span>
                                <button class="btn btn-quiet" @click="downloadTextFile(generatedBundle.serviceFileName, generatedBundle.systemd)">Descargar</button>
                                <button class="btn btn-quiet" @click="copyText(generatedBundle.systemd)">Copiar</button>
                            </div>
                        </div>
                        <div class="output-box fixed-output">
                            <pre class="result-pre">{{ generatedBundle.systemd }}</pre>
                        </div>
                    </div>
                </div>
                <div :class="(generatedBundle.systemd) ? 'col-xl-4' : 'col-xl-6'">
                    <div class="tool-card">
                        <div class="card-head">
                            <h5>{{ generatedSnapshot?.targetOs === 'windows' ? 'Instalador PowerShell' : 'Script de instalacion' }}</h5>
                            <div class="card-actions">
                                <span class="mini-badge">{{ generatedSnapshot?.targetOs === 'windows' ? '.ps1' : '.sh' }}</span>
                                <button class="btn btn-quiet" @click="downloadTextFile(generatedBundle.installFileName, generatedBundle.installScript)">Descargar</button>
                                <button class="btn btn-quiet" @click="copyText(generatedBundle.installScript)">Copiar</button>
                            </div>
                        </div>
                        <div class="output-box fixed-output">
                            <pre class="result-pre">{{ generatedBundle.installScript }}</pre>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </ThorondorPageShell>
</template>

<script>
import ThorondorMarkdownArticle from "@/features/vueloThorondor/components/ThorondorMarkdownArticle.vue";
import ThorondorPageShell from "@/features/vueloThorondor/components/ThorondorPageShell.vue";
import thorondorBaseMixin from "@/features/vueloThorondor/mixins/thorondorBaseMixin";
import {
    THORONDOR_DISTRO_OPTIONS,
    THORONDOR_WINDOWS_VERSION_OPTIONS,
    THORONDOR_MODULE_KEYS,
    buildThorondorAgentDraft,
    isLegacyThorondorAgentDraft
} from "@/features/vueloThorondor/data/thorondorDefaults";
import { buildThorondorAgentFiles, buildThorondorWindowsInstallScript } from "@/features/vueloThorondor/services/thorondorGenerator";
import { buildThorondorRequestRules } from "@/features/vueloThorondor/services/thorondorApi";

function cloneDraft(value) {
    return JSON.parse(JSON.stringify(value));
}

const FIELD_GUIDES = {
    displayName: {
        title: "Para que sirve este nombre",
        placeholder: "Ej. Servidor web de laboratorio",
        copy: "Es el nombre legible que veras en dashboard, detalle, reglas y alertas. Usa algo que te deje reconocer el equipo sin abrir su ficha tecnica."
    },
    systemName: {
        title: "Identificador interno",
        placeholder: "Ej. srv-web-01",
        copy: "Se usa para construir IDs y nombres de archivos. Conviene que sea corto, estable y facil de rastrear en Linux y en el frontend."
    },
    distro: {
        title: "Familia Linux real",
        copy: "Selecciona la familia del host para orientar la instalacion, las rutas y los comandos de la guia. Si no encaja claramente, usa Otra."
    },
    osVersion: {
        title: "Version aproximada",
        placeholder: "Ej. Ubuntu 22.04 LTS o Rocky 9.4",
        copy: "Anotar la version ayuda a elegir bien paquetes, grupos de lectura y comandos compatibles con ese sistema."
    },
    receiverUrl: {
        title: "Por que registrar esta URL",
        placeholder: "Ej. http://192.168.1.50:8765",
        copy: "Es la direccion base que usara este navegador para consultar al agente. Guardarla aqui permite que dashboard, detalle, reglas y polling sepan a donde pedir /health y /telemetry."
    },
    hostIp: {
        title: "IP privada del Linux",
        placeholder: "Ej. 192.168.1.50",
        copy: "Sirve como referencia operativa del host y como respaldo para reconstruir la URL del agente si no escribes la direccion completa."
    },
    port: {
        title: "Puerto HTTP del agente",
        placeholder: "Ej. 8765",
        copy: "Debe coincidir con el puerto que escuchara el script, el que abras en firewall y el que luego probaras con curl desde la red."
    },
    intervalSeconds: {
        title: "Cadencia de muestreo",
        copy: "Define cada cuantos segundos quieres refrescar la telemetria. Es el ritmo base del agente y de las reglas de peticion que genera el frontend."
    },
    installUser: {
        title: "Usuario del servicio",
        placeholder: "Ej. thorondor",
        copy: "Es la cuenta Linux que ejecutara el agente. Debe tener acceso a la carpeta de trabajo y, si procede, a grupos como adm o systemd-journal."
    },
    serviceName: {
        title: "Nombre tecnico del servicio",
        placeholder: "Ej. thorondor-agent",
        copy: "Marca el nombre base de los ficheros descargados y de la unidad systemd. Cuanto mas claro sea, mas facil sera mantenerlo con systemctl y journalctl."
    },
    additionalLogPaths: {
        title: "Logs extra de negocio",
        copy: "Escribe una ruta por linea para incluir logs adicionales de aplicaciones, proxys o servicios propios. Se conservan precargados porque suelen repetirse entre despliegues."
    },
    modules: {
        title: "Que bloques recoger",
        copy: "Activa solo lo que te aporta valor. Menos modulos implica menos ruido, menos lecturas innecesarias y una telemetria mas facil de interpretar."
    },
    generateSystemd: {
        title: "Despliegue persistente",
        copy: "Activalo si quieres que el generador prepare tambien la unidad .service para dejar el agente arrancando automaticamente con systemd."
    }
};

const ACTION_HELP_CARDS = [
    {
        title: "Por que registrar el host en el front",
        copy: "Registrar el host guarda en el navegador su ficha, sus endpoints y sus reglas de peticion. Sin ese paso, el panel no sabe que agente existe ni a donde consultar sus datos."
    },
    {
        title: "Que hace Probar polling ahora",
        copy: "Lanza al instante un health check y una recogida de telemetria contra los hosts ya registrados. Sirve para validar conectividad, refrescar heartbeat y poblar alertas sin esperar al siguiente ciclo automatico."
    }
];

const REQUIRED_GENERATION_FIELDS_LINUX = [
    { key: "displayName", label: "Nombre visible del host", id: "host-display-name" },
    { key: "systemName", label: "Identificador tecnico del sistema", id: "system-name" },
    { key: "distro", label: "Familia Linux", id: "distro" },
    { key: "osVersion", label: "Version aproximada", id: "os-version" },
    { key: "receiverUrl", label: "URL accesible del agente", id: "receiver-url" },
    { key: "hostIp", label: "IP privada del host", id: "host-ip" },
    { key: "port", label: "Puerto HTTP del agente", id: "receiver-port" },
    { key: "installUser", label: "Usuario del servicio", id: "install-user" },
    { key: "serviceName", label: "Nombre tecnico del servicio", id: "service-name" }
];

const REQUIRED_GENERATION_FIELDS_WINDOWS = [
    { key: "displayName", label: "Nombre visible del host", id: "host-display-name" },
    { key: "systemName", label: "Identificador tecnico del sistema", id: "system-name" },
    { key: "osVersion", label: "Version de Windows", id: "os-version" },
    { key: "receiverUrl", label: "URL accesible del agente", id: "receiver-url" },
    { key: "hostIp", label: "IP del host Windows", id: "host-ip" },
    { key: "port", label: "Puerto HTTP del agente", id: "receiver-port" }
];

function hasTrimmedText(value) {
    return String(value ?? "").trim().length > 0;
}

function hasValidHttpUrl(value) {
    if (!hasTrimmedText(value)) return false;

    try {
        const parsed = new URL(String(value).trim());
        return parsed.protocol === "http:" || parsed.protocol === "https:";
    } catch {
        return false;
    }
}

function hasValidPort(value) {
    const parsed = Number(value);
    return Number.isInteger(parsed) && parsed >= 1 && parsed <= 65535;
}

export default {
    name: "ThorondorGeneradorAgentesView",

    components: {
        ThorondorMarkdownArticle,
        ThorondorPageShell
    },

    mixins: [thorondorBaseMixin],

    data() {
        return {
            agentDraft: buildThorondorAgentDraft(),
            generatedBundle: null,
            generatedSnapshot: null,
            pinnedHelpKey: null
        };
    },

    computed: {
        isWindows() {
            return this.agentDraft.targetOs === "windows";
        },

        distroOptions() {
            return THORONDOR_DISTRO_OPTIONS;
        },

        windowsVersionOptions() {
            return THORONDOR_WINDOWS_VERSION_OPTIONS;
        },

        moduleOptions() {
            return THORONDOR_MODULE_KEYS;
        },

        fieldGuides() {
            return FIELD_GUIDES;
        },

        actionHelpCards() {
            return ACTION_HELP_CARDS;
        },

        requiredFields() {
            return this.isWindows ? REQUIRED_GENERATION_FIELDS_WINDOWS : REQUIRED_GENERATION_FIELDS_LINUX;
        },

        missingRequiredFieldLabels() {
            return this.getMissingRequiredFields().map((field) => field.label);
        },

        isGenerateReady() {
            return this.missingRequiredFieldLabels.length === 0;
        },

        generateButtonTitle() {
            return this.isGenerateReady
                ? "Genera el agente, registra el host y descarga los ficheros necesarios."
                : `Completa primero: ${this.missingRequiredFieldLabels.join(", ")}`;
        },

        generatorHighlights() {
            return [
                {
                    label: "Autocontenido",
                    copy: "El .py incluye host, puerto, logs, modulos y usuario del servicio ya embebidos en el propio fichero."
                },
                {
                    label: "Con CORS",
                    copy: "El agente responde con Access-Control-Allow-Origin para que el navegador pueda consumirlo por HTTP."
                },
                {
                    label: "Con systemd",
                    copy: "Puedes decidir si quieres la unidad del servicio para dejar el host arrancando el agente automaticamente."
                },
                {
                    label: "Registro listo para operar",
                    copy: "El mismo formulario deja preparado el alta del host en el frontend para que dashboard, detalle, reglas y polling puedan usarlo enseguida."
                }
            ];
        },

        requestRulePreview() {
            const source = this.generatedSnapshot || this.agentDraft;
            return buildThorondorRequestRules(this.buildAgentRecordFromDraft(source));
        },

        storageCards() {
            return [
                {
                    label: "Hosts registrados",
                    value: String(this.dashboardCards.length),
                    tone: "tone-blue",
                    note: "Agentes persistidos localmente en IndexedDB."
                },
                {
                    label: "Ultimo polling",
                    value: this.thorondorLastPollAt ? this.formatRelativeTime(this.thorondorLastPollAt) : "Pendiente",
                    tone: "tone-success",
                    note: "El navegador ya puede probar los hosts guardados."
                },
                {
                    label: "Alertas activas",
                    value: String(this.activeAlerts.length),
                    tone: this.activeAlerts.length ? "tone-warning" : "tone-success",
                    note: "Visibles despues de registrar el agente y empezar el polling."
                },
                {
                    label: "Retencion local",
                    value: `${this.thorondorState.retentionDays} dias`,
                    tone: "tone-neutral",
                    note: "La telemetria no crece indefinidamente."
                }
            ];
        }
    },

    watch: {
        agentDraft: {
            deep: true,
            handler(value) {
                this.$store.dispatch("saveThorondorGeneratorDraft", cloneDraft(value));
            }
        }
    },

    async mounted() {
        const persistedDraft = this.thorondorState.generatorDraft || buildThorondorAgentDraft();
        if (isLegacyThorondorAgentDraft(persistedDraft)) {
            this.agentDraft = buildThorondorAgentDraft();
            await this.$store.dispatch("clearThorondorGeneratorDraft");
        } else {
            this.agentDraft = this.normalizeDraftShape(persistedDraft);
        }

        if (typeof document !== "undefined") {
            document.addEventListener("click", this.handleOutsideHelpClick);
        }
    },

    beforeUnmount() {
        if (typeof document !== "undefined") {
            document.removeEventListener("click", this.handleOutsideHelpClick);
        }
    },

    methods: {
        prettyJson(value) {
            return JSON.stringify(value, null, 2);
        },

        getMissingRequiredFields(source = this.agentDraft) {
            const draft = this.normalizeDraftShape(source);
            const fields = this.isWindows ? REQUIRED_GENERATION_FIELDS_WINDOWS : REQUIRED_GENERATION_FIELDS_LINUX;

            return fields.filter(({ key }) => {
                if (key === "receiverUrl") return !hasValidHttpUrl(draft.receiverUrl);
                if (key === "port") return !hasValidPort(draft.port);
                if (key === "distro") return !hasTrimmedText(draft.distro);
                return !hasTrimmedText(draft[key]);
            });
        },

        focusFirstMissingField(source = this.agentDraft) {
            if (typeof document === "undefined") return;

            const firstMissingField = this.getMissingRequiredFields(source)[0];
            if (!firstMissingField?.id) return;

            document.getElementById(firstMissingField.id)?.focus();
        },

        normalizeDraftShape(source = {}) {
            const base = buildThorondorAgentDraft();
            const draft = cloneDraft(source || {});

            return {
                ...base,
                ...draft,
                displayName: String(draft.displayName ?? base.displayName),
                systemName: String(draft.systemName ?? base.systemName),
                distro: String(draft.distro ?? base.distro),
                osVersion: String(draft.osVersion ?? base.osVersion),
                receiverUrl: String(draft.receiverUrl ?? base.receiverUrl),
                hostIp: String(draft.hostIp ?? base.hostIp),
                installUser: String(draft.installUser ?? base.installUser),
                serviceName: String(draft.serviceName ?? base.serviceName),
                notes: String(draft.notes ?? base.notes),
                port: draft.port === "" || draft.port === null || draft.port === undefined ? base.port : draft.port,
                intervalSeconds: draft.intervalSeconds === "" || draft.intervalSeconds === null || draft.intervalSeconds === undefined
                    ? base.intervalSeconds
                    : Number(draft.intervalSeconds) || base.intervalSeconds,
                additionalLogPaths: typeof draft.additionalLogPaths === "string" ? draft.additionalLogPaths : base.additionalLogPaths,
                modules: {
                    ...base.modules,
                    ...(draft.modules || {})
                },
                generateSystemd: draft.generateSystemd === undefined ? base.generateSystemd : !!draft.generateSystemd
            };
        },

        normalizeDraftForOutput(source = this.agentDraft) {
            const draft = this.normalizeDraftShape(source);
            const record = this.buildAgentRecordFromDraft(draft);

            return {
                ...draft,
                displayName: record.displayName,
                systemName: record.systemName,
                distro: draft.distro || "Otra",
                osVersion: draft.osVersion.trim(),
                receiverUrl: record.receiverUrl,
                hostIp: record.hostIp,
                port: record.port,
                intervalSeconds: record.intervalSeconds,
                installUser: record.installUser,
                serviceName: record.serviceName,
                modules: { ...draft.modules },
                generateSystemd: !!draft.generateSystemd,
                additionalLogPaths: String(draft.additionalLogPaths || "")
            };
        },

        buildAgentRecordFromDraft(source = this.agentDraft) {
            const normalizedSource = this.normalizeDraftShape(source);
            const systemName = normalizedSource.systemName.trim() || "thorondor-host";
            const hostIp = normalizedSource.hostIp.trim() || "127.0.0.1";
            const port = Number(normalizedSource.port) || 8765;

            return {
                id: `${systemName}-${hostIp}-${port}`.toLowerCase().replace(/[^a-z0-9-]+/g, "-"),
                displayName: normalizedSource.displayName.trim() || systemName,
                systemName,
                distro: normalizedSource.distro || "Otra",
                osVersion: normalizedSource.osVersion.trim(),
                receiverUrl: normalizedSource.receiverUrl.trim() || `http://${hostIp}:${port}`,
                hostIp,
                port,
                intervalSeconds: Number(normalizedSource.intervalSeconds) || 30,
                additionalLogPaths: normalizedSource.additionalLogPaths,
                modules: { ...normalizedSource.modules },
                generateSystemd: !!normalizedSource.generateSystemd,
                installUser: normalizedSource.installUser.trim() || "thorondor",
                serviceName: normalizedSource.serviceName.trim() || "thorondor-agent",
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
        },

        async registerCurrentDraft() {
            const record = this.buildAgentRecordFromDraft(this.normalizeDraftForOutput());
            await this.$store.dispatch("registerThorondorAgent", record);
            this.$store.commit("setThorondorSelectedAgent", record.id);
        },

        async generateAndDownload() {
            if (!this.isGenerateReady) {
                this.focusFirstMissingField();
                return;
            }

            const draftSnapshot = cloneDraft(this.agentDraft);
            const normalizedDraft = this.normalizeDraftForOutput(draftSnapshot);
            const record = this.buildAgentRecordFromDraft(normalizedDraft);

            this.generatedSnapshot = normalizedDraft;
            this.generatedBundle = buildThorondorAgentFiles(normalizedDraft);

            await this.$store.dispatch("registerThorondorAgent", record);
            this.$store.commit("setThorondorSelectedAgent", record.id);

            this.downloadTextFile(this.generatedBundle.agentFileName, this.generatedBundle.python);
            if (normalizedDraft.generateSystemd) {
                this.downloadTextFile(this.generatedBundle.serviceFileName, this.generatedBundle.systemd);
            }
            this.downloadTextFile(this.generatedBundle.installFileName, this.generatedBundle.installScript);
        },

        async clearFormData() {
            this.agentDraft = buildThorondorAgentDraft();
            await this.$store.dispatch("clearThorondorGeneratorDraft");
        },

        togglePinnedHelp(key) {
            this.pinnedHelpKey = this.pinnedHelpKey === key ? null : key;
        },

        handleOutsideHelpClick(event) {
            if (!event.target?.closest(".context-help")) {
                this.pinnedHelpKey = null;
            }
        },

        downloadTextFile(filename, content) {
            const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
            const url = URL.createObjectURL(blob);
            const anchor = document.createElement("a");
            anchor.href = url;
            anchor.download = filename;
            anchor.click();
            URL.revokeObjectURL(url);
        },

        async copyText(text) {
            if (!navigator.clipboard?.writeText) return;
            await navigator.clipboard.writeText(text);
        }
    }
};
</script>

<style scoped>
@import "@/features/vueloThorondor/styles/thorondor-theme.css";

.deployment-summary {
    display: grid;
    gap: 0.85rem;
}

.summary-line {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid rgba(130, 170, 230, 0.16);
}

.summary-line:last-child {
    border-bottom: 0;
    padding-bottom: 0;
}

.summary-line label {
    color: rgba(198, 216, 245, 0.7);
    font-size: 0.82rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}

.summary-line span {
    color: #f3f7fd;
    text-align: right;
}

.control-grid {
    row-gap: 1.52rem;
}

.field-heading {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 0.45rem;
    min-height: 3.1rem;
    margin-bottom: 0.18rem;
}

.field-heading .field-label {
    margin: 0;
    flex: 0 1 auto;
    max-width: calc(100% - 2rem);
    line-height: 1.45;
}

.control-field {
    display: grid;
    align-content: start;
}

.control-field :is(.form-control, .form-select) {
    min-height: 3rem;
}

.context-help {
    position: relative;
    display: inline-flex;
    flex: 0 0 auto;
    margin-top: 0.08rem;
}

.help-trigger {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.28rem;
    height: 1.28rem;
    border-radius: 999px;
    border: 1px solid rgba(125, 211, 252, 0.26);
    background: linear-gradient(180deg, rgba(12, 22, 40, 0.96), rgba(8, 16, 30, 0.98));
    box-shadow: 0 8px 18px rgba(2, 8, 23, 0.18);
    color: #d7e7fc;
    font-size: 0.64rem;
    font-weight: 700;
    cursor: pointer;
    transition: border-color 0.2s ease, background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
}

.help-trigger:hover,
.help-trigger.is-pinned {
    border-color: rgba(140, 197, 255, 0.62);
    background: linear-gradient(180deg, rgba(21, 43, 78, 0.98), rgba(10, 19, 35, 0.98));
    color: #ffffff;
    box-shadow: 0 10px 22px rgba(24, 78, 160, 0.16);
}

.help-popover {
    position: absolute;
    top: calc(100% + 0.8rem);
    right: 0;
    width: min(320px, calc(100vw - 3rem));
    padding: 0.95rem 1rem;
    border-radius: 12px;
    border: 1px solid rgba(111, 170, 255, 0.32);
    background: linear-gradient(180deg, rgba(10, 19, 35, 0.99), rgba(17, 32, 58, 0.99));
    box-shadow: 0 18px 38px rgba(2, 8, 23, 0.42);
    color: rgba(231, 240, 255, 0.95);
    font-size: 0.84rem;
    line-height: 1.65;
    text-align: left;
    opacity: 0;
    transform: translateY(8px);
    pointer-events: none;
    transition: opacity 0.2s ease, transform 0.2s ease;
    z-index: 25;
}

.help-popover::before {
    content: "";
    position: absolute;
    top: -7px;
    right: 14px;
    width: 14px;
    height: 14px;
    border-top: 1px solid rgba(111, 170, 255, 0.32);
    border-left: 1px solid rgba(111, 170, 255, 0.32);
    background: rgba(13, 24, 43, 0.99);
    transform: rotate(45deg);
}

.help-popover strong {
    display: block;
    margin-bottom: 0.35rem;
    color: #f8fbff;
    font-size: 0.78rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}

.help-trigger:hover .help-popover,
.help-trigger.is-pinned .help-popover {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
}

.action-guide-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.9rem;
    margin-top: 1rem;
}

.inline-actions {
    align-items: center;
    flex-wrap: wrap;
    row-gap: 0.8rem;
}

.btn-main:disabled {
    opacity: 0.56;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
    filter: saturate(0.75);
}

.form-status-hint {
    margin: 0.85rem 0 0;
    color: rgba(209, 223, 246, 0.84);
    font-size: 0.83rem;
    line-height: 1.6;
}

.action-guide-card {
    display: flex;
    gap: 0.9rem;
    align-items: flex-start;
    padding: 1rem;
    border-radius: 12px;
    border: 1px solid rgba(94, 156, 255, 0.18);
    background: linear-gradient(180deg, rgba(13, 24, 43, 0.96), rgba(9, 16, 29, 0.98));
}

.action-guide-icon {
    width: 2rem;
    height: 2rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    flex-shrink: 0;
    border: 1px solid rgba(125, 211, 252, 0.3);
    background: rgba(14, 28, 51, 0.9);
    color: #dff0ff;
    font-size: 0.88rem;
    font-weight: 700;
}

.action-guide-body strong {
    display: block;
    margin-bottom: 0.35rem;
    color: #f3f7fd;
}

.action-guide-body p {
    margin: 0;
    color: rgba(221, 232, 249, 0.84);
    line-height: 1.65;
}

@media (max-width: 767px) {
    .control-grid {
        row-gap: 1.3rem;
    }

    .field-heading {
        min-height: auto;
        gap: 0.4rem;
    }

    .help-popover {
        left: 0;
        right: auto;
    }

    .help-popover::before {
        left: 14px;
        right: auto;
    }

    .action-guide-grid {
        grid-template-columns: 1fr;
    }
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

.os-hint {
    margin: 0;
    font-size: 0.81rem;
    color: rgba(193, 213, 247, 0.7);
    line-height: 1.55;
}
</style>
