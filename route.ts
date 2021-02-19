export default {
  key: 'venueList',
  name: '场馆列表',
  path: '/venue/list',
  nest: '/layout/venue/list',
  content: () => import(/* webpackChunkName: "venueList" */ './view'),
}
