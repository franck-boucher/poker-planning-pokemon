import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { getPokedex } from "../utils/playerUtils";
import { getPokemonSpriteUrl } from "../utils/pokemonUtils";
import { PokedexEntry } from "../utils/types";
import Pokemon from "./Pokemon";

interface PokedexProps {
  isOpen: boolean;
  close: () => void;
}
export const Pokedex = ({ isOpen, close }: PokedexProps) => {
  const [pokedexEntries, setPokedexEntries] = useState<PokedexEntry[]>();

  useEffect(() => {
    if (isOpen) getPokedex().then(setPokedexEntries);
  }, [isOpen]);

  const orderedPokedexEntries = pokedexEntries
    ? pokedexEntries.sort((a, b) => a.pokemonId - b.pokemonId)
    : [];

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={close}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h2"
                  className="relative text-2xl font-bold pb-4"
                >
                  Pokedex
                  <XMarkIcon
                    className="h-7 w-7 absolute top-0 right-0 cursor-pointer"
                    onClick={close}
                  />
                </Dialog.Title>

                <div className="mt-2">
                  {(() => {
                    if (!pokedexEntries)
                      return <div className="text-center">Loading...</div>;

                    if (!orderedPokedexEntries.length)
                      return <div className="text-center">No entries yet</div>;

                    return (
                      <div className="flex gap-4 flex-wrap justify-evenly">
                        {orderedPokedexEntries.map((pokemon) => {
                          return (
                            <Pokemon
                              key={pokemon.pokemonId}
                              {...pokemon}
                              pokemonSprite={getPokemonSpriteUrl(
                                pokemon.pokemonId
                              )}
                              withNumberId
                            />
                          );
                        })}
                      </div>
                    );
                  })()}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
