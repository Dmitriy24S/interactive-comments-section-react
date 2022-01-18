import { ReactComponent as IconPlus } from "../images/icon-plus.svg";
import { ReactComponent as IconMinus } from "../images/icon-minus.svg";
import { ReactComponent as IconReply } from "../images/icon-reply.svg";
import { ReactComponent as IconDelete } from "../images/icon-delete.svg";
import { ReactComponent as IconEdit } from "../images/icon-edit.svg";

import { useState, useEffect } from "react";

const Reply = ({ reply, updateScore }) => {
  const [score, setScore] = useState(reply.score);
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
      updateScore(n, reply.id, "reply");
      setVotedStatus(true);
      setUpVoted(true);
    }
    // if already voted up, on 2nd click, reset to initial score back down
    if (upVoted === true) {
      let n = score - 1;
      setScore(n);
      updateScore(n, reply.id, "reply");
      setVotedStatus(false);
      setUpVoted(false);
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
      updateScore(n, reply.id, "reply");
      setDownVoted(true);
      setVotedStatus(true);
    }
    // if already voted down, on 2nd click, reset to initial score back up
    if (downVoted === true) {
      let n = score + 1;
      setScore(n);
      updateScore(n, reply.id, "reply");
      setDownVoted(false);
      setVotedStatus(false);
    }
  };

  return (
    <>
      <article key={reply.id} className="card reply-card">
        <div className="card-top">
          <img src={reply.user.image.png} alt="user-pic" />
          <div className="username">{reply.user.username}</div>
          <div className="date">{reply.createdAt}</div>
        </div>
        <div className="comment">
          <span className="replying-to">{`@${reply.replyingTo}`}</span>
          <span>{reply.content}</span>
        </div>
        <div className="card-bottom">
          <div className={`score${votedStatus ? " voted" : ""}`}>
            <button
              className={`btn plus-btn${upVoted ? " active" : ""}`}
              onClick={upVote}
              aria-label="plus-btn"
            >
              <IconPlus />
            </button>
            {reply.score}
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
    </>
  );
};

export default Reply;
