import React from "react";
import FileList from "../components/FileUpload/FileList";
import FileUpload from "../components/FileUpload/FileUpload";
import { ToastNotifier } from "../components/ToastNotifier";

export const Dashboard: React.FC = () => {
  return (
    <>
      <ToastNotifier />
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
