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
import NotesList from './components/Pages/NotesList';
import NoteCreate from './components/Pages/NoteCreate';
import SettingsPage from './components/Pages/SettingsPage'
import CreateTag from './components/Pages/CreateTag';
import TagsList from './components/Pages/TagsList';
import ToDoCreate from './components/Pages/ToDoCreate';
import ToDoList from './components/Pages/ToDoList';
import ToDoTagCreate from './components/Pages/ToDoTagCreate';
import ToDoTagsList from './components/Pages/ToDoTagsList';
import NoteUpdate from './components/Pages/NoteUpdate';
import ToDoUpdate from './components/Pages/ToDoUpdate';
import Spend from './components/Pages/Spend';
import SpendDetail from './components/Pages/SpendDetail';
import SpendTags from './components/Pages/SpendTags';
import SpendTagCreate from './components/Pages/SpendTagCreate';
import SpendCreate from './components/Pages/SpendCreate';
import SearchPage from './components/Pages/SearchPage';

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
          <Route exact path='user/note/:id' element={<NoteUpdate />} />
          <Route exact path='user/note' element={<NotesList />} />
          <Route exact path='user/create-note' element={<NoteCreate />} />
          <Route exact path='user/create-notetag' element={<CreateTag />} />
          <Route exact path='user/settings' element={<SettingsPage />} />
          <Route exact path='user/note-tagslist' element={<TagsList />} />
          <Route exact path='user/create-todotag' element={<ToDoTagCreate />} />
          <Route exact path='user/create-todo' element={<ToDoCreate />} />
          <Route exact path='user/todo' element={<ToDoList />} />
          <Route exact path='user/todo-tagslist' element={<ToDoTagsList />} />
          <Route exact path='user/todo/:id' element={<ToDoUpdate />} />
          <Route exact path='user/spend/' element={<Spend />} />
          <Route exact path='user/spend/:id' element={<SpendDetail />} />
          <Route exact path='user/spend-tags' element={<SpendTags />} />
          <Route exact path='user/spend-tag/create' element={<SpendTagCreate />} />
          <Route exact path='user/spend/create' element={<SpendCreate />} />
          <Route exact path='user/search' element={<SearchPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
