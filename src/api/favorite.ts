import request from "@/utils/request"

/**
 * 收藏分页查询
 * @returns 分页对象
 */
export const getPageFavorite = (data: any) => {
  return request({
    method: 'post',
    url: '/favorite/page',
    data
  })
}

/**
 * 收藏共享空间
 * @returns 是否收藏成功
 */
export const favoriteSpace = (spaceId: string) => {
  return request({
    method: 'post',
    url: '/favorite/' + spaceId
  })
}

/**
 * 取消收藏共享空间
 * @returns 是否收藏成功
 */
export const cancelFavoriteSpace = (spaceId: string) => {
  return request({
    method: 'delete',
    url: '/favorite/' + spaceId
  })
}