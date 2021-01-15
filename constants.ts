// table的样式
export const tabList = [
  { tab: '网银转账记录', path: '/finance/bankPay/transfer/list' },
  { tab: '资金管理', path: '/finance/bankPay/funds/list' },
  { tab: '历史查询', path: '/finance/bankPay/history/list' },
]

// 权限集合
export const authMap = {
  search: '搜索',
  export: '导出',
  agree: '通过',
  refuse: '不通过',
}

// 状态
export const statusType = [
  { label: '--请选择--', value: -1 },
  { label: '汇款成功', value: 2 },
  { label: '汇款失败', value: 3 },
]
