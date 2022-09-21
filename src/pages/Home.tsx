import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import peter from "../assets/peter.png";

export const Home = () => {
  const navigate = useNavigate();

  const createNew = () => {
    const uuid = uuidv4();
    navigate(`/${uuid}`);
  };

  return (
    <div
      className="bg-gray-200 p-16 w-full rounded-md flex flex-col gap-10 bg-no-repeat bg-right-top my-12"
      style={{ backgroundImage: `url(${peter})` }}
    >
      <h2 className="text-3xl font-bold w-2/3">
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
  );
};
