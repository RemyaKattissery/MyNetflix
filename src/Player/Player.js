import React, { useEffect, useState } from 'react'
import '../Player/Player.css'
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useParams } from 'react-router-dom';
export default function Player() {
     const {id}=useParams();
    const [apidata,setApidata]= useState({
        name :"",
        key :"",
        published_at:"",
        type:""
    })
  const options = {
  method: 'GET',
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZjY3MjZhMWNiMGM1MDg2YTUxNzU2NmM5OTQxM2E1ZCIsIm5iZiI6MTc0MjE1MTY0NS42ODcsInN1YiI6IjY3ZDcxZmRkOTE2NWYzNzExODAxNTRiYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.27R3zBnJjnpkLma_TK50z5wvFAp1fjZcuf94CUm8sJ4',
    Accept: 'application/json'
  }
};
useEffect(()=>{
fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
  .then(response => response.json())
  .then(response =>setApidata(response.results[0]))
  .then(data => console.log(data))
  .catch(error => console.error('Error fetching video data:', error));
},[])
  return (
    <div>
        <div className='Player'>           
          <div className='image1'> 
           < Link to="/NetflixHome"><i class="bi bi-arrow-left-short"></i></Link></div>
            <iframe width='90%' height='90%' src={`http://www.youtube.com/embed/${apidata.key}`} title='trailer' 
            frameBorder='0' allowFullScreen></iframe>
             </div>
            <div className='Player-info'>
            <p>{apidata.published_at.slice(0,10)}</p>
            <p>{apidata.name}</p>
            <p>{apidata.type}</p>
            </div>       
    </div>
  )
}
