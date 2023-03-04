<template>
  <div class="icon-content">
    <button class="text-white opacity-80 hover:opacity-100" @click="addToFav()">
      <ThemifyIcon icon="heart" v-if="this.heartFill" />
      <font-awesome-icon icon="fa-solid fa-heart" v-else />
    </button>
    <!-- <font-awesome-icon icon="fa-solid fa-house" /> -->
  </div>
</template>

<script>
import ThemifyIcon from "vue-themify-icons";
export default {
  components: {
    ThemifyIcon,
  },
  data: function () {
    return {
      heartFill: true,
    };
  },
  methods: {
    addToFav() {
      this.heartFill = !this.heartFill;
    },
  },
};
</script>

<style>
.icon-content {
  height: 100%;
  display: flex;
  align-items: center;
  margin: 0 12px;
}
</style>