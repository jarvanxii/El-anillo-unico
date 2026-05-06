export const feanorUtilityGroups = [
    {
        id: "basicos",
        name: "Basicos y encoding",
        summary: "Herramientas de entrada para transformar texto con multiples codificaciones, revisar bytes, probar patrones y validar estructuras sencillas.",
        utilities: [
            {
                id: "caesar",
                label: "Cifrado Cesar",
                badge: "CES",
                routeName: "feanor-cifrado-cesar",
                description: "Desplaza letras con logica normal o inversa usando alfabeto espanol con Ñ o ingles."
            },
            {
                id: "atbash",
                label: "Cifrado Atbash",
                badge: "ATB",
                routeName: "feanor-atbash",
                description: "Sustitucion por espejo del alfabeto. La misma operacion cifra y descifra."
            },
            {
                id: "booleanOps",
                label: "XOR, NOR y puertas",
                badge: "LOG",
                routeName: "feanor-boolean-ops",
                description: "Combina el laboratorio XOR con NOR, NAND, AND, OR, XNOR y NOT sobre binario, Hex, bytes decimales y texto UTF/ASCII/Latin-1/Windows-1252."
            },
            {
                id: "vigenere",
                label: "Cifrado Vigenere",
                badge: "VIG",
                routeName: "feanor-vigenere",
                description: "Cifrado polialfabetico con clave repetida y alfabetos espanol o ingles."
            },
            {
                id: "affine",
                label: "Cifrado Afin",
                badge: "AFN",
                routeName: "feanor-affine",
                description: "Aplica E(x) = (a*x + b) mod m y descifra con inverso modular de a."
            },
            {
                id: "railFence",
                label: "Rail Fence",
                badge: "RFL",
                routeName: "feanor-rail-fence",
                description: "Transposicion en zigzag por railes: conserva caracteres y cambia su orden."
            },
            {
                id: "modular",
                label: "Operacion modular",
                badge: "MOD",
                routeName: "feanor-modular",
                description: "Calcula A % N y A^E % N con enteros grandes, resto, rango e identidad de division."
            },
            {
                id: "base64",
                label: "Base64",
                badge: "B64",
                routeName: "feanor-base64",
                description: "Codifica y decodifica texto con multiples encodings y ficheros Base64 por categorias: imagen, audio, video, PDF o binario."
            },
            {
                id: "base64url",
                label: "Base64URL",
                badge: "B64U",
                routeName: "feanor-base64url",
                description: "Transforma texto UTF/ASCII/Latin-1/Windows-1252 con el alfabeto URL-safe usado en JWT, rutas y parametros."
            },
            {
                id: "urlEncoding",
                label: "URL encoding",
                badge: "URL",
                routeName: "feanor-url-encoding",
                description: "Codifica y decodifica percent-encoding para query strings, fragments y parametros."
            },
            {
                id: "hex",
                label: "Hexadecimal",
                badge: "HEX",
                routeName: "feanor-hex",
                description: "Convierte texto UTF-8, UTF-16, ASCII, Latin-1 o Windows-1252 a Hex y recupera texto desde bytes hexadecimales."
            },
            {
                id: "byte",
                label: "Inspector de bytes",
                badge: "BYTE",
                routeName: "feanor-inspector-bytes",
                description: "Muestra el mismo material como UTF-8, UTF-16, ASCII, Latin-1, Windows-1252, Hex, Base64, binario, decimal y tabla byte a byte."
            },
            {
                id: "regex",
                label: "Banco regex",
                badge: "REGX",
                routeName: "feanor-banco-regex",
                description: "Prueba expresiones regulares, flags, offsets, grupos capturados y coincidencias reales."
            },
            {
                id: "json",
                label: "JSON y diff",
                badge: "JSON",
                routeName: "feanor-json-diff",
                description: "Formatea, minifica, valida y compara JSON usando una representacion canonica por claves."
            }
        ]
    },
    {
        id: "estego",
        name: "Esteganografia y metadatos",
        summary: "Analisis local de ficheros, metadatos visibles y pruebas LSB/footer/ZIP para esconder o recuperar mensajes y ficheros.",
        utilities: [
            {
                id: "stegoAnalyze",
                label: "Analizador de ficheros",
                badge: "META",
                routeName: "feanor-estego-analizador",
                description: "Inspecciona magic bytes, entropia, codificaciones, cadenas, metadatos, contenedores, ejecutables, capturas, archivos y senales de esteganografia."
            },
            {
                id: "exif",
                label: "Analizador EXIF",
                badge: "EXIF",
                routeName: "feanor-exif",
                description: "Extrae y ordena EXIF, XMP, IPTC, GPS, camara, lente, software y metadatos crudos de imagenes."
            },
            {
                id: "metadataEditor",
                label: "Editor de metadatos",
                badge: "EDIT",
                routeName: "feanor-metadata-editor",
                description: "Crea o modifica metadatos en MP3 ID3, WAV INFO, PNG iTXt, JPEG COM, SVG metadata y sidecars para PDF, video, Office y WebP."
            },
            {
                id: "stegoEmbed",
                label: "Incrustar datos",
                badge: "LSB+",
                routeName: "feanor-estego-incrustar",
                description: "Oculta texto, JSON, Base64 o ficheros completos con LSB de imagen, LSB BMP/WAV/AU, PNG iTXt, footer universal o bundle ZIP."
            },
            {
                id: "stegoExtract",
                label: "Extraer datos",
                badge: "LSB-",
                routeName: "feanor-estego-extraer",
                description: "Recupera payloads Feanor desde footer universal, PNG iTXt, bundle ZIP, LSB de imagen y LSB directo BMP/WAV/AU."
            },
            {
                id: "steghideSuite",
                label: "Steghide / StegSeek",
                badge: "STEG",
                routeName: "feanor-steghide-suite",
                description: "Integra flujos tipo steghide y stegseek: capacidad, embed/extract, passphrase, CRC, wordlist y seed/probe en frontend."
            }
        ]
    },
    {
        id: "secretos",
        name: "Secretos y huellas",
        summary: "Utilidades para generar material, medir fortaleza, derivar claves y comparar salidas sensibles.",
        utilities: [
            {
                id: "secret",
                label: "Generador de secretos",
                badge: "KEY",
                routeName: "feanor-generador-secretos",
                description: "Genera passwords, UUID, claves Hex y secretos Base64URL con entropia local."
            },
            {
                id: "entropy",
                label: "Analizador de entropia",
                badge: "ENT",
                routeName: "feanor-entropia",
                description: "Evalua passwords, tokens y claves con charset estimado, Shannon y zxcvbn."
            },
            {
                id: "hash",
                label: "Hash digest",
                badge: "HASH",
                routeName: "feanor-hash",
                description: "Calcula huellas SHA/MD5, salidas md5sum/sha1sum/sha256sum/sha512sum y checksums SUM/CRC sobre texto o ficheros."
            },
            {
                id: "hmac",
                label: "HMAC",
                badge: "HMAC",
                routeName: "feanor-hmac",
                description: "Calcula HMAC con clave compartida y encoding configurable para autenticar integridad de mensajes."
            },
            {
                id: "pbkdf2",
                label: "PBKDF2",
                badge: "PBK",
                routeName: "feanor-pbkdf2",
                description: "Deriva claves desde passwords con salt, hash, iteraciones, longitud de salida y encoding de material."
            },
            {
                id: "hkdf",
                label: "HKDF",
                badge: "HKDF",
                routeName: "feanor-hkdf",
                description: "Expande secretos de alta entropia con salt, info de contexto y encoding configurable para separar usos."
            },
            {
                id: "argon2",
                label: "Argon2",
                badge: "ARG2",
                routeName: "feanor-argon2",
                description: "Genera hashes Argon2id/i/d con memoria, iteraciones, paralelismo, salt y salida PHC en navegador."
            },
            {
                id: "scrypt",
                label: "scrypt",
                badge: "SCR",
                routeName: "feanor-scrypt",
                description: "Deriva claves con scrypt usando parametros N, r y p para resistencia a memoria y fuerza bruta offline."
            },
            {
                id: "yescrypt",
                label: "yescrypt",
                badge: "YES",
                routeName: "feanor-yescrypt",
                description: "Genera hashes yescrypt $y$ y claves derivadas con WASM, parametros N/r/p/t y enfoque compatible con password hashing moderno."
            },
            {
                id: "bcrypt",
                label: "bcrypt",
                badge: "BCR",
                routeName: "feanor-bcrypt",
                description: "Genera hashes bcrypt con coste configurable, salt modular crypt y avisos sobre el limite de 72 bytes."
            },
            {
                id: "timing",
                label: "Comparador constante",
                badge: "TIME",
                routeName: "feanor-comparador-constante",
                description: "Compara dos valores con rutina de tiempo constante y medicion local."
            },
            {
                id: "jsonSign",
                label: "Firma de JSON",
                badge: "JWS",
                routeName: "feanor-json-firma",
                description: "Canonicaliza JSON y calcula o verifica firmas HMAC sobre bytes estables."
            }
        ]
    },
    {
        id: "redTeam",
        name: "Red Team",
        summary: "Laboratorios defensivos para auditar hashes, founds y contrasenas debiles sin enviar material sensible fuera del navegador.",
        utilities: [
            {
                id: "hashcatJohnWorkbench",
                label: "Hashcat / John workbench",
                badge: "H/J",
                routeName: "feanor-hashcat-john-workbench",
                description: "Planifica ataques autorizados con catalogo de modos, mascaras, reglas, wordlists, comandos Hashcat/John y preview local de candidatos."
            },
            {
                id: "passwordCracker",
                label: "Password hash cracker",
                badge: "CRACK",
                routeName: "feanor-password-cracker",
                description: "Cracking local por diccionario para MD5, SHA1, SHA2, SHA3, RIPEMD-160 y MySQL5; identifica formatos adaptativos como bcrypt, Argon2, scrypt y yescrypt."
            },
            {
                id: "rainbowTables",
                label: "Rainbow tables",
                badge: "RAIN",
                routeName: "feanor-rainbow-tables",
                description: "Genera tablas rainbow locales, exporta endpoints start->end y busca hashes rapidos para entender el impacto de salts y KDF modernos."
            },
            {
                id: "hashLookup",
                label: "Hash lookup local",
                badge: "LOOK",
                routeName: "feanor-hash-lookup",
                description: "Identifica hashes, verifica founds hash[:salt]:plain y prueba wordlists locales al estilo CrackStation/Hashes sin enviar datos fuera del navegador."
            }
        ]
    },
    {
        id: "cifrado",
        name: "Cifrado y tokens",
        summary: "Laboratorios para cifrado simetrico, AEAD, tokens y codigos de un solo uso.",
        utilities: [
            {
                id: "symmetric",
                label: "Cifrado simetrico",
                badge: "SYM",
                routeName: "feanor-cifrado-simetrico",
                description: "Cifra y descifra con AES, DES, 3DES, RC4, RC4Drop, Rabbit y RabbitLegacy, con modos CBC/CFB/CTR/OFB/ECB, padding y encoding configurable."
            },
            {
                id: "aead",
                label: "AEAD AES-GCM",
                badge: "AEAD",
                routeName: "feanor-aead",
                description: "Cifra con autenticacion, AAD, IV, tag, encoding configurable y comprobacion de alteraciones."
            },
            {
                id: "otp",
                label: "TOTP y HOTP",
                badge: "OTP",
                routeName: "feanor-otp",
                description: "Genera secretos Base32, codigos HOTP/TOTP y verifica ventanas temporales."
            },
            {
                id: "jwt",
                label: "JWT",
                badge: "JWT",
                routeName: "feanor-jwt",
                description: "Inspecciona tokens, revisa claims y valida firmas HMAC o JWKS/JWK publico."
            }
        ]
    },
    {
        id: "claves",
        name: "Claves y PKI",
        summary: "Herramientas avanzadas para claves publicas, firmas digitales, ECDH, conversiones y certificados.",
        utilities: [
            {
                id: "asymmetric",
                label: "Cifrado asimetrico",
                badge: "RSA",
                routeName: "feanor-cifrado-asimetrico",
                description: "Genera claves RSA-OAEP y prueba cifrado directo o hibrido con AES-GCM."
            },
            {
                id: "signature",
                label: "Firma digital",
                badge: "SIGN",
                routeName: "feanor-firma-digital",
                description: "Firma y verifica mensajes con encoding configurable, RSA-PSS o ECDSA P-256 usando WebCrypto."
            },
            {
                id: "ecdh",
                label: "Intercambio ECDH",
                badge: "ECDH",
                routeName: "feanor-ecdh",
                description: "Genera pares de curva eliptica y deriva un secreto compartido cliente-servidor."
            },
            {
                id: "keyConverter",
                label: "Conversor de claves",
                badge: "KEY",
                routeName: "feanor-conversor-claves",
                description: "Convierte claves PEM, DER Base64 y JWK cuando el navegador puede importarlas."
            },
            {
                id: "certificate",
                label: "Inspector X.509",
                badge: "X509",
                routeName: "feanor-inspector-x509",
                description: "Analiza certificados PEM, sujeto, emisor, validez, SAN, huellas y cadena basica."
            }
        ]
    }
];

export const feanorUtilities = feanorUtilityGroups.flatMap(group => group.utilities);
