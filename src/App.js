
import './App.css';
import Home from './Screen/Home';
import { AuthProvider } from './Screen/AuthContext';
import Model from './Screen/Model';
import UserLogin from './Screen/UserLogin';
import LoginOpt from './Screen/LoginOpt';
import DoctLogin from './Screen/DoctLogin';
import UserProfile from './Screen/UserProfile';
import Doctorpro from './Screen/Doctorpro';
import Profile from './Screen/Profile';
import Scan from "./Screen/Scan";
import {BrowserRouter as Router , Routes , Route} from "react-router-dom";

function App() {
  return (
    <AuthProvider>
   <Router>
    <div>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
       
        <Route exact path="/model" element={<Model/>}/>
        <Route exact path="/scan" element={<Scan/>}/>
        
        <Route exact path="/userLogin" element={<UserLogin/>}/>
        <Route exact path='/loginOpt' element={<LoginOpt />}/>
        <Route exact path='/profile/:uuid' element={<Profile />}/>
        <Route exact path='/doctLogin' element={<DoctLogin/>} />
        <Route exact path='/userProfile' element={<UserProfile/>}/>
        <Route exact path='/doctorPro' element={<Doctorpro/>}/>
      </Routes>
    </div>
   </Router>
   </AuthProvider>
  );
}

export default App;
