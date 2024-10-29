import createServer from "./server.ts";

const app = createServer();

app.listen({ port: 8080 });
console.log("Server running on port 8080");
