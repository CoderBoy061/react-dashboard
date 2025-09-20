import "./header.css";
import { useDispatch, useSelector } from "react-redux";
import {
  openNotif,
  toggleTheme as toggleThemeAction,
  toggleSidebarMobile,
} from "../store/uiSlice";
import {
  breadcrumbIcon,
  changeThemeIcon,
  historyIcon,
  IconBellPanel,
  IconPanel,
  starIcon,
} from "./headerIcons";
const Header = ({ onOpenNotifications }) => {
  const dispatch = useDispatch();
  const theme = useSelector((s) => s.ui.theme);
  // ensure DOM matches redux theme on mount/update
  if (typeof document !== "undefined") {
    const root = document.documentElement;
    const hasDark = root.classList.contains("dark");
    if (theme === "dark" && !hasDark) root.classList.add("dark");
    if (theme !== "dark" && hasDark) root.classList.remove("dark");
  }
  return (
    <header className="header">
      <div className="header-left">
        <button
          className="icon-btn"
          onClick={() => dispatch(toggleSidebarMobile())}
          aria-label="Toggle sidebar"
        >
          {/* Hamburger icon */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 6h18M3 12h18M3 18h18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <button className="icon-btn">{breadcrumbIcon()}</button>
        <button className="icon-btn">{starIcon()}</button>
        <span className="header-breadcrumb">
          Dashboards <span className="breadcrumb-sep">/</span>{" "}
          <span className="header-default">Default</span>
        </span>
      </div>

      <div className="header-right">
        <div className="header-center">
          <input className="header-search" type="text" placeholder="Search" />
          <span className="search-shortcut">⌘/</span>
        </div>
        <div className="header-actions">
          <button
            className="icon-btn"
            onClick={() => dispatch(toggleThemeAction())}
            title="Toggle theme"
          >
            {changeThemeIcon()}
          </button>
          <button className="icon-btn">{historyIcon()}</button>
          <button
            className="icon-btn"
            onClick={() =>
              onOpenNotifications
                ? onOpenNotifications()
                : dispatch(openNotif())
            }
            aria-label="Open notifications"
          >
            {IconBellPanel()}
          </button>
          <button className="icon-btn">{IconPanel()}</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
