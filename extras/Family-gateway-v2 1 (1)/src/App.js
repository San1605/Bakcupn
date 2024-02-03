import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './Pages/LoginPage';
import LandingPage from './Pages/LandingPage';
import Dashboard from './Pages/Dashboard/Dashboard';
import CustomerFilterPage from './Pages/CustomerFilterPage/CustomerFilterPage';
import SignupPage from './Pages/SignupPage';

function App() {
  const [hierarchyToggle, setHierarchyToggle] = useState("");
  const [clustures, setClustures] = useState();
  const [selectedIds, setSelectedIds] = useState([]);
  return (
      <Routes>
        <Route path='/' element={<LandingPage />}></Route>
        <Route path='/login' element={<PrivateRoute1><LoginPage /></PrivateRoute1>}></Route>
        <Route path='/signup' element={<SignupPage />}></Route>
        <Route path='/dashboard' element={<PrivateRoute><Dashboard selectedIds={selectedIds} setSelectedIds={setSelectedIds} setClustures={setClustures} hierarchyToggle={hierarchyToggle} setHierarchyToggle={setHierarchyToggle}/> </PrivateRoute>}></Route>
        <Route path='/customers' element={<PrivateRoute><CustomerFilterPage clustures={clustures} hierarchyToggle={hierarchyToggle}/> </PrivateRoute>}></Route>
      </Routes>
  );
}

export default App;

function PrivateRoute({ children }) {
  const token = localStorage.getItem("userInfo");
  return token ? children : children;
}
function PrivateRoute1({ children }) {
  const token = localStorage.getItem("userInfo");
  return token ? <Navigate to='/dashboard' /> : children;
}