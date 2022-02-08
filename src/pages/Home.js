import React from "react";
import { useSelector, useDispatch } from "react-redux";

import MagazineCard from "../components/MagazineCard";
import { actionCreators as postActions } from "../redux/modules/post";
import { history } from "../redux/configuserStore";

const Home = () => {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);
  const user_info = useSelector((state) => state.user.user);

  React.useEffect(() => {
    dispatch(postActions.getPostFB());
  }, []);
  console.log(post_list);
  return (
    <div className="container mx-w-[1020px] py-10 mx-auto">
      {post_list.map((p, idx) => {
        if (p.user_info.user_id === user_info?.uid) {
          return <MagazineCard key={idx} idx={idx} {...p} is_me />;
        } else {
          return <MagazineCard key={idx} idx={idx} {...p} />;
        }
      })}
      <button
        className="fixed bottom-10 right-16 w-16 h-16 border border-dashed hover:border-solid border-rose-600 rounded-full"
        onClick={() => {
          history.push("/create");
        }}>
        작성하기
      </button>
    </div>
  );
};

export default Home;
