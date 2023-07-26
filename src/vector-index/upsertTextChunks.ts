import { nanoid as createId } from "nanoid";
import { FunctionOptions } from "../model-function/FunctionOptions.js";
import {
  TextEmbeddingModel,
  TextEmbeddingModelSettings,
} from "../model-function/embed-text/TextEmbeddingModel.js";
import { embedTexts } from "../model-function/embed-text/embedText.js";
import { TextChunk } from "../text-chunk/TextChunk.js";
import { VectorIndex } from "./VectorIndex.js";

export async function upsertTextChunks<
  CHUNK extends TextChunk,
  SETTINGS extends TextEmbeddingModelSettings,
>(
  {
    vectorIndex,
    embeddingModel,
    generateId = createId,
    chunks,
    ids,
  }: {
    vectorIndex: VectorIndex<CHUNK, any>;
    embeddingModel: TextEmbeddingModel<any, SETTINGS>;
    generateId?: () => string;
    chunks: CHUNK[];
    ids?: Array<string | undefined>;
  },
  options?: FunctionOptions<SETTINGS>
) {
  // many embedding models support bulk embedding, so we first embed all texts:
  const vectors = await embedTexts(
    embeddingModel,
    chunks.map((chunk) => chunk.content),
    options
  );

  await vectorIndex.upsertMany(
    chunks.map((chunk, i) => ({
      id: ids?.[i] ?? generateId(),
      vector: vectors[i],
      data: chunk,
    }))
  );
}
