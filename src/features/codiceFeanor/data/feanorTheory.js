const baseFeanorTheoryTopics = [
    {
        id: "fundamentos-codificacion",
        label: "Fundamentos de codificacion",
        badge: "BASE",
        routeName: "feanor-teoria-fundamentos-codificacion",
        summary: "Bits, bytes, texto, Unicode, UTF-8/UTF-16, ASCII, Latin-1, Windows-1252 y representaciones como Hex, Base64, Base64URL y URL encoding.",
        toolRouteNames: ["feanor-base64", "feanor-base64url", "feanor-url-encoding", "feanor-hex", "feanor-inspector-bytes"],
        pillars: [
            "Un byte son 8 bits; casi todo lo que ves como texto acaba siendo una secuencia de bytes.",
            "Codificar no es cifrar: Base64, Hex o URL encoding solo cambian la representacion.",
            "UTF-8, UTF-16, ASCII, Latin-1 y Windows-1252 deciden que bytes representan cada caracter; la misma letra puede ocupar bytes distintos segun el encoding."
        ],
        sections: [
            {
                title: "Texto frente a bytes",
                body: "Un navegador no procesa letras magicas: procesa bytes. La letra A en UTF-8, ASCII, Latin-1 y Windows-1252 es 0x41, pero en UTF-16LE se ve como 0x41 0x00. La Ñ ocupa dos bytes en UTF-8 (0xC3 0x91), un byte en Latin-1/Windows-1252 (0xD1) y una unidad de 16 bits en UTF-16. Por eso dos textos visualmente parecidos pueden producir huellas, HMAC o firmas distintas.",
                bullets: [
                    "La herramienta Inspector de bytes muestra la longitud real en bytes, no solo caracteres visuales, y compara UTF-8, UTF-16LE/BE, ASCII, Latin-1 y Windows-1252.",
                    "Hex representa cada byte con dos simbolos: 0x41 se ve como 41.",
                    "Base64 agrupa los bits de tres bytes y los reparte en cuatro caracteres transportables."
                ],
                exampleTitle: "Mini ejemplo",
                exampleLines: [
                    "Texto: A",
                    "UTF-8: 41",
                    "UTF-16LE: 41 00",
                    "Windows-1252: 41",
                    "Base64: QQ==",
                    "Si aparece Ñ, la cuenta cambia y el orden LE/BE importa en UTF-16."
                ]
            },
            {
                title: "Encoding en criptografia aplicada",
                body: "Hash, HMAC, PBKDF2, HKDF, firmas y AEAD no procesan caracteres: procesan bytes exactos. Si dos sistemas no acuerdan encoding, pueden firmar o derivar claves incompatibles aunque el texto visible sea identico.",
                bullets: [
                    "Para interoperar con APIs modernas, UTF-8 suele ser la opcion correcta.",
                    "Para revisar ficheros antiguos de Windows, Windows-1252 evita confundir comillas curvas, euro y caracteres del rango 0x80-0x9F.",
                    "ASCII estricto es util para detectar entradas que no deberian contener caracteres extendidos.",
                    "Latin-1 permite mapear byte a caracter sin expansion en muchos protocolos heredados."
                ],
                exampleTitle: "Caso profesional",
                exampleLines: [
                    "Mensaje visible: Ñ",
                    "UTF-8: c3 91",
                    "Latin-1/Windows-1252: d1",
                    "Misma pantalla, bytes distintos, hash distinto."
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
        toolRouteNames: ["feanor-cifrado-cesar", "feanor-atbash", "feanor-boolean-ops", "feanor-vigenere", "feanor-affine", "feanor-rail-fence", "feanor-inspector-bytes"],
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
        toolRouteNames: ["feanor-boolean-ops", "feanor-modular", "feanor-cifrado-cesar"],
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
        summary: "Ocultacion LSB, footer universal, bundles ZIP, metadatos EXIF/XMP/PNG/PDF/ZIP/ID3/RIFF, huellas de formato y limites del analisis en navegador.",
        toolRouteNames: ["feanor-estego-analizador", "feanor-exif", "feanor-metadata-editor", "feanor-estego-incrustar", "feanor-estego-extraer", "feanor-steghide-suite"],
        pillars: [
            "Esteganografia es ocultar la existencia de un mensaje; no equivale a cifrarlo.",
            "Los metadatos pueden revelar camara, software, fechas, rutas internas o autores.",
            "En puro frontend se puede inspeccionar mucho, pero no probar ausencia total de datos ocultos."
        ],
        sections: [
            {
                title: "LSB en imagenes y audio",
                body: "La tecnica LSB cambia el bit menos significativo de canales de color o de muestras. Visualmente o auditivamente suele ser imperceptible, pero esos bits pueden transportar un mensaje si el extractor conoce el formato usado.",
                bullets: [
                    "Un pixel RGB aporta 3 bits utiles si se usa un bit por canal.",
                    "BMP, WAV y AU permiten pruebas directas porque tienen datos sin perdida faciles de indexar.",
                    "Guardar como PNG conserva los bits; JPEG puede destruirlos por compresion.",
                    "Si el mensaje es sensible, cifralo antes de incrustarlo."
                ],
                exampleTitle: "Flujo local",
                exampleLines: [
                    "payload UTF-8/UTF-16/fichero -> cabecera FEANOR V2 -> bits",
                    "bits -> LSB de R, G y B o muestras WAV/BMP/AU",
                    "resultado -> PNG o fichero directo descargable"
                ]
            },
            {
                title: "Footer universal y bundle ZIP",
                body: "No todos los formatos se pueden reescribir con seguridad desde frontend. Para practicar con cualquier binario, el laboratorio ofrece dos rutas: anadir un paquete Feanor al final del fichero o crear un ZIP con cover, payload y manifiesto.",
                bullets: [
                    "El footer universal conserva el portador original y anade bytes despues del final logico; algunos programas los toleran y otros los eliminan al reexportar.",
                    "El bundle ZIP es mas explicito: no pretende ser invisible, pero permite transportar cualquier tipo de payload sin corromper el original.",
                    "El paquete Feanor V2 guarda tipo de payload, nombre, MIME, tamano y CRC32 para que el extractor sepa reconstruirlo.",
                    "PNG iTXt usa metadatos textuales: es util para entender chunks, pero no debe confundirse con ocultacion fuerte."
                ],
                exampleTitle: "Casos de uso",
                exampleLines: [
                    "Texto JSON en PNG: usa iTXt o LSB.",
                    "Fichero .zip dentro de audio WAV: usa LSB directo si cabe.",
                    "Payload grande en PDF o MP4: usa footer universal o bundle ZIP."
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
                    "PDF puede exponer claves como Title, Author, Producer o JavaScript embebido.",
                    "Ejecutables, capturas PCAP, SQLite, DICOM, emails y archives comprimidos requieren lectura de firma real antes de asumir nada por extension."
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
        summary: "Funciones hash, integridad autenticada, rainbow tables, comparaciones constantes y ataques por tiempo.",
        toolRouteNames: ["feanor-hash", "feanor-hash-lookup", "feanor-hashcat-john-workbench", "feanor-password-cracker", "feanor-rainbow-tables", "feanor-hmac", "feanor-comparador-constante"],
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
                title: "Funciones *sum y checksums",
                body: "Herramientas de terminal como md5sum, sha1sum, sha256sum y sha512sum imprimen una huella hexadecimal seguida del nombre del fichero. Los comandos sum -r, sum -s, CRC-32, Adler-32 o Fletcher-16 son checksums: sirven para detectar errores accidentales y compatibilidad, no para seguridad.",
                bullets: [
                    "sha256sum es una forma practica de verificar descargas y artefactos publicados.",
                    "md5sum y sha1sum se conservan para sistemas heredados, pero no deben usarse como garantia fuerte.",
                    "SUM/CRC/Fletcher/Adler son rapidos y utiles en contenedores o protocolos, pero un atacante puede recalcularlos."
                ],
                exampleTitle: "Salida CLI",
                exampleLines: [
                    "sha256sum paquete.zip",
                    "a5b1...  paquete.zip",
                    "sum -r legacy.bin -> checksum y bloques de 1024 bytes"
                ]
            },
            {
                title: "Lookup, identificacion y founds",
                body: "Servicios como CrackStation o Hashes.com no descifran hashes: consultan bases de datos de hashes ya resueltos o verifican que un plaintext produce una huella concreta. En frontend no se replica una tabla de miles de millones de entradas, pero si se puede identificar formato, verificar founds y probar una wordlist local.",
                bullets: [
                    "Un hash no salado puede aparecer en tablas precalculadas; un hash con salt unico reduce ese riesgo.",
                    "La identificacion por longitud es probabilistica: MD5, NTLM y MD4 comparten 32 caracteres hexadecimales.",
                    "El formato hash[:salt]:plain permite demostrar localmente que un found es correcto sin exponerlo en una base publica.",
                    "Un fallo de wordlist no prueba seguridad; solo indica que esa lista concreta no contenia el plaintext."
                ],
                exampleTitle: "Flujo local",
                exampleLines: [
                    "hash -> identificar candidatos por patron y longitud",
                    "hash:plain -> calcular hash(plain) y comparar",
                    "hash:salt:plain -> probar hash(plain+salt), hash(salt+plain) o algoritmo seleccionado",
                    "hash + wordlist local -> buscar coincidencias sin red"
                ]
            },
            {
                title: "Cracking por diccionario",
                body: "Un password hash cracker no invierte matematicamente MD5 o SHA1. Toma candidatos, aplica el mismo algoritmo y compara el resultado con el hash objetivo. Si coinciden, ha encontrado un plaintext plausible. Este enfoque funciona especialmente bien contra passwords debiles en hashes rapidos y sin salt.",
                bullets: [
                    "MD5 y SHA1 son muy rapidos: millones o miles de millones de intentos por segundo en hardware dedicado.",
                    "Salt obliga a recalcular por usuario y rompe tablas rainbow genericas.",
                    "Reglas de mangling prueban variantes humanas: mayusculas, sufijos, anos, signos y leet speak.",
                    "Argon2id, scrypt, yescrypt y bcrypt reducen el impacto porque hacen caro cada intento offline."
                ],
                exampleTitle: "Comandos habituales",
                exampleLines: [
                    "hashcat --identify hashes.txt",
                    "hashcat -m 0 hashes.txt wordlist.txt        # MD5",
                    "hashcat -m 100 hashes.txt wordlist.txt      # SHA1",
                    "hashcat -m 1400 hashes.txt wordlist.txt     # SHA256",
                    "john --format=raw-md5 hashes.txt --wordlist=wordlist.txt"
                ]
            },
            {
                title: "Rainbow tables",
                body: "Una rainbow table cambia tiempo de ataque por memoria. En vez de guardar cada hash y cada plaintext, guarda cadenas: start -> hash -> reduccion -> hash -> reduccion -> endpoint. Para buscar un hash, se simulan reducciones desde distintas posiciones, se compara el endpoint y, si coincide, se regenera la cadena original para encontrar el plaintext exacto.",
                bullets: [
                    "La funcion de reduccion no descifra el hash: transforma un digest en otro candidato dentro de un dominio definido por alfabeto y longitud.",
                    "Se guardan inicios y endpoints para ahorrar espacio, aceptando colisiones y cobertura parcial.",
                    "Funcionan mejor contra hashes rapidos y sin salt como MD5/SHA1 heredados.",
                    "Un salt unico por usuario obliga a generar tablas especificas por salt; Argon2id, scrypt, yescrypt y bcrypt hacen el coste mucho menos practico."
                ],
                exampleTitle: "Flujo operativo",
                exampleLines: [
                    "1. Definir dominio: algoritmo, charset, longitud minima/maxima.",
                    "2. Generar cadenas con rtgen o con el lab local.",
                    "3. Ordenar/endpoints para busqueda rapida.",
                    "4. Buscar el hash y regenerar la cadena candidata.",
                    "5. Si hay FOUND, migrar el secreto a KDF con salt unico."
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
            "No guardes passwords con MD5/SHA1/SHA2 simples; migra a Argon2id, scrypt, yescrypt o bcrypt.",
            "Compara tokens y firmas con rutina constante."
        ]
    },
    {
        id: "red-team-hashcracking",
        label: "Red Team hash cracking",
        badge: "RT",
        routeName: "feanor-teoria-red-team-hashcracking",
        summary: "Como usar Hashcat, John the Ripper, mascaras, reglas, wordlists, potfiles, founds y formatos de hash de forma autorizada y reproducible.",
        toolRouteNames: ["feanor-hashcat-john-workbench", "feanor-password-cracker", "feanor-rainbow-tables", "feanor-hash-lookup", "feanor-hash", "feanor-yescrypt", "feanor-argon2", "feanor-scrypt", "feanor-bcrypt"],
        pillars: [
            "Hashcat destaca en ataques GPU, mascaras, reglas y modos muy amplios; John destaca en formatos, single crack, reglas y crypt/shadow.",
            "Un cracking profesional empieza por identificar formato y alcance, no por lanzar fuerza bruta a ciegas.",
            "Los founds deben verificarse, documentarse y traducirse en mitigacion: rotacion, bloqueo de reutilizacion y migracion a KDF moderno.",
            "El navegador de Feanor previsualiza y entrena; el volumen real pertenece a herramientas offline controladas."
        ],
        sections: [
            {
                title: "Flujo profesional minimo",
                body: "Antes de atacar un hash hay que saber de donde viene, que formato tiene, si incluye salt, si hay usuario asociado y que politica de alcance autoriza la prueba. El mismo valor de 32 caracteres hex puede ser MD5, NTLM, MD4 o LM; elegir mal el modo desperdicia tiempo y puede producir conclusiones falsas.",
                bullets: [
                    "Normaliza entradas: un hash por linea, conserva usuario si existe y separa muestras de produccion.",
                    "Identifica con patron, prefijo y contexto: $2b$ suele ser bcrypt, $argon2id$ Argon2, $y$ yescrypt, * + 40 hex MySQL5.",
                    "Fija limites: wordlists permitidas, tiempo maximo, hardware, output, potfile y custodia de founds.",
                    "Repite la verificacion: todo FOUND se recalcula localmente antes de reportarlo."
                ],
                exampleTitle: "Checklist operativo",
                exampleLines: [
                    "1. hashcat --identify hashes.txt",
                    "2. john --list=formats | grep -i '<formato>'",
                    "3. seleccionar modo: -m 0 MD5, -m 100 SHA1, -m 1000 NTLM, -m 3200 bcrypt...",
                    "4. ejecutar wordlist/reglas/mascara dentro del alcance",
                    "5. john --show o hashcat --show para exportar founds verificados"
                ]
            },
            {
                title: "Ataques de Hashcat",
                body: "Hashcat organiza ataques con -a. Straight (-a 0) usa diccionario, combinator (-a 1) une dos listas, brute-force/mask (-a 3) usa patrones, hybrid (-a 6 y -a 7) combina wordlist y mascara, y association (-a 9) aprovecha relaciones por hash/contexto. La clave no es probarlo todo, sino modelar como crean passwords los usuarios del entorno auditado.",
                bullets: [
                    "Straight: primero contra listas de passwords filtradas o corporativas autorizadas.",
                    "Rules: transforma entradas con best64, OneRuleToRuleThemStill, dive o reglas propias.",
                    "Mask: expresa politicas como ?u?l?l?l?l?d?d o ?1?1?1?1?d?d con charsets personalizados.",
                    "Hybrid: prueba palabra+ano, palabra+simbolo, prefijo+palabra o patrones por campana.",
                    "No confundas keyspace con intentos utiles: una mascara enorme sin hipotesis consume tiempo sin aportar evidencia."
                ],
                exampleTitle: "Comandos Hashcat",
                exampleLines: [
                    "hashcat -m 0 -a 0 hashes.txt wordlist.txt -r rules/best64.rule",
                    "hashcat -m 1000 -a 3 ntlm.txt '?u?l?l?l?l?d?d' --increment",
                    "hashcat -m 1400 -a 6 sha256.txt wordlist.txt '?d?d?d?d'",
                    "hashcat -m 3200 bcrypt.txt wordlist.txt -O -w 3",
                    "hashcat --show -m 0 hashes.txt"
                ]
            },
            {
                title: "Modos de John",
                body: "John the Ripper tiene modos con una filosofia algo distinta. Wordlist usa diccionarios y reglas; single crack aprovecha usuario, nombre real, host y campos GECOS; incremental genera candidatos por estadistica; external permite programar logica. Para hashes crypt de Linux, John suele ser especialmente comodo porque detecta variantes como yescrypt via --format=crypt.",
                bullets: [
                    "single crack es excelente cuando hay usernames o metadatos asociados.",
                    "wordlist + rules permite reglas potentes sin depender de GPU.",
                    "incremental conviene para busquedas prolongadas y controladas.",
                    "john.pot centraliza founds; separa potfiles por auditoria para no contaminar evidencias."
                ],
                exampleTitle: "Comandos John",
                exampleLines: [
                    "john --format=raw-md5 --wordlist=wordlist.txt hashes.txt",
                    "john --format=nt --wordlist=wordlist.txt --rules hashes.txt",
                    "john --format=crypt --wordlist=wordlist.txt shadow-yescrypt.txt",
                    "john --single hashes-con-usuarios.txt",
                    "john --show hashes.txt"
                ]
            },
            {
                title: "Reglas, mascaras y charsets",
                body: "Una regla modifica una palabra; una mascara genera palabras desde cero. En una auditoria real se combinan: diccionario corporativo, reglas humanas, mascara para sufijos y variantes contextualizadas. Feanor implementa una version local limitada para ensenar el mecanismo sin bloquear el navegador.",
                bullets: [
                    "?l minusculas, ?u mayusculas, ?d digitos, ?s simbolos, ?a todo imprimible.",
                    "?1 a ?4 son charsets personalizados; por ejemplo -1 ?l?d permite ?1?1?1?1.",
                    "Reglas comunes: lower, upper, capitalize, append digits, append year, reverse, duplicate y leet.",
                    "Mide keyspace antes de ejecutar: 62^10 no es una prueba razonable para navegador ni para una ventana corta."
                ],
                exampleTitle: "Mascaras utiles",
                exampleLines: [
                    "?l?l?l?l?d?d        # cuatro minusculas + dos digitos",
                    "?u?l?l?l?l?d?d      # Capitalizada + dos digitos",
                    "-1 ?l?d ?1?1?1?1?1  # cinco caracteres minuscula/digito",
                    "wordlist + ?d?d?d?d # palabra seguida de ano o PIN corto"
                ]
            },
            {
                title: "Founds y mitigacion",
                body: "El objetivo defensivo no es coleccionar plaintexts, sino demostrar riesgo y cerrarlo. Un found indica que una credencial o patron era recuperable bajo el alcance probado. Despues hay que rotar, invalidar sesiones, revisar reutilizacion y endurecer almacenamiento.",
                bullets: [
                    "Guarda founds con minima exposicion y acceso restringido.",
                    "Reporta algoritmo, modo, wordlist/regla, tiempo, hardware y muestra de evidencia.",
                    "Migra MD5/SHA1/SHA2 simples a Argon2id, scrypt, yescrypt o bcrypt con salt unico.",
                    "Si el hash ya era KDF moderno, ajusta coste y politica de passwords en vez de volver a hashes rapidos."
                ],
                exampleTitle: "Formato de evidencia",
                exampleLines: [
                    "hash:plain verificado localmente",
                    "modo: hashcat -m 1000 -a 0 -r best64.rule",
                    "impacto: password comun recuperada",
                    "mitigacion: reset, MFA, KDF moderno, bloqueo de reutilizacion"
                ]
            }
        ],
        checklist: [
            "No ejecutes cracking sin autorizacion explicita.",
            "Identifica formato antes de elegir modo.",
            "Empieza por wordlists/reglas con hipotesis, luego mascaras acotadas.",
            "Separa potfiles por auditoria y verifica founds.",
            "Traduce resultados a mitigacion concreta."
        ]
    },
    {
        id: "derivacion-claves",
        label: "Derivacion de claves",
        badge: "KDF",
        routeName: "feanor-teoria-derivacion-claves",
        summary: "PBKDF2, HKDF, Argon2, scrypt, yescrypt, bcrypt, salts, coste, memoria e info de contexto.",
        toolRouteNames: ["feanor-pbkdf2", "feanor-hkdf", "feanor-argon2", "feanor-scrypt", "feanor-yescrypt", "feanor-bcrypt"],
        pillars: [
            "PBKDF2 endurece passwords con salt e iteraciones.",
            "HKDF extrae y expande material de alta entropia para usos concretos.",
            "Argon2, scrypt y yescrypt elevan coste de memoria para castigar ataques GPU/ASIC.",
            "bcrypt sigue siendo muy usado, pero limita la entrada efectiva a 72 bytes.",
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
            },
            {
                title: "Argon2, scrypt, yescrypt y bcrypt",
                body: "Argon2id, scrypt, yescrypt y bcrypt son funciones pensadas para passwords: guardan parametros junto al hash y hacen caro cada intento de diccionario. Argon2id suele ser la opcion moderna general; scrypt es util cuando quieres coste de memoria portable; yescrypt evoluciona sobre scrypt y aparece como formato $y$ en sistemas Linux modernos; bcrypt sigue presente por compatibilidad y despliegue historico.",
                bullets: [
                    "Argon2 controla memoria, iteraciones y paralelismo; Argon2id mezcla defensa contra side-channel y GPU.",
                    "scrypt usa N, r y p; N debe ser potencia de 2 y domina memoria/CPU.",
                    "yescrypt tambien usa N/r/p y parametros propios como t; se reconoce habitualmente por prefijos $y$ o $gy$ en crypt(5).",
                    "bcrypt usa coste logaritmico y formato $2b$, pero no deriva una clave binaria arbitraria."
                ],
                exampleTitle: "Lectura rapida",
                exampleLines: [
                    "Argon2id(password, salt, mem=19456 KiB, t=2, p=1) -> $argon2id$...",
                    "scrypt(password, salt, N=16384, r=8, p=1) -> clave / PHC",
                    "yescrypt(password, salt, N=4096, r=32, p=1, t=0) -> $y$...",
                    "bcrypt(password, cost=10) -> $2b$10$..."
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
            "DES, RC4, RC4Drop y RabbitLegacy quedan como aprendizaje o compatibilidad, no como recomendacion."
        ],
        sections: [
            {
                title: "Clave compartida",
                body: "En cifrado simetrico, emisor y receptor conocen la misma clave. Si esa clave se filtra, cualquiera puede descifrar o producir mensajes cifrados equivalentes.",
                bullets: [
                    "AES es el estandar moderno mas comun.",
                    "TripleDES, DES, RC4, RC4Drop, Rabbit y RabbitLegacy aparecen por historia, compatibilidad o analisis.",
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
                title: "Modos y padding",
                body: "Los cifrados de bloque como AES, DES y TripleDES necesitan un modo de operacion y normalmente padding. CBC, CFB, CTR, OFB y ECB cambian como se encadenan los bloques; Pkcs7, AnsiX923, Iso10126, Iso97971, ZeroPadding o NoPadding definen como cerrar el ultimo bloque.",
                bullets: [
                    "CBC necesita IV y padding; es comun en material antiguo.",
                    "CTR/OFB/CFB convierten el bloque en flujo y son utiles para comparar propiedades.",
                    "ECB se mantiene solo para reconocer patrones legacy; no oculta bloques repetidos.",
                    "NoPadding exige entradas con longitud multiplo del bloque."
                ],
                exampleTitle: "Lectura rapida",
                exampleLines: [
                    "AES-CBC-Pkcs7: formato clasico con padding.",
                    "AES-CTR: flujo derivado de contador.",
                    "AES-ECB: laboratorio de lo que no debes elegir para datos reales."
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

const feanorTheoryCliSections = {
    "fundamentos-codificacion": [
        {
            title: "Bash/CLI para bytes y encoding",
            body: "Estos comandos reproducen fuera del navegador lo que hacen los labs de Base64, Base64URL, Hex, URL encoding e inspector de bytes. Sirven para verificar interoperabilidad entre frontend, APIs, ficheros y pipelines Linux.",
            bullets: [
                "Usa codificacion para representar bytes en otro formato; no aporta confidencialidad.",
                "Usa `base64 -w0` en GNU/Linux para evitar saltos de linea; en macOS puedes hacer `base64 | tr -d '\\n'`.",
                "Usa `xxd` u `od` para mirar bytes reales cuando el texto visible no explica el fallo.",
                "Comprueba MIME con `file --mime-type`; la extension no es una prueba tecnica suficiente."
            ],
            exampleTitle: "Comandos Bash",
            exampleLines: [
                "printf 'Hola Feanor' | base64 -w0",
                "printf 'Hola Feanor' | xxd -p -c 256",
                "printf '\\u00d1' | iconv -f UTF-8 -t UTF-16LE | xxd -p",
                "basenc --base64url payload.bin > payload.b64url",
                "base64 -d payload.b64 > payload.bin",
                "python3 - <<'PY'",
                "from urllib.parse import quote, unquote",
                "print(quote('mensaje con espacios / ? &', safe=''))",
                "print(unquote('mensaje%20con%20espacios'))",
                "PY",
                "file --mime-type payload.bin"
            ]
        }
    ],
    "cesar-xor": [
        {
            title: "Bash/CLI para cifrados clasicos",
            body: "Cesar, Vigenere, Afin, Rail Fence y XOR son utiles para practicar alfabetos, sustitucion, transposicion y reversibilidad. En terminal conviene escribir scripts pequenos y visibles, porque el objetivo es auditar la logica, no esconderla.",
            bullets: [
                "Cesar y Afin operan sobre posiciones de un alfabeto y aplican modulo.",
                "XOR opera sobre bits o bytes; la misma mascara revierte el resultado.",
                "NOR, NAND, AND y OR son puertas logicas: algunas no son reversibles y por eso no sirven por si solas como cifrado recuperable."
            ],
            exampleTitle: "Comandos Bash",
            exampleLines: [
                "python3 - <<'PY'",
                "alphabet = 'ABCDEFGHIJKLMN\\u00d1OPQRSTUVWXYZ'",
                "text = 'FEANOR'",
                "shift = 3",
                "print(''.join(alphabet[(alphabet.index(c) + shift) % len(alphabet)] if c in alphabet else c for c in text))",
                "PY",
                "printf 'secret' | xxd -p",
                "python3 - <<'PY'",
                "msg = bytes.fromhex('736563726574')",
                "key = b'K'",
                "print(bytes(b ^ key[i % len(key)] for i, b in enumerate(msg)).hex())",
                "PY"
            ]
        }
    ],
    "operaciones-xor-modulo": [
        {
            title: "Bash/CLI para XOR y modulo",
            body: "La terminal es perfecta para comprobar operaciones matematicas exactas. Python maneja enteros grandes sin cambiar de tipo manualmente, y OpenSSL aporta utilidades como `prime` para explorar material numerico.",
            bullets: [
                "XOR se calcula bit a bit y se representa normalmente en binario o hexadecimal.",
                "Modulo devuelve el resto y mantiene el resultado dentro de 0..N-1 si N es positivo.",
                "La potencia modular `pow(base, exp, mod)` evita crear enteros gigantes intermedios."
            ],
            exampleTitle: "Comandos Bash",
            exampleLines: [
                "python3 - <<'PY'",
                "print(format(0b1001 ^ 0b1010, '04b'))",
                "print(118613842 % 9091)",
                "print(pow(7, 560, 561))",
                "print((23 + 7) % 7)",
                "PY",
                "openssl prime 1000003"
            ]
        }
    ],
    "parsing-json-regex": [
        {
            title: "Bash/CLI para JSON, logs y regex",
            body: "Estos comandos conectan el banco regex y el diff JSON con trabajo real de logs, APIs y revisiones de payloads firmados. La idea profesional es validar, normalizar y luego comparar.",
            bullets: [
                "`jq` valida y transforma JSON con tipos reales, no con sustituciones de texto.",
                "`python3 -m json.tool` es una forma rapida de detectar JSON mal formado.",
                "`grep -E` ayuda en logs, pero para JSON estructurado debes preferir `jq`."
            ],
            exampleTitle: "Comandos Bash",
            exampleLines: [
                "python3 -m json.tool response.json > response.pretty.json",
                "jq -S -c . response.json > response.canonical.json",
                "diff -u <(jq -S . old.json) <(jq -S . new.json)",
                "grep -Eo 'Bearer[[:space:]]+[A-Za-z0-9._-]+' app.log",
                "jq -r '.items[] | select(.active == true) | .id' response.json"
            ]
        }
    ],
    "esteganografia-metadatos": [
        {
            title: "Bash/CLI forense para ficheros",
            body: "El laboratorio frontend orienta el analisis sin subir archivos a terceros. Para una investigacion profesional, replica hallazgos con herramientas nativas como ExifTool, binwalk, strings, xxd, steghide, stegseek o zsteg.",
            bullets: [
                "ExifTool lee y escribe metadatos en muchas familias de imagen, audio, video y documentos.",
                "Steghide soporta JPEG, BMP, WAV y AU como portadores; el payload puede ser cualquier formato.",
                "StegSeek automatiza cracking por diccionario y el modo seed para detectar contenido Steghide.",
                "Busca magic bytes, finales logicos, bytes anexos, strings, entropia y contenedores internos antes de concluir."
            ],
            exampleTitle: "Comandos Bash",
            exampleLines: [
                "exiftool -a -G1 -s sospechoso.jpg",
                "exiftool -json audio.mp3 > metadata.json",
                "binwalk sospechoso.bin",
                "strings -a -n 8 sospechoso.bin | head",
                "xxd -g1 -l 128 sospechoso.bin",
                "pngcheck -v imagen.png",
                "steghide info cover.jpg",
                "steghide extract -sf stego.jpg -p 'passphrase'",
                "stegseek --seed stego.jpg",
                "stegseek stego.jpg wordlist.txt",
                "zsteg imagen.png"
            ]
        }
    ],
    "secretos-entropia": [
        {
            title: "Bash/CLI para secretos",
            body: "Generar secretos profesionales significa usar un generador criptografico, escoger longitud suficiente y adaptar la representacion al canal: hex para claves legibles, Base64/Base64URL para APIs y binario para ficheros.",
            bullets: [
                "`openssl rand` usa el generador criptografico de OpenSSL.",
                "El modulo `secrets` de Python esta pensado para tokens y claves de seguridad.",
                "Un UUID v4 es util como identificador, pero no siempre reemplaza una clave secreta de 256 bits."
            ],
            exampleTitle: "Comandos Bash",
            exampleLines: [
                "openssl rand -hex 32",
                "openssl rand -base64 32",
                "python3 - <<'PY'",
                "import secrets",
                "print(secrets.token_urlsafe(32))",
                "print(secrets.token_hex(32))",
                "PY",
                "uuidgen"
            ]
        }
    ],
    "hash-hmac-timing": [
        {
            title: "Bash/CLI para hashes, HMAC y *sum",
            body: "Una huella hash se recalcula y se compara; no se descifra. Los comandos `*sum` imprimen el digest y el nombre de fichero, mientras que `cksum` y `sum` cubren checksums historicos o de transporte.",
            bullets: [
                "Usa SHA-256 o SHA-512 para verificacion moderna de artefactos.",
                "Usa MD5/SHA-1 solo para compatibilidad heredada, no como garantia fuerte.",
                "Usa HMAC cuando la integridad dependa de una clave compartida.",
                "Usa comparacion constante para secretos, tokens o MACs; no compares byte a byte con salida temprana."
            ],
            exampleTitle: "Comandos Bash",
            exampleLines: [
                "sha256sum archivo.iso",
                "sha512sum archivo.iso",
                "sha256sum -c SHA256SUMS",
                "md5sum legacy.bin",
                "openssl dgst -sha256 archivo.iso",
                "openssl dgst -sha256 -hmac 'clave-compartida' mensaje.txt",
                "printf '%s' 'mensaje' | sha512sum",
                "cksum -a sha3 -l 256 archivo.bin",
                "sum -r legacy.bin",
                "sum -s legacy.bin",
                "hashcat --identify hashes.txt",
                "hashcat -m 0 hashes.txt wordlist.txt",
                "john --wordlist=wordlist.txt hashes.txt",
                "john --show hashes.txt",
                "rtgen md5 loweralpha-numeric 1 7 0 2400 1000000 0",
                "rtsort md5_loweralpha-numeric#1-7_0_2400x1000000_0.rt",
                "rcrack . -h 5f4dcc3b5aa765d61d8327deb882cf99"
            ]
        }
    ],
    "red-team-hashcracking": [
        {
            title: "Bash/CLI para Hashcat y John",
            body: "Estos comandos cubren identificacion, ataques por diccionario, reglas, mascaras, potfiles y founds. Ajusta siempre modo, wordlist, reglas y alcance a la autorizacion de la auditoria.",
            bullets: [
                "Hashcat usa -m para tipo de hash y -a para modo de ataque.",
                "John usa --format para formato y modos como --single, --wordlist, --rules o --incremental.",
                "El potfile guarda founds; separalo por proyecto para mantener evidencias limpias."
            ],
            exampleTitle: "Comandos Bash",
            exampleLines: [
                "hashcat --identify hashes.txt",
                "hashcat -m 0 -a 0 md5.txt wordlist.txt -r rules/best64.rule --outfile found.txt",
                "hashcat -m 1000 -a 3 ntlm.txt '?u?l?l?l?l?d?d' --increment -O -w 3",
                "hashcat -m 3200 bcrypt.txt wordlist.txt -O -w 3",
                "hashcat --show -m 0 md5.txt",
                "john --format=raw-md5 --wordlist=wordlist.txt hashes.txt",
                "john --format=nt --wordlist=wordlist.txt --rules hashes.txt",
                "john --format=crypt --wordlist=wordlist.txt shadow-yescrypt.txt",
                "john --single hashes-con-usuarios.txt",
                "john --show hashes.txt"
            ]
        }
    ],
    "derivacion-claves": [
        {
            title: "Bash/CLI para KDF y password hashing",
            body: "PBKDF2 convierte passwords humanas en claves mas caras de atacar; HKDF separa claves desde material fuerte; Argon2, scrypt, yescrypt y bcrypt son formatos habituales para almacenar/verificar passwords.",
            bullets: [
                "PBKDF2 necesita salt unico e iteraciones suficientes para elevar coste offline.",
                "HKDF no endurece passwords debiles; extrae y expande secretos ya fuertes.",
                "Argon2id, scrypt y yescrypt deben documentar memoria/coste ademas del salt.",
                "bcrypt guarda coste y salt en el propio hash, pero trunca entradas largas.",
                "No reutilices la misma clave derivada para cifrar, firmar y autenticar a la vez."
            ],
            exampleTitle: "Comandos Bash",
            exampleLines: [
                "openssl kdf -keylen 32 -kdfopt digest:SHA2-256 -kdfopt pass:correct-horse -kdfopt salt:0011223344556677 -kdfopt iter:200000 PBKDF2",
                "openssl kdf -keylen 32 -kdfopt digest:SHA2-256 -kdfopt key:input-secret -kdfopt salt:salt-v1 -kdfopt info:feanor/aes HKDF",
                "python3 - <<'PY'",
                "import hashlib",
                "print(hashlib.pbkdf2_hmac('sha256', b'password', b'salt-v1', 200000, 32).hex())",
                "PY",
                "argon2id -id -t 2 -m 15 -p 1 -l 32 -S $(openssl rand -hex 16) -e",
                "openssl kdf -keylen 32 -kdfopt pass:correct-horse -kdfopt salt:0011223344556677 -kdfopt N:16384 -kdfopt r:8 -kdfopt p:1 SCRYPT",
                "mkpasswd -m yescrypt 'correct-horse'        # si libxcrypt/mkpasswd lo soporta",
                "john --format=crypt --wordlist=wordlist.txt shadow-yescrypt.txt",
                "hashcat -m 8900 yescrypt-kdf.hash wordlist.txt # formato KDF generico, no shadow $y$ sin convertir",
                "htpasswd -bnBC 10 '' 'correct-horse' | tr -d ':\n'",
                "python3 - <<'PY'",
                "import bcrypt",
                "print(bcrypt.hashpw(b'correct-horse', bcrypt.gensalt(rounds=10)).decode())",
                "PY"
            ]
        }
    ],
    "cifrado-simetrico": [
        {
            title: "Bash/CLI para cifrado simetrico",
            body: "OpenSSL `enc` es util para practicar cifrado simetrico clasico, pero no es un formato completo de mensajeria segura. Para datos reales, prefiere esquemas autenticados y guarda version, KDF, salt, IV/nonce, algoritmo y tag.",
            bullets: [
                "CBC requiere IV impredecible y padding; CTR/OFB/CFB convierten el bloque en flujo.",
                "ECB solo debe usarse como ejemplo de riesgo porque revela bloques repetidos.",
                "DES, RC4 y variantes antiguas son material legacy: analizalos, pero no los elijas para proteger datos nuevos."
            ],
            exampleTitle: "Comandos Bash",
            exampleLines: [
                "openssl enc -aes-256-cbc -salt -pbkdf2 -iter 200000 -in claro.txt -out claro.txt.enc",
                "openssl enc -d -aes-256-cbc -pbkdf2 -iter 200000 -in claro.txt.enc -out claro.txt",
                "openssl enc -aes-256-ctr -K 00112233445566778899aabbccddeeff00112233445566778899aabbccddeeff -iv 01020304050607080900010203040506 -in claro.txt -out claro.ctr",
                "openssl enc -list | grep -E 'aes|des|rc4'"
            ]
        }
    ],
    "aead-gcm": [
        {
            title: "Bash/CLI para AEAD",
            body: "AEAD significa cifrado autenticado con datos asociados. AES-GCM devuelve ciphertext y tag; si cambian ciphertext, AAD, IV o tag, el descifrado debe fallar. OpenSSL `enc` no es el ejemplo adecuado para GCM/CCM de fichero; para practicar desde shell puedes usar Node WebCrypto.",
            bullets: [
                "El IV de GCM suele ser de 12 bytes y debe ser unico por clave.",
                "AAD se conserva visible, pero queda autenticado.",
                "El tag no es opcional: es la prueba de integridad/autenticidad."
            ],
            exampleTitle: "Comandos Bash",
            exampleLines: [
                "node <<'JS'",
                "const { webcrypto } = require('crypto');",
                "const enc = new TextEncoder();",
                "const key = await webcrypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, true, ['encrypt', 'decrypt']);",
                "const iv = webcrypto.getRandomValues(new Uint8Array(12));",
                "const aad = enc.encode('header=v1');",
                "const ct = await webcrypto.subtle.encrypt({ name: 'AES-GCM', iv, additionalData: aad, tagLength: 128 }, key, enc.encode('secreto'));",
                "console.log(Buffer.from(iv).toString('hex'));",
                "console.log(Buffer.from(ct).toString('base64'));",
                "JS"
            ]
        }
    ],
    "tokens-otp-jwt": [
        {
            title: "Bash/CLI para JWT y OTP",
            body: "Un JWT se puede decodificar sin clave porque header y payload son Base64URL. Eso solo inspecciona; validar exige comprobar firma, algoritmo, `kid`, `exp`, `nbf`, `iss`, `aud` y permisos. OTP depende de secreto compartido, contador o reloj.",
            bullets: [
                "JWT usa Base64URL sin padding en sus segmentos.",
                "HOTP usa contador; TOTP usa `floor(unixTime / step)`.",
                "oathtool permite contrastar codigos OTP locales cuando esta instalado."
            ],
            exampleTitle: "Comandos Bash",
            exampleLines: [
                "JWT='eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMifQ.signature'",
                "JWT=\"$JWT\" python3 - <<'PY'",
                "import base64, json, os",
                "for part in os.environ['JWT'].split('.')[:2]:",
                "    part += '=' * (-len(part) % 4)",
                "    print(json.dumps(json.loads(base64.urlsafe_b64decode(part)), indent=2))",
                "PY",
                "openssl dgst -sha256 -hmac 'jwt-secret' signing-input.txt",
                "oathtool --totp -b JBSWY3DPEHPK3PXP",
                "python3 - <<'PY'",
                "import time",
                "print(int(time.time()) // 30)",
                "PY"
            ]
        }
    ],
    "asimetrica-hibrida": [
        {
            title: "Bash/CLI para RSA-OAEP e hibrido",
            body: "RSA-OAEP cifra material pequeno. Para documentos o blobs grandes, el patron profesional es hibrido: AES-GCM para el contenido y RSA-OAEP para envolver la clave AES.",
            bullets: [
                "La clave publica cifra o verifica; la clave privada descifra o firma, segun el uso.",
                "No cifres archivos grandes directamente con RSA.",
                "Etiqueta en el sobre algoritmo, hash OAEP, IV, AAD y version."
            ],
            exampleTitle: "Comandos Bash",
            exampleLines: [
                "openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:3072 -out private.pem",
                "openssl pkey -in private.pem -pubout -out public.pem",
                "openssl rand 32 > content.key",
                "openssl pkeyutl -encrypt -pubin -inkey public.pem -pkeyopt rsa_padding_mode:oaep -pkeyopt rsa_oaep_md:sha256 -in content.key -out content.key.wrap",
                "openssl pkeyutl -decrypt -inkey private.pem -pkeyopt rsa_padding_mode:oaep -pkeyopt rsa_oaep_md:sha256 -in content.key.wrap -out content.key"
            ]
        }
    ],
    "firmas-ecdh": [
        {
            title: "Bash/CLI para firmas y ECDH",
            body: "Firmar demuestra integridad y posesion de clave privada; no cifra. ECDH acuerda un secreto compartido; no autentica por si mismo. En protocolos serios, autentica claves publicas y deriva el secreto con HKDF.",
            bullets: [
                "RSA-PSS y ECDSA son esquemas de firma, no de cifrado.",
                "ECDH sin autenticacion permite man-in-the-middle.",
                "El secreto ECDH bruto debe pasar por HKDF antes de alimentar AEAD o HMAC."
            ],
            exampleTitle: "Comandos Bash",
            exampleLines: [
                "openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:3072 -out sign-private.pem",
                "openssl pkey -in sign-private.pem -pubout -out sign-public.pem",
                "openssl dgst -sha256 -sign sign-private.pem -out msg.sig msg.txt",
                "openssl dgst -sha256 -verify sign-public.pem -signature msg.sig msg.txt",
                "openssl genpkey -algorithm EC -pkeyopt ec_paramgen_curve:P-256 -out alice.pem",
                "openssl genpkey -algorithm EC -pkeyopt ec_paramgen_curve:P-256 -out bob.pem",
                "openssl pkey -in bob.pem -pubout -out bob.pub.pem",
                "openssl pkeyutl -derive -inkey alice.pem -peerkey bob.pub.pem -out alice.shared"
            ]
        }
    ],
    "formatos-pki": [
        {
            title: "Bash/CLI para PEM, DER, JWK y X.509",
            body: "PKI falla a menudo por formato, cadena o identidad, no por el algoritmo. Inspecciona PEM/DER, fechas, SAN, emisor, sujeto, huella, extensiones y confianza antes de asumir que un certificado es valido.",
            bullets: [
                "PEM es DER en Base64 con cabeceras; DER es ASN.1 binario.",
                "Un certificado contiene clave publica y firma del emisor, no la clave privada.",
                "La identidad TLS moderna se comprueba en SAN, no solo en Subject CN."
            ],
            exampleTitle: "Comandos Bash",
            exampleLines: [
                "openssl x509 -in cert.pem -noout -text",
                "openssl x509 -in cert.pem -noout -fingerprint -sha256",
                "openssl x509 -in cert.pem -outform DER -out cert.der",
                "openssl x509 -in cert.der -inform DER -out cert.pem",
                "openssl asn1parse -in cert.pem -i",
                "openssl verify -CAfile chain.pem cert.pem"
            ]
        }
    ]
};

const feanorTheoryReferences = {
    "fundamentos-codificacion": [
        {
            label: "GNU coreutils base64/basenc",
            url: "https://www.gnu.org/software/coreutils/manual/coreutils.html",
            note: "Base64, Base64URL, base32, basenc y utilidades de bytes."
        },
        {
            label: "RFC 4648",
            url: "https://www.rfc-editor.org/rfc/rfc4648",
            note: "Base16, Base32, Base64 y Base64URL."
        }
    ],
    "cesar-xor": [
        {
            label: "CyberChef",
            url: "https://gchq.github.io/CyberChef/",
            note: "Banco practico para Cesar, XOR, Base64, Hex y recetas reproducibles."
        },
        {
            label: "Python bitwise operators",
            url: "https://docs.python.org/3/reference/expressions.html#binary-bitwise-operations",
            note: "Referencia para XOR, AND, OR, shifts y mascaras."
        }
    ],
    "operaciones-xor-modulo": [
        {
            label: "Python pow()",
            url: "https://docs.python.org/3/library/functions.html#pow",
            note: "Potencia modular eficiente con enteros grandes."
        },
        {
            label: "OpenSSL prime",
            url: "https://docs.openssl.org/3.5/man1/openssl-prime/",
            note: "Utilidad CLI para probar primos y material numerico."
        }
    ],
    "parsing-json-regex": [
        {
            label: "jq manual",
            url: "https://jqlang.org/manual/",
            note: "Filtrado, canonicalizacion practica y extraccion JSON."
        },
        {
            label: "GNU grep manual",
            url: "https://www.gnu.org/software/grep/manual/grep.html",
            note: "Regex de terminal para logs y texto plano."
        }
    ],
    "esteganografia-metadatos": [
        {
            label: "ExifTool",
            url: "https://www.exiftool.org/",
            note: "Lectura/escritura de metadatos en imagen, audio, video y documentos."
        },
        {
            label: "Steghide manual",
            url: "https://steghide.sourceforge.net/documentation/manual.pdf",
            note: "Embed, extract, info, encinfo y formatos JPEG/BMP/WAV/AU."
        },
        {
            label: "StegSeek",
            url: "https://github.com/RickdeJager/stegseek",
            note: "Cracking por diccionario y modo seed para Steghide."
        },
        {
            label: "binwalk",
            url: "https://github.com/ReFirmLabs/binwalk",
            note: "Deteccion de firmas, firmware y datos embebidos."
        },
        {
            label: "zsteg",
            url: "https://github.com/zed-0xff/zsteg",
            note: "Analisis LSB y planos de bits en PNG/BMP."
        }
    ],
    "secretos-entropia": [
        {
            label: "OpenSSL rand",
            url: "https://docs.openssl.org/3.5/man1/openssl-rand/",
            note: "Generacion de bytes pseudoaleatorios criptograficos."
        },
        {
            label: "Python secrets",
            url: "https://docs.python.org/3/library/secrets.html",
            note: "Tokens seguros y generacion local de material secreto."
        },
        {
            label: "OWASP Password Storage",
            url: "https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html",
            note: "Criterios profesionales para passwords y almacenamiento."
        }
    ],
    "hash-hmac-timing": [
        {
            label: "GNU coreutils *sum",
            url: "https://www.gnu.org/software/coreutils/manual/coreutils.html",
            note: "sha256sum, sha512sum, cksum, sum y verificacion con -c."
        },
        {
            label: "OpenSSL dgst",
            url: "https://docs.openssl.org/3.5/man1/openssl-dgst/",
            note: "Hashes, firmas y MAC/HMAC desde CLI."
        },
        {
            label: "RFC 2104 HMAC",
            url: "https://www.rfc-editor.org/rfc/rfc2104",
            note: "Definicion original de HMAC."
        },
        {
            label: "CrackStation",
            url: "https://crackstation.net/",
            note: "Lookup de hashes no salados con tablas precalculadas."
        },
        {
            label: "Hashes.com Hash Decrypter",
            url: "https://hashes.com/en/decrypt/hash",
            note: "Identificacion, lookup y formato hash[:salt] para founds."
        },
        {
            label: "Hashes.com Verify Hash",
            url: "https://hashes.com/en/tools/verify",
            note: "Verificacion de founds hash[:salt]:plain contra multiples algoritmos."
        },
        {
            label: "Kali rainbowcrack",
            url: "https://www.kali.org/tools/rainbowcrack/",
            note: "rtgen, rtsort y rcrack para generar, ordenar y consultar rainbow tables."
        },
        {
            label: "Hashcat",
            url: "https://hashcat.net/hashcat/",
            note: "Cracking profesional offline con GPU, modos, reglas y wordlists."
        },
        {
            label: "John the Ripper",
            url: "https://www.openwall.com/john/",
            note: "Cracking offline, formatos de password y ecosistema *2john."
        }
    ],
    "red-team-hashcracking": [
        {
            label: "Hashcat",
            url: "https://hashcat.net/hashcat/",
            note: "Herramienta principal GPU/CPU para cracking offline autorizado."
        },
        {
            label: "Hashcat wiki",
            url: "https://hashcat.net/wiki/doku.php?id=hashcat",
            note: "Opciones, modos, workloads, sesiones y uso de comandos."
        },
        {
            label: "Hashcat mask attack",
            url: "https://hashcat.net/wiki/doku.php?id=mask_attack",
            note: "Charsets ?l, ?u, ?d, ?s, ?a, custom charsets y ataques -a 3."
        },
        {
            label: "Hashcat rule based attack",
            url: "https://hashcat.net/wiki/doku.php?id=rule_based_attack",
            note: "Reglas de mangling compatibles con ataques por diccionario."
        },
        {
            label: "John the Ripper",
            url: "https://www.openwall.com/john/",
            note: "Cracker offline con formatos, single crack, wordlist, incremental y external."
        },
        {
            label: "John options",
            url: "https://www.openwall.com/john/doc/OPTIONS.shtml",
            note: "Referencia de parametros CLI, potfiles, wordlists y reglas."
        },
        {
            label: "John cracking modes",
            url: "https://www.openwall.com/john/doc/MODES.shtml",
            note: "Single, wordlist, incremental, mask y external."
        }
    ],
    "derivacion-claves": [
        {
            label: "OpenSSL kdf",
            url: "https://docs.openssl.org/3.5/man1/openssl-kdf/",
            note: "PBKDF2, HKDF y otras KDF desde CLI."
        },
        {
            label: "RFC 5869 HKDF",
            url: "https://www.rfc-editor.org/rfc/rfc5869",
            note: "Extract/expand, salt e info de contexto."
        },
        {
            label: "OWASP Password Storage",
            url: "https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html",
            note: "Recomendaciones para Argon2id, scrypt, bcrypt y PBKDF2."
        },
        {
            label: "Openwall yescrypt",
            url: "https://www.openwall.com/yescrypt/",
            note: "yescrypt como KDF y password hashing scheme escalable sobre scrypt."
        },
        {
            label: "Argon2 PHC",
            url: "https://github.com/P-H-C/phc-winner-argon2",
            note: "Implementacion y especificacion de referencia del ganador Password Hashing Competition."
        },
        {
            label: "bcrypt.js",
            url: "https://github.com/dcodeIO/bcrypt.js",
            note: "Implementacion JS/browser compatible con bcrypt."
        },
        {
            label: "scrypt-js",
            url: "https://github.com/ricmoo/scrypt-js",
            note: "Implementacion JS asincrona de scrypt para navegador."
        },
        {
            label: "yescrypt-wasm",
            url: "https://www.npmjs.com/package/yescrypt-wasm",
            note: "Modulo WebAssembly usado por el laboratorio frontend para yescrypt."
        }
    ],
    "cifrado-simetrico": [
        {
            label: "OpenSSL enc",
            url: "https://docs.openssl.org/3.5/man1/openssl-enc/",
            note: "Cifrado simetrico clasico, KDF, salt, IV y modos legacy."
        },
        {
            label: "NIST block cipher modes",
            url: "https://csrc.nist.gov/projects/block-cipher-techniques/bcm/current-modes",
            note: "Modos CBC, CTR, GCM y documentacion tecnica de referencia."
        }
    ],
    "aead-gcm": [
        {
            label: "WebCrypto AES-GCM",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt",
            note: "Uso frontend de AES-GCM con IV, AAD y tag."
        },
        {
            label: "NIST SP 800-38D",
            url: "https://csrc.nist.gov/publications/detail/sp/800-38d/final",
            note: "GCM y GMAC como modos autenticados."
        }
    ],
    "tokens-otp-jwt": [
        {
            label: "RFC 7519 JWT",
            url: "https://www.rfc-editor.org/rfc/rfc7519",
            note: "Estructura, claims y modelo JWT."
        },
        {
            label: "RFC 6238 TOTP",
            url: "https://www.rfc-editor.org/rfc/rfc6238",
            note: "OTP basado en tiempo."
        },
        {
            label: "RFC 4226 HOTP",
            url: "https://www.rfc-editor.org/rfc/rfc4226",
            note: "OTP basado en contador."
        },
        {
            label: "OATH Toolkit",
            url: "https://www.nongnu.org/oath-toolkit/",
            note: "oathtool para contrastar HOTP/TOTP desde terminal."
        }
    ],
    "asimetrica-hibrida": [
        {
            label: "OpenSSL pkeyutl",
            url: "https://docs.openssl.org/3.5/man1/openssl-pkeyutl/",
            note: "RSA-OAEP, operaciones con clave publica y derivacion."
        },
        {
            label: "OpenSSL genpkey",
            url: "https://docs.openssl.org/3.5/man1/openssl-genpkey/",
            note: "Generacion de claves RSA, EC y otros algoritmos."
        }
    ],
    "firmas-ecdh": [
        {
            label: "OpenSSL dgst",
            url: "https://docs.openssl.org/3.5/man1/openssl-dgst/",
            note: "Firmar y verificar digest con claves."
        },
        {
            label: "OpenSSL pkeyutl",
            url: "https://docs.openssl.org/3.5/man1/openssl-pkeyutl/",
            note: "Derivacion ECDH y operaciones de clave publica."
        }
    ],
    "formatos-pki": [
        {
            label: "OpenSSL x509",
            url: "https://docs.openssl.org/3.5/man1/openssl-x509/",
            note: "Inspeccion y conversion de certificados X.509."
        },
        {
            label: "OpenSSL asn1parse",
            url: "https://docs.openssl.org/3.5/man1/openssl-asn1parse/",
            note: "Inspeccion ASN.1 para DER/PEM."
        },
        {
            label: "RFC 5280 PKIX",
            url: "https://www.rfc-editor.org/rfc/rfc5280",
            note: "Perfil X.509 de Internet PKI."
        }
    ]
};

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
                "Busca bytes anexos despues de finales como IEND, EOI o %%EOF y cabeceras Feanor V2.",
                "Si es imagen, BMP, WAV, AU, PNG iTXt o ZIP bundle del lab, prueba el extractor correspondiente."
            ]
        },
        {
            title: "Transportar un fichero dentro de otro",
            badge: "payload",
            body: "Cuando el payload no es texto, el laboratorio guarda nombre, MIME, tamano y CRC32 para reconstruirlo de forma ordenada.",
            steps: [
                "Selecciona Fichero completo como tipo de datos incrustados.",
                "Elige Auto para que Feanor use LSB si cabe o footer/ZIP si el contenedor no es apto.",
                "Extrae y descarga el payload recuperado para comprobar integridad."
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
            body: "Una huella SHA-256 o una linea sha256sum confirma que el fichero local coincide con la huella publicada.",
            steps: [
                "Calcula SHA-256 del material o copia la linea sha256sum generada.",
                "Pega la huella esperada; tambien puedes comparar contra la parte hexadecimal de una linea *sum.",
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
        },
        {
            title: "Verificar founds sin exponer secretos",
            badge: "look",
            body: "Cuando recibes lineas tipo hash:plain o hash:salt:plain, puedes demostrar si el plaintext corresponde al hash sin consultar una base externa.",
            steps: [
                "Pega los founds y selecciona algoritmo o autodeteccion.",
                "Elige el modo de salt si conoces el formato exacto.",
                "Verifica localmente y escala a Hashcat o John si necesitas reglas, modos o volumen."
            ]
        },
        {
            title: "Auditar hashes rapidos heredados",
            badge: "red",
            body: "Si aparece una base antigua con MD5, SHA1 o SHA256 simple, el primer control defensivo es probar una wordlist autorizada y demostrar el riesgo de passwords debiles.",
            steps: [
                "Pega hashes en formato hash o hash:salt y deja autodeteccion si no conoces el algoritmo.",
                "Carga una wordlist propia con candidatos de laboratorio o passwords autorizados.",
                "Activa reglas comunes y revisa FOUND/MISS para priorizar migracion a Argon2id, scrypt, yescrypt o bcrypt."
            ]
        },
        {
            title: "Explicar por que importa el salt",
            badge: "rain",
            body: "Una rainbow table pequena permite demostrar que una tabla reutilizable deja de servir cuando cada usuario tiene un salt distinto.",
            steps: [
                "Genera una tabla sin salt para MD5 y resuelve hashes de ejemplo.",
                "Repite con un salt global y observa que la tabla ya queda ligada a ese salt.",
                "Documenta la migracion: salt unico por credencial y KDF lento con coste ajustado."
            ]
        }
    ],
    "red-team-hashcracking": [
        {
            title: "Elegir modo correcto",
            badge: "id",
            body: "El mismo hash puede encajar en varios algoritmos por longitud, asi que la identificacion debe combinar patron y contexto.",
            steps: [
                "Pega una muestra en el workbench.",
                "Revisa candidatos detectados y selecciona el formato real si lo conoces.",
                "Genera comandos Hashcat/John con el modo seleccionado."
            ]
        },
        {
            title: "Probar una hipotesis de passwords",
            badge: "dict",
            body: "Una auditoria seria empieza por hipotesis: nombres, entorno, anos, politicas y patrones humanos.",
            steps: [
                "Carga una wordlist primaria autorizada.",
                "Activa reglas best64-lite o sufijos comunes.",
                "Compara keyspace, candidatos locales y comando generado antes de ejecutar fuera del navegador."
            ]
        },
        {
            title: "Acotar una mascara",
            badge: "mask",
            body: "Las mascaras dan control sobre estructura, pero explotan rapido si no se limita longitud y charset.",
            steps: [
                "Define ?l, ?u, ?d, ?s o ?1-?4 personalizados.",
                "Observa el keyspace estimado.",
                "Usa --increment solo si el tiempo y alcance lo permiten."
            ]
        },
        {
            title: "Reportar founds",
            badge: "pot",
            body: "Un found tiene valor defensivo cuando se verifica y se transforma en mitigacion concreta.",
            steps: [
                "Exporta founds con hashcat --show o john --show.",
                "Verifica muestras en el hash lookup local.",
                "Documenta modo, regla, tiempo, alcance y recomendacion de migracion."
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
        },
        {
            title: "Almacenar passwords de usuarios",
            badge: "pass",
            body: "Para passwords persistentes, guarda un hash parametrizado como Argon2id, scrypt, yescrypt o bcrypt, nunca la password ni un SHA rapido.",
            steps: [
                "Genera salt unico por password.",
                "Escoge coste acorde al servidor y documenta los parametros.",
                "Guarda el string codificado completo para poder verificar y migrar coste despues."
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
            body: "DES, TripleDES, RC4, RC4Drop y RabbitLegacy ayudan a reconocer material heredado, no a diseñar sistemas nuevos.",
            steps: [
                "Cifra el mismo texto con varios algoritmos.",
                "Cambia modos CBC/CFB/CTR/OFB/ECB y padding para ver cuando la recuperacion depende de todos los parametros.",
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
    sections: [
        ...topic.sections,
        ...(feanorTheoryCliSections[topic.id] || [])
    ],
    references: feanorTheoryReferences[topic.id] || [],
    useCases: feanorTheoryUseCases[topic.id] || []
}));
