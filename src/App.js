
import './App.css';
import Home from './Screen/Home';

import Model from './Screen/Model';
import UserLogin from './Screen/UserLogin';
import LoginOpt from './Screen/LoginOpt';
import DoctLogin from './Screen/DoctLogin';
import UserProfile from './Screen/UserProfile';
import Doctorpro from './Screen/Doctorpro';
import {BrowserRouter as Router , Routes , Route} from "react-router-dom";

function App() {
  return (
   <Router>
    <div>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
       
        <Route exact path="/model" element={<Model/>}/>
        <Route exact path="/userLogin" element={<UserLogin/>}/>
        <Route exact path='/loginOpt' element={<LoginOpt />}/>
        <Route exact path='/doctLogin' element={<DoctLogin/>} />
        <Route exact path='/userProfile' element={<UserProfile/>}/>
        <Route exact path='/doctorPro' element={<Doctorpro/>}/>
      </Routes>
    </div>
   </Router>
  );
}

export default App;
