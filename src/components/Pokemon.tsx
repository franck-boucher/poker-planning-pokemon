import { useTranslation } from "react-i18next";
import { PokemonType } from "../utils/types";

interface PokemonProps extends PokemonType {
  current: boolean;
}
export default function Pokemon({
  pokemon,
  pokemonSprite,
  pokemonLvl,
  current,
}: PokemonProps) {
  const { t } = useTranslation();
  return (
    <div
      className={`relative inline-block h-16 w-16 md:h-20 md:w-20 rounded-full ${
        current ? "ring-1 ring-gray-800" : "ring-1 ring-gray-300"
      }`}
    >
      <img src={pokemonSprite} alt={pokemon} title={pokemon} />
      <span
        className={`absolute bottom-0 right-0 text-xs px-1 rounded-md bg-white ${
          current ? "ring-1 ring-gray-800" : "ring-1 ring-gray-300"
        }`}
      >
        {t("pokemon.lvl")} {pokemonLvl}
      </span>
    </div>
  );
}
