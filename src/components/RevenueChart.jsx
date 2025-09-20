import React from "react";
import "./revenue-chart.css";

const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

// Values in "millions"
const previousWeek = [8, 16.5, 14, 10.5, 12, 22.5];
const currentWeek = [13, 9, 9.8, 15.5, 19.5, 19];

const maxY = 30; // 30M as in design

function buildSmoothPath(points, width, height, padding) {
  const stepX = (width - padding * 2) / (points.length - 1);
  const toXY = (i, v) => [
    padding + i * stepX,
    height - padding - (v / maxY) * (height - padding * 2),
  ];

  const pts = points.map((v, i) => toXY(i, v));
  if (pts.length < 2) return "";

  const path = ["M", pts[0][0], pts[0][1]];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = i > 0 ? pts[i - 1] : pts[0];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = i !== pts.length - 2 ? pts[i + 2] : p2;

    const smoothing = 0.18; // lower = tighter curve
    const cp1x = p1[0] + (p2[0] - p0[0]) * smoothing;
    const cp1y = p1[1] + (p2[1] - p0[1]) * smoothing;
    const cp2x = p2[0] - (p3[0] - p1[0]) * smoothing;
    const cp2y = p2[1] - (p3[1] - p1[1]) * smoothing;
    path.push("C", cp1x, cp1y, cp2x, cp2y, p2[0], p2[1]);
  }
  return path.join(" ");
}

function buildSmoothPathRange(
  points,
  width,
  height,
  padding,
  startIdx,
  endIdx
) {
  // inclusive range [startIdx, endIdx]
  const stepX = (width - padding * 2) / (points.length - 1);
  const toXY = (i, v) => [
    padding + i * stepX,
    height - padding - (v / maxY) * (height - padding * 2),
  ];
  const pts = points.map((v, i) => toXY(i, v));
  const s = Math.max(0, startIdx);
  const e = Math.min(points.length - 1, endIdx);
  if (e - s < 1) return "";
  const path = ["M", pts[s][0], pts[s][1]];
  for (let i = s; i < e; i++) {
    const p0 = i > 0 ? pts[i - 1] : pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = i + 2 <= e ? pts[i + 2] : p2;
    const smoothing = 0.18;
    const cp1x = p1[0] + (p2[0] - p0[0]) * smoothing;
    const cp1y = p1[1] + (p2[1] - p0[1]) * smoothing;
    const cp2x = p2[0] - (p3[0] - p1[0]) * smoothing;
    const cp2y = p2[1] - (p3[1] - p1[1]) * smoothing;
    path.push("C", cp1x, cp1y, cp2x, cp2y, p2[0], p2[1]);
  }
  return path.join(" ");
}

const RevenueChart = () => {
  const width = 820;
  const height = 260;
  const padding = 40;

  const prevPath = buildSmoothPath(previousWeek, width, height, padding);
  const currPathFull = buildSmoothPath(currentWeek, width, height, padding);
  const currPathSolid = buildSmoothPathRange(
    currentWeek,
    width,
    height,
    padding,
    0,
    4
  );
  const currPathDashed = buildSmoothPathRange(
    currentWeek,
    width,
    height,
    padding,
    4,
    currentWeek.length - 1
  );

  const ticksY = [0, 10, 20, 30];

  return (
    <div className="revenue-card">
      <div className="rc-header">
        <span className="rc-title">Revenue</span>
        <div className="rc-legend">
          <span className="dot dot-current" />
          <span className="rc-legend-label">Current Week</span>
          <strong className="rc-legend-value">$58,211</strong>
          <span className="dot dot-previous" />
          <span className="rc-legend-label">Previous Week</span>
          <strong className="rc-legend-value">$68,768</strong>
        </div>
      </div>

      <svg
        className="rc-svg"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="prevFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#93c5fd" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* gridlines and y labels */}
        {ticksY.map((t) => {
          const y = height - padding - (t / maxY) * (height - padding * 2);
          return (
            <g key={t}>
              <line
                x1={padding}
                x2={width - padding}
                y1={y}
                y2={y}
                className="rc-grid"
              />
              <text x={padding - 16} y={y + 4} className="rc-ylabel">
                {t === 0 ? "0" : `${t}M`}
              </text>
            </g>
          );
        })}

        {/* x labels */}
        {labels.map((m, i) => {
          const x = padding + i * ((width - padding * 2) / (labels.length - 1));
          return (
            <text key={m} x={x} y={height - 8} className="rc-xlabel">
              {m}
            </text>
          );
        })}

        {/* previous week area and line */}
        <path
          d={`${prevPath} L ${width - padding} ${
            height - padding
          } L ${padding} ${height - padding} Z`}
          fill="url(#prevFill)"
        />
        <path d={prevPath} className="rc-line prev" />

        {/* current week line: solid then dotted tail */}
        {/* full dashed as base, then solid overlay for first part */}
        <path d={currPathFull} className="rc-line curr dashed" />
        <path d={currPathSolid} className="rc-line curr" />
        <path d={currPathDashed} className="rc-line curr dashed" />
      </svg>
    </div>
  );
};

export default RevenueChart;
