export const johnDictionaryCatalog = [
    {
        id: "feanor-common-es",
        label: "Feanor comun ES",
        fileName: "feanor-common-es.txt",
        language: "es",
        source: "Curado local",
        note: "Palabras espanolas frecuentes, estaciones, terminos tecnicos y patrones de laboratorio.",
        entries: [
            "password", "contrasena", "clave", "secreto", "admin", "administrador", "usuario", "invitado",
            "prueba", "test", "demo", "sistema", "servidor", "cliente", "empresa", "oficina", "trabajo",
            "verano", "invierno", "primavera", "otono", "enero", "febrero", "marzo", "abril", "mayo",
            "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre", "madrid",
            "barcelona", "valencia", "sevilla", "zaragoza", "bilbao", "malaga", "granada", "alicante",
            "feanor", "mithril", "rivendel", "mordor", "gondor", "rohan", "palantir", "anillo"
        ]
    },
    {
        id: "feanor-common-en",
        label: "Feanor common EN",
        fileName: "feanor-common-en.txt",
        language: "en",
        source: "Curado local",
        note: "Terminos ingleses frecuentes para demos defensivas y consultas de diccionario.",
        entries: [
            "password", "secret", "welcome", "admin", "administrator", "root", "guest", "user", "login",
            "master", "dragon", "shadow", "monkey", "football", "baseball", "summer", "winter", "spring",
            "autumn", "company", "office", "server", "client", "backup", "database", "network", "cloud",
            "security", "default", "changeme", "letmein", "trustno1", "access", "private", "public",
            "project", "release", "staging", "production", "testing", "development"
        ]
    },
    {
        id: "john-password-lst-style",
        label: "John password.lst style",
        fileName: "password.lst",
        language: "mixed",
        source: "John/Openwall style",
        note: "Muestra de estilo del diccionario pequeno que suele acompanhar a John; no replica la lista completa.",
        entries: [
            "123456", "12345", "123456789", "password", "iloveyou", "princess", "1234567", "rockyou",
            "12345678", "abc123", "nicole", "daniel", "babygirl", "monkey", "lovely", "jessica",
            "654321", "michael", "ashley", "qwerty", "111111", "iloveu", "000000", "michelle",
            "tigger", "sunshine", "chocolate", "password1", "soccer", "anthony", "friends", "butterfly"
        ]
    },
    {
        id: "rockyou-top-sample",
        label: "RockYou top sample",
        fileName: "rockyou-top-sample.txt",
        language: "mixed",
        source: "RockYou pattern sample",
        note: "Muestra corta para reconocer patrones de RockYou sin incluir dumps masivos.",
        entries: [
            "123456", "123456789", "12345", "qwerty", "password", "12345678", "111111", "123123",
            "abc123", "password1", "1234", "qwertyuiop", "123321", "dragon", "baseball", "football",
            "letmein", "monkey", "696969", "shadow", "master", "666666", "qwerty123", "mustang",
            "michael", "superman", "batman", "trustno1", "hello", "freedom", "whatever", "loveme"
        ]
    },
    {
        id: "seclists-top-web",
        label: "SecLists top web",
        fileName: "seclists-top-web.txt",
        language: "mixed",
        source: "SecLists style",
        note: "Terminos tipicos de listas web/login. Usa SecLists real offline para auditorias autorizadas.",
        entries: [
            "admin", "administrator", "root", "test", "guest", "info", "adm", "mysql", "user", "administrator1",
            "oracle", "ftp", "pi", "puppet", "ansible", "jenkins", "git", "gitlab", "deploy", "backup",
            "nagios", "zabbix", "monitor", "support", "service", "webmaster", "operator", "manager",
            "demo", "temp", "qa", "stage", "prod", "dev", "local", "docker"
        ]
    },
    {
        id: "keyboard-patterns",
        label: "Patrones teclado",
        fileName: "keyboard-patterns.txt",
        language: "mixed",
        source: "Curado local",
        note: "Secuencias de teclado y variantes frecuentes.",
        entries: [
            "qwerty", "qwertyuiop", "asdfgh", "asdfghjkl", "zxcvbn", "zxcvbnm", "1q2w3e", "1qaz2wsx",
            "qazwsx", "qweasd", "qwer1234", "abcd1234", "zaq12wsx", "poiuytrewq", "mnbvcxz",
            "q1w2e3r4", "qwerty123", "asdf1234", "qwerasdf", "qazxswedc", "123qwe", "321qwe",
            "qwerty!", "qwerty2026", "azerty", "azertyuiop", "1234qwer"
        ]
    },
    {
        id: "years-seasons",
        label: "Temporadas y anos",
        fileName: "years-seasons.txt",
        language: "mixed",
        source: "Curado local",
        note: "Base util para hibridos wordlist+mascara o consultas por sufijo.",
        entries: [
            "verano2024", "verano2025", "verano2026", "invierno2024", "invierno2025", "invierno2026",
            "primavera2024", "primavera2025", "primavera2026", "otono2024", "otono2025", "otono2026",
            "summer2024", "summer2025", "summer2026", "winter2024", "winter2025", "winter2026",
            "spring2024", "spring2025", "spring2026", "autumn2024", "autumn2025", "autumn2026",
            "navidad2024", "navidad2025", "navidad2026", "christmas2024", "christmas2025", "christmas2026"
        ]
    },
    {
        id: "cloud-devops",
        label: "Cloud / DevOps",
        fileName: "cloud-devops.txt",
        language: "mixed",
        source: "Curado local",
        note: "Palabras frecuentes en entornos cloud, CI/CD e infraestructura.",
        entries: [
            "aws", "azure", "gcp", "cloud", "docker", "kubernetes", "k8s", "helm", "terraform", "ansible",
            "vault", "jenkins", "gitlab", "github", "runner", "pipeline", "deploy", "release", "prod",
            "production", "staging", "preprod", "dev", "development", "qa", "testing", "backup", "snapshot",
            "cluster", "node", "service", "secret", "token", "registry", "container", "compose"
        ]
    },
    {
        id: "service-defaults",
        label: "Servicios por defecto",
        fileName: "service-defaults.txt",
        language: "mixed",
        source: "Curado local",
        note: "Usuarios/passwords por defecto muy conocidos para revisar exposicion interna.",
        entries: [
            "admin:admin", "admin:password", "admin:1234", "root:root", "root:toor", "guest:guest",
            "user:user", "test:test", "demo:demo", "postgres:postgres", "mysql:mysql", "oracle:oracle",
            "tomcat:tomcat", "jenkins:jenkins", "elastic:changeme", "kibana:changeme", "redis:redis",
            "rabbitmq:guest", "grafana:admin", "prometheus:prometheus", "sonar:admin", "nexus:admin123",
            "pi:raspberry", "ubnt:ubnt", "cisco:cisco", "admin:changeme"
        ]
    },
    {
        id: "spanish-names",
        label: "Nombres ES muestra",
        fileName: "spanish-names.txt",
        language: "es",
        source: "Curado local",
        note: "Muestra de nombres para consultar patrones; no usar contra personas sin autorizacion.",
        entries: [
            "maria", "jose", "antonio", "manuel", "francisco", "juan", "david", "javier", "daniel",
            "carlos", "ana", "lucia", "laura", "carmen", "martina", "sofia", "paula", "elena",
            "alba", "sara", "miguel", "alejandro", "pablo", "sergio", "adrian", "diego", "alvaro",
            "raquel", "cristina", "patricia", "nuria", "victor", "ivan", "ruben", "hector"
        ]
    },
    {
        id: "leet-base",
        label: "Leet base",
        fileName: "leet-base.txt",
        language: "mixed",
        source: "Curado local",
        note: "Variantes leet comunes para busqueda/consulta, no para cracking en esta vista.",
        entries: [
            "p@ssw0rd", "p4ssw0rd", "adm1n", "r00t", "s3cr3t", "l3tm31n", "w3lc0m3", "qwerty!",
            "dr4g0n", "m0nk3y", "trus7n01", "b4ckup", "d3v0ps", "cl0ud", "s3rv3r", "n3tw0rk",
            "m1thr1l", "f34n0r", "g0nd0r", "r1v3nd3ll", "m0rd0r", "p4l4nt1r"
        ]
    },
    {
        id: "web-admin",
        label: "Web admin",
        fileName: "web-admin.txt",
        language: "mixed",
        source: "Curado local",
        note: "Terminos de paneles web, CMS y administracion.",
        entries: [
            "admin", "administrator", "webadmin", "webmaster", "root", "manager", "editor", "author",
            "wordpress", "wpadmin", "drupal", "joomla", "magento", "prestashop", "panel", "cpanel",
            "plesk", "phpmyadmin", "adminer", "cms", "backend", "dashboard", "intranet", "portal",
            "login", "secure", "private", "members", "staff", "support"
        ]
    },
    {
        id: "database-terms",
        label: "Bases de datos",
        fileName: "database-terms.txt",
        language: "mixed",
        source: "Curado local",
        note: "Terminos frecuentes en cuentas y servicios de base de datos.",
        entries: [
            "mysql", "mariadb", "postgres", "postgresql", "oracle", "mssql", "sqlserver", "sqlite",
            "mongo", "mongodb", "redis", "elastic", "elasticsearch", "kibana", "cassandra", "neo4j",
            "database", "dbadmin", "readonly", "readwrite", "replica", "backup", "restore", "dump",
            "warehouse", "datalake", "schema", "tenant", "analytics", "reporting"
        ]
    }
];

export const johnDictionaryOptions = [
    ...johnDictionaryCatalog.map(item => ({
        value: item.id,
        label: `${item.label} | ${item.entries.length} entradas | ${item.source}`
    })),
    { value: "custom", label: "Personalizado cargado | fichero local | consulta" }
];

export function findJohnDictionary(id) {
    return johnDictionaryCatalog.find(item => item.id === id) || johnDictionaryCatalog[0];
}

export function dictionaryText(id) {
    return findJohnDictionary(id).entries.join("\n");
}

export function dictionaryFileName(id) {
    if (id === "custom") return "custom-wordlist.txt";
    return findJohnDictionary(id).fileName;
}

export function normalizeDictionaryLines(raw, limit = 100000) {
    return String(raw || "")
        .split(/\r?\n/)
        .map(line => line.trim())
        .filter(Boolean)
        .slice(0, Math.max(1, Number(limit) || 100000));
}

export function dictionaryEntriesFromIds(ids = []) {
    const selectedIds = Array.isArray(ids) ? ids : [ids];
    const seen = new Set();
    const entries = [];
    selectedIds.forEach(id => {
        if (id === "custom") return;
        findJohnDictionary(id).entries.forEach(entry => {
            if (seen.has(entry)) return;
            seen.add(entry);
            entries.push(entry);
        });
    });
    return entries;
}

export function filterDictionaryEntries(entries = [], {
    query = "",
    mode = "contains",
    caseSensitive = false,
    unique = true,
    sort = false,
    minLength = 0,
    maxLength = 0,
    limit = 1000
} = {}) {
    const seen = new Set();
    const needle = caseSensitive ? String(query || "") : String(query || "").toLowerCase();
    const min = Math.max(0, Number(minLength) || 0);
    const max = Math.max(0, Number(maxLength) || 0);
    const boundedLimit = Math.max(1, Math.min(100000, Number(limit) || 1000));
    let regex = null;

    if (mode === "regex" && needle) {
        try {
            regex = new RegExp(String(query), caseSensitive ? "" : "i");
        } catch (error) {
            return { entries: [], error: `Regex no valida: ${error.message}` };
        }
    }

    const filtered = [];
    for (const rawEntry of entries) {
        const entry = String(rawEntry || "").trim();
        if (!entry) continue;
        if (min && entry.length < min) continue;
        if (max && entry.length > max) continue;
        const comparable = caseSensitive ? entry : entry.toLowerCase();
        let matches = true;
        if (needle) {
            if (mode === "exact") matches = comparable === needle;
            else if (mode === "prefix") matches = comparable.startsWith(needle);
            else if (mode === "suffix") matches = comparable.endsWith(needle);
            else if (mode === "regex") matches = regex ? regex.test(entry) : false;
            else matches = comparable.includes(needle);
        }
        if (!matches) continue;
        if (unique && seen.has(comparable)) continue;
        seen.add(comparable);
        filtered.push(entry);
        if (filtered.length >= boundedLimit) break;
    }

    if (sort) {
        filtered.sort((a, b) => a.localeCompare(b, "es", { sensitivity: caseSensitive ? "variant" : "base" }));
    }

    return { entries: filtered, error: "" };
}

export function summarizeDictionaryEntries(entries = []) {
    const lengths = entries.map(item => String(item).length);
    const total = entries.length;
    const unique = new Set(entries.map(item => String(item).toLowerCase())).size;
    const min = lengths.length ? Math.min(...lengths) : 0;
    const max = lengths.length ? Math.max(...lengths) : 0;
    const average = lengths.length
        ? (lengths.reduce((sum, value) => sum + value, 0) / lengths.length).toFixed(1)
        : "0.0";

    return { total, unique, min, max, average };
}
