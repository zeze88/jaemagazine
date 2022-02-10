import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { history } from "../redux/configuserStore";
import { actionCreators as postActions } from "../redux/modules/post";

import {
  MagazineCreateInfo,
  MagazineContents,
  MagazineImg,
  MagazineInfo,
} from "../element";

const DetailPost = (props) => {
  const {
    id,
    magazine,
    user_info,
    insert_dt,
    img_src,
    comment_cnt,
    like_it_cnt,
    is_me,
  } = props;
  const dispatch = useDispatch();
  const post_id = useParams().id;

  const delPost = () => {
    dispatch(postActions.delPostFB(post_id));
  };

  console.log(props);

  return (
    <div>
      <div className="flex items-center">
        <h2 className="flex-auto text-3xl font-bold py-5">
          {magazine.post_title}
        </h2>
        {is_me && (
          <>
            <button
              className="px-3 py-1 bg-indigo-200 hover:bg-indigo-400 text-white"
              onClick={() => {
                history.push(`/create/${id}`);
              }}>
              수정
            </button>
            <button
              className="px-3 py-1 ml-2 bg-gray-200 hover:bg-gray-400 text-white"
              onClick={() => {
                delPost();
              }}>
              게시글 삭제
            </button>
          </>
        )}
      </div>
      <MagazineCreateInfo user_info={user_info} insert_dt={insert_dt} />
      <MagazineContents magazine={magazine} />
      <MagazineImg img_src={img_src} />
      <MagazineInfo
        post_id={id}
        like_user={props[user_info.user_id]}
        comment_cnt={comment_cnt}
        like_it_cnt={like_it_cnt}
      />
    </div>
  );
};

export default DetailPost;
