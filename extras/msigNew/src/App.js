import './App.css';
import { Route, Routes } from 'react-router-dom';
import BotPage from './screens/BotPage/BotPage';
import ManageUser from './components/ManageUser/ManageUser';
import ChatBot from './components/ChatBot/ChatBot';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<BotPage />}>
          <Route exact path='chat' element={<ChatBot />} />
          <Route exact path='admin' element={<ManageUser />} />
        </Route>
      </Routes>
    </div>
  );
}
export default App;
