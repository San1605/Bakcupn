import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Transpiler from './Pages/Transpiler/Transpiler';
import Login from './Pages/Login/Login';
import RightContainer from './Components/RightContainer/RightContainer';
import { Toaster } from 'react-hot-toast';
import ErrorBoundaries from './utils/ErrorBoundaries';
import { useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  function PrivateRoute({ children }) {
    return isAuthenticated ? children : <Navigate to="/" replace />
  }
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/transpile" element={
          <PrivateRoute>
            <Transpiler />
          </PrivateRoute>
        }>
          <Route path='/transpile/convertor' element={
            <PrivateRoute>
              <RightContainer />
            </PrivateRoute>
          } />
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
