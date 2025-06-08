import { Effect } from "effect";
import { ChatRoomRpcs } from "./schema";

export const ChatRoomRpcHandlersLive = ChatRoomRpcs.toLayer(
  Effect.gen(function* () {
    return {
      ListModels: () => Effect.succeed(["gemini-2.0-flash"]),
    };
  })
);
