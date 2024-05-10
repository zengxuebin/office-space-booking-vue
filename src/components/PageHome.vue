<template>
  <div class="page-home">
    <img :src="icons" width="60px" height="60px">
    <div class="page-text">
      {{ title }}
      <p class="tips">{{ tips }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  icons: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  tips: {
    type: String,
    default: ''
  }
})
</script>

<style lang="scss" scoped>
.page-home {
  background: linear-gradient(125deg, hsla(0, 0%, 100%, .06) 13%, hsla(0, 0%, 100%, .08));
  border-radius: 8px;
  backdrop-filter: blur(10px);
  border: 1px solid hsla(0, 0%, 100%, .2);
  height: 106px;
  position: relative;
  padding-left: 30px;
  padding-right: 30px;
  display: flex;
  align-items: center;
  color: #fff;
  width: 300px;
}

.page-home:hover {
  background: hsla(0, 0%, 100%, .2);
  border-radius: 8px;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  cursor: pointer;
}

.page-text {
  font-size: 22px;
  padding-left: 30px;
  text-align: left;
}

.tips {
  font-size: 16px;
  margin: 0;
  margin-top: 10px;
}
</style>
