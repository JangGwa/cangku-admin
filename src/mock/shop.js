const { config } = require('./common')
const Mock = require('mockjs')

const { apiPrefix } = config

let shopsListData = Mock.mock({
  'data|50': [
    {
      id: '@id',
      name: '@name',
      step: '@last',
      'num|11-19': 1,
    },
  ],
})

let database = shopsListData.data

module.exports = {

  [`GET ${apiPrefix}/posts`] (req, res) {
    const { query } = req
    let { pageSize, page, ...other } = query
    pageSize = pageSize || 10
    page = page || 1

    let newData = database
    for (let key in other) {
      if ({}.hasOwnProperty.call(other, key)) {
        newData = newData.filter((item) => {
          if ({}.hasOwnProperty.call(item, key)) {
            return String(item[key]).trim().indexOf(decodeURI(other[key]).trim()) > -1
          }
          return true
        })
      }
    }

    res.status(200).json({
      data: newData.slice((page - 1) * pageSize, page * pageSize),
      total: newData.length,
    })
  },
}
