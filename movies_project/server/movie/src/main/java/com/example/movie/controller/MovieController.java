package com.example.movie.controller;

import java.io.IOException;
import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.movie.model.Movie;
import com.example.movie.service.MovieServiceImpl;



@RestController
@RequestMapping("/api")
public class MovieController{

    @Autowired
    private MovieServiceImpl service;

    /*@PostMapping("/movie")
    public void postMovie(@RequestBody Movie movie){
        this.service.postMovie(movie);
    }*/

    @PostMapping("/movie")
    public void postMovie(@RequestParam MultipartFile file, @RequestParam String name, @RequestParam String date, @RequestParam String username, @RequestParam String description) throws IOException{
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        if (fileName.contains("..")) {
            System.out.println("not valid path");
        }
        String image = Base64.getEncoder().encodeToString(file.getBytes());
        Movie movie = new Movie(name, date, description, username, image);
        this.service.postMovie(movie);
    }

    @GetMapping("/movies_like")
    public ResponseEntity<List<Movie>> moviesLike(@RequestParam String name){
        List<Movie> movies = this.service.getMoviesLike(name);
        HttpHeaders responseHeaders = new HttpHeaders();
        return new ResponseEntity<List<Movie>>(movies, responseHeaders, HttpStatus.ACCEPTED);
    }

    @GetMapping("/movies")
    public ResponseEntity<List<Movie>> getMovies(){
        List<Movie> movies =  this.service.getMovies();
        HttpHeaders responseHeaders = new HttpHeaders();
        return new ResponseEntity<List<Movie>>(movies, responseHeaders, HttpStatus.ACCEPTED);
    }

    @GetMapping("/movie/{id}")
    public ResponseEntity<Movie> getMovie(@PathVariable int id){
        HttpHeaders responseHeaders = new HttpHeaders();
        Movie movie = this.service.getMovie(id);
        return new ResponseEntity<Movie>(movie, responseHeaders, HttpStatus.ACCEPTED);
    }

    @PutMapping("/movie/{id}")
    public void updateMovie(@PathVariable int id, @RequestParam MultipartFile file, @RequestParam String name, @RequestParam String date, @RequestParam String username, @RequestParam String description) throws IOException{
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        if (fileName.contains("..")) {
            System.out.println("not valid path");
        }
        String image = Base64.getEncoder().encodeToString(file.getBytes());
        Movie movie = new Movie(name, date, description, username, image);
        this.service.updateMovie(id, movie);
    }

    @DeleteMapping("/movie/{id}")
    public void deleteMovie(@PathVariable int id){
        this.service.deleteMovie(id);
    }

    @GetMapping("/test")
    public String test(){
        return "Test from spring";
    }
}