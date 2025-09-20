# SaaS Dashboard (React + Vite)

Modern, theme-aware dashboard implementing the provided designs with pixel-focused layout, charts, modular components, and microinteractions. The app uses React, Vite, Chart.js, Ant Design, CSS variables, and Redux Toolkit for shared UI state.

## Quick Start

```bash
npm install
npm run dev
# open http://localhost:5173
```

Build/preview:

```bash
npm run build
npm run preview
```

## Tech Stack

- React 18 + Vite
- Redux Toolkit (global UI + Orders state)
- Chart.js (Doughnut + Stacked Bar) via `react-chartjs-2`
- Ant Design Drawer/List (notification panel)
- CSS variables for light/dark themes

## Project Structure

```
src/
  components/
    Header.jsx, header.css (theme toggle, notifications)
    Layout.jsx, layout.css (sidebar + content + drawer)
    Sidebar.jsx, sidebar.css (navigation, icons, routing)
    RevenueChart.jsx, revenue-chart.css (revenue line chart)
    RevenueByLocation.jsx, revenue-location.css (location list + map)
    TotalSales.jsx, total-sales.css (doughnut chart with hover percentage)
    ProjectionsChart.jsx, projections.css (stacked bar: actual vs projections)
    orders/ (Orders toolbar, table, pagination, mock data)
    notifications/ (NOTIFICATIONS, ACTIVITIES, CONTACTS data)
  pages/
    Dashboard.jsx, dashboard.css
    UserOrder.jsx
    NotFound.jsx, notfound.css
  store/
    index.js (store setup), uiSlice.js, ordersSlice.js
  App.jsx (routes)
  main.jsx (Provider + Router)
  theme.css (light/dark tokens)
```

## Routing

- `/` → Dashboard
- `/user-order` → User Orders
- `/not-found` and all unknown routes (`*`) → NotFound

Sidebar behavior:

- Clicking "Default" navigates to `/`.
- All other sidebar items and sub-items navigate to `/not-found` (demo behavior).

## Global State (Redux Toolkit)

Slices:

- `uiSlice`:
  - `theme`: 'light' | 'dark' (persisted to localStorage, reflected on `<html>` class)
  - `notifOpen`: notification drawer open/close
  - `activeSidebar`: name of selected sidebar item
- `ordersSlice`:
  - `query`: search query
  - `status`: selected status filters (array)
  - `page`: current page
  - `sortDir`: 'asc' | 'desc'

Store is provided in `main.jsx` via `<Provider store={store}>`.

## Key Components and Behaviors

### Header (`components/Header.jsx`)

- Theme toggle dispatches `ui.toggleTheme` and syncs `<html>` class.
- Bell icon opens notifications via `ui.openNotif`.

### Layout (`components/Layout.jsx`)

- Wraps `Sidebar`, `Header`, and routed `Outlet`.
- Ant Design Drawer shows Notifications, Activities, Contacts (from `components/notifications/data.js`).
- Adds `with-drawer` class to `.main` when open; CSS adjusts content grids.

### Sidebar (`components/Sidebar.jsx`)

- Renders from `sidebarMenu.js` and `sidebarIcons.jsx`.
- Manages two collapsible groups (User Profile, Accounts). Active item stored in Redux (`ui.activeSidebar`).
- Navigation: `Default` → `/`, everything else → `/not-found`.

### Dashboard (`pages/Dashboard.jsx`)

- Top stats + `ProjectionsChart`.
- Middle: `RevenueChart` and `RevenueByLocation`.
- Bottom: products table and `TotalSales` doughnut.
- Microinteractions: hover transitions, active states.

### TotalSales (Doughnut) (`components/TotalSales.jsx`)

- Chart.js doughnut with custom hover percentage label: computes active arc mid-angle and radius to place a floating label inside the arc.
- Smooth hover animation via `hoverOffset`, `animations.radius`, and CSS transitions on the label.

### Projections vs Actuals (`components/ProjectionsChart.jsx`)

- Stacked bar (Actual + projection delta) with custom tooltip showing Actual and Total; flat bar corners.

### Orders Page (`pages/UserOrder.jsx` + `components/orders/*`)

- Client-side search, status filter chips, sort direction (date), and pagination.
- Toolbar popover closes on outside click; pagination button states theme-aware.
- State stored in Redux slice `ordersSlice`.

### Notifications Drawer (`components/Layout.jsx` + `components/notifications/*`)

- Sections rendered from data arrays: NOTIFICATIONS, ACTIVITIES, CONTACTS.
- Scrollbar hidden with CSS while keeping scroll behavior.

### NotFound (`pages/NotFound.jsx`)

- Modern card with illustration, CTA buttons.
- Theme-aware via tokens; responsive layout.

## Theming

`src/theme.css` defines CSS variables for light/dark. Toggling theme updates `<html>` class, and components use tokens for background, text, borders, and subtle accents.

## How to Use (Click-paths)

- Sidebar → Default: loads Dashboard.
- Sidebar → any other item/sub-item: navigates to NotFound.
- Dashboard → Orders stat: navigates to `/user-order`.
- Header → Bell: opens notifications drawer.
- Header → Theme icon: toggles light/dark.
- Orders page → search box, filter chips, sort button, pagination.

## Deployment

Deploy to Vercel/Netlify. For SPA routing, ensure fallback to `index.html` (`/* /index.html 200` on Netlify). Include the deployed URL here.

## License

MIT
