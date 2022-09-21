import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import peter from "../assets/peter.png";
import { AppTitle } from "../components/AppTitle";

export const Home = () => {
  const navigate = useNavigate();

  const createNew = () => {
    const uuid = uuidv4();
    navigate(`/${uuid}`);
  };

  return (
    <>
      <AppTitle />

      <div
        className="bg-gray-200 p-6 md:p-16 w-full rounded-md flex flex-col gap-4 md:gap-8 bg-no-repeat bg-[right_-4.5rem_top] md:bg-right-top mb-12"
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
    </>
  );
};
