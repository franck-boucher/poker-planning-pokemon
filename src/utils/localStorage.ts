import { decrypt, encrypt } from "./crypto";

const encryptionKey = import.meta.env.VITE_ENCRYPTION_KEY;

export const localDecrypt = async (key: string): Promise<string | null> => {
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

export const LocalStorageKeys = {
  playerId: "ppp_player_id",
};
