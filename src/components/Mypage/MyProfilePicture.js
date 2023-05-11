import { useImage } from "../../hooks/useImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "react-query";
import Cookies from "js-cookie";
export const MyProfilePicture = ({ image }) => {
    const { userName, userId } = useSelector((store) => store.auth);
    const [view, setView] = useState(image);
    const queryClient = useQueryClient();

    const putImageApi = async (file) => {
        try {
            const formData = new FormData();
            const token = Cookies.get("access");
            const text = JSON.stringify({ username: userName });
            const imageBlob = new Blob([file], { type: "image/jpeg" });
            const textBlob = new Blob([text], { type: "application/json" });

            formData.append("imageFile", imageBlob, "image.jpg");
            formData.append("userPageRequestDto", textBlob);
            const response = await axios.put(
                `${process.env.REACT_APP_TEST_SERVER_URL}/members/${userId}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response.data);
        } catch (err) {
            console.log(err);
        }
    };
    const imageMutation = useMutation(putImageApi, {
        onSuccess: () => {
            queryClient.invalidateQueries(`mypage`);
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

        imageMutation.mutate(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setView(reader.result);
        };
    };

    return (
        <div className="relative flex justify-center items-center w-52 h-52">
            <input
                type="file"
                id="imageInput"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
            />
            <label
                htmlFor="imageInput"
                className="cursor-pointer absolute inset-0 w-full h-full flex items-center justify-center text-white bg-black bg-opacity-0 hover:bg-opacity-50 transition-opacity duration-200"
                title="Upload Image"
            ></label>
            {image ? (
                <img
                    className="w-full h-full rounded-full object-cover shadow-md"
                    src={view}
                    alt=""
                />
            ) : (
                <div className=" w-52 h-52 rounded-full bg-mainPurple flex items-center justify-center shadow-md">
                    <FontAwesomeIcon
                        icon={faUser}
                        size="5x"
                        className=" text-white"
                    />
                </div>
            )}
        </div>
    );
};
