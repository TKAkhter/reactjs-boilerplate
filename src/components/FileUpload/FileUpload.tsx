import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner"; // ShadCN Toast
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Upload } from "lucide-react"; // Loading Spinner
import { useDispatch, useSelector } from "react-redux";
import { setFileUploaded } from "@/redux/slices/fileSlice";
import { postFileUpload } from "@/generated";
import { RootState } from "@/redux/store";
import logger from "@/common/pino";

const FileUpload: React.FC = () => {
  const authToken = useSelector((state: RootState) => state.auth.token);
  const [tags, setTags] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    onDrop: (acceptedFiles: File[]) => {
      setUploadedFiles(acceptedFiles);
    },
  });

  const handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTags(event.target.value.split(","));
  };

  const handleUpload = async () => {
    if (uploadedFiles.length === 0) {
      return toast.error("No files selected!");
    }

    setLoading(true);
    const loadingToast = toast.loading("Uploading files...");

    try {
      for (const file of uploadedFiles) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("tags", tags.join(","));
        // eslint-disable-next-line no-await-in-loop
        const { error } = await postFileUpload({
          body: {
            file,
            tags: tags.join(","),
          },
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        if (error) {
          const errorMessage =
            (error as { message?: string }).message || "An unknown error occurred";
          throw new Error(errorMessage);
        }
      }

      toast.success("Files uploaded successfully!", { id: loadingToast });
      dispatch(setFileUploaded());
      setUploadedFiles([]); // Clear files after upload
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      logger.error(error.message);
      toast.error("Login failed. Email or Password is not correct.", { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle>File Upload</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Dropzone */}
        <div
          {...getRootProps()}
          className="border-dashed border-2 border-primary p-10 rounded-lg cursor-pointer text-center"
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center space-y-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-full">
              <Upload />
            </div>
            <p className="text-gray-700 dark:text-gray-400">
              <span className="text-primary font-medium">Click to upload</span> or drag & drop
            </p>
            <p className="text-xs text-gray-700 dark:text-gray-400">
              JPEG, PNG, JPG, GIF (Max: 10MB)
            </p>
          </div>
        </div>

        {/* Uploaded Files List */}
        {uploadedFiles.length > 0 && (
          <div className="mt-4 space-y-2">
            <h4 className="text-lg font-medium">Selected Files:</h4>
            {uploadedFiles.map((file, index) => (
              <div key={index} className="text-sm text-gray-600">
                {file.name}
              </div>
            ))}
          </div>
        )}

        {/* Tags Input */}
        <div className="mt-4">
          <Input
            type="text"
            placeholder="Tags (comma separated)"
            onChange={handleTagChange}
            className="border rounded-lg"
          />
        </div>

        {/* Upload Button */}
        <Button className="mt-6 w-full" onClick={handleUpload} disabled={loading}>
          {loading ? <Loader2 className="animate-spin mr-2 h-5 w-5" /> : "Upload Files"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default FileUpload;
