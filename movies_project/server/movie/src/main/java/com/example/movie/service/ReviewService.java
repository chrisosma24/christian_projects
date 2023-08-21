package com.example.movie.service;

import java.util.List;

import com.example.movie.model.MovieInfo;
import com.example.movie.model.Review;

public interface ReviewService {
    public List<Review> getReviews(int movieId, int pageNumber);
    public void deleteReview(int id);
    public void postReview(int movieid, int rating, String username, String review, int likes);
    public MovieInfo getMovieInfo(int movieid);
    public void likeReview(int id);
    public void dislikeReview(int id);
}
