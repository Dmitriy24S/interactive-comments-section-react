import { ReactComponent as IconPlus } from "../images/icon-plus.svg";
import { ReactComponent as IconMinus } from "../images/icon-minus.svg";
import { ReactComponent as IconReply } from "../images/icon-reply.svg";
import { ReactComponent as IconDelete } from "../images/icon-delete.svg";
import { ReactComponent as IconEdit } from "../images/icon-edit.svg";

import { useState, useEffect } from "react";

const Reply = ({
  reply,
  updateScore,
  currentUser,
  parentID,
  showModal,
  setShowModal,
  deleteBtnClick,
  updateReplies,
}) => {
  const [score, setScore] = useState(reply.score);
  const [votedStatus, setVotedStatus] = useState(false);
  const [upVoted, setUpVoted] = useState(false);
  const [downVoted, setDownVoted] = useState(false);
  const [deletionID, setDeletionID] = useState();
  const [deletionParentID, setDeletionParentID] = useState();
  const [replyingToReply, setReplyingToReply] = useState(false);
  const [commentValue, setCommentValue] = useState();

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

  const submitReplyHandler = (e) => {
    e.preventDefault();
    updateReplies(commentValue, reply.id, parentID, reply.user.username);
    setCommentValue("");
    setReplyingToReply(false);
  };

  const handleReply = () => {
    setReplyingToReply(!replyingToReply);
  };

  return (
    <>
      <article key={reply.id} className="card reply-card">
        <div className="card-top">
          <img src={reply.user.image.png} alt="user-pic" />
          <div className="username">
            {reply.user.username}
            {currentUser && reply.user.username === currentUser.username && (
              <span className="active-user">you</span>
            )}
          </div>
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
          {currentUser && reply.user.username === currentUser.username ? (
            <div className="comment-menu">
              <button
                className="btn delete"
                onClick={() => {
                  setShowModal(true);
                  setDeletionID(reply.id);
                  setDeletionParentID(parentID);
                }}
              >
                <IconDelete /> Delete
              </button>
              <button className="btn edit">
                <IconEdit /> Edit
              </button>
            </div>
          ) : (
            <button className="btn reply" onClick={handleReply}>
              <IconReply /> Reply
            </button>
          )}
        </div>
      </article>

      {showModal && deletionID !== undefined && (
        <div className="delete-confirmation-wrapper">
          <div className="delete-container">
            <div className="title">Delete comment</div>
            <div className="confirmation-message">
              Are you sure you want to delete this comment? This will remove the comment and can't
              be undone.
            </div>
            <div className="btn-container">
              <button
                className="cancel-btn"
                onClick={() => {
                  setShowModal(false);
                }}
              >
                No, cancel
              </button>
              <button
                className="delete-btn"
                onClick={() => {
                  deleteBtnClick(deletionID, deletionParentID);
                }}
              >
                Yes, delete
              </button>
            </div>
          </div>
        </div>
      )}

      {replyingToReply && (
        <section className="card add-reply-container">
          <form onSubmit={submitReplyHandler}>
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
                REPLY
              </button>
            </div>
          </form>
        </section>
      )}
    </>
  );
};

export default Reply;
