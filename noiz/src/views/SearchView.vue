<template>
    <div>
        <header-container>
            <template #searchbox>
                <search-box> </search-box>
            </template>
        </header-container>
        <!-- <section class="py-8 grid gap-y-9">
            <section-type
                v-for="item in playList"
                :key="item.encodeId"
                :title="item.title"
                :data="item.items"
            ></section-type>
        </section> -->
        <section class="py-4 grid grid-cols-2 gap-4">
            <div class="top-result">
                <h1 class="title_section">Top Result</h1>
                <div class="top_main-result grid grid-row-3 gap-4">
                    <div class="img-card w-fit">
                        <img
                            src="https://photo-resize-zmp3.zmdcdn.me/w165_r1x1_jpeg/cover/8/a/8/e/8a8e74ad943da5b23cfb4f709aa31988.jpg"
                        />
                    </div>
                    <div class="title">
                        <h1>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium, tenetur!</h1>
                    </div>
                    <div class="desc">
                        <a href="#">Lưu hương giang</a>
                        <button>Album</button>
                    </div>
                </div>
            </div>
            <div class="top-songs">
                <h1 class="title_section">Songs</h1>
                <ul class="list-song">
                    <li>1</li>
                    <li>1</li>
                    <li>1</li>
                    <li>1</li>
                    <li>1</li>
                </ul>
            </div>
        </section>
    </div>
</template>

<script>
import HeaderContainer from "@/components/main/Header.component";
import SearchBox from "@/components/searchBox/SearchBox.component";
// import SectionType from "@/components/section/HomeSection/SectionType";
// const { apiKey, apiUrl } = require("@/configs/configs");

export default {
    components: {
        HeaderContainer,
        SearchBox,
        // SectionType,
    },
    data: function () {
        return {
            playList: [],
        };
    },
    // created() {
    //     fetch(`${apiUrl}/get-home?api_key=${apiKey}`)
    //         .then((res) => res.json())
    //         .then((res) => {
    //             console.log(res);
    //             let dataHome = res.data.items;
    //             dataHome.forEach((dataItem) => {
    //                 if (dataItem.sectionType == "playlist") {
    //                     this.playList.push(dataItem);
    //                 }
    //             });
    //         });
    // },
};
</script>

<style lang="scss" scoped>
.top-result {
    color: white;
    min-height: 300px;
    border-radius: 5px;
    .top_main-result {
        border-radius: 10px;
        cursor: pointer;
        background: radial-gradient(black, transparent);
        padding: 20px;
        margin: 10px;
        transition: all 0.2s linear;
        img {
            width: 84px;
            height: 84px;
            border-radius: 5px;
            transition: all 0.2s linear;
        }
        .title {
            width: 100%;
            height: 38px;
            overflow: hidden;
            h1 {
                font-size: 1.5rem;
                font-weight: 600;
            }
        }
        .desc {
            a {
                opacity: 0.7;
            }
            button {
                margin-left: 10px;
                padding: 5px;
                background: #8b6d4447;
                border-radius: 18px;
                font-size: 0.8rem;
                font-weight: 600;
            }
        }
        &:hover {
            background: #575149;
            img {
                box-shadow: 0 8px 8px #0000004d;
            }
        }
    }
}
.top-songs {
    color: white;
    min-height: 300px;
    border-radius: 5px;
    .list-song {
        border-radius: 10px;
        cursor: pointer;
        background: radial-gradient(black, transparent);
        padding: 20px;
        margin: 10px;
        transition: all 0.2s linear;
    }
}
.title_section {
    margin: 0 10px;
    font-size: 1.6rem;
    color: white;
    font-weight: 600;
}
</style>
