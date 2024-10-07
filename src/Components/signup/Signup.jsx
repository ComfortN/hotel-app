// import React, {useState} from 'react'
// import './Signup.css'
// import { Link, useNavigate } from 'react-router-dom';
// import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
// import { auth } from '../../firebase/firebase';
// import { FaGoogle, FaFacebook, FaTwitter } from 'react-icons/fa';
// import { useDispatch } from 'react-redux';
// import { setUser } from '../../redux/userSlice';
// import { addUserToFirestore } from '../../firebase/firestoreUtils';


// export default function Signup() {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");
//     const navigate = useNavigate();
//     const dispatch = useDispatch();


//     // Function to handle signup form submission
//     const handleSignup = async (e) => {
//         e.preventDefault();

//         if (password !== confirmPassword) {
//             alert("Passwords do not match");
//             return;
//         }

//         try {
//             const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
//             const user = userCredentials.user;
//             dispatch(setUser(user));
//             // Add user to Firestore
//             await addUserToFirestore({ uid: user.uid, email: user.email,});

//             alert('Successful signup')
//             navigate("/signin");
//         } catch (error) {
//             console.error("Error signing up:", error.message);
//             alert(error.message);
//         }
//     };


//     // Handle sign in with Google
//     const handleGoogleSignup = async () => {
//         const provider = new GoogleAuthProvider();
//         try {
//             const result = await signInWithPopup(auth, provider);
//             const user = result.user;
//             dispatch(setUser(user));

//             // Add user to Firestore
//             await addUserToFirestore({ uid: user.uid, email: user.email, });

//             navigate("/");
//         } catch (error) {
//             console.error("Error with Google signup:", error.message);
//             alert(error.message);
//         }
//     };


//     return (
//         <div className="auth-container">
//             <div className="auth-form-container">

//                 <h2>Sign Up</h2>

//                 <div className="auth-icons">
//                     <FaGoogle onClick={handleGoogleSignup}/>
//                     <FaFacebook />
//                     <FaTwitter />
//                 </div>

//                 <form onSubmit={handleSignup}>
//                     <input type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
//                     <input type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
//                     <input type="password" placeholder="Confirm Password" required onChange={(e) => setConfirmPassword(e.target.value)} />
//                     <button type="submit">Sign Up</button>
//                 </form>
                
//             </div>

//             <div className="auth-message-container">
//                 <h2>Welcome Back</h2>
//                 <p>To sign in with your details</p>
//                 <Link to="/signin">
//                     <button>Sign In</button>
//                 </Link>
//             </div>

//         </div>
//     )
// }




import React, { useState } from 'react'
import './Signup.css'
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { FaGoogle, FaFacebook, FaTwitter } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/userSlice';
import { addUserToFirestore } from '../../firebase/firestoreUtils';
import Loader from '../loader/Loader';
import Alert from '../alert/Alert';

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [alert, setAlert] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Function to handle signup form submission
    const handleSignup = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setAlert(null);

        if (password !== confirmPassword) {
            setAlert({ type: 'error', message: "Passwords do not match" });
            setIsLoading(false);
            return;
        }

        try {
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredentials.user;
            dispatch(setUser(user));
            // Add user to Firestore
            await addUserToFirestore({ uid: user.uid, email: user.email });

            setAlert({ type: 'success', message: 'Successful signup' });
            setTimeout(() => navigate("/signin"), 2000);
        } catch (error) {
            console.error("Error signing up:", error.message);
            setAlert({ type: 'error', message: error.message });
        } finally {
            setIsLoading(false);
        }
    };

    // Handle sign in with Google
    const handleGoogleSignup = async () => {
        setIsLoading(true);
        setAlert(null);
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            dispatch(setUser(user));

            // Add user to Firestore
            await addUserToFirestore({ uid: user.uid, email: user.email });

            setAlert({ type: 'success', message: 'Successfully signed up with Google' });
            setTimeout(() => navigate("/"), 2000);
        } catch (error) {
            console.error("Error with Google signup:", error.message);
            setAlert({ type: 'error', message: error.message });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            {isLoading && <Loader />}
            
            <div className="auth-form-container">
                <h2>Sign Up</h2>

                {alert && <Alert type={alert.type} message={alert.message} />}

                <div className="auth-icons">
                    <FaGoogle onClick={handleGoogleSignup}/>
                    <FaFacebook />
                    <FaTwitter />
                </div>

                <form onSubmit={handleSignup}>
                    <input type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
                    <input type="password" placeholder="Confirm Password" required onChange={(e) => setConfirmPassword(e.target.value)} />
                    <button type="submit" disabled={isLoading}>Sign Up</button>
                </form>
            </div>

            <div className="auth-message-container">
                <h2>Welcome Back</h2>
                <p>To sign in with your details</p>
                <Link to="/signin">
                    <button>Sign In</button>
                </Link>
            </div>
        </div>
    )
}