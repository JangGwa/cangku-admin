import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import queryString from 'query-string'
import { Page } from 'components'
import List from './List'


const Shop = ({
  shop, location, loading, dispatch,
}) => {
  const { list, pagination } = shop
  location.query = queryString.parse(location.search)
  const { query, pathname } = location

  const listProps = {
    pagination,
    dataSource: list,
    loading: loading.effects['post/query'],
    onChange (page) {
      dispatch(routerRedux.push({
        pathname,
        search: queryString.stringify({
          ...query,
          page: page.current,
          pageSize: page.pageSize,
        }),
      }))
    },
  }

  return (<Page inner>
    <List {...listProps} />
  </Page>)
}

Shop.propTypes = {
  shop: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ shop, loading }) => ({ shop, loading }))(Shop)
