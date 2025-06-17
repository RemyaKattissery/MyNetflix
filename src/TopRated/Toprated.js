import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../TopRated/Toprated.css'
export default function Toprated() {
    const [tprated ,setprated] =useState([]);
    const videoTopRef=useRef(null);//create a user Resf for video row
    useEffect(()=>{
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZjY3MjZhMWNiMGM1MDg2YTUxNzU2NmM5OTQxM2E1ZCIsIm5iZiI6MTc0MjE1MTY0NS42ODcsInN1YiI6IjY3ZDcxZmRkOTE2NWYzNzExODAxNTRiYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.27R3zBnJjnpkLma_TK50z5wvFAp1fjZcuf94CUm8sJ4'
            }
          };          
          fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
            .then(res => res.json())
            .then(res =>{
                setprated(res.results) }
            )
            .catch(err => console.error(err));
    },[])  
    const scrollRight = () => {
        if (videoTopRef.current) {
          videoTopRef.current.scrollBy({
            left: 240, // Scroll by 240px (width of an image)
            behavior: 'smooth', // Smooth scrolling
          });
        }
      };
    
      // Scroll to the left when the arrow is clicked
      const scrollLeft = () => {
        if (videoTopRef.current) {
          videoTopRef.current.scrollBy({
            left: -240, // Scroll by -240px (scroll to the left)
            behavior: 'smooth', // Smooth scrolling
          });
        }
      };    
  return (
    <div className='Toprated-videos'>
        <h2>TopRated</h2>
      <div className='top-rated' ref={videoTopRef}>
      {tprated.map((video) => (
        <Link to={`/movie/${video.id}`} key={video.id} className="card-link">
          <Card key={video.id}style={{ width: '240px' }} className="video-thumbnail">
            <Card.Img
              variant="top"
              className='imglist'
              src={`https://image.tmdb.org/t/p/w500${video.poster_path}`} // TMDb image URL
              alt={video.title} 
            />
            <Card.Body style={{"width":"92%"}}>
              <div className="hero-banner"  style={{"width":"80%"}}>
                <div className="hero-btn" >
                  <div className="play">
                    <i className="bi bi-play-fill" style={{ fontSize: '20px' }}></i>
                  </div>
                  <div>
                    <i className="bi bi-plus" style={{ fontSize: '20px' }}></i>
                  </div>
                  <div>
                    <i className="bi bi-hand-thumbs-up" style={{ fontSize: '20px' }}></i>
                  </div>
                </div>
                <div className="pinpt">
                  <div><p>{video.adult ? 'U/A 18+' : 'U/A 13+'}</p></div>
                  <div><p>2hr30min</p></div>
                </div>
                <div className='pinpt2'>{video.title}</div>
              </div>
            </Card.Body>
          </Card>
          </Link>
        ))}
      </div>
      <div className="scroll_top">
    <div className='leftscroll_top'> <button onClick={scrollLeft} >&#9664;</button> </div>
   <div className='rightscroll_top'><button onClick={scrollRight} >&#9654;</button></div> {/* Right Arrow */}
      </div>
    </div>
  )
}
