import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { LoadingAnimation } from "./LoadingAnimation";
import axiosInstance from "../common/axios";
import { useDispatch } from "react-redux";
import { setFileUploaded } from "../redux/slices/fileSlice";

const FileUpload: React.FC = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const dispatch = useDispatch();

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/*": [".pdf", ".doc", ".docx", ".xls", ".xlsx"],
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
      "video/*": [".mp4", ".mkv", ".avi"],
    },
    onDrop: (acceptedFiles) => {
      setUploadedFiles(acceptedFiles);
    },
  });

  const handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTags(value.split(","));
  };

  const handleUpload = async () => {
    if (uploadedFiles.length > 0) {
      setIsUploading(true);
      try {
        for (const file of uploadedFiles) {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("tags", tags.join(","));
          // eslint-disable-next-line no-await-in-loop
          await axiosInstance.put("/files/1b27b4b0-2895-4134-8de0-2916304d77a6", formData);
        }
        toast.success("File Uploaded Successfully.");
        dispatch(setFileUploaded());
      } catch (error) {
        console.error("Login failed:", error);
        toast.error("Error uploading files.");
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-10">
      <h2 className="text-xl my-3">File Upload:</h2>
      <div {...getRootProps()} className="border-dashed border-2 border-gray-400 p-20">
        <input className="file-input file-input-bordered w-full max-w-xs" {...getInputProps()} />
        <p>Drag & drop some files here, or click to select file(s)</p>
      </div>
      {uploadedFiles.length > 0 && (
        <div>
          <h2 className="pt-4">Uploaded Files:</h2>
          {uploadedFiles.map((file, index) => (
            <div className="pt-2" key={index}>
              {file.name}
            </div>
          ))}
        </div>
      )}
      <div>
        <label className="input input-bordered flex items-center gap-2 my-8 justify-between">
          <input
            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            type="text"
            placeholder="Tags (comma separated)"
            onChange={handleTagChange}
          />
          <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
            optional
          </span>
        </label>
        <button
          className="block cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
          onClick={handleUpload}
          disabled={isUploading}
        >
          Upload Files
          {isUploading && <LoadingAnimation />}
        </button>
      </div>
    </div>
  );
};

export default FileUpload;
