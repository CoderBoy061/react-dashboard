import React, { useEffect, useMemo, useRef, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { ArcElement, Chart as ChartJS, Tooltip, Legend } from "chart.js";
import "./total-sales.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const itemsBase = [
  { label: "Direct", amount: 300.56, color: "#111111" },
  { label: "Affiliate", amount: 135.18, color: "#86efac" },
  { label: "Sponsored", amount: 154.02, color: "#a5b4fc" },
  { label: "E-mail", amount: 48.96, color: "#93c5fd" },
];

const TotalSales = () => {
  const [active, setActive] = useState(0);
  const chartRef = useRef(null);
  const [labelPos, setLabelPos] = useState({ left: "50%", top: "50%" });
  const [hovering, setHovering] = useState(false);

  const data = useMemo(
    () => ({
      labels: itemsBase.map((i) => i.label),
      datasets: [
        {
          data: itemsBase.map((i) => i.amount),
          backgroundColor: itemsBase.map((i) => i.color),
          borderWidth: 0,
          hoverOffset: 10,
          borderRadius: 16,
          spacing: 10,
        },
      ],
    }),
    []
  );

  const options = useMemo(
    () => ({
      responsive: false,
      maintainAspectRatio: false,
      cutout: "70%",
      plugins: { legend: { display: false }, tooltip: { enabled: false } },
      animation: { animateRotate: true, duration: 800, easing: "easeOutQuart" },
      animations: {
        radius: { duration: 250, easing: "easeOutQuad" },
      },
      transitions: {
        active: { animation: { duration: 250, easing: "easeOutQuart" } },
      },
      onHover: (e, elements) => {
        const el = elements[0];
        if (el) setActive(el.index);
      },
    }),
    []
  );

  const total = itemsBase.reduce((s, it) => s + it.amount, 0);
  const percent = Math.round((itemsBase[active].amount / total) * 1000) / 10;

  // Compute label position inside the middle of the active arc
  useEffect(() => {
    const chart = chartRef.current;
    if (!chart || !chart.getDatasetMeta) return;
    const meta = chart.getDatasetMeta(0);
    const arc = meta && meta.data && meta.data[active];
    if (!arc) {
      setLabelPos({ left: "50%", top: "50%" });
      return;
    }
    // In Chart.js v4 you can safely access properties via getProps
    const props = arc.getProps
      ? arc.getProps(
          ["x", "y", "startAngle", "endAngle", "innerRadius", "outerRadius"],
          true
        )
      : arc; // fallback

    const cx = props.x;
    const cy = props.y;
    const midAngle = (props.startAngle + props.endAngle) / 2;
    const midRadius = (props.innerRadius + props.outerRadius) / 2;
    const x = cx + Math.cos(midAngle) * midRadius;
    const y = cy + Math.sin(midAngle) * midRadius;
    setLabelPos({ left: `${x}px`, top: `${y}px` });
  }, [active, data]);

  return (
    <div className="total-card">
      <div className="ts-title">Total Sales</div>
      <div className="ts-content">
        <div
          style={{
            position: "relative",
            width: 140,
            height: 140,
            margin: "0 auto",
          }}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => {
            setHovering(false);
            setLabelPos({ left: "50%", top: "50%" });
          }}
        >
          <Doughnut
            ref={chartRef}
            data={data}
            options={options}
            height={160}
            width={160}
            className="ts-donut"
          />
          <div
            className="ts-float"
            style={{
              left: labelPos.left,
              top: labelPos.top,
              opacity: hovering ? 1 : 0.9,
              "--scale": hovering ? 1 : 0.96,
            }}
          >
            {percent}%
          </div>
        </div>
        <ul className="ts-legend">
          {itemsBase.map((it, i) => (
            <li
              key={it.label}
              className={`ts-row ${i === active ? "active" : ""}`}
              onMouseEnter={() => setActive(i)}
            >
              <span className="left">
                <span className="dot" style={{ background: it.color }} />
                {it.label}
              </span>
              <strong className="right">${it.amount.toFixed(2)}</strong>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TotalSales;
