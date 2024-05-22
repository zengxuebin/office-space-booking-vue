<template>
  <div class="spave-view">
    <el-card style="width: 100%;">
      <el-container>
        <el-header>
          <h3>{{ record.topic }}</h3>
        </el-header>
        <el-main>
          <el-row justify="space-between">
            <el-col :span="18">
              <div style="margin-bottom: 20px;">时间：{{ record.startTime }} ～ {{ record.endTime }}</div>
              <div>地点：{{ record.location }}</div>
            </el-col>
            <el-col :span="6">
              <el-text type="success" v-if="record.status == '待确认'" size="large">待确认</el-text>
              <el-text type="info" v-if="record.status == '已拒绝'" size="large">已拒绝</el-text>
              <el-text type="primary" v-if="record.status == '已确认'" size="large">已确认</el-text>
              <el-text type="warning" v-if="record.status == '已取消'" size="large">已取消</el-text>
              <el-button style="margin-left: 20px;" v-if="record.status == '待确认'" type="primary" size="large" @click="approve">同意</el-button>
              <el-button v-if="record.status == '待确认'" type="danger" size="large" @click="reject">拒绝</el-button>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { approveReserve, rejectReserve } from '@/api/reserve/reserve';
import { ElMessage, ElMessageBox } from 'element-plus';
import { ref } from 'vue'

const url = '/src/assets/images/bar.jpg'

const props = defineProps({
  record: {
    type: Object,
    default: {}
  },
})
const record = ref(props.record)

const approve = () => {
  ElMessageBox.confirm(
    '你是否接受该邀约',
    '接受邀约',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'success',
    }
  )
    .then(() => {
      approveReserve(record.value.id).then(res => {
        ElMessage({
          type: 'success',
          message: '成功同意该邀约',
        })
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '您取消了该操作',
      })
    })
}

const reject = () => {
  ElMessageBox.confirm(
    '你是否拒绝该邀约',
    '警告',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      rejectReserve(record.value.id).then(res => {
        ElMessage({
          type: 'success',
          message: '拒绝成功！',
        })
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '您取消了该操作',
      })
    })
}
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
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

.el-header {
  padding: 0px;
}

.el-main {
  padding: 0px;
}
</style>