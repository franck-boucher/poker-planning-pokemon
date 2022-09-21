import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: (...args: any[]) => void;
}

export const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-red-700 text-white font-bold py-2 px-4 rounded hover:bg-red-800"
    >
      {children}
    </button>
  );
};
