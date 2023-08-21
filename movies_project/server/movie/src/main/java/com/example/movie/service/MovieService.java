package com.example.movie.service;

import java.util.List;

import com.example.movie.model.Movie;

public interface MovieService {
    public void postMovie(Movie movie);
    public List<Movie> getMoviesLike(String name);
    public List<Movie> getMovies();
    public Movie getMovie(int id);
    public void updateMovie(int id, Movie movie);
    public void deleteMovie(int id);
}
