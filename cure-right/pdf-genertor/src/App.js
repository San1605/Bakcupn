import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import DocsViewPage from './pages/DocsViewPage';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home /> }/> 
       <Route path="/docsview" element={<DocsViewPage /> }/>

      </Routes>
    </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
