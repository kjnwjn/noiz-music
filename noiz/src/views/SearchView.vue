<template>
    <div>
        <header-container>
            <template #searchbox>
                <search-box> </search-box>
            </template>
        </header-container>
        <section class="pb-8 pt-20">
            <div>21313</div>
        </section>
    </div>
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

<style></style>
