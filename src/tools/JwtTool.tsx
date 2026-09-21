import { useState } from 'react';
import { decodeJwt } from './lib';

export default function JwtTool() {
  const [token, setToken] = useState('');
  const res = token.trim() ? decodeJwt(token) : null;
  return (
    <div className="panel">
      <label htmlFor="jwt-in">JWT token</label>
      <textarea id="jwt-in" rows={5} value={token} onChange={(e) => setToken(e.target.value)} placeholder="eyJhbGciOi..." />
      {'error' in (res ?? {}) && <p className="error" role="alert">{(res as any).error}</p>}
      {res && !('error' in res) && (
        <>
          <h3>Header</h3><div className="output">{JSON.stringify(res.header, null, 2)}</div>
          <h3>Payload</h3><div className="output">{JSON.stringify(res.payload, null, 2)}</div>
          <p style={{ fontSize: '.85rem', color: 'var(--text-muted)' }}>Decoding only. The signature is NOT verified - never trust a token without verifying it server-side.</p>
        </>
      )}
    </div>
  );
}
