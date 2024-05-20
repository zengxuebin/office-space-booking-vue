<template>
  <div style="overflow: hidden; width: 100%; height: 100%;">
    <vxe-grid ref='xGrid' v-bind="gridOptions">
      <template #toolbar_buttons>
        <vxe-button status="primary" icon="vxe-icon-send" @click="batchApproveAudit">通过</vxe-button>
        <vxe-button status="danger" icon="vxe-icon-repeat" @click="batchRejectAudit">拒绝</vxe-button>
      </template>
      <template #operate="{ row }">
        <vxe-button status="primary" icon="vxe-icon-send" @click="approveAudit(row)">通过</vxe-button>
        <vxe-button status="danger" icon="vxe-icon-repeat" @click="rejectAudit(row)">拒绝</vxe-button>
      </template>
    </vxe-grid>

    <el-dialog v-model="dialogFormVisible" :title=title width="500" align-center>

    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'
import { onMounted, reactive, ref, watchEffect } from 'vue'
import type { VxeGridInstance, VxeGridProps } from 'vxe-table'
import { getDictOption } from '@/api/system/dict'
import { getReservePage } from '@/api/reserve'
import { convertDict } from '@/utils/dictUtil'
import { approveReserve, batchApproveReserve, rejectReserve, batchRejectReserve } from "@/api/audit"
import { getUserOption } from '@/api/option'
import { getSpaceOption } from '@/api/option'

const dialogFormVisible = ref(false)
const title = ref('')

const statuses = ref<any[]>([])
const users = ref<any[]>([])
const spaces = ref<any[]>([])

onMounted(() => {
  getDictOption('biz_reserve_status').then(res => {
    console.log(res.data)
    statuses.value = res.data
  })

  getUserOption().then(res => {
    users.value = res.data
  })

  getSpaceOption().then(res => {
    spaces.value = res.data
  })
})

watchEffect(() => {
  if (statuses.value.length) {
    const { formConfig } = gridOptions
    formConfig.items[1].itemRender.options = statuses.value
  }

  if (users.value.length) {
    const { formConfig } = gridOptions
    formConfig.items[2].itemRender.options = users.value
  }
})

const approveAudit = (row: any) => {
  console.log(row)
  ElMessageBox.confirm(
    '此操作将审核通过该共享空间预约单，并告知用户，此操作不可逆，是否继续？',
    '通过',
    {
      confirmButtonText: '继续',
      cancelButtonText: '取消',
      type: 'success',
    }
  )
    .then(() => {
      console.log(row.id);

      approveReserve(row.id).then(res => {
        xGrid.value.commitProxy('query')
        ElMessage({
          type: 'success',
          message: '审核成功！',
        })
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '您取消了该操作',
      })
    })
}

const rejectAudit = (row: any) => {
  console.log(row)
  ElMessageBox.confirm(
    '此操作将审核拒绝该共享空间预约单，并告知用户，此操作不可逆，是否继续？',
    '拒绝',
    {
      confirmButtonText: '继续',
      cancelButtonText: '取消',
      type: 'success',
    }
  )
    .then(() => {
      console.log(row.id)

      rejectReserve(row.id).then(res => {
        xGrid.value.commitProxy('query')
        ElMessage({
          type: 'success',
          message: '审核成功！',
        })
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '您取消了该操作',
      })
    })
}


const batchApproveAudit = () => {
  if (xGrid.value) {
    const rows = xGrid.value.getCheckboxRecords(true)
    if (rows && rows.length >= 1) {
      ElMessageBox.confirm(
        '此操作审核通过所有选中共享空间预约单，并告知用户，此操作不可逆，是否继续？',
        '警告',
        {
          confirmButtonText: '继续',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
        .then(() => {
          let rowList: any[] = []
          rows.forEach(item => {
            console.log(item);
            rowList.push(item.id)
          })
          batchApproveReserve(rowList).then(res => {
            if (xGrid.value) {
              xGrid.value.commitProxy('query')
            }
            ElMessage({
              type: 'success',
              message: '审核所选预约单成功！',
            })
          })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '取消审核通过选中共享空间预约单',
          })
        })
    } else {
      ElMessage({
        message: '您需要选择需要审核通过的共享空间预约单',
        type: 'warning',
      })
    }
  }
}

const batchRejectAudit = () => {
  if (xGrid.value) {
    const rows = xGrid.value.getCheckboxRecords(true)
    if (rows && rows.length >= 1) {
      ElMessageBox.confirm(
        '此操作拒绝该共享空间预约单，并告知用户，此操作不可逆，是否继续？',
        '警告',
        {
          confirmButtonText: '继续',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
        .then(() => {
          let rowList: any[] = []
          rows.forEach(item => {
            console.log(item);
            rowList.push(item.id)
          })
          batchRejectReserve(rowList).then(res => {
            if (xGrid.value) {
              xGrid.value.commitProxy('query')
            }
            ElMessage({
              type: 'success',
              message: '审核所选预约单成功！',
            })
          })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '取消拒绝共享空间预约单',
          })
        })
    } else {
      ElMessage({
        message: '您需要选择需要拒绝的共享空间预约单',
        type: 'warning',
      })
    }
  }
}

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
        field: 'topic',
        title: '预约主题',
        span: 6,
        itemRender: {
          name: '$input',
          props: {
            placeholder: '请输入预约单主题'
          }
        }
      },
      {
        field: 'status',
        title: '预约状态',
        span: 6,
        itemRender: {
          name: '$select',
          options: [],
          props: {
            placeholder: '请选择预约状态'
          }
        }
      },
      {
        field: 'userId',
        title: '预约用户',
        span: 6,
        itemRender: {
          name: '$select',
          options: [],
          props: {
            placeholder: '请选择预约用户'
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
    slots: {
      buttons: 'toolbar_buttons'
    },
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
              topic: form.topic,
              userId: form.userId,
              status: form.status,
            }
          }
          console.log(data);

          // 调用方法
          getReservePage(data).then(res => {
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
      type: 'checkbox',
      width: 60,
      align: "center",
      fixed: 'left',
    },
    {
      title: '序号',
      type: 'seq',
      align: "center",
      width: 60,
    },
    {
      field: 'userId',
      title: '预约用户',
      align: "center",
      width: 120,
      formatter: ({ cellValue }) => {
        return convertDict(users.value, cellValue)
      }
    },
    {
      field: 'topic',
      title: '预约主题',
      align: "center",
      width: 150,
    },
    {
      field: 'spaceId',
      title: '空间名称',
      align: "center",
      width: 150,
      formatter: ({ cellValue }) => {
        return convertDict(spaces.value, cellValue)
      }
    },
    {
      field: 'reserveTime',
      title: '预约时间',
      align: "center",
      width: 180,
    },
    {
      field: 'startTime',
      title: '预约开始时间',
      align: "center",
      width: 180,
    },
    {
      field: 'endTime',
      title: '预约结束时间',
      align: "center",
      width: 180,
    },
    {
      field: 'status',
      title: '预约状态',
      align: "center",
      width: 120,
      formatter: ({ cellValue }) => {
        return convertDict(statuses.value, cellValue)
      }
    },
    {
      title: '操作',
      align: "center",
      width: 200,
      fixed: 'right',
      slots: {
        default: 'operate'
      }
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
