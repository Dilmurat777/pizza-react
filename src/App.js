import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import './scss/app.scss';
import Cart from './pages/Cart';
import { useState } from 'react';


function App() {
  const [searchId, setSearchId] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(4)
  return (
    <div className="wrapper">
      <Header searchId={searchId} setSearchId={setSearchId} />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path='/' element={<Home searchId={searchId} setSearchId={setSearchId} />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
