import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import './scss/app.scss';
import Cart from './pages/Cart';
import SinglePizza from './pages/SinglePizza';
import MainLayout from './layout/MainLayout';

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout/>}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:id" element={<SinglePizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
