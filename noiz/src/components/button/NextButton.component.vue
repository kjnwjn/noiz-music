<template>
    <button @click="showNext"><ThemifyIcon icon="angle-right" /></button>
</template>

<script>
import ThemifyIcon from "vue-themify-icons";
export default {
    components: {
        ThemifyIcon,
    },
    props: {
        data: {
            type: Object,
        },
    },
    methods: {
        showNext() {
            this.data.carousel.next();
        },
    },
};
</script>

<style lang="scss" scoped>
button {
    margin: 0px 10px;
    padding: 5px;
    background-color: #363636;
    border-radius: 50%;
    color: #ccc;
    width: var(--btn-width);
    height: var(--btn-width);
}
</style>
