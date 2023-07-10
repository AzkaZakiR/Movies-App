import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [movieSchedule, setMovieSchedule] = useState([]);
  const [showSchedule, setShowSchedule] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState([]);
  const [dates, setDates] = useState(["2023-06-15", "2023-06-16", "2023-06-17", "2023-06-18", "2023-06-19", "2023-06-20", "2023-06-21"]);
  const [selectedDate, setSelectedDate] = useState(dates[0]);

  const handleDateClick = async (date) => {
    setSelectedDate(date);
    const temp = date.split("-");
    // const month = movieSchedule.date.slice(0, 10);
    let tglBaru = "2023-" + temp[1] + "-" + temp[0];
    try {
      const jadwal = await axios.post(`http://localhost:4000/jadwal/${id}`, {
        date: tglBaru,
      });
      if (!jadwal) {
        <h2> No schedule is found</h2>;
      }
      setSelectedSchedule(jadwal.data);
      console.log(jadwal.data);
    } catch (error) {
      console.log(error);
    }
    // setSelectedSchedule(le);
    console.log("Tanggal: " + tglBaru);
    console.log("type Tanggal: " + typeof tglBaru);
  };

  const handleBuyTicket = () => {
    setShowSchedule(!showSchedule);
  };

  useEffect(() => {
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

  useEffect(() => {
    const fetchMovieSchedule = async () => {
      try {
        const jadwal = await axios.get(`http://localhost:4000/movies/date/${id}`);
        setMovieSchedule(jadwal.data.response);
        console.log(jadwal.data.response);
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

  return (
    <div className="flex flex-row justify-center items-center">
      <div className="col-3 my-4">
        <img src={movie.poster} />
      </div>
      <div className="w-full lg:w-1/2 p-4">
        <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
        <div className="my-4">
          <ul className="font-semibold">
            <li>
              <span className="grid grid-cols-3">
                <span className="font-bold">Director</span>
                <span>:{movie.director}</span>
              </span>
            </li>
            <li>
              <span className="grid grid-cols-3">
                <span className="font-bold">Duration</span>
                <span>:{movie.duration}</span>
              </span>
            </li>
            <li>
              <span className="grid grid-cols-3">
                <span className="font-bold">Rating:</span>
                <span>:{movie.rating}</span>
              </span>
            </li>
            <li>
              <span className="grid grid-cols-3">
                <span className="font-bold">Subtitle:</span>
                <span>:{movie.subtitle}</span>
              </span>
            </li>
            <li>
              <span className="grid grid-cols-3">
                <span className="font-bold">Movie Format:</span>
                <span>{movie.movie_format}</span>
              </span>
            </li>
          </ul>
        </div>
        <h3 className="text-lg font-bold mb-2">Synopsis</h3>
        <p className="mb-2">{movie.description}</p>
        <button className="bg-red-700 text-white py-2 px-4 mb-2 rounded w-full" onClick={handleBuyTicket}>
          Buy Ticket
        </button>
        {showSchedule && (
          <div>
            <div className="flex justify-center mb-4 text-blue-400">
              <div>
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
                  <div key={date} className={` block rounded-lg border ${selectedDate === date ? "bg-red-500 font-bold text-slate-50  border-white" : "border-red-700"} p-2 text-red-400`} onClick={() => handleDateClick(date)}>
                    <h3>{date}</h3>
                  </div>
                </a>
              ))}
            </div>
            <div className="grid   md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 my-6">
              {/* ... */}
              {selectedSchedule.map((schedule) => (
                <Link to={`/movies/shows/${schedule.id}`} key={schedule.id}>
                  <div key={schedule.id} className="block rounded-lg bg-white border border-black text-black p-2">
                    <p>{schedule.startAt}</p>
                  </div>
                </Link>
              ))}
              <div className="block rounded-lg bg-black border border-black text-white p-2">
                <p>16.00</p>
              </div>
            </div>
          </div>
        )}
        {/* {movieSchedule.map((jadwals) => (
                      <div className="block rounded-lg bg-black text-white p-2" key={jadwals.id}>
                        <h1>{jadwals.startAt}</h1>
                      </div>))} */}
        {/* <div className="grid   md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 my-6">
          {movieSchedule.map((jadwals) => (
            <div className="block rounded-lg bg-black text-white p-2" key={jadwals.id}>
              <h1>{jadwals.startAt}</h1>
              <h2>{jadwals.date}</h2>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default MovieDetail;
