const axios = require("axios");

const wikiRandom = async (msg, args) => {
  /**
   * @type {Array<{link:string}>}
   */
  const data = (
    await axios.get(
      `https://en.wikipedia.org/w/api.php?action=query&list=random&format=json&rnnamespace=0&rnlimit=10`
    )
  ).data.query.random;
  let url = data[0].title;
  for (let i = 0; i < 15; i++) {
    url = url.replace(" ", "_");
  }

  msg.channel.send(`https://en.wikipedia.org/wiki/${url}`);
};

module.exports = wikiRandom;
