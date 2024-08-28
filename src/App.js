import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signin from './Components/signIn/Signin';
import Signup from './Components/signup/Signup';
import Home from './Components/home/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </Router>
    
  );
}

export default App;
