FROM hayd/alpine-deno:1.1.3

EXPOSE 1993  

WORKDIR /app

USER deno

COPY ./src/deps.ts .
RUN deno cache deps.ts

ADD . .

RUN deno cache ./src/main.ts

CMD ["run", "--allow-net", "./src/main.ts"]