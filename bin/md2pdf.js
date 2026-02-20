#!/usr/bin/env node

const { program } = require('commander');
const path = require('path');
const fs = require('fs');
const { convert } = require('../lib/convert');
const pkg = require('../package.json');

program
  .name('md2pdf')
  .description('Convert Markdown files to beautifully styled PDFs')
  .version(pkg.version)
  .argument('<input>', 'Markdown file to convert')
  .option('-o, --output <path>', 'Output PDF file path')
  .option('-f, --format <size>', 'Page size (A4, Letter, Legal)', 'A4')
  .option('-m, --margin <size>', 'Top/bottom margin', '2.5cm')
  .option('-x, --margin-x <size>', 'Left/right margin', '2cm')
  .option('--no-page-numbers', 'Disable page numbers in footer')
  .action(async (input, opts) => {
    const inputPath = path.resolve(input);

    if (!fs.existsSync(inputPath)) {
      console.error(`Error: File not found: ${inputPath}`);
      process.exit(1);
    }

    const outputPath = opts.output
      ? path.resolve(opts.output)
      : inputPath.replace(/\.md$/i, '.pdf');

    try {
      console.log(`Converting ${path.basename(inputPath)}...`);
      await convert(inputPath, outputPath, {
        format: opts.format,
        margin: opts.margin,
        marginX: opts.marginX,
        noPageNumbers: !opts.pageNumbers,
      });
      console.log(`Done: ${outputPath}`);
    } catch (err) {
      console.error(`Error: ${err.message}`);
      process.exit(1);
    }
  });

program.parse();
