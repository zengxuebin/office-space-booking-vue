<template>
  <div class="spave-view">
    <el-card style="width: 100%;">
      <el-container>
        <el-header>
          <h3>{{ record.topic }}</h3>
        </el-header>
        <el-main>
          <el-row>
            <el-col :span="18">
              <div style="margin-bottom: 20px;">时间：{{ record.startTime }} ～ {{ record.endTime }}</div>
              <div>地点：{{ record.location }}</div>
            </el-col>
            <el-col :span="6">
              <el-text type="success" v-if="record.status == '审核通过'" size="large">审核通过</el-text>
              <el-text type="info" v-if="record.status == '无需审核'" size="large">无需审核</el-text>
              <el-text type="primary" v-if="record.status == '待审核'" size="large">审核中</el-text>
              <el-text type="warning" v-if="record.status == '审核未通过'" size="large">审核未通过</el-text>
              <el-text type="warning" v-if="record.status == '用户取消'" size="large">已取消</el-text>
              <el-button v-if="record.status == '审核通过'" style="margin-left: 20px;" type="danger" size="large"
                @click="cancel">取消</el-button>
              <el-button v-if="record.status == '无需审核'" style="margin-left: 20px;" type="danger" size="large"
                @click="cancel">取消</el-button>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-card>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { cancelReserve } from "@/api/reserve/reserve";

const props = defineProps({
  record: {
    type: Object,
    default: {}
  },
})
const record = ref(props.record)

const cancel = () => {
  ElMessageBox.confirm(
    '该预约已生效，您如果取消将扣除您五点信誉分，信誉分过低将无法预约，是否继续？',
    '警告',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      cancelReserve(record.value.id).then(res => {
        ElMessage({
          type: 'success',
          message: '取消成功',
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