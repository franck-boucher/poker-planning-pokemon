import { PlayerType } from "../utils/types";
import Player from "./Player";

interface PlayerRowProps {
  players: PlayerType[];
  top?: boolean;
  bottom?: boolean;
  revealed: boolean;
  currentPlayerId: string;
}

export const PlayerRow = ({
  players,
  top,
  bottom,
  revealed,
  currentPlayerId,
}: PlayerRowProps) => {
  return (
    <div className="flex gap-10 justify-center">
      {players.map(({ pokemon, pokemonSprite, id, vote }) => (
        <Player
          key={id}
          {...{ pokemon, pokemonSprite, vote, revealed, top, bottom }}
          isCurrentPlayer={currentPlayerId === id}
        />
      ))}
    </div>
  );
};
