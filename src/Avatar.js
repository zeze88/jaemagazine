import React from "react";
import styled from "styled-components";

const Avarta = ({ isNickName = true, user }) => {
  const defaultImg =
    "https://firebasestorage.googleapis.com/v0/b/jaemagazine-45854.appspot.com/o/image%2FJULhtsuBmabuNrbQ5Vv6ZLivSUB3_1644407428385?alt=media&token=5cd591a8-4369-4c15-8865-2a5dc67e17cc";

  return (
    <AvartaDl
      className="flex items-center"
      src={user.user_profile ? user.user_profile : defaultImg}>
      <dt className="relative overflow-hidden rounded-full">
        <div className="absolute"></div>
      </dt>
      {isNickName && <dd>{user.user_name}</dd>}
    </AvartaDl>
  );
};
Avarta.defaultProps = {
  user: {
    user_name: "summer",
    user_profile:
      "https://firebasestorage.googleapis.com/v0/b/jaemagazine-45854.appspot.com/o/image%2FJULhtsuBmabuNrbQ5Vv6ZLivSUB3_1644407428385?alt=media&token=5cd591a8-4369-4c15-8865-2a5dc67e17cc",
  },
};
const AvartaDl = styled.dl`
  dt {
    width: 30px;
    height: 30px;
    margin-right: 10px;

    div {
      width: 100%;
      height: 100%;
      background: url(${(props) => props.src}) no-repeat center/cover;
    }
  }
`;
export default Avarta;
