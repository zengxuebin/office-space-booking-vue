<template>
  <div class="home">
    <img class="logo" src="@/assets/images/logo.png">
    <h1 class="title">共享办公空间预约系统</h1>
    <p class="sub-title">空间共享&nbsp;&nbsp;·&nbsp;&nbsp;随时预约&nbsp;&nbsp;·&nbsp;&nbsp;随时在线</p>
    <div class="content">
      <div class="content-share">
        <PageHome @click="toBooking" icons="/src/assets/images/open-space.png" title="开放式工位" tips="前往进行工位预约"class="option" />
        <PageHome icons="/src/assets/images/space-query.png" title="会议室" tips="开放与忙闲状态查询"class="border" />
        <PageHome icons="/src/assets/images/space-other.png" title="“X”" tips="其他共享空间" class="border" />
      </div>
      <PageHome icons="/src/assets/images/space-public.png" title="公共场馆预约" style="margin-left: 24px;" />
    </div>
  </div>
</template>

<script setup lang="ts">
import PageHome from '@/components/PageHome.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const toBooking = () => {
  router.push('/main/test')
}

</script>

<style lang="scss" scoped>
.logo {
  height: 40px;
  vertical-align: middle;
}

.home {
  padding-top: 20px;
  padding-bottom: 180px;
  background-image: url(@/assets/images/bg-blue.png);
  background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  color: #fff;
}

.title {
  font-size: 72px;
  margin-bottom: 0;
}

.sub-title {
  font-size: 25px;
  font-weight: 300;
}

.content {
  display: flex;
}

.content-share {
  display: flex;
  border: 1px solid hsla(0, 0%, 100%, .2);
  border-radius: 8px;
}

.border:before {
  position: absolute;
  content: "";
  width: 2px;
  height: 30px;
  opacity: .18;
  border-radius: 1px;
  background: #fff;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}

.border {
  border: 0;
  border-radius: 0;
}

.option {
  border: 0;
  border-radius: 0;
}
</style>
