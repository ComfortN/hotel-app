import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signin from './Components/signIn/Signin';
import Signup from './Components/signup/Signup';
import Home from './Components/home/Home';
import ForgotPassword from './Components/signIn/ForgotPassword';
import Accommodations from './Components/Accommodations/Accommodations';
import RoomDetails from './Components/room/Room';
import Checkout from './Components/checkout/Checkout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='forgot-password' element={<ForgotPassword />} />
        <Route path='/' element={<Home />} />
        <Route path='/accommodations' element={<Accommodations />} />
        <Route path='/room-details' element={<RoomDetails />} />
        <Route path='/checkout' element={<Checkout />} />
      </Routes>
    </Router>
    
  );
}

export default App;
