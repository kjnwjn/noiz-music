<template v-if="playlist">
    <div
        id="card-hint"
        class="flex items-center"
        @mouseover="isShowPlayBtn = !isShowPlayBtn"
        @mouseout="isShowPlayBtn = !isShowPlayBtn"
        @click="
            () => {
                this.$router.push(`/playlist/${playlist.encodeId}/${playlist.aliasTitle}`);
            }
        "
    >
        <div class="img-card h-full">
            <img :src="playlist?.thumbnail" :alt="playlist?.aliasTitle" />
        </div>
        <div class="content-hint">
            <div class="content-hint_title">
                <h1>{{ playlist?.title }}</h1>
            </div>
            <div :class="['play-btn', { active: isShowPlayBtn }]">
                <play-button :playlistId="playlist?.encodeId"></play-button>
            </div>
        </div>
    </div>
</template>

<script>
import PlayButton from "@/components/button/PlayButton.component";
import { mapState as mapMusicState } from "@/store/helper/Music";
const { apiKey, apiUrl } = require("@/configs/configs");
import axios from "axios";
export default {
    data: function () {
        return {
            isShowPlayBtn: false,
            playlist: null,
        };
    },
    components: {
        PlayButton,
    },
    async mounted() {
        await axios
            .get(`${apiUrl}/playlist/${this.currentPlaylistId}/details?api_key=${apiKey}`)
            .then((res) => {
                console.log(res);
                this.playlist = res.data.data || null;
            })
            .catch((e) => {
                console.error(e);
            });
    },
    computed: {
        ...mapMusicState(["currentPlaylistId"]),
    },
    methods: {},
};
</script>

<style lang="scss" scoped>
#card-hint {
    background: hsla(0, 0%, 100%, 0.2);
    border-radius: 5px;
    overflow: hidden;
    height: 80px;
    &:hover {
        background-color: hsla(0, 0%, 100%, 0.1);
        transition: background-color 0.3s ease;
    }
    cursor: pointer;
    .img-card {
        min-width: 80px;
        min-height: 80px;
        img {
            height: 100%;
            width: 100%;
        }
    }
    .play-btn {
        transition: all 0.3s ease;
        opacity: 0;
        visibility: hidden;

        button {
            box-shadow: 0 8px 8px #0000004d;
            width: 48px;
            height: 48px;
        }
    }
    .play-btn.active {
        opacity: 1;
        visibility: visible;
    }

    .content-hint {
        display: flex;
        padding: 0 20px;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        // height: 100%;
        .content-hint_title {
            // height: 80%;
            h1 {
                height: 100%;
                color: var(--text-color);
                font-size: var(--text-size);
                font-weight: 600;
            }
        }
    }
}
</style>
