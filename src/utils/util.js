export function timeDiff(time) {
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

export function formatTime() {

}
