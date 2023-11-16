import dotenv from 'dotenv-safe'
import { oraPromise } from 'ora'

import { ChatGPTAPI } from '../src'

dotenv.config()

/**
 * Demo CLI for testing the GPT-4 model.
 *
 * ```
 * npx tsx demos/demo-gpt-4-image-understanding.ts
 * ```
 */
async function main() {
  const api = new ChatGPTAPI({
    apiKey: process.env.OPENAI_API_KEY,
    debug: true,
    completionParams: {
      model: 'gpt-4-vision-preview'
    }
  })

  const image_url =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Huffman_tree_2.svg/1920px-Huffman_tree_2.svg.png'
  const prompt = 'What is it in the picture?'

  const res = await oraPromise(
    api.sendMessage(
      [
        { type: 'text', text: prompt },
        { type: 'image_url', image_url: { url: image_url } }
      ],
      { stream: true, timeoutMs: 1000000 }
    )
  )
  console.log(res.text)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
