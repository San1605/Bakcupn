import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./AppLayout";
import { ROUTES } from "./utils/routeUtils";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="app sm:h-[100vh] w-[100vw] h-[93vh]">
      <Toaster />
      <Routes>
        <Route element={<Layout />}>
          {ROUTES.map((route, i) => {
            return <Route key={i} path={route.path} element={route.element} />;
          })}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
