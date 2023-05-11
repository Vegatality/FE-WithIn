import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteComment, editComment } from "../../redux/modules/commentsSlice";
import { FaEdit, FaSave, FaTrashAlt } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import DOMPurify from "dompurify";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { throttle } from "lodash";
import { RiEmotionSadFill } from "react-icons/ri";
import { GiPartyPopper } from "react-icons/gi";
import { dateConvert } from "../util/dateConvert";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export const BoardCommentCard = ({ comment }) => {
  // console.log(comment);
  const [commentState, setCommentState] = useState({ ...comment });
  const [editingComment, setEditingComment] = useState(false);
  const [liked, setLiked] = useState(false);
  const [sad, setSad] = useState(false);
  const [grats, setGrats] = useState(false);
  const { userName, userId } = useSelector((store) => store.auth);
  const params = useParams();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const toolbar = {
    container: [["bold", "italic", "underline"]],
    handlers: {},
  };
  const token = Cookies.get("access");
  const convertHtmlToText = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  const putEditedComment = async (newText) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_TEST_SERVER_URL}/boards/${params.id}/comments/${comment.commentId}`,
        { comment: newText },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );
      //   console.log(response.data);
    } catch (err) {
      // console.log(err);
    }
  };
  const editCommentMutation = useMutation(putEditedComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(`${params.id}`);
    },
  });

  const handleEditComment = async (newText) => {
    const text = convertHtmlToText(newText);
    // console.log(text);
    if (text.trim() === "") {
      return;
    }

    editCommentMutation.mutate(newText);
    dispatch(editComment({ ...commentState }));
    setEditingComment(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleInputChange = (newText) => {
    // console.log(newText);
    setCommentState({ ...commentState, text: newText });
  };

  const requestDeleteComment = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_TEST_SERVER_URL}/boards/${params.id}/comments/${id}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
      // console.log(response.data);
    } catch (err) {
      // console.log(err);
    }
  };
  const handleDeleteComment = () => {
    deleteCommentMutation.mutate(comment.commentId);
    // dispatch(deleteComment(params.id));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const deleteCommentMutation = useMutation(requestDeleteComment, {
    onSuccess: () => {
      // console.log("success", params.id);
      queryClient.invalidateQueries(`${params.id}`);
    },
  });
  const postLikeClick = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_TEST_SERVER_URL}/boards/${params.id}/comments/${comment.commentId}/LIKE`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response.data);
    } catch (err) {
      // console.log(err);
    }
  };
  const postSadClick = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_TEST_SERVER_URL}/boards/${params.id}/comments/${comment.commentId}/SAD`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response.data);
    } catch (err) {
      // console.log(err);
    }
  };
  const postGratsClick = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_TEST_SERVER_URL}/boards/${params.id}/comments/${comment.commentId}/CONGRATULATION`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response.data);
    } catch (err) {
      // console.log(err);
    }
  };
  const likeMutation = useMutation(postLikeClick, {
    onSuccess: () => {
      queryClient.invalidateQueries(`${params.id}`);
    },
  });
  const sadMutation = useMutation(postSadClick, {
    onSuccess: () => {
      queryClient.invalidateQueries(`${params.id}`);
    },
  });
  const gratsMutation = useMutation(postGratsClick, {
    onSuccess: () => {
      queryClient.invalidateQueries(`${params.id}`);
    },
  });

  const onLikeClick = throttle(
    () => {
      setLiked(!liked);
      likeMutation.mutate();
    },
    100,
    { trailing: false }
  );
  const onSadClick = throttle(
    () => {
      setSad(!sad);
      sadMutation.mutate();
    },
    100,
    { trailing: false }
  );
  const onGratsClick = throttle(
    () => {
      setGrats(!grats);
      gratsMutation.mutate();
    },
    100,
    { trailing: false }
  );

  useEffect(() => {
    if (comment) {
      // console.log(comment.username, userName);
      // console.log(comment.username === userName);
      setLiked(comment.likeCheck);
      setSad(comment.sadCheck);
      setGrats(comment.congratulationCheck);
    }
  }, [comment, userName]);
  return (
    <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: 0.2 }}>
      <div className="flex mr-3 mt-3">
        <div className="flex justify-center items-center w-12 h-12 rounded-full">
          {comment.img ? (
            <img className="w-full h-full rounded-full object-cover shadow-md " src={comment.img} alt="Profile" />
          ) : (
            <div className="flex justify-center items-center rounded-full bg-mainPurple w-12 h-12 shadow-lg">
              <FontAwesomeIcon icon={faUser} className=" text-white" />
            </div>
          )}
        </div>
        <div className="w-full ml-2">
          <div className="flex items-center justify-between mb-3 mr-7">
            <div className="flex items-center">
              <h3 className="font-bold text-sm">{comment.username}</h3>
              <p className="ml-3 text-xs antialiased text-darkPurple">{dateConvert(comment.createdAt)}</p>
            </div>
            {comment.username === userName ? (
              editingComment ? (
                <div className="flex items-center">
                  <FaSave className="text-textPurple cursor-pointer text-lg mr-2" onClick={() => handleEditComment(commentState.text)} />
                  <FaTrashAlt className="text-textPurple cursor-pointer text-lg" onClick={() => handleDeleteComment(comment.id)} />
                </div>
              ) : (
                <div className="flex items-center">
                  <FaEdit className="text-textPurple cursor-pointer text-lg mr-2" onClick={() => setEditingComment(true)} />
                  <FaTrashAlt className="text-textPurple cursor-pointer text-lg" onClick={() => handleDeleteComment(comment.id)} />
                </div>
              )
            ) : null}
          </div>
          {editingComment ? (
            <ReactQuill
              className=" bg-white rounded-t mr-7 shadow-md"
              defaultValue={commentState.comment}
              onChange={handleInputChange}
              modules={{ toolbar }}
            ></ReactQuill>
          ) : (
            <p
              className="px-3 py-3 bg-white rounded-t text-sm mr-7 shadow"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(comment.comment),
              }}
            ></p>
          )}
          <div className="flex pl-3 bg-[#ebe0ff] rounded-b-md mr-7 shadow">
            <div className="flex justify-center items-center my-2">
              <motion.div
                animate={liked ? { scale: [1, 1.1, 1] } : {}}
                transition={{
                  duration: 0.2,
                  ease: "easeInOut",
                }}
              >
                <AiFillHeart
                  className="text-lg mr-2"
                  color={liked ? "red" : "white"}
                  onClick={onLikeClick}
                  style={{
                    filter: "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.1))",
                  }}
                />
              </motion.div>

              <span className="text-xs w-4">
                {comment && (comment.likeCnt === 0 || comment.likeCnt === null ? "" : <span>{comment.likeCnt}</span>)}
              </span>
            </div>

            <div className="flex justify-center items-center my-2">
              <motion.div
                animate={sad ? { scale: [1, 1.1, 1] } : {}}
                transition={{
                  duration: 0.2,
                  ease: "easeInOut",
                }}
              >
                <RiEmotionSadFill
                  className="mr-2 text-lg"
                  color={sad ? "#6d93ff" : "white"}
                  onClick={onSadClick}
                  style={{
                    filter: "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.1))",
                  }}
                />
              </motion.div>

              <span className="text-xs w-4">{comment && (comment.sadCnt === 0 || comment.sadCnt === null ? "" : <span>{comment.sadCnt}</span>)}</span>
            </div>

            <div className="flex justify-center items-center my-2">
              <motion.div
                animate={grats ? { scale: [1, 1.1, 1] } : {}}
                transition={{
                  duration: 0.2,
                  ease: "easeInOut",
                }}
              >
                <GiPartyPopper
                  className="text-lg mr-2"
                  color={grats ? "#fcaaa1" : "white"}
                  onClick={onGratsClick}
                  style={{
                    filter: "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.1))",
                  }}
                />
              </motion.div>

              <span className="text-xs w-4">
                {comment && (comment.congratulationCnt === 0 || comment.congratulationCnt === null ? "" : <span>{comment.congratulationCnt}</span>)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
