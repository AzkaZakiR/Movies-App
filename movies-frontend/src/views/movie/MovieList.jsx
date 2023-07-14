import React, { useEffect, useState } from "react";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";
import { Link } from "react-router-dom";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const { mutate } = useSWRConfig();

  // useEffect(() => {
  //   fetchMovies();
  // }, []);
  const fetchMovies = async () => {
    try {
      const response = await axios.get("http://localhost:4000/movies");
      setMovies(response.data.response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const { data } = useSWR("movies", fetchMovies);
  console.log(typeof data);
  console.log(data);
  if (!data) return <h2>Loading....</h2>;

  return (
    <div className=" bg-gradient-to-r from-black to-red-800">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-4 text-white">Now Playing</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 rounded  ">
          {movies.map((movie) => (
            <Link to={`/movies/${movie.id}`} key={movie.id}>
              <div key={movie.id} className=" rounded  hover:shadow-lg hover:shadow-slate-50 box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px; ">
                <div className="aspect-w-2 aspect-h-3">
                  <img src={movie.poster} alt={movie.title} className="object-cover rounded-t " />
                </div>
                <div className="p-2 text-white border border-opacity-20 border-white  ">
                  <h2 className="text-xl font-bold mb-2 hover:text-2xl">{movie.title}</h2>
                  <div className="columns-">
                    <p className="">{movie.director}</p>
                    <p className="">{movie.rating}+</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
