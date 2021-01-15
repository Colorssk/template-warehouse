export default {
  key: 'bankPayTransferList',
  name: '网银转账记录',
  path: '/finance/bankPay/transfer/list',
  nest: '/layout/finance/bankPay/transfer/list',
  exact: true,
  content: () => import(/* webpackChunkName: "bankPayTransferList" */ './view'),
}
