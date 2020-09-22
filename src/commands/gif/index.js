const axios = require("axios");
const urlencode = require("urlencode");
const config = require("../credential.json");

const api_key = config.giftoken;

const gifSearch = async (msg, args) => {
  /**
   * @type {Array<{link:string}>}
   */
  const data = (
    await axios.get(
      `http://api.giphy.com/v1/gifs/search?q=${urlencode(
        args
      )}&api_key=${api_key}`
    )
  ).data.data;
  let num = Math.floor(Math.random() * 17);
  msg.channel.send(data[num].url);
};

module.exports = gifSearch;
