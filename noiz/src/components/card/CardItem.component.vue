<template>
    <section
        class="p-4 relative"
        @mouseover="isShowPlayBtn = !isShowPlayBtn"
        @mouseout="isShowPlayBtn = !isShowPlayBtn"
    >
        <div id="card-item" @click="getPlaylistDetail()">
            <div
                class="card-img bg-contain bg-no-repeat"
                :style="{ backgroundImage: 'url(' + cardItem.thumbnail + ')' }"
            ></div>
            <h4 class="card-name">{{ cardItem.title }}</h4>
            <p class="card-desc">{{ cardItem.artistsNames }}</p>
        </div>
        <div :class="['play-btn', { active: isShowPlayBtn }]">
            <play-btn :playlistId="cardItem.encodeId"></play-btn>
        </div>
    </section>
</template>

<script>
import axios from "axios";
import playBtn from "@/components/button/PlayButton.component";
const { apiKey, apiUrl } = require("@/configs/configs");
export default {
    data: function () {
        return {
            isShowPlayBtn: false,
        };
    },
    props: {
        cardItem: {
            type: Object,
            default: null,
        },
    },
    components: {
        playBtn,
    },
    methods: {
        async getPlaylistDetail() {
            await axios
                .get(`${apiUrl}/playlist/${this.cardItem.encodeId}/details?api_key=${apiKey}`)
                .then((res) => {
                    const aliasTitle = res.data.data.aliasTitle || "";
                    this.$router.push(`/playlist/${this.cardItem.encodeId}/${aliasTitle}`);
                })
                .catch((e) => {
                    console.error(e);
                });
        },

        // ...mapMutations["handlePlayAudio"],
    },
};
</script>

<style lang="scss" scoped>
section {
    background: #131718;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.2s linear;
    &:hover {
        background: #474747;
    }
    #card-item {
        .card-img {
            border-radius: 5px;
            padding-top: 100%;
        }
        h4 {
            margin: 18px 0 6px 0;
            font-weight: 600;
        }
        p {
            font-size: 0.8rem;
            opacity: 0.8;
        }
    }
    .play-btn {
        z-index: 100;
        transition: all 0.3s ease;
        opacity: 0;
        visibility: hidden;
        position: absolute;
        bottom: 35%;
        right: 5px;

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
}
</style>
