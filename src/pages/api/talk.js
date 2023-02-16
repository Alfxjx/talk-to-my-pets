import { Configuration, OpenAIApi } from "openai";

export const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
export const openai = new OpenAIApi(configuration);

async function Talk(req, res) {
	if (!configuration.apiKey) {
		res.status(500).json({
			error: {
				message:
					"OpenAI API key not configured, please follow instructions in README.md",
			},
		});
		return;
	}

	const petName = req.body.petName || "";
	if (petName.trim().length === 0) {
		res.status(400).json({
			error: {
				message: "Sorry, Pet's name required",
			},
		});
		return;
	}
	if (petName.length > 50) {
		res.status(400).json({
			error: {
				message: "Sorry, Pet's name too long",
			},
		});
		return;
	}

	const otherInfo = req.body.otherInfo || "";
	if (otherInfo.length > 500) {
		res.status(400).json({
			error: {
				message: "Sorry, we cannot hold more info",
			},
		});
		return;
	}

	try {
		const completion = await openai.createCompletion({
			model: "text-davinci-003",
			prompt: generatePrompt(req.body),
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

export function generatePrompt(reqPet) {
	return `please pretend to be my ${reqPet.petType} whose name is ${reqPet.petName}. something about ${reqPet.petName}: ${reqPet.otherInfo}`;
}

export default Talk;
