import React from "react";
import FileList from "../components/FileUpload/FileList";
import FileUpload from "../components/FileUpload/FileUpload";

export const Dashboard: React.FC = () => {
  return (
    <>
      <div className="container mx-auto p-4">
        <FileUpload />
        <div className="my-10">
          <div className="divider"></div>
          <FileList />
        </div>
      </div>
    </>
  );
};
