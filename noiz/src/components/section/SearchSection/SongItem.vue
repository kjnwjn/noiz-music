<template>
    <div id="now-playing" class="p-2 now-playing flex items-center justify-between">
        <template v-if="checkObj(songItem)">
            <div class="img-wrapper flex justify-center items-center">
                <img ref="cd_thumb" :src="songItem.thumbnail" alt="cd-thumb" />
            </div>
            <div class="music-content px-3 flex flex-col justify-center">
                <div id="two" class="text-container">
                    <span class="animate name_music">
                        <router-link to="/">{{ songItem.title }}</router-link>
                    </span>
                </div>
                <div id="two" class="text-container">
                    <span class="animate opacity-80 text-xs"
                        ><router-link to="/">{{ songItem.artistsNames }}</router-link></span
                    >
                    <div class="fader fader-left"></div>
                    <div class="fader fader-right"></div>
                </div>
            </div>
            <heart-button></heart-button>
            <div>
                <span>{{ timeFormat(songItem.duration) }}</span>
            </div>
        </template>
    </div>
</template>

<script>
import heartButton from "@/components/button/HeartButton.component";
import { checkObj } from "@/tools/helper";
import { mapState as mapControllerState } from "@/store/helper/Controller";
import { dateTimeFormat } from "@/tools/helper";

export default {
    name: "now-playing",
    components: {
        heartButton,
    },
    methods: {
        checkObj,
        timeFormat: dateTimeFormat.getTime,
    },
    props: {
        songItem: {
            type: Object,
        },
    },
    computed: {
        // ...mapMusicState(["songItem"]),
        ...mapControllerState(["isPlaying"]),
    },
};
</script>

<style lang="scss" scoped>
.now-playing {
    height: 56px;
    .img-wrapper {
        width: 50px;
        height: 50px;
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
        width: 60%;
        #two {
            width: 100%;
            padding-right: 15px;
            overflow: hidden;
            height: 20px;
            // mask-image: linear-gradient(90deg, transparent 0%, black 5%, black 95%, transparent 100%);
            // -webkit-mask-image: linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%);
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
}
</style>
>
