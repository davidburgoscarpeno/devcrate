import { useEffect, useState } from 'react';

const SAMPLE = '# Hello\n\n**Bold** and *italic* text.\n\n- One\n- Two\n\n```\ncode block\n```';

export default function MarkdownTool() {
  const [input, setInput] = useState(SAMPLE);
  const [html, setHtml] = useState('');
  useEffect(() => {
    let live = true;
    (async () => {
      const [{ marked }, DOMPurify] = await Promise.all([import('marked'), import('dompurify')]);
      const raw = await marked.parse(input);
      if (live) setHtml(DOMPurify.default.sanitize(raw));
    })();
    return () => { live = false; };
  }, [input]);
  return (
    <div className="panel">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
        <div>
          <label htmlFor="md-in">Markdown</label>
          <textarea id="md-in" rows={16} value={input} onChange={(e) => setInput(e.target.value)} />
        </div>
        <div>
          <label>Preview</label>
          <div className="output" style={{ minHeight: 300, whiteSpace: 'normal' }} dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
      <div className="btn-row"><button className="secondary" onClick={() => navigator.clipboard.writeText(html)}>Copy HTML</button></div>
    </div>
  );
}
