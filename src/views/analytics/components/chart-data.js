export const subscribersGained = {
  series: [{
    name: '关注者',
    data: [28, 40, 36, 52, 38, 60, 55],
  }],
  chartOptions: {
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
  },
}

export const ordersRecevied = {
  series: [{
    name: '订单数',
    data: [10, 15, 8, 15, 7, 12, 8],
  }],
  chartOptions: {
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
    colors: ['#FF9F43'],
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
  },
}

export const salesBar = {
  series: [{
    name: 'Sessions',
    data: [75, 125, 225, 175, 125, 75, 25],
  }],
  chartOptions: {
    grid: {
      show: false,
      padding: {
        left: 0,
        right: 0,
      },
    },
    chart: {
      type: 'bar',
      sparkline: { enabled: true },
      toolbar: { show: false },
    },
    states: {
      hover: {
        filter: 'none',
      },
    },
    colors: ['#e6edf7', '#e6edf7', '#7367f0', '#e6edf7', '#e6edf7', '#e6edf7'],
    plotOptions: {
      bar: {
        columnWidth: '45%',
        distributed: true,
        // endingShape: 'rounded', // Deprecated
        // borderRadius: '20px', // Coming Soon
      },
    },
    tooltip: {
      x: { show: false },
    },
  },
}
