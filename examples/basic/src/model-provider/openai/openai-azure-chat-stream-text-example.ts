import {
  AzureOpenAIApiConfiguration,
  OpenAIChatMessage,
  OpenAIChatModel,
  streamText,
} from "modelfusion";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  const textStream = await streamText(
    new OpenAIChatModel({
      model: "gpt-3.5-turbo",
      api: new AzureOpenAIApiConfiguration({
        // apiKey: automatically uses process.env.AZURE_OPENAI_API_KEY,
        resourceName: "my-resource-name",
        deploymentId: "my-deployment-id",
        apiVersion: "my-api-version",
      }),
      maxCompletionTokens: 1000,
    }),
    [
      OpenAIChatMessage.system("You are a story writer. Write a story about:"),
      OpenAIChatMessage.user("A robot learning to love"),
    ]
  );

  for await (const textFragment of textStream) {
    process.stdout.write(textFragment);
  }
}

main().catch(console.error);
