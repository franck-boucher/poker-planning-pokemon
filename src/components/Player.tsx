import { PlayerType } from "../utils/types";
import { SimpleCard, SimpleCardProps } from "./Card";
import { PointCard } from "./CardRow";
import Pokemon from "./Pokemon";

interface PlayerProps {
  player: PlayerType;
  top?: boolean;
  bottom?: boolean;
  revealed: boolean;
  isCurrentPlayer: boolean;
  isSpectator: boolean;
}
export default function Player({
  player,
  top = false,
  bottom = false,
  revealed,
  isCurrentPlayer,
  isSpectator,
}: PlayerProps) {
  const mode: SimpleCardProps["mode"] = (() => {
    if (isSpectator) return "spectator";
    if (revealed && player.vote) return "default";
    return !!player.vote ? "hidden" : "empty";
  })();
  return (
    <div className="flex flex-col gap-4 items-center">
      {top && <SimpleCard mode={mode}>{player.vote}</SimpleCard>}
      <Pokemon {...{ ...player, current: isCurrentPlayer }} />
      {bottom && <SimpleCard mode={mode}>{player.vote}</SimpleCard>}
    </div>
  );
}
