import { openai, configuration } from "./talk";

async function chat(req, res) {
	if (!configuration.apiKey) {
		res.status(500).json({
			error: {
				message:
					"OpenAI API key not configured, please follow instructions in README.md",
			},
		});
		return;
	}

	const ctx = req.body.ctx;
	if (ctx.trim().length === 0) {
		res.status(400).json({
			error: {
				message: "Sorry, you need say something.",
			},
		});
		return;
	}

	try {
		const completion = await openai.createCompletion({
			model: "text-davinci-003",
			prompt: ctx,
			temperature: 0.6,
		});
		res.status(200).json({ result: completion.data.choices[0].text });
	} catch (error) {
		// Consider adjusting the error handling logic for your use case
		if (error.response) {
			console.error(error.response.status, error.response.data);
			res.status(error.response.status).json(error.response.data);
		} else {
			console.error(`Error with OpenAI API request: ${error.message}`);
			res.status(500).json({
				error: {
					message: "An error occurred during your request.",
				},
			});
		}
	}
}

export default chat;
