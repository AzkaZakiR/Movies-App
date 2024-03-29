import { seatsObject } from "./Seats";
export const showTimesdata = [
  {
    id: "1",
    date: "2023-06-15",
    seats: {
      seatsObject,
    },
    studios: 1,
    startAt: "16:00",
    movieId: 1,
  },
  {
    id: "2",
    date: "2023-06-16T15:30:00Z",
    seats: {
      A1: true,
      A2: true,
      A3: true,
      B1: false,
      B2: true,
      B3: false,
    },
    studios: 2,
    movieId: 2,
  },
  {
    id: "4",
    date: "2023-06-16T15:30:00Z",
    seats: {
      A1: true,
      A2: true,
      A3: true,
      B1: false,
      B2: true,
      B3: false,
    },
    studios: 2,
    movieId: 37,
  },
  {
    id: "5",
    date: "2023-06-16T19:30:00Z",
    seats: {
      A1: true,
      A2: true,
      A3: true,
      B1: false,
      B2: true,
      B3: false,
    },
    studios: 2,
    movieId: 37,
  },
  {
    id: "7",
    date: "2023-06-16T11:30:00Z",
    seats: {
      A1: true,
      A2: true,
      A3: true,
      B1: false,
      B2: true,
      B3: false,
    },
    studios: 2,
    movieId: 37,
  },
  {
    id: "8",
    date: "2023-06-17T13:30:00Z",
    seats: {
      A1: true,
      A2: true,
      A3: true,
      B1: false,
      B2: true,
      B3: false,
    },
    studios: 2,
    movieId: 37,
  },
  // Add more showtimes here...
];
