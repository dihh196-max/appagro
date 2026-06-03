const { chromium } = require('playwright');

const EXEC = process.env.CHROME_PATH || undefined;
const BASE = process.env.BASE_URL || 'http://localhost:8090';

(async () => {
  const browser = await chromium.launch(EXEC ? { executablePath: EXEC } : {});
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();

  await page.goto(BASE, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: 'shots/onboarding.png' });

  await page.getByText('Acesse', { exact: true }).first().click();
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'shots/login.png' });

  await page.getByText('Acessar', { exact: true }).first().click();
  await page.waitForTimeout(2500);
  await page.screenshot({ path: 'shots/home-top.png' });

  // Home completa (Destaques)
  await page.setViewportSize({ width: 390, height: 2200 });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: 'shots/home.png' });

  // Filtra por "Mercado"
  await page.setViewportSize({ width: 390, height: 1800 });
  await page.waitForTimeout(600);
  await page.getByText('Mercado', { exact: true }).first().click();
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'shots/home-mercado.png' });

  await browser.close();
  console.log('done');
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
