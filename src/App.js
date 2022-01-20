import "./App.css";
import { useState, useEffect } from "react";
import Comment from "./components/Comment";

function App() {
  const [data, setData] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [commentValue, setCommentValue] = useState();

  const getData = async () => {
    const response = await fetch("./data/data.json");
    const data = await response.json();
    setData(data.comments);
    setCurrentUser(data.currentUser);
  };

  useEffect(() => {
    getData();
  }, []);

  const updateScore = (score, id, type) => {
    let updatedComments = [...data];
    if (type === "comment") {
      updatedComments.forEach((comment) => {
        if (comment.id === id) {
          comment.score = score;
        }
      });
    } else if (type === "reply") {
      updatedComments.forEach((comment) => {
        comment.replies.forEach((reply) => {
          if (reply.id === id) {
            reply.score = score;
          }
        });
      });
    }
    setData(updatedComments);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    addComment();
  };

  function isNullOrWhiteSpace(str) {
    return str == null || str.replace(/\s/g, "").length < 1;
  }

  const addComment = () => {
    if (isNullOrWhiteSpace(commentValue)) return;
    let newComment = {
      id: Math.floor(Math.random() * 100) + 5,
      createdAt: "1 week ago",
      content: commentValue,
      score: 0,
      replies: [],
      user: currentUser,
    };
    let newCommentsData = [...data, newComment];
    setData(newCommentsData);
    setCommentValue("");
  };

  return (
    <div className="App">
      {data.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          currentUser={currentUser}
          data={data}
          setData={setData}
          updateScore={updateScore}
          isNullOrWhiteSpace={isNullOrWhiteSpace}
        />
      ))}
      <section className="card add-comment-container">
        <form onSubmit={submitHandler}>
          <div className="add-comment__input">
            <textarea
              type="text"
              name="reply-text"
              id="reply-text"
              value={commentValue}
              onChange={(e) => setCommentValue(e.target.value)}
              placeholder="Add a comment"
            />
          </div>
          <div className="add-comment__bottom">
            <img src={currentUser ? currentUser.image.png : null} alt="currentUser-pic" />
            <button type="submit" className="btn add-comment__send-btn">
              SEND
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default App;
