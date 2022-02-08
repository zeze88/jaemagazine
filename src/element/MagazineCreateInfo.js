import React from "react";
import Avarta from "../Avatar";

const MagazineCreateInfo = ({ user_info, insert_dt }) => {
  return (
    <ul className="flex items-center justify-between py-3">
      <li>
        <Avarta user_info={user_info} />
      </li>
      <li className="text-slate-400">{insert_dt}</li>
    </ul>
  );
};

MagazineCreateInfo.defaultProps = {
  user_info: {
    user_name: "summer",
    user_profile: "https://i.ytimg.com/vi/MPV2METPeJU/maxresdefault.jpg",
  },
  insert_dt: "2020.01.14",
};

export default MagazineCreateInfo;
