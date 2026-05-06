const baseFeanorTheoryTopics = [
    {
        id: "fundamentos-codificacion",
        label: "Fundamentos de codificacion",
        badge: "BASE",
        routeName: "feanor-teoria-fundamentos-codificacion",
        summary: "Bits, bytes, texto, Unicode y representaciones como Hex, Base64, Base64URL y URL encoding.",
        toolRouteNames: ["feanor-base64", "feanor-base64url", "feanor-url-encoding", "feanor-hex", "feanor-inspector-bytes"],
        pillars: [
            "Un byte son 8 bits; casi todo lo que ves como texto acaba siendo una secuencia de bytes.",
            "Codificar no es cifrar: Base64, Hex o URL encoding solo cambian la representacion.",
            "UTF-8 decide que bytes representan cada caracter, incluido cualquier caracter no ASCII."
        ],
        sections: [
            {
                title: "Texto frente a bytes",
                body: "Un navegador no procesa letras magicas: procesa bytes. La letra A en UTF-8 es 0x41, pero Ñ ocupa dos bytes: 0xC3 0x91. Por eso dos textos visualmente parecidos pueden tener longitudes binarias distintas.",
                bullets: [
                    "La herramienta Inspector de bytes muestra la longitud real en bytes, no solo caracteres visuales.",
                    "Hex representa cada byte con dos simbolos: 0x41 se ve como 41.",
                    "Base64 agrupa los bits de tres bytes y los reparte en cuatro caracteres transportables."
                ],
                exampleTitle: "Mini ejemplo",
                exampleLines: [
                    "Texto: A",
                    "UTF-8: 41",
                    "Base64: QQ==",
                    "Si aparece Ñ, la cuenta cambia porque UTF-8 usa mas de un byte."
                ]
            },
            {
                title: "Base64, Base64URL y URL encoding",
                body: "Base64 esta pensado para transportar bytes en canales de texto. Base64URL cambia + por -, / por _ y suele quitar padding para que sea comodo en URLs y JWT. URL encoding escapa caracteres reservados con porcentajes.",
                bullets: [
                    "Base64 no oculta informacion: cualquiera puede decodificarlo.",
                    "Base64URL aparece mucho en JWT porque sus segmentos viajan en cabeceras y URLs.",
                    "Los ficheros viajan como Base64 puro o como data URI con MIME, por ejemplo data:image/png;base64,...",
                    "URL encoding protege delimitadores como espacios, &, ?, = o caracteres no ASCII."
                ],
                exampleTitle: "Regla mental",
                exampleLines: [
                    "Si necesitas transportar bytes como texto: Base64.",
                    "Si debe vivir dentro de una URL o JWT: Base64URL.",
                    "Si ya tienes texto y quieres meterlo en una query string: URL encode."
                ]
            }
        ],
        checklist: [
            "Distingue siempre entre texto, bytes y representacion textual.",
            "No llames cifrado a Base64 o Hex.",
            "Cuando algo falle, inspecciona primero los bytes reales."
        ]
    },
    {
        id: "cesar-xor",
        label: "Cesar, puertas y cifrados clasicos",
        badge: "CLAS",
        routeName: "feanor-teoria-cesar-xor",
        summary: "Cesar, Atbash, XOR, NOR, Vigenere, Afin, Rail Fence y por que estos esquemas son utiles para aprender pero debiles para proteger.",
        toolRouteNames: ["feanor-cifrado-cesar", "feanor-atbash", "feanor-xor", "feanor-boolean-ops", "feanor-vigenere", "feanor-affine", "feanor-rail-fence", "feanor-inspector-bytes"],
        pillars: [
            "Cesar mueve letras dentro de un alfabeto cerrado.",
            "XOR y XNOR son reversibles con la misma mascara; NOR y NAND son puertas universales, pero pierden informacion.",
            "Vigenere, Afin y Rail Fence muestran sustitucion, aritmetica modular y transposicion.",
            "Los cifrados simples sirven para aprender flujo y reversibilidad, no para proteger datos reales."
        ],
        sections: [
            {
                title: "Como funciona Cesar",
                body: "Cesar toma la posicion de una letra, suma un desplazamiento y aplica modulo con el tamano del alfabeto. En alfabeto ingles hay 26 letras; en el espanol de esta app hay 27 porque incluye Ñ entre N y O.",
                bullets: [
                    "Normal: posicionNueva = (posicion + desplazamiento) mod tamanoAlfabeto.",
                    "Inversa: posicionNueva = (posicion - desplazamiento) mod tamanoAlfabeto.",
                    "Los signos, espacios y caracteres fuera del alfabeto quedan intactos."
                ],
                exampleTitle: "Cesar con desplazamiento 3",
                exampleLines: [
                    "Ingles: A -> D, B -> E, Z -> C.",
                    "Espanol: N -> Q, Ñ -> R, Z -> C.",
                    "Para revertir se usa el mismo numero con logica inversa."
                ]
            },
            {
                title: "Atbash: sustitucion espejo",
                body: "Atbash no usa una clave variable: invierte el alfabeto. A se cambia por Z, B por Y, C por X, y asi hasta el centro. Como es una funcion espejo, aplicar Atbash dos veces devuelve el original.",
                bullets: [
                    "Es una sustitucion monoalfabetica fija.",
                    "Conserva espacios, signos y frecuencia de letras.",
                    "Es util para entender mapas de sustitucion, pero se rompe rapido con analisis de frecuencia."
                ],
                exampleTitle: "Mapa simple",
                exampleLines: [
                    "A -> Z",
                    "B -> Y",
                    "Z -> A",
                    "Atbash(Atbash(texto)) = texto"
                ]
            },
            {
                title: "Que hace XOR",
                body: "XOR compara dos bits. Devuelve 1 si son distintos y 0 si son iguales. Lo importante para criptografia es que aplicar la misma clave dos veces recupera el original.",
                bullets: [
                    "0 XOR 0 = 0",
                    "0 XOR 1 = 1",
                    "1 XOR 0 = 1",
                    "1 XOR 1 = 0"
                ],
                exampleTitle: "Reversibilidad",
                exampleLines: [
                    "mensaje XOR clave = cifrado",
                    "cifrado XOR clave = mensaje",
                    "Si reutilizas la misma clave en muchos mensajes, se filtran patrones."
                ]
            },
            {
                title: "NOR, NAND y puertas booleanas",
                body: "NOR es la negacion de OR: A NOR B solo vale 1 cuando A = 0 y B = 0. NAND es la negacion de AND. NOR y NAND se llaman puertas universales porque con ellas se pueden construir las demas puertas logicas.",
                bullets: [
                    "NOR no es reversible: al ver un 0 de salida no sabes si venia de 01, 10 o 11.",
                    "XOR y XNOR si pueden usarse como combinadores reversibles con la misma mascara.",
                    "AND/OR/NAND/NOR son muy utiles para mascaras, flags y circuitos, pero por si solos pierden informacion."
                ],
                exampleTitle: "Tabla NOR",
                exampleLines: [
                    "0 NOR 0 = 1",
                    "0 NOR 1 = 0",
                    "1 NOR 0 = 0",
                    "1 NOR 1 = 0"
                ]
            },
            {
                title: "Vigenere: Cesar con clave",
                body: "Vigenere aplica un desplazamiento distinto por letra segun una clave repetida. Si la clave es FEANOR, cada letra de la clave se convierte en una posicion y va desplazando el texto.",
                bullets: [
                    "La clave solo avanza cuando se transforma una letra.",
                    "Para descifrar se resta el desplazamiento de la clave.",
                    "Si la clave es corta o repetida, aparecen patrones explotables."
                ],
                exampleTitle: "Flujo",
                exampleLines: [
                    "texto: ATAQUE",
                    "clave: FEANORFE...",
                    "cifrar: posicionTexto + posicionClave mod m",
                    "descifrar: posicionCifrada - posicionClave mod m"
                ]
            },
            {
                title: "Afin y Rail Fence",
                body: "El cifrado Afin usa aritmetica modular sobre posiciones de letras; Rail Fence no sustituye letras, sino que las reordena con un zigzag.",
                bullets: [
                    "Afin cifra con E(x) = (a*x + b) mod m.",
                    "Para descifrar Afin, a debe ser coprimo con m y tener inverso modular.",
                    "Rail Fence conserva letras y longitud; su secreto practico es el numero de railes.",
                    "Ambos son historicos y didacticos, no esquemas modernos."
                ],
                exampleTitle: "Diferencia clave",
                exampleLines: [
                    "Afin: cambia cada letra por otra letra.",
                    "Rail Fence: deja las letras, cambia posiciones.",
                    "Ambos se analizan con frecuencia y estructura."
                ]
            }
        ],
        checklist: [
            "En Cesar importa el alfabeto y su tamano.",
            "En XOR/XNOR importa la mascara, su longitud y no reutilizarla mal.",
            "NOR/NAND explican circuitos y mascaras, pero no descifran por si solos.",
            "Vigenere, Afin y Rail Fence explican familias clasicas, pero no reemplazan AES-GCM ni esquemas modernos."
        ]
    },
    {
        id: "operaciones-xor-modulo",
        label: "XOR, NOR y operacion modular",
        badge: "MATH",
        routeName: "feanor-teoria-operaciones-xor-modulo",
        summary: "Tablas de verdad, XOR/NOR bit a bit, reversibilidad con clave, resto de division, rango modular y potencia modular.",
        toolRouteNames: ["feanor-xor", "feanor-boolean-ops", "feanor-modular", "feanor-cifrado-cesar"],
        pillars: [
            "XOR devuelve 1 cuando dos bits son distintos y 0 cuando son iguales.",
            "Aplicar XOR dos veces con la misma clave recupera el valor original.",
            "A % N devuelve un resto entre 0 y N - 1; muchos valores pueden compartir el mismo resto."
        ],
        sections: [
            {
                title: "XOR bit a bit",
                body: "XOR, u OR exclusivo, compara bits. La tabla de verdad completa tiene cuatro casos: 0 XOR 0 = 0, 0 XOR 1 = 1, 1 XOR 0 = 1 y 1 XOR 1 = 0. Por eso 1010 XOR 1100 se calcula columna a columna y da 0110.",
                bullets: [
                    "A XOR A = 0: un valor combinado consigo mismo se anula.",
                    "A XOR 0 = A: cero no cambia el valor.",
                    "Es conmutativa: A XOR B = B XOR A.",
                    "Es asociativa: (A XOR B) XOR C = A XOR (B XOR C)."
                ],
                exampleTitle: "Ejemplo binario",
                exampleLines: [
                    "A = 1010",
                    "B = 1100",
                    "A XOR B = 0110",
                    "Si C = P XOR K, entonces C XOR K = P."
                ]
            },
            {
                title: "XOR como cifrado simetrico simple",
                body: "Si P es texto plano y K es una clave del mismo tamano, el cifrado puede expresarse como C = P XOR K. Para descifrar, se aplica otra vez la misma clave: C XOR K = (P XOR K) XOR K = P XOR 0 = P.",
                bullets: [
                    "La misma operacion cifra y descifra.",
                    "La clave debe ser impredecible y, en un one-time pad real, tan larga como el mensaje.",
                    "Reutilizar una clave corta deja patrones y puede romper la confidencialidad.",
                    "Muchos algoritmos modernos usan XOR internamente, aunque no se reducen solo a XOR."
                ],
                exampleTitle: "Flujo mental",
                exampleLines: [
                    "P XOR K = C",
                    "C XOR K = P",
                    "K XOR K = 0",
                    "P XOR 0 = P"
                ]
            },
            {
                title: "Operacion modular",
                body: "El operador modulo, escrito A % N, devuelve el resto de dividir A entre N. Si N es positivo, el resultado siempre queda en el rango 0 a N - 1. En criptografia se usa para trabajar en espacios finitos.",
                bullets: [
                    "25 % 5 = 0 porque 25 = 5 x 5 + 0.",
                    "23 % 6 = 5 porque 23 = 6 x 3 + 5.",
                    "23 % 7 = 2 porque 23 = 7 x 3 + 2.",
                    "No es reversible: x % 5 = 4 lo cumplen 4, 9, 14, 19..."
                ],
                exampleTitle: "Ejercicios",
                exampleLines: [
                    "60 % 12 = 0",
                    "118613842 % 9091 = calculalo en el lab con BigInt",
                    "A^E % N aparece en RSA y Diffie-Hellman."
                ]
            }
        ],
        checklist: [
            "En XOR, alinea bits o bytes antes de operar.",
            "Para recuperar un mensaje XOR necesitas la misma clave.",
            "En modulo, N debe ser positivo y el resultado cae entre 0 y N - 1.",
            "Para enteros grandes usa BigInt o una libreria de enteros grandes."
        ]
    },
    {
        id: "parsing-json-regex",
        label: "Parsing, Regex y JSON",
        badge: "PARSE",
        routeName: "feanor-teoria-parsing-json-regex",
        summary: "Como se interpretan patrones, flags, coincidencias, JSON valido, orden canonico y diferencias semanticas.",
        toolRouteNames: ["feanor-banco-regex", "feanor-json-diff"],
        pillars: [
            "Regex busca patrones sobre texto, no entiende significado de negocio.",
            "JSON valido tiene reglas estrictas de comillas, comas, arrays, objetos y tipos.",
            "Canonicalizar JSON elimina ruido de formato y orden de claves."
        ],
        sections: [
            {
                title: "Regex como automata practico",
                body: "Una expresion regular describe un conjunto de cadenas posibles. El motor recorre el texto, intenta casar el patron y devuelve coincidencias, grupos, offsets y flags aplicados.",
                bullets: [
                    "g busca todas las coincidencias; sin g normalmente solo importa la primera.",
                    "i ignora mayusculas/minusculas.",
                    "m cambia el comportamiento de inicio y fin de linea.",
                    "u activa lectura Unicode mas correcta para ciertos patrones."
                ],
                exampleTitle: "Patron tipo",
                exampleLines: [
                    "Bearer\\s+([A-Za-z0-9._-]+)",
                    "Bearer es literal.",
                    "\\s+ exige espacios.",
                    "El parentesis captura el token."
                ]
            },
            {
                title: "JSON canonico y diff",
                body: "Dos JSON pueden significar lo mismo aunque sus claves esten en otro orden. La canonicalizacion ordena claves y compacta el documento para comparar estructura y valores, no maquillaje.",
                bullets: [
                    "Formatear cambia espacios y saltos de linea, no el contenido.",
                    "Minificar elimina espacios innecesarios.",
                    "El diff canonico ayuda a ver cambios reales de campos, arrays y valores."
                ],
                exampleTitle: "Mismo significado",
                exampleLines: [
                    "{\"a\":1,\"b\":2}",
                    "{\"b\":2,\"a\":1}",
                    "Tras ordenar claves, ambos documentos son equivalentes."
                ]
            }
        ],
        checklist: [
            "Prueba regex con texto real y revisa offsets.",
            "No compares JSON sensible como texto plano si el orden puede variar.",
            "Valida antes de transformar o firmar."
        ]
    },
    {
        id: "esteganografia-metadatos",
        label: "Esteganografia y metadatos",
        badge: "META",
        routeName: "feanor-teoria-esteganografia-metadatos",
        summary: "Ocultacion LSB, metadatos EXIF/XMP/PNG/PDF/ZIP/ID3/RIFF, huellas de formato y limites del analisis en navegador.",
        toolRouteNames: ["feanor-estego-analizador", "feanor-exif", "feanor-metadata-editor", "feanor-estego-incrustar", "feanor-estego-extraer", "feanor-steghide-suite"],
        pillars: [
            "Esteganografia es ocultar la existencia de un mensaje; no equivale a cifrarlo.",
            "Los metadatos pueden revelar camara, software, fechas, rutas internas o autores.",
            "En puro frontend se puede inspeccionar mucho, pero no probar ausencia total de datos ocultos."
        ],
        sections: [
            {
                title: "LSB en imagenes",
                body: "La tecnica LSB cambia el bit menos significativo de canales de color. Visualmente suele ser imperceptible, pero esos bits pueden transportar un mensaje si el extractor conoce el formato usado.",
                bullets: [
                    "Un pixel RGB aporta 3 bits utiles si se usa un bit por canal.",
                    "Guardar como PNG conserva los bits; JPEG puede destruirlos por compresion.",
                    "Si el mensaje es sensible, cifralo antes de incrustarlo."
                ],
                exampleTitle: "Flujo local",
                exampleLines: [
                    "payload UTF-8 -> cabecera FEANOR -> bits",
                    "bits -> LSB de R, G y B",
                    "imagen resultante -> PNG descargable"
                ]
            },
            {
                title: "Steghide y StegSeek",
                body: "Steghide oculta ficheros completos dentro de JPEG, BMP, WAV y AU. Antes de incrustar comprime, cifra, reparte posiciones con una passphrase y guarda un CRC32 para validar integridad. StegSeek automatiza dos tareas ofensivas/forenses: probar diccionarios de passphrases y usar el modo seed para detectar patrones de Steghide.",
                bullets: [
                    "Steghide real usa JPEG/BMP/WAV/AU y no depende de la extension, sino de la cabecera del fichero.",
                    "Su flujo normal es embed, extract, info, encinfo, version, license y help.",
                    "El cifrado por defecto historico es Rijndael-128 en CBC; el laboratorio frontend usa AES-GCM porque WebCrypto lo soporta de forma nativa y autenticada.",
                    "StegSeek wordlist intenta passphrases; --seed explota que el PRNG de Steghide tiene un espacio de 2^32 semillas.",
                    "En navegador no se ejecuta el motor nativo ni un barrido 2^32 real; se ofrece un formato compatible de aprendizaje y comandos exactos para reproducirlo fuera."
                ],
                exampleTitle: "Flujo mental",
                exampleLines: [
                    "cover + secret + passphrase -> paquete comprimido/cifrado/checksum",
                    "passphrase -> PRNG -> posiciones portadoras",
                    "wordlist -> probar passphrases hasta validar cabecera/checksum",
                    "seed -> detectar Steghide nativo si se usa stegseek real"
                ]
            },
            {
                title: "Metadatos y formatos",
                body: "Un fichero suele tener estructura interna: magic bytes, cabeceras, chunks, segmentos, entradas ZIP o diccionarios PDF. Ahi pueden vivir metadatos legitimos o datos sospechosos.",
                bullets: [
                    "EXIF/XMP/IPTC aparecen en muchas imagenes; el lab EXIF los ordena por camara, captura, GPS, software y campos crudos.",
                    "PNG usa chunks como tEXt, iTXt, zTXt o IEND.",
                    "MP3 suele usar ID3v2 al inicio; WAV puede usar LIST/INFO dentro de RIFF.",
                    "DOCX/XLSX/PPTX son ZIP con XML interno; JSZip permite leerlo en cliente.",
                    "PDF puede exponer claves como Title, Author, Producer o JavaScript embebido."
                ],
                exampleTitle: "Senales utiles",
                exampleLines: [
                    "Bytes despues de IEND, EOI o %%EOF.",
                    "Entropia muy alta en zonas que no deberian ser aleatorias.",
                    "Cadenas visibles, comentarios o chunks no habituales."
                ]
            },
            {
                title: "Editar metadatos sin romper ficheros",
                body: "Escribir metadatos no es igual en todos los formatos. Algunos contenedores aceptan bloques textuales sencillos; otros tienen indices, offsets, atomos o XML interno que conviene reescribir con una libreria especifica.",
                bullets: [
                    "MP3 permite anadir ID3v2.4 con frames de titulo, artista, comentario y TXXX para campos propios.",
                    "PNG acepta iTXt UTF-8; JPEG permite COM, aunque EXIF profundo es mas delicado por MakerNotes.",
                    "WAV hereda RIFF: un LIST/INFO puede transportar INAM, IART, ICMT, ICOP e ISFT.",
                    "PDF, MP4/MOV, WebM/MKV, Office, EPUB, WebP, TIFF/RAW y HEIC pueden tener metadatos, pero en frontend es mas seguro generar sidecar XMP/JSON si no hay parser completo."
                ],
                exampleTitle: "Payload en MP3",
                exampleLines: [
                    "texto -> Base64/Base64URL/Hex",
                    "ID3v2.4 -> TXXX:FeanorEncodedPayload",
                    "MP3 nuevo -> audio original precedido por etiqueta ID3"
                ]
            }
        ],
        checklist: [
            "Analiza siempre tipo real por magic bytes, no solo extension.",
            "Distingue metadatos normales de senales de ocultacion.",
            "La herramienta ayuda a investigar; no demuestra que un fichero este limpio al 100%."
        ]
    },
    {
        id: "secretos-entropia",
        label: "Secretos y entropia",
        badge: "ENT",
        routeName: "feanor-teoria-secretos-entropia",
        summary: "Aleatoriedad, tamano de espacio de busqueda, passwords humanas, tokens, UUID y estimaciones de fortaleza.",
        toolRouteNames: ["feanor-generador-secretos", "feanor-entropia"],
        pillars: [
            "Un secreto fuerte necesita imprevisibilidad, no solo longitud visual.",
            "Entropia aproximada = longitud * log2(tamanoDelCharset), si la eleccion es aleatoria.",
            "Las passwords humanas suelen tener patrones que reducen fuerza real."
        ],
        sections: [
            {
                title: "Generar frente a inventar",
                body: "Una password inventada por una persona suele tener palabras, fechas, sustituciones previsibles y patrones de teclado. Un token generado con aleatoriedad criptografica distribuye mejor las posibilidades.",
                bullets: [
                    "UUID v4 ofrece unos 122 bits aleatorios utiles.",
                    "Hex usa 4 bits por caracter.",
                    "Base64URL ronda 6 bits por caracter si se genera bien."
                ],
                exampleTitle: "Comparacion mental",
                exampleLines: [
                    "16 chars Hex ~= 64 bits.",
                    "22 chars Base64URL ~= 132 bits teoricos.",
                    "Una frase humana larga puede ser peor si es predecible."
                ]
            },
            {
                title: "Que mide zxcvbn",
                body: "zxcvbn no solo cuenta caracteres. Busca patrones humanos: diccionarios, fechas, repeticiones, secuencias y sustituciones comunes. Por eso puede penalizar una password larga pero obvia.",
                bullets: [
                    "Shannon mide distribucion observada, no garantiza imprevisibilidad.",
                    "Charset teorico sirve si la generacion es aleatoria.",
                    "La fortaleza real depende del atacante y del contexto."
                ],
                exampleTitle: "Lectura sana",
                exampleLines: [
                    "Correcto: token aleatorio largo para API.",
                    "Correcto: password humana larga y unica con gestor.",
                    "Malo: reutilizar una clave o token entre contextos."
                ]
            }
        ],
        checklist: [
            "Genera secretos con aleatoriedad local cuando sea posible.",
            "No reutilices tokens entre sistemas.",
            "Mide entropia como guia, no como verdad absoluta."
        ]
    },
    {
        id: "hash-hmac-timing",
        label: "Hash, HMAC y timing",
        badge: "HASH",
        routeName: "feanor-teoria-hash-hmac-timing",
        summary: "Funciones hash, integridad autenticada, comparaciones constantes y ataques por tiempo.",
        toolRouteNames: ["feanor-hash", "feanor-hmac", "feanor-comparador-constante"],
        pillars: [
            "Un hash resume datos de forma determinista y no reversible en condiciones normales.",
            "HMAC combina hash y clave secreta para autenticar integridad.",
            "Comparar secretos con igualdad directa puede filtrar informacion por timing."
        ],
        sections: [
            {
                title: "Hash no es cifrado",
                body: "Un hash transforma una entrada en una huella fija. No se descifra. Se recalcula y se compara. SHA-256 y SHA-512 son adecuados para huellas; MD5 y SHA-1 quedan para compatibilidad historica.",
                bullets: [
                    "Determinista: la misma entrada da la misma salida.",
                    "Avalancha: un cambio pequeno altera mucho la huella.",
                    "Colision: dos entradas distintas con la misma salida; debe ser impracticable encontrarla."
                ],
                exampleTitle: "Uso correcto",
                exampleLines: [
                    "Descargo archivo -> calculo SHA-256 -> comparo con huella publicada.",
                    "No uso hash simple para guardar passwords; uso KDF con salt y coste."
                ]
            },
            {
                title: "Por que HMAC",
                body: "Un hash simple prueba que el contenido no cambio si ya confias en la huella. HMAC prueba que quien genero la huella conocia una clave compartida.",
                bullets: [
                    "HMAC(mensaje, clave) protege integridad y autenticidad simetrica.",
                    "Sin la clave, un atacante no puede recalcular un HMAC valido.",
                    "La comparacion debe hacerse en tiempo constante para secretos."
                ],
                exampleTitle: "Timing",
                exampleLines: [
                    "Comparacion directa puede terminar al primer byte distinto.",
                    "Comparacion constante recorre toda la longitud y acumula diferencias.",
                    "Eso reduce filtraciones sobre cuantos bytes coincidian."
                ]
            }
        ],
        checklist: [
            "Usa SHA-256+ para huellas nuevas.",
            "Usa HMAC cuando haya una clave compartida.",
            "Compara tokens y firmas con rutina constante."
        ]
    },
    {
        id: "derivacion-claves",
        label: "Derivacion de claves",
        badge: "KDF",
        routeName: "feanor-teoria-derivacion-claves",
        summary: "PBKDF2, HKDF, salts, iteraciones, info de contexto y conversion de material humano en claves.",
        toolRouteNames: ["feanor-pbkdf2", "feanor-hkdf"],
        pillars: [
            "PBKDF2 endurece passwords con salt e iteraciones.",
            "HKDF extrae y expande material de alta entropia para usos concretos.",
            "Salt no es secreto; evita tablas precalculadas y salidas repetidas."
        ],
        sections: [
            {
                title: "PBKDF2",
                body: "PBKDF2 aplica HMAC muchas veces para convertir una password en bytes de clave. El objetivo es subir el coste de cada intento offline.",
                bullets: [
                    "Salt unico por derivacion.",
                    "Iteraciones altas aumentan coste.",
                    "Longitud de salida debe coincidir con la clave que necesitas."
                ],
                exampleTitle: "Flujo",
                exampleLines: [
                    "password + salt + iteraciones + hash -> claveDerivada",
                    "Misma password con otro salt produce otra clave.",
                    "Bajar iteraciones facilita ataques offline."
                ]
            },
            {
                title: "HKDF",
                body: "HKDF parte de material ya fuerte, como un secreto ECDH, y lo convierte en claves separadas por contexto. Usa salt para extraccion e info para etiquetar el uso.",
                bullets: [
                    "Extract: estabiliza el secreto inicial.",
                    "Expand: genera bytes para un uso concreto.",
                    "Info separa claves de cifrado, autenticacion, sesiones o archivos."
                ],
                exampleTitle: "Info util",
                exampleLines: [
                    "app/aes-gcm/content",
                    "app/hmac/request-signing",
                    "Cambiar info evita reutilizar la misma clave para todo."
                ]
            }
        ],
        checklist: [
            "No uses passwords directamente como claves binarias.",
            "Usa salt unico y coste razonable.",
            "Separa usos con info/contexto."
        ]
    },
    {
        id: "cifrado-simetrico",
        label: "Cifrado simetrico",
        badge: "SYM",
        routeName: "feanor-teoria-cifrado-simetrico",
        summary: "Claves compartidas, cifrado por bloques o flujo, passphrases, IV y limites de algoritmos heredados.",
        toolRouteNames: ["feanor-cifrado-simetrico"],
        pillars: [
            "La misma clave cifra y descifra.",
            "Un IV/nonce evita que mensajes iguales produzcan salidas iguales en modos modernos.",
            "DES, RC4 o MD5 quedan como aprendizaje o compatibilidad, no como recomendacion."
        ],
        sections: [
            {
                title: "Clave compartida",
                body: "En cifrado simetrico, emisor y receptor conocen la misma clave. Si esa clave se filtra, cualquiera puede descifrar o producir mensajes cifrados equivalentes.",
                bullets: [
                    "AES es el estandar moderno mas comun.",
                    "TripleDES, DES, RC4 y Rabbit aparecen por historia y compatibilidad.",
                    "Una passphrase humana debe derivarse antes de ser clave real."
                ],
                exampleTitle: "Modelo mental",
                exampleLines: [
                    "textoPlano + clave -> textoCifrado",
                    "textoCifrado + mismaClave -> textoPlano",
                    "Si cambia la clave, el descifrado falla o devuelve basura."
                ]
            },
            {
                title: "Lo que la herramienta demuestra",
                body: "El modulo simetrico sirve para practicar pipelines locales: generar clave, cifrar, pasar salida a entrada y descifrar. No pretende disenar un protocolo de produccion.",
                bullets: [
                    "Observa el formato de salida.",
                    "Prueba que una clave incorrecta rompe la recuperacion.",
                    "Usa AEAD cuando quieras autenticacion formal."
                ],
                exampleTitle: "Riesgo comun",
                exampleLines: [
                    "Cifrar sin autenticar puede no detectar alteraciones.",
                    "Por eso AES-GCM aparece como modulo separado."
                ]
            }
        ],
        checklist: [
            "Protege la clave, no solo el algoritmo.",
            "Prefiere AES moderno y modos autenticados.",
            "No reutilices IV/nonce donde el modo lo prohibe."
        ]
    },
    {
        id: "aead-gcm",
        label: "AEAD y AES-GCM",
        badge: "AEAD",
        routeName: "feanor-teoria-aead-gcm",
        summary: "Cifrado autenticado, nonce, AAD, ciphertext, tag y deteccion de manipulaciones.",
        toolRouteNames: ["feanor-aead"],
        pillars: [
            "AEAD cifra y autentica en una misma operacion.",
            "AAD no se cifra, pero queda protegido contra cambios.",
            "AES-GCM necesita nonce/IV unico por clave."
        ],
        sections: [
            {
                title: "Piezas de AES-GCM",
                body: "AES-GCM produce ciphertext y tag. El tag autentica ciphertext, IV y AAD. Si cualquier pieza cambia, el descifrado debe fallar.",
                bullets: [
                    "Clave: material secreto AES.",
                    "IV/nonce: valor unico, normalmente 12 bytes.",
                    "AAD: datos visibles pero autenticados, como cabeceras o metadatos.",
                    "Tag: prueba criptografica de integridad."
                ],
                exampleTitle: "Sobre mental",
                exampleLines: [
                    "{ iv, aad, ciphertext, tag }",
                    "El receptor necesita la misma clave y las mismas piezas.",
                    "Alterar un bit debe invalidar el tag."
                ]
            },
            {
                title: "Por que el modulo permite alterar ciphertext",
                body: "La accion de alterar demuestra autenticidad: no basta con que algo parezca bytes cifrados. Si cambia el ciphertext o el AAD, AES-GCM rechaza la operacion.",
                bullets: [
                    "Eso protege contra manipulaciones silenciosas.",
                    "No evita que alguien borre el mensaje.",
                    "No protege metadatos que no incluyas como AAD."
                ],
                exampleTitle: "Regla dura",
                exampleLines: [
                    "Nunca reutilices IV con la misma clave en GCM.",
                    "Clave + IV repetidos pueden romper confidencialidad y autenticidad."
                ]
            }
        ],
        checklist: [
            "Usa IV unico por clave.",
            "Autentica metadatos importantes como AAD.",
            "Trata un fallo de descifrado como alerta de integridad."
        ]
    },
    {
        id: "tokens-otp-jwt",
        label: "JWT, TOTP y HOTP",
        badge: "AUTH",
        routeName: "feanor-teoria-tokens-otp-jwt",
        summary: "Tokens firmados, claims, cabeceras, secretos OTP, contadores y ventanas temporales.",
        toolRouteNames: ["feanor-jwt", "feanor-otp"],
        pillars: [
            "Un JWT firmado se decodifica sin verificar, pero solo se confia tras validar firma y claims.",
            "HOTP depende de un contador compartido.",
            "TOTP deriva el contador del tiempo actual y una ventana de tolerancia."
        ],
        sections: [
            {
                title: "JWT por dentro",
                body: "Un JWT firmado tiene tres segmentos Base64URL: header, payload y signature. Header y payload son legibles. La seguridad esta en validar la firma y comprobar claims.",
                bullets: [
                    "header dice algoritmo y, a veces, kid.",
                    "payload contiene claims como sub, exp, nbf, iss o aud.",
                    "signature cubre header.payload con la clave del algoritmo."
                ],
                exampleTitle: "No confundas",
                exampleLines: [
                    "Decodificar JWT no valida nada.",
                    "Validar firma no sustituye revisar exp, aud, iss y permisos.",
                    "alg=none o algoritmos inesperados son senales delicadas."
                ]
            },
            {
                title: "OTP",
                body: "HOTP calcula HMAC(secret, counter), recorta bits mediante dynamic truncation y reduce el numero a 6-8 digitos. TOTP usa el tiempo Unix dividido por el paso como contador.",
                bullets: [
                    "Base32 es una forma comoda de transportar el secreto OTP.",
                    "TOTP suele usar pasos de 30 segundos.",
                    "La verificacion admite ventana para compensar desfase de reloj."
                ],
                exampleTitle: "Formula corta",
                exampleLines: [
                    "HOTP = truncate(HMAC(secret, counter)) mod 10^digits",
                    "TOTP counter = floor(unixTime / step)"
                ]
            }
        ],
        checklist: [
            "No confies en JWT solo por poder leerlo.",
            "Valida firma, tiempos, emisor y audiencia.",
            "Protege el secreto OTP como una credencial."
        ]
    },
    {
        id: "asimetrica-hibrida",
        label: "Asimetrica e hibrida",
        badge: "RSA",
        routeName: "feanor-teoria-asimetrica-hibrida",
        summary: "Par de claves, RSA-OAEP, limite de tamano, cifrado hibrido y envoltorios con AES.",
        toolRouteNames: ["feanor-cifrado-asimetrico"],
        pillars: [
            "La clave publica cifra; la privada descifra.",
            "RSA directo solo admite mensajes pequenos.",
            "El cifrado hibrido usa RSA para envolver una clave AES y AES-GCM para el contenido."
        ],
        sections: [
            {
                title: "Por que RSA-OAEP",
                body: "RSA por si solo es una primitiva matematica. OAEP anade padding seguro para cifrado, mezcla aleatoriedad y evita estructuras predecibles.",
                bullets: [
                    "La clave publica puede compartirse.",
                    "La clave privada no debe salir del custodio.",
                    "El tamano maximo depende de longitud RSA y hash OAEP."
                ],
                exampleTitle: "Limite practico",
                exampleLines: [
                    "RSA-2048 con SHA-256 no cifra documentos grandes directamente.",
                    "Para mensajes grandes se usa esquema hibrido."
                ]
            },
            {
                title: "Cifrado hibrido",
                body: "El flujo moderno genera una clave AES aleatoria, cifra el contenido con AES-GCM y cifra solo esa clave AES con RSA-OAEP. El resultado viaja como un sobre.",
                bullets: [
                    "RSA protege la clave de contenido.",
                    "AES-GCM protege el mensaje completo.",
                    "El receptor usa su privada RSA para recuperar la clave AES y luego descifra el contenido."
                ],
                exampleTitle: "Sobre hibrido",
                exampleLines: [
                    "{ wrappedKey, iv, aad, ciphertext }",
                    "wrappedKey se abre con RSA privada.",
                    "ciphertext se abre con AES recuperada."
                ]
            }
        ],
        checklist: [
            "No cifres payloads grandes directamente con RSA.",
            "Usa OAEP para cifrado, no firmas.",
            "Separa claramente clave publica y privada."
        ]
    },
    {
        id: "firmas-ecdh",
        label: "Firmas y ECDH",
        badge: "ECDH",
        routeName: "feanor-teoria-firmas-ecdh",
        summary: "RSA-PSS, ECDSA, autenticidad, no repudio practico, curvas, intercambio y secreto compartido.",
        toolRouteNames: ["feanor-firma-digital", "feanor-ecdh"],
        pillars: [
            "Firmar no cifra: prueba autoria/integridad, no oculta el mensaje.",
            "ECDH no firma ni cifra directamente: acuerda un secreto compartido.",
            "Una clave publica puede viajar; una privada debe quedarse privada."
        ],
        sections: [
            {
                title: "Firma digital",
                body: "Una firma se calcula con clave privada sobre los bytes del mensaje. Cualquiera con la clave publica correspondiente puede verificar que esos bytes no cambiaron y que la firma corresponde a esa privada.",
                bullets: [
                    "RSA-PSS firma con padding probabilistico moderno.",
                    "ECDSA firma sobre curvas elipticas.",
                    "Cambiar un solo byte del mensaje invalida la firma."
                ],
                exampleTitle: "Flujo",
                exampleLines: [
                    "mensaje + clavePrivada -> firma",
                    "mensaje + firma + clavePublica -> valido/invalido",
                    "La firma no oculta el mensaje."
                ]
            },
            {
                title: "ECDH",
                body: "ECDH permite que dos partes generen el mismo secreto compartido combinando su clave privada con la publica de la otra parte. Ese secreto suele entrar despues en HKDF.",
                bullets: [
                    "Cliente genera par ECDH.",
                    "Servidor genera par ECDH.",
                    "Cada uno usa su privada y la publica del otro.",
                    "Ambos llegan al mismo secreto sin enviarlo."
                ],
                exampleTitle: "Cuidado",
                exampleLines: [
                    "ECDH sin autenticacion puede sufrir man-in-the-middle.",
                    "En protocolos reales se combina con certificados o firmas."
                ]
            }
        ],
        checklist: [
            "Usa firmas para autenticidad, no confidencialidad.",
            "Deriva secretos ECDH con HKDF antes de usarlos.",
            "Autentica las claves publicas recibidas."
        ]
    },
    {
        id: "formatos-pki",
        label: "Formatos de claves y PKI",
        badge: "PKI",
        routeName: "feanor-teoria-formatos-pki",
        summary: "PEM, DER, JWK, certificados X.509, sujeto, emisor, SAN, huellas y cadenas de confianza.",
        toolRouteNames: ["feanor-conversor-claves", "feanor-inspector-x509"],
        pillars: [
            "DER es binario ASN.1; PEM es DER en Base64 con cabeceras.",
            "JWK representa claves en JSON para ecosistemas web.",
            "X.509 une identidad, clave publica, emisor, validez y extensiones."
        ],
        sections: [
            {
                title: "PEM, DER y JWK",
                body: "Muchas APIs no cambian la clave, solo su envoltorio. PEM es texto amigable; DER es binario; JWK es JSON con parametros de clave.",
                bullets: [
                    "PUBLIC KEY PEM suele contener SPKI.",
                    "PRIVATE KEY PEM suele contener PKCS#8.",
                    "DER Base64 es el cuerpo PEM sin BEGIN/END ni saltos."
                ],
                exampleTitle: "Lectura rapida",
                exampleLines: [
                    "-----BEGIN PUBLIC KEY-----",
                    "Base64 DER paginado",
                    "-----END PUBLIC KEY-----"
                ]
            },
            {
                title: "Certificados X.509",
                body: "Un certificado X.509 dice: esta clave publica pertenece a este sujeto durante este periodo, y lo afirma este emisor mediante una firma.",
                bullets: [
                    "Subject: entidad certificada.",
                    "Issuer: entidad que firma el certificado.",
                    "Validity: notBefore y notAfter.",
                    "SAN: nombres DNS/IP validos.",
                    "Fingerprint: huella para identificar el certificado exacto."
                ],
                exampleTitle: "Cadena basica",
                exampleLines: [
                    "Hoja: certificado del sitio.",
                    "Intermedio: CA que firma la hoja.",
                    "Raiz: confianza preinstalada o administrada."
                ]
            }
        ],
        checklist: [
            "No confundas formato con algoritmo.",
            "Revisa fechas y SAN, no solo el subject.",
            "La confianza viene de cadena, firma y politica, no de que el PEM parezca correcto."
        ]
    }
];

const feanorTheoryUseCases = {
    "fundamentos-codificacion": [
        {
            title: "Depurar texto que llega roto",
            badge: "debug",
            body: "Usalo cuando una API, formulario o fichero convierte eñes, tildes o simbolos en caracteres raros.",
            steps: [
                "Pega el texto en el Inspector de bytes y compara caracteres frente a bytes UTF-8.",
                "Convierte el mismo valor a Hex para ver si el problema esta en la codificacion original.",
                "Si va por URL, prueba URL encoding antes de enviarlo."
            ]
        },
        {
            title: "Transportar binario en JSON",
            badge: "api",
            body: "Sirve para entender por que una imagen, audio o firma binaria se convierte a Base64 antes de viajar dentro de JSON.",
            steps: [
                "Codifica el fichero en Base64 y revisa su data URI.",
                "Comprueba MIME, tamano original y longitud Base64.",
                "Decodifica de vuelta y descarga el binario para validar reversibilidad."
            ]
        },
        {
            title: "Leer tokens y segmentos JWT",
            badge: "jwt",
            body: "Base64URL aparece en JWT y en identificadores que deben ser seguros dentro de URLs.",
            steps: [
                "Convierte texto a Base64URL y observa la ausencia de +, / y padding.",
                "Compara Base64 normal frente a Base64URL.",
                "Usa el inspector de JWT cuando el material tenga tres segmentos."
            ]
        }
    ],
    "cesar-xor": [
        {
            title: "Resolver retos introductorios",
            badge: "ctf",
            body: "Cesar, Atbash, Vigenere y Rail Fence son frecuentes en retos de entrada porque enseñan patron, alfabeto y reversibilidad.",
            steps: [
                "Prueba Cesar con alfabeto ingles y espanol si aparece Ñ.",
                "Si el texto parece sustitucion sin clave, prueba Atbash.",
                "Si hay una palabra clave sugerida, prueba Vigenere."
            ]
        },
        {
            title: "Entender mascaras binarias",
            badge: "bits",
            body: "XOR, NOR, NAND y AND ayudan a ver como se activan, limpian o invierten bits en flags y protocolos.",
            steps: [
                "Representa dos bytes en binario.",
                "Aplica AND para conservar bits activos en una mascara.",
                "Aplica NOR para ver que informacion se pierde al negar OR."
            ]
        },
        {
            title: "Distinguir sustitucion y transposicion",
            badge: "clas",
            body: "Afin cambia letras por otras; Rail Fence mantiene letras y cambia posiciones. Esa diferencia guia el analisis.",
            steps: [
                "Cifra la misma frase con Afin y Rail Fence.",
                "Compara frecuencia de letras y longitud.",
                "Observa que Rail Fence conserva exactamente el conjunto de caracteres."
            ]
        }
    ],
    "operaciones-xor-modulo": [
        {
            title: "Recuperar un XOR con clave conocida",
            badge: "xor",
            body: "Cuando tienes C = P XOR K, la misma operacion con K recupera P.",
            steps: [
                "Introduce C como A y K como B.",
                "Usa el mismo formato en ambas entradas.",
                "Si K es corta, activa repetir B solo para experimentar y observa el riesgo."
            ]
        },
        {
            title: "Trabajar ejercicios de modulo",
            badge: "math",
            body: "Sirve para calcular restos grandes sin pelearte con limites de calculadora.",
            steps: [
                "Introduce A y N en el lab modular.",
                "Comprueba que el resultado siempre cae entre 0 y N - 1.",
                "Cambia A por A + N y observa que el resto se repite."
            ]
        },
        {
            title: "Ver potencia modular",
            badge: "rsa",
            body: "RSA y Diffie-Hellman usan exponenciacion modular como pieza matematica central.",
            steps: [
                "Cambia la operacion a A^E % N.",
                "Prueba exponentes pequeños y luego grandes.",
                "Observa que el resultado se mantiene dentro del rango del modulo."
            ]
        }
    ],
    "parsing-json-regex": [
        {
            title: "Extraer tokens de logs",
            badge: "logs",
            body: "Regex permite localizar cabeceras, IDs, correos o tokens dentro de texto operativo.",
            steps: [
                "Pega un log realista en el banco regex.",
                "Usa grupos para capturar solo la parte importante.",
                "Revisa offsets para saber donde aparece cada coincidencia."
            ]
        },
        {
            title: "Comparar respuestas API",
            badge: "json",
            body: "JSON canonico evita confundir cambios de orden con cambios de contenido.",
            steps: [
                "Pega dos respuestas JSON en A y B.",
                "Formatea para inspeccionar y luego compara.",
                "Usa el diff canonico para separar cambios reales de ruido."
            ]
        },
        {
            title: "Preparar material para firma",
            badge: "sign",
            body: "Antes de firmar JSON conviene estabilizar bytes, orden de claves y espacios.",
            steps: [
                "Canonicaliza el JSON.",
                "Firma la version canonica, no el texto original sin normalizar.",
                "Verifica tras cambiar una clave para ver como falla."
            ]
        }
    ],
    "esteganografia-metadatos": [
        {
            title: "Revisar una imagen antes de publicarla",
            badge: "priv",
            body: "El EXIF puede revelar GPS, camara, software o autoria aunque la imagen parezca inocente.",
            steps: [
                "Sube la imagen al analizador EXIF.",
                "Revisa GPS, autor, software y fechas.",
                "Si hay datos sensibles, limpia o exporta de nuevo antes de compartir."
            ]
        },
        {
            title: "Crear un MP3 con payload de laboratorio",
            badge: "id3",
            body: "El editor de metadatos permite guardar texto codificado en ID3 sin tocar el audio.",
            steps: [
                "Selecciona MP3 e introduce titulo, artista y payload.",
                "Codifica el payload como Base64 o Hex.",
                "Descarga el MP3 y vuelve a analizarlo para encontrar TXXX."
            ]
        },
        {
            title: "Investigar sospecha de datos ocultos",
            badge: "stego",
            body: "El analizador combina magic bytes, strings, entropia, metadatos y señales LSB para orientar la revision.",
            steps: [
                "Analiza el fichero por tipo real, no por extension.",
                "Busca bytes anexos despues de finales como IEND, EOI o %%EOF.",
                "Si es imagen PNG del lab, prueba el extractor LSB."
            ]
        },
        {
            title: "Practicar flujo Steghide/StegSeek",
            badge: "seek",
            body: "Sirve para entender capacidad, passphrase, compresion, checksum y crack por diccionario sin sacar el fichero del navegador.",
            steps: [
                "Sube un BMP, WAV o AU si quieres escritura directa, o una imagen para salida PNG por canvas.",
                "Incrusta un fichero pequeno con passphrase y CRC32 activo.",
                "Extrae con la passphrase correcta y prueba una wordlist para ver como valida la cabecera."
            ]
        }
    ],
    "secretos-entropia": [
        {
            title: "Generar claves de prueba",
            badge: "key",
            body: "Para laboratorios, tokens temporales o semillas de desarrollo necesitas material aleatorio y medible.",
            steps: [
                "Genera Base64URL si el secreto va en URL o env var.",
                "Genera Hex si necesitas bytes legibles por pares.",
                "Mide entropia y guarda solo lo necesario."
            ]
        },
        {
            title: "Evaluar una password humana",
            badge: "pass",
            body: "zxcvbn ayuda a detectar patrones humanos que una formula de longitud no ve.",
            steps: [
                "Pega la password en el analizador.",
                "Revisa puntuacion, crack time y feedback.",
                "Cambia palabras previsibles por secreto generado si el riesgo es alto."
            ]
        },
        {
            title: "Comparar formatos de secreto",
            badge: "fmt",
            body: "UUID, Hex y Base64URL tienen usos distintos aunque todos parezcan cadenas.",
            steps: [
                "Genera un UUID para correlacion, no para clave secreta larga.",
                "Usa Hex cuando la herramienta espera bytes en hexadecimal.",
                "Usa Base64URL para tokens compactos transportables."
            ]
        }
    ],
    "hash-hmac-timing": [
        {
            title: "Verificar una descarga",
            badge: "sha",
            body: "Una huella SHA-256 confirma que el fichero local coincide con la huella publicada.",
            steps: [
                "Calcula SHA-256 del material.",
                "Pega la huella esperada.",
                "Compara y rechaza el fichero si no coincide."
            ]
        },
        {
            title: "Firmar webhooks con secreto",
            badge: "hmac",
            body: "HMAC es el patron tipico para que un receptor compruebe que un webhook vino de quien conoce la clave.",
            steps: [
                "Canonicaliza el cuerpo o define exactamente los bytes a firmar.",
                "Calcula HMAC con clave compartida.",
                "Verifica con comparacion constante."
            ]
        },
        {
            title: "Detectar riesgo por timing",
            badge: "time",
            body: "Comparar secretos con igualdad directa puede filtrar cuantos bytes coinciden.",
            steps: [
                "Compara dos valores con varias iteraciones.",
                "Observa diferencias de tiempo entre fallo temprano y fallo tardio.",
                "Usa comparacion constante para tokens, firmas y HMAC."
            ]
        }
    ],
    "derivacion-claves": [
        {
            title: "Convertir password en clave AES",
            badge: "pbk",
            body: "PBKDF2 permite derivar bytes de clave desde una password humana con salt y coste.",
            steps: [
                "Introduce password y salt unico.",
                "Elige iteraciones altas y longitud 32 para AES-256.",
                "Guarda salt e iteraciones junto al ciphertext, no la clave."
            ]
        },
        {
            title: "Separar claves de una sesion",
            badge: "hkdf",
            body: "HKDF toma un secreto fuerte y produce claves distintas por contexto.",
            steps: [
                "Usa el secreto base como IKM.",
                "Define info distinta para cifrado y autenticacion.",
                "Comprueba que cambiar info cambia la salida."
            ]
        },
        {
            title: "Reproducir derivaciones",
            badge: "test",
            body: "En integraciones, ambos lados deben derivar exactamente los mismos bytes.",
            steps: [
                "Fija hash, salt, info, iteraciones y longitud.",
                "Comparte parametros no secretos.",
                "Compara la salida Hex esperada."
            ]
        }
    ],
    "cifrado-simetrico": [
        {
            title: "Probar cifrado local de un mensaje",
            badge: "aes",
            body: "Sirve para entender el flujo con clave compartida antes de pasar a un modo autenticado.",
            steps: [
                "Genera o pega una clave fuerte.",
                "Cifra un texto y pasa la salida a entrada.",
                "Descifra con la misma clave y prueba una clave incorrecta."
            ]
        },
        {
            title: "Comparar algoritmos historicos",
            badge: "legacy",
            body: "DES, RC4 o TripleDES ayudan a reconocer material heredado, no a diseñar sistemas nuevos.",
            steps: [
                "Cifra el mismo texto con varios algoritmos.",
                "Observa cambios de formato y longitud.",
                "Marca algoritmos heredados como compatibilidad, no recomendacion."
            ]
        },
        {
            title: "Decidir cuando usar AEAD",
            badge: "gcm",
            body: "Si ademas de ocultar necesitas detectar manipulacion, salta al modulo AES-GCM.",
            steps: [
                "Cifra un mensaje sin autenticacion y piensa como detectarias cambios.",
                "Repite en AEAD con AAD y tag.",
                "Comprueba que alterar un bit invalida el descifrado."
            ]
        }
    ],
    "aead-gcm": [
        {
            title: "Proteger payload y cabeceras",
            badge: "aad",
            body: "AAD permite autenticar datos visibles como version, tenant, ruta o tipo de mensaje.",
            steps: [
                "Introduce AAD con metadatos que no quieres cifrar.",
                "Cifra el payload con AES-GCM.",
                "Cambia el AAD y verifica que el descifrado falla."
            ]
        },
        {
            title: "Demostrar manipulacion",
            badge: "tag",
            body: "AES-GCM rechaza ciphertext, IV, AAD o tag alterados.",
            steps: [
                "Genera clave e IV.",
                "Cifra y despues usa la accion de alterar ciphertext.",
                "Comprueba que el tag ya no valida."
            ]
        },
        {
            title: "Diseñar un sobre cifrado",
            badge: "env",
            body: "El resultado de AEAD suele viajar como estructura con iv, aad, ciphertext y tag.",
            steps: [
                "Serializa todas las piezas necesarias.",
                "No reutilices IV con la misma clave.",
                "Incluye version de formato para migraciones futuras."
            ]
        }
    ],
    "tokens-otp-jwt": [
        {
            title: "Auditar un JWT recibido",
            badge: "jwt",
            body: "Un JWT legible no significa que sea fiable; hay que validar firma y claims.",
            steps: [
                "Decodifica header y payload.",
                "Revisa alg, kid, exp, nbf, iss y aud.",
                "Valida firma con JWKS/JWK o secreto segun corresponda."
            ]
        },
        {
            title: "Probar caducidad y audiencia",
            badge: "claims",
            body: "Los errores reales suelen estar en claims aceptados de mas, no solo en la firma.",
            steps: [
                "Cambia aud o iss en un token de prueba.",
                "Valida y observa el motivo de rechazo.",
                "Comprueba exp y nbf con fechas concretas."
            ]
        },
        {
            title: "Verificar codigos OTP",
            badge: "otp",
            body: "TOTP depende de reloj compartido; HOTP depende de contador compartido.",
            steps: [
                "Genera un secreto Base32.",
                "Calcula TOTP con paso de 30 segundos.",
                "Prueba ventana de tolerancia y desfase de reloj."
            ]
        }
    ],
    "asimetrica-hibrida": [
        {
            title: "Enviar un secreto a un destinatario",
            badge: "rsa",
            body: "RSA-OAEP permite cifrar para quien posee la clave privada correspondiente.",
            steps: [
                "Importa o genera clave publica del destinatario.",
                "Cifra material pequeño o una clave AES.",
                "Descifra solo con la privada correspondiente."
            ]
        },
        {
            title: "Cifrar un documento grande",
            badge: "hyb",
            body: "El patron correcto es hibrido: AES-GCM para datos y RSA-OAEP para envolver la clave AES.",
            steps: [
                "Genera clave AES aleatoria.",
                "Cifra el contenido con AEAD.",
                "Cifra la clave AES con RSA publica y empaqueta el sobre."
            ]
        },
        {
            title: "Comprobar limites RSA",
            badge: "limit",
            body: "RSA directo falla con mensajes grandes por limite matematico y padding.",
            steps: [
                "Prueba un mensaje corto y otro largo.",
                "Observa el error de tamaño.",
                "Usa el modo hibrido para cargas reales."
            ]
        }
    ],
    "firmas-ecdh": [
        {
            title: "Firmar un manifiesto",
            badge: "sig",
            body: "Una firma digital prueba que los bytes del manifiesto no cambiaron y corresponden a una clave privada.",
            steps: [
                "Genera o importa par de firma.",
                "Firma el mensaje exacto.",
                "Cambia un byte y verifica que la firma falla."
            ]
        },
        {
            title: "Acordar secreto de sesion",
            badge: "ecdh",
            body: "ECDH permite que dos partes lleguen al mismo secreto sin enviarlo por la red.",
            steps: [
                "Genera par cliente y par servidor.",
                "Intercambia claves publicas.",
                "Deriva el secreto y pasalo por HKDF antes de usarlo."
            ]
        },
        {
            title: "Evitar man-in-the-middle",
            badge: "auth",
            body: "ECDH sin autenticacion puede negociar con un atacante intermedio.",
            steps: [
                "Firma las claves publicas o validalas con certificado.",
                "Incluye identidad y contexto en la firma.",
                "Deriva claves de sesion separadas por direccion."
            ]
        }
    ],
    "formatos-pki": [
        {
            title: "Convertir claves entre APIs",
            badge: "fmt",
            body: "Algunas librerias piden PEM, otras DER o JWK. El algoritmo puede ser el mismo aunque cambie el envoltorio.",
            steps: [
                "Identifica si tienes publica, privada o certificado.",
                "Convierte PEM a JWK o DER segun API destino.",
                "Comprueba que el algoritmo y usos esperados siguen coincidiendo."
            ]
        },
        {
            title: "Inspeccionar un certificado TLS",
            badge: "x509",
            body: "Antes de confiar en un certificado revisa sujeto, emisor, SAN, fechas y huella.",
            steps: [
                "Pega la cadena PEM.",
                "Revisa notBefore/notAfter y SAN.",
                "Compara fingerprint si tienes una huella esperada."
            ]
        },
        {
            title: "Depurar errores de cadena",
            badge: "chain",
            body: "Muchos fallos TLS vienen de intermedios ausentes, nombres no cubiertos o fechas caducadas.",
            steps: [
                "Ordena hoja, intermedio y raiz si aplica.",
                "Comprueba issuer/subject entre certificados.",
                "Verifica que el hostname aparece en SAN."
            ]
        }
    ]
};

export const feanorTheoryTopics = baseFeanorTheoryTopics.map(topic => ({
    ...topic,
    useCases: feanorTheoryUseCases[topic.id] || []
}));
