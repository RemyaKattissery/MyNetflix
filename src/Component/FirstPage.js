import React from 'react'
import '../css/FirstPage.css'
import { Link} from 'react-router-dom';
export default function FirstPage({Email,setEmail}) {
  
    const handleChangeEmail =(e)=>
    {
        setEmail(e.target.value);
    }
 
  return (
    <div className='first_container'>
        <div className='top_bar'>
        <div className='mylogo'>
            <img src='./images/netflixlogo.png'/>
        </div>
        <div className='mylang'>
            <div className='language'>
                <select>
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                </select>
            </div>
            <div className='btn_signIn'>
            <Link to="/SignIn">
                <button>SignIn</button>
            </Link>
            </div>
        </div>
        </div>
        <div className='sub_content'>
            <div className='firstp'>
              <p>Unlimited movies, TV shows and more</p>
            </div>
            <div className='secp'>
              <p>Starts at ₹149. Cancel at any time.</p>
            </div>
            <div className='thirdp'>
             <p>Starts at ₹149. Cancel at any time..</p>
            </div>
            <div className='fourthp'>
                <p>Ready to watch? Enter your email to create or restart your membership.</p>
            </div>
            <div className='input_type'>
            <div>  
            <input
                type="email"
                value={Email}
                onChange={handleChangeEmail}     
                placeholder="Enter your email"
                className="email_input"
                required
              />              
            </div>
            <div>
            <Link to="/Signup">
              <button type="submit" className='getstarted'>
                Get Started
                </button>           
            </Link>
            </div>
           
        </div>
        </div>
    </div>
  )
}
