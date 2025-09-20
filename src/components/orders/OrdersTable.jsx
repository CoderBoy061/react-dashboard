import React from "react";
import { statusToClass } from "./mockData";
import "./orders.css";

const OrdersTable = ({ rows }) => {
  return (
    <table className="orders-table">
      <thead>
        <tr>
          <th style={{ width: 60 }}></th>
          <th>Order ID</th>
          <th>User</th>
          <th>Project</th>
          <th>Address</th>
          <th style={{ width: 140 }}>Date</th>
          <th style={{ width: 140 }}>Status</th>
          <th style={{ width: 40 }}></th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i} className="order-row">
            <td data-label="Select">
              <input type="checkbox" />
            </td>
            <td data-label="Order ID">{r.id}</td>
            <td data-label="User">
              <div className="cell-user">
                <img
                  className="avatar"
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
                    r.user
                  )}`}
                />
                {r.user}
              </div>
            </td>
            <td data-label="Project">{r.project}</td>
            <td data-label="Address">{r.address}</td>
            <td data-label="Date">{r.date}</td>
            <td data-label="Status">
              <span className="status-pill">
                <span className={`dot ${statusToClass(r.status)}`} /> {r.status}
              </span>
            </td>
            <td data-label="">
              <button className="more-btn">⋯</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrdersTable;
