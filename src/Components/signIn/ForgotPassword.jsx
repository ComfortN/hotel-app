import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import '../signup/Signup.css'

export default function ForgotPassword() {
    const [email, setEmail] = useState("");

    // Function to handle password reset
    const handleResetPassword = async (e) => {
        e.preventDefault();

        try {
            // Send password reset email
            await sendPasswordResetEmail(auth, email);
            alert('Password reset email sent!');
        } catch (error) {
            console.error("Error sending password reset email:", error.message);
            alert(error.message);
        }
    };


    return (
        <div className="auth-container">
            <div className="auth-form-container">
                <h2>Reset Password</h2>

                <form onSubmit={handleResetPassword}>
                    <input type="email" placeholder="Enter your email" required onChange={(e) => setEmail(e.target.value)} />
                    <button type="submit">Reset Password</button>
                </form>
                
                <Link to="/signin">
                    <button className='back-signup'>Back SignIn</button>
                </Link>
            </div>
    </div>
    )
}
