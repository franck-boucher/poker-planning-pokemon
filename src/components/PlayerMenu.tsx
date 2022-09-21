import { Menu } from "@headlessui/react";
import { ChevronDownIcon, LinkIcon } from "@heroicons/react/24/solid";
import copy from "copy-to-clipboard";
import { PlayerType } from "../utils/types";

interface PlayerMenuProps {
  player: PlayerType;
}
export const PlayerMenu = ({ player }: PlayerMenuProps) => {
  return (
    <span className="relative">
      <Menu>
        <Menu.Button className="hidden md:flex items-center gap-2 border border-gray-300 rounded-md pr-4 pl-2">
          <img
            className="h-14 w-14 rounded-full"
            src={player.pokemonSprite}
            alt={player.pokemon}
            title={player.pokemon}
          />
          <span className="text-xl font-bold">{player.pokemon}</span>
          <ChevronDownIcon className="h-6 w-6" />
        </Menu.Button>

        <Menu.Items className="absolute right-0 mt-2 w-64 origin-top-right divide-y border border-gray-300 divide-gray-100 rounded-md bg-white focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => copy(window.location.href)}
                className={`${
                  active ? "bg-zinc-100" : ""
                } group flex w-full items-center rounded-md px-4 py-3`}
              >
                <LinkIcon className="h-6 w-6 mr-2" />
                Copy the link
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </span>
  );
};
