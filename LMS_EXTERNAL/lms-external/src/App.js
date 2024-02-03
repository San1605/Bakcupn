import { Routes, Route } from 'react-router-dom';
import './App.css';

import { ROUTES } from './Utils/Routes';
import { useContext, useEffect } from 'react';
import { GlobalContext } from './Context/GlobalContext';
import CollegeLogin from './Pages/CollegeLogin/CollegeLogin';
import CelebalLogin from './Pages/CelebalLogin/CelebalLogin';
import { globalActions } from './Context/GlobalActions';
import NotFound from './Pages/NotFound/NotFound';


function App() {
  const { userType, dispatch } = useContext(GlobalContext);
  useEffect(() => {
    dispatch({
      type: globalActions.SET_USER_TYPE,
      payload: localStorage.getItem("role")
    })
  }, [])
  return (
    <Routes>
      <Route path='/' element={<CollegeLogin />} />
      <Route path='/admin' element={<CelebalLogin />} />
      {
        ROUTES && ROUTES[userType === "HR Buddy" ? "hrbuddy" : userType]?.map((item, index) => (
          <Route key={index} path={`${item?.path}`} element={item?.element} />
        ))
      }

      {/* <Route path='/*' element={<NotFound />} /> */}
    </Routes>
  );
}
export default App;