<template>
  <el-card class="header-container" shadow="never">
    <el-row :gutter="20">
      <el-col :span="1" style="text-align: right;">
        <img class="logo" src="@/assets/images/logo.png">
      </el-col>
      <el-col :span="14">
        <h1 class="title">共享办公空间预约后台管理系统</h1>
      </el-col>
      <el-col :span="8">
        <!-- <UserContainer></UserContainer> -->
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup lang="ts">
// import UserContainer from "@/components/UserContainer.vue"
</script>

<style lang="scss" scoped>
.header-container {
  height: 100%;
  width: 100%;
  background-color: #fff;
}

.logo {
  height: 40px;
  vertical-align: middle;
}

.title {
  display: inline;
  color: #3e5c9a;
}
</style>
