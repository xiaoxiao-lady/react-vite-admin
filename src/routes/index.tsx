import React, { FC, lazy } from "react";

import Dashboard from "@/pages/dashboard";
import LayoutPage from "@/pages/layout";
import LoginPage from "@/pages/login";
import { RouteObject, useRoutes } from "react-router-dom";
import WrapperRouteComponent from "./config";

const NotFound = lazy(() => import('@/pages/404'));
const Project = lazy(() => import('@/pages/project'));
const Page1 = lazy(() => import('@/pages/project/page1'));

const routeList: RouteObject[] = [

  {
    path: "/",
    element: <WrapperRouteComponent auth={true} ><LayoutPage /></WrapperRouteComponent>,
    children: [
      {
        path: "/dashboard",
        element: <WrapperRouteComponent><Dashboard /></WrapperRouteComponent>,
      },
      {
        path: "/project/list",
        element: <WrapperRouteComponent><Project /></WrapperRouteComponent>,
      },
      {
        path: "/test/page1",
        element: <WrapperRouteComponent><Page1 /></WrapperRouteComponent>,
      },
      {
        path: "*",
        element: <WrapperRouteComponent><NotFound /></WrapperRouteComponent>,
      },
    ],
  },
  {
    path: "login",
    element: <LoginPage />,
  },
];

const RenderRouter: FC = () => {
  const element = useRoutes(routeList);
  return element;
};

export default RenderRouter;
