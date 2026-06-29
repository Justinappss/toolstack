// Local, persistent library of generated ads. Stores the actual image blob in
// IndexedDB (fal URLs expire and localStorage is too small for full images), so
// saved ads survive page reloads with no backend or signup.

const DB_NAME = "jdesigns-studio";
const STORE = "saved-ads";
const VERSION = 1;

export type SavedAd = {
  id: string;
  blob: Blob;
  brand: string;
  campaign: string;
  title: string;
  format: string;
  createdAt: number;
};

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE, { keyPath: "id" });
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function saveAd(ad: SavedAd): Promise<void> {
  const db = await openDb();
  try {
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, "readwrite");
      tx.objectStore(STORE).put(ad);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } finally {
    db.close();
  }
}

export async function listAds(): Promise<SavedAd[]> {
  const db = await openDb();
  try {
    const ads = await new Promise<SavedAd[]>((resolve, reject) => {
      const tx = db.transaction(STORE, "readonly");
      const req = tx.objectStore(STORE).getAll();
      req.onsuccess = () => resolve(req.result as SavedAd[]);
      req.onerror = () => reject(req.error);
    });
    return ads.sort((a, b) => b.createdAt - a.createdAt);
  } finally {
    db.close();
  }
}

export async function deleteAd(id: string): Promise<void> {
  const db = await openDb();
  try {
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, "readwrite");
      tx.objectStore(STORE).delete(id);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } finally {
    db.close();
  }
}
