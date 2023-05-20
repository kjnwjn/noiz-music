import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import Meta from "vue-meta";
// import AboutView from "@/views/AboutView.vue";

Vue.use(VueRouter);
Vue.use(Meta);
const routes = [
    {
        path: "/",
        name: "home",
        component: HomeView,
    },
    {
        path: "/about",
        name: "about",
        component: AboutView,
    },

    {
        path: "/search",
        name: "search",
        component: () => import(/* webpackChunkName: "search" */ "@/views/SearchView.vue"),
    },

    {
        path: "/playlist/:id/:aliasTitle",
        name: "playlistDetail",
        component: () => import(/* webpackChunkName: "playlist" */ "@/views/PlaylistDetailView.vue"),
    },
];
const router = new VueRouter({
    routes,
    mode: "history",
});

export default router;
