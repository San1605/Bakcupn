import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./component/Layout";
import Home from "./pages/Home";
import Project from "./pages/Project";
import Login from "./pages/Login";
import Analyse from "./pages/Analyse";
import Convertor from "./pages/Convertor";
import Files from "./pages/Files";
import AnalyseFiles from "./pages/AnalyseFiles";
import AnalyseProject from "./pages/AnalyseProject";
import ConvertorFiles from "./pages/ConvertorFiles";
import ConvertCode from "./pages/ConvertCode";
import Testing from "./pages/Testing";
import SignUp from "./pages/SignUp";



function App() {
  function PrivateRoute({ children }) {
    const userEmail = sessionStorage.getItem("user-email");
    const userName = sessionStorage.getItem("user-name");
    let redirectURL = "/";
    return userEmail && userName ? (
      children
    ) : (
      <Navigate to={redirectURL} />
    );
  }

  return (
    <Routes>
      <Route path="/" element={
        <Login />
      } />

      <Route path="/signUp" element={
        <SignUp />
      } />

      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Layout>
              <Home />
            </Layout>
           </PrivateRoute>
        }
      />

      <Route
        path="/projects"
        element={
          <PrivateRoute>
            <Layout>
              <Project />
            </Layout>
           </PrivateRoute>
        }
      />
      <Route
        path="/projects/:id1/:id2"
        element={
          <PrivateRoute>
            <Layout>
              <Files />
            </Layout>
           </PrivateRoute>
        }
      />

      <Route
        path="/analyzer"
        element={
          <PrivateRoute>
            <Layout>
              <AnalyseProject />
            </Layout>
           </PrivateRoute>
        }
      />
      <Route
        path="/analyzer/:id1/:id2"
        element={
          <PrivateRoute>
            <Layout>
              <AnalyseFiles />
            </Layout>
           </PrivateRoute>
        }
      />
      <Route
        path="/analyzer/analyze"
        element={
          <PrivateRoute>
            <Layout>
              <Analyse />
            </Layout>
           </PrivateRoute>
        }
      />

      <Route
        path="/convertor"
        element={
          <PrivateRoute>
            <Layout>
              <Convertor />
            </Layout>
           </PrivateRoute>
        }
      />
      <Route
        path="/convertor/:id1/:id2"
        element={
          <PrivateRoute>
            <Layout>
              <ConvertorFiles />
            </Layout>
           </PrivateRoute>
        }
      />
      <Route
        path="/convertor/convert/:id"
        element={
          <PrivateRoute>
            <Layout>
              <ConvertCode />
            </Layout>
           </PrivateRoute>
        }
      />

      <Route
        path="/testing/:id?"
        element={
          <PrivateRoute>
            <Layout>
              <Testing />
            </Layout>
           </PrivateRoute>
        }
      />

    </Routes>
  );
}
export default App;