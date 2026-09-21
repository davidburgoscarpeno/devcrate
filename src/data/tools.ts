export interface ToolFaq { q: string; a: string }
export interface ToolExample { title: string; input?: string; output?: string; note?: string }
export interface Tool {
  slug: string;
  name: string;
  category: string;
  description: string;
  seoTitle: string;
  metaDescription: string;
  intro: string;
  howTo: string[];
  examples: ToolExample[];
  faqs: ToolFaq[];
  related: string[];
  component: string;
  mode?: string;
  implemented: boolean;
  popular?: boolean;
}

export const tools: Tool[] = [
  {
    slug: 'json-formatter',
    name: 'JSON Formatter',
    category: 'JSON',
    description: 'Format and beautify JSON with proper indentation, instantly in your browser.',
    seoTitle: 'JSON Formatter - Beautify JSON Online Free | DevCrate',
    metaDescription: 'Free online JSON formatter. Paste minified or messy JSON and get clean, indented, readable output. 100% client-side: your data never leaves your browser.',
    intro: 'Paste any JSON - minified, copied from a log or an API response - and get a clean, consistently indented version you can actually read. Formatting runs entirely in your browser.',
    howTo: [
      'Paste your JSON into the input box.',
      'Choose the indent size (2 or 4 spaces).',
      'Click Format. The formatted result appears below, or a precise error if the JSON is invalid.',
      'Use Copy to copy the result to your clipboard.'
    ],
    examples: [
      { title: 'Minified API response', input: '{"id":7,"name":"Ada","tags":["admin","dev"]}', output: '{\n  "id": 7,\n  "name": "Ada",\n  "tags": [\n    "admin",\n    "dev"\n  ]\n}' }
    ],
    faqs: [
      { q: 'Is my JSON uploaded to a server?', a: 'No. Formatting runs 100% in your browser with JavaScript. Nothing is sent anywhere.' },
      { q: 'What happens if my JSON is invalid?', a: 'The tool shows the exact parse error message and position reported by the JavaScript engine so you can fix it quickly.' },
      { q: 'Can it handle large files?', a: 'Yes, up to several megabytes comfortably, since everything is local. Extremely large inputs depend on your device memory.' }
    ],
    related: ['json-validator', 'json-minifier', 'base64-encoder'],
    component: 'JsonTool',
    mode: 'format',
    implemented: true,
    popular: true
  },
  {
    slug: 'json-validator',
    name: 'JSON Validator',
    category: 'JSON',
    description: 'Validate JSON syntax and get precise error messages with line and column.',
    seoTitle: 'JSON Validator - Check JSON Syntax Online Free | DevCrate',
    metaDescription: 'Free JSON validator. Check whether your JSON is syntactically valid and get the exact error position when it is not. Runs locally in your browser.',
    intro: 'Check whether a JSON document is syntactically valid. When it is not, you get the exact error and position so you can fix it without guessing.',
    howTo: [
      'Paste the JSON you want to check.',
      'Click Validate.',
      'Read the result: valid JSON reports success with key counts; invalid JSON reports the exact syntax error.'
    ],
    examples: [
      { title: 'Trailing comma (invalid)', input: '{"a": 1,}', output: 'Invalid: Unexpected token } in JSON at position 9' }
    ],
    faqs: [
      { q: 'Does validation check against a schema?', a: 'This tool checks JSON syntax only (RFC 8259). JSON Schema validation is a separate feature we may add later.' },
      { q: 'Is my data safe?', a: 'Yes. Validation is performed locally in your browser; no data is transmitted.' }
    ],
    related: ['json-formatter', 'json-minifier'],
    component: 'JsonTool',
    mode: 'validate',
    implemented: true,
    popular: true
  },
  {
    slug: 'json-minifier',
    name: 'JSON Minifier',
    category: 'JSON',
    description: 'Compress JSON by removing whitespace. Ideal before sending payloads or storing data.',
    seoTitle: 'JSON Minifier - Compress JSON Online Free | DevCrate',
    metaDescription: 'Free JSON minifier. Remove all unnecessary whitespace from JSON to reduce size. Local, instant and private - no uploads.',
    intro: 'Remove every unnecessary space and line break from a JSON document to minimize its size, without changing the data.',
    howTo: ['Paste your formatted JSON.', 'Click Minify.', 'Copy the single-line result.'],
    examples: [
      { title: 'Pretty to minified', input: '{\n  "a": 1,\n  "b": true\n}', output: '{"a":1,"b":true}' }
    ],
    faqs: [
      { q: 'Does minifying change the data?', a: 'No. Only insignificant whitespace is removed. Keys, values and order are preserved.' },
      { q: 'How much smaller does it get?', a: 'Typically 10-30% smaller depending on how much indentation the original had.' }
    ],
    related: ['json-formatter', 'json-validator'],
    component: 'JsonTool',
    mode: 'minify',
    implemented: true
  },
  {
    slug: 'base64-encoder',
    name: 'Base64 Encoder',
    category: 'Encoding',
    description: 'Encode text to Base64, including full Unicode support.',
    seoTitle: 'Base64 Encoder - Encode Text to Base64 Online | DevCrate',
    metaDescription: 'Free Base64 encoder with full Unicode/UTF-8 support. Paste text, get Base64 instantly. Runs locally in your browser.',
    intro: 'Convert any text - including accents, emoji and non-Latin scripts - into its Base64 representation.',
    howTo: ['Type or paste the text to encode.', 'The Base64 output updates as you type.', 'Click Copy to copy the result.'],
    examples: [{ title: 'Hello World', input: 'Hello, World!', output: 'SGVsbG8sIFdvcmxkIQ==' }],
    faqs: [
      { q: 'Does it handle Unicode?', a: 'Yes. Text is encoded as UTF-8 first, so emoji and non-Latin characters encode correctly.' },
      { q: 'Is Base64 encryption?', a: 'No. Base64 is an encoding, not encryption. Anyone can decode it. Never use it to protect secrets.' }
    ],
    related: ['base64-decoder', 'url-encoder'],
    component: 'Base64Tool',
    mode: 'encode',
    implemented: true,
    popular: true
  },
  {
    slug: 'base64-decoder',
    name: 'Base64 Decoder',
    category: 'Encoding',
    description: 'Decode Base64 back to readable text with UTF-8 support.',
    seoTitle: 'Base64 Decoder - Decode Base64 to Text Online | DevCrate',
    metaDescription: 'Free Base64 decoder. Paste a Base64 string and read the decoded UTF-8 text instantly. 100% client-side and private.',
    intro: 'Paste a Base64 string to reveal the original text. Handles UTF-8 so decoded text displays correctly.',
    howTo: ['Paste the Base64 string.', 'The decoded text appears automatically.', 'Copy it with the Copy button.'],
    examples: [{ title: 'Simple decode', input: 'SGVsbG8sIFdvcmxkIQ==', output: 'Hello, World!' }],
    faqs: [
      { q: 'Why do I get an error on some inputs?', a: 'The input is probably not valid Base64 (wrong characters, wrong padding, or it is Base64URL with - and _ instead of + and /).' },
      { q: 'Can I decode files?', a: 'This tool is for text. Decoding binary data like images may produce unreadable output.' }
    ],
    related: ['base64-encoder', 'url-decoder'],
    component: 'Base64Tool',
    mode: 'decode',
    implemented: true
  },
  {
    slug: 'uuid-generator',
    name: 'UUID Generator',
    category: 'Generators',
    description: 'Generate random v4 UUIDs, one or many, with one click.',
    seoTitle: 'UUID Generator - Random v4 UUIDs Online Free | DevCrate',
    metaDescription: 'Free UUID v4 generator. Create one or many cryptographically random UUIDs instantly, right in your browser.',
    intro: 'Generate RFC 4122 version 4 UUIDs using your browser\'s cryptographically secure random generator.',
    howTo: ['Choose how many UUIDs you need.', 'Click Generate.', 'Copy individual UUIDs or all of them at once.'],
    examples: [{ title: 'Example UUID', output: '3f6b2a90-1c4e-4f7a-9b2d-8e5c1a7f3d20' }],
    faqs: [
      { q: 'Are these UUIDs truly random?', a: 'Yes. They are generated with crypto.getRandomValues(), the same CSPRNG browsers use for security features.' },
      { q: 'Can two UUIDs collide?', a: 'The probability is astronomically small (about 1 in 2^122 per pair), which is why v4 UUIDs are safe as identifiers.' }
    ],
    related: ['hash-generator', 'json-formatter'],
    component: 'UuidTool',
    implemented: true,
    popular: true
  },
  {
    slug: 'hash-generator',
    name: 'Hash Generator',
    category: 'Crypto',
    description: 'Compute SHA-1, SHA-256, SHA-384 and SHA-512 hashes of any text.',
    seoTitle: 'Hash Generator - SHA-1, SHA-256, SHA-512 Online | DevCrate',
    metaDescription: 'Free online hash generator. Compute SHA-256, SHA-512, SHA-384 and SHA-1 hashes of any text locally in your browser using Web Crypto.',
    intro: 'Compute cryptographic digests of any text using the Web Crypto API - SHA-256, SHA-384, SHA-512 and SHA-1 - without sending anything to a server.',
    howTo: ['Paste or type the text.', 'All four hashes are computed instantly.', 'Copy the digest you need.'],
    examples: [{ title: 'SHA-256 of "hello"', input: 'hello', output: '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824' }],
    faqs: [
      { q: 'Which algorithm should I use?', a: 'SHA-256 is the common default. Avoid SHA-1 for security-sensitive uses; it is included for legacy checksum compatibility.' },
      { q: 'Can I hash files?', a: 'Not in this version - it hashes text. File hashing may come later.' }
    ],
    related: ['uuid-generator', 'base64-encoder'],
    component: 'HashTool',
    implemented: true
  }
];

export const implementedTools = tools.filter((t) => t.implemented);
export const categories = [...new Set(tools.map((t) => t.category))];
export function bySlug(slug: string) { return tools.find((t) => t.slug === slug); }
