import React from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";
import RevenueChart from "../components/RevenueChart";
import RevenueByLocation from "../components/RevenueByLocation";
import ProjectionsChart from "../components/ProjectionsChart";
import TotalSales from "../components/TotalSales";

const StatCard = ({ title, value, change, onClick, tooltip }) => {
  return (
    <div
      title={tooltip}
      className="stat-card"
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") onClick();
            }
          : undefined
      }
    >
      <div className="stat-title">{title}</div>
      <div className="stat-row">
        <div className="stat-value">{value}</div>
        <div
          className={`stat-change ${change.startsWith("-") ? "down" : "up"}`}
        >
          {change}
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="dashboard">
      <div className="grid-top">
        <StatCard title="Customers" value="3,781" change="+11.0%" />
        <StatCard
          title="Orders"
          value="1,219"
          change="-0.3%"
          onClick={() => navigate("/user-order")}
          tooltip="Click to view orders details"
        />
        <StatCard title="Revenue" value="$695" change="+15.0%" />
        <StatCard title="Growth" value="30.1%" change="+6.0%" />
        <div>
          <ProjectionsChart />
        </div>
      </div>

      <div className="grid-middle">
        <RevenueChart />
        <RevenueByLocation />
      </div>

      <div className="grid-bottom">
        <div className="panel table">
          <div className="panel-head">Top Selling Products</div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  name: "ASOS Ridley High Waist",
                  price: "$79.49",
                  qty: 82,
                  amount: "$6,518.18",
                },
                {
                  name: "Lightweight Jacket",
                  price: "$230.90",
                  qty: 184,
                  amount: "$2,060.00",
                },
                {
                  name: "Marco Shoes",
                  price: "$79.49",
                  qty: 64,
                  amount: "$1,054.61",
                },
              ].map((r, i) => (
                <tr key={i}>
                  <td>{r.name}</td>
                  <td>{r.price}</td>
                  <td>{r.qty}</td>
                  <td>{r.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <TotalSales />
      </div>
    </div>
  );
};

export default Dashboard;
