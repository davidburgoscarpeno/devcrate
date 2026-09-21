import { useState } from 'react';
import { buildCron, describeCron } from './lib';

const PRESETS: [string, string][] = [
  ['Every minute', '* * * * *'],
  ['Every 5 minutes', '*/5 * * * *'],
  ['Hourly', '0 * * * *'],
  ['Daily at midnight', '0 0 * * *'],
  ['Daily at 9:00', '0 9 * * *'],
  ['Weekdays at 9:00', '0 9 * * 1-5'],
  ['Weekly (Monday 9:00)', '0 9 * * 1'],
  ['Monthly (1st at midnight)', '0 0 1 * *'],
];

export default function CronTool() {
  const [m, setM] = useState('0');
  const [h, setH] = useState('9');
  const [dom, setDom] = useState('*');
  const [mon, setMon] = useState('*');
  const [dow, setDow] = useState('1-5');
  const expr = buildCron(m, h, dom, mon, dow);
  function apply(p: string) {
    const [a, b, c, d, e] = p.split(' ');
    setM(a); setH(b); setDom(c); setMon(d); setDow(e);
  }
  return (
    <div className="panel">
      <div className="btn-row" style={{ flexWrap: 'wrap' }}>
        {[['Minute', m, setM], ['Hour', h, setH], ['Day of month', dom, setDom], ['Month', mon, setMon], ['Day of week', dow, setDow]].map(([label, v, set]: any) => (
          <label key={label}>{label}<br /><input type="text" style={{ maxWidth: 90, fontFamily: 'var(--font-mono)' }} value={v} onChange={(e) => set(e.target.value)} /></label>
        ))}
      </div>
      <h3>Your expression</h3>
      <div className="output" style={{ fontSize: '1.2rem' }}>{expr}</div>
      <p className="ok">{describeCron(expr)}</p>
      <div className="btn-row"><button className="secondary" onClick={() => navigator.clipboard.writeText(expr)}>Copy expression</button></div>
      <h3>Presets</h3>
      <div className="tool-grid">
        {PRESETS.map(([label, p]) => (
          <button key={p} className="secondary" style={{ textAlign: 'left' }} onClick={() => apply(p)}>{label}<br /><code>{p}</code></button>
        ))}
      </div>
    </div>
  );
}
