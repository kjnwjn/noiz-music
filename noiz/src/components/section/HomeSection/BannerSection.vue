<template>
    <div class="relative banner-container">
        <VueSlickCarousel v-bind="setting" ref="carousel">
            <div v-for="banner in bannerList" :key="banner.encodeId" class="rounded-3xl">
                <img :src="banner.banner" :alt="banner.link" class="p-3 rounded-3xl" />
            </div>
        </VueSlickCarousel>
        <div class="btn-list absolute flex item-center justify-between w-full px-3">
            <button @click="showPrev"><ThemifyIcon icon="angle-left" /></button>
            <button @click="showNext"><ThemifyIcon icon="angle-right" /></button>
        </div>
    </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import ThemifyIcon from "vue-themify-icons";

export default {
    components: {
        VueSlickCarousel,
        ThemifyIcon,
    },
    props: {
        bannerList: {
            type: Array,
        },
    },
    data: function () {
        return {
            setting: {
                focusOnSelect: true,
                arrows: false,
                infinite: true,
                speed: 500,
                slidesToShow: 2,
                slidesToScroll: 2,
                touchThreshold: 5,
            },
        };
    },
    methods: {
        showNext() {
            this.$refs.carousel.next();
        },
        showPrev() {
            this.$refs.carousel.prev();
        },
    },
};
</script>

<style lang="scss" scoped>
.banner-container {
    .btn-list {
        visibility: hidden;
        top: 40%;
        transition: all linear 0.3s;
        button {
            margin: 0px 10px;
            padding: 5px;
            background-color: #363636;
            border-radius: 50%;
            color: #ccc;
            width: var(--btn-width);
            height: var(--btn-width);
        }
    }
    &:hover {
        .btn-list {
            visibility: visible;
            transition: all linear 0.3s;
        }
    }
}
</style>
