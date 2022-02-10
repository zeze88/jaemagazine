import React from "react";
import { useSelector, useDispatch } from "react-redux";

import MagazineCard from "../components/MagazineCard";
import { actionCreators as postActions } from "../redux/modules/post";
import { history } from "../redux/configuserStore";

const Home = () => {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);
  const user_info = useSelector((state) => state.user.user);
  console.log(post_list);
  React.useEffect(() => {
    dispatch(postActions.getPostFB());
  }, []);

  return (
    <div className="container mx-w-[1020px] py-10 mx-auto">
      {post_list.length === 0 && (
        <div
          className="cursor-pointer"
          onClick={() => {
            history.push("/create");
          }}>
          포스트를 작성해주세요 :)
          <div>
            <img src="/img/magazine.jpg" alt="이미지" />
          </div>
        </div>
      )}
      {post_list.map((p, idx) => {
        if (p.user_info.user_id === user_info?.uid) {
          return <MagazineCard key={idx} idx={idx} {...p} is_me />;
        } else {
          return <MagazineCard key={idx} idx={idx} {...p} />;
        }
      })}
      <button
        className="fixed bottom-10 right-16 w-16 h-16 opacity-50 hover:opacity-100 border border-dashed  border-rose-400 bg-[rgba(255,255,255,0.3)] rounded-full cursor-pointer transition-all"
        onClick={() => {
          history.push("/create");
        }}>
        작성하기
      </button>
    </div>
  );
};

export default Home;
