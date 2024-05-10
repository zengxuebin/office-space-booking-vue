<template>
  <div>
    <h2 style="text-align: left;">共享资源详情</h2>
    <el-container>
      <el-main>
        <el-container>
          <el-aside width="550px">
            <el-image style="width: 550px; height: 300px; border-radius: 5px;" :src="url" fit="fill" />
          </el-aside>
          <el-main>
            <el-row>
              <el-col :span="24">
                <span class="title">北区-软件学院 3F 504(共享空间)</span>
                <el-text style="margin-left: 1rem; margin-right: 1rem;" type="warning" size="large">需审批</el-text>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" style="color: #7f7f7f;">
                介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" style="color: #7f7f7f;">
                <el-icon color="#0052D9">
                  <Clock />
                </el-icon>
                日常开放：2024-05-01～2024-05-31 00:00～23:59
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" style="color: #7f7f7f;">
                <el-icon color="#0052D9">
                  <Menu />
                </el-icon>
                资源类型：会议室
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" style="color: #7f7f7f;">
                <el-icon color="#0052D9">
                  <Notification />
                </el-icon>
                支持活动类型：大型活动、小型活动
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" style="color: #7f7f7f;">
                <el-icon color="#0052D9">
                  <User />
                </el-icon> 可容纳人数：99人
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" style="color: #7f7f7f;">
                <el-icon color="#0052D9">
                  <PieChart />
                </el-icon> 收费标准：每小时0元
              </el-col>
            </el-row>
          </el-main>
        </el-container>
        <el-container>
          <el-aside width="550px">
            <el-descriptions>
              <el-descriptions-item label="管理单位">华东交通大学</el-descriptions-item>
              <el-descriptions-item label="负责人">张三</el-descriptions-item>
              <el-descriptions-item label="联系方式">123456</el-descriptions-item>
            </el-descriptions>
          </el-aside>
          <el-main style="padding-top: 0px; padding-bottom: 0px;">
            <el-row>
              <el-col class="tag">
                <el-tag type="info" size="large">液晶屏</el-tag>
                <el-tag type="info" size="large">液晶屏</el-tag>
                <el-tag type="info" size="large">液晶屏</el-tag>
                <el-tag type="info" size="large">液晶屏</el-tag>
                <el-tag type="info" size="large">液晶屏</el-tag>
              </el-col>
            </el-row>
          </el-main>
        </el-container>
      </el-main>
      <el-footer style="text-align: center;">
        <el-button size="large">返回上级</el-button>
        <el-button type="primary" size="large" @click="drawer = true" show-close=false>立即预约</el-button>
      </el-footer>
    </el-container>
    <el-drawer v-model="drawer">
      <template #header="{ titleClass }">
        <h3 class="titleClass">预约信息填写</h3>
      </template>
      <el-form :model="form" label-width="auto" style="max-width: 600px">
        <el-form-item label="Activity name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="Activity zone">
          <el-select v-model="form.region" placeholder="please select your zone">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="Activity time">
          <el-col :span="11">
            <el-date-picker v-model="form.date1" type="date" placeholder="Pick a date" style="width: 100%" />
          </el-col>
          <el-col :span="2" class="text-center">
            <span class="text-gray-500">-</span>
          </el-col>
          <el-col :span="11">
            <el-time-picker v-model="form.date2" placeholder="Pick a time" style="width: 100%" />
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Create</el-button>
          <el-button>Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { reactive } from 'vue'

// do not use same name with ref
const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
})

const onSubmit = () => {
  console.log('submit!')
}

const drawer = ref(false)
const url = '/src/assets/images/bar.jpg'
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