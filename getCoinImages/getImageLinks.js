const axios = require('axios');
const fs = require('fs');
const callRate = 5;

//load current images
let coin_images = fs.readFileSync('coin_images.json');
coin_images = JSON.parse(coin_images);
//load coin info
let coin_ids = fs.readFileSync('coin_ids.json');
coin_ids = JSON.parse(coin_ids);

const addToJson = (id, image, current_index) => {
  coin_images[id] = image;
  const json = JSON.stringify(coin_images);
  coin_images.total_responses = coin_images.total_responses + 1;
  fs.writeFile('coin_images.json', json, 'utf8', (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(
      `coin: ${id} with image: ${image} was written. Response per minute: ${
        (coin_images.total_responses / coin_images.total_calls) * callRate
      }`
    );
  });
};

const getImageAndAddToJson = () => {
  coin_images.total_calls = coin_images.total_calls + 1;
  axios
    .get(
      `https://api.coingecko.com/api/v3/coins/${
        coin_ids[coin_images.currentIndex].id
      }/history?date=23-01-2023`
    )
    .then(function (response) {
      if (response.data.image) {
        coin_images.currentIndex = coin_images.currentIndex + 1;
        addToJson(coin_ids[coin_images.currentIndex].id, response.data.image.small);
      }
    })
    .catch((err) => {
      console.log(
        `Rate limited. Response per minute: ${
          (coin_images.total_responses / coin_images.total_calls) * callRate
        }`
      );
    });
};

setInterval(getImageAndAddToJson, callRate * 1000);
