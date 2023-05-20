import { storage, randomIndex, apiRequest } from "@/tools/helper";
const namespaced = true;
const state = {
    audio: null,
    isLoading: false,
    isPlaying: false,
    isRepeat: storage.get("isRepeat") || false,
    isShuffle: storage.get("isShuffle") || false,
    songPercent: storage.get("songPercent") || 0,
    currentTime: storage.get("currentTime") || 0,
    duration: storage.get("duration") || 0,
    volume: storage.get("volume") || 0,
};

const getters = {
    getController: (state) => {
        return state;
    },
};
const mutations = {
    set_audio(state, url) {
        state.audio = new Audio();
        state.audio.src = url;
    },
    set_audioVolume(state, value) {
        if (state.audio) {
            state.audio.volume = value;
        }
    },
    set_audioCurrentTime(state, value) {
        if (state.audio) {
            state.audio.currentTime = value;
        }
    },
    async set_playAudio(state) {
        state.audio ? state.audio.play() : undefined;
    },
    set_loopAudio(state, value) {
        state.audio ? (state.audio.loop = value) : undefined;
    },
    set_loadAudio(state) {
        state.audio ? state.audio.load() : undefined;
    },
    set_pauseAudio(state) {
        state.audio ? state.audio.pause() : undefined;
    },
    destroy_audio(state) {
        state.audio ? state.audio.pause() : undefined;
        state.audio = null;
        state.isPlaying = false;
    },
    set_loading(state, value) {
        state.isLoading = value;
    },
    set_isPlaying(state, value) {
        state.isPlaying = value;
    },
    set_repeat(state, value) {
        state.isRepeat = value;
        storage.set("isRepeat", value);
    },
    set_shuffle(state, value) {
        state.isShuffle = value;
        storage.set("isShuffle", value);
    },
    set_songPercent(state, value) {
        state.songPercent = value;
        storage.set("songPercent", value);
    },
    set_currentTime(state, value) {
        state.currentTime = value;
        storage.set("currentTime", value);
    },
    set_duration(state, value) {
        state.duration = value;
        storage.set("duration", value);
    },
    set_volume(state, value) {
        state.volume = value;
        storage.set("volume", value);
    },
};

const actions = {
    handleShuffle({ commit, state }) {
        commit("set_shuffle", !state.isShuffle);
    },
    handleRepeat({ commit, state }) {
        commit("set_repeat", !state.isRepeat);
    },
    handleLoading({ commit }, value) {
        commit("set_loading", value);
    },
    handlePause({ commit }) {
        commit("set_pauseAudio");
        commit("set_isPlaying", false);
        commit("set_loading", false);
    },
    handlePlayBtn({ dispatch, commit, state }) {
        let songPercent = storage.get("songPercent") || 0;
        let currentTime = storage.get("currentTime") || 0;
        let volume = Number(storage.get("volume") || 0.3);
        commit("set_currentTime", currentTime);
        commit("set_songPercent", songPercent);
        commit("set_audioVolume", volume);
        dispatch(
            "Music/handlePlayAudioUrl",
            { currentTime: state.currentTime, songPercent: state.songPercent },
            { root: true }
        );
    },
    handleOnPlaying({ commit, state, rootState }) {
        if (rootState.Music.currentSong.songStreaming && state.audio) {
            commit("set_loading", false);
            let songPercent = (state.audio.currentTime * 100) / state.audio.duration;
            commit("set_songPercent", songPercent);
            commit("set_currentTime", state.audio.currentTime);
        }
    },
    handleOnEnded({ commit, dispatch, rootState }) {
        if (rootState.Music.currentSong.songStreaming && state.audio) {
            commit("set_currentTime", 0);
            commit("set_songPercent", 0);
            commit("destroy_audio");
            state.isRepeat ? dispatch("Music/handlePlayAudioUrl", {}, { root: true }) : dispatch("handleNextSong");
        }
    },
    async handleNextSong({ state, rootState, commit, dispatch }) {
        dispatch;
        commit("set_currentTime", 0);
        commit("set_songPercent", 0);
        commit("destroy_audio");

        let currentPlaylist = rootState.Music.currentPlaylist.length > 0 ? rootState.Music.currentPlaylist : [];
        let nextSong =
            rootState.Music.currentIndex + 1 < currentPlaylist.length
                ? currentPlaylist[rootState.Music.currentIndex + 1]
                : currentPlaylist[0];

        state.isShuffle
            ? commit("Music/set_currentIndex", randomIndex(currentPlaylist.length), { root: true })
            : commit("Music/set_currentIndex", currentPlaylist.indexOf(nextSong), { root: true });
        let encodeId = nextSong.encodeId;
        let playlistId = rootState.Music.currentPlaylistId;
        await apiRequest(`/song/${encodeId}/streaming`)
            .then((res) => {
                res[128]
                    ? dispatch(
                          "Music/handlePlayExactSong",
                          {
                              song: nextSong,
                              index: currentPlaylist.indexOf(nextSong),
                              playlist: currentPlaylist,
                              playlistId,
                          },
                          { root: true }
                      )
                    : dispatch("handleNextSong");
            })
            .catch((e) => console.log(e));
    },

    handleOnSeeking({ commit, state }, value) {
        commit;
        state;
        const currentTime = (state.duration / 100) * value;
        commit("set_audioCurrentTime", currentTime);
        commit("set_currentTime", currentTime);
        commit("set_songPercent", value);
    },
    handleUpdateVolume({ commit, state }, value) {
        commit;
        state;
        commit("set_volume", value);
        if (state.audio) {
            commit("set_audioVolume", value);
        }
    },
};

export default {
    namespaced,
    state,
    getters,
    mutations,
    actions,
};
