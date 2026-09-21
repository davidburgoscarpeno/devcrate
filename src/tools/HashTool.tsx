import { useEffect, useState } from 'react';

async function digest(algo: string, text: string) {
  const buf = await crypto.subtle.digest(algo, new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

export default function HashTool() {
  const [input, setInput] = useState('');
  const [hashes, setHashes] = useState<Record<string, string>>({});
  useEffect(() => {
    let live = true;
    (async () => {
      if (!input) { setHashes({}); return; }
      const [sha1, sha256, sha384, sha512] = await Promise.all([
        digest('SHA-1', input), digest('SHA-256', input), digest('SHA-384', input), digest('SHA-512', input)
      ]);
      if (live) setHashes({ 'SHA-1': sha1, 'SHA-256': sha256, 'SHA-384': sha384, 'SHA-512': sha512 });
    })();
    return () => { live = false; };
  }, [input]);
  return (
    <div className="panel">
      <label htmlFor="hash-in">Text to hash</label>
      <textarea id="hash-in" rows={5} value={input} onChange={(e) => setInput(e.target.value)} />
      {Object.entries(hashes).map(([algo, h]) => (
        <div key={algo} style={{ marginTop: 12 }}>
          <div className="btn-row" style={{ margin: '4px 0' }}>
            <strong>{algo}</strong>
            <button className="secondary" onClick={() => navigator.clipboard.writeText(h)}>Copy</button>
          </div>
          <div className="output">{h}</div>
        </div>
      ))}
    </div>
  );
}
