const axios = require('axios');
const fs = require('fs');
const { format } = require('path');

let objectArray = [];
const totalPages = 50;
main();

function main() {
  for (let i = 1; i < totalPages + 1; i++) {
    setTimeout(() => {
      requestPage(i);
    }, i * 10000);
  }
}

function formatImageUrl(url) {
  const firstPart = url.substring(url.indexOf('images/') + 7, url.indexOf('/large'));
  const secondPart = url.substring(url.indexOf('large') + 6, url.indexOf('?'));
  const returnStr = firstPart + '-' + secondPart;
  return returnStr;
}

function writeToJson() {
  const jsonContent = JSON.stringify(objectArray);

  fs.writeFile('./coin_images.json', jsonContent, 'utf8', function (err) {
    if (err) {
      return console.log(err);
    }
  });
}

function requestPage(current_page) {
  axios
    .get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=${current_page}&sparkline=false`
    )
    .then((response) => {
      if (response.data) {
        response.data.forEach((coin) => {
          objectArray.push({ id: coin.id, im: formatImageUrl(coin.image) });
          console.log(`Coin: ${coin.id} Image: ${formatImageUrl(coin.image)}`);
          console.log(`Current page: ${current_page}`);
        });
        if (current_page === totalPages) {
          writeToJson();
        }
        current_page = current_page + 1;
      }
    })
    .catch((err) => console.log(`Error: ${err}`));
}
