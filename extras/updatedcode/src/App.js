import React, { useEffect, useContext } from "react";
import { Navigate, BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import FileList from "./pages/FileList";
import FileSummary from "./pages/FileSummary";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Context } from "./context/ContextProvider";

function App() {
  const {AuthToken} = useContext(Context)

  let auth_Token = sessionStorage.getItem("auth_token");
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/file" element={<SearchFilters />} /> */}
        {/* <Route path="/home" element={<FileSummary />} /> */}
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute Authtoken={auth_Token}>
              <Home />
            </PrivateRoute>
          }
        />
        {/* <Route path="/" element={<Home />} /> */}
        {/* <Route path="/summary-new" element={<Summary />} /> */}
        {/* <Route path="/conversation" element={<Conversation />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

function PrivateRoute({ children, Authtoken }) {
  return Authtoken ? children : <Navigate to="/login" />;
}
