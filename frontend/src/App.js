import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './Components/Dashboard';
import Navbar from './Components/Navbar';
import LoginPage from './Pages/Auth/Login';
import RegisterPage from './Pages/Auth/Register';
import CreateHunt from './Pages/CreateHunt';
import Home from './Pages/Home/Home';
import Allhunts from './Components/Allhunts';
import CurrentHunt from './Components/CurrentHunt';






function App() {
  return (
     
    <Router>
      {/* <div className="App bg-[#181818] text-[#FFFAF0] flex flex-col items-center justify-center text-4xl ">
        She knows project 
      </div> */}
      <Navbar />
      {/* <Dashboard/> */}
      <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/createhunt" element={<CreateHunt />} />
            <Route path='/verifyemail' element={<VerifyOtp />} />
            <Route path='/allhunts' element={<Allhunts/>}/>
            <Route path='/currenthunt' element={<CurrentHunt  />}/>
            </Routes>
    </Router>
    
  );
}

export default App;
