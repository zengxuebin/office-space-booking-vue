<template>
  <div style="overflow: hidden; width: 100%; height: 100%;">
    <vxe-grid ref='xGrid' v-bind="gridOptions">
      <template #toolbar_buttons>
        <vxe-button status="primary" icon="vxe-icon-add" @click="addData">新增</vxe-button>
        <vxe-button status="info" icon="vxe-icon-edit" @click="editData">编辑</vxe-button>
        <vxe-button status="danger" icon="vxe-icon-delete" @click="deleteData">删除</vxe-button>
      </template>
    </vxe-grid>
  </div>
</template>

<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus';
import { onMounted, reactive, ref } from 'vue'
import type { VXETable, VxeGridInstance, VxeGridProps } from 'vxe-table'

const addData = () => {
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
    keyField: 'userId',
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
        field: 'username',
        title: '用户账号',
        span: 6,
        itemRender: {
          name: '$input',
          props: {
            placeholder: '请输入用户账号'
          }
        }
      },
      {
        field: 'sex',
        title: '用户性别',
        span: 6,
        itemRender: {
          name: '$select',
          options: [],
          props: { placeholder: '请选择用户性别' },
        }
      },
      {
        field: 'nickname',
        title: '用户昵称',
        span: 6,
        itemRender: {
          name: '$input',
          props: {
            placeholder: '请输入用户昵称'
          }
        }
      },
      {
        field: 'phone',
        title: '手机号码',
        span: 6,
        folding: true,
        itemRender: {
          name: '$input',
          props: {
            placeholder: '请输入手机号码'
          }
        }
      },
      {
        field: 'email',
        title: '电子邮箱',
        span: 6,
        folding: true,
        itemRender: {
          name: '$input',
          props: {
            placeholder: '请输入电子邮箱'
          }
        }
      },
      {
        field: 'deptName',
        title: '所在部门',
        span: 6,
        folding: true,
        itemRender: {
          name: '$select',
          options: [
            { label: '数据监测中心', value: '数据监测中心' },
            { label: '用户中心', value: '用户中心' },
          ],
          props: {
            placeholder: '请选择所在部门'
          }
        }
      },
      {
        span: 6,
        folding: true,
      },
      // 功能
      {
        span: 6,
        align: 'center',
        collapseNode: true,
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

      //     console.log(page);

      //     // 处理排序条件
      //     const firstSort = sorts[0]
      //     if (firstSort) {
      //       queryParams.sort = firstSort.field
      //       queryParams.order = firstSort.order
      //     }
      //     // 请求参数
      //     const data = {
      //       pageNum: page.currentPage,
      //       pageSize: page.pageSize,
      //       entity: {
      //       }
      //     }
      //     console.log(data);

      //     // 调用方法
      //     getPageUser(data).then(res => {
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
      fixed: 'left',
    },
    {
      type: 'seq',
      title: '序号',
      align: "center",
      width: 60
    },
    {
      field: 'username',
      title: '用户名',
      align: "center",
      width: 120,
    },
    {
      field: 'password',
      title: '用户密码',
      align: "center",
      width: 150,
    },
    {
      field: 'deptName',
      title: '所属部门',
      align: "center",
      width: 120,
    },
    {
      field: 'roleName',
      title: '角色名称',
      align: "center",
      width: 150,
      formatter: ({ cellValue }) => {
        if (cellValue == '0') {
          return '管理员'
        } else {
          return '普通用户'
        }
      }
    },
    {
      field: 'email',
      title: '电子邮箱',
      align: "center",
      width: 180,
    },
    {
      field: 'phomeNumber',
      title: '手机号',
      align: "center",
      width: 150,
    },
    {
      field: 'registerTime',
      title: '注册时间',
      align: "center",
      width: 180,
    },
    {
      field: 'updateTime',
      title: '更新时间',
      align: "center",
      width: 180,
    },
  ],
  checkboxConfig: {
    reserve: true,
    highlight: true,
    range: true
  },
})
</script>

<style lang="scss" scoped></style>
