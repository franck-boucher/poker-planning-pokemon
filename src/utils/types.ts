import { PointCard } from "../components/CardRow";

export type GameInfos = {
  revealed: boolean;
};

export type PlayerType = {
  id: string;
  pokemon: string;
  pokemonId: number;
  pokemonSprite: string;
  vote: PointCard;
};
