package com.example.movie.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.movie.model.CreateReview;
import com.example.movie.model.MovieInfo;
import com.example.movie.model.Review;
import com.example.movie.service.ReviewServiceImpl;

@RestController
@RequestMapping("/api")
public class ReviewController {

    @Autowired
    private ReviewServiceImpl service;

    @GetMapping("/reviews/{movieId}/{pageNumber}")
    public ResponseEntity<List<Review>> getReviews(@PathVariable int movieId, @PathVariable int pageNumber){
       List<Review> reviews = this.service.getReviews(movieId, pageNumber); 
       HttpHeaders responseHeaders = new HttpHeaders();
       return new ResponseEntity<List<Review>>(reviews, responseHeaders, HttpStatus.ACCEPTED);
    }

    @GetMapping("/review_info/{movieId}")
    public ResponseEntity<MovieInfo> getMovieInfo(@PathVariable int movieId){
        MovieInfo movieInfo = this.service.getMovieInfo(movieId);
        return new ResponseEntity<MovieInfo>(movieInfo, HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/review/{id}")
    public void deleteReview(@PathVariable int id){
        this.service.deleteReview(id);
    }

    @PostMapping("/review")
    public void postReview(@RequestBody CreateReview review){
        int likes = 0;
        int movieid = review.getMovieid();
        int rating = review.getRating();
        String username = review.getUsername();
        String newReview = review.getReview();
        this.service.postReview(movieid, rating, username, newReview, likes);
    }

    @PostMapping("/like_review/{id}")
    public void likeReview(@PathVariable int id){
        this.service.likeReview(id);
    }

    @PostMapping("/dislike_review/{id}")
    public void dislikeReview(@PathVariable int id){
        this.service.dislikeReview(id);
    }
}
