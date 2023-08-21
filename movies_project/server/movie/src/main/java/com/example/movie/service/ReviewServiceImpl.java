package com.example.movie.service;

import java.util.List;
import java.util.Optional;
import java.sql.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import com.example.movie.model.MovieInfo;
import com.example.movie.model.Review;
import com.example.movie.repository.ReviewRepository;

@Service
public class ReviewServiceImpl implements ReviewService{
    
    @Autowired
    private ReviewRepository repository;

    @Override
    public List<Review> getReviews(int movieId, int pageNumber){
        Pageable pageable = PageRequest.of(pageNumber-1, 5, Sort.by("likes").descending());
        return this.repository.findAllByMovieid(movieId, pageable);
    }

    @Override
    public void deleteReview(int id){
        this.repository.deleteById(id);
    }

    @Override
    public void postReview(int movieid, int rating, String username, String review, int likes){
        java.util.Date utilDate = new java.util.Date();
        Date sqlDate = new Date(utilDate.getTime());
        Review newReview = new Review(movieid, rating, sqlDate, username, review, likes);
        this.repository.save(newReview);
    }

    @Override
    public MovieInfo getMovieInfo(int movieid){
        long count = this.repository.countByMovieid(movieid);
        double average = this.repository.reviewAverage(movieid);
        MovieInfo movieInfo = new MovieInfo(count, average);
        return movieInfo;
    }

    @Override
    public void likeReview(int id){
        Optional<Review> queriedReview = this.repository.findById(id);
        Review review = queriedReview.get();
        review.setLikes(review.getLikes() + 1);
        this.repository.save(review);
    }

    @Override
    public void dislikeReview(int id){
        Optional<Review> queriedReview = this.repository.findById(id);
        Review review = queriedReview.get();
        review.setLikes(review.getLikes()-1);
        this.repository.save(review);
    }
}
