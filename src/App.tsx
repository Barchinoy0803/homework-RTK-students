import React, { lazy } from "react";
import { Link, useRoutes } from "react-router-dom";
const Home = lazy(() => import("./pages/Home"));

const App = () => {
  return (
    <>
    <Link to={"/"}>Home</Link>
      {useRoutes([
        { path: "/", element: <Home /> },
      ])}
    </>
  );
};

export default React.memo(App);
