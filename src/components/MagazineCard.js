import React from "react";
import { history } from "../redux/configuserStore";
import { MagazineImg, MagazineContents, MagazineInfo } from "../element";

const MagazineCard = (props) => {
  const { id, idx, magazine, info } = props;

  return (
    <div className={`flex flex-row${idx % 2 === 0 ? "" : "-reverse"}`}>
      <div
        className="flex-1  cursor-pointer"
        onClick={() => {
          history.push(`/detail/${id}`);
        }}>
        <MagazineImg shape="square" img_src={props.img_src} />
      </div>
      <div className="relative flex-1  flex flex-col text-center items-center justify-center">
        <div
          className="cursor-pointer p-10"
          onClick={() => {
            history.push(`/detail/${id}`);
          }}>
          <MagazineContents magazine={magazine} />
        </div>
        <div className="absolute bottom-0 p-10">
          <MagazineInfo info={info} />
        </div>
      </div>
    </div>
  );
};

MagazineCard.defaultProps = {
  magazine: {
    post_title: `‘An Environmentalist With a Gun`,
    post_content: ` ‘An Environmentalist With a Gun’: Inside Steven Rinella’s Hunting Empire
    With “MeatEater” on Netflix and a growing roster of podcasts, he is
    teaching a new kind of hunter about how killing animals can be part of
    loving nature.`,
  },
  img_src:
    "https://static01.nyt.com/images/2022/02/06/magazine/06mag-meateater-08/06mag-meateater-08-articleLarge.jpg?quality=75&auto=webp&disable=upscale",
  info: {
    comment_cnt: 0,
    like_it_cnt: 4,
  },
  user_info: {
    user_name: "summer",
    user_profile: "",
  },
};

export default MagazineCard;
