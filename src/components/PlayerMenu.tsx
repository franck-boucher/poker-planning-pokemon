import { Menu } from "@headlessui/react";
import {
  ChevronDownIcon,
  EyeIcon,
  EyeSlashIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";
import { LiveMap } from "@liveblocks/client";
import copy from "copy-to-clipboard";
import { useMap } from "../liveblocks.config";
import { PlayerType } from "../utils/types";

interface PlayerMenuProps {
  player: PlayerType;
}
export const PlayerMenu = ({ player }: PlayerMenuProps) => {
  const players = useMap("players") as LiveMap<string, PlayerType> | undefined;

  const toggleSpectatorMode = () => {
    if (players) {
      players.set(player.id, {
        ...player,
        type: player.type === "player" ? "spectator" : "player",
        vote: null,
      });
    }
  };

  return (
    <span className="relative">
      <Menu>
        <Menu.Button className="hidden md:flex items-center gap-2 border border-gray-300 rounded-md pr-4 pl-2 hover:bg-gray-100">
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
                  active ? "bg-gray-100" : ""
                } group flex w-full items-center rounded-md px-4 py-3 font-semibold`}
              >
                <LinkIcon className="h-6 w-6 mr-4" strokeWidth="1.5" />
                Copy the link
              </button>
            )}
          </Menu.Item>

          <Menu.Item>
            {({ active }) => (
              <button
                onClick={toggleSpectatorMode}
                className={`${
                  active ? "bg-gray-100" : ""
                } group flex w-full items-center rounded-md px-4 py-3 font-semibold`}
              >
                {player.type === "player" ? (
                  <EyeSlashIcon className="h-6 w-6 mr-4" strokeWidth="1.5" />
                ) : (
                  <EyeIcon className="h-6 w-6 mr-4" strokeWidth="1.5" />
                )}
                Spectator mode
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </span>
  );
};
