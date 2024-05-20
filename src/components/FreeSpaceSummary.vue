<template>
  <echarts :options="options" height="300px"></echarts>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import echarts from '@/components/echarts/Index.vue'
import { getCurrentDate, getXBeforeDate } from "@/utils/dateUtil";

const currentDate = getCurrentDate()
const dates = [];

for (let i = 0; i < 7; i++) {
  dates.push(getXBeforeDate(currentDate, i, 'day'))
}

console.log(dates);


const options = ref({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  legend: {
    data: ['开放式工位', '独立办公室', '会议室', '体育场馆', '报告厅']
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: dates
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: '开放式工位',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: [1, 2, 1, 0, 0, 1, 2]
    },
    {
      name: '独立办公室',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: [1, 2, 1, 0, 0, 1, 3]
    },
    {
      name: '会议室',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: [0, 1, 1, 0, 0, 1, 0]
    },
    {
      name: '体育场馆',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: [1, 0, 1, 0, 0, 1, 0]
    },
    {
      name: '报告厅',
      type: 'line',
      stack: 'Total',
      label: {
        show: true,
        position: 'top'
      },
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: [1, 0, 1, 0, 0, 1, 2]
    }
  ]
})
</script>

<style lang="scss" scoped></style>