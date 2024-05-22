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
              <el-button v-if="record.favorite === false" size="large" :icon="Star" circle @click="favorite" />
              <el-button type="primary" v-if="record.favorite === true" size="large" :icon="Star" circle
                @click="centerDialogVisible = true" />
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
            <el-col :span="24" style="color: #7f7f7f;">
              可预约时间范围: 30分钟-5小时
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="15" class="tag">
              <el-tag type="info" size="large" v-for="equipment in record.equipmentList">{{ equipment }}</el-tag>
            </el-col>
            <el-col :span="9" v-if="compoentFavorite">
              <el-button size="large" @click="getDetail" >查看详情</el-button>
              <el-button type="primary" size="large" @click="drawer = true">立即预约</el-button>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-card>

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
        <el-form-item label="受邀用户">
          <el-select v-model="userIds" multiple placeholder="请选择受邀用户" style="width: 100%">
            <el-option v-for="item in users" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
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

    <el-dialog v-model="centerDialogVisible" title="取消收藏" width="500" align-center @closed="form.topic = ''">
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
  </div>
</template>

<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'

import {
  Star,
} from '@element-plus/icons-vue'
import router from '@/router'
import { PropType, onMounted, reactive, ref } from 'vue';
import { getUserOption } from '@/api/option'
import { reservePublicSpace } from '@/api/reserve/reserve';
import { cancelFavoriteSpace, favoriteSpace } from '@/api/favorite';

const users = ref<any[]>([])
const userIds = ref<any[]>([])

const centerDialogVisible = ref(false)

const calcelDialog = () => {
  centerDialogVisible.value = false
  ElMessage('你取消了该操作')
}

const handleFavorite = () => {
  cancelFavoriteSpace(record.id).then(res => {
    centerDialogVisible.value = false
    ElMessage({
      message: '取消收藏成功！是不爱了吗？',
      type: 'success',
    })
    record.favorite = false
  })
}

onMounted(() => {

  getUserOption().then(res => {
    console.log(res.data)
    users.value = res.data.filter((user: { value: string; }) => user.value != props.userOption[0].value)

  })
})

const props = defineProps({
  record: {
    type: Object,
    default: {}
  },
  reserveDate: {
    type: String,
    default: '2'
  },
  userOption: {
    type: Array as PropType<{ label: string; value: string }[]>,
    default: () => [{ label: '', value: '' }],
  },
  startTime: {
    type: String,
    default: ''
  },
  endTime: {
    type: String,
    default: ''
  },
  compoentFavorite: {
    type: Boolean,
    default: true,
  }
})

const compoentFavorite = props.compoentFavorite
const record = props.record

const reserveDate = props.reserveDate
console.log('ddd');

console.log(reserveDate == '');


const startTime = props.reserveDate + ' ' + props.startTime + ':00'
const endTime = props.reserveDate + ' ' + props.endTime + ':00'

const url = '/src/assets/images/bar.jpg'

const spaceOption = [
  { value: record.id, label: record.spaceName + '  ' + record.location }
]

const favorite = () => {
  favoriteSpace(record.id).then(res => {
    ElMessage({
      message: '收藏成功！可在“我的收藏”查看和管理哦～',
      type: 'success',
    })
    record.favorite = true
  })
}

const getDetail = () => {
  router.push('/spaceDetail')
}

const drawer = ref(false)

const form = reactive({
  topic: '',
  spaceId: record.id,
  userId: props.userOption[0].value,
  reserveStartTime: startTime,
  reserveEndTime: endTime,
  reserveUserIdList: userIds.value,
})

const onSubmit = () => {
  form.reserveUserIdList = userIds.value
  console.log(form);
  ElMessageBox.confirm(
    '公共场馆工位空间需审核，请耐心等待。',
    '提示',
    {
      confirmButtonText: '预约',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      reservePublicSpace(form).then(res => {
        drawer.value = false
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
</style>