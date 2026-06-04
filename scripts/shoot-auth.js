const { chromium } = require('playwright');
const EXEC = process.env.CHROME_PATH || undefined;
const BASE = process.env.BASE_URL || 'http://localhost:8090';
(async () => {
  const browser = await chromium.launch(EXEC ? { executablePath: EXEC } : {});
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2500);
  await page.getByText('Acesse', { exact: true }).first().click();
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'shots/login.png' });
  await page.goto(BASE + '/register', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'shots/register.png' });
  await browser.close();
  console.log('done');
})().catch((e) => { console.error(e); process.exit(1); });
