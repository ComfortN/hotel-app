// import React, { useState } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { FaGoogle, FaFacebook, FaTwitter } from 'react-icons/fa';
// import { auth } from '../../firebase/firebase';
// import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { useDispatch } from 'react-redux';
// import { setUser } from '../../redux/userSlice';
// import Loader from '../loader/Loader';
// import Alert from '../alert/Alert';

// export default function Signin() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [alert, setAlert] = useState(null);

//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const location = useLocation();

//   // Function to handle signin form submission
//   const handleSignin = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setAlert(null);

//     try {
//       const usercredentals = await signInWithEmailAndPassword(auth, email, password);
//       dispatch(setUser(usercredentals.user))
//       setAlert({ type: 'success', message: 'Successfully logged in!' });
//       const redirectTo = location.state?.from?.pathname || '/';
//       navigate(redirectTo);
//     } catch (error) {
//       console.error("Error signing in:", error.message);
//       setAlert({ type: 'error', message: error.message });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Handle sign in with Google
//   const handleGoogleSignin = async () => {
//     setIsLoading(true);
//     const provider = new GoogleAuthProvider();
//     try {
//       const result = await signInWithPopup(auth, provider);
//       dispatch(setUser(result.user))
//       setAlert({ type: 'success', message: 'Successfully logged in with Google!' });
//       navigate("/");
//     } catch (error) {
//       console.error("Error with Google signin:", error.message);
//       setAlert({ type: 'error', message: error.message });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="auth-container">
//       {isLoading && <Loader />}
      
//       <div className="auth-message-container-signin">
//         <h2>Hi, Welcome</h2>
//         <p>To sign up with your details</p>
//         <Link to="/signup">
//           <button>Sign Up</button>
//         </Link>
//       </div>

//       <div className="auth-form-container">
//         <h2>Sign In</h2>

//         {alert && <Alert type={alert.type} message={alert.message} />}

//         <div className="auth-icons">
//           <FaGoogle onClick={handleGoogleSignin}/>
//           <FaFacebook />
//           <FaTwitter />
//         </div>

//         <form onSubmit={handleSignin}>
//           <input type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
//           <input type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
//           <button type="submit" disabled={isLoading}>Sign In</button>
//         </form>

//         <Link to="/forgot-password">
//           <p className="forgot-password-link">Forgot Password?</p>
//         </Link>
//       </div>
//     </div>
//   )
// }



import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaGoogle, FaFacebook, FaTwitter } from 'react-icons/fa';
import { auth } from '../../firebase/firebase';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/userSlice';
import Loader from '../loader/Loader';
import Alert from '../alert/Alert';

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleSignin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setAlert(null);

    try {
      const usercredentals = await signInWithEmailAndPassword(auth, email, password);
      dispatch(setUser(usercredentals.user))
      setAlert({ type: 'success', message: 'Successfully logged in!' });
      const redirectTo = location.state?.from?.pathname || '/';
      setTimeout(() => navigate(redirectTo), 2000); // Delay navigation to show alert
    } catch (error) {
      console.error("Error signing in:", error.message);
      setAlert({ type: 'error', message: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignin = async () => {
    setIsLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      dispatch(setUser(result.user))
      setAlert({ type: 'success', message: 'Successfully logged in with Google!' });
      setTimeout(() => navigate("/"), 2000); // Delay navigation to show alert
    } catch (error) {
      console.error("Error with Google signin:", error.message);
      setAlert({ type: 'error', message: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {isLoading && <Loader />}
      
      <div className="auth-message-container-signin">
        <h2>Hi, Welcome</h2>
        <p>To sign up with your details</p>
        <Link to="/signup">
          <button>Sign Up</button>
        </Link>
      </div>

      <div className="auth-form-container">
        <h2>Sign In</h2>

        {alert && <Alert type={alert.type} message={alert.message} />}

        <div className="auth-icons">
          <FaGoogle onClick={handleGoogleSignin}/>
          <FaFacebook />
          <FaTwitter />
        </div>

        <form onSubmit={handleSignin}>
          <input type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" disabled={isLoading}>Sign In</button>
        </form>

        <Link to="/forgot-password">
          <p className="forgot-password-link">Forgot Password?</p>
        </Link>
      </div>
    </div>
  )
}