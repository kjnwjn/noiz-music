<template>
    <div id="now-playing" class="now-playing flex items-center">
        <template v-if="checkObj(currentSong)">
            <div class="img-wrapper flex justify-center items-center">
                <img ref="cd_thumb" :src="currentSong.song.thumbnail" alt="cd-thumb" />
            </div>
            <div class="music-content px-3 flex flex-col justify-center">
                <div id="two" class="text-container">
                    <span class="animate name_music">
                        <router-link to="/">{{ currentSong.song.title }}</router-link>
                    </span>
                </div>
                <div id="two" class="text-container">
                    <span class="animate opacity-80 text-xs"
                        ><router-link to="/">{{ currentSong.song.artistsNames }}</router-link></span
                    >
                    <div class="fader fader-left"></div>
                    <div class="fader fader-right"></div>
                </div>
            </div>
            <heart-button></heart-button>
        </template>
    </div>
</template>

<script>
import heartButton from "@/components/button/HeartButton.component";
import { checkObj } from "@/tools/helper";
import { mapState as mapMusicState } from "@/store/helper/Music";
import { mapState as mapControllerState } from "@/store/helper/Controller";
export default {
    name: "now-playing",
    components: {
        heartButton,
    },
    methods: {
        checkObj,
    },
    props: {
        songItem: {
            type: Object,
        },
    },
    computed: {
        ...mapMusicState(["currentSong"]),
        ...mapControllerState(["isPlaying"]),
    },
};
</script>

<style lang="scss" scoped>
.img-wrapper {
    width: 80px;
    height: 80px;
    img {
        border-radius: 10%;
        width: 80%;
        background-size: cover;
        background-position: center;
    }
    img.animation {
        animation: rotation 10s infinite linear;
    }
}
.music-content {
    width: 50%;
    #two {
        width: 100%;
        padding-right: 15px;
        overflow: hidden;
        height: 20px;
        mask-image: linear-gradient(90deg, transparent 0%, black 5%, black 95%, transparent 100%);
        -webkit-mask-image: linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%);
    }
    .text-container {
        min-width: 0;
        font-size: 2rem;
        color: var(--text-color);
        white-space: nowrap;
        overflow: visible;
        position: relative;
        border-radius: 5px;
        .name_music {
            font-size: 15px;
        }
        span {
            display: inline-block;
            line-height: 16px;
            position: relative;
            bottom: 20px;
        }
        &:hover {
            span {
                animation: leftright 5s infinite alternate ease-in-out;
            }
        }
    }
}

@keyframes leftright {
    0%,
    20% {
        transform: translateX(0%);
        left: 0%;
    }
    80%,
    100% {
        transform: translateX(-100%);
        left: 100%;
    }
}
.fader {
    position: absolute;
    top: 0;
    height: 100%;
    width: 10px;

    &.fader-left {
        left: -5px;
        background: linear-gradient(to left, rgba(117, 111, 157, 0), rgba(117, 111, 157, 1));
    }

    &.fader-right {
        right: 0;
        background: linear-gradient(to right, rgba(117, 111, 157, 0), #40617b00);
    }
}
</style>
>
