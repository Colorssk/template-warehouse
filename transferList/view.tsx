import * as React from 'react'
import { compose } from 'redux'
import { Privilege } from 'sunny-foundation/AccessControl/RBAC'
import { hasPrivilege } from 'sunny-foundation/AccessControl/RBAC/PermissionsManager'
// components
import { Button, Form, Row, Input, DatePicker } from 'antd'
import XTable from '@/components/xTable'
import ColumnText from '@/components/xTable/columnText'
import hocTabPage, { initState } from '@/components/hocTabPage'
// constants
import { tabList, authMap } from '../constants'
// utils
import { onEnter, formatTime } from '@/views/utils/helpers'
import { initDuration, formatDuration } from '../utils'
// services
import TableService, { initTableData } from '@/library/services/tableService'
import { getList } from '../services'
// styles
import styles from '../style.module.scss'

class TransferList extends TableService {
  public state = Object.assign({}, initState, {
    tableData: {
      ...initTableData,
      memberLevel: [],
    },
  })

  public componentDidMount() {
    // this.bindAction({
    //   api: getList,
    //   hasPrivilege: hasPrivilege(authMap.search),
    //   bindingData: 'tableData',
    //   successCallback: (res)=>{
    //     const grades = res.data.memberLevel.map((item)=>{
    //       return item.level
    //     })
    //     this.searchFormRef.current.setFieldsValue({ grades})
    //   }
    // })
    // this.onSearch()
  }

  public getData = (sendingData: any = {}) => {
    // this.getSingle({
    //   action: getList.toString(),
    //   sendingData: Object.assign(
    //     {},
    //     this.state.tableData,
    //     sendingData,
    //     formatDuration(sendingData.duration),
    //     {
    //       grades: sendingData.grades.join(','),
    //     },
    //   ),
    // })
  }

  // 初始化
  public getInitialValues = () => ({
    duration: initDuration(),
    grades: [],
  })

  private columns = [
    {
      title: '汇款账号',
      dataIndex: 'account',
      align: 'center',
      render: (text) => <ColumnText text={text} />,
    },
    {
      title: '汇款时间',
      dataIndex: 'record_created_at',
      align: 'center',
      render: (text) => <ColumnText formatFunc={formatTime} text={text} />,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      align: 'center',
      width: 120,
      render: (status, item) => {
        return (
          <div>操作</div>
        )
      },
    },
  ]

  public render() {
    const {
      state: { loading, tableData },
    } = this
    return (
      <React.Fragment>
        <Row className={'searchFromView'} style={{ width: '100%' }}>
          <Form.Item label="订单号" name="billNo">
            <Input placeholder="请输入订单号" onKeyDown={(e) => onEnter(e, this.onSearch)} />
          </Form.Item>
          <Form.Item label="汇款时间" name="duration">
            <DatePicker.RangePicker
              format={'YYYY-MM-DD HH:mm:ss'}
              showTime
              allowClear={false}
              picker={'date'}
            />
          </Form.Item>
          <Privilege k={authMap.search}>
            <Form.Item>
              <Button type="primary" loading={loading} onClick={this.onSearch}>
                搜索
              </Button>
            </Form.Item>
            <Form.Item>
              <Button type="danger" loading={loading} onClick={this.onRest}>
                重置
              </Button>
            </Form.Item>
          </Privilege>
        </Row>
        <XTable
          loading={loading}
          columns={this.columns}
          dataSource={tableData.units}
          offsetHeight={38}
          footer={() => (
            <span className={styles.footerView}>
              总金额: <strong>{tableData.totalMoney || 0}</strong>
            </span>
          )}
          pagination={{
            total: tableData.totalRecord,
            pageSize: tableData.pageSize,
            onChange: this.onChangePage,
            showSizeChanger: true,
            onShowSizeChange: this.onChangePage,
            showQuickJumper: true,
            current: tableData.page,
          }}
        />
      </React.Fragment>
    )
  }
}

export default compose(
  hocTabPage({
    parentPath: '/finance',
    activeKey: tabList[0].path,
    tabList,
  }), // 反向继承，防止于最后
)(TransferList)
