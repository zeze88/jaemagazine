import React from "react";

const MagazineImg = ({ shape, img_src }) => {
  if (shape === "square") {
    return (
      <div className="relative w-full h-0 pt-[100%] overflow-hidden">
        <img
          className="absolute top-0 left-0 w-full"
          src={img_src}
          alt="image"
        />
      </div>
    );
  } else {
    return (
      <div className="py-10">
        <img className="m-auto" src={img_src} alt="image" />
      </div>
    );
  }
};

Image.defaultProps = {
  state: "home",
  img_src:
    "https://static01.nyt.com/images/2022/02/06/magazine/06mag-meateater-08/06mag-meateater-08-articleLarge.jpg?quality=75&auto=webp&disable=upscale",
};
export default MagazineImg;
