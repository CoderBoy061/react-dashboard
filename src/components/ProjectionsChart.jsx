import React, { useMemo } from "react";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "./projections.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

// values in millions to match the screenshot scale
const actual = [17, 20, 17, 21, 14, 20];
const projection = [20, 25, 21, 26, 17, 24];
const delta = projection.map((p, i) => Math.max(0, p - actual[i]));

const ProjectionsChart = () => {
  // Build stacked datasets: "Actual" + (Projection - Actual) as a delta stacked on top
  const data = useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: "Actual",
          data: actual,
          backgroundColor: "#a7c5d8",
          borderRadius: 0,
          borderSkipped: false,
          stack: "stack1",
          barPercentage: 0.55,
          categoryPercentage: 0.6,
        },
        {
          label: "Projections",
          data: delta,
          backgroundColor: "rgba(147,197,253,0.5)",
          borderRadius: 0,
          borderSkipped: false,
          stack: "stack1",
          barPercentage: 0.55,
          categoryPercentage: 0.6,
        },
      ],
    }),
    []
  );

  // Chart options: disable legend, style axes, custom tooltip showing Actual & Total
  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            title: (items) => (items[0] ? items[0].label : ""),
            label: (ctx) => {
              const i = ctx.dataIndex;
              if (ctx.dataset.label === "Projections") {
                return `Projection: ${projection[i]}M`;
              }
              return `Actual: ${actual[i]}M`;
            },
            footer: (items) => {
              if (!items || !items.length) return "";
              const i = items[0].dataIndex;
              return `Total: ${projection[i]}M`;
            },
          },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: "#9ca3af" },
        },
        y: {
          beginAtZero: true,
          suggestedMax: 30,
          grid: { color: "#e5e7eb" },
          ticks: {
            color: "#9ca3af",
            callback: (v) => (v === 0 ? "0" : `${v}M`),
          },
        },
      },
      animation: { duration: 400, easing: "easeOutQuart" },
      hover: { mode: "index", intersect: false },
    }),
    []
  );

  const projTotal = projection.reduce((s, v) => s + v, 0);
  const actualTotal = actual.reduce((s, v) => s + v, 0);

  return (
    <div className="proj-card">
      <div className="pc-header">
        <span className="pc-title">Projections vs Actuals</span>
        <div className="pc-legend">
          <span className="dot dot-actual" />
          <span className="legend-label">Actual</span>
          <strong className="legend-value">{actualTotal}M</strong>
          <span className="dot dot-proj" />
          <span className="legend-label">Projection</span>
          <strong className="legend-value">{projTotal}M</strong>
        </div>
      </div>
      <div className="pc-chart">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default ProjectionsChart;
