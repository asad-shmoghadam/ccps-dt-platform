/**
 * Interface file for customer who want to override or add new API routes
 * @example
 *  router.get("/api/YourAPI", (req, res) => {
 *      res.send("Hello world.");
 *  })
 * @param {Router} router An express router object
 */

/**
 * Interface file for customer who want to override or add new API routes
 * @example
 *  router.get("/api/YourAPI", (req, res) => {
 *      res.send("Hello world.");
 *  })
 * @param {Router} router An express router object
 */

const ForgeSDK = require("forge-apis");
let gCredentials = null;
let profile = null;

// eslint-disable-next-line no-unused-vars
module.exports = function (router) {
  function setCORS(req, res, next) {
    res.set("Access-Control-Allow-Origin", process.env.CORS);
    next();
  }

  router.get("/oauth/url", setCORS, (req, res) => {
    const url =
      "https://developer.api.autodesk.com" +
      "/authentication/v1/authorize?response_type=code" +
      "&client_id=" +
      process.env.FORGE_CLIENT_ID +
      "&redirect_uri=" +
      process.env.FORGE_CALLBACK_URL +
      "&scope=bucket:create bucket:read bucket:update bucket:delete data:read data:write data:create viewables:read user:write user:read account:read account:write";
    res.end(url);
  });

  router.get("/oauth/callback", setCORS, async (req, res, next) => {
    const { code } = req.query;
    let oAuthThreeLegged = new ForgeSDK.AuthClientThreeLegged(
      process.env.FORGE_CLIENT_ID,
      process.env.FORGE_CLIENT_SECRET,
      process.env.FORGE_CALLBACK_URL,
      ["data:read"],
      false
    );
    try {
      gCredentials = await oAuthThreeLegged.getToken(code);
      gCredentials = await oAuthThreeLegged.refreshToken(gCredentials);
      const user = new ForgeSDK.UserProfileApi();
      profile = await user.getUserProfile(
        process.env.FORGE_CLIENT_ID,
        gCredentials
      );
      console.log(`got token${gCredentials.access_token}`);
      res.redirect(`/`);
    } catch (err) {
      next(err);
    }
  });

  // bim360-refresh-token method
  // https://forge.autodesk.com/blog/3-legged-authentication-postman
  router.get("/api/token", setCORS, async function (req, res) {
    if (req.query.refresh == "undefined") req.query.refresh = null;
    if (req.query.refresh) gCredentials = { refresh_token: req.query.refresh };

    if (!(gCredentials && gCredentials.refresh_token)) {
      res.status(500).json({ error: "please login first" });
      return;
    }
    console.log(`Using BIM 360 refresh token:${gCredentials.refresh_token}`);
    let oAuthThreeLegged = new ForgeSDK.AuthClientThreeLegged(
      process.env.FORGE_CLIENT_ID,
      process.env.FORGE_CLIENT_SECRET,
      process.env.FORGE_CALLBACK_URL,
      ["data:read"],
      false
    );
    try {
      gCredentials = await oAuthThreeLegged.refreshToken(gCredentials);
      const user = new ForgeSDK.UserProfileApi();
      profile = await user.getUserProfile(
        process.env.FORGE_CLIENT_ID,
        gCredentials
      );
      const resp = {
        urn: process.env.BIM_DOC_URN,
        access_token: gCredentials.access_token,
        refresh_token: gCredentials.refresh_token,
        id: profile.body.userId.slice(-6),
        name: profile.body.firstName + " " + profile.body.lastName,
        picture: profile.body.profileImages.sizeX40,
      };
      res.status(200).json(resp);
    } catch (err) {
      res.status(500).json({ access_token: "bad refresh token" });
    }
  });
};

// eslint-disable-next-line no-unused-vars
// module.exports = function (router) {};
