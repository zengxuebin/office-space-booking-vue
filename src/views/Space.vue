<template>
  <div>
    <h2 style="text-align: center;">共享公共场馆预约</h2>
    <el-container>
      <el-aside width="280px" class="search-aside">
        <div class="search">
          <el-select v-model="value" size="large" style="width: 240px" :empty-values="[null]" :value-on-clear="null">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <el-divider />
        <div class="search">
          <h3>资源类型</h3>
          <el-radio-group v-model="radio">
            <el-radio :value="3">Option A</el-radio>
            <el-radio :value="6">Option B</el-radio>
            <el-radio :value="9">Option C</el-radio>
          </el-radio-group>
        </div>
        <el-divider />
        <div class="search">
          <h3>可容纳人数</h3>
          <el-radio-group v-model="radio">
            <el-radio :value="3">Option A</el-radio>
            <el-radio :value="6">Option B</el-radio>
            <el-radio :value="9">Option C</el-radio>
          </el-radio-group>
        </div>
      </el-aside>
      <el-container>
        <el-header class="header-search">
          <el-date-picker v-model="value1" type="date" placeholder="请选择日期" size="large" />
          <el-time-select v-model="startTime" style="width: 240px" :max-time="endTime" class="mr-4"
            placeholder="开始时间" start="00:00" step="00:30" end="23:59" size="large" />
          <el-time-select v-model="endTime" style="width: 240px" :min-time="startTime" placeholder="结束时间"
            size="large" start="00:00" step="00:30" end="23:59" />
          <el-input v-model="input" style="width: 240px" placeholder="请输入共享空间名称" size="large" :prefix-icon="Search" />
        </el-header>
        <el-main class="main">
          <space-view class="space-view" />
          <space-view class="space-view" />
          <space-view class="space-view" />
          <space-view class="space-view" />
          <space-view class="space-view" />
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
import SpaceView from "@/components/SpaceView.vue"
import { Search } from '@element-plus/icons-vue'

const pageVO2 = reactive({
  currentPage: 1,
  pageSize: 30,
  total: 100
})


const pageChangeEvent2 = () => {
  console.log(`分页事件2：第 ${pageVO2.currentPage} 页，每页  ${pageVO2.pageSize} 条`)
}

const value = ref('')

const options = [
  {
    value: '',
    label: 'All',
  },
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]

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