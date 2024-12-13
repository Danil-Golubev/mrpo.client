
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import { Event } from './Pages/Event/Event';
import { MainPage } from './Pages/MainPage';
function App() {



return (
		<>

<div className="main">
        <div className="content">
          <BrowserRouter>
            <Routes>
              <Route element={<MainPage />} path="/" />
              <Route element={<Event />} path="/events/:id" />
            </Routes>
            <div className="navBarSpace"></div>
          </BrowserRouter>
        </div>
      </div>
		</>)
}

export default App;
