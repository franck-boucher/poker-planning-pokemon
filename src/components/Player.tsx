import { SimpleCard, SimpleCardProps } from "./Card";
import { PointCard } from "./CardRow";
import Pokemon from "./Pokemon";

interface PlayerProps {
  pokemon: string;
  pokemonSprite: string;
  vote: PointCard;
  top?: boolean;
  bottom?: boolean;
  revealed: boolean;
  isCurrentPlayer: boolean;
}
export default function Player({
  pokemon,
  pokemonSprite,
  vote,
  top = false,
  bottom = false,
  revealed,
  isCurrentPlayer,
}: PlayerProps) {
  const mode: SimpleCardProps["mode"] = (() => {
    if (revealed && vote) return "default";
    return !!vote ? "hidden" : "empty";
  })();
  return (
    <div className="flex flex-col gap-4 items-center">
      {top && <SimpleCard mode={mode}>{vote}</SimpleCard>}
      <Pokemon {...{ pokemon, pokemonSprite, current: isCurrentPlayer }} />
      {bottom && <SimpleCard mode={mode}>{vote}</SimpleCard>}
    </div>
  );
}
