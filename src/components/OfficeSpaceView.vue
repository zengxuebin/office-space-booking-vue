<template>
  <div class="spave-view">
    <el-card style="width: 100%;" shadow="hover">
      <el-container>
        <el-aside width="350px">
          <el-image style="width: 350px; height: 200px; border-radius: 5px;" :src="url" fit="fill" />
        </el-aside>
        <el-main>
          <el-row>
            <el-col :span="23">
              <span class="title">{{ record.spaceName }} &nbsp; {{ record.location }}</span>
            </el-col>
            <el-col :span="1">
              <el-button type="primary" size="large" :icon="Star" circle @click="centerDialogVisible = true" />
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" style="color: #7f7f7f;">
              <el-icon>
                <User />
              </el-icon> {{ record.capacity }}
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" style="color: #61c793;font-weight: 400;">
              <el-icon>
                <Clock />
              </el-icon>
              00:00～23:59(开放中)
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="15" class="tag">
              <el-tag type="info" size="large" v-for="equipment in record.equipmentList">{{ equipment }}</el-tag>
            </el-col>
            <el-col :span="9" style="text-align: right;">
              <el-button type="primary" size="large" @click="reserve">立即预约</el-button>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
      <el-progress :percentage="record.usedCapacity" status="warning" :color="colors">
        <el-text>占座率 {{ record.occupancyRate }} %（ {{ record.occupancyDescription }} ）</el-text>
      </el-progress>
    </el-card>


    <el-dialog v-model="centerDialogVisible" title="取消预约" width="500" align-center>
      <span>你将取消收藏该共享空间，是否继续？</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="calcelDialog">取消</el-button>
          <el-button type="primary" @click="handleFavorite">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>

    <el-drawer v-model="drawer">
      <template #header="{ titleClass }">
        <h3 class="titleClass">预约信息填写</h3>
      </template>
      <el-form :model="form" label-width="auto" style="max-width: 700px" size="large">
        <el-form-item label="预约主题">
          <el-input v-model="form.topic" />
        </el-form-item>
        <el-form-item label="共享工位">
          <el-select-v2 v-model="form.spaceId" :options="spaceOption" disabled />
        </el-form-item>
        <el-form-item label="预约用户">
          <el-select-v2 v-model="form.userId" :options="userOption" disabled />
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker v-model="startTime" type="datetime" disabled style="width: 100%" />
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker v-model="endTime" type="datetime" disabled style="width: 100%" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button @click="drawer = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { PropType, reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  Star,
} from '@element-plus/icons-vue'
import router from '@/router'
import { reserveOfficeSpace } from "@/api/reserve/reserve"
const emits = defineEmits(['change']);

const queryOfficeSpace = () => {
  emits('change');
};

const url = '/src/assets/images/space.png'

const props = defineProps({
  record: {
    type: Object,
    default: {}
  },
  reserveDate: {
    type: String,
    default: {}
  },
  userOption: {
    type: Array as PropType<{ label: string; value: string }[]>,
    default: () => [{ label: '', value: '' }],
  }
})

const startTime =  props.reserveDate + ' 00:00:00'
const endTime = props.reserveDate + ' 23:59:59'

console.log(props.userOption);

const record = props.record

const drawer = ref(false)

const spaceOption = [
  { value: record.id, label: record.spaceName + '  ' + record.location }
]

const form = reactive({
  topic: '',
  spaceId: record.id,
  userId: props.userOption[0].value,
  reserveDate: props.reserveDate
})

const reserve = () => {
  drawer.value = true
}

const onSubmit = () => {
  console.log(form);
  ElMessageBox.confirm(
    '共享工位空间无需审核，预约即可自动通过，准备好了吗？',
    '提示',
    {
      confirmButtonText: '准备好了',
      cancelButtonText: '没有',
      type: 'warning',
    }
  )
    .then(() => {
      reserveOfficeSpace(form).then(res => {
        drawer.value = false
        queryOfficeSpace()
        ElMessage({
          type: 'success',
          message: '恭喜你！预约成功！',
        })
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消预约，实在是太可惜了',
      })
    })
}

const centerDialogVisible = ref(false)

const calcelDialog = () => {
  centerDialogVisible.value = false
  ElMessage('你取消了该操作')
}

const colors = [
  { color: '#f56c6c', percentage: 100 },
  { color: '#e6a23c', percentage: 80 },
  { color: '#5cb87a', percentage: 60 },
  { color: '#1989fa', percentage: 40 },
  { color: '#6f7ad3', percentage: 20 },
]

const handleFavorite = () => {
  centerDialogVisible.value = false
  ElMessage({
    message: '取消收藏成功！是不爱了吗？',
    type: 'success',
  })
}

const getDetail = () => {
  router.push('/officeSpaceDetail')
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

.titleClass {
  color: #000;
}
</style>