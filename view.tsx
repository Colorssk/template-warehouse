import Platform, { getPlatformInitValue, platformItemKey } from '@/components/platform'
// services
import TableService from '@/library/services/tableService'
import { Row, Tabs } from 'antd'
import * as React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import styles from './style.module.scss'
import RechargeList from './rechargeList/view'
import HistoryList from './historyList/view'
class ArtificialRecharge extends TableService {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      platform: this.props.user.platform,
      activeTabIndex: 0,
    }
  }

  public componentDidMount() {}

  private getPlatformList = () => this.props.user.opts
  // 切换平台
  private onChangePlatform = (platform) => {
    this.setState({ platform })
  }
  private changeTab = (key) => {
    this.setState({
      activeTabIndex: key,
    })
  }
  public render() {
    const {
      state: { platform, activeTabIndex },
    } = this as any
    return (
      <div className={styles.promotion}>
        <Row>
          <div style={{ marginBottom: 0, color: 'rgba(0, 0, 0, 0.65)' }}>
            <Platform
              itemValue={platformItemKey.name}
              onChange={this.onChangePlatform}
              value={platform}
              isFirstChange={false}
              hideAllPlat={true}
            />
          </div>
        </Row>
        <Tabs
          defaultActiveKey="0"
          tabBarStyle={{
            marginLeft: 10,
            marginBottom: 5,
          }}
          onChange={this.changeTab}
        >
          <Tabs.TabPane tab="人工充值" key="0">
            <RechargeList
              {...Object.assign({}, this.props, { activeTabIndex })}
              platform={platform}
            />
          </Tabs.TabPane>
          {/* <Tabs.TabPane tab="历史查询" key="1">
            <HistoryList
              {...Object.assign({}, this.props, { activeTabIndex })}
              platform={platform}
            />
          </Tabs.TabPane> */}
        </Tabs>
      </div>
    )
  }
}
export default compose(
  connect((state: any) => ({
    user: state.user,
  })),
)(ArtificialRecharge)
