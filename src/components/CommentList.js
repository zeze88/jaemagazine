import React from "react";
import Avarta from "../Avatar";

const CommentList = (props) => {
  return (
    <div className="divide-y">
      <div className="flex py-4">
        <Avarta isNickName={false} />
        <ul className="flex-auto">
          <li className="text-sm">
            <span>코코</span>
            <em className="text-slate-400 not-italic">샤ㅡㄷ</em>
          </li>
          <li className="text-lg">알로알로알로~</li>
        </ul>
      </div>
    </div>
  );
};

export default CommentList;
