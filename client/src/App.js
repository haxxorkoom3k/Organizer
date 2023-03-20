import './App.css';
import UserProfile from './components/Authorization/UserProfile';
import NavBar from './components/UI/NavBar';
import './bootstrap.css'
import './mystyle.css'
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom';
import Registation from './components/Authorization/Registation';
import HomePage from './components/Pages/HomePage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route exact path='user/login' element={<UserProfile />}/>
          <Route exact path='user/register' element={<Registation />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
