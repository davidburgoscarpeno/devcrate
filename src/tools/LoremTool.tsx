import { useState } from 'react';
import { loremParagraphs } from './lib';

export default function LoremTool() {
  const [count, setCount] = useState(3);
  const [text, setText] = useState('');
  function generate() { setText(loremParagraphs(count).join('\n\n')); }
  return (
    <div className="panel">
      <div className="btn-row">
        <label>Paragraphs: <input type="text" inputMode="numeric" style={{ maxWidth: 70 }} value={count} onChange={(e) => setCount(Math.max(1, Math.min(50, parseInt(e.target.value) || 1)))} /></label>
        <button onClick={generate}>Generate</button>
        {text && <button className="secondary" onClick={() => navigator.clipboard.writeText(text)}>Copy</button>}
      </div>
      {text && <div className="output" style={{ whiteSpace: 'pre-wrap' }}>{text}</div>}
    </div>
  );
}
