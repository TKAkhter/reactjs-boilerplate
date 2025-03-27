import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosClient } from "../../common/axios";
import { useDispatch, useSelector } from "react-redux";
import { resetFileUploaded } from "../../redux/slices/fileSlice";
import { RootState } from "../../redux/store";

interface File {
  id: string;
  name: string;
  text: string;
  path: string;
  tags: string;
  createdAt: Date;
  updatedAt: Date;
  userId: Date;
  views: number;
}

const FileList: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();
  const isFileUploaded = useSelector((state: RootState) => state.file.isFileUploaded);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axiosClient.get("/file");
        if (response.data.data && response.data.data.length > 0) {
          setFiles(response.data.data);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_) {
        setError("Files not found!");
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();

    console.log("🚀 ~ useEffect ~ isFileUploaded:", isFileUploaded);
    if (isFileUploaded) {
      fetchFiles();
      dispatch(resetFileUploaded());
    }
  }, [isFileUploaded, dispatch]);

  if (loading) {
    return <h2 className="text-xl text-black dark:text-white">Loading files...</h2>;
  }
  if (error) {
    return <h2 className="text-xl text-black dark:text-white">{error}</h2>;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleShare = async (e: any) => {
    try {
      const response = await axiosClient.post(`/file/share/${e.target.value}`);
      const { shareableLink } = response.data;

      await navigator.clipboard.writeText(shareableLink);

      toast.success("Link copied to clipboard!");
    } catch (err) {
      console.error("Error generating share link:", err);
    }
  };

  return (
    <div className="my-4">
      <h2 className="text-xl text-black dark:text-white">File List:</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 my-10">
        {files.map((file) => (
          <div key={file.name}>
            <Link to={`/file/${file.id}`}>
              <img
                className="object-cover object-center w-full h-80 max-w-full rounded-lg"
                src={`${import.meta.env.VITE_BACKEND_API_URL}/${file.path}`}
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
