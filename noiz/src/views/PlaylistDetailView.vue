<template>
    <div>
        <header-container> </header-container>
        <section class="pb-8">
            <profile-container class="profile-container" :playList="playList"></profile-container>
        </section>

        <section class="pb-8">
            <div class="action-bar flex items-center">
                <play-button class="play-btn"></play-button>
                <heart-button class="heart-btn"></heart-button>
                <button class="menu">
                    <font-awesome-icon icon="fa-solid fa-ellipsis" />
                </button>
            </div>
        </section>

        <section class="pb-16">
            <div class="songs-content">
                <table class="table-auto w-full">
                    <thead
                        class="title text-left uppercase border-b-slate-400 border-solid border-b-2 border-opacity-50"
                    >
                        <tr>
                            <th class="py-5">#</th>
                            <th>Title</th>
                            <th class="w-48">Album</th>
                            <th class="w-48">Date</th>
                            <th class="w-16">
                                <font-awesome-icon icon="fa-solid fa-clock" />
                            </th>
                        </tr>
                    </thead>
                    <br />
                    <tbody v-if="playList">
                        <tr class="song_item" v-for="(song, index) in playList.song.items" :key="song.encodeId">
                            <td class="stt">
                                <p
                                    class="stt_val"
                                    v-if="(!isPlaying && !isLoading) || currentSong.song?.encodeId != song.encodeId"
                                >
                                    {{ index }}
                                </p>
                                <img
                                    v-if="!isLoading && isPlaying && currentSong.song?.encodeId == song.encodeId"
                                    src="@/assets/icon-playing.gif"
                                />
                                <div
                                    @click="
                                        () => {
                                            handlePlayExactSong({
                                                song,
                                                index,
                                                playlist: playList.song.items,
                                            });
                                            isPause = false;
                                        }
                                    "
                                >
                                    <font-awesome-icon
                                        v-if="isLoading && currentSong.song?.encodeId == song.encodeId"
                                        class="loading"
                                        icon="fa-sharp fa-regular fa-spinner "
                                    />
                                    <font-awesome-icon
                                        v-if="(isPlaying && currentSong.song?.encodeId != song.encodeId) || isPause"
                                        icon="fa-solid fa-play"
                                        class="text-sm play-btn_stt hidden m-0"
                                    />
                                </div>
                            </td>
                            <td class="track-list">
                                <div class="track-list_img">
                                    <img :src="song.thumbnail" alt="" />
                                </div>
                                <div class="track-list_content">
                                    <router-link
                                        to="#"
                                        class="track-list_title"
                                        :class="{
                                            active: !isLoading && currentSong.song?.encodeId == song.encodeId,
                                        }"
                                    >
                                        {{ song.title }}
                                    </router-link>
                                    <p class="track-list_decs">
                                        <router-link to="#"> {{ song.artistsNames }}</router-link>
                                    </p>
                                </div>
                            </td>
                            <td>
                                <p class="song_album">{{ song.album?.title }}</p>
                            </td>
                            <td>{{ dateFormat(song.releaseDate) }}</td>
                            <td>{{ timeFormat(song.duration) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    </div>
</template>
<script>
import axios from "axios";
import heartButton from "@/components/button/HeartButton.component";
import playButton from "@/components/button/PlayButton.component";
import headerContainer from "@/components/main/Header.component";
import profileContainer from "@/components/profile/ProfileContainer.component.vue";
import { dateTimeFormat, checkObj } from "@/tools/helper";

import {
    mapState as mapMusicState,
    mapActions as mapMusicActions,
    // mapMutations as mapMusicMutations,
} from "@/store/helper/Music";
import { mapState as mapControllerState } from "@/store/helper/Controller";
import { eventBus } from "@/main";
const { apiKey, apiUrl } = require("@/configs/configs");
export default {
    components: {
        headerContainer,
        profileContainer,
        playButton,
        heartButton,
    },
    data: function () {
        return {
            playList: null,
            isPause: false,
            storageSong: 0,
        };
    },
    methods: {
        dateFormat: dateTimeFormat.getDate,
        timeFormat: dateTimeFormat.getTime,
        checkObj,
        ...mapMusicActions(["handlePlayExactSong"]),
        // ...mapMusicMutations(["set_currentIndex", "set_currentPlaylist"]),
    },
    computed: {
        ...mapControllerState(["isLoading", "isPlaying"]),
        ...mapMusicState(["currentSong"]),
    },

    async mounted() {
        if (checkObj(this.currentSong)) {
            this.storageSong = this.currentSong.song.encodeId;
        }
        await axios
            .get(`${apiUrl}/playlist/${this.$route.params.id}/details?api_key=${apiKey}`)
            .then((res) => {
                this.playList = res.data.data || null;
            })
            .catch((e) => {
                console.error(e);
            });
    },
    created() {
        this.isPause = true;
        eventBus.$on("pauseAction", (action) => {
            this.isPause = action;
        });
    },
};
</script>
<style lang="scss" scoped>
.active {
    color: var(--text-color-hover);
}
.action-bar {
    font-size: 2rem;
    color: var(--text-color);
    .play-btn {
        width: 58px;
        height: 58px;
        margin-right: 20px;
    }
    .heart-btn {
        margin-right: 20px;
    }
}
.songs-content {
    table {
        color: var(--text-color);
        th {
            color: #bac0c0;
            font-weight: 500;
            font-size: 0.75rem;
        }
        tr {
            border-radius: 5px;
            .stt {
                width: 42px;
                text-align: center;
                padding: 0 16px;
                .loading {
                    animation: rotation 2s infinite linear;
                }
            }
            .track-list {
                padding: 6px 0;

                display: flex;
                .track-list_img {
                    width: 45px;
                    height: 45px;
                    margin-right: 10px;
                    img {
                        width: 100%;
                        min-width: 45px;
                    }
                }
                .track-list_content {
                    width: 268px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    .track-list_title,
                    .track-list_decs {
                        font-size: 1rem;
                        line-height: 15px;
                        height: 15px;
                        overflow: hidden;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 1;
                        white-space: unset;
                        word-break: break-all;
                        &:hover {
                            text-decoration: underline;
                            transition: all ease-in 0.2s;
                            color: var(--text-color);
                        }
                    }
                    .track-list_decs {
                        font-size: 0.8rem;
                        color: #bac0c0;
                    }
                }
            }
            .song_album {
                font-size: 1rem;
                line-height: 15px;
                height: 15px;
                overflow: hidden;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                white-space: unset;
                word-break: break-all;
            }
        }

        .song_item {
            &:hover {
                background: #7f8f9257;
                transition: all linear 0.2s;
                border-radius: 5px;
                .stt_val {
                    visibility: hidden;
                    display: none;
                }
                .play-btn_stt {
                    visibility: visible;
                    display: block;
                    padding: 0;
                    background: transparent;
                    width: auto;
                }
            }
        }
    }
}
</style>
