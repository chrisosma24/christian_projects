package com.example.movie.model;

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "review")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private int movieid;
    private int rating;
    private Date created_date;
    private String username;
    private String review;
    private int likes;

    Review(){}
    
    public Review(int movieid, int rating, Date created_date, String username, String review,int likes){
        this.movieid = movieid;
        this.rating = rating;
        this.created_date = created_date;
        this.username = username;
        this.review = review;
        this.likes = likes;
    }

    public int getId(){
        return this.id;
    }

    public void setId(int id){
        this.id = id;
    }

    public int getMoviedId(){
        return this.movieid;
    }

    public void setMovieId(int movieid){
        this.movieid = movieid;
    }

    public int getRating(){
        return this.rating;
    }

    public void setRating(int rating){
        this.rating = rating;
    }

    public Date getDate(){
        return this.created_date;
    }

    public void setDate(Date created_date){
        this.created_date = created_date;
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

    public int getLikes(){
        return this.likes;
    }

    public void setLikes(int likes){
        this.likes = likes;
    }


    
}
