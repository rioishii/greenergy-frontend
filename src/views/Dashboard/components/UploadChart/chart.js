import palette from "../../../../themes/palette"

export const options = {
  responsive: true,
  maintainAspectRatio: true,
  animation: false,
  legend: { display: true },
  cornerRadius: 20,
  tooltips: {
    callbacks: {
      title: function(tooltipItem, data) {
        return data.datasets[0].data1[tooltipItem[0].index]
      },
    },
    enabled: true,
    mode: "label",
    intersect: false,
    borderWidth: 1,
  },
  layout: { padding: 0 },
  scales: {
    xAxes: [
      {
        barThickness: 12,
        maxBarThickness: 10,
        barPercentage: 0.5,
        categoryPercentage: 0.5,
        ticks: {
          fontColor: palette.text.secondary,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          fontColor: palette.text.secondary,
          beginAtZero: true,
          min: 0,
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          color: palette.divider,
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          zeroLineColor: palette.divider,
        },
      },
    ],
  },
}
