import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import "@/assets/tailwind.css";
import VueMeta from "vue-meta";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
// import { AVLine } from "vue-audio-visual";
export const eventBus = new Vue();
import {
    faUserSecret,
    faHouse,
    faCompactDisc,
    faMagnifyingGlass,
    faSquarePlus,
    faHeart,
    faBookBookmark,
    faShuffle,
    faPlay,
    faPause,
    faForwardStep,
    faBackwardStep,
    faRepeat,
    faCaretDown,
    faEllipsis,
    faClock,
    faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import ThemifyIcon from "vue-themify-icons";

/* add icons to the library */
library.add(
    faUserSecret,
    faHouse,
    faCompactDisc,
    faMagnifyingGlass,
    faSquarePlus,
    faHeart,
    faBookBookmark,
    faShuffle,
    faPlay,
    faPause,
    faForwardStep,
    faBackwardStep,
    faRepeat,
    faCaretDown,
    faEllipsis,
    faClock,
    faSpinner
);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("themi-fy", ThemifyIcon);
Vue.use(VueMeta);
// Vue.component("av-line", AVLine);
Vue.config.productionTip = false;

// Vue.use(AVPlugin);
new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
