import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../redux/configuserStore";

import { TextArea } from "../element";
import { MagazineImg } from "../element";
import Upload from "../shared/Upload";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as imageActions } from "../redux/modules/images";
import Button from "../element/Button";

const Create = (props) => {
  const dispatch = useDispatch();
  const params = useParams();

  const is_login = useSelector((state) => state.user.is_login);
  const previewImg = useSelector((state) => state.images.preview);
  const post_list = useSelector((state) => state.post.list);
  const is_uploading = useSelector((state) => state.images.uploading);
  console.log(is_uploading);
  const post_id = params.id;
  const is_edit = post_id ? true : false;

  let _post = is_edit ? post_list.find((p) => p.id === post_id) : null;

  const [contents, setContents] = React.useState(
    _post
      ? {
          post_title: _post.magazine.post_title,
          post_content: _post.magazine.post_content,
        }
      : {
          post_title: "",
          post_content: "",
        }
  );

  React.useEffect(() => {
    if (is_edit && !_post) {
      console.log("no post info");
      alert("포스트정보가 없어요");
      history.goBack();
      return;
    }
    if (is_edit) {
      dispatch(imageActions.setPreview(_post.img_src));
    }
  }, []);

  const onChange = (e) => {
    const targetId = e.target.id;
    const targetValue = e.target.value;
    setContents({
      ...contents,
      [targetId]: targetValue,
    });
  };

  const addPost = () => {
    if (!contents.post_title) {
      alert("제목을 입력해주시요");
    } else if (!contents.post_content) {
      alert("내용을 입력해주시요");
    } else if (!previewImg) {
      alert("이미지를 업로드해주세요");
    } else {
      dispatch(postActions.addPostFB(contents));
    }
  };
  const editPost = () => {
    dispatch(postActions.editPostFB(post_id, { ...contents }));
  };

  if (!is_login) {
    return (
      <div className="w-[400px] m-auto my-[100px]">
        <h2 className="py-[100px] leading-loose text-center">
          로그인 후만 가능합니다.
        </h2>
        <Button
          title="메인으로 돌아기기"
          onClick={() => {
            history.replace("/");
          }}
        />
      </div>
    );
  }
  return (
    <div className="container px-10 m-auto">
      <h2 className="text-3xl font-bold py-5">작성하기</h2>
      <input
        id="post_title"
        type="text"
        onChange={onChange}
        value={contents.post_title}
        placeholder="제목을 입력해주세요"
        className="w-full p-4 border-b border-rose-600 focus:outline-none mb-8"
      />
      <Upload />
      <MagazineImg
        img_src={
          previewImg
            ? previewImg
            : "https://firebasestorage.googleapis.com/v0/b/jaemagazine-45854.appspot.com/o/images%2Fogimage_1.png?alt=media&token=92d67f77-72a9-4de2-84ea-b4bea9c7b113"
        }
      />
      <TextArea
        id="post_content"
        onChange={onChange}
        value={contents.post_content}
      />
      {is_edit ? (
        <Button
          title="수정하기"
          is_uploading={is_uploading}
          onClick={() => {
            editPost();
          }}
        />
      ) : (
        <Button
          title="작성하기"
          is_uploading={is_uploading}
          onClick={() => {
            addPost();
          }}
        />
      )}
    </div>
  );
};

Create.defaultProps = {
  img_info: {
    src: "https://static01.nyt.com/images/2022/02/06/magazine/06mag-meateater-08/06mag-meateater-08-articleLarge.jpg?quality=75&auto=webp&disable=upscale",
    alt: "기사이미지",
  },
};

export default Create;
