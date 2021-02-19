// 格式化时间
import moment from 'moment'

// 初始化查询
export function initDuration() {
  return [moment().subtract(1, 'days').startOf('day'), moment().endOf('day')]
}

// 初始化查询
export function initUpdateDuration() {
  return [moment().subtract(1, 'days').startOf('second'), moment().endOf('second')]
}

// 格式化区间
export function formatDuration(duration, formatText = 'YYYY-MM-DD HH:mm:ss') {
  try {
    return {
      start_at: duration[0].format(formatText),
      end_at: duration[1].format(formatText),
    }
  } catch (e) {
    return {}
  }
}
// 格式化区间
export function formatUpdateDuration(duration, formatText = 'YYYY-MM-DD HH:mm:ss') {
  try {
    return {
      start_at: duration[0].format(formatText),
      end_at: duration[1].format(formatText),
    }
  } catch (e) {
    return {}
  }
}
