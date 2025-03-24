import puppeteer from "puppeteer";

export async function getAllFiis() {
  let browser = null;
  let fiis = null;

  try {
    browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setRequestInterception(true);

    page.on("request", (interceptedRequest) => {
      if (interceptedRequest.isInterceptResolutionHandled()) return;
      if (
        interceptedRequest.url().endsWith(".png") ||
        interceptedRequest.url().endsWith(".jpg") ||
        interceptedRequest.url().includes(".css") ||
        interceptedRequest.url().includes("google-analytics") ||
        interceptedRequest.url().includes("facebook") ||
        interceptedRequest.url().includes("doubleclick")
      )
        interceptedRequest.abort();
      else interceptedRequest.continue();
    });

    page.on("response", async (response) => {
      try {
        const url = response.url();
        if (url && url.includes("fiis.com.br/wp-json")) {
          fiis = await response.json();
          page.close();
        }
      } catch {}
    });

    try {
      await page.goto("https://fiis.com.br/lupa-de-fiis", {
        waitUntil: "networkidle0",
      });
    } catch {}

    if (fiis)
      return {
        fiis: (JSON.parse(fiis) as { ticker: string }[]).map(
          (fii) => fii.ticker
        ),
      };
    throw new Error("Couldn't fetch Fiis");
  } catch (error) {
    console.error("Error:", error);
    throw error;
  } finally {
    if (browser) await browser.close();
  }
}
