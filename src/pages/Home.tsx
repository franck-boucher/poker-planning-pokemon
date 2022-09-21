import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import peter from "../assets/peter.png";
import { AppTitle } from "../components/AppTitle";
import { SimpleCard } from "../components/Card";
import { randomUntilNotTaken } from "../utils/pokemonUtils";

export const Home = () => {
  const navigate = useNavigate();

  const createNew = () => {
    const uuid = uuidv4();
    navigate(`/${uuid}`);
  };

  const randomPokemonIds: number[] = [];
  while (randomPokemonIds.length < 3) {
    randomPokemonIds.push(randomUntilNotTaken(randomPokemonIds));
  }

  return (
    <>
      <AppTitle />

      <div
        className="bg-gray-200 p-6 md:p-16 w-full rounded-md flex flex-col gap-4 md:gap-8 bg-no-repeat bg-[right_-4.5rem_top] md:bg-right-top mb-4 md:mb-10"
        style={{ backgroundImage: `url(${peter})` }}
      >
        <h2 className="text-xl md:text-3xl font-bold w-3/4">
          Create a new game and plan like a Pokemon Master!
        </h2>
        <div>
          <button
            className="py-2 px-6 bg-red-700 text-white rounded-md"
            onClick={createNew}
          >
            New game !
          </button>
        </div>
      </div>

      <div className="flex gap-4 md:gap-10">
        <div className="bg-gray-200 p-6 md:p-16 w-full rounded-md flex flex-col gap-2 md:gap-6 mb-10 items-center justify-center">
          <div className="flex gap-4">
            <SimpleCard mode="empty" />
            <SimpleCard mode="hidden" />
            <span className="hidden sm:block">
              <SimpleCard>5</SimpleCard>
            </span>
          </div>
          <h3 className="text-lg md:text-2xl font-bold text-center">
            Play your Poke-cards for your planning!
          </h3>
        </div>

        <div className="bg-gray-200 p-6 md:p-16 w-full rounded-md flex flex-col gap-4 mb-10 items-center justify-center">
          <div className="flex gap-4">
            {randomPokemonIds.map((id, idx) => (
              <img
                key={id}
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                className={`w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 ${
                  idx > 1 ? "hidden sm:block" : ""
                }`}
              />
            ))}
          </div>
          <h3 className="text-lg md:text-2xl font-bold text-center">
            With a new random Pokemon at each game!
          </h3>
        </div>
      </div>
    </>
  );
};
