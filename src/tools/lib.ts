// Pure tool logic, unit-tested and shared by the React components.
export function encodeUnicodeBase64(s: string): string {
  const bytes = new TextEncoder().encode(s);
  let bin = '';
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin);
}
export function decodeUnicodeBase64(s: string): string {
  const bin = atob(s.trim());
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}
export function formatJson(input: string, indent = 2): string {
  return JSON.stringify(JSON.parse(input), null, indent);
}
export function minifyJson(input: string): string {
  return JSON.stringify(JSON.parse(input));
}
export function validateJson(input: string): { ok: boolean; msg: string } {
  try {
    const parsed = JSON.parse(input);
    const keys = typeof parsed === 'object' && parsed !== null ? Object.keys(parsed).length : 0;
    return { ok: true, msg: `Valid JSON. Top-level type: ${Array.isArray(parsed) ? 'array' : typeof parsed}${keys ? `, ${keys} keys` : ''}.` };
  } catch (e) {
    return { ok: false, msg: e instanceof Error ? e.message : 'Invalid JSON' };
  }
}

export function urlEncode(s: string): string { return encodeURIComponent(s); }
export function urlDecode(s: string): string { return decodeURIComponent(s); }

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const m = hex.replace('#', '').match(/^([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (!m) return null;
  let h = m[1];
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16) };
}
export function rgbToHex(r: number, g: number, b: number): string {
  const c = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0');
  return `#${c(r)}${c(g)}${c(b)}`;
}
export function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l: Math.round(l * 100) };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0));
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  return { h: Math.round(h * 60), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export function decodeJwt(token: string): { header: object; payload: object } | { error: string } {
  const parts = token.trim().split('.');
  if (parts.length !== 3) return { error: 'A JWT has exactly 3 dot-separated parts (header.payload.signature).' };
  try {
    const dec = (s: string) => JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/')), (c) => c.charCodeAt(0))));
    return { header: dec(parts[0]), payload: dec(parts[1]) };
  } catch {
    return { error: 'Could not decode. Check that the token is a valid base64url JWT.' };
  }
}

const LOREM_WORDS = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum'.split(' ');
export function loremWords(count: number, seed = 42): string[] {
  // Deterministic-ish pseudo random for testability.
  let x = seed;
  const rnd = () => { x = (x * 1103515245 + 12345) % 2147483648; return x / 2147483648; };
  return Array.from({ length: count }, () => LOREM_WORDS[Math.floor(rnd() * LOREM_WORDS.length)]);
}
export function loremParagraphs(count: number, wordsPerSentence = 12, sentencesPerParagraph = 4): string[] {
  return Array.from({ length: count }, (_, p) => {
    const sentences = Array.from({ length: sentencesPerParagraph }, (_, s) => {
      const words = loremWords(wordsPerSentence, p * 100 + s * 7 + 1);
      const sentence = words.join(' ');
      return sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
    });
    return sentences.join(' ');
  });
}

export function buildCron(minute: string, hour: string, dom: string, month: string, dow: string): string {
  const clean = (v: string) => v.trim() || '*';
  return [clean(minute), clean(hour), clean(dom), clean(month), clean(dow)].join(' ');
}
export function describeCron(expr: string): string {
  const [m = '*', h = '*', , , dow = '*'] = expr.trim().split(/\s+/);
  const days: Record<string, string> = { '0': 'Sunday', '1': 'Monday', '2': 'Tuesday', '3': 'Wednesday', '4': 'Thursday', '5': 'Friday', '6': 'Saturday', '7': 'Sunday' };
  let out = '';
  if (m === '*' && h === '*') out = 'Every minute';
  else if (m.startsWith('*/')) out = `Every ${m.slice(2)} minutes`;
  else if (h === '*') out = `At minute ${m} of every hour`;
  else out = `At ${h.padStart(2, '0')}:${m.padStart(2, '0')}`;
  if (dow !== '*') out += ` on ${dow.split(',').map((d) => days[d] ?? d).join(', ')}`;
  else if (!out.startsWith('Every')) out += ', every day';
  return out + '.';
}
