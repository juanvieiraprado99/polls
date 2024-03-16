import cookie from "@fastify/cookie";
import websocket from "@fastify/websocket";
import fastify from "fastify";

// Rotas
import { createPoll } from "./routes/create-poll";
import { getPoll } from "./routes/get-poll";
import { voteOnPoll } from "./routes/vote-on-poll";
import { pollResults } from "./ws/poll-results";

const app = fastify();

app.register(cookie, {
  secret: "iuuy87jlkdncklid@iuy9iu3kdjakY!8UIEDNWIUE?",
  hook: "onRequest",
});

app.register(websocket);

app.register(createPoll);
app.register(getPoll);
app.register(voteOnPoll);
app.register(pollResults);

app.listen({ port: 3333 }).then(() => {
  console.log("server runing");
});
