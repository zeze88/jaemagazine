import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../redux/configuserStore";

import { TextArea } from "../element";
import { MagazineImg } from "../element";
import Upload from "../shared/Upload";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as imageActions } from "../redux/modules/images";

const Create = (props) => {
  const dispatch = useDispatch();
  const params = useParams();

  const is_login = useSelector((state) => state.user.is_login);
  const previewImg = useSelector((state) => state.images.preview);
  const post_list = useSelector((state) => state.post.list);
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
    dispatch(postActions.addPostFB(contents));
  };
  const editPost = () => {
    dispatch(postActions.editPostFB(post_id, { ...contents }));
  };

  console.log(contents);

  if (!is_login) {
    return (
      <div>
        <h2 className="h-[200px] align-center">로그인 후만 가능합니다.</h2>
        <button
          className="w-full py-3 bg-slate-300 hover:bg-rose-300 rounded text-white"
          onClick={() => {
            history.replace("/");
          }}>
          로그인하러가기
        </button>
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
        <button
          onClick={() => {
            editPost();
          }}
          className="w-full py-3 bg-slate-300 hover:bg-rose-300 rounded text-white">
          수정하기
        </button>
      ) : (
        <button
          onClick={() => {
            addPost();
          }}
          className="w-full py-3 bg-slate-300 hover:bg-rose-300 rounded text-white">
          작성하기
        </button>
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
