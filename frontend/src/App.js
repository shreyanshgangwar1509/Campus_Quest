import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Allhunts from './Components/Allhunts';
import CurrentHunt from './Components/CurrentHunt';
import Dashboard from './Components/Dashboard';
import Map from './Components/Map';
import Navbar from './Components/Navbar';
import LoginPage from './Pages/Auth/Login';
import RegisterPage from './Pages/Auth/Register';
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
            <Route path="/Dashboard" element={<Dashboard />} />
            
            <Route path="/map" element={<Map/>} />
            
            <Route path='/allhunts' element={<Allhunts/>}/>
            <Route path='/currenthunt' element={<CurrentHunt  />}/>
            </Routes>
    </Router>
    
  );
}

export default App;
