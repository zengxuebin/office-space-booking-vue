<template>
  <div>
    <h2 style="text-align: center;">我的信誉分</h2>
    <el-container>
      <el-aside width="450px">
        <credit-score-view></credit-score-view>
      </el-aside>
      <el-main>
        <credit-score-change-view></credit-score-change-view>
      </el-main>
    </el-container>

  </div>
</template>

<script setup lang="ts">
import CreditScoreView from '@/components/CreditScoreView.vue'
import CreditScoreChangeView from "@/components/CreditScoreChangeView.vue";
</script>

<style lang="scss" scoped></style>