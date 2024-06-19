"use strict";

const API_URL = "https://api2.binance.com/api/v3/ticker/24hr";
let isBTC = false;
const currencyToggleBtn = document.querySelector(".currencyToggleBtn");

function fetchCryptoData() {
  fetch(API_URL)
    .then(response => response.json())
    .then(data => updateTable(data))
    .catch(err => console.error("Error fetching data:", err));
}

function updateTable(data) {
  const tableBody = document.getElementById("crypto-table-body");
  let tableContent = "";

  data.forEach(crypto => {
    if (isBTC && !crypto.symbol.endsWith("BTC")) return;
    if (!isBTC && !crypto.symbol.endsWith("USDT")) return;
    tableContent += `
            <tr>
                <td>${crypto.symbol}</td>
                <td>${crypto.priceChange}</td>
                <td>${crypto.priceChangePercent}</td>
                <td>${crypto.weightedAvgPrice}</td>
                <td>${crypto.lastPrice}</td>
            </tr>
        `;
  });

  tableBody.innerHTML = tableContent;
}

currencyToggleBtn.addEventListener("click", () => {
  isBTC = !isBTC;
  currencyToggleBtn.textContent = `Switch to ${isBTC ? "USDT" : "BTC"}`;
  fetchCryptoData();
});

currencyToggleBtn.textContent = `Switch to ${isBTC ? "USDT" : "BTC"}`;
fetchCryptoData();
