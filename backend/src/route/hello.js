const CORS_HEADERS = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
	"Access-Control-Allow-Headers": "Content-Type",
};

export default async function hello(request) {
    return new Response("Hello from Worker!", {
        headers: { "Content-Type": "text/plain", ...CORS_HEADERS },
    });
}