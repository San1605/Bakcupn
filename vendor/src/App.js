import {Route, Routes } from 'react-router-dom';
import './App.css';

import Home from './pages/Home/Home';
import Meal from './pages/Meal/Meal';
import Header from './Components/Header/Header';

function App() {
  return (
    <div className="App">
      <Header />
     
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Meal />} />
        </Routes>



    </div>
  );
}

export default App;
