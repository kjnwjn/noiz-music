import { storage } from "@/tools/helper";
import { apiRequest } from "@/tools/helper";
// import axios from "axios";

const namespaced = true;
const state = {
    currentSong: storage.get("currentSong") || {},
    currentPlaylist: storage.get("currentPlaylist") || [],
    currentIndex: storage.get("currentIndex") || 0,
    timeEnd: 0,
    countDownActive: false,
};

const getters = {};
const mutations = {
    set_currentSong(state, value) {
        state.currentSong = value;
        storage.set("currentSong", value);
    },
    set_currentPlaylist(state, value) {
        state.currentPlaylist = value;
        storage.set("currentPlaylist", value);
    },
    set_currentIndex(state, value) {
        state.currentIndex = value;
        storage.set("currentIndex", value);
    },
};

const actions = {
    async handlePlayExactSong({ commit, dispatch }, { song, index, playlist }) {
        commit("Controller/set_loading", true, { root: true });
        commit("Controller/destroy_audio", {}, { root: true });

        await apiRequest(`/song/${song.encodeId}/streaming`)
            .then((res) => {
                return res[128] ? res[128] : null;
            })
            .then((url) => {
                if (url) {
                    commit("set_currentIndex", index);
                    commit("set_currentSong", { song, songStreaming: url });
                    commit("set_currentPlaylist", playlist);
                    dispatch("handlePlayAudioUrl", { currentTime: 0, songPercent: 0 });
                }
            })
            .catch((e) => console.log(e));
    },
    handlePlayAudioUrl: ({ state, commit, rootState, dispatch }, { currentTime, songPercent }) => {
        if (state.currentSong.songStreaming) {
            commit("Controller/destroy_audio", {}, { root: true });
            commit("Controller/set_audio", state.currentSong.songStreaming, { root: true });
            commit("Controller/set_duration", state.currentSong.song.duration, { root: true });
            commit("Controller/set_currentTime", currentTime, { root: true });
            commit("Controller/set_audioCurrentTime", currentTime, { root: true });
            commit("Controller/set_songPercent", songPercent, { root: true });
            commit("Controller/set_isPlaying", true, { root: true });
            commit("Controller/set_loading", false, { root: true });
            commit("Controller/set_playAudio", {}, { root: true });

            rootState.Controller.audio.addEventListener("timeupdate", () => {
                dispatch("Controller/handleOnPlaying", {}, { root: true });
            });
            rootState.Controller.audio.addEventListener("ended", () => {
                dispatch("Controller/handleOnEnded", {}, { root: true });
            });
            rootState.Controller.audio.addEventListener("pause", () => {
                dispatch("Controller/handlePause", {}, { root: true });
            });
            rootState.Controller.audio.addEventListener("play", () => {
                commit("Controller/set_isPlaying", true, { root: true });
            });
        }
    },
    async getCurrentSongStreaming({ commit, state }, songId) {
        commit;
        state;
        return await apiRequest(`/song/${songId}/streaming`)
            .then((res) => {
                return res[128] ? res[128] : null;
            })
            .catch((e) => console.log(e));
    },
};

export default {
    namespaced,
    state,
    getters,
    mutations,
    actions,
};
