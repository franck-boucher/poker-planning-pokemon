import { v4 as uuidv4 } from "uuid";
import { localDecrypt, localEncrypt, LocalStorageKeys } from "./localStorage";
import { PokedexEntry } from "./types";

export const getPlayerId = async () => {
  const playerId = await localDecrypt(LocalStorageKeys.playerId);
  if (playerId) return playerId;
  const newPlayerId = uuidv4();
  await localEncrypt(LocalStorageKeys.playerId, newPlayerId);
  return newPlayerId;
};

export const getPokedex = async (): Promise<PokedexEntry[]> => {
  const pokedex = await localDecrypt(LocalStorageKeys.pokedex);
  if (pokedex) return JSON.parse(pokedex);
  return [];
};

export const updatePokedexEntry = async (entry: PokedexEntry) => {
  const pokedex = await getPokedex();
  const currentEntry =
    pokedex.find((pokemon) => pokemon.pokemonId === entry.pokemonId) || null;
  if (!currentEntry || currentEntry.pokemonLvl < entry.pokemonLvl) {
    const newPokedex = pokedex.filter(
      (pokemon) => pokemon.pokemonId !== entry.pokemonId
    );
    newPokedex.push(entry);
    await localEncrypt(LocalStorageKeys.pokedex, JSON.stringify(newPokedex));
  }
};
