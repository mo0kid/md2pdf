# md2pdf

A command-line tool that converts Markdown files to cleanly styled PDFs.

## Output

Given standard Markdown input, md2pdf produces a PDF with contemporary typography, syntax-highlighted code blocks, and well-formatted tables:

<p align="center">
  <img src="assets/page-1.png" width="400" alt="PDF output — page 1" />
  <img src="assets/page-2.png" width="400" alt="PDF output — page 2" />
</p>

<details>
<summary>View the Markdown source used above</summary>

~~~markdown
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
~~~

</details>

## Installation

```bash
git clone https://github.com/mo0kid/md2pdf.git
cd md2pdf
npm install
npm link
```

After linking, the `md2pdf` command is available globally.

## Usage

```
md2pdf <input.md> [options]
```

**Examples:**

```bash
# Basic conversion (outputs input.pdf alongside the .md file)
md2pdf notes.md

# Specify output path
md2pdf notes.md -o ~/Documents/notes.pdf

# Use Letter size with wider margins
md2pdf report.md -f Letter -m 3cm -x 2.5cm

# Disable page numbers
md2pdf draft.md --no-page-numbers
```

## Options

| Flag | Description | Default |
|------|-------------|---------|
| `-o, --output <path>` | Output PDF file path | Same as input with `.pdf` extension |
| `-f, --format <size>` | Page size: `A4`, `Letter`, `Legal` | `A4` |
| `-m, --margin <size>` | Top and bottom margin | `2.5cm` |
| `-x, --margin-x <size>` | Left and right margin | `2cm` |
| `--no-page-numbers` | Disable page numbers in footer | Enabled |

## What it supports

- Headings (H1 through H6)
- Bold, italic, and inline code
- Fenced code blocks with syntax highlighting
- Tables (GitHub Flavored Markdown)
- Blockquotes
- Ordered and unordered lists, including nested
- Horizontal rules
- Images (scaled to page width)
- Links

## Dependencies

- [markdown-it](https://github.com/markdown-it/markdown-it) -- Markdown parser
- [highlight.js](https://highlightjs.org/) -- Syntax highlighting
- [Puppeteer](https://pptr.dev/) -- PDF rendering via headless Chrome

## License

MIT
