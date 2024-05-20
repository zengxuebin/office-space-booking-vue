<template>
  <div>
    <el-row :gutter="16">
      <el-col :span="6">
        <div class="statistic-card">
          <el-statistic :value="summary.totalSpaceCount">
            <template #title>
              <div style="display: inline-flex; align-items: center; font-size: 14px;">
                共享空间数量
                <el-tooltip effect="dark" content="系统中可用共享空间数量" placement="top">
                  <el-icon style="margin-left: 4px" :size="14">
                    <Warning />
                  </el-icon>
                </el-tooltip>
              </div>
            </template>
          </el-statistic>
          <div class="statistic-footer">
            <div class="footer-item">
              <span>比昨日新增</span>
              <span class="green">
                0
                <el-icon>
                  <CaretTop />
                </el-icon>
              </span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="statistic-card">
          <el-statistic :value="summary.totalReserveCount">
            <template #title>
              <div style="display: inline-flex; align-items: center; font-size: 14px;">
                累计预约次数
                <el-tooltip effect="dark" content="从2024年01月01日至今系统累计预约数量" placement="top">
                  <el-icon style="margin-left: 4px" :size="14">
                    <Warning />
                  </el-icon>
                </el-tooltip>
              </div>
            </template>
          </el-statistic>
          <div class="statistic-footer">
            <div class="footer-item">
              <span>比昨日下降</span>
              <span class="red">
                0
                <el-icon>
                  <CaretBottom />
                </el-icon>
              </span>
              个
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="statistic-card">
          <el-statistic :value="summary.totalUserCount">
            <template #title>
              <div style="display: inline-flex; align-items: center; font-size: 14px;">
                累计预约人数
                <el-tooltip effect="dark" content="从2024年1月1日至今累计预约人数" placement="top">
                  <el-icon style="margin-left: 4px" :size="14">
                    <Warning />
                  </el-icon>
                </el-tooltip>
              </div>
            </template>
          </el-statistic>
          <div class="statistic-footer">
            <div class="footer-item">
              <span>比昨日新增</span>
              <span class="green">
                0
                <el-icon>
                  <CaretTop />
                </el-icon>
              </span>
              人
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="statistic-card">
          <el-statistic :value="summary.totalAmount">
            <template #title>
              <div style="display: inline-flex; align-items: center; font-size: 14px;">
                累计交易金额
                <el-tooltip effect="dark" content="从2023年01月01日至今系统累计交易金额" placement="top">
                  <el-icon style="margin-left: 4px" :size="14">
                    <Warning />
                  </el-icon>
                </el-tooltip>
              </div>
            </template>
          </el-statistic>
          <div class="statistic-footer">
            <div class="footer-item">
              <span>比昨日下降</span>
              <span class="red">
                0
                <el-icon>
                  <CaretBottom />
                </el-icon>
              </span>
              RMB
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="16" style="margin-top: 20px;">
      <el-col :span="8">
        <el-card class="space-card">
          <template #header>
            <div>
              <span>共享空间类别总览</span>
            </div>
          </template>
          <space-category-summary></space-category-summary>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card class="space-card">
          <template #header>
            <div>
              <span>共享空间预约总览</span>
            </div>
          </template>
          <free-space-summary></free-space-summary>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import SpaceCategorySummary from '@/components/SpaceCategorySummary.vue'
import FreeSpaceSummary from '@/components/FreeSpaceSummary.vue'
import { getSummary } from "@/api/index"
import { reactive } from 'vue';

const summary = reactive({
  totalSpaceCount: 0,
  totalReserveCount: 0,
  totalUserCount: 0,
  totalAmount: 0,
})

getSummary().then(res => {
  const data = res.data
  summary.totalAmount = data.totalAmount
  summary.totalReserveCount = data.totalReserveCount
  summary.totalSpaceCount = data.totalSpaceCount
  summary.totalUserCount = data.totalUserCount
})

</script>

<style lang="scss" scoped>
.el-statistic {
  --el-statistic-content-font-size: 30px;
}

.statistic-card {
  border: 1px solid #b9c5dc;
  padding: 20px;
  border-radius: 4px;
  background-color: var(--el-bg-color-overlay);
}

.statistic-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-size: 12px;
  color: var(--el-text-color-regular);
  margin-top: 16px;
}

.statistic-footer .footer-item {
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.statistic-footer .footer-item span:last-child {
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
}

.green {
  color: var(--el-color-success);
}

.red {
  color: var(--el-color-error);
}

.item {
  margin-bottom: 10px;
}

.today-weather {
  margin-top: 30px;
  overflow: hidden;
  position: relative;
}

.descriptions {
  background-color: red;
}
</style>
