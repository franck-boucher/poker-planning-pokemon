const toJson = (response: Response) => response.json();

const getPokemonSpriteUrl = (id: number) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

const getPokemonSpeciesUrl = (id: number) =>
  `https://pokeapi.co/api/v2/pokemon-species/${id}/`;

const randomNumber = (from: number, to: number) =>
  Math.floor(Math.random() * to) + from;

export const randomUntilNotTaken = (takenIds: number[]) => {
  let random = randomNumber(1, 150);
  while (takenIds.includes(random)) {
    random = randomNumber(1, 150);
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

  const pokemonLvl = randomNumber(1, 100);

  return { pokemon, pokemonSprite, pokemonId, pokemonLvl };
};
