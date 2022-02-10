import React from "react";
import { useSelector } from "react-redux";
import NotiCard from "../components/NotiCard";
import { realtime } from "../shared/firebase";

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
    <div className="bg-emerald-400">
      {noti.map((v, idx) => {
        return <NotiCard key={idx} {...v} />;
      })}
    </div>
  );
};

export default Notification;
