package com.example.movie.model;

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "comment")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private int reviewid;
    private Date created_date;
    private String username;
    private String comment;

    Comment(){}

    public Comment(int reviewid, Date created_date, String username, String comment){
        this.reviewid = reviewid;
        this.created_date = created_date;
        this.username = username;
        this.comment = comment;
    }

    public Comment(int reviewid, String username, String comment){
        this.reviewid = reviewid;
        java.util.Date utilDate = new java.util.Date();
        java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());
        this.created_date = sqlDate;
        this.username = username;
        this.comment = comment;
    }

    public int getId(){
        return this.id;
    }

    public void setId(int id){
        this.id = id;
    }

    public int getReviewid(){
        return this.reviewid;
    }

    public void setReviewid(int reviewid){
        this.reviewid = reviewid;
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

    public String getComment(){
        return this.comment;
    }

    public void setComment(String comment){
        this.comment = comment;
    }
    
}
