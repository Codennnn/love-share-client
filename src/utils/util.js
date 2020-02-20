/* eslint no-console: 0 */

import _cloneDeepWith from 'lodash/cloneDeepWith'
import _debounce from 'lodash/debounce'
import { Notification } from 'element-ui'

export function timeDiff(time) {
  let date
  if (typeof time === 'number') {
    if (String(time).length === 13) {
      date = this.$dayjs(time)
    } else {
      date = this.$dayjs.unix(time)
    }
  } if (typeof time === 'string') {
    date = this.$dayjs(time)
  }

  const now = this.$dayjs()
  const diff = now.diff(date, 'day')
  if (diff < 30) {
    if (diff === 0) {
      const diffHour = now.diff(date, 'hour')
      if (diffHour < 1) {
        const diffMin = now.diff(date, 'minute')
        if (diffMin < 1) {
          const diffSec = now.diff(date, 'second')
          if (diffSec < 30) {
            return '刚刚'
          }
          return `${diffSec}秒前`
        }
        return `${diffMin}分钟前`
      }
      if (diffHour <= 24) {
        return `${diffHour}小时前`
      }
      return '今天'
    }
    if (diff === 1) {
      return '昨天'
    }
    return `${diff}天前`
  }
  if (diff >= 30 && diff < 365) {
    return `${now.diff(date, 'month')}个月前`
  } if (diff >= 365 && diff < 365 * 2) {
    return `${now.diff(date, 'year')}年前`
  }
  return date.format('YYYY-MM-DD')
}

export function setCreditColor(val) {
  if (val >= 500 && val <= 690) {
    return 'primary'
  }
  if (val > 690) {
    return 'success'
  }
  if (val < 490 && val >= 390) {
    return 'warning'
  }
  if (val < 390) {
    return 'danger'
  }
  return 'primary'
}

export function dataURItoBlob(dataURI) {
  const byteString = atob(dataURI.split(',')[1])
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
  const ab = new ArrayBuffer(byteString.length)
  const ia = new Uint8Array(ab)
  for (let i = 0; i < byteString.length; i += 1) {
    ia[i] = byteString.charCodeAt(i)
  }

  return new Blob([ia], { type: mimeString })
}

export function numFixed(num, digit = 2) {
  return Number(num).toFixed(digit)
}

export function errorNotify({
  title = '哎呀！', message = '出错啦！', duration = 5000,
} = {}) {
  Notification.error({ title, message, duration })
}

export function consoleLog(log, leftLabel = 'Axios', rightLabel = 'error') {
  if (process.env.NODE_ENV !== 'production') {
    const baseStyle = 'padding:0.2rem 0.3rem;color:white;'
    const style1 = `${baseStyle}border-radius:1rem 0 0 1rem;background: rgb(53,73,94);`
    const style2 = `${baseStyle}border-radius:0 1rem 1rem 0;background: #EA5455;`
    console.log(`%c${leftLabel}%c${rightLabel}`, style1, style2, log)
  }
}

export const cloneDeepWith = _cloneDeepWith
export const debounce = _debounce
