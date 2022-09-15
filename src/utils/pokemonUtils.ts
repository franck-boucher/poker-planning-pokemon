const toJson = (response: Response) => response.json();

const getPokemonSpriteUrl = (id: number) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

const getPokemonSpeciesUrl = (id: number) =>
  `https://pokeapi.co/api/v2/pokemon-species/${id}/`;

const randomNumber = () => Math.floor(Math.random() * 150) + 1;

const randomUntilNotTaken = (takenIds: number[]) => {
  let random = randomNumber();
  while (takenIds.includes(random)) {
    random = randomNumber();
  }
  return random;
};

export const randomPokemon = async (takenIds: number[] = []) => {
  const random = randomUntilNotTaken(takenIds);

  const pokemonSprite = getPokemonSpriteUrl(random);

  const pokemonSpecies = await fetch(getPokemonSpeciesUrl(random)).then(toJson);
  const pokemon = pokemonSpecies.names.find(
    (name: any) => name.language.name === "fr"
  ).name;
  const pokemonId = random;

  return { pokemon, pokemonSprite, pokemonId };
};
