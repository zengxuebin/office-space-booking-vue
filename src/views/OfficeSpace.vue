<template>
  <div>
    <h2 style="text-align: center;">共享工位预约</h2>
    <el-container>
      <el-aside width="280px" class="search-aside">
        <div class="search">
          <el-select v-model="value" size="large" style="width: 240px" :empty-values="[null]" :value-on-clear="null">
            <el-option v-for="item in locations" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <el-divider />
        <div class="search">
          <h3>位置校区</h3>
          <el-radio-group v-model="location">
            <el-radio :value="1" size="large">华东交通大学-南区</el-radio>
            <el-radio :value="2" size="large">华东交通大学-北区</el-radio>
          </el-radio-group>
        </div>
        <el-divider />
        <div class="search">
          <h3>可容纳人数</h3>
          <el-radio-group v-model="radio" style="display: block;">
            <el-radio :value="1" style="display: block;">10人以下</el-radio>
            <el-radio :value="2" style="display: block;">11-50人</el-radio>
            <el-radio :value="3" style="display: block;">51-100人</el-radio>
            <el-radio :value="4" style="display: block;">101-150人</el-radio>
            <el-radio :value="5" >151-200人</el-radio>
          </el-radio-group>
        </div>
      </el-aside>
      <el-container>
        <el-header class="header-search">
          <el-date-picker v-model="value1" type="date" placeholder="请选择日期" size="large" />
          <el-input v-model="input" style="width: 240px" placeholder="请输入共享空间名称" size="large" :prefix-icon="Search" />
        </el-header>
        <el-main class="main">
          <div style="margin-bottom: 20px;">
            <el-segmented v-model="choose" :options="freeOptions" block=true>
              <template #default="{ item }">
                <div class="options">
                  <span>{{ item.label }}</span>
                  <div><span class="num">{{ item.num }}</span>间</div>
                </div>
              </template>
            </el-segmented>
          </div>
          <office-space-view class="space-view" />
          <office-space-view class="space-view" />
          <office-space-view class="space-view" />
          <office-space-view class="space-view" />
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
import OfficeSpaceView from "@/components/OfficeSpaceView.vue"
import { Search } from '@element-plus/icons-vue'
import { getLocationOption } from "@/api/option"

const locations = ref<any[]>([])

getLocationOption().then(res => {
  console.log(res.data)
  res.data.push({
    value: '',
    label: 'All',
  },)
  locations.value = res.data
})

const pageVO2 = reactive({
  currentPage: 1,
  pageSize: 30,
  total: 100
})


const pageChangeEvent2 = () => {
  console.log(`分页事件2：第 ${pageVO2.currentPage} 页，每页  ${pageVO2.pageSize} 条`)
}

const value = ref('')

const radio = ref(3)
const location = ref(1)

const value1 = ref('2024-03-03')

const input = ref('')

const choose = ref('')

const freeOptions = [
  {
    label: '全部',
    value: '',
    num: 12,
  },
  {
    label: '空闲',
    value: '1',
    num: 0,
  },
  {
    label: '忙碌',
    value: '2',
    num: 0,
  },
  {
    label: '拥挤',
    value: '3',
    num: 0,
  },
]
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

.options {
  padding: 0.5rem;
}

.num {
  font-weight: bold;
  font-size: 20px;
}
</style>