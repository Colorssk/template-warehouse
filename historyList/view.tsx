import * as React from 'react'
import { compose } from 'redux'
import { Privilege } from 'sunny-foundation/AccessControl/RBAC'
import { hasPrivilege } from 'sunny-foundation/AccessControl/RBAC/PermissionsManager'
// components
import { Button, Form, Row, DatePicker, } from 'antd'
import XTable from '@/components/xTable'
import ColumnText from '@/components/xTable/columnText'
import hocTabPage, { initState } from '@/components/hocTabPage'
// constants
import { tabList, authMap, statusType } from '../constants'
// utils
import { handleDownLoadFile, onEnter, formatTime } from '@/views/utils/helpers'
import { formatDuration, initUpdateDuration, formatUpdateDuration } from '../utils'
// services
import TableService, { initTableData } from '@/library/services/tableService'
// styles
import styles from '../style.module.scss'

class HistoryList extends TableService {
  public state = Object.assign({}, initState, {
    tableData: {
      ...initTableData,
      memberLevel: [],
    },
    exportLoading: false, // 导出excel loading
  })

  public componentDidMount() {
    // this.bindAction({
    //   api: getExportHistoryList,
    //   hasPrivilege: hasPrivilege(authMap.export),
    //   successCallback: (res) => {
    //     handleDownLoadFile(res, this.getSearchForm().platform + '网银转账历史列表')
    //     message.success('导出成功')
    //   },
    // })
  }

  public getData = (sendingData: any = {}) => {
   
    this.cacheSendingData = Object.assign(
      {},
      this.state.tableData,
      formatDuration(sendingData.duration),
    )
    // this.getSingle({
    //   action: getHistoryList.toString(),
    //   sendingData: this.cacheSendingData,
    // })
  }
  // 导出excel
  private cacheSendingData: any
  private onExport = () => {
    // this.getSingle({
    //   action: getExportHistoryList.toString(),
    //   sendingData: this.cacheSendingData,
    //   bindLoading: 'exportLoading',
    // })
  }

  // 初始化
  public getInitialValues = () => ({
    // updateDuration: initUpdateDuration(),
    
  })

  private columns = [
    {
      title: '汇款账号',
      dataIndex: 'account',
      align: 'center',
      render: (text) => <ColumnText text={text} />,
    },
    {
      title: '操作时间',
      dataIndex: 'record_updated_at',
      align: 'center',
      render: (text) => <ColumnText formatFunc={formatTime} text={text} />,
    },
  ]

  public render() {
    const {
      state: { loading, tableData, exportLoading },
    } = this
    return (
      <React.Fragment>
        <Row className={'searchFromView'} style={{ width: '100%' }}>
          <Form.Item label="操作时间" name="updateDuration">
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
          <Privilege k={authMap.export}>
            <Form.Item>
              <Button loading={exportLoading} onClick={this.onExport}>
                导出excel
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
    activeKey: tabList[2].path,
    tabList,
  }), // 反向继承，防止于最后
)(HistoryList)
