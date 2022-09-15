import { ReactNode } from "react";

export const Board = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex justify-center">
      <div className="bg-gray-200 p-16 w-full md:w-4/5 lg:w-3/5 rounded-md flex flex-col items-center gap-10 h-40">
        {children}
      </div>
    </div>
  );
};
