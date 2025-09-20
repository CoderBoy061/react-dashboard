import React from "react";
import "./orders.css";

const OrdersPagination = ({ page, pages, onPage }) => {
  const items = Array.from({ length: pages }, (_, i) => i + 1);
  return (
    <div className="orders-pagination">
      <button
        className="page-btn"
        onClick={() => onPage(Math.max(1, page - 1))}
      >
        ‹
      </button>
      {items.map((p) => (
        <button
          key={p}
          className={`page-btn ${p === page ? "active" : ""}`}
          onClick={() => onPage(p)}
        >
          {p}
        </button>
      ))}
      <button
        className="page-btn"
        onClick={() => onPage(Math.min(pages, page + 1))}
      >
        ›
      </button>
    </div>
  );
};

export default OrdersPagination;
