<template>
  <div @click="onLike">
    <image :src="like"/>
    <text>{{count}}</text>
  </div>
</template>

<script>
export default {
  props: {
    readOnly: {
      type: Boolean
    },
    like: {
      type: Boolean
    },
    count: {
      type: Number
    }
  },
  data() {
    return {
      yes_url: "../../static/img/like.png",
      no_url: "../../static/img/@dis.png",
      count: ""
    };
  },
  computed: {
    like() {
      let flag = this.props.like ? this.yes_url : this.no_url;
      return flag;
    }
  },
  methods: {
    onLike: function(event) {
      // console.log(event)
      if (this.readOnly) {
        return;
      }
      let like = this.props.like;
      let count = this.props.count;
      this.count = like ? count - 1 : count + 1;
      this.like = like;
      let behavior = this.props.like ? "like" : "cancel";
      /*
      triggerEvent: 自定义事件
      like: 事件名称
      { behavior: behavior }: 传递参数, 设置 detail
      */
      this.$emit("like", behavior);
    }
  }
};
</script>

<style>
</style>
