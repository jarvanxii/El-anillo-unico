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
                    <span class="section-kicker">Verificacion final</span>
                    <h2 class="module-title">Comprobaciones antes de registrar el agente en el dashboard</h2>
                    <p class="module-copy">
                        Valida salud del proceso, estructura del payload de telemetria, estabilidad del servicio systemd
                        y conectividad de red. Cualquier fallo aqui tiene diagnostico especifico antes de abrir Thorondor.
                    </p>
                </div>
                <div class="phase-badge-block">
                    <span class="phase-badge">Validate</span>
                    <small>Proceso, payload, systemd y red.</small>
                </div>
            </div>

            <div class="card-grid validation-grid">
                <article class="tool-card command-card validation-card" v-for="check in validationChecks" :key="check.title">
                    <div class="card-head">
                        <h5>{{ check.title }}</h5>
                        <span class="mini-badge">{{ check.badge }}</span>
                    </div>
                    <p class="section-copy mb-0">{{ check.copy }}</p>
                    <div class="output-box">
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
                            command: "sudo cp <AGENTE>.py <AGENTE>.service /opt/thorondor-agent/\nsudo chmod 750 /opt/thorondor-agent/<AGENTE>.py",
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
                            command: "sudo -u <USUARIO> python3 /opt/thorondor-agent/<AGENTE>.py",
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
                            command: "sudo cp /opt/thorondor-agent/<AGENTE>.service /etc/systemd/system/\nsudo systemctl daemon-reload\nsudo systemctl enable --now <AGENTE>.service\nsudo systemctl show <AGENTE>.service -p ActiveState,NRestarts,ExecMainStatus --value",
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
                    command: "systemctl show <AGENTE>.service -p ActiveState,NRestarts,ExecMainStatus --value\njournalctl -u <AGENTE>.service -n 20 --no-pager",
                    confirms: "Estado activo, ausencia de reinicios y codigo de salida 0 del proceso principal.",
                    expected: "ActiveState=active, NRestarts=0, ExecMainStatus=0. Cualquier otra combinacion requiere revisar el journal. Los errores mas frecuentes son: ImportError de psutil, PermissionError en /var/log/, o OSError: Address already in use si hay otra instancia corriendo."
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
</style>
