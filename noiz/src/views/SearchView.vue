<template>
    <div>
        <header-container>
            <template #searchbox>
                <search-box> </search-box>
            </template>
        </header-container>

        <section class="py-4 grid gap-4 tablet:grid-cols-1 laptop:grid-cols-1 desktop:grid-cols-2" v-if="searchData">
            <div
                class="top-result"
                v-show="searchData?.top.objectType == 'song'"
                @mouseover="isShowPlayBtn = !isShowPlayBtn"
                @mouseout="isShowPlayBtn = !isShowPlayBtn"
            >
                <h1 class="title_section">Top Result</h1>
                <div class="top_main-result grid grid-row-3 gap-4">
                    <div class="img-card w-fit">
                        <img :src="searchData.top.thumbnail" />
                    </div>
                    <div class="title">
                        <h1>{{ searchData.top.title }}</h1>
                    </div>
                    <div class="desc">
                        <a href="#">{{ searchData.top.artistsNames }}</a>
                        <button>Album</button>
                    </div>
                    <div :class="['play-btn', { active: isShowPlayBtn }]">
                        <play-btn :songId="searchData.top.encodeId"></play-btn>
                    </div>
                </div>
            </div>
            <div
                class="top-result"
                v-show="searchData?.top.objectType == 'artist'"
                @mouseover="isShowPlayBtn = !isShowPlayBtn"
                @mouseout="isShowPlayBtn = !isShowPlayBtn"
            >
                <h1 class="title_section">Top Result</h1>
                <div class="top_main-result grid grid-row-3 gap-4">
                    <div class="img-card w-fit">
                        <img :src="searchData.top.thumbnail" />
                    </div>
                    <div class="title">
                        <h1>{{ searchData.top.name }}</h1>
                    </div>
                    <div class="desc">
                        <button>{{ searchData.top.objectType }}</button>
                    </div>
                    <div :class="['play-btn', { active: isShowPlayBtn }]">
                        <play-btn :artist="searchData.songs"></play-btn>
                    </div>
                </div>
            </div>
            <div
                class="top-result"
                v-show="searchData?.top.objectType == 'playlist'"
                @mouseover="isShowPlayBtn = !isShowPlayBtn"
                @mouseout="isShowPlayBtn = !isShowPlayBtn"
            >
                <h1 class="title_section">Top Result</h1>
                <div class="top_main-result grid grid-row-3 gap-4">
                    <div class="img-card w-fit">
                        <img :src="searchData.top.thumbnail" />
                    </div>
                    <div class="title">
                        <h1>{{ searchData.top.title }}</h1>
                    </div>
                    <div class="desc">
                        <a href="#">By {{ searchData.top.artistsNames }}</a>
                        <button>{{ searchData.top.objectType }}</button>
                    </div>
                    <div :class="['play-btn', { active: isShowPlayBtn }]">
                        <play-btn :playlistId="searchData.top.encodeId"></play-btn>
                    </div>
                </div>
            </div>
            <div class="top-songs" v-if="searchData?.songs">
                <h1 class="title_section">Songs</h1>
                <ul class="list-song" v-for="item in searchData.songs" :key="item.encodeId">
                    <li><song-item :songItem="item"></song-item></li>
                </ul>
            </div>
        </section>
        <section class="pb-8 grid gap-y-5" v-if="searchData && searchData?.topSuggest">
            <h1 class="title_section">Top Suggests</h1>
            <div
                class="grid desktop:grid-cols-4 laptop:grid-cols-3 tablet:grid-cols-2 gap-6"
                v-if="searchData.topSuggest.length > 0"
            >
                <card-item
                    class="text-white"
                    v-for="(item, index) in searchData.topSuggest"
                    :key="index"
                    :cardItem="item"
                ></card-item>
            </div>
        </section>
        <section class="pb-8 grid gap-y-5" v-if="searchData && searchData.playlists">
            <h1 class="title_section">Playlist</h1>
            <div class="grid desktop:grid-cols-4 laptop:grid-cols-3 tablet:grid-cols-2 gap-6">
                <card-item
                    class="text-white"
                    v-for="(item, index) in searchData.playlists"
                    :key="index"
                    :cardItem="item"
                ></card-item>
            </div>
        </section>
    </div>
</template>

<script>
import HeaderContainer from "@/components/main/Header.component";
import SearchBox from "@/components/searchBox/SearchBox.component";
import SongItem from "@/components/section/SearchSection/SongItem";
import CardItem from "@/components/card/CardItem.component";
import playBtn from "@/components/button/PlayButton.component";

import { mapState as mapSearchState, mapActions as mapSearchActions } from "@/store/helper/Search";

// const { apiKey, apiUrl } = require("@/configs/configs");

import { mapState as mapMusicState } from "@/store/helper/Music";

export default {
    components: {
        HeaderContainer,
        SearchBox,
        SongItem,
        CardItem,
        playBtn,
    },
    data: function () {
        return {
            playList: [],
            isShowPlayBtn: false,
        };
    },
    computed: {
        ...mapMusicState(["currentSong"]),
        ...mapSearchState(["searchData"]),
    },
    mounted() {
        this.handleSearchBox("");
    },
    methods: {
        ...mapSearchActions(["handleSearchBox"]),
    },
};
</script>

<style lang="scss" scoped>
.top-result {
    color: white;
    min-height: 300px;
    border-radius: 5px;

    .top_main-result {
        position: relative;
        max-height: 76%;
        border-radius: 10px;
        cursor: pointer;
        background: radial-gradient(black, transparent);
        padding: 20px;
        margin: 10px;
        transition: all 0.2s linear;
        img {
            width: 90px;
            height: 90px;
            border-radius: 5px;
            transition: all 0.2s linear;
        }
        .title {
            width: 100%;
            height: 38px;
            overflow: hidden;
            h1 {
                font-size: 1.5rem;
                font-weight: 600;
            }
        }
        .desc {
            a {
                opacity: 0.7;
            }
            button {
                margin-left: 10px;
                padding: 5px;
                background: #8b6d4447;
                border-radius: 18px;
                font-size: 0.8rem;
                font-weight: 600;
            }
        }
        .play-btn {
            z-index: 100;
            transition: all 0.3s ease;
            opacity: 0;
            visibility: hidden;
            position: absolute;
            bottom: 10%;
            right: 0;

            button {
                box-shadow: 0 8px 8px #0000004d;
                width: 55px;
                height: 55px;
                svg {
                    font-size: 1.275rem;
                }
            }
        }
        .play-btn.active {
            opacity: 1;
            visibility: visible;
        }
        &:hover {
            background: #575149;
            img {
                box-shadow: 0 8px 8px #0000004d;
            }
        }
    }
}
.top-songs {
    color: white;
    min-height: 300px;
    border-radius: 5px;
    .list-song {
        border-radius: 10px;
        cursor: pointer;
        // background: radial-gradient(black, transparent);
        // padding: 20px;
        margin: 10px;
        transition: all 0.2s linear;
        li {
            transition: all 0.2s linear;

            &:hover {
                border-radius: 5px;
                background: #575149;
                img {
                    box-shadow: 0 8px 8px #0000004d;
                }
            }
        }
    }
}
.title_section {
    margin: 0 10px;
    font-size: 1.6rem;
    color: white;
    font-weight: 600;
}
</style>
