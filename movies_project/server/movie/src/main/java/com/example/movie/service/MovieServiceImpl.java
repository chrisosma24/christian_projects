package com.example.movie.service;

import java.util.List;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.movie.model.Movie;
import com.example.movie.repository.MovieRepository;

@Service 
public class MovieServiceImpl implements MovieService{

     @Autowired
     private MovieRepository repository;

     @Override
     public void postMovie(Movie movie){
          this.repository.save(movie);
     }

     @Override
     public List<Movie> getMoviesLike(String name){
          String newName = name.toLowerCase();
          return this.repository.findByNameContaining(newName);
     }

     @Override
     public List<Movie> getMovies(){
          return this.repository.findAll();
     }

     @Override
     public Movie getMovie(int id){
          Optional<Movie> movie = this.repository.findById(id);
          return movie.get();
     }

     @Override
     public void updateMovie(int id, Movie movie){
          Optional<Movie> someMovie = this.repository.findById(id);
          Movie currentMovie = someMovie.get();
          currentMovie.setName(movie.getName());
          currentMovie.setDate(movie.getDate());
          currentMovie.setDescription(movie.getDescription());
          currentMovie.setImage(movie.getImage());
          currentMovie.setUsername(movie.getUsername());
          this.repository.save(currentMovie);
     }

     @Override
     public void deleteMovie(int id){
          this.repository.deleteById(id);
     }


}
