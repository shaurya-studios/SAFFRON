import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

(async () => {
  const dir = 'screenshots';
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Need to handle both 1440x900 and 390x844 viewports
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
      
      // Wait for the fonts and GSAP to settle
      await page.waitForTimeout(2000);
      
      // Get total scroll height
      const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
      const windowHeight = await page.evaluate(() => window.innerHeight);
      const maxScroll = scrollHeight - windowHeight;
      
      const percentages = [0, 0.25, 0.5, 0.75, 1];
      
      for (const p of percentages) {
        const scrollTo = maxScroll * p;
        await page.evaluate((y) => window.scrollTo(0, y), scrollTo);
        
        // Wait for GSAP scrub animations to catch up (scrub: 1.5)
        await page.waitForTimeout(2000);
        
        const pctStr = (p * 100).toString();
        const filename = path.join(dir, `${story}_${vp.name}_${pctStr}pct.png`);
        await page.screenshot({ path: filename });
        console.log(`Saved ${filename}`);
      }
    }
  }

  await browser.close();
  console.log("Done.");
})();
