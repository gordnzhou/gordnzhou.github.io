import hello from "./route/hello";
import sendEmail from "./route/sendEmail";
import themeGen from "./route/themeGen";

const routes = [
	{ method: "GET", path: "/hello", handler: hello },
	{ method: "GET", path: "/theme-gen", handler: themeGen },
	{ method: "POST", path: "/send-email", handler: sendEmail },
];

const CORS_HEADERS = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
	"Access-Control-Allow-Headers": "Content-Type",
};

export default {
	async fetch(request, env) {
		if (request.method === 'OPTIONS') {
			return new Response(null, { status: 204, headers: CORS_HEADERS });
		}

		const url = new URL(request.url);
		const route = routes.find(r => r.method === request.method && r.path === url.pathname);

		if (!route) {
			return new Response("404 Not Found", { status: 404, headers: CORS_HEADERS });
		}

		return route.handler(request, env);
	},
};
