import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveSidebar, toggleSidebarMobile } from "../store/uiSlice";
import { useNavigate } from "react-router-dom";
import "./sidebar.css";
import { sidebarMenu } from "./sidebarMenu";
import { renderSidebarIcon } from "./sidebarIcons";

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState("dashboards");
  const dispatch = useDispatch();
  const activeItem = useSelector((s) => s.ui.activeSidebar);
  const [openUserProfile, setOpenUserProfile] = useState(true);
  const [openAccounts, setOpenAccounts] = useState(true);
  const navigate = useNavigate();

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? "" : menu);
  };

  const sidebarOpenMobile = useSelector((s) => s.ui.sidebarOpenMobile);
  return (
    <aside className={`sidebar ${sidebarOpenMobile ? "open" : ""}`}>
      {/* Mobile close button */}
      <button
        className="sb-close"
        aria-label="Close sidebar"
        onClick={() => dispatch(toggleSidebarMobile())}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 6l12 12M18 6l-12 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <div className="sidebar-header">
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="Avatar"
          className="sidebar-avatar"
        />
        <span className="sidebar-title">ByeWind</span>
      </div>
      <div className="sidebar-labels">
        <span>Favorites</span>
        <span>Recently</span>
      </div>
      <div className="sidebar-favorites">
        <div className="sidebar-link">
          <span className="sidebar-dot" /> Overview
        </div>
        <div className="sidebar-link">
          <span className="sidebar-dot" /> Projects
        </div>
      </div>

      {sidebarMenu.map((section) => (
        <div key={section.key} className="sidebar-section">
          <span
            className="sidebar-section-title"
            onClick={() => toggleMenu(section.key)}
          >
            {section.title}
          </span>
          <div className={`sidebar-collapse open`}>
            <nav>
              {section.items.map((item) => (
                <div key={item.key || item.label}>
                  <div
                    className={`sidebar-navlink ${
                      activeItem === item.label ? "active" : ""
                    }`}
                    onClick={() => {
                      dispatch(setActiveSidebar(item.label));
                      if (item.key === "userprofile")
                        setOpenUserProfile((v) => !v);
                      if (item.key === "account") setOpenAccounts((v) => !v);
                      if (item.key === "default") navigate("/");
                      else navigate("/not-found");
                    }}
                  >
                    {item.caret ? (
                      <span className="caret">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.65967 12.3536C5.44678 12.1583 5.44678 11.8417 5.65967 11.6464L9.25 8.35355C9.4629 8.15829 9.4629 7.84171 9.25 7.64645L5.65968 4.35355C5.44678 4.15829 5.44678 3.84171 5.65968 3.64645C5.87257 3.45118 6.21775 3.45118 6.43065 3.64645L10.021 6.93934C10.6597 7.52513 10.6597 8.47487 10.021 9.06066L6.43065 12.3536C6.21775 12.5488 5.87257 12.5488 5.65967 12.3536Z"
                            fill="currentColor"
                          />
                        </svg>
                      </span>
                    ) : null}
                    {item.icon ? (
                      <span className="sb-icn">
                        {renderSidebarIcon(item.icon)}
                      </span>
                    ) : null}
                    <span className="navtext">{item.label}</span>
                  </div>
                  {item.children && (
                    <div
                      className={`sidebar-collapse ${
                        (item.key === "userprofile" && openUserProfile) ||
                        (item.key === "account" && openAccounts)
                          ? "open"
                          : ""
                      }`}
                    >
                      <div className="sidebar-subnav">
                        {item.children.map((c) => (
                          <div
                            key={c.label}
                            className="sidebar-subnav-link"
                            onClick={() => navigate("/not-found")}
                          >
                            {c.icon ? (
                              <span className="sb-icn sm">
                                {renderSidebarIcon(c.icon)}
                              </span>
                            ) : null}
                            {c.label}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;
