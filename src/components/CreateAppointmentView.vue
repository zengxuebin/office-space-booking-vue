<template>
  <div class="spave-view">
    <el-card style="width: 100%;">
      <el-container>
        <el-header>
          <h3>预约验证</h3>
        </el-header>
        <el-main>
          <el-row>
            <el-col :span="21">
              <div style="margin-bottom: 20px;">时间：2024-05-01 12:12:12 ～ 2024-05-02 12:12:12</div>
              <div>地点：华东交通大学-北区-软件学院-3F-403-会议室</div>
            </el-col>
            <el-col :span="3">
              <el-text type="danger" size="large">审批未通过</el-text>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-card>
  </div>
</template>

<script setup lang="ts">
const url = '/src/assets/images/bar.jpg'

</script>

<style lang="scss" scoped>
.title {
  font-size: 1.17em;
  font-weight: bold;
}

.el-row {
  margin-bottom: 20px;
}

.tag {
  grid-gap: 0.5rem;
  gap: 0.5rem;
  display: flex;
  flex-wrap: wrap;
}

:deep(.el-card__body) {
  padding-top: 0!important;
  padding-bottom: 0!important;
}

.el-header {
  padding: 0px;
}

.el-main {
  padding: 0px;
}
</style>