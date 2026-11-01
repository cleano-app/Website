// Children's photos stay on this device: they're kept in the browser's own
// database and never uploaded. Nothing here throws; a browser that won't
// store them just has no photos.

const DB = "parsha-line";
const STORE = "photos";

function open(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function run<T>(mode: IDBTransactionMode, fn: (s: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  const db = await open();
  return new Promise((resolve, reject) => {
    const req = fn(db.transaction(STORE, mode).objectStore(STORE));
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

/** Photo data URLs by student id. */
export async function loadPhotos(): Promise<Record<string, string>> {
  try {
    const db = await open();
    return await new Promise((resolve) => {
      const out: Record<string, string> = {};
      const req = db.transaction(STORE, "readonly").objectStore(STORE).openCursor();
      req.onsuccess = () => {
        const c = req.result;
        if (!c) return resolve(out);
        if (typeof c.value === "string") out[String(c.key)] = c.value;
        c.continue();
      };
      req.onerror = () => resolve(out);
    });
  } catch {
    return {};
  }
}

export async function savePhoto(id: string, dataUrl: string): Promise<boolean> {
  try {
    await run("readwrite", (s) => s.put(dataUrl, id));
    return true;
  } catch {
    return false;
  }
}

export async function deletePhoto(id: string): Promise<void> {
  try {
    await run("readwrite", (s) => s.delete(id));
  } catch {
    // Nothing to remove.
  }
}
