import { useMemo, useState } from 'react';

export default function RegexTool() {
  const [pattern, setPattern] = useState('\\b\\w+@\\w+\\.\\w+\\b');
  const [flags, setFlags] = useState('g');
  const [text, setText] = useState('Contact ada@example.com or bob@dev.io for details.');
  const result = useMemo(() => {
    if (!pattern) return { error: '', matches: [] as string[], count: 0 };
    try {
      const re = new RegExp(pattern, flags.includes('g') ? flags : flags + 'g');
      const matches = text.match(re) ?? [];
      return { error: '', matches: matches.slice(0, 50), count: matches.length };
    } catch (e) {
      return { error: e instanceof Error ? e.message : 'Invalid regex', matches: [], count: 0 };
    }
  }, [pattern, flags, text]);
  const highlighted = useMemo(() => {
    if (result.error || !pattern || result.count === 0) return null;
    try {
      const re = new RegExp(pattern, flags.includes('g') ? flags : flags + 'g');
      return text.replace(re, (m) => `\u0001${m}\u0002`);
    } catch { return null; }
  }, [pattern, flags, text, result]);
  return (
    <div className="panel">
      <label htmlFor="re">Regular expression</label>
      <div className="btn-row">
        <span style={{ fontFamily: 'var(--font-mono)' }}>/</span>
        <input type="text" id="re" value={pattern} onChange={(e) => setPattern(e.target.value)} style={{ fontFamily: 'var(--font-mono)' }} />
        <span style={{ fontFamily: 'var(--font-mono)' }}>/</span>
        <input type="text" value={flags} onChange={(e) => setFlags(e.target.value.replace(/[^gimsuy]/g, ''))} style={{ maxWidth: 80, fontFamily: 'var(--font-mono)' }} aria-label="flags" />
      </div>
      <label htmlFor="re-text">Test string</label>
      <textarea id="re-text" rows={6} value={text} onChange={(e) => setText(e.target.value)} />
      {result.error && <p className="error" role="alert">{result.error}</p>}
      {!result.error && pattern && <p className={result.count ? 'ok' : ''}>{result.count} match{result.count === 1 ? '' : 'es'}</p>}
      {highlighted && (
        <div className="output" style={{ whiteSpace: 'pre-wrap' }}>
          {highlighted.split(/(\u0001.*?\u0002)/g).map((part, i) =>
            part.startsWith('\u0001') ? <mark key={i}>{part.slice(1, -1)}</mark> : <span key={i}>{part}</span>
          )}
        </div>
      )}
      {result.matches.length > 0 && (
        <div className="output" style={{ marginTop: 8 }}>{result.matches.map((m, i) => `${i + 1}. ${m}`).join('\n')}</div>
      )}
    </div>
  );
}
