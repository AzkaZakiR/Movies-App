import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MovieDetail = () => {
    const {id} = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        // Fetch movie detail based on the ID
        const fetchMovieDetail = async () => {
          try {
            const response = await axios.get(`http://localhost:4000/movies/${id}`);
            setMovie(response.data);
            console.log(response.data);
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchMovieDetail();
      }, [id]);

      if(!movie){
        return <div>Loading...</div>
      }

  return (
    <div className="flex flex-row">
      <div className="col-3">
        <img src={movie.poster} />
      </div>
      <div className="w-full lg:w-1/2 p-4">
        <h2 className="text-2xl font-bold mb-4">{movie.title}</h2>
        <div className="my-8">
          <ul className='font-semibold'> 
            <li> 
                <span> Director: </span> {movie.director}
            </li>
            <li> 
                {/* <span> Genre: </span> {movie.genre} */}
            </li>
            <li> 
                <span> Duration: </span> {movie.duration}
            </li>
            <li> 
                <span> Rating: </span> {movie.rating}
            </li>
            <li> 
                <span> Subtitle: </span> {movie.subtitle}
            </li>
            <li> 
                <span> Movie Format: </span> 2D
            </li>
          </ul>
        </div>
        <h3 className="text-lg font-bold mb-2">Synopsis</h3>
        <p>
          {movie.description}
        </p>
        <button className="bg-red-500 text-white py-2 px-4 my-4 rounded w-full">
          Buy Ticket
        </button>
      </div>
    </div>
  );
};

export default MovieDetail;
