<template>
    <div class="playing-bar grid grid-cols-3 gap-4 px-2">
        <NowPlaying />
        <PlayControl />
        <setting-control />
    </div>
</template>

<script>
import PlayControl from "./PlayControl";
import NowPlaying from "./NowPlaying";
import SettingControl from "./SettingControl.vue";
export default {
    name: "playing-bar",
    props: {
        msg: String,
    },
    components: {
        PlayControl,
        NowPlaying,
        SettingControl,
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.playing-bar {
    z-index: 1000;
    height: var(91px);
    box-shadow: 0px -2px 10px 0px #00000040;
    background: #222627;
    backdrop-filter: blur(5px);
}
</style>
