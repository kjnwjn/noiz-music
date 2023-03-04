const { apiKey, apiUrl } = require("@/configs/configs");
const axios = require("axios");

module.exports = {
    storage: {
        set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
        get: (key) => JSON.parse(localStorage.getItem(key)),
    },
    checkObj: function (objName) {
        return typeof objName == "object" && Object.keys(objName).length > 0 ? true : false;
    },

    dateTimeFormat: {
        getDate: (key) => {
            var currentDateWithFormat = new Date(key * 1000).toJSON().slice(0, 10).replace(/-/g, "/");
            return currentDateWithFormat;
        },
        getTime: (key) => {
            const second = key % 60 > 10 ? Math.floor(key % 60) : `0${Math.floor(key % 60)}`;
            const minute = Math.floor(key / 60);
            return `${minute}:${second}`;
        },
    },
    randomIndex: (arrLength) => {
        let min = 0;
        let max = Math.floor(arrLength);
        return Math.floor(Math.random() * (max - min) + min);
    },
    apiRequest: async function (url, params = {}) {
        const qP = "&" + new URLSearchParams(params).toString();
        return await axios
            .get(apiUrl + url + "?api_key=" + apiKey + qP)
            .then((result) => (result.data.requestStatus ? result.data.data : null))
            .catch(() => null);
    },
};
