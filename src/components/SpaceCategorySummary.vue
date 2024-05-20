<template>
  <echarts :options="options" height="300px"></echarts>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import echarts from '@/components/echarts/Index.vue'

const options = ref({
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'horizontal',
    left: 'top'
  },
  series: [
    {
      name: '类别总览',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 80, name: '开放式工位' },
        { value: 22, name: '独立办公室' },
        { value: 51, name: '会议室' },
        { value: 32, name: '体育场馆' },
        { value: 20, name: '报告厅' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
})
</script>

<style lang="scss" scoped></style>