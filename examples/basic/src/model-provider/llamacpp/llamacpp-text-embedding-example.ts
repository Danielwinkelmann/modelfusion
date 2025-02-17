import { LlamaCppTextEmbeddingModel, embedTexts } from "modelfusion";

async function main() {
  const embeddings = await embedTexts(new LlamaCppTextEmbeddingModel(), [
    "At first, Nox didn't know what to do with the pup.",
    "He keenly observed and absorbed everything around him, from the birds in the sky to the trees in the forest.",
  ]);

  console.log(embeddings);
}

main().catch(console.error);
