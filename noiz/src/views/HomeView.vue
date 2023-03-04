<template>
  <div>
    <header-container>
      <template #upgrade>
        <div class="w-36 m-auto text-center">
          <upgrade-btn></upgrade-btn>
        </div>
      </template>
    </header-container>
    <section class="pb-8">
      <hint-section class="hint-container"></hint-section>
    </section>

    <section class="pb-8 grid gap-y-9">
      <section-type
        v-for="item in playList"
        :key="item.encodeId"
        :title="item.title"
        :data="item.items"
      ></section-type>
    </section>
  </div>
</template>

<script>
import HintSection from "@/components/section/HintSection";
import SectionType from "@/components/section/SectionType";
import HeaderContainer from "@/components/main/Header.component";
import UpgradeBtn from "@/components/button/UpgradeBtn.component";

// import axios from "axios";
export default {
  name: "HomeView",
  components: {
    HintSection,
    SectionType,
    HeaderContainer,
    UpgradeBtn,
  },
  data: function () {
    return {
      audio: null,
      isPlaying: false,
      playList: [],
    };
  },

  methods: {},
  created() {
    fetch(
      `http://localhost:3000/api/v1/get-home?api_key=${process.env.VUE_APP_API_KEYS}`
    )
      .then((res) => res.json())
      .then((res) => {
        let dataHome = res.data.items;
        dataHome.forEach((dataItem) => {
          return dataItem.sectionType == "playlist"
            ? this.playList.push(dataItem)
            : "";
        });
      });
  },
};
</script>
<style  lang="scss">
.hint-container {
  min-height: 200px;
}
.img-music {
  border-radius: 10%;
}
.yellow-circle {
  background-color: #d8f235;
  width: 90px;
  height: 90px;
  border-radius: 100%;
  position: absolute;
  top: 18%;
  scale: 1.3;
  z-index: -1;
}
.blue-circle {
  background-color: #19ad9b;
  width: 170px;
  height: 170px;
  border-radius: 100%;
  position: absolute;
  top: 25%;
  scale: 1.3;
  z-index: -1;
}
.first-circle {
  border: 4px solid #00bfbf;
  border-radius: 100%;
  width: 80px;
  height: 80px;
  transform: scale(1.00286);
  position: absolute;
  top: 60%;
  scale: 1.3;
  z-index: 10;
  right: 35%;
}
</style>
