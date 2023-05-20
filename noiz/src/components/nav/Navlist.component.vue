<template>
    <div class="nav-container">
        <Logo />
        <nav>
            <ul class="nav-list mb-5">
                <li class="nav-item active">
                    <router-link to="/" class="nav-item_link">
                        <font-awesome-icon icon="fa-solid fa-house" />
                        <p>Home</p>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/search" class="nav-item_link">
                        <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                        <p class="">Search</p></router-link
                    >
                </li>
                <li class="nav-item">
                    <router-link to="/library" class="nav-item_link">
                        <font-awesome-icon icon="fa-solid fa-compact-disc" />
                        <p>Library</p>
                    </router-link>
                </li>

                <li class="nav-item mt-5">
                    <router-link to="/create-playlist" class="nav-item_link">
                        <font-awesome-icon icon="fa-solid fa-square-plus" />
                        <p>Create Playlist</p>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/favorite-list" class="nav-item_link">
                        <font-awesome-icon icon="fa-solid fa-heart" />
                        <p class="">Favorite</p></router-link
                    >
                </li>
                <li class="nav-item">
                    <router-link to="/save" class="nav-item_link">
                        <font-awesome-icon icon="fa-solid fa-book-bookmark" />
                        <p>Your file</p>
                    </router-link>
                </li>
            </ul>
        </nav>

        <div class="w-3/4 ml-6">
            <hr class="bg-gray-600" />
        </div>
        <Playlist />
    </div>
</template>

<script>
import Playlist from "./Playlist";
import Logo from "./Logo";
export default {
    name: "nav-list",
    data: () => {
        return {
            // color: color,
        };
    },
    props: {
        // color: String,
    },
    components: {
        Playlist,
        Logo,
    },
};
</script>

<style lang="scss">
.nav-container {
    background-color: #131718;
    width: var(--nav-width);

    nav {
        .nav-list {
            .nav-item {
                padding: 0 8px;
                &:hover {
                    transform: translateX(3px);
                    transition: all linear 0.1s;
                }
                .nav-item_link {
                    color: var(--text-color);
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    height: 40px;
                    padding: 0 16px;
                    transition: all linear 0.1s;
                    &:hover * {
                        color: var(--text-color-hover);
                        transition: all linear 0.1s;
                    }

                    p {
                        font-weight: 500;
                    }
                    i,
                    svg {
                        font-size: var(--text-size);
                        width: 1.2rem;
                    }
                }
                .router-link-exact-active {
                    color: var(--text-color-hover);
                    border-left: 2px solid var(--text-color-hover);
                }
            }
        }
    }
}
</style>
