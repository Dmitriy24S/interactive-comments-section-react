import { ReactComponent as IconPlus } from "../images/icon-plus.svg";
import { ReactComponent as IconMinus } from "../images/icon-minus.svg";
import { ReactComponent as IconReply } from "../images/icon-reply.svg";
import { ReactComponent as IconDelete } from "../images/icon-delete.svg";
import { ReactComponent as IconEdit } from "../images/icon-edit.svg";

import { useState, useEffect } from "react";
import Reply from "./Reply";

const Comment = ({ comment, updateScore, currentUser, data, setData, isNullOrWhiteSpace }) => {
  const [score, setScore] = useState(comment.score);
  const [votedStatus, setVotedStatus] = useState(false);
  const [upVoted, setUpVoted] = useState(false);
  const [downVoted, setDownVoted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deletionID, setDeletionID] = useState();
  const [deletionParentID, setDeletionParentID] = useState();
  const [replying, setReplying] = useState(false);
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

  const deleteBtnClick = (id, parentId) => {
    if (comment.id === parentId) {
      let updatedReplies = comment.replies.filter((reply) => reply.id !== id);
      comment.replies = updatedReplies;
      setShowModal(false);
      let newCommentsData = [...data];
      setData(newCommentsData);
    } else {
      let updatedReplies = data.filter((comment) => comment.id !== id);
      setShowModal(false);
      let newCommentsData = [...updatedReplies];
      setData(newCommentsData);
    }
  };

  const updateReplies = (replyValue, id, parentId, replyOP) => {
    let updatedReplies = [];

    if (isNullOrWhiteSpace(replyValue)) return;

    let newReply = {
      id: Math.floor(Math.random() * 100) + 5,
      createdAt: "1 week ago",
      content: replyValue,
      score: 0,
      replyingTo: replyOP,
      user: currentUser,
    };

    if (comment.id === parentId) {
      updatedReplies = [...comment.replies, newReply];
      comment.replies = updatedReplies;
      let newCommentsData = [...data];
      setData(newCommentsData);
    }

    if (parentId === null) {
      let newReply = {
        id: Math.floor(Math.random() * 100) + 5,
        createdAt: "1 week ago",
        content: replyValue,
        score: 0,
        replyingTo: replyOP,
        user: currentUser,
      };

      updatedReplies = [...comment.replies, newReply];
      comment.replies = updatedReplies;
      let newCommentsData = [...data];
      setData(newCommentsData);
    }
  };

  const handleCommentReply = () => {
    setReplying(!replying);
  };

  const submitCommentReplyHandler = (e, parentID) => {
    e.preventDefault();
    if (parentID) {
      return;
    } else {
      updateReplies(commentValue, comment.id, null, comment.user.username);
    }
    setCommentValue("");
    setReplying(false);
  };

  // Edit Comment

  const applyCommentEdit = (newCommentValue, parentID, replyID) => {
    if (comment.id === parentID) {
      comment.replies.map((reply) => {
        if (reply.id === replyID) {
          reply.content = newCommentValue;
        }
      });
    } else {
      data.map((comment) => {
        if (comment.id === replyID) {
          comment.content = newCommentValue;
        }
      });
    }
  };

  const [editMode, setEditMode] = useState(false);

  const enableEditMode = () => {
    setEditMode(!editMode);
    setCommentValue(comment.content);
  };

  const submitEditHandler = (e) => {
    e.preventDefault();
    applyCommentEdit(commentValue, null, comment.id);
    setEditMode(!editMode);
  };

  return (
    <section key={comment.id}>
      <article className="card">
        <div className="card-left">
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
        </div>
        <div className="card-container">
          <div className="card-top">
            <div className="card-top-container">
              <img src={comment.user.image.png} alt="user-pic" />
              <div className="username">
                {comment.user.username}
                {currentUser && comment.user.username === currentUser.username && (
                  <span className="active-user">you</span>
                )}
              </div>
              <div className="date">{comment.createdAt}</div>
            </div>
            <div className="topmenu">
              {currentUser && comment.user.username === currentUser.username ? (
                <div className="comment-menu">
                  <button
                    className="btn delete"
                    onClick={() => {
                      setShowModal(true);
                      setDeletionID(comment.id);
                      setDeletionParentID(comment.id);
                    }}
                  >
                    <IconDelete /> Delete
                  </button>
                  <button className="btn edit" onClick={enableEditMode}>
                    <IconEdit /> Edit
                  </button>
                </div>
              ) : (
                <button className="btn reply" onClick={handleCommentReply}>
                  <IconReply /> Reply
                </button>
              )}
            </div>
          </div>

          {editMode ? (
            <div className="edit-container">
              <form onSubmit={submitEditHandler}>
                <textarea
                  type="text"
                  name="reply-text"
                  id="reply-text"
                  value={commentValue}
                  onChange={(e) => setCommentValue(e.target.value)}
                  placeholder="Add a comment"
                />
                <button type="submit" className="btn update-comment__send-btn">
                  UPDATE
                </button>
              </form>
            </div>
          ) : (
            <div className="comment">
              <span>{comment.content}</span>
            </div>
          )}

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
            {currentUser && comment.user.username === currentUser.username ? (
              <div className="comment-menu">
                <button
                  className="btn delete"
                  onClick={() => {
                    setShowModal(true);
                    setDeletionID(comment.id);
                    setDeletionParentID(comment.id);
                  }}
                >
                  <IconDelete /> Delete
                </button>
                <button className="btn edit" onClick={enableEditMode}>
                  <IconEdit /> Edit
                </button>
              </div>
            ) : (
              <button className="btn reply" onClick={handleCommentReply}>
                <IconReply /> Reply
              </button>
            )}
          </div>
        </div>
      </article>
      <div
        className="reply-container"
        style={{ display: comment.replies?.length || replying ? "flex" : "none" }}
      >
        {replying && (
          <section className="card add-reply-container">
            <form onSubmit={submitCommentReplyHandler}>
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
                <button type="submit" className="btn add-comment__send-btn">
                  REPLY
                </button>
              </div>
            </form>
          </section>
        )}
        {comment.replies.map((reply) => (
          <Reply
            key={reply.id}
            reply={reply}
            updateScore={updateScore}
            currentUser={currentUser}
            parentID={comment.id}
            showModal={showModal}
            setShowModal={setShowModal}
            deleteBtnClick={deleteBtnClick}
            updateReplies={updateReplies}
            applyCommentEdit={applyCommentEdit}
          />
        ))}
      </div>

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
                  deleteBtnClick(deletionID, null);
                }}
              >
                Yes, delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Comment;
