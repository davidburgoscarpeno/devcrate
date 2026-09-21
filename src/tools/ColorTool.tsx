import { useState } from 'react';
import { hexToRgb, rgbToHex, rgbToHsl } from './lib';

export default function ColorTool() {
  const [hex, setHex] = useState('#6366f1');
  const rgb = hexToRgb(hex);
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;
  return (
    <div className="panel">
      <div className="btn-row">
        <input type="color" value={rgb ? hex : '#000000'} onChange={(e) => setHex(e.target.value)} style={{ width: 60, height: 44, padding: 2, background: 'none', border: '1px solid var(--border)', borderRadius: 8 }} aria-label="pick color" />
        <input type="text" style={{ maxWidth: 130 }} value={hex} onChange={(e) => setHex(e.target.value)} aria-label="hex color" />
      </div>
      {rgb && hsl ? (
        <div className="output">
{`HEX: ${rgbToHex(rgb.r, rgb.g, rgb.b)}
RGB: rgb(${rgb.r}, ${rgb.g}, ${rgb.b})
HSL: hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`}
        </div>
      ) : <p className="error">Enter a valid hex color like #6366f1</p>}
      {rgb && <div className="btn-row">
        <button className="secondary" onClick={() => navigator.clipboard.writeText(rgbToHex(rgb.r, rgb.g, rgb.b))}>Copy HEX</button>
        <button className="secondary" onClick={() => navigator.clipboard.writeText(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)}>Copy RGB</button>
        <button className="secondary" onClick={() => navigator.clipboard.writeText(`hsl(${hsl!.h}, ${hsl!.s}%, ${hsl!.l}%)`)}>Copy HSL</button>
      </div>}
    </div>
  );
}
