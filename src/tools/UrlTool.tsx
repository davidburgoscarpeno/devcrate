import { useState } from 'react';
import { urlEncode, urlDecode } from './lib';

export default function UrlTool({ mode }: { mode: 'encode' | 'decode' }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  let output = '';
  if (input && !error) {
    try { output = mode === 'encode' ? urlEncode(input) : urlDecode(input); } catch { output = ''; }
  }
  function handle(v: string) {
    setInput(v);
    if (!v) { setError(''); return; }
    try { mode === 'encode' ? urlEncode(v) : urlDecode(v); setError(''); }
    catch { setError('Invalid percent-encoding sequence.'); }
  }
  return (
    <div className="panel">
      <label htmlFor="url-in">{mode === 'encode' ? 'Text to URL-encode' : 'Percent-encoded text to decode'}</label>
      <textarea id="url-in" rows={5} value={input} onChange={(e) => handle(e.target.value)} />
      {error && <p className="error" role="alert">{error}</p>}
      {output && <><div className="output">{output}</div>
        <div className="btn-row"><button className="secondary" onClick={() => navigator.clipboard.writeText(output)}>Copy result</button></div></>}
    </div>
  );
}
