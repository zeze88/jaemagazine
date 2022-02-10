import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../element";
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
      dispatch(imageActions.setPreview(reader.result));
    };
  };

  const uploadFB = () => {
    let image = fileInput.current.files[0];
    dispatch(imageActions.uploadImageFB(image));
  };

  return (
    <div className="flex">
      <label htmlFor="uploadImg" className="flex-auto">
        <input
          type="file"
          id="uploadImg"
          onChange={selectFile}
          ref={fileInput}
          disabled={is_uploading}
          className="none"
        />
      </label>
      <div className="w-[100px]">
        <Button title="업로드하기" onClick={uploadFB} disabled={is_uploading} />
      </div>
    </div>
  );
};
Upload.defaultProps = {};
export default React.memo(Upload);
