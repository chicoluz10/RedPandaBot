const axios = require("axios");
const urlencode = require("urlencode");
const config = require("../credential.json");

const apiId = config.weathertoken;

const weatherSearch = async (msg, args) => {
  /**
   * @type {Array<{link:string}>}
   */
  const data = (
    await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${urlencode(
        args
      )}&appid=${apiId}&units=metric`
    )
  ).data;
  msg.channel.send(
    `The temperature at ${args} is ${data.main.temp}, with ${data.weather[0].description}`
  );
};
module.exports = weatherSearch;
