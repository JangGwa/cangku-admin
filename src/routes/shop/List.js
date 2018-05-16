import React from 'react'
import { Table, Modal } from 'antd'
import { Link } from 'react-router-dom'
import { DropOption } from 'components'
import styles from './List.less'

const { confirm } = Modal

const List = ({ ...tableProps }) => {
  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      // onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: 'Are you sure delete this record?',
        onOk () {
          // onDeleteItem(record.id)
        },
      })
    }
  }

  const columns = [
    {
      title: '产品名称',
      dataIndex: 'name',
    }, {
      title: '加工步骤',
      dataIndex: 'step',
      render: (text, record) => <Link to={`shop/${record.id}`}>{text}</Link>,
    }, {
      title: '加工数量',
      dataIndex: 'num',
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '更新' }, { key: '2', name: '删除' }]} />
      },
    },
  ]

  return (
    <div>
      <Table
        {...tableProps}
        bordered
        columns={columns}
        simple
        className={styles.table}
        rowKey={record => record.id}
      />
    </div>
  )
}

export default List
