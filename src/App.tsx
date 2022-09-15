import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Planning } from "./pages/Planning";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/:id",
        element: <Planning />,
      },
    ],
  },
]);

export const App = () => <RouterProvider router={router} />;
