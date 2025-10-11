import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './Slices/MovieSlice';

export default configureStore({
  reducer: {
    movies: movieReducer
  }
});
