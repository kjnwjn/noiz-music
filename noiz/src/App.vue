<template>
    <div id="app">
        <navlist class="fixed inset-y-0 left-0" />
        <div id="main-content" class="p-8">
            <router-view />
        </div>
        <playing-bar class="fixed inset-x-0 bottom-0" />
    </div>
</template>

<script>
import Navlist from "@/components/nav/Navlist.component";
import PlayingBar from "@/components/playingBar/PlayingBar.component";

export default {
    metaInfo: {
        title: "NOIZ",
    },
    components: {
        Navlist,
        PlayingBar,
    },
};
</script>

<style lang="scss">
body {
    #main-content {
        width: calc(100% - var(--nav-width));
        background: #222627;
        position: absolute;
        left: var(--nav-width);
        height: 100vh;
        // padding-top: var(--controller-height);
        overflow: hidden scroll;
        padding-top: var(--header-height);
        /* width */
        &::-webkit-scrollbar {
            width: 10px;
        }

        /* Track */
        &::-webkit-scrollbar-track {
            background: #222627;
        }

        /* Handle */
        &::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 5px;
        }

        /* Handle on hover */
        &::-webkit-scrollbar-thumb:hover {
            background: #555;
        }
    }
}
</style>
