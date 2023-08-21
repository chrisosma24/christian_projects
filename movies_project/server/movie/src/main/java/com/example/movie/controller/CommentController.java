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

import com.example.movie.model.Comment;
import com.example.movie.model.CreateComment;
import com.example.movie.service.CommentServiceImpl;

@RestController
@RequestMapping("/api")
public class CommentController {
    
    @Autowired
    private CommentServiceImpl service;

    @GetMapping("/comment/{reviewId}")
    public ResponseEntity<List<Comment>> getComments(@PathVariable int reviewId){
        List<Comment> comments = this.service.getComments(reviewId);
        HttpHeaders responseHeaders = new HttpHeaders();
        return new ResponseEntity<List<Comment>>(comments, responseHeaders, HttpStatus.ACCEPTED);
    }

    @PostMapping("/comment")
    public void postComment(@RequestBody CreateComment comment){
        this.service.postComment(comment);
    }

    @DeleteMapping("/comment/{id}/{reviewId}")
    public void deleteComment(@PathVariable int id, @PathVariable int reviewId){
        this.service.deleteComment(id);
    }

    @DeleteMapping("/delete_comments/{reviewId}")
    public void deleteAllComments(@PathVariable int reviewId){
        this.service.deleteAllComments(reviewId);
    }
}
