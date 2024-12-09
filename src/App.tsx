
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import { EventList } from './Pages/EventList/EventList';
import { Event } from './Pages/Event/Event';
function App() {



return (
		<>

<div className="main">
        <div className="content">
          <BrowserRouter>
            <Routes>
              <Route element={<EventList />} path="/" />
              <Route element={<Event />} path="/events/:id" />

            </Routes>
            <div className="navBarSpace"></div>
          </BrowserRouter>
        </div>
      </div>
		</>)
}

export default App;
