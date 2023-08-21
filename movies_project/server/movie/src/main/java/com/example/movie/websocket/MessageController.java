package com.example.movie.websocket;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class MessageController {

    @MessageMapping("/send_message/{movieId}")
    @SendTo("/movie/chat/{movieId}")
    public Message send(@Payload Message message, @DestinationVariable int movieId){
        return message;
    }
    
}
