import request from '@/utils/request'

/**
 * 分页获取空间类别信息
 * @returns 分页空间类别
 */
export const getPageCategory = (data: any) => {
  return request({
    method: 'post',
    url: '/space/category/page',
    data
  })
}

/**
 * 新增空间类别
 * @returns 是否新增成功
 */
export const addCategory = (data: any) => {
  return request({
    method: 'post',
    url: '/space/category/add',
    data
  })
}

/**
 * 更新空间类别
 * @returns 是否更新成功
 */
export const updateCategory = (data: any) => {
  return request({
    method: 'post',
    url: '/space/category/update',
    data
  })
}

/**
 * 删除空间类别
 * @returns 是否删除成功
 */
export const deleteCategory = (data: any) => {
  return request({
    method: 'post',
    url: '/space/category/delete',
    data
  })
}

/**
 * 批量删除空间类别
 * @returns 是否删除成功
 */
export const batchDeleteCategory = (data: any) => {
  return request({
    method: 'post',
    url: '/space/category/batchDelete',
    data
  })
}