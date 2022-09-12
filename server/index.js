const express = require("express");
const app = express();
const cors = require("cors");
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const PORT = 8080;

// Added stealth plugin to avoid headless: false
puppeteer.use(StealthPlugin());

// Give access to any origin and avoid CORS policy error
app.use(cors());

// API receives the call via GET
app.get("/contractinfo/:contract", (req, res) => {
  const { contract } = req.params;

  // Check if the contract matches the regex pattern to avoid possible errors
  if (!contract.match(/^0x[\w]{40}$/)) {
    // Error 418 to make this project a bit more enjoyable ( ͡° ͜ʖ ͡°)
    return res.status(418).send({ error: "send a real contract" });
  }

  // Create an empty dictionary
  const data = {};

  // Add key:value pairs through web scrapping
  (async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(`https://etherscan.io/token/${contract}`, {
      waitUntil: "networkidle2",
    });

    // (1) The confirmed contract adress of the collection
    try {
      data["Contract Address"] = await page.evaluate(() => {
        const text = document.getElementsByClassName("col-md-8")[3].innerText;
        return text;
      });
    } catch (err) {
      console.error("Contract Address not available");
    }

    // (2) The NFT collection's name
    try {
      data["Collection Name"] = await page.evaluate(() => {
        const text = document.getElementsByClassName("text-secondary small")[0]
          .innerText;
        return text;
      });
    } catch (err) {
      console.error("Collection Name not available");
    }

    // (3) The token standard
    try {
      data["Token Standard"] = await page.evaluate(() => {
        let text = document.getElementsByClassName("text-secondary small")[1]
          .innerText;
        text = text.replace("[", "");
        text = text.replace("]", "");
        return text;
      });
    } catch (err) {
      console.error("Token Standard not available");
    }

    // (4) The token supply with the token tracker
    try {
      data["Total Supply"] = await page.evaluate(() => {
        const text = document.getElementsByClassName("col-md-8")[0].innerText;
        return text;
      });
    } catch (err) {
      console.error("Total Supply not available");
    }

    // (5) The number of holders
    try {
      data["Number of Holders"] = await page.evaluate(() => {
        const text = document.getElementsByClassName("col-md-8")[1].innerText;
        return text;
      });
    } catch (err) {
      console.error("Holders not available");
    }

    // (6) The number of transfers
    try {
      data["Number of Transfers"] = await page.evaluate(() => {
        const text = document.getElementsByClassName("col-md-8")[2].innerText;
        return text;
      });
    } catch (err) {
      console.error("Transfers not available");
    }

    // (7) The Website
    try {
      data["Website"] = await page.evaluate(() => {
        const text = document.getElementsByClassName("col-md-8")[4].innerText;
        return text;
      });
    } catch (err) {
      console.error("Website not available");
    }

    //  (8) SNS 1
    try {
      // Get name of the SNS
      const snsname = await page.evaluate(() => {
        const socialname = document
          .getElementsByClassName("link-hover-secondary")[0]
          .attributes["data-original-title"].value.split(":")[0];
        return socialname;
      });

      // Get url of the SNS
      data[snsname] = await page.evaluate(() => {
        const text = document.getElementsByClassName("link-hover-secondary")[0]
          .href;
        return text;
      });
    } catch (err) {
      console.error("SNS 1 not available");
    }

    //  (9) SNS 2
    try {
      // Get name of the SNS
      const snsname = await page.evaluate(() => {
        const socialname = document
          .getElementsByClassName("link-hover-secondary")[1]
          .attributes["data-original-title"].value.split(":")[0];
        return socialname;
      });

      // Get url of the SNS
      data[snsname] = await page.evaluate(() => {
        const text = document.getElementsByClassName("link-hover-secondary")[1]
          .href;
        return text;
      });
    } catch (err) {
      console.error("SNS 2 not available");
    }

    //  (10) SNS 3
    try {
      // Get name of the SNS
      const snsname = await page.evaluate(() => {
        const socialname = document
          .getElementsByClassName("link-hover-secondary")[2]
          .attributes["data-original-title"].value.split(":")[0];
        return socialname;
      });

      // Get url of the SNS
      data[snsname] = await page.evaluate(() => {
        const text = document.getElementsByClassName("link-hover-secondary")[2]
          .href;
        return text;
      });
    } catch (err) {
      console.error("SNS 3 not available");
    }

    await page.goto(
      `https://etherscan.io/token/tokenholderchart/${contract}#balances`,
      {
        waitUntil: "networkidle2",
      }
    );

    // (11) The TOP Whale's holding
    try {
      data["Top Whale Holdings"] = await page.evaluate(() => {
        const text = document
          .getElementsByTagName("tbody")[0]
          .getElementsByTagName("tr")[0]
          .getElementsByTagName("td")[2].innerText;

        return text;
      });
    } catch (err) {
      console.error("Top Whale not available");
    }

    await page.goto(`https://etherscan.io/txs?a=${contract}`, {
      waitUntil: "networkidle2",
    });

    // (12) The last transfer
    try {
      data["Last Transaction"] = await page.evaluate(() => {
        const text = document
          .getElementsByTagName("tbody")[0]
          .getElementsByTagName("tr")[0]
          .getElementsByTagName("td")[5].innerText;
        return text;
      });
    } catch (err) {
      console.error("Last Transaction not available");
    }

    // (13) The date of deployment in the blockchain
    try {
      // Get the number of pages and go to the last page
      const num = await page.evaluate(() => {
        const n =
          document.getElementsByClassName("font-weight-medium")[1].innerText;
        return n;
      });
      // Introduce the page number in the url
      await page.goto(`https://etherscan.io/txs?a=${contract}&p=${num}`, {
        waitUntil: "networkidle2",
      });

      // Get the deploy date and return it
      data["Deploy Date"] = await page.evaluate(() => {
        const i = document
          .getElementsByTagName("tbody")[0]
          .getElementsByTagName("tr").length;

        const text = document
          .getElementsByTagName("tbody")[0]
          .getElementsByTagName("tr")
          [i - 1].getElementsByTagName("td")[5].innerText;

        return text;
      });
    } catch (err) {
      console.error("Deploy Date not available");
    }

    // Once I gathered all the data I can close the browser
    await browser.close();

    // API sends the data back to the origin
    res.send(data);
  })();
});

// Server is up and running
app.listen(PORT, () => console.info(`it's alive on http://localhost:${PORT}`));
