export const redTeamHashModeCatalog = [
    {
        id: "MD5",
        label: "MD5",
        selectLabel: "MD5 | hashcat -m 0 / john raw-md5 | Inseguro",
        hashcatMode: "0",
        johnFormat: "raw-md5",
        localAlgorithm: "MD5",
        category: "Raw Hash",
        status: "Inseguro",
        local: true,
        speed: "Muy alto",
        pattern: "32 hex",
        note: "Huella rapida sin salt. Adecuada para integridad legacy, no para passwords."
    },
    {
        id: "SHA1",
        label: "SHA1",
        selectLabel: "SHA1 | hashcat -m 100 / john raw-sha1 | Inseguro",
        hashcatMode: "100",
        johnFormat: "raw-sha1",
        localAlgorithm: "SHA1",
        category: "Raw Hash",
        status: "Inseguro",
        local: true,
        speed: "Muy alto",
        pattern: "40 hex",
        note: "Colisiones practicas conocidas. No usar como prueba fuerte de integridad o password hash."
    },
    {
        id: "SHA224",
        label: "SHA2-224",
        selectLabel: "SHA224 | hashcat -m 1300 / john raw-sha224 | Legacy",
        hashcatMode: "1300",
        johnFormat: "raw-sha224",
        localAlgorithm: "SHA224",
        category: "Raw Hash",
        status: "Legacy",
        local: true,
        speed: "Alto",
        pattern: "56 hex",
        note: "SHA-2 truncado a 224 bits. Menos habitual que SHA-256."
    },
    {
        id: "SHA256",
        label: "SHA2-256",
        selectLabel: "SHA256 | hashcat -m 1400 / john raw-sha256 | Rapido",
        hashcatMode: "1400",
        johnFormat: "raw-sha256",
        localAlgorithm: "SHA256",
        category: "Raw Hash",
        status: "Rapido",
        local: true,
        speed: "Alto",
        pattern: "64 hex",
        note: "Correcto para integridad, pero demasiado rapido para almacenar passwords sin KDF."
    },
    {
        id: "SHA384",
        label: "SHA2-384",
        selectLabel: "SHA384 | hashcat -m 10800 / john raw-sha384 | Rapido",
        hashcatMode: "10800",
        johnFormat: "raw-sha384",
        localAlgorithm: "SHA384",
        category: "Raw Hash",
        status: "Rapido",
        local: true,
        speed: "Alto",
        pattern: "96 hex",
        note: "Huella SHA-2 de 384 bits. No sustituye un password hashing lento."
    },
    {
        id: "SHA512",
        label: "SHA2-512",
        selectLabel: "SHA512 | hashcat -m 1700 / john raw-sha512 | Rapido",
        hashcatMode: "1700",
        johnFormat: "raw-sha512",
        localAlgorithm: "SHA512",
        category: "Raw Hash",
        status: "Rapido",
        local: true,
        speed: "Alto",
        pattern: "128 hex",
        note: "Huella fuerte para integridad, pero rapida en GPU/CPU modernas."
    },
    {
        id: "SHA3_256",
        label: "SHA3-256",
        selectLabel: "SHA3-256 | hashcat -m 17400 / john raw-sha3 | Rapido",
        hashcatMode: "17400",
        johnFormat: "raw-sha3",
        localAlgorithm: "SHA3_256",
        category: "Raw Hash",
        status: "Rapido",
        local: true,
        speed: "Alto",
        pattern: "64 hex",
        note: "Puede confundirse por longitud con SHA-256 o Keccak-256; necesita contexto."
    },
    {
        id: "RIPEMD160",
        label: "RIPEMD-160",
        selectLabel: "RIPEMD160 | hashcat -m 6000 / john raw-ripemd160 | Legacy",
        hashcatMode: "6000",
        johnFormat: "raw-ripemd160",
        localAlgorithm: "RIPEMD160",
        category: "Raw Hash",
        status: "Legacy",
        local: true,
        speed: "Alto",
        pattern: "40 hex",
        note: "Misma longitud que SHA1; distinguirlo exige contexto o verificacion con plaintext."
    },
    {
        id: "MYSQL5",
        label: "MySQL4.1/MySQL5",
        selectLabel: "MYSQL5 | hashcat -m 300 / john mysql-sha1 | Legacy",
        hashcatMode: "300",
        johnFormat: "mysql-sha1",
        localAlgorithm: "MYSQL5",
        category: "Database Server",
        status: "Legacy",
        local: true,
        speed: "Alto",
        pattern: "* + 40 hex",
        note: "SHA1(SHA1_bin(password)) con prefijo *. Formato historico de MySQL."
    },
    {
        id: "NTLM",
        label: "NTLM",
        selectLabel: "NTLM | hashcat -m 1000 / john nt | Inseguro",
        hashcatMode: "1000",
        johnFormat: "nt",
        localAlgorithm: "",
        category: "Operating System",
        status: "Inseguro",
        local: false,
        speed: "Muy alto",
        pattern: "32 hex",
        note: "MD4(UTF-16LE(password)); indistinguible de MD5 solo por longitud."
    },
    {
        id: "LM",
        label: "LM",
        selectLabel: "LM | hashcat -m 3000 / john lm | Critico",
        hashcatMode: "3000",
        johnFormat: "lm",
        localAlgorithm: "",
        category: "Operating System",
        status: "Critico",
        local: false,
        speed: "Muy alto",
        pattern: "32 hex",
        note: "Formato Windows antiguo, mayusculas y mitades cortas. Debe eliminarse."
    },
    {
        id: "MD5CRYPT",
        label: "md5crypt",
        selectLabel: "md5crypt | hashcat -m 500 / john md5crypt | Legacy",
        hashcatMode: "500",
        johnFormat: "md5crypt",
        localAlgorithm: "",
        category: "Operating System",
        status: "Legacy",
        local: false,
        speed: "Medio",
        pattern: "$1$...",
        note: "Unix crypt basado en MD5. Migrar a yescrypt, Argon2id, scrypt o bcrypt."
    },
    {
        id: "SHA256CRYPT",
        label: "sha256crypt",
        selectLabel: "sha256crypt | hashcat -m 7400 / john crypt | Legacy",
        hashcatMode: "7400",
        johnFormat: "crypt",
        localAlgorithm: "",
        category: "Operating System",
        status: "Legacy",
        local: false,
        speed: "Medio",
        pattern: "$5$...",
        note: "Unix crypt SHA-256 con salt/coste en el propio formato."
    },
    {
        id: "SHA512CRYPT",
        label: "sha512crypt",
        selectLabel: "sha512crypt | hashcat -m 1800 / john crypt | Legacy",
        hashcatMode: "1800",
        johnFormat: "crypt",
        localAlgorithm: "",
        category: "Operating System",
        status: "Legacy",
        local: false,
        speed: "Medio",
        pattern: "$6$...",
        note: "Unix crypt SHA-512. Sigue siendo comun, pero yescrypt es preferible en sistemas modernos."
    },
    {
        id: "BCRYPT",
        label: "bcrypt",
        selectLabel: "bcrypt | hashcat -m 3200 / john bcrypt | KDF",
        hashcatMode: "3200",
        johnFormat: "bcrypt",
        localAlgorithm: "",
        category: "Operating System",
        status: "KDF",
        local: false,
        speed: "Lento",
        pattern: "$2a$/$2b$/$2y$",
        note: "Password hashing adaptativo con coste y salt embebidos; recuerda el limite portable de 72 bytes."
    },
    {
        id: "ARGON2",
        label: "Argon2",
        selectLabel: "Argon2 | hashcat -m 34000 / john argon2 | KDF",
        hashcatMode: "34000",
        johnFormat: "argon2",
        localAlgorithm: "",
        category: "Generic KDF",
        status: "KDF",
        local: false,
        speed: "Lento/memoria",
        pattern: "$argon2id$/$argon2i$/$argon2d$",
        note: "Formato PHC con memoria, iteraciones, paralelismo y salt. Recomendado como Argon2id."
    },
    {
        id: "SCRYPT",
        label: "scrypt",
        selectLabel: "scrypt | hashcat -m 8900 / john scrypt | KDF",
        hashcatMode: "8900",
        johnFormat: "scrypt",
        localAlgorithm: "",
        category: "Generic KDF",
        status: "KDF",
        local: false,
        speed: "Lento/memoria",
        pattern: "$scrypt$ o $7$",
        note: "KDF resistente a memoria. En Cisco-IOS type 9 se usa modo hashcat 9300."
    },
    {
        id: "YESCRYPT",
        label: "yescrypt",
        selectLabel: "yescrypt | hashcat -m 70200 / john crypt | KDF",
        hashcatMode: "70200",
        johnFormat: "crypt",
        localAlgorithm: "",
        category: "Generic KDF",
        status: "KDF",
        local: false,
        speed: "Lento/memoria",
        pattern: "$y$ o $gy$",
        note: "Formato habitual en /etc/shadow moderno. John lo trata via crypt; Hashcat lo cubre en flujos yescrypt/scrypt puenteados segun formato."
    },
    {
        id: "PHPASS",
        label: "phpass / WordPress",
        selectLabel: "phpass | hashcat -m 400 / john phpass | Legacy",
        hashcatMode: "400",
        johnFormat: "phpass",
        localAlgorithm: "",
        category: "Generic KDF",
        status: "Legacy",
        local: false,
        speed: "Medio",
        pattern: "$P$/$H$",
        note: "Portable PHPass usado por WordPress historico."
    },
    {
        id: "WPA",
        label: "WPA-PBKDF2",
        selectLabel: "WPA | hashcat -m 22000 / john wpapsk | Captura",
        hashcatMode: "22000",
        johnFormat: "wpapsk",
        localAlgorithm: "",
        category: "Network Protocol",
        status: "Captura",
        local: false,
        speed: "Lento",
        pattern: "hashline 22000",
        note: "PMKID/EAPOL convertidos a formato 22000. Requiere captura autorizada."
    },
    {
        id: "JWT_HS256",
        label: "JWT HS256",
        selectLabel: "JWT HS256 | hashcat -m 16500 / john HMAC-SHA256 | Token",
        hashcatMode: "16500",
        johnFormat: "HMAC-SHA256",
        localAlgorithm: "",
        category: "Network Protocol",
        status: "Token",
        local: false,
        speed: "Alto",
        pattern: "header.payload.signature",
        note: "Solo aplica a JWT firmados con secreto HMAC; no a RSA/ECDSA."
    }
];

export const redTeamHashModeOptions = [
    {
        value: "auto",
        label: "Auto detectar",
        selectLabel: "AUTO | patron + comandos | Analisis"
    },
    ...redTeamHashModeCatalog.map(item => ({
        ...item,
        value: item.id
    }))
];

export function findRedTeamHashMode(id) {
    return redTeamHashModeCatalog.find(item => item.id === id) || null;
}

function pushUniqueMode(modes, id) {
    const mode = findRedTeamHashMode(id);
    if (mode && !modes.some(item => item.id === mode.id)) modes.push(mode);
}

export function detectRedTeamHashModes(value) {
    const raw = String(value || "").trim();
    const compact = raw.replace(/\s+/g, "");
    const lower = compact.toLowerCase();
    const modes = [];

    if (/^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/.test(compact)) pushUniqueMode(modes, "BCRYPT");
    if (/^\$argon2(id|i|d)\$/i.test(compact)) pushUniqueMode(modes, "ARGON2");
    if (/^\$y\$/.test(compact) || /^\$gy\$/.test(compact)) pushUniqueMode(modes, "YESCRYPT");
    if (/^\$scrypt\$/i.test(compact) || /^\$7\$/.test(compact)) pushUniqueMode(modes, "SCRYPT");
    if (/^\$1\$/.test(compact)) pushUniqueMode(modes, "MD5CRYPT");
    if (/^\$5\$/.test(compact)) pushUniqueMode(modes, "SHA256CRYPT");
    if (/^\$6\$/.test(compact)) pushUniqueMode(modes, "SHA512CRYPT");
    if (/^\$[PH]\$/.test(compact)) pushUniqueMode(modes, "PHPASS");
    if (/^\*[0-9a-f]{40}$/i.test(compact)) pushUniqueMode(modes, "MYSQL5");
    if (/^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(compact)) pushUniqueMode(modes, "JWT_HS256");
    if (/^wpa\*/i.test(compact) || /^WPA\*/.test(raw)) pushUniqueMode(modes, "WPA");

    if (/^[0-9a-f]+$/i.test(compact)) {
        if (compact.length === 32) {
            pushUniqueMode(modes, "MD5");
            pushUniqueMode(modes, "NTLM");
            pushUniqueMode(modes, "LM");
        }
        if (compact.length === 40) {
            pushUniqueMode(modes, "SHA1");
            pushUniqueMode(modes, "RIPEMD160");
        }
        if (compact.length === 56) pushUniqueMode(modes, "SHA224");
        if (compact.length === 64) {
            pushUniqueMode(modes, "SHA256");
            pushUniqueMode(modes, "SHA3_256");
        }
        if (compact.length === 96) pushUniqueMode(modes, "SHA384");
        if (compact.length === 128) pushUniqueMode(modes, "SHA512");
    }

    return modes.map(mode => ({
        ...mode,
        confidence: mode.pattern && lower.includes(mode.pattern.toLowerCase()) ? "media" : "heuristica"
    }));
}
