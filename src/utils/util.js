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
      if (diffHour <= 1) {
        return `${now.diff(date, 'minute')}分钟前`
      }
      if (diffHour < 24) {
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

export const areaChartOptions = {
  grid: {
    show: false,
    padding: {
      left: 0,
      right: 0,
    },
  },
  chart: {
    toolbar: {
      show: false,
    },
    sparkline: {
      enabled: true,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
    width: 2.5,
  },
  colors: ['#7367F0'],
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 0.9,
      opacityFrom: 0.7,
      opacityTo: 0.5,
      stops: [0, 80, 100],
    },
  },
  xaxis: {
    type: 'numeric',
    lines: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
    labels: { show: false },
  },
  yaxis: [{
    y: 0,
    offsetX: 0,
    offsetY: 0,
    padding: { left: 0, right: 0 },
  }],
  tooltip: {
    x: { show: false },
  },
}
