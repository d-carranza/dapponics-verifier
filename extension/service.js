// Function getUrl() returns the current tab's url
export async function getUrl() {
  const queryOptions = { active: true, currentWindow: true };
  const tabs = await chrome.tabs.query(queryOptions);
  const url = tabs[0].url;
  return url;
}

// Function getContract() takes an url as input and returns the contract if matches the regex pattern, if not returns null
export async function getContract(url, status) {
  const autoContract = url.match(/0x[\w]{40}/);
  if (autoContract !== null) {
    status.innerText = "Results are coming, wait for 10 seconds";
    return autoContract[0];
  }

  status.innerText = "Couldn't find any contract on this page";
  return null;
}

// Function apiCall() takes the contract as input and returns the data received from the API
export async function apiCall(contract, status) {
  if (contract !== null) {
    const api = `http://localhost:8080/contractinfo/${contract}`;

    // API fetch: success returns data, if fails it returns an error message
    try {
      const response = await fetch(api);
      const dataApi = await response.json();
      return dataApi;
    } catch (err) {
      status.innerText = "We found a problem, try again later";
      return null;
    }
  }
}

// Function updateHTML() loops through the data and after filtering appends a new div per data element, when data is empty displays error message
export function updateHTML(data, info, snsBox, address, status) {
  const snsServices = [
    "Website",
    "Twitter",
    "Discord",
    "Opensea",
    "Medium",
    "Blog",
    "Github",
    "Telegram",
    "CoinMarketCap",
    "CoinGecko",
    "Uniswap",
    "Instagram",
    "Reddit",
  ];

  if (!data) return null;

  // If the API sends empty data show status message
  if (Object.keys(data).length === 0)
    return (status.innerText = "We found a problem, try again later");
  status.innerText = "";

  // Loop over the data and display it acordingly
  for (let i = 0; i < Object.keys(data).length; i++) {
    const key = Object.keys(data)[i];
    const value = Object.values(data)[i];

    // Alert when the contract is suspicious
    if (value.includes("Exchange Data Source: Coingecko"))
      return (status.innerText =
        "⚠️This contract is suspicious \n If is an Ethereum NFT, might be a scam");

    // Display contract at the bottom of the popup
    if (key === "Contract Address") {
      address.innerText = value;
    }

    // Filter SNS, display it and set hyperlinks
    if (snsServices.includes(key) && value.includes("https")) {
      const newSns = document.createElement("div");
      const a = document.createElement("a");

      newSns.id = key;
      newSns.className = "sns";
      a.href = value;
      a.innerText = key;
      newSns.appendChild(a);
      snsBox.appendChild(newSns);

      // Every link can be opened in a new tab with this listener
      newSns.addEventListener("click", (e) => {
        window.open(e.target.href, "_blank");
      });
    }

    // Display beautifully all the remaining data pairs
    if (key !== "Contract Address" && !snsServices.includes(key)) {
      const newRow = document.createElement("div");
      const newKey = document.createElement("div");
      const newValue = document.createElement("div");

      newKey.id = key;
      newKey.className = "key";
      newKey.innerText = `${key}:`;
      newRow.appendChild(newKey);

      newValue.id = value;
      newValue.className = "value";
      newValue.innerText = value;
      newRow.appendChild(newValue);

      newRow.id = key;
      newRow.className = "data";
      info.appendChild(newRow);
    }
  }
}

// A click in the banner opens in a new tab the website of dapponics, my startup
export function imgWeb(img) {
  img.addEventListener("click", () => {
    window.open("https://dapponics.io/", "_blank");
  });
}
