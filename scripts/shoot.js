const { chromium } = require('playwright');

const EXEC = process.env.CHROME_PATH || undefined;
const BASE = process.env.BASE_URL || 'http://localhost:8090';

// Gera screenshots das telas servindo o build web.
// Uso: node scripts/serve-dist.js (em outro terminal) e depois node scripts/shoot.js
(async () => {
  const browser = await chromium.launch(EXEC ? { executablePath: EXEC } : {});
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();

  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: 'shots/onboarding.png' });

  await page.getByText('Acesse', { exact: true }).first().click();
  await page.waitForTimeout(2500);
  await page.screenshot({ path: 'shots/login.png' });

  await page.getByText('Acessar', { exact: true }).first().click();
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'shots/home-top.png' });

  // Abre o menu lateral (catálogo de ferramentas)
  await page.locator('[data-testid="open-menu"]').first().click();
  await page.waitForTimeout(900);
  await page.screenshot({ path: 'shots/menu.png' });
  // Fecha o menu antes de capturar a home completa
  await page.keyboard.press('Escape').catch(() => {});
  await page.mouse.click(370, 400);
  await page.waitForTimeout(700);

  await page.setViewportSize({ width: 390, height: 1600 });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: 'shots/home.png' });

  await browser.close();
  console.log('done');
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
