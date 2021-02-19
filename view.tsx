import * as React from 'react'
import { Button, Input, Form, Modal, Select, DatePicker, Row, message } from 'antd'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Privilege } from 'sunny-foundation/AccessControl/RBAC'
import { hasPrivilege } from 'sunny-foundation/AccessControl/RBAC/PermissionsManager'
// components
import XTable from '@/components/xTable'
import ColumnText from '@/components/xTable/columnText'
import Platform, { getPlatformInitValue, platformItemKey } from '@/components/platform'
import { initDuration, formatDuration } from './utils'
// utils
import { onEnter, handleDownLoadFile } from '@/views/utils/helpers'
// constants
import { authMap } from './constants'
// services
import TableService, { initTableData } from '@/library/services/tableService'
// styles
import styles from './style.module.scss'

class ProxyVirtualCurrencyRecord extends TableService {
  public state = {
    loading: false,
    tableData: initTableData,
    listTitle: [] as any, // 平台名称
  }

  public componentDidMount() {}

  public getData = (sendingData: any = {}) => {
    // this.getSingle({
    //   action: getList.toString(),
    //   sendingData: Object.assign(
    //     {},
    //     this.state.tableData,
    //     sendingData,
    //     formatDuration(sendingData.duration),
    //   ),
    // })
  }
  // 切换平台
  private onChangePlatform = (platform) => {
    this.handlePlatform(platform)
    this.getAll()
  }
  private columns = [
    {
      title: '平台名称',
      dataIndex: 'api_name',
      align: 'center',
    },
    // {
    //   title: '状态',
    //   dataIndex: 'on_line',
    //   align: 'center',
    //   render: (text) => <ColumnText text={text} list={statusType} style={{ fontWeight: 'bold' }} />,
    // },
    {
      title: '操作',
      dataIndex: 'operation',
      width: 180,
      align: 'center',
      render: (text, item) => {
        return <div style={{ display: 'flex', justifyContent: 'center' }}></div>
      },
    },
  ]

  public render() {
    const {
      state: { loading, listTitle, tableData },
      props: { user },
    } = this

    return (
      <Form
        className={styles.specialMatchePage}
        ref={this.searchFormRef}
        initialValues={{
          duration: initDuration(),
          platform: this.props.user.platform,
        }}
      >
        <Row>
          <Form.Item name="platform" style={{ marginBottom: 0, color: 'rgba(0, 0, 0, 0.65)' }}>
            <Platform
              itemValue={platformItemKey.name}
              onChange={this.onChangePlatform}
              isFirstChange={false}
              hideAllPlat={true}
            />
          </Form.Item>
        </Row>
        <Row className={'searchFromView'} style={{ width: '100%' }}>
          <Form.Item label="订单号 Order Number" name="bill_no">
            <Input placeholder="请输入订单号" onKeyDown={(e) => onEnter(e, this.onSearch)} />
          </Form.Item>
          <Form.Item label="操作时间" name="duration">
            <DatePicker.RangePicker
              format={'YYYY-MM-DD HH:mm:ss'}
              showTime
              allowClear={false}
              picker={'date'}
            />
          </Form.Item>
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
        </Row>
        <XTable
          loading={loading}
          columns={this.columns}
          dataSource={tableData.list}
          pagination={{
            total: tableData.totalRecord,
            pageSize: tableData.pageSize,
            onChange: this.onChangePage,
            current: tableData.page,
          }}
        />
      </Form>
    )
  }
}

export default compose(
  connect((state: any) => ({
    user: state.user,
  })),
)(ProxyVirtualCurrencyRecord)
