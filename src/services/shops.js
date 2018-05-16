import { request, config } from 'utils'

const { api: { posts } } = config

export function query (params) {
  return request({
    url: posts,
    method: 'get',
    data: params,
  })
}
