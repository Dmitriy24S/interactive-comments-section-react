import { ReactComponent as IconPlus } from "../images/icon-plus.svg";
import { ReactComponent as IconMinus } from "../images/icon-minus.svg";
import { ReactComponent as IconReply } from "../images/icon-reply.svg";
import { ReactComponent as IconDelete } from "../images/icon-delete.svg";
import { ReactComponent as IconEdit } from "../images/icon-edit.svg";

import { useState, useEffect } from "react";
import Reply from "./Reply";

const Comment = ({ comment, updateScore, currentUser, data, setData }) => {
  const [score, setScore] = useState(comment.score);
  const [votedStatus, setVotedStatus] = useState(false);
  const [upVoted, setUpVoted] = useState(false);
  const [downVoted, setDownVoted] = useState(false);

  let upVote = () => {
    if (upVoted === false) {
      setDownVoted(false);
      let n;
      // if have active downvote, negate downvote, and apply upvote to initial score
      if (downVoted) {
        n = score + 2;
      } else {
        n = score + 1;
      }
      setScore(n);
      updateScore(n, comment.id, "comment");
      setUpVoted(true);
      setVotedStatus(true);
    }
    // if already voted up, on 2nd click, reset to initial score back down
    if (upVoted === true) {
      let n = score - 1;
      setScore(n);
      updateScore(n, comment.id, "comment");
      setUpVoted(false);
      setVotedStatus(false);
    }
  };

  let downVote = () => {
    if (downVoted === false) {
      setUpVoted(false);
      let n;
      // if have active upvote, negate upvote, and apply downvote to initial score
      if (upVoted) {
        n = score - 2;
      } else {
        n = score - 1;
      }
      setScore(n);
      updateScore(n, comment.id, "comment");
      setDownVoted(true);
      setVotedStatus(true);
    }
    // if already voted down, on 2nd click, reset to initial score back up
    if (downVoted === true) {
      let n = score + 1;
      setScore(n);
      updateScore(n, comment.id, "comment");
      setDownVoted(false);
      setVotedStatus(false);
    }
  };

  return (
    <section key={comment.id}>
      <article className="card">
        <div className="card-top">
          <img src={comment.user.image.png} alt="user-pic" />
          <div className="username">
            {comment.user.username}
            {currentUser && comment.user.username === currentUser.username && (
              <span className="active-user">you</span>
            )}
          </div>
          <div className="date">{comment.createdAt}</div>
        </div>
        <div className="comment">{comment.content}</div>
        <div className="card-bottom">
          <div className={`score${votedStatus ? " voted" : ""}`}>
            <button
              className={`btn plus-btn${upVoted ? " active" : ""}`}
              onClick={upVote}
              aria-label="plus-btn"
            >
              <IconPlus />
            </button>
            {comment.score}
            <button
              className={`btn minus-btn${downVoted ? " active" : ""}`}
              onClick={downVote}
              aria-label="minus-btn"
            >
              <IconMinus />
            </button>
          </div>
          <button className="btn reply">
            <IconReply /> Reply
          </button>
        </div>
      </article>
      <div
        className="reply-container"
        style={{ display: comment.replies?.length ? "flex" : "none" }}
      >
        {comment.replies.map((reply) => (
          <Reply
            key={reply.id}
            reply={reply}
            updateScore={updateScore}
            currentUser={currentUser}
            parentId={comment.id}
          />
        ))}
      </div>
    </section>
  );
};

export default Comment;
