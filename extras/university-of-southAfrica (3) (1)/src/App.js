import { useContext } from "react";
import "./App.css";

// import componentsogin
import ChatContext from "./context/Context";
import ErrorBoundary from "./components/ErrorBoundary";
import { Navbar } from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import DBEapp from "./components/DBEapp/DBEapp.jsx";
import NewsAndEvent from "./components/NewsAndEvent/NewsAndEvent.jsx";
import OurServices from "./components/OurServices/OurServices";
import ChatBot from "./components/ChatBot/ChatBot";

function App() {
  const { openChat } = useContext(ChatContext);

  return (
    <ErrorBoundary>
      <div className="App">
        <div className="overflow-auto">
          <Navbar />
          <OurServices />
          <DBEapp />
          <NewsAndEvent />
          <Footer />
        </div>
        {openChat && (
          <div className="chat_window_popup">
            <ChatBot />
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;
