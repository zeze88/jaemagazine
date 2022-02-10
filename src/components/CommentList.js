import React from "react";
import Avarta from "../Avatar";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as commentActions } from "../redux/modules/comment";

const CommentList = (props) => {
  const dispatch = useDispatch();
  const is_me = useSelector((state) => state.user.user);
  const comment_list = useSelector((state) => state.comment.list);
  const { post_id } = props;

  React.useEffect(() => {
    if (!comment_list[post_id]) {
      dispatch(commentActions.getCommentFB(post_id));
    }
  }, []);

  if (!comment_list[post_id] || !post_id) {
    return null;
  }

  const delComment = (id, idx) => {
    console.log(id, idx);
    dispatch(commentActions.delCommentFB(post_id, id, idx));
  };

  return (
    <div className="divide-y">
      {comment_list[post_id].map((v, idx) => {
        return (
          <div className="flex items-center py-4" key={idx}>
            <Avarta isNickName={false} />
            <ul className="flex-auto">
              <li className="text-sm">
                <span>{v.user_name}</span>
                <em className="text-slate-400 not-italic">{v.insert_dt}</em>
              </li>
              <li className="text-lg">{v.contents}</li>
            </ul>
            {comment_list[post_id][idx].user_id === is_me?.uid && (
              <button
                onClick={() => {
                  console.log(v.id);
                  delComment(v.id, idx);
                }}
                className="bg-gray-400 hover:bg-gray-600 text-white  px-2 py-1">
                삭제
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CommentList;
