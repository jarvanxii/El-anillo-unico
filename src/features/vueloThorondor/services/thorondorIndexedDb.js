const DB_NAME = "thorondor-siem-db";
const DB_VERSION = 1;
const STORE_NAMES = {
  agents: "agents",
  snapshots: "snapshots",
  logs: "logs",
  events: "events",
  alerts: "alerts",
  rules: "rules",
  history: "history",
  meta: "meta"
};

let dbPromise = null;

export function openThorondorDb() {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains(STORE_NAMES.agents)) {
        db.createObjectStore(STORE_NAMES.agents, { keyPath: "id" });
      }

      if (!db.objectStoreNames.contains(STORE_NAMES.snapshots)) {
        const store = db.createObjectStore(STORE_NAMES.snapshots, { keyPath: "id" });
        store.createIndex("agentId", "agentId", { unique: false });
        store.createIndex("timestamp", "timestamp", { unique: false });
      }

      if (!db.objectStoreNames.contains(STORE_NAMES.logs)) {
        const store = db.createObjectStore(STORE_NAMES.logs, { keyPath: "id" });
        store.createIndex("agentId", "agentId", { unique: false });
        store.createIndex("timestamp", "timestamp", { unique: false });
      }

      if (!db.objectStoreNames.contains(STORE_NAMES.events)) {
        const store = db.createObjectStore(STORE_NAMES.events, { keyPath: "id" });
        store.createIndex("agentId", "agentId", { unique: false });
        store.createIndex("timestamp", "timestamp", { unique: false });
      }

      if (!db.objectStoreNames.contains(STORE_NAMES.alerts)) {
        const store = db.createObjectStore(STORE_NAMES.alerts, { keyPath: "id" });
        store.createIndex("agentId", "agentId", { unique: false });
      }

      if (!db.objectStoreNames.contains(STORE_NAMES.rules)) {
        db.createObjectStore(STORE_NAMES.rules, { keyPath: "id" });
      }

      if (!db.objectStoreNames.contains(STORE_NAMES.history)) {
        const store = db.createObjectStore(STORE_NAMES.history, { keyPath: "id" });
        store.createIndex("agentId", "agentId", { unique: false });
      }

      if (!db.objectStoreNames.contains(STORE_NAMES.meta)) {
        db.createObjectStore(STORE_NAMES.meta, { keyPath: "key" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });

  return dbPromise;
}

export async function putMany(storeName, values) {
  if (!Array.isArray(values) || !values.length) return;
  const db = await openThorondorDb();

  await runTransaction(db, storeName, "readwrite", (store) => {
    values.forEach((value) => store.put(value));
  });
}

export async function putOne(storeName, value) {
  if (!value) return;
  const db = await openThorondorDb();
  await runTransaction(db, storeName, "readwrite", (store) => {
    store.put(value);
  });
}

export async function deleteOne(storeName, key) {
  const db = await openThorondorDb();
  await runTransaction(db, storeName, "readwrite", (store) => {
    store.delete(key);
  });
}

export async function clearStore(storeName) {
  const db = await openThorondorDb();
  await runTransaction(db, storeName, "readwrite", (store) => {
    store.clear();
  });
}

export async function getAll(storeName) {
  const db = await openThorondorDb();
  return runRead(db, storeName, () => true);
}

export async function getMeta(key, fallback = null) {
  const db = await openThorondorDb();
  const result = await runReadSingle(db, STORE_NAMES.meta, key);
  return result?.value ?? fallback;
}

export async function setMeta(key, value) {
  await putOne(STORE_NAMES.meta, { key, value });
}

export async function loadThorondorPersistence() {
  const [
    agents,
    snapshots,
    logs,
    events,
    alerts,
    rules,
    history,
    lastSweepAt,
    generatorDraft
  ] = await Promise.all([
    getAll(STORE_NAMES.agents),
    getAll(STORE_NAMES.snapshots),
    getAll(STORE_NAMES.logs),
    getAll(STORE_NAMES.events),
    getAll(STORE_NAMES.alerts),
    getAll(STORE_NAMES.rules),
    getAll(STORE_NAMES.history),
    getMeta("lastSweepAt", null),
    getMeta("generatorDraft", null)
  ]);

  return {
    agents,
    snapshots,
    logs,
    events,
    alerts,
    rules,
    history,
    lastSweepAt,
    generatorDraft
  };
}

export async function sweepThorondorPersistence(cutoffIso) {
  const db = await openThorondorDb();
  const stores = [STORE_NAMES.snapshots, STORE_NAMES.logs, STORE_NAMES.events, STORE_NAMES.history];

  for (const storeName of stores) {
    const items = await getAll(storeName);
    const stale = items.filter((item) => item?.timestamp && item.timestamp < cutoffIso);
    await runTransaction(db, storeName, "readwrite", (store) => {
      stale.forEach((item) => store.delete(item.id));
    });
  }

  await setMeta("lastSweepAt", new Date().toISOString());
}

function runTransaction(db, storeName, mode, callback) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, mode);
    const store = transaction.objectStore(storeName);
    callback(store);
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
}

function runRead(db, storeName) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readonly");
    const store = transaction.objectStore(storeName);
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
}

function runReadSingle(db, storeName, key) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readonly");
    const store = transaction.objectStore(storeName);
    const request = store.get(key);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export { STORE_NAMES };
