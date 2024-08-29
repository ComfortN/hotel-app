import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signin from './Components/signIn/Signin';
import Signup from './Components/signup/Signup';
import Home from './Components/home/Home';
import ForgotPassword from './Components/signIn/ForgotPassword';
import Accommodations from './Components/Accommodations/Accommodations';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='forgot-password' element={<ForgotPassword />} />
        <Route path='/' element={<Home />} />
        <Route path='/accommodations' element={<Accommodations />} />
      </Routes>
    </Router>
    
  );
}

export default App;
