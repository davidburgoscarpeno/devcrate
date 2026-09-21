import { useState } from 'react';

export default function TimestampTool() {
  const now = Math.floor(Date.now() / 1000);
  const [ts, setTs] = useState(String(now));
  const [dateStr, setDateStr] = useState('');
  const tsNum = parseInt(ts);
  const tsValid = !isNaN(tsNum) && tsNum > 0;
  const fromTs = tsValid ? new Date(tsNum * (ts.length > 10 ? 1 : 1000)) : null;
  const fromDate = dateStr ? new Date(dateStr) : null;
  return (
    <div className="panel">
      <h3>Unix timestamp to date</h3>
      <div className="btn-row">
        <input type="text" inputMode="numeric" style={{ maxWidth: 180 }} value={ts} onChange={(e) => setTs(e.target.value)} aria-label="unix timestamp" />
        <button className="secondary" onClick={() => setTs(String(Math.floor(Date.now() / 1000)))}>Now</button>
      </div>
      {fromTs && (
        <div className="output">
{`UTC:      ${fromTs.toUTCString()}
ISO 8601: ${fromTs.toISOString()}
Local:    ${fromTs.toString()}`}
        </div>
      )}
      <h3 style={{ marginTop: 18 }}>Date to Unix timestamp</h3>
      <div className="btn-row">
        <input type="datetime-local" value={dateStr} onChange={(e) => setDateStr(e.target.value)} aria-label="date and time" style={{ width: 'auto' }} />
      </div>
      {fromDate && !isNaN(fromDate.getTime()) && (
        <div className="output">{`Seconds:      ${Math.floor(fromDate.getTime() / 1000)}\nMilliseconds: ${fromDate.getTime()}`}</div>
      )}
    </div>
  );
}
