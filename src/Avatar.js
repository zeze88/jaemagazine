import React from "react";
import styled from "styled-components";

const Avarta = ({ isNickName = true, user_info }) => {
  return (
    <AvartaDl className="flex items-center">
      <dt className="relative overflow-hidden rounded-full">
        <img className="absolute" src={user_info.user_profile} alt="img" />
      </dt>
      {isNickName && <dd>{user_info.user_name}</dd>}
    </AvartaDl>
  );
};
Avarta.defaultProps = {
  user_info: {
    user_name: "summer",
    user_profile: "https://i.ytimg.com/vi/MPV2METPeJU/maxresdefault.jpg",
  },
};
const AvartaDl = styled.dl`
  dt {
    width: 30px;
    height: 30px;
    margin-right: 10px;

    img {
      width: 100%;
      height: auto;
    }
  }
`;
export default Avarta;
