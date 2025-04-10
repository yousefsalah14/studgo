import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const DistributionChart = ({ isLoading }) => {
  const [chartData] = useState({
    series: [44, 55, 13, 33],
    options: {
      chart: {
        width: 380,
        type: 'donut',
        background: 'transparent',
        fontFamily: 'Inter, sans-serif',
      },
      theme: {
        mode: 'dark',
      },
      labels: ['Events', 'Workshops', 'Talks', 'Other Activities'],
      colors: ['#3b82f6', '#10b981', '#f59e0b', '#6366f1'],
      plotOptions: {
        pie: {
          donut: {
            size: '55%',
            labels: {
              show: true,
              total: {
                show: true,
                showAlways: true,
                label: 'Total Activities',
                fontSize: '16px',
                fontWeight: 600,
                color: '#fff',
                formatter: function (w) {
                  return w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                }
              },
              value: {
                show: true,
                fontSize: '22px',
                fontWeight: 700,
                color: '#fff',
              }
            }
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        position: 'bottom',
        horizontalAlign: 'center',
        labels: {
          colors: '#fff'
        },
        markers: {
          width: 12,
          height: 12,
          strokeWidth: 0,
          radius: 12,
        },
        itemMargin: {
          horizontal: 10,
          vertical: 5
        }
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 280
          },
          legend: {
            position: 'bottom'
          }
        }
      }],
      stroke: {
        width: 0
      }
    },
  });

  if (isLoading) {
    return (
      <div className="animate-pulse w-full h-full bg-gray-700 rounded-xl"></div>
    );
  }

  return (
    <div id="chart" className="w-full h-full flex justify-center items-center">
      <ReactApexChart 
        options={chartData.options} 
        series={chartData.series} 
        type="donut" 
        height={350} 
      />
    </div>
  );
};

export default DistributionChart;
