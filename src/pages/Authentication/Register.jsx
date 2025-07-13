import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import { useNavigate, useLocation, Link } from 'react-router';
import Swal from 'sweetalert2';
import { updateProfile } from 'firebase/auth';
import { motion, AnimatePresence } from 'framer-motion';
import SocialLogin from './SocialLogin';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const containerVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, x: 50, transition: { duration: 0.4 } },
};

const imgbbKey = import.meta.env.VITE_img_upload_key;

const Register = () => {
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [previewImage, setPreviewImage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(data.password)) {
      Swal.fire({
        icon: 'error',
        title: 'Weak Password',
        text: 'Password must have at least 6 characters, one uppercase, and one lowercase letter.',
      });
      setLoading(false);
      return;
    }

    try {
      let photoURL = '';
      if (data.photo[0]) {
        const formData = new FormData();
        formData.append('image', data.photo[0]);

        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
          formData
        );

        if (res.data.success) {
          photoURL = res.data.data.url;
        } else {
          throw new Error('Image upload failed');
        }
      }

      const result = await createUser(data.email, data.password);

      await updateProfile(result.user, {
        displayName: data.name,
        photoURL: photoURL || '',
      });

      Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        text: 'Welcome to the platform!',
        timer: 1500,
        showConfirmButton: false,
      });

      reset();
      setSelectedFileName('');
      setPreviewImage('');
      navigate(from, { replace: true }); // Redirect to previous page
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: error.message || 'Something went wrong',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="register"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="relative w-full bg-white p-8 rounded-lg max-w-md mx-auto min-h-[500px]"
      >
        {/* Overlay loader */}
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50 rounded-lg">
            <span className="loading loading-bars loading-xl text-blue-600"></span>
          </div>
        )}

        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create an Account</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              {...register('name', { required: 'Full name is required' })}
              placeholder="Your name"
              className={`mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                  message: 'Invalid email address',
                },
              })}
              placeholder="you@example.com"
              className={`mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password', {
                  required: 'Password is required',
                })}
                placeholder="••••••••"
                className={`mt-1 w-full px-4 py-2 border rounded-md pr-10 focus:ring-2 focus:ring-blue-500 ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Profile Photo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Profile Photo</label>
            <div className="relative w-full">
              <input
                type="file"
                id="photo-upload"
                accept="image/*"
                {...register('photo')}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setSelectedFileName(file.name);
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setPreviewImage(reader.result);
                    };
                    reader.readAsDataURL(file);
                  } else {
                    setSelectedFileName('');
                    setPreviewImage('');
                  }
                }}
                className="absolute inset-0 opacity-0 z-50 cursor-pointer"
              />
              <div className="w-full border border-gray-300 rounded-md px-4 py-2 flex items-center justify-between text-sm bg-white shadow-sm">
                <span className="text-gray-700 truncate">
                  {selectedFileName || 'Choose an image to upload'}
                </span>
                <button
                  type="button"
                  className="ml-4 px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition"
                >
                  Browse
                </button>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full font-semibold py-2 rounded-md transition ${
              loading
                ? 'bg-gray-400 cursor-not-allowed text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            Register
          </button>
        </form>

        <div className="my-6 text-center text-gray-500">or</div>

        <SocialLogin onClick={() => {}} disabled={loading}>
          Sign Up with Google
        </SocialLogin>

        <p className="mt-6 text-sm text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </AnimatePresence>
  );
};

export default Register;
