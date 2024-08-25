import './App.css';
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import Stories from './components/Container/Story/Stories';
import User from './components/Container/User/User';
import StoryView from './components/Container/Story/StoryView';
import StoryForm from './components/Container/Story/StoryForm';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to = "stories"/>}/>
          <Route path='/stories' element={<Stories/>}/> 
          <Route path='/stories/storyform' element={<StoryForm/>}/>
          <Route path='/stories/storyform/:id' element={<StoryForm/>}/>
          <Route path='/stories/:id' element={<StoryView/>}/>
          <Route path='/user' element={<User/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
