import { describe, it, expect } from 'vitest';
import { encodeUnicodeBase64, decodeUnicodeBase64, formatJson, minifyJson, validateJson } from '../src/tools/lib';

describe('base64 unicode', () => {
  it('encodes ASCII', () => expect(encodeUnicodeBase64('Hello, World!')).toBe('SGVsbG8sIFdvcmxkIQ=='));
  it('round-trips unicode', () => {
    const s = 'Hola ñ 👋 中文';
    expect(decodeUnicodeBase64(encodeUnicodeBase64(s))).toBe(s);
  });
  it('rejects invalid base64', () => expect(() => decodeUnicodeBase64('!!!notb64')).toThrow());
});
describe('json', () => {
  it('formats with indent', () => expect(formatJson('{"a":1}')).toBe('{\n  "a": 1\n}'));
  it('minifies', () => expect(minifyJson('{\n  "a": 1\n}')).toBe('{"a":1}'));
  it('validates ok', () => expect(validateJson('{"a":1}').ok).toBe(true));
  it('reports invalid', () => expect(validateJson('{"a":1,}').ok).toBe(false));
});

import { urlEncode, urlDecode, hexToRgb, rgbToHex, rgbToHsl, decodeJwt, loremParagraphs, buildCron, describeCron } from '../src/tools/lib';
describe('url', () => {
  it('encodes', () => expect(urlEncode('a b&c')).toBe('a%20b%26c'));
  it('round-trips', () => expect(urlDecode(urlEncode('a b&c=d'))).toBe('a b&c=d'));
});
describe('color', () => {
  it('hex to rgb', () => expect(hexToRgb('#6366f1')).toEqual({ r: 99, g: 102, b: 241 }));
  it('shorthand', () => expect(hexToRgb('#fff')).toEqual({ r: 255, g: 255, b: 255 }));
  it('rgb to hex', () => expect(rgbToHex(99, 102, 241)).toBe('#6366f1'));
  it('rgb to hsl', () => { const { h } = rgbToHsl(255, 0, 0); expect(h).toBe(0); });
});
describe('jwt', () => {
  it('decodes a well-formed token', () => {
    const t = ['eyJhbGciOiJIUzI1NiJ9', 'eyJzdWIiOiI0MiJ9', 'sig'].join('.');
    const r = decodeJwt(t);
    expect('error' in r).toBe(false);
    if (!('error' in r)) expect((r.payload as any).sub).toBe('42');
  });
  it('rejects malformed', () => expect('error' in (decodeJwt('nope') as any)).toBe(true));
});
describe('lorem', () => {
  it('generates requested paragraphs', () => expect(loremParagraphs(3).length).toBe(3));
  it('sentences end with period', () => expect(loremParagraphs(1)[0].trim().endsWith('.')).toBe(true));
});
describe('cron', () => {
  it('builds expression', () => expect(buildCron('0', '9', '*', '*', '1-5')).toBe('0 9 * * 1-5'));
  it('defaults blanks to *', () => expect(buildCron('', '*', '*', '*', '*')).toBe('* * * * *'));
  it('describes', () => expect(describeCron('0 9 * * 1')).toContain('09:00'));
});
