import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const ActivityTypeChart = ({ isLoading, statistics }) => {
  const [chartData, setChartData] = useState({
    series: [0, 0, 0],
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
      labels: ['Technical', 'Non-Technical', 'Mixed'],
      colors: ['#6366f1', '#ec4899', '#8b5cf6'],
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

  useEffect(() => {
    if (statistics) {
      setChartData(prev => ({
        ...prev,
        series: [
          statistics.numOfTechnicalActivites,
          statistics.numOfNonTechnicalActivites,
          statistics.numOfMixedActivites
        ]
      }));
    }
  }, [statistics]);

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

export default ActivityTypeChart; 