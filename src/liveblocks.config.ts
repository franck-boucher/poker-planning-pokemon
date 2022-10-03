import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
  publicApiKey: import.meta.env.VITE_LIVEBLOCKS_API_KEY,
});

export const { RoomProvider, useOthers, useObject, useMap, useRoom } =
  createRoomContext(client);
