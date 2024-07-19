import { httpClient } from "./src/clients/httpClient";
import { oauth } from "./src/config/constants";

let device_code;
let interval;
let verification_url;
let expires_in;
let user_code;

console.log("\x1b[36m%s\x1b[0m", "################################");
console.log("\x1b[36m%s\x1b[0m", "## PureDev Labs YouTube oAuth ##");
console.log("\x1b[36m%s\x1b[0m", "################################");

const confirmDevice = async () => {
  const refresh = setInterval(async () => {
    await getStatus();
  }, interval * 1000);

  const getStatus = async () => {
    console.log("\x1b[35m%s\x1b[0m", "Getting Status update...");
    try {
      const postData = {
        client_id: oauth.client_id,
        client_secret: oauth.client_secret,
        device_code: device_code,
        grant_type: oauth.grant_type,
      };

      const response = await httpClient(oauth.confirmDevice, postData);
      if (response.error && response.error === "authorization_pending") {
        console.log(
          "\x1b[33m%s\x1b[0m",
          "Authorization is pending... Please confirm access in your Browser."
        );
        return;
      }

      if (
        !response.access_token &&
        !response.expires_in &&
        !response.refresh_token &&
        !response.token_type
      ) {
        throw new Error(`Error: ${response}`);
      }

      console.log(
        "Your Access Token is: ",
        "\x1b[32m",
        response.token_type,
        response.access_token,
        "\x1b[0m", "and expires in: ",
		"\x1b[32m", response.expires_in, " seconds", "\x1b[0m"
      );

	  console.log(
        "Your Refresh Token is: ",
        "\x1b[32m",
        response.refresh_token,
        "\x1b[0m"
      );
      clearInterval(refresh);
      process.exit(0);
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  };

  setTimeout(() => {
    clearInterval(refresh);
    console.log("\x1b[31m%s\x1b[0m", "Session expired, start again.");
    process.exit(0);
  }, expires_in * 1000);
};

const authDevide = async () => {
  console.log("\x1b[33m%s\x1b[0m", "Requesting Google oAuth Server...");
  try {
    const postData = {
      client_id: oauth.client_id,
      client_secret: oauth.client_secret,
      scope: oauth.scope,
      device_model: oauth.device_model,
    };

    const response = await httpClient(oauth.allowDevice, postData);
    if (
      !response.device_code &&
      !response.user_code &&
      !response.expires_in &&
      !response.interval &&
      !response.verification_url
    ) {
      throw new Error(`Error: ${response}`);
    }
    device_code = response.device_code;
    interval = response.interval;
    verification_url = response.verification_url;
    expires_in = response.expires_in;
    user_code = response.user_code;

    console.log(
      "Please visit the following URL: ",
      "\x1b[32m%s\x1b[0m",
      verification_url,
      " and enter the code: ",
      "\x1b[32m%s\x1b[0m",
      user_code
    );

    await confirmDevice();
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

await authDevide();
