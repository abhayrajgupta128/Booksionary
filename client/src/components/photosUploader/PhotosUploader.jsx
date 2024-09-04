import axios from "axios";
import { set } from "mongoose";
import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";

const PhotosUploader = ({ addedPhotos, onChange }) => {

  const [photoLink, setPhotoLink] = useState("");
  // const [loading, setLoading] = useState(false);

  async function addPhotoByLink(ev) {
    ev.preventDefault();
  
    const promise = new Promise((resolve, reject) => {
      axios.post("/upload-by-link", { link: photoLink })
        .then(({ data: { url } }) => {
          onChange((prev) => [...prev, url]);
          setPhotoLink("");
          resolve();
        })
        .catch(() => {
          reject();
        });
    });
  
    await toast.promise(promise, {
      loading: "Uploading photo...",
      success: "Photo uploaded successfully!",
      error: "Failed to upload photo. Please try again.",
    });
  }
  

  function uploadPhoto(ev) {
    ev.preventDefault();
  
    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append('photos', files[i]);
    }
  
    const promise = new Promise((resolve, reject) => {
      axios
        .post("/upload", data, {
          headers: { "Content-type": "multipart/form-data" },
        })
        .then((response) => {
          const { data: filenames } = response;
          onChange((prev) => [...prev, ...filenames]);
          resolve();
        })
        .catch(() => {
          reject();
        });
    });
  
    toast.promise(promise, {
      loading: "Uploading photos...",
      success: "Photos uploaded successfully!",
      error: "Failed to upload photos. Please try again.",
    });
  }
  
  return (
    <>
      <div className="flex gap-2 ">
        <input
          type="text"
          value={photoLink}
          onChange={ (ev) => setPhotoLink(ev.target.value)}
          placeholder="Drop your photo link"
        />
        <button
          onClick={addPhotoByLink}
          style={{ background: "#FF4820" }}
          type="button"
          className="button bg-gray-200 px-4 rounded-2xl"
        >
          Add&nbsp;Photo
        </button>
      </div>

      <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {addedPhotos.length > 0 &&
            addedPhotos.map((link) => (
                <div className="h-32 flex" key={link}>
                <img
                    className="rounded-2xl w-full object-cover"
                    src={link}
                    alt="image"
                />
                </div>
            ))}

        <label className="h-32 cursor-pointer flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-2 text-1xl text-gray-600">
          <input type="file" 
          multiple 
          onChange={uploadPhoto}
          className="hidden" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
            />
          </svg>
          Upload
        </label>
      </div>
    </>
  );
};

export default PhotosUploader;
