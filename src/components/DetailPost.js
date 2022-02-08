import React from "react";
import { history } from "../redux/configuserStore";

import {
  MagazineCreateInfo,
  MagazineContents,
  MagazineImg,
  MagazineInfo,
} from "../element";

const DetailPost = (props) => {
  const { id, magazine, user_info, insert_dt, img_src, info } = props;
  return (
    <div>
      <div className="flex items-center">
        <h2 className="flex-auto text-3xl font-bold py-5">
          {magazine.post_title}
        </h2>
        {user_info.user_id === user_info.uid && (
          <button
            className="px-3 py-1 bg-indigo-200 hover:bg-indigo-400 text-white"
            onClick={() => {
              history.push(`/create/${id}`);
            }}>
            수정
          </button>
        )}
      </div>
      <MagazineCreateInfo user_info={user_info} insert_dt={insert_dt} />
      <MagazineContents magazine={magazine} />
      <MagazineImg img_src={img_src} />
      <MagazineInfo info={info} />
    </div>
  );
};

export default DetailPost;
