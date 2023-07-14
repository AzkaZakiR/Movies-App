import React from "react";
import { Counter } from "./features/counter/Counter";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import RegisterForm from "./views/Register";
import HeaderTop from "./views/header";
import Loginpage from "./views/Login";
import MovieList from "./views/movie/MovieList";
import MovieDetail from "./views/movie/MovieDetail";
import SeatBookingPage from "./views/movie/SeatsPage";
import TransactionHistory from "./views/user/TransactionHistory";
import DetailProfile from "./views/user/profile";
import ConfirmTransaction from "./views/movie/confirmTransaction";
import { Navigate } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <HeaderTop />
      <BrowserRouter>
        <Routes>
          <Route path="/register" Component={RegisterForm} />
          <Route path="/login" Component={Loginpage} />
          <Route path="/home" Component={MovieList} />
          <Route path="/movie" Component={MovieDetail} />
          <Route path="/movies/:id" Component={MovieDetail} />
          <Route path="/movies/shows/:id" Component={SeatBookingPage} />
          {/* Component={<PrivateRoute Component={<SeatBookingPage />} />} */}
          <Route path="/profile/:id" Component={DetailProfile} />
          <Route path="/history" Component={TransactionHistory} />
          <Route path="/transactions" Component={ConfirmTransaction} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
