const { Api, TelegramClient } = require("telegram");
const StringSession = require("telegram/sessions").StringSession;
const input = require("input");

const apiId = 678;
const apiHash = "2bh89h787uhig77";
const stringSession = new StringSession(
  "1BAAOMTQ5LjE1NC4xNjcuOTEAUBNPCgjsItXb/CI8kEYYJLZZLhH1O9WHmp0RVbxdn4/Evy2rPHVQjJdOLZZWf3a8DPUjVKJb2Z9f1pCAE3hT1GOk0k/iasN7CsHiKvuJKosmA8cKF9mAHz0+LxvhSKJ5v5uvXkHBYuzYxtLzdiRsYyRzNlnaf1nO/u/WfE5nQJCnSgnd/RdRdAPYTnW5ESJBhCjL+ybjcGPhQz5ijU21X1gOWOqSaSjdDOy2UMPo8Ww0n5ZkB1EfZVRKc0adWEsZZQ71sTp0NpbOqLaUz03dwdMV9+1SiS9PQFcwAckHXCsQnxiYcfeGdSHlpp01aBVpbgtMXyv1ifLuwx+5PE0cc+4="
);
// const stringSession = new StringSession("")
const client = new TelegramClient(stringSession, apiId, apiHash, {
  connectionRetries: 5,
});
// client.connect()
console.log(stringSession);

const getTelegramLogin = async (req, res) => {
  console.log("request", req.body);
  const { phoneNumber } = req.body;

  (async function run() {
    await client.connect();
    const result = await client.invoke(
      new Api.auth.SendCode({
        phoneNumber: phoneNumber,
        // password: password,
        apiId: apiId,
        apiHash: apiHash,
        settings: new Api.CodeSettings({
          //   allow_flashcall: true,
          //   current_number: true,
          //   allow_app_hash: true,
          //   allow_missed_call: true,
          //   allow_firebase: true,
          //   logout_tokens: "",
          //   token: "",
          //   app_sandbox: true,
        }),
      })
    );
    console.log(result); // prints the result
  })();
};

const getTelegramOtp = async (req, res) => {
  console.log(req.body);
  const { code, phoneNumber } = req.body;
  console.log(code);
  try {
    (async function run() {
      await client.connect();
      const result = await client.invoke(
        new Api.auth.SignIn({
          phoneNumber: req.body.phoneNumber,
          phoneCodeHash: "4a024a86871e5dc702fgyr",
          phoneCode: req.body.code,
          //   password: password,
        })
      );
      console.log(result); // prints the result
    })();
  } catch (error) {
    console.log(error);
  }
};

const resendCode = async (req, res) => {
  console.log(req.body);
  const { code, phoneNumber } = req.body;
  console.log(code);
  try {
    (async function run() {
      await client.connect();
      const result = await client.invoke(
        new Api.auth.ResendCode({
          phoneNumber: req.body.phoneNumber,
          phoneCodeHash: "69eb595d6e6b72c003",
        })
      );
      console.log(result); // prints the result
    })();
  } catch (error) {
    console.log(error);
  }
};

const getSomething = async (req, res) => {
  //   try {
  //     (async () => {
  //       await client.connect();
  //       console.log("Connected to Telegram");

  //       // Use Telegram methods with the authenticated client object
  //       await client.sendMessage("me", { message: "Hello from client!" });
  //     })();
  //   } catch (error) {
  //     console.error("Error connecting to Telegram:", error);
  //     res.status(500).json({ error: "Internal server error" });
  //   }
  (async () => {
    console.log("Loading interactive example...");
    const client = new TelegramClient(stringSession, apiId, apiHash, {
      connectionRetries: 5,
    });
    await client.start({
      phoneNumber: async () => await input.text("Please enter your number: "),
      password: async () => await input.text("Please enter your password: "),
      phoneCode: async () =>
        await input.text("Please enter the code you received: "),
      onError: (err) => console.log(err),
    });
    console.log("You should now be connected.");
    console.log(client.session.save()); // Save this string to avoid logging in again
    await client.sendMessage("me", { message: "Hello!" });
  })();
};

const createChannel = async (req, res) => {
  // const {}
  (async function run() {
    await client.connect();
    const result = await client.invoke(
      new Api.channels.CreateChannel({
        broadcast: true,
        megagroup: true,
        supergroup: true,
        join_requests: false,
        request_needed: false,
        public: true,
        type: "channel",
        title: "Jina gani sasa",
        joinRequest: false,
        about: "random string here",
        geo_point: new Api.InputGeoPoint({
          lat: -1.2531714733413868,
          long: 36.68360453843359,
        }),
        // address: "Nairobi",
      })
    );
    console.log(result); // prints the result
  })();
};

module.exports = {
  getTelegramLogin,
  getTelegramOtp,
  getSomething,
  createChannel,
  resendCode,
};
