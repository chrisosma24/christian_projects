package com.example.movie.model;

public class CreateReview {
    
    private int movieid;
    private int rating;
    private String username;
    private String review;

    public CreateReview(){}

    public CreateReview(int movieid, int rating, String username, String review){
        this.movieid = movieid;
        this.rating = rating;
        this.username = username;
        this.review = review;
    }

    public int getMovieid(){
        return this.movieid;
    }

    public void setMovieid(int movieid){
        this.movieid = movieid;
    }

    public int getRating(){
        return this.rating;
    }

    public void setRating(int rating){
        this.rating = rating;
    }

    public String getUsername(){
        return this.username;
    }

    public void setUsername(String username){
        this.username = username;
    }

    public String getReview(){
        return this.review;
    }

    public void setReview(String review){
        this.review = review;
    }

}
