# Chatbot (Terminal)

> _Terminal app_, _chat_, _llama.cpp_

A terminal chat with a Llama.cpp server backend.

## Usage

1. Start the llama.cpp server with the model that you want to serve, e.g. using `./server -models/llama-2-7b-chat.GGUF.q4_0.bin -c 2048` (Mac)

See the [ModelFusion docs for llama.cpp](https://modelfusion.dev/integration/model-provider/llamacpp) for details.

2. Run the following commands:

```sh
npm install
```

3. Run either

- `npx ts-node src/llama2-prompt.ts` (for a Llama 2 specific prompt using their special tokens - does not work for all models)
- `npx ts-node src/default-prompt.ts` (for a more generic prompt that works with most models)
