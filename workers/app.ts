import { createRequestHandler } from "react-router";
import { ChatRoomObject } from "~/server/do/chat-room";

declare module "react-router" {
  export interface AppLoadContext {
    cloudflare: {
      env: Env;
      ctx: ExecutionContext;
    };
  }
}

const requestHandler = createRequestHandler(
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE
);

export { ChatRoomObject };
const chatApiPattern = new URLPattern({ pathname: "/api/chat/:roomId/*" });

export default {
  async fetch(request, env, ctx) {
    const matchedChatUrl = chatApiPattern.exec(request.url);
    if (matchedChatUrl) {
      const id = env.CHAT_ROOMS.idFromName(
        matchedChatUrl.pathname.groups.roomId
      );
      const instance = env.CHAT_ROOMS.get(id);

      return instance.fetch(request);
    }

    return requestHandler(request, {
      cloudflare: { env, ctx },
    });
  },
} satisfies ExportedHandler<Env>;
