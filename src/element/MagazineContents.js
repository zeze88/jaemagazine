import React from "react";

const MagazineContents = ({ isTitle = true, magazine }) => {
  //props 짝수 그림 왼 글 오
  //props 홀수 글 왼 그림 오
  return (
    <>
      {/* {isTitle && <h2 className="font-bold py-3">{magazine.post_title}</h2>} */}
      <h2 className="font-bold py-3">{magazine.post_title}</h2>
      <p>{magazine.post_content}</p>
    </>
  );
};

MagazineContents.defaultProps = {
  isTitle: false,
  magazine: {
    post_title: `‘An Environmentalist With a Gun`,
    post_content: ` ‘An Environmentalist With a Gun’: Inside Steven Rinella’s Hunting Empire
    With “MeatEater” on Netflix and a growing roster of podcasts, he is
    teaching a new kind of hunter about how killing animals can be part of
    loving nature.`,
  },
};

export default MagazineContents;
