import { findRedTeamHashMode } from "./hashcatJohnCatalog";

export const redTeamAttackModes = [
    {
        value: "straight",
        label: "Diccionario directo",
        hashcatMode: "0",
        johnMode: "--wordlist",
        local: true,
        summary: "Prueba cada palabra tal cual. Es la base de CrackStation, Hashes, John y Hashcat."
    },
    {
        value: "rules",
        label: "Diccionario + reglas",
        hashcatMode: "0 + -r",
        johnMode: "--wordlist --rules",
        local: true,
        summary: "Manglea palabras: mayusculas, sufijos, leet, anos y variantes humanas frecuentes."
    },
    {
        value: "mask",
        label: "Mascara",
        hashcatMode: "3",
        johnMode: "--mask / --incremental",
        local: true,
        summary: "Genera candidatos por patron, por ejemplo ?u?l?l?l?l?d?d."
    },
    {
        value: "hybridWordMask",
        label: "Hibrido wordlist + mascara",
        hashcatMode: "6",
        johnMode: "--wordlist --mask",
        local: true,
        summary: "Concatena palabra + patron. Ejemplo: password + ?d?d?d."
    },
    {
        value: "hybridMaskWord",
        label: "Hibrido mascara + wordlist",
        hashcatMode: "7",
        johnMode: "--mask + --wordlist",
        local: true,
        summary: "Concatena patron + palabra. Ejemplo: ?u?l?l + empresa."
    },
    {
        value: "combinator",
        label: "Combinator",
        hashcatMode: "1",
        johnMode: "--wordlist + --wordlist",
        local: true,
        summary: "Combina dos listas: nombre + ano, proyecto + sufijo, marca + entorno."
    },
    {
        value: "association",
        label: "Association",
        hashcatMode: "9",
        johnMode: "single/contextual",
        local: false,
        summary: "Usa contexto por hash o identidad. Es util con usuario, host, correo o metadatos."
    },
    {
        value: "johnSingle",
        label: "John single crack",
        hashcatMode: "rules/context",
        johnMode: "--single",
        local: false,
        summary: "John genera candidatos desde login, GECOS, hostname y campos del hash."
    },
    {
        value: "johnIncremental",
        label: "John incremental",
        hashcatMode: "3 equivalente",
        johnMode: "--incremental",
        local: false,
        summary: "Busqueda incremental guiada por charsets estadisticos de John."
    },
    {
        value: "johnExternal",
        label: "John external",
        hashcatMode: "custom kernel/rules",
        johnMode: "--external",
        local: false,
        summary: "Modo programable de John para politicas o generadores a medida."
    }
];

export const redTeamRulePresets = [
    {
        value: "exact",
        label: "Exacto: solo wordlist",
        hashcatRule: "",
        johnRule: "",
        summary: "No modifica las palabras."
    },
    {
        value: "case",
        label: "Case: lower/upper/capitalizar",
        hashcatRule: "c T0 l u",
        johnRule: "--rules=single",
        summary: "Variantes simples de mayusculas y minusculas."
    },
    {
        value: "common",
        label: "Comunes: case + sufijos",
        hashcatRule: "$1 $12 $123 $! $2026",
        johnRule: "--rules=jumbo",
        summary: "Anade sufijos humanos frecuentes."
    },
    {
        value: "leet",
        label: "Leet: sustituciones y sufijos",
        hashcatRule: "sa@ se3 si1 so0 ss$ st7",
        johnRule: "--rules=wordlist",
        summary: "Sustituye letras por simbolos parecidos y anade sufijos."
    },
    {
        value: "append-digits",
        label: "Digitos finales 0-999",
        hashcatRule: "$?d $?d?d $?d?d?d",
        johnRule: "--rules=digits",
        summary: "Simula patrones tipo verano2026, admin01 o clave007."
    },
    {
        value: "seasons-years",
        label: "Temporadas + anos",
        hashcatRule: "$2024 $2025 $2026 $! $?",
        johnRule: "--rules=extra",
        summary: "Anade anos recientes, signos y palabras de temporada."
    },
    {
        value: "best64-lite",
        label: "Best64 lite",
        hashcatRule: "-r rules/best64.rule",
        johnRule: "--rules=best64",
        summary: "Subset local inspirado en reglas best64: case, reverse, duplicate, leet y sufijos."
    }
];

export const redTeamDefaultCharsets = {
    "1": "?l?d",
    "2": "?u?l",
    "3": "?d?s",
    "4": "aeiourstln0123456789"
};

const BUILTIN_CHARSETS = {
    "?l": "abcdefghijklmnopqrstuvwxyz",
    "?u": "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    "?d": "0123456789",
    "?h": "0123456789abcdef",
    "?H": "0123456789ABCDEF",
    "?s": " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"
};
BUILTIN_CHARSETS["?a"] = `${BUILTIN_CHARSETS["?l"]}${BUILTIN_CHARSETS["?u"]}${BUILTIN_CHARSETS["?d"]}${BUILTIN_CHARSETS["?s"]}`;
BUILTIN_CHARSETS["?b"] = Array.from({ length: 256 }, (_, index) => String.fromCharCode(index)).join("");

export function formatBigInt(value) {
    return BigInt(value || 0).toLocaleString("es-ES");
}

export function parseRedTeamWordlist(raw, limit = 50000) {
    const seen = new Set();
    const words = [];
    String(raw || "").split(/\r?\n/).forEach(line => {
        const value = line.trim();
        if (!value || seen.has(value) || words.length >= limit) return;
        seen.add(value);
        words.push(value);
    });
    return words;
}

function addCandidate(candidates, seen, value, limit) {
    const candidate = String(value ?? "").trim();
    if (!candidate || seen.has(candidate) || candidates.length >= limit) return;
    seen.add(candidate);
    candidates.push(candidate);
}

function capitalize(value) {
    const text = String(value || "");
    return text ? `${text.charAt(0).toUpperCase()}${text.slice(1).toLowerCase()}` : "";
}

function leet(value) {
    const replacements = { a: "@", e: "3", i: "1", o: "0", s: "$", t: "7" };
    return String(value || "").replace(/[aeiost]/gi, char => {
        const replacement = replacements[char.toLowerCase()];
        return char === char.toUpperCase() ? replacement.toUpperCase() : replacement;
    });
}

function uniqueChars(value) {
    return [...new Set(String(value || "").split(""))].join("");
}

function expandCharsetExpression(expression, customCharsets = {}) {
    const input = String(expression || "");
    let output = "";
    for (let index = 0; index < input.length; index += 1) {
        if (input[index] === "?" && index + 1 < input.length) {
            const token = input.slice(index, index + 2);
            if (BUILTIN_CHARSETS[token]) {
                output += BUILTIN_CHARSETS[token];
                index += 1;
                continue;
            }
            if (/^\?[1-4]$/.test(token)) {
                output += expandCharsetExpression(customCharsets[token[1]] || "", customCharsets);
                index += 1;
                continue;
            }
            if (token === "??") {
                output += "?";
                index += 1;
                continue;
            }
        }
        output += input[index];
    }
    return uniqueChars(output);
}

export function parseRedTeamMask(mask, customCharsets = {}) {
    const source = String(mask || "");
    const tokens = [];
    for (let index = 0; index < source.length; index += 1) {
        const char = source[index];
        if (char === "?" && index + 1 < source.length) {
            const token = source.slice(index, index + 2);
            if (token === "??") {
                tokens.push({ label: "?", chars: "?" });
                index += 1;
                continue;
            }
            if (BUILTIN_CHARSETS[token]) {
                tokens.push({ label: token, chars: BUILTIN_CHARSETS[token] });
                index += 1;
                continue;
            }
            if (/^\?[1-4]$/.test(token)) {
                const chars = expandCharsetExpression(customCharsets[token[1]] || "", customCharsets);
                tokens.push({ label: token, chars });
                index += 1;
                continue;
            }
        }
        tokens.push({ label: char, chars: char });
    }
    return tokens.map(token => ({
        ...token,
        chars: uniqueChars(token.chars)
    }));
}

export function estimateMaskKeyspace(mask, customCharsets = {}) {
    const tokens = parseRedTeamMask(mask, customCharsets);
    return tokens.reduce((total, token) => total * BigInt(Math.max(1, token.chars.length)), 1n);
}

export function summarizeMask(mask, customCharsets = {}) {
    const tokens = parseRedTeamMask(mask, customCharsets);
    return tokens.map(token => `${token.label}:${token.chars.length}`).join(" | ");
}

export function generateMaskCandidates(mask, customCharsets = {}, limit = 10000) {
    const tokens = parseRedTeamMask(mask, customCharsets);
    if (!tokens.length) return [];
    if (tokens.some(token => !token.chars.length)) return [];

    const keyspace = estimateMaskKeyspace(mask, customCharsets);
    const max = BigInt(Math.max(0, limit));
    const count = keyspace < max ? Number(keyspace) : Number(max);
    const candidates = [];

    for (let number = 0; number < count; number += 1) {
        let cursor = BigInt(number);
        const chars = Array(tokens.length).fill("");
        for (let position = tokens.length - 1; position >= 0; position -= 1) {
            const alphabet = tokens[position].chars;
            const base = BigInt(alphabet.length);
            chars[position] = alphabet[Number(cursor % base)];
            cursor /= base;
        }
        candidates.push(chars.join(""));
    }
    return candidates;
}

export function applyRulePreset(words, presetId = "exact", limit = 50000) {
    const preset = redTeamRulePresets.find(item => item.value === presetId) || redTeamRulePresets[0];
    const suffixes = ["1", "12", "123", "1234", "!", "?", ".", "@", "2024", "2025", "2026", "01", "007"];
    const seasons = ["verano", "invierno", "primavera", "otono", "summer", "winter", "spring", "fall"];
    const seen = new Set();
    const candidates = [];

    words.forEach(word => {
        if (candidates.length >= limit) return;
        addCandidate(candidates, seen, word, limit);
        if (preset.value === "exact") return;

        const lower = word.toLowerCase();
        const upper = word.toUpperCase();
        const capitalized = capitalize(word);
        const reversed = [...word].reverse().join("");
        [lower, upper, capitalized].forEach(item => addCandidate(candidates, seen, item, limit));

        if (["common", "append-digits", "seasons-years", "best64-lite", "leet"].includes(preset.value)) {
            [word, lower, capitalized].forEach(prefix => {
                suffixes.forEach(suffix => addCandidate(candidates, seen, `${prefix}${suffix}`, limit));
            });
        }

        if (["seasons-years", "best64-lite"].includes(preset.value)) {
            seasons.forEach(season => {
                ["2024", "2025", "2026", "!", "01"].forEach(suffix =>
                    addCandidate(candidates, seen, `${season}${suffix}`, limit)
                );
            });
        }

        if (["leet", "best64-lite"].includes(preset.value)) {
            const leetWord = leet(word);
            addCandidate(candidates, seen, leetWord, limit);
            suffixes.slice(0, 8).forEach(suffix => addCandidate(candidates, seen, `${leetWord}${suffix}`, limit));
        }

        if (preset.value === "best64-lite") {
            [reversed, `${word}${word}`, `${capitalized}!`, `${lower}_${new Date().getFullYear()}`]
                .forEach(item => addCandidate(candidates, seen, item, limit));
        }
    });

    return candidates;
}

function combineLists(left, right, limit, joiner = "") {
    const seen = new Set();
    const candidates = [];
    for (const a of left) {
        for (const b of right) {
            addCandidate(candidates, seen, `${a}${joiner}${b}`, limit);
            if (candidates.length >= limit) return candidates;
        }
    }
    return candidates;
}

export function generateRedTeamCandidates({
    attackMode = "straight",
    primaryWordlist = "",
    secondaryWordlist = "",
    mask = "",
    customCharsets = {},
    rulePreset = "exact",
    limit = 50000
} = {}) {
    const boundedLimit = Math.max(1, Math.min(500000, Number(limit) || 50000));
    const primary = parseRedTeamWordlist(primaryWordlist, boundedLimit);
    const secondary = parseRedTeamWordlist(secondaryWordlist, boundedLimit);
    const warnings = [];
    let candidates = [];
    let keyspace = 0n;

    if (attackMode === "straight") {
        candidates = applyRulePreset(primary, "exact", boundedLimit);
        keyspace = BigInt(primary.length);
    } else if (attackMode === "rules") {
        candidates = applyRulePreset(primary, rulePreset, boundedLimit);
        keyspace = BigInt(Math.max(primary.length, candidates.length));
    } else if (attackMode === "mask") {
        keyspace = estimateMaskKeyspace(mask, customCharsets);
        candidates = generateMaskCandidates(mask, customCharsets, boundedLimit);
    } else if (attackMode === "hybridWordMask") {
        const maskCandidates = generateMaskCandidates(mask, customCharsets, Math.min(5000, boundedLimit));
        keyspace = BigInt(primary.length) * estimateMaskKeyspace(mask, customCharsets);
        candidates = combineLists(primary, maskCandidates, boundedLimit);
    } else if (attackMode === "hybridMaskWord") {
        const maskCandidates = generateMaskCandidates(mask, customCharsets, Math.min(5000, boundedLimit));
        keyspace = estimateMaskKeyspace(mask, customCharsets) * BigInt(primary.length);
        candidates = combineLists(maskCandidates, primary, boundedLimit);
    } else if (attackMode === "combinator") {
        keyspace = BigInt(primary.length) * BigInt(secondary.length);
        candidates = combineLists(primary, secondary, boundedLimit);
    } else {
        warnings.push("Este modo se documenta y genera comandos, pero no se ejecuta como cracker local en el navegador.");
    }

    if (keyspace > BigInt(candidates.length)) {
        warnings.push(`Vista local limitada a ${candidates.length.toLocaleString("es-ES")} candidatos de ${formatBigInt(keyspace)} posibles.`);
    }
    if (!candidates.length && ["straight", "rules", "hybridWordMask", "hybridMaskWord", "combinator"].includes(attackMode)) {
        warnings.push("Carga una wordlist primaria para generar candidatos.");
    }
    if (!candidates.length && attackMode === "mask") {
        warnings.push("Define una mascara valida, por ejemplo ?l?l?l?l?d?d.");
    }

    return {
        candidates,
        keyspace,
        keyspaceLabel: formatBigInt(keyspace),
        warnings,
        maskSummary: mask ? summarizeMask(mask, customCharsets) : "",
        primaryCount: primary.length,
        secondaryCount: secondary.length
    };
}

function shellQuote(value) {
    const text = String(value || "");
    if (!text) return "''";
    if (/^[A-Za-z0-9_./:@%+=,-]+$/.test(text)) return text;
    return `'${text.replace(/'/g, "'\\''")}'`;
}

function hashModeOrAuto(hashModeId, detectedModes = []) {
    if (hashModeId && hashModeId !== "auto") return findRedTeamHashMode(hashModeId);
    return detectedModes[0] || null;
}

export function buildHashcatCommand({
    hashModeId = "auto",
    detectedModes = [],
    attackMode = "straight",
    rulePreset = "exact",
    mask = "",
    customCharsets = {},
    optimized = true,
    username = false,
    workload = 3,
    increment = false,
    hashFile = "hashes.txt",
    wordlistFile = "wordlist.txt",
    secondWordlistFile = "wordlist2.txt",
    outputFile = "found.txt"
} = {}) {
    const hashMode = hashModeOrAuto(hashModeId, detectedModes);
    const attack = redTeamAttackModes.find(item => item.value === attackMode) || redTeamAttackModes[0];
    const rule = redTeamRulePresets.find(item => item.value === rulePreset) || redTeamRulePresets[0];
    const parts = ["hashcat"];
    if (hashMode?.hashcatMode) parts.push("-m", hashMode.hashcatMode);
    if (/^\d+$/.test(String(attack.hashcatMode))) parts.push("-a", attack.hashcatMode);
    if (optimized) parts.push("-O");
    if (username) parts.push("--username");
    if (workload) parts.push("-w", String(workload));
    if (increment && ["mask", "hybridWordMask", "hybridMaskWord"].includes(attackMode)) parts.push("--increment");
    ["1", "2", "3", "4"].forEach(id => {
        const value = customCharsets[id];
        if (value) parts.push(`-${id}`, shellQuote(value));
    });
    parts.push(shellQuote(hashFile));

    if (attackMode === "mask") {
        parts.push(shellQuote(mask || "?l?l?l?l?d?d"));
    } else if (attackMode === "hybridWordMask") {
        parts.push(shellQuote(wordlistFile), shellQuote(mask || "?d?d?d"));
    } else if (attackMode === "hybridMaskWord") {
        parts.push(shellQuote(mask || "?u?l?l"), shellQuote(wordlistFile));
    } else if (attackMode === "combinator") {
        parts.push(shellQuote(wordlistFile), shellQuote(secondWordlistFile));
    } else {
        parts.push(shellQuote(wordlistFile));
    }

    if (attackMode === "rules" && rule.hashcatRule) {
        if (rule.hashcatRule.startsWith("-r ")) {
            parts.push(...rule.hashcatRule.split(/\s+/));
        } else {
            parts.push("-r", shellQuote(`feanor-${rule.value}.rule`));
        }
    }
    parts.push("--outfile", shellQuote(outputFile));
    return parts.join(" ");
}

export function buildJohnCommand({
    hashModeId = "auto",
    detectedModes = [],
    attackMode = "straight",
    rulePreset = "exact",
    mask = "",
    username = false,
    increment = false,
    hashFile = "hashes.txt",
    wordlistFile = "wordlist.txt",
    secondWordlistFile = "wordlist2.txt",
    potFile = "john.pot"
} = {}) {
    const hashMode = hashModeOrAuto(hashModeId, detectedModes);
    const rule = redTeamRulePresets.find(item => item.value === rulePreset) || redTeamRulePresets[0];
    const parts = ["john"];
    if (hashMode?.johnFormat) parts.push(`--format=${hashMode.johnFormat}`);
    if (username) parts.push("--users=0");
    parts.push(`--pot=${shellQuote(potFile)}`);

    if (attackMode === "mask") {
        parts.push(`--mask=${shellQuote(mask || "?l?l?l?l?d?d")}`);
        if (increment) parts.push("--incremental");
    } else if (attackMode === "johnSingle" || attackMode === "association") {
        parts.push("--single");
    } else if (attackMode === "johnIncremental") {
        parts.push("--incremental");
    } else if (attackMode === "johnExternal") {
        parts.push("--external=filter");
    } else if (attackMode === "combinator") {
        parts.push(`--wordlist=${shellQuote(wordlistFile)}`, "--rules=wordlist", "--dupe-suppression");
    } else {
        parts.push(`--wordlist=${shellQuote(wordlistFile)}`);
        if (attackMode === "rules" && rule.johnRule) parts.push(rule.johnRule);
        if (attackMode === "hybridWordMask" || attackMode === "hybridMaskWord") parts.push(`--mask=${shellQuote(mask || "?d?d?d")}`);
    }

    parts.push(shellQuote(hashFile));
    return parts.join(" ");
}

export function buildRedTeamWorkflowLines({
    hashMode,
    attackMode,
    candidatePlan,
    detectedModes = []
} = {}) {
    const detected = detectedModes.length
        ? detectedModes.map(item => `${item.label} (${item.hashcatMode ? `-m ${item.hashcatMode}` : "sin modo"})`).join(", ")
        : "Sin deteccion automatica clara";
    const selected = hashMode?.label || "Auto";
    const attack = redTeamAttackModes.find(item => item.value === attackMode) || redTeamAttackModes[0];
    return [
        `Tipo detectado: ${detected}`,
        `Tipo seleccionado: ${selected}`,
        `Ataque: ${attack.label} (${attack.hashcatMode} / ${attack.johnMode})`,
        `Keyspace estimado: ${candidatePlan?.keyspaceLabel || "N/D"}`,
        `Candidatos locales generados: ${(candidatePlan?.candidates?.length || 0).toLocaleString("es-ES")}`,
        "Para trabajo real: separar hashes autorizados, wordlists, reglas, potfile y evidencias de founds.",
        "Despues de un FOUND: rotar credencial, invalidar sesiones, revisar reutilizacion y migrar hashes rapidos a KDF con salt unico."
    ];
}
