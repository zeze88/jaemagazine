import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as commentActions } from "../redux/modules/comment";

const Comment = (props) => {
  const { post_id } = props;
  const dispatch = useDispatch();
  // cosnt comment_list = useSelector()
  const [comment_text, setCommentText] = React.useState();

  const onChange = (e) => {
    setCommentText(e.target.value);
  };

  const write = () => {
    dispatch(commentActions.addCommentFB(post_id, comment_text));
    setCommentText("");
  };

  return (
    <div>
      <div className="flex">
        <input
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              write();
            }
          }}
          value={comment_text}
          onChange={onChange}
          className="flex-auto p-3 mr-3 focus:outline-none focus:border-b-rose-600 border-b"
          placeholder="댓글을 남겨 주세요 :)"
        />
        <button
          onClick={() => {
            write();
          }}
          className="w-[100px] bg-slate-300 hover:bg-rose-300 rounded text-white">
          입력
        </button>
      </div>
    </div>
  );
};

export default Comment;
