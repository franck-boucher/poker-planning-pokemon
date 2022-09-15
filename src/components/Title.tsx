import { ReactNode } from "react";
import { Link } from "react-router-dom";

export const Title = ({ children }: { children: ReactNode }) => (
  <h1 className="text-center text-5xl font-bold underline underline-offset-8 decoration-red-700 decoration-8 mb-10">
    <Link to="/">{children}</Link>
  </h1>
);
