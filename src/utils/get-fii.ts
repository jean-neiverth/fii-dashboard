import puppeteer from "puppeteer";

export async function getFii(ticker: string) {
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
      } catch {
        console.log("Error getting url! Continue...");
      }
    });

    // Navigate to the target page
    try {
      await page.goto(`https://fiis.com.br/${ticker}`, {
        waitUntil: "networkidle0",
      });
    } catch {
      console.log("...");
    }

    if (fiis) return { documents: JSON.parse(fiis) };
    return { ok: true };
  } catch (error) {
    console.error("Error:", error);
    throw error;
  } finally {
    if (browser) await browser.close();
  }
}
