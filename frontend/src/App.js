import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './Pages/Auth/Login';
import RegisterPage from './Pages/Auth/Register';
import Navbar from './Components/Navbar';
import Dashboard from './Components/Dashboard';
import HuntPage from './Components/HuntPage';
import HuntForm from './Components/HuntForm';




function App() {
  return (
     
    <Router>
      {/* <div className="App bg-[#181818] text-[#FFFAF0] flex flex-col items-center justify-center text-4xl ">
        She knows project 
      </div> */}
      <Navbar />
      {/* <Dashboard/> */}
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
        <Route path="/HuntPage" element={<HuntPage />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/HuntForm" element={<HuntForm />} />

        
        
                
        
                
            </Routes>
    </Router>
    
  );
}

export default App;
