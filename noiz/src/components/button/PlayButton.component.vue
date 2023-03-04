<template>
  <button class="play_btn" v-if="!isPlaying" @click="handlePlayInComponent">
    <font-awesome-icon
      v-if="isLoading"
      class="loading"
      icon="fa-sharp fa-regular fa-spinner "
    />
    <font-awesome-icon v-else icon="fa-solid fa-play" class="text-sm" />
  </button>
  <button class="pause_btn" v-else @click="handlePauseInComponent">
    <font-awesome-icon
      v-if="isLoading"
      class="loading"
      icon="fa-sharp fa-regular fa-spinner "
    />
    <font-awesome-icon v-else icon="fa-solid fa-pause" class="text-sm" />
  </button>
</template>

<script>
import {
  mapState as mapControllerState,
  mapActions as mapControllerActions,
} from "@/store/helper/Controller";
import { eventBus } from "@/main";
export default {
  computed: {
    ...mapControllerState(["isPlaying", "isLoading"]),
  },
  methods: {
    ...mapControllerActions(["handlePause", "handlePlayBtn"]),
    handlePlayInComponent() {
      this.handlePlayBtn();
      eventBus.$emit("pauseAction", false);
    },
    handlePauseInComponent() {
      this.handlePause();
      eventBus.$emit("pauseAction", true);
    },
  },
};
</script>

<style lang="scss" scoped>
.loading {
  animation: rotation 2s infinite linear;
}
button {
  color: var(--text-color);
  padding: 5px;
  background-color: var(--btn-color);
  border-radius: 50%;
  width: var(--button-size);
  height: var(--button-size);
  color: var(--text-color);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 17px;
  svg {
    font-size: calc(var(--button-size) * 0.5);
  }
  &:hover svg {
    transform: scale(0.9);
    transition: all ease-out 0.2s;
  }
  &:hover {
    background-color: var(--btn-color-hover);
  }
}
</style>
