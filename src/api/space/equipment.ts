import request from '@/utils/request'

/**
 * 分页获取空间设备信息
 * @returns 分页空间设备
 */
export const getPageEquipment = (data: any) => {
  return request({
    method: 'post',
    url: '/space/equipment/page',
    data
  })
}

/**
 * 新增空间设备
 * @returns 是否新增成功
 */
export const addEquipment = (data: any) => {
  return request({
    method: 'post',
    url: '/space/equipment/add',
    data
  })
}

/**
 * 更新空间设备
 * @returns 是否更新成功
 */
export const updateEquipment = (data: any) => {
  return request({
    method: 'post',
    url: '/space/equipment/update',
    data
  })
}

/**
 * 删除空间设备
 * @returns 是否删除成功
 */
export const deleteEquipment = (data: any) => {
  return request({
    method: 'post',
    url: '/space/equipment/delete',
    data
  })
}

/**
 * 批量删除空间设备
 * @returns 是否删除成功
 */
export const batchDeleteEquipment = (data: any) => {
  return request({
    method: 'post',
    url: '/space/equipment/batchDelete',
    data
  })
}