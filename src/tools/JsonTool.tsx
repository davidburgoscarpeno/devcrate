import { useState } from 'react';

export default function JsonTool({ mode }: { mode: 'format' | 'validate' | 'minify' }) {
  const [input, setInput] = useState('');
  const [indent, setIndent] = useState(2);
  const [output, setOutput] = useState('');
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null);

  function run() {
    try {
      const parsed = JSON.parse(input);
      if (mode === 'validate') {
        const keys = typeof parsed === 'object' && parsed !== null ? Object.keys(parsed).length : 0;
        setStatus({ ok: true, msg: `Valid JSON. Top-level type: ${Array.isArray(parsed) ? 'array' : typeof parsed}${keys ? `, ${keys} keys` : ''}.` });
        setOutput('');
      } else if (mode === 'minify') {
        setOutput(JSON.stringify(parsed));
        setStatus({ ok: true, msg: 'Minified.' });
      } else {
        setOutput(JSON.stringify(parsed, null, indent));
        setStatus({ ok: true, msg: 'Formatted.' });
      }
    } catch (e) {
      setStatus({ ok: false, msg: e instanceof Error ? e.message : 'Invalid JSON' });
      setOutput('');
    }
  }

  return (
    <div className="panel">
      <label htmlFor="json-in">Input JSON</label>
      <textarea id="json-in" rows={10} value={input} onChange={(e) => setInput(e.target.value)} placeholder='{"paste":"your json here"}' />
      <div className="btn-row">
        {mode === 'format' && (
          <label>
            Indent:{' '}
            <select value={indent} onChange={(e) => setIndent(Number(e.target.value))} style={{ width: 'auto' }}>
              <option value={2}>2 spaces</option>
              <option value={4}>4 spaces</option>
            </select>
          </label>
        )}
        <button onClick={run}>{mode === 'validate' ? 'Validate' : mode === 'minify' ? 'Minify' : 'Format'}</button>
        {output && <button className="secondary" onClick={() => navigator.clipboard.writeText(output)}>Copy</button>}
      </div>
      {status && <p className={status.ok ? 'ok' : 'error'} role="status">{status.msg}</p>}
      {output && <div className="output">{output}</div>}
    </div>
  );
}
