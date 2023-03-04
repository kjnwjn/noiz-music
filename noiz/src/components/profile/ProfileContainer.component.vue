<template>
  <div>
    <section>
      <div class="flex" v-if="playList">
        <div
          class="
            avatar
            h-48
            min-w-48
            w-48
            desktop:h-64 desktop:min-w-64 desktop:w-64
            mr-6
          "
        >
          <img
            :src="playList.thumbnailM"
            alt="playlist-demo"
            class="w-full h-auto"
          />
        </div>

        <div class="profile-infor grow">
          <p class="mt-5">Playlist</p>
          <h1
            class="
              tablet:text-4xl
              laptop:text-5xl
              desktop:text-7xl
              font-semibold
            "
          >
            {{ playList.title }}
          </h1>
          <p>{{ playList.artistsNames }}</p>
        </div>
      </div>
      <div v-else></div>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    playList: {
      type: Object,
      default: undefined,
    },
  },
};
</script>

<style lang="scss" scoped>
.profile-infor {
  color: var(--text-color);
}
</style>