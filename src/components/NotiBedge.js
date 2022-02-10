import React from "react";
import { useSelector } from "react-redux";
import { realtime } from "../shared/firebase";
import { ReactComponent as Bedge } from "../svg/bedge.svg";

const NotiBedge = (props) => {
  const [is_read, setIsRead] = React.useState(true);
  const user_id = useSelector((state) => state.user.user.uid);
  const notiCheck = () => {
    const notiDB = realtime.ref(`noti/${user_id}`);
    notiDB.update({ read: true });
    props.onClick();
  };

  //event 구독하기 위해선 useEffect 사용
  React.useEffect(() => {
    const notiDB = realtime.ref(`noti/${user_id}`);
    notiDB.on("value", (snapshot) => {
      console.log(snapshot.val());
      setIsRead(snapshot.val().read);
    });

    return () => notiDB.off();
  }, []);

  return (
    <button
      type="button"
      className="inline-flex items-center"
      onClick={() => {
        notiCheck();
      }}>
      알림
      <div
        className={`relative flex-auto p-1 rounded-full text-${
          !is_read ? "rose-400" : "gray-400"
        } hover:text-rose-600 `}>
        <Bedge />
        {!is_read && (
          <span className="absolute top-1 right-1 inline-block bg-rose-600 w-1.5 h-1.5 rounded-full"></span>
        )}
      </div>
    </button>
  );
};

NotiBedge.defaultProps = {
  onClick: () => {},
};
export default NotiBedge;
