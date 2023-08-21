package com.example.movie.model;

public class MovieInfo {

    private long numberOfReviews;
    private double averageOfReviews;
    
    public MovieInfo(long numberOfReviews, double average){
        this.averageOfReviews = average;
        this.numberOfReviews = numberOfReviews;
    }

    public long getNumberOfReviews(){
        return this.numberOfReviews;
    }

    public void setNumberOfReviews(long numberOfReviews){
        this.numberOfReviews = numberOfReviews;
    }

    public double getAverageOfReviews(){
        return this.averageOfReviews;
    }

    public void setAverageOfReviews(double averageOfReviews){
        this.averageOfReviews = averageOfReviews;
    }

}
