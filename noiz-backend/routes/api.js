const express = require("express");
const router = express.Router();
const { ZingMp3 } = require("zingmp3-api-full");

router.get("/get-home", async (req, res, next) => {
    let page = req.query.page || 0;
    const data = await ZingMp3.getHome(page);
    return res.json({
        requestStatus: data.err == 0 ? true : false,
        statusCode: data.err == 0 ? 200 : 500,
        requestURL: `${req.protocol}://${req.rawHeaders[1]}${req.originalUrl}`,
        message: data.msg,
        data: data.data,
        timestamp: data.timestamp,
    });
});

router.get("/get-home-chart", async (req, res, next) => {
    const data = await ZingMp3.getChartHome();
    return res.json({
        requestStatus: data.err == 0 ? true : false,
        statusCode: data.err == 0 ? 200 : 500,
        requestURL: `${req.protocol}://${req.rawHeaders[1]}${req.originalUrl}`,
        message: data.msg,
        data: data.data,
        timestamp: data.timestamp,
    });
});

router.get("/get-top-100", async (req, res, next) => {
    const data = await ZingMp3.getTop100();
    return res.json({
        requestStatus: data.err == 0 ? true : false,
        statusCode: data.err == 0 ? 200 : 500,
        requestURL: `${req.protocol}://${req.rawHeaders[1]}${req.originalUrl}`,
        message: data.msg,
        data: data.data,
        timestamp: data.timestamp,
    });
});

router.get("/new-release-chart", async (req, res, next) => {
    const data = await ZingMp3.getNewReleaseChart();
    return res.json({
        requestStatus: data.err == 0 ? true : false,
        statusCode: data.err == 0 ? 200 : 500,
        requestURL: `${req.protocol}://${req.rawHeaders[1]}${req.originalUrl}`,
        message: data.msg,
        data: data.data,
        timestamp: data.timestamp,
    });
});

router.get("/song/:id/streaming", async (req, res, next) => {
    const id = req.params.id;
    const data = await ZingMp3.getSong(id);
    return res.json({
        requestStatus: data.err == 0 ? true : false,
        statusCode: data.err == 0 ? 200 : data.err == -1023 ? 404 : 500,
        requestURL: `${req.protocol}://${req.rawHeaders[1]}${req.originalUrl}`,
        message: data.msg,
        data: data.data,
        timestamp: data.timestamp,
    });
});

router.get("/song/:id/details", async (req, res, next) => {
    const id = req.params.id;
    const data = await ZingMp3.getInfoSong(id);
    const streaming = await ZingMp3.getSong(id);
    return res.json({
        requestStatus: data.err == 0 ? true : false,
        statusCode: data.err == 0 ? 200 : data.err == -1023 ? 404 : 500,
        requestURL: `${req.protocol}://${req.rawHeaders[1]}${req.originalUrl}`,
        message: data.msg,
        data: { ...data.data, streaming },
        timestamp: data.timestamp,
    });
});

router.get("/playlist/:id/details", async (req, res, next) => {
    const id = req.params.id;
    const data = await ZingMp3.getDetailPlaylist(id);
    return res.json({
        requestStatus: data.err == 0 ? true : false,
        statusCode: data.err == 0 ? 200 : data.err == -1031 ? 404 : 500,
        requestURL: `${req.protocol}://${req.rawHeaders[1]}${req.originalUrl}`,
        message: data.msg,
        data: data.data,
        timestamp: data.timestamp,
    });
});

router.get("/playlist/:id/mv", async (req, res, next) => {
    const id = req.params.id;
    let page = req.query.page || 1;
    let count = req.query.count || 15;
    const data = await ZingMp3.getListMV(id, page, count);
    return res.json({
        requestStatus: data.err == 0 ? true : false,
        statusCode: data.err == 0 ? 200 : data.err == -1031 ? 404 : 500,
        requestURL: `${req.protocol}://${req.rawHeaders[1]}${req.originalUrl}`,
        message: data.msg,
        data: data.data,
        timestamp: data.timestamp,
    });
});

router.get("/mv/:id/streaming", async (req, res, next) => {
    const id = req.params.id;
    const data = await ZingMp3.getVideo(id);
    return res.json({
        requestStatus: data.err == 0 ? true : false,
        statusCode: data.err == 0 ? 200 : data.err == -1031 ? 404 : 500,
        requestURL: `${req.protocol}://${req.rawHeaders[1]}${req.originalUrl}`,
        message: data.msg,
        data: data.data,
        timestamp: data.timestamp,
    });
});

router.get("/lyric/:id", async (req, res, next) => {
    const id = req.params.id;
    const data = await ZingMp3.getLyric(id);
    return res.json({
        requestStatus: data.err == 0 ? true : false,
        statusCode: data.err == 0 ? 200 : data.err == -1031 ? 404 : 500,
        requestURL: `${req.protocol}://${req.rawHeaders[1]}${req.originalUrl}`,
        message: data.msg,
        data: data.data,
        timestamp: data.timestamp,
    });
});

router.get("/search", async (req, res, next) => {
    const keyword = req.query.q || null;
    const data = await ZingMp3.search(keyword);
    return res.json({
        requestStatus: data.err == 0 ? true : false,
        statusCode: data.err == 0 ? 200 : data.err == -1031 ? 404 : 500,
        requestURL: `${req.protocol}://${req.rawHeaders[1]}${req.originalUrl}`,
        message: data.msg,
        data: data.data,
        timestamp: data.timestamp,
    });
});

router.get("/artist/:keyword", async (req, res, next) => {
    const keyword = req.params.keyword;
    const data = await ZingMp3.getArtist(keyword);
    return res.json({
        requestStatus: data.err == 0 ? true : false,
        statusCode: data.err == 0 ? 200 : data.err == -1031 ? 404 : 500,
        requestURL: `${req.protocol}://${req.rawHeaders[1]}${req.originalUrl}`,
        message: data.msg,
        data: data.data,
        timestamp: data.timestamp,
    });
});

router.get("/mv/:id/category", async (req, res, next) => {
    const id = req.params.id;
    const data = await ZingMp3.getCategoryMV(id);
    return res.json({
        requestStatus: data.err == 0 ? true : false,
        statusCode: data.err == 0 ? 200 : data.err == -1031 ? 404 : 500,
        requestURL: `${req.protocol}://${req.rawHeaders[1]}${req.originalUrl}`,
        message: data.msg,
        data: data.data,
        timestamp: data.timestamp,
    });
});

module.exports = router;
