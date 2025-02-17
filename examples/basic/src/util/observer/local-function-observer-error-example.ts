import dotenv from "dotenv";
import {
  OpenAIApiConfiguration,
  OpenAITextGenerationModel,
  generateText,
} from "modelfusion";
import { customObserver } from "./custom-observer";

dotenv.config();

async function main() {
  // Set the observer on the function call:
  const text = await generateText(
    new OpenAITextGenerationModel({
      api: new OpenAIApiConfiguration({
        baseUrl: "invalid-url",
      }),
      model: "text-davinci-003",
      maxCompletionTokens: 50,
    }),
    "Write a short story about a robot named Nox:\n\n",
    { observers: [customObserver] }
  );
}

main().catch(console.error);
