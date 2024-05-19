import request from '@/utils/request'

/**
 * 分页获取位置信息
 * @returns 分页位置
 */
export const getPageLocation = (data: any) => {
  return request({
    method: 'post',
    url: '/space/location/page',
    data
  })
}

/**
 * 新增位置
 * @returns 是否新增成功
 */
export const addLocation = (data: any) => {
  return request({
    method: 'post',
    url: '/space/location/add',
    data
  })
}

/**
 * 更新位置
 * @returns 是否更新成功
 */
export const updateLocation = (data: any) => {
  return request({
    method: 'post',
    url: '/space/location/update',
    data
  })
}

/**
 * 删除位置
 * @returns 是否删除成功
 */
export const deleteLocation = (data: any) => {
  return request({
    method: 'post',
    url: '/space/location/delete',
    data
  })
}

/**
 * 批量删除位置
 * @returns 是否删除成功
 */
export const batchDeleteLocation = (data: any) => {
  return request({
    method: 'post',
    url: '/space/location/batchDelete',
    data
  })
}