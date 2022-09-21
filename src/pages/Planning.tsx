import { LiveMap, LiveObject } from "@liveblocks/client";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppTitle } from "../components/AppTitle";
import { Board } from "../components/Board";
import { Button } from "../components/Button";
import { CardRow, PointCard } from "../components/CardRow";
import { LoadingPokeball } from "../components/LoadingPokeball";
import { PlayerRow } from "../components/PlayerRow";
import { RoomProvider, useMap, useObject, useRoom } from "../liveblocks.config";
import { getPlayerId } from "../utils/playerUtils";
import { randomPokemon } from "../utils/pokemonUtils";
import { GameInfos, PlayerType } from "../utils/types";

const PlanningPage = ({ playerId }: { playerId: string }) => {
  const gameInfos = useObject("gameInfos") as LiveObject<GameInfos> | undefined;
  const players = useMap("players") as LiveMap<string, PlayerType> | undefined;
  const player = players?.get(playerId);
  const revealed = gameInfos?.get("revealed") || false;
  const [activePlayerIds, setActivePlayers] = useState<string[]>([]);
  const room = useRoom();

  useEffect(() => {
    setActivePlayers(
      room
        .getOthers()
        .toArray()
        .map((other) => other.presence!.playerId as string)
    );
    const unsubscribe = room.subscribe("others", (others) => {
      setActivePlayers(
        others
          .toArray()
          .filter((other) => !!other.presence)
          .map((other) => other.presence!.playerId as string)
      );
    });
    return () => unsubscribe();
  }, [room]);

  useEffect(() => {
    if (players && !players.has(playerId)) {
      const takenIds = Array.from(players.values()).map(
        ({ pokemonId }) => pokemonId
      );
      randomPokemon(takenIds)
        .then(({ pokemon, pokemonId, pokemonSprite }) => {
          players.set(playerId, {
            id: playerId,
            pokemon,
            pokemonId,
            pokemonSprite,
            vote: null,
          });
        })
        .catch(console.error);
    }
  }, [players, playerId]);

  const vote = (vote: PointCard) => {
    if (players && player && !revealed) {
      if (player.vote === vote || vote === null) {
        players.set(playerId, { ...player, vote: null });
      } else {
        players.set(playerId, { ...player, vote });
      }
    }
  };

  const reveal = () => {
    if (players && gameInfos) {
      gameInfos.set("revealed", true);
    }
  };

  const reset = () => {
    if (players && gameInfos) {
      gameInfos.set("revealed", false);
      players.forEach((player) => {
        players.set(player.id, { ...player, vote: null });
      });
    }
  };

  console.log("activePlayerIds", activePlayerIds);

  const activePlayers = Array.from(players?.values() || []).filter(
    (player) => activePlayerIds.includes(player.id) || player.id === playerId
  );

  const topRow =
    activePlayers.length > 1
      ? activePlayers.slice(0, Math.ceil(activePlayers.length / 2))
      : [];
  const bottomRow =
    activePlayers.length > 1
      ? activePlayers.slice(
          Math.ceil(activePlayers.length / 2),
          activePlayers.length
        )
      : activePlayers;

  return (
    <>
      <div className="flex justify-between">
        <AppTitle />

        {player && players && gameInfos && (
          <span>
            <span className="hidden md:flex items-center gap-2 border border-gray-300 rounded-md pr-4 pl-2">
              <img
                className="h-14 w-14 rounded-full"
                src={player.pokemonSprite}
                alt={player.pokemon}
                title={player.pokemon}
              />
              <span className="text-xl font-bold">{player.pokemon}</span>
            </span>
          </span>
        )}
      </div>

      <div className="flex flex-col justify-between flex-1">
        {player && players && gameInfos ? (
          <>
            <div />

            <div className="flex flex-col justify-center gap-2 md:gap-6">
              <PlayerRow
                players={topRow}
                bottom
                revealed={revealed}
                currentPlayerId={playerId}
              />

              <Board>
                {Array.from(players.values()).every(({ vote }) => !vote) ? (
                  <span className="italic">Please choose your cards</span>
                ) : (
                  <Button onClick={revealed ? reset : reveal}>
                    {revealed ? "Reset" : "Reveal"}
                  </Button>
                )}
              </Board>

              <PlayerRow
                players={bottomRow}
                top
                revealed={revealed}
                currentPlayerId={playerId}
              />
            </div>

            <CardRow vote={vote} selectedCard={player.vote} />

            <div />
          </>
        ) : (
          <>
            <div />
            <LoadingPokeball />
            <div />
            <div />
          </>
        )}
      </div>
    </>
  );
};

const PlanningWrapper = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [playerId] = useState(() => getPlayerId());

  useEffect(() => {
    if (!id) navigate("/");
  }, [id, navigate]);

  if (!id) return null;

  return (
    <RoomProvider
      id={id}
      initialPresence={{ playerId }}
      initialStorage={{
        gameInfos: new LiveObject<GameInfos>({ revealed: false }),
        players: new LiveMap<string, PlayerType>([]),
      }}
    >
      <PlanningPage playerId={playerId} />
    </RoomProvider>
  );
};

export { PlanningWrapper as Planning };
