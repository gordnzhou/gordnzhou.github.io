const CORS_HEADERS = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
	"Access-Control-Allow-Headers": "Content-Type",
};

export default async function sendEmail(request, env) {
    const { email, name, subject, content} = await request.json();

    if (!content || content.trim() === "") {
        return new Response("Content must be non-empty", { status: 400, headers: CORS_HEADERS });
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        return new Response("Invalid or empty email address", { status: 400, headers: CORS_HEADERS });
    }

	const token = "Bot " + env.DISCORD_TOKEN;
	const dmChannel = await fetch(`https://discord.com/api/v10/users/@me/channels`, {
      	method: 'POST',
      	headers: {
        	'Authorization': token,
        	'Content-Type': 'application/json'
      	},
      	body: JSON.stringify({ recipient_id: env.DISCORD_USER_ID })
    }).then(res => res.json());

    await fetch(`https://discord.com/api/v10/channels/${dmChannel.id}/messages`, {
      	method: 'POST',
      	headers: {
        	'Authorization': token,
        	'Content-Type': 'application/json'
      	},
      	body: JSON.stringify({ content: 
            `Message from Personal Website\nSender Email: ${email}\nSender Name: ${name || "(none)"}\nSubject: ${subject || "(none)"}\nMessage: ${content}` 
        })
    });

    return new Response('DM sent!', { status: 200, headers: CORS_HEADERS });

    // const postmarkResponse = await fetch("https://api.postmarkapp.com/email", {
    // 	method: "POST",
    // 	headers: {
    // 		"Content-Type": "application/json",
    // 		"X-Postmark-Server-Token": env.POSTMARK_TOKEN,
    // 	},
    // 	body: JSON.stringify({
    // 		From: env.POSTMARK_FROM,
    // 		To: env.POSTMARK_TO,
	// 		ReplyTo: env.POSTMARK_TO,
    // 		Subject: `(${ email || "Anonymous"}) Message from Personal Website`,
    // 		TextBody: content,
    // 		MessageStream: "outbound"
    // 	}),
    // });

    // if (!postmarkResponse.ok) {
    // 	const err = await postmarkResponse.text();
    // 	return new Response("Failed to send: " + err, { status: 500, headers: CORS_HEADERS });
    // }

    // return new Response("Postmark successfully sent.", { status: 200, headers: CORS_HEADERS });
}