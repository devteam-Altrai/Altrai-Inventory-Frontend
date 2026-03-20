import { Route } from "react-router-dom";
import { element } from "prop-types";
import LoginPage from "../app/auth/LoginPage";
import Projects from "../app/projects page/Projects";
import BomPage from "../app/bom page/BomPage";
import ProjectDetails from "../app/projects page/children/ProjectDetails";

const loginpageRoute = {
  path: "/",
  name: "root",
  element: <LoginPage />,
  route: Route,
};

const projectsRoute = {
  path: "/projects",
  name: "Projects",
  element: <Projects />,
  children: [
    {
      path: "/projects/:fileId",
      name: "Project Details",
      element: <ProjectDetails />,
      displaySidebar: false,
      route: Route,
    },
  ],
  route: Route,
};

const bomRoute = {
  path: "/bom",
  name: "BomPage",
  element: <BomPage />,
  route: Route,
};

const listedRoutes = (routes) => {
  let routeList = [];
  routes = routes || [];

  routes.forEach((item) => {
    routeList.push(item);
    if (item.children) {
      routeList = [...routeList, ...listedRoutes(item.children)];
    }
  });
  return routeList;
};

const authProtectedRoutes = listedRoutes([projectsRoute, bomRoute]);

const publicRoutes = [loginpageRoute];

export { authProtectedRoutes, publicRoutes };
