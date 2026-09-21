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
  },
  {
    slug: 'url-encoder',
    name: 'URL Encoder',
    category: 'Encoding',
    description: 'Percent-encode text so it is safe to use inside URLs and query strings.',
    seoTitle: 'URL Encoder - Percent-Encode Text Online Free | DevCrate',
    metaDescription: 'Free URL encoder. Convert text and query parameters to safe percent-encoding instantly. Runs locally in your browser.',
    intro: 'Convert any text into its percent-encoded form so it can travel safely inside a URL or query string.',
    howTo: ['Paste the text or parameter value.', 'The encoded result appears live.', 'Copy it into your URL.'],
    examples: [{ title: 'Query value', input: 'a b&c=d', output: 'a%20b%26c%3Dd' }],
    faqs: [
      { q: 'When do I need URL encoding?', a: 'Whenever a value contains characters with special meaning in URLs (spaces, &, =, ?, #, /) or non-ASCII characters.' },
      { q: 'Does it encode the whole URL?', a: 'This tool encodes a value, not a full URL. Encoding a complete URL would break its structure (://, /, ?).' }
    ],
    related: ['url-decoder', 'base64-encoder'],
    component: 'UrlTool', mode: 'encode', implemented: true
  },
  {
    slug: 'url-decoder',
    name: 'URL Decoder',
    category: 'Encoding',
    description: 'Decode percent-encoded URL text back to readable characters.',
    seoTitle: 'URL Decoder - Decode Percent-Encoded URLs Online | DevCrate',
    metaDescription: 'Free URL decoder. Turn percent-encoded strings back into readable text instantly, locally in your browser.',
    intro: 'Turn percent-encoded text (%20, %26, %E2%82%AC...) back into readable characters.',
    howTo: ['Paste the encoded string.', 'The decoded text appears live.', 'Copy the readable result.'],
    examples: [{ title: 'Simple decode', input: 'a%20b%26c%3Dd', output: 'a b&c=d' }],
    faqs: [{ q: 'Why do I get an error?', a: 'A % must be followed by two hexadecimal digits. Incomplete sequences like %2 or %zz are invalid.' }],
    related: ['url-encoder', 'base64-decoder'],
    component: 'UrlTool', mode: 'decode', implemented: true
  },
  {
    slug: 'regex-tester',
    name: 'Regex Tester',
    category: 'Testing',
    description: 'Test regular expressions live: matches highlighted, counted and listed.',
    seoTitle: 'Regex Tester - Test Regular Expressions Online Free | DevCrate',
    metaDescription: 'Free online regex tester. Write a pattern, paste test text, and see matches highlighted live with full match list. JavaScript flavor, runs in your browser.',
    intro: 'Write a pattern, paste your test text, and see every match highlighted live - with a count and a full match list. Uses the JavaScript regex engine.',
    howTo: ['Type your regular expression between the slashes.', 'Add flags (g, i, m, s, u, y) if needed.', 'Paste the text to test against.', 'Matches highlight instantly in the text and list below.'],
    examples: [{ title: 'Find emails', input: 'Pattern \\b\\w+@\\w+\\.\\w+\\b against "mail ada@example.com"', output: '1 match: ada@example.com' }],
    faqs: [
      { q: 'Which regex flavor is used?', a: 'JavaScript (the RegExp your browser runs). Syntax differs slightly from PCRE or Python re.' },
      { q: 'What flags are supported?', a: 'g (global), i (case-insensitive), m (multiline), s (dotAll), u (unicode) and y (sticky).' }
    ],
    related: ['json-validator', 'cron-expression-generator'],
    component: 'RegexTool', implemented: true, popular: true
  },
  {
    slug: 'timestamp-converter',
    name: 'Timestamp Converter',
    category: 'Time',
    description: 'Convert Unix timestamps to human dates and back, in UTC, ISO 8601 and local time.',
    seoTitle: 'Unix Timestamp Converter - Epoch to Date Online | DevCrate',
    metaDescription: 'Free Unix timestamp converter. Convert epoch seconds or milliseconds to UTC, ISO 8601 and local dates - and back. Instant, in your browser.',
    intro: 'Convert a Unix timestamp (seconds or milliseconds since 1970-01-01 UTC) into readable dates, or turn a date into its timestamp.',
    howTo: ['Paste a timestamp to see it as UTC, ISO 8601 and your local time.', 'Or pick a date and time to get its timestamp in seconds and milliseconds.', 'Use Now for the current epoch time.'],
    examples: [{ title: 'The billion second mark', input: '1000000000', output: '2001-09-09 01:46:40 UTC' }],
    faqs: [
      { q: 'Seconds or milliseconds?', a: 'Both are detected automatically: 10-digit values are treated as seconds, 13-digit as milliseconds.' },
      { q: 'What timezone is shown?', a: 'UTC, ISO 8601 (always UTC) and your device local time, side by side.' }
    ],
    related: ['cron-expression-generator', 'jwt-decoder'],
    component: 'TimestampTool', implemented: true
  },
  {
    slug: 'jwt-decoder',
    name: 'JWT Decoder',
    category: 'Crypto',
    description: 'Decode JWT header and payload locally. Signature is shown but never verified here.',
    seoTitle: 'JWT Decoder - Decode JSON Web Tokens Online Free | DevCrate',
    metaDescription: 'Free JWT decoder. Inspect the header and payload of any JSON Web Token locally in your browser. No upload, no server-side verification needed to read claims.',
    intro: 'Paste a JSON Web Token to inspect its header and payload claims. Decoding happens locally - the token never leaves your browser.',
    howTo: ['Paste the full token (three dot-separated parts).', 'Read the decoded header and payload as formatted JSON.', 'Remember: decoding reads claims; it does not verify the signature.'],
    examples: [{ title: 'Typical payload claims', output: 'iss (issuer), sub (subject), exp (expiry, as a Unix timestamp), iat (issued at).' }],
    faqs: [
      { q: 'Is it safe to paste a token here?', a: 'Decoding runs entirely in your browser, so the token is not transmitted. Still, treat tokens like passwords and prefer short-lived ones.' },
      { q: 'Does this verify the signature?', a: 'No. Verification requires the secret or public key and must happen server-side. This tool only decodes.' }
    ],
    related: ['timestamp-converter', 'base64-decoder', 'hash-generator'],
    component: 'JwtTool', implemented: true, popular: true
  },
  {
    slug: 'javascript-formatter',
    name: 'JavaScript Formatter',
    category: 'Formatters',
    description: 'Format and beautify JavaScript code with Prettier, in your browser.',
    seoTitle: 'JavaScript Formatter - Beautify JS Code Online Free | DevCrate',
    metaDescription: 'Free JavaScript formatter powered by Prettier. Beautify minified or messy JS code instantly. 100% client-side.',
    intro: 'Beautify minified or inconsistently formatted JavaScript with Prettier - the same formatter most projects use - running locally in your browser.',
    howTo: ['Paste your JavaScript code.', 'Click Format.', 'Copy the cleaned-up result.'],
    examples: [{ title: 'Minified to readable', input: 'const a={b:1,c:[2,3]};', output: 'const a = { b: 1, c: [2, 3] };' }],
    faqs: [{ q: 'Which style rules apply?', a: 'Prettier defaults: 2-space indent, double quotes, semicolons, trailing commas.' }],
    related: ['html-formatter', 'css-formatter', 'json-formatter'],
    component: 'FormatterTool', mode: 'javascript', implemented: true, popular: true
  },
  {
    slug: 'css-formatter',
    name: 'CSS Formatter',
    category: 'Formatters',
    description: 'Format and beautify CSS with Prettier, locally in your browser.',
    seoTitle: 'CSS Formatter - Beautify CSS Online Free | DevCrate',
    metaDescription: 'Free CSS formatter powered by Prettier. Turn minified or messy CSS into clean, readable code. Runs 100% in your browser.',
    intro: 'Turn minified or messy CSS into clean, readable code with Prettier, without uploading anything.',
    howTo: ['Paste your CSS.', 'Click Format.', 'Copy the result.'],
    examples: [{ title: 'Minified rule', input: 'a{color:red;margin:0 auto}', output: 'a {\n  color: red;\n  margin: 0 auto;\n}' }],
    faqs: [{ q: 'Does it support SCSS?', a: 'This version formats plain CSS. SCSS-specific syntax may not parse.' }],
    related: ['javascript-formatter', 'html-formatter'],
    component: 'FormatterTool', mode: 'css', implemented: true
  },
  {
    slug: 'html-formatter',
    name: 'HTML Formatter',
    category: 'Formatters',
    description: 'Format and beautify HTML markup with Prettier, locally in your browser.',
    seoTitle: 'HTML Formatter - Beautify HTML Online Free | DevCrate',
    metaDescription: 'Free HTML formatter powered by Prettier. Beautify messy or minified HTML markup instantly, right in your browser.',
    intro: 'Beautify messy or minified HTML with consistent indentation, powered by Prettier and running entirely in your browser.',
    howTo: ['Paste your HTML.', 'Click Format.', 'Copy the formatted markup.'],
    examples: [{ title: 'Inline to structured', input: '<div><p>Hi</p></div>', output: '<div>\n  <p>Hi</p>\n</div>' }],
    faqs: [{ q: 'Is my HTML sent anywhere?', a: 'No. Formatting is local. Nothing leaves your device.' }],
    related: ['css-formatter', 'javascript-formatter'],
    component: 'FormatterTool', mode: 'html', implemented: true
  },
  {
    slug: 'sql-formatter',
    name: 'SQL Formatter',
    category: 'Formatters',
    description: 'Format SQL queries with proper indentation and keyword casing.',
    seoTitle: 'SQL Formatter - Beautify SQL Queries Online Free | DevCrate',
    metaDescription: 'Free SQL formatter. Turn dense one-line SQL into readable, indented queries. Runs locally in your browser.',
    intro: 'Turn dense one-line SQL into a readable, properly indented query.',
    howTo: ['Paste your SQL query.', 'Click Format.', 'Copy the readable version.'],
    examples: [{ title: 'One-liner to readable', input: "select id,name from users where active=1 order by name", output: 'SELECT\n  id,\n  name\nFROM\n  users\nWHERE\n  active = 1\nORDER BY\n  name' }],
    faqs: [{ q: 'Which SQL dialect?', a: 'Standard SQL. Most dialect-specific syntax still formats, but exotic procedural blocks may not.' }],
    related: ['json-formatter', 'javascript-formatter'],
    component: 'FormatterTool', mode: 'sql', implemented: true
  },
  {
    slug: 'markdown-previewer',
    name: 'Markdown Previewer',
    category: 'Writing',
    description: 'Write Markdown and see the rendered HTML live, sanitized and safe.',
    seoTitle: 'Markdown Previewer - Live Markdown to HTML Online | DevCrate',
    metaDescription: 'Free Markdown previewer with live HTML rendering and copy-as-HTML. Sanitized output, GitHub-flavored Markdown, 100% in your browser.',
    intro: 'Write Markdown on the left, see the rendered result on the right - live. Copy the sanitized HTML when you are done.',
    howTo: ['Type or paste Markdown.', 'The preview renders as you type.', 'Use Copy HTML to export the sanitized markup.'],
    examples: [{ title: 'Quick test', input: '**bold** and *italic*', output: '<strong>bold</strong> and <em>italic</em>' }],
    faqs: [{ q: 'Is the HTML sanitized?', a: 'Yes. The rendered HTML passes through DOMPurify before display and export, stripping scripts and unsafe markup.' }],
    related: ['html-formatter', 'lorem-ipsum-generator'],
    component: 'MarkdownTool', implemented: true
  },
  {
    slug: 'color-converter',
    name: 'Color Converter',
    category: 'Converters',
    description: 'Convert colors between HEX, RGB and HSL with a visual picker.',
    seoTitle: 'Color Converter - HEX to RGB to HSL Online Free | DevCrate',
    metaDescription: 'Free color converter. Convert HEX to RGB and HSL with a visual color picker and one-click copy for CSS.',
    intro: 'Convert colors between HEX, RGB and HSL instantly. Use the visual picker or type a hex value.',
    howTo: ['Pick a color visually or paste a hex value.', 'Read the RGB and HSL equivalents.', 'Copy whichever format your CSS needs.'],
    examples: [{ title: 'Indigo', input: '#6366f1', output: 'rgb(99, 102, 241) / hsl(239, 84%, 67%)' }],
    faqs: [{ q: 'Shorthand hex?', a: 'Yes. Three-digit hex like #fff expands automatically.' }],
    related: ['css-formatter', 'uuid-generator'],
    component: 'ColorTool', implemented: true
  },
  {
    slug: 'cron-expression-generator',
    name: 'Cron Expression Generator',
    category: 'Generators',
    description: 'Build cron expressions visually and read them in plain English.',
    seoTitle: 'Cron Expression Generator - Build Crontab Online | DevCrate',
    metaDescription: 'Free cron expression generator. Build crontab schedules visually, with plain-English descriptions and common presets.',
    intro: 'Build a crontab expression field by field, see it described in plain English, and start from common presets.',
    howTo: ['Fill the five fields (minute, hour, day of month, month, day of week) or pick a preset.', 'Read the plain-English description to confirm.', 'Copy the expression into your crontab.'],
    examples: [{ title: 'Weekday mornings', output: '0 9 * * 1-5 = At 09:00 on Monday to Friday.' }],
    faqs: [{ q: 'Field order?', a: 'minute hour day-of-month month day-of-week. Both 0 and 7 mean Sunday in day-of-week.' }],
    related: ['timestamp-converter', 'regex-tester'],
    component: 'CronTool', implemented: true, popular: true
  },
  {
    slug: 'lorem-ipsum-generator',
    name: 'Lorem Ipsum Generator',
    category: 'Generators',
    description: 'Generate lorem ipsum placeholder text, by paragraph count.',
    seoTitle: 'Lorem Ipsum Generator - Placeholder Text Online | DevCrate',
    metaDescription: 'Free lorem ipsum generator. Create placeholder paragraphs for mockups and layouts instantly, with one-click copy.',
    intro: 'Generate classic lorem ipsum placeholder paragraphs for mockups, wireframes and layout testing.',
    howTo: ['Choose how many paragraphs.', 'Click Generate.', 'Copy the text into your design.'],
    examples: [{ title: 'Why lorem ipsum?', output: 'Its letter distribution resembles English, so it fills space without distracting from the design.' }],
    faqs: [{ q: 'Can I generate words or sentences instead?', a: 'This version generates paragraphs. Word- and sentence-level options are on the roadmap.' }],
    related: ['markdown-previewer', 'uuid-generator'],
    component: 'LoremTool', implemented: true
  }
];

export const implementedTools = tools.filter((t) => t.implemented);
export const categories = [...new Set(tools.map((t) => t.category))];
export function bySlug(slug: string) { return tools.find((t) => t.slug === slug); }
