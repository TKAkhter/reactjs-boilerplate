import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosClient } from "../../common/axios";

export const FileView: React.FC = () => {
  const { id } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [imageDetails, setImageDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchImageDetails = async () => {
      try {
        const response = await axiosClient.get(`/file/${id}`);
        setImageDetails(response.data.data);
        const imageTags = response.data.data.tags.split(",");
        setTags(imageTags);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching image details:", error);
        setLoading(false);
      }
    };

    if (id) {
      fetchImageDetails();
    }
  }, [id]);

  if (loading) {
    return <div className="text-center p-4">Loading image details...</div>;
  }

  return (
    <div className="mx-auto max-w-270">
      {/* {isLoading ? <Loader /> : null} */}
      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-5 xl:col-span-3">
          <div className="rounded-sm border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
              {imageDetails ? (
                <>
                  <img
                    src={`${import.meta.env.VITE_BACKEND_API_URL}/${imageDetails.path}`}
                    alt={imageDetails.fileName}
                    className="w-1/2 h-auto rounded-lg shadow-md"
                  />

                  <div className="mt-4">
                    <h2 className="text-xl font-semibold">Image ID: {imageDetails.id}</h2>
                    <p className="text-sm text-muted-foreground">{imageDetails.views} views</p>
                    <div className="mt-2 flex gap-2 flex-wrap">
                      {tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 rounded-full bg-primary text-white text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <p>No details available for this image.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
