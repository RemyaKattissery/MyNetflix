import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../css/SignIn.css';  

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Form validation
  const validateForm = () => {
    const validationErrors = {};
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!formData.email) {
      validationErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      validationErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      validationErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      validationErrors.password = 'Password must be at least 6 characters long';
    }

    return validationErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    // Validate form data
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/login', {
        Email: formData.email,
        password: formData.password
      });

      if (response.status === 200) {
        const { token, user } = response.data;
        alert(`Welcome, ${user.email}`);
        localStorage.setItem('token', token); // Save token
        localStorage.setItem('userName', user.email); // Save userName
        setFormData({
          email: '',
          password: ''
        });
        setErrors({}); // Clear any validation errors
        navigate('/NetflixHome'); // Redirect after login
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Invalid credentials. Please try again.');
    }
  };

  

  return (
    <div className='themylogo'>
      <img src='./images/netflixlogo.png' alt="Netflix Logo" />       
      <div className="sign_incontainer">        
        <div className="sign_in_card">  
          <div className='heading'>
            <p>Sign In</p>
          </div>    
          <form onSubmit={handleSubmit}> {/* Wrapping inputs in a form */}
            <div className="input_group">
              <input
                type="email"
                name="email"
                className="moboremail"
                placeholder="Email or Mobile number"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <p className="error">{errors.email}</p>} {/* Show error if exists */}
            </div>
            <div className="input_group">
              <input
                type="password"
                name="password"
                className="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />            
            </div>
            <div className="sign_in_button">
              <button type="submit"> {/* Disable button while loading */}
                Sign In
              </button>
            </div>
          </form>
                  
          <div>
            <Link to="/forgot-password" className="forgot-password-link" style={{ textDecoration: 'none',"fontSize":"15px" }}>
              <p>Forgot password?</p>
            </Link>
          </div> 
          <div className='check_rem'>
            <input 
              type="checkbox" 
              id="remember_me" 
              className="remember_me_checkbox"
            />
            <label className='rember'>Remember me</label>
          </div>
          <div className='New_netflix'>
            <div className='my_net'>
              <p>New to Netflix?</p>
            </div>
            <div className='my_net'>
              <p>
                <Link to="/Signup" className='Sign_link' style={{ textDecoration: 'none', color: 'white', display: 'flex', justifyContent: 'flex-start' }}>
                  Sign up now.
                </Link>
              </p>
            </div>
          </div>
        </div>      
      </div>      
    </div>
  );
}
