import { PointCard } from "../components/CardRow";

export type GameInfos = {
  status: "revealed" | "hidden" | "countdown";
};

export type PokemonType = {
  pokemon: {
    en: string;
    fr: string;
  };
  pokemonId: number;
  pokemonSprite: string;
  pokemonLvl: number;
};

export type PlayerType = PokemonType & {
  id: string;
  vote: PointCard;
  type: "player" | "spectator";
};
