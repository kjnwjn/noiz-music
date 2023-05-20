<template>
  <div id="searchbox" class="grow">
    <form>
      <ThemifyIcon icon="search" class="search-icon" /><input
        type="search"
        placeholder="Fuck u"
      />
    </form>
  </div>
</template>

<script>
export default {};
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