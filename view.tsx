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
import { authMap, moneyTypes, statisOptions } from './constants'
// services
import TableService, { initTableData } from '@/library/services/tableService'
import { getList, exportExcel } from './services'
// styles
import styles from './style.module.scss'

class ProxyVirtualCurrencyRecord extends TableService {
  public state = {
    loading: false,
    tableData: initTableData,
    passageOptions: [] as any, //通道筛选下拉框
  }

  public componentDidMount() {
    this.bindAction({
      api: getList,
      hasPrivilege: hasPrivilege(authMap.search),
      bindingData: 'tableData',
      successCallback: (res) => {
        const { passageList } = res.data
        this.setState({
          passageOptions: Object.keys(passageList).map((el) => ({
            label: el,
            value: el,
          })),
        })
      },
    })

    //导出接口
    this.bindAction({
      api: exportExcel,
      hasPrivilege: hasPrivilege(authMap.export),
      successCallback: (res) => {
        handleDownLoadFile(res, '代理虚拟币归集记录')
        message.success('导出成功')
      },
    })
    this.onSearch()
  }

  // 导出excel
  private cacheSendingData: any

  private onExport = () => {
    this.getSingle({
      action: exportExcel.toString(),
      sendingData: this.cacheSendingData,
    })
  }
  public getData = (sendingData: any = {}) => {
    ;(this.cacheSendingData = Object.assign(
      {},
      this.state.tableData,
      sendingData,
      formatDuration(sendingData.duration),
    )),
      this.getSingle({
        action: getList.toString(),
        sendingData: Object.assign(
          {},
          this.state.tableData,
          sendingData,
          formatDuration(sendingData.duration),
        ),
      })
  }
  // 切换平台
  private onChangePlatform = (platform) => {
    this.handlePlatform(platform)
    this.getAll()
  }
  private columns = [
    {
      title: '归集批次',
      dataIndex: 'batch',
      align: 'center',
    },
    {
      title: '转出地址',
      dataIndex: 'out_address',
      align: 'center',
    },
    {
      title: '转入地址',
      dataIndex: 'in_address',
      align: 'center',
    },
    {
      title: '所属通道',
      dataIndex: 'pay_name',
      align: 'center',
    },
    {
      title: '货币类型',
      dataIndex: 'money_type',
      align: 'center',
      render: (text) => <ColumnText text={text} list={moneyTypes} />,
    },
    {
      title: '归集金额',
      dataIndex: 'money',
      align: 'center',
    },
    {
      title: '手续费货币类型',
      dataIndex: 'fee_type',
      align: 'center',
    },
    {
      title: '手续费金额',
      dataIndex: 'fee_money',
      align: 'center',
    },
    {
      title: '强制转账金额',
      dataIndex: 'force_money',
      align: 'center',
    },
    {
      title: '开始时间',
      dataIndex: 'start_at',
      align: 'center',
    },
    {
      title: '结束时间',
      dataIndex: 'end_at',
      align: 'center',
    },
    {
      title: '归集状态',
      dataIndex: 'status',
      align: 'center',
      render: (text) => <ColumnText text={text} list={statisOptions} />,
    },
  ]

  public render() {
    const {
      state: { loading, tableData, passageOptions },
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
          <Form.Item label="归集批次" name="batch">
            <Input placeholder="请输入归集批次" onKeyDown={(e) => onEnter(e, this.onSearch)} />
          </Form.Item>
          <Form.Item label="转出地址" name="out_address">
            <Input placeholder="请输入转出地址" onKeyDown={(e) => onEnter(e, this.onSearch)} />
          </Form.Item>
          <Form.Item label="转入地址" name="in_address">
            <Input placeholder="请输入转入地址" onKeyDown={(e) => onEnter(e, this.onSearch)} />
          </Form.Item>
          <Form.Item label="货币类型" name="money_type">
            <Select
              style={{ width: '200px' }}
              placeholder="请选择"
              options={moneyTypes}
              onKeyDown={(e) => onEnter(e, this.onSearch)}
            />
          </Form.Item>
          <Form.Item label="操作时间" name="duration">
            <DatePicker.RangePicker
              format={'YYYY-MM-DD HH:mm:ss'}
              showTime
              allowClear={false}
              picker={'date'}
            />
          </Form.Item>
          <Form.Item label="归集状态" name="status">
            <Select
              style={{ width: '200px' }}
              placeholder="请选择"
              options={statisOptions}
              onKeyDown={(e) => onEnter(e, this.onSearch)}
            />
          </Form.Item>
          <Form.Item label="通道筛选" name="passage">
            <Select
              style={{ width: '200px' }}
              placeholder="请选择"
              options={passageOptions}
              onKeyDown={(e) => onEnter(e, this.onSearch)}
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
          <Privilege k={authMap.export}>
            <Form.Item>
              <Button type="primary" loading={loading} onClick={this.onExport}>
                导出
              </Button>
            </Form.Item>
          </Privilege>
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
