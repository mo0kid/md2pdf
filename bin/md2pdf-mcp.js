#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const os = require('os');
const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const { z } = require('zod');
const { convert } = require('../lib/convert');
const pkg = require('../package.json');

const sharedOptions = {
  format: z.enum(['A4', 'Letter', 'Legal']).optional()
    .describe('Page size. Defaults to A4.'),
  margin: z.string().optional()
    .describe('Top and bottom margin (e.g. "2.5cm", "1in"). Defaults to 2.5cm.'),
  margin_x: z.string().optional()
    .describe('Left and right margin (e.g. "2cm", "0.75in"). Defaults to 2cm.'),
  page_numbers: z.boolean().optional()
    .describe('Show page numbers in the footer. Defaults to true.'),
};

function convertOptions(args) {
  return {
    format: args.format,
    margin: args.margin,
    marginX: args.margin_x,
    noPageNumbers: args.page_numbers === false,
  };
}

const server = new McpServer({ name: 'md2pdf', version: pkg.version });

server.registerTool(
  'convert_file_to_pdf',
  {
    title: 'Convert Markdown file to PDF',
    description:
      'Render an existing Markdown (.md) file on disk as a cleanly styled PDF using a headless Chromium engine. ' +
      'Use this whenever the user has a Markdown file they want as a PDF — for example notes, READMEs, reports, or documentation. ' +
      'Output supports: GitHub Flavored Markdown tables, syntax-highlighted fenced code blocks (highlight.js), ' +
      'headings H1–H6, ordered/unordered/nested lists, blockquotes, horizontal rules, links, and images scaled to page width. ' +
      'Page size, margins, and footer page numbers are configurable. ' +
      'Returns the absolute path of the written PDF on success.',
    inputSchema: {
      input_path: z.string()
        .describe('Absolute path to the Markdown (.md) file to convert. The file must exist and be readable.'),
      output_path: z.string().optional()
        .describe('Absolute path for the output PDF. If omitted, the PDF is written next to the input with the .md extension replaced by .pdf. Any existing file at this path is overwritten.'),
      ...sharedOptions,
    },
  },
  async (args) => {
    const inputPath = path.resolve(args.input_path);
    if (!fs.existsSync(inputPath)) {
      return {
        isError: true,
        content: [{ type: 'text', text: `File not found: ${inputPath}` }],
      };
    }
    const outputPath = args.output_path
      ? path.resolve(args.output_path)
      : inputPath.replace(/\.md$/i, '.pdf');

    await convert(inputPath, outputPath, convertOptions(args));
    return { content: [{ type: 'text', text: `PDF written to ${outputPath}` }] };
  }
);

server.registerTool(
  'convert_markdown_to_pdf',
  {
    title: 'Convert Markdown text to PDF',
    description:
      'Render a Markdown string directly to a styled PDF without needing a source .md file on disk. ' +
      'Use this when the Markdown content lives in the current conversation — for example, content you have just generated, ' +
      'pasted-in text, or a transformation of another document. ' +
      'Supports the same Markdown features as `convert_file_to_pdf` (GFM tables, syntax-highlighted code, headings, lists, ' +
      'blockquotes, images, links) and the same page/margin/footer options. ' +
      'Returns the absolute path of the written PDF on success.',
    inputSchema: {
      markdown: z.string()
        .describe('The Markdown content to render. Standard CommonMark plus GitHub Flavored Markdown tables and fenced code blocks.'),
      output_path: z.string()
        .describe('Absolute path for the output PDF. The parent directory must exist; any existing file at this path is overwritten.'),
      ...sharedOptions,
    },
  },
  async (args) => {
    const outputPath = path.resolve(args.output_path);
    const tmpPath = path.join(os.tmpdir(), `md2pdf-${process.pid}-${Date.now()}.md`);
    fs.writeFileSync(tmpPath, args.markdown, 'utf-8');
    try {
      await convert(tmpPath, outputPath, convertOptions(args));
    } finally {
      try { fs.unlinkSync(tmpPath); } catch (_) {}
    }
    return { content: [{ type: 'text', text: `PDF written to ${outputPath}` }] };
  }
);

(async () => {
  const transport = new StdioServerTransport();
  await server.connect(transport);
})().catch((err) => {
  process.stderr.write(`md2pdf-mcp failed to start: ${err.stack || err.message}\n`);
  process.exit(1);
});
