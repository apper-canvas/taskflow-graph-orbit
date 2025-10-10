import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

const Dashboard = lazy(() => import("@/components/pages/Dashboard"));

const mainRoutes = [
  {
    path: "",
    index: true,
    element: (
      <Suspense fallback={<div>Loading.....</div>}>
        <Dashboard />
      </Suspense>
    ),
  },
];

const routes = [
  {
    path: "/",
    children: mainRoutes,
  },
];

export const router = createBrowserRouter(routes);