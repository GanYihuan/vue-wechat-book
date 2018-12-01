<template>
  <button class="button" open-type="openType" lang="zh_CN" @click="onGetUserInfo">
    <slot name="img"></slot>
  </button>
</template>

<script>
export default {
  props: {
    openType: {
      type: String
    },
    imageSrc: {
      type: String
    },
    bindgetuserinfo: {
      type: String
    }
  },
  methods: {
    onGetUserInfo() {
      this.$emit("getuserinfo");
    }
  }
};
</script>

<style>
.button {
  padding: 0 !important;
  border: none !important;
}
</style>
