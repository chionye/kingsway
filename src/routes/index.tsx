/** @format */

import { Outlet } from "react-router-dom";
import Layout from "../pages/auth/Layout";
import Login from "../pages/auth/Login";
import DashboardLayout from "@/pages/dashboard/Layout";
import Home from "@/pages/dashboard/home";
import Users from "@/pages/dashboard/users";
import { Pharmacy } from "@/pages/dashboard/pharmacy";
import Profile from "@/pages/dashboard/profile";
import Patients from "@/pages/dashboard/patients/index";
import Lab from "@/pages/dashboard/lab/Lab";

const Routes = [
  {
    path: "/",
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      {
        path: "/",
        element: <Login />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    ),
    children: [
      {
        path: `/dashboard/:slug/home`,
        element: <Home />,
      },
      {
        path: `/dashboard/:slug/patients`,
        element: <Patients />,
      },
      {
        path: `/dashboard/:slug/users`,
        element: <Users />,
      },
      {
        path: `/dashboard/:slug/pharmacy`,
        element: <Pharmacy />,
      },
      {
        path: `/dashboard/:slug/profile`,
        element: <Profile />,
      },
      {
        path: `/dashboard/:slug/lab`,
        element: <Lab />,
      },
    ],
  },
];

export default Routes;
