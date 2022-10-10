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
      {players.map((player) => (
        <Player
          key={player.id}
          {...{
            player,
            revealed,
            top,
            bottom,
          }}
          isCurrentPlayer={currentPlayerId === player.id}
          isSpectator={player.type === "spectator"}
        />
      ))}
    </div>
  );
};
