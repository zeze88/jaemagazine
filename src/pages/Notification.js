import React from "react";

import NotiCard from "../components/NotiCard";

const Notification = () => {
  let noti = [
    {
      user_name: "aaaa",
      post_id: "post1",
      img_src:
        "https://firebasestorage.googleapis.com/v0/b/jaemagazine-45854.appspot.com/o/image%2FJULhtsuBmabuNrbQ5Vv6ZLivSUB3_1644288039525?alt=media&token=b1e41d63-a6b2-4b6f-a839-4f145ede2ff1",
    },
    { user_name: "aaaa", post_id: "post1", img_src: "" },
    { user_name: "aaaa", post_id: "post1", img_src: "" },
    { user_name: "aaaa", post_id: "post1", img_src: "" },
    { user_name: "aaaa", post_id: "post1", img_src: "" },
    { user_name: "aaaa", post_id: "post1", img_src: "" },
    { user_name: "aaaa", post_id: "post1", img_src: "" },
  ];
  return (
    <div className="bg-emerald-400">
      {noti.map((v, idx) => {
        return <NotiCard key={idx} {...v} />;
      })}
    </div>
  );
};

export default Notification;
