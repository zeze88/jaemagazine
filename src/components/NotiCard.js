import React from "react";
import { MagazineImg } from "../element";

const NotiCard = (props) => {
  const { user_name, post_id, img_src } = props;
  return (
    <div className="flex items-center bg-amber-50 ">
      <div className="w-[20%]">
        <MagazineImg shape="square" img_src={img_src} />
      </div>
      <div className=" flex-auto mx-10">
        <b>{user_name}</b>님이 게시글을 남겼습니다.
      </div>
    </div>
  );
};
NotiCard.defaultProps = {
  img_src: "",
  user_name: "",
  post_id: null,
};
export default NotiCard;
