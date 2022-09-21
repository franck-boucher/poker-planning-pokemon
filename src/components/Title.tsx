import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

export const Title = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  // const inGame = location.pathname !== "/";
  const inGame = true;
  return (
    <h1
      className={`text-center font-bold underline underline-offset-8 decoration-red-700 decoration-8 mb-10 ${
        inGame ? "w-[413px] text-4xl " : "w-full text-5xl"
      } transition-[width,font-size]`}
    >
      <Link to="/">{children}</Link>
    </h1>
  );
};
