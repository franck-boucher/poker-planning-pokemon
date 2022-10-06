import { LiveMap, LiveObject } from "@liveblocks/client";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { AppTitle } from "../components/AppTitle";
import { Board } from "../components/Board";
import { Button } from "../components/Button";
import { CardRow, PointCard } from "../components/CardRow";
import { LoadingPokeball } from "../components/LoadingPokeball";
import { PlayerMenu } from "../components/PlayerMenu";
import { PlayerRow } from "../components/PlayerRow";
import { RoomProvider, useMap, useObject, useRoom } from "../liveblocks.config";
import { getPlayerId } from "../utils/playerUtils";
import { randomPokemon } from "../utils/pokemonUtils";
import { GameInfos, PlayerType } from "../utils/types";
import { useCountdown } from "../utils/useCountdown";

const PlanningPage = ({ playerId }: { playerId: string }) => {
  const { t } = useTranslation();
  const gameInfos = useObject("gameInfos") as LiveObject<GameInfos> | undefined;
  const players = useMap("players") as LiveMap<string, PlayerType> | undefined;
  const player = players?.get(playerId);
  const status = gameInfos?.get("status") || "hidden";
  const [activePlayerIds, setActivePlayers] = useState<string[]>([]);
  const room = useRoom();
  const { countdown, startCountdown } = useCountdown();

  useEffect(() => {
    if (players && gameInfos && status === "countdown") {
      if (countdown === undefined) startCountdown(3);
      else if (countdown === 0) {
        gameInfos.set("status", "revealed");
      }
    }
  }, [countdown, status, startCountdown]);

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
            type: "player",
          });
        })
        .catch(console.error);
    }
  }, [players, playerId]);

  const vote = (vote: PointCard) => {
    if (players && player && status === "hidden") {
      if (player.vote === vote || vote === null) {
        players.set(playerId, { ...player, vote: null });
      } else {
        players.set(playerId, { ...player, vote });
      }
    }
  };

  const reveal = () => {
    if (players && gameInfos) {
      gameInfos.set("status", "countdown");
    }
  };

  const reset = () => {
    if (players && gameInfos) {
      gameInfos.set("status", "hidden");
      players.forEach((player) => {
        players.set(player.id, { ...player, vote: null });
      });
    }
  };

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
            <PlayerMenu player={player} />
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
                revealed={status === "revealed"}
                currentPlayerId={playerId}
              />

              <Board>
                {(() => {
                  if (
                    status === "hidden" &&
                    Array.from(players.values()).every(({ vote }) => !vote)
                  )
                    return (
                      <span className="italic">
                        {t("planning.pleaseChoose")}
                      </span>
                    );

                  if (status === "revealed")
                    return (
                      <Button onClick={reset}>{t("planning.reset")}</Button>
                    );

                  if (
                    status === "countdown" &&
                    countdown !== undefined &&
                    countdown > 0
                  )
                    return (
                      <span className="font-bold text-xl">{countdown}</span>
                    );

                  return (
                    <Button onClick={reveal}>{t("planning.reveal")}</Button>
                  );
                })()}
              </Board>

              <PlayerRow
                players={bottomRow}
                top
                revealed={status === "revealed"}
                currentPlayerId={playerId}
              />
            </div>

            {player.type === "player" ? (
              <CardRow vote={vote} selectedCard={player.vote} />
            ) : (
              <div />
            )}

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
        gameInfos: new LiveObject<GameInfos>({ status: "hidden" }),
        players: new LiveMap<string, PlayerType>([]),
      }}
    >
      <PlanningPage playerId={playerId} />
    </RoomProvider>
  );
};

export { PlanningWrapper as Planning };
