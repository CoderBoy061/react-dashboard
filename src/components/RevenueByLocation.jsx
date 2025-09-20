import React from "react";
import "./revenue-location.css";
import map from "../assets/map.png";

const points = [
  { city: "New York", value: 72, pos: { x: 78, y: 56 } },
  { city: "San Francisco", value: 39, pos: { x: 52, y: 60 } },
  { city: "Sydney", value: 25, pos: { x: 238, y: 112 } },
  { city: "Singapore", value: 61, pos: { x: 205, y: 92 } },
];

const RevenueByLocation = () => {
  const max = Math.max(...points.map((p) => p.value));
  return (
    <div className="location-card">
      <div className="lc-title">Revenue by Location</div>

      <div className="lc-map-wrap">
        <img src={map} alt="Map" />
      </div>

      <ul className="lc-list">
        {points.map((p, i) => (
          <li key={p.city} className="lc-row">
            <div className="lc-row-top">
              <span>{p.city}</span>
              <strong>{p.value}K</strong>
            </div>
            <div className="bar">
              <div
                className="bar-fill"
                style={{
                  width: `${(p.value / max) * 100}%`,
                  animationDelay: `${i * 120}ms`,
                }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RevenueByLocation;
