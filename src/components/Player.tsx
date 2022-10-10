import { SimpleCard, SimpleCardProps } from "./Card";
import { PointCard } from "./CardRow";
import Pokemon from "./Pokemon";

interface PlayerProps {
  pokemon: string;
  pokemonSprite: string;
  pokemonLvl: number;
  vote: PointCard;
  top?: boolean;
  bottom?: boolean;
  revealed: boolean;
  isCurrentPlayer: boolean;
  isSpectator: boolean;
}
export default function Player({
  pokemon,
  pokemonSprite,
  pokemonLvl,
  vote,
  top = false,
  bottom = false,
  revealed,
  isCurrentPlayer,
  isSpectator,
}: PlayerProps) {
  const mode: SimpleCardProps["mode"] = (() => {
    if (isSpectator) return "spectator";
    if (revealed && vote) return "default";
    return !!vote ? "hidden" : "empty";
  })();
  return (
    <div className="flex flex-col gap-4 items-center">
      {top && <SimpleCard mode={mode}>{vote}</SimpleCard>}
      <Pokemon
        {...{ pokemon, pokemonSprite, pokemonLvl, current: isCurrentPlayer }}
      />
      {bottom && <SimpleCard mode={mode}>{vote}</SimpleCard>}
    </div>
  );
}
