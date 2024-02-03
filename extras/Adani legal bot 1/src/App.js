import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
}
  from 'react-router-dom';
import { GlobalProvider } from "./context/GlobalState";
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import UploadDoc from './pages/UploadDoc/UploadDoc';

function App() {  
  return (
    <Router>
      <GlobalProvider>
        <Routes>
          <Route exact path='/' element={<PrivateRoute1><Login /></PrivateRoute1>}></Route>
          <Route exact path='/home' element={<PrivateRoute><Home /></PrivateRoute>}></Route>
          <Route exact path='/upload' element={<PrivateRoute><UploadDoc /></PrivateRoute>}></Route>
        </Routes>
      </GlobalProvider>
    </Router>
  );
}

export default App;

function PrivateRoute({ children }) {
  let isRedirect = false;
  const getToken = localStorage.getItem("userTokenLogin");
  if (getToken && getToken !== "") {
    isRedirect = false;
  } else {
    isRedirect = true;
  }

  return getToken && !isRedirect ? children : <Navigate to="/" />;
}

function PrivateRoute1({ children }) {
  let isRedirect = false;
  const getToken = localStorage.getItem("userTokenLogin");
  if (getToken && getToken !== "") {
    isRedirect = false;
  } else {
    isRedirect = true;
  }

  return getToken && !isRedirect ? <Navigate to="/home" /> : children;
}
