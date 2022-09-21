import { ReactNode } from "react";
import { Link } from "react-router-dom";

export const Title = ({ children }: { children: ReactNode }) => {
  return (
    <h1
      className={`font-bold underline underline-offset-8 decoration-red-700 decoration-[6px] md:decoration-8 mb-6 md:mb-10 text-2xl md:text-4xl`}
    >
      <Link to="/">{children}</Link>
    </h1>
  );
};
