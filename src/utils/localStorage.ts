import { decrypt, encrypt } from "./crypto";

const encryptionKey = import.meta.env.VITE_ENCRYPTION_KEY;

export const localDecrypt = async (key: string): Promise<string | null> => {
  clearOldStorage(); // remove in a future version
  const encrypted = localStorage.getItem(key);
  if (!encrypted) return null;
  return await decrypt(encrypted, encryptionKey);
};

export const localEncrypt = async (
  key: string,
  value: string
): Promise<void> => {
  const encrypted = await encrypt(value, encryptionKey);
  localStorage.setItem(key, encrypted);
};

// Previous keys: ppp_player_id, ppp_pokedex
const clearOldStorage = () => {
  if (
    localStorage.getItem("ppp_player_id") ||
    localStorage.getItem("ppp_pokedex")
  ) {
    localStorage.clear();
  }
};

export const LocalStorageKeys = {
  playerId: "ppp_playerId",
  pokedex: "ppp_pokedexEntries",
};
