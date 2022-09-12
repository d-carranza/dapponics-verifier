import { getUrl, getContract, apiCall, updateHTML, imgWeb } from "./service.js";

const info = document.getElementById("info");
const snsBox = document.getElementById("sns");
const address = document.getElementById("address");
const status = document.getElementById("status");
const img = document.getElementById("header");

// Get url with getUrl
const url = await getUrl();

// Get contract auto (or manual) with getContract
const contract = await getContract(url, status);

// Get data by calling the API
const data = await apiCall(contract, status);

// Update the HTML of the popup with the data
updateHTML(data, info, snsBox, address, status);

// Link to my startup
imgWeb(img);
