import './Movie.css';
import {over} from "stompjs";
import SockJS from "sockjs-client";
import React, {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import yellowStar from "./yellow-star.png";
import blackStar from "./black-star.png";
import blackHeart from "./black-heart.png";
import redHeart from "./red-heart.png";
import trash from "./trash.png";
import sendIcon from "./send.png";

var stompClient = null;

const numberToMonth = {
  "01": "January",
  "02": "February",
  "03": "March", 
  "04": "April", 
  "05": "May", 
  "06": "June", 
  "07": "July", 
  "08": "August",
  "09": "September",
  "10": "October",
  "11": "November", 
  "12": "December"
}

function Movie() {

  const navigate = useNavigate();

  const [loaded, setLoaded] = useState(false);
  const {id} = useParams();
  const [movie, setMovie] = useState({
    name: "",
    date: "",
    description: "",
    image: "",
    username: ""
  });
  const [reviews, setReviews] = useState([]);

  const [createRating, setCreateRating] = useState();
  const [createReview, setCreateReview] = useState("");

  const [reviewLikes, setReviewLikes] = useState({});
  const [reviewComments, setReviewComments] = useState({});
  const [showComments, setShowComments] = useState({});
  const [displayLikes, setDisplayLikes] = useState({});

  const [addComment, setAddComment] = useState({});
  const [displayComment, setDisplayComment] = useState({});

  const [movieInfo, setMovieInfo] = useState({
    pages: [],
    averageOfReviews: 0
  });

  useEffect(() => {
    if (sessionStorage.getItem("username") === null) navigate("/");

    axios.get("/api/movie/" + id)
    .then((response) => {
      const responseMovie = response.data;
      setMovie({
        id: responseMovie.id,
        name: responseMovie.name,
        date: responseMovie.date,
        description: responseMovie.description,
        image: responseMovie.image,
        username: responseMovie.username
      });
    })
    .catch((error) => console.log(error));

    axios.get("/api/review_info/" + id)
    .then((response) => {
      const numberOfPages = Math.ceil(response.data.numberOfReviews/5);
      let array = [];
      for (let i = 1; i<=numberOfPages; i++){
        array.push(i);
      }
      setMovieInfo({
        pages: array,
        averageOfReviews: Math.round(response.data.averageOfReviews)
      });
    })
    .catch((error) => console.log(error));

    axios.get("/api/reviews/" + id + "/" + 1)
    .then((response) => {
      setReviews(response.data);
      let likes = {};
      let comments = {};
      let show = {};
      let display_likes = {};
      let add_comments = {};
      let display_comments = {};
      for (let i = 0; i<response.data.length; i++){
        const currentId = response.data[i].id;
        likes[currentId] = false;
        comments[currentId] = [];
        show[currentId] = false;
        display_likes[currentId] = response.data[i].likes;
        add_comments[currentId] = false;
        display_comments[currentId] = "";
      }
      setReviewLikes(likes);
      setReviewComments(comments);
      setShowComments(show);
      setDisplayLikes(display_likes);
      setAddComment(add_comments);
      setDisplayComment(display_comments);
    })
    .catch((error) => console.log(error));

    setTimeout(() => setLoaded(true), "1000");
  }, [id]);

  function createUserReview(){
    const username = sessionStorage.getItem("username");
    const params = {
      movieid: id,
      rating: createRating,
      username: username,
      review: createReview
    }
    axios.post("/api/review", params)
    .then((response) => {
      setCreateRating("");
      setCreateReview("");

      if (reviews.length < 5){
        axios.get("/api/reviews/" + id + "/" + 1)
        .then((response) => {
          setReviews(response.data);
          let likes = {};
          let comments = {};
          let show = {};
          let display_likes = {};
          let add_comments = {};
          let display_comments = {};
          for (let i = 0; i<response.data.length; i++){
            const currentId = response.data[i].id;
            likes[currentId] = false;
            comments[currentId] = [];
            show[currentId] = false;
            display_likes[currentId] = response.data[i].likes;
            add_comments[currentId] = false;
            display_comments[currentId] = "";
          }
          setReviewLikes(likes);
          setReviewComments(comments);
          setShowComments(show);
          setDisplayLikes(display_likes);
          setAddComment(add_comments);
          setDisplayComment(display_comments);
        })
        .catch((error) => console.log(error));
      }
    })
    .catch((error) => console.log(error))
  }

  function handleLike(reviewId){
    let newObject = {...reviewLikes};
    const like = reviewLikes[reviewId];
    let url = "";
    if (like === false) {
      let temp = {...displayLikes};
      temp[reviewId] = displayLikes[reviewId] + 1;
      setDisplayLikes(temp);
      url = "/api/like_review/" + reviewId;
    }
    else {
      let temp = {...displayLikes};
      temp[reviewId] = displayLikes[reviewId] - 1;
      setDisplayLikes(temp);
      url = "/api/dislike_review/" + reviewId;
    }

    axios.post(url)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
    
    newObject[reviewId] = !like;
    setReviewLikes(newObject);
  }

  function handleShowReplies(reviewId){
    let newObject = {...showComments};
    newObject[reviewId] = !showComments[reviewId];

    let temp = {...reviewComments};
    if (showComments[reviewId] === false && reviewComments[reviewId].length === 0){
      axios.get("/api/comment/" + reviewId)
      .then((response) => {
        console.log(response);
        temp[reviewId] = response.data;
        setReviewComments(temp);
      })
      .catch((error) => console.log(error));
    }

    setShowComments(newObject);
  }

  function handlePaginate(pageNumber){
    axios.get("/api/reviews/" + id + "/" + pageNumber)
    .then((response) => {
      setReviews(response.data);
      let likes = {};
      let comments = {};
      let show = {};
      let display_likes = {};
      let add_comments = {};
      let display_comments = {};
      for (let i = 0; i<response.data.length; i++){
        const currentId = response.data[i].id;
        likes[currentId] = false;
        comments[currentId] = [];
        show[currentId] = false;
        display_likes[currentId] = response.data[i].likes;
        add_comments[currentId] = false;
        display_comments[currentId] = "";
      }
      setReviewLikes(likes);
      setReviewComments(comments);
      setShowComments(show);
      setDisplayLikes(display_likes);
      setAddComment(add_comments);
      setDisplayComment(display_comments);
    })
    .catch((error) => console.log(error));
  }

  function handleAddComment(reviewId){
    const newObject = {...addComment};
    newObject[reviewId] = true;
    setAddComment(newObject);
  }
  
  function handleCancelComment(reviewId){
    const newObject = {...addComment};
    newObject[reviewId] = false;
    setAddComment(newObject);
  }

  function handleChangeComment(comment, reviewId){
    const newObject = {...displayComment};
    newObject[reviewId] = comment;
    setDisplayComment(newObject);
  }

  function handleSubmitComment(reviewId){
    const newAddComment = {...addComment};
    const newDisplayComment = {...displayComment};

    const params = {
      reviewid: reviewId, 
      username: sessionStorage.getItem("username"),
      comment: displayComment[reviewId],
    }
    axios.post("/api/comment", params)
    .then((r) => {
      let temp = {...reviewComments};
      axios.get("/api/comment/" + reviewId)
      .then((response) => {
        console.log(response.data);
        temp[reviewId] = response.data;
        setReviewComments(temp);
      })
      .catch((error) => console.log(error));
    })
    .catch((e) => console.log(e));

    newAddComment[reviewId] = false;
    newDisplayComment[reviewId] = "";
    setAddComment(newAddComment);
    setDisplayComment(newDisplayComment);
  }

  function handleDeleteComment(reviewId, commentId){
    axios.delete("/api/comment/" + commentId + "/" + reviewId)
    .then((response) => console.log(response))
    .catch((error) => console.log(error));

    const newArray = reviewComments[reviewId].filter((c) => c.id !== commentId);
    const newObject = {...reviewComments};
    newObject[reviewId] = newArray;
    setReviewComments(newObject);
  }

  function handleDeleteReview(reviewId){
    axios.delete("/api/review/" + reviewId)
    .then((response) => console.log(response))
    .catch((error) => console.log(error));

    axios.delete("/api/delete_comments/" + reviewId)
    .then((response) => console.log(response))
    .catch((error) => console.log(error));

    const newReviews = reviews.filter((r) => r.id !== reviewId);
    setReviews(newReviews);
    delete reviewLikes[reviewId];
    setReviewLikes({...reviewLikes});
    delete reviewComments[reviewId];
    setReviewComments({...reviewComments});
    delete showComments[reviewId];
    setShowComments({...showComments});
    delete displayLikes[reviewId];
    setDisplayLikes({...displayLikes});
    delete addComment[reviewId];
    setAddComment({...addComment});
    delete displayComment[reviewId];
    setDisplayComment({...displayComment});
  }

  // start web socket

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const registerUser = () => {
    let Sock = new SockJS("http://localhost:8080/websocket-chat");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, (err) => console.log(err));
  }

  const onConnected = ()=> { 
    stompClient.subscribe("/movie/chat/" + id, (msg) => {
      const body = JSON.parse(msg.body);
      messages.push(body);
      setMessages([...messages]);
    });
  }

  const sendMessage = () => {
    stompClient.send("/app/send_message/" + id, {}, JSON.stringify({"username": sessionStorage.getItem("username"), "message": message}));
    setMessage("");
  }

  // end web socket

  return (
    loaded? 
    <div className="movieSection">
      <div className = "firstSection">
        <p onClick = {() => navigate("/")}>Looking for other movies?</p>
      </div>
      <div className = "secondSection">
        <div className = "movieInformation">
          <img className = "movieImage" src = {"data:image/png;base64," + movie.image} alt = "movie img"></img>
          <div className = "movieStars">
            <img src = {movieInfo.averageOfReviews >=1? yellowStar: blackStar} alt = "star"></img>
            <img src = {movieInfo.averageOfReviews >=2? yellowStar: blackStar} alt = "star"></img>
            <img src = {movieInfo.averageOfReviews >=3? yellowStar: blackStar} alt = "star"></img>
            <img src = {movieInfo.averageOfReviews >=4? yellowStar: blackStar} alt = "star"></img>
            <img src = {movieInfo.averageOfReviews >=5? yellowStar: blackStar} alt = "star"></img>
          </div>
          <h1 className = "movieName">{movie.name}</h1>
          <h1 className = "movieDate">{numberToMonth[movie.date.slice(5,7)]} {movie.date.slice(8, 10)}, {movie.date.slice(0, 4)}</h1>
          {sessionStorage.getItem("username") === movie.username && <p onClick = {() => navigate("/update_movie/" + id)}className = "movieUsername">Update movie?</p>}
          <p className = "movieDescription">{movie.description}</p>
          <button onClick = {createUserReview} className = "createButton">Create Review</button>
          <div className = "createRating">
            <p>Rating out of 5</p>
            <input value = {createRating} onChange = {(e) => setCreateRating(e.target.value)}placeholder = "5/5" className = "inputRating"></input>
          </div>
          <textarea value = {createReview} onChange = {(e) => setCreateReview(e.target.value)}className = "inputReview" placeholder = "review :"></textarea>
        </div> 
        <div className = "movieReviews">
          {reviews.length !== 0 && reviews.map((r) => {
            return (
              <div className = "reviewSection">
                <div className = "review">
                  <div className = "reviewHeader">
                    <div className = "stars">
                      <img src = {r.rating >= 1? yellowStar: blackStar} alt = "star img"></img>
                      <img src = {r.rating >= 2? yellowStar: blackStar} alt = "star img"></img>
                      <img src = {r.rating >= 3? yellowStar: blackStar} alt = "star img"></img>
                      <img src = {r.rating >= 4? yellowStar: blackStar} alt = "star img"></img>
                      <img src = {r.rating >= 5? yellowStar: blackStar} alt = "star img"></img>
                    </div>
                    <div className = "likes">
                      <p>{displayLikes[r.id]} likes</p>
                    </div>
                  </div>
                  <h4 className = "reviewUser">{r.username}</h4>
                  <h4 className = "reviewReview">{r.review}</h4>
                  <div className = "likeSection">
                    <h5 onClick = {() => handleAddComment(r.id)}>Add Comment</h5>
                    <div className = "likeSectionRight">
                      <img onClick = {() => handleLike(r.id)}className = "likeImage" src = {reviewLikes[r.id]? redHeart: blackHeart} alt = "black heart"></img>
                      {sessionStorage.getItem("username") === r.username && <img onClick = {() => handleDeleteReview(r.id)}className = "trashImage" src = {trash} alt = "trash img"></img>}
                    </div>
                  </div>
                </div>
                {addComment[r.id] && <div className = "addCommentSection">
                  <textarea value = {displayComment[r.id]}onChange = {(e) => handleChangeComment(e.target.value, r.id)}className = "addComment"></textarea>
                  <button onClick = {() => handleCancelComment(r.id)}style = {{marginLeft: "76%"}}>cancel</button>
                  <button onClick = {() => handleSubmitComment(r.id)}style = {{marginLeft: 7}}>submit!</button>
                </div>}
                <div className = "commentSection">
                  <h5 onClick = {() => {handleShowReplies(r.id)}}>{showComments[r.id]? "- Hide replies": "- Show replies"}</h5>
                  {showComments[r.id] && <div className = "comments">
                    {reviewComments[r.id].map((c) => {
                      return <div className = "comment">
                        <div className = "commentHeader">
                          <h4>{c.username}</h4>
                          {sessionStorage.getItem("username") === c.username && <img onClick = {() => handleDeleteComment(r.id, c.id)}src = {trash} alt = "trash img"></img>}
                        </div>
                        <p>{c.comment}</p>
                      </div>
                    })}
                  </div>}
                </div>
              </div>
            );
          })}
          <div className = "pages">
            {movieInfo.pages.map((p) => {
              return <h1 onClick = {() => handlePaginate(p)}>{p}</h1>
            })}
          </div>
        </div>
        <div className = "chatSection">
            <h3>Live Chat</h3>
            <button onClick = {registerUser} className = "liveChatButton">Connect!</button>
            <div className = "messagesSection">
              {messages.map((m) => {
                if (m.username === sessionStorage.getItem("username")){
                  return <div className = "ownMessage">
                    <h4>{m.username}</h4>
                    <p>{m.message}</p>
                  </div>
                }
                return <div className = "otherMessage">
                  <h4>{m.username}</h4>
                  <p>{m.message}</p>
                </div> 
              })}
            </div>
            <div className = "inputMessageSection">
              <textarea value = {message} onChange = {(e) => setMessage(e.target.value)}className = "inputMessage"></textarea>
              <div onClick = {sendMessage} className = "sendIconSection">
                <img src = {sendIcon} alt = "send"></img>
              </div>
            </div>
        </div>
      </div>
    </div>: 
    <h1 className = "loading">Loading...</h1>
  );
}

export default Movie;


