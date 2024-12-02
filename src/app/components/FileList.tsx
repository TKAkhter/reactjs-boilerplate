import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../common/axios";
import { useDispatch, useSelector } from "react-redux";
import { StoreRootState } from "../types";
import { resetFileUploaded } from "../redux/slice";

interface File {
  _id: string;
  name: string;
  fileText: string;
  tags: string[];
  fileName: string;
  createdAt: Date;
}

const FileList: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();
  const isFileUploaded = useSelector((state: StoreRootState) => state.file.isFileUploaded);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axiosInstance.get("/files");
        console.log("🚀 ~ fetchFiles ~ response:", response.data);
        if (response.data && response.data.length > 0) {
          setFiles(response.data);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_) {
        setError("Files not found!");
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();

    if (isFileUploaded) {
      fetchFiles();
      dispatch(resetFileUploaded());
    }
  }, [isFileUploaded, dispatch]);

  if (loading) {
    return <h2 className="text-xl">Loading files...</h2>;
  }
  if (error) {
    return <h2 className="text-xl">{error}</h2>;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleShare = async (e: any) => {
    try {
      const response = await axiosInstance.post(`/files/share/${e.target.value}`);
      const { shareableLink } = response.data;

      await navigator.clipboard.writeText(shareableLink);

      toast.success("Link copied to clipboard!");
    } catch (err) {
      console.error("Error generating share link:", err);
    }
  };

  return (
    <div className="my-4">
      <h2 className="text-xl">File List:</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 my-10">
        {files.map((file) => (
          <div key={file.fileName}>
            <Link to={`/file/${file.fileName}`}>
              <img
                className="object-cover object-center w-full h-80 max-w-full rounded-lg"
                src={file.fileText}
                alt={file.name}
              />
            </Link>
            <div className="flex justify-end">
              <button className="btn btn-ghost my-4" value={file.name} onClick={handleShare}>
                Share
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileList;
