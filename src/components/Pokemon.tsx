interface PokemonProps {
  pokemon: string;
  pokemonSprite: string;
  selected?: boolean;
  current: boolean;
}
export default function Pokemon({
  pokemon,
  pokemonSprite,
  current,
}: PokemonProps) {
  return (
    <div
      className={`inline-block h-20 w-20 rounded-full ${
        current ? "ring-1 ring-gray-800" : "ring-1 ring-gray-300"
      }`}
    >
      <img src={pokemonSprite} alt={pokemon} title={pokemon} />
    </div>
  );
}
