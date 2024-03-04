import React,{useEffect,useState} from "react";
import {imageUrl, API_KEY, baseURL} from '../../constants/Constants'
import './RowPost.css';
import axios from "axios";
import Youtube from 'react-youtube'

// import ReactPlayer from 'react-player'

function RowPost(props) {
  const [movies, setMovies] = useState([])
  const [urlId,setUrlId] = useState('')

  useEffect(() => {
    axios.get(props.url).then(response=>{
      console.log(response.data)
      setMovies(response.data.results)
    }).catch(err=>{
      console.log(err)
    })
    
  }, [props.url])

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleMovie = (id) => {
    console.log(id);

    axios.get(`${baseURL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
      .then(response => {
        if (response.data.results.length !== 0) {
          setUrlId(response.data.results[0]);
        } else {
          console.log('Array empty');
          alert("no video for this movie")
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          console.error('Movie not found:', error.response.data);
          alert('Movie not found. Redirecting to home page.');
        } else {
          console.error('Error fetching movie:', error.message);
        }
      });
  };

  return (
    <div className="row">
      <h2>{props.title}</h2>
      <div className="posters">
        {movies.map((obj)=>
          
          <img  onClick={()=>handleMovie(obj.id)} className = {props.isSmall ? 'smallPoster' : 'poster'} alt='poster' src={`${imageUrl + obj.backdrop_path}`}></img>
          // <ReactPlayer url={`https://api.themoviedb.org/3/movie/${obj.id}/videos?api_key=${API_KEY}`} />
        )}        
      </div>
      <div>
      {  urlId  && <Youtube opts= {opts} videoId={urlId.key} /> }
      </div>
    </div>
  );
}

export default RowPost;
