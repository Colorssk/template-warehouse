// 格式化时间
import moment from 'moment'

// 初始化查询
export function initDuration() {
  return [moment().subtract(0, 'days').startOf('day'), moment().endOf('day')]
}

// 初始化查询
export function initUpdateDuration() {
  return [moment().subtract(0, 'days').startOf('day'), moment().endOf('day')]
}

// 格式化区间
export function formatDuration(duration, formatText = 'YYYY-MM-DD HH:mm:ss') {
  try {
    return {
      startTime: duration[0].format(formatText),
      endTime: duration[1].format(formatText),
    }
  } catch (e) {
    return {}
  }
}
// 格式化区间
export function formatUpdateDuration(duration, formatText = 'YYYY-MM-DD HH:mm:ss') {
  try {
    return {
      upstartAt: duration[0].format(formatText),
      upendAt: duration[1].format(formatText),
    }
  } catch (e) {
    return {}
  }
}
