import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './Components/Dashboard';
import Navbar from './Components/Navbar';
import Allhunts from './Pages/Allhunts';
import LoginPage from './Pages/Auth/Login';
import RegisterPage from './Pages/Auth/Register';
import VerifyOtp from './Pages/Auth/Verify-Email';
import CreateHunt from './Pages/CreateHunt';
import Home from './Pages/Home/Home';




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
            <Route path="/allhunts" element={<Allhunts />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/createhunt" element={<CreateHunt />} />
            <Route path='/verifyemail' element={<VerifyOtp/>}/>
            </Routes>
    </Router>
    
  );
}

export default App;
