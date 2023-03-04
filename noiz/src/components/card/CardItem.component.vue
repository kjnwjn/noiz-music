<template>
  <section
    class="p-4"
    @mouseover="isShowPlayBtn = !isShowPlayBtn"
    @mouseout="isShowPlayBtn = !isShowPlayBtn"
  >
    <div id="card-item" @click="getPlaylistDetail()">
      <div
        class="card-img bg-contain bg-no-repeat"
        :style="{ backgroundImage: 'url(' + cardItem.thumbnail + ')' }"
      >
        <div :class="['play-btn', { active: isShowPlayBtn }]">
          <play-btn></play-btn>
        </div>
      </div>
      <h4 class="card-name">{{ cardItem.title }}</h4>
      <p class="card-desc">{{ cardItem.artistsNames }}</p>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import playBtn from "@/components/button/PlayButton.component";
// import { mapMutations } from "vuex";
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
        .get(
          `http://localhost:3000/api/v1/playlist/${this.cardItem.encodeId}/detail?api_key=6piWkhdPX6gEysLWM3`
        )
        .then((res) => {
          const aliasTitle = res.data.data.aliasTitle || "";
          this.$router.push(
            `/playlist/${this.cardItem.encodeId}/${aliasTitle}`
          );
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
  background: #18181833;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s linear;
  &:hover {
    background: #18181814;
  }
  #card-item {
    .card-img {
      position: relative;
      border-radius: 5px;
      padding-top: 100%;
      .play-btn {
        transition: all 0.3s ease;
        opacity: 0;
        visibility: hidden;
        position: absolute;
        bottom: 5px;
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
    h4 {
      margin: 18px 0 6px 0;
      font-weight: 600;
    }
    p {
      font-size: 0.8rem;
      opacity: 0.8;
    }
  }
}
</style>