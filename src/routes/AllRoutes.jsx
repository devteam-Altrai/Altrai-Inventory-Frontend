import React from "react";
import { authProtectedRoutes, publicRoutes } from "../routes/index";
import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "../layout/Layout";

const AllRoutes = () => {
  //   if (loading) {
  //     return <div>Loading ...</div>;
  //   }
  return (
    <Routes>
      {publicRoutes.map((route, idx) => {
        return (
          <Route
            path={route.path}
            element={route.element}
            key={`public-${idx}`}
          />
        );
      })}
      {authProtectedRoutes.map((route, idx) => {
        return (
          <Route
            key={`auth-${idx}`}
            path={route.path}
            element={<Layout>{route.element}</Layout>}
          />
        );
      })}
    </Routes>
  );
};

export default AllRoutes;
