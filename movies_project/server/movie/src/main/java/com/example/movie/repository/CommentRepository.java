package com.example.movie.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.movie.model.Comment;

public interface CommentRepository extends JpaRepository<Comment, Integer>{
    
    List<Comment> findAllByReviewid(int reviewid);

    long deleteByReviewid(int reviewid);
}
