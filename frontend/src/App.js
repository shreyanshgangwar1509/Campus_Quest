import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './Pages/Auth/Login';
import RegisterPage from './Pages/Auth/Register';

function App() {
  return (
     
    <Router>
      <div className="App bg-[#181818] text-[#FFFAF0] flex flex-col items-center justify-center text-4xl ">
        She knows project 
        </div>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Routes>
        </Router>
    
  );
}

export default App;
