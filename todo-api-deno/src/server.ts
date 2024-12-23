import { Application } from "jsr:@oak/oak/application";
import TodoRouter from "./routes/todo-routes.ts";

export const createServer = () => {
	const app = new Application();

	// Logger
	app.use(async (ctx, next) => {
		await next();
		const rt = ctx.response.headers.get("X-Response-Time");
		console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
	});

	// Timing
	app.use(async (ctx, next) => {
		const start = Date.now();
		await next();
		const ms = Date.now() - start;
		ctx.response.headers.set("X-Response-Time", `${ms}ms`);
	});

	app.use(TodoRouter.routes());
	app.use(TodoRouter.allowedMethods());
	return app;
};

export default createServer;
