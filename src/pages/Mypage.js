import { useEffect, useState } from "react";
import { MyProfilePicture } from "../components/Mypage/MyProfilePicture";
import axios from "../api/axios";
import { useQuery } from "react-query";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

export const Mypage = () => {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("someone@example.com");
  const [prevName, setPrevName] = useState("");
  const [image, setImage] = useState("");

  const token = Cookies.get("access");
  let userId = null;
  if (token) {
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
    userId = decodedToken.userId;
  }
  const getOneUserList = async () => {
    const response = await axios.get(`/members/${userId}`);
    return response.data;
  };
  const { data } = useQuery("mypage", getOneUserList);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEditClick = () => {
    if (editMode) {
      setName(prevName);
    } else {
      setPrevName(name);
    }
    setEditMode(!editMode);
  };

  const editUserInfo = async () => {
    const formData = new FormData();
    formData.append("imageFile", image);
    const response = await axios.put(`/members/${userId}`, formData);
    console.log(response.data);
  };
  const handleSaveClick = () => {
    if (name.trim() !== "") {
      setEditMode(false);
      setName(name);
      editUserInfo();
    }
  };

  useEffect(() => {
    if (data) {
      console.log(data);
      setName(data.username);
      setEmail(data.email);
      setImage(data.img);
    }
  }, [data]);

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-md mx-auto pb-1 bg-backgroundPurple rounded-lg shadow">
        <div className="flex justify-center pt-8">
          {/* Profile picture */}
          {data && <MyProfilePicture image={data.img} />}
        </div>
        <div className="mt-4 mx-9 p-3 mb-7 rounded-md bg-[#ebe0ff]">
          {/* Username */}
          <div className="mb-2">
            <div className="flex justify-between">
              <lable className="font-bold text-lg mb-2" htmlFor="name">
                Name
              </lable>
              <div className="flex">
                {editMode && (
                  <button className="clickableTextStyle" onClick={handleSaveClick}>
                    Save
                  </button>
                )}
                <button className="clickableTextStyle" onClick={handleEditClick}>
                  {editMode ? "Cancel" : "Edit"}
                </button>
              </div>
            </div>
            {editMode ? (
              <input
                autoFocus
                className="appearance-none rounded w-full px-3 py-1 outline-none  focus:ring-2 focus: ring-mainPurple"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={handleNameChange}
                name="name"
              />
            ) : (
              <p className="text-md w-full px-3">{name}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-2">
            <label className="block font-bold text-lg mb-2 " htmlFor="email">
              Email
            </label>

            <p className="text-md w-full px-3">{email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
