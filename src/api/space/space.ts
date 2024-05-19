import request from '@/utils/request'

/**
 * 分页获取共享空间信息
 * @returns 分页共享空间
 */
export const getPageSpace = (data: any) => {
  return request({
    method: 'post',
    url: '/space/page',
    data
  })
}

/**
 * 新增共享空间
 * @returns 是否新增成功
 */
export const addSpace = (data: any) => {
  return request({
    method: 'post',
    url: '/space/add',
    data
  })
}

/**
 * 更新共享空间
 * @returns 是否更新成功
 */
export const updateSpace = (data: any) => {
  return request({
    method: 'post',
    url: '/space/update',
    data
  })
}

/**
 * 删除共享空间
 * @returns 是否删除成功
 */
export const deleteSpace = (data: any) => {
  return request({
    method: 'post',
    url: '/space/delete',
    data
  })
}

/**
 * 批量删除共享空间
 * @returns 是否删除成功
 */
export const batchDeleteSpace = (data: any) => {
  return request({
    method: 'post',
    url: '/space/batchDelete',
    data
  })
}