import { useImage } from "../../hooks/useImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export const MyProfilePicture = () => {
  const [image, handleImageChange] = useImage("");

  return (
    <div className="relative flex justify-center items-center w-52 h-52">
      <input type="file" id="imageInput" accept="image/*" className="hidden" onChange={handleImageChange} />
      <label
        htmlFor="imageInput"
        className="cursor-pointer absolute inset-0 w-full h-full flex items-center justify-center text-white bg-black bg-opacity-0 hover:bg-opacity-50 transition-opacity duration-200"
        title="Upload Image"
      ></label>
      {image ? (
        <img className="w-full h-full rounded-full object-cover shadow-md" src={image} alt="" />
      ) : (
        <div className=" w-52 h-52 rounded-full bg-mainPurple flex items-center justify-center shadow-md">
          <FontAwesomeIcon icon={faUser} size="5x" className=" text-white" />
        </div>
      )}
    </div>
  );
};
