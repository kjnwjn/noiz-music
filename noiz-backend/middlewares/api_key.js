const API_KEYS = require("./api_key.json");

module.exports = function (req, res, next) {
    const api_key = req.query.api_key || null;
    const valid_api_key = API_KEYS.keys.includes(api_key);
    return valid_api_key
        ? next()
        : res.json({
              requestStatus: false,
              statusCode: 401,
              requestURL: `${req.protocol}://${req.rawHeaders[1]}${req.originalUrl}`,
              message: "You need to provide a valid API key.",
              timestamp: new Date().getTime(),
          });
};
