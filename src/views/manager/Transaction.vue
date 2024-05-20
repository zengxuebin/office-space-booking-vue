<template>
  <div style="overflow: hidden; width: 100%; height: 100%;">
    <vxe-grid ref='xGrid' v-bind="gridOptions">
    </vxe-grid>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watchEffect } from 'vue'
import type { VxeGridInstance, VxeGridProps } from 'vxe-table'
import { getDictOption } from '@/api/system/dict'
import { convertDict } from '@/utils/dictUtil'
import { getTransactionPage } from '@/api/transaction'
import { getAccountOption } from "@/api/option"

const accounts = ref<any[]>([])
const types = ref<any[]>([])
const statuses = ref<any[]>([])

onMounted(() => {
  getAccountOption().then(res => {
    accounts.value = res.data
  })

  getDictOption('biz_transaction_type').then(res => {
    console.log(res.data)
    types.value = res.data
  })

  getDictOption('biz_transaction_status').then(res => {
    statuses.value = res.data
  })
})

watchEffect(() => {
  if (accounts.value.length) {
    const { formConfig } = gridOptions
    formConfig.items[0].itemRender.options = accounts.value
  }

  if (types.value.length) {
    const { formConfig } = gridOptions
    formConfig.items[1].itemRender.options = types.value
  }
  if (statuses.value.length) {
    const { formConfig } = gridOptions
    formConfig.items[2].itemRender.options = statuses.value
  }
})

const xGrid = ref<VxeGridInstance>()

const gridOptions = reactive<VxeGridProps>({
  border: true,
  // 行斑马色
  stripe: true,
  // 设置表头所有内容过长时显示为省略号
  showHeaderOverflow: true,
  // 设置所有内容过长时显示为省略号（如果是固定列建议设置该值，提升渲染速度）
  showOverflow: true,
  height: 'auto',
  // 导出配置项
  exportConfig: {},
  // 行配置信息
  rowConfig: {
    // 自定义行数据唯一主键的字段名（默认自动生成）
    keyField: 'dictId',
    // 当鼠标移到行时，是否要高亮当前行
    isHover: true
  },
  // 列配置信息
  columnConfig: {
    // 每一列是否启用列宽调整
    resizable: true
  },
  // 排序配置项
  sortConfig: {
    trigger: 'cell',
    // 所有列是否使用服务端筛选，如果设置为 true 则不会对数据进行处理
    remote: true
  },
  // 分页配置项
  pagerConfig: {
    pageSize: 10,
    pageSizes: [5, 10, 15, 20, 50, 100],
    layouts: [
      "PrevJump",
      "PrevPage",
      "JumpNumber",
      "NextPage",
      "NextJump",
      "Sizes",
      "FullJump",
      "Total",
    ], //自定义布布局
    // 带背景颜色
    background: true,
  },
  formConfig: {
    titleAlign: 'right',
    //是否显示标题冒号
    titleColon: true,
    // 标题内容过长时显示为省略号
    titleOverflow: true,
    items: [
      {
        field: 'accountId',
        title: '所属账户',
        span: 6,
        itemRender: {
          name: '$select',
          options: [],
          props: {
            placeholder: '请选择账户'
          }
        }
      },
      {
        field: 'type',
        title: '交易类型',
        span: 6,
        itemRender: {
          name: '$select',
          options: [],
          props: {
            placeholder: '请选择交易类型'
          }
        }
      },
      {
        field: 'status',
        title: '交易状态',
        span: 6,
        itemRender: {
          name: '$select',
          options: [],
          props: {
            placeholder: '请选择交易状态'
          }
        }
      },
      // 功能
      {
        span: 6,
        align: 'center',
        itemRender: {
          name: '$buttons', children: [
            {
              props: {
                type: 'submit',
                content: '查询',
                status: 'primary',
                icon: 'vxe-icon-search',
              }
            },
            {
              props: {
                type: 'reset',
                content: '重置',
                icon: 'vxe-icon-repeat'
              }
            }
          ]
        }
      }
    ]
  },
  toolbarConfig: {
    refresh: true, // 显示刷新按钮
    export: true, // 显示导出按钮
    zoom: true, // 显示全屏按钮
    custom: true // 显示自定义列按钮
  },
  proxyConfig: {
    seq: true, // 启用动态序号代理，每一页的序号会根据当前页数变化
    sort: true, // 启用排序代理，当点击排序时会自动触发 query 行为
    filter: true, // 启用筛选代理，当点击筛选时会自动触发 query 行为
    form: true, // 启用表单代理，当点击表单提交按钮时会自动触发 reload 行为
    props: {
      // 对应响应结果 Promise<>
      result: 'records', // 配置响应结果列表字段
      total: 'total' // 配置响应结果总页数字段
    },
    // 接收 Promise API
    ajax: {
      // 当点击工具栏查询按钮或者手动提交指令 query或reload 时会被触发
      query: ({ page, sorts, filters, form }) => {
        return new Promise(resolve => {
          const queryParams: any = Object.assign({}, form)

          console.log(page);

          // 处理排序条件
          const firstSort = sorts[0]
          if (firstSort) {
            queryParams.sort = firstSort.field
            queryParams.order = firstSort.order
          }
          // 请求参数
          const data = {
            pageNum: page.currentPage,
            pageSize: page.pageSize,
            entity: {
              accountId: form.accountId,
              type: form.type,
              status: form.status,
            }
          }
          console.log(data);

          // 调用方法
          getTransactionPage(data).then(res => {
            const data = res.data
            resolve({
              records: data.records,
              total: data.total
            })
          })
        })
      },
      delete: ({ body }) => {
        return new Promise((resolve, reject) => {

        })
      },
    }
  },
  columns: [
    {
      title: '序号',
      type: 'seq',
      align: "center",
    },
    {
      field: 'accountId',
      title: '账户名',
      align: "center",
      formatter: ({ cellValue }) => {
        return convertDict(accounts.value, cellValue)
      }
    },
    {
      field: 'type',
      title: '交易类型',
      align: "center",
      formatter: ({ cellValue }) => {
        return convertDict(types.value, cellValue)
      }
    },
    {
      field: 'amount',
      title: '交易金额',
      align: "center",
    },
    {
      field: 'status',
      title: '交易状态',
      align: "center",
      formatter: ({ cellValue }) => {
        return convertDict(statuses.value, cellValue)
      }
    },
    {
      field: 'time',
      title: '交易时间',
      align: "center",
    },
  ],
  checkboxConfig: {
    reserve: true,
    highlight: true,
    range: true
  },
})
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}
</style>
