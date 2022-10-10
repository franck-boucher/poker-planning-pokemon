import { v4 as uuidv4 } from "uuid";
import { localDecrypt, localEncrypt, LocalStorageKeys } from "./localStorage";

export const getPlayerId = async () => {
  const playerId = await localDecrypt(LocalStorageKeys.playerId);
  if (playerId) return playerId;
  const newPlayerId = uuidv4();
  await localEncrypt(LocalStorageKeys.playerId, newPlayerId);
  return newPlayerId;
};
