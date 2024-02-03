import React from "react";
import Layout from "./Layout";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import ROUTES from "./utils/routesUtils";
import Meeting from "./pages/Meeting/Meeting";
import NotFoundRoute from "./pages/NotFoundRoute/NotFoundRoute";
import { useState } from "react";

function App() {
  console.log("Latest App Console from App.js");
  const [call, setCall] = useState(null);
  console.log("New APP CONSOLE");
  return (
    <div className="app">
      <Routes>
        {ROUTES.map((route, index) => (
          <Route element={<Layout route={route} />}>
            <Route
              key={index}
              path={route.path}
              element={
                route.element ? (
                  route.element
                ) : (
                  <Meeting call={call} setCall={setCall} />
                )
              }
            />
          </Route>
        ))}
        <Route path="*" element={<NotFoundRoute />} />
      </Routes>
    </div>
  );
}

export default App;
