import { ReactComponent as IconPlus } from "../images/icon-plus.svg";
import { ReactComponent as IconMinus } from "../images/icon-minus.svg";
import { ReactComponent as IconReply } from "../images/icon-reply.svg";
import { ReactComponent as IconDelete } from "../images/icon-delete.svg";
import { ReactComponent as IconEdit } from "../images/icon-edit.svg";

import { useState, useEffect } from "react";
import Reply from "./Reply";

const Comment = ({ comment, updateScore, currentUser, data, setData }) => {
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
          <div className={`score`}>
            <button className={`btn plus-btn`} aria-label="plus-btn">
              <IconPlus />
            </button>
            {comment.score}
            <button className={`btn minus-btn`} aria-label="minus-btn">
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
