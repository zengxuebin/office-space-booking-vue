<template>
  <div class="main">
    <div class="banner">
      <div class="header">
        <div class="header-main">
          <div class="header-title">
            <h1 class="title" @click="toHome">共享办公空间预约系统</h1>
          </div>
          <div class="header-list">
            <router-link v-for="(item, index) in menuItems" :key="index" class="header-btn"
              :class="{ active: currentIndex === index }" :to="item.link" @click="setCurrentIndex(index)">{{ item.name
              }}</router-link>
            <el-button class="header-btn login-btn">登录</el-button>
            <span class="manager" @click="toManager">前往管理后台</span>
            <router-link to="/manager/index"></router-link>
          </div>
        </div>
      </div>
      <div class="carousel-container">
        <el-carousel height="300px">
          <el-carousel-item class="carousel-1">
          </el-carousel-item>
          <el-carousel-item class="carousel-2">
          </el-carousel-item>
        </el-carousel>
      </div>

      <div class="layout">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// 定义响应式数据  
const menuItems = ref([
  { name: '首页', link: '/home' },
  { name: '关于我们', link: '/main/test2' },
  { name: '产品', link: '/products' },
  { name: '联系我们', link: '/contact' },
]);

const currentIndex = ref(1)

const setCurrentIndex = (index: number) => {
  currentIndex.value = index;
}

const router = useRouter()

const toHome = () => {
  router.push('/home')
}

const toManager = () => {
  router.push('/manager/index')
}
</script>

<style lang="scss" scoped>
.carousel-1 {
  width: 100%;
  background-image: url(@/assets/images/carousel-1.jpg);
  background-size: cover;
  background-position: center;
}

.carousel-2 {
  width: 100%;
  background-image: url(@/assets/images/carousel-2.jpg);
  background-size: cover;
  background-position: center;
}

.banner {
  background: #f5f5f5;
}

.header {
  background: rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  width: 100%;
  height: 72px;
  padding: 0 5.5%;
  backdrop-filter: blur(25px);
  overflow: hidden;
  box-sizing: border-box;
  z-index: 999;
}

.header-main {
  max-width: 1280px;
  height: 100%;
  margin: 0 auto;
}

.header-title {
  height: 100%;
  display: inline-block;
}

.title {
  width: 320px;
  height: 56px;
  margin: 8px 0;
  font-size: 30px;
  color: #fff;
  display: flex;
  align-items: center;
  font-style: italic;
  cursor: pointer;
}

.header-list {
  float: right;
  margin: 16px 0;
}

.header-btn {
  color: #fff;
  transition: 0.35s;
  font-size: 16px;
  line-height: 24px;
  padding: 4px 0;
  text-decoration: none;
  display: inline-block;
  margin-left: 48px;
  border-bottom: 2px solid transparent;
}

.header-btn:first-child {
  margin-left: 0;
}

.header-btn:hover {
  border-bottom: 2px solid #fff;
}

.active {
  border-bottom: 2px solid #fff !important;
}

.login-btn {
  border: 1px solid #fff;
  height: 40px;
  font-size: 16px;
  line-height: 22px;
  padding: 9px 20px;
  background: transparent;
  border-radius: 4px;
  outline: none;
}

.login-btn:hover {
  color: #fff;
  background-color: #0052D9;
  border: 1px solid #0052D9;
}

.manager {
  margin-left: 40px;
  color: #fff;
  cursor: pointer;
}

.layout {
  background-color: #fff;
  margin: 0 auto;
  max-width: 1350px;
  padding: 24px;
  border-radius: 10px;
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>
