export default {
  key: 'artificialRecharge',
  name: '人工充值',
  path: '/finance/artificialRecharge/list',
  nest: '/layout/finance/artificialRecharge/list',
  exact: true,
  content: () => import(/* webpackChunkName: "artificialRecharge" */ './view'),
}
