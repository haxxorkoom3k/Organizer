import './App.css';
import NavBar from './components/UI/NavBar';
import './bootstrap_drk.css'
import './mystyle.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Registation from './components/Authorization/Registation';
import HomePage from './components/Pages/HomePage';
import Login from './components/Authorization/Login';
import UserProfile from './components/Pages/UserProfile';
import NotFound from './components/UI/NotFound';
import Notes from './components/Pages/Notes';
import NotesList from './components/Pages/NotesList';
import NoteCreate from './components/Pages/NoteCreate';
import SettingsPage from './components/Pages/SettingsPage'
import CreateTag from './components/Pages/CreateTag';
import TagsList from './components/Pages/TagsList';
import ToDoCreate from './components/Pages/ToDoCreate';
import ToDoList from './components/Pages/ToDoList';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar />
        <Routes>
          <Route path='*' element={<NotFound />}/>
          <Route path='/' element={<HomePage />} />
          <Route exact path='user/login' element={<Login />}/>
          <Route exact path='user/register' element={<Registation />} />
          <Route exact path='user/profile' element={<UserProfile />} />
          <Route exact path='user/note/:id' element={<Notes />} />
          <Route exact path='user/note' element={<NotesList />} />
          <Route exact path='user/create-note' element={<NoteCreate />} />
          <Route exact path='user/create-tag' element={<CreateTag />} />
          <Route exact path='user/settings' element={<SettingsPage />} />
          <Route exact path='user/tagslist' element={<TagsList />} />
          <Route exact path='user/create-todo' element={<ToDoCreate />} />
          <Route exact path='user/todo-list' element={<ToDoList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
