import { ReactNode } from "react";
import { Footer } from "./Footer";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex flex-col items-center w-full h-full container mx-auto p-4 md:p-8">
      <div className="flex flex-col w-full h-full">
        <div className="flex flex-col flex-1">{children}</div>
        <Footer />
      </div>
    </main>
  );
};
