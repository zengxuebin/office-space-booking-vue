<template>
  <div class="spave-view">
    <el-card style="width: 100%;">
      <el-container>
        <el-header>
          <h3>{{ record.topic }}</h3>
        </el-header>
        <el-main>
          <el-row>
            <el-col :span="21">
              <div style="margin-bottom: 20px;">时间：{{ record.startTime }} ～ {{ record.endTime }}</div>
              <div>地点：{{ record.location }}</div>
            </el-col>
            <el-col :span="3">
              <el-text type="success" v-if="record.status == '审核通过'" size="large">审核通过</el-text>
              <el-text type="info" v-if="record.status == '无需审核'" size="large">无需审核</el-text>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  record: {
    type: Object,
    default: {}
  },
})
const record = ref(props.record)
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