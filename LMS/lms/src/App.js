import './App.css';
import Container from './components/Container/Container';
import { GlobalProvider } from './context/GlobalContext';
import AllLearningPath from './pages/AllLearningPath/AllLearningPath';
import AllCourses from './pages/Courses/AllCourses';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';
import { Route, Routes } from "react-router-dom"
import VideoPlayer from './pages/VideoPlayer/VideoPlayer';
import VideoPlayer2 from './pages/VideoPlayer/VideoPlayer2';
import CommunityChat from './components/CommunityChat/CommunityChat';
import NestedComments from './components/NestedComments/NestedComments';
import Sudoku from './components/Games/Sudoku/Sudoku';
import LoginMicrosoft from './components/LoginMicrosoft/LoginMicrosoft';
import UploadExcel from './components/UploadExcel/UploadExcel';
import FireBaseLogin from './components/FireBaseLogin/FireBaseLogin';
import ChatBot from './components/ChatBot/ChatBot';

function App() {
  return (
    <GlobalProvider>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />}>
            <Route path="/" element={<Container />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" exact element={<Profile />} />
            <Route path="/alllearningpath" exact element={<AllLearningPath />} />
            <Route path="/courses/:id" exact element={<AllCourses />} />
            {/* <Route path="/mycurrentcourse/:id" exact element={<VideoPlayer />} /> */}
            <Route path="/mycurrentcourse/:id" exact element={<VideoPlayer2 />} />
            <Route path="/communitychat" exact element={<ChatBot />} />
            <Route path="/nestedcomments" exact element={<NestedComments />} />
            <Route path="/games" exact element={<Sudoku />} />
            <Route path="/loginMicrosoft" exact element={<LoginMicrosoft/>} />
            <Route path="/uploadexcel" exact element={<UploadExcel/>} />
            <Route path="/firebase" exact element={<FireBaseLogin/>} />
          </Route>
        </Routes>
      </div>
    </GlobalProvider>
  );
}

export default App;
