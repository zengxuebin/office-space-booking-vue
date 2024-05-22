<template>
  <div>
    <h2 style="text-align: center;">我收到的邀约</h2>
    <el-container>
      <el-aside width="250px" class="search-aside">
        <div class="search">
          <h3>预约状态</h3>
          <el-radio-group v-model="radio" style="display: block;">
            <el-radio :value="0" size="large" style="display: block;">预约成功</el-radio>
            <el-radio :value="4" size="large" style="display: block;">已取消</el-radio>
          </el-radio-group>
        </div>
      </el-aside>
      <el-container>
        <el-main class="main">
          <pending-appointment-view class="space-view"></pending-appointment-view>
          <pending-appointment-view class="space-view"></pending-appointment-view>
          <pending-appointment-view class="space-view"></pending-appointment-view>
          <pending-appointment-view class="space-view"></pending-appointment-view>
        </el-main>
        <el-footer>
          <vxe-pager background v-model:current-page="pageVO2.currentPage" v-model:page-size="pageVO2.pageSize"
            :total="pageVO2.total"
            :layouts="['Home', 'PrevJump', 'PrevPage', 'JumpNumber', 'NextPage', 'NextJump', 'End', 'Sizes', 'FullJump', 'Total']"
            @page-change="pageChangeEvent2">
          </vxe-pager>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import PendingAppointmentView from "@/components/PendingAppointmentView.vue"

const pageVO2 = reactive({
  currentPage: 1,
  pageSize: 30,
  total: 100
})


const pageChangeEvent2 = () => {
  console.log(`分页事件2：第 ${pageVO2.currentPage} 页，每页  ${pageVO2.pageSize} 条`)
}

const radio = ref(3)

const value1 = ref('2024-03-03')

const input = ref('')

const startTime = ref('9:00')
const endTime = ref('12:00')
</script>

<style lang="scss" scoped>
.main .space-view:not(:last-child) {
  margin-bottom: 20px;
}

.main .space-view:last-child {
  margin-bottom: 0;
}

.search-aside {
  padding-left: 20px;
  padding-right: 20px;
}

.search {
  padding-top: 20px;
  padding-bottom: 30px;
}

.header-search {
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
}
</style>