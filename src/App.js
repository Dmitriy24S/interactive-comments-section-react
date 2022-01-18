import "./App.css";
import { useState, useEffect } from "react";
import Comment from "./components/Comment";

function App() {
  const [data, setData] = useState([]);
  const [currentUser, setCurrentUser] = useState();

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
        />
      ))}
    </div>
  );
}

export default App;
