const css = `
  @page {
    size: A4;
    margin: 2.5cm 2cm;
  }

  * {
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      'Helvetica Neue', Arial, sans-serif;
    font-size: 11pt;
    line-height: 1.7;
    color: #1a1a2e;
    max-width: 100%;
    -webkit-font-smoothing: antialiased;
  }

  /* Headings */
  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    line-height: 1.3;
    margin-top: 1.8em;
    margin-bottom: 0.6em;
    color: #0f0f23;
    letter-spacing: -0.01em;
  }

  h1 {
    font-size: 2em;
    margin-top: 0;
    padding-bottom: 0.3em;
    border-bottom: 2px solid #e0e0e8;
  }

  h2 {
    font-size: 1.5em;
    padding-bottom: 0.2em;
    border-bottom: 1px solid #eee;
  }

  h3 { font-size: 1.25em; }
  h4 { font-size: 1.1em; }

  /* Paragraphs */
  p {
    margin: 0 0 1em 0;
  }

  /* Links */
  a {
    color: #2563eb;
    text-decoration: none;
  }

  /* Lists */
  ul, ol {
    padding-left: 1.8em;
    margin: 0 0 1em 0;
  }

  li {
    margin-bottom: 0.3em;
  }

  li > ul, li > ol {
    margin-top: 0.3em;
    margin-bottom: 0;
  }

  /* Code */
  code {
    font-family: 'JetBrains Mono', 'Fira Code', 'SF Mono', Menlo, monospace;
    font-size: 0.88em;
    background: #f4f4f8;
    border: 1px solid #e2e2ea;
    border-radius: 4px;
    padding: 0.15em 0.4em;
  }

  pre {
    background: #fafafe;
    border: 1px solid #e2e2ea;
    border-radius: 6px;
    padding: 1em 1.2em;
    overflow-x: auto;
    margin: 0 0 1.2em 0;
    line-height: 1.5;
  }

  pre code {
    background: none;
    border: none;
    border-radius: 0;
    padding: 0;
    font-size: 0.85em;
  }

  /* Blockquotes */
  blockquote {
    margin: 0 0 1em 0;
    padding: 0.6em 1.2em;
    border-left: 3px solid #2563eb;
    background: #f8f9fc;
    color: #444;
  }

  blockquote p:last-child {
    margin-bottom: 0;
  }

  /* Tables */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 0 0 1.2em 0;
    font-size: 0.95em;
  }

  th, td {
    padding: 0.6em 1em;
    text-align: left;
    border-bottom: 1px solid #e2e2ea;
  }

  th {
    font-weight: 600;
    background: #f8f9fc;
    border-bottom: 2px solid #d0d0da;
  }

  tr:last-child td {
    border-bottom: none;
  }

  /* Horizontal rule */
  hr {
    border: none;
    height: 1px;
    background: #e0e0e8;
    margin: 2em 0;
  }

  /* Images */
  img {
    max-width: 100%;
    height: auto;
    border-radius: 4px;
  }

  /* Strong and emphasis */
  strong { font-weight: 600; }

  /* Highlight.js overrides for print */
  .hljs {
    background: transparent !important;
    padding: 0 !important;
  }
`;

module.exports = css;
