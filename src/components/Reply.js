import { ReactComponent as IconPlus } from "../images/icon-plus.svg";
import { ReactComponent as IconMinus } from "../images/icon-minus.svg";
import { ReactComponent as IconReply } from "../images/icon-reply.svg";
import { ReactComponent as IconDelete } from "../images/icon-delete.svg";
import { ReactComponent as IconEdit } from "../images/icon-edit.svg";

import { useState, useEffect } from "react";

const Reply = ({ reply }) => {
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
          <div className={`score`}>
            <button className={`btn plus-btn`} aria-label="plus-btn">
              <IconPlus />
            </button>
            {reply.score}
            <button className={`btn minus-btn`} aria-label="minus-btn">
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
