import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPopularMovies, searchMovies } from '../../services/tmdbApi';

export const getPopularMovies = createAsyncThunk('movies/getPopular', async () => {
  const data = await fetchPopularMovies();
  return data;
});

export const searchMovie = createAsyncThunk('movies/search', async (query) => {
  const data = await searchMovies(query);
  return data;
});

const movieSlice = createSlice({
  name: 'movies',
  initialState: { movies: [], status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPopularMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
        state.status = 'succeeded';
      })
      .addCase(searchMovie.fulfilled, (state, action) => {
        state.movies = action.payload;
      });
  },
});

export default movieSlice.reducer;
