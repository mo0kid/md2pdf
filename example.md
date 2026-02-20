# Project Overview

A brief guide to demonstrate the **md2pdf** converter and its styling capabilities.

## Getting Started

To install the tool globally, run:

```bash
npm install -g md2pdf
```

Then convert any Markdown file:

```bash
md2pdf README.md -o output.pdf
```

## Features

- Clean, contemporary typography with Inter font family
- Syntax-highlighted code blocks
- Properly styled tables, blockquotes, and lists
- Configurable page size and margins
- Optional page numbering

## Code Example

Here's a small JavaScript snippet:

```javascript
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return response.json();
}
```

## Data Table

| Feature          | Status    | Notes                    |
|------------------|-----------|--------------------------|
| Headings         | Supported | H1 through H6            |
| Code blocks      | Supported | With syntax highlighting  |
| Tables           | Supported | Full GFM table syntax     |
| Images           | Supported | Auto-scaled to page width |
| Page numbers     | Optional  | Enabled by default        |

## Blockquote

> "Simplicity is the ultimate sophistication."
> — Leonardo da Vinci

## Nested Lists

1. First item
   - Sub-item A
   - Sub-item B
2. Second item
   1. Numbered sub-item
   2. Another one
3. Third item

---

*That's it — simple and clean.*
