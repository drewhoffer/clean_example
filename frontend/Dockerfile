FROM denoland/deno:alpine-2.1.1

WORKDIR /app

COPY . .

RUN deno task build

USER deno

EXPOSE 3001

CMD ["task", "dev"]