import { CohereTextGenerationModel, streamText } from "modelfusion";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  const textStream = await streamText(
    new CohereTextGenerationModel({
      model: "command-nightly",
      temperature: 0.7,
      maxCompletionTokens: 500,
    }),
    "Write a short story about a robot learning to love:\n\n"
  );

  for await (const textFragment of textStream) {
    process.stdout.write(textFragment);
  }
}

main().catch(console.error);
