<template>
  <div>
    <h2 style="text-align: center;">我的收藏</h2>
    <el-container>
      <el-aside width="250px" class="search-aside">
        <div class="search">
          <h3>资源类型</h3>
          <el-radio-group v-model="form.categoryId" style="display: block;" @change="change">
            <el-radio :value="1" style="display: block;">开放式工位</el-radio>
            <el-radio :value="2" style="display: block;">公共场馆</el-radio>
          </el-radio-group>
        </div>
        <el-divider />
        <div class="search">
          <h3>位置</h3>
          <el-radio-group v-model="location">
            <el-radio :value="1" size="large">华东交通大学</el-radio>
          </el-radio-group>
        </div>
        <el-divider />
      </el-aside>
      <el-container>
        <el-main class="main">
          <space-view v-if="form.categoryId == 1" v-for="record in records" :key="record.id" :record="record"
            class="space-view" />
          <office-space-view v-if="form.categoryId == 2" v-for="record in records" :key="record.id" :record="record"
            class="space-view" />
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
import SpaceView from "@/components/SpaceView.vue"
import OfficeSpaceView from "@/components/OfficeSpaceView.vue"
import { getLocationOption } from "@/api/option"
import { useMenuStore } from "@/stores/menu"
import { getPageFavorite } from '@/api/favorite'
const store = useMenuStore()

store.switchMenu(3)

interface FavoriteForm {
  categoryId: number,
}

const form = reactive<FavoriteForm>({
  categoryId: 1
})

const records = ref([])

const pageVO = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 100
})

// 调用方法
const change = () => {
  const params = {
    pageNum: pageVO.currentPage,
    pageSize: pageVO.pageSize,
    entity: {
      categoryId: form.categoryId
    }
  }
  getPageFavorite(params).then(res => {
    const data = res.data
    console.log(data)
    records.value = data.records
    pageVO.total = data.total
  })

}

change()

const locations = ref<any[]>([])

getLocationOption().then(res => {
  console.log(res.data)
  locations.value = res.data
})


const pageChangeEvent2 = () => {
  console.log(`分页事件2：第 ${pageVO.currentPage} 页，每页  ${pageVO.pageSize} 条`)
}

const value = ref('')


const type = ref(0)
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