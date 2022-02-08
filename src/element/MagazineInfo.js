import React from "react";
import styled from "styled-components";
import { ReactComponent as CommentSvg } from "../svg/comment.svg";
import { ReactComponent as LikeItSvg } from "../svg/like_it_defualt.svg";
import { ReactComponent as LikeItSvgActive } from "../svg/like_it_active.svg";

const MagazineInfo = ({ info }) => {
  let { comment_cnt, like_it_cnt } = info;
  const [isLike, setIsLike] = React.useState(false);
  const [countLike, setCountLike] = React.useState(like_it_cnt);

  const click_like = () => {
    if (!isLike) {
      setCountLike(countLike + 1);
    } else {
      setCountLike(countLike - 1);
    }
  };
  return (
    <InfoWrap className="flex  py-4">
      <dl>
        <dt>
          <CommentSvg />
        </dt>
        <dd>{comment_cnt}</dd>
      </dl>
      <dl className="cursor-pointer">
        <dt
          onClick={() => {
            click_like();
            setIsLike(!isLike);
          }}>
          {!isLike ? <LikeItSvg /> : <LikeItSvgActive />}
        </dt>
        <dd>{countLike}</dd>
      </dl>
    </InfoWrap>
  );
};

MagazineInfo.defaultPorps = {
  comment_cnt: 0,
  like_it_cnt: 4,
};

const InfoWrap = styled.div`
  dl {
    display: flex;
    margin-right: 14px;
  }

  dt {
    display: inline-block;
    width: 30px;
    height: 30px;
    margin-right: 10px;
    overflow: hidden;
  }

  svg {
    width: 100%;
    height: 100%;
  }
`;
export default MagazineInfo;
