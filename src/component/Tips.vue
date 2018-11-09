<template>
  <p class="tips" :class="{hide: this.hide}">{{tips}}</p>
</template>

<script>
export default {
  data() {
    return {
      showTime: 800,
      hide: true,
      tips:''
    };
  },
  methods: {
    show(tips) {
      this.tips = tips
      this.hide = false;
      const timmer = setTimeout(() => {
        this.hide = true;
        clearTimeout(timmer);
      }, this.showTime);
    }
  }
};
</script>

<style scoped>
.hide {
  display: none;
}
.tips {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px 15px;
  background-color: #868686;
  border-radius: 8px;
  color: #fff;
  z-index: 9;
  font-size: 16px;
}
</style>
