import { RpcSerialization, RpcServer } from "@effect/rpc";
import { DurableObject } from "cloudflare:workers";
import { ChatRoomRpcs } from "./rpc/schema";
import { Layer } from "effect";
import { ChatRoomRpcHandlersLive } from "./rpc/handlers";
import { HttpServer } from "@effect/platform";

export class ChatRoomObject extends DurableObject {
  private rpcHandler: ReturnType<typeof RpcServer.toWebHandler>;
  constructor(state: DurableObjectState, env: Env) {
    super(state, env);

    this.rpcHandler = RpcServer.toWebHandler(ChatRoomRpcs, {
      layer: Layer.mergeAll(
        ChatRoomRpcHandlersLive,
        RpcSerialization.layerNdjson,
        HttpServer.layerContext
      ),
    });
  }

  fetch(request: Request): Response | Promise<Response> {
    return this.rpcHandler.handler(request);
  }
}
