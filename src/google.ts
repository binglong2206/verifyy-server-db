const { google } = require("googleapis");

/**
 * To use OAuth2 authentication, we need access to a CLIENT_ID, CLIENT_SECRET, AND REDIRECT_URI
 * from the client_secret.json file. To get these credentials for your application, visit
 * https://console.cloud.google.com/apis/credentials.
 */
const oauth2Client = new google.auth.OAuth2(
  "284320772177-9it3a6skjshvpeu4nvpeknp6nq8ko8h2.apps.googleusercontent.com",
  "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",
  "http://localhost:8000"
);

// Access scopes for read-only Drive activity.
const scopes = ["https://www.googleapis.com/auth/yt-analytics.readonly"];

// Generate a url that asks permissions for the Drive activity scope
export const authorizationUrl = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: "offline",
  /** Pass in the scopes array defined above.
   * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
  scope: scopes,
  // Enable incremental authorization. Recommended as a best practice.
  include_granted_scopes: true,
});

// test commit
const jsonn = {
  web: {
    client_id:
      "284320772177-9it3a6skjshvpeu4nvpeknp6nq8ko8h2.apps.googleusercontent.com",
    project_id: "socialbyte-355617",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_secret: "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",
    javascript_origins: ["http://localhost:8000", "http://localhost:3000"],
  },
};
