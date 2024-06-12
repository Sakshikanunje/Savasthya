
import './App.css';
import Home from './Screen/Home';
import Login from './Screen/Login';
import {BrowserRouter as Router , Routes , Route} from "react-router-dom";

function App() {
  return (
   <Router>
    <div>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/login" element={<Login/>}/>
      </Routes>
    </div>
   </Router>
  );
}

export default App;
