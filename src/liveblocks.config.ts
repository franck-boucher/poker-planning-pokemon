import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
  publicApiKey: "pk_live_vOBia57xLIdRh_ue4tyk1oEG",
});

export const { RoomProvider, useOthers, useObject, useMap, useRoom } =
  createRoomContext(client);
