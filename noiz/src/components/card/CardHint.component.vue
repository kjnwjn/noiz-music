<template>
  <div
    id="card-hint"
    class="flex items-center"
    @mouseover="isShowPlayBtn = !isShowPlayBtn"
    @mouseout="isShowPlayBtn = !isShowPlayBtn"
    @click="handlePlayAudio()"
  >
    <div class="img-card">
      <img src="@/assets/nowplayingimage.jpg" alt="" />
    </div>
    <div class="content-hint">
      <div>
        <h1 class="content-hint_title">HEROES & VILLAINS</h1>
      </div>
      <div :class="['play-btn', { active: isShowPlayBtn }]">
        <play-button></play-button>
      </div>
    </div>
  </div>
</template>

<script>
import PlayButton from "@/components/button/PlayButton.component";
import { mapMutations } from "vuex";
export default {
  data: function () {
    return {
      isShowPlayBtn: false,
    };
  },
  components: {
    PlayButton,
  },
  methods: {
    ...mapMutations["handlePlayAudio"],
  },
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
    h1 {
      color: var(--text-color);
      font-size: var(--text-size);
      font-weight: 600;
    }
  }
}
</style>