import { useState } from 'react';

const LABELS = { javascript: 'JavaScript', css: 'CSS', html: 'HTML', sql: 'SQL' } as const;

export default function FormatterTool({ lang }: { lang: keyof typeof LABELS }) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function format() {
    setBusy(true); setError('');
    try {
      if (lang === 'sql') {
        const { format } = await import('sql-formatter');
        setOutput(format(input, { language: 'sql' }));
      } else {
        const prettier = await import('prettier/standalone');
        let plugins: any[] = [];
        let parser = '';
        if (lang === 'javascript') {
          const [b, e] = await Promise.all([import('prettier/plugins/babel'), import('prettier/plugins/estree')]);
          plugins = [b.default ?? b, e.default ?? e]; parser = 'babel';
        } else if (lang === 'css') {
          const p = await import('prettier/plugins/postcss');
          plugins = [p.default ?? p]; parser = 'css';
        } else {
          const p = await import('prettier/plugins/html');
          plugins = [p.default ?? p]; parser = 'html';
        }
        setOutput(await prettier.format(input, { parser, plugins }));
      }
    } catch (e) {
      setError(e instanceof Error ? e.message.split('\n')[0] : 'Could not format');
      setOutput('');
    } finally { setBusy(false); }
  }
  return (
    <div className="panel">
      <label htmlFor="fmt-in">{LABELS[lang]} code</label>
      <textarea id="fmt-in" rows={10} value={input} onChange={(e) => setInput(e.target.value)} placeholder={`Paste your ${LABELS[lang]} here`} />
      <div className="btn-row">
        <button onClick={format} disabled={busy || !input.trim()}>{busy ? 'Formatting...' : 'Format'}</button>
        {output && <button className="secondary" onClick={() => navigator.clipboard.writeText(output)}>Copy</button>}
      </div>
      {error && <p className="error" role="alert">{error}</p>}
      {output && <div className="output">{output}</div>}
    </div>
  );
}
