<template>
    <ThorondorPageShell>
        <section class="section-box intro-box">
            <div class="section-topline">
                <div class="module-header">
                    <span class="section-kicker">Analisis avanzado</span>
                    <h1 class="section-name">Integracion con Splunk</h1>
                    <p class="section-copy">
                        Splunk con licencia Developer (o la edicion gratuita con limite de 500 MB/dia) expone una
                        API REST completa en el puerto 8089 y un HTTP Event Collector (HEC) en el puerto 8088.
                        Esta vista gestiona la conexion con tu instancia local, envia la telemetria de Thorondor
                        via HEC y ejecuta busquedas SPL directamente desde el navegador para correlacionar eventos
                        entre todos los hosts monitorizados sin herramientas adicionales.
                    </p>
                </div>
                <div class="phase-badge-block">
                    <span class="phase-badge">SIEM+</span>
                    <small>HEC · REST API · SPL · 500 MB/dia</small>
                </div>
            </div>

            <div class="guide-grid">
                <div class="guide-card" v-for="item in splunkHighlights" :key="item.label">
                    <label>{{ item.label }}</label>
                    <span>{{ item.copy }}</span>
                </div>
            </div>
        </section>

        <div class="splunk-statusbar" :class="statusBarClass">
            <span class="statusbar-dot"></span>
            <span class="statusbar-label">{{ connectionStatusLabel }}</span>
            <span class="statusbar-url">{{ splunkConfig.apiUrl || 'Sin configurar' }}</span>
            <span v-if="connectionError" class="statusbar-error">{{ connectionError }}</span>
        </div>

        <section class="section-box tab-section">
            <div class="detail-tabs">
                <button v-for="tab in splunkTabs" :key="tab.id" class="detail-tab" :class="{ active: activeTab === tab.id }" @click="activeTab = tab.id">
                    {{ tab.label }}
                </button>
            </div>
        </section>

        <section v-if="activeTab === 'config'" class="section-box">
            <div class="section-topline">
                <div class="module-header">
                    <span class="section-kicker">Conexion</span>
                    <h2 class="module-title">Configuracion de Splunk</h2>
                    <p class="module-copy">
                        Introduce los endpoints de tu instancia Splunk. La API REST (puerto 8089) se usa para
                        ejecutar busquedas SPL. El HEC (puerto 8088) recibe los eventos de telemetria.
                        Consulta la guia de instalacion para la configuracion completa del HEC y CORS en Splunk.
                    </p>
                </div>
                <div class="phase-badge-block">
                    <span class="phase-badge">Setup</span>
                    <small>REST API + HEC</small>
                </div>
            </div>

            <div class="control-grid">
                <div class="control-field">
                    <label class="field-label" for="splunk-api-url">URL API REST</label>
                    <input id="splunk-api-url" v-model="splunkConfig.apiUrl" class="form-control input-dark" placeholder="https://localhost:8089" />
                </div>
                <div class="control-field">
                    <label class="field-label" for="splunk-hec-url">URL HTTP Event Collector</label>
                    <input id="splunk-hec-url" v-model="splunkConfig.hecUrl" class="form-control input-dark" placeholder="https://localhost:8088" />
                </div>
                <div class="control-field">
                    <label class="field-label" for="splunk-user">Usuario</label>
                    <input id="splunk-user" v-model="splunkConfig.username" class="form-control input-dark" placeholder="admin" autocomplete="username" />
                </div>
                <div class="control-field">
                    <label class="field-label" for="splunk-pass">Contrasena</label>
                    <input id="splunk-pass" v-model="splunkConfig.password" type="password" class="form-control input-dark" placeholder="••••••••" autocomplete="current-password" />
                </div>
                <div class="control-field">
                    <label class="field-label" for="splunk-hec-token">Token HEC</label>
                    <input id="splunk-hec-token" v-model="splunkConfig.hecToken" class="form-control input-dark" placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" />
                </div>
                <div class="control-field">
                    <label class="field-label" for="splunk-index">Indice</label>
                    <input id="splunk-index" v-model="splunkConfig.index" class="form-control input-dark" placeholder="thorondor" />
                </div>
            </div>

            <div class="inline-actions mt-3">
                <button class="btn btn-main" :disabled="connectionStatus === 'testing'" @click="testConnection">
                    {{ connectionStatus === 'testing' ? 'Probando...' : 'Probar conexion' }}
                </button>
                <button class="btn btn-subtle" @click="saveConfig">Guardar configuracion</button>
            </div>

            <div class="section-topline mt-4">
                <div class="module-header">
                    <span class="section-kicker">HEC</span>
                    <h2 class="module-title">Configurar HTTP Event Collector en Splunk</h2>
                    <p class="module-copy">
                        El HEC es el canal de ingesta principal para esta integracion. Antes de enviar datos debes
                        habilitarlo en Splunk y obtener un token. Los source types que usara Thorondor son
                        <code>thorondor:snapshot</code>, <code>thorondor:events</code> y <code>thorondor:logs</code>.
                    </p>
                </div>
                <div class="phase-badge-block">
                    <span class="phase-badge">HEC</span>
                    <small>Settings &gt; Data inputs</small>
                </div>
            </div>

            <div class="card-grid">
                <article class="tool-card" v-for="step in hecSetupSteps" :key="step.title">
                    <div class="card-head">
                        <h5>{{ step.title }}</h5>
                        <span class="mini-badge">{{ step.badge }}</span>
                    </div>
                    <p class="section-copy mb-0">{{ step.copy }}</p>
                </article>
            </div>

            <div class="section-topline mt-4">
                <div class="module-header">
                    <span class="section-kicker">CORS</span>
                    <h2 class="module-title">Habilitar CORS en Splunk</h2>
                    <p class="module-copy">
                        El navegador bloquea peticiones cross-origin a Splunk salvo que el servidor responda con los
                        headers adecuados. Edita <code>/opt/splunk/etc/system/local/web.conf</code> para permitir
                        el origen de esta aplicacion.
                    </p>
                </div>
                <div class="phase-badge-block">
                    <span class="phase-badge">Config</span>
                    <small>web.conf</small>
                </div>
            </div>

            <div class="output-box">
                <pre class="result-pre">[settings]
crossOriginSharingPolicy = *
crossOriginSharingHeaders = Authorization, Content-Type
enableSplunkWebSSL = false</pre>
            </div>
            <p class="section-copy mt-2" style="font-size:0.83rem; color: rgba(203,213,225,0.7);">
                Reinicia Splunk tras el cambio: <code>sudo /opt/splunk/bin/splunk restart</code>. En produccion restringe
                <code>crossOriginSharingPolicy</code> al origen exacto de la aplicacion en lugar de usar el wildcard.
            </p>
        </section>

        <section v-else-if="activeTab === 'ingest'" class="section-box">
            <div class="section-topline">
                <div class="module-header">
                    <span class="section-kicker">HTTP Event Collector</span>
                    <h2 class="module-title">Enviar telemetria a Splunk</h2>
                    <p class="module-copy">
                        Cada agente de Thorondor tiene un snapshot reciente con metricas, eventos de seguridad y
                        logs. Esta seccion envia ese snapshot al HEC de Splunk como tres tipos de eventos separados:
                        metricas del sistema, eventos de seguridad y entradas de log. El indice destino es el
                        configurado en la pestana anterior.
                    </p>
                </div>
                <div class="phase-badge-block">
                    <span class="phase-badge">Push</span>
                    <small>snapshot + events + logs</small>
                </div>
            </div>

            <div v-if="!splunkConfig.hecUrl || !splunkConfig.hecToken" class="verdict-card verdict-neutral mb-4">
                <div class="verdict-icon"><span>HEC</span></div>
                <div class="verdict-body">
                    <strong>HEC no configurado</strong>
                    <p>Introduce la URL del HEC y el token en la pestana Configuracion antes de enviar datos.</p>
                </div>
            </div>

            <div v-else>
                <div class="inline-actions mb-4">
                    <button class="btn btn-main" :disabled="pushRunning || !dashboardCards.length" @click="pushAllToHec">
                        {{ pushRunning ? 'Enviando...' : 'Enviar todos los agentes' }}
                    </button>
                </div>

                <div class="tool-card" v-for="agent in dashboardCards" :key="agent.id">
                    <div class="card-head">
                        <h5>{{ agent.displayName }}</h5>
                        <div class="d-flex gap-2 align-items-center">
                            <span class="mini-badge" :class="pushStateClass(agent.id)">{{ pushStateLabel(agent.id) }}</span>
                            <button class="btn btn-quiet" :disabled="pushRunning" @click="pushAgentToHec(agent.id)">Enviar</button>
                        </div>
                    </div>
                    <div class="summary-line" v-if="pushResults[agent.id]?.error">
                        <label>Error</label>
                        <span style="color: rgba(239,68,68,0.9); font-size:0.82rem;">{{ pushResults[agent.id].error }}</span>
                    </div>
                    <div class="summary-line" v-if="pushResults[agent.id]?.lastPushedAt">
                        <label>Ultimo envio</label>
                        <span>{{ pushResults[agent.id].lastPushedAt }}</span>
                    </div>
                    <div class="summary-line">
                        <label>Snapshot disponible</label>
                        <span>{{ agentHasSnapshot(agent.id) ? 'Si' : 'Sin datos aun — realiza un polling primero' }}</span>
                    </div>
                </div>

                <div v-if="!dashboardCards.length" class="empty-box">
                    Sin agentes registrados. Crea uno desde el generador y realiza un polling inicial.
                </div>
            </div>
        </section>

        <section v-else-if="activeTab === 'queries'" class="section-box">
            <div class="section-topline">
                <div class="module-header">
                    <span class="section-kicker">Search Processing Language</span>
                    <h2 class="module-title">Busquedas SPL predefinidas</h2>
                    <p class="module-copy">
                        Conjunto de queries SPL listas para ejecutar sobre los datos de Thorondor indexados en Splunk.
                        Cada query asume los source types <code>thorondor:snapshot</code>, <code>thorondor:events</code>
                        y <code>thorondor:logs</code> con el indice configurado. Puedes copiar la query al portapapeles
                        o ejecutarla directamente si la API REST esta configurada.
                    </p>
                </div>
                <div class="phase-badge-block">
                    <span class="phase-badge">SPL</span>
                    <small>Auth · Sistema · Logs · Red</small>
                </div>
            </div>

            <div class="category-tabs mb-4">
                <button v-for="cat in queryCategories" :key="cat.id" class="cat-tab" :class="{ active: selectedCategory === cat.id }" @click="selectedCategory = cat.id">
                    {{ cat.label }}
                </button>
            </div>

            <div class="command-stack">
                <article class="tool-card command-card" v-for="query in activeQueries" :key="query.title">
                    <div class="card-head">
                        <h5>{{ query.title }}</h5>
                        <span class="mini-badge">{{ query.badge }}</span>
                    </div>
                    <p class="section-copy mb-3">{{ query.description }}</p>
                    <div class="output-box mb-3">
                        <pre class="result-pre">{{ query.spl }}</pre>
                    </div>
                    <div class="inline-actions">
                        <button class="btn btn-subtle" @click="copyQuery(query)">
                            {{ copiedKey === query.title ? 'Copiado' : 'Copiar SPL' }}
                        </button>
                        <button class="btn btn-subtle" :disabled="!canRunQueries || queryRunning" @click="runQuery(query.spl)">
                            {{ queryRunning ? 'Ejecutando...' : 'Ejecutar en Splunk' }}
                        </button>
                    </div>
                </article>
            </div>

            <div class="section-topline mt-4">
                <div class="module-header">
                    <span class="section-kicker">Query libre</span>
                    <h2 class="module-title">Ejecutar SPL personalizado</h2>
                    <p class="module-copy">
                        Editor de SPL libre. La query se envia a la API REST de Splunk, el job se monitoriza hasta
                        completarse y los resultados se muestran en formato tabla aqui mismo.
                    </p>
                </div>
                <div class="phase-badge-block">
                    <span class="phase-badge">Custom</span>
                    <small>REST API · polling de job</small>
                </div>
            </div>

            <textarea v-model="customSpl" class="form-control input-dark textarea-dark mb-3" rows="5" placeholder="index=thorondor sourcetype=&quot;thorondor:events&quot; | spath | head 20"></textarea>
            <div class="inline-actions mb-4">
                <button class="btn btn-main" :disabled="!canRunQueries || queryRunning || !customSpl.trim()" @click="runCustomQuery">
                    {{ queryRunning ? 'Ejecutando...' : 'Ejecutar' }}
                </button>
                <span v-if="!canRunQueries" class="form-status-hint">Configura la API REST (URL, usuario y contrasena) para habilitar la ejecucion.</span>
            </div>

            <div v-if="queryError" class="verdict-card verdict-danger mb-4">
                <div class="verdict-icon"><span>ERR</span></div>
                <div class="verdict-body">
                    <strong>Error en la busqueda</strong>
                    <p>{{ queryError }}</p>
                </div>
            </div>

            <div v-if="queryResults" class="tool-card">
                <div class="card-head">
                    <h5>Resultados</h5>
                    <span class="mini-badge">{{ queryResults.results?.length || 0 }} filas</span>
                </div>
                <div class="table-wrap scrollable-wrap" v-if="queryResults.results?.length">
                    <table class="table table-dark table-sm align-middle mb-0">
                        <thead>
                            <tr>
                                <th v-for="col in queryResultColumns" :key="col">{{ col }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(row, i) in queryResults.results" :key="i">
                                <td v-for="col in queryResultColumns" :key="col">{{ row[col] }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-else class="empty-box compact-empty">La busqueda no devolvio resultados. Verifica el indice y los source types.</div>
            </div>
        </section>

        <section v-else-if="activeTab === 'usecases'" class="section-box">
            <div class="section-topline">
                <div class="module-header">
                    <span class="section-kicker">Casos de uso</span>
                    <h2 class="module-title">Analisis disponibles con los datos de Thorondor</h2>
                    <p class="module-copy">
                        El agente Thorondor recopila metricas de sistema, eventos de seguridad, logs de kernel y de
                        aplicacion, informacion de red y temperaturas de hardware. A continuacion se listan los casos
                        de uso de analisis que Splunk permite implementar sobre esa telemetria una vez indexada.
                    </p>
                </div>
                <div class="phase-badge-block">
                    <span class="phase-badge">Use Cases</span>
                    <small>Seguridad · Rendimiento · Fiabilidad</small>
                </div>
            </div>

            <div class="usecase-grid">
                <article class="tool-card usecase-card" v-for="uc in useCases" :key="uc.title">
                    <div class="card-head">
                        <h5>{{ uc.title }}</h5>
                        <span class="mini-badge" :class="uc.badgeClass">{{ uc.badge }}</span>
                    </div>
                    <p class="section-copy mb-0">{{ uc.description }}</p>
                    <div class="usecase-sources">
                        <span class="mini-badge" v-for="src in uc.sources" :key="src">{{ src }}</span>
                    </div>
                    <div class="command-meta">
                        <div class="meta-line">
                            <label>Senales clave</label>
                            <p>{{ uc.signals }}</p>
                        </div>
                        <div class="meta-line">
                            <label>Respuesta recomendada</label>
                            <p>{{ uc.response }}</p>
                        </div>
                    </div>
                </article>
            </div>
        </section>
    </ThorondorPageShell>
</template>

<script>
import ThorondorPageShell from "@/features/vueloThorondor/components/ThorondorPageShell.vue";
import thorondorBaseMixin from "@/features/vueloThorondor/mixins/thorondorBaseMixin";

const SPLUNK_CONFIG_KEY = "thorondor_splunk_config";

const SPL_QUERIES = {
    auth: [
        {
            title: "Logins fallidos por usuario e IP",
            badge: "Brute Force",
            description: "Agrega intentos de autenticacion fallida por usuario y origen. Identifica ataques de fuerza bruta y credential stuffing activos contra los hosts monitorizados.",
            spl: `index=thorondor sourcetype="thorondor:events"
| spath
| search kind="failed_login"
| stats count by user, sourceIp
| sort -count
| rename user as Usuario, sourceIp as "IP Origen", count as Intentos`
        },
        {
            title: "Timeline de fallos de autenticacion",
            badge: "Timeline",
            description: "Evolucion temporal de los intentos fallidos en intervalos de 15 minutos. Picos sostenidos indican escaneos automatizados o ataques de diccionario.",
            spl: `index=thorondor sourcetype="thorondor:events"
| spath
| search kind="failed_login"
| timechart span=15m count by user`
        },
        {
            title: "Escalada de privilegios via sudo",
            badge: "Privilege Esc",
            description: "Lista el uso de sudo agrupado por usuario y sistema. Basico para detectar uso indebido de privilegios y persistencia post-explotacion.",
            spl: `index=thorondor sourcetype="thorondor:events"
| spath
| search kind="sudo_command"
| stats count by user, agentId
| sort -count`
        },
        {
            title: "Creacion de nuevas cuentas",
            badge: "Persistence",
            description: "Detecta altas de cuentas y grupos de sistema. Tecnica habitual de persistencia tras comprometer un host.",
            spl: `index=thorondor sourcetype="thorondor:events"
| spath
| search kind="new_user"
| table _time, agentId, user, message
| sort -_time`
        },
        {
            title: "Cambios en archivos criticos",
            badge: "File Integrity",
            description: "Detecta modificaciones en /etc/passwd, /etc/shadow y /etc/sudoers. Cualquier cambio no planificado en estos archivos es un indicador de compromiso.",
            spl: `index=thorondor sourcetype="thorondor:events"
| spath
| search kind="critical_file_change"
| table _time, agentId, file, message
| sort -_time`
        }
    ],
    system: [
        {
            title: "CPU y RAM por host en el tiempo",
            badge: "Metricas",
            description: "Evolucion temporal de CPU y RAM para todos los hosts. Util para detectar picos de carga, correlacionar con eventos de seguridad y planificar capacidad.",
            spl: `index=thorondor sourcetype="thorondor:snapshot"
| spath
| timechart avg(cpuTotal) as CPU avg(memoryPercent) as RAM by agentId`
        },
        {
            title: "Hosts con CPU sostenida alta",
            badge: "Alerta CPU",
            description: "Identifica sistemas con CPU media por encima del 85% en la ultima hora. Candidatos inmediatos a investigacion de proceso o compromiso.",
            spl: `index=thorondor sourcetype="thorondor:snapshot" earliest=-1h
| spath
| where cpuTotal > 85
| stats avg(cpuTotal) as media_cpu, max(cpuTotal) as max_cpu by agentId
| where media_cpu > 85
| sort -media_cpu`
        },
        {
            title: "Particiones de disco con ocupacion critica",
            badge: "Disco",
            description: "Extrae el uso de cada particion de disco en todos los hosts y filtra las que superan el 80% de ocupacion.",
            spl: `index=thorondor sourcetype="thorondor:snapshot"
| spath output=disks_raw path=disks
| mvexpand disks_raw
| spath input=disks_raw output=mountpoint path=mountpoint
| spath input=disks_raw output=percent path=percent
| eval percent=tonumber(percent)
| where percent > 80
| stats max(percent) as pct_max by agentId, mountpoint
| sort -pct_max`
        },
        {
            title: "Temperatura maxima por sensor",
            badge: "Temperatura",
            description: "Obtiene la temperatura maxima registrada por sensor en cada host. Requiere lm-sensors instalado y sensors-detect ejecutado. Umbral de alerta recomendado: 80 grados Celsius.",
            spl: `index=thorondor sourcetype="thorondor:snapshot"
| spath output=temps_raw path=temperatures
| mvexpand temps_raw
| spath input=temps_raw output=sensor path=source
| spath input=temps_raw output=label path=label
| spath input=temps_raw output=current path=current
| eval current=tonumber(current)
| where isnotnull(current)
| stats max(current) as temp_max by agentId, sensor, label
| sort -temp_max`
        },
        {
            title: "Procesos mas consumidores de CPU",
            badge: "Top Procs",
            description: "Extrae los procesos con mayor consumo de CPU de cada snapshot. Permite detectar mineros, compilaciones no planificadas o codigo malicioso activo.",
            spl: `index=thorondor sourcetype="thorondor:snapshot"
| spath output=procs_raw path=processes
| mvexpand procs_raw
| spath input=procs_raw output=proc_name path=name
| spath input=procs_raw output=cpu_pct path=cpuPercent
| eval cpu_pct=tonumber(cpu_pct)
| where cpu_pct > 10
| stats avg(cpu_pct) as cpu_avg by agentId, proc_name
| sort -cpu_avg`
        }
    ],
    logs: [
        {
            title: "Errores por fuente de log y sistema",
            badge: "Errores",
            description: "Contabiliza entradas de nivel ERROR y CRITICAL agrupadas por fuente de log y agente. Punto de partida para priorizar investigacion de errores.",
            spl: `index=thorondor sourcetype="thorondor:logs"
| spath
| search level IN ("ERROR", "CRITICAL")
| stats count by source, agentId, level
| sort -count`
        },
        {
            title: "Errores de kernel con clasificacion",
            badge: "Kernel",
            description: "Extrae errores de dmesg y los clasifica por tipo mediante expresion regular. Correlaciona fallos de hardware, drivers o subsistemas del kernel.",
            spl: `index=thorondor sourcetype="thorondor:logs"
| spath
| search source="kernel"
| rex field=message "(?<error_type>[a-zA-Z_]+(?:\\s[a-zA-Z_]+)?(?:\\serror|\\sfail[a-z]*))"
| stats count by error_type, agentId
| sort -count`
        },
        {
            title: "Servicios con errores en journalctl",
            badge: "Servicios",
            description: "Detecta servicios que generan errores frecuentes en journalctl extrayendo el nombre del servicio mediante regex. Indica inestabilidad de servicios del sistema.",
            spl: `index=thorondor sourcetype="thorondor:logs"
| spath
| search source="journal" level="ERROR"
| rex field=message "(?<service>[a-zA-Z0-9_-]+)\\.service"
| stats count by service, agentId
| sort -count`
        },
        {
            title: "Volumetria de logs por nivel y hora",
            badge: "Volume",
            description: "Muestra la distribucion de niveles de log a lo largo del dia. Cambios bruscos en la proporcion de errores indican eventos significativos.",
            spl: `index=thorondor sourcetype="thorondor:logs"
| spath
| timechart span=1h count by level`
        }
    ],
    network: [
        {
            title: "Trafico de red acumulado por interfaz",
            badge: "Trafico",
            description: "Resume el trafico total enviado y recibido por interfaz de red en todos los hosts. Detecta transferencias masivas de datos o interfaces con trafico inesperado.",
            spl: `index=thorondor sourcetype="thorondor:snapshot"
| spath output=ifaces_raw path=interfaces
| mvexpand ifaces_raw
| spath input=ifaces_raw output=iface path=name
| spath input=ifaces_raw output=bytes_sent path=bytesSent
| spath input=ifaces_raw output=bytes_recv path=bytesRecv
| eval sent_gb=round(tonumber(bytes_sent)/1073741824, 3)
| eval recv_gb=round(tonumber(bytes_recv)/1073741824, 3)
| stats avg(sent_gb) as sent_gb, avg(recv_gb) as recv_gb by agentId, iface
| sort -sent_gb`
        },
        {
            title: "Puertos sensibles en escucha",
            badge: "Exposicion",
            description: "Detecta puertos criticos en escucha (bases de datos, telnet, ftp, Redis). Indicadores de exposicion de servicios que no deberian estar accesibles desde la red.",
            spl: `index=thorondor sourcetype="thorondor:snapshot"
| spath output=ports_raw path=openPorts
| mvexpand ports_raw
| spath input=ports_raw output=port path=port
| eval port=tonumber(port)
| where port IN (21, 23, 3306, 5432, 6379, 27017, 11211)
| stats count by agentId, port
| sort agentId, port`
        }
    ]
};

const USE_CASES = [
    {
        title: "Deteccion de ataques de fuerza bruta SSH",
        badge: "Critico",
        badgeClass: "badge-danger",
        description: "Correlaciona intentos de autenticacion fallida en todos los hosts para identificar IPs atacantes que apuntan a multiples sistemas simultneamente o en secuencia.",
        sources: ["thorondor:events"],
        signals: "Mas de 10 fallos en 5 minutos desde la misma IP, patron de usuarios sistematico (root, admin, user), intentos desde multiples paises en el mismo dia.",
        response: "Bloquear la IP en firewall (ufw deny from <IP>), activar fail2ban si no esta activo, revisar si alguna autenticacion tuvo exito desde esa IP."
    },
    {
        title: "Deteccion de persistencia post-explotacion",
        badge: "Critico",
        badgeClass: "badge-danger",
        description: "Correlaciona creacion de nuevas cuentas, cambios en archivos criticos y comandos sudo inusuales que suelen indicar que un atacante ha comprometido el sistema y esta estableciendo persistencia.",
        sources: ["thorondor:events"],
        signals: "Nueva cuenta creada fuera de horario laboral, modificacion de /etc/sudoers, sudo ejecutado por usuario no autorizado, cambio en /etc/passwd o /etc/shadow.",
        response: "Aislar el host, capturar memoria y disco para analisis forense, revocar las cuentas creadas, revisar el historial de comandos de todos los usuarios activos."
    },
    {
        title: "Correlacion de carga con eventos de seguridad",
        badge: "Medio",
        badgeClass: "badge-warning",
        description: "Cruza picos de CPU con eventos de autenticacion exitosa o ejecucion de comandos inusuales. Util para detectar mineros de criptomonedas instalados tras un compromiso.",
        sources: ["thorondor:snapshot", "thorondor:events"],
        signals: "CPU por encima del 90% durante mas de 10 minutos sin proceso legitimo identificado, proceso con nombre generico o aleatorio al frente de la lista de consumo.",
        response: "Kill del proceso sospechoso, analisis del binario con file y strings, verificar hash contra VirusTotal, revisar crontab y servicios systemd del usuario propietario."
    },
    {
        title: "Monitorizacion de salud termica del hardware",
        badge: "Operacional",
        badgeClass: "badge-blue",
        description: "Detecta sensores de temperatura por encima de los umbrales seguros de operacion del fabricante. Temperaturas sostenidas altas reducen la vida util del hardware y pueden causar apagados de emergencia.",
        sources: ["thorondor:snapshot"],
        signals: "Temperatura de CPU por encima de 85 grados, temperatura de disco (via smartmontools si habilitado) por encima de 55 grados, diferencia de mas de 20 grados entre nucleos del mismo procesador.",
        response: "Verificar carga de ventiladores, revisar pasta termica, identificar el proceso responsable de la carga que genera el calor, planificar mantenimiento preventivo."
    },
    {
        title: "Prediccion de agotamiento de disco",
        badge: "Operacional",
        badgeClass: "badge-blue",
        description: "Modela la tendencia de crecimiento de cada particion usando regresion lineal sobre el historico de snapshots para estimar cuando alcanzara el limite de capacidad.",
        sources: ["thorondor:snapshot"],
        signals: "Crecimiento sostenido de mas del 1% diario, particion por encima del 85%, crecimiento acelerado en las ultimas 6 horas que no coincide con la tendencia historica.",
        response: "Identificar los directorios que mas crecen (du -sh), limpiar logs rotados o temporales, ampliar la particion o migrar datos a almacenamiento adicional."
    },
    {
        title: "Analisis de estabilidad de servicios",
        badge: "Fiabilidad",
        badgeClass: "badge-blue",
        description: "Correlaciona errores de journalctl y syslog con la metrica de uptime y el estado de servicios activos para identificar servicios que se reinician frecuentemente o generan errores repetitivos.",
        sources: ["thorondor:logs", "thorondor:snapshot"],
        signals: "Mismo servicio con errores en journalctl mas de 50 veces al dia, mensaje de error identico repetido en syslog a intervalos regulares, uptime muy bajo que indica reinicios frecuentes del sistema.",
        response: "Revisar la configuracion del servicio, consultar logs completos con journalctl -u <servicio> -n 200, verificar dependencias y permisos del servicio."
    }
];

export default {
    name: "ThorondorSplunkView",

    components: {
        ThorondorPageShell
    },

    mixins: [thorondorBaseMixin],

    data() {
        return {
            activeTab: "config",
            splunkConfig: {
                apiUrl: "",
                hecUrl: "",
                username: "",
                password: "",
                hecToken: "",
                index: "thorondor"
            },
            connectionStatus: "unconfigured",
            connectionError: "",
            pushResults: {},
            pushRunning: false,
            selectedCategory: "auth",
            customSpl: "",
            queryRunning: false,
            queryResults: null,
            queryError: "",
            copiedKey: null
        };
    },

    computed: {
        splunkHighlights() {
            return [
                {
                    label: "500 MB/dia",
                    copy: "Splunk Developer License o la edicion gratuita indexan hasta 500 MB diarios sin coste. Suficiente para varios hosts con polling cada 30 segundos."
                },
                {
                    label: "HTTP Event Collector",
                    copy: "Protocolo de ingesta principal. El agente Thorondor envia los snapshots directamente al HEC sin necesidad de instalar Universal Forwarder en el host."
                },
                {
                    label: "API REST",
                    copy: "La API REST de Splunk (puerto 8089) permite crear jobs de busqueda SPL y recuperar los resultados en JSON desde el navegador."
                },
                {
                    label: "Source Types",
                    copy: "Se usan tres source types: thorondor:snapshot para metricas, thorondor:events para seguridad y thorondor:logs para entradas de log."
                }
            ];
        },

        splunkTabs() {
            return [
                { id: "config", label: "Configuracion" },
                { id: "ingest", label: "Ingesta HEC" },
                { id: "queries", label: "Busquedas SPL" },
                { id: "usecases", label: "Casos de uso" }
            ];
        },

        statusBarClass() {
            if (this.connectionStatus === "ok") return "status-ok";
            if (this.connectionStatus === "error") return "status-error";
            if (this.connectionStatus === "testing") return "status-testing";
            return "status-unconfigured";
        },

        connectionStatusLabel() {
            const map = {
                ok: "Conectado a Splunk",
                error: "Error de conexion",
                testing: "Probando conexion...",
                unconfigured: "Sin configurar"
            };
            return map[this.connectionStatus] || "Sin configurar";
        },

        canRunQueries() {
            return !!(this.splunkConfig.apiUrl && this.splunkConfig.username && this.splunkConfig.password);
        },

        queryCategories() {
            return [
                { id: "auth", label: "Autenticacion y acceso" },
                { id: "system", label: "Sistema y hardware" },
                { id: "logs", label: "Logs del sistema" },
                { id: "network", label: "Red y puertos" }
            ];
        },

        activeQueries() {
            return SPL_QUERIES[this.selectedCategory] || [];
        },

        queryResultColumns() {
            if (!this.queryResults?.results?.length) return [];
            return Object.keys(this.queryResults.results[0]).filter((key) => !key.startsWith("_"));
        },

        useCases() {
            return USE_CASES;
        },

        hecSetupSteps() {
            return [
                {
                    title: "Habilitar HEC en Splunk",
                    badge: "Paso 1",
                    copy: "En Splunk Web, ve a Settings > Data inputs > HTTP Event Collector. Activa el token global y crea un nuevo token para Thorondor. Asigna el indice de destino."
                },
                {
                    title: "Crear source types",
                    badge: "Paso 2",
                    copy: "Al crear el token, en la seccion Input Settings define los source types permitidos: thorondor:snapshot, thorondor:events y thorondor:logs. Activa JSON auto-extraction (KV_MODE = json)."
                },
                {
                    title: "Copiar el token",
                    badge: "Paso 3",
                    copy: "Una vez creado el token HEC, copialo en el campo Token HEC de la pestana de configuracion. El token tiene el formato xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx."
                },
                {
                    title: "Verificar la ingesta",
                    badge: "Paso 4",
                    copy: "Tras enviar el primer batch de datos, verifica en Splunk con: index=thorondor | head 5. Si no aparecen resultados, comprueba que el indice existe y que el token tiene permisos de escritura sobre el."
                }
            ];
        }
    },

    mounted() {
        this.loadConfig();
    },

    methods: {
        loadConfig() {
            try {
                const raw = localStorage.getItem(SPLUNK_CONFIG_KEY);
                if (raw) {
                    const parsed = JSON.parse(raw);
                    this.splunkConfig = { ...this.splunkConfig, ...parsed };
                    if (this.splunkConfig.apiUrl) this.connectionStatus = "unconfigured";
                }
            } catch {
                // ignore
            }
        },

        saveConfig() {
            try {
                localStorage.setItem(SPLUNK_CONFIG_KEY, JSON.stringify(this.splunkConfig));
            } catch {
                // ignore
            }
        },

        async testConnection() {
            if (!this.splunkConfig.apiUrl || !this.splunkConfig.username || !this.splunkConfig.password) {
                this.connectionStatus = "error";
                this.connectionError = "Introduce la URL de la API, el usuario y la contrasena antes de probar.";
                return;
            }

            this.connectionStatus = "testing";
            this.connectionError = "";

            try {
                const url = `${this.splunkConfig.apiUrl.replace(/\/$/, "")}/services/server/info?output_mode=json`;
                const response = await fetch(url, {
                    headers: {
                        Authorization: `Basic ${btoa(`${this.splunkConfig.username}:${this.splunkConfig.password}`)}`
                    }
                });

                if (response.ok) {
                    this.connectionStatus = "ok";
                    this.saveConfig();
                } else {
                    this.connectionStatus = "error";
                    this.connectionError = `HTTP ${response.status} — Verifica las credenciales y que la API REST esta accesible.`;
                }
            } catch (err) {
                this.connectionStatus = "error";
                this.connectionError = `No se pudo conectar: ${err.message}. Verifica la URL, el puerto y la configuracion CORS de Splunk.`;
            }
        },

        agentHasSnapshot(agentId) {
            const snaps = this.thorondorSnapshots[agentId] || [];
            return snaps.length > 0;
        },

        pushStateClass(agentId) {
            const state = this.pushResults[agentId]?.status;
            if (state === "ok") return "badge-success";
            if (state === "error") return "badge-danger";
            if (state === "pushing") return "badge-warning";
            return "";
        },

        pushStateLabel(agentId) {
            const state = this.pushResults[agentId]?.status;
            if (state === "ok") return "Enviado";
            if (state === "error") return "Error";
            if (state === "pushing") return "Enviando...";
            return "Pendiente";
        },

        buildHecEvent(event, sourcetype, agentId) {
            return {
                event,
                sourcetype,
                source: `thorondor:${agentId}`,
                index: this.splunkConfig.index || "thorondor"
            };
        },

        async hecPost(payload) {
            const url = `${this.splunkConfig.hecUrl.replace(/\/$/, "")}/services/collector/event`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    Authorization: `Splunk ${this.splunkConfig.hecToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
            if (!response.ok) {
                const text = await response.text();
                throw new Error(`HEC HTTP ${response.status}: ${text}`);
            }
            return response.json();
        },

        async pushAgentToHec(agentId) {
            const snaps = this.thorondorSnapshots[agentId] || [];
            const snapshot = snaps[snaps.length - 1];
            if (!snapshot) {
                this.pushResults = {
                    ...this.pushResults,
                    [agentId]: { status: "error", error: "Sin snapshot disponible. Realiza un polling primero.", lastPushedAt: "" }
                };
                return;
            }

            this.pushResults = {
                ...this.pushResults,
                [agentId]: { status: "pushing", error: "", lastPushedAt: "" }
            };

            try {
                await this.hecPost(this.buildHecEvent(snapshot, "thorondor:snapshot", agentId));

                const events = (this.thorondorState.securityEventsByAgent[agentId] || []).slice(-50);
                if (events.length) {
                    const batch = events.map((ev) =>
                        JSON.stringify(this.buildHecEvent(ev, "thorondor:events", agentId))
                    ).join("\n");
                    const url = `${this.splunkConfig.hecUrl.replace(/\/$/, "")}/services/collector/event`;
                    await fetch(url, {
                        method: "POST",
                        headers: {
                            Authorization: `Splunk ${this.splunkConfig.hecToken}`,
                            "Content-Type": "application/json"
                        },
                        body: batch
                    });
                }

                const logs = (this.thorondorState.logsByAgent[agentId] || []).slice(-200);
                if (logs.length) {
                    const batch = logs.map((log) =>
                        JSON.stringify(this.buildHecEvent(log, "thorondor:logs", agentId))
                    ).join("\n");
                    const url = `${this.splunkConfig.hecUrl.replace(/\/$/, "")}/services/collector/event`;
                    await fetch(url, {
                        method: "POST",
                        headers: {
                            Authorization: `Splunk ${this.splunkConfig.hecToken}`,
                            "Content-Type": "application/json"
                        },
                        body: batch
                    });
                }

                this.pushResults = {
                    ...this.pushResults,
                    [agentId]: { status: "ok", error: "", lastPushedAt: new Date().toLocaleTimeString() }
                };
            } catch (err) {
                this.pushResults = {
                    ...this.pushResults,
                    [agentId]: { status: "error", error: err.message, lastPushedAt: "" }
                };
            }
        },

        async pushAllToHec() {
            this.pushRunning = true;
            for (const agent of this.dashboardCards) {
                await this.pushAgentToHec(agent.id);
            }
            this.pushRunning = false;
        },

        async runQuery(spl) {
            if (!this.canRunQueries) return;
            this.queryRunning = true;
            this.queryError = "";
            this.queryResults = null;

            try {
                const base = this.splunkConfig.apiUrl.replace(/\/$/, "");
                const authHeader = `Basic ${btoa(`${this.splunkConfig.username}:${this.splunkConfig.password}`)}`;

                const createResp = await fetch(`${base}/services/search/jobs?output_mode=json`, {
                    method: "POST",
                    headers: {
                        Authorization: authHeader,
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: new URLSearchParams({ search: `search ${spl}` })
                });

                if (!createResp.ok) throw new Error(`Splunk rechaz\u00f3 el job: HTTP ${createResp.status}`);
                const createData = await createResp.json();
                const sid = createData.sid;

                let done = false;
                let retries = 0;
                while (!done && retries < 30) {
                    await new Promise((r) => setTimeout(r, 1000));
                    const statusResp = await fetch(`${base}/services/search/jobs/${sid}?output_mode=json`, {
                        headers: { Authorization: authHeader }
                    });
                    const statusData = await statusResp.json();
                    done = !!statusData.entry?.[0]?.content?.isDone;
                    retries++;
                }

                const resultsResp = await fetch(`${base}/services/search/jobs/${sid}/results?output_mode=json&count=200`, {
                    headers: { Authorization: authHeader }
                });
                this.queryResults = await resultsResp.json();
            } catch (err) {
                this.queryError = err.message;
            } finally {
                this.queryRunning = false;
            }
        },

        async runCustomQuery() {
            if (this.customSpl.trim()) await this.runQuery(this.customSpl.trim());
        },

        async copyQuery(query) {
            try {
                await navigator.clipboard.writeText(query.spl);
                this.copiedKey = query.title;
                setTimeout(() => { this.copiedKey = null; }, 2000);
            } catch {
                // ignore
            }
        }
    }
};
</script>

<style scoped>
@import "@/features/vueloThorondor/styles/thorondor-theme.css";

.splunk-statusbar {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    padding: 0.55rem 1rem;
    border-radius: 8px;
    border: 1px solid rgba(51, 65, 85, 0.55);
    background: rgba(2, 6, 23, 0.7);
    margin-bottom: 1rem;
    font-size: 0.83rem;
}

.statusbar-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
    background: #475569;
}

.status-ok .statusbar-dot { background: rgba(74, 222, 128, 1); box-shadow: 0 0 6px rgba(74, 222, 128, 0.5); }
.status-ok .statusbar-label { color: rgba(74, 222, 128, 0.9); }
.status-error .statusbar-dot { background: rgba(239, 68, 68, 1); box-shadow: 0 0 6px rgba(239, 68, 68, 0.5); }
.status-error .statusbar-label { color: rgba(239, 68, 68, 0.9); }
.status-testing .statusbar-dot { background: rgba(251, 191, 36, 1); }
.status-testing .statusbar-label { color: rgba(251, 191, 36, 0.9); }
.status-unconfigured .statusbar-label { color: #64748b; }

.statusbar-label { font-weight: 600; }

.statusbar-url {
    color: #64748b;
    font-family: "SFMono-Regular", Consolas, monospace;
    font-size: 0.78rem;
    margin-left: auto;
}

.statusbar-error {
    color: rgba(239, 68, 68, 0.8);
    font-size: 0.78rem;
}

.tab-section {
    padding: 0;
}

.tab-section .detail-tabs {
    border-bottom: none;
}

.category-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
}

.cat-tab {
    padding: 0.3rem 0.85rem;
    border-radius: 20px;
    border: 1px solid rgba(51, 65, 85, 0.5);
    background: transparent;
    color: #64748b;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    transition: border-color 0.15s, color 0.15s, background 0.15s;
}

.cat-tab.active,
.cat-tab:hover {
    border-color: rgba(56, 189, 248, 0.45);
    color: #7dd3fc;
    background: rgba(56, 189, 248, 0.06);
}

.usecase-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: 1rem;
}

.usecase-card .usecase-sources {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
    margin-top: 0.25rem;
}

.badge-danger {
    border-color: rgba(239, 68, 68, 0.4);
    color: rgba(239, 68, 68, 0.9);
    background: rgba(239, 68, 68, 0.06);
}

.badge-warning {
    border-color: rgba(251, 191, 36, 0.4);
    color: rgba(251, 191, 36, 0.9);
    background: rgba(251, 191, 36, 0.06);
}

.badge-blue {
    border-color: rgba(56, 189, 248, 0.4);
    color: rgba(56, 189, 248, 0.9);
    background: rgba(56, 189, 248, 0.06);
}

.badge-success {
    border-color: rgba(74, 222, 128, 0.4);
    color: rgba(74, 222, 128, 0.9);
    background: rgba(74, 222, 128, 0.06);
}

.mt-3 { margin-top: 1rem; }
.mt-4 { margin-top: 1.5rem; }
.mb-3 { margin-bottom: 1rem; }
.mb-4 { margin-bottom: 1.5rem; }
</style>
