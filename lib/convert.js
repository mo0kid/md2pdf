const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');
const highlightPlugin = require('markdown-it-highlightjs');
const puppeteer = require('puppeteer');
const css = require('./styles');

const md = new MarkdownIt({
  html: true,
  typographer: true,
  linkify: true,
}).use(highlightPlugin);

function buildHtml(markdownContent) {
  const body = md.render(markdownContent);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css">
  <style>${css}</style>
</head>
<body>${body}</body>
</html>`;
}

async function convert(inputPath, outputPath, options = {}) {
  const markdown = fs.readFileSync(inputPath, 'utf-8');
  const html = buildHtml(markdown);

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.setContent(html, { waitUntil: 'networkidle0' });

  const pdfOptions = {
    path: outputPath,
    format: options.format || 'A4',
    printBackground: true,
    margin: {
      top: options.margin || '2.5cm',
      bottom: options.margin || '2.5cm',
      left: options.marginX || '2cm',
      right: options.marginX || '2cm',
    },
    displayHeaderFooter: !options.noPageNumbers,
    headerTemplate: '<span></span>',
    footerTemplate: options.noPageNumbers
      ? '<span></span>'
      : `<div style="width: 100%; text-align: center; font-size: 9px; color: #999; font-family: -apple-system, sans-serif;">
           <span class="pageNumber"></span> / <span class="totalPages"></span>
         </div>`,
  };

  await page.pdf(pdfOptions);
  await browser.close();

  return outputPath;
}

module.exports = { convert };
