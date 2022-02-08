import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { firestore, storage } from "../../shared/firebase";
import moment from "moment";
import { actionCreators as imageActions } from "./images";
//acriont
const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";

const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (post_id, post) => ({
  post_id,
  post,
}));

const initialState = {
  list: [],
};

const initialPost = {
  user_info: {
    user_id: "",
    user_name: "summer",
    user_profile: "",
  },
  magazine: {
    post_title: `‘An Environmentalist With a Gun`,
    post_content: ` ‘An Environmentalist With a Gun’: Inside Steven Rinella’s Hunting Empire
    With “MeatEater” on Netflix and a growing roster of podcasts, he is
    teaching a new kind of hunter about how killing animals can be part of
    loving nature.`,
  },
  img_src:
    "https://static01.nyt.com/images/2022/02/06/magazine/06mag-meateater-08/06mag-meateater-08-articleLarge.jpg?quality=75&auto=webp&disable=upscale",
  info: {
    comment_cnt: 0,
    like_it_cnt: 4,
  },
  insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
};

const addPostFB = (magazine, info) => {
  return function (dispatch, getState, { history }) {
    const postFB = firestore.collection("post");
    const _user = getState().user.user;
    const user_info = {
      user_id: _user.uid,
      user_name: _user.user_name,
      user_profile: _user.user_profile,
    };

    const _post = {
      ...initialPost,
      magazine: {
        post_content: magazine.post_content,
        post_title: magazine.post_title,
      },
      // info: {
      //   comment_cnt: info.comment_cnt,
      //   like_it_cnt: info.like_it_cnt,
      // },
      insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
    };

    const _previewImg = getState().images.preview;
    const _upload = storage
      .ref(`image/${user_info.user_id}_${new Date().getTime()}`)
      .putString(_previewImg, "data_url");

    _upload.then((snapshot) => {
      snapshot.ref
        .getDownloadURL()
        .then((url) => {
          console.log(url);
          return url;
        })
        .then((url) => {
          postFB
            .add({ ...user_info, ..._post, img_src: url })
            .then((doc) => {
              let post = { user_info, ..._post, id: doc.id, img_src: url };
              console.log(post);
              dispatch(addPost(post));
              history.replace("/");
              dispatch(imageActions.setPreview(null));
            })
            .catch((err) => {
              alert("작성에 실패하였습니다.", err);
            });
        })
        .catch((err) => {
          alert("이미지로드에 문제있어요", err);
          console.log("이미지로드에 문제있어요", err);
        });
    });
  };
};

const getPostFB = () => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection("post");
    postDB.get().then((docs) => {
      let post_list = [];
      docs.forEach((doc) => {
        // post_list.push({ id: doc.id, ...doc.data() });
        let _post = doc.data();
        let post = Object.keys(_post).reduce(
          (acc, cur) => {
            if (cur.indexOf("user_") !== -1) {
              // console.log([cur], _post[cur]);
              return {
                ...acc,
                user_info: { ...acc.user_info, [cur]: _post[cur] },
              };
            } else if (cur.indexOf("_cnt") !== -1) {
              return {
                ...acc,
                info: { ...acc.info, [cur]: _post[cur] },
              };
            } else if (cur.indexOf("post_") !== -1) {
              return {
                ...acc,
                magazine: { ...acc.magazine, [cur]: _post[cur] },
              };
            }
            return { ...acc, [cur]: _post[cur] };
          },
          { id: doc.id, user_info: {}, info: {}, magazine: {} }
        );
        post_list.push(post);
        // console.log(post);
      });
      dispatch(setPost(post_list));
    });
  };
};

const editPostFB = (post_id = null, post = {}) => {
  return function (dispatch, getState, { history }) {
    const user_id = getState().user.user.uid;
    const _image = getState().images.preview;
    const _post_idx = getState().post.list.findIndex((p) => p.id === post_id);
    const _post = getState().post.list[_post_idx];
    const postDB = firestore.collection("post");

    if (_image === _post.img_src) {
      postDB
        .doc(post_id)
        .update(post)
        .then((doc) => {
          dispatch(editPost(post_id, { ...post }));
          history.replace("/");
          dispatch(imageActions.setPreview(null));
        });
      return;
    } else {
      const _upload = storage
        .ref(`image/${user_id}_${new Date().getTime()}`)
        .putString(_image, "data_url");

      _upload.then((snapshot) => {
        snapshot.ref
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            return url;
          })
          .then((url) => {
            postDB
              .doc(post_id)
              .update({ ...post, img_src: url })
              .then((doc) => {
                dispatch(editPost(post_id, { ...post, img_src: url }));
                history.replace("/");
                dispatch(imageActions.setPreview(null));
              });
          })
          .catch((err) => {
            alert("이미지로드에 문제있어요", err);
            console.log("이미지로드에 문제있어요", err);
          });
      });
    }
  };
};

export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.post_list;
      }),
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),
    [EDIT_POST]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);
        draft.list[idx] = { ...draft.list[idx], ...action.payload.post };
        console.log(draft.list[idx]);
      }),
  },
  initialState
);

const actionCreators = {
  setPost,
  addPost,
  getPostFB,
  addPostFB,
  editPost,
  editPostFB,
};

export { actionCreators };
