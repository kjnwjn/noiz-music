<template>
    <div id="header">
        <div class="fixed flex flex-row justify-between px-8 relative h-full">
            <div class="btn-left-header w-28 flex">
                <button><ThemifyIcon icon="angle-left" /></button>
                <button><ThemifyIcon icon="angle-right" /></button>
            </div>
            <slot name="searchbox"></slot>
            <section class="flex">
                <slot name="upgrade"></slot>
                <profile-button></profile-button>
            </section>
        </div>
        <section id="suggest-tag" class="px-8">
            <ul>
                <li><suggest-button></suggest-button></li>
                <li><suggest-button></suggest-button></li>
                <li><suggest-button></suggest-button></li>
                <li><suggest-button></suggest-button></li>
                <li><suggest-button></suggest-button></li>
                <li><suggest-button></suggest-button></li>
            </ul>
        </section>
    </div>
</template>

<script>
import SuggestButton from "@/components/button/SuggestButton.component";
import ThemifyIcon from "vue-themify-icons";
import ProfileButton from "@/components/button/ProfileButton.component";
import { mapState } from "vuex";
export default {
    name: "header-component",

    components: {
        ThemifyIcon,
        ProfileButton,
        SuggestButton,
    },
    computed: {
        ...mapState(["avatar"]),
    },
    // methods: {
    //   handleClick() {
    //     this.listOptionProfile = !this.listOptionProfile;
    //     console.log(this.listOptionProfile);
    //   },
    // },
};
</script>

<style lang="scss">
#header {
    z-index: 10000;
    height: var(--header-height);
    position: fixed;
    width: calc(100% - var(--nav-width));
    top: 0;
    right: 0;
    backdrop-filter: blur(20px);
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.6);
    -webkit-box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.6);
    -moz-box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.6);

    .btn-left-header {
        margin: auto 0;
        button {
            margin: 0px 10px;
            padding: 5px;
            background-color: #363636;
            border-radius: 50%;
            color: #ccc;
            width: var(--btn-width);
        }
    }
    #suggest-tag {
        // display: none;
        position: absolute;
        height: var(--header-height);
        width: 100%;
        left: 0;
        backdrop-filter: blur(20px);
        box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.6);
        -webkit-box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.6);
        -moz-box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.6);

        ul {
            display: flex;
            height: 100%;
            color: white;
            gap: 12px;
            align-items: center;
            li {
            }
        }
    }
}
</style>
>
