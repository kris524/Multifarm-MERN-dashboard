const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1388790",
  key: "ef8e453bf913b2dec137",
  secret: "65fdff652b667f9de4ed",
  cluster: "eu",
  useTLS: true
});

pusher.trigger("my-channel", "my-event", {
  message: "hello world"
});