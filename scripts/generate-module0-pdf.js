const { chromium } = require('playwright');
const path = require('path');

async function generatePDF() {
  console.log('Launching browser...');
  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log('Navigating to print page...');
  await page.goto('http://localhost:3000/courses/claude-for-knowledge-workers/module-0/print', {
    waitUntil: 'networkidle'
  });

  console.log('Generating PDF...');
  const pdfPath = path.join(__dirname, '../public/courses/module-0/module-0-mental-model-shift.pdf');

  await page.pdf({
    path: pdfPath,
    format: 'Letter',
    margin: { top: '0.5in', bottom: '0.5in', left: '0.5in', right: '0.5in' },
    printBackground: true
  });

  console.log(`PDF saved to: ${pdfPath}`);

  await browser.close();
  console.log('Done!');
}

generatePDF().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
