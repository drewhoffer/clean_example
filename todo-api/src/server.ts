import { Application } from "jsr:@oak/oak/application";
import { Router } from "jsr:@oak/oak/router";

export const createServer = () => {
	const router = new Router();
	router.get("/", (ctx) => {
		ctx.response.body = `<!DOCTYPE html>
      <html>
        <head><title>Hello oak!</title><head>
        <body>
          <h1>Hello oak!</h1>
        </body>
      </html>
    `;
	});

	const app = new Application();
	app.use(router.routes());
	app.use(router.allowedMethods());
	return app;
};

export default createServer;
