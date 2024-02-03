import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import DocsViewPage from './pages/DocsViewPage';
import ErrorBoundary from './components/ErrorBoundary';
import Login from './components/Login/Login';
import LandingPage from './components/LandingPage/LandingPage';
import Profile from './components/Profile/Profile';
import { ModifyRfp } from './components/ModifyRfp/ModifyRfp';
import NewHomePage from './pages/NewHomePage';
import { useContext, useEffect } from 'react';
import ChatContext from './Context/Context';
import DocsViewPage2 from './pages/DocsViewPage2';
import { Toaster } from 'react-hot-toast';


function App() {
  const { globalApiEndPoint } = useContext(ChatContext)

  //refrence code for the api route.....
  // useEffect(() => {
  //   var myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");

  //   var raw = JSON.stringify({
  //     "prompt": "Generate Company Overview for Microsoft"
  //   });

  //   var requestOptions = {
  //     method: 'POST',
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: 'follow'
  //   };

  //   fetch(`${globalApiEndPoint/"company_overview"}`, requestOptions)
  //     .then(response => response.text())
  //     .then(result => console.log(result))
  //     .catch(error => console.log('error', error));
  // },[])



  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/landingpage" element={<LandingPage />} />
          {/* <Route path="/home" element={<Home /> }/>  */}
          <Route path="/Profile" element={<Profile />} />
          <Route path="/modifyrfp" element={<ModifyRfp />} />
          <Route path="/docsview" element={<DocsViewPage />} />
          <Route path="/pdfeditor" element={<DocsViewPage2 />} />
          <Route path='/home' element={<NewHomePage />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
