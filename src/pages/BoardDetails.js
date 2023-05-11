import { BoardCommentCard } from "../components/BoardDetails/BoardCommentCard";
import { BoardAddComment } from "../components/BoardDetails/BoardAddComment";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { GiPartyPopper } from "react-icons/gi";
import { RiEmotionSadFill } from "react-icons/ri";
import { debounce } from "lodash";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { dateConvert } from "../components/util/dateConvert";
import Cookies from "js-cookie";
import useQuill from "../hooks/useQuillEditor";
import DOMPurify from "dompurify";
export const BoardDetails = () => {
  const [board, setBoard] = useState({});
  const [liked, setLiked] = useState(false);
  const [sad, setSad] = useState(false);
  const [grats, setGrats] = useState(false);
  const { quillValue, renderQuill, setQuillValue } = useQuill("");
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const token = Cookies.get("access");
  const params = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const getBoardDetail = async () => {
    const response = await axios.get(`${process.env.REACT_APP_TEST_SERVER_URL}/boards/${params.id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  };
  const deleteBoardDetail = async () => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_TEST_SERVER_URL}/boards/${params.id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  const { data } = useQuery(`${params.id}`, getBoardDetail, {
    refetchOnWindowFocus: false,
    // staleTime: 600 * 1000,
  });

  const postLikeClick = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_TEST_SERVER_URL}/boards/${params.id}/LIKE`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const postSadClick = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_TEST_SERVER_URL}/boards/${params.id}/SAD`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const postGratsClick = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_TEST_SERVER_URL}/boards/${params.id}/CONGRATULATION`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (err) {
      console.log(err);
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

  const onLikeClick = debounce(
    async () => {
      setLiked(!liked);
      likeMutation.mutate();
    },
    100,
    { leading: false }
  );
  const onSadClick = debounce(
    async () => {
      setSad(!sad);
      sadMutation.mutate();
    },
    100,
    { leading: false }
  );
  const onGratsClick = debounce(
    () => {
      setGrats(!grats);
      gratsMutation.mutate();
    },
    100,
    { leading: false }
  );

  const [view, setView] = useState("");
  const [image, setImage] = useState("");

  const editBoardApi = async () => {
    try {
      const formData = new FormData();
      const token = Cookies.get("access");
      const text = JSON.stringify({ title: editedTitle, contents: quillValue, category: board.category });
      console.log("board", text);
      const imageBlob = new Blob([image], { type: "image/jpeg" });
      const textBlob = new Blob([text], { type: "application/json" });

      formData.append("imageFile", imageBlob, "image.jpg");
      formData.append("boardRequestDto", textBlob);
      const response = await axios.put(`${process.env.REACT_APP_TEST_SERVER_URL}/boards/${params.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const boardMutation = useMutation(editBoardApi, {
    onSuccess: () => {
      queryClient.invalidateQueries(`${params.id}`);
    },
  });
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Check file type
    const fileType = file.type.split("/")[0];
    if (fileType !== "image") {
      alert("The selected file is not an image.");
      return;
    }

    // Check file size
    const maxSize = 3 * 1024 * 1024; // 3 MB
    if (file.size > maxSize) {
      alert("File size is too large. Please select a file under 3 MB.");
      return;
    }
    console.log(file);

    setImage(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setView(reader.result);
    };
  };
  const toggleEditMode = () => {
    if (editMode) {
      // Save changes
      boardMutation.mutate();
      setEditMode(false);
    } else {
      // Enter edit mode
      setEditMode(true);
    }
  };

  useEffect(() => {
    if (data) {
      setBoard({
        title: data.title,
        contents: data.contents,
        category: data.category,
      });
      setQuillValue(data.contents);
      setView(data.image);
      setLiked(data.likeCheck);
      setSad(data.sadCheck);
      setGrats(data.congratulationCheck);
      setEditedTitle(data.title);
    }
  }, [data]);

  return (
    <motion.div className="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <div className="flex flex-col items-center">
        <div className="w-full max-w-sm bg-backgroundPurple rounded-md p-6 my-4 flex flex-col items-center shadow relative">
          {data && (
            <div className="absolute top-0 bg-[#ebe0ff] w-full rounded-t-md p-1 flex justify-between">
              <span className="p-2 text-darkPurple text-md font-bold rounded-br rounded-tl">{board.category}</span>
              <span className="p-2 text-darkPurple text-sm rounded-br rounded-tl">{dateConvert(data.createdTime)}</span>
            </div>
          )}

          <button className="clickableTextStyle absolute top-14 left-2 px-2 bg-sectionPurple rounded" onClick={deleteBoardDetail}>
            Delete Post
          </button>
          <button className="clickableTextStyle absolute top-14 right-4" onClick={toggleEditMode}>
            {editMode ? "Save" : "Edit"}
          </button>

          <div className="flex relative justify-center rounded-full items-center mb-4 mt-12  w-40 h-40">
            {editMode && (
              <>
                {" "}
                <input type="file" id="imageInput" accept="image/*" className="hidden" onChange={handleImageChange} />
                <label
                  htmlFor="imageInput"
                  className="cursor-pointer absolute inset-0 w-full h-full flex items-center justify-center text-white bg-opacity-0 hover:bg-opacity-50 transition-opacity duration-200"
                  title="Upload Image"
                ></label>
              </>
            )}

            {data && view ? (
              <img className="w-full h-full rounded-full object-cover shadow-md" src={view} alt="" />
            ) : (
              <div className="flex justify-center items-center rounded-full bg-mainPurple w-40 h-40 shadow-lg">
                <FontAwesomeIcon icon={faUser} size="4x" className=" text-white" />
              </div>
            )}
          </div>
          <div className="text-center w-full px-6 rounded">
            {data &&
              (editMode ? (
                <>
                  <input
                    autoFocus
                    className="appearance-none rounded w-full text-lg font-bold mb-4 px-3 py-1 outline-none bg-white  focus:ring-2 focus: ring-mainPurple"
                    type="text"
                    placeholder="Enter Title"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    name="name"
                  />
                  {renderQuill()}
                </>
              ) : (
                <div className="w-full bg-secondaryBgColor rounded">
                  <h2 className="text-lg font-bold mb-1 px-3 py-1">{editedTitle}</h2>
                  <p
                    className="px-3 py-3 rounded-t text-sm text-left"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(quillValue),
                    }}
                  ></p>
                </div>
              ))}
          </div>

          <div className="flex rounded-md gap-5 mt-2 px-3 py-2 bg-[#ebe0ff]">
            <div className="flex justify-center items-center">
              <motion.div
                animate={liked ? { scale: [1, 1.1, 1] } : {}}
                transition={{
                  duration: 0.2,
                  ease: "easeInOut",
                }}
              >
                <AiFillHeart
                  className="text-2xl mr-2"
                  color={liked ? "red" : "white"}
                  onClick={onLikeClick}
                  style={{
                    filter: "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.1))",
                  }}
                />
              </motion.div>
              <AnimatePresence>
                <span className="text-sm w-4">
                  {data &&
                    (data.likeCnt === 0 || data.likeCnt === null ? (
                      ""
                    ) : (
                      <motion.span
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {data.likeCnt}
                      </motion.span>
                    ))}
                </span>
              </AnimatePresence>
            </div>

            <div className="flex justify-center items-center ">
              <motion.div
                animate={sad ? { scale: [1, 1.1, 1] } : {}}
                transition={{
                  duration: 0.2,
                  ease: "easeInOut",
                }}
              >
                <RiEmotionSadFill
                  className="mr-2 text-2xl"
                  color={sad ? "#6d93ff" : "white"}
                  onClick={onSadClick}
                  style={{
                    filter: "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.1))",
                  }}
                />
              </motion.div>
              <AnimatePresence>
                <span className="text-sm w-4">
                  {data &&
                    (data.sadCnt === 0 || data.sadCnt === null ? (
                      ""
                    ) : (
                      <motion.span
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {data.sadCnt}
                      </motion.span>
                    ))}
                </span>
              </AnimatePresence>
            </div>

            <div className="flex justify-center items-center ">
              <motion.div
                animate={grats ? { scale: [1, 1.1, 1] } : {}}
                transition={{
                  duration: 0.2,
                  ease: "easeInOut",
                }}
              >
                <GiPartyPopper
                  className="text-2xl mr-2"
                  color={grats ? "#fcaaa1" : "white"}
                  onClick={onGratsClick}
                  style={{
                    filter: "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.1))",
                  }}
                />
              </motion.div>
              <AnimatePresence>
                <span className="text-sm w-4">
                  {data &&
                    (data.congratulationCnt === 0 || data.congratulationCnt === null ? (
                      ""
                    ) : (
                      <motion.span
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {data.congratulationCnt}
                      </motion.span>
                    ))}
                </span>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="w-full max-w-3xl bg-backgroundPurple rounded-md px-4 py-6 my-4 shadow">
          <h2 className="text-lg font-bold mb-4">Comments</h2>
          <BoardAddComment id={params.id} />
          <div className="space-y-6 ">
            <AnimatePresence>
              {data && data.commentDetailResponseDtoList.map((comment) => <BoardCommentCard key={comment.createdAt} comment={comment} />)}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
