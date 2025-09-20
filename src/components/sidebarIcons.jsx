export const renderSidebarIcon = (name) => {
  const common = { width: 16, height: 16, fill: "currentColor" };
  switch (name) {
    case "grid":
      return (
        <svg {...common} viewBox="0 0 16 16">
          <rect x="2" y="2" width="4" height="4" rx="1" />
          <rect x="10" y="2" width="4" height="4" rx="1" />
          <rect x="2" y="10" width="4" height="4" rx="1" />
          <rect x="10" y="10" width="4" height="4" rx="1" />
        </svg>
      );
    case "cart":
      return (
        <svg {...common} viewBox="0 0 16 16">
          <path d="M2 3h2l1.2 6.4A2 2 0 0 0 7.17 11h4.91a2 2 0 0 0 1.96-1.6L15 5H4" />
          <circle cx="6" cy="13.5" r="1" />
          <circle cx="12" cy="13.5" r="1" />
        </svg>
      );
    case "folder":
      return (
        <svg {...common} viewBox="0 0 16 16">
          <path d="M2 4a2 2 0 0 1 2-2h2l2 2h4a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4z" />
        </svg>
      );
    case "play":
      return (
        <svg {...common} viewBox="0 0 16 16">
          <path d="M6 4l6 4-6 4V4z" />
        </svg>
      );
    case "user":
      return (
        <svg {...common} viewBox="0 0 16 16">
          <circle cx="8" cy="5" r="3" />
          <path d="M2 14c1.5-3 10.5-3 12 0" />
        </svg>
      );
    case "megaphone":
      return (
        <svg {...common} viewBox="0 0 16 16">
          <path d="M2 9l8-4v6L2 7v2z" />
          <path d="M10 5v6l3 1V4l-3 1z" />
        </svg>
      );
    case "file":
      return (
        <svg {...common} viewBox="0 0 16 16">
          <path d="M4 2h5l3 3v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
        </svg>
      );
    case "users":
      return (
        <svg {...common} viewBox="0 0 16 16">
          <circle cx="5" cy="6" r="2.5" />
          <circle cx="11" cy="7" r="2" />
          <path d="M1.5 14c1.2-3 6.8-3 8 0M8 14c.6-1.7 3.9-1.7 4.5 0" />
        </svg>
      );
    case "briefcase":
      return (
        <svg {...common} viewBox="0 0 16 16">
          <path d="M6 3h4a1 1 0 0 1 1 1v1h2a1 1 0 0 1 1 1v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a1 1 0 0 1 1-1h2V4a1 1 0 0 1 1-1zM6 5V4h4v1H6z" />
        </svg>
      );
    case "blog":
      return (
        <svg {...common} viewBox="0 0 16 16">
          <path d="M3 3h10v2H3zM3 7h10v2H3zM3 11h7v2H3z" />
        </svg>
      );
    case "social":
      return (
        <svg {...common} viewBox="0 0 16 16">
          <circle cx="4" cy="6" r="2" />
          <circle cx="12" cy="6" r="2" />
          <path d="M2 13c1-2 5-2 6 0M8 13c1-2 5-2 6 0" />
        </svg>
      );
    default:
      return null;
  }
};
