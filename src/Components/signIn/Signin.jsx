import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle, FaFacebook, FaTwitter } from 'react-icons/fa';
import { auth } from '../../firebase/firebase';
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Signin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  // Function to handle signup form submission
  const handleSignin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      console.error("Error signing in:", error.message);
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
          <FaGoogle />
          <FaFacebook />
          <FaTwitter />
        </div>

        <form onSubmit={handleSignin}>
          <input type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Sign In</button>
        </form>

      </div>

    </div>
  )
}
