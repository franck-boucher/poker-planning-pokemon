import { useTranslation } from "react-i18next";
import { usePokeApiLocale } from "../utils/pokemonUtils";
import { PokemonType } from "../utils/types";

interface PokemonProps extends PokemonType {
  current?: boolean;
  withNumberId?: boolean;
}
export default function Pokemon({
  pokemonId,
  pokemon,
  pokemonSprite,
  pokemonLvl,
  current = false,
  withNumberId = false,
}: PokemonProps) {
  const { t } = useTranslation();
  const pokeApiLocale = usePokeApiLocale();
  return (
    <div
      className={`relative inline-block h-16 w-16 md:h-20 md:w-20 rounded-full ${
        current ? "ring-1 ring-gray-800" : "ring-1 ring-gray-300"
      }`}
    >
      {withNumberId && (
        <span
          className={`absolute top-0 left-0 text-xs px-1 rounded-md bg-white ${
            current ? "ring-1 ring-gray-800" : "ring-1 ring-gray-300"
          }`}
        >
          #{pokemonId}
        </span>
      )}
      <img
        src={pokemonSprite}
        alt={pokemon[pokeApiLocale]}
        title={pokemon[pokeApiLocale]}
      />
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
