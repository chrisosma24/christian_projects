package com.example.movie.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.movie.model.Comment;
import com.example.movie.model.CreateComment;
import com.example.movie.repository.CommentRepository;
import org.springframework.stereotype.Service;

@Service
public class CommentServiceImpl implements CommentService {
    
    @Autowired
    private CommentRepository repository;

    @Override
    public List<Comment> getComments(int reviewId){
        return this.repository.findAllByReviewid(reviewId);
    }

    @Override
    public void postComment(CreateComment comment){
        Comment newComment = new Comment(comment.getReviewid(), comment.getUsername(), comment.getComment());
        this.repository.save(newComment);
    }

    @Override
    public void deleteComment(int id){
        this.repository.deleteById(id);
    }

    @Override 
    public void deleteAllComments(int reviewid){
        this.repository.deleteByReviewid(reviewid);
    }
}
