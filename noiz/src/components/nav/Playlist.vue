<template>
  <div class="playlist-block mt-5 overflow-auto h-32">
    <ul class="playlist">
      <li class="playlist-item px-2">
        <router-link to="/save" class="playlist-item_link">
          <p class="px-4 py-1">Playlist 1</p>
        </router-link>
      </li>
      <li class="playlist-item px-2">
        <router-link to="/save" class="playlist-item_link">
          <p class="px-4 py-1">Playlist 1</p>
        </router-link>
      </li>
      <li class="playlist-item px-2">
        <router-link to="/save" class="playlist-item_link">
          <p class="px-4 py-1">Playlist 1</p>
        </router-link>
      </li>
      <li class="playlist-item px-2">
        <router-link to="/save" class="playlist-item_link">
          <p class="px-4 py-1">Playlist 1</p>
        </router-link>
      </li>
      <li class="playlist-item px-2">
        <router-link to="/save" class="playlist-item_link">
          <p class="px-4 py-1">Playlist 1</p>
        </router-link>
      </li>
      <li class="playlist-item px-2">
        <router-link to="/save" class="playlist-item_link">
          <p class="px-4 py-1">Playlist 1</p>
        </router-link>
      </li>
      <li class="playlist-item px-2">
        <router-link to="/save" class="playlist-item_link">
          <p class="px-4 py-1">Playlist 1</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "playlist-block",
};
</script>

<style lang="scss">
.playlist-block {
  p {
    color: var(--text-color);
  }

  &::-webkit-scrollbar {
    width: 10px;
    display: none;
    transition: all ease-in 0.3s;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: var(--bg-color1);
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 20px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  &:hover {
    &::-webkit-scrollbar {
      display: block;
      transition: all ease-in 0.5s;
    }
  }
}
</style>