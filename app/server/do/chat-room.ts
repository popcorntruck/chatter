import { DurableObject } from "cloudflare:workers";

export class ChatRoomObject extends DurableObject {
  fetch(request: Request): Response | Promise<Response> {
    return new Response("Hello from the DO!");
  }
}
