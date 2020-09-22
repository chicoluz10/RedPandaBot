const discord = require("discord.js");
const imgSearch = require("./commands/img");
const gifSearch = require("./commands/gif");
const wikiRandom = require("./commands/wiki");
const weatherSearch = require("./commands/weather");
const playAudio = require("./commands/playAudio");
const config = require("./commands/credential.json");

let playing = false;

const main = async () => {
  const bot = new discord.Client({
    presence: { activity: { type: "WATCHING", name: "Red Pandas" } },
  });

  await bot.login(config.discordtoken).then((v) => {
    console.log("Bot funfando");
  });

  bot.on("message", async (msg) => {
    if (!msg.content.match(/^\!/)) return false;
    let str = msg.cleanContent.substr(1).split(" ");
    let [command, data] = [str.shift(), str.join(" ")];
    command = command.toLowerCase();
    switch (command) {
      case "ping": {
        msg.channel.send("pong");
        break;
      }
      case "img": {
        imgSearch(msg, data);
        break;
      }
      case "gif": {
        gifSearch(msg, data);
        break;
      }
      case "wiki": {
        wikiRandom(msg, data);
        break;
      }
      case "weather": {
        weatherSearch(msg, data);
        break;
      }
      case "play": {
        if (data === undefined) {
          msg.channel.send("Please provide a link or a query");
          return;
        }
        if (!msg.member.voice.channel) {
          msg.channel.send("Please be in a voice channel!");
          return;
        }
        playAudio(msg, data);
        playing = true;
        break;
      }
      case "stop": {
        msg.member.voice.channel.leave();
      }
    }
  });
};

main();
