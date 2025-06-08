import { Rpc, RpcGroup } from "@effect/rpc";
import { Schema } from "effect";

export class ChatRoomRpcs extends RpcGroup.make(
  Rpc.make("ListModels", {
    success: Schema.Array(Schema.String),
  })
) {}
