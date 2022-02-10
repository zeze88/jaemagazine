import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { ReactComponent as CommentSvg } from "../svg/comment.svg";
import { ReactComponent as LikeItSvg } from "../svg/like_it_defualt.svg";
import { ReactComponent as LikeItSvgActive } from "../svg/like_it_active.svg";

const MagazineInfo = (props) => {
  let { like_user, comment_cnt, like_it_cnt, post_id } = props;
  const dispatch = useDispatch();
  const [isLike, setIsLike] = React.useState(like_user);
  const click_like = () => {
    dispatch(postActions.likeItFB(post_id, isLike));
    setIsLike(!isLike);
  };

  React.useEffect(() => {
    if (!like_user) {
      return;
    }
    setIsLike(like_user);
  }, [like_user]);

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
          }}>
          {!isLike ? <LikeItSvg /> : <LikeItSvgActive />}
        </dt>
        <dd>{like_it_cnt}</dd>
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
