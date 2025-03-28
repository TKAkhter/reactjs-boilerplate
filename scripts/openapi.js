import { createClient } from '@hey-api/openapi-ts';
const args = process.argv;
console.log("🚀 ~ args:", args);

createClient({
  input: args.at(-1),
  output: 'src/generated',
  plugins: ['@hey-api/client-fetch'],
});