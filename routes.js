const express = require("express");
const router = express.Router();

router.use(express.json()); // Middleware to parse JSON bodies
router.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

// Route to handle Slack event subscriptions
router.post("/slack/events", (req, res) => {
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);

  const { type, challenge } = req.body;

  if (type === "url_verification") {
    res.status(200).send(challenge); // Ensure it's plain text, not JSON
  } else {
    res.status(200).send("Event received");
    console.log("Event received:", req.body);
    // Handle other event types here
  }
});

module.exports = router;
