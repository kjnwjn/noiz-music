<template>
    <button class="suggest-btn"><p>upgrade</p></button>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.suggest-btn {
    width: 95px;
    height: 37px;
    border-radius: 20px;
    background-color: transparent;
    border: 1px solid rgb(181, 179, 179);
    color: #fff;
    font-size: var(--text-size);
    font-weight: 600;
    &:hover {
        background-color: #000;
        border: 1px solid #fff;
        transform: scale(1.1);
        transition: all ease-out 0.2s;
    }
}
</style>
