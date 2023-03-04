<template>
  <div class="playing-bar grid grid-cols-3 gap-4 px-2">
    <NowPlaying />
    <PlayControl />
    <div class="setting-control">
      <h1>setting control</h1>
    </div>
  </div>
</template>

<script>
import PlayControl from "./PlayControl";
import NowPlaying from "./NowPlaying";
export default {
  name: "playing-bar",
  props: {
    msg: String,
  },
  components: {
    PlayControl,
    NowPlaying,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.playing-bar {
  height: var(91px);
  box-shadow: -1px -1px 1px rgba(104, 101, 101, 0.8);
  background: #38628275;
  backdrop-filter: blur(5px);
}
</style>
