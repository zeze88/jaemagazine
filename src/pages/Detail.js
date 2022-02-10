import React from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../redux/configuserStore";

import Comment from "../components/Comment";
import CommentList from "../components/CommentList";
import DetailPost from "../components/DetailPost";

import { actionCreators as postActions } from "../redux/modules/post";
const Detail = (props) => {
  const dispatch = useDispatch();
  const id = useParams().id;
  const user_info = useSelector((state) => state.user.user);
  const post_list = useSelector((state) => state.post.list);
  const post_idx = post_list.findIndex((v) => v.id === id);
  const post = post_list[post_idx];
  React.useEffect(() => {
    if (post) {
      return;
    }
    dispatch(postActions.getOnePostFB(id));
  }, []);
  return (
    <div className="container px-10 m-auto">
      {post && (
        <DetailPost
          {...post}
          is_me={post.user_info.user_id === user_info?.uid}
        />
      )}
      <Comment post_id={id} />
      <CommentList post_id={id} />
      <button
        className="fixed bottom-10 right-16 w-16 h-16 border border-dashed hover:border-solid border-rose-600 rounded-full"
        onClick={() => {
          history.push("/");
        }}>
        home
      </button>
    </div>
  );
};

Detail.defaultProps = {
  user_info: {
    nick_name: "summer",
    profile: "https://i.ytimg.com/vi/MPV2METPeJU/maxresdefault.jpg",
  },
  insert_dt: "2020.01.14",
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
};

export default Detail;
