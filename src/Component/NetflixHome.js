import React from 'react';
import { Link } from 'react-router-dom';
import { useState,useEffect} from 'react';
import '../css/NetflixHome.css'; // Your styles
import Featured from '../Featured/Featured';
import NowPlaying from '../NowPlay/NowPlaying';
import Toprated from '../TopRated/Toprated';
export default function NetflixHome() 
{
  const [trailerKey, setTrailerKey] = useState(null);  
  const myoptions = {
  method: 'GET',
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZjY3MjZhMWNiMGM1MDg2YTUxNzU2NmM5OTQxM2E1ZCIsIm5iZiI6MTc0MjE1MTY0NS42ODcsInN1YiI6IjY3ZDcxZmRkOTE2NWYzNzExODAxNTRiYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.27R3zBnJjnpkLma_TK50z5wvFAp1fjZcuf94CUm8sJ4',
    Accept: 'application/json'
  }
};
  useEffect(()=>{
  fetch(`https://api.themoviedb.org/3/movie/1450599/videos?language=en-US`, myoptions)
    .then(response => response.json())
      .then(response => {
      const trailer = response.results.find(
        video => video.type === 'Trailer' && video.site === 'YouTube'
      );
      if (trailer) {
        setTrailerKey(trailer.key);
      } else {
        console.warn('No YouTube trailer found.');
      }
    })
    .catch(error => console.error('Error fetching video data:', error));
  },[])
  
  return (
    <>
    <div className='maincontent'>
         {/* Video background 
      <video className="background-video" autoPlay loop muted>
        <source src="../images/video1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>*/}
      {trailerKey && (
    <iframe
      className="background-video"
      src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerKey}`}
      frameBorder="0"
      allow="autoplay; fullscreen"
      allowFullScreen
      title="Background Trailer"
    ></iframe>
    )}
      {/* Navbar */}v
    <nav className="mynavbar">
        <div className="logo">
          <img src="./images/netflixlogo.png" alt="Netflix Logo" />
        </div>
        <ul className="nav-links">
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
        </ul>
        <div className="mybtn">
          <Link to={"/SignIn"} className='Last_link'>SignOut</Link>
        </div>
      </nav>
      {/* Main Content */}
        <div className='img_thumb' >
            <img src="../images/delicious.webp" className='banner-img'/>
            <p className="banner-description">
             An idyllic vacation in the French countryside <br/>spirals into a dangerous game 
            of manipulation <br/>when a German family takes in an injured young woman.</p>
        <div className="banner-buttons">
          <button className="banner-btn play-btn">Play</button>
          <button className="banner-btn info-btn">More Info</button>
        </div>
        </div>
    </div>   
    <div className='featured_content'>
   <Featured/>  
   </div>
   <div className='NowPlaying_content'>
   <NowPlaying/>
   </div> 
   <div className='top_ratedvideo'>
    <Toprated/>
   </div>
   {/* footer */}
   <div className='footNetflix'>
       <div className="footer-column">
    <img src="./images/netflixlogo.png" alt="Netflix Logo" className="footer-logo" />
    <p>@ Netflix India</p>
  </div>
  <div className="footer-column">
    <ul>
      <li>Audio and Subtitles</li>
      <li>Media Center</li>
      <li>Privacy</li>
      <li>Contact Us</li>
    </ul>
  </div>
  <div className="footer-column">
    <ul>
      <li>Help Center</li>
      <li>Jobs</li>
      <li>Cookie Preferences</li>
      <li>Legal Notices</li>
    </ul>
  </div>
   </div>
  </>
  );
}
