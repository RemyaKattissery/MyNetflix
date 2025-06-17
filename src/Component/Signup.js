import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/Signup.css';

export default function Signup({ Email }) {
  // State management
  const [formData, setFormData] = useState({
    email: Email,
    password: '',
  });
  const [errors, setErrors] = useState({}); 
  // Basic validation function
  const validate = () => {
    const validationErrors = {};
    if (!formData.password) {
      validationErrors.password = 'Password is required.';
    }
    return validationErrors;
  };
  // Handle form submission
  const handleSubmit = async (e) => 
    {
    e.preventDefault();
    const validationErrors = validate();    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);  
    } 
    else
     {
      try {
        const response = await axios.post('http://localhost:5000/register', 
        {
          Email: formData.email, // Send 'email' to match backend
          password: formData.password,
        });

        if (response.status === 201) {
          alert('User registered successfully!');
          setFormData({
            email: '',
            password: '',
          });
          setErrors({});
        }
      }
       catch (error) {
        // Check if it's a 400 error (duplicate data)
        if (error.response && error.response.status === 400) {
          alert('This email is already registered.');
        } else {
          console.error('Error during registration:', error);
          alert('An error occurred during registration. Please try again later.');
        }
      }
    }
  };
  // Handle changes in form inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
 return (
    <div>
      <div className='secpagerow'>
        <div className='secpageimg'>
          <img src="./images/netwhiite.png" alt="Netflix" />
        </div>
        <div className='signInLink'>
            <Link to="/SignIn" style={{"textDecoration":"none","color":"black","marginRight":"20px","fontWeight":"bold"}}>SignIn</Link>
        </div>
        </div>
        <hr />
         <div className='netflix_content'>
        <p>STEP 1 OF 3</p>
        <div>
          <p>
            Welcome back!<br />
            Joining Netflix is easy.
          </p>
        </div>
        <div>
          <p>Create Your password and you'll be watching in no time.</p>
        </div>
        <div>
          <p>Email</p>
          <div className='Email_name'>{Email}</div>
          <div>
            <input
              type="password"
              placeholder="Enter your password"
              className="password_input"
              required
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
        </div>
        <div className='sec_pagebtn'>
          <button onClick={handleSubmit}>
            NEXT
          </button>
        </div>        
      </div>
    </div>
  );
}
