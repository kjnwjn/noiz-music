<template>
  <div id="header" class="fixed flex flex-row justify-between px-8">
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
</template>

<script>
import ThemifyIcon from "vue-themify-icons";
import ProfileButton from "@/components/button/ProfileButton.component";
import { mapState } from "vuex";
export default {
  name: "header-component",

  components: {
    ThemifyIcon,
    ProfileButton,
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

<style lang="scss" >
#header {
  z-index: 10000;
  height: var(--header-height);
  position: fixed;
  width: calc(100% - var(--nav-width));
  top: 0;
  right: 0;
  background-image: linear-gradient(to top, #777c84, rgb(146, 138, 138));
  box-shadow: 0px 4px 16px -8px rgba(0, 0, 0, 0.8);
  -webkit-box-shadow: 0px 4px 16px -8px rgba(0, 0, 0, 0.8);
  -moz-box-shadow: 0px 4px 16px -8px rgba(0, 0, 0, 0.8);

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
}
</style>>
