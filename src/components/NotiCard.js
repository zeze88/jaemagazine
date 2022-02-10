import React from "react";
import { MagazineImg } from "../element";
import { history } from "../redux/configuserStore";
import { useDispatch } from "react-redux";
import { actionCreators as commentActions } from "../redux/modules/comment";
const NotiCard = (props) => {
  const { user_name, post_id, img_src } = props;
  const dispatch = useDispatch();
  const delComment = () => {
    dispatch(commentActions.delCommentFB(post_id));
  };
  return (
    <div>
      <div
        className="flex items-center border border-gray-300 backdrop-blur-md container max-w-[1000px] mx-auto m-4 p-2 "
        onClick={() => {
          history.push(`/detail/${post_id}`);
        }}>
        <div className="w-[20%]">
          <MagazineImg shape="square" img_src={img_src} />
        </div>
        <div className=" flex-auto mx-10">
          <b>{user_name}</b>님이 게시글을 남겼습니다.
        </div>
      </div>
      {/* <button
        className="bg-orage-400"
        onClick={() => {
          delComment();
        }}>
        삭제
      </button> */}
    </div>
  );
};
NotiCard.defaultProps = {
  img_src: "",
  user_name: "",
  post_id: null,
};
export default NotiCard;
