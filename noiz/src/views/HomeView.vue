<template>
    <div>
        <header-container class="header">
            <template #upgrade>
                <div class="w-36 m-auto text-center">
                    <upgrade-btn></upgrade-btn>
                </div>
            </template>
        </header-container>
        <section class="pb-8" v-if="bannerList?.length > 0">
            <banner-section :bannerList="bannerList[0].items"></banner-section>
        </section>
        <section class="pb-8" v-if="currentPlaylistId">
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
import HintSection from "@/components/section/HomeSection/HintSection";
import BannerSection from "@/components/section/HomeSection/BannerSection";
import SectionType from "@/components/section/HomeSection/SectionType";
import HeaderContainer from "@/components/main/Header.component";
import UpgradeBtn from "@/components/button/UpgradeBtn.component";
import { mapState as mapMusicState } from "@/store/helper/Music";
const { apiKey, apiUrl } = require("@/configs/configs");
export default {
    name: "HomeView",
    components: {
        HintSection,
        SectionType,
        HeaderContainer,
        UpgradeBtn,
        BannerSection,
    },
    data: function () {
        return {
            audio: null,
            isPlaying: false,
            playList: [],
            bannerList: [],
        };
    },
    computed: {
        ...mapMusicState(["currentPlaylistId"]),
    },
    methods: {},
    created() {
        fetch(`${apiUrl}/get-home?api_key=${apiKey}`)
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                let dataHome = res.data.items;
                dataHome.forEach((dataItem) => {
                    if (dataItem.sectionType == "playlist") {
                        this.playList.push(dataItem);
                    } else if (dataItem.sectionType == "banner") {
                        this.bannerList.push(dataItem);
                    }
                });
            });
    },
};
</script>
<style lang="scss">
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
.main-content {
    /* width */
    &::-webkit-scrollbar {
        width: 10px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
        background: #f1f1f1;
        z-index: 1000;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
        background: #888;
        z-index: 1000;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
}
.header {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>
