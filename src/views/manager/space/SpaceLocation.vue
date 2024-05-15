<template>
  <div style="overflow: hidden; width: 100%; height: 100%;">
    <vxe-grid ref='xGrid' v-bind="gridOptions">
      <template #toolbar_buttons>
        <vxe-button status="primary" icon="vxe-icon-add" @click="addData">新增</vxe-button>
        <vxe-button status="info" icon="vxe-icon-edit" @click="editData">编辑</vxe-button>
        <vxe-button status="danger" icon="vxe-icon-delete" @click="deleteData">删除</vxe-button>
      </template>
      <template #alert_status="{ row }">
        <el-tag size='large'>正常</el-tag>
      </template>
      <template #operator="{ row }">
        <el-tag size='large' type="warning" v-if="row.operator === '>='">大于等于</el-tag>
        <el-tag size='large' type="warning" v-else-if="row.operator === '<='">小于等于</el-tag>
        <el-tag size='large' type="warning" v-else-if="row.operator === '='">等于</el-tag>
        <el-tag size='large' type="warning" v-else-if="row.operator === '!='">不等于</el-tag>
        <el-tag size='large' type="warning" v-else-if="row.operator === '>'">大于</el-tag>
        <el-tag size='large' type="warning" v-else>小于</el-tag>
      </template>
      <template #alert_level="{ row }">
        <span v-if="row.alertLevel === '红色'" style="color: #c63f34;">{{ row.alertLevel }}</span>
        <span v-else-if="row.alertLevel === '橙色'" style="color: #f2a747;">{{ row.alertLevel }}</span>
        <span v-else-if="row.alertLevel === '黄色'" style="color: #f6bd0e;">{{ row.alertLevel }}</span>
        <span v-else style="color: #4064f6;">{{ row.alertLevel }}</span>
      </template>
    </vxe-grid>

    <el-dialog v-model="dialogFormVisible" title="Shipping address" width="500">
      <el-form :model="form">
        <el-form-item label="Promotion name" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Zones" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="Please select a zone">
            <el-option label="Zone No.1" value="shanghai" />
            <el-option label="Zone No.2" value="beijing" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus';
import { onMounted, reactive, ref } from 'vue'
import type { VXETable, VxeGridInstance, VxeGridProps } from 'vxe-table'
import XEUtils from 'xe-utils'

const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})


const addData = () => {
  dialogFormVisible.value = true
  console.log('add')
}

const deleteData = () => {
  if (xGrid.value) {
    const rows = xGrid.value.getCheckboxRecords(true)
    if (rows && rows.length >= 1) {
      ElMessageBox.confirm(
        '此操作将删除所选共享空间位置数据，是否继续？',
        '删除',
        {
          confirmButtonText: '继续',
          cancelButtonText: '取消',
          type: 'success',
        }
      )
        .then(() => {
          let rowList: any[] = []
          rows.forEach(item => {
            console.log(item);
            rowList.push(item.alertId)
          })
          // handleAlertRelease(rowList).then(res => {
          //   if (xGrid.value) {
          //     xGrid.value.commitProxy('query')
          //   }
          //   ElMessage({
          //     type: 'success',
          //     message: '发布预警信息成功，等待相关工作人员推送',
          //   })
          // })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '取消发布预警信息',
          })
        })
    } else {
      ElMessage({
        message: '请选择需要删除的共享空间位置信息',
        type: 'warning',
      })
    }
  }
}

const editData = () => {
  if (xGrid.value) {
    const rows = xGrid.value.getCheckboxRecords(true)
    if (rows && rows.length == 1) {
      // dialogFormVisible.value = true
      // descForm.alertDesc = rows[0].alertDesc
    } else {
      ElMessage({
        message: '您只能选择一条空间位置信息进行编辑',
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
    keyField: 'ruleId',
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
        field: 'ruleName',
        title: '预警规则名称',
        span: 6,
        itemRender: {
          name: '$input',
          props: {
            placeholder: '请输入预警规则名称'
          }
        }
      },
      {
        field: 'alertLevel',
        title: '预警级别',
        span: 6,
        itemRender: {
          name: '$select',
          options: [],
          props: {
            placeholder: '请选择预警级别'
          }
        }
      },
      {
        field: 'metric',
        title: '预警监测指标',
        span: 6,
        itemRender: {
          name: '$input',
          props: {
            placeholder: '请输入预警监测指标'
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
      // query: ({ page, sorts, filters, form }) => {
      //   return new Promise(resolve => {
      //     const queryParams: any = Object.assign({}, form)
      //     // 处理排序条件
      //     const firstSort = sorts[0]
      //     if (firstSort) {
      //       queryParams.sort = firstSort.field
      //       queryParams.order = firstSort.order
      //     }
      //     // 处理筛选条件
      //     filters.forEach(({ field, values }) => {
      //       queryParams[field] = values.join(',')
      //     })

      //     console.log(form);

      //     // 请求参数
      //     const data = {
      //       pageNum: page.currentPage,
      //       pageSize: page.pageSize,
      //       entity: {
      //         ruleName: form.ruleName,
      //         alertLevel: form.alertLevel,
      //         metric: form.metric,
      //       }
      //     }
      //     // 调用方法
      //     getPageAlertRule(data).then(res => {
      //       const data = res.data
      //       resolve({
      //         records: data.records,
      //         total: data.total
      //       })
      //     })
      //   })
      // },
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
      fixed: 'left'
    },
    {
      title: '序号',
      type: 'seq',
      align: "center",
      width: 60
    },
    {
      field: 'ruleName',
      title: '预警规则名称',
      align: "center",
      width: 200,
    },
    {
      field: 'metric',
      title: '预警监测指标',
      align: "center",
      width: 150,
      formatter: ({ cellValue }) => {
        if (cellValue === 'temperature') {
          return '温度'
        } else if (cellValue === 'windSpeed') {
          return '风速'
        } else if (cellValue === 'precipitation') {
          return '降水量'
        } else if (cellValue === 'visibility') {
          return '能见度'
        } else if (cellValue === 'humidity') {
          return '湿度'
        } else if (cellValue === 'aqi') {
          return 'AQI'
        } else {
          return 'PM2.5'
        }
      }
    },
    {
      field: 'operator',
      title: '比较操作符',
      align: "center",
      width: 120,
      slots: {
        default: 'operator',
      },
    },
    {
      field: 'threshold',
      title: '预警触发阈值',
      align: "center",
      width: 120,
    },
    {
      field: 'alertLevel',
      title: '预警级别',
      align: "center",
      width: 120,
      slots: {
        default: 'alert_level',
      },
    },
    {
      field: 'priority',
      title: '预警优先级',
      align: "center",
      width: 120,
    },
    {
      field: 'alertStatus',
      title: '预警状态',
      align: "center",
      width: 120,
      slots: {
        default: 'alert_status',
      },
    },
    {
      field: 'ruleDesc',
      title: '预警描述',
      align: "center",
      width: 300,
    },
    {
      field: 'createBy',
      title: '创建者',
      align: "center",
      width: 120,
    },
    {
      field: 'createTime',
      title: '创建时间',
      align: "center",
      width: 180,
    },
    {
      field: 'updateBy',
      title: '更新者',
      align: "center",
      width: 120,
    },
    {
      field: 'updateTime',
      title: '更新时间',
      align: "center",
      width: 180,
    },
    {
      field: 'remark',
      title: '备注',
      align: "center",
      width: 200,
    },
  ],
  checkboxConfig: {
    reserve: true,
    highlight: true,
    range: true
  },
})

onMounted(() => {
  const levelList = [
    { label: '红色', value: '红色' },
    { label: '橙色', value: '橙色' },
    { label: '黄色', value: '黄色' },
    { label: '蓝色', value: '蓝色' },
  ]
  const { formConfig } = gridOptions

  if (formConfig && formConfig.items) {
    const levelItem = formConfig.items[1]
    if (levelItem && levelItem.itemRender) {
      levelItem.itemRender.options = levelList
    }
  }
})

const editLocation = () => {
  if (xGrid.value) {
    const rows = xGrid.value.getCheckboxRecords(true)
    if (rows && rows.length == 1) {
      // dialogFormVisible.value = true
      // descForm.alertDesc = rows[0].alertDesc
    } else {
      ElMessage({
        message: '您只能选择一条预警信息进行编辑',
        type: 'warning',
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
