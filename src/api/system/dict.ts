import request from '@/utils/request'

/**
 * 分页获取字典信息
 * @returns 分页字典
 */
export const getPageDict = (data: any) => {
  return request({
    method: 'post',
    url: '/system/dict/page',
    data
  })
}

/**
 * 新增字典
 * @returns 是否新增成功
 */
export const addDict = (data: any) => {
  return request({
    method: 'post',
    url: '/system/dict/add',
    data
  })
}

/**
 * 更新字典
 * @returns 是否更新成功
 */
export const updateDict = (data: any) => {
  return request({
    method: 'post',
    url: '/system/dict/update',
    data
  })
}

/**
 * 删除字典
 * @returns 是否删除成功
 */
export const deleteDict = (data: any) => {
  return request({
    method: 'post',
    url: '/system/dict/delete',
    data
  })
}

/**
 * 批量删除字典
 * @returns 是否删除成功
 */
export const batchDeleteDict = (data: any) => {
  return request({
    method: 'post',
    url: '/system/dict/batchDelete',
    data
  })
}