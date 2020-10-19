const axios = require("axios");
const jobs = require("node-schedule");
const { WebClient } = require("@slack/web-api");
const token = process.env.SLACK_TOKEN;
const web = new WebClient(token);

async function sendMessage(titleText, contentText) {
  url = await axios.default.get(
    "https://api.thecatapi.com/v1/images/search?size=full"
  );
  slackMessage(titleText, contentText, url.data[0].url);
}

async function slackMessage(titleText, contentText, catUrl) {
  await web.chat.postMessage({
    channel: "CHANNEL_ID",
    text: titleText,
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: contentText,
        },
      },
      {
        type: "image",
        image_url: catUrl,
        alt_text: "cat",
      },
    ],
  });
}

jobs.scheduleJob("50 08 * * 1-5", () => {
  sendMessage(
    "시프티 출근 확인!",
    "시프티 출근 버튼 누르셨나요?\n오늘의 고양이 짤을 보며 오늘 하루도 Cheer Up!"
  );
});

jobs.scheduleJob("05 18 * * 1-5", () => {
  sendMessage(
    "시프티 퇴근 확인!",
    "시프티 퇴근 버튼 누르셨나요?\n오늘 하루도 수고하셨어요!\n하루를 마무리 하는 의미로 고양이 짤 투척!"
  );
});
