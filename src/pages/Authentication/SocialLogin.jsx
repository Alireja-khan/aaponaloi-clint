import React, { useContext, useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate, useLocation } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import { auth } from '../../firebase/firebase.init';
import Swal from 'sweetalert2';
import { FcGoogle } from 'react-icons/fc';

const SocialLogin = () => {
    const [loading, setLoading] = useState(false);
    const {  setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleGoogleSignIn = async () => {
        setLoading(true);
        const provider = new GoogleAuthProvider();

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            setUser(user);

            Swal.fire({
                icon: 'success',
                title: 'Signed in with Google!',
                showConfirmButton: false,
                timer: 1500,
            });

            navigate(from);
        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Google Sign-in Failed',
                text: error.message,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-6">
            <button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className={`w-full flex items-center justify-center gap-3 bg-white border border-gray-300 hover:border-blue-500 shadow-sm py-2 rounded-md transition-all ${loading ? 'opacity-60 cursor-not-allowed' : ''
                    }`}
            >
                <FcGoogle size={20} />
                <span className="font-medium text-gray-700">
                    {loading ? 'Processing...' : 'Continue with Google'}
                </span>
            </button>
        </div>
    );
};

export default SocialLogin;
