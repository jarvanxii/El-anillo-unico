export const bilboThemes = [
    {
        id: "ciberseguridad",
        label: "Ciberseguridad",
        shortLabel: "Cyber",
        description: "Fundamentos de defensa, riesgo, vulnerabilidades y controles."
    },
    {
        id: "blue-team",
        label: "Blue Team",
        shortLabel: "Blue",
        description: "Deteccion, respuesta, monitorizacion, hardening y resiliencia."
    },
    {
        id: "red-team",
        label: "Red Team",
        shortLabel: "Red",
        description: "Adversary simulation, intrusion logic, exploit chains y post-exploitation."
    },
    {
        id: "privacidad",
        label: "Privacidad en internet",
        shortLabel: "Privacy",
        description: "Exposicion de datos, rastreo, OPSEC personal y modelos de confianza."
    },
    {
        id: "sistemas",
        label: "Sistemas informaticos",
        shortLabel: "Systems",
        description: "SO, redes, virtualizacion, arquitectura y operacion de plataformas."
    }
];

export const bilboQuizLevels = [
    {
        id: "nivel-01",
        level: 1,
        difficulty: "Muy basico",
        title: "Campamento base",
        subtitle: "Primer contacto con conceptos esenciales.",
        focusTheme: "ciberseguridad",
        estimatedMinutes: 4,
        learningGoal: "Reconocer vocabulario basico antes de pasar a controles y operaciones.",
        questions: [
            {
                id: "n1q1",
                category: "ciberseguridad",
                prompt: "Que describe mejor la confidencialidad en seguridad de la informacion?",
                options: [
                    "Que los datos solo sean accesibles por quien debe verlos",
                    "Que el servicio nunca se apague",
                    "Que la aplicacion sea rapida",
                    "Que los logs ocupen poco"
                ],
                correctIndex: 0,
                concept: "Triada CIA",
                explanation: "La confidencialidad protege el acceso a la informacion; disponibilidad e integridad cubren otras propiedades."
            },
            {
                id: "n1q2",
                category: "blue-team",
                prompt: "Que herramienta usa normalmente un analista para revisar eventos de muchos equipos en un punto central?",
                options: [
                    "Compilador",
                    "SIEM",
                    "Editor de imagenes",
                    "Hipervisor"
                ],
                correctIndex: 1,
                concept: "Monitorizacion centralizada",
                explanation: "Un SIEM agrega, correlaciona y ayuda a investigar logs de distintas fuentes."
            },
            {
                id: "n1q3",
                category: "red-team",
                prompt: "En una simulacion ofensiva, que significa reconocimiento?",
                options: [
                    "Borrar logs",
                    "Extraer credenciales del dominio",
                    "Recoger informacion del objetivo antes del ataque",
                    "Cifrar discos"
                ],
                correctIndex: 2,
                concept: "Reconnaissance",
                explanation: "La fase de reconocimiento busca contexto tecnico y humano para elegir mejor la via de entrada."
            },
            {
                id: "n1q4",
                category: "privacidad",
                prompt: "Que practica mejora mas la privacidad basica al navegar?",
                options: [
                    "Compartir la misma password en todos los sitios",
                    "Mantener el navegador desactualizado",
                    "Usar perfiles separados y limitar permisos",
                    "Aceptar cualquier cookie sin leer"
                ],
                correctIndex: 2,
                concept: "Higiene digital",
                explanation: "Separar perfiles y reducir permisos baja la mezcla de identidad y la exposicion de datos."
            },
            {
                id: "n1q5",
                category: "sistemas",
                prompt: "Que componente traduce nombres como ejemplo.com a direcciones IP?",
                options: [
                    "DNS",
                    "SMTP",
                    "NTP",
                    "DHCP lease file"
                ],
                correctIndex: 0,
                concept: "Resolucion de nombres",
                explanation: "DNS convierte nombres legibles en registros tecnicos que otros sistemas pueden usar."
            }
        ]
    },
    {
        id: "nivel-02",
        level: 2,
        difficulty: "Basico",
        title: "Higiene operativa",
        subtitle: "Buenas practicas cotidianas y primeros controles.",
        focusTheme: "privacidad",
        estimatedMinutes: 5,
        learningGoal: "Unir conceptos de usuarios, cuentas y primeros mecanismos de defensa.",
        questions: [
            {
                id: "n2q1",
                category: "ciberseguridad",
                prompt: "Que control reduce mas el impacto de reutilizar una password robada?",
                options: [
                    "Cambiar el fondo del escritorio",
                    "MFA",
                    "Desactivar logs",
                    "Aumentar el brillo de pantalla"
                ],
                correctIndex: 1,
                concept: "Autenticacion multifactor",
                explanation: "MFA agrega una segunda prueba y dificulta el acceso incluso cuando una clave ya se filtro."
            },
            {
                id: "n2q2",
                category: "blue-team",
                prompt: "Que actividad pertenece mejor a hardening?",
                options: [
                    "Cerrar puertos y quitar servicios innecesarios",
                    "Publicar credenciales en un wiki",
                    "Desactivar el antivirus para que no moleste",
                    "Compartir una cuenta admin entre el equipo"
                ],
                correctIndex: 0,
                concept: "Reduccion de superficie",
                explanation: "Hardening elimina lo sobrante y deja menos vias de abuso disponibles."
            },
            {
                id: "n2q3",
                category: "red-team",
                prompt: "Que es phishing?",
                options: [
                    "Un metodo para indexar tablas SQL",
                    "Una tecnica de engano para obtener datos o ejecutar acciones",
                    "Un algoritmo de cifrado",
                    "Un protocolo de backup"
                ],
                correctIndex: 1,
                concept: "Ingenieria social",
                explanation: "Phishing manipula a la victima para conseguir credenciales, pagos, malware o acceso inicial."
            },
            {
                id: "n2q4",
                category: "privacidad",
                prompt: "Que ventaja tiene usar un gestor de passwords?",
                options: [
                    "Permite usar una clave fuerte y distinta por servicio",
                    "Hace innecesario actualizar el sistema",
                    "Elimina cualquier necesidad de MFA",
                    "Evita que existan breaches"
                ],
                correctIndex: 0,
                concept: "Segregacion de credenciales",
                explanation: "Un gestor ayuda a evitar la reutilizacion y facilita rotar credenciales sin depender de memoria humana."
            },
            {
                id: "n2q5",
                category: "sistemas",
                prompt: "Que hace DHCP en una red local tipica?",
                options: [
                    "Sincroniza hora",
                    "Asigna configuracion IP dinamica",
                    "Cifra trafico web",
                    "Valida firmas digitales"
                ],
                correctIndex: 1,
                concept: "Configuracion automatica",
                explanation: "DHCP entrega IP, puerta de enlace y otros parametros para que un equipo se conecte rapido."
            }
        ]
    },
    {
        id: "nivel-03",
        level: 3,
        difficulty: "Basico+",
        title: "Redes y servicios",
        subtitle: "Protocolos, exposicion y primeros indicadores tecnicos.",
        focusTheme: "sistemas",
        estimatedMinutes: 5,
        learningGoal: "Empezar a razonar sobre puertos, protocolos y visibilidad de servicios.",
        questions: [
            {
                id: "n3q1",
                category: "ciberseguridad",
                prompt: "Que describe mejor una vulnerabilidad?",
                options: [
                    "La intencion del atacante",
                    "Una debilidad que puede ser explotada",
                    "Un log de red",
                    "Una politica de vacaciones"
                ],
                correctIndex: 1,
                concept: "Riesgo y explotabilidad",
                explanation: "La vulnerabilidad es la debilidad; la amenaza es quien podria aprovecharla y el riesgo combina ambos planos."
            },
            {
                id: "n3q2",
                category: "blue-team",
                prompt: "Si ves miles de intentos fallidos contra un login, que senal es mas probable?",
                options: [
                    "Brute force o password spraying",
                    "Cambio de kernel",
                    "Backup correcto",
                    "Rotacion de certificados"
                ],
                correctIndex: 0,
                concept: "Ataques de autenticacion",
                explanation: "Muchos fallos de acceso concentrados en el tiempo suelen apuntar a tecnicas de adivinacion o reutilizacion."
            },
            {
                id: "n3q3",
                category: "red-team",
                prompt: "Por que un atacante enumera puertos antes de intentar explotacion?",
                options: [
                    "Para reducir ruido y atacar solo servicios reales",
                    "Para acelerar la refrigeracion del servidor",
                    "Para eliminar MFA",
                    "Para reiniciar el DNS"
                ],
                correctIndex: 0,
                concept: "Enumeracion dirigida",
                explanation: "Conocer puertos y banners permite elegir exploits realistas y descartar vectores inexistentes."
            },
            {
                id: "n3q4",
                category: "privacidad",
                prompt: "Que dato suele revelar mas habitos de navegacion a terceros?",
                options: [
                    "Una cookie de seguimiento cross-site",
                    "El nombre del router",
                    "La resolucion local del monitor",
                    "El tipo de teclado"
                ],
                correctIndex: 0,
                concept: "Tracking web",
                explanation: "Las cookies de terceros o equivalentes ayudan a relacionar actividad entre distintos sitios."
            },
            {
                id: "n3q5",
                category: "sistemas",
                prompt: "Que puerto se asocia normalmente a HTTPS?",
                options: [
                    "22",
                    "25",
                    "80",
                    "443"
                ],
                correctIndex: 3,
                concept: "Puertos comunes",
                explanation: "HTTPS usa 443 por convencion, mientras 80 suele asociarse a HTTP sin TLS."
            }
        ]
    },
    {
        id: "nivel-04",
        level: 4,
        difficulty: "Intermedio inicial",
        title: "Identidad y acceso",
        subtitle: "Control de cuentas, privilegios y errores frecuentes.",
        focusTheme: "blue-team",
        estimatedMinutes: 6,
        learningGoal: "Entender como se contiene el dano cuando credenciales o sesiones se ven comprometidas.",
        questions: [
            {
                id: "n4q1",
                category: "ciberseguridad",
                prompt: "Que principio limita mas el dano si una cuenta de usuario se compromete?",
                options: [
                    "Privilegio minimo",
                    "Acceso total por comodidad",
                    "Password compartida",
                    "Sin expiracion de sesiones"
                ],
                correctIndex: 0,
                concept: "Least privilege",
                explanation: "Cuantos menos permisos tenga una cuenta, menor sera la superficie de abuso tras un compromiso."
            },
            {
                id: "n4q2",
                category: "blue-team",
                prompt: "Que respuesta defensiva es mejor ante una cuenta interna con inicio de sesion imposible de viajar?",
                options: [
                    "Ignorar porque MFA ya existe",
                    "Suspender la cuenta y validar contexto",
                    "Publicar el evento en redes",
                    "Borrar todos los logs"
                ],
                correctIndex: 1,
                concept: "Impossible travel",
                explanation: "Una cuenta que parece iniciar sesion desde lugares incompatibles requiere verificacion inmediata y contencion."
            },
            {
                id: "n4q3",
                category: "red-team",
                prompt: "Que busca normalmente la escalada de privilegios?",
                options: [
                    "Reducir el numero de logs",
                    "Obtener permisos mas altos desde un acceso limitado",
                    "Cambiar el idioma del navegador",
                    "Aumentar el TTL del DNS"
                ],
                correctIndex: 1,
                concept: "Privilege escalation",
                explanation: "La escalada convierte un foothold limitado en capacidad administrativa o de sistema."
            },
            {
                id: "n4q4",
                category: "privacidad",
                prompt: "Que riesgo tiene iniciar sesion con la misma cuenta personal en multiples servicios de terceros?",
                options: [
                    "Facilita la correlacion de identidad entre plataformas",
                    "Mejora la separacion de contextos",
                    "Desactiva trackers",
                    "Aumenta el cifrado end-to-end"
                ],
                correctIndex: 0,
                concept: "Identity correlation",
                explanation: "Reutilizar identidad principal simplifica la union de perfiles, intereses y actividad."
            },
            {
                id: "n4q5",
                category: "sistemas",
                prompt: "En sistemas Linux, que cuenta tiene privilegio total por defecto?",
                options: [
                    "guest",
                    "daemon",
                    "root",
                    "nobody"
                ],
                correctIndex: 2,
                concept: "Privilegios del sistema",
                explanation: "Root puede controlar el sistema completo; por eso su uso debe estar muy restringido."
            }
        ]
    },
    {
        id: "nivel-05",
        level: 5,
        difficulty: "Intermedio",
        title: "Endpoints y hardening",
        subtitle: "Estaciones, procesos, superficie local y politicas.",
        focusTheme: "blue-team",
        estimatedMinutes: 6,
        learningGoal: "Aprender a mirar el endpoint como una plataforma expuesta y no como un simple PC.",
        questions: [
            {
                id: "n5q1",
                category: "ciberseguridad",
                prompt: "Que control protege mejor frente a ejecucion accidental de binarios no autorizados?",
                options: [
                    "Application allowlisting",
                    "Cambiar el wallpaper",
                    "Desactivar Windows Update",
                    "Eliminar el inventario"
                ],
                correctIndex: 0,
                concept: "Control de ejecucion",
                explanation: "La allowlist reduce de forma fuerte que software puede ejecutarse y corta muchas cadenas simples."
            },
            {
                id: "n5q2",
                category: "blue-team",
                prompt: "Que telemetria es especialmente util para detectar procesos hijos anmalos de Office?",
                options: [
                    "Procesos y lineas de comando",
                    "Consumo de bateria",
                    "Uso del raton",
                    "Nivel de brillo"
                ],
                correctIndex: 0,
                concept: "Process lineage",
                explanation: "Ver quien lanza a quien y con que argumentos es clave para detectar macros, LOLBins y abuso de herramientas."
            },
            {
                id: "n5q3",
                category: "red-team",
                prompt: "Por que un operador ofensivo usa living-off-the-land binaries?",
                options: [
                    "Porque son siempre mas rapidos que la CPU",
                    "Porque ya existen en el sistema y pueden camuflar actividad",
                    "Porque no dejan nunca logs",
                    "Porque sustituyen al DNS"
                ],
                correctIndex: 1,
                concept: "LOLBins",
                explanation: "Usar binarios legitimos baja friccion operativa y a veces evita que se vea malware nuevo de forma inmediata."
            },
            {
                id: "n5q4",
                category: "privacidad",
                prompt: "Que practica reduce la huella local al trabajar con documentos sensibles?",
                options: [
                    "Abrirlos en entornos separados y borrar temporales",
                    "Habilitar autoguardado en cualquier nube publica",
                    "Usar siempre la misma cuenta compartida",
                    "Enviar una copia por correo personal"
                ],
                correctIndex: 0,
                concept: "Artefactos locales",
                explanation: "Los temporales, thumbnails y caches pueden revelar mas de lo que parece si no se controlan."
            },
            {
                id: "n5q5",
                category: "sistemas",
                prompt: "Que servicio permite resolver nombres locales y externos en la mayoria de sistemas operativos?",
                options: [
                    "Resolver stub y cliente DNS del sistema",
                    "Controlador de GPU",
                    "Gestor de ventanas",
                    "Planificador de tareas exclusivamente"
                ],
                correctIndex: 0,
                concept: "Stack de resolucion",
                explanation: "El sistema suele usar un resolver local o stub antes de hablar con servidores DNS externos."
            }
        ]
    },
    {
        id: "nivel-06",
        level: 6,
        difficulty: "Intermedio+",
        title: "Deteccion basica",
        subtitle: "Patrones de alerta, correlacion y triage inicial.",
        focusTheme: "blue-team",
        estimatedMinutes: 6,
        learningGoal: "Pasar de la teoria a la observacion de senales operativas en logs y red.",
        questions: [
            {
                id: "n6q1",
                category: "ciberseguridad",
                prompt: "Que significa IOC en un contexto defensivo?",
                options: [
                    "Indicador de compromiso",
                    "Indice oficial criptografico",
                    "Interruptor operativo central",
                    "Instruccion de observacion de CPU"
                ],
                correctIndex: 0,
                concept: "Threat intel basica",
                explanation: "Los IOC son senales concretas como hashes, dominios o IP que pueden indicar actividad maliciosa."
            },
            {
                id: "n6q2",
                category: "blue-team",
                prompt: "Que combinacion suele ser mas sospechosa en un workstation corporativo?",
                options: [
                    "Word -> PowerShell -> conexion externa",
                    "Chrome -> teclado",
                    "Explorer -> abrir carpeta",
                    "Teams -> notificacion"
                ],
                correctIndex: 0,
                concept: "Cadena de ejecucion",
                explanation: "Un documento que deriva en PowerShell y luego en beaconing es un patron clasico de intrusion."
            },
            {
                id: "n6q3",
                category: "red-team",
                prompt: "Que hace normalmente un beacon de C2?",
                options: [
                    "Sincroniza hora del sistema",
                    "Se comunica periodicamente con infraestructura del operador",
                    "Corrige permisos NTFS",
                    "Reconfigura DHCP"
                ],
                correctIndex: 1,
                concept: "Command and Control",
                explanation: "El beacon mantiene una via de mando y reporte para recibir tareas y enviar resultados."
            },
            {
                id: "n6q4",
                category: "privacidad",
                prompt: "Que riesgo anade usar extensiones de navegador poco confiables?",
                options: [
                    "Pueden leer paginas, formularios y habitos de navegacion",
                    "Mejoran siempre el sandbox",
                    "Deshabilitan por si solas a los trackers",
                    "Impeden que exista fingerprinting"
                ],
                correctIndex: 0,
                concept: "Supply chain del navegador",
                explanation: "Una extension con demasiados permisos puede observar contenido sensible o incluso alterarlo."
            },
            {
                id: "n6q5",
                category: "sistemas",
                prompt: "Que rol cumple un proxy corporativo saliente?",
                options: [
                    "Gestionar y observar trafico web saliente",
                    "Compilar codigo en kernel mode",
                    "Asignar CPU a maquinas virtuales",
                    "Sustituir al sistema de backups"
                ],
                correctIndex: 0,
                concept: "Egress control",
                explanation: "El proxy ayuda a inspeccionar, filtrar y registrar parte del trafico que sale de la organizacion."
            }
        ]
    },
    {
        id: "nivel-07",
        level: 7,
        difficulty: "Intermedio alto",
        title: "Ataque inicial",
        subtitle: "Vectores de acceso, fallos humanos y debilidades explotables.",
        focusTheme: "red-team",
        estimatedMinutes: 6,
        learningGoal: "Relacionar un error de exposicion con la cadena ofensiva que podria aprovecharlo.",
        questions: [
            {
                id: "n7q1",
                category: "ciberseguridad",
                prompt: "Que clase de fallo describe una aplicacion que concatena entrada del usuario en una consulta SQL?",
                options: [
                    "SQL injection",
                    "ARP spoofing",
                    "Row hammer",
                    "Port knocking"
                ],
                correctIndex: 0,
                concept: "Validacion de entrada",
                explanation: "Construir consultas sin parametrizar abre la puerta a modificar logica y acceder a datos no previstos."
            },
            {
                id: "n7q2",
                category: "blue-team",
                prompt: "Que control reduce mejor el riesgo de macros maliciosas en correo?",
                options: [
                    "Bloqueo por politica y sandbox de adjuntos",
                    "Mas ancho de banda",
                    "Ocultar extensiones de archivo",
                    "Permitir cualquier contenido activo"
                ],
                correctIndex: 0,
                concept: "Email security",
                explanation: "Las politicas de bloqueo y el analisis aislado de adjuntos cortan muchos ataques comunes de entrada."
            },
            {
                id: "n7q3",
                category: "red-team",
                prompt: "Que ventaja da obtener credenciales validas frente a usar un exploit ruidoso?",
                options: [
                    "Menor complejidad y a menudo menos ruido inicial",
                    "Elimina toda necesidad de persistencia",
                    "Desactiva el EDR automaticamente",
                    "Impide cualquier respuesta defensiva"
                ],
                correctIndex: 0,
                concept: "Valid accounts",
                explanation: "Las cuentas legitimas suelen integrarse mejor en el entorno y pueden pasar mas desapercibidas."
            },
            {
                id: "n7q4",
                category: "privacidad",
                prompt: "Que riesgo tiene publicar metadatos de documentos corporativos en internet?",
                options: [
                    "Puede revelar usuarios, rutas, versiones y software interno",
                    "Solo afecta al tamano del archivo",
                    "Evita el doxxing",
                    "Mejora el control de acceso"
                ],
                correctIndex: 0,
                concept: "Metadata leakage",
                explanation: "Los metadatos pueden dar nombres de empleados, servidores, impresoras o herramientas usadas."
            },
            {
                id: "n7q5",
                category: "sistemas",
                prompt: "Que aporta una DMZ en arquitectura clasica?",
                options: [
                    "Segrega servicios expuestos del nucleo interno",
                    "Elimina la necesidad de firewall",
                    "Hace innecesario el monitoreo",
                    "Sustituye la autenticacion"
                ],
                correctIndex: 0,
                concept: "Segmentacion de red",
                explanation: "La DMZ coloca servicios publicos en una zona intermedia para limitar movimiento directo hacia dentro."
            }
        ]
    },
    {
        id: "nivel-08",
        level: 8,
        difficulty: "Intermedio experto",
        title: "Privacidad avanzada",
        subtitle: "Tracking, OPSEC y exposicion transversal de identidad.",
        focusTheme: "privacidad",
        estimatedMinutes: 7,
        learningGoal: "Mirar la privacidad como un problema tecnico, conductual y de arquitectura de confianza.",
        questions: [
            {
                id: "n8q1",
                category: "ciberseguridad",
                prompt: "Que tecnica usa un navegador para aislar mas el contenido de distintas paginas?",
                options: [
                    "Sandboxing de procesos y origin isolation",
                    "Compartir memoria entre todos los sitios",
                    "Desactivar same-origin policy",
                    "Permitir plugins NPAPI"
                ],
                correctIndex: 0,
                concept: "Aislamiento del navegador",
                explanation: "Separar procesos y reforzar el aislamiento entre origenes reduce el impacto de fallos de render o script."
            },
            {
                id: "n8q2",
                category: "blue-team",
                prompt: "Que puede hacer un SOC para ayudar a la privacidad interna sin romper operaciones?",
                options: [
                    "Minimizar retencion y acceso a logs sensibles por necesidad",
                    "Publicar logs completos a todo el departamento",
                    "Desactivar el borrado programado de datos",
                    "Guardar capturas de pantalla de todo el mundo por defecto"
                ],
                correctIndex: 0,
                concept: "Data minimization",
                explanation: "Recolectar lo necesario y gobernarlo bien evita crear un problema de vigilancia innecesaria."
            },
            {
                id: "n8q3",
                category: "red-team",
                prompt: "Que aprovecha mejor un operador al estudiar OSINT de empleados?",
                options: [
                    "Superficie humana para pretexting y spear phishing",
                    "La frecuencia de refresco del monitor",
                    "El checksum del kernel remoto",
                    "La temperatura de la oficina"
                ],
                correctIndex: 0,
                concept: "OSINT humano",
                explanation: "Detalles publicos de roles, proveedores o eventos ayudan a fabricar mensajes y contextos creibles."
            },
            {
                id: "n8q4",
                category: "privacidad",
                prompt: "Que diferencia clave hay entre anonimato y pseudonimato?",
                options: [
                    "El pseudonimato usa una identidad estable que aun puede correlacionarse",
                    "Son exactamente lo mismo",
                    "El anonimato necesita siempre blockchain",
                    "El pseudonimato impide cualquier trazabilidad"
                ],
                correctIndex: 0,
                concept: "Modelos de identidad",
                explanation: "Una identidad pseudonima no es tu nombre real, pero si puede acumular historial y ser enlazada."
            },
            {
                id: "n8q5",
                category: "sistemas",
                prompt: "Que protege mejor frente a fugas laterales entre cargas de trabajo?",
                options: [
                    "Separacion fuerte por VM o hardware cuando el riesgo lo exige",
                    "Ejecutarlo todo como root en el mismo host",
                    "Desactivar aislamiento para mejorar rendimiento",
                    "Usar una unica red plana"
                ],
                correctIndex: 0,
                concept: "Isolation boundary",
                explanation: "Cuando el riesgo sube, el limite tecnico entre workloads importa tanto como el control logico."
            }
        ]
    },
    {
        id: "nivel-09",
        level: 9,
        difficulty: "Avanzado inicial",
        title: "Analisis de logs",
        subtitle: "Correlacion, contexto temporal y lectura forense temprana.",
        focusTheme: "blue-team",
        estimatedMinutes: 7,
        learningGoal: "Pasar de mirar eventos sueltos a reconstruir secuencias y contexto.",
        questions: [
            {
                id: "n9q1",
                category: "ciberseguridad",
                prompt: "Que problema crea no sincronizar hora entre sistemas?",
                options: [
                    "Rompe la cronologia y complica la investigacion",
                    "Mejora la compresion de logs",
                    "Aumenta la entropia de passwords",
                    "Evita la ejecucion remota"
                ],
                correctIndex: 0,
                concept: "Time integrity",
                explanation: "Sin tiempo coherente es dificil ordenar eventos, validar alibis tecnicos o correlacionar trafico."
            },
            {
                id: "n9q2",
                category: "blue-team",
                prompt: "En un SIEM, que valor aporta una regla de correlacion frente a un evento aislado?",
                options: [
                    "Une senales dispersas para elevar confianza y contexto",
                    "Reduce automaticamente todos los falsos positivos a cero",
                    "Sustituye la necesidad de telemetria",
                    "Elimina la respuesta humana"
                ],
                correctIndex: 0,
                concept: "Correlation logic",
                explanation: "Varias senales juntas suelen contar una historia mas fiable que una sola alerta sin contexto."
            },
            {
                id: "n9q3",
                category: "red-team",
                prompt: "Que intentaria esconder mejor un operador al hacer log tampering?",
                options: [
                    "La secuencia de acciones y la evidencia de ejecucion",
                    "La version del navegador del analista",
                    "La latencia del router del empleado",
                    "El nombre de la impresora"
                ],
                correctIndex: 0,
                concept: "Defense evasion",
                explanation: "Alterar o borrar logs busca romper reconstruccion de hechos y retrasar el descubrimiento."
            },
            {
                id: "n9q4",
                category: "privacidad",
                prompt: "Que riesgo hay en guardar indefinidamente logs de navegacion con identificadores directos?",
                options: [
                    "Se crea un historico muy sensible de conducta personal",
                    "Se mejora siempre el compliance",
                    "Se reduce el impacto de un breach",
                    "Desaparecen las obligaciones de minimizacion"
                ],
                correctIndex: 0,
                concept: "Retention risk",
                explanation: "Mas retencion y mas identificacion significan mas valor y mas dano potencial si algo falla."
            },
            {
                id: "n9q5",
                category: "sistemas",
                prompt: "Que ventaja tiene enviar logs a un repositorio remoto e inmutable?",
                options: [
                    "Dificulta que un atacante local los manipule tras comprometer el host",
                    "Reduce el uso de CPU a cero",
                    "Impide cualquier error de parsing",
                    "Sustituye las copias de seguridad"
                ],
                correctIndex: 0,
                concept: "Centralizacion resistente",
                explanation: "Sacar los logs del host comprometido da una copia mas fuerte para investigacion y auditoria."
            }
        ]
    },
    {
        id: "nivel-10",
        level: 10,
        difficulty: "Avanzado",
        title: "Seguridad ofensiva web",
        subtitle: "Aplicaciones, sesiones, confianza y abuso de logica.",
        focusTheme: "red-team",
        estimatedMinutes: 7,
        learningGoal: "Entender que atacar una app no es solo buscar bugs tecnicos, sino tambien fallos de negocio y de confianza.",
        questions: [
            {
                id: "n10q1",
                category: "ciberseguridad",
                prompt: "Que describe mejor un fallo IDOR?",
                options: [
                    "Acceso a objetos o recursos sin control de autorizacion adecuado",
                    "Cifrado fuerte por defecto",
                    "Resolucion DNS lenta",
                    "Logs sin timestamps"
                ],
                correctIndex: 0,
                concept: "Broken access control",
                explanation: "Si el sistema expone identificadores pero no valida bien la autorizacion, un usuario puede saltar barreras."
            },
            {
                id: "n10q2",
                category: "blue-team",
                prompt: "Que defensa reduce mejor el impacto de credenciales robadas en una sesion web?",
                options: [
                    "MFA, gestion de sesiones y deteccion de contexto anomalo",
                    "Aumentar el tamano del logo",
                    "Desactivar expiracion de tokens",
                    "Permitir cookies inseguras"
                ],
                correctIndex: 0,
                concept: "Session security",
                explanation: "La defensa real mezcla autenticacion fuerte, gestion de tokens y monitorizacion contextual."
            },
            {
                id: "n10q3",
                category: "red-team",
                prompt: "Que intenta aprovechar un atacante con SSRF?",
                options: [
                    "Que el servidor haga peticiones en su nombre a destinos no previstos",
                    "Que el cliente cambie la resolucion de pantalla",
                    "Que el usuario olvide su password",
                    "Que el DNS deje de funcionar"
                ],
                correctIndex: 0,
                concept: "Server-Side Request Forgery",
                explanation: "SSRF usa la confianza y posicion del servidor para alcanzar metadata, redes internas o servicios protegidos."
            },
            {
                id: "n10q4",
                category: "privacidad",
                prompt: "Que cabecera ayuda a reducir fuga de origen completo entre sitios al navegar desde una app web?",
                options: [
                    "Referrer-Policy",
                    "Upgrade-Insecure-Requests",
                    "ETag",
                    "Alt-Svc"
                ],
                correctIndex: 0,
                concept: "Referrer control",
                explanation: "Referrer-Policy limita cuanta informacion sobre la pagina previa se comparte al saltar a otros sitios."
            },
            {
                id: "n10q5",
                category: "sistemas",
                prompt: "Que patron de despliegue ayuda a rotar versiones de una app con menos riesgo?",
                options: [
                    "Blue-green deployment",
                    "Montar todo en un servidor sin pruebas",
                    "Editar binarios en produccion por SSH",
                    "Desactivar health checks"
                ],
                correctIndex: 0,
                concept: "Release engineering",
                explanation: "Blue-green facilita rollback rapido y reduce el tiempo de incertidumbre durante el cambio."
            }
        ]
    },
    {
        id: "nivel-11",
        level: 11,
        difficulty: "Avanzado+",
        title: "Defensa en profundidad",
        subtitle: "Arquitectura de controles y degradacion segura.",
        focusTheme: "ciberseguridad",
        estimatedMinutes: 8,
        learningGoal: "Pensar la seguridad como capas coordinadas, no como una unica herramienta magica.",
        questions: [
            {
                id: "n11q1",
                category: "ciberseguridad",
                prompt: "Que expresa mejor el concepto de defensa en profundidad?",
                options: [
                    "Usar multiples controles complementarios para que una sola falla no sea fatal",
                    "Confiar en un unico firewall muy potente",
                    "Desactivar capas para simplificar",
                    "Resolver todo con awareness"
                ],
                correctIndex: 0,
                concept: "Layered security",
                explanation: "Las capas compensan fallos parciales y obligan al atacante a superar barreras distintas."
            },
            {
                id: "n11q2",
                category: "blue-team",
                prompt: "Que arquitectura acerca mas a Zero Trust?",
                options: [
                    "Verificacion explicita, microsegmentacion y acceso contextual",
                    "Red plana y confianza total por estar dentro",
                    "Admin local para todos los usuarios",
                    "Tokens permanentes sin reevaluacion"
                ],
                correctIndex: 0,
                concept: "Zero Trust",
                explanation: "Zero Trust intenta reemplazar la confianza implcita por validacion continua y minima superficie."
            },
            {
                id: "n11q3",
                category: "red-team",
                prompt: "Que hace mas dificil el movimiento lateral despues de comprometer una maquina?",
                options: [
                    "Segmentacion, MFA admin y control de privilegios",
                    "Compartir cuentas locales en todos los equipos",
                    "Guardar secretos en texto plano",
                    "Permitir SMB abierto en todas partes"
                ],
                correctIndex: 0,
                concept: "Lateral movement resistance",
                explanation: "Reducir confianza transversal y separar identidades administrativas complica expandir el acceso."
            },
            {
                id: "n11q4",
                category: "privacidad",
                prompt: "Que enfoque de producto se alinea mejor con privacy by design?",
                options: [
                    "Minimizar datos desde el principio y justificar cada recoleccion",
                    "Recolectarlo todo por si acaso",
                    "Anadir privacidad solo tras una crisis",
                    "Esconder consentimiento en la letra pequena"
                ],
                correctIndex: 0,
                concept: "Privacy by design",
                explanation: "La privacidad efectiva se decide al modelar datos, flujos y retencion, no solo al redactar textos legales."
            },
            {
                id: "n11q5",
                category: "sistemas",
                prompt: "Que propiedad aumenta mas la resiliencia de una plataforma critica?",
                options: [
                    "Redundancia con failover probado",
                    "Unico punto de fallo muy optimizado",
                    "Backups sin restauracion ensayada",
                    "Credenciales embebidas en scripts"
                ],
                correctIndex: 0,
                concept: "High availability",
                explanation: "La redundancia solo sirve de verdad cuando el failover y la recuperacion se prueban bajo condiciones reales."
            }
        ]
    },
    {
        id: "nivel-12",
        level: 12,
        difficulty: "Experto inicial",
        title: "Cloud y arquitectura",
        subtitle: "Identidades, secretos, control planes y segmentacion moderna.",
        focusTheme: "sistemas",
        estimatedMinutes: 8,
        learningGoal: "Trasladar el razonamiento de seguridad a plataformas cloud y entornos distribuidos.",
        questions: [
            {
                id: "n12q1",
                category: "ciberseguridad",
                prompt: "En cloud, que fallo es especialmente peligroso porque escala rapido el impacto?",
                options: [
                    "Permisos IAM excesivos",
                    "Un icono roto en la consola",
                    "Un color de tema incorrecto",
                    "Un dashboard demasiado ancho"
                ],
                correctIndex: 0,
                concept: "Cloud identity risk",
                explanation: "En cloud la identidad es el nuevo perimetro; un exceso de permisos puede abrir muchos servicios a la vez."
            },
            {
                id: "n12q2",
                category: "blue-team",
                prompt: "Que control ayuda a detectar uso anomalo de una service account en cloud?",
                options: [
                    "Baselines de comportamiento y logs de API",
                    "Cambiar el nombre del proyecto",
                    "Ocultar el coste mensual",
                    "Quitar etiquetas a recursos"
                ],
                correctIndex: 0,
                concept: "Cloud audit",
                explanation: "Las llamadas al control plane dejan huella; lo importante es modelar que uso es normal y que no."
            },
            {
                id: "n12q3",
                category: "red-team",
                prompt: "Que intenta hacer un atacante al consultar metadata service desde una instancia comprometida?",
                options: [
                    "Obtener credenciales temporales o contexto de la maquina",
                    "Aumentar la resolucion del sistema",
                    "Reparar el balanceador",
                    "Desactivar el reloj del host"
                ],
                correctIndex: 0,
                concept: "Instance metadata abuse",
                explanation: "Los metadatos pueden revelar tokens, roles o configuracion que permitan pivotar mas lejos."
            },
            {
                id: "n12q4",
                category: "privacidad",
                prompt: "Que preocupacion de privacidad aparece al centralizar analitica de multiples productos en una sola plataforma?",
                options: [
                    "Correlacion de identidades y perfiles a gran escala",
                    "Menor necesidad de gobernanza",
                    "Desaparicion del riesgo contractual",
                    "Imposibilidad de reidentificacion"
                ],
                correctIndex: 0,
                concept: "Data concentration",
                explanation: "Concentrar datos mejora analisis, pero tambien multiplica el valor y la sensibilidad de la plataforma."
            },
            {
                id: "n12q5",
                category: "sistemas",
                prompt: "Que ventaja clave tiene IaC frente a cambios manuales dispersos?",
                options: [
                    "Versionado, repetibilidad y revisiones auditables",
                    "Hace innecesarios los permisos",
                    "Evita cualquier misconfiguration",
                    "Sustituye al monitoreo de produccion"
                ],
                correctIndex: 0,
                concept: "Infrastructure as Code",
                explanation: "IaC no evita todos los errores, pero si mejora trazabilidad, revisiones y consistencia del despliegue."
            }
        ]
    },
    {
        id: "nivel-13",
        level: 13,
        difficulty: "Experto",
        title: "Threat hunting",
        subtitle: "Hipotesis, comportamiento y busqueda sin alerta previa.",
        focusTheme: "blue-team",
        estimatedMinutes: 8,
        learningGoal: "Aprender que cazar amenazas es formular hipotesis y validarlas con telemetria util.",
        questions: [
            {
                id: "n13q1",
                category: "ciberseguridad",
                prompt: "Que diferencia mejor una busqueda de threat hunting frente a un triage de alertas?",
                options: [
                    "Parte de hipotesis y comportamiento aunque no exista alerta previa",
                    "Solo mira indicadores publicos de hace anos",
                    "Se limita a tickets cerrados",
                    "Evita revisar datos reales"
                ],
                correctIndex: 0,
                concept: "Hypothesis-driven hunting",
                explanation: "Hunting busca lo que aun no salto por reglas, usando intuicion, contexto e historias de adversario."
            },
            {
                id: "n13q2",
                category: "blue-team",
                prompt: "Que consulta de hunting puede revelar mejor persistence sigilosa en Windows?",
                options: [
                    "Nuevas claves Run, servicios y tareas programadas fuera de baseline",
                    "Numero total de fondos de pantalla",
                    "Usuarios conectados a impresoras",
                    "Duracion de la animacion del cursor"
                ],
                correctIndex: 0,
                concept: "Persistence hunting",
                explanation: "Comparar autoruns, servicios y scheduled tasks contra una linea base da mucho contexto sobre cambios raros."
            },
            {
                id: "n13q3",
                category: "red-team",
                prompt: "Que haria un operador para sobrevivir mejor a reglas basadas solo en IOC?",
                options: [
                    "Rotar infraestructura y variar artefactos manteniendo la misma tecnica",
                    "Usar siempre el mismo hash",
                    "Dejar el mismo dominio meses",
                    "Mantener lineas de comando identicas"
                ],
                correctIndex: 0,
                concept: "IOC evasion",
                explanation: "Cambiar indicadores concretos pero conservar tacticas es una forma clasica de esquivar detecciones rigidas."
            },
            {
                id: "n13q4",
                category: "privacidad",
                prompt: "Que equilibrio debe cuidar un equipo de hunting al ampliar telemetria del puesto?",
                options: [
                    "Utilidad de seguridad frente a minimizacion y acceso need-to-know",
                    "Recoger todo sin limites porque luego ya se vera",
                    "Prescindir siempre de consentimiento interno",
                    "Evitar cualquier control de acceso a la telemetria"
                ],
                correctIndex: 0,
                concept: "Proportional telemetry",
                explanation: "Mas datos no siempre significan mejor defensa; tambien amplian la responsabilidad sobre informacion sensible."
            },
            {
                id: "n13q5",
                category: "sistemas",
                prompt: "Que requisito tecnico mejora mucho el hunting a escala?",
                options: [
                    "Normalizacion de datos y campos consistentes entre fuentes",
                    "Logs en formatos aleatorios por equipo",
                    "Sincronizacion horaria opcional",
                    "Sondeos manuales sin automatizacion"
                ],
                correctIndex: 0,
                concept: "Data engineering para SOC",
                explanation: "Sin normalizacion, comparar host, usuario, proceso o IP entre fuentes se vuelve muy caro y fragil."
            }
        ]
    },
    {
        id: "nivel-14",
        level: 14,
        difficulty: "Muy experto",
        title: "Operaciones adversarias",
        subtitle: "Cadena de ataque compleja, OPSEC y resistencia defensiva.",
        focusTheme: "red-team",
        estimatedMinutes: 9,
        learningGoal: "Entender las decisiones tacticas que separan un laboratorio simple de una operacion madura.",
        questions: [
            {
                id: "n14q1",
                category: "ciberseguridad",
                prompt: "Que describe mejor una kill chain moderna?",
                options: [
                    "Una secuencia de fases y objetivos que ayudan a modelar intrusion y defensa",
                    "Unicamente la lista de CVE del mes",
                    "El inventario de impresoras",
                    "La configuracion de la VPN del usuario"
                ],
                correctIndex: 0,
                concept: "Modelos de intrusion",
                explanation: "La kill chain y modelos parecidos ayudan a ordenar observacion, respuesta y cobertura defensiva."
            },
            {
                id: "n14q2",
                category: "blue-team",
                prompt: "Que enfoque defensivo responde mejor a un adversario que rota IOCs con rapidez?",
                options: [
                    "Deteccion basada en comportamiento y contexto operativo",
                    "Bloquear solo hashes conocidos",
                    "Esperar a que aparezca un dominio publico",
                    "Quitar los logs para reducir ruido"
                ],
                correctIndex: 0,
                concept: "Behavioral detection",
                explanation: "Cuando los artefactos cambian, la logica de comportamiento suele sobrevivir mejor que los bloqueos estaticos."
            },
            {
                id: "n14q3",
                category: "red-team",
                prompt: "Por que un operador cuida tanto su OPSEC durante una intrustion simulada?",
                options: [
                    "Para evitar descubrir infraestructura, identidad o tacticas antes de tiempo",
                    "Para reducir el consumo electrico del objetivo",
                    "Para cambiar la topologia del edificio",
                    "Para acelerar el arranque de BIOS"
                ],
                correctIndex: 0,
                concept: "Operational security",
                explanation: "Una mala OPSEC quema infraestructura, delata procesos y reduce el valor de la simulacion."
            },
            {
                id: "n14q4",
                category: "privacidad",
                prompt: "Que riesgo de privacidad puede crear una plataforma de deteccion muy profunda en endpoint?",
                options: [
                    "Recolectar contenido o contexto excesivo si no se gobierna bien",
                    "Eliminar la necesidad de politicas internas",
                    "Hacer imposible cualquier abuso interno",
                    "Reducir a cero el impacto de fugas"
                ],
                correctIndex: 0,
                concept: "Observabilidad vs. intrusividad",
                explanation: "Cuanto mas mira una herramienta, mas importante es limitar acceso, finalidad y retencion."
            },
            {
                id: "n14q5",
                category: "sistemas",
                prompt: "Que propiedad de una arquitectura dificulta mas moverse sin ser visto entre entornos?",
                options: [
                    "Segmentacion fuerte con identidades separadas y salto controlado",
                    "Red plana con confianza total",
                    "Una unica cuenta admin global",
                    "Servicios compartiendo secretos embebidos"
                ],
                correctIndex: 0,
                concept: "Segregacion operativa",
                explanation: "Separar planos y cuentas obliga a dejar mas rastro y subir mas escalones para pivotar."
            }
        ]
    },
    {
        id: "nivel-15",
        level: 15,
        difficulty: "Demasiado complejo",
        title: "Arquitectura y estrategia",
        subtitle: "Trade-offs reales entre seguridad, deteccion, privacidad y operacion.",
        focusTheme: "ciberseguridad",
        estimatedMinutes: 9,
        learningGoal: "Cerrar el recorrido razonando sobre decisiones de alto nivel y sus efectos colaterales.",
        questions: [
            {
                id: "n15q1",
                category: "ciberseguridad",
                prompt: "En seguridad madura, que significa priorizar por riesgo en vez de por volumen de findings?",
                options: [
                    "Atender primero lo que combina impacto, probabilidad y exposicion real",
                    "Corregir solo lo mas facil aunque no importe",
                    "Cerrar tickets por orden alfabetico",
                    "Ignorar contexto de negocio"
                ],
                correctIndex: 0,
                concept: "Risk-based security",
                explanation: "No todo hallazgo vale lo mismo; la priorizacion madura mira dano potencial y explotabilidad real."
            },
            {
                id: "n15q2",
                category: "blue-team",
                prompt: "Que decision suele mejorar mas un SOC a largo plazo?",
                options: [
                    "Reducir ruido, definir detecciones medibles y cerrar el bucle con incidentes reales",
                    "Anadir alertas sin mantenimiento",
                    "Bloquear cualquier cambio del entorno",
                    "Medir solo numero bruto de eventos"
                ],
                correctIndex: 0,
                concept: "Detection engineering",
                explanation: "La calidad del SOC crece cuando las detecciones tienen duenos, cobertura, tuning y retroalimentacion."
            },
            {
                id: "n15q3",
                category: "red-team",
                prompt: "Que aporta mas valor en una operacion avanzada que un simple exploit exitoso?",
                options: [
                    "Demostrar rutas realistas de impacto y recomendar mejoras verificables",
                    "Presumir de zero-day sin contexto",
                    "Mantener acceso indefinido en silencio",
                    "Evitar cualquier coordinacion con defensa"
                ],
                correctIndex: 0,
                concept: "Adversary emulation con valor",
                explanation: "Una simulacion buena no solo entra: ensena por donde, por que y que control concreto lo hubiese frenado."
            },
            {
                id: "n15q4",
                category: "privacidad",
                prompt: "Que tension aparece al combinar analitica exhaustiva y productos personalizados?",
                options: [
                    "El mismo dato que mejora servicio puede ampliar vigilancia y reidentificacion",
                    "No existe ninguna tension real",
                    "La personalizacion elimina obligaciones de minimizacion",
                    "Cuantos mas datos, menor sensibilidad"
                ],
                correctIndex: 0,
                concept: "Data governance trade-off",
                explanation: "Mas observacion puede dar mejores productos, pero tambien incrementa perfilado, dependencia y dano potencial."
            },
            {
                id: "n15q5",
                category: "sistemas",
                prompt: "Que rasgo distingue a una plataforma operable y segura en entornos complejos?",
                options: [
                    "Automatizacion, observabilidad, control de cambios y recuperacion probada",
                    "Cambios manuales de madrugada sin trazabilidad",
                    "Credenciales compartidas entre equipos",
                    "Ausencia de inventario y dependencias"
                ],
                correctIndex: 0,
                concept: "Operabilidad segura",
                explanation: "La seguridad sostenible necesita sistemas que se entienden, cambian con control y se recuperan de forma repetible."
            }
        ]
    }
];
