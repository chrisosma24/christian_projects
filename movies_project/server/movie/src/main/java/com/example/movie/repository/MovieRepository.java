package com.example.movie.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.movie.model.Movie;

public interface MovieRepository extends JpaRepository<Movie, Integer>{

    List<Movie> findByNameContaining(String name);
    
}