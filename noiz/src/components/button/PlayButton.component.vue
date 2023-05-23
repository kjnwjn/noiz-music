<template>
    <button class="play_btn" v-if="!isPlaying || playlistId != currentPlaylistId" @click="handlePlayInComponent">
        <font-awesome-icon v-if="isLoading" class="loading" icon="fa-solid fa-spinner" />
        <font-awesome-icon v-else icon="fa-solid fa-play" class="text-sm" />
    </button>
    <button class="pause_btn" v-else @click="handlePauseInComponent">
        <font-awesome-icon v-if="isLoading" class="loading" icon="fa-solid fa-spinner" />
        <font-awesome-icon v-else icon="fa-solid fa-pause" class="text-sm" />
    </button>
</template>

<script>
import { mapState as mapMusicState, mapActions as mapMusicActions } from "@/store/helper/Music";
import { mapState as mapControllerState, mapActions as mapControllerActions } from "@/store/helper/Controller";
import { eventBus } from "@/main";
import axios from "axios";
const { apiKey, apiUrl } = require("@/configs/configs");

export default {
    computed: {
        ...mapControllerState(["isPlaying", "isLoading"]),
        ...mapMusicState(["currentPlaylistId", "currentSong"]),
    },
    data: function () {
        return {
            // playList: {},
        };
    },
    props: {
        playlistId: {
            type: String,
        },
        // songId :{
        //     type: String,
        // }
    },
    methods: {
        ...mapMusicActions(["handlePlayExactSong"]),
        ...mapControllerActions(["handlePause", "handlePlayBtn"]),
        async handlePlayInComponent() {
            let data = null;
            let playList = null;
            // if(this.playlistId){

            //     // this.handlePlayBtn();
            // // eventBus.$emit("pauseAction", false);
            // }
            await axios
                .get(`${apiUrl}/playlist/${this.playlistId}/details?api_key=${apiKey}`)
                .then(function (res) {
                    playList = res.data.data;
                    data = {
                        song: playList.song.items[0],
                        index: 0,
                        playlist: playList.song.items,
                        playlistId: playList.encodeId,
                    };
                })
                .catch((e) => {
                    console.error(e);
                });
            if (this.currentPlaylistId) {
                if (this.playlistId != this.currentPlaylistId) {
                    console.log(this.playList);
                    this.handlePlayExactSong(data);
                } else {
                    this.handlePlayBtn();
                    eventBus.$emit("pauseAction", false);
                }
            } else {
                this.handlePlayExactSong(data);
                eventBus.$emit("pauseAction", false);
            }
        },
        handlePauseInComponent() {
            this.handlePause();
            eventBus.$emit("pauseAction", true);
        },
    },
};
</script>

<style lang="scss" scoped>
.loading {
    animation: rotation 2s infinite linear;
}
button {
    color: var(--text-color);
    padding: 5px;
    background-color: var(--btn-color);
    border-radius: 50%;
    width: var(--button-size);
    height: var(--button-size);
    color: var(--text-color);
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 17px;
    svg {
        font-size: calc(var(--button-size) * 0.5);
    }
    &:hover svg {
        transform: scale(0.9);
        transition: all ease-out 0.2s;
    }
    &:hover {
        background-color: var(--btn-color-hover);
    }
}
</style>
