const discord = require("discord.js");
const fs = require("fs");
const ytdl = require("ytdl-core");
const axios = require("axios");
const urlencode = require("urlencode");
const config = require("../credential.json");

const playAudio = async (msg, args) => {
  /**
   * @type {Array<{link:string}>}
   */
  const data = await axios.get(
    `https://www.googleapis.com/youtube/v3/search?key=${
      config.yttoken
    }&q=${urlencode(args)}&type=video`
  );

  if (msg.member.voice.channel) {
    const connection = await msg.member.voice.channel.join();

    if (args.startsWith("https://www.youtube.com/watch?v=")) {
      const dispatcher = connection.play(ytdl(args));
      msg.channel.send(args);

      dispatcher.on("start", () => {
        console.log("audio.mp3 is now playing!");
      });

      dispatcher.on("finish", () => {
        console.log("audio.mp3 has finished playing!");
        msg.member.voice.channel.leave();
      });
    } else {
      const ytURL = `https://www.youtube.com/watch?v=${data.data.items[0].id.videoId}`;
      console.log(ytURL);
      const dispatcher = connection.play(ytdl(ytURL));
      msg.channel.send(ytURL);

      dispatcher.on("start", () => {
        console.log("audio.mp3 is now playing!");
      });

      dispatcher.on("finish", () => {
        console.log("audio.mp3 has finished playing!");
        msg.member.voice.channel.leave();
      });

      // Always remember to handle errors appropriately!
      dispatcher.on("error", console.error);
    }
  }
};

module.exports = playAudio;
