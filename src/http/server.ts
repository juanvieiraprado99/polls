import cookie from "@fastify/cookie";
import fastify from "fastify";

// Rotas
import { createPoll } from "./routes/create-poll";
import { getPoll } from "./routes/get-poll";
import { teste } from "./routes/teste";
import { voteOnPoll } from "./routes/vote-on-poll";

const app = fastify();

app.register(cookie, {
  secret: "iuuy87jlkdncklid@iuy9iu3kdjakY!8UIEDNWIUE?",
  hook: "onRequest",
  parseOptions: {},
});

app.register(createPoll);
app.register(getPoll);
app.register(voteOnPoll);
app.register(teste);

app.listen({ port: 3333 }).then(() => {
  console.log("server runing");
});
