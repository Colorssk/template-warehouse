import * as React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Privilege } from 'sunny-foundation/AccessControl/RBAC'
import { hasPrivilege } from 'sunny-foundation/AccessControl/RBAC/PermissionsManager'
// components
import { Button, Form, Row, Input } from 'antd'
import XTable from '@/components/xTable'
import ColumnText from '@/components/xTable/columnText'
// constants
import { authMap} from '../constants'
// utils
import { onEnter, formatTime } from '@/views/utils/helpers'
// services
import TableService, { initTableData } from '@/library/services/tableService'

// styles
import styles from '../style.module.scss'

class Recharge extends TableService {
  public static defaultProps = {
    activeTabIndex: '0',
  }
  public state = Object.assign(
    {},
    {
      tableData: {
        ...initTableData,
        memberLevel: [],
      },
      platform: this.props.platform,
      lastMoney: '0',
      loading: false,
      isTabChange: false,
    },
  )
  public componentDidMount() {
    
  }
  // 当props发生变化后将值赋给当前组件的state变量
  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      platform: nextProps.platform,
    }
  }
  public getData = (sendingData: any = {}) => {
    const sendingDataTemp = Object.assign({}, this.state.tableData, sendingData, {
      platform: this.state.platform,
    })
    // this.getSingle({
    //   action: getList.toString(),
    //   sendingData: sendingDataTemp,
    // })
  }
  // 切换平台 -> 默认处理平台切换 onChangePlatform
  public onChangePlatform = async (platform) => {
    // this.handlePlatform(platform)
    // this.onSearch()
    // this.getAll()
  }
  public componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.activeTabIndex !== this.props.activeTabIndex &&
      this.props.activeTabIndex === '0'
    ) {

      // this.onSearch()
   
    }
    // 如果数据发生变化，则更新数据
    if (prevProps.platform !== this.props.platform) {
      this.searchFormRef.current.resetFields()
      this.state.tableData && this.setState({ tableData: initTableData })
      // 平台变化
      if (String(prevProps.activeTabIndex) === '0') {
     
        // this.onSearch()
        // this.getAll()
      }
    }
  }
  private columns = [
    {
      title: '用户名',
      dataIndex: 'Name',
      align: 'center',
    },
  ]

  public render() {
    const {
      state: { loading, tableData, lastMoney },
    } = this
    const platform = this.state.platform
    return (
      <Form
        className={styles.promotion}
        ref={this.searchFormRef}
        initialValues={{
          platform,
        }}
      >
        <Row className={'searchFromView'} style={{ width: '100%' }}>
          <Form.Item label="用户名" name="name">
            <Input placeholder="请输入用户名" onKeyDown={(e) => onEnter(e, this.onSearch)} />
          </Form.Item>
          <Form.Item label="剩余额度">
            <Input
              disabled
              placeholder={lastMoney}
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
        </Row>
        <XTable loading={loading} columns={this.columns} dataSource={tableData.list} />
      </Form>
    )
  }
}
export default compose(
  connect((state: any) => ({
    user: state.user,
    url: state.url,
  })),
)(Recharge)
