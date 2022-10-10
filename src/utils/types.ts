import { PointCard } from "../components/CardRow";

export type GameInfos = {
  status: "revealed" | "hidden" | "countdown";
};

export type PlayerType = {
  id: string;
  pokemon: string;
  pokemonId: number;
  pokemonSprite: string;
  pokemonLvl: number;
  vote: PointCard;
  type: "player" | "spectator";
};
