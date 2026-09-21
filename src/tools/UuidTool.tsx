import { useState } from 'react';

export default function UuidTool() {
  const [count, setCount] = useState(1);
  const [uuids, setUuids] = useState<string[]>([]);
  function generate() {
    setUuids(Array.from({ length: Math.min(count, 100) }, () => crypto.randomUUID()));
  }
  return (
    <div className="panel">
      <div className="btn-row">
        <label>
          How many:{' '}
          <select value={count} onChange={(e) => setCount(Number(e.target.value))} style={{ width: 'auto' }}>
            {[1, 5, 10, 25, 50, 100].map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </label>
        <button onClick={generate}>Generate</button>
        {uuids.length > 0 && <button className="secondary" onClick={() => navigator.clipboard.writeText(uuids.join('\n'))}>Copy all</button>}
      </div>
      {uuids.length > 0 && <div className="output">{uuids.join('\n')}</div>}
    </div>
  );
}
