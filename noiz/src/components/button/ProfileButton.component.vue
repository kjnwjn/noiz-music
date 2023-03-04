<template>
  <div class="w-40 flex items-center relative">
    <button
      class="btn-profile flex relative"
      @click="listOptionProfile = !listOptionProfile"
    >
      <img class="profile-img" src="@/assets/avatar.jpg" alt="avatar-profile" />
      <p>Phạm Quân</p>
      <font-awesome-icon icon="fa-solid fa-caret-down" />
    </button>
    <ul
      class="profile-list absolute top-11 -left-1/4"
      v-show="listOptionProfile"
      @click="listOptionProfile = !listOptionProfile"
    >
      <li class="profile-item">
        <button><span>Account</span></button>
      </li>
      <li class="profile-item">
        <button><span>Profile</span></button>
      </li>
      <li class="profile-item">
        <button><span>Upgrade premium</span></button>
      </li>
      <li class="profile-item">
        <button><span>Setting</span></button>
      </li>
      <li class="profile-item">
        <button><span>Logout</span></button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      listOptionProfile: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.btn-profile {
  background-color: #1c1c1c;
  border-radius: 20px;
  height: 30px;
  color: var(--text-color);
  width: 150px;
  height: 35px;
  position: relative;
  &:hover {
    opacity: 0.8;
  }
  img {
    width: 26px;
    border-radius: 50%;
    position: absolute;
    top: 4px;
    left: 4px;
  }
  p {
    position: absolute;
    left: 36px;
    top: 21%;
    font-size: 0.9rem;
    font-weight: 700;
  }
  svg {
    position: absolute;
    right: 11px;
    top: 21%;
  }
}
ul {
  width: 190px;
  background-color: #282828;
  padding: 5px;
  color: var(--text-color);
  border-radius: 5px;
  font-size: calc(var(--text-size) - 0.1rem);
  li {
    button {
      width: 100%;
      padding: 10px 6px;
      text-align: left;
      &:hover {
        background-color: #3e3e3e;
      }
    }
  }
}
</style>