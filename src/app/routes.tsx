import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import Layout from "./layout";

const SignIn = lazy(() => import("@/app/sign-in"));
const SignUp = lazy(() => import("@/app/sign-up"));

const Dashboard = lazy(() => import("@/pages/dashboard/dashboard"));
const Home = lazy(() => import("@/pages/home/home"));
const Inbox = lazy(() => import("@/pages/inbox/inbox"));
const Users = lazy(() => import("@/pages/users/users"));
const Projects = lazy(() => import("@/pages/projects/projects"));
const Calendar = lazy(() => import("@/pages/calendar/calendar"));
const Settings = lazy(() => import("@/pages/settings/settings"));

export const router = createBrowserRouter([
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    element: <Layout />,
    children: [
      {
        index: true,
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        index: true,
        path: "/home",
        element: <Home />,
      },
      {
        path: "/inbox",
        element: <Inbox />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/projects",
        element: <Projects />,
      },
      {
        path: "/calendar",
        element: <Calendar />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "*",
        element: <Navigate to={"/dashboard"} replace />,
      },
    ],
  },
]);
