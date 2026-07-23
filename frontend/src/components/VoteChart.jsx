import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
);

const lightThemeOptions = {
  responsive: true,
  maintainAspectRatio: false,
  color: '#434655',
  plugins: {
    legend: {
      labels: { color: '#434655', font: { family: 'Inter', size: 12 } }
    },
    tooltip: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      titleColor: '#191b23',
      bodyColor: '#434655',
      borderColor: '#e1e2ed',
      borderWidth: 1,
      padding: 12,
      cornerRadius: 8,
      displayColors: true,
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }
  },
  scales: {
    x: {
      grid: { color: '#e1e2ed', drawBorder: false },
      ticks: { color: '#434655', font: { family: 'Inter' } }
    },
    y: {
      grid: { color: '#e1e2ed', drawBorder: false },
      ticks: { color: '#434655', font: { family: 'Inter' } }
    }
  }
};

const defaultColors = [
  '#004ac6', // primary
  '#712ae2', // secondary
  '#4338d9', // tertiary
  '#006b5e', // extra
  '#b06f00', // extra
  '#93000a', // extra
];

export default function VoteChart({ data, type = 'bar', title }) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: title || 'Votes',
        data: data.values,
        backgroundColor: defaultColors.slice(0, data.values.length).map(c => c + 'CC'),
        borderColor: defaultColors,
        borderWidth: 1,
        borderRadius: type === 'bar' ? 8 : 0,
      },
    ],
  };

  const options = {
    ...lightThemeOptions,
    plugins: {
      ...lightThemeOptions.plugins,
      title: {
        display: !!title,
        text: title,
        color: '#191b23',
        font: { family: 'Inter', size: 16, weight: 'bold' }
      }
    }
  };

  if (type === 'doughnut' || type === 'pie') {
    options.scales = undefined; // No scales for pie charts
  }

  return (
    <div className="w-full h-full min-h-[250px] bg-white rounded-[24px] p-4 border border-[#e1e2ed] shadow-sm">
      {type === 'bar' && <Bar data={chartData} options={options} />}
      {type === 'doughnut' && <Doughnut data={chartData} options={options} />}
      {type === 'line' && <Line data={chartData} options={options} />}
    </div>
  );
}
