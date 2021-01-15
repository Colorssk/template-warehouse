export default {
  key: 'bankPayHistoryList',
  name: '网银转账记录历史查询',
  path: '/finance/bankPay/history/list',
  nest: '/layout/finance/bankPay/history/list',
  exact: true,
  content: () => import(/* webpackChunkName: "bankPayHistoryList" */ './view'),
}
