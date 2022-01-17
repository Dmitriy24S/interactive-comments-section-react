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

  return (
    <div className="App">
      {data.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          currentUser={currentUser}
          data={data}
          setData={setData}
        />
      ))}
    </div>
  );
}

export default App;
