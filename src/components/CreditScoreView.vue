<template>
  <echarts :options="options" height="500px"></echarts>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import echarts from '@/components/echarts/Index.vue'

const options = ref({
series: [
  {
    type: 'gauge',
    startAngle: 180,
    endAngle: 0,
    center: ['50%', '75%'],
    radius: '90%',
    min: 0,
    max: 1,
    splitNumber: 8,
    axisLine: {
      lineStyle: {
        width: 6,
        color: [
          [0.25, '#dc5033'],
          [0.5, '#e6993a'],
          [0.75, '#9ee362'],
          [1, '#65d95b'],
        ]
      }
    },
    pointer: {
      icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
      length: '12%',
      width: 20,
      offsetCenter: [0, '-60%'],
      itemStyle: {
        color: 'auto'
      }
    },
    axisTick: {
      length: 12,
      lineStyle: {
        color: 'auto',
        width: 2
      }
    },
    splitLine: {
      length: 20,
      lineStyle: {
        color: 'auto',
        width: 5
      }
    },
    axisLabel: {
      color: '#464646',
      fontSize: 20,
      distance: -60,
      rotate: 'tangential',
      formatter: function (value: number) {
        if (value === 0.875) {
          return '优秀';
        } else if (value === 0.625) {
          return '良好';
        } else if (value === 0.375) {
          return '一般';
        } else if (value === 0.125) {
          return '不良';
        }
        return '';
      }
    },
    title: {
      offsetCenter: [0, '-10%'],
      fontSize: 20
    },
    detail: {
      fontSize: 30,
      offsetCenter: [0, '-35%'],
      valueAnimation: true,
      formatter: function (value: number) {
        return Math.round(value * 100) + '';
      },
      color: 'inherit'
    },
    data: [
      {
        value: 1,
        name: '信誉分'
      }
    ]
  }
]
})
</script>

<style lang="scss" scoped>
</style>