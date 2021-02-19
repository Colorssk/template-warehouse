export default {
  key: 'proxyVirtualCurrencyRecord',
  name: '代理虚拟币归集记录',
  path: '/finance/proxyVirtualCurrency/record',
  nest: '/layout/finance/proxyVirtualCurrency/record',
  content: () => import(/* webpackChunkName: "proxyVirtualCurrencyRecord" */ './view'),
}
