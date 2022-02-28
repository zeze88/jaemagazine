import React from "react";
import { useSelector } from "react-redux";
import NotiCard from "../components/NotiCard";
import { realtime } from "../shared/firebase";
import styled from "styled-components";

// 기능추가 :: 알림설정 본인임 작성한 포스터에 누군가 댓글을 작성했을 때
// 기능추가 :: 삭제 버튼

const Notification = () => {
  const user = useSelector((state) => state.user.user);
  const [noti, setNoti] = React.useState([]);

  React.useEffect(() => {
    if (!user) {
      return;
    }

    const notiDB = realtime.ref(`noti/${user.uid}/list`);
    const _noti = notiDB.orderByChild("insert_dt");
    _noti.once("value", (snapshot) => {
      if (snapshot.exists()) {
        let _data = snapshot.val();
        console.log(_data);
        //역순정렬
        let _noti_list = Object.keys(_data)
          .reverse()
          .map((v) => {
            return _data[v];
          });

        setNoti(_noti_list);
      }
    });
  }, [user]);
  return (
    <NotiDiv className="p-2">
      {noti.map((v, idx) => {
        return <NotiCard key={idx} {...v} />;
      })}
    </NotiDiv>
  );
};
const NotiDiv = styled.div`
  margin-top: -110px;
  padding-top: 70px;
  background: url(/img/magazine.jpg) no-repeat fixed center/cover;
  width: 100vw;
  height: 100%;
  min-height: 100vh;
`;
export default Notification;
