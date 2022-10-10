import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { PokemonType } from "./types";

const toJson = (response: Response) => response.json();

export const getPokemonSpriteUrl = (id: number) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

const getPokemonSpeciesUrl = (id: number) =>
  `https://pokeapi.co/api/v2/pokemon-species/${id}/`;

const randomNumber = (from: number, to: number) =>
  Math.floor(Math.random() * to) + from;

export const randomUntilNotTaken = (takenIds: number[]) => {
  let random = randomNumber(1, 150);
  while (takenIds.includes(random)) {
    random = randomNumber(1, 150);
  }
  return random;
};

export const randomPokemon = async (
  takenIds: number[] = []
): Promise<PokemonType> => {
  const random = randomUntilNotTaken(takenIds);

  const pokemonSprite = getPokemonSpriteUrl(random);

  const pokemonSpecies = await fetch(getPokemonSpeciesUrl(random)).then(toJson);
  const fr = pokemonSpecies.names.find(
    (name: any) => name.language.name === "fr"
  ).name;
  const en = pokemonSpecies.names.find(
    (name: any) => name.language.name === "en"
  ).name;
  const pokemonId = random;

  const pokemonLvl = randomNumber(1, 100);

  return { pokemon: { fr, en }, pokemonSprite, pokemonId, pokemonLvl };
};

export const usePokeApiLocale = (): "fr" | "en" => {
  const { i18n } = useTranslation();
  const locale = useMemo(() => {
    if (i18n.language.toLowerCase().includes("fr")) return "fr";
    return "en";
  }, [i18n.language]);
  return locale;
};
