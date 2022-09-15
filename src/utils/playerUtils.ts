import { v4 as uuidv4 } from "uuid";

export const getPlayerId = () => {
  const playerId = localStorage.getItem("playerId");
  if (playerId) return playerId;
  const newPlayerId = uuidv4();
  localStorage.setItem("playerId", newPlayerId);
  return newPlayerId;
};
