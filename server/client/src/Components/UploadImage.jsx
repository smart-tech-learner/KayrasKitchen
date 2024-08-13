import React, { useState } from "react";
import { uploadFile } from "../Utils/FileUpload";

const UploadImage = (props) => {
  const [file, setFile] = useState("");
  const onUploadFile = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadImageFile = async (event) => {
    event.preventDefault();

    try {
      const upload = await uploadFile(file);
      props.uploadedUrl(upload.url);
    } catch (error) {
      console.log("error uploading image::: ", error);
    }
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-slate-900 bg-opacity-40 flex justify-center items-center p-10">
      <div className="bg-white p-10 rounded-md">
        <form onSubmit={uploadImageFile}>
          <div className="grid text-xl pb-2">
            <label htmlFor="image">Upload Image</label>
            <input
              type="file"
              name="image"
              id="image"
              required
              onChange={onUploadFile}
              className="bg-slate-200 py-2 px-2 rounded-md hover:outline-primary mt-2"
            />
          </div>
          <div className="pt-5 flex justify-center items-center">
            <button
              type="submit"
              className="px-2 py-2 bg-primary rounded-md mr-2 text-white font-bold"
            >
              Upload
            </button>
            <button
              type="button"
              onClick={props.closeUpload}
              className="px-2 py-2 bg-slate-400 rounded-md mr-2 text-white font-bold"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadImage;
