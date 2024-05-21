<template>
  <div>
    <h2 style="text-align: center;">共享公共场馆预约</h2>
    <el-container>
      <el-aside width="280px" class="search-aside">
        <div class="search">
          <el-select v-model="spaceForm.locationId" size="large" style="width: 240px" placeholder="请选择区域"
            @change="change" clearable>
            <el-option v-for="item in locations" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <el-divider />
        <div class="search">
          <h3>资源类型</h3>
          <el-radio-group v-model="spaceForm.categoryId" style="display: block;" @change="change">
            <el-radio :value="2" style="display: block;">独立办公室</el-radio>
            <el-radio :value="3" style="display: block;">会议室</el-radio>
            <el-radio :value="4" style="display: block;">体育场馆</el-radio>
            <el-radio :value="5" style="display: block;">报告厅</el-radio>
          </el-radio-group>
        </div>
        <el-divider />
        <div class="search">
          <h3>可容纳人数</h3>
          <el-radio-group v-model="spaceForm.capacity" style="display: block;" @change="change">
            <el-radio :value="1" style="display: block;">10人以下</el-radio>
            <el-radio :value="2" style="display: block;">11-50人</el-radio>
            <el-radio :value="3" style="display: block;">51-100人</el-radio>
            <el-radio :value="4" style="display: block;">101-150人</el-radio>
            <el-radio :value="5" style="display: block;">151-200人</el-radio>
          </el-radio-group>
        </div>
      </el-aside>
      <el-container>
        <el-header class="header-search">
          <el-date-picker v-model="spaceForm.reserveDate" :disabled-date="disabledDate" type="date" placeholder="请选择日期"
            value-format="YYYY-MM-DD" :clearable=false size="large" />
          <el-time-select v-model="spaceForm.startTime" style="width: 240px" :max-time="spaceForm.endTime" class="mr-4"
            placeholder="开始时间" start="00:00" step="00:30" end="23:59" size="large" />
          <el-time-select v-model="spaceForm.endTime" style="width: 240px" :min-time="spaceForm.startTime"
            :max-time="maxTime" placeholder="结束时间" size="large" start="00:00" step="00:30" end="23:59" />
          <el-input v-model="spaceForm.spaceName" style="width: 240px" placeholder="请输入共享空间名称" size="large"
            :prefix-icon="Search" @blur="change" />
        </el-header>
        <el-main class="main">
          <space-view class="space-view" v-for="record in records" :key="record.id" :record="record"
            :userOption="userOption" @change="change" :reserve-date="spaceForm.reserveDate"
            :start-time="spaceForm.startTime" :end-time="spaceForm.endTime" />
        </el-main>
        <el-footer>
          <vxe-pager background v-model:current-page="pageVO.currentPage" v-model:page-size="pageVO.pageSize"
            :total="pageVO.total"
            :layouts="['Home', 'PrevJump', 'PrevPage', 'JumpNumber', 'NextPage', 'NextJump', 'End', 'Sizes', 'FullJump', 'Total']"
            @pageChange="change">
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
import { getLocationOption } from "@/api/option"
import { getInfo } from '@/api/login'
import { useMenuStore } from "@/stores/menu"
import { addHoursToDate, getCurrentDate, getXAfterDateTime } from '@/utils/dateUtil'
import { getPageOfficeSpace } from '@/api/reserve/publicSpace'

const userInfo = reactive({
  id: 1,
  username: 'caolonghui',
})

const disabledDate = (date: { getTime: () => number }) => {
  return date.getTime() < new Date().getTime() - 24 * 60 * 60 * 1000
}

const userOption = ref([])

getInfo().then(res => {
  const userDTO = res.data.sysUserDTO
  userInfo.id = userDTO.id
  userInfo.username = userDTO.username
  userOption.value.push({ label: userInfo.username, value: userInfo.id },)
})

const store = useMenuStore()

store.switchMenu(2)

interface SpaceForm {
  locationId: string,
  categoryId: number,
  reserveDate: string,
  startTime: string,
  endTime: string,
  spaceName: string,
  capacity: number,
}

const records = ref([])

const spaceForm = reactive<SpaceForm>({
  locationId: '',
  spaceName: '',
  capacity: 2,
  startTime: '12:00',
  endTime: addHoursToDate('12:00', 5),
  reserveDate: getCurrentDate(),
  categoryId: 3
})

const pageVO = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 100
})

const maxTime = addHoursToDate(spaceForm.startTime, 5)

// 调用方法
const change = () => {
  const params = {
    pageNum: pageVO.currentPage,
    pageSize: pageVO.pageSize,
    entity: {
      locationId: spaceForm.locationId,
      reserveStartTime: spaceForm.reserveDate + ' ' + spaceForm.startTime + ':00',
      reserveEndTime: spaceForm.reserveDate + ' ' + spaceForm.endTime + ':00',
      spaceName: spaceForm.spaceName,
      capacity: spaceForm.capacity,
      categoryId: spaceForm.categoryId
    }
  }
  getPageOfficeSpace(params).then(res => {
    const data = res.data
    console.log(data)
    records.value = data.records
    pageVO.total = data.total
  })

}

change()

const locations = ref<any[]>([])

getLocationOption().then(res => {
  locations.value = res.data
})


const pageChangeEvent2 = () => {
  console.log(`分页事件2：第 ${pageVO.currentPage} 页，每页  ${pageVO.pageSize} 条`)
}

const value = ref('')

const type = ref(1)
const personNum = ref(1)

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