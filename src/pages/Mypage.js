import { useState } from "react";
import { MyProfilePicture } from "../components/Mypage/MyProfilePicture";

export const Mypage = () => {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("Some One");
  const [email, setEmail] = useState("someone@example.com");
  const [prevName, setPrevName] = useState("");

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

  const handleSaveClick = () => {
    if (name.trim() !== "") {
      setEditMode(false);
      setName(name);
      // Call an API or save the data to a database here
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-md mx-auto pb-1 bg-backgroundPurple rounded-lg shadow">
        <div className="flex justify-center pt-8">
          {/* Profile picture */}
          <MyProfilePicture />
        </div>
        <div className="mt-4 mx-9 p-3 mb-7 rounded-md bg-[#ebe0ff]">
          {/* Username */}
          <div className="mb-2">
            <div className="flex justify-between">
              <label className="font-bold text-lg mb-2" htmlFor="name">
                Name
              </label>
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
