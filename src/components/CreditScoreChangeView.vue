<template>
  <div>
    <credit-score-change :options="options" height="500px"></credit-score-change>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CreditScoreChange from '@/components/echarts/Index.vue'
import { getCurrentDate, getXBeforeDate } from '@/utils/dateUtil';

const creditScore = [[]];
const currentDate = getCurrentDate()

for (let i = 0; i < 15; i++) {
  creditScore.push([getXBeforeDate(currentDate, i, 'day'), 100])
}

const data = creditScore;

const dateList = data.map(function (item) {
  return item[0];
});

const valueList = data.map(function (item) {
  return item[1];
});

const options = ref({
  visualMap: [
    {
      show: false,
      type: 'continuous',
      seriesIndex: 0,
      min: 0,
      max: 450,
      inRange: {  
        color: ['#334f8f', '#0052D9'] // 定义颜色映射范围  
      }
    }
  ],

  title: [
    {
      left: 'center',
      text: '近十五天信誉分变化',
      textStyle: {
        color: '#0052D9',
      },
    }
  ],
  tooltip: {
    trigger: 'axis'
  },
  xAxis: [
    {
      data: dateList,
      gridIndex: 1
    }
  ],
  yAxis: [
    {
      gridIndex: 1
    }
  ],
  grid: [
    {
      bottom: '40%'
    },
    {
      top: '10%'
    }
  ],
  series: [
    {
      type: 'line',
      showSymbol: false,
      data: valueList,
    }
  ]
})
</script>

<style lang="scss" scoped>
</style>