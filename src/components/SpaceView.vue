<template>
  <div class="spave-view">
    <el-card style="width: 100%;" shadow="hover">
      <el-container>
        <el-aside width="350px">
          <el-image style="width: 350px; height: 200px; border-radius: 5px;" :src="url" fit="fill" />
        </el-aside>
        <el-main>
          <el-row>
            <el-col :span="24">
              <span class="title">北区-软件学院 3F 504</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" style="color: #7f7f7f;">
              <el-icon>
                <User />
              </el-icon> 99
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" style="color: #7f7f7f;">
              可预约时间范围: 30分钟-5小时
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="15" class="tag">
              <el-tag type="info" size="large">液晶屏</el-tag>
              <el-tag type="info" size="large">液晶屏</el-tag>
              <el-tag type="info" size="large">液晶屏</el-tag>
              <el-tag type="info" size="large">液晶屏</el-tag>
              <el-tag type="info" size="large">液晶屏</el-tag>
            </el-col>
            <el-col :span="9">
              <el-button size="large">查看详情</el-button>
              <el-button type="primary" size="large">立即预约</el-button>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-card>
  </div>
</template>

<script setup lang="ts">
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
</style>