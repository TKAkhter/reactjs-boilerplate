import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosClient } from "../../common/axios";

export const FileView: React.FC = () => {
  const { imageName } = useParams<{ imageName: string }>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [imageDetails, setImageDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchImageDetails = async () => {
      try {
        const response = await axiosClient.get(`/file/${imageName}`);
        setImageDetails(response.data.data);
        const imageTags = response.data.data.tags.split(",");
        setTags(imageTags);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching image details:", error);
        setLoading(false);
      }
    };

    if (imageName) {
      fetchImageDetails();
    }
  }, [imageName]);

  if (loading) {
    return <div className="text-center p-4">Loading image details...</div>;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleShare = async (e: any) => {
    try {
      const response = await axiosClient.post(`/file/share/${e.target.value}`);
      const { shareableLink } = response.data;
      await navigator.clipboard.writeText(shareableLink);
      toast.success("Link copied to clipboard!");
    } catch (error) {
      console.error("Error generating share link:", error);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      {imageDetails ? (
        <>
          <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row">
              <img
                src={`${process.env.REACT_APP_API_URL}/${imageDetails.path}`}
                alt={imageDetails.fileName}
                className="max-w-sm rounded-lg shadow-2xl"
              />
              <div>
                <h1 className="text-xl">
                  Name: <b>{imageDetails.name}</b>
                </h1>
                <h2 className="text-xl py-6">Tags:</h2>
                {console.log(imageDetails.tags.split(","))}
                {tags.map((tag: string) => (
                  <span key={tag} className="badge badge-neutral mx-2 px-5 py-4">
                    {tag}
                  </span>
                ))}
                <div>
                  <button className="btn btn-accent">
                    {imageDetails.views ?? 0} view{imageDetails.views ? "s" : null}
                  </button>
                  <button
                    className="btn btn-ghost my-4"
                    value={imageDetails.name}
                    onClick={handleShare}
                  >
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>No details available for this image.</p>
      )}
    </div>
  );
};
