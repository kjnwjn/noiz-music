<template>
    <div id="hint-section">
        <h1 class="mb-4">GOOD MORNING</h1>
        <div class="grid tablet:grid-cols-1 laptop:grid-cols-2 desktop:grid-cols-3 gap-4">
            <card-hint></card-hint>
        </div>
    </div>
</template>

<script>
import CardHint from "@/components/card/CardHint.component";

export default {
    components: {
        CardHint,
    },
};
</script>

<style lang="scss" scoped>
#hint-section {
    h1 {
        font-size: 2rem;
        font-weight: 700;
        color: #fff;
    }
}
</style>
