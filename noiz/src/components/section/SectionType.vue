<template>
    <div id="section-type">
        <div class="flex justify-between items-center mb-5">
            <h1 class="section-type_title">{{ title }}</h1>
            <h1 class="section-type_show">SHOW ALL</h1>
        </div>
        <div class="grid desktop:grid-cols-4 laptop:grid-cols-3 tablet:grid-cols-2 gap-6">
            <card-item v-for="(item, index) in data" :key="index" :cardItem="item"></card-item>
        </div>
    </div>
</template>

<script>
import CardItem from "@/components/card/CardItem.component";

export default {
    data: () => {
        return {};
    },
    props: {
        title: {
            type: String,
            default: "",
        },
        data: {
            type: Array,
            default: null,
        },
    },
    components: {
        CardItem,
    },
    methods: {},

    created: () => {},
};
</script>

<style lang="scss" scoped>
#section-type {
    color: var(--text-color);
    .section-type_title {
        font-size: 1.5rem;
        font-weight: 700;
    }

    .section-type_title,
    .section-type_show {
        &:hover {
            text-decoration: underline;
            cursor: pointer;
        }
    }
}
</style>
