import React from "react";
const Comment = (props) => {
  return (
    <div>
      <form className="flex">
        <input
          className="flex-auto p-3 mr-3 focus:outline-none focus:border-b-rose-600 border-b"
          placeholder="댓글을 남겨 주세요 :)"
        />
        <button className="w-[100px] bg-slate-300 hover:bg-rose-300 rounded text-white">
          입력
        </button>
      </form>
    </div>
  );
};

export default Comment;
