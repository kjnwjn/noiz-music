import Vue from "vue";
import Vuex from "vuex";
import Controller from "./moudules/Controller";
import Music from "./moudules/Music";
import Search from "./moudules/Search";
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        Controller,
        Music,
        Search,
    },
});
