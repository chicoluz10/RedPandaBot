const axios = require("axios");
const urlencode = require("urlencode");
const config = require("../credential.json");

const imgSearch = async (msg, args) => {
  /**
   * @type {Array<{link:string}>}
   */
  const data = (
    await axios.get(
      `https://api.imgur.com/3/gallery/search?q=${urlencode(args)}`,
      {
        headers: { Authorization: `Client-ID ${config.imgtoken}` },
      }
    )
  ).data.data;
  let num = Math.floor(Math.random() * 60);
  msg.channel.send(data[num].link);
};

module.exports = imgSearch;
