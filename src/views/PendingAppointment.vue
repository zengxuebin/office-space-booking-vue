<template>
  <div>
    <h2 style="text-align: center;">我收到的邀约</h2>
    <el-container>
      <el-aside width="250px" class="search-aside">
        <div class="search">
          <h3>预约状态</h3>
          <el-radio-group v-model="form.status" style="display: block;" @change="change">
            <el-radio :value="0" size="large" style="display: block;">待确认</el-radio>
            <el-radio :value="-1" size="large" style="display: block;">已拒绝</el-radio>
            <el-radio :value="1" size="large" style="display: block;">已确认</el-radio>
            <el-radio :value="-2" size="large" style="display: block;">已取消</el-radio>
          </el-radio-group>
        </div>
      </el-aside>
      <el-container>
        <el-main class="main">
          <pending-appointment-view class="space-view" v-for="record in records" :key="record.id"
            :record="record"></pending-appointment-view>
        </el-main>
        <el-footer>
          <vxe-pager background v-model:current-page="pageVO.currentPage" v-model:page-size="pageVO.pageSize"
            :total="pageVO.total"
            :layouts="['Home', 'PrevJump', 'PrevPage', 'JumpNumber', 'NextPage', 'NextJump', 'End', 'Sizes', 'FullJump', 'Total']"
            @page-change="change">
          </vxe-pager>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import PendingAppointmentView from "@/components/PendingAppointmentView.vue"
import { useMenuStore } from "@/stores/menu"
import { getPageReserved } from '@/api/reserve/createReserve'
const store = useMenuStore()

store.switchMenu(3)

interface FavoriteForm {
  status: number,
}

const form = reactive<FavoriteForm>({
  status: 0
})

const pageVO = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 100
})

const records = ref([])

// 调用方法
const change = () => {
  const params = {
    pageNum: pageVO.currentPage,
    pageSize: pageVO.pageSize,
    entity: {
      status: form.status
    }
  }
  getPageReserved(params).then(res => {
    const data = res.data
    console.log(data)
    records.value = data.records
    pageVO.total = data.total
  })
}

change()


const pageChangeEvent2 = () => {
  console.log(`分页事件2：第 ${pageVO.currentPage} 页，每页  ${pageVO.pageSize} 条`)
}
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