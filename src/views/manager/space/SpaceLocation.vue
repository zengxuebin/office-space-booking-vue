<template>
  <div style="overflow: hidden; width: 100%; height: 100%;">
    <vxe-grid ref='xGrid' v-bind="gridOptions">
      <template #toolbar_buttons>
        <vxe-button status="primary" icon="vxe-icon-add" @click="addData">新增</vxe-button>
        <vxe-button status="danger" icon="vxe-icon-delete" @click="deleteData">删除</vxe-button>
      </template>
      <template #operate="{ row }">
        <vxe-button status="info" icon="vxe-icon-edit" @click="editData(row)">编辑</vxe-button>
        <vxe-button status="danger" icon="vxe-icon-delete" @click="removeRow(row)">删除</vxe-button>
      </template>
    </vxe-grid>

    <el-dialog v-model="dialogFormVisible" :title=title width="500" align-center @closed="resetForm">
      <el-form ref="ruleFormRef" style="max-width: 500px" :model="locationForm" :rules="rules" label-width="auto"
        :size="formSize" status-icon>
        <el-form-item label="所属区域" prop="area">
          <el-select-v2 v-model="locationForm.area" placeholder="请选择所属区域" :options="areas" />
        </el-form-item>
        <el-form-item label="楼宇名称" prop="deptName">
          <el-input v-model="locationForm.name" placeholder="请输入楼宇名称" />
        </el-form-item>
        <el-form-item label="负责人" prop="chargePerson">
          <el-input v-model="locationForm.chargePerson" placeholder="请输入负责人名称" />
        </el-form-item>
        <el-form-item label="管理单位" prop="managementUnit">
          <el-input v-model="locationForm.managementUnit" placeholder="请输入负责人联系方式" disabled />
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
          <el-input v-model="locationForm.phone" placeholder="请输入联系方式" />
        </el-form-item>
        <div class="footer">
          <el-button type="primary" @click="submitForm(ruleFormRef)">
            确认
          </el-button>
          <el-button @click="closeDialog">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus';
import { reactive, ref } from 'vue'
import type { VxeGridInstance, VxeGridProps } from 'vxe-table'
import { getPageLocation, addLocation, updateLocation, deleteLocation, batchDeleteLocation } from '@/api/space/location'

const dialogFormVisible = ref(false)
const title = ref('')

let operateType = ''

const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()

interface LocationForm {
  id: string,
  area: string,
  name: string,
  chargePerson: string,
  managementUnit: string,
  phone: string
}

const areas = [
  { label: '南区', value: '南区' },
  { label: '北区', value: '北区' },
]

const locationForm = reactive<LocationForm>({
  id: '',
  area: '',
  name: '',
  chargePerson: '',
  managementUnit: '华东交通大学',
  phone: ''
})

const resetForm = () => {
  locationForm.id = ''
  locationForm.area = ''
  locationForm.name = ''
  locationForm.chargePerson = ''
  locationForm.managementUnit = '华东交通大学'
  locationForm.phone = ''
}

const rules = reactive<FormRules<LocationForm>>({
  area: [
    { required: true, message: '请选择所属区域', trigger: 'change', },
  ],
  name: [
    { required: true, message: '请输入楼宇名称', trigger: 'blur' },
  ],
  chargePerson: [
    { required: true, message: '请输入负责人名称', trigger: 'blur' },
  ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      if (operateType === 'add') {
        addLocation(locationForm).then(res => {
          dialogFormVisible.value = false
          xGrid.value.commitProxy('query')
          ElMessage({
            message: '新增空间位置成功',
            type: 'success',
          })
        })
      } else if (operateType === 'update') {
        updateLocation(locationForm).then(res => {
          dialogFormVisible.value = false
          xGrid.value.commitProxy('query')
          ElMessage({
            message: '更新空间位置成功',
            type: 'success',
          })
        })
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}

const closeDialog = () => {
  dialogFormVisible.value = false
}

const addData = () => {
  title.value = '新增空间位置'
  operateType = 'add'
  dialogFormVisible.value = true
  console.log('add')
}

const removeRow = (row: any) => {
  console.log(row)
  ElMessageBox.confirm(
    '此操作将删除所选空间位置记录，此操作不可逆，是否继续？',
    '删除',
    {
      confirmButtonText: '继续',
      cancelButtonText: '取消',
      type: 'success',
    }
  )
    .then(() => {
      console.log(row.id);

      deleteLocation(row.id).then(res => {
        xGrid.value.commitProxy('query')
        ElMessage({
          type: 'success',
          message: '删除空间位置成功！',
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

const deleteData = () => {
  if (xGrid.value) {
    const rows = xGrid.value.getCheckboxRecords(true)
    if (rows && rows.length >= 1) {
      ElMessageBox.confirm(
        '此操作将删除所选空间位置记录，此操作不可逆，是否继续？',
        '删除',
        {
          confirmButtonText: '继续',
          cancelButtonText: '取消',
          type: 'success',
        }
      )
        .then(() => {
          let dictIds: any[] = []
          rows.forEach(item => {
            console.log(item);
            dictIds.push(item.id)
          })
          batchDeleteLocation(dictIds).then(res => {
            ElMessage({
              type: 'success',
              message: '删除所选空间位置成功！',
            })
            xGrid.value.commitProxy('query')
          })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '您取消了该操作',
          })
        })
    } else {
      ElMessage({
        message: '请选择需要删除的空间位置记录',
        type: 'warning',
      })
    }
  }
}

const editData = (row: any) => {
  title.value = '编辑空间位置'
  operateType = 'update'
  dialogFormVisible.value = true
  locationForm.id = row.id
  locationForm.area = row.area
  locationForm.name = row.name
  locationForm.chargePerson = row.chargePerson
  locationForm.managementUnit = row.managementUnit
  locationForm.phone = row.phone
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
        field: 'area',
        title: '楼宇名称',
        span: 6,
        itemRender: {
          name: '$select',
          options: areas,
          props: {
            placeholder: '请选择所属区域'
          }
        }
      },
      {
        field: 'name',
        title: '楼宇名称',
        span: 6,
        itemRender: {
          name: '$input',
          props: {
            placeholder: '请输入区域名称'
          }
        }
      },
      {
        field: 'chargePerson',
        title: '负责人名称',
        span: 6,
        itemRender: {
          name: '$input',
          props: {
            placeholder: '请输入负责人名称'
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
              area: form.area,
              name: form.name,
              chargePerson: form.chargePerson,
            }
          }
          console.log(data);

          // 调用方法
          getPageLocation(data).then(res => {
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
    },
    {
      field: 'area',
      title: '所属区域',
      align: "center",
    },
    {
      field: 'name',
      title: '楼宇名称',
      align: "center",
    },
    {
      field: 'chargePerson',
      title: '负责人',
      align: "center",
    },
    {
      field: 'managementUnit',
      title: '管理单位',
      align: "center",
    },
    {
      field: 'phone',
      title: '联系方式',
      align: "center",
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
