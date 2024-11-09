import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Allhunts from './Components/Allhunts';
// import Allhunts from './Pages/Allhunts';
import CurrentHunt from './Components/CurrentHunt';

import Dashboard from './Components/Dashboard';
import Map from './Components/Map';
import Navbar from './Components/Navbar';
import LoginPage from './Pages/Auth/Login';
import RegisterPage from './Pages/Auth/Register';
import Home from './Pages/Home/Home';

import TeamFrontPage from './Pages/TeamFrontPage';

import CreateHunt from './Pages/CreateHunt';
import EventPage from './Pages/Event';


import Leaderboard from './Components/LeaderBoard';
import EventForm from './Components/EventForm';
import PhotoChallengeForm from './Components/PhotoChallengeForm';







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
            <Route path='/teampage' element={<TeamFrontPage/>}/>
            <Route path='/allhunts' element={<Allhunts/>}/>
          <Route path='/currenthunt' element={<CurrentHunt />} />
        <Route path='/events' element={<EventPage />} />
        <Route path='/createhunt' element={<CreateHunt />} />
        <Route path='/leaderboard' element={<Leaderboard />} />
        <Route path='/eventform' element={<EventForm />} />
        <Route path='/photochallengeform' element={<PhotoChallengeForm />} />

        


        
        

            </Routes>
    </Router>
    
  );
}

export default App;
