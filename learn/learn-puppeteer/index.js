const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    // ignoreHTTPSErrors: true,
    // ignoreDefaultArgs: true,
    headless: true,
    // dumpio: true,
    // args: [
    //   "--proxy-server='direct://'",
    //   '--proxy-bypass-list=*',
    //   '--disable-gpu',
    //   '--disable-dev-shm-usage',
    //   '--disable-setuid-sandbox',
    //   '--no-first-run',
    //   '--no-sandbox',
    //   '--no-zygote',
    //   '--single-process',
    //   '--ignore-certificate-errors',
    //   '--ignore-certificate-errors-spki-list',
    //   '--enable-features=NetworkService'
    // ]
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:8080/', {
    waitUntil: 'domcontentloaded',
  });
  await page.waitFor(5000);
  await page.screenshot({
    path: 'example.png',
    fullPage: true,
  });
  await page.setViewport({
    width: 1920,
    height: 800,
  });
  await page.emulateMediaType('print');
  await page.pdf({
    path: +new Date() + 'example.pdf',
    fullPage: true,
    format: 'A4',
    printBackground: true,
    // scale: 0.2,
  });

  // await browser.close();
})();