import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useFlash } from "../../FlashContext";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [movieSchedule, setMovieSchedule] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState([]);
  const [dates, setDates] = useState(["2023-06-15", "2023-06-16", "2023-06-17", "2023-06-18", "2023-06-19", "2023-06-20", "2023-06-21"]);
  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const { setFlash } = useFlash();

  const handleDateClick = async (date) => {
    setSelectedDate(date);
    const temp = date.split("-");
    // const month = movieSchedule.date.slice(0, 10);
    let tglBaru = "2023-" + temp[1] + "-" + temp[0];
    try {
      const jadwal = await axios.post(`${apiUrl}/jadwal/${id}`, {
        date: tglBaru,
      });
      if (!jadwal) {
        <h2> No schedule is found</h2>;
      }
      setSelectedSchedule(jadwal.data);
    } catch (error) {
      console.log(error);
    }
    // setSelectedSchedule(le);
  };

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await axios.get(`${apiUrl}/movies/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovieDetail();
  }, [id]);

  useEffect(() => {
    const fetchMovieSchedule = async () => {
      try {
        const jadwal = await axios.get(`${apiUrl}/movies/date/${id}`);
        setMovieSchedule(jadwal.data.response);
      } catch (error) {
        console.error("Error fetching movie schedule:", error);
      }
    };
    fetchMovieSchedule();
  }, [id]);

  useEffect(() => {
    // Generate dates for a week starting from today
    const startDate = new Date(2023, 6, 15);
    const endDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    //  endDate.setDate(startDate.getDate() + 1);
    const formattedDates = [];
    while (startDate <= endDate) {
      const formattedDate = formatDate(startDate);
      formattedDates.push(formattedDate);
      startDate.setDate(startDate.getDate() + 1);
    }
    setDates(formattedDates);
  }, []);

  const formatDate = (date) => {
    const month = String(date.getMonth()).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}-${month}`;
  };

  const handleScheduleLinkClick = (schedule) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("User not logged in. Setting flash message.");
      setFlash("You need to log in first.");
      // Optionally, redirect to the login page
      // history.push('/login');
    } else {
      // Continue with your logic to navigate or perform actions for authenticated user
      // For now, you can redirect to the specific schedule
      // history.push(`/movies/shows/${schedule.id}`);
    }
  };

  return (
    <div className="bg-gradient-to-r from-black to-orange-800">
      <div className="flex flex-row justify-center items-center text-slate-200">
        <div className="w-full lg:w-1/2 p-4">
          <div className="flex justify-center">
            {" "}
            <img src={movie.poster} />
          </div>

          <h1 className="text-4xl font-bold my-4 text-center">{movie.title}</h1>
          <div className="my-4">
            <ul className="font-semibold">
              <li>
                <span className="grid grid-cols-3">
                  <span className="font-bold">Director</span>
                  <span>: {movie.director}</span>
                </span>
              </li>
              <li>
                <span className="grid grid-cols-3">
                  <span className="font-bold">Duration </span>
                  <span>: {movie.duration}</span>
                </span>
              </li>
              <li>
                <span className="grid grid-cols-3">
                  <span className="font-bold"> Age Rating:</span>
                  <span>: {movie.rating}</span>
                </span>
              </li>
              <li>
                <span className="grid grid-cols-3">
                  <span className="font-bold">Subtitle:</span>
                  <span>: {movie.subtitle}</span>
                </span>
              </li>
              <li>
                <span className="grid grid-cols-3">
                  <span className="font-bold">Movie Format:</span>
                  <span>:{movie.movie_format}</span>
                </span>
              </li>
              <li>
                <span className="grid grid-cols-3">
                  <span className="font-bold">Ticket Price:</span>
                  <span>:Rp. {movie.price}</span>
                </span>
              </li>
            </ul>
          </div>
          <h3 className="text-lg text-justify font-bold mb-2">Synopsis</h3>
          <p className="mb-2">{movie.description}</p>
          <hr></hr>
          <div>
            <div className="flex justify-center mb-4 text-blue-400 my-2">
              <div className="">
                {" "}
                <h2> Choose your date: </h2>
              </div>

              <div>
                <h2> sunday</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-4">
              {dates.map((date) => (
                <a key={date}>
                  <div
                    key={date}
                    className={`w-20 h-20 rounded-full    border ${selectedDate === date ? "bg-white  text-black  " : "text-white"} cursor-pointer font-mono   border-white border-opacity-10 hover:shadow-white  hover:shadow-sm`}
                    onClick={() => handleDateClick(date)}
                  >
                    <h3 className="m-4">{date}</h3>
                  </div>
                </a>
              ))}
            </div>
            <div className="grid   md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 my-6">
              {/* ... */}
              {selectedSchedule.map((schedule) => (
                <Link to={`/movies/shows/${schedule.id}`} key={schedule.id}>
                  <div
                    disabled={!localStorage.getItem("token")}
                    key={schedule.id}
                    className="font-medium block rounded-lg focus:outline-none focus:ring  border border-white  text-white p-2 hover:bg-white hover:text-black anim transition-colors duration-500"
                  >
                    <p onClick={() => handleScheduleLinkClick(schedule)} disabled={!localStorage.getItem("token")}>
                      {schedule.startAt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
