const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const { App } = require("@slack/bolt");
const routes = require("./routes");

// Initialize the Slack Bolt app
const slackApp = new App({
  token: process.env.TOKEN_NAME,
  signingSecret: process.env.SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.APP_TOKEN,
});

slackApp.command("/square", async ({ command, ack, say }) => {
  try {
    await ack();
    let txt = command.text;
    if (isNaN(txt)) {
      say(`${txt} is not a number`);
    } else {
      let squared = parseFloat(txt) * parseFloat(txt);
      say(`${txt} squared is ${squared}`);
    }
  } catch (error) {
    console.log("Error occurred while processing the /square command");
    console.error(error);
  }
});

slackApp.message("hi mate 👋🏽", async ({ command, say }) => {
  // Replace hello with the message
  try {
    say("Hello!");
  } catch (error) {
    console.log("err");
    console.error(error);
  }
});

// Initialize the Express app
const expressApp = express();
expressApp.use(express.json());
expressApp.use(routes);

const port = process.env.PORT;

expressApp.listen(port, async () => {
  console.log(`🔥 Express app is now running on port:${port}`);
  try {
    await slackApp.start();
    console.log("⚡️ Bolt app is running!");
  } catch (error) {
    console.error("Unable to start Bolt app:", error);
  }
});
