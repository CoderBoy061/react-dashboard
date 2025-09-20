import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import Layout from "./components/Layout";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const UserOrder = lazy(() => import("./pages/UserOrder"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => {
  return (
    <Suspense fallback={<div className="p-4">Loading...</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="user-order" element={<UserOrder />} />
          <Route path="not-found" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
