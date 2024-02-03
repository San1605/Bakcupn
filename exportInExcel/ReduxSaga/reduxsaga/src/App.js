import './App.css';
import {useDispatch} from "react-redux"
import { loadImages } from './redux/action';
function App() {
  console.log("h1")
  const dispatch= useDispatch();
  return (
    <div className="App">
    {/* <button onClick={()=>dispatch(loadImages())}>Load More Images</button> */}
    </div>
  );
}
export default App;