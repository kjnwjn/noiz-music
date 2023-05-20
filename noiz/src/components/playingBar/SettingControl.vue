<template>
    <div class="setting-control">
        <ul class="list-func flex justify-end items-center h-full">
            <li class="item-func">
                <div class="queue-item"><ThemifyIcon icon="list-ol" /></div>
            </li>
            <li class="item-func">
                <div>
                    <ThemifyIcon icon="volume" />
                    <div class="mute"></div>
                </div>
            </li>
            <li class="item-func volume-item">
                <div class="volume-bar_content">
                    <input
                        ref="progress"
                        id="progress"
                        class="progress w-full"
                        type="range"
                        step="0.1"
                        min="0"
                        max="100"
                        :v-model="volume || 0"
                        @input="changeProcessBarValue($event)"
                    />
                    <span id="range-value-bar" ref="rangeValueBar"></span>
                </div>
            </li>
            <li class="item-func">
                <div><ThemifyIcon icon="fullscreen" /></div>
            </li>
        </ul>
    </div>
</template>

<script>
import ThemifyIcon from "vue-themify-icons";
import {
    mapState as mapControllerState,
    mapActions as mapControllerActions,
    mapMutations as mapControllerMutations,
} from "@/store/helper/Controller";
import { storage } from "@/tools/helper";

export default {
    components: {
        ThemifyIcon,
    },
    // data: function () {
    //     return {
    //         volumeValue: 0,
    //     };
    // },
    computed: {
        ...mapControllerState[("volume", "audio")],
    },
    mounted() {
        const val = Number(storage.get("volume") || 0);
        this.$refs.progress.value = val * 100;
        this.handleUpdateVolume(val);
        this.$refs.rangeValueBar.style.setProperty("width", `${this.$refs.progress.value}%`);
        console.log(this.$refs.progress.value);
    },
    methods: {
        ...mapControllerMutations(["set_volume", "set_audioVolume"]),
        ...mapControllerActions(["handleUpdateVolume"]),
        changeProcessBarValue: function (e) {
            let width = e.target.value;
            this.$refs.rangeValueBar.style.setProperty("width", `${width}%`);
            this.handleUpdateVolume(Number(width / 100));
        },
    },
};
</script>

<style lang="scss" scoped>
.setting-control {
    .list-func {
        .item-func {
            width: 36px;
            text-align: center;
            color: white;
            cursor: pointer;
            font-weight: bold;
            &:hover i {
                color: rgb(192, 188, 188);
                transform: scale(1.2);
                transition: all ease-out 0.2s;
            }
        }
        .volume-item {
            width: 72px;
            .volume-bar_content {
                position: relative;
                width: 100%;
                top: -2px;
                #progress {
                    /* Reset the default appearance */
                    -webkit-appearance: none;
                    appearance: none;
                    border-radius: 2px;
                    &::before {
                        content: "";
                        width: 100%;
                        height: 21px;
                        position: absolute;
                        background-color: transparent;
                        top: 4px;
                        right: 0;
                        z-index: 10000;
                        cursor: pointer;
                    }
                }
                #range-value-bar {
                    content: "0";
                    background-color: var(--main-color);
                    position: absolute;
                    z-index: 100;
                    height: 6px;
                    top: 16px;
                    margin: 0;
                    border-radius: 1px;
                    left: 0;
                    margin-top: -4px;
                }
                input[type="range"]::-webkit-slider-runnable-track {
                    background: var(--text-color);
                    height: 0.3rem;
                    border-radius: 5px;
                    position: relative;
                }
                input[type="range"]::-moz-range-track {
                    background: var(--text-color);
                    height: 0.3rem;
                    border-radius: 5px;
                }

                input[type="range"]::-webkit-slider-thumb {
                    // visibility: hidden;
                    -webkit-appearance: none; /* Override default look */
                    margin-top: -4px; /* Centers thumb on the track */
                    border-radius: 50%;
                    background-color: var(--main-color);
                    height: 0.8rem;
                    width: 0.8rem;
                }
            }
        }
    }
}
</style>
