require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var apiRouter = require("./routes/api");
var api_key_middleware = require("./middlewares/api_key.js");

var app = express();
var corsOptions = {
    origin: "*",
    // origin: ["http://localhost:8080"],
    optionsSuccessStatus: 200,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(api_key_middleware);
app.use("/api/v1", apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    // send json response to client
    res.status(err.status || 500);
    res.json({
        requestStatus: false,
        statusCode: err.status || 500,
        requestURL: `${req.protocol}://${req.rawHeaders[1]}${req.originalUrl}`,
        message: err.message,
        timestamp: new Date().getTime(),
    });
});

module.exports = app;
