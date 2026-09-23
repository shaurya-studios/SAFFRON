import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

(async () => {
  const dir = 'screenshots';
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const viewports = [
    { name: 'desktop', width: 1440, height: 900 },
    { name: 'mobile', width: 390, height: 844 }
  ];
  
  const stories = ['story1', 'story2'];
  
  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    
    for (const story of stories) {
      console.log(`Navigating to /${story} at ${vp.name}...`);
      await page.goto(`http://localhost:3000/${story}`);
      await page.waitForTimeout(2000);
      
      const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight);
      const windowHeight = await page.evaluate(() => window.innerHeight);
      const maxScroll = Math.max(0, scrollHeight - windowHeight);
      
      const percentages = [0, 0.25, 0.5, 0.75, 1];
      
      for (const p of percentages) {
        const scrollTo = maxScroll * p;
        await page.evaluate((y) => window.scrollTo(0, y), scrollTo);
        await page.waitForTimeout(2000); // Wait for GSAP
        
        const pctStr = (p * 100).toString();
        const filename = path.join(dir, `${story}_${vp.name}_${pctStr}pct.png`);
        await page.screenshot({ path: filename });
        
        const fileBuffer = fs.readFileSync(filename);
        const hash = crypto.createHash('md5').update(fileBuffer).digest('hex');
        console.log(`[MD5] ${filename} = ${hash}`);
      }
    }
  }

  await browser.close();
  console.log("Done.");
})();
