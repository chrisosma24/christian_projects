package com.example.movie.websocket;

public class Message {

    private String username;
    private String message;

    public Message(String username, String message){
        this.username = username;
        this.message = message;
    }

    public String getUsername(){
        return this.username;
    }

    public void setUsername(String username){
        this.username = username;
    }

    public String getMessage(){
        return this.message;
    }

    public void setMessage(String message){
        this.message = message;
    }
    
}
