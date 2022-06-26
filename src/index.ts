import { server } from './server';

const port: any = process.env.PORT ?? process.env.$PORT ?? 3002;
const host = process.env.HOST || "0.0.0.0";

server
	.listen({
		port,
		host
	})
	.catch((err) => {
		server.log.error(err);
		process.exit(1);
	});
