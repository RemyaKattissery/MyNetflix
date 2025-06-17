import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import FirstPage from './Component/FirstPage';
import Signup from './Component/Signup';
import SignIn from './Component/SignIn';
import NetflixHome from './Component/NetflixHome';
import Player from './Player/Player';

function App() {
  const [Email,setEmail]=useState('');
  return (
   <div>
      <Router>
      <Routes> 
        <Route path="/" element={<FirstPage Email={Email} setEmail={setEmail}/>}/>
        <Route path="/Signup" element={<Signup Email={Email}/>}/>
        <Route path='/Signin' element={<SignIn/>} />
        <Route path="/NetflixHome" element={<NetflixHome/>}/>
       <Route path="/movie/:id" element={<Player />} />
        </Routes>
        </Router>
    </div>
  );
}

export default App;
