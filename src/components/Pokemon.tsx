interface PokemonProps {
  pokemon: string;
  pokemonSprite: string;
  selected?: boolean;
}
export default function Pokemon({ pokemon, pokemonSprite }: PokemonProps) {
  return (
    <div className="inline-block h-20 w-20 rounded-full ring-1 ring-gray-300">
      <img src={pokemonSprite} alt={pokemon} title={pokemon} />
    </div>
  );
}
