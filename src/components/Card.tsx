import { EyeIcon } from "@heroicons/react/24/outline";
import pokeball from "../assets/pokeball.png";

interface CardProps {
  children: React.ReactNode;
  isSelected: boolean;
  onClick: (...args: any[]) => void;
}
export const Card = ({ children, onClick, isSelected }: CardProps) => (
  <div
    onClick={onClick}
    className={`cursor-pointer ${
      isSelected ? "mb-2" : "mt-2"
    } hover:mt-0 hover:mb-2`}
  >
    <SimpleCard mode={isSelected ? "selected" : undefined}>
      {children}
    </SimpleCard>
  </div>
);

export interface SimpleCardProps {
  children?: React.ReactNode;
  mode?: "default" | "selected" | "empty" | "hidden" | "spectator";
}
export const SimpleCard = ({ children, mode = "default" }: SimpleCardProps) => {
  return (
    <div
      className={`border-2 h-16 w-10 rounded-md font-bold select-none ${
        mode === "empty" || mode === "spectator"
          ? "border-gray-700 border-dashed"
          : "border-red-700 border-solid drop-shadow-md"
      } ${mode === "selected" ? "text-white bg-red-700" : "text-gray-700"}`}
    >
      <div className="flex flex-col h-full justify-center items-center">
        {mode === "hidden" ? (
          <img src={pokeball} />
        ) : mode === "spectator" ? (
          <EyeIcon className="h-6 w-6" strokeWidth="1.5" />
        ) : (
          <span className="text-lg">{children}</span>
        )}
      </div>
    </div>
  );
};
