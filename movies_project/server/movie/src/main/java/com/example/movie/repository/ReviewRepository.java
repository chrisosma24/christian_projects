package com.example.movie.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;

import com.example.movie.model.Review;

public interface ReviewRepository extends JpaRepository<Review, Integer>{
    
    List<Review> findAllByMovieid(int movieid, Pageable pageable);

    long countByMovieid(int movieid);

    @Query(value = "select avg(rating) from review where movieid = ?1", nativeQuery = true)
    Double reviewAverage(int movieid);
}
