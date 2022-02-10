import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import firebase from "firebase/app";
import { firestore, realtime } from "../../shared/firebase";

import "moment";
import moment from "moment";

import { actionCreators as postActions } from "./post";

const SET_COMMENT = "SET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";
const DEL_COMMENT = "DEL_COMMENT";

const LOADING = "LOADING";

const setComment = createAction(SET_COMMENT, (post_id, comment_list) => ({
  post_id,
  comment_list,
}));
const addComment = createAction(ADD_COMMENT, (post_id, comment) => ({
  post_id,
  comment,
}));

const delComment = createAction(DEL_COMMENT, (post_id, idx) => ({
  post_id,
  idx,
}));

const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

const initialState = {
  list: {},
  is_loading: false,
};

const getCommentFB = (post_id = null) => {
  return function (dispatch, getState, { history }) {
    if (!post_id) {
      return;
    }
    const commentDB = firestore.collection("comment");
    commentDB
      .where("post_id", "==", post_id)
      .orderBy("insert_dt", "desc")
      .get()
      .then((docs) => {
        let list = [];
        docs.forEach((doc) => {
          list.push({ ...doc.data(), id: doc.id });
        });
        dispatch(setComment(post_id, list));
      });
  };
};

const addCommentFB = (post_id = null, contents) => {
  return function (dispatch, getState, { history }) {
    const commentDB = firestore.collection("comment");
    const user_info = getState().user.user;

    let comment = {
      post_id: post_id,
      user_id: user_info.uid,
      user_name: user_info.user_name,
      user_profile: user_info.user_profile,
      contents: contents,
      insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
    };

    commentDB.add(comment).then((doc) => {
      const postDB = firestore.collection("post");
      const post = getState().post.list.find((l) => l.id === post_id);
      const increment = firebase.firestore.FieldValue.increment(1);

      comment = { ...comment, id: doc.id };
      postDB
        .doc(post_id)
        .update({ comment_cnt: increment })
        .then((_post) => {
          dispatch(addComment(post_id, comment));

          // ==== 댓글 수 추가 ====
          if (post) {
            dispatch(
              postActions.editPost(post_id, {
                comment_cnt: parseInt(post.comment_cnt + 1),
              })
            );
          }

          // ==== 댓글 추가 알림 ====
          const _noti_item = realtime
            .ref(`noti/${post.user_info.user_id}/list`)
            .push();

          // 댓글 알림 페이지 data
          _noti_item.set(
            {
              post_id: post.id,
              user_name: comment.user_name,
              img_src: post.img_src,
              imsert_dt: comment.insert_dt,
            },
            (err) => {
              if (err) {
                console.log("알립 저장에 실패했어요");
              } else {
                const notiDB = realtime.ref(`noti/${post.user_info.user_id}`);
                notiDB.update({ read: false });
              }
            }
          );
        });
    });
  };
};

const delCommentFB = (post_id, id, idx) => {
  return function (dispatch, getState, { history }) {
    const commentDB = firestore.collection("comment");
    commentDB
      .doc(id)
      .delete()
      .then((doc) => {
        const postDB = firestore.collection("post");
        const post = getState().post.list.find((l) => l.id === post_id);
        const increment = firebase.firestore.FieldValue.increment(-1);

        postDB
          .doc(post_id)
          .update({ comment_cnt: increment })
          .then((_post) => {
            dispatch(delComment(post_id, idx));

            // ==== 댓글 수 삭제 ====
            if (post) {
              dispatch(
                postActions.editPost(post_id, {
                  comment_cnt: parseInt(post.comment_cnt - 1),
                })
              );
            }
          });
      });
  };
};

export default handleActions(
  {
    [SET_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        //let data = {[post_id]:con_list,...}
        draft.list[action.payload.post_id] = action.payload.comment_list;
      }),
    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.post_id].unshift(action.payload.comment);
      }),
    [DEL_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        const del_comment = draft.list[action.payload.post_id].filter(
          (v, idx) => {
            return idx !== action.payload.idx;
          }
        );

        draft.list[action.payload.post_id] = del_comment;
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        // draft.list[action];
      }),
  },
  initialState
);

const actionCreators = {
  getCommentFB,
  setComment,
  addCommentFB,
  addComment,
  delCommentFB,
  delComment,
};

export { actionCreators };
