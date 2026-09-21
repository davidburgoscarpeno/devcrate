import { useState } from 'react';
import { encodeUnicodeBase64, decodeUnicodeBase64 } from './lib';

export default function Base64Tool({ mode }: { mode: 'encode' | 'decode' }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  let output = '';
  if (input && !error) {
    try {
      output = mode === 'encode' ? encodeUnicodeBase64(input) : decodeUnicodeBase64(input);
    } catch {
      output = '';
    }
  }
  function handleChange(v: string) {
    setInput(v);
    if (v) {
      try {
        mode === 'encode' ? encodeUnicodeBase64(v) : decodeUnicodeBase64(v);
        setError('');
      } catch {
        setError(mode === 'decode' ? 'That does not look like valid Base64.' : 'Could not encode that input.');
      }
    } else setError('');
  }
  return (
    <div className="panel">
      <label htmlFor="b64-in">{mode === 'encode' ? 'Text to encode' : 'Base64 to decode'}</label>
      <textarea id="b64-in" rows={6} value={input} onChange={(e) => handleChange(e.target.value)} />
      {error && <p className="error" role="alert">{error}</p>}
      <div className="btn-row">
        {output && <button className="secondary" onClick={() => navigator.clipboard.writeText(output)}>Copy result</button>}
      </div>
      {output && <div className="output">{output}</div>}
    </div>
  );
}
