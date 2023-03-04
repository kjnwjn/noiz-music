<template>
  <div class="play-control grid grid-rows-2 grid-flow-col">
    <div class="play-control_list h-full flex justify-center items-center mt-2">
      <div class="play-control_left">
        <button
          :class="['shuffle_btn', { active: isShuffle }]"
          @click="handleShuffle"
        >
          <font-awesome-icon icon="fa-solid fa-shuffle" />
        </button>
        <button class="prev_btn">
          <font-awesome-icon icon="fa-solid fa-backward-step" />
        </button>
      </div>
      <play-button class="play-btn"></play-button>
      <div class="play-control_right">
        <button class="next_btn" @click="handleNextSong">
          <font-awesome-icon icon="fa-solid fa-forward-step" />
        </button>
        <button
          :class="['repeat_btn', { active: isRepeat }]"
          @click="handleRepeat"
        >
          <font-awesome-icon icon="fa-solid fa-repeat" />
        </button>
      </div>
    </div>
    <div class="play-control_bar">
      <div class="playback-bar flex items-center flex-row mt-2">
        <div class="current-time basis-1/12 pr-1">
          {{ timeFormat(currentTime) }}
        </div>
        <div class="process-bar_container basis-5/6">
          <div class="process-bar_content">
            <input
              id="progress"
              class="progress w-full"
              type="range"
              :value="songPercent || 0"
              step="0.1"
              min="0"
              max="100"
              @input="changeProcessBarValue($event)"
            />
            <span
              id="range-value-bar"
              ref="rangeValueBar"
              :style="{ width: `${songPercent}%` }"
            ></span>
          </div>
        </div>
        <div class="total-time basis-1/12 pl-1">
          {{ timeFormat(duration) }}
        </div>
      </div>
      <audio
        @timeupdate="handlePlayingAudio($event)"
        src=""
        id="player"
        ref="audio"
      ></audio>
    </div>
  </div>
</template>

<script>
import { dateTimeFormat } from "@/tools/helper";
import {
  mapState as mapControllerState,
  mapActions as mapControllerActions,
  mapMutations as mapControllerMutations,
} from "@/store/helper/Controller";

import { mapState as mapMusicState } from "@/store/helper/Music";
import PlayButton from "@/components/button/PlayButton.component";

export default {
  name: "play-control",
  components: { PlayButton },
  data: function () {
    return {};
  },
  computed: {
    ...mapControllerState([
      "audio",
      "isShuffle",
      "isRepeat",
      "currentSong",
      "currentTime",
      "songPercent",
      "duration",
    ]),
    ...mapMusicState(["currentSong"]),
  },
  mounted() {
    // if (this.currentSong) {
    //   this.set_audio(this.currentSong.songStreaming);
    // }
    // this.$refs.audio = this.audio;
    // this.audio.addEventListener("timeupdate", () => {
    //   console.log(123);
    // });
  },
  methods: {
    ...mapControllerActions([
      "handleShuffle",
      "handleRepeat",
      "handleOnSeeking",
      "handleNextSong",
    ]),
    ...mapControllerMutations(["set_audio"]),
    timeFormat: dateTimeFormat.getTime,
    changeProcessBarValue: function (e) {
      let width = e.target.value;
      this.handleOnSeeking(width);
      this.$refs.rangeValueBar.style.setProperty("width", `${width}%`);
    },
  },
};
</script>

<style lang="scss" >
.play-control {
  .play-control_list {
    button {
      width: var(--button-size);
      color: var(--text-color);
      font-size: 18px;
    }
    .play-control_right,
    .play-control_left {
      button {
        &:hover svg {
          color: rgb(192, 188, 188);
          transform: scale(1.2);
          transition: all ease-out 0.2s;
        }
      }
    }

    .shuffle_btn.active,
    .repeat_btn.active {
      color: red;
    }

    .scaleUp {
      transform: scale(1.2);
      transition: all ease-out 0.2s;
    }
  }
  .play-control_bar {
    .playback-bar {
      .current-time,
      .total-time {
        font-size: 14px;
        color: var(--text-color);
        text-align: center;
        cursor: context-menu;
      }
      .process-bar_container {
        width: 100%;
        height: 100%;
        .process-bar_content {
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
}
</style>