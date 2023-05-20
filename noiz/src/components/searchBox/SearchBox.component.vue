<template>
    <div id="searchbox" class="grow">
        <form>
            <ThemifyIcon icon="search" class="search-icon" /><input
                type="search"
                placeholder="Fuck u"
                :value="q"
                @input="updateKeyword($event)"
            />
        </form>
    </div>
</template>

<script>
import {
    mapState as mapSearchState,
    mapActions as mapSearchActions,
    mapMutations as mapSearchMutations,
} from "@/store/helper/Search";
export default {
    computed: {
        ...mapSearchState(["topSearch"]),
    },
    data: function () {
        return {
            q: "",
        };
    },
    methods: {
        ...mapSearchActions(["handleSearchBox"]),
        ...mapSearchMutations(["set_searchData"]),
        updateKeyword(e) {
            this.q = e.target.value;
            this.handleSearchBox(this.q);
        },
    },
};
</script>

<style lang="scss" scoped>
#searchbox {
    margin: auto;
    height: 36px;
    form {
        width: 362px;
        position: relative;
        height: 42px;
        .search-icon {
            position: absolute;
            top: 25%;
            left: 10px;
            font-size: 21px;
            font-weight: 500;
        }
        input {
            outline: none;
            padding: 6px 48px;
            width: 100%;
            border-radius: 20px;
        }
    }
}
</style>
