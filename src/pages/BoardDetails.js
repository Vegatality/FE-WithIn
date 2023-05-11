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
import { useParams } from "react-router-dom";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { dateConvert } from "../components/util/dateConvert";
import Cookies from "js-cookie";

export const BoardDetails = () => {
    const [liked, setLiked] = useState(false);
    const [sad, setSad] = useState(false);
    const [grats, setGrats] = useState(false);
    const [commentList, setCommentList] = useState([]);
    const { role } = useSelector((store) => store.auth);

    const params = useParams();
    const queryClient = useQueryClient();

    const getBoardDetail = async () => {
        const token = Cookies.get("access");
        const response = await axios.get(
            `${process.env.REACT_APP_TEST_SERVER_URL}/boards/${params.id}`,
            {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }
        );
        console.log(response.data);
        return response.data;
    };
    const { data } = useQuery(`${params.id}`, getBoardDetail, {
        refetchOnWindowFocus: false,
        // staleTime: 600 * 1000,
    });

    const postLikeClick = async () => {
        try {
            const response = await axios.post(`/boards/${params.id}/LIKE`);
            console.log(response.data);
        } catch (err) {
            console.log(err);
        }
    };
    const postSadClick = async () => {
        try {
            const response = await axios.post(`/boards/${params.id}/SAD`);
            console.log(response.data);
        } catch (err) {
            console.log(err);
        }
    };
    const postGratsClick = async () => {
        try {
            const response = await axios.post(
                `/boards/${params.id}/CONGRATULATION`
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

    useEffect(() => {
        if (data) {
            setLiked(data.likeCheck);
            setSad(data.sadCheck);
            setGrats(data.congratulationCheck);
            setCommentList(data.commentDetailResponseDtoList);
        }
    }, [data]);
    return (
        <div className="flex flex-col items-center">
            <div className="w-full max-w-sm bg-backgroundPurple rounded-md p-6 my-4 flex flex-col items-center shadow relative">
                {data && (
                    <div className="absolute top-0 bg-[#ebe0ff] w-full rounded-t-md p-1 flex justify-between">
                        <span className="p-2 text-darkPurple text-md font-bold rounded-br rounded-tl">
                            {data.category}
                        </span>
                        <span className="p-2 text-darkPurple text-sm rounded-br rounded-tl">
                            {dateConvert(data.createdTime)}
                        </span>
                    </div>
                )}
                <div className="flex justify-center items-center mb-4 mt-9  w-40 h-40">
                    {data && data.image ? (
                        <img
                            className="w-full h-full rounded-full object-cover shadow-md"
                            src={data.image}
                            alt=""
                        />
                    ) : (
                        <div className="flex justify-center items-center rounded-full bg-mainPurple w-40 h-40 shadow-lg">
                            <FontAwesomeIcon
                                icon={faUser}
                                size="4x"
                                className=" text-white"
                            />
                        </div>
                    )}
                </div>
                <div className="text-center">
                    {data && (
                        <>
                            <h2 className="text-lg font-bold text-commonTextColor">
                                {data.title}
                            </h2>
                            <p className="text-commonTextColor">
                                {data.contents}
                            </p>
                        </>
                    )}
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
                                        (data.likeCnt === 0 ||
                                        data.likeCnt === null ? (
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
                                        (data.sadCnt === 0 ||
                                        data.sadCnt === null ? (
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
                                        (data.congratulationCnt === 0 ||
                                        data.congratulationCnt === null ? (
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
            </div>

            <div className="w-full max-w-3xl bg-backgroundPurple rounded-md px-4 py-6 my-4 shadow">
                <h2 className="text-lg font-bold mb-4">Comments</h2>
                <BoardAddComment id={params.id} />
                <div className="space-y-6 ">
                    <AnimatePresence>
                        {data &&
                            data.commentDetailResponseDtoList.map((comment) => (
                                <BoardCommentCard
                                    key={comment.createdAt}
                                    comment={comment}
                                />
                            ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};
