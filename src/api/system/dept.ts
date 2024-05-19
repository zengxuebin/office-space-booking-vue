import request from '@/utils/request'

/**
 * 分页获取部门信息
 * @returns 分页部门
 */
export const getPageDept = (data: any) => {
  return request({
    method: 'post',
    url: '/system/dept/page',
    data
  })
}

/**
 * 新增部门
 * @returns 是否新增成功
 */
export const addDept = (data: any) => {
  return request({
    method: 'post',
    url: '/system/dept/add',
    data
  })
}

/**
 * 更新部门
 * @returns 是否更新成功
 */
export const updateDept = (data: any) => {
  return request({
    method: 'post',
    url: '/system/dept/update',
    data
  })
}

/**
 * 删除部门
 * @returns 是否删除成功
 */
export const deleteDept = (data: any) => {
  return request({
    method: 'post',
    url: '/system/dept/delete',
    data
  })
}

/**
 * 批量删除部门
 * @returns 是否删除成功
 */
export const batchDeleteDept = (data: any) => {
  return request({
    method: 'post',
    url: '/system/dept/batchDelete',
    data
  })
}