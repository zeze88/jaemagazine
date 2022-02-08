import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as imageActions } from "../redux/modules/images";

const Upload = () => {
  const dispatch = useDispatch();
  const is_uploading = useSelector((state) => state.images.uploading);
  const fileInput = React.useRef();

  const selectFile = (e) => {
    const reader = new FileReader();
    const file = fileInput.current.files[0];
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      // 이미지 결과 값
      // console.log(reader.result);
      dispatch(imageActions.setPreview(reader.result));
    };
  };

  const uploadFB = () => {
    let image = fileInput.current.files[0];
    dispatch(imageActions.uploadImageFB(image));
  };

  return (
    <div>
      <input
        type="file"
        id="uploadImg"
        onChange={selectFile}
        ref={fileInput}
        disabled={is_uploading}
      />
      <button onClick={uploadFB}>upload</button>
    </div>
  );
};
Upload.defaultProps = {};
export default Upload;
