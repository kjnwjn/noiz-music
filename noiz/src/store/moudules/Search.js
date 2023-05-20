// import { storage } from "@/tools/helper";
// import { apiRequest } from "@/tools/helper";
const { apiKey, apiUrl } = require("@/configs/configs");
import axios from "axios";

const namespaced = true;
const state = {
    searchData: null,
};

const getters = {
    get_searchData(state) {
        return state.searchData;
    },
};
const mutations = {
    set_searchData(state, value) {
        state.searchData = value;
    },
};

const actions = {
    async handleSearchBox({ commit, state }, q) {
        commit;
        state;
        axios
            .get(apiUrl + "/search" + "?api_key=" + apiKey + "&q=" + q)
            .then((result) => {
                return result.data.requestStatus ? result.data.data : null;
            })
            .then((data) => {
                if (data) {
                    commit("set_searchData", data);
                }
            })
            .catch(() => null);
    },
};

export default {
    namespaced,
    state,
    getters,
    mutations,
    actions,
};
