import React from "react";
import styled from "styled-components";

const MagazineImg = ({ shape, img_src }) => {
  // const imgRef = React.useRef(null);
  // const [imgeSize, setImgSize] = React.useState({
  //   width: 0,
  //   height: 0,
  // });
  // const imgOnload = React.useCallback(() => {
  //   const {
  //     current: { naturalWidth, naturalHeight },
  //   } = imgRef;
  //   // console.log(imgRef);
  // }, [imgRef]);

  // React.useEffect(() => {
  //   imgOnload();
  // }, [imgOnload, imgRef]);

  if (shape === "square") {
    return (
      <div className="relative w-full h-0 pt-[100%] overflow-hidden">
        {/* <img
          ref={imgRef}
          className="absolute top-0 left-0 w-full"
          src={img_src}
          alt="image"
        /> */}
        <ImgSizing
          // ref={imgRef}
          className="absolute top-0 left-0 w-full"
          src={img_src}></ImgSizing>
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

const ImgSizing = styled.div`
  height: 100%;
  background: url(${(props) => props.src}) no-repeat center / cover;
`;

export default MagazineImg;
