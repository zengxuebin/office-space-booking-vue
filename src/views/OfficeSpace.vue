<template>
  <div>
    <h2 style="text-align: center;">共享工位预约</h2>
    <el-container>
      <el-aside width="280px" class="search-aside">
        <div class="search">
          <el-select v-model="officeSpaceForm.locationId" size="large" style="width: 240px" placeholder="请选择区域"
            @change="change" clearable>
            <el-option v-for="item in locations" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <el-divider />
        <div class="search">
          <h3>所属</h3>
          <el-radio-group v-model="location">
            <el-radio :value="1" size="large">华东交通大学</el-radio>
          </el-radio-group>
        </div>
        <el-divider />
        <div class="search">
          <h3>可容纳人数</h3>
          <el-radio-group v-model="officeSpaceForm.capacity" style="display: block;" @change="change">
            <el-radio value="1" style="display: block;">10人以下</el-radio>
            <el-radio value="2" style="display: block;">11-50人</el-radio>
            <el-radio value="3" style="display: block;">51-100人</el-radio>
            <el-radio value="4" style="display: block;">101-150人</el-radio>
            <el-radio value="5" style="display: block;">151-200人</el-radio>
          </el-radio-group>
        </div>
      </el-aside>
      <el-container>
        <el-header class="header-search">
          <el-date-picker :disabled-date="disabledDate" v-model="officeSpaceForm.reserveDate" type="date"
            placeholder="请选择日期" :clearable=false size="large" @change="change" value-format="YYYY-MM-DD" />
          <el-input v-model="officeSpaceForm.spaceName" @change="change" style="width: 240px" placeholder="请输入共享空间名称" size="large"
            :prefix-icon="Search" />
        </el-header>
        <el-main class="main">
          <office-space-view class="space-view" v-for="record in records" :key="record.id" :record="record"
            :reserve-date="officeSpaceForm.reserveDate" :userOption="userOption" @change="change" />
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
import OfficeSpaceView from "@/components/OfficeSpaceView.vue"
import { Search } from '@element-plus/icons-vue'
import { getLocationOption } from "@/api/option"
import { useMenuStore } from "@/stores/menu"
import { getPageOfficeSpace } from "@/api/reserve/officeSpace"
import { getCurrentDate } from '@/utils/dateUtil'
import { getInfo } from '@/api/login'
import router from '@/router'

const userInfo = reactive({
  id: 1,
  username: 'caolonghui',
})

const userOption = ref([])

getInfo().then(res => {
  const userDTO = res.data.sysUserDTO
  userInfo.id = userDTO.id
  userInfo.username = userDTO.username
  userOption.value.push({ label: userInfo.username, value: userInfo.id },)
})

const store = useMenuStore()

store.switchMenu(1)

interface OfficeSpaceForm {
  locationId: string,
  reserveDate: string,
  spaceName: string,
  capacity: string,
}

const records = ref([])

const officeSpaceForm = reactive<OfficeSpaceForm>({
  locationId: '',
  reserveDate: getCurrentDate(),
  spaceName: '',
  capacity: '3'
})

const pageVO = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 100
})

// 请求参数

// 调用方法
const change = () => {
  const params = {
    pageNum: pageVO.currentPage,
    pageSize: pageVO.pageSize,
    entity: {
      locationId: officeSpaceForm.locationId,
      reserveDate: officeSpaceForm.reserveDate,
      spaceName: officeSpaceForm.spaceName,
      capacity: officeSpaceForm.capacity
    }
  }
  console.log(params);
  getPageOfficeSpace(params).then(res => {
    const data = res.data
    console.log(data)
    records.value = data.records
    pageVO.total = data.total
  })
}

change()

const disabledDate = (date: { getTime: () => number }) => {
  return date.getTime() < new Date().getTime() - 24 * 60 * 60 * 1000
}

const locations = ref<any[]>([])

getLocationOption().then(res => {
  console.log(res.data)
  locations.value = res.data
})


const pageChangeEvent2 = () => {
  console.log(`分页事件2：第 ${pageVO.currentPage} 页，每页  ${pageVO.pageSize} 条`)
}

const value = ref('')

const radio = ref(3)
const location = ref(1)

const value1 = ref('2024-03-03')

const input = ref('')

const choose = ref('')


function resolve(arg0: { records: any; total: any }) {
  throw new Error('Function not implemented.')
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

.options {
  padding: 0.5rem;
}

.num {
  font-weight: bold;
  font-size: 20px;
}
</style>