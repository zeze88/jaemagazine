import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as commentActions } from "../redux/modules/comment";

const Comment = (props) => {
  const { post_id } = props;
  const dispatch = useDispatch();
  const user_info = useSelector((state) => state.user.user);
  const [comment_text, setCommentText] = React.useState();

  const onChange = (e) => {
    setCommentText(e.target.value);
  };

  const write = () => {
    if (!comment_text) {
      return alert("댓글을입력해주세요!");
    } else if (!user_info) {
      alert("댓글은 로그인후 가능합니다.");
      setCommentText("");

      return;
    }

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
