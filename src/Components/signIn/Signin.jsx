import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle, FaFacebook, FaTwitter } from 'react-icons/fa';
import { auth } from '../../firebase/firebase';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/userSlice';

export default function Signin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();


  // Function to handle signin form submission
  const handleSignin = async (e) => {
    e.preventDefault();

    try {
      const usercredentals = await signInWithEmailAndPassword(auth, email, password);
      dispatch(setUser(usercredentals.user))
      alert('successfull login')
      navigate("/");
    } catch (error) {
      console.error("Error signing in:", error.message);
      alert(error.message);
    }
  };


  // Handle sign in with Google
  const handleGoogleSignin = async () => {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        dispatch(setUser(result.user))
        navigate("/");
    } catch (error) {
        console.error("Error with Google signin:", error.message);
        alert(error.message);
    }
};


  return (
    <div className="auth-container">
      
      <div className="auth-message-container-signin">

        <h2>Hi, Welcome</h2>

        <p>To sign up with your details</p>

        <Link to="/signup">
          <button>Sign Up</button>
        </Link>

      </div>

      <div className="auth-form-container">

        <h2>Sign In</h2>

        <div className="auth-icons">
          <FaGoogle onClick={handleGoogleSignin}/>
          <FaFacebook />
          <FaTwitter />
        </div>

        <form onSubmit={handleSignin}>
          <input type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Sign In</button>
        </form>

        <Link to="/forgot-password">
          <p className="forgot-password-link">Forgot Password?</p>
        </Link>

      </div>

    </div>
  )
}
