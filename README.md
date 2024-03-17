![Cover](./.github/cover.png)

# NLW Expert (Node.js)

Sistema de votos em tempo real, onde uma enquete pode ser criada, o usuário pode votar em uma das opções de uma enquete e isso é refletido automaticamente via websocket para visualização em tempo real.

## Requisitos

- [Docker](https://www.docker.com/);
- [Node.js](https://nodejs.org/en);
- [Pnpm](https://pnpm.io/pt/);

## Setup

- Clone o repositório com (`git clone https://github.com/juanvieiraprado99/polls.git`)
- Instalar as dependências do projeto (`pnpm install`);
- Subir container com [Redis](https://redis.io/) e [PostgreSQL](https://www.postgresql.org/) (`docker compose up -d`);
- Copie o arquivo `.env.example` (`cp .env.example .env`);
- Rodar a aplicação (`pnpm run dev`);
- Para testar as chamadas é possível utilizar o [Hoppscotch](https://hoppscotch.io/), pessoalmente prefiro o [Insomnia](https://insomnia.rest/).

## HTTP

### POST `/polls`

Criar uma nova enquete.

#### Request body

```json
{
  "title": "Qual é o melhor framework?",
  "options": ["Angular", "React", "Vue", "Next"]
}
```

#### Response body

```json
{
  "pollId": "a06fa8a5-209d-4829-8256-98e5d099b858"
}
```

### GET `/polls/:pollId`

Retorna detalhes de uma enquete.

#### Response body

```json
{
  "poll": {
    "id": "a06fa8a5-209d-4829-8256-98e5d099b858",
    "title": "Qual é o melhor framework?",
    "options": [
      {
        "id": "0d79ffac-22d0-4417-9f7c-910f7e8ae8d4",
        "title": "Angular",
        "score": 1
      },
      {
        "id": "6e504cbf-0882-42cf-aada-7b5588712374",
        "title": "React",
        "score": 0
      },
      {
        "id": "c385f034-05f7-4914-ad64-f459740b45d3",
        "title": "Vue",
        "score": 0
      },
      {
        "id": "1d41d6e9-c13b-4347-b90b-6bbb9423859c",
        "title": "Next",
        "score": 0
      }
    ]
  }
}
```

### POST `/polls/:pollId/votes`

Adiciona um voto em uma enquete especifica.

#### Request body

```json
{
  "pollOptionId": "0d79ffac-22d0-4417-9f7c-910f7e8ae8d4"
}
```

## WebSockets

### ws `/polls/:pollId/results`

Rota de WebSocket para retornar a quantidade de votos em tempo real.

#### Message

```json
{
  "pollOptionId": "0d79ffac-22d0-4417-9f7c-910f7e8ae8d4",
  "votes": 1
}
```
