import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signin from './Components/signIn/Signin';
import Signup from './Components/signup/Signup';
import Home from './Components/home/Home';
import ForgotPassword from './Components/signIn/ForgotPassword';
import Accommodations from './Components/Accommodations/Accommodations';
import RoomDetails from './Components/room/Room';
import Checkout from './Components/checkout/Checkout';
import PaymentSuccess from './Components/payment/PaymentSuccess';
import ContactUs from './Components/contactUs/ContactUs';
import AboutUs from './Components/aboutUs/AboutUs';
import ProfilePage from './Components/profilePage/ProfilePage';
import Gallery from './Components/gallery/Gallery';
import ReviewForm from './Components/reviews/ReviewForm';

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
        <Route path='/successful-payment' element={<PaymentSuccess />} />
        <Route path="/payment-success/:receiptId" element={<PaymentSuccess />} />
        <Route path='/contact-us' element={<ContactUs />} />
        <Route path='/about-us' element={<AboutUs />} />
        <Route path='/profile-page' element={<ProfilePage />} />
        <Route path='gallery' element={<Gallery />} />
        <Route path="/review/:bookingId" element={<ReviewForm />} />
      </Routes>
    </Router>
    
  );
}

export default App;
