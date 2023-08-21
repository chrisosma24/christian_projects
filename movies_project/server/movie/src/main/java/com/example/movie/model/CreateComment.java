package com.example.movie.model;

public class CreateComment {
    
    private int reviewid;
    private String username;
    private String comment;

    public CreateComment(){}

    public CreateComment(int reviewid, String username, String comment){
        this.reviewid = reviewid;
        this.username = username;
        this.comment = comment;
    }

    public int getReviewid(){
        return this.reviewid;
    }

    public void setReviewid(int reviewid){
        this.reviewid = reviewid;
    }

    public String getUsername(){
        return this.username;
    }

    public void setUsername(String username){
        this.username = username;
    }

    public String getComment(){
        return this.comment;
    }

    public void setComment(String comment){
        this.comment = comment;
    }

}
