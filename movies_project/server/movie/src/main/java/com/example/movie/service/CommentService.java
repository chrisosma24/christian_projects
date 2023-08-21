package com.example.movie.service;

import java.util.List;

import com.example.movie.model.CreateComment;
import com.example.movie.model.Comment;

public interface CommentService {
    public List<Comment> getComments(int reviewId);
    public void postComment(CreateComment comment);
    public void deleteComment(int id);
    public void deleteAllComments(int reviewid);
}
