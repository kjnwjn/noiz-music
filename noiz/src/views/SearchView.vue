<template>
  <header-container>
    <template #searchbox>
      <search-box> </search-box>
    </template>
  </header-container>
</template>

<script>
import HeaderContainer from "@/components/main/Header.component";
import SearchBox from "@/components/SearchBox.component";

export default {
  components: {
    HeaderContainer,
    SearchBox,
  },
};
</script>

<style>
</style>