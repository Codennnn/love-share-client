export function timeDiff(time) {
  if (typeof time === 'number') {
    const now = this.$dayjs()
    const date = this.$dayjs.unix(time)
    const diff = now.diff(date, 'day')
    if (diff < 30) {
      if (diff === 0) {
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
  return time
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
