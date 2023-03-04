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
// import HeaderContainer from "@/components/main/Header.component";

export default {
  components: {
    Navlist,
    PlayingBar,
  },
  methods: {},
  //   mounted () {
  //      fetch("http://localhost:3000/api/v1/get-home?api_key=6piWkhdPX6gEysLWM3")
  //       .then((res) => res.json())
  //       .then((res) => {
  //         let dataHome = res.data.items;
  //         dataHome.forEach((dataItem) => {
  //           return dataItem.sectionType == "playlist"
  //             ? this.playList.push(dataItem)
  //             : "";
  //         });
  //       });
  //   }
};
</script>

<style lang="scss" >
body {
  // background: linear-gradient(
  //   to top,
  //   var(--bg-color),
  //   #315672,
  //   rgb(146, 138, 138)
  // );

  #app {
  }
  #main-content {
    width: calc(100% - var(--nav-width));
    background: linear-gradient(
      to top,
      var(--bg-color),
      #315672,
      rgb(146, 138, 138)
    );
    position: absolute;
    left: var(--nav-width);
    height: 100vh;
    padding-top: var(--controller-height);
    overflow: hidden scroll;
  }
}
</style>