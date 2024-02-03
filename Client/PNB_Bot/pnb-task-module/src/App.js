import { Route, Routes } from 'react-router-dom';
import './App.css';
import PdfViewer from './components/PdfViewer/PdfViewer';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<PdfViewer />} />
      </Routes>
    </div>
  );
}

export default App;